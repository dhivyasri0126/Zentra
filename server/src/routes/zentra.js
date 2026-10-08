import express from 'express';
import multer from 'multer';
import { GoogleGenAI, Type } from '@google/genai';
import { pool } from '../../db.js';

const router = express.Router();

// 1. Image Preprocessing & Ingestion
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

const SYSTEM_PROMPT = `You are Zentra Vision's Visual Evidence & Reasoning Engine designed for users with zero prompting experience.
Analyze all provided image(s) deeply before making any decision.

BEHAVIOR RULES:
RULE 1 - ZERO GUESSING & STRICT EVIDENCE:
Never make wild guesses, assumptions, or hallucinations. If details like brand labels, model tags, barcodes, serial numbers, or damage areas are blurry, partially hidden, or unreadable, set 'sufficient' to false. Explain what is unreadable in 'missing_evidence' and instruct the user on the exact photo/angle needed next in 'next_best_view_prompt'.

RULE 2 - ZERO-PROMPTING INTENT INTERPRETATION:
If the user provides a simple or vague query (e.g., 'What is this?'), treat it as a full professional request and inspect the image deeply to answer accurately if visual evidence permits.

RULE 3 - IMAGE-ONLY QUESTION GENERATION (NO PROMPT PROVIDED):
If 'userPrompt' is empty or missing:
- Perform deep visual analysis to detect the subject/object in the image.
- Set 'sufficient' to false.
- Populate 'suggested_questions' with 3 to 4 smart, highly specific, and relevant questions the user might intend to ask about this object (e.g., 'What model is this laptop?', 'How do I fix this damage?', 'What are the specifications of this device?').
- Set 'next_best_view_prompt' to: 'Select one of the suggested questions above or ask your own question about the image.'

RULE 4 - SUFFICIENT EVIDENCE:
If the visual evidence is 100% clear and conclusive to answer the user query or selected question, set 'sufficient' to true and fill 'verified_answer'.`;

router.post('/verify', upload.single('image'), async (req, res, next) => {
  try {
    const { sessionId, userPrompt } = req.body;
    let activeSessionId = sessionId;

    // 2. Session & Context Storage (PostgreSQL)
    if (!activeSessionId) {
      const sessionResult = await pool.query(
        'INSERT INTO sessions (prompt) VALUES ($1) RETURNING id',
        [userPrompt || null]
      );
      activeSessionId = sessionResult.rows[0].id;
    }

    // Save new image if uploaded
    if (req.file) {
      const mimeType = req.file.mimetype;
      const base64Data = req.file.buffer.toString('base64');

      await pool.query(
        'INSERT INTO session_images (session_id, mime_type, image_data) VALUES ($1, $2, $3)',
        [activeSessionId, mimeType, base64Data]
      );
    }

    // Query ALL past images for this session_id from session_images to maintain multi-turn visual context
    const imagesResult = await pool.query(
      'SELECT mime_type, image_data FROM session_images WHERE session_id = $1 ORDER BY id ASC',
      [activeSessionId]
    );

    // 3. Multimodal Evidence Engine (Gemini API Integration)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY environment variable is not configured.' });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Build contents payload: include all historical images as inlineData + the prompt text
    const contents = [];

    for (const img of imagesResult.rows) {
      contents.push({
        inlineData: {
          mimeType: img.mime_type,
          data: img.image_data,
        },
      });
    }

    // 3. Request Parsing & Zero-Prompting Handling
    const hasPrompt = Boolean(userPrompt && userPrompt.trim());
    const promptText = hasPrompt
      ? userPrompt.trim()
      : 'User uploaded an image without a question. Analyze the image and generate suggested questions.';
    contents.push(promptText);

    const generateConfig = {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          sufficient: {
            type: Type.BOOLEAN,
            description: 'Whether visual evidence is sufficient to answer accurately.',
          },
          missing_evidence: {
            type: Type.STRING,
            description: 'Description of missing visual details if insufficient.',
          },
          next_best_view_prompt: {
            type: Type.STRING,
            description: 'Next-Best-View Recommendation guiding user to capture missing view.',
          },
          verified_answer: {
            type: Type.STRING,
            description: 'Verified response when evidence is sufficient.',
          },
          suggested_questions: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
            description: 'Suggested questions when user query is simple or empty.',
          },
        },
        required: ['sufficient'],
      },
    };

    // Resilient generation with automatic retry on temporary 503 spikes
    let response;
    const modelsToTry = ['gemini-3.8-flash', 'gemini-2.5-flash'];
    let lastError = null;

    for (const modelName of modelsToTry) {
      try {
        response = await ai.models.generateContent({
          model: modelName,
          contents,
          config: generateConfig,
        });
        if (response?.text) break;
      } catch (err) {
        lastError = err;
        console.warn(`[Zentra Verify] Warning: ${modelName} failed (${err.message}). Retrying...`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    if (!response && lastError) {
      throw lastError;
    }

    // 5. Persistence & Output
    let parsedResult = {};
    try {
      parsedResult = JSON.parse(response.text || '{}');
    } catch (parseErr) {
      console.error('[Zentra Verify] Error parsing JSON from Gemini response:', parseErr);
      parsedResult = {
        sufficient: false,
        missing_evidence: 'Unable to parse AI verification output.',
        next_best_view_prompt: 'Please recapture and re-upload the image.',
        verified_answer: response.text || '',
        suggested_questions: [],
      };
    }

    // Save interaction turn into session_history as JSONB
    await pool.query(
      'INSERT INTO session_history (session_id, user_prompt, ai_response) VALUES ($1, $2, $3)',
      [activeSessionId, userPrompt || null, JSON.stringify(parsedResult)]
    );

    return res.status(200).json({
      sessionId: activeSessionId,
      ...parsedResult,
    });
  } catch (error) {
    console.error('[Zentra Verify Error]:', error);
    next(error);
  }
});

export default router;

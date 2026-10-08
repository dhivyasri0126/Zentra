# Product Specification

> **Project:** SceneTrace  
> **Hackathon:** CODIENYCH 1.0  
> **Team:** Zentra  
> **Problem:** Conversational Image Recognition Chatbot  
> **Phase:** Phase 1 Hackathon MVP  
> **Primary Stack Constraint:** PERN (PostgreSQL, Express.js, React.js, Node.js)  
> **AI Strategy:** OpenRouter primary gateway, with direct Gemini as an emergency fallback  
> **MVP Priority:** Working, reliable problem-fit prototype before scale

---

## Classification Legend

Every substantive statement in this specification is explicitly classified.

| Classification  | Meaning                                                                                      |
| --------------- | -------------------------------------------------------------------------------------------- |
| **requirement** | Behavior or property the product must provide                                                |
| **preference**  | Chosen way of satisfying a requirement when alternatives exist                               |
| **assumption**  | Working assumption accepted for the hackathon because the source material does not define it |
| **constraint**  | A boundary that the product or implementation must respect                                   |
| **decision**    | A product decision intentionally locked for Phase 1                                          |
| **risk**        | A known uncertainty, failure mode, or limitation                                             |
| **non-goal**    | Explicitly excluded from Phase 1                                                             |

---

# 1. Vision

## 1.1 Product vision

**[decision]**

> **SceneTrace is a conversational visual assistant that lets users show an image, ask natural-language questions about what they see, continue the conversation using visual context, and compare a later image to understand meaningful changes.**

The product should feel like **a conversation with a visual scene**, not a generic text chatbot with an image upload button.

## 1.2 Vision principles

### Problem-first

**[requirement]** Every Phase 1 feature must either directly satisfy the assigned problem or materially improve the core demonstration.

### MVP-first

**[constraint]** The immediate objective is a reliable 24-hour hackathon MVP.

### No fake intelligence

**[requirement]** The product must not present mocked, cached, or precomputed responses as live AI results during normal usage.

**[risk-control]** A separate demo fallback may exist only as a clearly identified disaster-recovery mechanism if external services fail.

### Honest uncertainty

**[requirement]** The product must not represent an uncertain visual interpretation as an established fact.

### Simple architecture

**[preference]** Keep the product simple enough for a hackathon team to understand, debug, deploy, and demonstrate.

### Future-ready, not future-built

**[constraint]** The Phase 1 product should avoid deliberate dead ends, but production-scale infrastructure is not part of the 24-hour build.

## 1.3 Vision boundary

**[non-goal]**

SceneTrace is not intended in Phase 1 to become:

- a general-purpose autonomous agent,
- a medical diagnostic system,
- a legal or safety authority,
- a replacement for professional inspection,
- a persistent personal memory system,
- a research-grade object-tracking system.

---

# 2. Problem

## 2.1 Official problem basis

**[constraint]**

The official problem requires a chatbot that:

- accepts images,
- accepts natural-language queries,
- combines image recognition with conversational AI,
- identifies objects or scenes,
- answers follow-up questions,
- and provides a web/mobile chat interface.

The official competition criteria include innovation, problem coverage, engineering quality, usability, and presentation.

## 2.2 Core user problem

**[requirement]**

A user who sees something unfamiliar should be able to ask about it without first translating the entire visual scene into a detailed text description.

## 2.3 Refined problem

**[decision]**

> When a user encounters an unfamiliar visual scene, they need a natural way to ask contextual questions about what they are seeing and continue that conversation without repeatedly reconstructing the visual context.

## 2.4 Secondary problems addressed

### Object-reference problem

**[requirement]**

The product should help users talk about visible objects in conversational language.

Example:

> “What is the object on the left?”

> “What is it used for?”

### Context-retention problem

**[requirement]**

The user should not need to re-upload the same image for every follow-up question.

### Visual-change problem

**[requirement]**

The user should be able to explicitly compare a previous image with a current image and receive a structured explanation of visible changes.

### Trust problem

**[requirement]**

The system should distinguish directly observed information from inference and uncertainty.

## 2.5 What SceneTrace is not claiming

**[non-goal]**

SceneTrace does not claim that existing multimodal AI systems cannot perform image Q&A, visual reasoning, or multi-image comparison.

**[risk]**

Those baseline capabilities already exist in modern multimodal systems. SceneTrace differentiates at the application/product layer by organizing visual context, conversation state, evidence references, and comparison results.

---

# 3. Users

## 3.1 Primary user

**[decision]**

### College student

A college student is the primary MVP persona.

Typical situation:

- the student encounters an unfamiliar object or technical setup,
- uploads a photo,
- asks what they are seeing,
- asks follow-up questions,
- and may compare another image of the setup.

## 3.2 Primary user goals

**[requirement]**

The primary user should be able to:

1. Understand what is visible.
2. Ask natural-language questions.
3. Ask follow-up questions without repeating the image.
4. Refer to visual objects naturally.
5. Understand visible differences between two states.

## 3.3 Secondary users

**[non-goal for MVP / future consideration]**

Potential future users include:

- researchers,
- field technicians,
- educators,
- accessibility-focused users,
- general consumers.

They are not separate MVP personas and do not justify separate workflows during the hackathon.

## 3.4 User role model

**[decision]**

Phase 1 has one product role:

> **Anonymous Session User**

There is no account-based role hierarchy.

---

# 4. Roles

## 4.1 Anonymous Session User

**[role / decision]**

The anonymous user may:

- create a conversation,
- upload supported images,
- request image analysis,
- ask questions,
- ask follow-up questions,
- upload additional images,
- request comparison,
- view results belonging to the active session,
- clear the active conversation.

## 4.2 Administrator

**[non-goal]**

No administrator-facing application role exists in Phase 1.

Operational monitoring is performed through backend/hosting logs and development tooling rather than a product admin dashboard.

## 4.3 Future role extensibility

**[future consideration]**

A later version may introduce authenticated users, team/shared sessions, organization roles, or administrator permissions. None of these are Phase 1 behavior.

---

# 5. User Journeys

## 5.1 Journey A: Identify + Ask

**[requirement]**

### Goal

Allow the user to upload a visual scene, understand it, and ask natural-language questions.

### Flow

```text
User opens SceneTrace
    ↓
Starts/receives an empty session
    ↓
Uploads image
    ↓
System validates image
    ↓
System analyzes image
    ↓
Scene/object result is available
    ↓
User asks a question
    ↓
System answers using visual context
    ↓
User asks follow-up
    ↓
System preserves relevant context
```

### Success condition

**[acceptance requirement]**

A user can complete multiple related questions about one image without re-uploading the image.

---

## 5.2 Journey C: Identify + Compare

**[requirement]**

### Goal

Explain meaningful visible differences between two images.

### Flow

```text
Image 1
    ↓
Analyze
    ↓
Conversation
    ↓
Upload Image 2
    ↓
Image 2 becomes active
    ↓
User explicitly asks for comparison
    ↓
System compares Image 1 and Image 2
    ↓
Show change categories
```

### Success condition

**[acceptance requirement]**

The user receives a useful comparison containing supported visual changes and explicit uncertainty where correspondence is weak.

---

## 5.3 Journey: Clear conversation

**[requirement]**

```text
Active conversation
    ↓
User selects Clear Conversation
    ↓
Conversation data is removed
    ↓
User sees empty state
```

---

## 5.4 Journey: Retry failure

**[requirement]**

```text
AI request fails
    ↓
User sees retryable message
    ↓
User selects Retry
    ↓
System retries without requiring a fresh upload
```

---

## 5.5 Journey: Ambiguous reference

**[business rule]**

```text
User asks "What is that?"
        ↓
System evaluates possible visual references
        ↓
One clear target?
   YES            NO
    ↓              ↓
Answer       Ask clarification
```

The system must not silently guess when multiple objects are plausible.

---

# 6. Features

## 6.1 Must-have MVP features

**[requirement]**

1. Image upload.
2. Image validation.
3. Automatic image analysis.
4. Scene/object understanding.
5. Natural-language chat.
6. Follow-up conversation.
7. Session-scoped visual context.
8. Explicit two-image comparison.
9. Change categories.
10. Uncertainty handling.
11. Retryable AI failures.
12. Clear conversation.
13. Temporary data retention/deletion.
14. Basic accessible interaction.
15. Basic abuse/security protection.

## 6.2 High-value features

**[decision]**

These should be included if the core Identify + Ask workflow is already reliable:

- approximate object regions/bounding boxes,
- evidence-linked answers,
- observed/inferred/uncertain labels,
- comparison summary,
- partial-success behavior.

## 6.3 Phase 2 features

**[future consideration]**

- object-focused conversation through explicit object selection,
- richer visual memory,
- cross-session memory,
- stronger object identity,
- camera-first mobile workflow,
- voice interaction,
- personalized object tracking,
- domain-specific expert modes,
- retrieval-augmented knowledge,
- richer visual search.

---

# 7. Functional Requirements

## FR-001 Image upload

**[requirement]**

The system shall allow an anonymous session user to upload an image.

### Input policy

**[decision]**

Supported types:

- JPEG
- PNG
- WebP

**[constraint]**

One image is uploaded per upload action.

**[assumption]**

The Phase 1 application-level maximum size is 10 MB.

## FR-002 File validation

**[requirement]**

The server shall validate:

- file type/MIME type,
- file extension,
- file size,
- presence of a valid non-empty file.

Invalid uploads shall be rejected before AI processing.

## FR-003 Automatic analysis

**[requirement]**

After a valid image is accepted, the system shall automatically request multimodal analysis.

The result should attempt to provide:

- a scene description,
- relevant object identification,
- useful attributes,
- visual regions/bounding boxes where supported,
- useful object relationships where supported.

## FR-004 Natural-language question

**[requirement]**

The user shall be able to submit a natural-language question related to the active image.

## FR-005 Follow-up question

**[requirement]**

The user shall be able to submit a follow-up question without re-uploading the image.

## FR-006 Context preservation

**[requirement]**

Follow-up processing shall use relevant context from:

- the active image,
- the extracted visual information,
- and relevant conversation history.

## FR-007 Active image

**[business rule]**

The most recently uploaded image becomes the active image.

## FR-008 Historical images

**[requirement]**

Previous images remain associated with the conversation and remain available for comparison.

They do not automatically become active again.

## FR-009 Ordinary questions after a new upload

**[business rule]**

Ordinary questions after a new upload are primarily interpreted against the current active image.

The application must not automatically combine all historical images into the visual context for every ordinary question.

## FR-010 Explicit comparison

**[requirement]**

The system shall support an explicit comparison request between a previous and current image.

## FR-011 Comparison trigger

**[business rule]**

A comparison is not automatically triggered merely because a second image is uploaded.

The user must explicitly request comparison.

## FR-012 Comparison result

**[requirement]**

The comparison shall attempt to classify meaningful differences as:

- Added
- Removed
- Moved
- Changed
- Unchanged
- Uncertain

## FR-013 Uncertainty

**[requirement]**

The system shall support the conceptual states:

### Observed

Information directly visible in the image.

### Inferred

Information reasoned from visible information.

### Uncertain

Information for which the available visual evidence is insufficient to support a reliable conclusion.

## FR-014 Ambiguous references

**[business rule]**

If a question contains a visual reference that cannot be resolved confidently, the system shall request clarification instead of choosing a target arbitrarily.

## FR-015 No-object result

**[business rule]**

If no useful objects are extracted, the system shall not reject the image solely for that reason.

Normal visual Q&A may remain available.

## FR-016 Unsupported visual question

**[business rule]**

If the image does not contain enough information to answer a question, the system shall communicate that limitation instead of fabricating an answer.

## FR-017 Evidence mapping

**[requirement]**

When an answer can be reliably associated with a detected visual entity or region, the product should expose that relationship.

## FR-018 Missing evidence

**[business rule]**

If an answer cannot be reliably mapped to a visual region, the application may still provide an answer but shall not fabricate a visual location.

## FR-019 Retry

**[requirement]**

Transient processing failures shall expose a retry operation.

The retry should reuse the available conversation/image context rather than requiring an unnecessary re-upload.

## FR-020 Clear conversation

**[requirement]**

The user shall be able to clear the current conversation and its application-managed derived data.

## FR-021 New conversation

**[requirement]**

The user shall be able to start a fresh conversation without accessing earlier conversation history.

## FR-022 Session refresh

**[requirement]**

A normal browser refresh should preserve the active anonymous conversation.

## FR-023 Session expiry

**[decision]**

Inactive session data may expire after 24 hours.

## FR-024 No permanent history

**[non-goal]**

The MVP shall not provide a permanent user conversation library.

---

# 8. Business Rules

## BR-001 One active conversation

**[decision]**

The user operates within an active anonymous conversation.

## BR-002 Current image precedence

**[business rule]**

The latest successfully accepted image is the active image.

## BR-003 Historical image retention within session

**[requirement]**

Previous images remain available as conversation context and for comparison until deletion or expiry.

## BR-004 No automatic comparison

**[business rule]**

Uploading a new image alone does not initiate a comparison request.

## BR-005 Previous/current comparison

**[decision]**

The Phase 1 comparison workflow compares the previous image with the current image.

Arbitrary selection among many historical images is not required.

## BR-006 Ambiguous reference

**[business rule]**

When the system cannot resolve “this,” “that,” “the object on the left,” or similar references with sufficient confidence, it should ask for clarification.

## BR-007 Object identity

**[risk / business rule]**

The system shall not promise perfect real-world object identity across images.

A cross-image match is a visual estimate.

## BR-008 Comparison uncertainty

**[requirement]**

Where an object correspondence is weak, the comparison result must be labeled uncertain.

## BR-009 Movement

**[decision]**

“Moved” is an AI-assisted visual judgment in Phase 1.

No research-grade geometric object-tracking guarantee is provided.

## BR-010 Changed

**[business rule]**

“Changed” means the system believes the same visual entity has a meaningful visible attribute/state difference.

## BR-011 Unchanged

**[business rule]**

“Unchanged” means the system believes the same visual entity remains without a meaningful visible change.

## BR-012 Added

**[business rule]**

“Added” means the current image contains an object with no reasonable visual counterpart in the previous image.

## BR-013 Removed

**[business rule]**

“Removed” means the previous image contains an object with no reasonable visual counterpart in the current image.

## BR-014 General answer versus visual evidence

**[business rule]**

The product must distinguish information directly observed from information inferred from visual context.

## BR-015 Provider failure versus AI uncertainty

**[business rule]**

An uncertain answer is a valid product result, not a provider failure.

Provider fallback is triggered by technical/API failure, not simply by uncertainty.

## BR-016 Clear conversation

**[requirement]**

Clear must remove application-managed conversation data and derived visual data associated with the active conversation.

## BR-017 Session isolation

**[security requirement]**

One anonymous session must not be able to retrieve another session's data.

---

# 9. Data Requirements

## 9.1 Core entities

**[requirement]**

The minimum conceptual data entities are:

1. Conversation
2. Message
3. Image
4. Visual Entity
5. Entity Relation
6. Comparison

## 9.2 Conversation

**[requirement]**

Represents one anonymous visual conversation.

Conceptual information:

- identifier,
- lifecycle state,
- created time,
- last activity time,
- expiry metadata.

## 9.3 Message

**[requirement]**

Represents user/assistant conversational content.

Conceptual information:

- identifier,
- conversation reference,
- role,
- content,
- timestamp,
- optional evidence/entity references,
- processing metadata where useful.

## 9.4 Image

**[requirement]**

Represents an uploaded image associated with the conversation.

Conceptual information:

- identifier,
- conversation reference,
- storage reference,
- filename/metadata where necessary,
- dimensions,
- timestamps,
- active/historical relationship.

## 9.5 Visual Entity

**[requirement]**

Represents a relevant object or scene element extracted from an image.

Conceptual information:

- identifier,
- image reference,
- human-readable label,
- attributes,
- approximate visual region,
- extraction status.

## 9.6 Entity Relation

**[requirement]**

Represents useful visual relationships.

Examples:

- left_of,
- right_of,
- above,
- below,
- near,
- connected_to.

Relations are optional where the AI does not produce reliable information.

## 9.7 Comparison

**[requirement]**

Represents an explicit comparison between two images.

Conceptual information:

- previous image,
- current image,
- categorized changes,
- uncertainty metadata,
- timestamp.

## 9.8 Data ownership

**[decision]**

All MVP data belongs to the anonymous session that created it.

No cross-session access is allowed.

## 9.9 Derived data

**[requirement]**

The following are derived from image/AI processing and belong to their originating session:

- detected objects,
- visual regions,
- attributes,
- relations,
- evidence references,
- comparison results.

## 9.10 Data lifecycle

**[decision]**

Data lifecycle:

```text
Created
  ↓
Active
  ↓
Cleared OR Expired
  ↓
Removed from application storage
```

## 9.11 Retention

**[decision]**

Inactive session data should be eligible for deletion after 24 hours.

## 9.12 Deletion

**[requirement]**

Clear Conversation and session expiry should remove application-managed image records and derived data.

**[risk]**

The team shall not claim deletion from external AI-provider infrastructure beyond what the provider documentation actually guarantees.

---

# 10. Permissions

## 10.1 Permission matrix

**[requirement]**

| Capability                    | Anonymous Session User |                 Admin |
| ----------------------------- | ---------------------: | --------------------: |
| Start conversation            |                    Yes |                   N/A |
| Upload image                  |                    Yes |                   N/A |
| Analyze image                 |                    Yes |                   N/A |
| Ask question                  |                    Yes |                   N/A |
| Follow-up                     |                    Yes |                   N/A |
| Compare images                |                    Yes |                   N/A |
| View current session          |                    Yes |                   N/A |
| Clear current session         |                    Yes |                   N/A |
| Access other sessions         |                     No |                   N/A |
| Modify provider configuration |                     No | No product capability |
| View operational logs         |                     No |       Outside product |
| Admin dashboard               |                     No |          Not provided |

## 10.2 Session isolation

**[security requirement]**

Every read/write operation affecting conversation data must be scoped to the active anonymous session.

---

# 11. Integrations

## 11.1 OpenRouter

**[decision]**

OpenRouter is the primary AI gateway.

Purpose:

- multimodal image processing,
- natural-language reasoning,
- structured response generation,
- provider routing/failover where supported.

## 11.2 Direct Gemini

**[decision]**

Direct Gemini access is the emergency fallback when the application cannot successfully complete the request through OpenRouter because of provider/API-level failure.

## 11.3 AI model strategy

**[preference]**

Use one tested primary multimodal model for predictable MVP behavior.

Keep the chosen model configurable rather than embedding the provider/model name throughout application logic.

## 11.4 AI response normalization

**[requirement]**

The frontend shall not depend directly on provider-specific response formats.

The backend should normalize responses into a product-level representation conceptually containing:

- answer,
- visual objects where available,
- evidence references where available,
- uncertainty,
- comparison result where applicable,
- internal provider metadata for operations.

## 11.5 Other external services

**[non-goal]**

Phase 1 does not require:

- web search,
- RAG,
- maps,
- vector databases,
- Redis,
- Kafka,
- microservices,
- external recommendation engines.

## 11.6 External image/storage service

**[preference]**

Temporary managed object storage is preferred for deployed images because images need to survive normal refreshes and support comparison within the session.

---

# 12. Notifications

## 12.1 Product notifications

**[non-goal]**

No email notifications.

No push notifications.

No notification center.

No browser notification requirement.

## 12.2 Processing feedback

**[requirement]**

Interactive processing feedback is provided directly in the active conversation instead of through notifications.

Examples:

- Uploading…
- Analyzing image…
- Generating answer…
- Comparing images…

---

# 13. Search / Filtering / Sorting

## 13.1 Conversation search

**[non-goal]**

No global conversation search.

## 13.2 Object search

**[non-goal]**

No separate object search engine.

## 13.3 Filtering

**[non-goal]**

No dashboard filtering.

## 13.4 Sorting

**[non-goal]**

No user-facing sorting capability beyond natural conversation chronology.

## 13.5 Future consideration

**[future consideration]**

Search/filtering may become useful if persistent multi-session visual memory is introduced.

---

# 14. Error / Loading / Empty States

## 14.1 Empty state

**[requirement]**

Initial state should clearly communicate:

```text
Upload an image
        ↓
Understand it
        ↓
Ask questions
```

There should be no fake prior conversation.

## 14.2 Upload loading

**[requirement]**

Show that the image is being uploaded.

Prevent duplicate submission for the same operation.

## 14.3 AI analysis loading

**[requirement]**

Show an explicit analysis state.

Example:

> “Analyzing image…”

## 14.4 Chat loading

**[requirement]**

Show that a response is being generated.

## 14.5 Comparison loading

**[requirement]**

Show that two images are being compared.

## 14.6 Successful analysis

**[requirement]**

A successful image analysis should make available, where produced:

- image,
- scene summary,
- relevant objects,
- visual regions,
- chat interaction.

## 14.7 Partial success

**[requirement]**

If textual visual Q&A works but structured object extraction fails, the product should keep normal chat usable.

Unavailable object/evidence capabilities should be clearly indicated.

## 14.8 Invalid file

**[error behavior]**

Show:

- reason for rejection,
- supported formats,
- file-size constraint if relevant,
- retry/upload action.

## 14.9 AI timeout

**[error behavior]**

Show a temporary processing failure with retry.

Do not require unnecessary image re-upload.

## 14.10 OpenRouter failure

**[error behavior]**

Attempt the configured Gemini fallback if the failure matches the fallback policy.

## 14.11 Both providers fail

**[error behavior]**

Show a clear retryable failure.

If explicitly enabled for the hackathon demo, Demo Fallback Mode may be used separately.

## 14.12 Invalid structured AI response

**[error behavior]**

Validate structured data.

If structured data is unusable:

- do not render malformed object information,
- retain a safe textual path where possible,
- otherwise show a retryable/limited result.

## 14.13 Insufficient evidence

**[business rule]**

The assistant should say that the image does not provide enough evidence rather than inventing a confident answer.

## 14.14 No visual evidence mapping

**[business rule]**

An answer can exist without localized evidence, but the product must not create a fake highlight.

## 14.15 Session expired

**[error behavior]**

If an expired conversation is requested, show a clean message and provide a path to start a new conversation.

## 14.16 Storage failure

**[risk / error behavior]**

If image storage fails:

- do not claim the upload succeeded,
- avoid sending an invalid storage reference to the AI workflow,
- provide retry.

## 14.17 Database failure

**[risk / error behavior]**

If persistence fails:

- do not display persisted-state success as if it occurred,
- surface a recoverable error,
- preserve temporary client state when practical for retry.

---

# 15. Non-Functional Requirements

## 15.1 Usability

**[requirement]**

The core flow should be understandable without training:

```text
Upload → Analyze → Ask → Follow up → Compare
```

## 15.2 Simplicity

**[preference]**

The MVP should minimize user decisions and configuration.

## 15.3 Maintainability

**[requirement]**

The application should maintain clear boundaries between:

- product behavior,
- AI integration,
- persistence,
- session handling,
- and UI state.

## 15.4 Configurability

**[requirement]**

Provider keys, model names, database connection, storage settings, rate limits and retention settings must be configurable outside source code.

## 15.5 Privacy

**[requirement]**

Images should not be retained longer than necessary for the MVP.

## 15.6 Portability

**[preference]**

The application should remain runnable locally if the hosted deployment fails.

## 15.7 Observability

**[requirement]**

Operational failures must produce logs sufficient to diagnose:

- operation,
- provider path,
- latency,
- result category,
- error category,
- request/trace identifier.

Raw uploaded images should not be unnecessarily logged.

## 15.8 No provider coupling in UI

**[requirement]**

Changing the upstream AI route should not require changes to normal user-facing product behavior.

---

# 16. Accessibility

## 16.1 MVP accessibility baseline

**[requirement]**

The MVP should support:

- keyboard-accessible controls,
- semantic buttons and form controls,
- visible focus states,
- readable text,
- reasonable color contrast,
- meaningful labels,
- accessible status messages,
- descriptive labels for image-related controls where applicable.

## 16.2 Screen-reader behavior

**[requirement]**

Important user-facing content such as:

- upload control,
- processing state,
- chat messages,
- comparison results,
- object labels,
- clear/retry actions

should have meaningful accessible names or text.

## 16.3 Voice

**[non-goal]**

Speech input and text-to-speech are not required in Phase 1.

## 16.4 Accessibility limitation

**[risk]**

A 24-hour hackathon MVP is not being represented as fully WCAG-certified.

The goal is a practical accessibility baseline, not formal certification.

---

# 17. Security

## 17.1 Secret protection

**[security requirement]**

OpenRouter and Gemini API credentials must remain server-side.

No AI provider key may be embedded in the frontend bundle.

## 17.2 Environment secrets

**[requirement]**

Secrets and deployment-specific configuration must use environment/deployment secret management.

## 17.3 Input validation

**[security requirement]**

The backend must validate uploaded images before processing.

## 17.4 SQL injection protection

**[security requirement]**

Database operations must use parameterized queries or a database abstraction that prevents direct SQL injection from user input.

## 17.5 CORS

**[security requirement]**

Cross-origin access should be restricted to the deployed frontend origin(s) where practical.

## 17.6 Rate limiting

**[requirement]**

Anonymous users should have a configurable AI request rate limit.

**[assumption]**

A starting configuration of approximately 20 AI operations per session per 10 minutes is acceptable for the hackathon and may be adjusted based on provider limits/cost.

## 17.7 Prompt injection from images

**[security requirement]**

Text contained inside uploaded images must be treated as untrusted visual content.

The system must not treat arbitrary visible text as instructions that override the application's own instructions or security policy.

## 17.8 Session isolation

**[security requirement]**

A session must not be able to access another session's images, messages, entities, or comparisons.

## 17.9 Sensitive image warning

**[requirement]**

The product should clearly warn users not to upload highly sensitive, confidential, or private material that they should not send to an external AI processing service.

## 17.10 Privacy disclosure

**[requirement]**

The MVP should disclose that uploaded images are processed through an external AI service.

## 17.11 Security non-goals

**[non-goal]**

No enterprise IAM, SSO, RBAC framework, penetration-test certification, or zero-trust infrastructure is required during the 24-hour hackathon.

---

# 18. Performance

## 18.1 Image analysis target

**[performance requirement]**

Target normal end-to-end image analysis at:

> **under 10 seconds**

**[acceptable range]**

Up to approximately 20 seconds may be accepted during live operation, provided the UI communicates progress.

## 18.2 Follow-up chat target

**[performance requirement]**

Target normal follow-up responses at:

> **under 8 seconds**

Up to approximately 15 seconds may be accepted before a retryable failure/timeout path is shown.

## 18.3 Comparison target

**[performance requirement]**

Comparison should target approximately the same interactive range as image analysis and should not require unnecessary repeated analysis of unchanged data.

## 18.4 Upload performance

**[requirement]**

Uploads should provide progress/processing feedback rather than leaving the user with an unresponsive interface.

## 18.5 Duplicate requests

**[requirement]**

The client should prevent obvious duplicate submissions while an identical operation is in progress.

## 18.6 Concurrent users

**[constraint]**

Phase 1 only needs to handle a small number of simultaneous hackathon/demo users.

The MVP is not required to support production-scale concurrency.

## 18.7 Cost-aware performance

**[requirement]**

The system should avoid sending all historical images and full histories to the AI provider for every turn when relevant, smaller context is sufficient.

This reduces latency and AI usage cost.

---

# 19. Reliability

## 19.1 Primary AI path

**[decision]**

```text
Application
    ↓
OpenRouter
    ↓
Configured primary multimodal model/provider
```

## 19.2 Provider failover

**[preference / dependency decision]**

Use OpenRouter's available provider-routing/failover capability rather than implementing custom provider routing from scratch.

## 19.3 Emergency fallback

**[decision]**

If the OpenRouter request fails at the API/provider level, the backend may attempt the direct Gemini fallback.

## 19.4 Fallback conditions

**[business rule]**

Fallback is appropriate for:

- timeout,
- connection failure,
- provider/API error,
- provider unavailable,
- rate-limit/provider-level failure.

Fallback is not required merely because the model's answer is uncertain.

## 19.5 Provider-neutral response

**[requirement]**

Regardless of the provider path, the backend should normalize output into the product's expected semantic result.

## 19.6 Structured-output validation

**[requirement]**

Structured AI results must be validated before being stored or rendered as structured product information.

## 19.7 Demo fallback

**[risk-control / preference]**

A clearly labeled demo fallback should exist for the final hackathon presentation.

It may provide prevalidated results for known demo images when both live AI paths are unavailable.

It must not be misrepresented as a live AI operation.

## 19.8 Local fallback

**[risk-control]**

The team should retain a runnable local version of the application.

## 19.9 Graceful degradation

**[requirement]**

One failed subsystem should not unnecessarily disable unrelated functionality.

Examples:

- failed object extraction should not automatically disable basic chat,
- missing evidence localization should not automatically disable an answer,
- temporary AI failure should not delete the user's conversation.

---

# 20. Analytics

## 20.1 Analytics scope

**[decision]**

Phase 1 uses only basic anonymous product event logging.

## 20.2 Events

**[requirement]**

Useful events may include:

- `image_uploaded`
- `analysis_started`
- `analysis_success`
- `analysis_failed`
- `question_asked`
- `comparison_requested`
- `comparison_completed`
- `evidence_viewed`
- `retry_clicked`
- `conversation_cleared`

## 20.3 Analytics limitations

**[privacy requirement]**

Analytics should not require personally identifying user data.

## 20.4 Operational metrics

**[requirement]**

Backend logs should also make it possible to measure:

- AI latency,
- provider path,
- fallback frequency,
- failure category,
- comparison latency.

## 20.5 Analytics non-goals

**[non-goal]**

No advanced BI dashboard, cohort analysis, personalization analytics, or commercial conversion funnel is required.

---

# 21. Administration

## 21.1 Admin product

**[non-goal]**

No admin UI is required for Phase 1.

## 21.2 Operational administration

**[requirement]**

The development team should be able to:

- inspect server logs,
- inspect error identifiers,
- rotate API keys,
- modify environment configuration,
- verify storage/database health.

These actions are operational concerns, not end-user product features.

## 21.3 Future administration

**[future consideration]**

A later version may add:

- usage monitoring,
- abuse controls,
- user/session investigation,
- provider cost monitoring,
- model configuration,
- retention management.

These are not Phase 1 requirements.

---

# 22. Deployment Constraints

## 22.1 Public demo

**[decision]**

The application should have a public live URL for judging.

## 22.2 Local fallback

**[decision]**

A local runnable version must also be maintained.

## 22.3 Frontend/backend separation

**[constraint]**

The architecture remains:

```text
React frontend
    ↓
Express/Node backend
    ↓
PostgreSQL
    +
Temporary image storage
    +
OpenRouter / Gemini
```

## 22.4 Hosting simplicity

**[preference]**

Choose straightforward managed hosting rather than infrastructure-heavy deployment.

A practical implementation may use Vercel for the frontend, Render or comparable managed hosting for the Node/Express backend, and a managed PostgreSQL/storage provider.

## 22.5 GitHub

**[constraint]**

Project code and documentation must be maintained in Git according to the hackathon requirement.

## 22.6 Environment configuration

**[requirement]**

Environment-specific values must not be hard-coded.

## 22.7 Deployment timing

**[risk-control]**

The team should deploy an early working version instead of waiting until the last stage of the hackathon.

## 22.8 External dependency assumption

**[assumption]**

The live demo assumes internet connectivity and access to configured AI providers.

---

# 23. Non-Goals

The following are explicitly outside Phase 1.

## 23.1 Account systems

**[non-goal]**

- signup,
- login,
- password reset,
- social authentication,
- user profile.

## 23.2 Long-term memory

**[non-goal]**

- permanent visual memory,
- cross-session user memory,
- personal object libraries.

## 23.3 Advanced AI

**[non-goal]**

- custom training,
- fine-tuning,
- custom computer-vision research,
- calibrated probabilistic confidence system.

## 23.4 Additional interfaces

**[non-goal]**

- native Android/iOS app,
- mandatory camera workflow,
- voice assistant.

## 23.5 Enterprise infrastructure

**[non-goal]**

- microservices,
- Kubernetes,
- Kafka,
- Redis,
- service mesh,
- complex event processing.

## 23.6 Knowledge retrieval

**[non-goal]**

- web search,
- RAG,
- vector database,
- knowledge graph platform.

The product may internally model simple visual relations, but that does not constitute a general-purpose knowledge graph.

## 23.7 Administrative platform

**[non-goal]**

No admin dashboard.

## 23.8 Discoverability features

**[non-goal]**

- global search,
- filtering,
- sorting,
- saved libraries,
- favorites.

## 23.9 Notification system

**[non-goal]**

No push/email/browser notification infrastructure.

## 23.10 Safety-critical positioning

**[non-goal]**

The product must not be positioned as a professional replacement for medical, legal, industrial safety, or other regulated expert judgment.

---

# 24. Acceptance Criteria

Acceptance criteria are written against the Phase 1 MVP.

## AC-001 Image upload

**[acceptance requirement]**

**Given** the user is in an active conversation  
**When** they upload a valid JPEG/PNG/WebP image under the configured size limit  
**Then** the system accepts it and begins processing.

## AC-002 Invalid image

**[acceptance requirement]**

**Given** an unsupported or oversized file  
**When** the user attempts upload  
**Then** the system rejects it before AI processing and explains why.

## AC-003 Automatic analysis

**[acceptance requirement]**

**Given** a valid image  
**When** analysis succeeds  
**Then** the system displays useful scene/object information and enables chat.

## AC-004 Basic visual Q&A

**[acceptance requirement]**

**Given** an analyzed image  
**When** the user asks a relevant natural-language question  
**Then** the system returns an answer grounded in the available image/context.

## AC-005 Follow-up context

**[acceptance requirement]**

**Given** the user has asked an initial question  
**When** they ask a related follow-up without re-uploading  
**Then** the system uses relevant prior context.

## AC-006 Ambiguous reference

**[acceptance requirement]**

**Given** multiple objects could match the user's reference  
**When** the user asks an ambiguous question  
**Then** the system requests clarification instead of selecting arbitrarily.

## AC-007 No evidence

**[acceptance requirement]**

**Given** the image does not contain sufficient evidence  
**When** the user asks a question requiring unavailable visual information  
**Then** the system explicitly communicates that limitation.

## AC-008 Uncertainty

**[acceptance requirement]**

**Given** a conclusion is inferred or uncertain  
**When** the system answers  
**Then** it distinguishes that state from direct observation.

## AC-009 Second image

**[acceptance requirement]**

**Given** an active conversation with Image 1  
**When** the user uploads Image 2  
**Then** Image 2 becomes active and Image 1 remains associated with the conversation.

## AC-010 No automatic compare

**[acceptance requirement]**

**Given** Image 2 has been uploaded  
**When** the user has not requested comparison  
**Then** the system does not automatically initiate a comparison.

## AC-011 Compare

**[acceptance requirement]**

**Given** Image 1 and Image 2 exist in the same conversation  
**When** the user explicitly requests comparison  
**Then** the system produces a comparison result.

## AC-012 Comparison categories

**[acceptance requirement]**

**Given** comparison succeeds  
**Then** the result may identify Added, Removed, Moved, Changed, Unchanged and/or Uncertain entities.

## AC-013 Comparison uncertainty

**[acceptance requirement]**

**Given** cross-image correspondence is weak  
**Then** the system marks the comparison as uncertain rather than presenting the correspondence as guaranteed.

## AC-014 Evidence

**[acceptance requirement]**

**Given** an answer can be associated with a visual region  
**Then** the user can access the related evidence representation.

## AC-015 No fabricated evidence

**[acceptance requirement]**

**Given** no reliable region can be identified  
**Then** the UI does not fabricate a bounding/highlight region.

## AC-016 Retry

**[acceptance requirement]**

**Given** a transient AI/API failure  
**When** the user selects Retry  
**Then** the system retries using available request context without unnecessary re-upload.

## AC-017 Provider fallback

**[acceptance requirement]**

**Given** OpenRouter fails at an eligible API/provider level  
**When** fallback is configured and available  
**Then** the backend attempts the direct Gemini path.

## AC-018 Both-provider failure

**[acceptance requirement]**

**Given** both primary and fallback AI routes fail  
**Then** the user receives a clear retryable error.

## AC-019 Conversation persistence across refresh

**[acceptance requirement]**

**Given** an active conversation  
**When** the browser is refreshed normally  
**Then** the active conversation can be restored.

## AC-020 Session isolation

**[acceptance requirement]**

**Given** two different anonymous sessions  
**When** either session requests data  
**Then** it can access only its own conversation data.

## AC-021 Clear conversation

**[acceptance requirement]**

**Given** an active conversation  
**When** the user clears it  
**Then** messages, images, visual entities, relations and comparisons associated with it are removed from application storage.

## AC-022 Expiry

**[acceptance requirement]**

**Given** a conversation has exceeded the defined inactive retention period  
**When** cleanup executes  
**Then** its application-managed data becomes eligible for removal and is no longer available as active session data.

## AC-023 API secrets

**[acceptance requirement]**

**Given** the production application is running  
**Then** provider API keys are not exposed to the browser/client.

## AC-024 Accessibility baseline

**[acceptance requirement]**

**Given** a keyboard-only user  
**When** they operate core upload/chat/clear/retry actions  
**Then** the controls are reachable and usable through keyboard interaction.

## AC-025 Operational observability

**[acceptance requirement]**

**Given** a significant backend/AI failure  
**Then** the team can identify the operation, error category, provider path and request/trace identifier through logs.

## AC-026 Live demo

**[acceptance requirement]**

**Given** the deployed environment and external services are available  
**Then** the complete Identify + Ask + Compare demo can be executed end-to-end without manual database intervention.

---

# 25. Risks

## R-001 AI hallucination

**[risk]**

### Impact

The model may give an incorrect visual interpretation.

### Mitigation

- uncertainty handling,
- evidence distinction,
- conservative wording,
- structured validation,
- no fabricated confidence.

---

## R-002 Object correspondence error

**[risk]**

### Impact

Two visually similar objects may be incorrectly considered the same.

### Mitigation

- mark weak correspondence as Uncertain,
- avoid promising perfect identity,
- use simple comparison semantics in MVP.

---

## R-003 OpenRouter outage

**[risk]**

### Impact

Primary AI path becomes unavailable.

### Mitigation

- OpenRouter provider failover,
- direct Gemini fallback,
- retry.

---

## R-004 Gemini fallback failure

**[risk]**

### Impact

Both live AI paths may fail.

### Mitigation

- clear retry,
- known-good demo fallback,
- local runnable build.

---

## R-005 AI response schema failure

**[risk]**

### Impact

The application may receive structurally unusable output.

### Mitigation

- structured output,
- server-side validation,
- safe textual fallback where appropriate.

---

## R-006 Latency

**[risk]**

### Impact

Judges may perceive the system as slow.

### Mitigation

- use a fast multimodal model,
- avoid unnecessary historical context,
- show informative loading states,
- keep comparison explicit,
- avoid duplicate requests.

---

## R-007 AI cost

**[risk]**

### Impact

Repeated image processing may increase API costs.

### Mitigation

- session-scoped state,
- reuse extracted scene information,
- avoid automatic comparison,
- avoid sending irrelevant history,
- configure rate limits.

---

## R-008 Upload abuse

**[risk]**

### Impact

Anonymous public deployment may be abused.

### Mitigation

- file validation,
- upload size limit,
- anonymous rate limit,
- temporary retention,
- external-provider disclosure.

---

## R-009 Sensitive image exposure

**[risk]**

### Impact

Users could upload private or confidential information.

### Mitigation

- disclosure before processing,
- warning against sensitive uploads,
- short retention,
- explicit deletion,
- no unnecessary logging of image content.

---

## R-010 Storage failure

**[risk]**

### Impact

Images may not persist correctly for the active session.

### Mitigation

- managed storage,
- upload validation,
- retry,
- clear state transitions,
- deployment health testing.

---

## R-011 Database failure

**[risk]**

### Impact

Conversation context may not persist.

### Mitigation

- hosted managed database,
- basic health monitoring,
- local fallback,
- retry behavior.

---

## R-012 Deployment failure

**[risk]**

### Impact

Judges cannot access the product.

### Mitigation

- deploy early,
- keep local copy,
- test production separately,
- maintain demo fallback.

---

## R-013 Time overrun

**[risk]**

### Impact

Team spends too much time on WOW features and fails to finish the core problem.

### Mitigation

Build order:

```text
Identify + Ask
    ↓
Reliable persistence/context
    ↓
Compare
    ↓
Evidence
    ↓
Polish
```

Phase 2 features must not block Phase 1 completion.

---

## R-014 Third-party API changes

**[risk]**

### Impact

Model output shape, availability, model names, or limits may change.

### Mitigation

- configurable model identifier,
- normalized internal response format,
- provider isolation,
- current-documentation checks before final deployment.

---

## R-015 Misleading product positioning

**[risk]**

### Impact

Judges may view the project as a generic wrapper around an existing multimodal model.

### Mitigation

Emphasize application-level differentiation:

- conversational visual context,
- evidence linkage,
- explicit comparison,
- uncertainty.

Do not claim to have invented image understanding itself.

---

# 26. Future Considerations

## 26.1 Phase 2: Object-focused conversation

**[future consideration]**

Allow users to select an object in the image and explicitly make it the conversational focus.

Example:

```text
Select object
    ↓
"Tell me more about this."
```

This directly extends the entity model already introduced in Phase 1.

---

## 26.2 Phase 2: Richer visual memory

**[future consideration]**

Move from single-session memory toward persistent user-controlled visual history.

Potential future capability:

```text
Yesterday
   ↓
Object O1

Today
   ↓
Recognize / compare O1
```

This requires stronger identity rules and a privacy model.

---

## 26.3 Phase 3: Stronger object identity

**[future consideration]**

Develop more reliable cross-image correspondence using:

- vision embeddings,
- visual similarity,
- spatial reasoning,
- user confirmation,
- domain-specific recognition.

The system should still be cautious about claiming actual real-world identity.

---

## 26.4 Phase 3: Mobile/camera-first experience

**[future consideration]**

Support:

- mobile upload,
- camera capture,
- near-real-time visual interaction.

This is intentionally postponed until the desktop MVP demonstrates value.

---

## 26.5 Voice interaction

**[future consideration]**

Potential capabilities:

- speech-to-text questions,
- spoken visual answers,
- hands-free object interrogation.

Voice is not part of Phase 1.

---

## 26.6 Domain-specific modes

**[future consideration]**

The general visual engine could later provide specialized modes for:

- education,
- electronics,
- laboratory environments,
- field maintenance,
- accessibility,
- retail/product understanding.

Specialization should only be pursued when a target domain provides a clear user-value advantage over the general system.

---

## 26.7 Persistent personal visual memory

**[future consideration]**

A future authenticated version could let users retain their own visual history.

Potential controls:

- per-conversation retention,
- delete specific images,
- delete all data,
- opt-in memory,
- memory expiration,
- user-visible provenance.

---

## 26.8 Knowledge retrieval

**[future consideration]**

After visual identification, a future version could retrieve trusted external information.

For example:

```text
Image
 ↓
Recognize component
 ↓
Retrieve documentation
 ↓
Answer question
```

This should only be introduced when the base visual understanding is reliable enough to justify retrieval.

---

## 26.9 Scalable architecture

**[future consideration]**

If real user adoption occurs, the product may later require:

- authenticated sessions,
- object storage lifecycle automation,
- background jobs,
- queues,
- caching,
- observability,
- model routing,
- cost controls,
- multi-tenant isolation.

These are intentionally postponed.

---

## 26.10 Product success metrics after hackathon

**[future consideration]**

Potential future product metrics:

- successful image-analysis rate,
- question-answer completion rate,
- follow-up completion rate,
- comparison usefulness,
- clarification frequency,
- user correction rate,
- AI failure rate,
- average latency,
- AI cost per successful session,
- repeat usage.

The team should validate which metrics actually matter before building a production analytics system.

---

# Final Phase 1 Product Contract

## In scope

**[decision / requirement]**

SceneTrace Phase 1 provides:

```text
Anonymous session
      ↓
Image upload
      ↓
Validation
      ↓
Automatic multimodal analysis
      ↓
Scene/object understanding
      ↓
Natural-language Q&A
      ↓
Follow-up conversation
      ↓
Session-scoped visual context
      ↓
Upload second image
      ↓
Explicit previous-vs-current comparison
      ↓
Added / Removed / Moved / Changed / Unchanged / Uncertain
      ↓
Observed / Inferred / Uncertain answer semantics
      ↓
Evidence linkage where reliable
      ↓
Retry/fallback
      ↓
Clear / expiry
```

## Out of scope

**[non-goal]**

```text
Authentication
Permanent memory
Native mobile app
Voice
Video
PDF
Custom ML training
Fine-tuning
RAG
Web search
Vector DB
Redis
Kafka
Microservices
Admin dashboard
Global search
Advanced analytics
Enterprise-scale deployment
```

## MVP prioritization

**[decision]**

The implementation order is:

### P0 - Absolutely required

```text
Image upload
AI analysis
Natural-language Q&A
Follow-up conversation
Session persistence
```

### P1 - Required for the differentiated MVP

```text
Second image
Explicit comparison
Change categories
Uncertainty
Fallback/retry
```

### P2 - High-value polish

```text
Object regions
Evidence linking
Comparison visualization
Accessibility polish
Operational logging
```

### P3 - Future

```text
Object-focused conversation
Persistent memory
Camera
Voice
Personalized object identity
Domain modes
RAG
Scale infrastructure
```

## Product success definition

**[decision]**

The Phase 1 MVP is considered successful when a judge can:

1. Upload a realistic image.
2. See useful image/scene understanding.
3. Ask a natural-language question.
4. Ask a meaningful follow-up without repeating the image.
5. Upload a second image.
6. Explicitly ask what changed.
7. Receive a useful visual comparison.
8. See uncertainty where the system cannot reliably determine something.
9. Recover from a provider failure through fallback/retry.
10. Clear the conversation.

The final product should demonstrate:

> **Problem → Visual Input → Intelligence → Conversation → Comparison → Trust → Impact**

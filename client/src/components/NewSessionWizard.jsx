import { useState } from 'react';

export default function NewSessionWizard({ onStartSession, onCancel }) {
  const [step, setStep] = useState(1);
  const [question, setQuestion] = useState('What objects are visible in this image?');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analysisType, setAnalysisType] = useState('General Understanding');
  const [detailLevel, setDetailLevel] = useState('Balanced');
  const [focusArea, setFocusArea] = useState('Auto-detect');

  const suggestedQuestions = [
    'What objects are visible?',
    'What is this object?',
    'What is it used for?',
    'Describe the scene',
    'What is beside the laptop?',
    'Is there any text visible?',
    'Compare with another image later',
  ];

  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        dimensions: '1920 × 1080',
        previewUrl: URL.createObjectURL(file),
        file,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onStartSession) {
      onStartSession({
        question,
        uploadedFile,
        settings: { analysisType, detailLevel, focusArea },
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[var(--color-surface-canvas)] overflow-y-auto p-6 space-y-6">
      {/* BREADCRUMB & HEADER */}
      <div className="space-y-1">
        <div className="text-xs text-[var(--color-neutral-500)] font-medium flex items-center gap-1.5">
          <span>Home</span>
          <span>&gt;</span>
          <span className="text-[var(--color-neutral-800)] font-semibold">New Session</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-neutral-900)]">New Session</h1>
            <p className="text-xs text-[var(--color-neutral-600)]">
              Upload an image and tell us what you want to know. Get clear, evidence-backed answers.
            </p>
          </div>

          <button className="px-3.5 py-1.5 rounded-lg border border-[var(--color-neutral-300)] hover:bg-[var(--color-neutral-100)] text-xs font-semibold text-[var(--color-blue-600)] flex items-center gap-1.5 bg-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Learn how it works
          </button>
        </div>
      </div>

      {/* STEPPER HEADER */}
      <div className="flex items-center gap-4 border-b border-[var(--color-neutral-200)] pb-4 text-xs font-semibold text-[var(--color-neutral-600)]">
        <div className="flex items-center gap-2 text-[var(--color-blue-600)] font-bold">
          <span className="w-6 h-6 rounded-full bg-[var(--color-blue-600)] text-white flex items-center justify-center text-xs">
            1
          </span>
          <span>Upload & Describe</span>
        </div>
        <div className="w-16 h-px bg-neutral-300" />
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center text-xs">
            2
          </span>
          <span>Analysis Settings</span>
        </div>
        <div className="w-16 h-px bg-neutral-300" />
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center text-xs">
            3
          </span>
          <span>Review & Start</span>
        </div>
      </div>

      {/* TWO COLUMN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: 3 WIZARD CARDS */}
        <div className="lg:col-span-2 space-y-6">
          {/* CARD 1: UPLOAD IMAGE */}
          <div className="p-5 rounded-2xl bg-[var(--color-surface-default)] border border-[var(--color-neutral-200)] shadow-xs space-y-4">
            <div className="flex items-center gap-2 font-bold text-sm text-[var(--color-neutral-900)]">
              <span className="w-6 h-6 rounded-full bg-[var(--color-blue-600)] text-white flex items-center justify-center text-xs font-bold">
                1
              </span>
              <div>
                <h2>Upload Image</h2>
                <p className="text-xs font-normal text-[var(--color-neutral-500)]">
                  Add a clear image of the object, setup or scene you want to understand.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* DROPZONE */}
              <label className="border-2 border-dashed border-[var(--color-neutral-300)] hover:border-[var(--color-blue-500)] rounded-xl p-6 bg-blue-50/20 hover:bg-blue-50/50 flex flex-col items-center justify-center text-center cursor-pointer transition-all">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="font-bold text-xs text-[var(--color-neutral-900)]">
                  Drag and drop an image here
                </span>
                <span className="text-[11px] text-[var(--color-blue-600)] font-medium">or click to browse</span>
                <span className="text-[10px] text-[var(--color-neutral-400)] mt-2">
                  Supports JPG, PNG, WEBP (max 10MB)
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={handleFileDrop} />
              </label>

              {/* UPLOAD PREVIEW CARD */}
              {uploadedFile && (
                <div className="p-3 rounded-xl border border-[var(--color-neutral-200)] bg-[var(--color-neutral-50)] space-y-2 relative">
                  <div className="relative rounded-lg overflow-hidden h-32 bg-neutral-200 border border-neutral-300">
                    <img src={uploadedFile.previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setUploadedFile(null)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center text-xs hover:bg-black"
                    >
                      ✕
                    </button>
                  </div>

                  <div>
                    <div className="font-bold text-xs text-[var(--color-neutral-900)] truncate">
                      {uploadedFile.name}
                    </div>
                    <div className="text-[11px] text-[var(--color-neutral-500)]">
                      {uploadedFile.size} • {uploadedFile.dimensions}
                    </div>
                  </div>

                  <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Image uploaded successfully</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CARD 2: YOUR QUESTION */}
          <div className="p-5 rounded-2xl bg-[var(--color-surface-default)] border border-[var(--color-neutral-200)] shadow-xs space-y-4">
            <div className="flex items-center gap-2 font-bold text-sm text-[var(--color-neutral-900)]">
              <span className="w-6 h-6 rounded-full bg-[var(--color-blue-600)] text-white flex items-center justify-center text-xs font-bold">
                2
              </span>
              <div>
                <h2>Your Question</h2>
                <p className="text-xs font-normal text-[var(--color-neutral-500)]">
                  Ask a specific question or choose a suggestion. You can ask follow-up questions later.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={3}
                  maxLength={500}
                  className="w-full p-3 text-xs font-medium text-[var(--color-neutral-900)] border border-[var(--color-neutral-300)] rounded-xl outline-none focus:border-[var(--color-blue-600)] bg-white resize-none"
                />
                <span className="absolute bottom-2 right-3 text-[10px] text-[var(--color-neutral-400)] font-mono">
                  {question.length}/500
                </span>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-[var(--color-neutral-500)]">
                  Try a suggested question
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedQuestions.map((sq, sqIdx) => (
                    <button
                      key={sqIdx}
                      type="button"
                      onClick={() => setQuestion(sq)}
                      className="px-2.5 py-1 rounded-lg bg-[var(--color-neutral-100)] hover:bg-blue-50 hover:text-blue-700 text-[11px] font-medium text-[var(--color-neutral-700)] border border-neutral-200 transition-colors"
                    >
                      {sq}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CARD 3: ANALYSIS SETTINGS (OPTIONAL) */}
          <div className="p-5 rounded-2xl bg-[var(--color-surface-default)] border border-[var(--color-neutral-200)] shadow-xs space-y-4">
            <div className="flex items-center gap-2 font-bold text-sm text-[var(--color-neutral-900)]">
              <span className="w-6 h-6 rounded-full bg-[var(--color-blue-600)] text-white flex items-center justify-center text-xs font-bold">
                3
              </span>
              <div>
                <h2>Analysis Settings <span className="font-normal text-[var(--color-neutral-500)]">(Optional)</span></h2>
                <p className="text-xs font-normal text-[var(--color-neutral-500)]">
                  Customize the analysis based on your goal.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-[var(--color-neutral-700)] mb-1">
                  Analysis Type
                </label>
                <select
                  value={analysisType}
                  onChange={(e) => setAnalysisType(e.target.value)}
                  className="w-full p-2 border border-[var(--color-neutral-300)] rounded-lg bg-white outline-none focus:border-[var(--color-blue-600)]"
                >
                  <option>General Understanding</option>
                  <option>Technical Setup</option>
                  <option>Object Identification</option>
                </select>
                <span className="text-[10px] text-[var(--color-neutral-500)] mt-1 block">
                  Identify and explain objects, setup and scene details.
                </span>
              </div>

              <div>
                <label className="block font-semibold text-[var(--color-neutral-700)] mb-1">
                  Level of Detail
                </label>
                <select
                  value={detailLevel}
                  onChange={(e) => setDetailLevel(e.target.value)}
                  className="w-full p-2 border border-[var(--color-neutral-300)] rounded-lg bg-white outline-none focus:border-[var(--color-blue-600)]"
                >
                  <option>Balanced</option>
                  <option>High Detail</option>
                  <option>Overview</option>
                </select>
                <span className="text-[10px] text-[var(--color-neutral-500)] mt-1 block">
                  Good mix of overview and details.
                </span>
              </div>

              <div>
                <label className="block font-semibold text-[var(--color-neutral-700)] mb-1">
                  Focus Area <span className="font-normal text-neutral-400">(Optional)</span>
                </label>
                <select
                  value={focusArea}
                  onChange={(e) => setFocusArea(e.target.value)}
                  className="w-full p-2 border border-[var(--color-neutral-300)] rounded-lg bg-white outline-none focus:border-[var(--color-blue-600)]"
                >
                  <option>Auto-detect</option>
                  <option>Main Object</option>
                  <option>Background</option>
                </select>
                <span className="text-[10px] text-[var(--color-neutral-500)] mt-1 block">
                  Let the system find the important parts.
                </span>
              </div>
            </div>
          </div>

          {/* WIZARD BOTTOM ACTIONS */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-xl border border-[var(--color-neutral-300)] hover:bg-[var(--color-neutral-100)] text-xs font-semibold text-[var(--color-neutral-700)] bg-white transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl bg-[var(--color-blue-600)] hover:bg-[var(--color-blue-700)] active:bg-[var(--color-blue-800)] text-white font-bold text-xs flex items-center gap-2 shadow-sm focus-ring transition-colors"
            >
              <span>Start Analysis</span>
              <span className="text-base font-bold">→</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: HELP & INFO SIDEBAR */}
        <div className="space-y-6">
          {/* WIDGET 1: WHAT HAPPENS NEXT */}
          <div className="p-4 rounded-2xl bg-[var(--color-surface-default)] border border-[var(--color-neutral-200)] shadow-xs space-y-3">
            <h3 className="font-bold text-xs text-[var(--color-neutral-900)]">What happens next?</h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  📷
                </div>
                <div>
                  <div className="font-bold text-[var(--color-neutral-900)]">We analyse your image</div>
                  <p className="text-[11px] text-[var(--color-neutral-500)]">
                    Our AI identifies objects, relationships and key details.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  💬
                </div>
                <div>
                  <div className="font-bold text-[var(--color-neutral-900)]">You get clear answers</div>
                  <p className="text-[11px] text-[var(--color-neutral-500)]">
                    See explanations with visual references.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  ❓
                </div>
                <div>
                  <div className="font-bold text-[var(--color-neutral-900)]">Ask follow-up questions</div>
                  <p className="text-[11px] text-[var(--color-neutral-500)]">
                    Continue the conversation to learn more.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  ⚖
                </div>
                <div>
                  <div className="font-bold text-[var(--color-neutral-900)]">Compare if needed</div>
                  <p className="text-[11px] text-[var(--color-neutral-500)]">
                    Upload another image to see what's different.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* WIDGET 2: TIPS FOR BETTER RESULTS */}
          <div className="p-4 rounded-2xl bg-[var(--color-surface-default)] border border-[var(--color-neutral-200)] shadow-xs space-y-2.5">
            <h3 className="font-bold text-xs text-[var(--color-neutral-900)] flex items-center gap-1.5">
              <span>💡 Tips for better results</span>
            </h3>

            <ul className="space-y-1.5 text-xs text-[var(--color-neutral-700)]">
              <li className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Use clear, well-lit images</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Make sure important objects are visible</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Ask specific questions</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>You can upload technical diagrams, setups, plants, devices</span>
              </li>
            </ul>
          </div>

          {/* WIDGET 3: EXAMPLE preview */}
          <div className="p-4 rounded-2xl bg-[var(--color-surface-default)] border border-[var(--color-neutral-200)] shadow-xs space-y-2.5">
            <h3 className="font-bold text-xs text-[var(--color-neutral-900)]">Example</h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg overflow-hidden border border-neutral-300 h-24 bg-neutral-200">
                <img
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=300&q=80"
                  alt="Example thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1 text-[11px] text-[var(--color-neutral-700)]">
                <div className="font-semibold text-[var(--color-blue-700)]">Sample questions:</div>
                <div>• What objects are visible?</div>
                <div>• What is the mug used for?</div>
                <div>• Is there any text in the image?</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

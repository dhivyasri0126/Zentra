import { useState, useRef, useEffect } from 'react';
import ImageViewer from './ImageViewer.jsx';

export default function ChatArea({
  activeImage,
  previousImage,
  messages = [],
  suggestedQuestions = [],
  onUploadImage,
  onSendMessage,
  onUploadNextBestView,
  isLoading,
  loadingMessage,
  errorMessage,
  onRetry,
  onOpenMobileSidebar,
}) {
  const [activeTab, setActiveTab] = useState('conversation');
  const [inputQuestion, setInputQuestion] = useState('');
  const chatBottomRef = useRef(null);


  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputQuestion.trim() || isLoading) return;
    onSendMessage(inputQuestion.trim());
    setInputQuestion('');
  };

  const handleSuggestionClick = (promptText) => {
    if (isLoading) return;
    onSendMessage(promptText);
  };

  // Render purely live messages from PostgreSQL
  const displayMessages = messages;


  return (
    <div className="flex-1 flex flex-col lg:flex-row min-w-0 bg-[var(--color-surface-canvas)] overflow-hidden">
      {/* LEFT WORKSPACE: IMAGE VIEWER & OBJECT EVIDENCE OVERLAY */}
      <div className="w-full lg:w-3/5 border-r border-[var(--color-neutral-200)] flex flex-col overflow-hidden">
        <ImageViewer
          activeImage={activeImage}
          previousImage={previousImage}
          onUploadImage={onUploadImage}
        />
      </div>

      {/* RIGHT WORKSPACE: CONVERSATION PANEL */}
      <div className="w-full lg:w-2/5 flex flex-col bg-[var(--color-surface-default)] overflow-hidden">
        {/* RIGHT PANEL MODE TABS */}
        <div className="h-12 border-b border-[var(--color-neutral-200)] px-4 flex items-center gap-4 text-xs font-semibold shrink-0 bg-[var(--color-surface-default)]">
          <button
            onClick={() => setActiveTab('conversation')}
            className={`h-full flex items-center gap-1.5 border-b-2 transition-colors ${activeTab === 'conversation'
                ? 'border-[var(--color-blue-600)] text-[var(--color-blue-600)] font-bold'
                : 'border-transparent text-[var(--color-neutral-600)] hover:text-[var(--color-neutral-900)]'
              }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Conversation
          </button>

          <button
            onClick={() => setActiveTab('summary')}
            className={`h-full flex items-center gap-1.5 border-b-2 transition-colors ${activeTab === 'summary'
                ? 'border-[var(--color-blue-600)] text-[var(--color-blue-600)] font-bold'
                : 'border-transparent text-[var(--color-neutral-600)] hover:text-[var(--color-neutral-900)]'
              }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Scene Summary
          </button>

          <button
            onClick={() => setActiveTab('objects')}
            className={`h-full flex items-center gap-1.5 border-b-2 transition-colors ${activeTab === 'objects'
                ? 'border-[var(--color-blue-600)] text-[var(--color-blue-600)] font-bold'
                : 'border-transparent text-[var(--color-neutral-600)] hover:text-[var(--color-neutral-900)]'
              }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Objects
          </button>

        </div>

        {/* CHAT MESSAGES AREA */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {displayMessages.length === 0 && !isLoading && (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[var(--color-neutral-400)] space-y-3 my-auto min-h-[240px]">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-[var(--color-neutral-800)]">Upload an image to start session</h4>
                <p className="text-[11px] text-[var(--color-neutral-500)] max-w-xs">
                  Upload an image and ask questions, or select a suggested question generated by Zentra Vision.
                </p>
              </div>
            </div>
          )}

          {displayMessages.map((msg, idx) => (
            <div key={msg.id || idx} className="space-y-3">
              {msg.role === 'user' ? (
                /* USER QUESTION BUBBLE */
                <div className="flex items-start justify-end gap-2">
                  <div className="flex flex-col items-end">
                    <div className="px-4 py-2.5 rounded-2xl rounded-tr-xs bg-[var(--chat-user-bg)] text-white text-xs font-semibold max-w-[85%] border border-blue-100 shadow-xs">
                      {msg.content}
                    </div>

                    <span className="text-[10px] text-[var(--color-neutral-500)] mt-1">{msg.timestamp}</span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 border border-blue-200">
                    D
                  </div>
                </div>
              ) : (
                /* ASSISTANT ANSWER BUBBLE */
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[var(--color-blue-600)] text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-xs mt-0.5">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M4 16v2a2 2 0 002 2h2M16 20h2a2 2 0 002-2v-2" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>

                  <div className="flex-1 space-y-3 min-w-0">
                    <div className="p-4 rounded-2xl rounded-tl-xs bg-[var(--color-surface-default)] border border-[var(--color-neutral-200)] shadow-xs space-y-3">
                      <p className="text-xs text-[var(--color-neutral-900)] leading-relaxed">
                        {msg.content}
                      </p>

                      {/* OBJECT LIST WITH BADGES */}
                      {msg.items && (
                        <div className="space-y-1.5 text-xs text-[var(--color-neutral-800)]">
                          {msg.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-2">
                              <span
                                style={{ backgroundColor: item.color }}
                                className="w-4 h-4 rounded-full text-white text-[10px] font-bold flex items-center justify-center shrink-0"
                              >
                                {item.id}
                              </span>
                              <span className="font-bold">{item.label}</span>
                              <span className="text-[var(--color-neutral-600)]">– {item.text}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* BULLET POINTS */}
                      {msg.bullets && (
                        <ul className="space-y-1.5 text-xs text-[var(--color-neutral-800)] pl-1">
                          {msg.bullets.map((b, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2">
                              <span className="text-[var(--color-blue-600)] font-bold">•</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* HERO CROP CARD (IF PRESENT) */}
                      {msg.heroCrop && (
                        <div className="mt-2 rounded-xl overflow-hidden border border-neutral-200 max-w-[240px]">
                          <img src={msg.heroCrop} alt="Evidence Crop" className="w-full h-32 object-cover" />
                        </div>
                      )}

                      {/* EVIDENCE CARD (IF PRESENT) */}
                      {msg.evidenceCard && (
                        <div className="flex items-center justify-end gap-2 mt-2">
                          <div className="rounded-xl overflow-hidden border border-neutral-200 w-28 h-20 shadow-xs">
                            <img src={msg.evidenceCard.thumb} alt={msg.evidenceCard.label} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[10px] text-[var(--color-neutral-500)] font-medium">
                            Evidence: {msg.evidenceCard.label}
                          </span>
                        </div>
                      )}

                      {/* EVIDENCE STRIP */}
                      {msg.evidenceCrops && (
                        <div className="pt-2 border-t border-[var(--color-neutral-200)] flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-[var(--color-neutral-500)]">Evidence:</span>
                          <div className="flex items-center gap-1.5 overflow-x-auto">
                            {msg.evidenceCrops.map((crop) => (
                              <div key={crop.id} className="w-8 h-8 rounded-lg overflow-hidden border border-neutral-300 shrink-0">
                                <img src={crop.thumb} alt={`Evidence ${crop.id}`} className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {/* NEXT-BEST-VIEW & MISSING EVIDENCE CARD */}
                      {msg.missingEvidence && (
                        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1.5">
                          <div className="flex items-center gap-1.5 font-bold text-amber-800">
                            <svg className="w-4 h-4 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span>Evidence Insufficient — Additional View Needed</span>
                          </div>
                          <p className="text-[11px] text-amber-800/90 leading-relaxed">
                            {msg.missingEvidence}
                          </p>
                          {msg.nextBestView && (
                            <div className="pt-1.5 border-t border-amber-200/60 font-medium text-[11px] text-amber-900">
                              <span className="font-bold">Next-Best View: </span>{msg.nextBestView}
                            </div>
                          )}
                        </div>
                      )}

                      {/* VERIFIED EVIDENCE BADGE */}
                      {msg.sufficient && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-700">
                          <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>100% Verified Evidence</span>
                        </div>
                      )}
                    </div>

                    <span className="text-[10px] text-[var(--color-neutral-500)] block">{msg.timestamp}</span>
                  </div>
                </div>
              )}
            </div>
          ))}


          {isLoading && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/50 border border-blue-100 text-xs font-semibold text-blue-700 animate-pulse">
              <div className="w-4 h-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
              <span>{loadingMessage || 'Analyzing visual evidence...'}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700 flex items-center justify-between">
              <span>{errorMessage}</span>
              {onRetry && (
                <button onClick={onRetry} className="px-2 py-1 rounded bg-rose-600 text-white font-bold text-[10px]">
                  Retry
                </button>
              )}
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* PROMPT SUGGESTION CHIPS ("Try asking" or Zentra Zero-Prompting Suggestions) */}
        <div className="px-4 py-2 border-t border-[var(--color-neutral-200)] bg-[var(--color-neutral-50)] space-y-1.5 shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[var(--color-neutral-600)]">
              {suggestedQuestions && suggestedQuestions.length > 0 ? 'Suggested Questions' : 'Try asking'}
            </span>
            {suggestedQuestions && suggestedQuestions.length > 0 && (
              <span className="text-[10px] text-[var(--color-blue-600)] font-medium">Click to ask instantly</span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suggestedQuestions && suggestedQuestions.length > 0 ? (
              suggestedQuestions.map((sq, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => handleSuggestionClick(sq)}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[11px] font-semibold text-blue-800 flex items-center gap-1.5 max-w-full truncate shadow-2xs transition-colors"
                >
                  <svg className="w-3.5 h-3.5 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="truncate">{sq}</span>
                </button>
              ))
            ) : (
              <span className="hidden" aria-hidden="true">
                <button
                  onClick={() => handleSuggestionClick('What is this object?')}
                  className="px-3 py-1.5 rounded-lg bg-[var(--color-surface-default)] hover:bg-[var(--color-neutral-100)] border border-[var(--color-neutral-200)] text-[11px] font-semibold text-[var(--color-neutral-800)] flex items-center gap-1.5 truncate shadow-2xs transition-colors"
                >
                  <svg className="w-3.5 h-3.5 text-[var(--color-neutral-500)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="truncate">What is this object?</span>
                </button>

                <button
                  onClick={() => handleSuggestionClick('What is beside the laptop?')}
                  className="px-3 py-1.5 rounded-lg bg-[var(--color-surface-default)] hover:bg-[var(--color-neutral-100)] border border-[var(--color-neutral-200)] text-[11px] font-semibold text-[var(--color-neutral-800)] flex items-center gap-1.5 truncate shadow-2xs transition-colors"
                >
                  <svg className="w-3.5 h-3.5 text-[var(--color-neutral-500)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span className="truncate">What is beside the laptop?</span>
                </button>

                <button
                  onClick={() => handleSuggestionClick('Describe the scene')}
                  className="px-3 py-1.5 rounded-lg bg-[var(--color-surface-default)] hover:bg-[var(--color-neutral-100)] border border-[var(--color-neutral-200)] text-[11px] font-semibold text-[var(--color-neutral-800)] flex items-center gap-1.5 truncate shadow-2xs transition-colors"
                >
                  <svg className="w-3.5 h-3.5 text-[var(--color-neutral-500)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="truncate">Describe the scene</span>
                </button>

              </span>
            )}
          </div>
        </div>


        {/* INPUT COMPOSER BAR */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-[var(--color-neutral-200)] bg-[var(--color-surface-default)] shrink-0">
          <div className="flex items-center gap-2 p-1.5 rounded-xl border border-[var(--color-neutral-300)] focus-within:border-[var(--color-blue-600)] bg-white shadow-2xs">
            <label className="p-1.5 text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-800)] cursor-pointer rounded-lg hover:bg-neutral-100 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files && e.target.files[0] && onUploadImage(e.target.files[0])}
              />
            </label>

            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              placeholder="Ask a question about this image..."
              className="flex-1 text-xs text-[var(--color-neutral-900)] placeholder-[var(--color-neutral-400)] outline-none bg-transparent"
            />

            <button
              type="submit"
              disabled={!inputQuestion.trim() || isLoading}
              className={`p-2 rounded-lg text-white font-bold text-xs flex items-center justify-center transition-all ${inputQuestion.trim() && !isLoading
                  ? 'bg-[var(--color-blue-600)] hover:bg-[var(--color-blue-700)] shadow-xs'
                  : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                }`}
            >
              <svg className="w-4 h-4 transform rotate-45 -mt-0.5 -mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

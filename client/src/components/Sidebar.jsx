import { useTheme } from '../context/ThemeContext.jsx';

export default function Sidebar({
  conversations = [],
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onClearConversation,
  currentView = 'workspace',
  onNavigateView,
  isOpen,
  onCloseMobile,
}) {
  const { theme, setTheme } = useTheme();

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[var(--color-surface-default)] border-r border-[var(--color-neutral-200)] flex flex-col justify-between transition-transform duration-200 ease-in-out shrink-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* BRANDING HEADER */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-[var(--color-neutral-200)] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-blue-600)] text-white flex items-center justify-center font-bold shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M4 16v2a2 2 0 002 2h2M16 20h2a2 2 0 002-2v-2" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <span className="text-lg font-bold text-[var(--color-neutral-900)] tracking-tight">
              SceneTrace
            </span>
          </div>

          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-[var(--color-neutral-500)] hover:bg-[var(--color-neutral-100)]"
          >
            ✕
          </button>
        </div>

        {/* PRIMARY ACTION BUTTON */}
        <div className="p-4 shrink-0">
          <button
            onClick={() => {
              if (onNavigateView) onNavigateView('new-session');
              else onNewConversation();
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-[var(--color-blue-600)] hover:bg-[var(--color-blue-700)] active:bg-[var(--color-blue-800)] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm focus-ring transition-colors"
          >
            <span className="text-base font-bold">+</span> New Session
          </button>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="px-3 pb-3 space-y-0.5 border-b border-[var(--color-neutral-200)] shrink-0 text-xs font-medium text-[var(--color-neutral-700)]">
          <button
            onClick={() => {
              if (onNavigateView) onNavigateView('sessions');
              if (onCloseMobile) onCloseMobile();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              currentView === 'sessions'
                ? 'bg-[var(--color-blue-50)] text-[var(--color-blue-700)] font-semibold'
                : 'hover:bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)]'
            }`}
          >
            <svg className="w-4 h-4 text-[var(--color-neutral-500)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            My Sessions
          </button>

          <button
            onClick={() => {
              if (onNavigateView) onNavigateView('image-history');
              if (onCloseMobile) onCloseMobile();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              currentView === 'image-history'
                ? 'bg-[var(--color-blue-50)] text-[var(--color-blue-700)] font-semibold'
                : 'hover:bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)]'
            }`}
          >
            <svg className="w-4 h-4 text-[var(--color-neutral-500)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Image History
          </button>

          <button
            onClick={() => {
              if (onNavigateView) onNavigateView('examples');
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)] transition-colors"
          >
            <svg className="w-4 h-4 text-[var(--color-neutral-500)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Examples
          </button>

          <button
            onClick={() => {
              if (onNavigateView) onNavigateView('landing');
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)] transition-colors"
          >
            <svg className="w-4 h-4 text-[var(--color-neutral-500)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Help & Guide
          </button>
        </div>

        {/* RECENT SESSIONS LIST */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          <span className="text-[11px] font-semibold text-[var(--color-neutral-500)] px-2 block mb-1">
            Recent Sessions
          </span>

          {conversations.length === 0 ? (
            <div className="p-3 text-center text-xs text-[var(--color-neutral-500)]">
              No recent sessions.
            </div>
          ) : (
            conversations.map((conv) => {
              const isActive = conv.id === activeConversationId && currentView === 'workspace';
              return (
                <div
                  key={conv.id}
                  onClick={() => {
                    onSelectConversation(conv.id);
                    if (onNavigateView) onNavigateView('workspace');
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`group flex items-center gap-3 p-2 rounded-xl text-xs cursor-pointer transition-all ${
                    isActive
                      ? 'bg-[var(--color-blue-50)] text-[var(--color-blue-700)] font-semibold border border-blue-200'
                      : 'text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-100)]'
                  }`}
                >
                  {/* SESSION THUMBNAIL */}
                  <div className="w-9 h-9 rounded-lg overflow-hidden bg-neutral-200 shrink-0 border border-neutral-300">
                    <img
                      src={conv.thumbnail}
                      alt="Session thumbnail"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.classList.add('bg-neutral-300');
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-xs text-[var(--color-neutral-900)] truncate">
                      {conv.title || 'Untitled Session'}
                    </div>
                    <div className="text-[11px] text-[var(--color-neutral-500)] truncate">
                      {conv.imageCount || '0 images'} • {conv.time || 'No activity yet'}
                    </div>
                  </div>

                  {isActive && onClearConversation && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onClearConversation(conv.id);
                      }}
                      title="Clear Session"
                      className="opacity-0 group-hover:opacity-100 p-1 text-[var(--color-neutral-400)] hover:text-rose-600 transition-opacity"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* FOOTER PLAN CARD */}
      <div className="p-3 border-t border-[var(--color-neutral-200)] bg-[var(--color-surface-default)]">
        <div className="p-3 rounded-xl bg-[var(--color-neutral-50)] border border-[var(--color-neutral-200)] space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-neutral-900)]">
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Free Plan</span>
            </div>
          </div>

          <button
            onClick={() => alert('Phase 1 Hackathon MVP operates under standard free tier.')}
            className="w-full mt-1 py-1.5 px-3 rounded-lg bg-[var(--color-blue-50)] hover:bg-blue-100 text-[var(--color-blue-700)] font-semibold text-xs transition-colors"
          >
            Upgrade Plan
          </button>
        </div>
      </div>
    </aside>
  );
}

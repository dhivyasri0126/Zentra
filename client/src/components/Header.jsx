import { useState } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function Header({
  sessionTitle = 'Study Desk Setup',
  onTitleChange,
  onOpenMobileSidebar,
  onNavigateView,
  currentView = 'workspace',
}) {
  const { theme, setTheme } = useTheme();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(sessionTitle);

  const handleTitleSubmit = (e) => {
    e.preventDefault();
    if (titleInput.trim()) {
      if (onTitleChange) onTitleChange(titleInput.trim());
    }
    setIsEditingTitle(false);
  };

  return (
    <header className="h-14 border-b border-[var(--color-neutral-200)] bg-[var(--color-surface-default)] px-4 flex items-center justify-between shrink-0 z-20">
      {/* LEFT: Mobile Menu Button & Breadcrumb + Session Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-1.5 rounded-lg text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-100)] focus-ring"
          aria-label="Open sidebar"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center gap-2 min-w-0 text-sm">
          {/* LOGO (visible on header if workspace sidebar is compact/mobile) */}
          <div className="hidden sm:flex items-center gap-1.5 font-semibold text-[var(--color-neutral-900)]">
            <div className="w-6 h-6 rounded bg-[var(--color-blue-600)] text-white flex items-center justify-center font-bold text-xs">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M4 16v2a2 2 0 002 2h2M16 20h2a2 2 0 002-2v-2" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <span className="font-bold tracking-tight text-base">SceneTrace</span>
          </div>

          <span className="hidden sm:inline text-[var(--color-neutral-400)]">/</span>

          {/* EDITABLE TITLE */}
          {isEditingTitle ? (
            <form onSubmit={handleTitleSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                autoFocus
                className="px-2 py-0.5 text-sm font-semibold text-[var(--color-neutral-900)] border border-[var(--color-blue-600)] rounded outline-none bg-white"
                onBlur={handleTitleSubmit}
              />
            </form>
          ) : (
            <div className="flex items-center gap-1.5 font-semibold text-[var(--color-neutral-900)] truncate">
              <span className="truncate">{sessionTitle}</span>
              <button
                onClick={() => setIsEditingTitle(true)}
                className="p-1 text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-700)] rounded"
                title="Rename Session"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Global Utility Controls */}
      <div className="flex items-center gap-3 shrink-0">
        {/* VIEW NAVIGATION SHORTCUTS */}
        <div className="hidden md:flex items-center gap-1 text-xs">
          <button
            onClick={() => onNavigateView && onNavigateView('workspace')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              currentView === 'workspace'
                ? 'bg-[var(--color-blue-50)] text-[var(--color-blue-700)] font-semibold'
                : 'text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-100)]'
            }`}
          >
            Workspace
          </button>
          <button
            onClick={() => onNavigateView && onNavigateView('sessions')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              currentView === 'sessions'
                ? 'bg-[var(--color-blue-50)] text-[var(--color-blue-700)] font-semibold'
                : 'text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-100)]'
            }`}
          >
            My Sessions
          </button>
          <button
            onClick={() => onNavigateView && onNavigateView('landing')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              currentView === 'landing'
                ? 'bg-[var(--color-blue-50)] text-[var(--color-blue-700)] font-semibold'
                : 'text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-100)]'
            }`}
          >
            Landing
          </button>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-lg text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-100)] focus-ring transition-colors"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* Notifications Icon with Badge */}
        <button
          className="relative p-2 rounded-lg text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-100)] focus-ring transition-colors"
          title="Notifications"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
        </button>

        {/* User Profile Avatar Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-[var(--color-neutral-200)]">
          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center border border-blue-200">
            D
          </div>
          <span className="hidden sm:inline text-xs font-semibold text-[var(--color-neutral-800)]">
            Dhivyasri M
          </span>
          <svg className="w-3.5 h-3.5 text-[var(--color-neutral-500)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </header>
  );
}

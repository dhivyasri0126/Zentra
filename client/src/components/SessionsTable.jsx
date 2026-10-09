import { useState } from 'react';

export default function SessionsTable({ sessions = [], onSelectSession, onNewSession }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('table');

  const activeSessions = sessions.map((s, idx) => ({
    id: s.id,
    title: s.title || `Session ${idx + 1}`,
    thumbnail: s.thumbnail,
    imageCount: parseInt(s.imageCount, 10) || 1,
    type: 'Visual Evidence',
    typeTagColor: 'bg-blue-50 text-blue-700 border-blue-200',
    objects: ['Visual Evidence'],
    extraObjectsCount: 0,
    keyQuestion: s.title,
    lastModified: s.time || new Date(s.created || Date.now()).toLocaleDateString(),
    status: 'Active',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    starred: false,
  }));

  const filteredSessions = activeSessions.filter((s) => {
    if (selectedCategory !== 'All' && s.type !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        s.title.toLowerCase().includes(q) ||
        s.keyQuestion.toLowerCase().includes(q) ||
        s.objects.some((o) => o.toLowerCase().includes(q))
      );
    }
    return true;
  });


  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[var(--color-surface-canvas)] overflow-y-auto p-6 space-y-6">
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-neutral-900)]">My Sessions</h1>
          <p className="text-xs text-[var(--color-neutral-600)]">
            All your image sessions, analyses and comparisons in one place.
          </p>
        </div>

        <button
          onClick={onNewSession}
          className="px-4 py-2.5 rounded-xl bg-[var(--color-blue-600)] hover:bg-[var(--color-blue-700)] text-white font-bold text-xs flex items-center gap-2 shadow-sm focus-ring transition-colors"
        >
          <span className="text-base font-bold">+</span> New Session
        </button>
      </div>

      {/* CATEGORY FILTER TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
        {[
          { label: 'All Sessions', count: sessions.length, cat: 'All' },
          { label: 'Study', count: 0, cat: 'Study' },
          { label: 'Lab Equipment', count: 0, cat: 'Lab' },
          { label: 'Plans & Nature', count: 0, cat: 'Nature' },
          { label: 'Outdoor', count: 0, cat: 'Outdoor' },
          { label: 'Others', count: 0, cat: 'Others' },
        ].map((tab) => {
          const isActive = selectedCategory === tab.cat;
          return (
            <button
              key={tab.label}
              onClick={() => setSelectedCategory(tab.cat)}
              className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 ${
                isActive
                  ? 'bg-[var(--color-blue-600)] text-white border-[var(--color-blue-600)] shadow-xs'
                  : 'bg-[var(--color-surface-default)] text-[var(--color-neutral-700)] border-[var(--color-neutral-200)] hover:bg-[var(--color-neutral-100)]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isActive ? 'bg-white/20 text-white' : 'bg-neutral-200 text-neutral-700'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* FILTER & SEARCH CONTROL BAR */}
      <div className="p-3 rounded-2xl bg-[var(--color-surface-default)] border border-[var(--color-neutral-200)] shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* SEARCH INPUT */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--color-neutral-300)] bg-white w-full sm:w-80">
          <svg className="w-4 h-4 text-[var(--color-neutral-400)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, object, or question..."
            className="w-full text-xs text-[var(--color-neutral-900)] outline-none bg-transparent"
          />
        </div>

        {/* DROPDOWNS & VIEW SWITCHER */}
        <div className="flex items-center gap-2 flex-wrap">
          <select className="px-3 py-1.5 rounded-lg border border-[var(--color-neutral-300)] bg-white text-xs font-semibold text-[var(--color-neutral-700)] outline-none">
            <option>All Types</option>
            <option>Study</option>
            <option>Lab</option>
            <option>Nature</option>
          </select>

          <select className="px-3 py-1.5 rounded-lg border border-[var(--color-neutral-300)] bg-white text-xs font-semibold text-[var(--color-neutral-700)] outline-none">
            <option>All Dates</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>

          <select className="px-3 py-1.5 rounded-lg border border-[var(--color-neutral-300)] bg-white text-xs font-semibold text-[var(--color-neutral-700)] outline-none">
            <option>All Status</option>
            <option>Completed</option>
            <option>Needs Review</option>
          </select>

          <div className="h-4 w-px bg-neutral-300 mx-1" />

          <span className="text-[11px] text-[var(--color-neutral-500)]">Sort by</span>
          <select className="px-2.5 py-1.5 rounded-lg border border-[var(--color-neutral-300)] bg-white text-xs font-semibold text-[var(--color-neutral-700)] outline-none">
            <option>Last Modified</option>
            <option>Title A-Z</option>
            <option>Date Created</option>
          </select>

          <div className="flex items-center gap-1 border border-neutral-300 rounded-lg p-0.5 bg-white">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1 rounded ${viewMode === 'table' ? 'bg-blue-50 text-blue-600' : 'text-neutral-500'}`}
              title="Table View"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-neutral-500'}`}
              title="Grid View"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* DENSE SESSIONS DATA TABLE */}
      <div className="rounded-2xl bg-[var(--color-surface-default)] border border-[var(--color-neutral-200)] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-neutral-200)] bg-[var(--color-neutral-50)] text-[var(--color-neutral-600)] font-semibold">
                <th className="p-3 w-10 text-center">
                  <input type="checkbox" className="rounded border-neutral-300" />
                </th>
                <th className="p-3">Session</th>
                <th className="p-3">Type</th>
                <th className="p-3">Detected Objects</th>
                <th className="p-3">Key Questions</th>
                <th className="p-3">Last Modified</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-neutral-200)] text-[var(--color-neutral-800)]">
              {filteredSessions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-xs text-[var(--color-neutral-500)]">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-400">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <span className="font-semibold text-neutral-700">No previous sessions found</span>
                      <span className="text-[11px] text-neutral-400">Click "+ New Session" to analyze your first image.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredSessions.map((sess) => (
                  <tr
                    key={sess.id}
                    onClick={() => onSelectSession && onSelectSession(sess.id)}
                    className="hover:bg-[var(--color-neutral-100)] cursor-pointer transition-colors"
                  >
                    <td className="p-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" className="rounded border-neutral-300" />
                    </td>


                  {/* THUMBNAIL & TITLE */}
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-neutral-200 border border-neutral-300 shrink-0">
                        {sess.thumbnail ? (
                          <img src={sess.thumbnail} alt={sess.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-400" aria-label="No image">
                            —
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[var(--color-neutral-900)] flex items-center gap-1.5">
                          <span>{sess.title}</span>
                          {sess.starred && <span className="text-amber-500">★</span>}
                        </div>
                        <div className="text-[11px] text-[var(--color-neutral-500)]">
                          {sess.imageCount} images • {sess.lastModified.split(' ')[0]}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* TYPE TAG */}
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-md border text-[11px] font-semibold ${sess.typeTagColor}`}>
                      {sess.type}
                    </span>
                  </td>

                  {/* OBJECT PILLS */}
                  <td className="p-3">
                    <div className="flex items-center gap-1 flex-wrap">
                      {sess.objects.map((obj, oIdx) => (
                        <span
                          key={oIdx}
                          className="px-2 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-[10px] font-medium text-neutral-700"
                        >
                          {obj}
                        </span>
                      ))}
                      {sess.extraObjectsCount > 0 && (
                        <span className="px-1.5 py-0.5 rounded bg-neutral-200 text-[10px] font-bold text-neutral-700">
                          +{sess.extraObjectsCount}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* KEY QUESTION */}
                  <td className="p-3 max-w-xs truncate text-[11px] text-[var(--color-neutral-600)]">
                    {sess.keyQuestion}
                  </td>

                  {/* LAST MODIFIED */}
                  <td className="p-3 text-[11px] font-mono text-[var(--color-neutral-500)] whitespace-nowrap">
                    {sess.lastModified}
                  </td>

                  {/* STATUS */}
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold ${sess.statusColor}`}>
                      {sess.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1 text-[var(--color-neutral-500)]">
                      <button className="p-1 rounded hover:bg-neutral-200 hover:text-neutral-800" title="Export">
                        ↗
                      </button>
                      <button className="p-1 rounded hover:bg-neutral-200 hover:text-neutral-800" title="Duplicate">
                        📋
                      </button>
                      <button className="p-1 rounded hover:bg-neutral-200 hover:text-neutral-800" title="More">
                        ⋮
                      </button>
                    </div>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION BAR */}
        <div className="p-4 border-t border-[var(--color-neutral-200)] bg-[var(--color-neutral-50)] flex items-center justify-between text-xs font-medium text-[var(--color-neutral-600)]">
          <div>Showing {filteredSessions.length} session{filteredSessions.length === 1 ? '' : 's'}</div>

          <div className="flex items-center gap-1">
            <button disabled className="px-2 py-1 rounded border border-neutral-300 hover:bg-white disabled:opacity-50">
              ‹
            </button>
            <button disabled className="px-3 py-1 rounded bg-[var(--color-blue-600)] text-white font-bold disabled:opacity-50">1</button>
            <button disabled className="px-2 py-1 rounded border border-neutral-300 hover:bg-white disabled:opacity-50">
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

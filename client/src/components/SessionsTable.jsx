import { useState } from 'react';

export default function SessionsTable({ onSelectSession, onNewSession }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('table');

  const sampleSessions = [
    {
      id: 'sess-1',
      title: 'Study Desk Setup',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=120&q=80',
      imageCount: 2,
      type: 'Study',
      typeTagColor: 'bg-blue-50 text-blue-700 border-blue-200',
      objects: ['Laptop', 'Mug', 'Notebook'],
      extraObjectsCount: 1,
      keyQuestion: 'What objects are visible in this image?',
      lastModified: 'Oct 8, 2026 10:32 AM',
      status: 'Completed',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      starred: true,
    },
    {
      id: 'sess-2',
      title: 'Lab Equipment',
      thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=120&q=80',
      imageCount: 3,
      type: 'Lab',
      typeTagColor: 'bg-purple-50 text-purple-700 border-purple-200',
      objects: ['Resistor', 'Capacitor', 'IC'],
      extraObjectsCount: 3,
      keyQuestion: 'Identify the components in this circuit board.',
      lastModified: 'Oct 6, 2026 04:15 PM',
      status: 'Completed',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      starred: false,
    },
    {
      id: 'sess-3',
      title: 'Indoor Plants',
      thumbnail: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=120&q=80',
      imageCount: 1,
      type: 'Nature',
      typeTagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      objects: ['Plant', 'Pot', 'Window'],
      extraObjectsCount: 0,
      keyQuestion: 'What plant is this and how do I take care of it?',
      lastModified: 'Oct 5, 2026 11:20 AM',
      status: 'Completed',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      starred: false,
    },
    {
      id: 'sess-4',
      title: 'Street View',
      thumbnail: 'https://images.unsplash.com/photo-1477959858617-67f30ac4ce78?auto=format&fit=crop&w=120&q=80',
      imageCount: 2,
      type: 'Outdoor',
      typeTagColor: 'bg-amber-50 text-amber-700 border-amber-200',
      objects: ['Buildings', 'Road', 'Vehicles'],
      extraObjectsCount: 2,
      keyQuestion: 'What can you tell me about this place?',
      lastModified: 'Oct 4, 2026 06:45 PM',
      status: 'Completed',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      starred: false,
    },
    {
      id: 'sess-5',
      title: 'Notes & Writing',
      thumbnail: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=120&q=80',
      imageCount: 1,
      type: 'Study',
      typeTagColor: 'bg-blue-50 text-blue-700 border-blue-200',
      objects: ['Notebook', 'Pen', 'Text'],
      extraObjectsCount: 0,
      keyQuestion: 'What is written in this notebook?',
      lastModified: 'Oct 3, 2026 09:18 PM',
      status: 'Needs Review',
      statusColor: 'bg-amber-50 text-amber-800 border-amber-300',
      starred: false,
    },
    {
      id: 'sess-6',
      title: 'Compare: Desk Setup',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=120&q=80',
      imageCount: 2,
      type: 'Compare',
      typeTagColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      objects: ['Laptop', 'Mug', 'Plant'],
      extraObjectsCount: 1,
      keyQuestion: 'What has changed between these two images?',
      lastModified: 'Oct 2, 2026 03:12 PM',
      status: 'Completed',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      starred: false,
    },
    {
      id: 'sess-7',
      title: 'Tool Identification',
      thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=120&q=80',
      imageCount: 1,
      type: 'Lab',
      typeTagColor: 'bg-purple-50 text-purple-700 border-purple-200',
      objects: ['Screwdriver', 'Pliers', 'Wrench'],
      extraObjectsCount: 0,
      keyQuestion: 'What tools are visible here?',
      lastModified: 'Sep 30, 2026 01:05 PM',
      status: 'Completed',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      starred: false,
    },
    {
      id: 'sess-8',
      title: 'Campus Building',
      thumbnail: 'https://images.unsplash.com/photo-1477959858617-67f30ac4ce78?auto=format&fit=crop&w=120&q=80',
      imageCount: 1,
      type: 'Outdoor',
      typeTagColor: 'bg-amber-50 text-amber-700 border-amber-200',
      objects: ['Building', 'Trees', 'Person'],
      extraObjectsCount: 1,
      keyQuestion: 'What building is this and what is its purpose?',
      lastModified: 'Sep 28, 2026 05:40 PM',
      status: 'Processing',
      statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
      starred: false,
    },
    {
      id: 'sess-9',
      title: 'Leaf Disease Check',
      thumbnail: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=120&q=80',
      imageCount: 2,
      type: 'Nature',
      typeTagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      objects: ['Leaf', 'Plant', 'Spots'],
      extraObjectsCount: 0,
      keyQuestion: 'Does this leaf show any signs of disease?',
      lastModified: 'Sep 25, 2026 10:22 AM',
      status: 'Partial',
      statusColor: 'bg-rose-50 text-rose-700 border-rose-200',
      starred: false,
    },
    {
      id: 'sess-10',
      title: 'Untitled Session',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=120&q=80',
      imageCount: 1,
      type: 'Others',
      typeTagColor: 'bg-neutral-100 text-neutral-700 border-neutral-200',
      objects: ['Unknown'],
      extraObjectsCount: 0,
      keyQuestion: 'Analyse this image.',
      lastModified: 'Sep 20, 2026 04:10 PM',
      status: 'Failed',
      statusColor: 'bg-neutral-100 text-neutral-600 border-neutral-300',
      starred: false,
    },
  ];

  const filteredSessions = sampleSessions.filter((s) => {
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
          { label: 'All Sessions', count: 24, cat: 'All' },
          { label: 'Study', count: 8, cat: 'Study' },
          { label: 'Lab Equipment', count: 5, cat: 'Lab' },
          { label: 'Plans & Nature', count: 4, cat: 'Nature' },
          { label: 'Outdoor', count: 3, cat: 'Outdoor' },
          { label: 'Others', count: 4, cat: 'Others' },
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
              {filteredSessions.map((sess) => (
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
                        <img src={sess.thumbnail} alt={sess.title} className="w-full h-full object-cover" />
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
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION BAR */}
        <div className="p-4 border-t border-[var(--color-neutral-200)] bg-[var(--color-neutral-50)] flex items-center justify-between text-xs font-medium text-[var(--color-neutral-600)]">
          <div>Showing 1–10 of 24 sessions</div>

          <div className="flex items-center gap-1">
            <button className="px-2 py-1 rounded border border-neutral-300 hover:bg-white disabled:opacity-50">
              ‹
            </button>
            <button className="px-3 py-1 rounded bg-[var(--color-blue-600)] text-white font-bold">1</button>
            <button className="px-3 py-1 rounded border border-neutral-300 hover:bg-white">2</button>
            <button className="px-3 py-1 rounded border border-neutral-300 hover:bg-white">3</button>
            <button className="px-2 py-1 rounded border border-neutral-300 hover:bg-white">
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

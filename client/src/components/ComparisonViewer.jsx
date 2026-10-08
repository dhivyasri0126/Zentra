import { useState } from 'react';

export default function ComparisonViewer({ previousImage, activeImage, onClose }) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const changesList = [
    {
      type: 'ADDED',
      label: 'Added',
      colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      badgeClass: 'bg-emerald-600 text-white',
      title: 'Water Bottle Added',
      description: 'A blue metal water bottle was added to the right side of the desk behind the mug.',
      confidence: 'OBSERVED',
    },
    {
      type: 'REMOVED',
      label: 'Removed',
      colorClass: 'bg-rose-50 text-rose-700 border-rose-200',
      badgeClass: 'bg-rose-600 text-white',
      title: 'Pen Position Cleared',
      description: 'Black ballpoint pen is no longer lying across the open notebook.',
      confidence: 'OBSERVED',
    },
    {
      type: 'MOVED',
      label: 'Moved',
      colorClass: 'bg-blue-50 text-blue-700 border-blue-200',
      badgeClass: 'bg-blue-600 text-white',
      title: 'Mug Position Shifted',
      description: 'Ceramic mug moved approximately 4cm closer to the notebook edge.',
      confidence: 'INFERRED',
    },
    {
      type: 'UNCHANGED',
      label: 'Unchanged',
      colorClass: 'bg-neutral-100 text-neutral-700 border-neutral-200',
      badgeClass: 'bg-neutral-600 text-white',
      title: 'Laptop & Indoor Plant',
      description: 'Silver laptop and potted plant remained in identical visual locations.',
      confidence: 'OBSERVED',
    },
  ];

  const filteredChanges =
    activeFilter === 'ALL' ? changesList : changesList.filter((c) => c.type === activeFilter);

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[var(--color-surface-canvas)] overflow-y-auto p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-[var(--color-neutral-200)] pb-4">
        <div>
          <div className="text-xs text-[var(--color-neutral-500)] font-medium flex items-center gap-1.5 mb-1">
            <span>Workspace</span>
            <span>&gt;</span>
            <span className="text-[var(--color-neutral-800)] font-semibold">Compare Images</span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-neutral-900)]">Compare Images</h1>
          <p className="text-xs text-[var(--color-neutral-600)]">
            Explains visual changes between previous state and current active image.
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg border border-neutral-300 hover:bg-neutral-100 text-xs font-semibold text-neutral-700 bg-white"
          >
            ← Back to Workspace
          </button>
        )}
      </div>

      {/* TWO IMAGE SIDE BY SIDE COMPARISON VIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PREVIOUS IMAGE CARD */}
        <div className="p-4 rounded-2xl bg-[var(--color-surface-default)] border border-[var(--color-neutral-200)] shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="font-bold text-[var(--color-neutral-900)]">Image 1 (Previous)</span>
            <span className="text-[var(--color-neutral-500)]">Oct 8, 2026 • 10:32 AM</span>
          </div>
          <div className="rounded-xl overflow-hidden border border-neutral-300 h-64 bg-neutral-900">
            <img
              src={
                previousImage?.previewUrl ||
                previousImage?.url ||
                'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
              }
              alt="Previous Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* CURRENT ACTIVE IMAGE CARD */}
        <div className="p-4 rounded-2xl bg-[var(--color-surface-default)] border-2 border-[var(--color-blue-600)] shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="font-bold text-[var(--color-blue-900)]">Image 2 (Active)</span>
            <span className="text-[var(--color-blue-700)]">Oct 8, 2026 • 10:38 AM</span>
          </div>
          <div className="rounded-xl overflow-hidden border border-blue-300 h-64 bg-neutral-900">
            <img
              src={
                activeImage?.previewUrl ||
                activeImage?.url ||
                'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80'
              }
              alt="Active Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* CHANGE CATEGORY SUMMARY TILES */}
      <div className="p-5 rounded-2xl bg-[var(--color-surface-default)] border border-[var(--color-neutral-200)] shadow-xs space-y-4">
        <h2 className="font-bold text-sm text-[var(--color-neutral-900)]">Detected Changes Summary</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div
            onClick={() => setActiveFilter('ADDED')}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${
              activeFilter === 'ADDED'
                ? 'bg-emerald-100 border-emerald-400 font-bold'
                : 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <div className="flex items-center justify-between text-emerald-800">
              <span className="font-bold">Added</span>
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                1
              </span>
            </div>
            <p className="text-[10px] text-emerald-700 mt-1">New objects present</p>
          </div>

          <div
            onClick={() => setActiveFilter('REMOVED')}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${
              activeFilter === 'REMOVED'
                ? 'bg-rose-100 border-rose-400 font-bold'
                : 'bg-rose-50 border-rose-200 hover:bg-rose-100'
            }`}
          >
            <div className="flex items-center justify-between text-rose-800">
              <span className="font-bold">Removed</span>
              <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                1
              </span>
            </div>
            <p className="text-[10px] text-rose-700 mt-1">Objects missing</p>
          </div>

          <div
            onClick={() => setActiveFilter('MOVED')}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${
              activeFilter === 'MOVED'
                ? 'bg-blue-100 border-blue-400 font-bold'
                : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
            }`}
          >
            <div className="flex items-center justify-between text-blue-800">
              <span className="font-bold">Moved</span>
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                1
              </span>
            </div>
            <p className="text-[10px] text-blue-700 mt-1">Position shifted</p>
          </div>

          <div
            onClick={() => setActiveFilter('UNCHANGED')}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${
              activeFilter === 'UNCHANGED'
                ? 'bg-neutral-200 border-neutral-400 font-bold'
                : 'bg-neutral-100 border-neutral-200 hover:bg-neutral-200'
            }`}
          >
            <div className="flex items-center justify-between text-neutral-800">
              <span className="font-bold">Unchanged</span>
              <span className="w-5 h-5 rounded-full bg-neutral-600 text-white text-[10px] font-bold flex items-center justify-center">
                2
              </span>
            </div>
            <p className="text-[10px] text-neutral-600 mt-1">Same objects & position</p>
          </div>
        </div>

        {/* DETAILED CHANGE ITEMS */}
        <div className="space-y-2 pt-2">
          {filteredChanges.map((change, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border flex items-start gap-3 ${change.colorClass}`}
            >
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${change.badgeClass}`}>
                {change.label}
              </span>
              <div className="flex-1">
                <div className="font-bold text-xs flex items-center justify-between">
                  <span>{change.title}</span>
                  <span className="text-[9px] font-mono opacity-80 uppercase">({change.confidence})</span>
                </div>
                <p className="text-[11px] mt-0.5 opacity-90">{change.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

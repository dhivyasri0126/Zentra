import { useState } from 'react';

export default function ImageHistory({ images = [], onSelectImage, onNewSession }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredImages = images.filter((image) => {
    const query = searchQuery.trim().toLowerCase();
    return !query || `${image.name} ${image.sessionTitle}`.toLowerCase().includes(query);
  });

  return (
    <div className="flex-1 min-w-0 overflow-y-auto bg-[var(--color-surface-canvas)] p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-neutral-900)]">Image History</h1>
          <p className="text-xs text-[var(--color-neutral-600)]">
            Every image you uploaded, kept separately from your sessions.
          </p>
        </div>
        <button
          onClick={onNewSession}
          className="px-4 py-2.5 rounded-xl bg-[var(--color-blue-600)] hover:bg-[var(--color-blue-700)] text-white font-bold text-xs"
        >
          + New Session
        </button>
      </div>

      <input
        type="search"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Search uploaded images..."
        className="w-full max-w-sm px-3 py-2 rounded-xl border border-[var(--color-neutral-300)] bg-white text-xs outline-none focus:border-[var(--color-blue-600)]"
      />

      {filteredImages.length === 0 ? (
        <div className="rounded-2xl bg-[var(--color-surface-default)] border border-[var(--color-neutral-200)] p-12 text-center text-sm text-[var(--color-neutral-500)]">
          No uploaded images found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredImages.map((image) => (
            <button
              key={image.id}
              onClick={() => onSelectImage(image)}
              className="text-left rounded-2xl overflow-hidden bg-[var(--color-surface-default)] border border-[var(--color-neutral-200)] hover:border-[var(--color-blue-500)] hover:shadow-sm transition-all"
            >
              <img src={image.imageData} alt={image.name} className="w-full h-48 object-cover bg-neutral-100" />
              <div className="p-3 space-y-1">
                <div className="font-bold text-xs text-[var(--color-neutral-900)]">{image.name}</div>
                <div className="text-[11px] text-[var(--color-neutral-600)] truncate">{image.sessionTitle}</div>
                <div className="text-[10px] text-[var(--color-neutral-500)]">
                  {new Date(image.createdAt).toLocaleString()}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

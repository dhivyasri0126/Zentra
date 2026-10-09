import { useState } from 'react';

export default function ImageViewer({ activeImage, onUploadImage }) {
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) onUploadImage(file);
  };

  const currentImageSrc = activeImage?.previewUrl || activeImage?.url;

  return (
    <div className="flex-1 flex flex-col gap-4 min-w-0 p-4 overflow-y-auto">
      <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-surface-default)] border border-[var(--color-neutral-200)] shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-neutral-800)] min-w-0">
          <svg className="w-4 h-4 text-[var(--color-neutral-500)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="font-bold text-sm truncate">{activeImage?.name || 'No image selected'}</span>
        </div>

        <label className="px-3 py-1.5 rounded-lg border border-[var(--color-neutral-300)] hover:bg-[var(--color-neutral-100)] text-xs font-semibold text-[var(--color-neutral-700)] flex items-center gap-1.5 cursor-pointer transition-colors shrink-0">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Replace
          <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleFileChange} />
        </label>
      </div>

      <div className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-[var(--color-neutral-200)] shadow-sm min-h-[380px] max-h-[520px] flex items-center justify-center group">
        {currentImageSrc ? (
          <img
            src={currentImageSrc}
            alt={activeImage?.name || 'Uploaded visual scene'}
            className="w-full h-full object-cover transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel / 100})` }}
          />
        ) : (
          <div className="text-center text-neutral-400 text-sm px-6">
            Upload an image to preview it here. Object and scene descriptions will come from the live AI analysis.
          </div>
        )}

        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md rounded-lg border border-neutral-200 shadow-md p-1 flex items-center gap-1 text-xs font-semibold text-neutral-800">
          <button
            onClick={() => setZoomLevel((zoom) => Math.max(50, zoom - 25))}
            className="w-6 h-6 rounded hover:bg-neutral-100 flex items-center justify-center text-sm font-bold"
            aria-label="Zoom out"
          >
            -
          </button>
          <span className="px-2 font-mono text-[11px]">{zoomLevel}%</span>
          <button
            onClick={() => setZoomLevel((zoom) => Math.min(200, zoom + 25))}
            className="w-6 h-6 rounded hover:bg-neutral-100 flex items-center justify-center text-sm font-bold"
            aria-label="Zoom in"
          >
            +
          </button>
          <div className="w-px h-4 bg-neutral-300 my-auto" />
          <button
            onClick={() => setZoomLevel(100)}
            className="px-2 py-0.5 rounded hover:bg-neutral-100 text-xs font-semibold"
          >
            Fit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {activeImage && (
          <div className="p-2.5 rounded-xl bg-[var(--color-blue-50)] border-2 border-[var(--color-blue-600)] flex items-center gap-3 shadow-xs min-w-0">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-200 shrink-0 border border-blue-300">
              <img src={currentImageSrc} alt={activeImage.name} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-xs text-[var(--color-blue-900)] truncate">{activeImage.name}</div>
              <div className="text-[10px] text-[var(--color-blue-700)]">Current image</div>
            </div>
          </div>
        )}

        <label className="p-2.5 rounded-xl border-2 border-dashed border-[var(--color-neutral-300)] hover:border-[var(--color-blue-500)] bg-[var(--color-neutral-50)] hover:bg-blue-50/50 flex flex-col items-center justify-center cursor-pointer transition-all text-center min-h-[74px]">
          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mb-0.5">+</div>
          <span className="font-bold text-xs text-[var(--color-neutral-800)]">Add Image</span>
          <span className="text-[9px] text-[var(--color-neutral-500)]">JPG, PNG, WebP (max 10MB)</span>
          <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleFileChange} />
        </label>
      </div>
    </div>
  );
}

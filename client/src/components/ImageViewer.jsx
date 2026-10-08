import { useState } from 'react';

export default function ImageViewer({
  activeImage,
  previousImage,
  onUploadImage,
  onSelectObject,
  selectedObjectId,
}) {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFit, setIsFit] = useState(true);

  // Default sample scene bounding boxes matching reference screenshot `application-shell.png`
  const defaultObjects = [
    {
      id: 1,
      label: 'Laptop',
      description: 'Silver laptop with code editor on screen',
      color: '#1570ef',
      bgClass: 'bg-blue-600',
      borderClass: 'border-blue-500',
      rect: { top: '26%', left: '22%', width: '31%', height: '36%' },
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 2,
      label: 'Mug',
      description: 'White ceramic mug with leaf pattern',
      color: '#d97706',
      bgClass: 'bg-amber-600',
      borderClass: 'border-amber-500',
      rect: { top: '39%', left: '45%', width: '13%', height: '18%' },
      thumbnail: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 3,
      label: 'Notebook',
      description: 'Spiral-bound notebook with handwritten notes',
      color: '#e11d48',
      bgClass: 'bg-rose-600',
      borderClass: 'border-rose-500',
      rect: { top: '53%', left: '39%', width: '33%', height: '24%' },
      thumbnail: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=120&q=80',
    },
    {
      id: 4,
      label: 'Plant',
      description: 'Potted green indoor plant',
      color: '#059669',
      bgClass: 'bg-emerald-600',
      borderClass: 'border-emerald-500',
      rect: { top: '22%', left: '44%', width: '12%', height: '30%' },
      thumbnail: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=120&q=80',
    },
  ];

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onUploadImage(e.target.files[0]);
    }
  };

  const currentImageSrc =
    activeImage?.previewUrl ||
    activeImage?.url ||
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1400&q=80';

  return (
    <div className="flex-1 flex flex-col gap-4 min-w-0 p-4 overflow-y-auto">
      {/* 1. IMAGE HEADER BAR */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--color-surface-default)] border border-[var(--color-neutral-200)] shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-neutral-800)]">
          <svg className="w-4 h-4 text-[var(--color-neutral-500)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="font-bold text-sm">Image 1</span>
          <span className="text-[var(--color-neutral-400)]">•</span>
          <span className="text-[var(--color-neutral-500)] font-normal">Oct 8, 2026 • 10:32 AM</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg border border-[var(--color-neutral-300)] hover:bg-[var(--color-neutral-100)] text-xs font-semibold text-[var(--color-neutral-700)] flex items-center gap-1.5 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>

          <label className="px-3 py-1.5 rounded-lg border border-[var(--color-neutral-300)] hover:bg-[var(--color-neutral-100)] text-xs font-semibold text-[var(--color-neutral-700)] flex items-center gap-1.5 cursor-pointer transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Replace
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>

          <button className="p-1.5 rounded-lg border border-[var(--color-neutral-300)] hover:bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)] transition-colors" title="Expand View">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>
      </div>

      {/* 2. MAIN SCENE CANVAS WITH BOUNDING BOX OVERLAYS */}
      <div className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-[var(--color-neutral-200)] shadow-sm min-h-[380px] max-h-[520px] flex items-center justify-center group">
        <img
          src={currentImageSrc}
          alt="SceneTrace Active Visual Scene"
          className="w-full h-full object-cover transition-transform duration-200"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        />

        {/* BOUNDING BOX OVERLAYS */}
        {defaultObjects.map((obj) => {
          const isSelected = selectedObjectId === obj.id;
          return (
            <div
              key={obj.id}
              onClick={() => onSelectObject && onSelectObject(obj.id)}
              style={{
                top: obj.rect.top,
                left: obj.rect.left,
                width: obj.rect.width,
                height: obj.rect.height,
                borderColor: obj.color,
              }}
              className={`absolute border-2 rounded-lg cursor-pointer transition-all duration-150 ${
                isSelected ? 'border-4 shadow-lg ring-2 ring-white/50' : 'hover:border-3 hover:shadow-md'
              }`}
            >
              {/* OBJECT BADGE HEADER */}
              <div
                style={{ backgroundColor: obj.color }}
                className="absolute -top-3.5 left-2 px-2 py-0.5 rounded-md text-white font-bold text-[11px] flex items-center gap-1 shadow-md"
              >
                <span className="w-3.5 h-3.5 rounded-full bg-white/20 text-white flex items-center justify-center text-[10px]">
                  {obj.id}
                </span>
                <span>{obj.label}</span>
              </div>
            </div>
          );
        })}

        {/* FLOATING ZOOM TOOLBAR (BOTTOM LEFT) */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md rounded-lg border border-neutral-200 shadow-md p-1 flex items-center gap-1 text-xs font-semibold text-neutral-800">
          <button
            onClick={() => setZoomLevel((z) => Math.max(50, z - 25))}
            className="w-6 h-6 rounded hover:bg-neutral-100 flex items-center justify-center text-sm font-bold"
          >
            -
          </button>
          <span className="px-2 font-mono text-[11px]">{zoomLevel}%</span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(200, z + 25))}
            className="w-6 h-6 rounded hover:bg-neutral-100 flex items-center justify-center text-sm font-bold"
          >
            +
          </button>
          <div className="w-px h-4 bg-neutral-300 my-auto" />
          <button
            onClick={() => {
              setZoomLevel(100);
              setIsFit(!isFit);
            }}
            className="px-2 py-0.5 rounded hover:bg-neutral-100 text-xs font-semibold"
          >
            Fit
          </button>
        </div>
      </div>

      {/* 3. IMAGE GALLERY THUMBNAIL STRIP & ADD IMAGE DROPZONE */}
      <div className="grid grid-cols-3 gap-3">
        {/* Active Image 1 Card */}
        <div className="p-2.5 rounded-xl bg-[var(--color-blue-50)] border-2 border-[var(--color-blue-600)] flex items-center gap-3 cursor-pointer shadow-xs">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-200 shrink-0 border border-blue-300">
            <img src={currentImageSrc} alt="Image 1" className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-bold text-xs text-[var(--color-blue-900)]">Image 1</div>
            <div className="text-[10px] text-[var(--color-blue-700)] truncate">Oct 8, 2026 • 10:32 AM</div>
          </div>
        </div>

        {/* Secondary Image 2 Card */}
        <div className="p-2.5 rounded-xl bg-[var(--color-surface-default)] border border-[var(--color-neutral-200)] flex items-center gap-3 cursor-pointer hover:bg-[var(--color-neutral-100)] transition-colors">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-200 shrink-0 border border-neutral-300">
            <img
              src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=120&q=80"
              alt="Image 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-xs text-[var(--color-neutral-900)]">Image 2</div>
            <div className="text-[10px] text-[var(--color-neutral-500)] truncate">Oct 8, 2026 • 10:38 AM</div>
          </div>
        </div>

        {/* Add Image Dropzone Card */}
        <label className="p-2.5 rounded-xl border-2 border-dashed border-[var(--color-neutral-300)] hover:border-[var(--color-blue-500)] bg-[var(--color-neutral-50)] hover:bg-blue-50/50 flex flex-col items-center justify-center cursor-pointer transition-all text-center">
          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mb-0.5">
            +
          </div>
          <span className="font-bold text-xs text-[var(--color-neutral-800)]">Add Image</span>
          <span className="text-[9px] text-[var(--color-neutral-500)]">JPG, PNG (max 10MB)</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>
      </div>

      {/* 4. DETECTED OBJECTS PANEL (4 ITEMS) */}
      <div className="p-4 rounded-2xl bg-[var(--color-surface-default)] border border-[var(--color-neutral-200)] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-[var(--color-neutral-900)] flex items-center gap-2">
            <span>Detected Objects (4)</span>
          </h3>
          <button className="text-xs font-semibold text-[var(--color-blue-600)] hover:underline">
            View all
          </button>
        </div>

        <div className="space-y-2">
          {defaultObjects.map((obj) => (
            <div
              key={obj.id}
              onClick={() => onSelectObject && onSelectObject(obj.id)}
              className={`p-2.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                selectedObjectId === obj.id
                  ? 'bg-blue-50/80 border-blue-300'
                  : 'bg-[var(--color-surface-default)] border-[var(--color-neutral-200)] hover:bg-[var(--color-neutral-100)]'
              }`}
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-neutral-200 shrink-0 border border-neutral-300">
                <img src={obj.thumbnail} alt={obj.label} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    style={{ backgroundColor: obj.color }}
                    className="w-4 h-4 rounded-full text-white text-[10px] font-bold flex items-center justify-center shrink-0"
                  >
                    {obj.id}
                  </span>
                  <span className="font-bold text-xs text-[var(--color-neutral-900)] truncate">
                    {obj.label}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--color-neutral-600)] truncate mt-0.5">
                  {obj.description}
                </p>
              </div>

              <svg className="w-4 h-4 text-[var(--color-neutral-400)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

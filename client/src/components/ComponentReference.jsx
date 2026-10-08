import { useState } from 'react';

export default function ComponentReference() {
  // State variables to demonstrate interactive components
  const [activeTab, setActiveTab] = useState('identify');
  const [selectedRadio, setSelectedRadio] = useState('image1');
  const [checkboxStates, setCheckboxStates] = useState({
    boundingBoxes: true,
    evidenceLabels: true,
    highConfidenceOnly: false,
    disabled: false,
  });
  const [switchStates, setSwitchStates] = useState({
    autoAnalyze: true,
    providerFallback: true,
    disabled: false,
  });
  const [searchQuery, setSearchQuery] = useState('oscilloscope');
  const [selectValue, setSelectValue] = useState('openrouter-multimodal');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState('What is the function of the knob on the left?');
  const [inputError, setInputError] = useState('');
  const [page, setPage] = useState(1);

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 p-4 sm:p-8 space-y-12 max-w-7xl mx-auto">
      {/* SECTION 20: NAVIGATION / HEADER BAR */}
      <header className="sticky top-0 z-30 glass-panel rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-400 flex items-center justify-center font-bold text-slate-950 text-xl shadow-lg shadow-cyan-500/20">
            ST
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white">SceneTrace</h1>
              <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                MVP Component System
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Conversational Visual Assistant Baseline (CODIENYCH 1.0)
            </p>
          </div>
        </div>

        {/* SECTION 19: BREADCRUMBS */}
        <nav
          aria-label="Breadcrumb"
          className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400"
        >
          <span className="hover:text-cyan-400 cursor-pointer">Session: #sf-8902</span>
          <span>/</span>
          <span className="hover:text-cyan-400 cursor-pointer">Image #1: Lab Bench</span>
          <span>/</span>
          <span className="text-cyan-400 font-semibold">Entity #04: Oscilloscope</span>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-[11px]">OpenRouter / Gemini Fallback</span>
          </div>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="px-3.5 py-1.5 text-xs font-medium rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/60 transition-colors focus-ring"
          >
            Clear Session
          </button>
        </div>
      </header>

      {/* SECTION TITLE & DESCRIPTION */}
      <div className="space-y-2 border-b border-slate-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/50 text-cyan-400 text-xs font-mono">
          System Reference Standard
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-white">
          High-Fidelity Component Reference System
        </h2>
        <p className="text-slate-400 text-sm max-w-3xl leading-relaxed">
          Comprehensive visual reference covering all 24 UI component categories and complete state
          matrices (default, hover, focus, active, disabled, loading, error, success, selected)
          using SceneTrace domain-specific visual context.
        </p>
      </div>

      {/* 1. TYPOGRAPHY HIERARCHY */}
      <section className="glass-panel p-6 rounded-2xl space-y-4">
        <h3 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
          01. Typography Hierarchy
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/60 p-6 rounded-xl border border-slate-800/60">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-mono text-slate-500 block uppercase">
                Heading 1 — 32px Bold
              </span>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Scene & Object Analysis
              </h1>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 block uppercase">
                Heading 2 — 24px Semibold
              </span>
              <h2 className="text-2xl font-semibold text-slate-100">
                Visual Evidence Correspondence
              </h2>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 block uppercase">
                Heading 3 — 18px Medium
              </span>
              <h3 className="text-lg font-medium text-slate-200">Tektronix Digital Oscilloscope</h3>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-mono text-slate-500 block uppercase">
                Body Text — 14px Regular
              </span>
              <p className="text-sm text-slate-300 leading-relaxed">
                The active image shows an electronics workbench containing a digital oscilloscope on
                the left side, connected to a breadboard via BNC probe channels.
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 block uppercase">
                Caption / Small — 12px Muted
              </span>
              <p className="text-xs text-slate-400">
                Uploaded 2 minutes ago • 1920x1080 WebP • 2.4 MB • Session ID #sf-8902
              </p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 block uppercase">
                Mono Metadata & Coordinates
              </span>
              <div className="font-mono text-xs text-cyan-400 bg-slate-900 p-2.5 rounded border border-cyan-900/40">
                bbox: [120, 45, 340, 210] • conf: 94.2% • evidence: OBSERVED
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BUTTONS WITH STATES */}
      <section className="glass-panel p-6 rounded-2xl space-y-4">
        <h3 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
          02. Buttons (Default, Hover, Focus, Active, Disabled, Loading)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Primary */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-mono text-slate-400 block font-semibold">
              Primary (Cyan)
            </span>
            <button className="w-full py-2 px-4 rounded-lg bg-cyan-600 text-slate-950 font-semibold text-xs shadow-md shadow-cyan-600/20 hover:bg-cyan-500 focus-ring active:bg-cyan-700">
              Analyze Scene
            </button>
            <button className="w-full py-2 px-4 rounded-lg bg-cyan-600 text-slate-950 font-semibold text-xs opacity-50 cursor-not-allowed">
              Disabled
            </button>
            <button className="w-full py-2 px-4 rounded-lg bg-cyan-600 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin text-slate-950" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Analyzing...
            </button>
          </div>

          {/* Secondary */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-mono text-slate-400 block font-semibold">
              Secondary (Slate)
            </span>
            <button className="w-full py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 focus-ring active:bg-slate-850">
              Compare Images
            </button>
            <button className="w-full py-2 px-4 rounded-lg bg-slate-800 text-slate-400 font-semibold text-xs border border-slate-800 opacity-50 cursor-not-allowed">
              Disabled
            </button>
            <button className="w-full py-2 px-4 rounded-lg bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin text-cyan-400" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Comparing...
            </button>
          </div>

          {/* Outline */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-mono text-slate-400 block font-semibold">Outline</span>
            <button className="w-full py-2 px-4 rounded-lg bg-transparent hover:bg-cyan-950/40 text-cyan-400 font-semibold text-xs border border-cyan-800 focus-ring active:bg-cyan-950/80">
              Export Evidence
            </button>
            <button className="w-full py-2 px-4 rounded-lg bg-transparent text-slate-600 font-semibold text-xs border border-slate-850 cursor-not-allowed">
              Disabled
            </button>
            <button className="w-full py-2 px-4 rounded-lg bg-transparent text-cyan-400 font-semibold text-xs border border-cyan-800 flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin text-cyan-400" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Exporting...
            </button>
          </div>

          {/* Ghost */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-mono text-slate-400 block font-semibold">Ghost</span>
            <button className="w-full py-2 px-4 rounded-lg bg-transparent hover:bg-slate-800 text-slate-300 font-semibold text-xs focus-ring">
              View History
            </button>
            <button className="w-full py-2 px-4 rounded-lg bg-transparent text-slate-600 font-semibold text-xs cursor-not-allowed">
              Disabled
            </button>
            <button className="w-full py-2 px-4 rounded-lg bg-slate-900 text-slate-300 font-semibold text-xs flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin text-slate-400" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Loading...
            </button>
          </div>

          {/* Danger */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-mono text-slate-400 block font-semibold">
              Danger (Rose)
            </span>
            <button className="w-full py-2 px-4 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow-md shadow-rose-600/20 focus-ring">
              Delete Image
            </button>
            <button className="w-full py-2 px-4 rounded-lg bg-rose-950 text-rose-800 font-semibold text-xs border border-rose-900/40 cursor-not-allowed">
              Disabled
            </button>
            <button className="w-full py-2 px-4 rounded-lg bg-rose-700 text-white font-semibold text-xs flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Deleting...
            </button>
          </div>

          {/* Success */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-mono text-slate-400 block font-semibold">
              Success (Emerald)
            </span>
            <button className="w-full py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold text-xs shadow-md shadow-emerald-600/20 focus-ring">
              Saved Session
            </button>
            <button className="w-full py-2 px-4 rounded-lg bg-emerald-950 text-emerald-800 font-semibold text-xs border border-emerald-900/40 cursor-not-allowed">
              Disabled
            </button>
            <button className="w-full py-2 px-4 rounded-lg bg-emerald-600 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2">
              ✓ Verified
            </button>
          </div>
        </div>
      </section>

      {/* 3. ICON BUTTONS */}
      <section className="glass-panel p-6 rounded-2xl space-y-4">
        <h3 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
          03. Icon Buttons (Upload, Compare, Zoom, Filter, Trash, Settings)
        </h3>
        <div className="flex flex-wrap gap-4 items-center bg-slate-950/60 p-6 rounded-xl border border-slate-800">
          <div className="space-y-1 text-center">
            <span className="text-[10px] font-mono text-slate-500 block">Default</span>
            <button className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center border border-slate-700 focus-ring">
              📷
            </button>
          </div>
          <div className="space-y-1 text-center">
            <span className="text-[10px] font-mono text-slate-500 block">Hover / Active</span>
            <button className="w-10 h-10 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-700 flex items-center justify-center focus-ring shadow-lg shadow-cyan-950">
              🔍
            </button>
          </div>
          <div className="space-y-1 text-center">
            <span className="text-[10px] font-mono text-slate-500 block">Selected</span>
            <button className="w-10 h-10 rounded-lg bg-cyan-600 text-slate-950 font-bold flex items-center justify-center focus-ring shadow-md shadow-cyan-500/30">
              ⇄
            </button>
          </div>
          <div className="space-y-1 text-center">
            <span className="text-[10px] font-mono text-slate-500 block">Disabled</span>
            <button className="w-10 h-10 rounded-lg bg-slate-900 text-slate-600 border border-slate-850 flex items-center justify-center cursor-not-allowed">
              ⚙️
            </button>
          </div>
          <div className="space-y-1 text-center">
            <span className="text-[10px] font-mono text-slate-500 block">Danger Hover</span>
            <button className="w-10 h-10 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/60 flex items-center justify-center focus-ring">
              🗑️
            </button>
          </div>
        </div>
      </section>

      {/* 4. FORM INPUTS (TEXT, TEXTAREA, SEARCH, SELECT) */}
      <section className="glass-panel p-6 rounded-2xl space-y-4">
        <h3 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
          04. Inputs, Search, & Select (Default, Hover, Focus, Active, Disabled, Error, Success)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-slate-950/60 p-6 rounded-xl border border-slate-800">
          {/* Default / Focused Input */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300 block font-semibold">
              Natural-Language Question Input
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question about the active image..."
              className="w-full px-3.5 py-2 rounded-lg bg-slate-900 text-slate-100 text-xs border border-slate-700 hover:border-slate-600 focus-ring transition-all placeholder:text-slate-500"
            />
            <span className="text-[10px] text-slate-400 block">
              Press Enter or click send to inquire about visible entities.
            </span>
          </div>

          {/* Error State Input */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-rose-300 block font-semibold">
              Error State Input (Empty Query)
            </label>
            <input
              type="text"
              value={inputError}
              onChange={(e) => setInputError(e.target.value)}
              placeholder="Question cannot be empty..."
              className="w-full px-3.5 py-2 rounded-lg bg-rose-950/30 text-rose-200 text-xs border border-rose-500/80 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/40 outline-none transition-all placeholder:text-rose-400/50"
            />
            <span className="text-[10px] text-rose-400 block font-mono">
              ⚠️ Question input is required before submitting AI prompt.
            </span>
          </div>

          {/* Success State Input */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-emerald-300 block font-semibold">
              Validated File Reference Input
            </label>
            <div className="relative">
              <input
                type="text"
                readOnly
                value="lab_setup_final_v2.webp (2.4 MB)"
                className="w-full px-3.5 py-2 pr-9 rounded-lg bg-emerald-950/20 text-emerald-200 text-xs border border-emerald-500/60 outline-none"
              />
              <span className="absolute right-3 top-2 text-emerald-400 text-xs font-bold">✓</span>
            </div>
            <span className="text-[10px] text-emerald-400 block font-mono">
              ✓ Server-validated MIME: image/webp
            </span>
          </div>

          {/* SECTION 5: SEARCH INPUT WITH FILTER TAGS */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300 block font-semibold">
              05. Search Entities & Visual Tags
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-500 text-xs">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search detected objects..."
                className="w-full pl-9 pr-8 py-2 rounded-lg bg-slate-900 text-slate-100 text-xs border border-slate-700 focus-ring placeholder:text-slate-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-slate-500 hover:text-slate-300 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="flex gap-1.5 flex-wrap pt-1">
              <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 text-[10px] font-mono cursor-pointer">
                #oscilloscope
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono cursor-pointer hover:bg-slate-700">
                #breadboard
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono cursor-pointer hover:bg-slate-700">
                #multimeter
              </span>
            </div>
          </div>

          {/* SECTION 6: SELECT DROPDOWN */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300 block font-semibold">
              06. Model Select Dropdown
            </label>
            <select
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg bg-slate-900 text-slate-100 text-xs border border-slate-700 hover:border-slate-600 focus-ring transition-all cursor-pointer"
            >
              <option value="openrouter-multimodal">OpenRouter Gateway (Primary Multimodal)</option>
              <option value="gemini-flash">Direct Gemini 3.8 Flash (Fallback)</option>
              <option value="custom-schema">Structured JSON Schema Output</option>
            </select>
            <span className="text-[10px] text-slate-400 block font-mono">
              Selected provider: {selectValue}
            </span>
          </div>

          {/* Disabled Input */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-500 block font-semibold">
              Disabled Input State
            </label>
            <input
              type="text"
              disabled
              value="Processing AI multimodal context..."
              className="w-full px-3.5 py-2 rounded-lg bg-slate-950 text-slate-600 text-xs border border-slate-850 cursor-not-allowed opacity-60"
            />
            <span className="text-[10px] text-slate-600 block">
              Controls locked during background inference execution.
            </span>
          </div>
        </div>
      </section>

      {/* 7. CHECKBOX, 8. RADIO, & 9. SWITCH */}
      <section className="glass-panel p-6 rounded-2xl space-y-4">
        <h3 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
          07. Checkbox, 08. Radio, & 09. Switch Controls
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-950/60 p-6 rounded-xl border border-slate-800">
          {/* CHECKBOXES */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-semibold text-slate-300 block border-b border-slate-800 pb-1">
              07. Checkboxes
            </span>
            <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={checkboxStates.boundingBoxes}
                onChange={(e) =>
                  setCheckboxStates({ ...checkboxStates, boundingBoxes: e.target.checked })
                }
                className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500/50 cursor-pointer"
              />
              Show Object Bounding Boxes
            </label>
            <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={checkboxStates.evidenceLabels}
                onChange={(e) =>
                  setCheckboxStates({ ...checkboxStates, evidenceLabels: e.target.checked })
                }
                className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500/50 cursor-pointer"
              />
              Include Evidence Badges (`OBSERVED`)
            </label>
            <label className="flex items-center gap-2.5 text-xs text-slate-500 cursor-not-allowed select-none opacity-50">
              <input
                type="checkbox"
                disabled
                checked={false}
                className="w-4 h-4 rounded bg-slate-950 border-slate-800 cursor-not-allowed"
              />
              Lock Visual Context (Disabled)
            </label>
          </div>

          {/* RADIOS */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-semibold text-slate-300 block border-b border-slate-800 pb-1">
              08. Radio Buttons (Comparison Baseline)
            </span>
            <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="radio"
                name="comparisonTarget"
                value="image1"
                checked={selectedRadio === 'image1'}
                onChange={(e) => setSelectedRadio(e.target.value)}
                className="w-4 h-4 bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500/50 cursor-pointer"
              />
              Baseline Image #1 (Lab Setup Original)
            </label>
            <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="radio"
                name="comparisonTarget"
                value="image2"
                checked={selectedRadio === 'image2'}
                onChange={(e) => setSelectedRadio(e.target.value)}
                className="w-4 h-4 bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500/50 cursor-pointer"
              />
              Current Active Image #2 (Lab Setup Modified)
            </label>
            <label className="flex items-center gap-2.5 text-xs text-slate-500 cursor-not-allowed select-none opacity-50">
              <input
                type="radio"
                disabled
                name="comparisonTarget"
                value="disabled"
                className="w-4 h-4 bg-slate-950 border-slate-800 cursor-not-allowed"
              />
              Historical Image Archive (Disabled)
            </label>
          </div>

          {/* SWITCHES */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-semibold text-slate-300 block border-b border-slate-800 pb-1">
              09. Toggle Switches
            </span>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-slate-300">Auto-Analyze Uploads</span>
              <button
                type="button"
                onClick={() =>
                  setSwitchStates({ ...switchStates, autoAnalyze: !switchStates.autoAnalyze })
                }
                className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors focus-ring ${
                  switchStates.autoAnalyze
                    ? 'bg-cyan-600 justify-end'
                    : 'bg-slate-800 justify-start'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-slate-950 shadow-md"></span>
              </button>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-slate-300">Gemini Direct Fallback</span>
              <button
                type="button"
                onClick={() =>
                  setSwitchStates({
                    ...switchStates,
                    providerFallback: !switchStates.providerFallback,
                  })
                }
                className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors focus-ring ${
                  switchStates.providerFallback
                    ? 'bg-cyan-600 justify-end'
                    : 'bg-slate-800 justify-start'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-slate-950 shadow-md"></span>
              </button>
            </div>
            <div className="flex items-center justify-between gap-4 opacity-50">
              <span className="text-xs text-slate-500">Persistent RAG Memory (Disabled)</span>
              <button
                disabled
                type="button"
                className="w-10 h-5 flex items-center rounded-full p-0.5 bg-slate-900 justify-start cursor-not-allowed"
              >
                <span className="w-4 h-4 rounded-full bg-slate-700"></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. TABS */}
      <section className="glass-panel p-6 rounded-2xl space-y-4">
        <h3 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
          10. Tabs (Identify & Ask, Image Comparison, Visual Evidence, Session History)
        </h3>
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
          <div className="flex border-b border-slate-800 overflow-x-auto">
            <button
              onClick={() => setActiveTab('identify')}
              className={`px-4 py-2 text-xs font-mono font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'identify'
                  ? 'border-cyan-400 text-cyan-400 bg-cyan-950/30'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              [1] Identify & Ask
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className={`px-4 py-2 text-xs font-mono font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'compare'
                  ? 'border-cyan-400 text-cyan-400 bg-cyan-950/30'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              [2] Image Comparison (2 Images)
            </button>
            <button
              onClick={() => setActiveTab('evidence')}
              className={`px-4 py-2 text-xs font-mono font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'evidence'
                  ? 'border-cyan-400 text-cyan-400 bg-cyan-950/30'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              [3] Visual Evidence Mapping
            </button>
            <button
              disabled
              className="px-4 py-2 text-xs font-mono font-semibold border-b-2 border-transparent text-slate-600 cursor-not-allowed whitespace-nowrap"
            >
              [4] Cross-Session Library (Disabled)
            </button>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-lg text-xs text-slate-300 border border-slate-800">
            {activeTab === 'identify' && (
              <p>
                Active Tab: <strong>Identify & Ask</strong> — Ask natural-language questions about
                the active image context without re-uploading.
              </p>
            )}
            {activeTab === 'compare' && (
              <p>
                Active Tab: <strong>Image Comparison</strong> — Compares Baseline Image #1 and
                Current Image #2. Categorizes differences: Added, Moved, Changed.
              </p>
            )}
            {activeTab === 'evidence' && (
              <p>
                Active Tab: <strong>Visual Evidence Mapping</strong> — Displays ground-truth
                observed regions vs inferred visual context.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 11. CARDS */}
      <section className="glass-panel p-6 rounded-2xl space-y-4">
        <h3 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
          11. Domain Cards (Scene Overview, Visual Entity Card, Evidence Reference Card)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Scene Overview */}
          <div className="glass-card glass-card-hover p-5 rounded-xl space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 border border-cyan-800 px-2 py-0.5 rounded">
                ACTIVE SCENE
              </span>
              <span className="text-xs text-slate-400 font-mono">1920x1080</span>
            </div>
            <h4 className="text-sm font-bold text-slate-100">Electronics Research Workstation</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Scene containing test measurement hardware, breadboard circuit, and power supply
              probes.
            </p>
            <div className="pt-2 border-t border-slate-800/80 flex justify-between items-center text-xs font-mono text-slate-400">
              <span>8 Entities Extracted</span>
              <span className="text-emerald-400 font-semibold">96.8% Scene Conf.</span>
            </div>
          </div>

          {/* Card 2: Visual Object Entity Card */}
          <div className="glass-card glass-card-hover p-5 rounded-xl space-y-3 border-l-4 border-l-cyan-500">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-cyan-300">Entity #04</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-800">
                OBSERVED
              </span>
            </div>
            <h4 className="text-sm font-bold text-white">Tektronix Digital Oscilloscope</h4>
            <div className="text-xs font-mono text-slate-400 bg-slate-950 p-2 rounded border border-slate-800">
              bbox: [120, 45, 340, 210]
            </div>
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>Category: Hardware</span>
              <span className="text-cyan-400">94.2% Conf</span>
            </div>
          </div>

          {/* Card 3: Evidence Reference Card */}
          <div className="glass-card glass-card-hover p-5 rounded-xl space-y-3 border-l-4 border-l-amber-500">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-amber-300">Entity #07</span>
              <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 text-[10px] font-mono font-bold border border-amber-800">
                INFERRED
              </span>
            </div>
            <h4 className="text-sm font-bold text-white">Circuit Ground Reference Lead</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Black alligator clip attached to common rail. Inferred as ground based on wiring
              standard.
            </p>
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>Uncertainty: Low</span>
              <span className="text-amber-400">81.5% Conf</span>
            </div>
          </div>
        </div>
      </section>

      {/* 12. TABLES & 13. PAGINATION */}
      <section className="glass-panel p-6 rounded-2xl space-y-4">
        <h3 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
          12. Data Tables & 13. Pagination Controls
        </h3>
        <div className="bg-slate-950/60 rounded-xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3">Entity ID</th>
                  <th className="p-3">Label</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Bounding Box</th>
                  <th className="p-3">Confidence</th>
                  <th className="p-3">Evidence Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 text-slate-300">
                <tr className="hover:bg-slate-900/60 transition-colors">
                  <td className="p-3 font-mono text-cyan-400">#E-01</td>
                  <td className="p-3 font-semibold text-white">Digital Oscilloscope</td>
                  <td className="p-3">Test Equipment</td>
                  <td className="p-3 font-mono text-slate-400">[120, 45, 340, 210]</td>
                  <td className="p-3 font-mono text-emerald-400 font-semibold">94.2%</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                      OBSERVED
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button className="text-cyan-400 hover:text-cyan-300 font-mono text-[11px]">
                      Inspect →
                    </button>
                  </td>
                </tr>

                <tr className="bg-cyan-950/20 border-l-2 border-l-cyan-400">
                  <td className="p-3 font-mono text-cyan-400">#E-02 (Selected)</td>
                  <td className="p-3 font-semibold text-white">Solderless Breadboard</td>
                  <td className="p-3">Prototyping</td>
                  <td className="p-3 font-mono text-slate-400">[350, 180, 580, 390]</td>
                  <td className="p-3 font-mono text-emerald-400 font-semibold">91.8%</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                      OBSERVED
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button className="text-cyan-400 font-bold font-mono text-[11px]">
                      Active
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-900/60 transition-colors">
                  <td className="p-3 font-mono text-cyan-400">#E-03</td>
                  <td className="p-3 font-semibold text-white">Signal Generator Probe</td>
                  <td className="p-3">Cabling</td>
                  <td className="p-3 font-mono text-slate-400">[210, 190, 360, 240]</td>
                  <td className="p-3 font-mono text-amber-400 font-semibold">82.0%</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-amber-950 text-amber-400 border border-amber-800 font-bold">
                      INFERRED
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button className="text-cyan-400 hover:text-cyan-300 font-mono text-[11px]">
                      Inspect →
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-900/60 transition-colors">
                  <td className="p-3 font-mono text-cyan-400">#E-04</td>
                  <td className="p-3 font-semibold text-white">Component IC Chip</td>
                  <td className="p-3">Semiconductor</td>
                  <td className="p-3 font-mono text-slate-400">[420, 260, 460, 290]</td>
                  <td className="p-3 font-mono text-amber-400 font-semibold">64.5%</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 text-slate-400 border border-slate-700 font-bold">
                      UNCERTAIN
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button className="text-cyan-400 hover:text-cyan-300 font-mono text-[11px]">
                      Inspect →
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* SECTION 13: PAGINATION */}
          <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <span className="text-slate-400">Showing 1-4 of 8 Detected Visual Entities</span>
            <div className="flex items-center gap-1.5">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Prev
              </button>
              <button
                onClick={() => setPage(1)}
                className={`px-2.5 py-1 rounded ${page === 1 ? 'bg-cyan-600 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'}`}
              >
                1
              </button>
              <button
                onClick={() => setPage(2)}
                className={`px-2.5 py-1 rounded ${page === 2 ? 'bg-cyan-600 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'}`}
              >
                2
              </button>
              <button
                onClick={() => setPage(3)}
                className={`px-2.5 py-1 rounded ${page === 3 ? 'bg-cyan-600 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'}`}
              >
                3
              </button>
              <button
                onClick={() => setPage((p) => Math.min(3, p + 1))}
                className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 14. TOOLTIP, 15. DROPDOWN, & 16. DIALOG */}
      <section className="glass-panel p-6 rounded-2xl space-y-4">
        <h3 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
          14. Tooltip, 15. Dropdown Menu, & 16. Dialog Modal
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-950/60 p-6 rounded-xl border border-slate-800">
          {/* TOOLTIP DEMO */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-semibold text-slate-300 block border-b border-slate-800 pb-1">
              14. Interactive Tooltip
            </span>
            <div className="relative group inline-block">
              <button className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 font-mono">
                Hover to view Entity Bounding Box ℹ️
              </button>
              {/* Tooltip Overlay */}
              <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-20 w-64 p-3 rounded-lg bg-slate-900 border border-cyan-800 text-xs text-slate-200 shadow-xl shadow-slate-950 font-mono">
                <div className="text-cyan-400 font-bold">Tektronix TBS1052B</div>
                <div className="text-[10px] text-slate-400">bbox: [120, 45, 340, 210]</div>
                <div className="text-[10px] text-emerald-400 mt-1">
                  Ground Truth: OBSERVED (94.2%)
                </div>
              </div>
            </div>
          </div>

          {/* DROPDOWN MENU DEMO */}
          <div className="space-y-3 relative">
            <span className="text-xs font-mono font-semibold text-slate-300 block border-b border-slate-800 pb-1">
              15. Session Actions Dropdown
            </span>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center justify-between w-full focus-ring"
            >
              <span>Session Controls Menu</span>
              <span>{isDropdownOpen ? '▲' : '▼'}</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 right-0 top-full mt-2 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-1.5 z-20 space-y-1">
                <button className="w-full text-left px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800 rounded font-mono">
                  📥 Export Conversation JSON
                </button>
                <button className="w-full text-left px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800 rounded font-mono">
                  🔄 Switch Multimodal Provider
                </button>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsDialogOpen(true);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-rose-300 hover:bg-rose-950/60 rounded font-mono"
                >
                  ⚠️ Clear Session Data
                </button>
              </div>
            )}
          </div>

          {/* DIALOG MODAL TRIGGER */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-semibold text-slate-300 block border-b border-slate-800 pb-1">
              16. Dialog Modal Trigger
            </span>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="w-full py-2 px-4 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 font-semibold text-xs border border-cyan-800 focus-ring"
            >
              Open Dialog Modal Demo
            </button>
          </div>
        </div>
      </section>

      {/* 17. ALERTS & 18. TOAST NOTIFICATIONS */}
      <section className="glass-panel p-6 rounded-2xl space-y-4">
        <h3 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
          17. Alerts & 18. Toast Notifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ALERTS */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-semibold text-slate-300 block">
              17. Alert Banners
            </span>

            {/* Info */}
            <div className="p-3 rounded-lg bg-cyan-950/50 border border-cyan-800/80 text-cyan-200 text-xs flex items-start gap-2.5">
              <span>ℹ️</span>
              <div>
                <strong className="block font-semibold">Active Visual Context</strong>
                Latest accepted image #2 is set as the active conversation context.
              </div>
            </div>

            {/* Warning / Uncertain */}
            <div className="p-3 rounded-lg bg-amber-950/50 border border-amber-800/80 text-amber-200 text-xs flex items-start gap-2.5">
              <span>⚠️</span>
              <div>
                <strong className="block font-semibold">Ambiguous Reference Warning</strong>
                Multiple targets match "the clip". Please specify left or right lead.
              </div>
            </div>

            {/* Error */}
            <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-800/80 text-rose-200 text-xs flex items-start gap-2.5">
              <span>🛑</span>
              <div>
                <strong className="block font-semibold">AI Gateway Rate Limit Exceeded</strong>
                Rate limit reached. Retrying automatically with direct Gemini API fallback...
              </div>
            </div>

            {/* Success */}
            <div className="p-3 rounded-lg bg-emerald-950/50 border border-emerald-800/80 text-emerald-200 text-xs flex items-start gap-2.5">
              <span>✓</span>
              <div>
                <strong className="block font-semibold">Image Analysis Complete</strong>
                Identified 8 visual entities with evidence references.
              </div>
            </div>
          </div>

          {/* TOAST NOTIFICATIONS */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-semibold text-slate-300 block">
              18. Toast Notifications
            </span>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/40 shadow-xl text-xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-cyan-300 font-mono">
                  <span>📷</span> Image Upload Accepted (WebP, 2.4 MB)
                </div>
                <span className="text-slate-500 text-[10px]">Just now</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/40 shadow-xl text-xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-amber-300 font-mono">
                  <span>⚡</span> Provider Failover: Switched to Gemini 3.8 Flash
                </div>
                <span className="text-slate-500 text-[10px]">10s ago</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 21. LOADING, 22. EMPTY, 23. ERROR, & 24. SUCCESS STATES */}
      <section className="glass-panel p-6 rounded-2xl space-y-4">
        <h3 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
          21. Loading, 22. Empty, 23. Error, & 24. Success States
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 21. LOADING STATE */}
          <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-4">
            <span className="text-xs font-mono text-cyan-400 font-bold block">
              21. Loading State
            </span>
            <div className="space-y-2">
              <div className="h-4 w-3/4 rounded animate-shimmer"></div>
              <div className="h-4 w-full rounded animate-shimmer"></div>
              <div className="h-16 w-full rounded animate-shimmer"></div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono pt-2">
              <svg className="w-4 h-4 animate-spin text-cyan-400" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              <span>Analyzing visual features... 68%</span>
            </div>
          </div>

          {/* 22. EMPTY STATE */}
          <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 text-center space-y-3 flex flex-col justify-center items-center">
            <span className="text-xs font-mono text-slate-400 font-bold block">
              22. Empty State
            </span>
            <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-xl text-slate-500">
              🖼️
            </div>
            <h5 className="text-xs font-bold text-slate-200">No Active Image Uploaded</h5>
            <p className="text-[11px] text-slate-400">
              Drag & drop JPEG, PNG, or WebP (max 10 MB) to start visual conversation.
            </p>
          </div>

          {/* 23. ERROR STATE */}
          <div className="bg-slate-950/60 p-5 rounded-xl border border-rose-900/60 space-y-3">
            <span className="text-xs font-mono text-rose-400 font-bold block">23. Error State</span>
            <div className="text-xs font-bold text-rose-200">Failed to Connect to OpenRouter</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Network timeout during image extraction request. Direct Gemini fallback also pending.
            </p>
            <button className="w-full py-1.5 px-3 rounded bg-rose-950 text-rose-300 border border-rose-800 hover:bg-rose-900 text-xs font-semibold focus-ring">
              🔄 Retry Request
            </button>
          </div>

          {/* 24. SUCCESS STATE */}
          <div className="bg-slate-950/60 p-5 rounded-xl border border-emerald-900/60 space-y-3">
            <span className="text-xs font-mono text-emerald-400 font-bold block">
              24. Success State
            </span>
            <div className="text-xs font-bold text-emerald-200">Comparison Complete</div>
            <div className="space-y-1 font-mono text-[10px]">
              <div className="text-emerald-400">+ 2 Objects Added</div>
              <div className="text-rose-400">- 1 Object Removed</div>
              <div className="text-cyan-400">⇄ 1 Object Moved</div>
            </div>
            <button className="w-full py-1.5 px-3 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900 text-xs font-semibold focus-ring">
              View Breakdown
            </button>
          </div>
        </div>
      </section>

      {/* MODAL DIALOG (SECTION 16) */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel max-w-md w-full p-6 rounded-2xl border border-slate-700 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white font-mono">Confirm Session Data Clear</h3>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to clear the active anonymous conversation session? This will
              remove application-managed images, messages, and derived visual entity data.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 focus-ring"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md shadow-rose-600/30 focus-ring"
              >
                Clear Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

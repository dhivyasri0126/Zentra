import { useTheme } from '../context/ThemeContext.jsx';

export default function LandingPage({ onStartExploring }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[var(--color-surface-canvas)] text-[var(--color-neutral-900)] flex flex-col font-sans">
      {/* LANDING PAGE HEADER */}
      <header className="h-16 border-b border-[var(--color-neutral-200)] bg-[var(--color-surface-default)] px-8 flex items-center justify-between shrink-0 sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-blue-600)] text-white flex items-center justify-center font-bold shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M4 16v2a2 2 0 002 2h2M16 20h2a2 2 0 002-2v-2" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <span className="text-xl font-bold text-[var(--color-neutral-900)] tracking-tight">
              SceneTrace
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[var(--color-neutral-600)]">
            <a href="#how-it-works" className="hover:text-[var(--color-neutral-900)]">How it works</a>
            <a href="#use-cases" className="hover:text-[var(--color-neutral-900)]">Use cases</a>
            <a href="#features" className="hover:text-[var(--color-neutral-900)]">Features</a>
            <a href="#examples" className="hover:text-[var(--color-neutral-900)]">Examples</a>
            <a href="#faq" className="hover:text-[var(--color-neutral-900)]">FAQ</a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg text-neutral-600 hover:bg-neutral-100"
            title="Toggle theme"
          >
            {theme === 'dark' ? '☀' : '🌙'}
          </button>

          <button
            onClick={onStartExploring}
            className="px-3.5 py-1.5 rounded-lg border border-neutral-300 hover:bg-neutral-100 text-xs font-semibold text-neutral-800 bg-white"
          >
            Sign in
          </button>

          <button
            onClick={onStartExploring}
            className="px-4 py-2 rounded-xl bg-[var(--color-blue-600)] hover:bg-[var(--color-blue-700)] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
          >
            <span>Start Exploring</span>
            <span className="text-base font-bold">→</span>
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="px-8 py-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* HERO LEFT COLUMN */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Visual AI for Real-World Understanding</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-neutral-900)] tracking-tight leading-tight">
            Understand any image <br />
            <span className="text-[var(--color-blue-600)]">with a conversation.</span>
          </h1>

          <p className="text-sm text-[var(--color-neutral-600)] leading-relaxed max-w-xl">
            SceneTrace helps you explore, identify and understand objects, setups and changes in any image — just by asking questions. Upload an image, get clear answers, see evidence, and compare images to understand what's different.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onStartExploring}
              className="px-6 py-3 rounded-xl bg-[var(--color-blue-600)] hover:bg-[var(--color-blue-700)] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-colors"
            >
              <span>Start Exploring</span>
              <span className="text-base font-bold">→</span>
            </button>

            <button
              onClick={onStartExploring}
              className="px-6 py-3 rounded-xl border border-[var(--color-neutral-300)] hover:bg-[var(--color-neutral-100)] text-xs font-semibold text-[var(--color-neutral-800)] bg-white flex items-center gap-2 shadow-2xs transition-colors"
            >
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span>See How It Works</span>
            </button>
          </div>

          {/* FEATURE HIGHLIGHTS */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[var(--color-neutral-200)] text-xs">
            <div className="flex items-start gap-2">
              <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 shrink-0">🛡</div>
              <div>
                <div className="font-bold text-[var(--color-neutral-900)]">No account required</div>
                <div className="text-[11px] text-[var(--color-neutral-500)]">Start instantly</div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">🖼</div>
              <div>
                <div className="font-bold text-[var(--color-neutral-900)]">Evidence-backed answers</div>
                <div className="text-[11px] text-[var(--color-neutral-500)]">With visual references</div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600 shrink-0">⚖</div>
              <div>
                <div className="font-bold text-[var(--color-neutral-900)]">Compare images</div>
                <div className="text-[11px] text-[var(--color-neutral-500)]">Understand changes</div>
              </div>
            </div>
          </div>
        </div>

        {/* HERO RIGHT COLUMN: WORKSPACE MOCKUP PREVIEW */}
        <div className="lg:col-span-6">
          <div className="rounded-2xl border border-[var(--color-neutral-200)] bg-[var(--color-surface-default)] shadow-xl overflow-hidden">
            <div className="h-9 bg-neutral-100 border-b border-neutral-200 px-4 flex items-center justify-between text-xs font-semibold text-neutral-600">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 font-bold text-neutral-800">SceneTrace Workspace</span>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80"
              alt="SceneTrace Workspace Preview"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="px-8 py-16 bg-white border-y border-[var(--color-neutral-200)]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-blue-600)]">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl font-extrabold text-[var(--color-neutral-900)]">
              From image to insight in three simple steps
            </h2>
            <p className="text-xs text-[var(--color-neutral-600)]">
              Upload an image, ask your questions, and get clear, evidence-backed answers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-blue-50/40 border border-blue-100 space-y-4">
              <div className="w-10 h-10 rounded-full bg-[var(--color-blue-600)] text-white font-bold text-sm flex items-center justify-center">
                1
              </div>
              <h3 className="font-bold text-base text-[var(--color-neutral-900)]">Upload an image</h3>
              <p className="text-xs text-[var(--color-neutral-600)] leading-relaxed">
                Add a photo of any object, setup or scene from your device.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-50/40 border border-emerald-100 space-y-4">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center">
                2
              </div>
              <h3 className="font-bold text-base text-[var(--color-neutral-900)]">Ask your question</h3>
              <p className="text-xs text-[var(--color-neutral-600)] leading-relaxed">
                Find out what's in the image, learn more about specific objects, or ask follow-up questions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-amber-50/40 border border-amber-100 space-y-4">
              <div className="w-10 h-10 rounded-full bg-amber-600 text-white font-bold text-sm flex items-center justify-center">
                3
              </div>
              <h3 className="font-bold text-base text-[var(--color-neutral-900)]">Get clear answers</h3>
              <p className="text-xs text-[var(--color-neutral-600)] leading-relaxed">
                Receive detailed explanations with visual evidence. Upload a second image to compare and see what's different.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 py-8 bg-[var(--color-surface-default)] border-t border-[var(--color-neutral-200)] mt-auto">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--color-neutral-500)]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[var(--color-neutral-900)]">SceneTrace</span>
            <span>– Understand your images. Ask. Explore. Compare.</span>
          </div>

          <div>Built for curious learners ❤️</div>
        </div>
      </footer>
    </div>
  );
}

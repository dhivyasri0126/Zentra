const examples = [
  {
    title: 'Understand object position',
    description: 'Ask where an object is located and what is around it.',
    prompts: [
      'Where is the laptop positioned in the image?',
      'What is beside the laptop?',
      'Is the laptop on the left, center, or right?',
    ],
  },
  {
    title: 'Identify a scene',
    description: 'Turn an unfamiliar photo into a clear, evidence-based description.',
    prompts: [
      'What objects are visible in this image?',
      'Describe the scene and the main activity.',
      'What details are directly visible?',
    ],
  },
  {
    title: 'Read visible text',
    description: 'Ask SceneTrace to inspect labels, signs, diagrams, or handwriting.',
    prompts: [
      'Is there any readable text in the image?',
      'What does the label say?',
      'Which parts of the text are unclear?',
    ],
  },
  {
    title: 'Ask follow-up questions',
    description: 'Continue asking about the same uploaded image without uploading it again.',
    prompts: [
      'What is this object used for?',
      'How is it connected to the rest of the setup?',
      'What additional view would confirm this?',
    ],
  },
];

export default function ExamplesPage({ onStartSession }) {
  return (
    <main className="flex-1 min-w-0 overflow-y-auto bg-[var(--color-surface-canvas)] p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-blue-600)]">
            SceneTrace Examples
          </span>
          <h1 className="text-3xl font-bold text-[var(--color-neutral-900)]">
            Questions you can ask about an image
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-[var(--color-neutral-600)]">
            Upload your own image and use these patterns to explore object identity,
            position, relationships, visible text, and scene context. Answers come
            from the image you provide.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {examples.map((example) => (
            <article
              key={example.title}
              className="rounded-2xl bg-[var(--color-surface-default)] border border-[var(--color-neutral-200)] p-5 shadow-xs space-y-4"
            >
              <div>
                <h2 className="text-base font-bold text-[var(--color-neutral-900)]">{example.title}</h2>
                <p className="mt-1 text-xs leading-relaxed text-[var(--color-neutral-600)]">{example.description}</p>
              </div>
              <div className="space-y-2">
                {example.prompts.map((prompt) => (
                  <div
                    key={prompt}
                    className="rounded-xl bg-[var(--color-neutral-50)] border border-[var(--color-neutral-200)] px-3 py-2 text-xs text-[var(--color-neutral-800)]"
                  >
                    “{prompt}”
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <button
          onClick={onStartSession}
          className="px-5 py-3 rounded-xl bg-[var(--color-blue-600)] hover:bg-[var(--color-blue-700)] text-white text-xs font-bold transition-colors"
        >
          Upload an image and try a question
        </button>
      </div>
    </main>
  );
}

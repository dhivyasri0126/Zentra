import { visualReasoningStates } from '../tokens';

const colorSwatches = [
  ['Canvas', 'var(--color-surface-canvas)'],
  ['Surface', 'var(--color-surface-default)'],
  ['Subtle', 'var(--color-surface-subtle)'],
  ['Primary text', 'var(--color-text-primary)'],
  ['Secondary text', 'var(--color-text-secondary)'],
  ['Border', 'var(--color-border-default)'],
  ['Primary action', 'var(--color-interactive-primary)'],
  ['Selected', 'var(--color-surface-selected)'],
  ['Success', 'var(--color-success-surface)'],
  ['Warning', 'var(--color-warning-surface)'],
  ['Error', 'var(--color-error-surface)'],
];

const spacing = [
  ['1', '4px'],
  ['2', '8px'],
  ['3', '12px'],
  ['4', '16px'],
  ['6', '24px'],
  ['8', '32px'],
  ['12', '48px'],
];

const typeScale = [
  ['XS', '12px'],
  ['SM', '14px'],
  ['MD', '16px'],
  ['LG', '18px'],
  ['XL', '20px'],
  ['2XL', '24px'],
  ['3XL', '30px'],
  ['4XL', '36px'],
];

export function DesignTokenPage() {
  return (
    <main className="token-page">
      <header className="token-header">
        <div>
          <span className="token-eyebrow">DESIGN SYSTEM / PHASE 1</span>
          <h1>SceneTrace tokens</h1>
          <p>
            Visual Workbench + Spatial Evidence Layer. CSS variables are the canonical styling
            source.
          </p>
        </div>
        <div className="token-meta">
          <span>WCAG 2.2 AA oriented</span>
          <span>Desktop-first, responsive</span>
        </div>
      </header>

      <section className="token-section">
        <div className="token-section-heading">
          <span className="token-index">01</span>
          <div>
            <h2>Color</h2>
            <p>Neutral workspace with blue reserved for interaction and evidence.</p>
          </div>
        </div>

        <div className="swatch-grid">
          {colorSwatches.map(([label, value]) => (
            <div className="swatch" key={label}>
              <div className="swatch-color" style={{ background: value }} />
              <div>
                <strong>{label}</strong>
                <code>{value}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="token-section">
        <div className="token-section-heading">
          <span className="token-index">02</span>
          <div>
            <h2>Typography</h2>
            <p>Legible sans-serif UI with restrained technical metadata.</p>
          </div>
        </div>

        <div className="type-demo">
          <div className="type-display">Understand the scene.</div>
          <p className="type-body">
            Ask a question about what you see and keep the visual context while the conversation
            continues.
          </p>
          <p className="type-mono">SESSION_7F3A · IMAGE_02 · OBSERVED</p>
        </div>

        <div className="scale-list">
          {typeScale.map(([label, value]) => (
            <div className="scale-row" key={label}>
              <span>{label}</span>
              <strong style={{ fontSize: value }}>SceneTrace</strong>
              <code>{value}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="token-section">
        <div className="token-section-heading">
          <span className="token-index">03</span>
          <div>
            <h2>Spacing</h2>
            <p>4px base unit, with 8px rhythm for major layout decisions.</p>
          </div>
        </div>

        <div className="spacing-list">
          {spacing.map(([label, value]) => (
            <div className="spacing-row" key={label}>
              <code>space-{label}</code>
              <div className="spacing-bar" style={{ width: value }} />
              <span>{value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="token-section">
        <div className="token-section-heading">
          <span className="token-index">04</span>
          <div>
            <h2>States</h2>
            <p>Color is reinforced by text and meaning.</p>
          </div>
        </div>

        <div className="state-grid">
          {Object.values(visualReasoningStates).map((state) => (
            <div
              className="state-card"
              key={state.label}
              style={{
                color: state.foreground,
                background: state.surface,
              }}
            >
              <strong>{state.label}</strong>
              <span>{state.description}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="token-section">
        <div className="token-section-heading">
          <span className="token-index">05</span>
          <div>
            <h2>Component behavior</h2>
            <p>Examples of how tokens combine into real product controls.</p>
          </div>
        </div>

        <div className="component-demo">
          <button className="primary-button">Analyze image</button>
          <button className="secondary-button">Compare images</button>
          <label className="demo-input">
            <span>Question</span>
            <input placeholder="What is the object on the left?" />
          </label>
          <div className="focus-demo" tabIndex={0}>
            Keyboard focus example
          </div>
        </div>
      </section>
    </main>
  );
}

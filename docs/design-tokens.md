# SceneTrace Design Tokens

> Phase 1 visual system for the SceneTrace conversational visual assistant.
>
> Design direction: **Visual Workbench + Spatial Evidence Layer**
>
> Principles: image-first, evidence-oriented, calm technical clarity, WCAG 2.2 AA-oriented, CSS-first, implementation-realistic.

## 1. Token principles

### 1.1 CSS-first

CSS custom properties are the canonical source for visual styling.

Use Tailwind utilities and CSS variables in components. Do not move the complete styling system into JavaScript objects.

JavaScript/TypeScript objects are appropriate for:

- data
- component variants
- semantic state configuration
- icon metadata
- content configuration

They are not the canonical source for:

- colors
- typography
- spacing
- radii
- shadows
- motion
- breakpoints
- z-index

### 1.2 Semantic before primitive

Components should consume semantic tokens where possible.

Prefer:

```css
color: var(--color-text-primary);
background: var(--color-surface-default);
border-color: var(--color-border-default);
```

over:

```css
color: #101828;
background: #ffffff;
border-color: #d0d5dd;
```

Primitive tokens remain available for controlled composition.

### 1.3 Accessibility

The system is designed toward WCAG 2.2 AA.

Requirements:

- body text uses high-contrast neutral tokens
- primary actions use a dark enough signal blue with white text
- color is never the only status signal
- focus uses a visible two-layer treatment
- interactive targets should generally provide at least a 44 × 44 CSS px hit area
- reduced motion is respected
- essential information must remain understandable without color

### 1.4 Product-specific visual rule

SceneTrace is a visual inspection workspace, not a generic AI dashboard.

Avoid:

- purple/indigo AI branding
- gradients used as decoration
- glassmorphism
- neon glow
- AI sparkles
- excessive pills
- excessive cards
- decorative blobs
- decorative charts
- invented visual evidence

---

# 2. Color

## 2.1 Primitive neutral palette

| Token                 | Value     | Intended use           |
| --------------------- | --------- | ---------------------- |
| `--color-neutral-0`   | `#FFFFFF` | Pure white surfaces    |
| `--color-neutral-25`  | `#FCFCFD` | Subtle surface         |
| `--color-neutral-50`  | `#F9FAFB` | Application canvas     |
| `--color-neutral-100` | `#F2F4F7` | Secondary surface      |
| `--color-neutral-200` | `#EAECF0` | Subtle border          |
| `--color-neutral-300` | `#D0D5DD` | Default border         |
| `--color-neutral-400` | `#98A2B3` | Placeholder / disabled |
| `--color-neutral-500` | `#667085` | Secondary text         |
| `--color-neutral-600` | `#475467` | Supporting text        |
| `--color-neutral-700` | `#344054` | Strong secondary text  |
| `--color-neutral-800` | `#1D2939` | Headings               |
| `--color-neutral-900` | `#101828` | Primary text           |
| `--color-neutral-950` | `#0C111D` | Highest emphasis       |

## 2.2 Signal blue

Blue is an interaction signal, not an AI-branding effect.

| Token              | Value     | Intended use            |
| ------------------ | --------- | ----------------------- |
| `--color-blue-50`  | `#EFF8FF` | Subtle selected surface |
| `--color-blue-100` | `#D1E9FF` | Selected background     |
| `--color-blue-200` | `#B2DDFF` | Soft focus/selection    |
| `--color-blue-300` | `#84CAFF` | Highlight               |
| `--color-blue-400` | `#53B1FD` | Strong highlight        |
| `--color-blue-500` | `#2E90FA` | Interactive accent      |
| `--color-blue-600` | `#1570EF` | Primary action          |
| `--color-blue-700` | `#175CD3` | Hover/strong action     |
| `--color-blue-800` | `#1849A9` | Active/pressed          |
| `--color-blue-900` | `#194185` | Deep signal             |

## 2.3 Semantic tokens

| Token                                | Value                      | Meaning                 |
| ------------------------------------ | -------------------------- | ----------------------- |
| `--color-text-primary`               | `var(--color-neutral-900)` | Main text               |
| `--color-text-secondary`             | `var(--color-neutral-600)` | Supporting text         |
| `--color-text-tertiary`              | `var(--color-neutral-500)` | Metadata                |
| `--color-text-disabled`              | `var(--color-neutral-400)` | Disabled                |
| `--color-text-on-accent`             | `#FFFFFF`                  | Text on primary action  |
| `--color-surface-canvas`             | `var(--color-neutral-50)`  | App background          |
| `--color-surface-default`            | `#FFFFFF`                  | Main surface            |
| `--color-surface-subtle`             | `var(--color-neutral-100)` | Secondary surface       |
| `--color-surface-selected`           | `var(--color-blue-50)`     | Selected visual context |
| `--color-border-default`             | `var(--color-neutral-300)` | Standard border         |
| `--color-border-subtle`              | `var(--color-neutral-200)` | Low-emphasis divider    |
| `--color-border-strong`              | `var(--color-neutral-400)` | Strong boundary         |
| `--color-interactive-primary`        | `var(--color-blue-600)`    | Primary action          |
| `--color-interactive-primary-hover`  | `var(--color-blue-700)`    | Hover                   |
| `--color-interactive-primary-active` | `var(--color-blue-800)`    | Pressed                 |
| `--color-focus-ring`                 | `var(--color-blue-700)`    | Keyboard focus          |

## 2.4 Status tokens

Status always has text/icon plus color.

| State     | Foreground | Surface   | Use                   |
| --------- | ---------- | --------- | --------------------- |
| Success   | `#067647`  | `#ECFDF3` | Completed             |
| Warning   | `#B54708`  | `#FFFAEB` | Needs attention       |
| Error     | `#B42318`  | `#FEF3F2` | Failed                |
| Info      | `#175CD3`  | `#EFF8FF` | Informational         |
| Uncertain | `#92400E`  | `#FFFAEB` | Insufficient evidence |

Do not use green/red/amber without a text label or icon.

## 2.5 Visual reasoning states

```text
Observed  → neutral/blue treatment
Inferred  → blue treatment with explicit "Inferred" label
Uncertain → amber treatment with explicit "Uncertain" label
```

The UI must not expose fabricated numerical confidence percentages.

---

# 3. Typography

## 3.1 Font families

```css
--font-family-sans:
  'Inter', 'SF Pro Text', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI',
  sans-serif;

--font-family-mono: 'SFMono-Regular', 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
```

Use the sans family for product UI. Use mono sparingly for technical metadata, IDs, timestamps, and model/provider diagnostics where useful.

## 3.2 Font sizes

| Token             | Size | Use                     |
| ----------------- | ---: | ----------------------- |
| `--font-size-xs`  | 12px | Metadata                |
| `--font-size-sm`  | 14px | Secondary UI            |
| `--font-size-md`  | 16px | Body/default            |
| `--font-size-lg`  | 18px | Emphasized body         |
| `--font-size-xl`  | 20px | Section heading         |
| `--font-size-2xl` | 24px | Page heading            |
| `--font-size-3xl` | 30px | Large page heading      |
| `--font-size-4xl` | 36px | Desktop display heading |

Essential body content should not be reduced below 16px merely to fit more content.

## 3.3 Line heights

| Token                   | Value |
| ----------------------- | ----: |
| `--line-height-tight`   |   1.2 |
| `--line-height-snug`    |   1.3 |
| `--line-height-normal`  |   1.5 |
| `--line-height-relaxed` |   1.6 |

Use `normal` for most UI/body content.

## 3.4 Font weights

```text
regular  = 400
medium   = 500
semibold = 600
bold     = 700
```

Avoid heavy weight for large portions of the interface.

---

# 4. Spacing

Use a 4px base unit with an 8px rhythm for major layout decisions.

| Token        | Value |
| ------------ | ----: |
| `--space-0`  |   0px |
| `--space-1`  |   4px |
| `--space-2`  |   8px |
| `--space-3`  |  12px |
| `--space-4`  |  16px |
| `--space-5`  |  20px |
| `--space-6`  |  24px |
| `--space-7`  |  28px |
| `--space-8`  |  32px |
| `--space-10` |  40px |
| `--space-12` |  48px |
| `--space-16` |  64px |
| `--space-20` |  80px |
| `--space-24` |  96px |

### Spacing philosophy

- 4px for micro adjustments
- 8px for control internals and compact lists
- 16px for normal component grouping
- 24px for major component padding
- 32px+ for section separation
- 48px+ for page-level breathing room

Do not use whitespace as decoration. Use it to establish grouping and hierarchy.

---

# 5. Radius

SceneTrace uses restrained geometry rather than highly rounded SaaS cards.

| Token           |  Value |
| --------------- | -----: |
| `--radius-none` |    0px |
| `--radius-sm`   |    4px |
| `--radius-md`   |    6px |
| `--radius-lg`   |    8px |
| `--radius-xl`   |   12px |
| `--radius-full` | 9999px |

Guidance:

- inputs/buttons: `md`
- cards/panels: `lg`
- dialogs/drawers: `xl`
- status tags: `full` only when compact
- avoid excessive pill-shaped containers

---

# 6. Borders

```text
--border-width-0 = 0px
--border-width-1 = 1px
--border-width-2 = 2px
```

Default:

```css
border: 1px solid var(--color-border-default);
```

Use 2px primarily for focus/selected states.

Do not use borders on every nested element.

---

# 7. Elevation

The product is a workbench, not a floating-card gallery.

| Token           | Shadow                            |
| --------------- | --------------------------------- |
| `--shadow-none` | `none`                            |
| `--shadow-xs`   | `0 1px 2px rgb(16 24 40 / 0.05)`  |
| `--shadow-sm`   | `0 1px 3px rgb(16 24 40 / 0.08)`  |
| `--shadow-md`   | `0 4px 8px rgb(16 24 40 / 0.10)`  |
| `--shadow-lg`   | `0 8px 24px rgb(16 24 40 / 0.12)` |

Use elevation only when it communicates layering:

- dialogs
- popovers
- bottom sheets
- sticky controls

Prefer borders and surface contrast for ordinary panels.

---

# 8. Motion

Motion communicates state and spatial relationship.

| Token                        | Duration |
| ---------------------------- | -------: |
| `--motion-duration-instant`  |      0ms |
| `--motion-duration-fast`     |    120ms |
| `--motion-duration-normal`   |    180ms |
| `--motion-duration-slow`     |    280ms |
| `--motion-duration-emphasis` |    400ms |

Easing:

```text
--motion-ease-standard = cubic-bezier(0.2, 0, 0, 1)
--motion-ease-enter    = cubic-bezier(0, 0, 0.2, 1)
--motion-ease-exit     = cubic-bezier(0.4, 0, 1, 1)
```

Use:

- 120ms for small state changes
- 180ms for normal UI transitions
- 280ms for panels/drawers
- 400ms only for meaningful spatial relationships

Always respect:

```css
@media (prefers-reduced-motion: reduce);
```

---

# 9. Breakpoints

Mobile-first:

| Token              |  Value | Role                       |
| ------------------ | -----: | -------------------------- |
| `--breakpoint-sm`  |  640px | Small tablet / large phone |
| `--breakpoint-md`  |  768px | Tablet                     |
| `--breakpoint-lg`  | 1024px | Small desktop              |
| `--breakpoint-xl`  | 1280px | Desktop                    |
| `--breakpoint-2xl` | 1536px | Wide desktop               |

Primary hackathon judging target:

```text
1440 × 900
```

Secondary:

```text
390 × 844
```

Responsive behavior should transform the same information architecture, not create a separate mobile product.

---

# 10. Content width

| Token                 |  Value |
| --------------------- | -----: |
| `--content-width-sm`  |  640px |
| `--content-width-md`  |  768px |
| `--content-width-lg`  | 1024px |
| `--content-width-xl`  | 1200px |
| `--content-width-2xl` | 1440px |

For the main SceneTrace workspace, prefer a fluid layout with a maximum width of 1440px.

The visual scene should receive the largest usable region.

---

# 11. Layer / z-index

Keep layering predictable.

| Token          | Value | Use                    |
| -------------- | ----: | ---------------------- |
| `--z-base`     |     0 | Normal content         |
| `--z-sticky`   |    10 | Sticky header/toolbars |
| `--z-dropdown` |    20 | Menus                  |
| `--z-popover`  |    30 | Popovers               |
| `--z-overlay`  |    40 | Backdrops              |
| `--z-modal`    |    50 | Dialogs                |
| `--z-toast`    |    60 | Toast/status           |
| `--z-critical` |    70 | Emergency UI           |

Avoid arbitrary z-index values.

---

# 12. Component state guidance

## Buttons

Primary:

```text
background: interactive-primary
text: text-on-accent
hover: interactive-primary-hover
active: interactive-primary-active
focus: focus ring
```

Secondary:

```text
background: surface-default
border: border-default
text: text-primary
```

Do not make every action primary.

## Inputs

Required states:

```text
default
hover
focus
filled
error
disabled
```

Use visible labels, not placeholder-only labels.

## Tabs

Use tabs for local workspace modes:

```text
Conversation
Objects
Compare
```

Do not use tabs for unrelated application sections.

## Status

Always combine:

```text
icon + text + optional color
```

## Object markers

Use numbered or symbolic markers over the image.

Do not place large colored pills directly over visual evidence.

---

# 13. Accessibility token rules

### Focus

Use a visible focus treatment:

```css
outline: 2px solid var(--color-focus-ring);
outline-offset: 2px;
```

### Touch

Interactive controls should generally have a 44px minimum hit area.

### Contrast

Target WCAG 2.2 AA contrast requirements:

- normal text: 4.5:1 minimum
- large text: 3:1 minimum
- meaningful UI boundaries/non-text graphics: sufficient contrast against adjacent colors

### Color independence

Never communicate:

```text
error = red
success = green
```

without text/icon reinforcement.

### Reduced motion

When reduced motion is requested:

- remove nonessential transitions
- disable spatial animation
- preserve state changes without motion

---

# 14. Token naming conventions

Use:

```text
--color-*
--font-family-*
--font-size-*
--font-weight-*
--line-height-*
--space-*
--radius-*
--border-*
--shadow-*
--motion-duration-*
--motion-ease-*
--breakpoint-*
--content-width-*
--z-*
```

Semantic component tokens may be introduced only when they represent a stable product concept.

Avoid names such as:

```text
--blue-button
--homepage-blue
--card-gray
--special-shadow
```

Prefer semantic names.

---

# 15. Tailwind 4 integration

Tailwind should consume the CSS token system rather than becoming a second source of truth.

Recommended structure:

```css
@import 'tailwindcss';
@import './tokens.css';
```

The token file defines canonical CSS variables.

Tailwind utilities can reference those variables directly.

Example:

```tsx
<button className="bg-[var(--color-interactive-primary)] text-[var(--color-text-on-accent)]">
  Analyze image
</button>
```

For repeated patterns, create semantic component classes in CSS rather than duplicating long utility strings everywhere.

---

# 16. Design-token acceptance criteria

The token system is ready when:

- all listed token groups exist,
- CSS variables are the styling source of truth,
- Tailwind can consume the tokens,
- no component needs hard-coded product colors,
- focus states are visible,
- reduced motion is supported,
- status does not rely on color alone,
- spacing and radius are consistent,
- z-index values are centralized,
- a working token reference page renders the system,
- the token page is usable on desktop and mobile.

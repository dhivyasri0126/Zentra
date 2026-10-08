/**
 * SceneTrace token metadata.
 *
 * CSS variables in tokens.css are the styling source of truth.
 * This file is intentionally limited to metadata and semantic variants.
 */

export const sceneTraceTokenGroups = [
  'color',
  'font family',
  'font size',
  'line height',
  'font weight',
  'spacing',
  'radius',
  'border',
  'shadow/elevation',
  'motion duration',
  'motion easing',
  'breakpoints',
  'content width',
  'layer/z-index',
] as const;

export const visualReasoningStates = {
  observed: {
    label: 'Observed',
    description: 'Directly visible in the image.',
    foreground: 'var(--color-text-primary)',
    surface: 'var(--color-surface-default)',
  },
  inferred: {
    label: 'Inferred',
    description: 'Reasoned from visible information.',
    foreground: 'var(--color-info-foreground)',
    surface: 'var(--color-info-surface)',
  },
  uncertain: {
    label: 'Uncertain',
    description: 'The visual evidence is insufficient.',
    foreground: 'var(--color-uncertain-foreground)',
    surface: 'var(--color-uncertain-surface)',
  },
} as const;

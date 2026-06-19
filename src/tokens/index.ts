/**
 * brutnoir-os · Design Tokens
 * Nameless Famous · Neobrutal Noir Design System
 * v0.2.0 — Monotone primary palette with vivid accents
 */

export const colors = {
  // ── Noir scale (primary-950 → primary-500) ────────────────────────────────
  noir:            "#0B0B0B",   // primary-950 — near-black bg
  noirLight:       "#1A1A1A",   // primary-900 — surface
  noirMid:         "#272727",   // primary-800 — border / toolbar
  noirSurface:     "#363636",   // primary-700 — raised surface
  noirBorder:      "#535353",   // primary-600 — visible border
  noirBorderLight: "#727272",   // primary-500 — subtle border

  // ── Cream scale (primary-50 → primary-400) ────────────────────────────────
  cream:           "#FAFAFA",   // primary-50 — text on dark bg
  creamDim:        "#E6E6E6",   // primary-200 — dimmed text
  creamMuted:      "#A3A3A3",   // primary-400 — muted text

  // ── Brand accents ─────────────────────────────────────────────────────────
  acid:            "#A3DA08",   // success-500 — lime-green
  acidDim:         "#7EAF01",   // success-600 — dimmed lime
  crimson:         "#F1300E",   // error-600 — scarlet
  amber:           "#E2B51D",   // warning-500 — amber/gold
  ice:             "#7eb8d4",   // info — muted blue (unchanged)
} as const;

export const fonts = {
  mono:    "'DM Mono', 'Courier New', monospace",
  display: "'DM Serif Display', 'Georgia', serif",
  sans:    "'DM Sans', 'Helvetica Neue', sans-serif",
} as const;

export const radii = {
  none: "0px",
  sm:   "2px",
} as const;

export const shadows = {
  // Canonical names
  default:     `3px 3px 0px ${colors.acid}`,
  sm:          `2px 2px 0px ${colors.acid}`,
  dark:        `3px 3px 0px #000`,
  inset:       "inset 2px 2px 0px rgba(0,0,0,0.5)",
  modal:       `6px 6px 0px ${colors.acid}`,
  // Aliases used by components
  shadow:      `3px 3px 0px ${colors.acid}`,
  shadowSm:    `2px 2px 0px ${colors.acid}`,
  shadowDark:  `3px 3px 0px #000`,
} as const;

export const tokens = {
  colors,
  fonts,
  radii,
  shadows,
} as const;

export type ColorKey = keyof typeof colors;
export type FontKey = keyof typeof fonts;

export default tokens;

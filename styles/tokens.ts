/**
 * Design Tokens
 * Centralized design system values for the BJ Portfolio
 * Based on the Hero design language
 */

// ============================================
// COLORS
// ============================================

export const colors = {
  background: {
    cream: '#FAF9F6',
    warmCream: '#FFF8E7',
    lightGray: '#F5F5F0',
    charcoal: '#1A1A1A',
  },
  text: {
    primary: '#1A1A1A',
    secondary: '#6B7280',
    muted: '#9CA3AF',
    onDark: '#FAF9F6',
  },
  accent: {
    red: '#dc2626',
    redLight: '#ef4444',
    redDark: '#b91c1c',
    pink: '#fecaca',
    blue: '#3b82f6', // cursor/selection
  },
  border: {
    dark: '#1A1A1A',
    light: '#E5E5E5',
    subtle: '#F0F0F0',
  },
} as const;

// ============================================
// TYPOGRAPHY
// ============================================

export const typography = {
  fontFamily: {
    display: "'Bebas Neue', sans-serif",
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  },
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.5rem',   // 72px
    '8xl': '6rem',     // 96px
    '9xl': '8rem',     // 128px
    // Hero-specific sizes
    hero: 'clamp(4rem, 15vw, 12rem)',
    heroMobile: 'clamp(2.5rem, 12vw, 4rem)',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.15em',
  },
  lineHeight: {
    none: 1,
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
} as const;

// ============================================
// ANIMATION
// ============================================

export const animation = {
  duration: {
    instant: 100,
    fast: 300,
    normal: 600,
    slow: 1000,
    slower: 1500,
  },
  easing: {
    default: 'ease-out',
    linear: 'linear',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    snappy: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  stagger: {
    fast: 50,
    normal: 100,
    slow: 150,
  },
} as const;

// ============================================
// SPACING
// ============================================

export const spacing = {
  section: {
    paddingY: 'py-16 md:py-24 lg:py-32',
    paddingX: 'px-6 md:px-12 lg:px-24',
    gap: 'gap-8 md:gap-12 lg:gap-16',
  },
  container: {
    maxWidth: 'max-w-[1800px]',
    center: 'mx-auto',
    padding: 'px-4 sm:px-6 lg:px-8',
  },
  component: {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '3rem',  // 48px
    '3xl': '4rem',  // 64px
    '4xl': '6rem',  // 96px
  },
} as const;

// ============================================
// BORDERS
// ============================================

export const borders = {
  width: {
    none: '0',
    thin: '1px',
    default: '2px',
    thick: '4px',
  },
  style: {
    solid: 'solid',
    dashed: 'dashed',
    dotted: 'dotted',
  },
  radius: {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px',
  },
} as const;

// ============================================
// SHADOWS
// ============================================

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  // Custom branded shadows
  accent: '0 4px 14px 0 rgba(220, 38, 38, 0.3)',
  glow: '0 0 20px rgba(220, 38, 38, 0.4)',
} as const;

// ============================================
// BREAKPOINTS
// ============================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================
// Z-INDEX
// ============================================

export const zIndex = {
  behind: -1,
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  max: 9999,
} as const;

// ============================================
// TRANSITIONS
// ============================================

export const transitions = {
  default: `all ${animation.duration.normal}ms ${animation.easing.default}`,
  fast: `all ${animation.duration.fast}ms ${animation.easing.default}`,
  slow: `all ${animation.duration.slow}ms ${animation.easing.smooth}`,
  color: `color ${animation.duration.fast}ms ${animation.easing.default}`,
  opacity: `opacity ${animation.duration.normal}ms ${animation.easing.default}`,
  transform: `transform ${animation.duration.normal}ms ${animation.easing.bounce}`,
} as const;

// ============================================
// COMPOSITE TOKENS
// ============================================

export const tokens = {
  colors,
  typography,
  animation,
  spacing,
  borders,
  shadows,
  breakpoints,
  zIndex,
  transitions,
} as const;

export default tokens;

// ============================================
// TYPE EXPORTS
// ============================================

export type Colors = typeof colors;
export type Typography = typeof typography;
export type Animation = typeof animation;
export type Spacing = typeof spacing;
export type Borders = typeof borders;
export type Shadows = typeof shadows;
export type Breakpoints = typeof breakpoints;
export type ZIndex = typeof zIndex;
export type Transitions = typeof transitions;
export type Tokens = typeof tokens;

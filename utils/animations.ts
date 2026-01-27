/**
 * Animation Utilities
 *
 * Common animation presets, easing functions, and duration constants
 * that match the portfolio's design tokens.
 *
 * These utilities work with GSAP ScrollTrigger for consistent,
 * performant scroll-based animations throughout the portfolio.
 */

// ============================================
// DURATION CONSTANTS
// ============================================

/**
 * Standard animation durations matching design tokens
 */
export const DURATIONS = {
  /** Fast transitions for micro-interactions (300ms) */
  fast: 0.3,
  /** Standard duration for most animations (600ms) */
  standard: 0.6,
  /** Slow duration for dramatic reveals (900ms) */
  slow: 0.9,
  /** Extra slow for hero animations (1200ms) */
  hero: 1.2,
} as const;

// ============================================
// EASING FUNCTIONS
// ============================================

/**
 * Easing presets for consistent motion feel
 * Using GSAP's easing syntax
 */
export const EASINGS = {
  /** Smooth ease-out for entrances - elements settle gently */
  easeOut: 'power2.out',
  /** Ease-in-out for continuous motion */
  easeInOut: 'power2.inOut',
  /** Snappy ease for quick interactions */
  easeOutQuart: 'power4.out',
  /** Bouncy ease for playful elements */
  elastic: 'elastic.out(1, 0.5)',
  /** Smooth exponential ease */
  expo: 'expo.out',
  /** Back ease for slight overshoot */
  back: 'back.out(1.4)',
} as const;

// ============================================
// STAGGER CONSTANTS
// ============================================

/**
 * Stagger timing for sequential animations
 */
export const STAGGERS = {
  /** Tight stagger for list items (100ms) */
  tight: 0.1,
  /** Standard stagger for card grids (150ms) */
  standard: 0.15,
  /** Relaxed stagger for sections (200ms) */
  relaxed: 0.2,
  /** Wide stagger for dramatic reveals (300ms) */
  wide: 0.3,
} as const;

// ============================================
// SCROLL TRIGGER DEFAULTS
// ============================================

/**
 * Default ScrollTrigger configuration
 */
export const SCROLL_TRIGGER_DEFAULTS = {
  /** When animation should start */
  start: 'top 80%',
  /** When animation should end (for scrub animations) */
  end: 'bottom 20%',
  /** Toggle actions: onEnter, onLeave, onEnterBack, onLeaveBack */
  toggleActions: 'play none none reverse',
} as const;

// ============================================
// ANIMATION PRESETS
// ============================================

/**
 * Pre-configured animation states for common patterns
 */
export const ANIMATION_PRESETS = {
  /** Fade in from below */
  fadeInUp: {
    from: {
      opacity: 0,
      y: 40,
    },
    to: {
      opacity: 1,
      y: 0,
      duration: DURATIONS.standard,
      ease: EASINGS.easeOut,
    },
  },

  /** Fade in from above */
  fadeInDown: {
    from: {
      opacity: 0,
      y: -40,
    },
    to: {
      opacity: 1,
      y: 0,
      duration: DURATIONS.standard,
      ease: EASINGS.easeOut,
    },
  },

  /** Fade in from left */
  fadeInLeft: {
    from: {
      opacity: 0,
      x: -40,
    },
    to: {
      opacity: 1,
      x: 0,
      duration: DURATIONS.standard,
      ease: EASINGS.easeOut,
    },
  },

  /** Fade in from right */
  fadeInRight: {
    from: {
      opacity: 0,
      x: 40,
    },
    to: {
      opacity: 1,
      x: 0,
      duration: DURATIONS.standard,
      ease: EASINGS.easeOut,
    },
  },

  /** Simple fade in */
  fadeIn: {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
      duration: DURATIONS.standard,
      ease: EASINGS.easeOut,
    },
  },

  /** Scale up from slightly smaller */
  scaleIn: {
    from: {
      opacity: 0,
      scale: 0.9,
    },
    to: {
      opacity: 1,
      scale: 1,
      duration: DURATIONS.standard,
      ease: EASINGS.easeOut,
    },
  },

  /** Reveal with clip-path from bottom */
  revealUp: {
    from: {
      clipPath: 'inset(100% 0% 0% 0%)',
    },
    to: {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: DURATIONS.slow,
      ease: EASINGS.easeOutQuart,
    },
  },

  /** Text character stagger animation */
  textReveal: {
    from: {
      opacity: 0,
      y: 20,
      rotateX: -90,
    },
    to: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: DURATIONS.fast,
      ease: EASINGS.easeOut,
    },
  },
} as const;

// ============================================
// PARALLAX PRESETS
// ============================================

/**
 * Parallax speed multipliers
 * Negative values move opposite to scroll
 */
export const PARALLAX_SPEEDS = {
  /** Very slow - subtle background movement */
  verySlowP: 0.1,
  slow: 0.2,
  medium: 0.5,
  fast: 0.8,
  /** Negative - moves opposite to scroll */
  reverseSlowP: -0.1,
  reverseMedium: -0.3,
} as const;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get appropriate duration based on user preferences
 * Returns 0 if user prefers reduced motion
 */
export const getAccessibleDuration = (duration: number): number => {
  return prefersReducedMotion() ? 0 : duration;
};

/**
 * Create responsive ScrollTrigger start value
 * Adjusts trigger point based on viewport size
 */
export const getResponsiveStart = (
  mobileStart = 'top 90%',
  desktopStart = 'top 80%'
): string => {
  if (typeof window === 'undefined') return desktopStart;
  return window.innerWidth < 768 ? mobileStart : desktopStart;
};

// ============================================
// TYPE EXPORTS
// ============================================

export type Duration = keyof typeof DURATIONS;
export type Easing = keyof typeof EASINGS;
export type Stagger = keyof typeof STAGGERS;
export type AnimationPreset = keyof typeof ANIMATION_PRESETS;
export type ParallaxSpeed = keyof typeof PARALLAX_SPEEDS;

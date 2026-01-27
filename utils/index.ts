/**
 * Utils Index
 *
 * Central export point for all utility functions and constants
 */

// Animation utilities
export {
  // Duration constants
  DURATIONS,
  // Easing functions
  EASINGS,
  // Stagger timing
  STAGGERS,
  // ScrollTrigger defaults
  SCROLL_TRIGGER_DEFAULTS,
  // Animation presets
  ANIMATION_PRESETS,
  // Parallax speeds
  PARALLAX_SPEEDS,
  // Helper functions
  prefersReducedMotion,
  getAccessibleDuration,
  getResponsiveStart,
} from './animations';

// Re-export types
export type {
  Duration,
  Easing,
  Stagger,
  AnimationPreset,
  ParallaxSpeed,
} from './animations';

/**
 * Hooks Index
 *
 * Central export point for all custom React hooks
 */

// Scroll Animation Hooks
export {
  useScrollFadeIn,
  useParallax,
  useStaggerReveal,
  useScrollProgress,
  useTextReveal,
  useHorizontalScroll,
  refreshScrollTrigger,
  killAllScrollTriggers,
} from './useScrollAnimation';

// Re-export types
export type {
  ScrollFadeInOptions,
  ParallaxOptions,
  StaggerRevealOptions,
} from './useScrollAnimation';

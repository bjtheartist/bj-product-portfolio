/**
 * useScrollAnimation.ts
 *
 * Custom hooks for scroll-triggered animations using GSAP ScrollTrigger.
 * These hooks provide reusable, performant scroll animations that respect
 * user preferences for reduced motion.
 *
 * USAGE:
 * 1. useScrollFadeIn - Fade in elements when they enter viewport
 * 2. useParallax - Move elements at different speeds than scroll
 * 3. useStaggerReveal - Animate children elements sequentially
 * 4. useScrollProgress - Track scroll progress for custom animations
 */

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  DURATIONS,
  EASINGS,
  STAGGERS,
  SCROLL_TRIGGER_DEFAULTS,
  ANIMATION_PRESETS,
  prefersReducedMotion,
  getAccessibleDuration,
} from '../utils/animations';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================
// TYPES
// ============================================

export interface ScrollFadeInOptions {
  /** Animation direction: 'up' | 'down' | 'left' | 'right' | 'none' */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Animation duration in seconds (default: 0.6) */
  duration?: number;
  /** Delay before animation starts in seconds */
  delay?: number;
  /** Distance to travel in pixels (default: 40) */
  distance?: number;
  /** When animation should trigger (default: 'top 80%') */
  start?: string;
  /** Custom easing function */
  ease?: string;
  /** Whether animation should replay on scroll back */
  once?: boolean;
  /** Callback when animation completes */
  onComplete?: () => void;
}

export interface ParallaxOptions {
  /** Speed multiplier (0.1 to 1, negative for reverse) */
  speed?: number;
  /** Direction of parallax movement */
  direction?: 'vertical' | 'horizontal';
  /** Start position for ScrollTrigger */
  start?: string;
  /** End position for ScrollTrigger */
  end?: string;
}

export interface StaggerRevealOptions {
  /** Delay between each child animation in seconds (default: 0.1) */
  stagger?: number;
  /** Animation preset to use */
  preset?: keyof typeof ANIMATION_PRESETS;
  /** When animation should trigger */
  start?: string;
  /** Custom from state */
  from?: gsap.TweenVars;
  /** Custom to state */
  to?: gsap.TweenVars;
  /** Whether animation should replay on scroll back */
  once?: boolean;
}

// ============================================
// useScrollFadeIn
// ============================================

/**
 * Fade in element when it enters the viewport
 *
 * @example
 * const ref = useScrollFadeIn({ direction: 'up', duration: 0.8 });
 * return <div ref={ref}>Content fades in from below</div>;
 */
export const useScrollFadeIn = <T extends HTMLElement = HTMLDivElement>(
  options: ScrollFadeInOptions = {}
) => {
  const elementRef = useRef<T>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const {
    direction = 'up',
    duration = DURATIONS.standard,
    delay = 0,
    distance = 40,
    start = SCROLL_TRIGGER_DEFAULTS.start,
    ease = EASINGS.easeOut,
    once = false,
    onComplete,
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion()) {
      gsap.set(element, { opacity: 1, x: 0, y: 0 });
      onComplete?.();
      return;
    }

    // Determine initial position based on direction
    const fromVars: gsap.TweenVars = {
      opacity: 0,
    };

    switch (direction) {
      case 'up':
        fromVars.y = distance;
        break;
      case 'down':
        fromVars.y = -distance;
        break;
      case 'left':
        fromVars.x = distance;
        break;
      case 'right':
        fromVars.x = -distance;
        break;
      case 'none':
      default:
        break;
    }

    // Set initial state
    gsap.set(element, fromVars);

    // Create animation
    animationRef.current = gsap.to(element, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: getAccessibleDuration(duration),
      delay,
      ease,
      onComplete,
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: once ? 'play none none none' : SCROLL_TRIGGER_DEFAULTS.toggleActions,
      },
    });

    // Cleanup
    return () => {
      animationRef.current?.scrollTrigger?.kill();
      animationRef.current?.kill();
    };
  }, [direction, duration, delay, distance, start, ease, once, onComplete]);

  return elementRef;
};

// ============================================
// useParallax
// ============================================

/**
 * Create a parallax effect where element moves at different speed than scroll
 *
 * @example
 * const ref = useParallax(0.3); // Moves at 30% of scroll speed
 * return <div ref={ref}>This moves slower than scroll</div>;
 */
export const useParallax = <T extends HTMLElement = HTMLDivElement>(
  speed: number = 0.2,
  options: ParallaxOptions = {}
) => {
  const elementRef = useRef<T>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const {
    direction = 'vertical',
    start = 'top bottom',
    end = 'bottom top',
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Skip parallax if user prefers reduced motion
    if (prefersReducedMotion()) {
      return;
    }

    // Calculate movement distance based on viewport
    const distance = window.innerHeight * speed;

    // Create parallax animation
    const toVars: gsap.TweenVars =
      direction === 'vertical' ? { y: distance } : { x: distance };

    animationRef.current = gsap.to(element, {
      ...toVars,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub: true,
      },
    });

    // Cleanup
    return () => {
      animationRef.current?.scrollTrigger?.kill();
      animationRef.current?.kill();
    };
  }, [speed, direction, start, end]);

  return elementRef;
};

// ============================================
// useStaggerReveal
// ============================================

/**
 * Stagger animation of children elements as container enters viewport
 *
 * @example
 * const ref = useStaggerReveal({ stagger: 0.1, preset: 'fadeInUp' });
 * return (
 *   <div ref={ref}>
 *     <div>Item 1</div>
 *     <div>Item 2</div>
 *     <div>Item 3</div>
 *   </div>
 * );
 */
export const useStaggerReveal = <T extends HTMLElement = HTMLDivElement>(
  options: StaggerRevealOptions = {}
) => {
  const containerRef = useRef<T>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const {
    stagger = STAGGERS.tight,
    preset = 'fadeInUp',
    start = SCROLL_TRIGGER_DEFAULTS.start,
    from,
    to,
    once = false,
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.children;
    if (!children.length) return;

    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion()) {
      gsap.set(children, { opacity: 1, x: 0, y: 0 });
      return;
    }

    // Get animation values from preset or custom options
    const animPreset = ANIMATION_PRESETS[preset];
    const fromVars = from || animPreset.from;
    const toVars = to || { ...animPreset.to };

    // Set initial state for all children
    gsap.set(children, fromVars);

    // Create staggered animation
    animationRef.current = gsap.to(children, {
      ...toVars,
      stagger,
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: once ? 'play none none none' : SCROLL_TRIGGER_DEFAULTS.toggleActions,
      },
    });

    // Cleanup
    return () => {
      animationRef.current?.scrollTrigger?.kill();
      animationRef.current?.kill();
    };
  }, [stagger, preset, start, from, to, once]);

  return containerRef;
};

// ============================================
// useScrollProgress
// ============================================

/**
 * Track scroll progress through an element (0 to 1)
 * Useful for custom animations tied to scroll position
 *
 * @example
 * const [ref, progress] = useScrollProgress();
 * return <div ref={ref} style={{ opacity: progress }}>Fades as you scroll</div>;
 */
export const useScrollProgress = <T extends HTMLElement = HTMLDivElement>() => {
  const elementRef = useRef<T>(null);
  const progressRef = useRef(0);
  const callbacksRef = useRef<Set<(progress: number) => void>>(new Set());

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        progressRef.current = self.progress;
        callbacksRef.current.forEach((cb) => cb(self.progress));
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const subscribe = useCallback((callback: (progress: number) => void) => {
    callbacksRef.current.add(callback);
    return () => {
      callbacksRef.current.delete(callback);
    };
  }, []);

  return { ref: elementRef, progress: progressRef, subscribe };
};

// ============================================
// useTextReveal
// ============================================

/**
 * Reveal text with character or word-based animation
 * Splits text and animates each part sequentially
 *
 * @example
 * const ref = useTextReveal({ splitBy: 'words' });
 * return <h1 ref={ref}>This headline reveals word by word</h1>;
 */
export const useTextReveal = <T extends HTMLElement = HTMLHeadingElement>(
  options: {
    splitBy?: 'chars' | 'words';
    stagger?: number;
    start?: string;
    duration?: number;
  } = {}
) => {
  const elementRef = useRef<T>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const {
    splitBy = 'words',
    stagger = 0.05,
    start = SCROLL_TRIGGER_DEFAULTS.start,
    duration = DURATIONS.fast,
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion()) {
      return;
    }

    const text = element.textContent || '';
    const parts = splitBy === 'chars' ? text.split('') : text.split(' ');

    // Clear element and wrap each part in a span
    element.innerHTML = '';
    element.style.display = 'inline-block';

    parts.forEach((part, index) => {
      const span = document.createElement('span');
      span.textContent = splitBy === 'chars' ? part : part + (index < parts.length - 1 ? '\u00A0' : '');
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      element.appendChild(span);
    });

    const spans = element.querySelectorAll('span');

    animationRef.current = gsap.to(spans, {
      opacity: 1,
      y: 0,
      duration: getAccessibleDuration(duration),
      stagger,
      ease: EASINGS.easeOut,
      scrollTrigger: {
        trigger: element,
        start,
      },
    });

    // Cleanup
    return () => {
      animationRef.current?.scrollTrigger?.kill();
      animationRef.current?.kill();
      // Restore original text
      if (element) {
        element.textContent = text;
      }
    };
  }, [splitBy, stagger, start, duration]);

  return elementRef;
};

// ============================================
// useHorizontalScroll
// ============================================

/**
 * Create horizontal scroll section that responds to vertical scroll
 *
 * @example
 * const { containerRef, innerRef } = useHorizontalScroll();
 * return (
 *   <div ref={containerRef}>
 *     <div ref={innerRef}>
 *       <div>Panel 1</div>
 *       <div>Panel 2</div>
 *       <div>Panel 3</div>
 *     </div>
 *   </div>
 * );
 */
export const useHorizontalScroll = <
  TContainer extends HTMLElement = HTMLDivElement,
  TInner extends HTMLElement = HTMLDivElement
>() => {
  const containerRef = useRef<TContainer>(null);
  const innerRef = useRef<TInner>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    // Skip if user prefers reduced motion
    if (prefersReducedMotion()) {
      return;
    }

    const scrollWidth = inner.scrollWidth;
    const containerWidth = container.offsetWidth;
    const distance = scrollWidth - containerWidth;

    if (distance <= 0) return;

    animationRef.current = gsap.to(inner, {
      x: -distance,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${distance}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      animationRef.current?.scrollTrigger?.kill();
      animationRef.current?.kill();
    };
  }, []);

  return { containerRef, innerRef };
};

// ============================================
// REFRESH UTILITY
// ============================================

/**
 * Refresh all ScrollTrigger instances
 * Call this after layout changes or dynamic content updates
 */
export const refreshScrollTrigger = (): void => {
  if (typeof window !== 'undefined') {
    ScrollTrigger.refresh();
  }
};

/**
 * Kill all ScrollTrigger instances
 * Useful for cleanup on unmount
 */
export const killAllScrollTriggers = (): void => {
  if (typeof window !== 'undefined') {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
};

// Default export for convenience
export default {
  useScrollFadeIn,
  useParallax,
  useStaggerReveal,
  useScrollProgress,
  useTextReveal,
  useHorizontalScroll,
  refreshScrollTrigger,
  killAllScrollTriggers,
};

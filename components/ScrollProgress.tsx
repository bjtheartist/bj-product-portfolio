import React, { useEffect, useRef } from 'react';

/**
 * ScrollProgress
 *
 * Hairline (1px) horizontal progress indicator fixed to the top of the
 * viewport. Tracks the user's scroll position from 0 -> 1 and reflects it
 * as a CSS scaleX transform on a child "fill" element.
 *
 * Performance notes:
 * - Scroll events are coalesced through requestAnimationFrame.
 * - Progress is written directly to the DOM via a ref to avoid React
 *   re-renders on every frame.
 * - Respects prefers-reduced-motion by disabling the easing transition.
 * - Hides itself when the full-screen menu is open (body overflow=hidden).
 */
const ScrollProgress: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const fill = fillRef.current;
    if (!root || !fill) return;

    // Respect reduced-motion preference.
    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );
    const applyReducedMotion = () => {
      fill.style.transition = reducedMotionQuery.matches
        ? 'none'
        : 'transform 0.15s ease-out';
    };
    applyReducedMotion();
    reducedMotionQuery.addEventListener?.('change', applyReducedMotion);

    let rafId: number | null = null;
    let lastVisible = false;

    const computeAndApply = () => {
      rafId = null;
      const scrollTop = window.scrollY || window.pageYOffset || 0;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      let progress = docHeight > 0 ? scrollTop / docHeight : 0;
      if (progress < 0) progress = 0;
      else if (progress > 1) progress = 1;

      fill.style.transform = `scaleX(${progress})`;

      // Hide entirely when at the very top of the page.
      const shouldShow = progress >= 0.005;
      if (shouldShow !== lastVisible) {
        lastVisible = shouldShow;
        root.style.opacity = shouldShow ? '1' : '0';
        root.style.pointerEvents = shouldShow ? 'none' : 'none';
      }
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(computeAndApply);
    };

    // Run once on mount to set the initial state.
    computeAndApply();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Watch for the navbar menu opening/closing. The navbar locks
    // body scroll by setting document.body.style.overflow = 'hidden'.
    let menuOpen = document.body.style.overflow === 'hidden';
    const applyMenuVisibility = () => {
      // When the menu is open we override visibility to 0; otherwise
      // computeAndApply controls it via lastVisible.
      if (menuOpen) {
        root.style.opacity = '0';
      } else {
        root.style.opacity = lastVisible ? '1' : '0';
      }
    };
    applyMenuVisibility();

    const observer = new MutationObserver(() => {
      const nextMenuOpen = document.body.style.overflow === 'hidden';
      if (nextMenuOpen !== menuOpen) {
        menuOpen = nextMenuOpen;
        applyMenuVisibility();
      }
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style'],
    });

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      reducedMotionQuery.removeEventListener?.('change', applyReducedMotion);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-px z-[60] pointer-events-none"
      style={{
        backgroundColor: 'transparent',
        opacity: 0,
        transition: 'opacity 0.2s ease-out',
      }}
    >
      <div
        ref={fillRef}
        className="h-px bg-[#1c1a17]"
        style={{
          transform: 'scaleX(0)',
          transformOrigin: 'left center',
          transition: 'transform 0.15s ease-out',
          width: '100%',
        }}
      />
    </div>
  );
};

export default ScrollProgress;

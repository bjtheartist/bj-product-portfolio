import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // rAF never fires in hidden/background tabs, so the timeline would stall
    // at 000 with scroll locked. Skip the intro entirely — when the user
    // finally looks, the site is simply already there.
    if (document.visibilityState === 'hidden' || reduceMotion) {
      if (rootRef.current) rootRef.current.style.display = 'none';
      const id = window.setTimeout(() => onCompleteRef.current(), 50);
      return () => window.clearTimeout(id);
    }

    const counter = { v: 0 };
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      onCompleteRef.current();
    };

    // Failsafe: if the timeline stalls or errors, unlock the site anyway.
    const failsafe = window.setTimeout(() => {
      if (rootRef.current) rootRef.current.style.display = 'none';
      finish();
    }, 6000);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          window.clearTimeout(failsafe);
          finish();
        },
      });

      tl.to(counter, {
        v: 100,
        duration: 1.7,
        ease: 'power3.inOut',
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0');
          }
        },
      })
        .to(rootRef.current, {
          yPercent: -100,
          duration: 1.05,
          ease: 'power4.inOut',
        }, '+=0.15')
        .set(rootRef.current, { display: 'none' });
    }, rootRef);

    return () => {
      window.clearTimeout(failsafe);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="ldr" aria-hidden="true">
      <span ref={countRef} className="ldr__count">000</span>
      <div className="ldr__meta">
        <span className="t-mono">Kivara Studios&reg;</span>
        <span className="t-mono" style={{ color: 'var(--ember)' }}>Chicago, IL</span>
      </div>
    </div>
  );
};

export default Loader;

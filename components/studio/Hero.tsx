import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroCanvas from './HeroCanvas';

interface HeroProps {
  ready: boolean;
}

const Hero: React.FC<HeroProps> = ({ ready }) => {
  const rootRef = useRef<HTMLElement>(null);
  const played = useRef(false);

  useEffect(() => {
    if (!ready || played.current) return;
    played.current = true;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.fromTo(
        '.hero__title',
        { yPercent: 108 },
        { yPercent: 0, duration: 1.3, ease: 'power4.out' },
      )
        .fromTo(
          '.hero__tag .reveal-line > span',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, stagger: 0.09, ease: 'power3.out' },
          '-=0.85',
        )
        .fromTo(
          '.hero__meta',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.5',
        );
    }, rootRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={rootRef} className="hero" id="top">
      <HeroCanvas />
      <div className="hero__scrim" />

      <div className="hero__content">
        <p className="hero__tag">
          <span className="reveal-line">
            <span>An independent digital studio crafting</span>
          </span>
          <span className="reveal-line">
            <span>
              websites, brands &amp; content{' '}
              <em className="t-serif-it" style={{ color: 'var(--ember)' }}>that last.</em>
            </span>
          </span>
        </p>

        <div className="hero__title-wrap">
          <h1 className="hero__title">
            KIVARA<sup>&reg;</sup>
          </h1>
        </div>

        <div className="hero__meta t-mono">
          <span>Est. 2024 — Chicago, IL</span>
          <span className="hide-sm">Design — Build — Ship</span>
          <span className="hide-sm" style={{ color: 'var(--ember)' }}>Taking projects for 2026</span>
          <span>Scroll &darr;</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;

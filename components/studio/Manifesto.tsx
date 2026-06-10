import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// words flagged with `it` render in the italic serif accent
const SENTENCE: { w: string; it?: boolean }[] = [
  { w: 'Kivara' }, { w: 'is' }, { w: 'a' }, { w: 'studio' }, { w: 'for' },
  { w: 'owner-operated' }, { w: 'businesses' }, { w: '—' },
  { w: 'work' }, { w: 'that' }, { w: 'earns' }, { w: 'attention' },
  { w: 'and' }, { w: 'turns' }, { w: 'it' }, { w: 'into' },
  { w: 'something', it: true }, { w: 'that', it: true }, { w: 'lasts.', it: true },
];

const Manifesto: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.mani__text .w',
        { opacity: 0.13 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: 'none',
          scrollTrigger: {
            trigger: '.mani__text',
            start: 'top 78%',
            end: 'bottom 42%',
            scrub: 0.4,
          },
        },
      );
      gsap.fromTo(
        '.mani__sub',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.mani__sub', start: 'top 88%' },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="sect" id="studio">
      <div className="sect__head">
        <span className="t-mono">(01) — The Studio</span>
        <span className="t-mono">A note from Kivara</span>
      </div>

      <p className="mani__text">
        {SENTENCE.map((token, i) => (
          <React.Fragment key={i}>
            <span className={`w${token.it ? ' it' : ''}`}>{token.w}</span>
            {' '}
          </React.Fragment>
        ))}
      </p>

      <p className="mani__sub">
        We work in small numbers, one project at a time. No templates, no
        bloat — just clean, handcrafted websites, brand systems, and content
        strategies for people who'd rather be remembered than ranked.
        Led by Billy Ndizeye, based in Chicago, working worldwide.
      </p>
    </section>
  );
};

export default Manifesto;

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    name: 'Web Design & Development',
    body: 'Custom websites designed and built end-to-end — fast, search-ready, and made to convert. From a 72-hour launch sprint to a full multi-page rebuild.',
    tags: ['React / Next.js', 'WordPress', 'E-commerce', 'SEO', '90+ Lighthouse'],
  },
  {
    name: 'Brand Systems',
    body: 'Identity that holds together everywhere it shows up — logo, type, color, and the rules that keep it consistent from business card to billboard.',
    tags: ['Identity', 'Art Direction', 'Print', 'Guidelines'],
  },
  {
    name: 'Content Strategy',
    body: 'A plan for what to say and where to say it. Editorial systems, email, and SEO content that compound instead of disappearing into the feed.',
    tags: ['Editorial', 'Email', 'SEO Content', 'Analytics'],
  },
  {
    name: 'Product Design',
    body: 'Research-led UX and UI for web and mobile apps — wireframes to polished, shippable interfaces and the design systems behind them.',
    tags: ['UX Research', 'UI Design', 'Prototyping', 'Design Systems'],
  },
];

const Services: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.svc-row').forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 92%' },
          },
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="sect" id="services">
      <div className="sect__head">
        <span className="t-mono">(03) — Capabilities</span>
        <span className="t-mono">What we do</span>
      </div>

      {SERVICES.map((s, i) => (
        <div key={s.name} className="svc-row">
          <span className="work-row__idx svc-row__idx-cell">/{String(i + 1).padStart(2, '0')}</span>
          <h3 className="svc-row__name">{s.name}</h3>
          <div>
            <p className="svc-row__body">{s.body}</p>
            <div className="svc-row__tags">
              {s.tags.map((t) => (
                <span key={t} className="svc-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Services;

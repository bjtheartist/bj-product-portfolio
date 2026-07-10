import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../../constants';
import { Project } from '../../types';
import CaseStudy from './CaseStudy';

gsap.registerPlugin(ScrollTrigger);

// curated order for the index
const FEATURED_IDS = ['1', '13', '10', '12', '4', '5', '3', '14', '9', '6'];

const works = FEATURED_IDS
  .map((id) => PROJECTS.find((p) => p.id === id))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

const Works: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [openProject, setOpenProject] = useState<{ project: Project; index: number } | null>(null);

  // rows fade-slide in on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.work-row').forEach((row) => {
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

  // floating preview follows the cursor
  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const xTo = gsap.quickTo(preview, 'x', { duration: 0.55, ease: 'power3.out' });
    const yTo = gsap.quickTo(preview, 'y', { duration: 0.55, ease: 'power3.out' });

    const move = (e: MouseEvent) => {
      xTo(e.clientX + 28);
      yTo(e.clientY - preview.offsetHeight / 2);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    gsap.to(preview, {
      autoAlpha: active === null ? 0 : 1,
      scale: active === null ? 0.92 : 1,
      duration: 0.4,
      ease: 'power3.out',
    });
  }, [active]);

  return (
    <section ref={rootRef} className="sect" id="work">
      <div className="sect__head">
        <span className="t-mono">(02) — Selected Work</span>
        <span className="t-mono">{String(works.length).padStart(2, '0')} Projects / 2024 — 26</span>
      </div>

      <div className="works__list">
        {works.map((p, i) => (
          <button
            key={p.id}
            type="button"
            className="work-row"
            onClick={() => setOpenProject({ project: p, index: i })}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <span className="work-row__idx">/{String(i + 1).padStart(2, '0')}</span>
            <img
              className="work-row__thumb"
              src={p.imageUrl}
              alt={p.title}
              loading="lazy"
            />
            <span className="work-row__title">{p.title}</span>
            <span className="work-row__cat">{p.category}</span>
            <span className="work-row__year">{p.year}</span>
          </button>
        ))}
      </div>

      <div ref={previewRef} className="works__preview" aria-hidden="true">
        {works.map((p, i) => (
          <img
            key={p.id}
            src={p.imageUrl}
            alt=""
            className={active === i ? 'on' : ''}
            loading="lazy"
          />
        ))}
      </div>

      {openProject && (
        <CaseStudy
          project={openProject.project}
          index={openProject.index}
          onClose={() => setOpenProject(null)}
        />
      )}
    </section>
  );
};

export default Works;

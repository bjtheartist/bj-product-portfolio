import React, { useRef, useState, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

const PERSONAL_PROJECT_TITLES = [
  'ChiStartupHub',
  'Chicago Incentive Explorer',
  'RecipeVault',
];

const PERSONAL_PROJECT_SET = new Set(PERSONAL_PROJECT_TITLES);

const getReducedMotionLayout = () => {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/* ─── Project Modal — same minimal editorial sheet ─── */
const ProjectModal: React.FC<{
  project: Project;
  onClose: () => void;
}> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center p-0 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#1c1a17]/75 backdrop-blur-sm" />
      <div
        className="project-modal-sheet relative w-full md:max-w-3xl max-h-[88vh] md:max-h-[90vh] overflow-y-auto bg-[#f5f2eb] border border-[#1c1a17]/15 rounded-t-2xl md:rounded-t-none rounded-b-none"
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes modalSlideUpMobile {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
          @keyframes modalCenterIn {
            from { opacity: 0; transform: translateY(1rem); }
            to { opacity: 1; transform: translateY(0); }
          }
          .project-modal-sheet {
            animation: modalSlideUpMobile 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          }
          @media (min-width: 768px) {
            .project-modal-sheet {
              animation: modalCenterIn 0.35s cubic-bezier(0.22, 1, 0.36, 1);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .project-modal-sheet {
              animation: modalCenterIn 0.01s linear;
            }
            @media (min-width: 768px) {
              .project-modal-sheet {
                animation: modalCenterIn 0.01s linear;
              }
            }
          }
        `}</style>

        <div className="md:hidden flex justify-center">
          <div className="w-12 h-1 rounded-full bg-[#1c1a17]/20 mt-3 mb-2 mx-auto" aria-hidden="true" />
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 md:top-5 right-5 z-10 w-9 h-9 flex items-center justify-center text-[#1c1a17]/60 hover:text-[#1c1a17] transition-colors duration-300"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="w-full h-56 md:h-80 overflow-hidden border-b border-[#1c1a17]/15">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className={`w-full h-full ${project.imageUrl.includes('makarios') ? 'object-contain bg-[#1c1a17]' : 'object-cover'}`}
              style={{ filter: 'sepia(15%) saturate(0.92) contrast(1.02) brightness(0.98)' }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#1c1a17]">
              <span
                className="text-3xl text-[#f5f2eb]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {project.title}
              </span>
            </div>
          )}
        </div>

        <div className="p-6 md:p-10">
          <div className="flex flex-wrap items-center gap-4 mb-6 text-[10px] tracking-[0.32em] uppercase text-[#1c1a17]/55">
            <span>{project.category}</span>
            {project.year && (
              <>
                <span aria-hidden="true" className="text-[#1c1a17]/25">/</span>
                <span>{project.year}</span>
              </>
            )}
          </div>

          <h3
            className="leading-[1.05] mb-5 text-[#1c1a17]"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              fontWeight: 400,
              letterSpacing: '-0.01em',
            }}
          >
            {project.title}
          </h3>

          <p className="text-base leading-relaxed mb-6 md:mb-8 text-[#1c1a17]/75 font-light max-w-2xl">
            {project.description}
          </p>

          {project.problem && (
            <div className="mb-6 md:mb-8">
              <p className="text-[10px] tracking-[0.32em] uppercase text-[#1c1a17]/55 mb-3">
                The challenge
              </p>
              <p className="text-sm leading-relaxed text-[#1c1a17]/75 font-light max-w-2xl">
                {project.problem}
              </p>
            </div>
          )}

          {project.tools && project.tools.length > 0 && (
            <div className="mb-6 md:mb-8">
              <p className="text-[10px] tracking-[0.32em] uppercase text-[#1c1a17]/55 mb-3">
                Tech stack
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm text-[#1c1a17]/75 font-light">
                {project.tools.map((tool, i, arr) => (
                  <React.Fragment key={tool.name}>
                    <span>{tool.name}</span>
                    {i < arr.length - 1 ? (
                      <span aria-hidden="true" className="text-[#1c1a17]/25">·</span>
                    ) : null}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-x-4 gap-y-1 pt-6 border-t border-[#1c1a17]/15 text-[10px] tracking-[0.28em] uppercase text-[#1c1a17]/55">
              {project.tags.map((tag, i, arr) => (
                <React.Fragment key={tag}>
                  <span>{tag}</span>
                  {i < arr.length - 1 ? (
                    <span aria-hidden="true" className="text-[#1c1a17]/25">·</span>
                  ) : null}
                </React.Fragment>
              ))}
            </div>
          )}

          {(project.liveUrl || project.githubUrl) && (
            <div className="mt-8">
              <a
                href={project.liveUrl || project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-[11px] tracking-[0.28em] uppercase font-medium text-[#1c1a17]"
              >
                <span className="border-b border-[#1c1a17] pb-1">Visit site</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Desktop pinned featured work ─── */
const FeaturedWorkScroller: React.FC<{
  projects: Project[];
  onOpen: (p: Project) => void;
}> = ({ projects, onOpen }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex] ?? projects[0];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || projects.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const scrollRange = Math.max(el.offsetHeight - window.innerHeight, 1);
      const progress = clamp(-rect.top / scrollRange, 0, 1);
      const nextIndex = clamp(
        Math.floor(progress * projects.length),
        0,
        projects.length - 1,
      );
      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [projects.length]);

  if (!activeProject) return null;

  const displayNumber = String(activeIndex + 1).padStart(2, '0');

  return (
    <div
      ref={sectionRef}
      className="relative hidden md:block"
      style={{ height: `${Math.max(projects.length, 1) * 112}svh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#1c1a17] text-[#f5f2eb]">
        <div className="absolute inset-0">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="absolute inset-0 transition-opacity duration-700 ease-out"
              style={{ opacity: activeIndex === index ? 1 : 0 }}
              aria-hidden={activeIndex !== index}
            >
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt=""
                  className={`w-full h-full ${
                    project.imageUrl.includes('makarios')
                      ? 'object-contain bg-[#1c1a17]'
                      : 'object-cover'
                  }`}
                  style={{
                    filter:
                      'sepia(12%) saturate(0.9) contrast(1.04) brightness(0.72)',
                    objectPosition: 'center top',
                  }}
                  draggable={false}
                />
              ) : (
                <div className="w-full h-full bg-[#1c1a17]" />
              )}
            </div>
          ))}
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(28,26,23,0.92) 0%, rgba(28,26,23,0.7) 38%, rgba(28,26,23,0.34) 68%, rgba(28,26,23,0.16) 100%)',
          }}
        />
        <div
          className="absolute inset-y-0 left-[38%] w-px bg-[#f5f2eb]/22 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 h-full flex flex-col justify-end px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28 pb-16 md:pb-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-5 text-[10px] tracking-[0.32em] uppercase text-[#f5f2eb]/62">
              <span>{`№${displayNumber}`}</span>
              <span aria-hidden="true" className="text-[#f5f2eb]/35">·</span>
              <span>{activeProject.category}</span>
              {activeProject.year && (
                <>
                  <span aria-hidden="true" className="text-[#f5f2eb]/35">·</span>
                  <span>{activeProject.year}</span>
                </>
              )}
            </div>

            <h3
              className="leading-[0.98] mb-6 text-[#f5f2eb]"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                fontWeight: 400,
                letterSpacing: '-0.015em',
              }}
            >
              {activeProject.title}
            </h3>

            <p className="max-w-xl text-sm md:text-base leading-relaxed text-[#f5f2eb]/76 font-light">
              {activeProject.description}
            </p>

            <button
              type="button"
              data-featured-project-view="true"
              data-project-id={activeProject.id}
              onClick={() => {
                const projectId = document
                  .querySelector('[data-featured-project-view="true"]')
                  ?.getAttribute('data-project-id');
                const currentProject =
                  projects.find((project) => project.id === projectId) ??
                  activeProject;
                onOpen(currentProject);
              }}
              aria-label={`View ${activeProject.title}`}
              className="group mt-8 inline-flex items-center gap-3 text-[11px] tracking-[0.28em] uppercase font-medium text-[#f5f2eb]"
            >
              <span className="border-b border-[#f5f2eb] pb-1">View project</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>

          <div className="absolute right-6 sm:right-10 md:right-16 lg:right-20 xl:right-28 bottom-16 md:bottom-20 flex flex-col items-end gap-2">
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`text-right text-[10px] tracking-[0.24em] uppercase transition-opacity duration-500 ${
                  activeIndex === index
                    ? 'opacity-100 text-[#f5f2eb]'
                    : 'opacity-35 text-[#f5f2eb]'
                }`}
                aria-label={`Show ${project.title}`}
              >
                {project.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Mobile editorial scroll sequence ─── */
const MobileFeaturedWorkScroller: React.FC<{
  projects: Project[];
  onOpen: (p: Project) => void;
}> = ({ projects, onOpen }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (projects.length === 0) return;
    const items = itemRefs.current.filter((item): item is HTMLElement =>
      Boolean(item),
    );
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visibleEntry) return;

        const nextIndex = Number(
          (visibleEntry.target as HTMLElement).dataset.mobileProjectIndex,
        );
        if (!Number.isNaN(nextIndex)) {
          setActiveIndex((current) =>
            current === nextIndex ? current : nextIndex,
          );
        }
      },
      {
        rootMargin: '-20% 0px -45% 0px',
        threshold: [0.18, 0.42, 0.68],
      },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [projects.length]);

  if (projects.length === 0) return null;

  return (
    <div className="md:hidden relative bg-[#1c1a17] text-[#f5f2eb]">
      <div
        className="sticky top-5 z-20 ml-auto mr-4 w-px h-24 bg-[#f5f2eb]/18"
        aria-hidden="true"
      >
        <div
          className="w-px bg-[#f5f2eb] transition-all duration-500 ease-out"
          style={{
            height: `${((activeIndex + 1) / projects.length) * 100}%`,
          }}
        />
      </div>

      {projects.map((project, index) => {
        const displayNumber = String(index + 1).padStart(2, '0');
        const titleSize =
          project.title.length > 26
            ? 'clamp(2rem, 9.5vw, 3.35rem)'
            : 'clamp(2.55rem, 12vw, 4.2rem)';

        return (
          <article
            key={project.id}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            data-mobile-project-index={index}
            className="relative min-h-[132svh] -mt-24 first:mt-0"
          >
            <div className="sticky top-0 h-[100svh] overflow-hidden">
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt=""
                  className={`absolute inset-0 w-full h-full ${
                    project.imageUrl.includes('makarios')
                      ? 'object-contain bg-[#1c1a17]'
                      : 'object-cover'
                  }`}
                  style={{
                    filter:
                      'sepia(12%) saturate(0.9) contrast(1.04) brightness(0.68)',
                    objectPosition: 'center top',
                  }}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  draggable={false}
                />
              ) : (
                <div className="absolute inset-0 bg-[#1c1a17]" />
              )}

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(28,26,23,0.52) 0%, rgba(28,26,23,0.2) 35%, rgba(28,26,23,0.88) 100%)',
                }}
              />

              <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-28">
                <div className="flex items-center gap-3 mb-4 text-[10px] tracking-[0.28em] uppercase text-[#f5f2eb]/62">
                  <span>{`№${displayNumber}`}</span>
                  <span aria-hidden="true" className="text-[#f5f2eb]/35">·</span>
                  <span>{project.category}</span>
                  {project.year && (
                    <>
                      <span aria-hidden="true" className="text-[#f5f2eb]/35">·</span>
                      <span>{project.year}</span>
                    </>
                  )}
                </div>

                <h3
                  className="leading-[0.98] text-[#f5f2eb]"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: titleSize,
                    fontWeight: 400,
                    letterSpacing: '-0.015em',
                  }}
                >
                  {project.title}
                </h3>

                <p className="mt-5 max-w-[21rem] text-sm leading-relaxed text-[#f5f2eb]/74 font-light">
                  {project.description.length > 128
                    ? project.description.slice(0, 128).trimEnd() + '...'
                    : project.description}
                </p>

                <button
                  type="button"
                  onClick={() => onOpen(project)}
                  aria-label={`View ${project.title}`}
                  className="mt-7 inline-flex w-fit items-center gap-3 text-[10px] tracking-[0.28em] uppercase font-medium text-[#f5f2eb]"
                >
                  <span className="border-b border-[#f5f2eb] pb-1">View project</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

/* ─── Compact personal project card ─── */
const CompactProjectCard: React.FC<{
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}> = ({ project, index, onOpen }) => {
  const displayNumber = String(index + 1).padStart(2, '0');

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="group text-left border-t border-[#1c1a17]/15 pt-5 md:pt-6"
    >
      <div className="aspect-[4/3] overflow-hidden bg-[#1c1a17] mb-5">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            style={{
              filter:
                'sepia(12%) saturate(0.9) contrast(1.04) brightness(0.9)',
              objectPosition: 'center top',
            }}
            loading="lazy"
            draggable={false}
          />
        ) : null}
      </div>

      <div className="flex items-center gap-3 mb-3 text-[10px] tracking-[0.28em] uppercase text-[#1c1a17]/55">
        <span>{`№${displayNumber}`}</span>
        <span aria-hidden="true" className="text-[#1c1a17]/25">·</span>
        <span>{project.category}</span>
      </div>

      <h3
        className="leading-[1.05] text-[#1c1a17]"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
          fontWeight: 400,
          letterSpacing: '-0.01em',
        }}
      >
        {project.title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-[#1c1a17]/65 font-light">
        {project.description.length > 120
          ? project.description.slice(0, 120).trimEnd() + '...'
          : project.description}
      </p>
    </button>
  );
};

/* ─── Single project card ─── */
const ProjectCard: React.FC<{
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}> = ({ project, index, onOpen }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const isRightAligned = index % 2 === 1;
  const displayNumber = String(index + 1).padStart(2, '0');

  useEffect(() => {
    // @ts-ignore — loaded via CDN
    const gsap = window.gsap;
    // @ts-ignore
    const ScrollTrigger = window.ScrollTrigger;
    const el = ref.current;
    if (!gsap || !ScrollTrigger || !el) return;

    const reveal = gsap.fromTo(
      el,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      },
    );

    let parallax: any = null;
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (!reducedMotion && imgRef.current) {
      parallax = gsap.to(imgRef.current, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    return () => {
      reveal.scrollTrigger?.kill();
      reveal.kill();
      if (parallax) {
        parallax.scrollTrigger?.kill();
        parallax.kill();
      }
    };
  }, []);

  return (
    <button
      ref={ref}
      id={`project-${displayNumber}`}
      onClick={() => onOpen(project)}
      className={`group relative block w-full md:w-[86vw] max-w-[1380px] text-left bg-transparent ${
        isRightAligned ? 'md:ml-auto' : 'md:mr-auto'
      }`}
      style={{
        opacity: 0,
      }}
    >
      {/* Mobile stacked layout */}
      <div className="md:hidden px-6 sm:px-10">
        <div className="flex items-center gap-3 mb-4 text-[10px] tracking-[0.32em] uppercase text-[#1c1a17]/55">
          <span>{`№${displayNumber}`}</span>
          <span aria-hidden="true" className="text-[#1c1a17]/25">·</span>
          <span>{project.category}</span>
          {project.year && (
            <>
              <span aria-hidden="true" className="text-[#1c1a17]/25">·</span>
              <span>{project.year}</span>
            </>
          )}
        </div>

        <div className="relative w-full aspect-[4/5] overflow-hidden border-y border-[#1c1a17]/15">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className={`absolute inset-0 w-full h-full transition-transform duration-[1400ms] ease-out group-hover:scale-[1.025] ${
                project.imageUrl.includes('makarios')
                  ? 'object-contain bg-[#1c1a17]'
                  : 'object-cover'
              }`}
              style={{
                filter:
                  'sepia(12%) saturate(0.9) contrast(1.04) brightness(0.92)',
                objectPosition: 'center top',
              }}
              loading="lazy"
              draggable={false}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[#1c1a17]">
              <span
                className="text-2xl text-[#f5f2eb]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {project.title}
              </span>
            </div>
          )}
        </div>

        <h3
          className="mt-5 leading-[1.02] text-[#1c1a17]"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.5rem, 7vw, 2.25rem)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
          }}
        >
          {project.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-[#1c1a17]/65 font-light">
          {project.description.length > 80
            ? project.description.slice(0, 80).trimEnd() + '…'
            : project.description}
        </p>

        <div className="mt-5 inline-flex items-center gap-3 text-[10px] tracking-[0.28em] uppercase font-medium text-[#1c1a17]">
          <span className="border-b border-[#1c1a17] pb-1">View project</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>

      {/* Desktop overlay layout */}
      <div className="relative w-full md:aspect-[16/9] overflow-hidden border-y border-[#1c1a17]/15 hidden md:block">
        {project.imageUrl ? (
          <img
            ref={imgRef}
            src={project.imageUrl}
            alt={project.title}
            className={`absolute inset-0 w-full h-full transition-transform duration-[1400ms] ease-out group-hover:scale-[1.025] ${
              project.imageUrl.includes('makarios')
                ? 'object-contain bg-[#1c1a17]'
                : 'object-cover'
            }`}
            style={{
              filter:
                'sepia(12%) saturate(0.9) contrast(1.04) brightness(0.78)',
              objectPosition: 'center top',
            }}
            loading="lazy"
            draggable={false}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1c1a17]">
            <span
              className="text-2xl text-[#f5f2eb]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {project.title}
            </span>
          </div>
        )}

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              isRightAligned
                ? 'linear-gradient(to left, rgba(28,26,23,0.88) 0%, rgba(28,26,23,0.66) 34%, rgba(28,26,23,0.28) 72%, rgba(28,26,23,0.1) 100%)'
                : 'linear-gradient(to right, rgba(28,26,23,0.88) 0%, rgba(28,26,23,0.66) 34%, rgba(28,26,23,0.28) 72%, rgba(28,26,23,0.1) 100%)',
          }}
        />
        <div
          className={`absolute top-0 bottom-0 hidden md:block w-px bg-[#f5f2eb]/28 ${
            isRightAligned ? 'right-[34%]' : 'left-[34%]'
          }`}
          aria-hidden="true"
        />

        <div
          className={`absolute inset-0 flex items-end p-5 pb-8 sm:p-10 md:p-14 lg:p-16 ${
            isRightAligned ? 'md:justify-end' : 'md:justify-start'
          }`}
        >
          <div
            className={`w-full max-w-xl text-[#f5f2eb] ${
              isRightAligned ? 'md:text-right' : 'md:text-left'
            }`}
          >
            <div
              className={`flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 text-[9px] sm:text-[10px] tracking-[0.28em] sm:tracking-[0.32em] uppercase text-[#f5f2eb]/65 ${
                isRightAligned ? 'md:justify-end' : ''
              }`}
            >
              <span>{`№${displayNumber}`}</span>
              <span aria-hidden="true" className="text-[#f5f2eb]/35">·</span>
              <span>{project.category}</span>
              {project.year && (
                <>
                  <span aria-hidden="true" className="text-[#f5f2eb]/35">·</span>
                  <span>{project.year}</span>
                </>
              )}
            </div>

            <h3
              className="mb-5 leading-[1.02]"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 5vw, 4.75rem)',
                fontWeight: 400,
                letterSpacing: '-0.01em',
              }}
            >
              {project.title}
            </h3>

            <p className="text-[13px] sm:text-base leading-relaxed text-[#f5f2eb]/78 font-light max-w-[31rem]">
              {project.description.length > 150
                ? project.description.slice(0, 150) + '...'
                : project.description}
            </p>

            <div
              className={`mt-7 inline-flex items-center gap-3 text-[10px] tracking-[0.28em] uppercase font-medium text-[#f5f2eb] ${
                isRightAligned ? 'md:flex-row-reverse' : ''
              }`}
            >
              <span className="border-b border-[#f5f2eb] pb-1">View project</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                {isRightAligned ? '←' : '→'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

/* ─── Offset Grid ─── */
const PortfolioCarousel: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [useReducedMotionLayout, setUseReducedMotionLayout] = useState(
    getReducedMotionLayout,
  );
  const selectedProjects = PROJECTS.filter(
    (project) => !PERSONAL_PROJECT_SET.has(project.title),
  );
  const personalProjects = PERSONAL_PROJECT_TITLES.map((title) =>
    PROJECTS.find((project) => project.title === title),
  ).filter((project): project is Project => Boolean(project));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncLayout = () => {
      setUseReducedMotionLayout(motionQuery.matches);
    };

    syncLayout();
    motionQuery.addEventListener('change', syncLayout);
    return () => {
      motionQuery.removeEventListener('change', syncLayout);
    };
  }, []);

  return (
    <>
      <section
        id="portfolio"
        ref={sectionRef}
        aria-label="Portfolio"
        className="pt-20 pb-12 md:pt-44 md:pb-20 bg-[#f5f2eb]"
      >
        <div
          className="relative"
          style={{
            opacity: isVisible ? 1 : 1,
            transition:
              'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <div className="relative px-6 sm:px-10 md:px-16 lg:px-20 mb-12 md:mb-28 max-w-3xl">
            <p className="text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-[#1c1a17]/55 mb-5">
              <span>II.</span>
              <span className="inline-block w-4 sm:w-5" aria-hidden="true" />
              <span>Selected work</span>
            </p>
            <h2
              className="leading-[1.02] tracking-[-0.01em] text-[#1c1a17]"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 4.5vw, 4rem)',
                fontWeight: 400,
              }}
            >
              Real clients, real results.
            </h2>
          </div>

          {useReducedMotionLayout ? (
            <div className="relative flex flex-col gap-y-16 md:gap-y-20">
              {selectedProjects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onOpen={setActiveProject}
                />
              ))}
            </div>
          ) : (
            <>
              <MobileFeaturedWorkScroller
                projects={selectedProjects}
                onOpen={setActiveProject}
              />
              <FeaturedWorkScroller
                projects={selectedProjects}
                onOpen={setActiveProject}
              />
            </>
          )}

          <div className="relative px-6 sm:px-10 md:px-16 lg:px-20 mt-24 md:mt-40 mb-12 md:mb-24 max-w-3xl">
            <p className="text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-[#1c1a17]/55 mb-5">
              <span>III.</span>
              <span className="inline-block w-4 sm:w-5" aria-hidden="true" />
              <span>Personal projects</span>
            </p>
            <h2
              className="leading-[1.02] tracking-[-0.01em] text-[#1c1a17]"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 4.5vw, 4rem)',
                fontWeight: 400,
              }}
            >
              Independent products and civic tools.
            </h2>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28">
            {personalProjects.map((project, i) => (
              <CompactProjectCard
                key={project.id}
                project={project}
                index={selectedProjects.length + i}
                onOpen={setActiveProject}
              />
            ))}
          </div>
        </div>
      </section>

      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  );
};

export default PortfolioCarousel;

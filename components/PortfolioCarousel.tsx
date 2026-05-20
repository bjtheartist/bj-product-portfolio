import React, { useRef, useState, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

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
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#1c1a17]/75 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#f5f2eb] border border-[#1c1a17]/15"
        style={{ animation: 'modalIn 0.35s cubic-bezier(0.22, 1, 0.36, 1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: translateY(1rem); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-9 h-9 flex items-center justify-center text-[#1c1a17]/60 hover:text-[#1c1a17] transition-colors duration-300"
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

          <p className="text-base leading-relaxed mb-8 text-[#1c1a17]/75 font-light max-w-2xl">
            {project.description}
          </p>

          {project.problem && (
            <div className="mb-8">
              <p className="text-[10px] tracking-[0.32em] uppercase text-[#1c1a17]/55 mb-3">
                The challenge
              </p>
              <p className="text-sm leading-relaxed text-[#1c1a17]/75 font-light max-w-2xl">
                {project.problem}
              </p>
            </div>
          )}

          {project.tools && project.tools.length > 0 && (
            <div className="mb-8">
              <p className="text-[10px] tracking-[0.32em] uppercase text-[#1c1a17]/55 mb-3">
                Tech stack
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#1c1a17]/75 font-light">
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

/* ─── Single project card ─── */
const ProjectCard: React.FC<{
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}> = ({ project, index, onOpen }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);
  const isRightAligned = index % 2 === 1;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      onClick={() => onOpen(project)}
      className={`group relative block w-full md:w-[86vw] max-w-[1380px] text-left bg-transparent ${
        isRightAligned ? 'md:ml-auto' : 'md:mr-auto'
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(1.5rem)',
        transition: `opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${
          (index % 2) * 0.12
        }s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${(index % 2) * 0.12}s`,
      }}
    >
      <div className="relative w-full min-h-[640px] sm:min-h-[720px] md:min-h-0 md:aspect-[16/9] overflow-hidden border-y border-[#1c1a17]/18">
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
                'sepia(12%) saturate(0.9) contrast(1.04) brightness(0.78)',
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
        <div className="absolute inset-x-0 top-0 h-px bg-[#f5f2eb]/35" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-[#f5f2eb]/35" aria-hidden="true" />

        <div
          className={`absolute inset-0 flex items-end p-6 sm:p-10 md:p-14 lg:p-16 ${
            isRightAligned ? 'md:justify-end' : 'md:justify-start'
          }`}
        >
          <div
            className={`max-w-xl text-[#f5f2eb] ${
              isRightAligned ? 'md:text-right' : 'md:text-left'
            }`}
          >
            <div
              className={`flex items-center gap-4 mb-5 text-[10px] tracking-[0.32em] uppercase text-[#f5f2eb]/65 ${
                isRightAligned ? 'md:justify-end' : ''
              }`}
            >
              <span>{project.category}</span>
              {project.year && (
                <>
                  <span aria-hidden="true" className="text-[#f5f2eb]/35">/</span>
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

            <p className="text-sm sm:text-base leading-relaxed text-[#f5f2eb]/78 font-light">
              {project.description.length > 190
                ? project.description.slice(0, 190) + '...'
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

  return (
    <>
      <section
        id="portfolio"
        ref={sectionRef}
        aria-label="Portfolio"
        className="py-32 md:py-44 bg-[#f5f2eb] overflow-hidden"
      >
        <div
          className="relative"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(1.5rem)',
            transition:
              'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <div className="relative px-6 sm:px-10 md:px-16 lg:px-20 mb-20 md:mb-28 max-w-3xl">
            <p className="text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-[#1c1a17]/55 mb-5">
              Selected work
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

          <div className="relative flex flex-col gap-y-12 md:gap-y-20">
            {PROJECTS.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
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

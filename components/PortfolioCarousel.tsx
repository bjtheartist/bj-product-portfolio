import React, { useRef, useState, useEffect, useCallback } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

/* ─── Project Modal ─── */
const ProjectModal: React.FC<{
  project: Project;
  onClose: () => void;
}> = ({ project, onClose }) => {
  // Close on Escape
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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto border-2 bg-[#FAF9F6]"
        style={{
          borderColor: '#1A1A1A',
          boxShadow: '8px 8px 0 #dc2626',
          animation: 'modalIn 0.25s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: translateY(1rem) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center border-2 bg-[#FAF9F6] hover:bg-[#1A1A1A] hover:text-[#FAF9F6] transition-colors"
          style={{ borderColor: '#1A1A1A' }}
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Hero image */}
        <div className="w-full h-56 md:h-72 overflow-hidden border-b-2" style={{ borderColor: '#1A1A1A' }}>
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className={`w-full h-full ${project.imageUrl.includes('makarios') ? 'object-contain bg-black' : 'object-cover'}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#dc2626]">
              <span className="text-4xl text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                {project.title}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Header row */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="px-3 py-1 text-xs font-bold tracking-wider uppercase border-2"
              style={{ borderColor: '#1A1A1A', backgroundColor: '#dc2626', color: '#fff' }}
            >
              {project.category}
            </span>
            {project.year && (
              <span
                className="px-2 py-1 text-xs font-mono"
                style={{ backgroundColor: '#1A1A1A', color: '#FAF9F6' }}
              >
                {project.year}
              </span>
            )}
          </div>

          <h3
            className="text-3xl md:text-4xl mb-3"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#1A1A1A' }}
          >
            {project.title}
          </h3>

          <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: '#444' }}>
            {project.description}
          </p>

          {/* Problem */}
          {project.problem && (
            <div className="mb-6">
              <h4
                className="text-xl mb-2"
                style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#1A1A1A' }}
              >
                The Challenge
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: '#555' }}>
                {project.problem}
              </p>
            </div>
          )}

          {/* Tech Stack */}
          {project.tools && project.tools.length > 0 && (
            <div className="mb-6">
              <h4
                className="text-xl mb-3"
                style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#1A1A1A' }}
              >
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool.name}
                    className="px-3 py-1.5 border-2 text-sm font-bold uppercase tracking-wide bg-[#FAF9F6] hover:bg-[#1A1A1A] hover:text-[#FAF9F6] transition-colors"
                    style={{ borderColor: '#1A1A1A', color: '#1A1A1A' }}
                  >
                    {tool.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 border-t-2" style={{ borderColor: '#1A1A1A' + '1a' }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 border font-medium"
                  style={{ borderColor: '#1A1A1A', color: '#1A1A1A', backgroundColor: '#FAF9F6' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Visit link */}
          {(project.liveUrl || project.githubUrl) && (
            <div className="mt-6">
              <a
                href={project.liveUrl || project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider border-2 transition-all duration-150 hover:-translate-y-0.5"
                style={{
                  borderColor: '#1A1A1A',
                  backgroundColor: '#dc2626',
                  color: '#fff',
                  boxShadow: '3px 3px 0 #1A1A1A',
                }}
              >
                Visit Site
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Carousel ─── */
const PortfolioCarousel: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Drag state
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  // IntersectionObserver entrance animation
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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Update arrow button state
  const updateScrollButtons = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanScrollLeft(track.scrollLeft > 10);
    setCanScrollRight(track.scrollLeft < track.scrollWidth - track.clientWidth - 10);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('scroll', updateScrollButtons, { passive: true });
    updateScrollButtons();
    return () => track.removeEventListener('scroll', updateScrollButtons);
  }, [updateScrollButtons]);

  // Scroll by one card width
  const scroll = (direction: 'left' | 'right') => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = 350 + 24; // card width + gap
    track.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  // Drag/swipe handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    // Don't start drag if clicking a button
    if ((e.target as HTMLElement).closest('button')) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.clientX;
    scrollStart.current = trackRef.current?.scrollLeft ?? 0;
    trackRef.current?.setPointerCapture(e.pointerId);
    if (trackRef.current) trackRef.current.style.cursor = 'grabbing';
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 5) hasDragged.current = true;
    trackRef.current.scrollLeft = scrollStart.current - dx;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    trackRef.current?.releasePointerCapture(e.pointerId);
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  };

  // Category tag color map
  const categoryColor = (cat: string): string => {
    switch (cat) {
      case 'FULL-STACK':
        return 'bg-[#dc2626] text-white';
      case 'DATA VIZ':
        return 'bg-[#1A1A1A] text-white';
      case 'WEB DESIGN':
        return 'bg-[#FAF9F6] text-[#1A1A1A] border border-[#1A1A1A]';
      default:
        return 'bg-[#dc2626] text-white';
    }
  };

  return (
    <>
      <section
        id="portfolio"
        ref={sectionRef}
        aria-label="Portfolio"
        style={{ backgroundColor: '#FAF9F6' }}
        className="py-20 md:py-28 overflow-hidden"
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(2rem)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          {/* Header */}
          <div className="flex items-end justify-between mb-8 sm:mb-12">
            <div>
              <p
                className="text-sm tracking-[0.2em] uppercase mb-2"
                style={{ color: '#dc2626', fontWeight: 600 }}
              >
                Portfolio
              </p>
              <h2
                className="text-3xl sm:text-4xl md:text-6xl leading-none"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  color: '#1A1A1A',
                }}
              >
                REAL CLIENTS, REAL RESULTS
              </h2>
            </div>

            {/* Navigation Arrows */}
            <div className="hidden md:flex gap-3">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className="w-12 h-12 flex items-center justify-center border-2 transition-all duration-150 select-none"
                style={{
                  borderColor: '#1A1A1A',
                  backgroundColor: canScrollLeft ? '#1A1A1A' : '#FAF9F6',
                  color: canScrollLeft ? '#FAF9F6' : '#1A1A1A',
                  boxShadow: canScrollLeft ? '3px 3px 0 #dc2626' : 'none',
                  opacity: canScrollLeft ? 1 : 0.4,
                  cursor: canScrollLeft ? 'pointer' : 'default',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className="w-12 h-12 flex items-center justify-center border-2 transition-all duration-150 select-none"
                style={{
                  borderColor: '#1A1A1A',
                  backgroundColor: canScrollRight ? '#1A1A1A' : '#FAF9F6',
                  color: canScrollRight ? '#FAF9F6' : '#1A1A1A',
                  boxShadow: canScrollRight ? '3px 3px 0 #dc2626' : 'none',
                  opacity: canScrollRight ? 1 : 0.4,
                  cursor: canScrollRight ? 'pointer' : 'default',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Carousel Track */}
          <div
            ref={trackRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="flex gap-6 overflow-x-auto pb-4"
            style={{
              cursor: 'grab',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <style>{`
              #portfolio .carousel-track::-webkit-scrollbar { display: none; }
            `}</style>

            {PROJECTS.map((project, i) => (
              <div
                key={project.id}
                className="flex-shrink-0"
                style={{
                  width: 'min(350px, calc(100vw - 3rem))',
                  scrollSnapAlign: 'start',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(1.5rem)',
                  transition: `opacity 0.5s ease-out ${i * 0.1}s, transform 0.5s ease-out ${i * 0.1}s`,
                }}
              >
                <div
                  className="h-full border-2 flex flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-1"
                  style={{
                    borderColor: '#1A1A1A',
                    backgroundColor: '#fff',
                    boxShadow: '4px 4px 0 #dc2626',
                  }}
                >
                  {/* Image */}
                  <div className="relative w-full h-48 overflow-hidden border-b-2" style={{ borderColor: '#1A1A1A' }}>
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className={`w-full h-full ${project.imageUrl.includes('makarios') ? 'object-contain bg-black' : 'object-cover'}`}
                        loading="lazy"
                        draggable={false}
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ backgroundColor: '#dc2626' }}
                      >
                        <span
                          className="text-3xl text-white"
                          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                          {project.title}
                        </span>
                      </div>
                    )}

                    {/* Category badge */}
                    <span
                      className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold tracking-wider uppercase ${categoryColor(project.category)}`}
                    >
                      {project.category}
                    </span>

                    {/* Year badge */}
                    <span
                      className="absolute top-3 right-3 px-2 py-1 text-xs font-mono"
                      style={{
                        backgroundColor: '#1A1A1A',
                        color: '#FAF9F6',
                      }}
                    >
                      {project.year}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5">
                    <h3
                      className="text-2xl mb-2"
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        color: '#1A1A1A',
                      }}
                    >
                      {project.title}
                    </h3>

                    <p
                      className="text-sm leading-relaxed mb-4 flex-1"
                      style={{ color: '#444' }}
                    >
                      {project.description.length > 140
                        ? project.description.slice(0, 140) + '...'
                        : project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 border font-medium"
                          style={{
                            borderColor: '#1A1A1A',
                            color: '#1A1A1A',
                            backgroundColor: '#FAF9F6',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* View Project button */}
                    <div className="mt-auto">
                      <button
                        onClick={() => setActiveProject(project)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider border-2 transition-all duration-150 hover:-translate-y-0.5 cursor-pointer"
                        style={{
                          borderColor: '#1A1A1A',
                          backgroundColor: '#dc2626',
                          color: '#fff',
                          boxShadow: '2px 2px 0 #1A1A1A',
                        }}
                      >
                        View Project
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <line x1="9" y1="3" x2="9" y2="21" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Navigation Arrows */}
          <div className="flex md:hidden justify-center gap-4 mt-6">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className="w-11 h-11 flex items-center justify-center border-2 transition-all duration-150"
              style={{
                borderColor: '#1A1A1A',
                backgroundColor: canScrollLeft ? '#1A1A1A' : '#FAF9F6',
                color: canScrollLeft ? '#FAF9F6' : '#1A1A1A',
                boxShadow: canScrollLeft ? '3px 3px 0 #dc2626' : 'none',
                opacity: canScrollLeft ? 1 : 0.4,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className="w-11 h-11 flex items-center justify-center border-2 transition-all duration-150"
              style={{
                borderColor: '#1A1A1A',
                backgroundColor: canScrollRight ? '#1A1A1A' : '#FAF9F6',
                color: canScrollRight ? '#FAF9F6' : '#1A1A1A',
                boxShadow: canScrollRight ? '3px 3px 0 #dc2626' : 'none',
                opacity: canScrollRight ? 1 : 0.4,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Project Modal */}
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

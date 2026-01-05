import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PROJECTS } from '../constants';
import { useTheme } from '../context/ThemeContext';
import { Project } from '../types';

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    // @ts-ignore
    const ScrollTrigger = window.ScrollTrigger;
    
    if (gsap && ScrollTrigger) {
      // Horizontal scroll animation
      const container = scrollContainerRef.current;
      if (container) {
        const scrollWidth = container.scrollWidth - container.clientWidth;
        
        gsap.to(container, {
          scrollLeft: scrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: '#portfolio',
            start: 'top top',
            end: () => `+=${scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          }
        });
      }

      // Section title animation
      gsap.fromTo('.portfolio-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#portfolio',
            start: 'top 80%',
          }
        }
      );
    }
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      // @ts-ignore
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = '';
      // @ts-ignore
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <section id="portfolio" className="relative h-screen bg-black overflow-hidden">
        {/* Section Header */}
        <div className="absolute top-8 left-6 md:left-12 lg:left-24 z-20">
          <h2 
            className="portfolio-title text-xs tracking-[0.3em] uppercase text-white/50"
          >
            Selected Work
          </h2>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="h-full flex items-center gap-8 px-6 md:px-12 lg:px-24 overflow-x-auto scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
        >
          {/* Spacer for initial view */}
          <div className="flex-shrink-0 w-[20vw]" />

          {PROJECTS.map((project, index) => (
            <article 
              key={project.id}
              className="portfolio-item flex-shrink-0 relative group cursor-pointer"
              onClick={() => openModal(project)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image Container */}
              <div className="relative w-[70vw] md:w-[50vw] lg:w-[40vw] aspect-[4/3] overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  loading="lazy"
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    hoveredIndex === index ? 'scale-105' : 'scale-100'
                  }`}
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 bg-black transition-opacity duration-500 ${
                  hoveredIndex === index ? 'opacity-30' : 'opacity-0'
                }`} />
              </div>

              {/* Project Info */}
              <div className="mt-6 flex justify-between items-start">
                <div>
                  <h3 
                    className="text-2xl md:text-3xl font-bold text-white mb-2"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {project.title}
                  </h3>
                  <span className="text-xs tracking-[0.2em] uppercase text-amber-400">
                    {project.category}
                  </span>
                </div>
                <span className="text-white/30 text-sm font-mono">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            </article>
          ))}

          {/* End Spacer */}
          <div className="flex-shrink-0 w-[20vw]" />
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-8 left-6 md:left-12 lg:left-24 right-6 md:right-12 lg:right-24 z-20">
          <div className="flex items-center gap-4">
            <span className="text-xs tracking-[0.2em] uppercase text-white/30">
              Scroll
            </span>
            <div className="flex-1 h-px bg-white/10">
              <div className="h-full bg-amber-400 w-0 transition-all duration-300" id="scroll-progress" />
            </div>
            <span className="text-xs text-white/30 font-mono">
              {String(PROJECTS.length).padStart(2, '0')} Projects
            </span>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <div 
            ref={modalRef}
            className="relative z-10 w-full max-w-6xl max-h-[90vh] mx-4 overflow-y-auto bg-zinc-900 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-20 text-xs tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors"
            >
              [Close]
            </button>

            {/* Hero Image */}
            <div className="relative aspect-video">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="mb-8">
                <span className="text-xs tracking-[0.2em] uppercase text-amber-400 mb-4 block">
                  {selectedProject.category}
                </span>
                <h2 
                  className="text-4xl md:text-5xl font-bold text-white mb-4"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {selectedProject.title}
                </h2>
                <p className="text-lg text-white/70 max-w-2xl">
                  {selectedProject.description}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-12">
                {/* Problem */}
                {selectedProject.problem && (
                  <div>
                    <h3 className="text-xs tracking-[0.2em] uppercase text-white/50 mb-4">
                      The Challenge
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {selectedProject.problem}
                    </p>
                  </div>
                )}

                {/* Solution */}
                {selectedProject.solution && (
                  <div>
                    <h3 className="text-xs tracking-[0.2em] uppercase text-white/50 mb-4">
                      The Solution
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>
                )}
              </div>

              {/* Tools & Links */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex flex-wrap gap-8 items-center justify-between">
                  {/* Tools */}
                  {selectedProject.tools && (
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tools.map((tool) => (
                        <span 
                          key={tool}
                          className="px-3 py-1 text-xs tracking-wide text-white/60 border border-white/20 rounded-full"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex gap-6">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs tracking-[0.2em] uppercase text-amber-400 hover:text-amber-300 transition-colors"
                      >
                        View Code →
                      </a>
                    )}
                    {selectedProject.year && (
                      <span className="text-xs tracking-[0.2em] uppercase text-white/30">
                        {selectedProject.year}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;

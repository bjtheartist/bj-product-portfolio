/**
 * PortfolioGrid.tsx
 *
 * Offset Bento Grid Portfolio Section
 * - Asymmetric grid layout (large + small cards)
 * - Flip/slide reveal animations on hover
 * - Neobrutalist design with charcoal borders
 * - Staggered entrance animations on scroll
 * - Skills tags on front, context on back
 */

import React, { useState, useRef, useEffect, useCallback, memo } from 'react';

// ============================================
// TYPES
// ============================================
interface Project {
  id: string;
  title: string;
  skills: string[];
  description: string;
  context: string;
  image: string;
  size: 'large' | 'small';
}

// ============================================
// PROJECT DATA
// ============================================
const PROJECTS: Project[] = [
  {
    id: 'communidata',
    title: 'CommuniData',
    skills: ['Data Viz', 'Full-Stack', 'React', 'Python'],
    description: 'Chicago neighborhood intelligence platform',
    context: 'Building a civic data platform that transforms Chicago Data Portal information into actionable neighborhood insights. Features interactive map explorer, report wizard, and a Trust Layer that makes it database-level impossible for unaudited data to reach users.',
    image: '/gallery/communidata.jpg',
    size: 'large',
  },
  {
    id: 'capital-access',
    title: 'Capital Access',
    skills: ['Content Strategy', 'Research', 'Writing'],
    description: 'Chicago startup capital newsletter',
    context: 'A weekly newsletter about Chicago startup capital—deals, opportunities, patterns. Historical consciousness meets present-day utility. Informative AND inviting. Designed a systematic 8-phase writing process with specialized pod teams.',
    image: '/gallery/capital-access.jpg',
    size: 'small',
  },
  {
    id: 'kavara-studio',
    title: 'Kavara Studio',
    skills: ['Product Design', 'Frontend', 'React'],
    description: 'Design and development consultancy',
    context: 'My umbrella for design and development work. From concept to code, I help teams build products that solve real problems. The focus: clarity over complexity, craft over shortcuts.',
    image: '/gallery/kavara.jpg',
    size: 'small',
  },
  {
    id: 'portfolio-site',
    title: 'This Site',
    skills: ['React', 'TypeScript', 'GSAP', 'Tailwind'],
    description: 'Neobrutalist portfolio experience',
    context: 'Meta-project: you\'re looking at it. Built with React, TypeScript, and GSAP. Neobrutalist aesthetic inspired by Area 17 and Lorenzo Bocchi. Parallax effects, scroll-triggered animations, and attention to detail.',
    image: '/gallery/portfolio.jpg',
    size: 'large',
  },
];

// ============================================
// SKILL TAG COMPONENT
// ============================================
interface SkillTagProps {
  skill: string;
}

const SkillTag: React.FC<SkillTagProps> = memo(({ skill }) => (
  <span className="inline-block px-2 py-1 text-[10px] sm:text-xs uppercase tracking-wider bg-[#FAF9F6] text-[#1A1A1A] border border-[#1A1A1A] font-medium">
    {skill}
  </span>
));

SkillTag.displayName = 'SkillTag';

// ============================================
// PROJECT CARD COMPONENT
// ============================================
interface ProjectCardProps {
  project: Project;
  index: number;
  isInView: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = memo(({ project, index, isInView }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const handleInteraction = useCallback(() => {
    setIsFlipped((prev) => !prev);
    setIsTouched(true);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!isTouched) {
      setIsFlipped(true);
    }
  }, [isTouched]);

  const handleMouseLeave = useCallback(() => {
    if (!isTouched) {
      setIsFlipped(false);
    }
  }, [isTouched]);

  // Reset touch state after a delay
  useEffect(() => {
    if (isTouched) {
      const timer = setTimeout(() => setIsTouched(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isTouched]);

  const isLarge = project.size === 'large';
  const staggerDelay = index * 0.15;

  return (
    <div
      className={`relative group cursor-pointer ${
        isLarge ? 'col-span-1 md:col-span-2 row-span-1' : 'col-span-1 row-span-1'
      }`}
      style={{
        perspective: '1500px',
        animationDelay: `${staggerDelay}s`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleInteraction}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleInteraction();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.title}`}
    >
      {/* Card Container with 3D Transform */}
      <div
        className={`relative w-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isInView
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-12'
        } ${isFlipped ? 'scale-[0.98]' : 'hover:scale-[1.02]'}`}
        style={{
          transitionDelay: isInView ? `${staggerDelay}s` : '0s',
          aspectRatio: isLarge ? '16/10' : '4/3',
        }}
      >
        {/* Card Frame - Neobrutalist Border */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isFlipped ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* FRONT FACE */}
          <div
            className="absolute inset-0 bg-[#FAF9F6] border-2 sm:border-3 border-[#1A1A1A] overflow-hidden"
            style={{
              boxShadow: isFlipped
                ? '0 0 0 #1A1A1A'
                : '6px 6px 0 #1A1A1A',
              transition: 'box-shadow 0.4s ease',
            }}
          >
            {/* Project Image */}
            <div
              className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
              style={{
                backgroundImage: `url(${project.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/40 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
              {/* Project Number */}
              <div className="mb-2">
                <span
                  className="text-[#dc2626] text-xs sm:text-sm tracking-[0.2em] font-bold"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#FAF9F6] mb-3 sm:mb-4 transition-transform duration-300 group-hover:translate-x-2"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {project.title}
              </h3>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.skills.map((skill) => (
                  <SkillTag key={skill} skill={skill} />
                ))}
              </div>

              {/* Hover Indicator */}
              <div
                className={`mt-4 flex items-center gap-2 transition-all duration-500 ${
                  isFlipped
                    ? 'opacity-0 -translate-x-4'
                    : 'opacity-0 group-hover:opacity-100 translate-x-0'
                }`}
              >
                <span className="text-[#FAF9F6] text-xs uppercase tracking-wider">
                  View Details
                </span>
                <svg
                  className="w-4 h-4 text-[#dc2626] transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>

            {/* Corner Accent */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-6 sm:w-8 h-px bg-[#dc2626]" />
              <div className="w-px h-6 sm:h-8 bg-[#dc2626]" />
            </div>
          </div>
        </div>

        {/* BACK FACE - Context/Description */}
        <div
          className={`absolute inset-0 bg-[#1A1A1A] border-2 sm:border-3 border-[#1A1A1A] overflow-hidden transition-all duration-500 ${
            isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            boxShadow: isFlipped
              ? '6px 6px 0 #dc2626'
              : '0 0 0 #dc2626',
            transition: 'box-shadow 0.4s ease, opacity 0.5s ease',
          }}
        >
          {/* Grid Pattern Background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(220, 38, 38, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(220, 38, 38, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
          />

          {/* Back Content */}
          <div className="relative h-full flex flex-col justify-between p-4 sm:p-6 md:p-8">
            {/* Header */}
            <div>
              {/* Close/Back indicator */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <span
                  className="text-[#dc2626] text-xs sm:text-sm tracking-[0.2em] font-bold uppercase"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  Project Context
                </span>
                <div className="w-6 h-6 border border-[#FAF9F6]/30 flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-[#FAF9F6]/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h4
                className="text-xl sm:text-2xl md:text-3xl font-black text-[#FAF9F6] mb-3 sm:mb-4"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {project.title}
              </h4>

              {/* Context Description */}
              <p className="text-xs sm:text-sm md:text-base text-[#FAF9F6]/80 leading-relaxed">
                {project.context}
              </p>
            </div>

            {/* Footer */}
            <div className="mt-4 sm:mt-6 pt-4 border-t border-[#FAF9F6]/20">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {project.skills.slice(0, 2).map((skill) => (
                    <span
                      key={skill}
                      className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#dc2626]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <span className="text-[#FAF9F6]/40 text-xs hidden sm:block">
                  Click to flip back
                </span>
              </div>
            </div>
          </div>

          {/* Decorative Corner */}
          <div className="absolute bottom-4 right-4">
            <span
              className="text-6xl sm:text-8xl font-black text-[#dc2626]/10"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

// ============================================
// SECTION HEADER COMPONENT
// ============================================
const SectionHeader: React.FC<{ isInView: boolean }> = memo(({ isInView }) => (
  <div
    className={`mb-8 sm:mb-12 md:mb-16 transition-all duration-700 ${
      isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}
  >
    {/* Label */}
    <div className="flex items-center gap-3 mb-4">
      <span className="text-[#dc2626] text-xs sm:text-sm tracking-[0.3em] uppercase font-bold">
        Selected Work
      </span>
      <div className="flex-1 h-px bg-[#1A1A1A]/20" />
      <span className="text-[#1A1A1A]/40 text-xs sm:text-sm">
        {PROJECTS.length} Projects
      </span>
    </div>

    {/* Title */}
    <h2
      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-[#1A1A1A] leading-none"
      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
    >
      Portfolio
    </h2>

    {/* Subtitle */}
    <p className="mt-4 text-sm sm:text-base text-[#1A1A1A]/60 max-w-xl">
      A collection of work spanning product design, data visualization, and
      web applications. Each project tells a story of problem-solving and craft.
    </p>
  </div>
));

SectionHeader.displayName = 'SectionHeader';

// ============================================
// MAIN PORTFOLIO GRID COMPONENT
// ============================================
const PortfolioGrid: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-50px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Component-specific animations */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .portfolio-card-enter {
          animation: slideUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
      `}</style>

      <section
        ref={sectionRef}
        id="portfolio"
        className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-[#F5F5F0]"
      >
        {/* Subtle Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage: `
              linear-gradient(rgba(26, 26, 26, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(26, 26, 26, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 max-w-[1800px] mx-auto">
          {/* Section Header */}
          <SectionHeader isInView={isInView} />

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>

          {/* Bottom Info Bar */}
          <div
            className={`mt-12 sm:mt-16 pt-6 border-t-2 border-[#1A1A1A]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all duration-700 delay-500 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className="text-[#dc2626] text-2xl font-black"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                ◆
              </span>
              <span className="text-xs sm:text-sm text-[#1A1A1A]/60 uppercase tracking-wider">
                Hover or tap cards to reveal project context
              </span>
            </div>
            <a
              href="#contact"
              className="group flex items-center gap-2 text-[#1A1A1A] text-xs sm:text-sm uppercase tracking-wider transition-colors hover:text-[#dc2626]"
            >
              <span>Let&apos;s Work Together</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-8 left-8 opacity-10 pointer-events-none hidden lg:block">
          <span
            className="text-[180px] font-black text-[#1A1A1A]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            W
          </span>
        </div>
        <div className="absolute bottom-8 right-8 opacity-10 pointer-events-none hidden lg:block">
          <span
            className="text-[180px] font-black text-[#1A1A1A]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            K
          </span>
        </div>
      </section>
    </>
  );
};

export default memo(PortfolioGrid);

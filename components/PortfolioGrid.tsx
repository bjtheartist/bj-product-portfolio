/**
 * PortfolioGrid.tsx
 *
 * Offset Bento Grid Portfolio Section
 * - Asymmetric grid layout (large + small cards)
 * - Flip/slide reveal animations on hover
 * - Neobrutalist design with charcoal borders
 * - Staggered entrance animations on scroll
 * - Skills tags on front, case study details on back
 */

import React, { useState, useRef, useEffect, useCallback, memo } from 'react';

// ============================================
// TYPES
// ============================================
interface ProjectTool {
  name: string;
  reason: string;
}

interface ProjectEffectiveness {
  status: 'effective' | 'partially-effective' | 'in-progress';
  description: string;
  metrics?: string[];
}

interface Project {
  id: string;
  title: string;
  skills: string[];
  description: string;
  problem: string;
  tools: ProjectTool[];
  effectiveness: ProjectEffectiveness;
  image: string;
  size: 'large' | 'small';
  liveUrl?: string;
  githubUrl?: string;
}

// ============================================
// PROJECT DATA - 6 PROJECTS WITH CASE STUDIES
// ============================================
const PROJECTS: Project[] = [
  {
    id: 'chistartuphub',
    title: 'ChiStartupHub',
    skills: ['Full-Stack', 'React', 'Civic Tech', 'Directory'],
    description: 'The launchpad for Chicago founders',
    problem: 'Chicago founders struggled to navigate the fragmented startup ecosystem. Information about investors, co-working spaces, and founder communities was scattered across dozens of websites, making it difficult for new entrepreneurs to find the resources they needed.',
    tools: [
      { name: 'React', reason: 'Component-based architecture for reusable directory listings and search functionality.' },
      { name: 'TypeScript', reason: 'Type safety to prevent runtime errors as the directory scaled.' },
      { name: 'Tailwind CSS', reason: 'Rapid prototyping without custom CSS.' },
      { name: 'Vercel', reason: 'Seamless deployment with automatic previews.' }
    ],
    effectiveness: {
      status: 'effective',
      description: 'Successfully consolidated Chicago\'s startup ecosystem into a single, searchable platform.',
      metrics: ['90+ investors', '18+ co-working spaces', '22+ communities']
    },
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop',
    size: 'large',
    liveUrl: 'https://www.chistartuphub.com'
  },
  {
    id: 'communidata',
    title: 'CommuniData',
    skills: ['Data Viz', 'Full-Stack', 'React', 'Python'],
    description: 'Chicago neighborhood intelligence platform',
    problem: 'Chicago\'s open data portal contains valuable civic information, but it\'s inaccessible to average residents. Raw datasets require technical expertise to interpret, leaving community members unable to leverage data for neighborhood advocacy.',
    tools: [
      { name: 'React', reason: 'Interactive foundation for dynamic data visualizations.' },
      { name: 'Python', reason: 'Data processing pipelines to clean and transform civic datasets.' },
      { name: 'D3.js', reason: 'Custom interactive visualizations beyond standard charts.' },
      { name: 'Mapbox', reason: 'High-performance mapping for geographic data patterns.' }
    ],
    effectiveness: {
      status: 'in-progress',
      description: 'Currently in development. The Trust Layer concept addresses a key gap in civic tech.',
      metrics: ['Map explorer built', 'Report wizard prototyped', 'Trust Layer validated']
    },
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    size: 'small',
    githubUrl: 'https://github.com/Dunosis/CommuniData'
  },
  {
    id: 'makarios',
    title: 'Makarios',
    skills: ['Web Design', 'Frontend', 'Ministry', 'Community'],
    description: 'Faith-based community platform',
    problem: 'Faith communities needed a digital space that felt warm and inviting rather than corporate. Existing church websites often felt outdated or overly complex, creating barriers to connection for newcomers.',
    tools: [
      { name: 'React', reason: 'Smooth, app-like experience that feels modern and welcoming.' },
      { name: 'Tailwind CSS', reason: 'Rapid iteration to achieve warm, purposeful aesthetic.' },
      { name: 'Framer Motion', reason: 'Subtle animations creating peace and intentionality.' }
    ],
    effectiveness: {
      status: 'effective',
      description: 'Successfully bridges traditional faith values with modern digital expectations.',
      metrics: ['Clean design', 'Mobile-first', 'Positive feedback']
    },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    size: 'small',
    githubUrl: 'https://github.com/bjtheartist/Makarios'
  },
  {
    id: 'kivara-flow',
    title: 'Kivara Flow',
    skills: ['Product Design', 'TypeScript', 'Workflow', 'SaaS'],
    description: 'Design and development workflow tool',
    problem: 'Creative teams waste significant time context-switching between design tools, project management apps, and development environments. The lack of a unified workflow creates friction that slows down the concept-to-code pipeline.',
    tools: [
      { name: 'TypeScript', reason: 'Essential for building a reliable tool developers will trust.' },
      { name: 'React', reason: 'Flexibility for complex, interactive interface with real-time updates.' },
      { name: 'Zustand', reason: 'Lightweight state management for complex workflow states.' }
    ],
    effectiveness: {
      status: 'in-progress',
      description: 'In active development. Core concept addresses real pain point of unifying workflows.',
      metrics: ['Workflow engine built', 'Architecture designed', 'Testing planned']
    },
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop',
    size: 'large',
    githubUrl: 'https://github.com/bjtheartist/kivara-flow'
  },
  {
    id: 'temsvision',
    title: 'TemsVision',
    skills: ['Web Design', 'React', 'Photography', 'Vite'],
    description: 'Photography portfolio with neobrutalist aesthetic',
    problem: 'Photographers often struggle with portfolio websites that either look generic or require expensive subscriptions. TemsVision needed a distinctive online presence that would stand out while making it easy for clients to book sessions.',
    tools: [
      { name: 'React', reason: 'Smooth gallery interactions and lazy loading for high-res images.' },
      { name: 'Vite', reason: 'Fast development builds and optimized production bundles.' },
      { name: 'Tailwind CSS', reason: 'Neobrutalist aesthetic with bold typography.' },
      { name: 'GSAP', reason: 'Premium scroll-based animations elevating above templates.' }
    ],
    effectiveness: {
      status: 'effective',
      description: 'Successfully differentiates from template-based portfolios with memorable brand impression.',
      metrics: ['Live & deployed', 'Distinctive identity', 'Booking integrated', 'Fast loads']
    },
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop',
    size: 'small',
    liveUrl: 'https://temsvision-website.vercel.app/',
    githubUrl: 'https://github.com/bjtheartist/temsvision-website'
  },
  {
    id: 'sahara-tax-pro',
    title: 'Sahara Tax Pro',
    skills: ['Full-Stack', 'Next.js', 'FinTech', 'Business'],
    description: 'Boutique tax preparation platform',
    problem: 'Small tax preparation businesses struggle to compete with large firms like H&R Block and TurboTax. They needed a professional online presence that conveys trust while making it easy for clients to book consultations.',
    tools: [
      { name: 'Next.js', reason: 'SEO optimization crucial for local business discovery.' },
      { name: 'React', reason: 'Interactive form experiences for booking and document submission.' },
      { name: 'Tailwind CSS', reason: 'Professional, trustworthy design competing with larger firms.' },
      { name: 'Vercel', reason: 'Reliable hosting with excellent uptime for sensitive financial info.' }
    ],
    effectiveness: {
      status: 'effective',
      description: 'Successfully positions boutique firm to compete with larger competitors.',
      metrics: ['Live & serving clients', 'IRS compliant', '24h response', 'Professional brand']
    },
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
    size: 'small',
    liveUrl: 'https://saharataxpro.com/'
  }
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
// EFFECTIVENESS BADGE COMPONENT
// ============================================
interface EffectivenessBadgeProps {
  status: 'effective' | 'partially-effective' | 'in-progress';
}

const EffectivenessBadge: React.FC<EffectivenessBadgeProps> = memo(({ status }) => {
  const config = {
    'effective': { label: 'Effective', color: 'bg-green-500', icon: '✓' },
    'partially-effective': { label: 'Partial', color: 'bg-yellow-500', icon: '~' },
    'in-progress': { label: 'In Progress', color: 'bg-blue-500', icon: '◐' }
  };
  
  const { label, color, icon } = config[status];
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 text-[10px] uppercase tracking-wider ${color} text-white font-bold rounded`}>
      <span>{icon}</span>
      <span>{label}</span>
    </span>
  );
});

EffectivenessBadge.displayName = 'EffectivenessBadge';

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

            {/* Effectiveness Badge */}
            <div className="absolute top-4 right-4">
              <EffectivenessBadge status={project.effectiveness.status} />
            </div>

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
                {project.skills.slice(0, 4).map((skill) => (
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
                  View Case Study
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
            <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-6 sm:w-8 h-px bg-[#dc2626]" />
              <div className="w-px h-6 sm:h-8 bg-[#dc2626]" />
            </div>
          </div>
        </div>

        {/* BACK FACE - Case Study Details */}
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

          {/* Back Content - Scrollable */}
          <div className="relative h-full flex flex-col p-4 sm:p-6 md:p-8 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-[#dc2626] text-xs sm:text-sm tracking-[0.2em] font-bold uppercase"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Case Study
              </span>
              <span className="text-[#FAF9F6]/50 text-xs uppercase tracking-wider">
                Click to close
              </span>
            </div>

            {/* Title */}
            <h3
              className="text-xl sm:text-2xl md:text-3xl font-black text-[#FAF9F6] mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {project.title}
            </h3>

            {/* The Problem */}
            <div className="mb-4">
              <h4 className="text-[#dc2626] text-xs uppercase tracking-wider font-bold mb-2 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center text-[10px]">!</span>
                The Problem
              </h4>
              <p className="text-[#FAF9F6]/80 text-sm leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* Tools & Why */}
            <div className="mb-4">
              <h4 className="text-[#3b82f6] text-xs uppercase tracking-wider font-bold mb-2 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px]">⚙</span>
                Tools & Why
              </h4>
              <div className="space-y-2">
                {project.tools.slice(0, 3).map((tool, i) => (
                  <div key={i} className="border-l-2 border-[#3b82f6]/30 pl-3">
                    <span className="text-[#FAF9F6] text-xs font-bold">{tool.name}</span>
                    <p className="text-[#FAF9F6]/60 text-xs">{tool.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Effectiveness */}
            <div className="mb-4">
              <h4 className="text-green-400 text-xs uppercase tracking-wider font-bold mb-2 flex items-center gap-2">
                <EffectivenessBadge status={project.effectiveness.status} />
              </h4>
              <p className="text-[#FAF9F6]/80 text-sm leading-relaxed mb-2">
                {project.effectiveness.description}
              </p>
              {project.effectiveness.metrics && (
                <div className="flex flex-wrap gap-2">
                  {project.effectiveness.metrics.map((metric, i) => (
                    <span key={i} className="px-2 py-1 text-[10px] bg-[#FAF9F6]/10 text-[#FAF9F6]/70 rounded">
                      {metric}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Links */}
            <div className="mt-auto pt-4 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF9F6] text-[#1A1A1A] text-xs font-bold uppercase tracking-wider hover:bg-[#dc2626] hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Live
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-[#FAF9F6]/30 text-[#FAF9F6] text-xs font-bold uppercase tracking-wider hover:border-[#dc2626] hover:text-[#dc2626] transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  GitHub
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              )}
            </div>
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
const SectionHeader: React.FC = memo(() => {
  const [isInView, setIsInView] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={headerRef}
      className={`mb-12 sm:mb-16 md:mb-20 transition-all duration-1000 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Section Label */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-px bg-[#dc2626]" />
        <span className="text-[#dc2626] text-xs sm:text-sm tracking-[0.3em] uppercase font-bold">
          Selected Work
        </span>
      </div>

      {/* Main Title */}
      <h2
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#1A1A1A] leading-none mb-4"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        Projects
      </h2>

      {/* Subtitle */}
      <p className="text-[#1A1A1A]/60 text-base sm:text-lg max-w-2xl">
        A curated collection of projects spanning product design, data visualization, and full-stack development. 
        Hover or tap to explore the case study details.
      </p>

      {/* Project Count */}
      <div className="mt-6 flex items-center gap-4">
        <span className="text-[#dc2626] text-2xl sm:text-3xl font-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          {PROJECTS.length}
        </span>
        <span className="text-[#1A1A1A]/40 text-xs uppercase tracking-wider">
          Projects
        </span>
      </div>
    </div>
  );
});

SectionHeader.displayName = 'SectionHeader';

// ============================================
// MAIN PORTFOLIO GRID COMPONENT
// ============================================
const PortfolioGrid: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="work"
      className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-[#FAF9F6]"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, #1A1A1A 1px, transparent 0)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <SectionHeader />

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;

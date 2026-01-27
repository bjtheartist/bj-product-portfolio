/**
 * PortfolioGrid.tsx
 *
 * Clean Grid Portfolio Section with Modal Case Studies
 * - Clean 2x3 grid layout
 * - Click to open modal with 3 swipeable screens
 * - Screen 1: Problem
 * - Screen 2: Tools & Why
 * - Screen 3: Effectiveness
 * - Neobrutalist design
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
    skills: ['Full-Stack', 'Supabase', 'React', 'Next.js'],
    description: 'The launchpad for Chicago founders',
    problem: 'Chicago founders struggled to navigate the fragmented startup ecosystem. Information about investors, co-working spaces, and founder communities was scattered across dozens of websites, making it difficult for new entrepreneurs to find the resources they needed.',
    tools: [
      { name: 'Supabase', reason: 'Backend-as-a-service for PostgreSQL database, real-time subscriptions, and built-in authentication.' },
      { name: 'React', reason: 'Component-based architecture for reusable directory listings and search functionality.' },
      { name: 'Next.js', reason: 'Server-side rendering for SEO optimization and API routes for backend logic.' },
      { name: 'Node.js', reason: 'Server-side operations and API integrations with external data sources.' }
    ],
    effectiveness: {
      status: 'effective',
      description: 'Successfully consolidated Chicago\'s startup ecosystem into a single, searchable platform. The directory has become a go-to resource for founders entering the Chicago market.',
      metrics: ['90+ investors catalogued', '18+ co-working spaces', '22+ founder communities']
    },
    image: '/projects/chistartuphub.png',
    liveUrl: 'https://www.chistartuphub.com'
  },
  {
    id: 'communidata',
    title: 'CommuniData',
    skills: ['Data Viz', 'Django', 'React', 'Redis'],
    description: 'Chicago neighborhood intelligence platform',
    problem: 'Chicago\'s open data portal contains valuable civic information, but it\'s inaccessible to average residents. Raw datasets require technical expertise to interpret, leaving community members unable to leverage data for neighborhood advocacy.',
    tools: [
      { name: 'Django', reason: 'Python-based backend for robust ORM, admin interface, and data processing capabilities.' },
      { name: 'Vite', reason: 'Modern build tool for fast development and optimized production builds.' },
      { name: 'Redis', reason: 'In-memory caching for frequently accessed datasets and improved response times.' },
      { name: 'Celery', reason: 'Distributed task queue for background data processing and syncing with Chicago Data Portal.' }
    ],
    effectiveness: {
      status: 'in-progress',
      description: 'Currently in development. The Trust Layer concept—showing data provenance and reliability—addresses a key gap in civic tech.',
      metrics: ['6,263 live data points', 'Map explorer built', 'Trust Layer validated']
    },
    image: '/projects/communidata.png',
    githubUrl: 'https://github.com/Dunosis/CommuniData'
  },
  {
    id: 'makarios',
    title: 'Makarios',
    skills: ['Web Design', 'Firebase', 'Sanity CMS', 'React'],
    description: 'Faith-based community platform',
    problem: 'Faith communities needed a digital space that felt warm and inviting rather than corporate. Existing church websites often felt outdated or overly complex, creating barriers to connection for newcomers.',
    tools: [
      { name: 'Firebase', reason: 'Real-time database, authentication, and hosting for community features like event RSVPs.' },
      { name: 'Sanity CMS', reason: 'Headless CMS enabling non-technical ministry staff to update sermons and events.' },
      { name: 'React', reason: 'Smooth, app-like experience that feels modern and welcoming to all demographics.' },
      { name: 'Tailwind CSS', reason: 'Rapid iteration to achieve the warm, purposeful aesthetic the community needed.' }
    ],
    effectiveness: {
      status: 'effective',
      description: 'Successfully bridges traditional faith community values with modern digital expectations. The clean design removes barriers while maintaining warmth.',
      metrics: ['Content-managed by staff', 'Mobile-first design', 'Positive community feedback']
    },
    image: '/projects/makarios.png',
    githubUrl: 'https://github.com/bjtheartist/Makarios'
  },
  {
    id: 'kivara-flow',
    title: 'Kivara Flow',
    skills: ['Product Design', 'Convex', 'React', 'TypeScript'],
    description: 'Design and development workflow tool',
    problem: 'Creative teams waste significant time context-switching between design tools, project management apps, and development environments. The lack of a unified workflow creates friction that slows down the concept-to-code pipeline.',
    tools: [
      { name: 'Convex', reason: 'Real-time backend database for reactive data sync—essential for collaborative workflows.' },
      { name: 'React', reason: 'Flexibility for complex, interactive interface with multiple panels and real-time updates.' },
      { name: 'TypeScript', reason: 'Essential for building a reliable tool developers will trust. Type safety prevents bugs.' },
      { name: 'Tailwind CSS', reason: 'Rapid UI development with consistent styling across the multi-panel interface.' }
    ],
    effectiveness: {
      status: 'in-progress',
      description: 'In active development. The core concept of unifying design and development workflows addresses a real pain point.',
      metrics: ['Workflow engine built', 'Project tracking live', 'Client portal integrated']
    },
    image: '/projects/kivara-flow.png',
    githubUrl: 'https://github.com/bjtheartist/kivara-flow'
  },
  {
    id: 'temsvision',
    title: 'TemsVision',
    skills: ['Web Design', 'Sanity CMS', 'React', 'Vite'],
    description: 'Photography portfolio with neobrutalist aesthetic',
    problem: 'Photographers often struggle with portfolio websites that either look generic or require expensive subscriptions. TemsVision needed a distinctive online presence that would stand out while making it easy for clients to book sessions.',
    tools: [
      { name: 'Sanity CMS', reason: 'Headless CMS enabling the photographer to manage galleries and add photos without code.' },
      { name: 'React', reason: 'Smooth gallery interactions and lazy loading for optimal performance with high-res images.' },
      { name: 'Vite', reason: 'Fast development builds and optimized production bundles for quick page loads.' },
      { name: 'GSAP', reason: 'Premium scroll-based animations that elevate the portfolio above template-based competitors.' }
    ],
    effectiveness: {
      status: 'effective',
      description: 'Successfully differentiates from template-based portfolios. The neobrutalist design creates a memorable brand impression.',
      metrics: ['Live & deployed', 'Content-managed galleries', 'Fast load times']
    },
    image: '/projects/temsvision.png',
    liveUrl: 'https://temsvision-website.vercel.app/',
    githubUrl: 'https://github.com/bjtheartist/temsvision-website'
  },
  {
    id: 'sahara-tax-pro',
    title: 'Sahara Tax Pro',
    skills: ['Full-Stack', 'Next.js', 'React', 'FinTech'],
    description: 'Boutique tax preparation platform',
    problem: 'Small tax preparation businesses struggle to compete with large firms like H&R Block and TurboTax. They needed a professional online presence that conveys trust while making it easy for clients to book consultations.',
    tools: [
      { name: 'Next.js', reason: 'SEO optimization crucial for local business discovery, plus fast page loads that build trust.' },
      { name: 'React', reason: 'Interactive form experiences for consultation booking and document submission.' },
      { name: 'Tailwind CSS', reason: 'Rapid development of a professional, trustworthy design competing with larger firms.' },
      { name: 'Vercel', reason: 'Reliable hosting with excellent uptime—critical for handling sensitive financial information.' }
    ],
    effectiveness: {
      status: 'effective',
      description: 'Successfully positions a boutique tax firm to compete with larger competitors. Professional design builds trust.',
      metrics: ['Live & serving clients', 'IRS compliant', '24h response time']
    },
    image: '/projects/sahara-tax-pro.png',
    liveUrl: 'https://saharataxpro.com/'
  }
];

// ============================================
// SKILL TAG COMPONENT
// ============================================
const SkillTag: React.FC<{ skill: string }> = memo(({ skill }) => (
  <span className="inline-block px-2 py-1 text-[10px] sm:text-xs uppercase tracking-wider bg-[#FAF9F6] text-[#1A1A1A] border border-[#1A1A1A] font-medium">
    {skill}
  </span>
));

SkillTag.displayName = 'SkillTag';

// ============================================
// EFFECTIVENESS BADGE COMPONENT
// ============================================
const EffectivenessBadge: React.FC<{ status: 'effective' | 'partially-effective' | 'in-progress' }> = memo(({ status }) => {
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
// PROJECT MODAL COMPONENT - 3 SWIPEABLE SCREENS
// ============================================
interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = memo(({ project, isOpen, onClose }) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const screens = ['Problem', 'Tools', 'Results'];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrentScreen(prev => Math.min(prev + 1, 2));
      if (e.key === 'ArrowLeft') setCurrentScreen(prev => Math.max(prev - 1, 0));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset screen when modal opens
  useEffect(() => {
    if (isOpen) setCurrentScreen(0);
  }, [isOpen]);

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentScreen < 2) {
        setCurrentScreen(prev => prev + 1);
      } else if (diff < 0 && currentScreen > 0) {
        setCurrentScreen(prev => prev - 1);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#1A1A1A]/90 backdrop-blur-sm" />
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#FAF9F6] border-3 border-[#1A1A1A] overflow-hidden"
        style={{ boxShadow: '8px 8px 0 #dc2626' }}
        onClick={e => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b-2 border-[#1A1A1A] bg-[#1A1A1A]">
          <div>
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-black text-[#FAF9F6]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {project.title}
            </h2>
            <p className="text-[#FAF9F6]/60 text-sm mt-1">{project.description}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center bg-[#FAF9F6] text-[#1A1A1A] hover:bg-[#dc2626] hover:text-white transition-colors font-bold text-xl"
          >
            ×
          </button>
        </div>

        {/* Screen Navigation Tabs */}
        <div className="flex border-b-2 border-[#1A1A1A]">
          {screens.map((screen, index) => (
            <button
              key={screen}
              onClick={() => setCurrentScreen(index)}
              className={`flex-1 py-3 px-4 text-xs sm:text-sm uppercase tracking-wider font-bold transition-all ${
                currentScreen === index
                  ? 'bg-[#dc2626] text-white'
                  : 'bg-[#FAF9F6] text-[#1A1A1A] hover:bg-[#1A1A1A]/10'
              }`}
            >
              <span className="mr-2">{index + 1}.</span>
              {screen}
            </button>
          ))}
        </div>

        {/* Screen Content */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentScreen * 100}%)` }}
          >
            {/* Screen 1: Problem */}
            <div className="w-full flex-shrink-0 p-6 sm:p-8 md:p-10 min-h-[400px]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                  <span className="text-[#dc2626] text-2xl">!</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#1A1A1A]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  The Problem
                </h3>
              </div>
              <p className="text-[#1A1A1A]/80 text-base sm:text-lg leading-relaxed">
                {project.problem}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {project.skills.map(skill => (
                  <SkillTag key={skill} skill={skill} />
                ))}
              </div>
            </div>

            {/* Screen 2: Tools */}
            <div className="w-full flex-shrink-0 p-6 sm:p-8 md:p-10 min-h-[400px]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <span className="text-[#3b82f6] text-2xl">⚙</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#1A1A1A]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  Tools & Why I Used Them
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.tools.map((tool, i) => (
                  <div 
                    key={i} 
                    className="p-4 bg-[#1A1A1A] border-2 border-[#1A1A1A]"
                    style={{ boxShadow: '4px 4px 0 #3b82f6' }}
                  >
                    <h4 className="text-[#FAF9F6] font-bold text-sm uppercase tracking-wider mb-2">
                      {tool.name}
                    </h4>
                    <p className="text-[#FAF9F6]/70 text-sm leading-relaxed">
                      {tool.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Screen 3: Results */}
            <div className="w-full flex-shrink-0 p-6 sm:p-8 md:p-10 min-h-[400px]">
              <div className="flex items-center gap-3 mb-6">
                <EffectivenessBadge status={project.effectiveness.status} />
                <h3 className="text-xl sm:text-2xl font-black text-[#1A1A1A]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  Results & Impact
                </h3>
              </div>
              <p className="text-[#1A1A1A]/80 text-base sm:text-lg leading-relaxed mb-6">
                {project.effectiveness.description}
              </p>
              
              {/* Metrics */}
              {project.effectiveness.metrics && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {project.effectiveness.metrics.map((metric, i) => (
                    <div 
                      key={i} 
                      className="p-4 bg-[#1A1A1A] text-center"
                      style={{ boxShadow: '4px 4px 0 #22c55e' }}
                    >
                      <span className="text-[#FAF9F6] font-bold text-sm">{metric}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Links */}
              <div className="flex flex-wrap gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#dc2626] text-white font-bold uppercase tracking-wider hover:bg-[#1A1A1A] transition-colors"
                  >
                    View Live Site
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold uppercase tracking-wider hover:bg-[#1A1A1A] hover:text-white transition-colors"
                  >
                    View Code
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots & Swipe Hint */}
        <div className="flex items-center justify-center gap-2 py-4 border-t-2 border-[#1A1A1A] bg-[#FAF9F6]">
          {screens.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentScreen(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentScreen === index ? 'bg-[#dc2626] scale-125' : 'bg-[#1A1A1A]/30'
              }`}
            />
          ))}
          <span className="ml-4 text-[#1A1A1A]/40 text-xs">Swipe or use arrow keys</span>
        </div>
      </div>
    </div>
  );
});

ProjectModal.displayName = 'ProjectModal';

// ============================================
// PROJECT CARD COMPONENT
// ============================================
interface ProjectCardProps {
  project: Project;
  index: number;
  isInView: boolean;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = memo(({ project, index, isInView, onClick }) => {
  const staggerDelay = index * 0.1;

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${staggerDelay}s` }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View case study for ${project.title}`}
    >
      {/* Card */}
      <div 
        className="relative bg-[#FAF9F6] border-2 border-[#1A1A1A] overflow-hidden transition-all duration-300 group-hover:translate-x-[-4px] group-hover:translate-y-[-4px]"
        style={{ 
          boxShadow: '4px 4px 0 #1A1A1A',
          aspectRatio: '4/3'
        }}
      >
        {/* Project Image */}
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
          style={{
            backgroundImage: `url(${project.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/95 via-[#1A1A1A]/50 to-transparent" />

        {/* Effectiveness Badge */}
        <div className="absolute top-3 right-3">
          <EffectivenessBadge status={project.effectiveness.status} />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          {/* Project Number */}
          <span
            className="text-[#dc2626] text-xs tracking-[0.2em] font-bold"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Title */}
          <h3
            className="text-xl sm:text-2xl md:text-3xl font-black text-[#FAF9F6] mt-1 mb-2 transition-transform duration-300 group-hover:translate-x-1"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {project.title}
          </h3>

          {/* Skills Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.skills.slice(0, 3).map((skill) => (
              <SkillTag key={skill} skill={skill} />
            ))}
          </div>

          {/* View Case Study Hint */}
          <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-[#FAF9F6] text-xs uppercase tracking-wider">
              View Case Study
            </span>
            <svg
              className="w-4 h-4 text-[#dc2626]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
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
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.2 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={headerRef}
      className={`mb-12 sm:mb-16 transition-all duration-1000 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-px bg-[#dc2626]" />
        <span className="text-[#dc2626] text-xs sm:text-sm tracking-[0.3em] uppercase font-bold">
          Selected Work
        </span>
      </div>

      <h2
        className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1A1A1A] leading-none mb-3"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        Projects
      </h2>

      <p className="text-[#1A1A1A]/60 text-base sm:text-lg max-w-2xl">
        Click any project to explore the full case study—the problem, tools, and results.
      </p>

      <div className="mt-4 flex items-center gap-3">
        <span className="text-[#dc2626] text-2xl font-black" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          {PROJECTS.length}
        </span>
        <span className="text-[#1A1A1A]/40 text-xs uppercase tracking-wider">Projects</span>
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.1 }
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  return (
    <section
      id="work"
      className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-[#FAF9F6]"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #1A1A1A 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeader />

        {/* Clean 2x3 Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject!}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default PortfolioGrid;

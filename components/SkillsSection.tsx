/**
 * SkillsSection.tsx
 *
 * Skills display with layered depth - expandable categories
 * Design tokens from HeroNeobrutalist:
 * - Background: #FFF8E7 (warm cream)
 * - Text: #1A1A1A (charcoal)
 * - Accent: #dc2626 (red)
 * - Font: Bebas Neue for category headers
 * - Border: 2-3px charcoal for visual structure
 */

import React, { useState, useEffect, useRef } from 'react';

// ============================================
// TYPES
// ============================================
interface Skill {
  name: string;
  description?: string;
}

interface SkillCategory {
  id: string;
  title: string;
  number: string;
  skills: Skill[];
}

// ============================================
// SKILL DATA
// ============================================
const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'design',
    title: 'DESIGN',
    number: '01',
    skills: [
      { name: 'Product Design', description: 'End-to-end product thinking' },
      { name: 'UX Research', description: 'User insights that drive decisions' },
      { name: 'Design Systems', description: 'Scalable, consistent interfaces' },
      { name: 'Prototyping', description: 'Ideas made tangible, fast' },
    ],
  },
  {
    id: 'build',
    title: 'BUILD',
    number: '02',
    skills: [
      { name: 'Frontend', description: 'React, TypeScript, Next.js' },
      { name: 'Backend', description: 'Node.js, Python, APIs' },
      { name: 'Databases', description: 'PostgreSQL, Supabase' },
      { name: 'Integrations', description: 'APIs, webhooks, third-party services' },
    ],
  },
  {
    id: 'ship',
    title: 'SHIP',
    number: '03',
    skills: [
      { name: 'Product Strategy', description: 'Vision to roadmap to reality' },
      { name: 'Project Management', description: 'On time, on scope, on point' },
      { name: 'Analytics & Metrics', description: 'Data-driven iteration' },
      { name: 'User Testing', description: 'Real feedback, real improvements' },
    ],
  },
];

// ============================================
// SKILL ITEM COMPONENT
// ============================================
interface SkillItemProps {
  skill: Skill;
  index: number;
  isVisible: boolean;
}

const SkillItem: React.FC<SkillItemProps> = ({ skill, index, isVisible }) => {
  return (
    <div
      className={`group flex items-start gap-3 py-3 transition-all duration-500 ${
        isVisible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-4'
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Indicator dot */}
      <span className="mt-2 w-2 h-2 bg-[#1A1A1A] group-hover:bg-[#dc2626] transition-colors duration-200 flex-shrink-0" />

      <div className="flex-1">
        <span className="text-lg md:text-xl font-medium text-[#1A1A1A] group-hover:text-[#dc2626] transition-colors duration-200">
          {skill.name}
        </span>
        {skill.description && (
          <span className="block text-sm text-[#1A1A1A]/50 mt-0.5">
            {skill.description}
          </span>
        )}
      </div>
    </div>
  );
};

// ============================================
// CATEGORY COMPONENT
// ============================================
interface CategoryProps {
  category: SkillCategory;
  isExpanded: boolean;
  onToggle: () => void;
}

const Category: React.FC<CategoryProps> = ({ category, isExpanded, onToggle }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [category.skills]);

  return (
    <div
      className={`border-b-2 border-[#1A1A1A] transition-colors duration-300 ${
        isExpanded ? 'bg-[#1A1A1A]/[0.02]' : 'bg-transparent'
      }`}
    >
      {/* Category Header - Clickable */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 md:px-12 py-6 md:py-8 group cursor-pointer"
        aria-expanded={isExpanded}
        aria-controls={`skills-${category.id}`}
      >
        <div className="flex items-center gap-4 md:gap-8">
          {/* Number */}
          <span
            className={`text-2xl md:text-4xl font-black transition-colors duration-300 ${
              isExpanded ? 'text-[#dc2626]' : 'text-[#1A1A1A]/30 group-hover:text-[#dc2626]'
            }`}
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {category.number}
          </span>

          {/* Title */}
          <h3
            className={`text-4xl md:text-6xl lg:text-7xl font-black tracking-tight transition-colors duration-300 ${
              isExpanded ? 'text-[#1A1A1A]' : 'text-[#1A1A1A] group-hover:text-[#dc2626]'
            }`}
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {category.title}
          </h3>
        </div>

        {/* Expand/Collapse Indicator */}
        <div
          className={`w-10 h-10 md:w-12 md:h-12 border-2 border-[#1A1A1A] flex items-center justify-center transition-all duration-300 ${
            isExpanded
              ? 'bg-[#dc2626] border-[#dc2626] rotate-45'
              : 'bg-transparent group-hover:border-[#dc2626]'
          }`}
        >
          <svg
            className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 ${
              isExpanded ? 'text-white' : 'text-[#1A1A1A] group-hover:text-[#dc2626]'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="square"
              strokeLinejoin="miter"
              strokeWidth={2}
              d={isExpanded ? 'M5 12h14' : 'M12 5v14M5 12h14'}
            />
          </svg>
        </div>
      </button>

      {/* Skills Content - Expandable */}
      <div
        id={`skills-${category.id}`}
        className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          maxHeight: isExpanded ? contentHeight : 0,
        }}
      >
        <div
          ref={contentRef}
          className="px-6 md:px-12 pb-8 md:pb-12 pl-16 md:pl-28"
        >
          <div className="max-w-2xl">
            {category.skills.map((skill, index) => (
              <SkillItem
                key={skill.name}
                skill={skill}
                index={index}
                isVisible={isExpanded}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN SKILLS SECTION COMPONENT
// ============================================
const SkillsSection: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('design');
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleToggle = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full bg-[#FFF8E7] overflow-hidden"
    >
      {/* Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Section Header */}
      <div className="relative z-10 border-b-2 border-[#1A1A1A] px-6 md:px-12 py-12 md:py-16">
        <div
          className={`flex items-end gap-4 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Section number */}
          <span
            className="text-6xl md:text-8xl font-black text-[#1A1A1A]/10 leading-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            02
          </span>

          <div>
            <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-[#1A1A1A]/50 block mb-2">
              Capabilities
            </span>
            <h2
              className="text-5xl md:text-7xl lg:text-8xl font-black text-[#1A1A1A] tracking-tight"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              SKILLS
            </h2>
          </div>
        </div>

        {/* Subtitle */}
        <p
          className={`max-w-xl mt-6 text-base md:text-lg text-[#1A1A1A]/60 transition-all duration-700 delay-200 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          From concept to code to launch. I bring products to life across the full stack.
        </p>
      </div>

      {/* Categories */}
      <div className="relative z-10 border-t-2 border-[#1A1A1A]">
        {SKILL_CATEGORIES.map((category, index) => (
          <div
            key={category.id}
            className={`transition-all duration-700 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: `${300 + index * 100}ms`,
            }}
          >
            <Category
              category={category}
              isExpanded={expandedCategory === category.id}
              onToggle={() => handleToggle(category.id)}
            />
          </div>
        ))}
      </div>

      {/* Bottom decorative element */}
      <div className="relative z-10 px-6 md:px-12 py-8 md:py-12 border-t-2 border-[#1A1A1A]">
        <div className="flex items-center justify-between">
          <span className="text-xs tracking-[0.2em] uppercase text-[#1A1A1A]/30">
            Design + Build + Ship
          </span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#dc2626]" />
            <span className="w-2 h-2 bg-[#1A1A1A]" />
            <span className="w-2 h-2 bg-[#1A1A1A]/30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

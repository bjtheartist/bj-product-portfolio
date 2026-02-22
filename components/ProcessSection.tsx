/**
 * ProcessSection.tsx
 *
 * Three-step process section - light background variant.
 * Design tokens:
 * - Background: #FAF9F6 (cream)
 * - Text: #1A1A1A (charcoal)
 * - Accent: #dc2626 (red)
 * - Font: Bebas Neue for headlines
 * - Cards: border-2 border-[#1A1A1A] with 4px 4px 0 #dc2626 shadow
 */

import React, { useEffect, useRef, useState } from 'react';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Strategy Call',
    description:
      '30 minutes. No pitch, just questions. We map your goals, your audience, and the fastest path to a site that actually converts.',
  },
  {
    number: '02',
    title: 'Focused Sprint',
    description:
      'We build in compressed cycles — not months-long timelines. You get a live preview link and real-time updates so nothing is a surprise.',
  },
  {
    number: '03',
    title: 'Launch & Grow',
    description:
      'SEO, analytics, speed optimization — all baked in before go-live. Your site launches fast and starts working for you from day one.',
  },
];

const ProcessSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative w-full bg-[#FAF9F6] py-16 sm:py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(#1A1A1A 1px, transparent 1px),
            linear-gradient(90deg, #1A1A1A 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        {/* Section Label */}
        <div
          className={`flex items-center gap-3 mb-6 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-[#dc2626] text-xs tracking-[0.3em] uppercase font-bold">
            Our Process
          </span>
          <div className="flex-1 h-px bg-[#1A1A1A]/20" />
        </div>

        {/* Headline */}
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1A1A1A] leading-[0.95] tracking-tight mb-10 sm:mb-16 transition-all duration-700 delay-150 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          THREE STEPS. ZERO HEADACHES.
        </h2>

        {/* 3 Step Cards - Horizontal Row with connecting lines */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Connecting dashed lines between cards (md+ only) */}
          <div
            className={`hidden md:block absolute top-1/2 -translate-y-1/2 pointer-events-none z-20 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              left: 'calc(33.333% - 4px)',
              width: 'calc(8px + 2rem)',
              transitionDelay: '600ms',
            }}
          >
            <div className="w-full flex items-center">
              <div
                className="flex-1 border-t-2 border-dashed border-[#dc2626]"
              />
              {/* Arrow tip */}
              <div
                className="w-0 h-0 ml-[-1px]"
                style={{
                  borderTop: '6px solid transparent',
                  borderBottom: '6px solid transparent',
                  borderLeft: '8px solid #dc2626',
                }}
              />
            </div>
          </div>
          <div
            className={`hidden md:block absolute top-1/2 -translate-y-1/2 pointer-events-none z-20 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              left: 'calc(66.666% - 4px)',
              width: 'calc(8px + 2rem)',
              transitionDelay: '800ms',
            }}
          >
            <div className="w-full flex items-center">
              <div
                className="flex-1 border-t-2 border-dashed border-[#dc2626]"
              />
              {/* Arrow tip */}
              <div
                className="w-0 h-0 ml-[-1px]"
                style={{
                  borderTop: '6px solid transparent',
                  borderBottom: '6px solid transparent',
                  borderLeft: '8px solid #dc2626',
                }}
              />
            </div>
          </div>

          {/* Connecting dashed lines between cards (mobile - vertical) */}
          {[0, 1].map((i) => (
            <div
              key={`mobile-line-${i}`}
              className={`md:hidden absolute left-1/2 -translate-x-1/2 pointer-events-none z-20 transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                top: `calc(${(i + 1) * 33.333}% - 3px)`,
                height: 'calc(6px + 1.5rem)',
                transitionDelay: `${600 + i * 200}ms`,
              }}
            >
              <div className="h-full flex flex-col items-center">
                <div
                  className="flex-1 border-l-2 border-dashed border-[#dc2626]"
                />
                <div
                  className="mt-[-1px]"
                  style={{
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderTop: '8px solid #dc2626',
                  }}
                />
              </div>
            </div>
          ))}

          {STEPS.map((step, index) => (
            <div
              key={step.number}
              className={`relative border-2 border-[#1A1A1A] bg-[#FAF9F6] p-6 md:p-8 transition-all duration-700 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${300 + index * 100}ms`,
                boxShadow: '4px 4px 0 #dc2626',
              }}
            >
              {/* Step Number */}
              <span
                className="text-5xl md:text-6xl font-black text-[#1A1A1A]/10 leading-none block mb-4"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {step.number}
              </span>

              {/* Step Title */}
              <h3
                className="text-xl md:text-2xl font-black text-[#1A1A1A] mb-3"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-sm md:text-base text-[#1A1A1A]/70 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

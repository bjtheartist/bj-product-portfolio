/**
 * CurrentState.tsx
 *
 * Pain points section - dark background variant.
 * Design tokens:
 * - Background: #1A1A1A (charcoal)
 * - Text: #FAF9F6 (cream)
 * - Accent: #dc2626 (red)
 * - Font: Bebas Neue for headlines
 * - Cards: border-2 border-[#1A1A1A] with 4px 4px 0 #dc2626 shadow
 */

import React, { useEffect, useRef, useState } from 'react';

interface PainPoint {
  title: string;
  description: string;
}

const PAIN_POINTS: PainPoint[] = [
  {
    title: 'Dead-End Design',
    description:
      "Pretty isn't enough. If visitors can't find what they need in 5 seconds, your design is working against you.",
  },
  {
    title: 'DIY Disaster',
    description:
      "Squarespace. Wix. WordPress themes. They got you started, but now they're the reason you blend in with everyone else.",
  },
  {
    title: 'Flying Blind',
    description:
      "No analytics. No conversion tracking. No idea what's working. You're guessing instead of growing.",
  },
];

const CurrentState: React.FC = () => {
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
      id="current-state"
      className="relative w-full bg-[#1A1A1A] py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(#FAF9F6 1px, transparent 1px),
            linear-gradient(90deg, #FAF9F6 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Label */}
        <div
          className={`flex items-center gap-3 mb-6 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-[#dc2626] text-xs tracking-[0.3em] uppercase font-bold">
            The Current State
          </span>
          <div className="flex-1 h-px bg-[#FAF9F6]/20" />
        </div>

        {/* Headline */}
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#FAF9F6] leading-[0.95] tracking-tight mb-16 transition-all duration-700 delay-150 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          YOUR WEBSITE IS LOSING YOU MONEY
        </h2>

        {/* 2x2 Grid of Pain Point Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {PAIN_POINTS.map((point, index) => (
            <div
              key={point.title}
              className={`relative border-2 border-[#FAF9F6]/10 bg-[#FAF9F6]/5 p-6 md:p-8 transition-all duration-700 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${300 + index * 100}ms`,
                boxShadow: '4px 4px 0 #dc2626',
              }}
            >
              <h3
                className="text-xl md:text-2xl font-black text-[#FAF9F6] mb-3"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {point.title}
              </h3>
              <p className="text-sm md:text-base text-[#FAF9F6]/70 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurrentState;

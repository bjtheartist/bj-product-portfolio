/**
 * WhatWeBuild.tsx
 *
 * Three-pillar value proposition section.
 * Design tokens:
 * - Background: #FAF9F6 (cream)
 * - Text: #1A1A1A (charcoal)
 * - Accent: #dc2626 (red)
 * - Font: Bebas Neue for headlines
 * - Cards: border-2 border-[#1A1A1A] with 4px 4px 0 #dc2626 shadow
 */

import React, { useEffect, useRef, useState } from 'react';

interface Pillar {
  title: string;
  description: string;
}

const PILLARS: Pillar[] = [
  {
    title: 'Data Over Guesswork',
    description:
      'Every decision — from layout to copy to SEO — is backed by what actually converts for businesses like yours. No vibes, just logic.',
  },
  {
    title: 'User-Centric Engineering',
    description:
      'Your customers are at the center of every build. Every page, every flow, every interaction is engineered around how they actually behave.',
  },
  {
    title: 'Zero-Bloat Performance',
    description:
      'No page builders. No bloated themes. Handcrafted code that loads in under 2 seconds, scores 90+ on Lighthouse, and performs like a site 10x the price.',
  },
];

const WhatWeBuild: React.FC = () => {
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
      id="what-we-build"
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

      {/* Animated diagonal stripe pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            #1A1A1A 10px,
            #1A1A1A 11px
          )`,
          backgroundSize: '28px 28px',
          animation: 'diagonalDrift 20s linear infinite',
        }}
      />
      <style>{`
        @keyframes diagonalDrift {
          0% { background-position: 0 0; }
          100% { background-position: 56px 56px; }
        }
      `}</style>

      {/* Decorative rotated diamond - bottom right corner */}
      <div
        className="absolute -bottom-24 -right-24 w-72 h-72 border-2 border-[#dc2626] opacity-[0.06] pointer-events-none"
        style={{
          transform: 'rotate(45deg)',
        }}
      />
      {/* Inner diamond */}
      <div
        className="absolute -bottom-16 -right-16 w-48 h-48 border-[1px] border-[#1A1A1A] opacity-[0.04] pointer-events-none"
        style={{
          transform: 'rotate(45deg)',
        }}
      />

      {/* Red accent line - top */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 h-16 w-[2px] bg-[#dc2626] transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
        }`}
        style={{ transformOrigin: 'top' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        {/* Section Label */}
        <div
          className={`flex items-center gap-3 mb-6 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-[#dc2626] text-xs tracking-[0.3em] uppercase font-bold">
            What We Build
          </span>
          <div className="flex-1 h-px bg-[#1A1A1A]/20" />
        </div>

        {/* Headline */}
        <h2
          className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#1A1A1A] leading-[0.95] tracking-tight mb-10 sm:mb-16 transition-all duration-700 delay-100 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          DATA. CRAFT. PERFORMANCE.
        </h2>

        {/* Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
          {PILLARS.map((pillar, index) => (
            <div
              key={pillar.title}
              className={`relative transition-all duration-700 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <div
                className="bg-[#FAF9F6] border-2 border-[#1A1A1A] p-8 md:p-6 lg:p-8 h-full"
                style={{ boxShadow: '4px 4px 0 #dc2626' }}
              >
                {/* Pillar number */}
                <span
                  className="text-5xl font-black text-[#1A1A1A]/10 leading-none block mb-4"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  0{index + 1}
                </span>

                {/* Pillar title */}
                <h3
                  className="text-2xl md:text-3xl font-black text-[#1A1A1A] tracking-tight mb-4"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {pillar.title}
                </h3>

                {/* Pillar description */}
                <p className="text-base text-[#1A1A1A]/70 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div
          className={`mt-16 md:mt-20 max-w-3xl mx-auto text-center transition-all duration-700 delay-500 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#dc2626]" />
            <span className="text-[#dc2626]">&#9670;</span>
            <div className="w-8 h-px bg-[#dc2626]" />
          </div>
          <p className="text-lg md:text-xl text-[#1A1A1A]/70 leading-relaxed">
            We build websites that work as hard as you do. No page builders. No
            bloated themes. Just clean, handcrafted code that loads fast, ranks
            well, and converts visitors into customers.
          </p>
        </div>
      </div>

      {/* Red accent line - bottom */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-16 w-[2px] bg-[#dc2626] transition-all duration-1000 ease-out delay-500 ${
          isVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
        }`}
        style={{ transformOrigin: 'bottom' }}
      />
    </section>
  );
};

export default WhatWeBuild;

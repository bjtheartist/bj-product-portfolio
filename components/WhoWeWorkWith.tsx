/**
 * WhoWeWorkWith.tsx
 *
 * Target audience section with 2x2 card grid.
 * Design tokens:
 * - Background: #FFF8E7 (warm cream)
 * - Text: #1A1A1A (charcoal)
 * - Accent: #dc2626 (red)
 * - Font: Bebas Neue for headlines
 * - Cards: border-2 border-[#1A1A1A] with 4px 4px 0 #dc2626 shadow
 */

import React, { useEffect, useRef, useState } from 'react';

interface Card {
  label: string;
  description: string;
}

const CARDS: Card[] = [
  {
    label: 'The Friction',
    description:
      'You\'ve built something real — but your online presence doesn\'t reflect it. Every day your site stays outdated, you\'re losing credibility and customers to competitors who showed up better.',
  },
  {
    label: 'The Cost',
    description:
      'Your site isn\'t just "needs work" — it\'s leaking leads. Visitors bounce in 3 seconds. Your Google ranking is buried. The longer you wait, the more revenue walks out the door.',
  },
  {
    label: 'The Standard',
    description:
      'A digital presence that commands authority, ranks on page one, and converts visitors into customers on autopilot. Not a brochure — a growth engine.',
  },
];

const WhoWeWorkWith: React.FC = () => {
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
      id="who-we-work-with"
      className="relative w-full bg-[#FFF8E7] py-16 sm:py-24 md:py-32 lg:py-40 overflow-hidden"
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

      {/* Animated noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            repeating-radial-gradient(circle at 17% 32%, #1A1A1A 0px, transparent 1px, transparent 2px),
            repeating-radial-gradient(circle at 62% 78%, #1A1A1A 0px, transparent 1px, transparent 3px),
            repeating-radial-gradient(circle at 89% 14%, #1A1A1A 0px, transparent 1px, transparent 2px)
          `,
          backgroundSize: '7px 7px, 11px 11px, 9px 9px',
          animation: 'noiseShift 8s steps(5) infinite',
        }}
      />
      <style>{`
        @keyframes noiseShift {
          0% { background-position: 0 0, 0 0, 0 0; }
          20% { background-position: 3px -2px, -1px 4px, 2px -3px; }
          40% { background-position: -2px 1px, 3px -3px, -1px 2px; }
          60% { background-position: 1px 3px, -2px 1px, 3px -1px; }
          80% { background-position: -3px -1px, 2px 2px, -2px 3px; }
          100% { background-position: 0 0, 0 0, 0 0; }
        }
      `}</style>

      {/* Decorative vertical KIVARA text along left edge */}
      <div
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden md:block"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          transform: 'translateY(-50%) rotate(180deg)',
        }}
      >
        <span
          className="text-6xl lg:text-7xl font-black tracking-[0.25em] text-[#1A1A1A] opacity-[0.03]"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          KIVARA
        </span>
      </div>

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
            Who We Work With
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
          BUILT FOR OWNERS WHO ARE{' '}
          <span className="text-[#dc2626]">READY TO GROW</span>
        </h2>

        {/* 2x2 Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
          {CARDS.map((card, index) => (
            <div
              key={card.label}
              className={`relative transition-all duration-700 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <div
                className="bg-[#FFF8E7] border-2 border-[#1A1A1A] p-6 sm:p-8 lg:p-10 h-full"
                style={{ boxShadow: '4px 4px 0 #dc2626' }}
              >
                {/* Card label */}
                <h3
                  className="text-2xl md:text-3xl font-black text-[#1A1A1A] tracking-tight mb-4"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {card.label}
                </h3>

                {/* Separator */}
                <div className="w-10 h-[2px] bg-[#dc2626] mb-4" />

                {/* Card description */}
                <p className="text-base md:text-lg text-[#1A1A1A]/70 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
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

export default WhoWeWorkWith;

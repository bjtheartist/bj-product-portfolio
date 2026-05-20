/**
 * HeroNeobrutalist.tsx
 *
 * Editorial hero — stripped to essentials
 * - Full-bleed Chicago skyline, sepia warm tone, paper grain
 * - Three-line serif headline + one understated CTA
 */

import React, { useEffect, useState, useRef } from 'react';

const HeroNeobrutalist: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 60);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-up {
          opacity: 0;
          animation: fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .font-serif-display {
          font-family: 'Playfair Display', 'Times New Roman', serif;
          font-feature-settings: 'lnum' 1, 'kern' 1, 'liga' 1, 'dlig' 1;
        }

        .paper-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='5' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.11  0 0 0 0 0.10  0 0 0 0 0.09  0 0 0 0.7 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 220px 220px;
        }
      `}</style>

      <section
        ref={heroRef}
        className="relative min-h-[100svh] w-full overflow-hidden bg-[#1c1a17] text-[#f5f2eb]"
      >
        {/* Full-bleed Chicago background, sepia */}
        <img
          src="/chicago-skyline.jpg"
          alt="Chicago skyline"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter:
              'sepia(35%) saturate(0.75) contrast(1.05) brightness(0.78)',
          }}
        />

        {/* Warm overlay — darker on left where text sits */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(28,26,23,0.78) 0%, rgba(28,26,23,0.55) 35%, rgba(28,26,23,0.28) 70%, rgba(28,26,23,0.18) 100%)',
          }}
        />

        {/* Paper grain */}
        <div
          className="absolute inset-0 paper-grain pointer-events-none mix-blend-overlay"
          style={{ opacity: 0.35 }}
          aria-hidden="true"
        />

        {/* Content — minimal single column */}
        <div className="relative z-10 min-h-[100svh] flex flex-col justify-end px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28 pt-28 sm:pt-32 pb-14 sm:pb-20">
          <h1
            className="font-serif-display leading-[1.02] tracking-[-0.01em] text-[#f5f2eb] mb-12 sm:mb-14"
            style={{
              fontSize: 'clamp(1.75rem, 5.5vw, 5.5rem)',
              fontWeight: 400,
            }}
          >
            <span
              className={`block ${isVisible ? 'fade-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.15s' }}
            >
              Made
            </span>
            <span
              className={`block ${isVisible ? 'fade-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.3s' }}
            >
              to be
            </span>
            <span
              className={`block whitespace-nowrap ${
                isVisible ? 'fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.45s' }}
            >
              impossible to miss.
            </span>
          </h1>

          <div
            className={`${isVisible ? 'fade-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.65s' }}
          >
            <a
              href="#get-started"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById('get-started')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-center gap-3 text-[11px] sm:text-xs tracking-[0.28em] uppercase font-medium text-[#f5f2eb]"
            >
              <span className="border-b border-[#f5f2eb] pb-1">
                Start a project
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroNeobrutalist;

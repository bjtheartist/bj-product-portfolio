/**
 * HeroNeobrutalist.tsx
 *
 * Editorial hero — stripped to essentials
 * - Full-bleed Chicago skyline, sepia warm tone, paper grain
 * - Three-line serif headline + one understated CTA
 */

import React, { useRef } from 'react';

const HeroNeobrutalist: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <style>{`
        @keyframes heroSlowPan {
          from { transform: translate3d(-1.1%, -0.4%, 0) scale(1.065); }
          to { transform: translate3d(1.1%, 0.4%, 0) scale(1.085); }
        }

        .hero-slow-pan {
          inset: -3%;
          animation: heroSlowPan 70s linear infinite alternate;
          backface-visibility: hidden;
          transform-origin: center center;
          transform: translate3d(0, 0, 0) scale(1.065);
          will-change: transform;
        }

        .hero-slow-pan img {
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .font-serif-display {
          font-family: 'Playfair Display', 'Times New Roman', serif;
          font-feature-settings: 'lnum' 1, 'kern' 1, 'liga' 1, 'dlig' 1;
        }

        .paper-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='5' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.11  0 0 0 0 0.10  0 0 0 0 0.09  0 0 0 0.7 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 220px 220px;
        }

        @keyframes heroTextIn {
          from { opacity: 0; transform: translate3d(0, 18px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        .hero-text-in {
          opacity: 0;
          animation: heroTextIn 0.86s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-slow-pan {
            animation: none;
            transform: scale(1.04);
          }

          .hero-text-in {
            opacity: 1;
            animation: none;
            transform: none;
          }
        }
      `}</style>

      <section
        ref={heroRef}
        className="relative min-h-[100svh] w-full overflow-hidden bg-[#1c1a17] text-[#f5f2eb]"
      >
        {/* Full-bleed Chicago background, sepia */}
        <div className="hero-slow-pan absolute overflow-hidden" aria-hidden="true">
          <img
            src="/chicago-skyline.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{
              filter:
                'sepia(35%) saturate(0.75) contrast(1.05) brightness(0.78)',
            }}
            decoding="async"
            fetchPriority="high"
          />
        </div>

        {/* Warm overlay — darker on left where text sits */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(28,26,23,0.78) 0%, rgba(28,26,23,0.55) 35%, rgba(28,26,23,0.28) 70%, rgba(28,26,23,0.18) 100%)',
          }}
        />

        {/* Subtle grid overlay — editorial structure */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(245, 242, 235, 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(245, 242, 235, 0.07) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            maskImage:
              'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,0.5) 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,0.5) 100%)',
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
            className="hero-text-in font-serif-display leading-[1.04] sm:leading-[1.02] tracking-[-0.015em] text-[#f5f2eb] mb-12 sm:mb-14"
            style={{
              fontSize: 'clamp(3.25rem, 11vw, 6.5rem)',
              fontWeight: 400,
              animationDelay: '0.14s',
            }}
          >
            <span className="block">Made</span>
            <span className="block">to be</span>
            <span className="block md:whitespace-nowrap">
              impossible to miss.
            </span>
          </h1>

          <div>
            <a
              href="#get-started"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById('get-started')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hero-text-in group inline-flex items-center gap-3 text-[11px] sm:text-xs tracking-[0.28em] uppercase font-medium text-[#f5f2eb]"
              style={{ animationDelay: '0.32s' }}
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

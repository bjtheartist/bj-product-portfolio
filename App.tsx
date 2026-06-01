import React, { useEffect, useState, Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import NavbarNeobrutalist from './components/NavbarNeobrutalist';
import HeroNeobrutalist from './components/HeroNeobrutalist';
import ScrollProgress from './components/ScrollProgress';

// Lazy load below-the-fold components
const PortfolioCarousel = lazy(() => import('./components/PortfolioCarousel'));
const GetStartedSection = lazy(() => import('./components/GetStartedSection'));
const Footer = lazy(() => import('./components/Footer'));
const StickyCta = lazy(() => import('./components/StickyCta'));

const SectionLoader: React.FC = () => {
  return (
    <div className="py-32 flex items-center justify-center bg-[#f5f2eb]">
      <div className="w-6 h-6 border border-[#1c1a17]/40 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

const InitialLoader: React.FC<{ isExiting: boolean }> = ({ isExiting }) => {
  return (
    <div
      className={`intro-loader ${isExiting ? 'intro-loader--exit' : ''}`}
      aria-hidden="true"
    >
      <div className="intro-panel intro-panel--left" />
      <div className="intro-panel intro-panel--right" />
      <div className="intro-loader__mark">
        <span>K</span>
      </div>
      <div className="intro-loader__wordmark">KIVARA</div>
    </div>
  );
};

// Minimal "About" prose block — replaces ~6 prior sections
const AboutProse: React.FC = () => {
  return (
    <section
      id="about"
      className="bg-[#f5f2eb] py-20 md:py-44 px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28"
    >
      <div className="max-w-3xl">
        <p className="flex items-baseline gap-5 sm:gap-6 text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-[#1c1a17]/55 mb-8">
          <span>I.</span>
          <span>A note from the studio</span>
        </p>
        <p
          className="text-[#1c1a17] leading-[1.35] tracking-[-0.01em] mb-10"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.5rem, 2.6vw, 2.25rem)',
            fontWeight: 400,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              float: 'left',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              fontSize: 'clamp(4rem, 7vw, 6rem)',
              lineHeight: 0.85,
              marginRight: '0.5rem',
              marginTop: '0.4rem',
              letterSpacing: '-0.04em',
            }}
          >
            K
          </span>
          ivara is a studio for owner-operated businesses — websites,
          brand systems, and content strategies that earn the attention
          they're shown and turn it into something that lasts.
        </p>
        <p className="text-base sm:text-lg text-[#1c1a17]/70 leading-relaxed font-light max-w-xl">
          We work in small numbers, one project at a time. No templates,
          no bloat. Just clean, handcrafted work for people who'd rather
          be remembered than ranked.
        </p>
      </div>
    </section>
  );
};

const AppNeobrutalist: React.FC = () => {
  const [loaderPhase, setLoaderPhase] = useState<'intro' | 'exit' | 'done'>(
    'intro',
  );

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const exitTimer = setTimeout(
      () => setLoaderPhase('exit'),
      reduceMotion ? 120 : 920,
    );
    const doneTimer = setTimeout(
      () => {
        setLoaderPhase('done');
        document.body.style.overflow = originalOverflow;
      },
      reduceMotion ? 220 : 2250,
    );

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <>
      <style>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          background-color: #f5f2eb;
        }

        ::selection {
          background: #1c1a17;
          color: #f5f2eb;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: #d6cfc1;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #1c1a17;
        }

        .intro-loader {
          position: fixed;
          inset: 0;
          z-index: 10000;
          pointer-events: none;
          overflow: hidden;
          background: transparent;
          isolation: isolate;
        }

        .intro-loader::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 1px;
          z-index: 3;
          background: rgba(245, 242, 235, 0.22);
          transform: translateX(-50%) scaleY(1);
          transform-origin: center;
          transition:
            opacity 0.62s ease,
            transform 1.18s cubic-bezier(0.76, 0, 0.24, 1);
        }

        .intro-panel {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 50%;
          background: #1c1a17;
          z-index: 1;
          transition: transform 1.18s cubic-bezier(0.76, 0, 0.24, 1);
          will-change: transform;
        }

        .intro-panel--left {
          left: 0;
          box-shadow: inset -1px 0 0 rgba(245, 242, 235, 0.12);
        }

        .intro-panel--right {
          right: 0;
          box-shadow: inset 1px 0 0 rgba(245, 242, 235, 0.12);
        }

        .intro-loader--exit .intro-panel--left {
          transform: translate3d(-100%, 0, 0);
        }

        .intro-loader--exit .intro-panel--right {
          transform: translate3d(100%, 0, 0);
        }

        .intro-loader--exit::after {
          opacity: 0;
          transform: translateX(-50%) scaleY(0.18);
        }

        .intro-loader__mark {
          position: absolute;
          left: 50%;
          top: 50%;
          width: clamp(5.25rem, 13vw, 8.75rem);
          height: clamp(5.25rem, 13vw, 8.75rem);
          display: grid;
          place-items: center;
          color: #f5f2eb;
          z-index: 4;
          transform: translate(-50%, -50%);
          transition:
            filter 0.72s ease,
            opacity 0.72s ease,
            transform 1.02s cubic-bezier(0.76, 0, 0.24, 1);
          animation: introMarkIn 0.78s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .intro-loader__mark span {
          position: relative;
          z-index: 1;
          display: grid;
          place-items: center;
          width: 100%;
          height: 100%;
          border: 1px solid rgba(245, 242, 235, 0.38);
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: clamp(2.8rem, 7vw, 5.1rem);
          font-style: normal;
          font-weight: 500;
          line-height: 1;
          letter-spacing: -0.08em;
          text-shadow: none;
        }

        .intro-loader__wordmark {
          position: absolute;
          left: 50%;
          top: calc(50% + clamp(4.25rem, 10vw, 7.25rem));
          z-index: 4;
          color: rgba(245, 242, 235, 0.58);
          transform: translateX(-50%);
          font-size: 0.62rem;
          font-weight: 500;
          letter-spacing: 0.34em;
          transition:
            opacity 0.42s ease 0.2s,
            transform 0.9s cubic-bezier(0.76, 0, 0.24, 1);
          animation: introWordmarkIn 0.78s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .intro-loader--exit .intro-loader__mark {
          filter: blur(3px);
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.985);
        }

        .intro-loader--exit .intro-loader__wordmark {
          opacity: 0;
          transform: translateX(-50%) translateY(0.5rem);
        }

        @keyframes introMarkIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.94);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes introWordmarkIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(0.35rem);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .intro-loader__mark,
          .intro-loader__wordmark {
            animation: none;
          }

          .intro-panel,
          .intro-loader__mark,
          .intro-loader__wordmark,
          .intro-loader::after {
            transition-duration: 0.01ms;
          }
        }
      `}</style>

      <ScrollProgress />

      <main className="relative min-h-screen bg-[#f5f2eb] text-[#1c1a17]">
        <NavbarNeobrutalist />

        <div className="relative z-10">
          <HeroNeobrutalist />

          <AboutProse />

          <Suspense fallback={<SectionLoader />}>
            <PortfolioCarousel />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <GetStartedSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Footer />
          </Suspense>

          <Suspense fallback={null}>
            <StickyCta />
          </Suspense>
        </div>
      </main>

      {loaderPhase !== 'done' && (
        <InitialLoader isExiting={loaderPhase === 'exit'} />
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppNeobrutalist />
    </ThemeProvider>
  );
};

export default App;

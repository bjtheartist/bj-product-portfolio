import React, { useEffect, useState, Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import NavbarNeobrutalist from './components/NavbarNeobrutalist';
import HeroNeobrutalist from './components/HeroNeobrutalist';

// Lazy load below-the-fold components
const PortfolioCarousel = lazy(() => import('./components/PortfolioCarousel'));
const GetStartedSection = lazy(() => import('./components/GetStartedSection'));
const Footer = lazy(() => import('./components/Footer'));

const SectionLoader: React.FC = () => {
  return (
    <div className="py-32 flex items-center justify-center bg-[#f5f2eb]">
      <div className="w-6 h-6 border border-[#1c1a17]/40 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

// Minimal "About" prose block — replaces ~6 prior sections
const AboutProse: React.FC = () => {
  return (
    <section
      id="about"
      className="bg-[#f5f2eb] py-32 md:py-44 px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28"
    >
      <div className="max-w-3xl">
        <p className="text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-[#1c1a17]/55 mb-8">
          A note from the studio
        </p>
        <p
          className="text-[#1c1a17] leading-[1.35] tracking-[-0.01em] mb-10"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.5rem, 2.6vw, 2.25rem)',
            fontWeight: 400,
          }}
        >
          Kivara is a studio for owner-operated businesses — websites,
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
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowContent(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

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
      `}</style>

      <main
        className={`relative min-h-screen overflow-x-hidden bg-[#f5f2eb] text-[#1c1a17] transition-opacity duration-500 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
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
        </div>
      </main>
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

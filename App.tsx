import React, { useEffect, useState, Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import NavbarNeobrutalist from './components/NavbarNeobrutalist';
import HeroNeobrutalist from './components/HeroNeobrutalist';

// Lazy load below-the-fold components
const WhatWeBuild = lazy(() => import('./components/WhatWeBuild'));
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const WhoWeWorkWith = lazy(() => import('./components/WhoWeWorkWith'));
const ProcessSection = lazy(() => import('./components/ProcessSection'));
const ResultsStrip = lazy(() => import('./components/ResultsStrip'));
const PortfolioCarousel = lazy(() => import('./components/PortfolioCarousel'));
const AboutSection = lazy(() => import('./components/AboutSection'));
const DiagnosticSection = lazy(() => import('./components/DiagnosticSection'));
const GetStartedSection = lazy(() => import('./components/GetStartedSection'));
const Footer = lazy(() => import('./components/Footer'));

const SectionLoader: React.FC = () => {
  return (
    <div className="py-32 flex items-center justify-center bg-[#FAF9F6]">
      <div className="w-8 h-8 border-2 border-[#3b82f6] border-t-transparent rounded-full animate-spin" />
    </div>
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
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath fill='%23dc2626' stroke='%23FFFFFF' stroke-width='1.5' d='M1 1l12 28 4-12 12-4z'/%3E%3C/svg%3E") 0 0, auto;
        }

        body {
          background-color: #FAF9F6;
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath fill='%23dc2626' stroke='%23FFFFFF' stroke-width='1.5' d='M1 1l12 28 4-12 12-4z'/%3E%3C/svg%3E") 0 0, auto;
        }

        a, button, [role="button"] {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath fill='%23dc2626' stroke='%23FFFFFF' stroke-width='1.5' d='M1 1l12 28 4-12 12-4z'/%3E%3C/svg%3E") 0 0, pointer;
        }

        ::selection {
          background: #3b82f6;
          color: #FAF9F6;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #FAF9F6;
        }

        ::-webkit-scrollbar-thumb {
          background: #1A1A1A;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #3b82f6;
        }
      `}</style>

      <main
        className={`relative min-h-screen overflow-x-hidden bg-[#FAF9F6] text-[#1A1A1A] transition-opacity duration-500 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <NavbarNeobrutalist />

        <div className="relative z-10">
          <HeroNeobrutalist />

          <Suspense fallback={<SectionLoader />}>
            <WhatWeBuild />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ServicesSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <WhoWeWorkWith />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ProcessSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ResultsStrip />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <PortfolioCarousel />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <AboutSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <DiagnosticSection />
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

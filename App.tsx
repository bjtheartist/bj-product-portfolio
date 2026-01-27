/**
 * AppNeobrutalist.tsx
 * 
 * WHAT THIS FILE DOES:
 * This is the main "container" for your entire website.
 * Think of it as the frame that holds all the other pieces together.
 * 
 * REACT CONCEPT - "App Component":
 * In React, there's usually one main component that contains everything else.
 * It's like the trunk of a tree, and all other components are branches.
 * 
 * HOW TO USE THIS:
 * To switch to the neobrutalist design, you would:
 * 1. Rename your current App.tsx to App.backup.tsx
 * 2. Rename this file to App.tsx
 * OR
 * Import this component where you want to use it
 */

import React, { useEffect, useState, useCallback, Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import NavbarNeobrutalist from './components/NavbarNeobrutalist';
import HeroNeobrutalist from './components/HeroNeobrutalist';

// Lazy load below-the-fold components for better performance
// "Lazy loading" means we only load these when needed, making the initial page faster
const BioSection = lazy(() => import('./components/BioSection'));
const PortfolioGrid = lazy(() => import('./components/PortfolioGrid'));
const SkillsSection = lazy(() => import('./components/SkillsSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const Footer = lazy(() => import('./components/Footer'));

// ============================================
// LOADING COMPONENT
// ============================================
/**
 * This shows while other sections are loading.
 * It's a simple spinner that matches our new aesthetic.
 */
const SectionLoader: React.FC = () => {
  return (
    <div className="py-32 flex items-center justify-center bg-[#FAF9F6]">
      <div className="w-8 h-8 border-2 border-[#3b82f6] border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

// ============================================
// MAIN APP COMPONENT
// ============================================
const AppNeobrutalist: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Simulate a brief loading state for smooth entrance
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
      {/* 
        GLOBAL STYLES
        These styles apply to the entire page.
        We're setting the warm cream background and hiding the default cursor.
      */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          background-color: #FAF9F6;
        }

        /* White cursor on dark backgrounds */
        .bg-\\[\\#1A1A1A\\],
        [style*="background-color: rgb(26, 26, 26)"],
        [style*="background: rgb(26, 26, 26)"] {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath fill='%23FFFFFF' d='M0 0l8 20 3-8 8-3z'/%3E%3C/svg%3E") 0 0, auto;
        }

        /* Selection color */
        ::selection {
          background: #3b82f6;
          color: #FAF9F6;
        }
        
        /* Smooth scrollbar */
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

      {/*
        MAIN CONTENT
        The structure is:
        1. Navigation (always visible at top)
        2. Hero section (first thing you see)
        3. Other sections (loaded as needed)
      */}
      <main
        className={`relative min-h-screen overflow-x-hidden bg-[#FAF9F6] text-[#1A1A1A] transition-opacity duration-500 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Navigation */}
        <NavbarNeobrutalist />

        {/* Content Sections */}
        <div className="relative z-10">
          {/* Hero - The neobrutalist hero with floating shapes */}
          <HeroNeobrutalist />

          {/* Bio Section - "What I Do" statement */}
          <Suspense fallback={<SectionLoader />}>
            <BioSection />
          </Suspense>

          {/* Portfolio Section - Offset Bento Grid with flip cards */}
          <Suspense fallback={<SectionLoader />}>
            <PortfolioGrid />
          </Suspense>

          {/* Skills Section - Layered categories (Design/Build/Ship) */}
          <Suspense fallback={<SectionLoader />}>
            <SkillsSection />
          </Suspense>

          {/* Contact Section - "Let's Work Together" with links */}
          <Suspense fallback={<SectionLoader />}>
            <ContactSection />
          </Suspense>

          {/* Footer - Minimal neobrutalist footer */}
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

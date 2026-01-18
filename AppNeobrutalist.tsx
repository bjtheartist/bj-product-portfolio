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
import NavbarNeobrutalist from './components/NavbarNeobrutalist';
import HeroNeobrutalist from './components/HeroNeobrutalist';

// Lazy load below-the-fold components for better performance
// "Lazy loading" means we only load these when needed, making the initial page faster
const Portfolio = lazy(() => import('./components/Portfolio'));
const Services = lazy(() => import('./components/Services'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
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
// CUSTOM CURSOR COMPONENT
// ============================================
/**
 * WHAT THIS DOES:
 * Creates a custom cursor like Lorenzo's site - a soft blue circle
 * that follows your mouse with a slight delay.
 * 
 * This adds a playful, interactive feel to the site.
 */
const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Don't show custom cursor on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <div
      className={`fixed pointer-events-none z-[100] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: position.x - 15,
        top: position.y - 15,
        width: 30,
        height: 30,
        backgroundColor: 'rgba(59, 130, 246, 0.3)',
        borderRadius: '50%',
        transform: 'translate(0, 0)',
        transition: 'left 0.1s ease-out, top 0.1s ease-out',
      }}
    />
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
          cursor: none;
        }
        
        body {
          background-color: #FAF9F6;
          cursor: none;
        }
        
        a, button {
          cursor: none;
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

      {/* Custom Cursor */}
      <CustomCursor />

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
          {/* Hero - The new neobrutalist design */}
          <HeroNeobrutalist />

          {/* Portfolio Section */}
          <Suspense fallback={<SectionLoader />}>
            <div className="bg-[#FAF9F6]">
              <Portfolio />
            </div>
          </Suspense>

          {/* Services Section */}
          <Suspense fallback={<SectionLoader />}>
            <div className="bg-[#F5F5F0]">
              <Services />
            </div>
          </Suspense>

          {/* About Section */}
          <Suspense fallback={<SectionLoader />}>
            <div className="bg-[#FAF9F6]">
              <About />
            </div>
          </Suspense>

          {/* Contact Section */}
          <Suspense fallback={<SectionLoader />}>
            <div className="bg-[#F5F5F0]">
              <Contact />
            </div>
          </Suspense>

          {/* Footer */}
          <Suspense fallback={<SectionLoader />}>
            <Footer />
          </Suspense>
        </div>
      </main>
    </>
  );
};

export default AppNeobrutalist;

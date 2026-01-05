import React, { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Prevent scrolling during preloader
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      // Small delay before showing content for smooth transition
      setTimeout(() => setShowContent(true), 50);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!showContent) return;

    // @ts-ignore
    const gsap = window.gsap;
    // @ts-ignore
    const ScrollTrigger = window.ScrollTrigger;

    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);

      // Simple ScrollTrigger setup without Lenis for better performance
      // Native browser scrolling is smoother on most modern browsers
      
      // Refresh ScrollTrigger after content loads
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);

      return () => {
        clearTimeout(timer);
        ScrollTrigger.getAll().forEach((t: any) => t.kill());
      };
    }
  }, [showContent]);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      <main 
        className={`relative min-h-screen overflow-x-hidden bg-black text-white selection:bg-amber-400 selection:text-black transition-opacity duration-300 ease-out ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Navbar />

        <div className="relative z-10">
          <Hero />
          <Portfolio />
          <Services />
          <About />
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { SITE_CONFIG } from '../constants';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentProject, setCurrentProject] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  // Sample hero images - these would be your featured project images
  const heroImages = [
    '/project-communidata.png',
    '/project-chistartuphub.png',
    '/project-innovationlabs.png',
    '/project-fontis.png',
  ];

  // Simple fade-in on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToWork = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef} 
      className="relative h-screen w-full flex flex-col overflow-hidden bg-black"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {heroImages.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-out ${
              index === currentProject ? 'opacity-40' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-6">
        {/* Logo/Monogram */}
        <div 
          className={`mb-8 transition-all duration-500 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div 
            className="text-[20vw] md:text-[15vw] lg:text-[12vw] font-black leading-none text-amber-400"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            TV
          </div>
        </div>

        {/* Tagline in brackets */}
        <div 
          className={`text-center transition-all duration-500 ease-out delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span 
            className="text-xs md:text-sm tracking-[0.3em] uppercase text-white/80"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            [{SITE_CONFIG.tagline}]
          </span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer group transition-all duration-500 ease-out delay-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={scrollToWork}
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 group-hover:text-white/80 transition-colors duration-150">
            &lt;&lt; Scroll to Explore &gt;&gt;
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </div>

      {/* Project Counter */}
      <div 
        className={`absolute bottom-12 right-6 md:right-12 lg:right-24 text-white/30 text-xs font-mono transition-opacity duration-500 delay-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-white">{String(currentProject + 1).padStart(2, '0')}</span>
        <span className="mx-2">/</span>
        <span>{String(heroImages.length).padStart(2, '0')}</span>
      </div>

      {/* Location */}
      <div 
        className={`absolute bottom-12 left-6 md:left-12 lg:left-24 transition-opacity duration-500 delay-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/50">
          {SITE_CONFIG.location}
        </span>
      </div>
    </section>
  );
};

export default Hero;

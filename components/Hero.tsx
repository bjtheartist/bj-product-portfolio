import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { SITE_CONFIG } from '../constants';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentProject, setCurrentProject] = useState(0);
  const { theme } = useTheme();

  // Sample hero images - these would be your featured project images
  const heroImages = [
    '/project-communidata.png',
    '/project-chistartuphub.png',
    '/project-innovationlabs.png',
    '/project-fontis.png',
  ];

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    if (!gsap) return;

    // Entrance animations
    const tl = gsap.timeline({ delay: 0.3 });

    // Logo animation
    tl.fromTo('.hero-logo',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
    );

    // Tagline animation
    tl.fromTo('.hero-tagline',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    );

    // Scroll indicator
    tl.fromTo('.scroll-indicator',
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );

    // Background image subtle animation
    gsap.to('.hero-bg-image', {
      scale: 1.05,
      duration: 20,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    });

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
            className={`hero-bg-image absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
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
        <div className="hero-logo mb-8">
          <div 
            className="text-[20vw] md:text-[15vw] lg:text-[12vw] font-black leading-none text-amber-400"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            TV
          </div>
        </div>

        {/* Tagline in brackets */}
        <div className="hero-tagline text-center">
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
        className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer group"
        onClick={scrollToWork}
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 group-hover:text-white/80 transition-colors">
            &lt;&lt; Scroll to Explore &gt;&gt;
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Project Counter */}
      <div className="absolute bottom-12 right-6 md:right-12 lg:right-24 text-white/30 text-xs font-mono">
        <span className="text-white">{String(currentProject + 1).padStart(2, '0')}</span>
        <span className="mx-2">/</span>
        <span>{String(heroImages.length).padStart(2, '0')}</span>
      </div>

      {/* Location */}
      <div className="absolute bottom-12 left-6 md:left-12 lg:left-24">
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/50">
          {SITE_CONFIG.location}
        </span>
      </div>
    </section>
  );
};

export default Hero;

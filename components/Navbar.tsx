import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { SITE_CONFIG, SOCIAL_LINKS } from '../constants';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    // Small delay to let menu close animation start
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const menuItems = [
    { label: 'Work', id: 'portfolio' },
    { label: 'Services', id: 'services' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="relative z-[60]"
            >
              <span 
                className={`text-2xl md:text-3xl font-black tracking-tight transition-colors duration-200 ${
                  isMenuOpen ? 'text-black' : 'text-amber-400'
                }`}
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                TV
              </span>
            </a>

            {/* Center Tagline - Desktop Only */}
            <div className={`hidden lg:block absolute left-1/2 -translate-x-1/2 transition-opacity duration-200 ${
              isScrolled || isMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}>
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/60">
                [{SITE_CONFIG.tagline}]
              </span>
            </div>

            {/* Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`relative z-[60] text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-200 ${
                isMenuOpen ? 'text-black' : 'text-white'
              }`}
            >
              [{isMenuOpen ? 'Close' : 'Menu'}]
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay - Simplified animations */}
      <div 
        className={`fixed inset-0 z-[55] bg-amber-400 transition-all duration-300 ease-out ${
          isMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Menu Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-24">
          <nav className="max-w-4xl">
            {menuItems.map((item, index) => (
              <div 
                key={item.id}
                className={`transition-all duration-300 ease-out ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: isMenuOpen ? `${index * 50 + 100}ms` : '0ms' }}
              >
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="group flex items-center gap-4 py-3 md:py-4"
                >
                  <span className="text-black/30 text-sm font-mono">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span 
                    className="text-5xl md:text-7xl lg:text-8xl font-black text-black hover:text-black/70 transition-colors duration-150"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {item.label}
                  </span>
                </button>
              </div>
            ))}
          </nav>

          {/* Footer Info */}
          <div 
            className={`absolute bottom-12 left-6 md:left-12 lg:left-24 right-6 md:right-12 lg:right-24 flex flex-col md:flex-row justify-between gap-8 transition-all duration-300 ease-out ${
              isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: isMenuOpen ? '300ms' : '0ms' }}
          >
            {/* Social Links */}
            <div className="flex gap-6">
              <a 
                href={SOCIAL_LINKS.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs tracking-[0.1em] uppercase text-black/60 hover:text-black transition-colors duration-150"
              >
                Instagram
              </a>
              <a 
                href={SOCIAL_LINKS.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs tracking-[0.1em] uppercase text-black/60 hover:text-black transition-colors duration-150"
              >
                LinkedIn
              </a>
              <a 
                href={SOCIAL_LINKS.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs tracking-[0.1em] uppercase text-black/60 hover:text-black transition-colors duration-150"
              >
                GitHub
              </a>
            </div>

            {/* Contact */}
            <div>
              <a 
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-xs tracking-[0.1em] uppercase text-black/60 hover:text-black transition-colors duration-150"
              >
                {SITE_CONFIG.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

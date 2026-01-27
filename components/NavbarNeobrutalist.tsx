/**
 * NavbarNeobrutalist.tsx
 * 
 * WHAT THIS FILE DOES:
 * This creates the minimal navigation like Lorenzo's site.
 * Instead of a traditional navbar, we have:
 * - "Menu" in the top-left corner
 * - "Contact" in the top-right corner
 * - A full-screen overlay menu when "Menu" is clicked
 * 
 * DESIGN PHILOSOPHY:
 * Neobrutalist design values simplicity and boldness.
 * The navigation is stripped down to essentials, letting
 * the content be the star of the show.
 */

import React, { useState, useEffect, useCallback } from 'react';

// ============================================
// CONFIGURATION
// ============================================
const SITE_CONFIG = {
  name: 'Billy Ndizeye',
  tagline: 'PRODUCT DESIGNER & BUILDER',
  location: 'Chicago, Illinois',
  email: 'hello@billytheartist.com',
};

const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/in/bjtheartist',
  github: 'https://github.com/bjtheartist',
  instagram: 'https://instagram.com/bjtheartist',
};

// ============================================
// MAIN NAVBAR COMPONENT
// ============================================
const NavbarNeobrutalist: React.FC = () => {
  // STATE: Is the menu open or closed?
  // useState is like a light switch - it remembers if it's on or off
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // STATE: Has the user scrolled down?
  const [isScrolled, setIsScrolled] = useState(false);

  // EFFECT: Listen for scroll events
  // useEffect is like setting up a listener that watches for something
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // EFFECT: Prevent body scroll when menu is open
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

  // FUNCTION: Scroll to a section smoothly
  const scrollToSection = useCallback((id: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, []);

  // Menu items configuration
  const menuItems = [
    { label: 'Work', id: 'portfolio' },
    { label: 'Services', id: 'services' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      {/* 
        FIXED HEADER
        "fixed" means it stays in place even when you scroll
        "z-50" means it's on top of other elements (z-index)
      */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled && !isMenuOpen
            ? 'bg-[#FAF9F6]/90 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="px-6 md:px-12 lg:px-24">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* LEFT: Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`relative z-[60] text-sm font-medium tracking-[0.15em] uppercase transition-colors duration-200 px-4 py-2 border-2 ${
                isMenuOpen
                  ? 'text-[#FAF9F6] border-[#FAF9F6]'
                  : 'text-[#1A1A1A] border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FAF9F6]'
              }`}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? 'Close' : 'Menu'}
            </button>

            {/* CENTER: Logo/Name (visible when scrolled) */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 transition-opacity duration-300 ${
                isScrolled && !isMenuOpen ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <span
                className="text-xl font-black text-[#1A1A1A]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                BILLY<span className="text-[#dc2626]">◆</span>NDIZEYE
              </span>
            </div>

            {/* RIGHT: Contact Button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className={`relative z-[60] text-sm font-medium tracking-[0.15em] uppercase transition-colors duration-200 px-4 py-2 ${
                isMenuOpen
                  ? 'text-[#FAF9F6] hover:text-[#3b82f6]'
                  : 'text-[#1A1A1A] hover:text-[#3b82f6]'
              }`}
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      {/* 
        FULL SCREEN MENU OVERLAY
        This appears when you click "Menu"
        It covers the entire screen with navigation options
      */}
      <div
        className={`fixed inset-0 z-[55] transition-all duration-500 ease-out ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{
          backgroundColor: '#1A1A1A',
        }}
      >
        {/* Decorative elements in menu */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-64 h-64 rounded-full bg-[#3b82f6] opacity-10"
            style={{ top: '10%', right: '10%' }}
          />
          <div
            className="absolute w-32 h-32 bg-[#22d3ee] opacity-10"
            style={{ bottom: '20%', left: '5%', transform: 'rotate(45deg)' }}
          />
        </div>

        {/* Menu Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-20">
          <nav className="max-w-4xl">
            {menuItems.map((item, index) => (
              <div
                key={item.id}
                className={`transition-all duration-500 ease-out ${
                  isMenuOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 80 + 100}ms` : '0ms',
                }}
              >
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="group flex items-center gap-4 py-3 md:py-4"
                >
                  {/* Number indicator */}
                  <span className="text-[#FAF9F6]/30 text-sm font-mono">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  
                  {/* Menu item text */}
                  <span
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#FAF9F6] hover:text-[#3b82f6] transition-colors duration-200"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {item.label}
                  </span>
                  
                  {/* Arrow that appears on hover */}
                  <svg
                    className="w-8 h-8 md:w-12 md:h-12 text-[#3b82f6] opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-x-4 group-hover:translate-x-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </nav>

          {/* Footer info in menu */}
          <div
            className={`absolute bottom-8 md:bottom-12 left-6 md:left-12 lg:left-24 right-6 md:right-12 lg:right-24 flex flex-col md:flex-row justify-between gap-6 transition-all duration-500 ease-out ${
              isMenuOpen
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: isMenuOpen ? '400ms' : '0ms' }}
          >
            {/* Social Links */}
            <div className="flex flex-wrap gap-6">
              {SOCIAL_LINKS.linkedin && (
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.15em] uppercase text-[#FAF9F6]/60 hover:text-[#3b82f6] transition-colors duration-200"
                >
                  LinkedIn
                </a>
              )}
              {SOCIAL_LINKS.github && (
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.15em] uppercase text-[#FAF9F6]/60 hover:text-[#3b82f6] transition-colors duration-200"
                >
                  GitHub
                </a>
              )}
              {SOCIAL_LINKS.instagram && (
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.15em] uppercase text-[#FAF9F6]/60 hover:text-[#3b82f6] transition-colors duration-200"
                >
                  Instagram
                </a>
              )}
            </div>

            {/* Location */}
            <div>
              <span className="text-xs tracking-[0.15em] uppercase text-[#FAF9F6]/40">
                {SITE_CONFIG.location}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarNeobrutalist;

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
  name: 'Kivara Studios',
  tagline: 'DESIGN, BUILD & SHIP',
  location: 'Chicago, Illinois',
  email: 'hello@kivarastudios.dev',
};

const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/billy-ndizeye/',
  github: 'https://github.com/bjtheartist',
  instagram: 'https://www.instagram.com/kivarastudios/',
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
    { label: 'About', id: 'about' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'Get Started', id: 'get-started' },
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
            ? 'bg-[#f5f2eb]/90 backdrop-blur-md border-b border-[#1c1a17]/15'
            : 'bg-transparent'
        }`}
      >
        <div className="px-6 sm:px-10 md:px-16 lg:px-24">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* LEFT: Menu Button — quiet text trigger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`relative z-[60] text-[11px] tracking-[0.28em] uppercase font-medium transition-colors duration-300 ${
                isMenuOpen
                  ? 'text-[#f5f2eb]/90 hover:text-[#f5f2eb]'
                  : isScrolled
                  ? 'text-[#1c1a17] hover:text-[#1c1a17]/60'
                  : 'text-[#f5f2eb]/90 hover:text-[#f5f2eb]'
              }`}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? 'Close' : 'Menu'}
            </button>

            {/* CENTER: Wordmark — always visible, set in small caps */}
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`absolute left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
              aria-label="Kivara Studios — home"
            >
              <span
                className={`text-[11px] sm:text-xs tracking-[0.32em] uppercase font-medium transition-colors duration-300 ${
                  isMenuOpen
                    ? 'text-[#f5f2eb]'
                    : isScrolled
                    ? 'text-[#1c1a17]'
                    : 'text-[#f5f2eb]'
                }`}
              >
                Kivara Studios
              </span>
            </a>

            {/* RIGHT: Get Started link */}
            <a
              href="#get-started"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('get-started');
              }}
              className={`group relative z-[60] inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase font-medium transition-colors duration-300 ${
                isMenuOpen
                  ? 'text-[#f5f2eb]/90 hover:text-[#f5f2eb]'
                  : isScrolled
                  ? 'text-[#1c1a17] hover:text-[#1c1a17]/60'
                  : 'text-[#f5f2eb]/90 hover:text-[#f5f2eb]'
              }`}
            >
              Start a project
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
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
          backgroundColor: '#1c1a17',
        }}
      >

        {/* Menu Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-24 pt-16 sm:pt-20">
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
                  <span className="text-[#f5f2eb]/40 text-[10px] font-mono tracking-[0.2em]">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Menu item text — serif, magazine TOC feel */}
                  <span
                    className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#f5f2eb] hover:text-[#f5f2eb]/60 transition-colors duration-300 tracking-[-0.01em] italic"
                    style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
                  >
                    {item.label}
                  </span>

                  {/* Arrow that appears on hover */}
                  <svg
                    className="w-7 h-7 md:w-10 md:h-10 text-[#f5f2eb]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-3 group-hover:translate-x-0"
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
            className={`absolute bottom-6 sm:bottom-8 md:bottom-12 left-4 sm:left-6 md:left-12 lg:left-24 right-4 sm:right-6 md:right-12 lg:right-24 flex flex-col md:flex-row justify-between gap-4 sm:gap-6 transition-all duration-500 ease-out ${
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
                  className="text-xs tracking-[0.28em] uppercase text-[#f5f2eb]/60 hover:text-[#f5f2eb] transition-colors duration-200"
                >
                  LinkedIn
                </a>
              )}
              {SOCIAL_LINKS.github && (
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.28em] uppercase text-[#f5f2eb]/60 hover:text-[#f5f2eb] transition-colors duration-200"
                >
                  GitHub
                </a>
              )}
              {SOCIAL_LINKS.instagram && (
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.28em] uppercase text-[#f5f2eb]/60 hover:text-[#f5f2eb] transition-colors duration-200"
                >
                  Instagram
                </a>
              )}
            </div>

            {/* Location */}
            <div>
              <span className="text-xs tracking-[0.28em] uppercase text-[#f5f2eb]/40">
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

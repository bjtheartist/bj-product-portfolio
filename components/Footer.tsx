import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { SITE_CONFIG, SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-black border-t border-white/10">
      <div className="px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <span 
              className="text-3xl font-black text-amber-400"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              TV
            </span>
            <span className="text-xs tracking-[0.2em] uppercase text-white/40 hidden md:inline">
              [{SITE_CONFIG.tagline}]
            </span>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-xs tracking-[0.1em] uppercase text-white/40">
              © {currentYear} {SITE_CONFIG.name}. All Rights Reserved.
            </p>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-6">
            <a 
              href={SOCIAL_LINKS.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs tracking-[0.1em] uppercase text-white/40 hover:text-amber-400 transition-colors"
            >
              IG
            </a>
            <a 
              href={SOCIAL_LINKS.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs tracking-[0.1em] uppercase text-white/40 hover:text-amber-400 transition-colors"
            >
              LI
            </a>
            <a 
              href={SOCIAL_LINKS.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs tracking-[0.1em] uppercase text-white/40 hover:text-amber-400 transition-colors"
            >
              GH
            </a>
            <span className="text-white/20">|</span>
            <button
              onClick={scrollToTop}
              className="text-xs tracking-[0.1em] uppercase text-white/40 hover:text-amber-400 transition-colors"
            >
              [Top]
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

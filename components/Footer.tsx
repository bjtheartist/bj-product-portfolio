import React from 'react';
import { SITE_CONFIG, SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
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
            {/* TemsVision Eye Logo */}
            <div className="w-10 h-8">
              <svg viewBox="0 0 40 30" className="w-full h-full">
                {/* Eye shape */}
                <path 
                  d="M20 5 Q35 15 20 25 Q5 15 20 5" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="1.5"
                />
                {/* Aperture */}
                <circle cx="20" cy="15" r="6" fill="none" stroke="#38bdf8" strokeWidth="1" />
                <circle cx="20" cy="15" r="2" fill="#38bdf8" />
              </svg>
            </div>
            <span 
              className="text-lg font-black text-white tracking-wider"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              TEMS<span className="text-amber-400">VISION</span>
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
            {SOCIAL_LINKS.instagram && (
              <a 
                href={SOCIAL_LINKS.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs tracking-[0.1em] uppercase text-white/40 hover:text-amber-400 transition-colors"
              >
                IG
              </a>
            )}
            {SOCIAL_LINKS.facebook && (
              <a 
                href={SOCIAL_LINKS.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs tracking-[0.1em] uppercase text-white/40 hover:text-amber-400 transition-colors"
              >
                FB
              </a>
            )}
            {SOCIAL_LINKS.linkedin && (
              <a 
                href={SOCIAL_LINKS.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs tracking-[0.1em] uppercase text-white/40 hover:text-amber-400 transition-colors"
              >
                LI
              </a>
            )}
            {SOCIAL_LINKS.pinterest && (
              <a 
                href={SOCIAL_LINKS.pinterest} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs tracking-[0.1em] uppercase text-white/40 hover:text-amber-400 transition-colors"
              >
                PI
              </a>
            )}
            <span className="text-white/20">|</span>
            <button
              onClick={scrollToTop}
              className="text-xs tracking-[0.1em] uppercase text-white/40 hover:text-amber-400 transition-colors"
            >
              [Top]
            </button>
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/20">
            [{SITE_CONFIG.tagline}]
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

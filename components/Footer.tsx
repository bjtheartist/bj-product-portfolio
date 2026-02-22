import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] border-t-2 border-[#dc2626] py-12 md:py-16">
      <div className="px-4 sm:px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto">
        {/* Testimonial Quote */}
        <div className="mb-12 max-w-3xl">
          <blockquote className="text-[#FAF9F6]/80 text-lg md:text-xl italic leading-relaxed mb-4">
            "Kivara Studios delivered our site in 3 days and it outperforms everything we've had before.
            Fast, clean, and highly performing. Exactly what we needed."
          </blockquote>
          <cite className="text-[#FAF9F6]/40 text-sm not-italic">
            — JC
          </cite>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#FAF9F6]/10 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Brand + Performance Badge */}
          <div className="flex items-center gap-6">
            <p
              className="text-[#FAF9F6] text-xl font-black tracking-wider"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              KIVARA<span className="text-[#dc2626]">◆</span>STUDIOS
            </p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-[#22c55e]/30 text-[#22c55e] text-[10px] uppercase tracking-wider font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
              Accepting Projects
            </span>
          </div>

          {/* Contact + Social */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
            <a
              href="mailto:hello@kivarastudios.dev"
              className="text-[#FAF9F6]/60 text-sm hover:text-[#dc2626] transition-colors"
            >
              hello@kivarastudios.dev
            </a>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/billy-ndizeye/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FAF9F6]/40 text-xs uppercase tracking-wider hover:text-[#FAF9F6] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/bjtheartist"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FAF9F6]/40 text-xs uppercase tracking-wider hover:text-[#FAF9F6] transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.instagram.com/kivarastudios/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FAF9F6]/40 text-xs uppercase tracking-wider hover:text-[#FAF9F6] transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-[#FAF9F6]/5">
          <p className="text-[#FAF9F6]/30 text-xs tracking-wide">
            © {currentYear} Kivara Studios. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

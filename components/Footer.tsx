import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f5f2eb] border-t border-[#1c1a17]/15 py-12 md:py-16">
      <div className="px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <p
              className="text-[#1c1a17] mb-3"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                fontWeight: 400,
              }}
            >
              Kivara Studios
            </p>
            <p className="text-[10px] tracking-[0.32em] uppercase text-[#1c1a17]/55">
              Chicago, IL · Available worldwide
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-4">
            <a
              href="mailto:hello@kivarastudios.dev"
              className="text-base text-[#1c1a17] font-light hover:text-[#1c1a17]/60 transition-colors duration-300 border-b border-[#1c1a17]/25 hover:border-[#1c1a17] pb-1 self-start md:self-auto"
            >
              hello@kivarastudios.dev
            </a>
            <div className="flex items-center gap-6 text-[10px] tracking-[0.28em] uppercase text-[#1c1a17]/55">
              <a
                href="https://www.linkedin.com/in/billy-ndizeye/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1c1a17] transition-colors duration-300"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/bjtheartist"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1c1a17] transition-colors duration-300"
              >
                GitHub
              </a>
              <a
                href="https://www.instagram.com/kivarastudios/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1c1a17] transition-colors duration-300"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#1c1a17]/10">
          <p className="text-[10px] tracking-[0.28em] uppercase text-[#1c1a17]/40">
            © {currentYear} Kivara Studios
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

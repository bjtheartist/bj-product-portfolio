import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] border-t-2 border-[#dc2626] py-8">
      <div className="px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Brand Name */}
          <p className="font-bebas text-[#FAF9F6] text-lg tracking-wider">
            BILLY<span className="text-[#dc2626]">◆</span>NDIZEYE
          </p>

          {/* Copyright */}
          <p className="text-[#FAF9F6]/60 text-xs tracking-wide">
            © {currentYear} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

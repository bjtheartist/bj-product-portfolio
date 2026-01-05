import React, { useEffect, useState } from 'react';
import { SITE_CONFIG } from '../constants';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToWork = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full flex flex-col overflow-hidden bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-6">
        {/* Logo - TemsVision Eye */}
        <div 
          className={`mb-6 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative w-48 h-32 flex items-center justify-center">
            <svg viewBox="0 0 140 80" className="w-full h-full">
              {/* TEMS text */}
              <text 
                x="70" 
                y="25" 
                textAnchor="middle" 
                className="fill-white text-xl font-black"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', letterSpacing: '2px' }}
              >
                TEMS
              </text>
              
              {/* Eye shape */}
              <path 
                d="M70 30 Q115 55 70 80 Q25 55 70 30" 
                fill="none" 
                stroke="white" 
                strokeWidth="3"
              />
              
              {/* Camera aperture/iris */}
              <circle cx="70" cy="55" r="18" fill="none" stroke="#38bdf8" strokeWidth="2" />
              
              {/* Aperture blades - creating the camera shutter look */}
              <path d="M70 37 L60 55 L70 73" fill="#0ea5e9" opacity="0.9" />
              <path d="M70 37 L80 55 L70 73" fill="#06b6d4" opacity="0.9" />
              <path d="M52 55 L70 45 L88 55" fill="#22d3d8" opacity="0.7" />
              <path d="M52 55 L70 65 L88 55" fill="#0891b2" opacity="0.7" />
              
              {/* Center dot */}
              <circle cx="70" cy="55" r="4" fill="#38bdf8" />
              
              {/* VISION text */}
              <text 
                x="70" 
                y="95" 
                textAnchor="middle" 
                className="fill-white text-xl font-black"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', letterSpacing: '4px' }}
              >
                VISION
              </text>
            </svg>
          </div>
        </div>

        {/* Tagline in brackets - O'Shane Howard style */}
        <div 
          className={`text-center transition-all duration-700 ease-out delay-150 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span 
            className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/60"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            [{SITE_CONFIG.tagline}]
          </span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer group transition-all duration-700 ease-out delay-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={scrollToWork}
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 group-hover:text-white/70 transition-colors duration-200">
            &lt;&lt; Scroll to Explore &gt;&gt;
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>

      {/* Location */}
      <div 
        className={`absolute bottom-12 left-6 md:left-12 lg:left-24 transition-all duration-700 delay-400 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/40">
          {SITE_CONFIG.location}
        </span>
      </div>

      {/* Instagram handle */}
      <div 
        className={`absolute bottom-12 right-6 md:right-12 lg:right-24 transition-all duration-700 delay-400 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <a 
          href="https://www.instagram.com/temsvision/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] tracking-[0.2em] uppercase text-white/40 hover:text-amber-400 transition-colors duration-200"
        >
          {SITE_CONFIG.instagram}
        </a>
      </div>
    </section>
  );
};

export default Hero;

import React, { useEffect, useState } from 'react';
import { SITE_CONFIG } from '../constants';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 2200;
    const interval = 25;
    const increment = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment + (Math.random() * 0.5);
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onComplete, 600);
      }, 300);
      
      return () => clearTimeout(exitTimer);
    }
  }, [progress, onComplete]);

  // Get individual digits for the sliced animation
  const progressInt = Math.min(Math.floor(progress), 100);
  const digits = progressInt.toString().padStart(3, '0').split('');

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-all duration-600 ease-out ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Logo - TemsVision Eye */}
      <div 
        className={`mb-8 transition-all duration-500 ease-out ${
          isExiting ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Simplified eye logo representation */}
        <div className="relative w-32 h-20 flex items-center justify-center">
          <svg viewBox="0 0 120 60" className="w-full h-full">
            {/* Eye outline */}
            <path 
              d="M60 5 Q100 30 60 55 Q20 30 60 5" 
              fill="none" 
              stroke="#f59e0b" 
              strokeWidth="3"
              className="animate-pulse"
            />
            {/* Iris */}
            <circle cx="60" cy="30" r="15" fill="none" stroke="#38bdf8" strokeWidth="2" />
            {/* Pupil */}
            <circle cx="60" cy="30" r="8" fill="#38bdf8" />
            {/* Aperture blades */}
            <path d="M60 15 L52 30 L60 45" fill="#0ea5e9" opacity="0.8" />
            <path d="M60 15 L68 30 L60 45" fill="#06b6d4" opacity="0.8" />
            <path d="M45 30 L60 22 L75 30" fill="#22d3d8" opacity="0.6" />
          </svg>
        </div>
        
        {/* Brand name */}
        <div className="text-center mt-4">
          <span 
            className="text-3xl font-black text-white tracking-wider"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            TEMS<span className="text-amber-400">VISION</span>
          </span>
        </div>
      </div>

      {/* Tagline */}
      <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/40 mb-12">
        [{SITE_CONFIG.tagline}]
      </p>

      {/* Sliced/Diced Loading Counter - O'Shane Howard Style */}
      <div className="flex items-center gap-1">
        <span className="text-[10px] font-mono tracking-wider text-white/30 mr-4 uppercase">
          Loading
        </span>
        
        {/* Animated digit columns */}
        <div className="flex">
          {digits.map((digit, index) => (
            <div 
              key={index} 
              className="relative w-8 h-12 overflow-hidden mx-0.5"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
              }}
            >
              <div 
                className="absolute inset-0 flex flex-col items-center transition-transform duration-150 ease-out"
                style={{ 
                  transform: `translateY(-${parseInt(digit) * 10}%)`,
                }}
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <span 
                    key={num}
                    className="text-3xl font-mono text-white h-12 flex items-center justify-center"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {num}
                  </span>
                ))}
              </div>
              
              {/* Slice lines for diced effect */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-0 right-0 h-px bg-black/50" />
                <div className="absolute top-2/4 left-0 right-0 h-px bg-black/30" />
                <div className="absolute top-3/4 left-0 right-0 h-px bg-black/50" />
              </div>
            </div>
          ))}
        </div>
        
        <span 
          className="text-3xl font-mono text-amber-400 ml-1"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          %
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-8 w-48 h-px bg-white/10 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-amber-400 to-amber-500"
          style={{ 
            width: `${progress}%`,
            transition: 'width 25ms linear'
          }}
        />
      </div>

      {/* Decorative sliced lines */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-2 opacity-20">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="w-px bg-white"
            style={{
              height: `${20 + i * 10}px`,
              opacity: progress > (i * 20) ? 1 : 0.3,
              transition: 'opacity 200ms ease-out'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Preloader;

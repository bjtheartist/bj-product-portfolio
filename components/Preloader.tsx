import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simple progress animation - no GSAP for smoother performance
    const duration = 1800; // 1.8 seconds total
    const interval = 30; // Update every 30ms
    const increment = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
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
      // Start exit animation after a brief pause
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        // Complete after exit animation
        setTimeout(onComplete, 400);
      }, 200);
      
      return () => clearTimeout(exitTimer);
    }
  }, [progress, onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-opacity duration-400 ease-out ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Logo */}
      <div 
        className={`text-8xl md:text-9xl font-black text-amber-400 mb-6 transition-transform duration-400 ease-out ${
          isExiting ? 'scale-105' : 'scale-100'
        }`}
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        TV
      </div>

      {/* Tagline */}
      <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/50 mb-10">
        [PHOTOGRAPHER & CREATIVE DIRECTOR]
      </p>

      {/* Simple progress bar */}
      <div className="w-48 h-px bg-white/20 overflow-hidden">
        <div 
          className="h-full bg-amber-400"
          style={{ 
            width: `${progress}%`,
            transition: 'width 30ms linear'
          }}
        />
      </div>

      {/* Progress number */}
      <p className="mt-4 text-sm font-mono text-white/40">
        {Math.round(progress)}%
      </p>
    </div>
  );
};

export default Preloader;

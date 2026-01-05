import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { SITE_CONFIG } from '../constants';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    
    // Simulate loading progress
    const duration = 2.5;
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const newProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(newProgress);
      
      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setIsExiting(true);
          
          if (gsap) {
            const tl = gsap.timeline({
              onComplete: () => {
                setTimeout(onComplete, 100);
              }
            });
            
            tl.to('.preloader-content', {
              y: -50,
              opacity: 0,
              duration: 0.6,
              ease: 'power3.inOut'
            })
            .to('.preloader-container', {
              yPercent: -100,
              duration: 0.8,
              ease: 'power4.inOut'
            }, '-=0.3');
          } else {
            setTimeout(onComplete, 800);
          }
        }, 300);
      }
    };
    
    requestAnimationFrame(updateProgress);
  }, [onComplete]);

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    if (!gsap) return;

    // Entrance animations
    gsap.fromTo('.preloader-logo', 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    );
    
    gsap.fromTo('.preloader-tagline',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.6 }
    );
    
    gsap.fromTo('.preloader-progress',
      { opacity: 0 },
      { opacity: 1, duration: 0.4, delay: 0.8 }
    );
  }, []);

  // Animated number display
  const digits = progress.toString().padStart(3, '0').split('');

  return (
    <div className="preloader-container fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black">
      <div className="preloader-content flex flex-col items-center">
        {/* Logo */}
        <div className="preloader-logo mb-8">
          <span 
            className="text-[25vw] md:text-[18vw] lg:text-[15vw] font-black text-amber-400 leading-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            TV
          </span>
        </div>
        
        {/* Tagline */}
        <p className="preloader-tagline text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/50 mb-12">
          [{SITE_CONFIG.tagline}]
        </p>
        
        {/* Progress Display - Animated Counter Style */}
        <div className="preloader-progress flex items-center gap-2">
          <span className="text-[10px] font-mono tracking-wider text-white/30 mr-4">
            LOADING
          </span>
          
          {/* Animated Digits */}
          <div className="flex">
            {digits.map((digit, index) => (
              <div 
                key={index} 
                className="relative w-6 h-8 overflow-hidden"
              >
                <div 
                  className="absolute inset-0 flex flex-col items-center transition-transform duration-100"
                  style={{ 
                    transform: `translateY(-${parseInt(digit) * 10}%)`,
                  }}
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <span 
                      key={num}
                      className="text-xl font-mono text-white h-8 flex items-center justify-center"
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <span className="text-xl font-mono text-amber-400 ml-1">%</span>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 w-48 h-px bg-white/10">
          <div 
            className="h-full bg-amber-400 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;

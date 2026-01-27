import React, { useEffect, useState, memo } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

/**
 * Preloader Component - Lorenzo Dal Dosso Inspired
 *
 * Premium morphing animation sequence:
 * 1. Thin horizontal LINE appears in center
 * 2. Line EXPANDS vertically into a perfect SQUARE
 * 3. Square SHRINKS into a progress bar at center
 * 4. Progress bar fills with loading animation
 * 5. Staggered entrance reveals page content
 */
const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'line' | 'expand' | 'shrink' | 'loading' | 'reveal' | 'done'>('line');
  const [progress, setProgress] = useState(0);

  // Phase transitions
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Phase 1: Show line, then expand to square
    timers.push(setTimeout(() => setPhase('expand'), 400));

    // Phase 2: After expanding, shrink to progress bar
    timers.push(setTimeout(() => setPhase('shrink'), 1200));

    // Phase 3: Start loading animation
    timers.push(setTimeout(() => setPhase('loading'), 1800));

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  // Animate the loading progress
  useEffect(() => {
    if (phase === 'loading') {
      const duration = 1500;
      const startTime = performance.now();
      let animationId: number;

      const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const linearProgress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(linearProgress) * 100;

        setProgress(easedProgress);

        if (linearProgress < 1) {
          animationId = requestAnimationFrame(animate);
        } else {
          setTimeout(() => setPhase('reveal'), 300);
        }
      };

      animationId = requestAnimationFrame(animate);

      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    }
  }, [phase]);

  // Complete and exit
  useEffect(() => {
    if (phase === 'reveal') {
      const timer = setTimeout(() => {
        setPhase('done');
        onComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  // Calculate dimensions based on phase
  const getShapeStyles = () => {
    switch (phase) {
      case 'line':
        return {
          width: '120px',
          height: '2px',
          borderRadius: '1px',
        };
      case 'expand':
        return {
          width: '200px',
          height: '200px',
          borderRadius: '0px',
        };
      case 'shrink':
      case 'loading':
        return {
          width: '280px',
          height: '4px',
          borderRadius: '2px',
        };
      default:
        return {
          width: '280px',
          height: '4px',
          borderRadius: '2px',
        };
    }
  };

  return (
    <>
      <style>{`
        @keyframes slideUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-100%);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }

        .morphing-shape {
          transition: all 0.6s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .reveal-animation {
          animation: slideUp 0.8s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
      `}</style>

      {/* Full screen overlay */}
      <div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1A1A1A] ${
          phase === 'reveal' ? 'reveal-animation' : ''
        }`}
      >
        {/* Morphing shape container */}
        <div className="relative flex flex-col items-center justify-center">
          {/* The morphing element */}
          <div
            className="morphing-shape bg-[#dc2626] overflow-hidden"
            style={getShapeStyles()}
          >
            {/* Progress fill (only visible in loading phase) */}
            {(phase === 'shrink' || phase === 'loading') && (
              <div
                className="h-full bg-white transition-all duration-75 ease-linear"
                style={{
                  width: `${progress}%`,
                  opacity: phase === 'loading' ? 1 : 0,
                }}
              />
            )}
          </div>

          {/* Content that appears during expand phase */}
          {phase === 'expand' && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                animation: 'fadeInUp 0.4s ease-out forwards',
              }}
            >
              <span
                className="text-white text-4xl font-black"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                ◆
              </span>
            </div>
          )}

          {/* Loading text and percentage */}
          {(phase === 'shrink' || phase === 'loading') && (
            <div
              className="mt-8 flex flex-col items-center gap-4"
              style={{
                animation: 'fadeInUp 0.4s ease-out forwards',
                animationDelay: '0.2s',
                opacity: 0,
              }}
            >
              {/* Percentage */}
              <div className="flex items-baseline gap-1">
                <span
                  className="text-4xl font-light text-white tabular-nums"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {Math.round(progress).toString().padStart(3, '0')}
                </span>
                <span
                  className="text-2xl text-white/50"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  %
                </span>
              </div>

              {/* Loading text */}
              <p
                className="text-[10px] tracking-[0.3em] uppercase text-white/40"
                style={{ animation: 'pulse 1.5s ease-in-out infinite' }}
              >
                Loading Experience
              </p>
            </div>
          )}

          {/* Name that appears below during loading */}
          {phase === 'loading' && progress > 50 && (
            <div
              className="absolute -bottom-32 left-1/2 -translate-x-1/2"
              style={{
                animation: 'fadeInUp 0.6s ease-out forwards',
              }}
            >
              <h1
                className="text-2xl md:text-3xl font-black text-white/20 tracking-tight whitespace-nowrap"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                BILLY◆NDIZEYE
              </h1>
            </div>
          )}
        </div>

        {/* Corner branding */}
        <div className="absolute bottom-8 left-8">
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/20">
            Product Designer & Builder
          </p>
        </div>

        <div className="absolute bottom-8 right-8">
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/20">
            Chicago, IL
          </p>
        </div>
      </div>
    </>
  );
};

export default memo(Preloader);

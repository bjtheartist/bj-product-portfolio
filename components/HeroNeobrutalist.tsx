/**
 * HeroNeobrutalist.tsx
 *
 * Premium motion design:
 * - Square snake cursor trail (no floating circle)
 * - Bouncing letter animation for name
 * - Floating elements in RED theme
 * - Red diamond in header for consistency
 * - Scrolling marquee
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';

// ============================================
// FLOATING ELEMENT COMPONENT
// ============================================
interface FloatingElementProps {
  shape: 'circle' | 'diamond' | 'square' | 'ring' | 'star' | 'photo';
  color: string;
  size: number;
  position: { top: string; left: string };
  delay: number;
  duration: number;
  layer: 1 | 2 | 3;
  imageUrl?: string;
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  shape,
  color,
  size,
  position,
  delay,
  duration,
  layer,
  imageUrl,
}) => {
  const layerStyles = {
    1: { opacity: 0.3, filter: 'blur(1px)', zIndex: 1 },
    2: { opacity: 0.6, filter: 'blur(0px)', zIndex: 5 },
    3: { opacity: 0.9, filter: 'blur(0px)', zIndex: 10 },
  };

  const renderShape = () => {
    switch (shape) {
      case 'circle':
        return (
          <div
            className="rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
            }}
          />
        );
      case 'diamond':
        return (
          <div
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              transform: 'rotate(45deg)',
            }}
          />
        );
      case 'square':
        return (
          <div
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              border: '3px solid #1A1A1A',
            }}
          />
        );
      case 'ring':
        return (
          <div
            className="rounded-full"
            style={{
              width: size,
              height: size,
              border: `3px solid ${color}`,
              backgroundColor: 'transparent',
            }}
          />
        );
      case 'star':
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        );
      case 'photo':
        return (
          <div
            className="rounded-lg overflow-hidden"
            style={{
              width: size,
              height: size,
              border: '3px solid #1A1A1A',
              boxShadow: '4px 4px 0px #1A1A1A',
            }}
          >
            {imageUrl && (
              <img
                src={imageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: position.top,
        left: position.left,
        ...layerStyles[layer],
        animation: `float ${duration}s ease-in-out ${delay}s infinite`,
      }}
    >
      {renderShape()}
    </div>
  );
};

// ============================================
// MARQUEE COMPONENT - Static text, no hover effects
// ============================================
const Marquee: React.FC = () => {
  const services = [
    'Website Builds',
    'Content Strategy',
    'SEO',
    'Social Media Strategy',
    'Launch Sprints',
    'Site Rebuilds',
    'Brand Design',
  ];

  // 2x duplication for seamless loop
  const marqueeContent = [...services, ...services];

  return (
    <div className="w-full overflow-hidden border-t-2 border-b-2 border-[#1A1A1A] bg-[#FFF8E7] py-4">
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: 'marquee 25s linear infinite',
        }}
      >
        {marqueeContent.map((service, index) => (
          <span
            key={index}
            className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black mx-4 sm:mx-8 text-[#1A1A1A] cursor-default"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {service}
            <span className="mx-4 sm:mx-8 text-[#dc2626]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// ============================================
// SQUARE SNAKE CURSOR - Just trail, no floating circle
// ============================================
const TRAIL_LENGTH = 8;
const TRAIL_SPACING = 6;

const SnakeCursor: React.FC = () => {
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const positionHistory = useRef<Array<{ x: number; y: number }>>([]);
  const [trailState, setTrailState] = useState<Array<{ x: number; y: number }>>(
    Array(TRAIL_LENGTH).fill({ x: 0, y: 0 })
  );
  const [isVisible, setIsVisible] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const animationRef = useRef<number | null>(null);
  const darkCheckRef = useRef<number>(0);

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  const checkIfOnDark = useCallback((x: number, y: number) => {
    const el = document.elementFromPoint(x, y);
    if (!el) return false;
    let current: Element | null = el;
    while (current && current !== document.body) {
      const bg = getComputedStyle(current).backgroundColor;
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        const match = bg.match(/\d+/g);
        if (match) {
          const [r, g, b] = match.map(Number);
          return (r * 0.299 + g * 0.587 + b * 0.114) < 80;
        }
      }
      current = current.parentElement;
    }
    return false;
  }, []);

  const animate = useCallback(() => {
    cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, 0.1);
    cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, 0.1);

    positionHistory.current.unshift({ ...cursorPos.current });

    if (positionHistory.current.length > TRAIL_LENGTH * TRAIL_SPACING + 10) {
      positionHistory.current.pop();
    }

    // Check background color every 6 frames (~100ms at 60fps)
    darkCheckRef.current++;
    if (darkCheckRef.current % 6 === 0) {
      setOnDark(checkIfOnDark(mousePos.current.x, mousePos.current.y));
    }

    const newTrailState = Array(TRAIL_LENGTH).fill(null).map((_, i) => {
      const historyIndex = (i + 1) * TRAIL_SPACING;
      if (positionHistory.current[historyIndex]) {
        return positionHistory.current[historyIndex];
      }
      return positionHistory.current[positionHistory.current.length - 1] || { x: 0, y: 0 };
    });

    setTrailState(newTrailState);
    animationRef.current = requestAnimationFrame(animate);
  }, [checkIfOnDark]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, isVisible]);

  if (!isVisible) return null;

  const cursorColor = onDark ? '#FAF9F6' : '#1A1A1A';

  return (
    <>
      {/* Snake trail - just squares, no floating circle */}
      {trailState.map((pos, i) => {
        const size = 16;
        const opacity = 1 - (i * 0.07);

        return (
          <div
            key={i}
            className="fixed top-0 left-0 pointer-events-none"
            style={{
              zIndex: 9999 - i,
              transform: `translate(${pos.x}px, ${pos.y}px)`,
              marginLeft: -(size / 2),
              marginTop: -(size / 2),
            }}
          >
            <div
              style={{
                width: size,
                height: size,
                opacity: Math.max(opacity, 0.2),
                backgroundColor: cursorColor,
                transition: 'background-color 0.2s ease',
              }}
            />
          </div>
        );
      })}
    </>
  );
};

// ============================================
// BOUNCING LETTER COMPONENT
// ============================================
interface BouncingLetterProps {
  letter: string;
  delay: number;
  isSpecial?: boolean;
}

const BouncingLetter: React.FC<BouncingLetterProps> = ({ letter, delay, isSpecial }) => {
  return (
    <span
      className={`inline-block transition-all duration-300 hover:-translate-y-3 hover:rotate-12 ${
        isSpecial ? 'text-[#dc2626] mx-2 hover:rotate-180' : 'hover:text-[#dc2626]'
      }`}
      style={{
        animation: `bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${delay}s both`,
      }}
    >
      {letter}
    </span>
  );
};

// ============================================
// MAIN HERO COMPONENT
// ============================================
const HeroNeobrutalist: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Configuration for floating elements with RED COLORS
  const floatingElements: FloatingElementProps[] = [
    { shape: 'circle', color: '#dc2626', size: 120, position: { top: '10%', left: '5%' }, delay: 0, duration: 6, layer: 1 },
    { shape: 'diamond', color: '#ef4444', size: 80, position: { top: '60%', left: '85%' }, delay: 1, duration: 7, layer: 1 },
    { shape: 'ring', color: '#b91c1c', size: 150, position: { top: '70%', left: '10%' }, delay: 0.5, duration: 8, layer: 1 },
    { shape: 'square', color: '#fecaca', size: 60, position: { top: '20%', left: '80%' }, delay: 0.3, duration: 5, layer: 2 },
    { shape: 'star', color: '#dc2626', size: 40, position: { top: '75%', left: '70%' }, delay: 0.8, duration: 4, layer: 2 },
    { shape: 'circle', color: '#f87171', size: 30, position: { top: '30%', left: '15%' }, delay: 1.2, duration: 5, layer: 2 },
    { shape: 'diamond', color: '#1A1A1A', size: 20, position: { top: '15%', left: '70%' }, delay: 0.2, duration: 3, layer: 3 },
    { shape: 'circle', color: '#ef4444', size: 15, position: { top: '50%', left: '90%' }, delay: 0.6, duration: 4, layer: 3 },
    { shape: 'star', color: '#dc2626', size: 25, position: { top: '80%', left: '25%' }, delay: 1, duration: 3.5, layer: 3 },
    { shape: 'ring', color: '#f87171', size: 60, position: { top: '25%', left: '75%' }, delay: 0.4, duration: 6, layer: 2 },
    { shape: 'square', color: '#b91c1c', size: 40, position: { top: '55%', left: '8%' }, delay: 0.9, duration: 5, layer: 2 },
  ];

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(3deg);
          }
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: translateY(-100px) scale(0.3);
          }
          50% {
            transform: translateY(20px) scale(1.05);
          }
          70% {
            transform: translateY(-10px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .grid-background {
          background-image:
            linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        /* Hide default cursor when custom cursor is active */
        body {
          cursor: none;
        }

        a, button, [role="button"], input, textarea, select, .cursor-pointer {
          cursor: none;
        }
      `}</style>

      {/* Square Snake Cursor */}
      <SnakeCursor />

      <section ref={heroRef} className="relative min-h-[100dvh] w-full flex flex-col bg-[#FFF8E7] overflow-hidden">
        {/* GRID BACKGROUND */}
        <div className="absolute inset-0 grid-background pointer-events-none" />

        {/* FLOATING ELEMENTS LAYER */}
        <div className="absolute inset-0 pointer-events-none">
          {floatingElements.map((element, index) => (
            <FloatingElement key={index} {...element} />
          ))}
        </div>

        {/* HEADLINE SECTION */}
        <div className="relative z-20 flex-1 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 pt-20 sm:pt-24 md:pt-28 pb-4 sm:pb-8">
          <div
            className={`max-w-4xl ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Business Headline */}
            <h1
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-[#1A1A1A] tracking-tight cursor-default leading-[0.95] mb-4 sm:mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <span className="block">
                {'We build the'.split('').map((letter, index) => (
                  <BouncingLetter
                    key={`line1-${index}`}
                    letter={letter === ' ' ? '\u00A0' : letter}
                    delay={0.3 + index * 0.02}
                  />
                ))}
              </span>
              <span className="block">
                {'digital presence'.split('').map((letter, index) => (
                  <BouncingLetter
                    key={`line2-${index}`}
                    letter={letter === ' ' ? '\u00A0' : letter}
                    delay={0.7 + index * 0.02}
                  />
                ))}
              </span>
              <span className="block text-[#dc2626]">
                {'your business deserves.'.split('').map((letter, index) => (
                  <BouncingLetter
                    key={`line3-${index}`}
                    letter={letter === ' ' ? '\u00A0' : letter}
                    delay={1.0 + index * 0.02}
                  />
                ))}
              </span>
            </h1>

            {/* Subtext */}
            <p
              className={`text-sm sm:text-base md:text-lg lg:text-xl text-[#1A1A1A]/70 max-w-2xl mb-6 sm:mb-10 transition-all duration-700 ${
                isVisible ? 'opacity-100 animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '1.5s' }}
            >
              <strong className="text-[#1A1A1A]">No templates. No bloat.</strong> We partner with business owners to build websites,
              apps, and digital strategies that win trust and turn visitors into loyal customers. Just your brand, built hand-in-hand.
            </p>

            {/* Two CTAs */}
            <div
              className={`flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4 mb-8 sm:mb-12 transition-all duration-700 ${
                isVisible ? 'opacity-100 animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '1.8s' }}
            >
              <a
                href="#get-started"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-[#dc2626] text-[#FAF9F6] text-base sm:text-lg md:text-xl font-bold tracking-wide border-2 border-[#1A1A1A] shadow-[6px_6px_0px_#1A1A1A] hover:shadow-[2px_2px_0px_#1A1A1A] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 w-full sm:w-auto justify-center"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}
              >
                Build Your Foundation
              </a>
              <a
                href="#diagnostic"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('diagnostic')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-[#1A1A1A] text-base sm:text-lg md:text-xl font-bold tracking-wide border-2 border-[#1A1A1A] shadow-[6px_6px_0px_#1A1A1A] hover:shadow-[2px_2px_0px_#1A1A1A] hover:translate-x-1 hover:translate-y-1 hover:bg-[#1A1A1A] hover:text-[#FAF9F6] transition-all duration-200 w-full sm:w-auto justify-center"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}
              >
                Get a Free Site Diagnostic
              </a>
            </div>

            {/* Stats Strip */}
            <div
              className={`flex flex-wrap items-center gap-4 sm:gap-6 md:gap-10 transition-all duration-700 ${
                isVisible ? 'opacity-100 animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '2.1s' }}
            >
              {[
                'Data Over Guesswork',
                'Zero-Bloat Performance',
                'ROI Focused',
              ].map((label) => (
                <div key={label} className="flex items-center gap-2 text-[#1A1A1A]/80">
                  <span className="w-2 h-2 bg-[#dc2626]" />
                  <span className="text-sm md:text-base font-bold uppercase tracking-wider">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MARQUEE SECTION - Direct below name */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.7s' }}
        >
          <Marquee />
        </div>
      </section>
    </>
  );
};

export default HeroNeobrutalist;

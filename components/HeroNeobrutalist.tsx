/**
 * HeroNeobrutalist.tsx
 *
 * Premium motion design inspired by Lorenzo Dal Dosso:
 * - Square lerp-based snake cursor
 * - Rotating text hover effects (GSAP-style)
 * - Bouncing letter animation for name
 * - Floating elements in RED theme
 * - Scrolling marquee with hover effects
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
// ROTATING TEXT COMPONENT - GSAP Style
// ============================================
/**
 * Text that rotates/flips on hover like GSAP animations
 * Shows alternate text rotating in from above
 */
interface RotatingTextProps {
  text: string;
  alternateText?: string;
  className?: string;
}

const RotatingText: React.FC<RotatingTextProps> = ({ text, alternateText, className = '' }) => {
  return (
    <span className={`rotating-text-wrapper inline-block overflow-hidden ${className}`}>
      <span className="rotating-text-inner block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        <span className="block">{text}</span>
        <span className="block absolute top-full left-0">{alternateText || text}</span>
      </span>
    </span>
  );
};

// ============================================
// MARQUEE COMPONENT WITH ROTATING HOVER
// ============================================
const Marquee: React.FC = () => {
  const services = [
    { text: 'Product Design', alt: 'Design Products' },
    { text: 'Web Applications', alt: 'Build Apps' },
    { text: 'Data Visualization', alt: 'Visualize Data' },
    { text: 'Rapid Prototyping', alt: 'Prototype Fast' },
    { text: 'UI/UX Design', alt: 'Design Interfaces' },
    { text: 'No-Code → Code', alt: 'Ship Faster' },
    { text: 'Civic Tech', alt: 'Tech for Good' },
  ];

  // Only 2x duplication for seamless 50% loop
  const marqueeContent = [...services, ...services];

  return (
    <div className="w-full overflow-hidden border-b-2 border-[#1A1A1A] bg-[#FFF8E7] py-4">
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: 'marquee 20s linear infinite',
        }}
      >
        {marqueeContent.map((service, index) => (
          <span
            key={index}
            className="group text-4xl md:text-6xl lg:text-7xl font-black mx-8 text-[#1A1A1A] cursor-default"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <RotatingText text={service.text} alternateText={service.alt} />
            <span className="mx-8 text-[#dc2626] transition-transform duration-300 group-hover:rotate-180 inline-block">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// ============================================
// PROGRESS SECTION - Full-width bordered band
// ============================================
const ProgressSection: React.FC = () => {
  return (
    <div className="w-full border-t-2 border-b-2 border-[#1A1A1A] bg-[#FFF8E7] py-12 md:py-16 lg:py-20">
      <div className="relative w-full px-6 md:px-12 lg:px-16">
        {/* 01 on far left */}
        <span
          className="absolute left-4 md:left-8 lg:left-12 top-1/2 -translate-y-1/2 text-6xl md:text-8xl lg:text-[10rem] font-black text-[#1A1A1A] leading-none"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          01
        </span>

        {/* 04 on far right */}
        <span
          className="absolute right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 text-6xl md:text-8xl lg:text-[10rem] font-black text-[#1A1A1A] leading-none"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          04
        </span>

        {/* Center content */}
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          {/* Description text above progress bar */}
          <p className="text-sm md:text-base text-[#1A1A1A] text-center mb-6">
            Hello. I'm a Product Designer. I solve Problems. Yes I'm a Builder.
          </p>

          {/* Progress bar */}
          <div className="w-full max-w-xl flex items-center mb-4">
            <div className="h-2 bg-[#1A1A1A] w-1/3" />
            <div className="h-2 bg-[#E5E5E5] flex-1" />
          </div>

          {/* Scroll To Discover - spread across */}
          <div className="w-full max-w-xl flex justify-between text-xs md:text-sm tracking-[0.15em] uppercase text-[#6B7280]">
            <span>Scroll</span>
            <span>To</span>
            <span>Discover</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// SQUARE SNAKE CURSOR - True Snake Game Trail
// ============================================
/**
 * Square cursor with true snake-game trailing effect
 * Multiple squares follow each other with decreasing size/opacity
 */
const TRAIL_LENGTH = 8; // Number of trailing squares

const SnakeCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  // Trail history - stores positions for each trailing segment
  const trailPositions = useRef<Array<{ x: number; y: number }>>(
    Array(TRAIL_LENGTH).fill({ x: 0, y: 0 })
  );
  const [trailState, setTrailState] = useState<Array<{ x: number; y: number }>>(
    Array(TRAIL_LENGTH).fill({ x: 0, y: 0 })
  );
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const animationRef = useRef<number | null>(null);

  // Linear interpolation function
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  const animate = useCallback(() => {
    // Cursor follows mouse with faster lerp
    cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, 0.25);
    cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, 0.25);

    // Each trail segment follows the one before it with decreasing lerp factor
    const newTrailPositions = trailPositions.current.map((pos, i) => {
      const target = i === 0 ? cursorPos.current : trailPositions.current[i - 1];
      const lerpFactor = 0.15 - (i * 0.01); // Decreasing follow speed for later segments
      return {
        x: lerp(pos.x, target.x, Math.max(lerpFactor, 0.05)),
        y: lerp(pos.y, target.y, Math.max(lerpFactor, 0.05)),
      };
    });
    trailPositions.current = newTrailPositions;

    // Update cursor position
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`;
    }

    // Update trail state for React render
    setTrailState([...newTrailPositions]);

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Detect hovering over interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', handleElementHover);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    // Start animation loop
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleElementHover);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Trailing snake segments - rendered first so they appear behind */}
      {trailState.map((pos, i) => {
        const size = 36 - (i * 3); // Decreasing size: 36, 33, 30, 27...
        const opacity = 0.8 - (i * 0.08); // Decreasing opacity
        const rotation = isHovering ? 45 : (i * 2); // Slight rotation offset

        return (
          <div
            key={i}
            className="fixed top-0 left-0 pointer-events-none mix-blend-difference"
            style={{
              zIndex: 9990 - i,
              transform: `translate(${pos.x}px, ${pos.y}px)`,
              marginLeft: -(size / 2),
              marginTop: -(size / 2),
            }}
          >
            <div
              className={`border-2 border-white transition-colors duration-300 ${
                isHovering ? 'bg-[#dc2626]/20' : 'bg-transparent'
              }`}
              style={{
                width: size,
                height: size,
                opacity: opacity,
                transform: `rotate(${rotation}deg)`,
              }}
            />
          </div>
        );
      })}

      {/* Main cursor - small square at front */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          marginLeft: -5,
          marginTop: -5,
        }}
      >
        <div
          className={`bg-white transition-transform duration-200 ${
            isHovering ? 'scale-150 rotate-45' : 'scale-100 rotate-0'
          }`}
          style={{
            width: 10,
            height: 10,
          }}
        />
      </div>
    </>
  );
};

// ============================================
// BOUNCING LETTER COMPONENT WITH ROTATE HOVER
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
    // Back layer elements (large, faded) - deep reds and crimsons
    { shape: 'circle', color: '#dc2626', size: 120, position: { top: '10%', left: '5%' }, delay: 0, duration: 6, layer: 1 },
    { shape: 'diamond', color: '#ef4444', size: 80, position: { top: '60%', left: '85%' }, delay: 1, duration: 7, layer: 1 },
    { shape: 'ring', color: '#b91c1c', size: 150, position: { top: '70%', left: '10%' }, delay: 0.5, duration: 8, layer: 1 },

    // Middle layer elements - various reds
    { shape: 'square', color: '#fecaca', size: 60, position: { top: '20%', left: '80%' }, delay: 0.3, duration: 5, layer: 2 },
    { shape: 'star', color: '#dc2626', size: 40, position: { top: '75%', left: '70%' }, delay: 0.8, duration: 4, layer: 2 },
    { shape: 'circle', color: '#f87171', size: 30, position: { top: '30%', left: '15%' }, delay: 1.2, duration: 5, layer: 2 },

    // Front layer elements (small, sharp) - bright red accents
    { shape: 'diamond', color: '#1A1A1A', size: 20, position: { top: '15%', left: '70%' }, delay: 0.2, duration: 3, layer: 3 },
    { shape: 'circle', color: '#ef4444', size: 15, position: { top: '50%', left: '90%' }, delay: 0.6, duration: 4, layer: 3 },
    { shape: 'star', color: '#dc2626', size: 25, position: { top: '80%', left: '25%' }, delay: 1, duration: 3.5, layer: 3 },

    // Additional decorative elements - red palette
    { shape: 'ring', color: '#f87171', size: 60, position: { top: '25%', left: '75%' }, delay: 0.4, duration: 6, layer: 2 },
    { shape: 'square', color: '#b91c1c', size: 40, position: { top: '55%', left: '8%' }, delay: 0.9, duration: 5, layer: 2 },
  ];

  // Name letters for bouncing animation
  const firstName = 'BILLY';
  const lastName = 'NDIZEYE';

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

        /* Rotating text styles */
        .rotating-text-wrapper {
          perspective: 1000px;
        }

        .rotating-text-inner {
          transform-style: preserve-3d;
        }

        .group:hover .rotating-text-inner {
          transform: translateY(-100%) rotateX(90deg);
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

      <section ref={heroRef} className="relative min-h-screen w-full flex flex-col bg-[#FFF8E7] overflow-hidden">
        {/* GRID BACKGROUND */}
        <div className="absolute inset-0 grid-background pointer-events-none" />

        {/* FLOATING ELEMENTS LAYER */}
        <div className="absolute inset-0 pointer-events-none">
          {floatingElements.map((element, index) => (
            <FloatingElement key={index} {...element} />
          ))}
        </div>

        {/* NAME SECTION - Upper area */}
        <div className="relative z-20 flex-1 flex flex-col justify-center items-center px-4 sm:px-6 pt-16 md:pt-20 pb-8">
          {/* YOUR NAME - Bouncing Letters Animation with Rotate Hover */}
          <div
            className={`text-center ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[11rem] xl:text-[13rem] font-black text-[#1A1A1A] tracking-tight cursor-default leading-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <span className="block">
                {/* First name letters */}
                {firstName.split('').map((letter, index) => (
                  <BouncingLetter
                    key={`first-${index}`}
                    letter={letter}
                    delay={0.3 + index * 0.05}
                  />
                ))}
                {/* Diamond separator */}
                <BouncingLetter
                  letter="◆"
                  delay={0.3 + firstName.length * 0.05}
                  isSpecial
                />
                {/* Last name letters */}
                {lastName.split('').map((letter, index) => (
                  <BouncingLetter
                    key={`last-${index}`}
                    letter={letter}
                    delay={0.3 + (firstName.length + 1) * 0.05 + index * 0.05}
                  />
                ))}
              </span>
            </h1>
          </div>
        </div>

        {/* PROGRESS SECTION - Full-width bordered band */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.7s' }}
        >
          <ProgressSection />
        </div>

        {/* MARQUEE SECTION */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ animationDelay: '1.1s' }}
        >
          <Marquee />
        </div>
      </section>
    </>
  );
};

export default HeroNeobrutalist;

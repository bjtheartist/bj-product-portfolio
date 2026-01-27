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
    'Product Design',
    'Web Applications',
    'Data Visualization',
    'Rapid Prototyping',
    'UI/UX Design',
    'Mobile Apps',
    'Civic Tech',
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
            className="text-4xl md:text-6xl lg:text-7xl font-black mx-8 text-[#1A1A1A] cursor-default"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {service}
            <span className="mx-8 text-[#dc2626]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// ============================================
// SQUARE SNAKE CURSOR - Just trail, no floating circle
// ============================================
const TRAIL_LENGTH = 12;
const TRAIL_SPACING = 4;

const SnakeCursor: React.FC = () => {
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const positionHistory = useRef<Array<{ x: number; y: number }>>([]);
  const [trailState, setTrailState] = useState<Array<{ x: number; y: number }>>(
    Array(TRAIL_LENGTH).fill({ x: 0, y: 0 })
  );
  const [isVisible, setIsVisible] = useState(false);
  const animationRef = useRef<number | null>(null);

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  const animate = useCallback(() => {
    cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, 0.2);
    cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, 0.2);

    positionHistory.current.unshift({ ...cursorPos.current });
    
    if (positionHistory.current.length > TRAIL_LENGTH * TRAIL_SPACING + 10) {
      positionHistory.current.pop();
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
  }, []);

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

  return (
    <>
      {/* Snake trail - just squares, no floating circle */}
      {trailState.map((pos, i) => {
        const size = 10;
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
              className="bg-[#1A1A1A]"
              style={{
                width: size,
                height: size,
                opacity: Math.max(opacity, 0.2),
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
                {firstName.split('').map((letter, index) => (
                  <BouncingLetter
                    key={`first-${index}`}
                    letter={letter}
                    delay={0.3 + index * 0.05}
                  />
                ))}
                <BouncingLetter
                  letter="◆"
                  delay={0.3 + firstName.length * 0.05}
                  isSpecial
                />
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

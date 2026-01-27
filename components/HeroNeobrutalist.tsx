/**
 * HeroNeobrutalist.tsx
 *
 * Premium motion design inspired by Lorenzo Dal Dosso:
 * - Square lerp-based snake cursor with proper trailing
 * - Scroll-based carousel (01→04) for services
 * - Bouncing letter animation for name
 * - Floating elements in RED theme
 * - Red diamond in header for consistency
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
    <div className="w-full overflow-hidden border-b-2 border-[#1A1A1A] bg-[#FFF8E7] py-4">
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
// SCROLL-BASED PROGRESS SECTION
// 01 → 04 toggles between services on scroll
// ============================================
const ProgressSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const services = [
    { num: '01', label: 'Data Visualization' },
    { num: '02', label: 'Rapid Prototyping' },
    { num: '03', label: 'UI/UX Design' },
    { num: '04', label: 'Web & Mobile Apps' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress through the section
      // When section enters viewport from bottom to when it leaves from top
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      
      // Progress from 0 to 1 as section scrolls through viewport
      const progress = Math.max(0, Math.min(1, 
        (viewportHeight - sectionTop) / (viewportHeight + sectionHeight)
      ));
      
      // Map progress to index (0-3)
      const newIndex = Math.min(3, Math.floor(progress * 4));
      setCurrentIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="w-full border-t-2 border-b-2 border-[#1A1A1A] bg-[#FFF8E7] py-12 md:py-16 lg:py-20"
    >
      <div className="relative w-full px-6 md:px-12 lg:px-16">
        {/* Current number on far left */}
        <span
          className="absolute left-4 md:left-8 lg:left-12 top-1/2 -translate-y-1/2 text-6xl md:text-8xl lg:text-[10rem] font-black text-[#1A1A1A] leading-none transition-all duration-500"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {services[currentIndex].num}
        </span>

        {/* Total on far right */}
        <span
          className="absolute right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 text-6xl md:text-8xl lg:text-[10rem] font-black text-[#1A1A1A]/20 leading-none"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          04
        </span>

        {/* Center content */}
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          {/* Current service label */}
          <p 
            className="text-lg md:text-xl lg:text-2xl font-bold text-[#1A1A1A] text-center mb-6 transition-all duration-300"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {services[currentIndex].label}
          </p>

          {/* Progress bar */}
          <div className="w-full max-w-xl flex items-center mb-4 gap-1">
            {services.map((_, i) => (
              <div 
                key={i}
                className={`h-2 flex-1 transition-all duration-300 ${
                  i <= currentIndex ? 'bg-[#1A1A1A]' : 'bg-[#E5E5E5]'
                }`}
              />
            ))}
          </div>

          {/* Scroll indicator */}
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
// SQUARE SNAKE CURSOR - Proper Snake Trail
// ============================================
const TRAIL_LENGTH = 12; // Number of trailing squares
const TRAIL_SPACING = 4; // Frames between each segment position update

const SnakeCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  // Store position history for true snake-like following
  const positionHistory = useRef<Array<{ x: number; y: number }>>([]);
  const [trailState, setTrailState] = useState<Array<{ x: number; y: number }>>(
    Array(TRAIL_LENGTH).fill({ x: 0, y: 0 })
  );
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const animationRef = useRef<number | null>(null);
  const frameCount = useRef(0);

  // Linear interpolation function
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  const animate = useCallback(() => {
    frameCount.current++;
    
    // Cursor follows mouse with lerp
    cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, 0.2);
    cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, 0.2);

    // Add current position to history
    positionHistory.current.unshift({ ...cursorPos.current });
    
    // Keep history limited
    if (positionHistory.current.length > TRAIL_LENGTH * TRAIL_SPACING + 10) {
      positionHistory.current.pop();
    }

    // Update cursor position
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`;
    }

    // Update trail positions from history - each segment follows a previous position
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
        const size = 12; // Fixed size for all segments like snake game
        const opacity = 1 - (i * 0.06); // Slight fade

        return (
          <div
            key={i}
            className="fixed top-0 left-0 pointer-events-none"
            style={{
              zIndex: 9990 - i,
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
                opacity: Math.max(opacity, 0.3),
              }}
            />
          </div>
        );
      })}

      {/* Main cursor - small square at front */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          marginLeft: -6,
          marginTop: -6,
        }}
      >
        <div
          className={`bg-[#1A1A1A] transition-transform duration-200 ${
            isHovering ? 'scale-150 rotate-45' : 'scale-100 rotate-0'
          }`}
          style={{
            width: 12,
            height: 12,
          }}
        />
      </div>
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
                {/* Diamond separator - RED */}
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

        {/* PROGRESS SECTION - Scroll-based carousel */}
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

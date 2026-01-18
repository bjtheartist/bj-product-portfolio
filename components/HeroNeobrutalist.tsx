/**
 * HeroNeobrutalist.tsx
 * 
 * WHAT THIS FILE DOES:
 * This is the new hero section (the first thing visitors see) for your website.
 * It creates the Lorenzo-inspired neobrutalist design with:
 * - Your name displayed boldly
 * - Floating/bouncing decorative elements
 * - A scrolling marquee of your services
 * - Layered depth effect
 * 
 * REACT CONCEPT - "Components":
 * Think of this file as a recipe for one part of your website.
 * Just like a recipe tells you how to make a cake, this "component"
 * tells the browser how to display your hero section.
 * You can reuse components anywhere, like using the same recipe multiple times.
 */

import React, { useEffect, useState } from 'react';

// ============================================
// FLOATING ELEMENT COMPONENT
// ============================================
/**
 * WHAT THIS DOES:
 * Creates a single floating shape that bounces gently.
 * 
 * PROPS (inputs):
 * - shape: What shape to show (circle, diamond, square, ring)
 * - color: The color of the shape
 * - size: How big (in pixels)
 * - position: Where on screen (top, left as percentages)
 * - delay: When to start the animation (creates variety)
 * - duration: How long one bounce cycle takes
 * - layer: Which depth layer (1=back, 2=middle, 3=front)
 */
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
  // Calculate opacity and blur based on layer (creates depth)
  // Back layer = more transparent and blurry
  // Front layer = sharp and solid
  const layerStyles = {
    1: { opacity: 0.3, filter: 'blur(1px)', zIndex: 1 },
    2: { opacity: 0.6, filter: 'blur(0px)', zIndex: 5 },
    3: { opacity: 0.9, filter: 'blur(0px)', zIndex: 10 },
  };

  // Render different shapes
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
        // This is the "bounce" animation
        animation: `float ${duration}s ease-in-out ${delay}s infinite`,
      }}
    >
      {renderShape()}
    </div>
  );
};

// ============================================
// MARQUEE COMPONENT
// ============================================
/**
 * WHAT THIS DOES:
 * Creates the scrolling text band at the bottom showing your services.
 * The text continuously scrolls from right to left, creating an
 * infinite loop effect (like a news ticker).
 */
const Marquee: React.FC = () => {
  // Your services/specialties to display
  const services = [
    'Portraits',
    'Sports',
    'Maternity',
    'Events',
    'Weddings',
    'Creative Direction',
    'Visual Storytelling',
  ];

  // We duplicate the list to create seamless looping
  const marqueeContent = [...services, ...services, ...services];

  return (
    <div className="w-full overflow-hidden border-t-2 border-b-2 border-[#1A1A1A] bg-[#FAF9F6] py-4">
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: 'marquee 20s linear infinite',
        }}
      >
        {marqueeContent.map((service, index) => (
          <span
            key={index}
            className="text-4xl md:text-6xl lg:text-7xl font-black mx-8 text-[#1A1A1A]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {service}
            <span className="mx-8 text-[#3b82f6]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// ============================================
// PROGRESS INDICATOR COMPONENT
// ============================================
/**
 * WHAT THIS DOES:
 * Shows the "01 ——— 04" style progress bar like Lorenzo's site.
 * It indicates how many sections are on the page and where you are.
 */
const ProgressIndicator: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-4 md:gap-8">
      <span className="text-4xl md:text-6xl font-black text-[#1A1A1A]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        01
      </span>
      <div className="flex items-center w-32 md:w-64 lg:w-96">
        <div className="h-1 bg-[#1A1A1A] w-1/4" />
        <div className="h-1 bg-[#E5E5E5] flex-1" />
      </div>
      <span className="text-4xl md:text-6xl font-black text-[#1A1A1A]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        04
      </span>
    </div>
  );
};

// ============================================
// MAIN HERO COMPONENT
// ============================================
/**
 * WHAT THIS DOES:
 * This is the main hero section that combines everything:
 * - The floating elements in the background
 * - Your name prominently displayed
 * - The tagline
 * - The progress indicator
 * - The scrolling marquee
 * 
 * REACT CONCEPT - "State":
 * useState lets us remember things that can change.
 * Here, we track if the page has loaded so we can
 * trigger entrance animations.
 */
const HeroNeobrutalist: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // This runs once when the component first appears
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Configuration for floating elements
  // Each object defines one floating shape
  const floatingElements: FloatingElementProps[] = [
    // Back layer elements (large, faded)
    { shape: 'circle', color: '#3b82f6', size: 120, position: { top: '10%', left: '5%' }, delay: 0, duration: 6, layer: 1 },
    { shape: 'diamond', color: '#22d3ee', size: 80, position: { top: '60%', left: '85%' }, delay: 1, duration: 7, layer: 1 },
    { shape: 'ring', color: '#3b82f6', size: 150, position: { top: '70%', left: '10%' }, delay: 0.5, duration: 8, layer: 1 },
    
    // Middle layer elements
    { shape: 'square', color: '#FAF9F6', size: 60, position: { top: '20%', left: '80%' }, delay: 0.3, duration: 5, layer: 2 },
    { shape: 'star', color: '#3b82f6', size: 40, position: { top: '75%', left: '70%' }, delay: 0.8, duration: 4, layer: 2 },
    { shape: 'circle', color: '#22d3ee', size: 30, position: { top: '30%', left: '15%' }, delay: 1.2, duration: 5, layer: 2 },
    
    // Front layer elements (small, sharp)
    { shape: 'diamond', color: '#1A1A1A', size: 20, position: { top: '15%', left: '70%' }, delay: 0.2, duration: 3, layer: 3 },
    { shape: 'circle', color: '#3b82f6', size: 15, position: { top: '50%', left: '90%' }, delay: 0.6, duration: 4, layer: 3 },
    { shape: 'star', color: '#22d3ee', size: 25, position: { top: '80%', left: '25%' }, delay: 1, duration: 3.5, layer: 3 },
    
    // Photo elements (your work samples)
    { shape: 'photo', color: '', size: 100, position: { top: '25%', left: '75%' }, delay: 0.4, duration: 6, layer: 2, imageUrl: '/gallery/portrait-1.jpg' },
    { shape: 'photo', color: '', size: 80, position: { top: '55%', left: '8%' }, delay: 0.9, duration: 5, layer: 2, imageUrl: '/gallery/sports-1.jpg' },
  ];

  return (
    <>
      {/* 
        CSS KEYFRAMES
        These define the animations. Think of keyframes as choreography:
        "At 0% of the dance, be here. At 50%, be there. At 100%, be back."
      */}
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
            transform: translateX(-33.33%);
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
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>

      <section className="relative min-h-screen w-full flex flex-col bg-[#FAF9F6] overflow-hidden">
        {/* FLOATING ELEMENTS LAYER */}
        <div className="absolute inset-0 pointer-events-none">
          {floatingElements.map((element, index) => (
            <FloatingElement key={index} {...element} />
          ))}
        </div>

        {/* MAIN CONTENT */}
        <div className="relative z-20 flex-1 flex flex-col justify-center items-center px-4 sm:px-6 pt-24 pb-8">
          {/* Small intro text */}
          <div
            className={`mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 animate-fade-in-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.1s' }}
          >
            <span className="text-sm md:text-base tracking-[0.3em] uppercase text-[#6B7280]">
              Photographer & Creative Director
            </span>
          </div>

          {/* YOUR NAME - The main focal point */}
          <div
            className={`text-center mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 animate-fade-in-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.3s' }}
          >
            {/* 
              TYPOGRAPHY TRICK:
              We use a custom font and make the "O" letters into diamonds
              to create that Lorenzo-style branding
            */}
            <h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#1A1A1A] tracking-tight"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {/* First name with diamond O */}
              <span className="block">
                TEMS
                <span className="inline-block mx-1 text-[#3b82f6]">◆</span>
                VISI
                <span className="inline-block mx-1 text-[#3b82f6]">◆</span>
                N
              </span>
            </h1>
          </div>

          {/* Tagline */}
          <div
            className={`mb-12 transition-all duration-700 ${
              isVisible ? 'opacity-100 animate-fade-in-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.5s' }}
          >
            <p className="text-lg md:text-xl text-[#6B7280] max-w-md text-center">
              My Vision, Your Story. Capturing moments that matter in Kalamazoo, Michigan.
            </p>
          </div>

          {/* Progress Indicator */}
          <div
            className={`mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 animate-fade-in-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.7s' }}
          >
            <ProgressIndicator />
          </div>

          {/* Scroll indicator */}
          <div
            className={`flex flex-col items-center gap-2 transition-all duration-700 ${
              isVisible ? 'opacity-100 animate-fade-in-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.9s' }}
          >
            <span className="text-xs tracking-[0.2em] uppercase text-[#6B7280]">
              Scroll to Discover
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-[#1A1A1A] to-transparent" />
          </div>
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

/**
 * FloatingShapes.tsx
 *
 * Reusable floating shapes component for visual consistency throughout the page.
 * Extracted from HeroNeobrutalist.tsx to be used in any section.
 *
 * Variants:
 * - hero: Dense, many shapes (original Hero style)
 * - sparse: 3-5 subtle shapes for other sections
 * - dense: More shapes but smaller
 *
 * Colors:
 * - red: Primary red palette (#dc2626, #ef4444, #fecaca)
 * - charcoal: Dark palette (#1A1A1A with opacity variations)
 * - mixed: Combination of red and charcoal
 *
 * Parallax: If enabled, shapes move at different speeds on scroll (requires GSAP)
 */

import React, { useEffect, useRef, useState } from 'react';

// ============================================
// DESIGN TOKENS
// ============================================
const COLORS = {
  red: '#dc2626',
  lightRed: '#ef4444',
  darkRed: '#b91c1c',
  pink: '#fecaca',
  coral: '#f87171',
  charcoal: '#1A1A1A',
} as const;

// ============================================
// TYPES
// ============================================
type ShapeType = 'circle' | 'diamond' | 'square' | 'ring';
type LayerType = 1 | 2 | 3;

interface ShapeConfig {
  shape: ShapeType;
  color: string;
  size: number;
  position: { top: string; left: string };
  delay: number;
  duration: number;
  layer: LayerType;
  parallaxSpeed?: number; // Multiplier for parallax effect (0.1 = slow, 1 = fast)
}

export interface FloatingShapesProps {
  variant?: 'hero' | 'sparse' | 'dense';
  colors?: 'red' | 'charcoal' | 'mixed';
  parallax?: boolean;
  className?: string;
}

// ============================================
// SHAPE CONFIGURATIONS BY VARIANT
// ============================================
const getColorPalette = (colorScheme: 'red' | 'charcoal' | 'mixed') => {
  switch (colorScheme) {
    case 'red':
      return [COLORS.red, COLORS.lightRed, COLORS.darkRed, COLORS.pink, COLORS.coral];
    case 'charcoal':
      return [COLORS.charcoal, COLORS.charcoal, COLORS.charcoal, COLORS.charcoal, COLORS.charcoal];
    case 'mixed':
    default:
      return [COLORS.red, COLORS.lightRed, COLORS.charcoal, COLORS.pink, COLORS.coral];
  }
};

const getShapesByVariant = (
  variant: 'hero' | 'sparse' | 'dense',
  colors: 'red' | 'charcoal' | 'mixed'
): ShapeConfig[] => {
  const palette = getColorPalette(colors);

  switch (variant) {
    case 'hero':
      return [
        // Back layer elements (large, faded)
        { shape: 'circle', color: palette[0], size: 120, position: { top: '10%', left: '5%' }, delay: 0, duration: 6, layer: 1, parallaxSpeed: 0.2 },
        { shape: 'diamond', color: palette[1], size: 80, position: { top: '60%', left: '85%' }, delay: 1, duration: 7, layer: 1, parallaxSpeed: 0.15 },
        { shape: 'ring', color: palette[2], size: 150, position: { top: '70%', left: '10%' }, delay: 0.5, duration: 8, layer: 1, parallaxSpeed: 0.1 },

        // Middle layer elements
        { shape: 'square', color: palette[3], size: 60, position: { top: '20%', left: '80%' }, delay: 0.3, duration: 5, layer: 2, parallaxSpeed: 0.4 },
        { shape: 'circle', color: palette[4], size: 30, position: { top: '30%', left: '15%' }, delay: 1.2, duration: 5, layer: 2, parallaxSpeed: 0.35 },

        // Front layer elements (small, sharp)
        { shape: 'diamond', color: COLORS.charcoal, size: 20, position: { top: '15%', left: '70%' }, delay: 0.2, duration: 3, layer: 3, parallaxSpeed: 0.6 },
        { shape: 'circle', color: palette[1], size: 15, position: { top: '50%', left: '90%' }, delay: 0.6, duration: 4, layer: 3, parallaxSpeed: 0.5 },

        // Additional decorative elements
        { shape: 'ring', color: palette[4], size: 60, position: { top: '25%', left: '75%' }, delay: 0.4, duration: 6, layer: 2, parallaxSpeed: 0.3 },
        { shape: 'square', color: palette[2], size: 40, position: { top: '55%', left: '8%' }, delay: 0.9, duration: 5, layer: 2, parallaxSpeed: 0.25 },
      ];

    case 'sparse':
      return [
        { shape: 'circle', color: palette[0], size: 40, position: { top: '15%', left: '85%' }, delay: 0, duration: 6, layer: 2, parallaxSpeed: 0.3 },
        { shape: 'diamond', color: palette[1], size: 25, position: { top: '70%', left: '10%' }, delay: 0.5, duration: 7, layer: 2, parallaxSpeed: 0.25 },
        { shape: 'ring', color: palette[2], size: 50, position: { top: '40%', left: '5%' }, delay: 1, duration: 8, layer: 1, parallaxSpeed: 0.15 },
        { shape: 'square', color: palette[3], size: 20, position: { top: '80%', left: '90%' }, delay: 0.3, duration: 5, layer: 3, parallaxSpeed: 0.4 },
      ];

    case 'dense':
      return [
        // Many smaller shapes
        { shape: 'circle', color: palette[0], size: 35, position: { top: '5%', left: '10%' }, delay: 0, duration: 4, layer: 2, parallaxSpeed: 0.3 },
        { shape: 'diamond', color: palette[1], size: 20, position: { top: '15%', left: '30%' }, delay: 0.2, duration: 5, layer: 3, parallaxSpeed: 0.5 },
        { shape: 'ring', color: palette[2], size: 40, position: { top: '10%', left: '60%' }, delay: 0.4, duration: 6, layer: 1, parallaxSpeed: 0.15 },
        { shape: 'square', color: palette[3], size: 25, position: { top: '25%', left: '85%' }, delay: 0.6, duration: 4.5, layer: 2, parallaxSpeed: 0.35 },
        { shape: 'circle', color: palette[4], size: 15, position: { top: '40%', left: '5%' }, delay: 0.8, duration: 3.5, layer: 3, parallaxSpeed: 0.55 },
        { shape: 'diamond', color: palette[0], size: 30, position: { top: '55%', left: '25%' }, delay: 1, duration: 5.5, layer: 2, parallaxSpeed: 0.4 },
        { shape: 'ring', color: palette[1], size: 25, position: { top: '65%', left: '70%' }, delay: 1.2, duration: 4, layer: 2, parallaxSpeed: 0.3 },
        { shape: 'square', color: palette[2], size: 18, position: { top: '75%', left: '45%' }, delay: 1.4, duration: 5, layer: 3, parallaxSpeed: 0.5 },
        { shape: 'circle', color: palette[3], size: 45, position: { top: '85%', left: '15%' }, delay: 0.3, duration: 6.5, layer: 1, parallaxSpeed: 0.2 },
        { shape: 'diamond', color: palette[4], size: 22, position: { top: '90%', left: '80%' }, delay: 0.5, duration: 4, layer: 2, parallaxSpeed: 0.35 },
      ];

    default:
      return [];
  }
};

// ============================================
// FLOATING SHAPE COMPONENT
// ============================================
interface FloatingShapeProps extends ShapeConfig {
  parallaxEnabled: boolean;
  scrollY: number;
}

const FloatingShape: React.FC<FloatingShapeProps> = ({
  shape,
  color,
  size,
  position,
  delay,
  duration,
  layer,
  parallaxSpeed = 0.3,
  parallaxEnabled,
  scrollY,
}) => {
  const layerStyles = {
    1: { opacity: 0.3, filter: 'blur(1px)', zIndex: 1 },
    2: { opacity: 0.6, filter: 'blur(0px)', zIndex: 5 },
    3: { opacity: 0.9, filter: 'blur(0px)', zIndex: 10 },
  };

  const parallaxOffset = parallaxEnabled ? scrollY * parallaxSpeed : 0;

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
              border: `3px solid ${COLORS.charcoal}`,
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
        animation: `floatingShapes-float ${duration}s ease-in-out ${delay}s infinite`,
        transform: parallaxEnabled ? `translateY(${parallaxOffset}px)` : undefined,
      }}
    >
      {renderShape()}
    </div>
  );
};

// ============================================
// MAIN FLOATING SHAPES COMPONENT
// ============================================
const FloatingShapes: React.FC<FloatingShapesProps> = ({
  variant = 'sparse',
  colors = 'mixed',
  parallax = false,
  className = '',
}) => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle scroll for parallax effect
  useEffect(() => {
    if (!parallax) return;

    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const elementTop = rect.top;
        const windowHeight = window.innerHeight;

        // Calculate scroll position relative to the element
        if (elementTop < windowHeight && rect.bottom > 0) {
          setScrollY(windowHeight - elementTop);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [parallax]);

  const shapes = getShapesByVariant(variant, colors);

  return (
    <>
      {/* Keyframes for float animation - scoped to avoid conflicts */}
      <style>{`
        @keyframes floatingShapes-float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(3deg);
          }
        }
      `}</style>

      <div
        ref={containerRef}
        className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      >
        {shapes.map((shape, index) => (
          <FloatingShape
            key={`floating-shape-${variant}-${index}`}
            {...shape}
            parallaxEnabled={parallax}
            scrollY={scrollY}
          />
        ))}
      </div>
    </>
  );
};

export default FloatingShapes;

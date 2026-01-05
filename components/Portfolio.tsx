import React, { useState, useCallback, memo } from 'react';
import { PROJECTS } from '../constants';
import { useTheme } from '../context/ThemeContext';

const Portfolio: React.FC = () => {
  const { isDark } = useTheme();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Photography categories matching Temsvision's portfolio
  const categories = [
    { id: 'PORTRAITS', title: 'Portrait Sessions', subtitle: 'Capturing personality & style' },
    { id: 'SPORTS', title: 'Sports Action', subtitle: 'Dynamic athletic moments' },
    { id: 'LOVE STORIES', title: 'Love Stories', subtitle: 'Engagement & couples' },
    { id: 'B & W', title: 'Black & White', subtitle: 'Timeless monochrome' },
  ];

  // Blue-themed gradients for each category
  const darkGradients = [
    'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1e40af 100%)',
    'linear-gradient(135deg, #0c1929 0%, #1e3a5f 50%, #0f172a 100%)',
    'linear-gradient(135deg, #1e1b4b 0%, #1e3a5f 50%, #172554 100%)',
    'linear-gradient(135deg, #0a0a0a 0%, #1e293b 50%, #0f172a 100%)',
  ];

  const lightGradients = [
    'linear-gradient(135deg, #dbeafe 0%, #93c5fd 50%, #3b82f6 100%)',
    'linear-gradient(135deg, #e0f2fe 0%, #7dd3fc 50%, #0ea5e9 100%)',
    'linear-gradient(135deg, #ede9fe 0%, #a5b4fc 50%, #6366f1 100%)',
    'linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 50%, #64748b 100%)',
  ];

  const handleMouseEnter = useCallback((id: string) => {
    setHoveredCategory(id);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCategory(null);
  }, []);

  return (
    <section id="portfolio" className={`relative py-16 sm:py-24 md:py-32 ${
      isDark ? 'bg-black' : 'bg-white'
    }`}>
      {/* Section Header */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-24 mb-12 sm:mb-16">
        <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <span className="text-blue-500 text-xs font-mono">01</span>
          <div className="w-8 sm:w-12 h-px bg-blue-500/50" />
        </div>
        <h2 
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black ${
            isDark ? 'text-white' : 'text-black'
          }`}
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Selected Work
        </h2>
        <p className={`text-sm mt-3 sm:mt-4 max-w-md ${
          isDark ? 'text-white/40' : 'text-black/40'
        }`}>
          A collection of moments captured through my lens. Each project tells a unique story.
        </p>
      </div>

      {/* Gallery Wall - O'Shane Howard Style Free-Floating Sections */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {categories.map((category, index) => {
            const isHovered = hoveredCategory === category.id;
            const gradients = isDark ? darkGradients : lightGradients;
            
            return (
              <div
                key={category.id}
                className={`group relative aspect-[4/3] overflow-hidden cursor-pointer transition-all duration-500 ease-out rounded-lg sm:rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                  isHovered ? 'scale-[1.02] z-10' : 'scale-100 z-0'
                } ${isDark ? 'focus-visible:ring-offset-black' : 'focus-visible:ring-offset-white'}`}
                onMouseEnter={() => handleMouseEnter(category.id)}
                onMouseLeave={handleMouseLeave}
                onFocus={() => handleMouseEnter(category.id)}
                onBlur={handleMouseLeave}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    // Future: navigate to gallery
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View ${category.title} gallery`}
              >
                {/* Background */}
                <div 
                  className={`absolute inset-0 transition-transform duration-700 ease-out ${
                    isHovered ? 'scale-110' : 'scale-100'
                  }`}
                  style={{ background: gradients[index] }}
                />
                
                {/* Placeholder pattern for images */}
                <div className="absolute inset-0 opacity-10">
                  <div 
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${isDark ? '%23ffffff' : '%23000000'}' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                </div>
                
                {/* Gradient overlay */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${
                  isDark 
                    ? `bg-gradient-to-t from-black via-black/60 to-transparent ${isHovered ? 'opacity-70' : 'opacity-80'}`
                    : `bg-gradient-to-t from-white via-white/60 to-transparent ${isHovered ? 'opacity-60' : 'opacity-70'}`
                }`} />

                {/* Large category number */}
                <div className="absolute top-3 left-4 sm:top-4 sm:left-6 md:top-6 md:left-8">
                  <span 
                    className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black transition-all duration-500 ${
                      isDark 
                        ? isHovered ? 'text-white/30' : 'text-white/10'
                        : isHovered ? 'text-black/20' : 'text-black/10'
                    }`}
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                  {/* Category label */}
                  <div className={`mb-1 sm:mb-2 transition-all duration-300 ${
                    isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-60'
                  }`}>
                    <span className="text-blue-400 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-medium">
                      {category.id}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 
                    className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black transition-all duration-300 ${
                      isDark ? 'text-white' : 'text-black'
                    } ${isHovered ? 'translate-y-0' : 'translate-y-1'}`}
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {category.title}
                  </h3>

                  {/* Subtitle */}
                  <p className={`text-xs sm:text-sm mt-1 sm:mt-2 transition-all duration-500 ${
                    isDark ? 'text-white/50' : 'text-black/50'
                  } ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    {category.subtitle}
                  </p>

                  {/* View indicator */}
                  <div className={`mt-3 sm:mt-4 flex items-center gap-2 transition-all duration-500 ${
                    isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}>
                    <span className={`text-xs tracking-wider uppercase ${
                      isDark ? 'text-white' : 'text-black'
                    }`}>View Gallery</span>
                    <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Corner accent */}
                <div className={`absolute top-0 right-0 transition-all duration-500 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-6 sm:w-8 h-px bg-blue-500" />
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-px h-6 sm:h-8 bg-blue-500" />
                </div>

                {/* Bottom line accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 origin-left ${
                  isHovered ? 'scale-x-100' : 'scale-x-0'
                }`} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom info */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-24 mt-12 sm:mt-16 flex justify-between items-center">
        <span className={`text-xs font-mono ${isDark ? 'text-white/30' : 'text-black/30'}`}>
          {categories.length} Categories
        </span>
        <span className={`text-xs tracking-wider uppercase ${isDark ? 'text-white/30' : 'text-black/30'}`}>
          Click to explore
        </span>
      </div>
    </section>
  );
};

export default memo(Portfolio);

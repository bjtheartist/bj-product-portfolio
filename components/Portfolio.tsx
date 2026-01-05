import React, { useState } from 'react';
import { PROJECTS } from '../constants';

const Portfolio: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Photography categories matching Temsvision's portfolio
  const categories = [
    { id: 'PORTRAITS', title: 'Portrait Sessions', subtitle: 'Capturing personality & style' },
    { id: 'SPORTS', title: 'Sports Action', subtitle: 'Dynamic athletic moments' },
    { id: 'LOVE STORIES', title: 'Love Stories', subtitle: 'Engagement & couples' },
    { id: 'B & W', title: 'Black & White', subtitle: 'Timeless monochrome' },
  ];

  return (
    <section id="portfolio" className="relative bg-black py-24 md:py-32">
      {/* Section Header */}
      <div className="px-6 md:px-12 lg:px-24 mb-16">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-amber-400 text-xs font-mono">01</span>
          <div className="w-12 h-px bg-amber-400/50" />
        </div>
        <h2 
          className="text-4xl md:text-5xl lg:text-6xl font-black text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Selected Work
        </h2>
        <p className="text-white/40 text-sm mt-4 max-w-md">
          A collection of moments captured through my lens. Each project tells a unique story.
        </p>
      </div>

      {/* Gallery Wall - O'Shane Howard Style Free-Floating Sections */}
      <div className="px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const categoryProjects = PROJECTS.filter(p => p.category === category.id);
            const isHovered = hoveredCategory === category.id;
            
            // Gradient backgrounds for each category
            const gradients = [
              'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
              'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
              'linear-gradient(135deg, #2d1f3d 0%, #1a1a2e 50%, #16213e 100%)',
              'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)',
            ];
            
            return (
              <div
                key={category.id}
                className={`group relative aspect-[4/3] overflow-hidden cursor-pointer transition-all duration-500 ease-out ${
                  isHovered ? 'scale-[1.02] z-10' : 'scale-100 z-0'
                }`}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
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
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                </div>
                
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity duration-500 ${
                  isHovered ? 'opacity-70' : 'opacity-80'
                }`} />

                {/* Large category number */}
                <div className="absolute top-4 left-6 md:top-6 md:left-8">
                  <span 
                    className={`text-6xl md:text-7xl lg:text-8xl font-black transition-all duration-500 ${
                      isHovered ? 'text-white/30' : 'text-white/10'
                    }`}
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  {/* Category label */}
                  <div className={`mb-2 transition-all duration-300 ${
                    isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-60'
                  }`}>
                    <span className="text-amber-400 text-[10px] tracking-[0.3em] uppercase font-medium">
                      {category.id}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 
                    className={`text-2xl md:text-3xl lg:text-4xl font-black text-white transition-all duration-300 ${
                      isHovered ? 'translate-y-0' : 'translate-y-1'
                    }`}
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {category.title}
                  </h3>

                  {/* Subtitle */}
                  <p className={`text-white/50 text-sm mt-2 transition-all duration-500 ${
                    isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    {category.subtitle}
                  </p>

                  {/* View indicator */}
                  <div className={`mt-4 flex items-center gap-2 transition-all duration-500 ${
                    isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}>
                    <span className="text-white text-xs tracking-wider uppercase">View Gallery</span>
                    <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Corner accent */}
                <div className={`absolute top-0 right-0 transition-all duration-500 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="absolute top-4 right-4 w-8 h-px bg-amber-400" />
                  <div className="absolute top-4 right-4 w-px h-8 bg-amber-400" />
                </div>

                {/* Bottom line accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-500 origin-left ${
                  isHovered ? 'scale-x-100' : 'scale-x-0'
                }`} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom info */}
      <div className="px-6 md:px-12 lg:px-24 mt-16 flex justify-between items-center">
        <span className="text-white/30 text-xs font-mono">
          {categories.length} Categories
        </span>
        <span className="text-white/30 text-xs tracking-wider uppercase">
          Click to explore
        </span>
      </div>
    </section>
  );
};

export default Portfolio;

/**
 * BioSection.tsx
 *
 * Bio section with headshot and personal intro.
 * Design tokens inherited from Hero:
 * - Background: #FAF9F6 (cream)
 * - Text: #1A1A1A (charcoal)
 * - Accent: #dc2626 (red)
 * - Font: Bebas Neue for headlines
 * - Border: 2-3px charcoal for framing
 */

import React, { useEffect, useRef, useState } from 'react';

const BioSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="bio"
      className="relative w-full bg-[#FAF9F6] py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(#1A1A1A 1px, transparent 1px),
            linear-gradient(90deg, #1A1A1A 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Red accent line - top */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 h-16 w-[2px] bg-[#dc2626] transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
        }`}
        style={{ transformOrigin: 'top' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Two-column layout: Headshot + Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Headshot Column */}
          <div
            className={`relative transition-all duration-700 ease-out ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8'
            }`}
          >
            {/* Headshot Container with Neobrutalist Frame */}
            <div className="relative mx-auto lg:mx-0 w-full max-w-md aspect-[4/5]">
              {/* Shadow/offset layer */}
              <div
                className="absolute inset-0 bg-[#dc2626]"
                style={{
                  transform: 'translate(8px, 8px)',
                }}
              />
              {/* Main image container */}
              <div
                className="relative w-full h-full bg-[#1A1A1A] border-2 border-[#1A1A1A] overflow-hidden"
              >
                {/* Placeholder for headshot - replace src with actual image */}
                <img
                  src="/headshot.jpg"
                  alt="Billy Ndizeye"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                    const placeholder = document.createElement('div');
                    placeholder.className = 'text-center p-8';
                    placeholder.innerHTML = `
                      <span class="text-[#FAF9F6]/30 text-6xl font-black" style="font-family: 'Bebas Neue', sans-serif">BN</span>
                      <p class="text-[#FAF9F6]/40 text-xs mt-4 uppercase tracking-wider">Headshot Coming Soon</p>
                    `;
                    target.parentElement!.appendChild(placeholder);
                  }}
                />
              </div>
              {/* Corner accent */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#dc2626]" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#dc2626]" />
            </div>

            {/* Location badge */}
            <div
              className={`mt-6 flex items-center justify-center lg:justify-start gap-2 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <span className="text-[#dc2626]">◆</span>
              <span className="text-xs uppercase tracking-[0.2em] text-[#1A1A1A]/60">
                Chicago, Illinois
              </span>
            </div>
          </div>

          {/* Bio Column */}
          <div
            className={`transition-all duration-700 delay-150 ease-out ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8'
            }`}
          >
            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[#dc2626] text-xs tracking-[0.3em] uppercase font-bold">
                About
              </span>
              <div className="flex-1 h-px bg-[#1A1A1A]/20" />
            </div>

            {/* Statement headline */}
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-[#1A1A1A] leading-[0.95] tracking-tight"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              I design products that{' '}
              <span className="text-[#dc2626]">solve real problems</span> and help people do more.
            </h2>

            {/* Bio paragraphs */}
            <div className="mt-8 space-y-4 text-[#1A1A1A]/70 text-base md:text-lg leading-relaxed">
              <p>
                I'm Billy—a product designer and builder based in Chicago. I'm a storyteller at heart.
                I solve problems and I like to build things. How complicated could that be?
              </p>
              <p>
                My work sits at the intersection of design, technology, and impact. Whether it's
                transforming civic data into actionable insights, crafting newsletters that connect
                communities, or building tools that help teams ship faster—I focus on clarity over
                complexity and craft over shortcuts.
              </p>
              <p>
                I believe the best products feel inevitable. Simple on the surface, thoughtful underneath.
              </p>
            </div>

            {/* Quick stats/info */}
            <div className="mt-10 pt-6 border-t border-[#1A1A1A]/10">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#1A1A1A]/40 block mb-1">
                    Focus
                  </span>
                  <span className="text-sm font-medium text-[#1A1A1A]">
                    Product Design
                  </span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#1A1A1A]/40 block mb-1">
                    Available
                  </span>
                  <span className="text-sm font-medium text-[#dc2626]">
                    For select projects
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Red accent line - bottom */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-16 w-[2px] bg-[#dc2626] transition-all duration-1000 ease-out delay-500 ${
          isVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
        }`}
        style={{ transformOrigin: 'bottom' }}
      />
    </section>
  );
};

export default BioSection;

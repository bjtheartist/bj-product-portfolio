import React, { useEffect, useRef, useState } from 'react';

const TECH_STACK = [
  { category: 'Backend', tools: ['Node.js', 'Python', 'Django', 'Firebase', 'Supabase', 'Convex', 'Railway'] },
  { category: 'Frontend', tools: ['React', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Platform', tools: ['WordPress', 'Squarespace'] },
];

const AboutSection: React.FC = () => {
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
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-[#FFF8E7] py-16 sm:py-24 md:py-32 lg:py-40 overflow-hidden"
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

      {/* Decorative half-circle arc - top right corner */}
      <div
        className="absolute -top-32 -right-32 w-64 h-64 rounded-full pointer-events-none"
        style={{
          border: '3px solid #dc2626',
          opacity: 0.06,
        }}
      />
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full pointer-events-none"
        style={{
          border: '2px solid #dc2626',
          opacity: 0.04,
        }}
      />
      {/* Smaller accent arc */}
      <div
        className="absolute -top-10 -right-10 w-20 h-20 rounded-full pointer-events-none"
        style={{
          border: '1.5px solid #1A1A1A',
          opacity: 0.04,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        {/* Section Label */}
        <div
          className={`flex items-center gap-3 mb-6 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-[#dc2626] text-xs tracking-[0.3em] uppercase font-bold">
            About Us
          </span>
          <div className="flex-1 h-px bg-[#1A1A1A]/20" />
        </div>

        {/* Headline */}
        <h2
          className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#1A1A1A] leading-[0.95] tracking-tight mb-8 sm:mb-12 transition-all duration-700 delay-100 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          DIRECT ACCESS.{' '}
          <span className="text-[#dc2626]">NO MIDDLEMEN.</span>
        </h2>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
          {/* Left — Story */}
          <div
            className={`transition-all duration-700 delay-200 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-base md:text-lg text-[#1A1A1A]/70 leading-relaxed mb-6">
              You don't get an account manager. You get the strategist and the developer in one room. When you call
              Kivara, you're talking to the person writing the code — not someone relaying messages through a chain
              of people who've never seen your brand.
            </p>
            <p className="text-base md:text-lg text-[#1A1A1A]/70 leading-relaxed mb-6">
              We're small by design, and that's the point. No layers. No bloated team. Just focused, high-output work
              from someone who treats your project like their own — because your growth is our reputation.
            </p>
            <p className="text-base md:text-lg text-[#1A1A1A]/70 leading-relaxed">
              This isn't just about websites. It's about building a digital presence that commands authority — from
              SEO and content strategy to brand identity and lead generation. Everything we build is engineered
              to perform, not just exist.
            </p>
          </div>

          {/* Right — Values */}
          <div
            className={`transition-all duration-700 delay-300 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {[
              {
                title: 'You Own Everything',
                description:
                  'Your code, your domain, your data. We don\'t hold your site hostage with proprietary tools. When the project is done, it\'s 100% yours.',
              },
              {
                title: 'Speed to Market',
                description:
                  'We don\'t disappear for months. Focused sprints, frequent updates, and a live preview link so you see progress in real time — not after the invoice.',
              },
              {
                title: 'Built to Rank & Convert',
                description:
                  'Every site ships SEO-ready, mobile-first, and scoring 90+ on Lighthouse. We don\'t just make it look good — we make it findable and profitable.',
              },
            ].map((value, index) => (
              <div
                key={value.title}
                className="mb-8 last:mb-0"
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <h3
                  className="text-xl md:text-2xl font-black text-[#1A1A1A] tracking-tight mb-2"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {value.title}
                </h3>
                <p className="text-sm md:text-base text-[#1A1A1A]/60 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div
          className={`pt-8 border-t-2 border-[#1A1A1A]/10 transition-all duration-700 delay-500 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span
            className="text-sm tracking-[0.15em] uppercase font-bold text-[#1A1A1A]/40 block mb-4"
          >
            The Stack That Makes You Faster
          </span>
          <div className="space-y-4">
            {TECH_STACK.map((group) => (
              <div key={group.category} className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-xs font-bold text-[#dc2626] tracking-[0.15em] uppercase w-full sm:w-20 sm:shrink-0">
                  {group.category}
                </span>
                {group.tools.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 border-2 border-[#1A1A1A] text-xs sm:text-sm font-bold text-[#1A1A1A] tracking-wide uppercase bg-[#FFF8E7] hover:bg-[#1A1A1A] hover:text-[#FAF9F6] transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

import React, { useEffect, useRef, useState } from 'react';

const PILLARS = [
  { title: 'Proven Strategies', detail: 'Every decision backed by what actually works' },
  { title: 'Customer Obsessed', detail: 'Your customers are at the center of everything we build' },
  { title: 'High Quality', detail: 'Clean code, fast loads, zero shortcuts' },
];

const ResultsStrip: React.FC = () => {
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
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#1A1A1A] py-16 md:py-20 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        {/* Pillars Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 mb-10 sm:mb-16">
          {PILLARS.map((pillar, index) => (
            <div
              key={pillar.title}
              className={`text-center transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <span
                className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#dc2626] leading-none mb-3"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {pillar.title}
              </span>
              <span className="block text-sm text-[#FAF9F6]/50">
                {pillar.detail}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className={`w-full h-px bg-[#FAF9F6]/10 mb-12 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Testimonial */}
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <blockquote className="text-[#FAF9F6]/80 text-lg md:text-xl lg:text-2xl italic leading-relaxed mb-6">
            "All the details are amazing. You came in clutch and did it in such a timely manner. Thank you for bringing my vision to life."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-[#dc2626]" />
            <cite className="text-[#FAF9F6]/50 text-sm not-italic uppercase tracking-wider font-bold">
              Temi — Founder, TemsVision
            </cite>
            <div className="w-8 h-px bg-[#dc2626]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsStrip;

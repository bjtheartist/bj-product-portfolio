
import React, { useEffect, useRef } from 'react';
import { PROJECTS } from '../constants';

const Portfolio: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    // @ts-ignore
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    gsap.from('.project-card', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
      y: 120,
      opacity: 0,
      stagger: 0.15,
      duration: 1.5,
      ease: 'expo.out'
    });
  }, []);

  return (
    <section ref={containerRef} className="py-32 md:py-48 px-6 md:px-12 bg-white text-black relative overflow-hidden">
      {/* Roadmap Parallax Line */}
      <div className="absolute top-0 left-[50%] w-px h-[120%] bg-gradient-to-b from-black/10 via-black/5 to-transparent z-0 roadmap-line" data-speed="1.2"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 md:mb-32 gap-12">
          <div className="space-y-4 md:space-y-6">
             <div className="flex items-center gap-4 text-black">
               <span className="w-12 h-px bg-black"></span>
               <span className="text-[10px] font-black tracking-[0.4em] uppercase">The Portfolio</span>
             </div>
             <h2 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none">Selected<br/>Work</h2>
          </div>
          <div className="max-w-md md:text-right">
            <p className="text-zinc-600 text-base md:text-lg font-medium leading-relaxed italic">
              A curated index of visual narratives, capturing the tension between high-fashion editorial and raw urban architecture.
            </p>
            <button className="mt-8 md:mt-10 flex items-center gap-4 text-xs font-black tracking-widest md:ml-auto group uppercase">
              ALL PROJECTS
              <span className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center transition-all group-hover:bg-zinc-800 group-hover:scale-110">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-10">
          {PROJECTS.map((project, index) => (
            <div key={project.id} className={`project-card group cursor-pointer ${index % 2 === 1 ? 'md:mt-8' : 'md:mb-8'}`}>
              <div className="relative overflow-hidden aspect-[3/4] mb-6 md:mb-8 bg-zinc-100 rounded-lg shadow-2xl">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 parallax-img"
                  data-speed={index % 2 === 0 ? "15" : "-15"}
                />
                <div className="absolute top-4 md:top-6 left-4 md:left-6">
                  <span className="bg-white/80 backdrop-blur-xl px-4 md:px-5 py-2 text-[9px] font-black tracking-[0.3em] border border-black/10 uppercase rounded-full text-black">
                    {project.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="text-2xl md:text-3xl font-black tracking-tighter mb-3 md:mb-4 uppercase group-hover:text-zinc-500 transition-colors">{project.title}</h3>
              <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-medium">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

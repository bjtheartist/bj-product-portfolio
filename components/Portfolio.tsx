
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
      stagger: 0.12,
      duration: 1.5,
      ease: 'expo.out'
    });
  }, []);

  return (
    <section ref={containerRef} className="py-40 px-6 md:px-12 bg-white text-black relative overflow-hidden">
      {/* Roadmap Parallax Line */}
      <div className="absolute top-0 left-[50%] w-px h-[120%] bg-gradient-to-b from-black/10 via-black/5 to-transparent z-0 roadmap-line" data-speed="1.2"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12 -mt-20">
          <div className="space-y-4">
             <div className="flex items-center gap-4 text-black">
               <span className="w-12 h-px bg-black"></span>
               <span className="text-[10px] font-black tracking-[0.4em] uppercase">The Portfolio</span>
             </div>
             <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none">Selected<br/>Work</h2>
          </div>
          <div className="max-w-md text-right">
            <p className="text-zinc-600 text-lg font-medium leading-relaxed italic">
              A curated collection of projects spanning product design, data visualization, and full-stack development. Each tells a story of problem-solving and craft.
            </p>
            <div className="mt-6 text-sm text-zinc-400 font-medium">
              {PROJECTS.length} Projects
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8">
          {PROJECTS.map((project, index) => (
            <a 
              key={project.id} 
              href={project.liveUrl || project.githubUrl || '#'}
              target={project.liveUrl || project.githubUrl ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className={`project-card group cursor-pointer block ${index % 2 === 1 ? 'md:mt-8' : ''}`}
            >
              <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-zinc-100 rounded-lg shadow-xl">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-xl px-4 py-2 text-[9px] font-black tracking-[0.2em] border border-black/10 uppercase rounded-full text-black">
                    {project.category}
                  </span>
                </div>
                
                {/* Hover overlay with link indicator */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-between p-6">
                  <span className="text-white text-xs font-bold tracking-wider uppercase">View Project</span>
                  <span className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M7 17L17 7"/>
                      <path d="M7 7h10v10"/>
                    </svg>
                  </span>
                </div>
              </div>
              
              <h3 className="text-2xl font-black tracking-tight mb-3 uppercase group-hover:text-zinc-500 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-zinc-500 text-sm leading-relaxed font-medium mb-4">
                {project.description}
              </p>
              
              {/* Tags */}
              {project.tags && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase bg-zinc-100 text-zinc-600 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

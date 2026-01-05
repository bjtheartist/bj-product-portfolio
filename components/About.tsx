import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { SKILLS } from '../constants';

const About: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    // @ts-ignore
    const ScrollTrigger = window.ScrollTrigger;
    
    if (gsap && ScrollTrigger) {
      // Animate section elements
      gsap.fromTo('.about-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#about',
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.about-content',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#about',
            start: 'top 70%',
          }
        }
      );

      gsap.fromTo('.skill-tag',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.skills-container',
            start: 'top 80%',
          }
        }
      );
    }
  }, []);

  return (
    <section id="about" className="relative py-32 md:py-40 bg-black overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-400/5 to-transparent pointer-events-none" />

      <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <span className="text-xs tracking-[0.3em] uppercase text-amber-400 mb-4 block">
            About
          </span>
          <h2 
            className="about-title text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            The Story
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Bio */}
          <div className="about-content">
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-8">
              I'm a builder based in Chicago who bridges the worlds of economic development, 
              technology, and design.
            </p>
            <p className="text-base text-white/60 leading-relaxed mb-8">
              My background is unconventional. I came from economic development, worked at a tech 
              innovation hub helping founders build their visions, and somewhere along the way, 
              I taught myself to build. It started with no-code platforms—tools that let me bring 
              ideas to life without waiting for permission.
            </p>
            <p className="text-base text-white/60 leading-relaxed mb-8">
              From there, I dove deeper: React, Next.js, TypeScript, Tailwind CSS. I've built 
              numerous projects learning by doing—each one teaching me something new about how 
              to solve real problems for real people.
            </p>
            <p className="text-base text-white/60 leading-relaxed">
              I've also spent years behind a camera, which shaped how I see composition, light, 
              and storytelling. Photography taught me that the best work comes from paying 
              attention to details others overlook.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/10">
              <div>
                <span className="text-4xl md:text-5xl font-black text-amber-400" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  7+
                </span>
                <p className="text-xs tracking-[0.1em] uppercase text-white/40 mt-2">
                  Projects
                </p>
              </div>
              <div>
                <span className="text-4xl md:text-5xl font-black text-amber-400" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  3+
                </span>
                <p className="text-xs tracking-[0.1em] uppercase text-white/40 mt-2">
                  Years Exp
                </p>
              </div>
              <div>
                <span className="text-4xl md:text-5xl font-black text-amber-400" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  100%
                </span>
                <p className="text-xs tracking-[0.1em] uppercase text-white/40 mt-2">
                  Passion
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Skills */}
          <div className="about-content">
            <h3 className="text-xs tracking-[0.3em] uppercase text-white/50 mb-8">
              Tools & Technologies
            </h3>
            
            <div className="skills-container flex flex-wrap gap-3">
              {SKILLS.map((skill) => (
                <span 
                  key={skill}
                  className="skill-tag px-4 py-2 text-sm text-white/70 border border-white/20 rounded-full hover:border-amber-400/50 hover:text-amber-400 transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Background Tags */}
            <div className="mt-12">
              <h3 className="text-xs tracking-[0.3em] uppercase text-white/50 mb-6">
                Background
              </h3>
              <div className="flex flex-wrap gap-3">
                {['Economic Development', 'Tech Innovation Hub', 'No-Code → Code', 'Photography', 'Data & Analytics'].map((item) => (
                  <span 
                    key={item}
                    className="skill-tag px-4 py-2 text-sm text-amber-400/80 bg-amber-400/10 border border-amber-400/20 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Philosophy */}
            <div className="mt-12 p-8 bg-white/5 rounded-lg border border-white/10">
              <blockquote className="text-lg text-white/70 italic leading-relaxed">
                "The best solutions emerge when we bridge disciplines and center 
                the people we're building for."
              </blockquote>
              <cite className="block mt-4 text-xs tracking-[0.2em] uppercase text-amber-400 not-italic">
                — My Philosophy
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

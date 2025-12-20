import React, { useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    // @ts-ignore
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap) return;

    // Create floating particles
    const particlesContainer = particlesRef.current;
    if (particlesContainer) {
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.width = `${Math.random() * 3 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.opacity = `${Math.random() * 0.4 + 0.1}`;
        particlesContainer.appendChild(particle);

        // Animate each particle floating up
        gsap.to(particle, {
          y: `${Math.random() * -200 - 100}`,
          x: `${Math.random() * 100 - 50}`,
          opacity: 0,
          duration: Math.random() * 4 + 3,
          repeat: -1,
          ease: "none",
          delay: Math.random() * 2,
        });
      }
    }
    
    // Create floating geometric shapes
    const shapesContainer = shapesRef.current;
    if (shapesContainer) {
      const shapeTypes = ['circle', 'square', 'triangle', 'plus'];
      for (let i = 0; i < 12; i++) {
        const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        const shape = document.createElement('div');
        shape.className = `absolute opacity-30 pointer-events-none`;
        
        const size = Math.random() * 80 + 40;
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;
        
        let svg = '';
        if (shapeType === 'circle') {
          svg = `<svg width="${size}" height="${size}" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="none" stroke="white" stroke-width="1" stroke-dasharray="4 4"/></svg>`;
        } else if (shapeType === 'square') {
          svg = `<svg width="${size}" height="${size}" viewBox="0 0 100 100"><rect x="2" y="2" width="96" height="96" fill="none" stroke="white" stroke-width="1"/></svg>`;
        } else if (shapeType === 'triangle') {
          svg = `<svg width="${size}" height="${size}" viewBox="0 0 100 100"><path d="M50 5 L95 95 L5 95 Z" fill="none" stroke="white" stroke-width="1" stroke-dasharray="2 2"/></svg>`;
        } else if (shapeType === 'plus') {
          svg = `<svg width="${size}" height="${size}" viewBox="0 0 100 100"><line x1="50" y1="0" x2="50" y2="100" stroke="white" stroke-width="1"/><line x1="0" y1="50" x2="100" y2="50" stroke="white" stroke-width="1"/></svg>`;
        }
        
        shape.innerHTML = svg;
        shapesContainer.appendChild(shape);

        // Animate shapes
        gsap.to(shape, {
          x: `random(-300, 300)`,
          y: `random(-300, 300)`,
          rotation: `random(-360, 360)`,
          duration: `random(20, 40)`,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }
    }

    // Entrance Animation
    gsap.fromTo(textRef.current,
      { opacity: 0, scale: 1.1, y: 100, filter: 'blur(10px)' },
      { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 2, ease: 'expo.out', delay: 0.2 }
    );

    // Animate the badge
    gsap.fromTo('.hero-badge',
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'expo.out', delay: 0.5 }
    );

    // Scroll-triggered Scrub Animation - starts from current state, returns to it when scrolling back
    gsap.fromTo(textRef.current,
      { y: 0, scale: 1, opacity: 1, filter: 'blur(0px)' },
      {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: -80,
        scale: 0.95,
        opacity: 0.4,
        filter: 'blur(4px)',
      }
    );

    // Parallax background
    gsap.to(bgImageRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: 100,
      scale: 1.05,
    });

    // Magnetic effect on hover
    const headline = textRef.current;
    if (headline) {
      const onMove = (e: MouseEvent) => {
        const rect = headline.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(headline, {
          x: x * 0.1,
          y: y * 0.1,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const onLeave = () => {
        gsap.to(headline, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
      };

      headline.addEventListener('mousemove', onMove);
      headline.addEventListener('mouseleave', onLeave);

      return () => {
        headline.removeEventListener('mousemove', onMove);
        headline.removeEventListener('mouseleave', onLeave);
        if (particlesContainer) {
          particlesContainer.innerHTML = '';
        }
        if (shapesContainer) {
          shapesContainer.innerHTML = '';
        }
      };
    }
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black">
      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 z-[5] pointer-events-none overflow-hidden" />
      
      {/* Animated Background Shapes */}
      <div ref={shapesRef} className="absolute inset-0 z-[2] pointer-events-none overflow-hidden" />

      {/* Background Image Container */}
      <div ref={bgImageRef} className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/hero/1920/1080"
          alt="Urban Background"
          className="w-full h-full object-cover brightness-[0.45] contrast-[1.05] transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80"></div>
      </div>

      <div className="relative z-10 text-center px-6 pointer-events-none">
        <div className="mb-14 flex justify-center pointer-events-auto">
           <span className="hero-badge px-8 py-3 border border-white/20 rounded-full text-[10px] font-black tracking-[0.6em] uppercase backdrop-blur-xl bg-white/5 cursor-default hover:bg-white/10 transition-all duration-500">
             EST. 2018 | VISIONARY STUDIO
           </span>
        </div>

        <h1
          ref={textRef}
          className="text-[13vw] md:text-[12vw] font-black leading-[0.75] tracking-tighter uppercase select-none flex flex-col cursor-pointer pointer-events-auto transition-colors duration-500 stylistic-headline"
          style={{ 
            fontFamily: "'Syne', sans-serif",
            textShadow: '0 0 80px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.2)' 
          }}
        >
          <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">BJTHE</span>
          <span className="outline-text font-black -mt-2">ARTIST</span>
        </h1>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-40 pointer-events-none">
        <p className="text-[10px] font-black tracking-[1em] uppercase ml-[1em]">Scroll</p>
        <div className="w-px h-20 bg-gradient-to-b from-white to-transparent relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-line"></div>
        </div>
      </div>

      {/* Ambient glow orbs - subtle white */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none" />

      <style>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-scroll-line {
          animation: scroll-line 3s cubic-bezier(0.7, 0, 0.3, 1) infinite;
        }
        .stylistic-headline span:nth-child(2) {
          position: relative;
        }
        .stylistic-headline span:nth-child(2)::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 20%;
          width: 100%;
          height: 2px;
          background: rgba(255,255,255,0.2);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .stylistic-headline:hover span:nth-child(2)::after {
          transform: scaleX(1);
        }
      `}</style>
    </section>
  );
};

export default Hero;

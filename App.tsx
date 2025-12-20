
import React, { useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';

const AppContent: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    // @ts-ignore
    const ScrollTrigger = window.ScrollTrigger;
    // @ts-ignore
    const Lenis = window.Lenis;

    if (gsap && ScrollTrigger && Lenis) {
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        normalizeWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      lenis.on('scroll', ScrollTrigger.update);
      ScrollTrigger.normalizeScroll(true);

      const headings = document.querySelectorAll('h2');
      headings.forEach((heading) => {
        gsap.fromTo(heading,
          { y: 50, opacity: 0, filter: 'blur(10px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 90%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

      gsap.from(".bento-item", {
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 85%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(".about-img", {
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 70%",
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "expo.out"
      });

      // Parallax Images
      const parallaxImages = document.querySelectorAll('.parallax-img');
      parallaxImages.forEach((img: any) => {
        const speed = img.getAttribute('data-speed') || 20;
        gsap.to(img, {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      // Roadmap Lines Parallax
      const roadmapLines = document.querySelectorAll('.roadmap-line');
      roadmapLines.forEach((line: any) => {
        const speed = line.getAttribute('data-speed') || 0.5;
        gsap.to(line, {
          yPercent: 20 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: line.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 1000);

      return () => {
        clearTimeout(timer);
        lenis.destroy();
        ScrollTrigger.getAll().forEach((t: any) => t.kill());
      };
    }
  }, []);

  return (
    <main className={`relative min-h-screen overflow-x-hidden transition-colors duration-500 ${
      theme === 'dark'
        ? 'bg-black text-white selection:bg-white selection:text-black'
        : 'bg-white text-black selection:bg-black selection:text-white'
    }`}>
      <Navbar />

      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>

      <div className="relative z-10">
        <Hero />

        {/* Floating Roadmap Element - Bridge 1 */}
        <div className="relative z-[15] h-0 pointer-events-none">
           <div className="absolute left-[10%] -top-32 w-64 h-64 bg-black border border-white/10 rounded-2xl rotate-12 flex items-center justify-center shadow-2xl parallax-img" data-speed="-40">
              <span className="text-[8px] font-black tracking-[0.5em] uppercase text-white -rotate-12">Perspective</span>
           </div>
        </div>

        {/* Marquee Ticker - Light Section */}
        <section className="py-24 border-y border-black/5 overflow-hidden bg-white text-black relative z-10">
          <div className="marquee-content animate-marquee">
             <span className="text-8xl md:text-[10vw] font-black uppercase tracking-tighter opacity-10 px-8">DESIGN & PHOTOGRAPHY</span>
             <span className="text-8xl md:text-[10vw] font-black uppercase tracking-tighter opacity-10 px-8">DESIGN & PHOTOGRAPHY</span>
          </div>
        </section>

        {/* About Staggered Layout - Dark Section */}
        <section className="about-section py-40 px-6 md:px-12 bg-black border-b border-white/5 overflow-hidden relative z-10">
           {/* Roadmap Parallax Line */}
           <div className="absolute top-0 right-[10%] w-px h-[150%] bg-gradient-to-b from-white/20 via-white/5 to-transparent z-0 roadmap-line" data-speed="0.5"></div>
           
           <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-20 relative z-10">
             <div className="md:col-span-6 flex flex-col justify-center order-2 md:order-1">
                <h2 className="text-7xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.85] uppercase">
                  DESIGN.<br/>CAPTURE.<br/>CREATE.
                </h2>
                <p className="text-zinc-400 text-xl mb-12 max-w-md font-medium leading-relaxed">
                  Blending product design and photography to craft compelling visual experiences. From intuitive interfaces to striking imagery.
                </p>
                <button className="flex items-center gap-4 font-black text-sm group w-fit">
                  <span className="tracking-[0.2em] uppercase">About us</span>
                  <span className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transition-transform group-hover:scale-110 group-active:scale-95">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </span>
                </button>
             </div>
             <div className="md:col-span-6 relative min-h-[500px] md:h-[700px] order-1 md:order-2">
                <img src="https://picsum.photos/seed/about1/600/800" className="about-img absolute top-0 left-0 w-1/2 aspect-[3/4] object-cover z-0 opacity-90 transition-all duration-700 parallax-img" data-speed="-20" />
                <img src="https://picsum.photos/seed/about2/600/800" className="about-img absolute top-[15%] right-0 w-[55%] aspect-[3/4] object-cover z-10 shadow-2xl border border-white/5 opacity-95 transition-all duration-700 parallax-img" data-speed="30" />
                <img src="https://picsum.photos/seed/about3/600/800" className="about-img absolute bottom-0 left-[15%] w-[50%] aspect-[3/4] object-cover z-20 shadow-2xl border-4 border-black transition-all duration-700 parallax-img" data-speed="10" />
             </div>
          </div>
        </section>

        {/* Floating Roadmap Element - Bridge 2 */}
        <div className="relative z-[15] h-0 pointer-events-none">
           <div className="absolute right-[5%] -top-20 w-48 h-48 bg-white border border-black/10 rounded-full flex items-center justify-center shadow-2xl parallax-img" data-speed="60">
              <span className="text-[8px] font-black tracking-[0.5em] uppercase text-black">Curation</span>
           </div>
        </div>

        <Portfolio />

        <Services />

        {/* Floating Roadmap Element - Bridge 3 */}
        <div className="relative z-[15] h-0 pointer-events-none">
           <div className="absolute left-[20%] -top-10 w-px h-64 bg-black parallax-img" data-speed="20"></div>
           <div className="absolute left-[20%] top-40 w-4 h-4 rounded-full bg-black parallax-img" data-speed="25"></div>
        </div>

        {/* Bento Grid Stats - Light Section */}
        <section className="py-40 px-6 md:px-12 bg-white text-black relative overflow-hidden z-10">
           {/* Roadmap Parallax Line */}
           <div className="absolute top-[-20%] left-[15%] w-px h-[140%] bg-gradient-to-b from-black/20 via-black/5 to-transparent z-0 roadmap-line" data-speed="0.8"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bento-grid -mt-32">
               <div className="md:col-span-8 bg-zinc-100 border border-black/5 p-16 rounded-2xl bento-item shadow-sm">
                  <div className="mb-24 opacity-30">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="7.5 4.21 12 6.81 16.5 4.21"/><polyline points="7.5 19.79 7.5 14.6 3 12"/><polyline points="21 12 16.5 14.6 16.5 19.79"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                  </div>
                  <h3 className="text-5xl font-black mb-6 tracking-tight uppercase">Creative Vision</h3>
                  <p className="text-zinc-600 text-lg max-w-lg leading-relaxed">Every project starts with understanding your goals. I combine design thinking with visual storytelling to create work that resonates.</p>
               </div>
               <div className="md:col-span-4 bg-zinc-100 border border-black/5 p-16 rounded-2xl bento-item flex flex-col justify-end min-h-[400px] shadow-sm">
                  <span className="text-8xl font-black mb-4 tracking-tighter text-black">50+</span>
                  <p className="text-zinc-500 uppercase text-xs font-black tracking-[0.3em]">Projects Completed</p>
               </div>
               <div className="md:col-span-4 bg-zinc-100 border border-black/5 p-16 rounded-2xl bento-item flex flex-col justify-end min-h-[400px] overflow-hidden relative group shadow-sm">
                  <img src="https://picsum.photos/seed/office/800/600" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-all duration-1000 group-hover:opacity-70 bg-zinc-200" />
                  <div className="relative z-10">
                    <span className="text-7xl font-black mb-4 tracking-tighter">7+</span>
                    <p className="text-zinc-500 uppercase text-xs font-black tracking-[0.3em]">Years Experience</p>
                  </div>
               </div>
               <div className="md:col-span-8 bg-black p-16 rounded-2xl bento-item flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative shadow-2xl">
                  <div className="relative z-10">
                    <h3 className="text-4xl font-black mb-4 text-white uppercase tracking-tight">User-Centered Design</h3>
                    <p className="text-white/70 text-lg max-w-md leading-relaxed">I design with purpose. Every pixel and every frame is crafted to connect with your audience and drive results.</p>
                  </div>
                  <div className="hidden md:block w-64 h-64 bg-white/5 rounded-full blur-3xl absolute -right-20 -bottom-20"></div>
               </div>
            </div>
          </div>
        </section>

        <Contact />

        <Footer />
      </div>

      <ThemeToggle />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .marquee-content:hover {
          animation-play-state: paused;
        }
      `}</style>
    </main>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;

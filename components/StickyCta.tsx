import React, { useEffect, useState } from 'react';

const StickyCta: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const heroEl = document.querySelector('section');
    const portfolioEl = document.getElementById('portfolio');
    const getStartedEl = document.getElementById('get-started');

    // If either anchor is missing, bail safely — keeps the CTA hidden.
    if (!heroEl && !portfolioEl && !getStartedEl) return;

    let heroOutOfView = false;
    let portfolioInView = false;
    let getStartedInView = false;

    const update = () => {
      setIsVisible(heroOutOfView && !portfolioInView && !getStartedInView);
    };

    const heroObserver = heroEl
      ? new IntersectionObserver(
          ([entry]) => {
            heroOutOfView = !entry.isIntersecting;
            update();
          },
          { threshold: 0 },
        )
      : null;

    const portfolioObserver = portfolioEl
      ? new IntersectionObserver(
          ([entry]) => {
            portfolioInView = entry.isIntersecting;
            update();
          },
          { rootMargin: '-18% 0px -18% 0px', threshold: 0 },
        )
      : null;

    const getStartedObserver = getStartedEl
      ? new IntersectionObserver(
          ([entry]) => {
            getStartedInView = entry.isIntersecting;
            update();
          },
          { threshold: 0 },
        )
      : null;

    if (heroEl && heroObserver) heroObserver.observe(heroEl);
    if (portfolioEl && portfolioObserver) portfolioObserver.observe(portfolioEl);
    if (getStartedEl && getStartedObserver)
      getStartedObserver.observe(getStartedEl);

    return () => {
      heroObserver?.disconnect();
      portfolioObserver?.disconnect();
      getStartedObserver?.disconnect();
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('get-started');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <a
      href="#get-started"
      onClick={handleClick}
      aria-label="Start a project"
      className={`md:hidden fixed bottom-4 right-4 z-40 rounded-full bg-[#1c1a17] text-[#f5f2eb] px-5 py-3 text-[10px] tracking-[0.28em] uppercase font-medium shadow-[0_12px_36px_rgba(28,26,23,0.22)] transition-opacity duration-500 ${
        isVisible
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      Start a project →
    </a>
  );
};

export default StickyCta;

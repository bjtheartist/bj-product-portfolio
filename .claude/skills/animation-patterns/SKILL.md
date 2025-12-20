---
name: animation-patterns
description: Implement GSAP and Lenis animations following BJTHEARTIST portfolio conventions. Use when adding scroll animations, entrance effects, hover interactions, or smooth scrolling to components.
---

# Animation Patterns Guide

## When to Use This Skill
Use this when adding animations to new components, creating scroll-triggered effects, or implementing interactive hover states.

## Technology Stack
- **GSAP 3.12+** - Animation engine (loaded via CDN)
- **ScrollTrigger** - Scroll-based animations (GSAP plugin)
- **Lenis** - Smooth scrolling library

## Accessing Libraries

Libraries are loaded globally via CDN. Access them in React components:

```tsx
useEffect(() => {
  // @ts-ignore
  const gsap = window.gsap;
  // @ts-ignore
  const ScrollTrigger = window.ScrollTrigger;

  if (!gsap || !ScrollTrigger) return;

  // Your animations here
}, []);
```

## Animation Patterns

### 1. Entrance Animation (Fade Up with Blur)
Used for headings and hero text:

```tsx
gsap.fromTo(elementRef.current,
  { y: 50, opacity: 0, filter: 'blur(10px)' },
  {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    duration: 1.5,
    ease: "expo.out",
    scrollTrigger: {
      trigger: elementRef.current,
      start: "top 90%",
      toggleActions: "play none none reverse",
    }
  }
);
```

### 2. Staggered Elements (Cards, Grid Items)
Used for portfolio cards and bento grid:

```tsx
gsap.from(".card-class", {
  scrollTrigger: {
    trigger: ".container-class",
    start: "top 85%",
  },
  y: 60,
  opacity: 0,
  stagger: 0.1,        // Delay between each element
  duration: 1,
  ease: "power3.out"
});
```

### 3. Parallax Background
Used for hero background images:

```tsx
gsap.to(bgImageRef.current, {
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top top',
    end: 'bottom top',
    scrub: true         // Smooth connection to scroll
  },
  y: 100,
  scale: 1.05,
});
```

### 4. Scrub Animation (Text on Scroll)
Used for hero headline that fades as you scroll:

```tsx
gsap.to(textRef.current, {
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top",
    end: "bottom top",
    scrub: 1,           // Smoothing factor
  },
  y: -80,
  scale: 0.95,
  opacity: 0.4,
  filter: 'blur(4px)',
});
```

### 5. Hover Color Animation
Used for headline hover effects:

```tsx
useEffect(() => {
  const gsap = window.gsap;
  const element = elementRef.current;

  if (!gsap || !element) return;

  const onEnter = () => {
    gsap.to(element, {
      scale: 1.03,
      letterSpacing: '0.02em',
      duration: 0.6,
      ease: "power3.out",
      color: "#f97316"    // Orange accent
    });
  };

  const onLeave = () => {
    gsap.to(element, {
      scale: 1,
      letterSpacing: '0em',
      duration: 0.6,
      ease: "power3.out",
      color: "#ffffff"
    });
  };

  element.addEventListener('mouseenter', onEnter);
  element.addEventListener('mouseleave', onLeave);

  return () => {
    element.removeEventListener('mouseenter', onEnter);
    element.removeEventListener('mouseleave', onLeave);
  };
}, []);
```

## Easing Reference

| Ease | Use Case |
|------|----------|
| `expo.out` | Dramatic entrances, hero text |
| `power3.out` | Hover effects, smooth transitions |
| `linear` | Marquee, continuous animations |
| `cubic-bezier(0.7, 0, 0.3, 1)` | Scroll indicator loop |

## CSS Animations (Inline Styles)

For simple looping animations, use CSS in component:

```tsx
<style>{`
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    animation: marquee 30s linear infinite;
  }
  .animate-marquee:hover {
    animation-play-state: paused;
  }
`}</style>
```

## Cleanup Pattern

Always clean up GSAP animations to prevent memory leaks:

```tsx
useEffect(() => {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  // ... create animations ...

  return () => {
    // Kill all ScrollTrigger instances
    ScrollTrigger.getAll().forEach((t: any) => t.kill());
    // Kill Lenis if used
    lenis?.destroy();
  };
}, []);
```

## ScrollTrigger Refresh

After dynamic content loads, refresh ScrollTrigger:

```tsx
const timer = setTimeout(() => {
  ScrollTrigger.refresh();
}, 1000);

return () => clearTimeout(timer);
```

## Image Hover Transitions (CSS)

For card images, use Tailwind classes:

```tsx
className="transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
```

## Duration Guidelines
- **Entrance animations**: 1-1.5s
- **Hover effects**: 0.5-0.7s
- **Image transitions**: 0.7-1s
- **Marquee loop**: 20-30s

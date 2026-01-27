/**
 * ContactSection.tsx
 *
 * Premium contact section - "Let's Work Together"
 * Design: Dark charcoal background for visual contrast
 * Features:
 * - Large Bebas Neue headline
 * - Clean social links with hover effects
 * - Floating shapes for consistency with Hero
 * - Fade in on scroll animation
 */

import React, { useEffect, useState, useRef } from 'react';

// ============================================
// FLOATING ELEMENT COMPONENT (Simplified)
// ============================================
interface FloatingElementProps {
  shape: 'circle' | 'diamond' | 'ring';
  color: string;
  size: number;
  position: { top: string; left: string };
  delay: number;
  duration: number;
  opacity: number;
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  shape,
  color,
  size,
  position,
  delay,
  duration,
  opacity,
}) => {
  const renderShape = () => {
    switch (shape) {
      case 'circle':
        return (
          <div
            className="rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
            }}
          />
        );
      case 'diamond':
        return (
          <div
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              transform: 'rotate(45deg)',
            }}
          />
        );
      case 'ring':
        return (
          <div
            className="rounded-full"
            style={{
              width: size,
              height: size,
              border: `2px solid ${color}`,
              backgroundColor: 'transparent',
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: position.top,
        left: position.left,
        opacity: opacity,
        animation: `contactFloat ${duration}s ease-in-out ${delay}s infinite`,
      }}
    >
      {renderShape()}
    </div>
  );
};

// ============================================
// SVG ICONS
// ============================================
const GitHubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const ResumeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const EmailIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

// ============================================
// LINK ITEM COMPONENT
// ============================================
interface LinkItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isExternal?: boolean;
  delay: number;
  isVisible: boolean;
}

const LinkItem: React.FC<LinkItemProps> = ({
  href,
  icon,
  label,
  isExternal = true,
  delay,
  isVisible,
}) => {
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`group flex items-center gap-4 py-4 transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Icon */}
      <span className="w-6 h-6 text-[#FAF9F6]/60 group-hover:text-[#dc2626] transition-colors duration-300">
        {icon}
      </span>

      {/* Label with underline reveal */}
      <span className="relative text-lg md:text-xl text-[#FAF9F6] font-medium tracking-wide overflow-hidden">
        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
          {label}
        </span>
        <span className="absolute left-0 top-full inline-block text-[#dc2626] transition-transform duration-300 group-hover:-translate-y-full">
          {label}
        </span>
      </span>

      {/* Arrow */}
      <span className="ml-auto text-[#FAF9F6]/40 group-hover:text-[#dc2626] group-hover:translate-x-1 transition-all duration-300">
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </a>
  );
};

// ============================================
// MAIN CONTACT SECTION COMPONENT
// ============================================
const ContactSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Floating elements configuration
  const floatingElements: FloatingElementProps[] = [
    { shape: 'circle', color: '#dc2626', size: 80, position: { top: '10%', left: '5%' }, delay: 0, duration: 7, opacity: 0.15 },
    { shape: 'diamond', color: '#dc2626', size: 40, position: { top: '70%', left: '90%' }, delay: 1.5, duration: 6, opacity: 0.2 },
    { shape: 'ring', color: '#FAF9F6', size: 100, position: { top: '60%', left: '8%' }, delay: 0.5, duration: 8, opacity: 0.1 },
    { shape: 'circle', color: '#FAF9F6', size: 30, position: { top: '20%', left: '85%' }, delay: 2, duration: 5, opacity: 0.15 },
    { shape: 'diamond', color: '#dc2626', size: 25, position: { top: '80%', left: '50%' }, delay: 1, duration: 6, opacity: 0.2 },
  ];

  // Social/Contact Links
  const links = [
    {
      href: 'https://github.com/billynd',
      icon: <GitHubIcon className="w-full h-full" />,
      label: 'GitHub',
    },
    {
      href: 'https://linkedin.com/in/billyndizeye',
      icon: <LinkedInIcon className="w-full h-full" />,
      label: 'LinkedIn',
    },
    {
      href: '/resume.pdf',
      icon: <ResumeIcon className="w-full h-full" />,
      label: 'Resume / CV',
      isExternal: false,
    },
    {
      href: 'mailto:hello@bjtheartist.com',
      icon: <EmailIcon className="w-full h-full" />,
      label: 'hello@bjtheartist.com',
      isExternal: false,
    },
  ];

  return (
    <>
      <style>{`
        @keyframes contactFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(2deg);
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="contact"
        className="relative min-h-screen w-full bg-[#1A1A1A] overflow-hidden"
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(250, 249, 246, 0.5) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(250, 249, 246, 0.5) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {floatingElements.map((element, index) => (
            <FloatingElement key={index} {...element} />
          ))}
        </div>

        {/* Content Container */}
        <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-24 md:py-32">
          <div className="max-w-4xl mx-auto w-full">
            {/* Availability Badge */}
            <div
              className={`mb-8 transition-all duration-700 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <span className="inline-flex items-center gap-2 text-[10px] md:text-xs tracking-[0.25em] uppercase text-[#FAF9F6]/50">
                <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                Currently available for projects
              </span>
            </div>

            {/* Large Headline */}
            <h2
              className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-[#FAF9F6] leading-[0.9] tracking-tight mb-12 md:mb-16 transition-all duration-700 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                transitionDelay: '200ms',
              }}
            >
              LET'S WORK
              <br />
              <span className="text-[#dc2626]">TOGETHER</span>
            </h2>

            {/* Subtext */}
            <p
              className={`text-base md:text-lg text-[#FAF9F6]/50 max-w-md mb-12 transition-all duration-700 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              Interested in collaborating? Feel free to reach out.
            </p>

            {/* Divider */}
            <div
              className={`w-full h-[2px] bg-[#FAF9F6]/10 mb-8 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
              style={{
                transformOrigin: 'left',
                transitionDelay: '400ms',
              }}
            />

            {/* Links */}
            <div className="space-y-2">
              {links.map((link, index) => (
                <LinkItem
                  key={link.label}
                  href={link.href}
                  icon={link.icon}
                  label={link.label}
                  isExternal={link.isExternal ?? true}
                  delay={500 + index * 100}
                  isVisible={isVisible}
                />
              ))}
            </div>

            {/* Bottom Section - Location */}
            <div
              className={`mt-16 md:mt-24 pt-8 border-t border-[#FAF9F6]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all duration-700 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '900ms' }}
            >
              <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#FAF9F6]/40">
                Based in Chicago, Illinois
              </span>
              <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#FAF9F6]/40">
                Available Worldwide
              </span>
            </div>
          </div>
        </div>

        {/* Decorative Corner Elements */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#FAF9F6]/10" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#FAF9F6]/10" />
      </section>
    </>
  );
};

export default ContactSection;

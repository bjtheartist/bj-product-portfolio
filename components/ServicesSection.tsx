/**
 * ServicesSection.tsx
 *
 * Service categories section — differentiates offerings by business type.
 * Design tokens:
 * - Background: #1c1a17 (charcoal, inverted section)
 * - Text: #f5f2eb (cream)
 * - Accent: #1c1a17 (red)
 * - Font: Bebas Neue for headlines
 * - Cards: border with hover lift and red shadow
 */

import React, { useEffect, useRef, useState } from 'react';

interface ServiceCategory {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  platforms: string[];
  idealFor: string[];
}

const SERVICES: ServiceCategory[] = [
  {
    id: 'ecommerce',
    number: '01',
    title: 'E-COMMERCE',
    subtitle: 'Growth-Engine Storefronts',
    description:
      'Stop losing sales to friction. We build checkout experiences that turn window shoppers into repeat buyers — high-performance stores engineered for revenue, not just aesthetics.',
    platforms: ['Shopify', 'WooCommerce', 'Square', 'Stripe', 'Custom Carts'],
    idealFor: ['Retail', 'D2C Brands', 'Food & Bev', 'Subscriptions'],
  },
  {
    id: 'portfolios',
    number: '02',
    title: 'PORTFOLIOS & CREATIVE',
    subtitle: 'The Digital First Impression',
    description:
      'Your work is world-class — your site should be too. Bespoke, high-motion portfolios that position you as the top 1% in your industry. No templates. Just your brand, amplified.',
    platforms: ['Custom React', 'Next.js', 'Sanity CMS', 'GSAP', 'Framer Motion'],
    idealFor: ['Photographers', 'Artists', 'Agencies', 'Personal Brands'],
  },
  {
    id: 'apps',
    number: '03',
    title: 'WEB & MOBILE APPS',
    subtitle: 'Foundational Tech. No Limits.',
    description:
      'From MVP to enterprise — secure, fast software you own entirely. No vendor lock-in, no technical debt. Just the tools your business actually runs on, built to scale with you.',
    platforms: ['React Native', 'Expo', 'Supabase', 'Firebase', 'Django', 'Convex'],
    idealFor: ['Startups', 'SaaS', 'Nonprofits', 'Internal Tools'],
  },
  {
    id: 'business',
    number: '04',
    title: 'BUSINESS & MARKETING',
    subtitle: 'Local Authority & SEO',
    description:
      'Your "online brochure" is costing you customers. We turn it into a lead-generation machine — built for speed, ranking, and trust so people find you first and choose you with confidence.',
    platforms: ['Next.js', 'WordPress', 'Sanity CMS', 'Google Analytics', 'SEO'],
    idealFor: ['Restaurants', 'Law Firms', 'Consultants', 'Churches'],
  },
];

const ServiceCard: React.FC<{
  service: ServiceCategory;
  index: number;
  isVisible: boolean;
}> = ({ service, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${200 + index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative border p-6 sm:p-8 lg:p-10 h-full transition-all duration-300 ${
          isHovered
            ? 'border-[#1c1a17] bg-[#1c1a17]/5 -translate-y-1'
            : 'border-[#f5f2eb]/20 bg-transparent'
        }`}
        style={{
          boxShadow: isHovered
            ? '6px 6px 0 #1c1a17'
            : '4px 4px 0 rgba(250,249,246,0.1)',
        }}
      >
        {/* Number + Title */}
        <div className="flex items-start gap-4 mb-6">
          <span
            className={`text-4xl md:text-5xl font-black leading-none transition-colors duration-300 ${
              isHovered ? 'text-[#1c1a17]' : 'text-[#f5f2eb]/15'
            }`}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {service.number}
          </span>
          <div>
            <h3
              className="text-2xl md:text-3xl lg:text-4xl font-black text-[#f5f2eb] tracking-tight leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {service.title}
            </h3>
            <span className="text-sm text-[#1c1a17] tracking-wide uppercase font-medium">
              {service.subtitle}
            </span>
          </div>
        </div>

        {/* Separator */}
        <div
          className={`h-[2px] mb-6 transition-all duration-300 ${
            isHovered ? 'w-16 bg-[#1c1a17]' : 'w-10 bg-[#f5f2eb]/20'
          }`}
        />

        {/* Description */}
        <p className="text-base text-[#f5f2eb]/70 leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Platforms */}
        <div className="mb-6">
          <span className="text-xs tracking-[0.2em] uppercase text-[#f5f2eb]/30 block mb-3">
            Tools & Platforms
          </span>
          <div className="flex flex-wrap gap-2">
            {service.platforms.map((platform) => (
              <span
                key={platform}
                className={`text-xs px-3 py-1.5 border transition-colors duration-200 ${
                  isHovered
                    ? 'border-[#1c1a17]/40 text-[#f5f2eb]/80'
                    : 'border-[#f5f2eb]/10 text-[#f5f2eb]/50'
                }`}
              >
                {platform}
              </span>
            ))}
          </div>
        </div>

        {/* Ideal For — chips */}
        <div className="pt-4 border-t border-[#f5f2eb]/10">
          <span className="text-xs tracking-[0.2em] uppercase text-[#f5f2eb]/30 block mb-3">
            Ideal for
          </span>
          <div className="flex flex-wrap gap-2">
            {service.idealFor.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 bg-[#f5f2eb]/[0.06] text-[#f5f2eb]/60 font-medium tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesSection: React.FC = () => {
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
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full bg-[#1c1a17] py-16 sm:py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(#f5f2eb 1px, transparent 1px),
            linear-gradient(90deg, #f5f2eb 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Decorative corner element */}
      <div
        className="absolute -top-16 -right-16 w-64 h-64 border border-[#1c1a17] opacity-[0.06] pointer-events-none"
        style={{ transform: 'rotate(45deg)' }}
      />

      {/* Red accent line - top */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 h-16 w-[2px] bg-[#1c1a17] transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
        }`}
        style={{ transformOrigin: 'top' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        {/* Section Label */}
        <div
          className={`flex items-center gap-3 mb-6 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-[#1c1a17] text-xs tracking-[0.3em] uppercase font-bold">
            Our Services
          </span>
          <div className="flex-1 h-px bg-[#f5f2eb]/20" />
        </div>

        {/* Headline */}
        <h2
          className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#f5f2eb] leading-[0.95] tracking-tight mb-6 transition-all duration-700 delay-100 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          ONE STUDIO.{' '}
          <span className="text-[#1c1a17]">EVERY DIGITAL NEED.</span>
        </h2>

        {/* Subhead */}
        <p
          className={`max-w-2xl text-base md:text-lg text-[#f5f2eb]/50 leading-relaxed mb-12 sm:mb-16 transition-all duration-700 delay-200 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Not a template shop. Not an overpriced agency. We're the studio that
          builds what your business actually needs — custom, fast, and built to last.
        </p>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>

      {/* Red accent line - bottom */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-16 w-[2px] bg-[#1c1a17] transition-all duration-1000 ease-out delay-500 ${
          isVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
        }`}
        style={{ transformOrigin: 'bottom' }}
      />
    </section>
  );
};

export default ServicesSection;

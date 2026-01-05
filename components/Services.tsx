import React, { useState } from 'react';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  const [activeService, setActiveService] = useState<string>(SERVICES[0]?.id || '');

  return (
    <section id="services" className="py-32 md:py-40 bg-zinc-950">
      <div className="px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-amber-400 text-xs font-mono">03</span>
            <div className="w-12 h-px bg-amber-400/50" />
          </div>
          <h2 
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Services
          </h2>
          <p className="text-white/40 text-sm mt-4 max-w-md">
            Professional photography services tailored to capture your special moments.
          </p>
        </div>

        {/* Services List */}
        <div className="services-list">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="service-item group cursor-pointer"
              onMouseEnter={() => setActiveService(service.id)}
            >
              {/* Animated border */}
              <div className="h-px bg-white/10" />
              
              <div className="py-8 md:py-10 grid grid-cols-12 gap-4 items-start">
                {/* Number */}
                <div className="col-span-2 md:col-span-1">
                  <span className={`text-sm font-mono transition-all duration-500 ${
                    activeService === service.id
                      ? 'text-amber-400'
                      : 'text-white/30'
                  }`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Title */}
                <div className="col-span-10 md:col-span-4">
                  <h3 
                    className={`text-2xl md:text-3xl font-black tracking-tight transition-all duration-500 ${
                      activeService === service.id
                        ? 'text-white translate-x-2'
                        : 'text-white/50'
                    }`}
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {service.name}
                  </h3>
                </div>

                {/* Description */}
                <div className="col-span-12 md:col-span-6 md:pl-8">
                  <p className={`text-sm md:text-base leading-relaxed max-w-lg transition-all duration-500 ${
                    activeService === service.id
                      ? 'text-white/70 opacity-100'
                      : 'text-white/40 opacity-60'
                  }`}>
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <div className={`flex flex-wrap gap-2 mt-4 transition-all duration-500 ${
                    activeService === service.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    {service.features.map((feature) => (
                      <span 
                        key={feature}
                        className="px-3 py-1 text-xs text-amber-400/80 bg-amber-400/10 border border-amber-400/20"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className={`hidden md:flex col-span-12 md:col-span-1 justify-end items-center transition-all duration-300 ${
                  activeService === service.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    className="text-amber-400"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
          
          {/* Bottom border */}
          <div className="h-px bg-white/10" />
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/40 text-sm mb-6">
            Ready to capture your story?
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-amber-400 text-black font-bold text-sm tracking-wider uppercase hover:bg-amber-300 transition-colors duration-300"
          >
            Book a Session
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;

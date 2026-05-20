/**
 * DiagnosticSection.tsx
 *
 * Free site diagnostic / health check form section.
 * Design tokens:
 * - Background: #1c1a17 (dark charcoal)
 * - Text: #f5f2eb (cream)
 * - Accent: #1c1a17 (red)
 * - Font: Bebas Neue for headlines
 * - Border: 2px with red offset shadow on form container
 */

import React, { useEffect, useRef, useState } from 'react';

// ============================================
// FORM STATUS TYPE
// ============================================
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

// ============================================
// MAIN DIAGNOSTIC SECTION COMPONENT
// ============================================
const DiagnosticSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'diagnostic', email, url }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setFormStatus('success');
      setEmail('');
      setUrl('');
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <section
      ref={sectionRef}
      id="diagnostic"
      className="relative w-full bg-[#1c1a17] py-16 sm:py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(250, 249, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(250, 249, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          {/* Label */}
          <div
            className={`flex items-center gap-3 mb-6 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-[#1c1a17] text-xs tracking-[0.3em] uppercase font-bold">
              Free Diagnostic
            </span>
            <div className="flex-1 h-px bg-[#f5f2eb]/20" />
          </div>

          {/* Headline */}
          <h2
            className={`text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-[#f5f2eb] tracking-tight leading-[0.95] transition-all duration-700 delay-100 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            GET A FREE SITE
            <br />
            <span className="text-[#1c1a17]">HEALTH CHECK</span>
          </h2>

          {/* Subtext */}
          <p
            className={`mt-6 text-base md:text-lg text-[#f5f2eb]/50 max-w-xl leading-relaxed transition-all duration-700 delay-200 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Drop your URL and we'll send you a personalized report on speed, SEO,
            mobile performance, and conversion opportunities. No strings attached.
          </p>
        </div>

        {/* Form Container */}
        <div
          className={`relative transition-all duration-700 delay-300 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Success State */}
          {formStatus === 'success' && (
            <div
              className="bg-[#f5f2eb]/5 border border-[#22c55e] p-8 md:p-12 text-center"
              style={{ boxShadow: '4px 4px 0 #1c1a17' }}
            >
              <div className="w-12 h-12 mx-auto mb-4 border border-[#22c55e] flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[#22c55e]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3
                className="text-3xl md:text-4xl font-black text-[#f5f2eb] mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                WE'RE ON IT
              </h3>
              <p className="text-[#f5f2eb]/50 text-sm md:text-base">
                Your diagnostic report will hit your inbox within 24 hours.
              </p>
            </div>
          )}

          {/* Error State */}
          {formStatus === 'error' && (
            <div
              className="bg-[#f5f2eb]/5 border border-[#1c1a17] p-8 md:p-12 text-center"
              style={{ boxShadow: '4px 4px 0 #1c1a17' }}
            >
              <h3
                className="text-3xl md:text-4xl font-black text-[#f5f2eb] mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                SOMETHING WENT WRONG
              </h3>
              <p className="text-[#f5f2eb]/50 text-sm md:text-base mb-6">
                Please try again or email us directly at hello@kivarastudios.dev
              </p>
              <button
                onClick={() => setFormStatus('idle')}
                className="px-6 py-3 bg-[#1c1a17] text-[#f5f2eb] text-sm font-bold tracking-[0.1em] uppercase hover:bg-[#1c1a17] transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Form (idle or submitting) */}
          {(formStatus === 'idle' || formStatus === 'submitting') && (
            <form
              onSubmit={handleSubmit}
              className="bg-[#f5f2eb]/5 border border-[#f5f2eb]/10 p-5 sm:p-8 md:p-12"
              style={{ boxShadow: '4px 4px 0 #1c1a17' }}
            >
              <div className="space-y-6">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="diagnostic-email"
                    className="block text-xs tracking-[0.2em] uppercase text-[#f5f2eb]/40 mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="diagnostic-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-transparent border border-[#f5f2eb]/30 text-[#f5f2eb] px-4 py-3 text-base placeholder:text-[#f5f2eb]/40 focus:border-[#1c1a17] focus:outline-none transition-colors duration-300 disabled:opacity-50"
                  />
                </div>

                {/* Website URL Field */}
                <div>
                  <label
                    htmlFor="diagnostic-url"
                    className="block text-xs tracking-[0.2em] uppercase text-[#f5f2eb]/40 mb-2"
                  >
                    Website URL
                  </label>
                  <input
                    id="diagnostic-url"
                    type="url"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://yourwebsite.com"
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-transparent border border-[#f5f2eb]/30 text-[#f5f2eb] px-4 py-3 text-base placeholder:text-[#f5f2eb]/40 focus:border-[#1c1a17] focus:outline-none transition-colors duration-300 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="mt-8 w-full py-4 bg-[#1c1a17] text-[#f5f2eb] text-sm font-bold tracking-[0.1em] uppercase hover:bg-[#1c1a17] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {formStatus === 'submitting' ? (
                  <>
                    <span
                      className="w-4 h-4 border border-[#f5f2eb]/30 border-t-[#f5f2eb] rounded-full animate-spin"
                    />
                    Running Diagnostic...
                  </>
                ) : (
                  'Run My Diagnostic'
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-[#f5f2eb]/10" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-[#f5f2eb]/10" />
    </section>
  );
};

export default DiagnosticSection;

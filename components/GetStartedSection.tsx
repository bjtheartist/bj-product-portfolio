import React, { useState, useEffect, useRef } from 'react';

const GetStartedSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    industry: '',
    url: '',
    budget: '',
    timeline: '',
    message: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'intake', ...formData }),
      });
      if (!res.ok) throw new Error('Failed');
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', business: '', industry: '', url: '', budget: '', timeline: '', message: '' });
    } catch {
      setFormStatus('error');
    }
  };

  const inputClasses =
    'w-full px-4 py-3 bg-[#FAF9F6] border-2 border-[#1A1A1A] text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:border-[#dc2626] focus:outline-none transition-colors text-sm';
  const labelClasses = 'block text-xs uppercase tracking-wider font-bold text-[#1A1A1A]/60 mb-2';

  return (
    <section
      ref={sectionRef}
      id="get-started"
      className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-[#FAF9F6]"
    >
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #1A1A1A 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column — Copy */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-[#dc2626]" />
              <span className="text-[#dc2626] text-xs sm:text-sm tracking-[0.3em] uppercase font-bold">
                Get Started
              </span>
            </div>

            <h2
              className="text-3xl sm:text-5xl md:text-6xl font-black text-[#1A1A1A] leading-none mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              BUILD YOUR
              <br />
              <span className="text-[#dc2626]">FOUNDATION</span>
            </h2>

            <p className="text-[#1A1A1A]/60 text-base sm:text-lg max-w-md mb-8">
              Tell us about your business and what you need. No sales pitch — just honest advice
              and a game plan within 24 hours.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-[#dc2626] text-white text-xs font-bold">1</span>
                <span className="text-sm text-[#1A1A1A]/70">Fill out the form</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-[#dc2626] text-white text-xs font-bold">2</span>
                <span className="text-sm text-[#1A1A1A]/70">We review and reply within 24h</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-[#dc2626] text-white text-xs font-bold">3</span>
                <span className="text-sm text-[#1A1A1A]/70">30-min strategy call (free)</span>
              </div>
            </div>
          </div>

          {/* Right Column — Form */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {formStatus === 'success' ? (
              <div
                className="p-8 border-2 border-[#1A1A1A] bg-[#FFF8E7] text-center"
                style={{ boxShadow: '8px 8px 0 #dc2626' }}
              >
                <div className="text-4xl mb-4">✓</div>
                <h3
                  className="text-2xl font-black text-[#1A1A1A] mb-2"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  WE GOT YOUR MESSAGE
                </h3>
                <p className="text-[#1A1A1A]/60">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 border-2 border-[#1A1A1A]"
                style={{ boxShadow: '8px 8px 0 #dc2626' }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelClasses}>Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelClasses}>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Business Name *</label>
                    <input
                      type="text"
                      name="business"
                      required
                      value={formData.business}
                      onChange={handleChange}
                      placeholder="Acme Inc."
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelClasses}>Industry</label>
                    <input
                      type="text"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      placeholder="e.g. Real Estate, SaaS"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Current Website URL</label>
                    <input
                      type="url"
                      name="url"
                      value={formData.url}
                      onChange={handleChange}
                      placeholder="https://yoursite.com"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelClasses}>Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={inputClasses}
                    >
                      <option value="">Select budget</option>
                      <option value="under-2500">Under $2,500</option>
                      <option value="2500-5000">$2,500 – $5,000</option>
                      <option value="5000-8000">$5,000 – $8,000</option>
                      <option value="8000+">$8,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClasses}>Timeline</label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className={inputClasses}
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP (this week)</option>
                      <option value="2-weeks">Within 2 weeks</option>
                      <option value="1-month">Within a month</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className={labelClasses}>Tell us about your project</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What do you need? What's your biggest challenge right now?"
                    className={inputClasses + ' resize-none'}
                  />
                </div>

                {formStatus === 'error' && (
                  <p className="text-[#dc2626] text-sm mb-4">Something went wrong. Please try again or email us directly.</p>
                )}

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full px-8 py-4 bg-[#dc2626] text-[#FAF9F6] text-lg font-bold tracking-wide border-2 border-[#1A1A1A] shadow-[6px_6px_0px_#1A1A1A] hover:shadow-[2px_2px_0px_#1A1A1A] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 disabled:opacity-50"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Send My Project Details'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;

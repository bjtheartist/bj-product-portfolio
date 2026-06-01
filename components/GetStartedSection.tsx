import React, { useState, useEffect, useRef } from 'react';

const GetStartedSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [formStatus, setFormStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business: '',
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
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const openMailFallback = () => {
    const subject = encodeURIComponent(`New project inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      [
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        formData.business ? `Business: ${formData.business}` : null,
        '',
        formData.message || 'No additional message provided.',
      ]
        .filter(Boolean)
        .join('\n'),
    );
    window.location.href = `mailto:hello@kivarastudios.dev?subject=${subject}&body=${body}`;
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
      setFormData({ name: '', email: '', business: '', message: '' });
    } catch {
      openMailFallback();
      setFormStatus('success');
      setFormData({ name: '', email: '', business: '', message: '' });
    }
  };

  const inputClasses =
    'w-full bg-transparent border-b border-[#f5f2eb]/30 text-[#f5f2eb] placeholder-[#f5f2eb]/35 focus:border-[#f5f2eb] focus:outline-none transition-colors duration-300 text-base py-3 font-light';
  const labelClasses =
    'block text-[10px] uppercase tracking-[0.28em] font-medium text-[#f5f2eb]/55 mb-2';

  return (
    <section
      ref={sectionRef}
      id="get-started"
      className="relative py-20 md:py-32 px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28 bg-[#1c1a17] text-[#f5f2eb]"
    >
      <div
        className="max-w-3xl transition-opacity duration-1000"
        style={{ opacity: isVisible ? 1 : 1 }}
      >
        <p className="flex items-baseline gap-5 sm:gap-6 text-[10px] sm:text-[11px] tracking-[0.32em] uppercase text-[#f5f2eb]/55 mb-8">
          <span>IV.</span>
          <span>Start a project</span>
        </p>

        <h2
          className="text-[#f5f2eb] leading-[1.05] tracking-[-0.01em] mb-10"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
            fontWeight: 400,
          }}
        >
          Let's talk.
        </h2>

        <p className="text-base text-[#f5f2eb]/68 max-w-lg mb-10 md:mb-14 font-light leading-relaxed">
          Tell us a little about your business and what you need. We reply
          within a working day — no sales pitch, just an honest read on
          whether we're the right fit.
        </p>

        {formStatus === 'success' ? (
          <div className="py-12">
            <p
              className="text-[#f5f2eb] mb-3"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.25rem, 2.4vw, 1.75rem)',
                fontWeight: 400,
              }}
            >
              Thank you — we've got your note.
            </p>
            <p className="text-sm text-[#f5f2eb]/60 font-light">
              We'll be in touch within a working day.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <label htmlFor="name" className={labelClasses}>
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="email" className={labelClasses}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
            </div>

            <div>
              <label htmlFor="business" className={labelClasses}>
                Business
              </label>
              <input
                id="business"
                type="text"
                name="business"
                value={formData.business}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="message" className={labelClasses}>
                What do you need?
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                className={inputClasses + ' resize-none'}
              />
            </div>

            {formStatus === 'error' && (
              <p className="text-sm text-[#f5f2eb]/70 font-light">
                Something went wrong. Try again, or write us at
                hello@kivarastudios.dev.
              </p>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="group inline-flex items-center gap-3 text-[11px] tracking-[0.28em] uppercase font-medium text-[#f5f2eb] disabled:opacity-50"
              >
                <span className="border-b border-[#f5f2eb] pb-1">
                  {formStatus === 'submitting' ? 'Sending' : 'Send'}
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default GetStartedSection;

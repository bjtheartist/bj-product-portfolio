import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { SITE_CONFIG, SOCIAL_LINKS } from '../constants';

const Contact: React.FC = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // @ts-ignore
    const gsap = window.gsap;
    // @ts-ignore
    const ScrollTrigger = window.ScrollTrigger;
    
    if (gsap && ScrollTrigger) {
      gsap.fromTo('.contact-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#contact',
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.contact-content',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#contact',
            start: 'top 70%',
          }
        }
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="relative py-32 md:py-40 bg-black overflow-hidden">
      {/* Background Accent */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-amber-400/5 to-transparent pointer-events-none" />

      <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <span className="text-xs tracking-[0.3em] uppercase text-amber-400 mb-4 block">
            Get in Touch
          </span>
          <h2 
            className="contact-title text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Let's Work<br />Together
          </h2>
        </div>

        <div className="contact-content grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Info */}
          <div>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-12">
              Have a project in mind? I'd love to hear about it. Let's discuss 
              how we can bring your vision to life.
            </p>

            {/* Contact Info */}
            <div className="space-y-8 mb-12">
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-2">
                  Email
                </p>
                <a 
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-xl md:text-2xl font-bold text-white hover:text-amber-400 transition-colors"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {SITE_CONFIG.email}
                </a>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-2">
                  Location
                </p>
                <p 
                  className="text-xl md:text-2xl font-bold text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {SITE_CONFIG.location}
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-4">
                Follow
              </p>
              <div className="flex gap-6">
                <a 
                  href={SOCIAL_LINKS.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm tracking-[0.1em] uppercase text-white/60 hover:text-amber-400 transition-colors"
                >
                  Instagram
                </a>
                <a 
                  href={SOCIAL_LINKS.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm tracking-[0.1em] uppercase text-white/60 hover:text-amber-400 transition-colors"
                >
                  LinkedIn
                </a>
                <a 
                  href={SOCIAL_LINKS.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm tracking-[0.1em] uppercase text-white/60 hover:text-amber-400 transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="contact-content">
            {status === 'success' ? (
              <div className="py-16 text-center">
                <p className="text-3xl font-black text-white mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  Thank You
                </p>
                <p className="text-base text-white/60 mb-8">
                  I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-xs tracking-[0.2em] uppercase text-amber-400 hover:text-amber-300 transition-colors"
                >
                  [Send Another Message]
                </button>
              </div>
            ) : status === 'error' ? (
              <div className="py-16 text-center">
                <p className="text-3xl font-black text-red-500 mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  Oops
                </p>
                <p className="text-base text-white/60 mb-8">
                  {errorMessage}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-xs tracking-[0.2em] uppercase text-amber-400 hover:text-amber-300 transition-colors"
                >
                  [Try Again]
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label 
                      htmlFor="name"
                      className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-3"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-white text-base placeholder-white/30 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor="email"
                      className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-3"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-white text-base placeholder-white/30 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <label 
                    htmlFor="message"
                    className="block text-xs tracking-[0.2em] uppercase text-white/40 mb-3"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell me about your project..."
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/20 text-white text-base placeholder-white/30 focus:outline-none focus:border-amber-400 resize-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className={`group inline-flex items-center gap-4 px-8 py-4 bg-amber-400 text-black text-sm font-bold tracking-[0.1em] uppercase transition-all duration-300 hover:bg-amber-300 ${
                    status === 'sending' ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

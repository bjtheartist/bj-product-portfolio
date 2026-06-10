import React, { useState } from 'react';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', business: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const mailtoFallback = () => {
    const subject = encodeURIComponent(`New project inquiry from ${form.name}`);
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        form.business ? `Business: ${form.business}` : null,
        '',
        form.message || 'No additional message provided.',
      ]
        .filter((line): line is string => line !== null)
        .join('\n'),
    );
    window.location.href = `mailto:hello@kivarastudios.dev?subject=${subject}&body=${body}`;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'intake', ...form }),
      });
      if (!res.ok) throw new Error('send failed');
      setStatus('sent');
      setForm({ name: '', email: '', business: '', message: '' });
    } catch {
      mailtoFallback();
      setStatus('sent');
      setForm({ name: '', email: '', business: '', message: '' });
    }
  };

  return (
    <section className="contact sect" id="contact">
      <div className="sect__head">
        <span className="t-mono">(04) — Contact</span>
        <span className="t-mono" style={{ color: 'var(--ember)' }}>Taking projects for 2026</span>
      </div>

      <h2 className="contact__title">
        Let's build something
        <br />
        <span className="it">worth remembering.</span>
      </h2>

      <div className="contact__grid">
        <div className="contact__aside">
          <p>
            Tell us a little about your business and what you're trying to do.
            We reply to every inquiry within 24 hours — usually with a few
            questions, sometimes with a plan.
          </p>
          <a className="contact__email" href="mailto:hello@kivarastudios.dev">
            hello@kivarastudios.dev
          </a>
          <p className="t-mono" style={{ color: 'var(--bone-35)' }}>
            Chicago, IL — Working worldwide
          </p>
        </div>

        <form onSubmit={onSubmit} noValidate={false}>
          <div className="form__row">
            <div className="field">
              <label htmlFor="c-name">Name</label>
              <input
                id="c-name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                value={form.name}
                onChange={onChange}
                autoComplete="name"
              />
            </div>
            <div className="field">
              <label htmlFor="c-email">Email</label>
              <input
                id="c-email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                value={form.email}
                onChange={onChange}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="c-business">Business / Project</label>
            <input
              id="c-business"
              name="business"
              type="text"
              placeholder="What you do (optional)"
              value={form.business}
              onChange={onChange}
              autoComplete="organization"
            />
          </div>

          <div className="field">
            <label htmlFor="c-message">Message</label>
            <textarea
              id="c-message"
              name="message"
              required
              rows={4}
              placeholder="What are you trying to build?"
              value={form.message}
              onChange={onChange}
            />
          </div>

          <button className="btn-send" type="submit" disabled={status === 'sending'}>
            <span className="dot" />
            {status === 'sending'
              ? 'Sending…'
              : status === 'sent'
                ? 'Received — talk soon'
                : 'Send inquiry'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

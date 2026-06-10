import React, { useEffect, useState } from 'react';
import { SOCIAL_LINKS } from '../../constants';

const chicagoTime = () =>
  new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/Chicago',
  }).format(new Date());

const StudioFooter: React.FC = () => {
  const [time, setTime] = useState(chicagoTime);

  useEffect(() => {
    const id = setInterval(() => setTime(chicagoTime()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="footer">
      <div className="footer__cols">
        <div className="footer__col">
          <span className="t-mono">Sitemap</span>
          <a href="#work">Work</a>
          <a href="#studio">Studio</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer__col">
          <span className="t-mono">Socials</span>
          <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer">Instagram</a>
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
        <div className="footer__col">
          <span className="t-mono">Studio</span>
          <a href="mailto:hello@kivarastudios.dev">hello@kivarastudios.dev</a>
          <span style={{ color: 'var(--bone-50)', fontWeight: 300, fontSize: '0.95rem' }}>
            Chicago, IL — {time} CT
          </span>
        </div>
      </div>

      <div className="footer__mark" aria-hidden="true">KIVARA</div>

      <div className="footer__legal t-mono">
        <span>&copy; {new Date().getFullYear()} Kivara Studios&reg;</span>
        <span>Designed &amp; built in-house, Chicago</span>
      </div>
    </footer>
  );
};

export default StudioFooter;

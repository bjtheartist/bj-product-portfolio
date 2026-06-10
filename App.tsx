import React, { useEffect, useState } from 'react';
import './styles/studio.css';
import useLenis from './components/studio/useLenis';
import Loader from './components/studio/Loader';
import Nav from './components/studio/Nav';
import Hero from './components/studio/Hero';
import Marquee from './components/studio/Marquee';
import Manifesto from './components/studio/Manifesto';
import Works from './components/studio/Works';
import Services from './components/studio/Services';
import Contact from './components/studio/Contact';
import StudioFooter from './components/studio/StudioFooter';
import Cursor from './components/studio/Cursor';

const App: React.FC = () => {
  const [ready, setReady] = useState(false);
  useLenis(ready);

  useEffect(() => {
    document.documentElement.classList.add('studio');
    document.documentElement.classList.remove('light');
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    return () => document.documentElement.classList.remove('studio');
  }, []);

  return (
    <div className="grain">
      <Loader onComplete={() => setReady(true)} />
      <Cursor />
      <Nav />

      <main>
        <Hero ready={ready} />
        <Marquee />
        <Manifesto />
        <Works />
        <Services />
        <Contact />
      </main>

      <StudioFooter />
    </div>
  );
};

export default App;

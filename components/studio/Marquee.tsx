import React from 'react';

const ITEMS = [
  { text: 'Web Design', alt: false },
  { text: 'brand systems', alt: true },
  { text: 'Development', alt: false },
  { text: 'content strategy', alt: true },
  { text: 'Product Design', alt: false },
  { text: 'e-commerce', alt: true },
];

const Chunk: React.FC<{ hidden?: boolean }> = ({ hidden }) => (
  <div className="marquee__chunk" aria-hidden={hidden || undefined}>
    {ITEMS.map((item, i) => (
      <React.Fragment key={i}>
        <span className={`marquee__item${item.alt ? ' alt' : ''}`}>{item.text}</span>
        <span className="marquee__dot" />
      </React.Fragment>
    ))}
  </div>
);

const Marquee: React.FC = () => (
  <div className="marquee">
    <div className="marquee__track">
      <Chunk />
      <Chunk hidden />
    </div>
  </div>
);

export default Marquee;

import React, { useEffect, useRef } from 'react';
import { Project } from '../../types';

interface CaseStudyProps {
  project: Project;
  index: number;
  onClose: () => void;
}

/**
 * Case study overlay — dark editorial sheet.
 * Breaks a project down: situation → architecture → outcome.
 */
const CaseStudy: React.FC<CaseStudyProps> = ({ project, index, onClose }) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    // move focus into the dialog
    panelRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const num = String(index + 1).padStart(2, '0');

  return (
    <div className="cs" role="dialog" aria-modal="true" aria-label={`${project.title} case study`} onClick={onClose}>
      <div className="cs__backdrop" />

      <div
        ref={panelRef}
        className="cs__panel"
        data-lenis-prevent
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="cs__close" onClick={onClose} aria-label="Close case study">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Hero image */}
        <div className="cs__media">
          <img src={project.imageUrl} alt={project.title} loading="lazy" />
        </div>

        <div className="cs__body">
          {/* Meta */}
          <div className="cs__meta t-mono">
            <span>/{num}</span>
            <span>{project.category}</span>
            {project.year && <span>{project.year}</span>}
          </div>

          <h2 className="cs__title t-display">{project.title}</h2>

          <p className="cs__lede">{project.description}</p>

          {/* The situation */}
          {project.problem && (
            <section className="cs__section">
              <h3 className="cs__label t-mono">(A) — The situation</h3>
              <p className="cs__text">{project.problem}</p>
            </section>
          )}

          {/* Architecture — how it's built and why */}
          {project.tools && project.tools.length > 0 && (
            <section className="cs__section">
              <h3 className="cs__label t-mono">(B) — Architecture</h3>
              <div className="cs__arch">
                {project.tools.map((tool, i) => (
                  <div className="cs__arch-row" key={tool.name}>
                    <span className="cs__arch-idx t-mono">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <span className="cs__arch-name">{tool.name}</span>
                      <p className="cs__arch-why">{tool.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Outcome */}
          {project.effectiveness && (
            <section className="cs__section">
              <h3 className="cs__label t-mono">(C) — Where it landed</h3>
              <p className="cs__text">{project.effectiveness.description}</p>
              {project.effectiveness.metrics && project.effectiveness.metrics.length > 0 && (
                <ul className="cs__metrics">
                  {project.effectiveness.metrics.map((m) => (
                    <li className="t-mono" key={m}>{m}</li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* Footer — visit + tags */}
          <footer className="cs__footer">
            {(project.liveUrl || project.githubUrl) && (
              <a
                className="cs__visit"
                href={project.liveUrl || project.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                <span className="t-mono">Visit {project.liveUrl ? 'site' : 'repo'}</span>
                <span aria-hidden="true">→</span>
              </a>
            )}
            {project.tags && project.tags.length > 0 && (
              <div className="cs__tags t-mono">
                {project.tags.join(' · ')}
              </div>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;

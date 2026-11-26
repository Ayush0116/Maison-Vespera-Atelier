import React, { useRef, useEffect } from 'react';
import { heroContent } from '../data/heroContent.js';
import { scrollToSection } from '../utils/scrollToSection.js';
import { ImageSlot } from '../components/ImageSlot.jsx';
import { Icon } from '../components/Icon.jsx';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import './HeroSection.css';

export function HeroSection() {
  const stageRef = useRef(null);
  const isReduced = useReducedMotion();

  // Signature Moment 1: Desktop pointer parallax and depth drift
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || isReduced || typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let rafId = null;

    const onPointerMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        const xOffset = (e.clientX / innerWidth - 0.5) * 2;
        const yOffset = (e.clientY / innerHeight - 0.5) * 2;

        stage.style.setProperty('--hero-px', `${xOffset * 15}px`);
        stage.style.setProperty('--hero-py', `${yOffset * 15}px`);
        stage.style.setProperty('--hero-rot', `${xOffset * 2}deg`);
      });
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isReduced]);

  return (
    <section id="top" className="hero-section" aria-label="Welcome to Maison Vespera">
      <div className="container hero-container">
        {/* Left Editorial Copy */}
        <div className="hero-text-block">
          <span className="hero-eyebrow">
            <span className="eyebrow-accent-dot" aria-hidden="true" />
            {heroContent.eyebrow}
          </span>

          <h1 className="hero-title">
            <span className="hero-line">{heroContent.titleLine1}</span>
            <span className="hero-line hero-line-accent">{heroContent.titleLine2}</span>
          </h1>

          <p className="hero-description">{heroContent.description}</p>

          <div className="hero-cta-group">
            <button
              type="button"
              className="hero-primary-btn"
              onClick={() => scrollToSection(heroContent.primaryCta.targetId)}
            >
              <span>{heroContent.primaryCta.label}</span>
              <Icon name="ArrowRight" size={16} />
            </button>

            <button
              type="button"
              className="hero-secondary-btn"
              onClick={() => scrollToSection(heroContent.secondaryCta.targetId)}
            >
              <span>{heroContent.secondaryCta.label}</span>
              <Icon name="Compass" size={16} />
            </button>
          </div>
        </div>

        {/* Right 3D Photographic Multi-Layer Composition (Signature Moment 1) */}
        <div ref={stageRef} className="hero-stage-wrapper perspective-stage">
          {/* Back architectural arch frame */}
          <div className="hero-layer hero-layer-back">
            <div className="hero-photo-arch">
              <ImageSlot
                imageKey="hero-01"
                aspect="4:5"
                priority={true}
                className="hero-img-slot"
              />
            </div>
          </div>

          {/* Floating offset portrait frame */}
          <div className="hero-layer hero-layer-mid">
            <div className="hero-photo-offset">
              <ImageSlot
                imageKey="hero-02"
                aspect="1:1"
                priority={true}
                className="hero-img-slot"
              />
              <div className="hero-layer-badge">
                <Icon name="Sparkles" size={14} />
                <span>Haute Hair Atelier</span>
              </div>
            </div>
          </div>

          {/* Foreground botanical detail frame */}
          <div className="hero-layer hero-layer-front">
            <div className="hero-photo-foreground">
              <ImageSlot
                imageKey="hero-03"
                aspect="4:5"
                priority={true}
                className="hero-img-slot"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Strip (Continuous Slow Marquee) */}
      <div className="highlights-strip-wrapper" aria-label="Key atelier highlights">
        <div className="marquee-track">
          {[...heroContent.highlights, ...heroContent.highlights].map((item, idx) => (
            <div
              key={idx}
              className="highlight-chip"
              aria-hidden={idx >= heroContent.highlights.length ? "true" : undefined}
            >
              <Icon name={item.icon} size={16} className="highlight-icon" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

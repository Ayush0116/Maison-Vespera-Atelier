import React from 'react';
import { scrollToSection } from '../utils/scrollToSection.js';
import { ImageSlot } from '../components/ImageSlot.jsx';
import { Icon } from '../components/Icon.jsx';
import './ClosingCtaBand.css';

export function ClosingCtaBand() {
  return (
    <section className="closing-cta-band" aria-label="Closing Call to Action">
      <div className="closing-cta-background">
        <ImageSlot
          imageKey="cta-band-visual"
          aspect="21:9"
          className="cta-bg-img"
        />
        <div className="cta-gradient-overlay" />
      </div>

      <div className="container closing-cta-content">
        <span className="cta-band-eyebrow">An Intimate Sanctuary Experience</span>
        <h2 className="cta-band-title">Your Transformation Begins with a Single Quiet Breath.</h2>
        <p className="cta-band-text">
          Reserve your couture consultation, bridal trial, or restorative scalp ritual today.
        </p>

        <button
          type="button"
          className="cta-band-btn"
          onClick={() => scrollToSection('booking')}
        >
          <span>Reserve Your Appointment</span>
          <Icon name="ArrowRight" size={16} />
        </button>
      </div>
    </section>
  );
}

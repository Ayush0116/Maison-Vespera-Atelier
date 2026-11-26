import React, { useState } from 'react';
import { testimonials } from '../data/testimonials.js';
import { SectionHeading } from '../components/SectionHeading.jsx';
import { SampleBadge } from '../components/SampleBadge.jsx';
import { Icon } from '../components/Icon.jsx';
import './TestimonialsSection.css';

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  if (testimonials.length === 0) return null;

  const handlePrev = () => {
    setActiveIndex(prev => (prev > 0 ? prev - 1 : testimonials.length - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev < testimonials.length - 1 ? prev + 1 : 0));
  };

  const current = testimonials[activeIndex];

  return (
    <section id="testimonials" className="testimonials-section" aria-label="Client Praise & Reflections">
      <div className="container">
        <SectionHeading
          eyebrow="Sanctuary Reflections"
          title="In the Words of Our Guests"
          subtitle="Genuine impressions from brides, artists, and patrons who entrusted their monumental occasions to our care."
          centered={true}
        />

        <div className="testimonial-stage" role="region" aria-roledescription="carousel" aria-label="Testimonials Carousel">
          <div className="testimonial-quote-mark" aria-hidden="true">“</div>

          <div className="testimonial-card">
            <blockquote className="testimonial-quote">
              <p>"{current.quote}"</p>
            </blockquote>

            <div className="testimonial-author">
              <div className="author-info">
                <cite className="author-name">{current.name}</cite>
                <span className="author-context">{current.context}</span>
              </div>
              {current.isSample && <SampleBadge />}
            </div>
          </div>

          {/* Carousel Controls */}
          {testimonials.length > 1 && (
            <div className="testimonial-controls">
              <button
                type="button"
                className="t-nav-btn"
                onClick={handlePrev}
                aria-label="Previous testimonial"
              >
                <Icon name="ChevronLeft" size={20} />
              </button>

              <div className="t-dots">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`t-dot ${i === activeIndex ? 'is-active' : ''}`}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                className="t-nav-btn"
                onClick={handleNext}
                aria-label="Next testimonial"
              >
                <Icon name="ChevronRight" size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

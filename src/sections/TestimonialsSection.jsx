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

    </section>
  );
}

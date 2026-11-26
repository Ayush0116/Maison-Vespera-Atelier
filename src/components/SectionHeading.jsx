import React from 'react';
import './SectionHeading.css';

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className = ''
}) {
  return (
    <div className={`section-heading ${centered ? 'is-centered' : ''} ${className}`}>
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}

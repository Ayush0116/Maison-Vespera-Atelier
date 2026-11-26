import React from 'react';
import { siteConfig } from '../data/siteConfig.js';
import './SampleBadge.css';

export function SampleBadge({ className = '' }) {
  if (!siteConfig.demoMode) return null;
  return (
    <span className={`sample-badge ${className}`} title="Demonstration portfolio content">
      Sample
    </span>
  );
}

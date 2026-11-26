import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data/siteConfig.js';
import './IntroOverlay.css';

export function IntroOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!siteConfig.features.introOverlay) return;
    
    // Check session storage to show only once per user session
    try {
      if (sessionStorage.getItem('mv_intro_shown')) {
        return;
      }
      sessionStorage.setItem('mv_intro_shown', 'true');
    } catch {
      // Ignore storage errors in private browsing
    }

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 1100); // Strict under 1.2s maximum

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="intro-overlay" role="presentation" aria-hidden="true">
      <div className="intro-content">
        <h2 className="intro-brand">{siteConfig.name}</h2>
        <p className="intro-tagline">{siteConfig.tagline}</p>
        <div className="intro-line">
          <div className="intro-line-progress" />
        </div>
      </div>
    </div>
  );
}

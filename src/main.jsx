import React from 'react';
import { createRoot } from 'react-dom/client';
import { theme } from './data/theme.js';
import { siteConfig } from './data/siteConfig.js';
import App from './App.jsx';

// Core Stylesheet architecture
import './styles/reset.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/depth.css';
import './styles/motion.css';
import { runDevAudit } from './utils/audit.js';

/**
 * Foundation Application:
 * 1. Writes all theme values to document.documentElement as CSS custom properties
 * 2. Injects dynamic font-face styling
 * 3. Applies data-motion attribute
 * 4. Mounts single React root
 */
function applyThemeAndMount() {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;

    // Apply Brand Color Palette
    Object.entries(theme.colors).forEach(([key, val]) => {
      root.style.setProperty(`--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, val);
    });

    // Apply Font Families
    root.style.setProperty('--font-display', theme.fonts.display.family);
    root.style.setProperty('--font-body', theme.fonts.body.family);

    // Apply Radii & Shadows
    Object.entries(theme.radii).forEach(([key, val]) => {
      root.style.setProperty(`--radius-${key}`, val);
    });
    Object.entries(theme.shadows).forEach(([key, val]) => {
      root.style.setProperty(`--shadow-${key}`, val);
    });

    // Set motion intensity attribute
    root.setAttribute('data-motion', theme.motionIntensity || 'full');

    // Dynamically inject Google Fonts link if font files are fallback
    if (theme.fonts.display.googleUrl) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = theme.fonts.display.googleUrl;
      document.head.appendChild(link);
    }

    // Set page title and meta description
    document.title = siteConfig.seo.title;
  }

  const container = document.getElementById('root');
  if (container) {
    runDevAudit();
    const reactRoot = createRoot(container);
    reactRoot.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}

applyThemeAndMount();

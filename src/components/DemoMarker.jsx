import React, { useState } from 'react';
import { siteConfig } from '../data/siteConfig.js';
import { Icon } from './Icon.jsx';
import './DemoMarker.css';

export function DemoMarker() {
  const [dismissed, setDismissed] = useState(false);

  if (!siteConfig.demoMode || dismissed) return null;

  return (
    <aside className="demo-marker-bar" aria-label="Template Demonstration Preview">
      <div className="demo-marker-inner">
        <span className="demo-marker-dot" aria-hidden="true" />
        <span className="demo-marker-text">
          <strong>Agency Template Preview</strong> · Client details, photos &amp; branding update via data files.
        </span>
        <button
          type="button"
          className="demo-marker-dismiss"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss demo banner"
        >
          <Icon name="X" size={14} />
        </button>
      </div>
    </aside>
  );
}

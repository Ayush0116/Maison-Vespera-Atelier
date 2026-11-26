import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data/siteConfig.js';
import { scrollToSection } from '../utils/scrollToSection.js';
import { isDummyValue } from '../utils/demo.js';
import { useToast } from '../context/ToastContext.jsx';
import { Icon } from './Icon.jsx';
import './MobileActionBar.css';

export function MobileActionBar({ visibleSections = [] }) {
  const [show, setShow] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const onScroll = () => {
      // Appear after scrolling past the hero (roughly 500px)
      setShow(window.scrollY > 450);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleCall = (e) => {
    if (isDummyValue(siteConfig.phone)) {
      e.preventDefault();
      showToast("Demo preview: this will connect directly to the salon call desk once real details are added.");
    }
  };

  const handleWhatsApp = (e) => {
    if (isDummyValue(siteConfig.whatsapp)) {
      e.preventDefault();
      showToast("Demo preview: this will open the salon's verified WhatsApp concierge.");
    }
  };

  if (!show) return null;

  return (
    <nav className="mobile-action-bar" aria-label="Quick mobile booking and contact actions">
      <div className="mobile-action-inner">
        {/* Book Button */}
        <button
          type="button"
          className="mobile-action-btn action-book"
          onClick={() => scrollToSection(visibleSections.includes('booking') ? 'booking' : 'contact')}
        >
          <Icon name="Sparkles" size={18} />
          <span>Book</span>
        </button>

        {/* Call Button */}
        <a
          href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
          className="mobile-action-btn action-call"
          onClick={handleCall}
          aria-label={`Call ${siteConfig.name}`}
        >
          <Icon name="Phone" size={18} />
          <span>Call</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${siteConfig.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-action-btn action-whatsapp"
          onClick={handleWhatsApp}
          aria-label={`Message ${siteConfig.name} on WhatsApp`}
        >
          <Icon name="MessageCircle" size={18} />
          <span>WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}

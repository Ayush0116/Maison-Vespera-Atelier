import React from 'react';
import { siteConfig } from '../data/siteConfig.js';
import { isDummyValue } from '../utils/demo.js';
import { useToast } from '../context/ToastContext.jsx';
import { Icon } from './Icon.jsx';
import './FloatingContact.css';

export function FloatingContact() {
  const { showToast } = useToast();

  if (!siteConfig.features.floatingContact) return null;

  const handleClick = (e) => {
    if (isDummyValue(siteConfig.whatsapp)) {
      e.preventDefault();
      showToast("Demo preview: this opens the salon concierge WhatsApp channel in live mode.");
    }
  };

  return (
    <div className="floating-contact-container">
      <a
        href={`https://wa.me/${siteConfig.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-contact-btn"
        onClick={handleClick}
        aria-label="Direct WhatsApp Concierge"
      >
        <Icon name="MessageCircle" size={24} />
        <span className="floating-contact-tooltip">Direct Concierge</span>
      </a>
    </div>
  );
}

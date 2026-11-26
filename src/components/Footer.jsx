import React from 'react';
import { siteConfig } from '../data/siteConfig.js';
import { navigationItems } from '../data/navigation.js';
import { services } from '../data/services.js';
import { scrollToSection } from '../utils/scrollToSection.js';
import { Icon } from './Icon.jsx';
import './Footer.css';

export function Footer({ visibleSections = [] }) {
  const currentYear = new Date().getFullYear();

  const navLinks = navigationItems.filter(item => 
    item.inFooter && (item.id === 'top' || visibleSections.includes(item.id))
  );

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-container">
        {/* Brand Column */}
        <div className="footer-col footer-col-brand">
          <a
            href="#top"
            className="footer-logo"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('top');
            }}
          >
            <span className="footer-wordmark">{siteConfig.name}</span>
            <span className="footer-submark">ATELIER</span>
          </a>
          <p className="footer-tagline">{siteConfig.tagline}</p>

          {siteConfig.demoMode && (
            <div className="footer-demo-notice">
              <span className="demo-pill">Agency Demo Template</span>
              <p>Designed for salon and parlour conversion. Customized entirely through data and asset files without code edits.</p>
            </div>
          )}
        </div>

        {/* Section Navigation Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Sanctuary Map</h4>
          <ul className="footer-links-list">
            {navLinks.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="footer-link"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Highlighted Services List */}
        <div className="footer-col">
          <h4 className="footer-heading">Signature Rituals</h4>
          <ul className="footer-links-list">
            {services.slice(0, 5).map((s) => (
              <li key={s.id}>
                <a
                  href="#services"
                  className="footer-link"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('services');
                  }}
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Hours Column */}
        <div className="footer-col">
          <h4 className="footer-heading">Direct Concierge</h4>
          <p className="footer-contact-item">{siteConfig.address.street}</p>
          <p className="footer-contact-item">{siteConfig.address.city}, {siteConfig.address.state}</p>
          <p className="footer-contact-item footer-phone">{siteConfig.phone}</p>
          <p className="footer-contact-item">{siteConfig.email}</p>

          <div className="footer-social-strip">
            {Object.entries(siteConfig.social).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label={`Visit ${siteConfig.name} on ${platform}`}
              >
                <Icon name={platform === 'instagram' ? 'Sparkles' : 'ExternalLink'} size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar with Back to Top */}
      <div className="footer-bottom-bar">
        <div className="container footer-bottom-inner">
          <p className="copyright-text">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>

          <button
            type="button"
            className="back-to-top-btn"
            onClick={() => scrollToSection('top')}
            aria-label="Scroll back to top of page"
          >
            <span>Return to Top</span>
            <Icon name="ArrowUp" size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}

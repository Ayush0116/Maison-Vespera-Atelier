import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../data/siteConfig.js';
import { navigationItems } from '../data/navigation.js';
import { scrollToSection } from '../utils/scrollToSection.js';
import { Icon } from './Icon.jsx';
import './Header.css';

export function Header({ visibleSections = [], activeSection = 'top' }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);

  // Dynamic header measurement and write to :root --header-height
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };

    updateHeaderHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeaderHeight();
    });
    if (headerRef.current) resizeObserver.observe(headerRef.current);

    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Filter navigation items matching visible enabled sections
  const navLinks = navigationItems.filter(item => 
    item.inHeader && (item.id === 'top' || visibleSections.includes(item.id))
  );

  const handleNavClick = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(prev => !prev);
  };

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={`site-header ${scrolled ? 'is-scrolled' : ''}`}
        role="banner"
      >
        <div className="header-inner container">
          {/* Logo / Wordmark (scrolls to top) */}
          <a
            href="#top"
            className="brand-logo"
            onClick={(e) => handleNavClick(e, 'top')}
            aria-label={`${siteConfig.name} - Return to top of page`}
          >
            <span className="brand-wordmark">{siteConfig.name}</span>
            <span className="brand-submark">ATELIER</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <ul className="nav-list">
              {navLinks.map((item) => (
                <li key={item.id} className="nav-item">
                  <a
                    href={`#${item.id}`}
                    className={`nav-link ${activeSection === item.id ? 'is-active' : ''}`}
                    aria-current={activeSection === item.id ? 'true' : undefined}
                    onClick={(e) => handleNavClick(e, item.id)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Action Button */}
          <div className="header-actions">
            <button
              type="button"
              className="header-cta-btn"
              onClick={() => scrollToSection(visibleSections.includes('booking') ? 'booking' : 'contact')}
            >
              <span>Book Appointment</span>
              <Icon name="ArrowRight" size={16} />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={handleMobileMenuToggle}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* In-page Mobile Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="mobile-nav-container container">
            <ul className="mobile-nav-list">
              {navigationItems
                .filter(item => item.inMobileMenu && (item.id === 'top' || visibleSections.includes(item.id)))
                .map((item) => (
                  <li key={item.id} className="mobile-nav-item">
                    <a
                      href={`#${item.id}`}
                      className={`mobile-nav-link ${activeSection === item.id ? 'is-active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileMenuOpen(false);
                        requestAnimationFrame(() => {
                          scrollToSection(item.id);
                        });
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
            </ul>

            <div className="mobile-nav-footer">
              <button
                type="button"
                className="mobile-drawer-cta"
                onClick={() => {
                  setMobileMenuOpen(false);
                  requestAnimationFrame(() => {
                    scrollToSection(visibleSections.includes('booking') ? 'booking' : 'contact');
                  });
                }}
              >
                <span>Reserve Consultation</span>
                <Icon name="Sparkles" size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data/siteConfig.js';
import { getSalonOpenStatus } from '../utils/hours.js';
import { isDummyValue } from '../utils/demo.js';
import { useToast } from '../context/ToastContext.jsx';
import { SectionHeading } from '../components/SectionHeading.jsx';
import { ImageSlot } from '../components/ImageSlot.jsx';
import { Icon } from '../components/Icon.jsx';
import './ContactSection.css';

export function ContactSection() {
  const [openStatus, setOpenStatus] = useState(getSalonOpenStatus());
  const { showToast } = useToast();

  // Refresh salon open status every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setOpenStatus(getSalonOpenStatus());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleCall = (e) => {
    if (isDummyValue(siteConfig.phone)) {
      e.preventDefault();
      showToast("Demo preview: this will connect directly to the salon reception in live mode.");
    }
  };

  const handleWhatsApp = (e) => {
    if (isDummyValue(siteConfig.whatsapp)) {
      e.preventDefault();
      showToast("Demo preview: this will open direct WhatsApp messaging with the salon concierge.");
    }
  };

  const handleDirections = (e) => {
    if (isDummyValue(siteConfig.address.full)) {
      e.preventDefault();
      showToast("Demo preview: this will navigate directly via Google Maps once the physical address is configured.");
    }
  };

  const encodedAddress = encodeURIComponent(siteConfig.address.full);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <section id="contact" className="contact-section" aria-label="Location and Contact">
      <div className="container">
        <SectionHeading
          eyebrow="Sanctuary Location"
          title="Visit the Atelier"
          subtitle="Conveniently situated in Richmond Quarter, Bengaluru. Designed as an acoustically tranquil retreat from the city."
        />

        <div className="contact-layout-grid">
          {/* Left Details & Hours */}
          <div className="contact-info-col">
            {/* Live Open Status Indicator */}
            <div className={`open-indicator-pill ${openStatus.isOpen ? 'is-open' : 'is-closed'}`}>
              <span className="open-dot" aria-hidden="true" />
              <span>{openStatus.statusText}</span>
            </div>

            {/* Address & Quick Links */}
            <div className="contact-address-block">
              <h3 className="contact-subhead">Address &amp; Arrival</h3>
              <p className="contact-street">{siteConfig.address.street}</p>
              <p className="contact-locality">{siteConfig.address.locality}</p>
              <p className="contact-city">{siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.postalCode}</p>

              <div className="contact-actions-row">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-action-link"
                  onClick={handleDirections}
                >
                  <Icon name="MapPin" size={16} />
                  <span>Get Directions</span>
                  <Icon name="ExternalLink" size={13} />
                </a>

                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                  className="contact-action-link"
                  onClick={handleCall}
                >
                  <Icon name="Phone" size={16} />
                  <span>{siteConfig.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-action-link"
                  onClick={handleWhatsApp}
                >
                  <Icon name="MessageCircle" size={16} />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>

            {/* Weekly Hours Table */}
            <div className="opening-hours-card">
              <h4 className="hours-subhead">Atelier Hours ({siteConfig.timeZone})</h4>
              <table className="hours-table">
                <tbody>
                  {Object.entries(siteConfig.openingHours).map(([day, slots]) => {
                    const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
                    const isToday = todayName === day;
                    return (
                      <tr key={day} className={isToday ? 'is-today' : ''}>
                        <td className="day-name">
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                          {isToday && <span className="today-marker">Today</span>}
                        </td>
                        <td className="day-time">
                          {slots.length > 0 ? `${slots[0].open} – ${slots[0].close}` : 'Closed'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Photographic Location Frame */}
          <div className="contact-visual-col">
            <div className="location-photo-frame card-depth">
              <ImageSlot
                imageKey="location-visual"
                aspect="4:3"
                className="location-img"
              />
              <div className="location-caption-overlay">
                <h4 className="location-title">Lavelle Crescent Sanctuary</h4>
                <p className="location-desc">Valet parking available for all bridal and day-long transformation bookings.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

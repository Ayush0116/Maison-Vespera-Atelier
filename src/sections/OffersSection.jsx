import React from 'react';
import { offers } from '../data/offers.js';
import { siteConfig } from '../data/siteConfig.js';
import { useBooking } from '../context/BookingContext.jsx';
import { SectionHeading } from '../components/SectionHeading.jsx';
import { ImageSlot } from '../components/ImageSlot.jsx';
import { Icon } from '../components/Icon.jsx';
import './OffersSection.css';

export function OffersSection() {
  const { requestBooking } = useBooking();

  // Filter out disabled or expired packages
  const activeOffers = offers.filter(o => {
    if (!o.enabled) return false;
    if (o.endsOn) {
      const expiry = new Date(o.endsOn).getTime();
      const now = new Date().getTime();
      if (now > expiry) return false;
    }
    return true;
  });

  if (activeOffers.length === 0) return null;

  const formatPrice = (amount) => {
    if (!amount || !siteConfig.showPrices) return "Enquire for package pricing";
    return new Intl.NumberFormat(siteConfig.locale, {
      style: 'currency',
      currency: siteConfig.currency,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section id="offers" className="offers-section" aria-label="Curated Salon Packages">
      <div className="container">
        <SectionHeading
          eyebrow="Special Curations"
          title="Bespoke Packages & Seasonal Edits"
          subtitle="All-inclusive seasonal beauty rituals and signature multi-day bridal suites crafted for effortless grandeur."
        />

        <div className="offers-editorial-stack">
          {activeOffers.map((offer, idx) => (
            <div
              key={offer.id}
              className={`offer-editorial-card ${idx % 2 === 1 ? 'is-reversed' : ''} card-depth`}
            >
              <div className="offer-media-col">
                <ImageSlot
                  imageKey={offer.imageKey}
                  aspect="3:2"
                  className="offer-img"
                />
              </div>

              <div className="offer-content-col">
                <div className="offer-header">
                  <span className="offer-badge">{offer.type} edit</span>
                  {offer.endsOn && (
                    <span className="offer-validity">
                      Valid through {new Date(offer.endsOn).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  )}
                </div>

                <h3 className="offer-title">{offer.name}</h3>
                <p className="offer-description">{offer.description}</p>

                <div className="offer-inclusions">
                  <span className="inclusions-label">Package Inclusions:</span>
                  <ul className="inclusions-list">
                    {offer.inclusions.map((item, i) => (
                      <li key={i} className="inclusion-item">
                        <Icon name="Check" size={14} className="inclusion-check" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="offer-footer">
                  <div className="offer-pricing">
                    <span className="offer-price-val">{formatPrice(offer.price)}</span>
                    <span className="offer-price-note">All taxes included</span>
                  </div>

                  <button
                    type="button"
                    className="offer-reserve-btn"
                    onClick={() => requestBooking({ serviceId: offer.serviceId })}
                  >
                    <span>Reserve Package</span>
                    <Icon name="ArrowRight" size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

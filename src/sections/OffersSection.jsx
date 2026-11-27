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

    </section>
  );
}

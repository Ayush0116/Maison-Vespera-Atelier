import React, { useState, useMemo } from 'react';
import { services } from '../data/services.js';
import { siteConfig } from '../data/siteConfig.js';
import { useBooking } from '../context/BookingContext.jsx';
import { SectionHeading } from '../components/SectionHeading.jsx';
import { ImageSlot } from '../components/ImageSlot.jsx';
import { Icon } from '../components/Icon.jsx';
import { usePointerTilt } from '../hooks/usePointerTilt.js';
import './ServicesSection.css';

function ServiceCard({ service, onSelect, activeIndex, index }) {
  const { requestBooking } = useBooking();
  const tiltRef = usePointerTilt({ maxTilt: 6 });

  const formatPrice = (amount) => {
    if (!amount || !siteConfig.showPrices) return "Enquire for pricing";
    return new Intl.NumberFormat(siteConfig.locale, {
      style: 'currency',
      currency: siteConfig.currency,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const offset = index - activeIndex;

  return (
    <div
      ref={tiltRef}
      className={`service-showcase-card ${index === activeIndex ? 'is-active' : ''}`}
      style={{
        '--offset': offset,
        '--abs-offset': Math.abs(offset)
      }}
      onClick={() => onSelect(service)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(service);
        }
      }}
      aria-label={`View details for ${service.name}`}
    >
      <div className="service-card-media">
        <ImageSlot
          imageKey={service.imageKey}
          aspect="4:5"
          className="service-card-img"
        />
        {service.duration && (
          <span className="service-card-duration">
            <Icon name="Clock" size={13} />
            {service.duration}
          </span>
        )}
      </div>

      <div className="service-card-body">
        <span className="service-card-category">{service.category}</span>
        <h3 className="service-card-title">{service.name}</h3>
        <p className="service-card-summary">{service.summary}</p>

        <div className="service-card-footer">
          <span className="service-card-price">{formatPrice(service.price)}</span>
          <button
            type="button"
            className="service-book-action"
            onClick={(e) => {
              e.stopPropagation();
              requestBooking({ serviceId: service.id });
            }}
            aria-label={`Book ${service.name}`}
          >
            <span>Book</span>
            <Icon name="ArrowRight" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ServicesSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [detailModalService, setDetailModalService] = useState(null);
  const { requestBooking } = useBooking();

  // Extract distinct categories present in active services
  const categories = useMemo(() => {
    const cats = ["All", ...new Set(services.filter(s => s.enabled).map(s => s.category))];
    return cats;
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter(s => {
      if (!s.enabled) return false;
      if (selectedCategory === "All") return true;
      return s.category === selectedCategory;
    });
  }, [selectedCategory]);

  const handlePrev = () => {
    setActiveCardIndex(prev => (prev > 0 ? prev - 1 : filteredServices.length - 1));
  };

  const handleNext = () => {
    setActiveCardIndex(prev => (prev < filteredServices.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="services" className="services-section" aria-label="Atelier Services">
      <div className="container">
        <SectionHeading
          eyebrow="The Atelier Repertoire"
          title="Curated Rituals & Haute Craft"
          subtitle="Explore our specialized services across bridal artistry, bespoke color palettes, biological skin therapies, and tranquil spa decompressions."
          centered={true}
        />

        {/* Category Tabs (ARIA Tablist) */}
        <div className="category-tablist" role="tablist" aria-label="Filter services by category">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={selectedCategory === cat}
              className={`category-tab-btn ${selectedCategory === cat ? 'is-active' : ''}`}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveCardIndex(0);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Service Showcase Stage (Signature Moment 3) */}
        <div className="service-showcase-stage perspective-stage">
          <div className="showcase-card-track" style={{ '--count': filteredServices.length }}>
            {filteredServices.map((service, idx) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={idx}
                activeIndex={activeCardIndex}
                onSelect={(s) => setDetailModalService(s)}
              />
            ))}
          </div>

          {/* Carousel Controls */}
          {filteredServices.length > 1 && (
            <div className="showcase-controls">
              <button
                type="button"
                className="showcase-arrow-btn"
                onClick={handlePrev}
                aria-label="Previous service"
              >
                <Icon name="ChevronLeft" size={20} />
              </button>

              <span className="showcase-counter">
                {activeCardIndex + 1} / {filteredServices.length}
              </span>

              <button
                type="button"
                className="showcase-arrow-btn"
                onClick={handleNext}
                aria-label="Next service"
              >
                <Icon name="ChevronRight" size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* In-page Service Detail Modal Layer */}
      {detailModalService && (
        <div
          className="service-detail-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="detail-title"
        >
          <div className="service-detail-card card-depth">
            <button
              type="button"
              className="detail-close-btn"
              onClick={() => setDetailModalService(null)}
              aria-label="Close service details"
            >
              <Icon name="X" size={20} />
            </button>

            <div className="detail-grid">
              <div className="detail-media">
                <ImageSlot
                  imageKey={detailModalService.imageKey}
                  aspect="4:5"
                />
              </div>

              <div className="detail-body">
                <span className="detail-category">{detailModalService.category}</span>
                <h3 id="detail-title" className="detail-title">{detailModalService.name}</h3>
                <p className="detail-description">{detailModalService.description}</p>
                
                {detailModalService.priceNote && (
                  <p className="detail-price-note">
                    <Icon name="Sparkles" size={14} />
                    <span>{detailModalService.priceNote}</span>
                  </p>
                )}

                <div className="detail-action-footer">
                  <button
                    type="button"
                    className="detail-book-btn"
                    onClick={() => {
                      const id = detailModalService.id;
                      setDetailModalService(null);
                      requestBooking({ serviceId: id });
                    }}
                  >
                    <span>Book This Service</span>
                    <Icon name="ArrowRight" size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

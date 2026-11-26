import React, { useState, useMemo } from 'react';
import { galleryImages } from '../data/galleryImages.js';
import { SectionHeading } from '../components/SectionHeading.jsx';
import { ImageSlot } from '../components/ImageSlot.jsx';
import { SampleBadge } from '../components/SampleBadge.jsx';
import { Icon } from '../components/Icon.jsx';
import './GallerySection.css';

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = useMemo(() => {
    return ["All", "Bridal", "Hair", "Makeup", "Skincare", "Nails", "Interiors"];
  }, []);

  const filteredImages = useMemo(() => {
    if (selectedCategory === "All") return galleryImages;
    return galleryImages.filter(img => img.category === selectedCategory);
  }, [selectedCategory]);

  // Signature Moment 5: Featured 3D Rotating Ring items (capped at 8 for performance)
  const ringImages = useMemo(() => {
    return filteredImages.slice(0, 8);
  }, [filteredImages]);

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrevLightbox = () => {
    setLightboxIndex(prev => (prev > 0 ? prev - 1 : filteredImages.length - 1));
  };

  const handleNextLightbox = () => {
    setLightboxIndex(prev => (prev < filteredImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="gallery" className="gallery-section" aria-label="Haute Photography Gallery">
      <div className="container">
        <SectionHeading
          eyebrow="Visual Portfolio"
          title="The Atelier in Frames"
          subtitle="A visual celebration of royal bridal artistry, dimensional hair balayage, biological glass skin, and quiet sanctuary corners."
          centered={true}
        />

        {/* Category Filter Tabs */}
        <div className="gallery-filter-tabs" role="tablist" aria-label="Filter gallery by category">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={selectedCategory === cat}
              className={`gallery-tab-btn ${selectedCategory === cat ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Signature Moment 5: 3D Depth Carousel Ring */}
        <div className="gallery-3d-stage perspective-stage">
          <div className="gallery-ring-track" style={{ '--ring-count': ringImages.length }}>
            {ringImages.map((img, idx) => (
              <div
                key={img.id}
                className="gallery-ring-item preserve-3d"
                style={{ '--ring-index': idx }}
                onClick={() => handleOpenLightbox(idx)}
                role="button"
                tabIndex={0}
                aria-label={`Open photo: ${img.caption}`}
              >
                <div className="ring-photo-frame">
                  <ImageSlot
                    imageKey={img.imageKey}
                    aspect={img.aspect || "4:5"}
                    className="ring-img"
                  />
                  <div className="ring-overlay">
                    <span className="ring-caption">{img.caption}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2D Editorial Masonry Grid (All Photos) */}
        <div className="gallery-masonry-grid">
          {filteredImages.map((img, idx) => (
            <div
              key={img.id}
              className={`gallery-grid-item ${img.aspect === '3:2' ? 'span-wide' : ''}`}
              onClick={() => handleOpenLightbox(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleOpenLightbox(idx);
              }}
              aria-label={`Expand ${img.caption}`}
            >
              <div className="grid-media-wrapper">
                <ImageSlot
                  imageKey={img.imageKey}
                  aspect={img.aspect || "4:5"}
                  className="grid-img"
                />
                <div className="grid-hover-overlay">
                  <div className="grid-hover-text">
                    <span className="grid-category">{img.category}</span>
                    <h4 className="grid-caption">{img.caption}</h4>
                  </div>
                  {img.isSample && <SampleBadge />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accessible Custom Lightbox Dialog */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <div
          className="lightbox-dialog"
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox Preview"
        >
          <button
            type="button"
            className="lightbox-close-btn"
            onClick={handleCloseLightbox}
            aria-label="Close lightbox"
          >
            <Icon name="X" size={24} />
          </button>

          <button
            type="button"
            className="lightbox-nav-btn btn-prev"
            onClick={handlePrevLightbox}
            aria-label="Previous photograph"
          >
            <Icon name="ChevronLeft" size={28} />
          </button>

          <div className="lightbox-content">
            <div className="lightbox-media">
              <ImageSlot
                imageKey={filteredImages[lightboxIndex].imageKey}
                aspect={filteredImages[lightboxIndex].aspect || "4:5"}
                className="lightbox-img"
              />
            </div>
            <div className="lightbox-footer">
              <span className="lightbox-counter">
                {lightboxIndex + 1} of {filteredImages.length}
              </span>
              <p className="lightbox-caption">{filteredImages[lightboxIndex].caption}</p>
            </div>
          </div>

          <button
            type="button"
            className="lightbox-nav-btn btn-next"
            onClick={handleNextLightbox}
            aria-label="Next photograph"
          >
            <Icon name="ChevronRight" size={28} />
          </button>
        </div>
      )}
    </section>
  );
}

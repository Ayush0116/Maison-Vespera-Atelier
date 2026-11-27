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


}

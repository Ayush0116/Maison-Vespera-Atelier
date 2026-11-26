import React, { useState } from 'react';
import { imageRegistry } from '../data/images.js';
import './ImageSlot.css';

/**
 * Universal ImageSlot component.
 * Features:
 * - Reserves exact aspect-ratio to completely eliminate layout shift (CLS < 0.1).
 * - Applies custom focal point for graceful client photo replacement.
 * - Displays refined editorial fallback on missing image or error without breaking layout.
 */
export function ImageSlot({
  imageKey,
  aspect = '4/5',
  className = '',
  loading = 'lazy',
  priority = false,
  style = {},
  ...props
}) {
  const [hasError, setHasError] = useState(false);
  const data = imageRegistry[imageKey];

  if (!data || hasError) {
    return (
      <div
        className={`image-slot-fallback ${className}`}
        style={{ aspectRatio: aspect.replace(':', '/'), ...style }}
        role="img"
        aria-label={data?.alt || "Maison Vespera luxury beauty visual"}
      >
        <div className="fallback-inner">
          <span className="fallback-monogram">MV</span>
          <span className="fallback-caption">Maison Vespera Atelier</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`image-slot-wrapper ${className}`}
      style={{ aspectRatio: aspect.replace(':', '/'), ...style }}
    >
      <img
        src={data.src}
        alt={data.alt || ""}
        width={data.width}
        height={data.height}
        loading={priority ? 'eager' : loading}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        style={{ objectPosition: data.focal || '50% 50%' }}
        onError={() => setHasError(true)}
        className="image-slot-img"
        {...props}
      />
    </div>
  );
}

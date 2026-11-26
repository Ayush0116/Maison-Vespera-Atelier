import React, { useState, useEffect, useRef } from 'react';
import { aboutContent } from '../data/aboutContent.js';
import { scrollToSection } from '../utils/scrollToSection.js';
import { ImageSlot } from '../components/ImageSlot.jsx';
import { SectionHeading } from '../components/SectionHeading.jsx';
import { Icon } from '../components/Icon.jsx';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import './AboutSection.css';

export function AboutSection() {
  const [activeBeat, setActiveBeat] = useState(0);
  const pinnedWrapperRef = useRef(null);
  const isReduced = useReducedMotion();

  // Signature Moment 2: Pinned storytelling scene driven by scroll progress
  useEffect(() => {
    const wrapper = pinnedWrapperRef.current;
    if (!wrapper || isReduced || typeof window === 'undefined') return;

    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const totalDist = rect.height - window.innerHeight;
      if (totalDist <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalDist));
      // Calculate active beat based on progress 0 -> 1
      const count = aboutContent.storyBeats.length;
      const beatIndex = Math.min(count - 1, Math.floor(progress * count));
      setActiveBeat(beatIndex);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isReduced]);

  return (
    <section id="about" className="about-section" aria-label="About Maison Vespera">
      <div className="container">
        <SectionHeading
          eyebrow={aboutContent.eyebrow}
          title={aboutContent.heading}
          subtitle={aboutContent.lead}
        />

        {/* Pinned Storytelling Scene (Signature Moment 2) */}
        <div ref={pinnedWrapperRef} className="pinned-story-scene">
          <div className="pinned-stage">
            {/* Left Story Beats Column */}
            <div className="story-beats-container">
              {aboutContent.storyBeats.map((beat, idx) => (
                <div
                  key={idx}
                  className={`story-beat-card ${idx === activeBeat ? 'is-active' : ''}`}
                >
                  <span className="story-beat-num">0{idx + 1}</span>
                  <h3 className="story-beat-title">{beat.title}</h3>
                  <p className="story-beat-text">{beat.text}</p>
                </div>
              ))}
            </div>

            {/* Right Synchronized 3D Photographic Canvas */}
            <div className="story-photo-canvas perspective-stage">
              {aboutContent.imageKeys.map((key, idx) => (
                <div
                  key={key}
                  className={`story-photo-slide ${idx === activeBeat ? 'is-visible' : ''}`}
                  style={{ '--index': idx }}
                >
                  <div className="story-photo-frame">
                    <ImageSlot
                      imageKey={key}
                      aspect={idx === 1 ? '3:2' : '4:5'}
                      className="story-img"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Philosophy Pillars Strip */}
        <div className="pillars-grid">
          {aboutContent.pillars.map((pillar, idx) => (
            <div key={idx} className="pillar-card card-depth">
              <div className="pillar-icon-box">
                <Icon name={pillar.icon} size={24} />
              </div>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-desc">{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* Section End CTA */}
        <div className="about-action-row">
          <button
            type="button"
            className="about-meet-btn"
            onClick={() => scrollToSection('team')}
          >
            <span>Meet Our Artisans</span>
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { experiences } from '../data/experiences.js';
import { services } from '../data/services.js';
import { useBooking } from '../context/BookingContext.jsx';
import { SectionHeading } from '../components/SectionHeading.jsx';
import { ImageSlot } from '../components/ImageSlot.jsx';
import { Icon } from '../components/Icon.jsx';
import './ExperienceSection.css';

export function ExperienceSection() {
  const [activeGoalId, setActiveGoalId] = useState(experiences[0]?.id || "bridal-radiance");
  const { requestBooking } = useBooking();

  const currentExperience = experiences.find(e => e.id === activeGoalId) || experiences[0];

  // Map linked services
  const matchedServices = services.filter(s => currentExperience.serviceIds?.includes(s.id));

  return (
    <section
      id="experience"
      className="experience-section"
      style={{ '--exp-accent': currentExperience.accent }}
      aria-label="Personalized Beauty Goals"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Guided Intentions"
          title="What Are You Preparing For?"
          subtitle="Select your current milestone or personal sanctuary goal. We choreograph integrated rituals tailored to your exact timeline."
          centered={true}
        />

        {/* Goal Selector Chips */}
        <div className="goal-selector-chips" role="tablist" aria-label="Select beauty intention">
          {experiences.map((exp) => (
            <button
              key={exp.id}
              role="tab"
              aria-selected={activeGoalId === exp.id}
              className={`goal-chip-btn ${activeGoalId === exp.id ? 'is-active' : ''}`}
              onClick={() => setActiveGoalId(exp.id)}
            >
              <Icon name={exp.icon} size={16} />
              <span>{exp.label}</span>
            </button>
          ))}
        </div>

        {/* Signature Moment 4: Dynamic 3D Stage Transition */}
        <div className="experience-stage-layout">
          {/* Left Text and Matched Services */}
          <div className="experience-detail-col">
            <h3 className="exp-headline">{currentExperience.headline}</h3>
            <p className="exp-description">{currentExperience.description}</p>

            <div className="matched-services-box">
              <span className="matched-services-label">Curated Ritual Harmonization:</span>
              <ul className="matched-services-list">
                {matchedServices.map((srv) => (
                  <li key={srv.id} className="matched-service-item">
                    <span className="matched-bullet" />
                    <div>
                      <strong>{srv.name}</strong>
                      <span className="matched-summary"> · {srv.summary}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              className="experience-book-cta"
              onClick={() => requestBooking({ serviceId: currentExperience.ctaServiceId })}
            >
              <span>Begin This Experience</span>
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>

          {/* Right Layered Visual Stage */}
          <div className="experience-visual-col perspective-stage">
            <div className="exp-media-stack">
              {currentExperience.sceneImageKeys.map((key, idx) => (
                <div
                  key={`${activeGoalId}-${key}`}
                  className={`exp-photo-card exp-photo-card-${idx}`}
                >
                  <ImageSlot
                    imageKey={key}
                    aspect={idx === 0 ? '4:5' : '1:1'}
                    className="exp-slot"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

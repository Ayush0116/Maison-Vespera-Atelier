import React from 'react';
import { teamMembers } from '../data/teamMembers.js';
import { useBooking } from '../context/BookingContext.jsx';
import { SectionHeading } from '../components/SectionHeading.jsx';
import { ImageSlot } from '../components/ImageSlot.jsx';
import { SampleBadge } from '../components/SampleBadge.jsx';
import { Icon } from '../components/Icon.jsx';
import { usePointerTilt } from '../hooks/usePointerTilt.js';
import './TeamSection.css';

function TeamCard({ member }) {
  const { requestBooking } = useBooking();
  const tiltRef = usePointerTilt({ maxTilt: 6 });

  return (
    <div ref={tiltRef} className="team-card card-depth">
      <div className="team-media-wrapper">
        <ImageSlot
          imageKey={member.imageKey}
          aspect="4:5"
          className="team-portrait-img"
        />
        {member.isSample && (
          <div className="team-sample-tag">
            <SampleBadge />
          </div>
        )}
      </div>

      <div className="team-info-body">
        <span className="team-role">{member.role}</span>
        <h3 className="team-name">{member.name}</h3>
        <p className="team-bio">{member.bio}</p>

        <div className="team-specialties-wrap">
          {member.specialties.map((spec, idx) => (
            <span key={idx} className="specialty-pill">{spec}</span>
          ))}
        </div>

        {member.bookable && (
          <button
            type="button"
            className="team-book-btn"
            onClick={() => requestBooking({ professionalId: member.id })}
          >
            <span>Book with {member.name.split(' ')[0]}</span>
            <Icon name="ArrowRight" size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

export function TeamSection() {
  if (teamMembers.length === 0) return null;

  return (
    <section id="team" className="team-section" aria-label="Our Master Artisans">
      <div className="container">
        <SectionHeading
          eyebrow="The Master Artisans"
          title="Faces Behind the Craft"
          subtitle="Trained in Paris, Milan, and India's finest editorial academies. Each master brings undivided focus and delicate precision to your transformation."
          centered={true}
        />

        <div className="team-grid">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

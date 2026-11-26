import React, { useState } from 'react';
import { faqs } from '../data/faqs.js';
import { SectionHeading } from '../components/SectionHeading.jsx';
import { Icon } from '../components/Icon.jsx';
import './FaqSection.css';

export function FaqSection() {
  // Allow multiple accordion items to be open independently
  const [openIds, setOpenIds] = useState([faqs[0]?.id || 'faq-bridal-trials']);

  const toggleItem = (id) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="faq-section" aria-label="Frequently Asked Questions">
      <div className="container">
        <SectionHeading
          eyebrow="Curated Guidance"
          title="Frequently Asked Questions"
          subtitle="Clear answers on bridal trials, patch test protocols, organic ingredients, and private party arrangements."
          centered={true}
        />

        <div className="faq-accordion-stack">
          {faqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={`faq-item-card ${isOpen ? 'is-open' : ''} card-depth`}
              >
                <button
                  type="button"
                  className="faq-trigger-btn"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div className="faq-trigger-left">
                    <span className="faq-icon-wrapper">
                      <Icon name={faq.icon} size={18} />
                    </span>
                    <span className="faq-question-text">{faq.question}</span>
                  </div>
                  <span className={`faq-chevron ${isOpen ? 'is-rotated' : ''}`}>
                    <Icon name="ChevronDown" size={18} />
                  </span>
                </button>

                <div
                  id={`faq-answer-${faq.id}`}
                  className="faq-answer-collapse"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="faq-answer-inner">
                    <p className="faq-answer-text">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

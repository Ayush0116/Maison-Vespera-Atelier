import React, { useState, useEffect, useMemo } from 'react';
import { services } from '../data/services.js';
import { teamMembers } from '../data/teamMembers.js';
import { bookingConfig } from '../data/bookingConfig.js';
import { siteConfig } from '../data/siteConfig.js';
import { useBooking } from '../context/BookingContext.jsx';
import { validateBookingForm } from '../utils/validation.js';
import { generateTimeSlots } from '../utils/hours.js';
import { submitEnquiry } from '../services/booking.js';
import { SectionHeading } from '../components/SectionHeading.jsx';
import { ImageSlot } from '../components/ImageSlot.jsx';
import { Icon } from '../components/Icon.jsx';
import './BookingSection.css';

export function BookingSection() {
  const { preselectedData, clearPreselection } = useBooking();

  // Today's date in YYYY-MM-DD
  const todayStr = useMemo(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceId: '',
    professionalId: '',
    date: todayStr,
    time: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  // Synchronize preselection from other sections
  useEffect(() => {
    if (preselectedData) {
      setFormData(prev => ({
        ...prev,
        ...(preselectedData.serviceId ? { serviceId: preselectedData.serviceId } : {}),
        ...(preselectedData.professionalId ? { professionalId: preselectedData.professionalId } : {})
      }));
    }
  }, [preselectedData]);

  // Generate available time slots based on selected date
  const availableSlots = useMemo(() => {
    return generateTimeSlots(formData.date, bookingConfig.slotIntervalMinutes);
  }, [formData.date]);

  // Group enabled services by category for <select>
  const groupedServices = useMemo(() => {
    const map = {};
    services.filter(s => s.enabled).forEach(s => {
      if (!map[s.category]) map[s.category] = [];
      map[s.category].push(s);
    });
    return map;
  }, []);

  // Bookable team members
  const bookableMembers = useMemo(() => {
    return teamMembers.filter(m => m.bookable);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSlotSelect = (slot) => {
    setFormData(prev => ({ ...prev, time: slot }));
    if (errors.time) {
      setErrors(prev => ({ ...prev, time: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateBookingForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      // Focus first error field for accessibility
      const firstKey = Object.keys(validation.errors)[0];
      const el = document.querySelector(`[name="${firstKey}"]`);
      if (el) el.focus();
      return;
    }

    setSubmitting(true);

    const srv = services.find(s => s.id === formData.serviceId);
    const prof = teamMembers.find(m => m.id === formData.professionalId);

    const payload = {
      ...formData,
      serviceName: srv ? srv.name : formData.serviceId,
      professionalName: prof ? prof.name : ""
    };

    try {
      const res = await submitEnquiry(payload);
      setConfirmation(res);
      clearPreselection();
    } catch {
      setErrors({ form: "An error occurred while preparing your request. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="booking" className="booking-section" aria-label="Appointment Enquiry">
      <span id="booking-announcer" className="sr-only" aria-live="polite" />
      <div className="container">
        <SectionHeading
          eyebrow="Sanctuary Reservation"
          title="Reserve Your Transformation"
          subtitle="Select your preferred ritual, artisan, and arrival time. Our dedicated salon concierge will promptly confirm your bespoke session."
        />

        <div className="booking-layout-grid">
          {/* Left Form Card */}
          <div className="booking-form-col card-depth">
            {confirmation ? (
              <div className="booking-confirmation-panel" role="status">
                <div className="confirm-icon-box">
                  <Icon name="Sparkles" size={32} />
                </div>
                <h3 className="confirm-title">{bookingConfig.confirmation.headline}</h3>
                <p className="confirm-body">{bookingConfig.confirmation.body}</p>

                <div className="confirm-summary-box">
                  <h4>Enquiry Summary</h4>
                  <p><strong>Guest:</strong> {confirmation.summary.name} ({confirmation.summary.phone})</p>
                  <p><strong>Ritual:</strong> {confirmation.summary.serviceName}</p>
                  <p><strong>Artisan:</strong> {confirmation.summary.professionalName}</p>
                  <p><strong>Date &amp; Time:</strong> {confirmation.summary.date} at {confirmation.summary.time}</p>
                  {confirmation.summary.notes && (
                    <p><strong>Notes:</strong> {confirmation.summary.notes}</p>
                  )}
                </div>

                <div className="confirm-disclaimer">
                  <Icon name="ShieldCheck" size={16} />
                  <span>{bookingConfig.confirmation.demoDisclaimer}</span>
                </div>

                <button
                  type="button"
                  className="confirm-reset-btn"
                  onClick={() => setConfirmation(null)}
                >
                  Create Another Demo Reservation
                </button>
              </div>
            ) : (
              <form className="booking-form" onSubmit={handleSubmit} noValidate>
                {errors.form && <div className="form-alert error">{errors.form}</div>}

                <div className="form-row form-grid-2">
                  {/* Name Field */}
                  <div className="form-group">
                    <label htmlFor="booking-name" className="form-label">
                      {bookingConfig.fields.name.label} *
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={bookingConfig.fields.name.placeholder}
                      className={`form-input ${errors.name ? 'is-invalid' : ''}`}
                      aria-invalid={errors.name ? 'true' : undefined}
                      aria-describedby={errors.name ? 'err-name' : undefined}
                      required
                    />
                    {errors.name && <span id="err-name" className="field-error">{errors.name}</span>}
                  </div>

                  {/* Phone Field */}
                  <div className="form-group">
                    <label htmlFor="booking-phone" className="form-label">
                      {bookingConfig.fields.phone.label} *
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={bookingConfig.fields.phone.placeholder}
                      className={`form-input ${errors.phone ? 'is-invalid' : ''}`}
                      aria-invalid={errors.phone ? 'true' : undefined}
                      aria-describedby={errors.phone ? 'err-phone' : undefined}
                      required
                    />
                    {errors.phone && <span id="err-phone" className="field-error">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-row form-grid-2">
                  {/* Service Dropdown */}
                  <div className="form-group">
                    <label htmlFor="booking-service" className="form-label">
                      {bookingConfig.fields.service.label} *
                    </label>
                    <select
                      id="booking-service"
                      name="serviceId"
                      value={formData.serviceId}
                      onChange={handleChange}
                      className={`form-select ${errors.serviceId ? 'is-invalid' : ''}`}
                      aria-invalid={errors.serviceId ? 'true' : undefined}
                      aria-describedby={errors.serviceId ? 'err-service' : undefined}
                      required
                    >
                      <option value="">{bookingConfig.fields.service.placeholder}</option>
                      {Object.entries(groupedServices).map(([cat, list]) => (
                        <optgroup key={cat} label={cat}>
                          {list.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    {errors.serviceId && <span id="err-service" className="field-error">{errors.serviceId}</span>}
                  </div>

                  {/* Preferred Professional Dropdown (Conditional) */}
                  {bookableMembers.length > 0 && (
                    <div className="form-group">
                      <label htmlFor="booking-prof" className="form-label">
                        {bookingConfig.fields.professional.label}
                      </label>
                      <select
                        id="booking-prof"
                        name="professionalId"
                        value={formData.professionalId}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="">{bookingConfig.fields.professional.placeholder}</option>
                        {bookableMembers.map(m => (
                          <option key={m.id} value={m.id}>{m.name} — {m.role}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="form-row">
                  {/* Date Input */}
                  <div className="form-group">
                    <label htmlFor="booking-date" className="form-label">
                      {bookingConfig.fields.date.label} *
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      name="date"
                      min={todayStr}
                      value={formData.date}
                      onChange={handleChange}
                      className={`form-input ${errors.date ? 'is-invalid' : ''}`}
                      aria-invalid={errors.date ? 'true' : undefined}
                      aria-describedby={errors.date ? 'err-date' : undefined}
                      required
                    />
                    {errors.date && <span id="err-date" className="field-error">{errors.date}</span>}
                  </div>
                </div>

                {/* Available Slots Radio Grid */}
                <div className="form-group">
                  <label className="form-label">{bookingConfig.fields.time.label} *</label>
                  {availableSlots.length > 0 ? (
                    <div className="slots-grid" role="radiogroup" aria-label="Appointment arrival slot">
                      {availableSlots.map(slot => (
                        <button
                          key={slot}
                          type="button"
                          role="radio"
                          aria-checked={formData.time === slot}
                          className={`slot-chip ${formData.time === slot ? 'is-selected' : ''}`}
                          onClick={() => handleSlotSelect(slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="slots-empty-notice">
                      <Icon name="CalendarX" size={16} />
                      <span>The sanctuary is closed or fully reserved on this date. Please select another day.</span>
                    </div>
                  )}
                  {errors.time && <span className="field-error">{errors.time}</span>}
                </div>

                {/* Notes Field */}
                <div className="form-group">
                  <label htmlFor="booking-notes" className="form-label">
                    {bookingConfig.fields.message.label}
                  </label>
                  <textarea
                    id="booking-notes"
                    name="notes"
                    rows={3}
                    maxLength={bookingConfig.messageMaxLength}
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder={bookingConfig.fields.message.placeholder}
                    className="form-textarea"
                  />
                  <div className="char-counter">
                    {formData.notes.length}/{bookingConfig.messageMaxLength}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="booking-submit-btn"
                >
                  <span>{submitting ? "Processing Reservation..." : "Submit Reservation Enquiry"}</span>
                  <Icon name="ArrowRight" size={16} />
                </button>
              </form>
            )}
          </div>

          {/* Right Photographic Atmosphere Card */}
          <div className="booking-visual-col">
            <div className="booking-media-card">
              <ImageSlot
                imageKey="booking-visual"
                aspect="4:5"
                className="booking-visual-img"
              />
              <div className="booking-visual-overlay">
                <span className="bv-tag">Personal Sanctuary</span>
                <h3 className="bv-heading">Undivided Focus on Every Guest</h3>
                <p className="bv-text">
                  Private bridal dressing suites, sterilized surgical-grade instruments, and quiet acoustically treated consultation lounges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

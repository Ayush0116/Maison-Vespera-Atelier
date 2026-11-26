import { siteConfig } from '../data/siteConfig.js';

/**
 * Validates appointment form fields according to business rules.
 * Hand-written, zero external libraries.
 */
export function validateBookingForm(values) {
  const errors = {};

  // Name validation
  if (!values.name || !values.name.trim()) {
    errors.name = "Please enter your name.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long.";
  }

  // Phone validation
  if (!values.phone || !values.phone.trim()) {
    errors.phone = "Please enter your contact phone or WhatsApp number.";
  } else {
    const cleanPhone = values.phone.replace(/[\s-]/g, '');
    const pattern = siteConfig.phone === "+91 00000 00000" 
      ? /^(?:\+91)?[6-9]\d{9}$/ 
      : /^(?:\+91)?[6-9]\d{9}$/;
    if (!pattern.test(cleanPhone)) {
      errors.phone = "Please enter a valid 10-digit Indian phone number starting with 6-9.";
    }
  }

  // Service validation
  if (!values.serviceId) {
    errors.serviceId = "Please select a service or ritual.";
  }

  // Date validation
  if (!values.date) {
    errors.date = "Please select your preferred appointment date.";
  }

  // Time slot validation
  if (!values.time) {
    errors.time = "Please select an arrival time slot.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

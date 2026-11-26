/**
 * Booking configuration rules, validation criteria, and copy.
 */
export const bookingConfig = {
  slotIntervalMinutes: 30,
  leadTimeMinutes: 120, // 2 hours minimum advance notice for same-day
  maxAdvanceDays: 45,
  phoneRule: {
    countryCode: "+91",
    digits: 10,
    pattern: /^(?:\+91[\s-]?)?[6-9]\d{9}$/
  },
  messageMaxLength: 400,
  fields: {
    name: {
      label: "Full Name",
      placeholder: "e.g. Radhika Singhania"
    },
    phone: {
      label: "Phone / WhatsApp Number",
      placeholder: "+91 98765 43210"
    },
    service: {
      label: "Select Ritual or Service",
      placeholder: "Choose an artisanal service..."
    },
    professional: {
      label: "Preferred Professional (Optional)",
      placeholder: "No preference · Assign senior artisan"
    },
    date: {
      label: "Preferred Date"
    },
    time: {
      label: "Available Arrival Time"
    },
    message: {
      label: "Notes & Occasion Details (Optional)",
      placeholder: "Tell us about your event, wedding date, or specific skin/hair notes..."
    }
  },
  confirmation: {
    headline: "Enquiry Registered in Demo Mode",
    body: "Thank you for exploring Maison Vespera. Because this is an agency preview template, no real appointment was booked and no contact details were stored.",
    demoDisclaimer: "In production, this submission instantly forwards to the salon's booking concierge via WhatsApp and CRM webhook."
  },
  whatsappTemplate: "Hello Maison Vespera, I would like to enquire about reserving: {service} on {date} around {time}. Guest: {name} ({phone})."
};

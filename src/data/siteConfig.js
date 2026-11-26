// REPLACE: [SALON_NAME] [TAGLINE] [PHONE_NUMBER] [WHATSAPP_NUMBER] [BUSINESS_ADDRESS] [OPENING_HOURS] [INSTAGRAM_URL]
/**
 * @typedef {Object} OpeningHour
 * @property {string} open - 24-hr format HH:MM
 * @property {string} close - 24-hr format HH:MM
 */

/**
 * Single source of truth for salon identity, flags, contacts, and section visibility.
 * Pure JavaScript - NO JSX, NO asset imports, safe for vite.config.js build-time import.
 */
export const siteConfig = {
  // Identity
  // REPLACE: [SALON_NAME]
  name: "Maison Vespera",
  // REPLACE: [TAGLINE]
  tagline: "Haute Botanique & Bridal Sanctuary",
  // REPLACE: [LOGO]
  logo: "/assets/brand/logo.svg",
  logoLight: "/assets/brand/logo-light.svg",

  // Contact Details
  // Dummy values detected by demo utils for realistic customer preview
  // REPLACE: [PHONE_NUMBER]
  phone: "+91 00000 00000",
  // REPLACE: [WHATSAPP_NUMBER]
  whatsapp: "910000000000",
  email: "concierge@example.com",
  // REPLACE: [BUSINESS_ADDRESS]
  address: {
    street: "42 Lavelle Crescent, Richmond Quarter",
    locality: "Vittal Mallya Enclave",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560001",
    country: "India",
    full: "42 Lavelle Crescent, Richmond Quarter, Bengaluru, Karnataka 560001"
  },
  mapEmbedUrl: null, // default null uses refined location visual card with Google Maps link
  timeZone: "Asia/Kolkata",

  // Opening Hours (Monday = 1, Sunday = 0 or 7)
  // REPLACE: [OPENING_HOURS]
  openingHours: {
    monday: [{ open: "10:00", close: "20:00" }],
    tuesday: [{ open: "10:00", close: "20:00" }],
    wednesday: [{ open: "10:00", close: "20:00" }],
    thursday: [{ open: "10:00", close: "20:00" }],
    friday: [{ open: "10:00", close: "21:00" }],
    saturday: [{ open: "09:00", close: "21:00" }],
    sunday: [{ open: "10:00", close: "19:00" }]
  },
  holidays: [], // ISO date strings e.g. ["2026-12-25"]

  // Social Links
  // REPLACE: [INSTAGRAM_URL]
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    pinterest: "https://pinterest.com"
  },

  // SEO & Open Graph
  seo: {
    title: "Maison Vespera — Haute Botanique & Bridal Sanctuary",
    description: "An editorial beauty sanctuary dedicated to couture bridal transformations, advanced botanical skincare, tailored hair rituals, and mindful wellness in Bengaluru.",
    ogImage: "/assets/misc/og-image.jpg",
    siteUrl: ""
  },

  // Operational Flags
  demoMode: true,
  showPrices: true,
  currency: "INR",
  locale: "en-IN",

  // Features
  features: {
    introOverlay: true,
    customCursor: false,
    whatsappHandoff: true,
    floatingContact: true
  },

  // Sections toggle and vertical flow order
  sections: {
    enabled: {
      about: true,
      services: true,
      experience: true,
      team: true,
      gallery: true,
      offers: true,
      testimonials: true,
      booking: true,
      faq: true,
      contact: true
    },
    order: [
      "about",
      "services",
      "experience",
      "team",
      "gallery",
      "offers",
      "testimonials",
      "booking",
      "faq",
      "contact"
    ]
  }
};

/**
 * Master image registry mapping semantic keys to local asset paths,
 * responsive metadata, and focal points.
 * Components NEVER import raw image paths directly; they reference registry keys.
 */
export const imageRegistry = {
  // Brand
  "logo": {
    src: "/assets/brand/logo.svg",
    alt: "Maison Vespera wordmark",
    width: 240,
    height: 48,
    focal: "50% 50%"
  },
  "logo-light": {
    src: "/assets/brand/logo-light.svg",
    alt: "Maison Vespera wordmark",
    width: 240,
    height: 48,
    focal: "50% 50%"
  },

  // Hero Section
  "hero-01": {
    src: "/assets/hero/hero-01.webp",
    alt: "Editorial bride with sculpted glow, floral hair styling, and delicate gold jewelry",
    width: 1400,
    height: 1800,
    focal: "50% 35%"
  },
  "hero-02": {
    src: "/assets/hero/hero-02.webp",
    alt: "Close-up of hair stylist crafting dimensional balayage waves in sunlit atelier",
    width: 1200,
    height: 1500,
    focal: "50% 40%"
  },
  "hero-03": {
    src: "/assets/hero/hero-03.webp",
    alt: "Botanical facial treatment with cool glass globes and herbal serum droplets",
    width: 1000,
    height: 1250,
    focal: "50% 50%"
  },

  // About Section
  "about-01": {
    src: "/assets/about/about-01.webp",
    alt: "Artisan hands blending cold-pressed botanicals in ceramic apothecary bowl",
    width: 1200,
    height: 1500,
    focal: "50% 50%"
  },
  "about-02": {
    src: "/assets/about/about-02.webp",
    alt: "Curved velvet interior of Maison Vespera styling salon with fluted marble",
    width: 1400,
    height: 1000,
    focal: "50% 45%"
  },
  "about-03": {
    src: "/assets/about/about-03.webp",
    alt: "Delicate bridal hair pins and fresh jasmine blossoms prepared for styling",
    width: 1000,
    height: 1250,
    focal: "50% 50%"
  },

  // Services
  "service-bridal-couture-makeup": {
    src: "/assets/services/service-bridal-couture-makeup.webp",
    alt: "Radiant bride adorned in crimson and gold with impeccable airbrush makeup",
    width: 1000,
    height: 1250,
    focal: "50% 35%"
  },
  "service-botanical-glass-facial": {
    src: "/assets/services/service-botanical-glass-facial.webp",
    alt: "Client enjoying cryo lymphatic facial massage with chilled globes",
    width: 1000,
    height: 1250,
    focal: "50% 40%"
  },
  "service-haute-balayage-gloss": {
    src: "/assets/services/service-haute-balayage-gloss.webp",
    alt: "Lustrous caramel balayage hair falling in loose glossy waves",
    width: 1000,
    height: 1250,
    focal: "50% 45%"
  },
  "service-ayurvedic-scalp-spa": {
    src: "/assets/services/service-ayurvedic-scalp-spa.webp",
    alt: "Gentle warm botanical oil scalp massage in serene hydrotherapy suite",
    width: 1000,
    height: 1250,
    focal: "50% 40%"
  },
  "service-editorial-evening-glam": {
    src: "/assets/services/service-editorial-evening-glam.webp",
    alt: "Sculpted evening party makeup with warm terracotta tones and velvet lips",
    width: 1000,
    height: 1250,
    focal: "50% 35%"
  },
  "service-rosewood-luxe-pedicure": {
    src: "/assets/services/service-rosewood-luxe-pedicure.webp",
    alt: "Relaxing foot soak with organic rose petals and pink Himalayan salts",
    width: 1000,
    height: 1250,
    focal: "50% 50%"
  },
  "service-sculptural-nail-art": {
    src: "/assets/services/service-sculptural-nail-art.webp",
    alt: "Artisanal manicured nails featuring delicate gold foil and pearl details",
    width: 1000,
    height: 1250,
    focal: "50% 50%"
  },
  "service-deep-serenity-body-ritual": {
    src: "/assets/services/service-deep-serenity-body-ritual.webp",
    alt: "Soothing amber crystal body scrub treatment in candlelit spa suite",
    width: 1000,
    height: 1250,
    focal: "50% 50%"
  },
  "service-signature-couture-grooming": {
    src: "/assets/services/service-signature-couture-grooming.webp",
    alt: "Gentleman receiving precision hot-towel beard shaping and facial treatment",
    width: 1000,
    height: 1250,
    focal: "50% 40%"
  },

  // Beauty Experience Scenes
  "experience-bridal-01": {
    src: "/assets/experience/experience-bridal-01.webp",
    alt: "Indian bridal beauty ritual with ornate gold choker and crimson silk dupatta",
    width: 1200,
    height: 1500,
    focal: "50% 35%"
  },
  "experience-bridal-02": {
    src: "/assets/experience/experience-bridal-02.webp",
    alt: "Artisan applying fine winged eyeliner with bridal eye contouring",
    width: 1000,
    height: 1250,
    focal: "50% 40%"
  },
  "experience-bridal-03": {
    src: "/assets/experience/experience-bridal-03.webp",
    alt: "Delicate freshwater pearl jewelry pinned to textured bridal braid",
    width: 1000,
    height: 1250,
    focal: "50% 50%"
  },

  "experience-hair-01": {
    src: "/assets/experience/experience-hair-01.webp",
    alt: "Dimensional honey blonde and chocolate balayage styling",
    width: 1200,
    height: 1500,
    focal: "50% 40%"
  },
  "experience-hair-02": {
    src: "/assets/experience/experience-hair-02.webp",
    alt: "Expert hair cutting and styling in front of arched salon mirrors",
    width: 1000,
    height: 1250,
    focal: "50% 45%"
  },
  "experience-hair-03": {
    src: "/assets/experience/experience-hair-03.webp",
    alt: "Silky hair gloss serum applied to damp tresses",
    width: 1000,
    height: 1250,
    focal: "50% 50%"
  },

  "experience-skin-01": {
    src: "/assets/experience/experience-skin-01.webp",
    alt: "Dewy glowing complexion after botanical cryo infusion",
    width: 1200,
    height: 1500,
    focal: "50% 35%"
  },
  "experience-skin-02": {
    src: "/assets/experience/experience-skin-02.webp",
    alt: "Chilled cryo globes contouring the cheekbones",
    width: 1000,
    height: 1250,
    focal: "50% 40%"
  },
  "experience-skin-03": {
    src: "/assets/experience/experience-skin-03.webp",
    alt: "Hydrating botanical facial oil droplets on delicate dropper",
    width: 1000,
    height: 1250,
    focal: "50% 50%"
  },

  "experience-party-01": {
    src: "/assets/experience/experience-party-01.webp",
    alt: "High-impact red carpet glam with golden bronze eyelids",
    width: 1200,
    height: 1500,
    focal: "50% 35%"
  },
  "experience-party-02": {
    src: "/assets/experience/experience-party-02.webp",
    alt: "Satin berry lipstick applied with fine lip brush",
    width: 1000,
    height: 1250,
    focal: "50% 50%"
  },
  "experience-party-03": {
    src: "/assets/experience/experience-party-03.webp",
    alt: "Champagne evening clutch and glossy polished nails",
    width: 1000,
    height: 1250,
    focal: "50% 50%"
  },

  "experience-spa-01": {
    src: "/assets/experience/experience-spa-01.webp",
    alt: "Peaceful holistic spa sanctuary with warm stone and candle ambiance",
    width: 1200,
    height: 1500,
    focal: "50% 50%"
  },
  "experience-spa-02": {
    src: "/assets/experience/experience-spa-02.webp",
    alt: "Relaxing warm oil head and neck acupressure massage",
    width: 1000,
    height: 1250,
    focal: "50% 40%"
  },
  "experience-spa-03": {
    src: "/assets/experience/experience-spa-03.webp",
    alt: "Steaming aromatic herbal tea infusion served on dark wooden tray",
    width: 1000,
    height: 1250,
    focal: "50% 50%"
  },

  // Team
  "team-ananya": {
    src: "/assets/team/team-ananya.webp",
    alt: "Portrait of Ananya Sharma, Haute Bridal Lead",
    width: 1000,
    height: 1250,
    focal: "50% 30%"
  },
  "team-rohan": {
    src: "/assets/team/team-rohan.webp",
    alt: "Portrait of Rohan Sen, Senior Hair Alchemist",
    width: 1000,
    height: 1250,
    focal: "50% 30%"
  },
  "team-meera": {
    src: "/assets/team/team-meera.webp",
    alt: "Portrait of Meera Nambiar, Aesthetic Skin Specialist",
    width: 1000,
    height: 1250,
    focal: "50% 30%"
  },
  "team-priya": {
    src: "/assets/team/team-priya.webp",
    alt: "Portrait of Priya Deshmukh, Master Nail Artisan",
    width: 1000,
    height: 1250,
    focal: "50% 30%"
  },

  // Gallery (24 items)
  "gallery-01": { src: "/assets/gallery/gallery-01.webp", alt: "Heritage Kundan & Crimson Silk Bridal Styling", width: 1000, height: 1250, focal: "50% 35%" },
  "gallery-02": { src: "/assets/gallery/gallery-02.webp", alt: "Dewy Contemporary Pastel Muhurtham Look", width: 1000, height: 1000, focal: "50% 40%" },
  "gallery-03": { src: "/assets/gallery/gallery-03.webp", alt: "24-Karat Micro Leaf Bridal Eye Detailing", width: 1000, height: 1250, focal: "50% 35%" },
  "gallery-04": { src: "/assets/gallery/gallery-04.webp", alt: "Ivory Atelier Reception Glow & Satin Finish", width: 1200, height: 800, focal: "50% 40%" },
  "gallery-05": { src: "/assets/gallery/gallery-05.webp", alt: "Velvet French Balayage on Dark Brunette Tresses", width: 1000, height: 1250, focal: "50% 45%" },
  "gallery-06": { src: "/assets/gallery/gallery-06.webp", alt: "Architectural Evening Chignon with Organic Tendrils", width: 1000, height: 1000, focal: "50% 40%" },
  "gallery-07": { src: "/assets/gallery/gallery-07.webp", alt: "Silk Amino Acid Botanical Gloss Treatment", width: 1000, height: 1250, focal: "50% 45%" },
  "gallery-08": { src: "/assets/gallery/gallery-08.webp", alt: "Romantic Texturized Waves with Freshwater Pearl Pins", width: 1200, height: 800, focal: "50% 40%" },
  "gallery-09": { src: "/assets/gallery/gallery-09.webp", alt: "Sunlit Terracotta Editorial Contour", width: 1000, height: 1250, focal: "50% 35%" },
  "gallery-10": { src: "/assets/gallery/gallery-10.webp", alt: "Nocturne Berry Lip & Velvet Complexion", width: 1000, height: 1000, focal: "50% 40%" },
  "gallery-11": { src: "/assets/gallery/gallery-11.webp", alt: "Ethereal Day Gala Luminous Makeup", width: 1000, height: 1250, focal: "50% 35%" },
  "gallery-12": { src: "/assets/gallery/gallery-12.webp", alt: "Modernist Graphic Precision Eye & Peach Nude Gloss", width: 1200, height: 800, focal: "50% 35%" },
  "gallery-13": { src: "/assets/gallery/gallery-13.webp", alt: "Alpine Cryo-Globe Lymphatic Drainage Massage", width: 1000, height: 1250, focal: "50% 40%" },
  "gallery-14": { src: "/assets/gallery/gallery-14.webp", alt: "Organic Cold-Pressed Camellia Elixir Infusion", width: 1000, height: 1000, focal: "50% 50%" },
  "gallery-15": { src: "/assets/gallery/gallery-15.webp", alt: "Deep Sea Collagen & Hyaluronic Hydrogel Infusion", width: 1000, height: 1250, focal: "50% 40%" },
  "gallery-16": { src: "/assets/gallery/gallery-16.webp", alt: "Marma Point Cranial & Facial Decompression", width: 1200, height: 800, focal: "50% 40%" },
  "gallery-17": { src: "/assets/gallery/gallery-17.webp", alt: "Gilded Botanique Soft Gel Architecture", width: 1000, height: 1250, focal: "50% 50%" },
  "gallery-18": { src: "/assets/gallery/gallery-18.webp", alt: "Bespoke Glazed Tortoiseshell & Amber Resin Tips", width: 1000, height: 1000, focal: "50% 50%" },
  "gallery-19": { src: "/assets/gallery/gallery-19.webp", alt: "Boutique Micro-Pearl Embellished Bridal Manicure", width: 1000, height: 1250, focal: "50% 50%" },
  "gallery-20": { src: "/assets/gallery/gallery-20.webp", alt: "Himalayan Pink Salt & Volcanic Basalt Pedicure", width: 1200, height: 800, focal: "50% 50%" },
  "gallery-21": { src: "/assets/gallery/gallery-21.webp", alt: "Private Bridal Dressing & Consultation Suite", width: 1000, height: 1250, focal: "50% 45%" },
  "gallery-22": { src: "/assets/gallery/gallery-22.webp", alt: "Main Styling Floor with Cast Bronze & Fluted Marble Stations", width: 1000, height: 1000, focal: "50% 50%" },
  "gallery-23": { src: "/assets/gallery/gallery-23.webp", alt: "The Hydrotherapy Spa Wash Suite", width: 1000, height: 1250, focal: "50% 50%" },
  "gallery-24": { src: "/assets/gallery/gallery-24.webp", alt: "The Custom Botanical Formulation Bar", width: 1200, height: 800, focal: "50% 50%" },

  // Offers
  "offer-royal-bridal": {
    src: "/assets/offers/offer-royal-bridal.webp",
    alt: "The Royal Vivaha bridal suite experience with private lounge and jewelry tailoring",
    width: 1200,
    height: 800,
    focal: "50% 40%"
  },
  "offer-solstice-glow": {
    src: "/assets/offers/offer-solstice-glow.webp",
    alt: "Paired cryo facial and scalp massage ritual products in warm amber light",
    width: 1200,
    height: 800,
    focal: "50% 50%"
  },
  "offer-evening-soiree": {
    src: "/assets/offers/offer-evening-soiree.webp",
    alt: "Sultry red carpet makeup preparation with champagne crystal glass",
    width: 1200,
    height: 800,
    focal: "50% 45%"
  },

  // Misc & Form Visuals
  "booking-visual": {
    src: "/assets/misc/booking.webp",
    alt: "Serene private consultation alcove at Maison Vespera",
    width: 1200,
    height: 1500,
    focal: "50% 45%"
  },
  "location-visual": {
    src: "/assets/misc/location.webp",
    alt: "Exterior facade of Maison Vespera on Lavelle Crescent",
    width: 1400,
    height: 900,
    focal: "50% 50%"
  },
  "cta-band-visual": {
    src: "/assets/misc/cta-band.webp",
    alt: "Cinematic atmospheric view of Maison Vespera's botanical courtyard",
    width: 1800,
    height: 800,
    focal: "50% 45%"
  },
  "og-image": {
    src: "/assets/misc/og-image.jpg",
    alt: "Maison Vespera luxury salon preview",
    width: 1200,
    height: 630,
    focal: "50% 50%"
  }
};

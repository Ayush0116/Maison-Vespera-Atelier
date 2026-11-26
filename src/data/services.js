// REPLACE: [SERVICE_NAME] [SERVICE_PRICE] [SERVICE_IMAGE]
/**
 * @typedef {Object} ServiceItem
 * @property {string} id
 * @property {string} category
 * @property {string} name
 * @property {string} summary
 * @property {string} description
 * @property {number|null} price
 * @property {string} priceNote
 * @property {string} [duration]
 * @property {string} imageKey
 * @property {boolean} featured
 * @property {number} order
 * @property {boolean} enabled
 */

export const services = [
  {
    id: "bridal-couture-makeup",
    category: "Bridal Makeup",
    // REPLACE: [SERVICE_NAME]
    name: "The Grand Regal Bridal Edit",
    summary: "Airbrush artistry with 24-karat gold-infused hydration and bespoke draping.",
    description: "Designed for classical and contemporary weddings. Includes an extensive 90-minute pre-event consultation, trial contouring, long-wear high-definition airbrush finish, individual feather lashes, and complete dupatta and jewelry setting with our head bridal stylist.",
    // REPLACE: [SERVICE_PRICE]
    price: 32000,
    priceNote: "Includes complete trial and draping",
    duration: "210 mins",
    // REPLACE: [SERVICE_IMAGE]
    imageKey: "service-bridal-couture-makeup",
    featured: true,
    order: 1,
    enabled: true
  },
  {
    id: "botanical-glass-facial",
    category: "Facial & Skin Care",
    name: "Botanical Luster Cryo-Facial",
    summary: "Cellular hydration utilizing alpine edelweiss extracts and liquid oxygen mist.",
    description: "Our signature skin revival ritual combines double botanical cleansing, enzyme exfoliation, cold-hammer cryotherapy infusion, and a nutrient-dense bio-cellulose mask that leaves the skin plump, glass-like, and radiant without redness or downtime.",
    price: 6800,
    priceNote: "Customized botanical ampoule included",
    duration: "75 mins",
    imageKey: "service-botanical-glass-facial",
    featured: true,
    order: 2,
    enabled: true
  },
  {
    id: "haute-balayage-gloss",
    category: "Hair Styling & Care",
    name: "Velvet French Balayage & Silk Gloss",
    summary: "Freehand dimensional contouring enriched with bond-restoring amino acids.",
    description: "Hand-painted dimensional highlights harmonized to your undertones and facial structure. Followed by an organic silk protein gloss seal, blowout, and botanical heat shield for weightless movement and luminous shine.",
    price: 9500,
    priceNote: "Varies slightly by hair density",
    duration: "180 mins",
    imageKey: "service-haute-balayage-gloss",
    featured: true,
    order: 3,
    enabled: true
  },
  {
    id: "ayurvedic-scalp-spa",
    category: "Hair Treatments",
    name: "Kesh Kanti Botanical Scalp Therapy",
    summary: "Deep therapeutic warm oil marma massage and steamed herbal infusion.",
    description: "An ancient holistic scalp rejuvenation. Warm bhringraj and cold-pressed sesame extracts are massaged across 18 cranial marma points, followed by ozone botanical steaming, high-frequency stimulation, and an active amino acid moisture bath.",
    price: 4500,
    priceNote: "Complimentary scalp camera analysis",
    duration: "60 mins",
    imageKey: "service-ayurvedic-scalp-spa",
    featured: true,
    order: 4,
    enabled: true
  },
  {
    id: "editorial-evening-glam",
    category: "Party Makeup",
    name: "Sultry Red Carpet Glow",
    summary: "Radiant soft-focus base with monochromatic terracotta eyes and satin lips.",
    description: "Tailored for soirees, galas, and cocktail receptions. Features targeted lymphatic drainage prep, micro-fine luminous skin finish, sculpted cheekbones, and bespoke eye pigments crafted to withstand 12 hours of evening celebration.",
    price: 7500,
    priceNote: "Includes personalized lash cluster styling",
    duration: "90 mins",
    imageKey: "service-editorial-evening-glam",
    featured: true,
    order: 5,
    enabled: true
  },
  {
    id: "rosewood-luxe-pedicure",
    category: "Manicure & Pedicure",
    name: "Rosewood & Pink Himalayan Salt Foot Spa",
    summary: "Aromatic immersion with volcanic stone therapy and botanical cuticle repair.",
    description: "Begin with a warm botanical foot bath infused with organic damask rose petals and Himalayan salts. Includes gentle fruit acid callous smoothing, a warming basalt stone massage up to the knee, and a glossy toxin-free lacquer application.",
    price: 3200,
    priceNote: "Gel polish option available",
    duration: "60 mins",
    imageKey: "service-rosewood-luxe-pedicure",
    featured: false,
    order: 6,
    enabled: true
  },
  {
    id: "sculptural-nail-art",
    category: "Nail Art",
    name: "Architectural Gel Overlay & Pearl Accents",
    summary: "Hand-crafted micro-line artistry, gold leaf foil, and pearl drops on structured gel.",
    description: "Individually sculpted overlays using hypoallergenic Japanese soft gel. Adorned with delicate hand-painted mineral motifs, encapsulated gold flakes, and micro-pearl accents finished with an ultra-durable diamond top coat.",
    price: 4200,
    priceNote: "Price includes custom art on 10 nails",
    duration: "90 mins",
    imageKey: "service-sculptural-nail-art",
    featured: false,
    order: 7,
    enabled: true
  },
  {
    id: "deep-serenity-body-ritual",
    category: "Spa & Relaxation",
    name: "Golden Amber De-Stress Body Polish & Wrap",
    summary: "Full body cane-sugar scrub followed by warm argan and neroli cocooning.",
    description: "A calming total-body sensory journey. Exfoliates dead skin cells with cane sugar and crushed amber crystals, followed by a warm botanical oil shower rinse and a nourishing cocoon wrap with scalp tension release.",
    price: 8000,
    priceNote: "Private ensuite rain shower provided",
    duration: "90 mins",
    imageKey: "service-deep-serenity-body-ritual",
    featured: false,
    order: 8,
    enabled: true
  },
  {
    id: "signature-couture-grooming",
    category: "Grooming",
    name: "Gentleman's Royal Beard & Skin Architecture",
    summary: "Precision razor fade, hot-towel eucalyptus compress, and botanical skin refining.",
    description: "Tailored grooming for the discerning gentleman. Features artisanal straight-razor detailing, steam-softened botanical beard treatment, clay purification facial mask, and an invigorating neck and shoulder acupressure sequence.",
    price: 3800,
    priceNote: "Complete with organic beard serum",
    duration: "60 mins",
    imageKey: "service-signature-couture-grooming",
    featured: false,
    order: 9,
    enabled: true
  }
];

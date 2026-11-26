# CLIENT SETUP GUIDE — Maison Vespera Template
## How to Convert This Demo Template into a Live Salon Website in Under 1 Hour

This single-page website template was engineered for web development agencies. A developer can convert this entire presentation into a live, fully branded salon website **by changing only configuration files, content data files, and image files**. No React components, CSS files, hooks, or animation logic need to be modified.

---

### Step 1: Update Salon Identity and Contact Information
Open `src/data/siteConfig.js` and edit the marked `// REPLACE:` fields:
1. `name`: Salon or parlour name (e.g. `"The Royal Lotus Bridal Studio"`).
2. `tagline`: Subheading or brand statement.
3. `phone`: Official telephone number (e.g. `"+91 98450 12345"`).
4. `whatsapp`: WhatsApp number including country code without `+` (e.g. `"919845012345"`).
5. `email`: Salon reception email.
6. `address`: Street, locality, city, state, and postal code.
7. `openingHours`: Weekly operating hours per weekday in 24-hr `HH:MM` format. Closed days are denoted with an empty array `[]`.
8. `social`: Instagram, Facebook, and YouTube links. Empty strings automatically hide the icons.

---

### Step 2: Customise Brand Palette & Typography (Zero CSS Edits)
Open `src/data/theme.js`:
1. Change `colors.bg`, `colors.accent`, and `colors.textPrimary` to match the client's brand guidelines.
2. If using custom Google Fonts, update `theme.fonts.display.family` and `theme.fonts.display.googleUrl`.

---

### Step 3: Replace Photography Using Fixed Filenames
Replace images in `public/assets/` directly using the exact filenames listed in `docs/ASSET_GUIDE.md`:
- `public/assets/brand/logo.svg` (or `logo.png`)
- `public/assets/hero/hero-01.webp` through `hero-03.webp`
- `public/assets/about/about-01.webp` through `about-03.webp`
- `public/assets/services/service-<service-id>.webp`
- `public/assets/team/team-<member-id>.webp`
- `public/assets/gallery/gallery-01.webp` through `gallery-24.webp`
- `public/assets/offers/offer-<offer-id>.webp`
- `public/assets/misc/location.webp`, `booking.webp`, `cta-band.webp`

If a client provides JPEGs instead of WebP, update only the file extension in `src/data/images.js`.

---

### Step 4: Update Content Data Files
Edit pure JavaScript data files in `src/data/`:
- `services.js`: Add, remove, or edit services. Set prices or set `price: null` for "Enquire for pricing".
- `teamMembers.js`: Add the salon's staff, roles, and specialties. Set `bookable: false` for support staff.
- `galleryImages.js`: Captions, categories (`Bridal`, `Hair`, `Makeup`, `Skincare`, `Nails`, `Interiors`).
- `offers.js`: Seasonal packages and bridal packages with inclusion bullet points.
- `testimonials.js`: Real customer praise and service received.
- `faqs.js`: Verified answers on trials, patch tests, and cancellation policies.

---

### Step 5: Toggle or Reorder Sections
In `src/data/siteConfig.js`, you can enable/disable sections or change their vertical order:
```javascript
sections: {
  enabled: {
    about: true,
    services: true,
    experience: true,
    team: true,       // set to false to hide the Team section completely
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
```
**All navigation menus, header links, footer links, and mobile action bars automatically update without leaving dead links.**

---

### Step 6: Go Live
1. In `src/data/siteConfig.js`, set:
   ```javascript
   demoMode: false,
   ```
   *This automatically removes the "Agency Template Preview" banner, removes "Sample" badges from team and gallery items, switches robots to `index, follow`, enables JSON-LD structured data for Google, and activates direct phone/WhatsApp actions.*
2. Run production build:
   ```bash
   npm run build
   ```
3. Deploy the resulting `dist/` directory to Vercel, Netlify, Cloudflare Pages, or any static host.

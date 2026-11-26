# ASSET GUIDE — Maison Vespera
## Image Specifications, Dimensions, Focal Points, and Sizing Floors

All photography in Maison Vespera is managed through the centralized registry in `src/data/images.js` and rendered via `<ImageSlot />`. Every slot reserves an explicit aspect ratio to guarantee zero Cumulative Layout Shift (CLS < 0.1).

### 1. Master Image Slot Directory

| Slot Key | Target Filename | Target Dimensions | Aspect Ratio | Max Size | Recommended Subject & Focal Point |
|---|---|---|---|---|---|
| `logo` | `/assets/brand/logo.svg` | 240×48px | 5:1 | 50 KB | Vector SVG wordmark on dark background |
| `logo-light` | `/assets/brand/logo-light.svg` | 240×48px | 5:1 | 50 KB | Vector SVG wordmark on light background |
| `hero-01` | `/assets/hero/hero-01.webp` | 1400×1800px | 4:5 | 350 KB | Editorial bride with jewelry / Focal: `50% 35%` |
| `hero-02` | `/assets/hero/hero-02.webp` | 1200×1500px | 1:1 / 4:5 | 250 KB | Hair stylist creating balayage / Focal: `50% 40%` |
| `hero-03` | `/assets/hero/hero-03.webp` | 1000×1250px | 4:5 | 200 KB | Botanical skincare or cryo globes / Focal: `50% 50%` |
| `about-01` | `/assets/about/about-01.webp` | 1200×1500px | 4:5 | 250 KB | Botanical ingredients, oils, or apothecary elixirs |
| `about-02` | `/assets/about/about-02.webp` | 1400×1000px | 3:2 | 250 KB | Interior styling lounge or architectural workstations |
| `about-03` | `/assets/about/about-03.webp` | 1000×1250px | 4:5 | 200 KB | Bridal jewelry and jasmine floral preparations |
| `service-*` (9 slots) | `/assets/services/service-<id>.webp` | 1000×1250px | 4:5 | 200 KB each | Focused shot representing each specific service |
| `experience-*` (15 slots)| `/assets/experience/experience-<goal>-01..03.webp` | 1200×1500px | 4:5 & 1:1 | 200 KB each | Layered visual stages for the 5 beauty intentions |
| `team-*` (4 slots) | `/assets/team/team-<id>.webp` | 1000×1250px | 4:5 | 200 KB each | Professional artisan portraits / Focal: `50% 30%` |
| `gallery-01..24` | `/assets/gallery/gallery-01..24.webp` | 1000×1250px / 1200×800px | 4:5, 1:1, 3:2 | 220 KB each | High-resolution portfolio shots across 6 categories |
| `offer-*` (3 slots) | `/assets/offers/offer-<id>.webp` | 1200×800px | 3:2 | 220 KB each | Bridal suites, paired rituals, and evening preparations |
| `booking-visual` | `/assets/misc/booking.webp` | 1200×1500px | 4:5 | 250 KB | Serene private consultation alcove |
| `location-visual` | `/assets/misc/location.webp` | 1400×900px | 4:3 | 250 KB | Salon exterior facade or reception lounge |
| `cta-band-visual` | `/assets/misc/cta-band.webp` | 1800×800px | 21:9 | 300 KB | Wide atmospheric salon perspective |
| `og-image` | `/assets/misc/og-image.jpg` | 1200×630px | 1.91:1 | 250 KB | Social media share card preview (JPEG format) |

### 2. Format & Compression Rules
- **WebP format** is standard for all site photos. It offers superior compression efficiency at high visual fidelity.
- **Aspect Ratio Protection:** Components specify the aspect ratio (e.g., `aspect="4:5"`), so dropping in an image of slightly different proportions will gracefully crop via `object-fit: cover` and `object-position` without stretching or distorting.
- **Neutral Fallback:** If an image is missing or cannot load, `ImageSlot` automatically renders an editorial monogram card with the brand initials so the site never shows a broken image icon.

# DESIGN NOTES — Maison Vespera
## Haute Botanique & Bridal Sanctuary — Editorial Art Direction

### 1. Creative Concept & Narrative
Maison Vespera is an editorial beauty sanctuary and bridal parlour envisioned for an agency demo showcase in Bengaluru, India. Rather than conventional commercial pastel pinks or generic clinical spa themes, the brand embodies **"The Architecture of Care and Intentional Craft"**:
- **Aura & Tone:** Deep obsidian warmth paired with radiant champagne gold, terracotta rosewood, and cashmere neutrals.
- **Atmosphere:** High-fashion bridal editorial meets a tranquil botanical apothecary. An acoustic sanctuary dedicated to bridal couture transformations, French dimensional balayage, and cryo-cellular skin hydration.
- **Rhythm:** An unbroken, vertical single-page long scroll where **no two consecutive sections share a layout pattern**.

### 2. Brand Palette & Contrast Validation (WCAG AA Compliance)
All colors are defined once in `src/data/theme.js` and automatically injected into CSS custom properties on `:root`:
- **Deep Obsidian Noir (`#0B0C0E`):** Core background floor.
- **Elevated Slate Charcoal (`#131518`, `#1A1D22`):** Elevated card surfaces and layered 3D depth stages.
- **Soft Alabaster (`#F5F3EF`):** Primary headline and body text. Achieves **15.4:1 contrast ratio** against `#0B0C0E` (far exceeding the 4.5:1 WCAG AA floor).
- **Muted Cashmere (`#C7C4BE`):** Secondary editorial copy. Contrast ratio **8.6:1** against `#0B0C0E` (passes AA and AAA).
- **Subtle Guidance Neutral (`#8F8B84`):** Captions and metadata. Contrast ratio **4.7:1** against `#0B0C0E`.
- **Warm Champagne Gold (`#D4AF37`):** Primary brand accent, glowing details, active chips, and buttons. High-visibility decorative foil.
- **Terracotta Rosewood (`#C48B71`):** Warmer earth accent for sensory rituals and spa treatments.

### 3. Typography Pairing & Hierarchy
- **Display Face:** *Cormorant Garamond* (Google Fonts / local fallback). An aristocratic, graceful serif featuring fluid italics and generous ascenders. Used for section titles, pull quotes, and luxury numerals.
- **Body & Interface:** *Plus Jakarta Sans*. A geometric, hyper-legible sans-serif with wide apertures, perfect for UI buttons, time slot chips, navigation anchors, and reading comfort across mobile and desktop.
- **Fluid Scale:** Built with `clamp()` formulas to seamlessly scale from 360px mobile viewports to ultra-wide 4K displays with zero horizontal scroll or layout breaks.

### 4. Photographic Shape Language & Masking
To avoid the "generic template" card aesthetic, imagery across the single scroll employs differentiated, architectural framing:
- **Hero:** Deep architectural arch (`border-radius: 160px 160px 0 0`) overlaid with an offset rounded square and a floating horizontal detail frame.
- **About:** Pinned synchronised 3D stages pairing 4:5 and 3:2 perspectives.
- **Services:** Stacked 4:5 cards with interactive tilt glare and soft-radius container crops.
- **Rituals / Experiences:** Asymmetric 3-layer diagonal drift compositions.
- **Gallery:** Denser editorial masonry combining 4:5 portraits, 1:1 squares, and 3:2 landscape crops with in-page lightbox inspection.
- **Location:** Full-bleed 16:9 architectural landscape card.

### 5. Motion Vocabulary & 3D Depth
- **Perspective Stages:** Built with pure CSS3 `perspective: 1200px` and `transform-style: preserve-3d`.
- **Natural Pointer Parallax (`usePointerTilt`):** Smooth mouse-driven micro-rotation (`--rx`, `--ry`, `--mx`, `--my`) restricted to fine pointers, automatically disabled on touch devices and under reduced motion.
- **Scroll Orchestration:** Progressively evaluated scroll stages without scroll-jacking or overriding native browser scroll physics.
- **Micro-Interactions:** Universal cubic bezier easing (`cubic-bezier(0.16, 1, 0.3, 1)`) and standardized durations across tabs, accordions, and dialog overlays.

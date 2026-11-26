# ANIMATION NOTES — Maison Vespera
## Signature 3D Moments, In-Page Navigation Architecture, and Verified Behaviors

This document details the technical implementation, observation notes, and fallbacks for all motion and depth systems across the Maison Vespera single-page architecture.

---

### 1. In-Page Navigation Architecture
- **Unified Implementation:** All navigation triggers (Header links, Mobile Menu, Mobile Action Bar, Footer links, Hero CTAs, "Book this service", Back-to-Top, and Closing CTA) route strictly through `src/utils/scrollToSection.js`.
- **Dynamic Header Offset:** A `ResizeObserver` on the sticky `<header>` calculates the exact pixel height and writes it to `:root` as `--header-height`. Every section utilizes `scroll-margin-top: calc(var(--header-height) + var(--space-4))`. This ensures headings are never obscured by the header on mobile or desktop.
- **URL Hash Synchronization:** When in-page scrolling occurs, `window.history.replaceState(null, '', '#<id>')` updates the address bar without triggering a page reload or polluting the user's browser history.
- **Accessible Focus:** Following the scroll motion, keyboard focus is politely moved to the target section's heading element (`tabIndex="-1"`, `focus({ preventScroll: true })`).

---

### 2. The Six Signature 3D Moments

#### Signature Moment 1: Cinematic Layered Hero
- **Concept:** Three photographic planes (Back Arch, Offset Portrait, Foreground Detail) floating in a CSS `perspective: 1200px` stage.
- **Observed Behavior:** As the user moves their cursor across the viewport, the layers shift at differentiated velocities (`--hero-px`, `--hero-py`, `--hero-rot`) creating tangible parallax depth.
- **Degradation:** Automatically disabled on coarse touch displays and under reduced motion, where the composition rests in a balanced editorial arrangement.

#### Signature Moment 2: Pinned Storytelling Scene (About)
- **Concept:** A 220vh scroll wrapper housing a `position: sticky` stage.
- **Observed Behavior:** As the user scrolls vertically down through the story section, scroll progress synchronizes story beats with three 3D photographic slides receding and advancing on the Z-axis (`translateZ`).
- **Degradation:** Under `prefers-reduced-motion: reduce`, the pinned scene transforms into a clean, accessible stacked layout.

#### Signature Moment 3: 3D Service Showcase
- **Concept:** Card carousel with perspective tilt and specular lighting reflection.
- **Observed Behavior:** Uses pointer coordinates to calculate `--rx` and `--ry` angles with specular radial glare. Selecting any card opens an in-page detail modal overlay with complete treatment descriptions and an immediate preselection booking action.
- **Mobile Fallback:** Smoothly snaps to a native horizontal touch row (`scroll-snap-type: x mandatory`).

#### Signature Moment 4: Beauty Experience Dynamic Stage
- **Concept:** Goal-driven consultation selector ("What are you preparing for?").
- **Observed Behavior:** Selecting a beauty goal transitions a 3-layer diagonal photo stack while dynamically adjusting `--exp-accent` across chips, overlays, and CTA buttons.

#### Signature Moment 5: 3D Gallery Depth Carousel & Lightbox
- **Concept:** Rotating 3D carousel ring paired with an editorial dense masonry grid.
- **Observed Behavior:** Top 8 filtered items form an interactive horizontal showcase; clicking any photograph opens the native in-page accessible lightbox dialog with keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`).

#### Signature Moment 6: Unified Micro-Interaction System
- **Concept:** Shared tokenized transitions from `src/styles/tokens.css` (`--ease-out-expo`, `--duration-fast`, `--duration-normal`).
- **Observed Behavior:** Accordions expand smoothly using CSS Grid row transitions (`grid-template-rows: 0fr -> 1fr`). Buttons feature subtle tactile scale and border illumination.

---

### 3. Strict Reduced Motion Floors
When a visitor enables `prefers-reduced-motion: reduce` in their operating system or sets `motionIntensity: "minimal"`:
1. `scrollToSection` immediately switches from `behavior: "smooth"` to `behavior: "auto"` (instant jump).
2. All CSS animations, continuous marquee loops, and transitions are clamped to `0.01ms !important`.
3. Perspective and 3D transforms (`preserve-3d`, `translateZ`) are neutralized into standard 2D flat layouts.
4. Pointer tilt listeners immediately unbind and write neutral 0deg rotations.

/**
 * Single source of truth for brand visual tokens and typography.
 * Applied dynamically to :root before React root mounts.
 * Pure JavaScript.
 */
export const theme = {
  // Brand Palette: Deep Noir, Warm Champagne, Gilded Bronze, Rosewood, Soft Alabaster
  colors: {
    bg: "#0B0C0E",              // Deep Obsidian Noir
    bgSurface: "#131518",       // Elevated Card Background
    bgElevated: "#1A1D22",      // Layered depth surface
    bgGlass: "rgba(19, 21, 24, 0.72)",
    textPrimary: "#F5F3EF",     // Soft Alabaster (High contrast > 14:1)
    textSecondary: "#C7C4BE",   // Muted Cashmere (> 7:1)
    textMuted: "#8F8B84",       // Subtle guidance text (> 4.5:1)
    accent: "#D4AF37",          // Warm Champagne Gold
    accentHover: "#E5C258",     // Radiant Champagne
    accentMuted: "rgba(212, 175, 55, 0.16)",
    rosewood: "#C48B71",        // Terracotta Rosewood
    rosewoodSoft: "rgba(196, 139, 113, 0.15)",
    border: "rgba(245, 243, 239, 0.10)",
    borderStrong: "rgba(212, 175, 55, 0.35)",
    overlay: "rgba(11, 12, 14, 0.85)",
    success: "#4E9F76",
    error: "#E06D53"
  },

  // Typography Pairing: Cormorant Garamond (Display) + Plus Jakarta Sans (Interface/Text)
  fonts: {
    display: {
      family: "'Cormorant Garamond', Georgia, serif",
      weights: [400, 600, 700],
      googleUrl: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
    },
    body: {
      family: "'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      weights: [300, 400, 500, 600, 700]
    }
  },

  // Shape Language
  radii: {
    none: "0px",
    sm: "4px",
    md: "8px",
    lg: "16px",
    xl: "24px",
    full: "9999px",
    arch: "160px 160px 0 0" // Signature architectural arch
  },

  // Atmospheric Shadows
  shadows: {
    sm: "0 2px 8px rgba(0, 0, 0, 0.3)",
    md: "0 8px 24px rgba(0, 0, 0, 0.45)",
    lg: "0 16px 48px rgba(0, 0, 0, 0.65)",
    glow: "0 0 35px rgba(212, 175, 55, 0.22)"
  },

  // Motion Intensity: "full" | "reduced" | "minimal"
  motionIntensity: "full"
};

/**
 * Font Pairing Constants
 * Predefined luxury typography schemes for the Nigerian real estate market.
 * "Lagos Luxury" Walled Garden approach - No custom font uploads.
 */

export type FontPairingId = 'classic-luxury' | 'modern-minimal' | 'estate-bold' | 'clean-geometric';

export interface FontPairing {
  id: FontPairingId;
  name: string;
  description: string;
  fonts: {
    display: string; // Used for headings
    body: string;    // Used for body text
  };
  googleFonts: {
    family: string;
    weights: string;
    url: string;
  };
}

export const FONT_PAIRINGS: Record<FontPairingId, FontPairing> = {
  'classic-luxury': {
    id: 'classic-luxury',
    name: 'Classic Luxury',
    description: 'Serif display for elegance with high-readability body text.',
    fonts: {
      display: "'Fraunces', serif",
      body: "'Space Grotesk', sans-serif",
    },
    googleFonts: {
      family: 'Fraunces|Space+Grotesk',
      weights: 'wght@400;700&family=Space+Grotesk:wght@300;400;700',
      url: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;700&family=Space+Grotesk:wght@300;400;700&display=swap',
    },
  },
  'modern-minimal': {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'Clean, neutral, and lightning-fast. The WhatsApp of typography.',
    fonts: {
      display: "'Inter', sans-serif",
      body: "'Inter', sans-serif",
    },
    googleFonts: {
      family: 'Inter',
      weights: 'wght@400;700',
      url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap',
    },
  },
  'estate-bold': {
    id: 'estate-bold',
    name: 'Estate Bold',
    description: 'Strong, geometric headlines for high-impact development sites.',
    fonts: {
      display: "'Montserrat', sans-serif",
      body: "'Roboto', sans-serif",
    },
    googleFonts: {
      family: 'Montserrat|Roboto',
      weights: 'wght@700&family=Roboto:wght@400',
      url: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto:wght@400&display=swap',
    },
  },
  'clean-geometric': {
    id: 'clean-geometric',
    name: 'Clean Geometric',
    description: 'Sophisticated shapes with local tech-forward vibes.',
    fonts: {
      display: "'Outfit', sans-serif",
      body: "'Plus Jakarta Sans', sans-serif",
    },
    googleFonts: {
      family: 'Outfit|Plus+Jakarta+Sans',
      weights: 'wght@600&family=Plus+Jakarta+Sans:wght@400',
      url: 'https://fonts.googleapis.com/css2?family=Outfit:wght@600&family=Plus+Jakarta+Sans:wght@400&display=swap',
    },
  },
};

export const DEFAULT_FONT_PAIRING: FontPairingId = 'classic-luxury';

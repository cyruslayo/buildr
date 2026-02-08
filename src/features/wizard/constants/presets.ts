/**
 * Style Preset Constants
 * Predefined luxury color schemes for the Nigerian real estate market.
 * "Lagos Luxury" Walled Garden approach - No custom pickers.
 */

export type StylePresetId = 'executive-navy' | 'growth-green' | 'luxury-onyx' | 'urgency-red';

export interface StylePreset {
  id: StylePresetId;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
  };
}

export const STYLE_PRESETS: Record<StylePresetId, StylePreset> = {
  'executive-navy': {
    id: 'executive-navy',
    name: 'Executive Navy',
    description: 'Rich blues and gold accents. Radiates stability and institutional trust.',
    colors: {
      primary: '#0F172A', // Slate 900
      secondary: '#334155', // Slate 700
      accent: '#EAB308', // Yellow 500 (Gold)
      background: '#FFFFFF',
      foreground: '#0F172A',
    },
  },
  'growth-green': {
    id: 'growth-green',
    name: 'Growth Green',
    description: 'Vibrant forest greens. Perfect for new developments and organic growth.',
    colors: {
      primary: '#064E3B', // Emerald 900
      secondary: '#065F46', // Emerald 800
      accent: '#10B981', // Emerald 500
      background: '#F0FDF4', // Emerald 50
      foreground: '#064E3B',
    },
  },
  'luxury-onyx': {
    id: 'luxury-onyx',
    name: 'Luxury Onyx',
    description: 'Deep blacks and metallic textures. For ultra-high-end Ikoyi vibes.',
    colors: {
      primary: '#111111',
      secondary: '#222222',
      accent: '#D4AF37', // Metallic Gold
      background: '#050505',
      foreground: '#FFFFFF',
    },
  },
  'urgency-red': {
    id: 'urgency-red',
    name: 'Urgency Red',
    description: 'High-contrast accents. Best for "Sold Out Soon" or "Limited Offer".',
    colors: {
      primary: '#7F1D1D', // Red 900
      secondary: '#991B1B', // Red 800
      accent: '#EF4444', // Red 500
      background: '#FEF2F2', // Red 50
      foreground: '#7F1D1D',
    },
  },
};

export const DEFAULT_STYLE_PRESET: StylePresetId = 'executive-navy';

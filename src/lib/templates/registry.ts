/**
 * Template Registry
 * 
 * Central registry of all available templates for the Buildr platform.
 * Each template is defined with metadata for discovery and rendering.
 */

import type { TemplateDefinition, TemplateCategory } from './types';

/**
 * All available templates in the system
 */
export const TEMPLATE_REGISTRY: TemplateDefinition[] = [
  // === LUXURY TEMPLATES ===
  {
    id: 'tmpl_listing_luxury_ng',
    name: 'Banana Island Villa',
    category: 'luxury',
    description: 'Premium dark theme with gold accents for ultra-luxury properties',
    thumbnail: '/templates/banana-island-villa.webp',
    defaultPreset: 'luxury_dark',
    requiredFields: ['price', 'beds', 'baths', 'sqm', 'location'],
    artDirection: {
      targetEmotion: "I've arrived",
      storyArc: 'Hero reveal → Features showcase → Lifestyle → Contact',
      layoutRatio: '2:3 asymmetric split (Brodovitch)',
    },
  },
  {
    id: 'tmpl_ikoyi_penthouse',
    name: 'Ikoyi Penthouse',
    category: 'luxury',
    description: 'Vertical scroll story for exclusive penthouses',
    thumbnail: '/templates/ikoyi-penthouse.webp',
    defaultPreset: 'luxury_cream',
    requiredFields: ['price', 'beds', 'baths', 'sqm', 'location'],
    artDirection: {
      targetEmotion: 'Exclusive lifestyle',
      storyArc: 'Full-height scroll sections with parallax',
      layoutRatio: 'Vertical scroll story',
    },
  },
  {
    id: 'tmpl_maitama_mansion',
    name: 'Maitama Mansion',
    category: 'luxury',
    description: 'Symmetrical grandeur for Abuja luxury properties',
    thumbnail: '/templates/maitama-mansion.webp',
    defaultPreset: 'luxury_dark',
    requiredFields: ['price', 'beds', 'baths', 'sqm', 'location'],
    artDirection: {
      targetEmotion: 'Timeless elegance',
      storyArc: 'Classic symmetric layout with marble textures',
      layoutRatio: 'Symmetric grandeur',
    },
  },

  // === STANDARD TEMPLATES ===
  {
    id: 'tmpl_lekki_family',
    name: 'Lekki Family Home',
    category: 'standard',
    description: 'Warm and inviting for family homes in Lekki',
    thumbnail: '/templates/lekki-family-home.webp',
    defaultPreset: 'professional_blue',
    requiredFields: ['price', 'beds', 'baths', 'sqm', 'location'],
    artDirection: {
      targetEmotion: 'Your family belongs here',
      storyArc: 'Hero → Features grid → Lifestyle → Contact',
      layoutRatio: 'Card-based with hover animations',
    },
  },
  {
    id: 'tmpl_modern_duplex',
    name: 'Modern Duplex',
    category: 'standard',
    description: 'Clean geometric design for modern duplexes',
    thumbnail: '/templates/modern-duplex.webp',
    defaultPreset: 'professional_slate',
    requiredFields: ['price', 'beds', 'baths', 'sqm', 'location'],
    artDirection: {
      targetEmotion: 'Contemporary living',
      storyArc: 'Bento grid layout with stats counter',
      layoutRatio: 'Bento asymmetric grid',
    },
  },
  {
    id: 'tmpl_terrace_life',
    name: 'Terrace Life',
    category: 'standard',
    description: 'Community-focused design for terrace properties',
    thumbnail: '/templates/terrace-life.webp',
    defaultPreset: 'modern_mint',
    requiredFields: ['price', 'beds', 'baths', 'sqm', 'location'],
    artDirection: {
      targetEmotion: 'Join the neighborhood',
      storyArc: 'Multi-property showcase with social proof',
      layoutRatio: 'Community grid',
    },
  },
];

/**
 * Get all templates, optionally filtered by category
 */
export function getTemplatesFromRegistry(category?: TemplateCategory): TemplateDefinition[] {
  if (category) {
    return TEMPLATE_REGISTRY.filter(t => t.category === category);
  }
  return [...TEMPLATE_REGISTRY];
}

/**
 * Find a template by ID
 */
export function findTemplateById(id: string): TemplateDefinition | undefined {
  return TEMPLATE_REGISTRY.find(t => t.id === id);
}

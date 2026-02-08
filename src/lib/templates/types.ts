/**
 * Template System Types
 * 
 * TypeScript interfaces for the Buildr template system.
 * Nigerian real estate specific types and structures.
 */

import { z } from 'zod';

// ============================================================================
// ZOD SCHEMAS (BLDR-3TPL-001)
// ============================================================================

/**
 * Template category schema - aligned with 08-TEMPLATE-LIBRARY.md
 * Note: 'luxury' and 'standard' are sub-categories of 'listing'
 */
export const TemplateCategorySchema = z.enum([
  'listing',     // Property listing (duplex, flat, terrace, luxury, standard)
  'land',        // Land/plot sale
  'agent',       // Agent bio/profile
  'shortlet',    // Short-let apartment
  'estate',      // Off-plan/estate development
  'inspection',  // Property inspection booking
  'agency',      // Agency about page
]);

/** Template variable schema */
export const TemplateVariableSchema = z.object({
  key: z.string(),
  label: z.string(),
  type: z.enum(['text', 'number', 'image', 'color', 'currency', 'phone', 'naira', 'sqm', 'select', 'multiselect']),
  defaultValue: z.string().optional(),
  placeholder: z.string().optional(),
  options: z.array(z.string()).optional(),
  required: z.boolean().default(false),
  validation: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
    pattern: z.string().optional(),
  }).optional(),
});

/**
 * Full Template Schema with Zod validation
 * Used for API validation and type inference
 */
export const TemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  category: TemplateCategorySchema,
  code: z.string(),
  thumbnailUrl: z.string().optional(),
  previewUrl: z.string().optional(),
  isPremium: z.boolean().default(false),
  nigeriaSpecific: z.boolean(),
  tags: z.array(z.string()).default([]),
  variables: z.array(TemplateVariableSchema).optional(),
  systemPromptOverride: z.string().optional(),
  requiredSections: z.array(z.string()).optional(),
});

/** Inferred TypeScript types from Zod schemas */
export type TemplateCategoryType = z.infer<typeof TemplateCategorySchema>;
export type TemplateVariableType = z.infer<typeof TemplateVariableSchema>;
export type TemplateType = z.infer<typeof TemplateSchema>;

// ============================================================================
// LEGACY TYPES (kept for backwards compatibility with existing templates)
// ============================================================================

/** Template category for filtering (legacy - use TemplateCategorySchema) */
export type TemplateCategory = 
  | 'luxury' 
  | 'standard' 
  | 'land' 
  | 'agent' 
  | 'shortlet' 
  | 'estate';

/** Nigerian property features */
export type NigerianFeature =
  | 'borehole'
  | 'bq'
  | 'generator_house'
  | 'security_post'
  | 'cctv'
  | 'interlocked'
  | 'tarred_road'
  | 'swimming_pool'
  | 'fitted_kitchen'
  | 'pop_ceiling'
  | 'ensuite'
  | 'gated_estate';

/** Nigerian document types for land/property */
export type DocumentType =
  | 'c_of_o'
  | 'governor_consent'
  | 'deed_of_assignment'
  | 'survey_plan'
  | 'building_approval';

/** Color preset identifier */
export type ColorPreset =
  | 'luxury_dark'
  | 'luxury_cream'
  | 'professional_blue'
  | 'professional_slate'
  | 'modern_gradient'
  | 'modern_mint'
  | 'warm_terracotta'
  | 'warm_burgundy';

/**
 * Template definition stored in the registry
 * Unified type for all templates (art-directed + MVP)
 */
export interface TemplateDefinition {
  /** Unique template identifier (e.g., 'tmpl_listing_luxury_ng') */
  id: string;
  
  /** Display name for the template */
  name: string;
  
  /** Template category */
  category: TemplateCategory;
  
  /** Short description */
  description: string;
  
  /** Path to preview thumbnail */
  thumbnail?: string;
  
  /** Default color preset */
  defaultPreset: ColorPreset;
  
  /** Required props for this template */
  requiredFields: (keyof PropertyData)[];
  
  /** Art direction brief */
  artDirection?: {
    targetEmotion: string;
    storyArc: string;
    layoutRatio: string;
  };
  
  /** HTML template code (Handlebars syntax) */
  code?: string;
  
  /** Is this a premium template */
  isPremium?: boolean;
  
  /** Is Nigeria-specific */
  nigeriaSpecific?: boolean;
  
  /** Template tags for filtering */
  tags?: string[];
}

/**
 * Property data passed to templates for rendering
 */
export interface PropertyData {
  /** Price in Naira */
  price: number;
  
  /** Number of bedrooms */
  beds: number;
  
  /** Number of bathrooms */
  baths: number;
  
  /** Area in square meters */
  sqm: number;
  
  /** Location string (e.g., 'Lekki Phase 1, Lagos') */
  location: string;
  
  /** Property title/name */
  title?: string;
  
  /** Property description */
  description?: string;
  
  /** Number of parking spaces */
  parking?: number;
  
  /** Nigerian features */
  features?: readonly NigerianFeature[];
  
  /** Document status */
  documents?: DocumentType[];
  
  /** WhatsApp number for CTA */
  whatsappNumber?: string;
  
  /** Pre-filled WhatsApp message */
  whatsappMessage?: string;
  
  /** Property images */
  images?: string[];
  
  /** Agent/company name */
  agentName?: string;
  
  /** Agent RC number */
  rcNumber?: string;
  
  /** Is verified listing */
  isVerified?: boolean;
  
  /** Selected style preset ID (Story 3.4) */
  stylePreset?: string;
  fontPairing?: string;
}

/**
 * Rendered template result
 */
export interface RenderResult {
  /** Rendered HTML string */
  html: string;
  
  /** Styles to include */
  styles?: string;
  
  /** Scripts to include */
  scripts?: string;
}

/**
 * Template registry entry with component reference
 */
export interface TemplateRegistryEntry extends TemplateDefinition {
  /** React component for rendering */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
}

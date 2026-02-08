// src/lib/prompts/prompt-builder.ts
// Constrained Prompt Builder for Nigerian Real Estate Content Enhancement

import { NIGERIA_SYSTEM_PROMPT } from './system-prompt';

// ============================================================================
// Types
// ============================================================================

export type PageType = 'listing' | 'land' | 'agent' | 'shortlet' | 'estate' | 'inspection' | 'agency';

export interface PropertyContent {
  propertyType: string;
  price: number;
  beds?: number;
  baths?: number;
  sqm: number;
  city: string;
  area: string;
  features: string[];
  description?: string;
  transactionType?: 'sale' | 'rent';
  parking?: number;
  estate?: string;
}

export interface StyleData {
  preset: string;
  colorScheme?: string;
  customColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  mood?: string[];
  theme?: 'light' | 'dark';
}

export interface WhatsAppConfig {
  number: string;
  message: string;
  showFloating: boolean;
}

export interface WizardData {
  pageType: PageType;
  content: PropertyContent;
  style: StyleData;
  whatsapp: WhatsAppConfig;
}

export interface PromptPayload {
  system: string;
  user: string;
  context: string;
}

// ============================================================================
// Helpers
// ============================================================================

/**
 * Format a number with Nigerian thousand separators
 */
function formatNumber(num: number): string {
  return num.toLocaleString('en-NG');
}

/**
 * Format price in Naira
 */
function formatNaira(price: number): string {
  return `₦${formatNumber(price)}`;
}

/**
 * Convert Nigerian phone number to international WhatsApp format
 * Converts 08012345678 to 2348012345678
 */
function formatWhatsAppNumber(number: string): string {
  // Remove any spaces or dashes
  const cleaned = number.replace(/[\s-]/g, '');
  
  // If starts with 0, replace with 234
  if (cleaned.startsWith('0')) {
    return `234${cleaned.slice(1)}`;
  }
  
  // If already starts with 234, return as-is
  if (cleaned.startsWith('234')) {
    return cleaned;
  }
  
  // Otherwise, prepend 234
  return `234${cleaned}`;
}

/**
 * Generate WhatsApp click-to-chat URL
 */
function generateWhatsAppLink(config: WhatsAppConfig): string {
  const intlNumber = formatWhatsAppNumber(config.number);
  const encodedMessage = encodeURIComponent(config.message);
  return `https://wa.me/${intlNumber}?text=${encodedMessage}`;
}

// ============================================================================
// Prompt Building
// ============================================================================

/**
 * Format property content data for the prompt
 */
function formatPropertyData(content: PropertyContent): string {
  const lines: string[] = [
    `Property Type: ${content.propertyType.replace(/_/g, ' ')}`,
    `Price: ${formatNaira(content.price)}`,
  ];

  if (content.transactionType) {
    lines.push(`Transaction: ${content.transactionType}${content.transactionType === 'rent' ? ' (per year)' : ''}`);
  }

  if (content.beds !== undefined) {
    lines.push(`Bedrooms: ${content.beds}`);
  }

  if (content.baths !== undefined) {
    lines.push(`Bathrooms: ${content.baths}`);
  }

  lines.push(`Size: ${content.sqm} sqm`);

  if (content.parking !== undefined) {
    lines.push(`Parking: ${content.parking} spaces`);
  }

  lines.push(`City: ${content.city}`);
  lines.push(`Area: ${content.area}`);

  if (content.estate) {
    lines.push(`Estate: ${content.estate}`);
  }

  if (content.features.length > 0) {
    lines.push(`Features: ${content.features.join(', ')}`);
  }

  if (content.description) {
    lines.push(`Description: ${content.description}`);
  }

  return lines.join('\n');
}

/**
 * Format style specifications for the prompt
 */
function formatStyleSpecs(style: StyleData): string {
  const lines: string[] = [
    `Visual Style: ${style.preset}`,
  ];

  if (style.colorScheme) {
    lines.push(`Color Scheme: ${style.colorScheme}`);
  }

  if (style.customColors) {
    lines.push(`Custom Colors:`);
    lines.push(`  Primary: ${style.customColors.primary}`);
    lines.push(`  Secondary: ${style.customColors.secondary}`);
    lines.push(`  Accent: ${style.customColors.accent}`);
  }

  if (style.mood && style.mood.length > 0) {
    lines.push(`Mood: ${style.mood.join(', ')}`);
  }

  if (style.theme) {
    lines.push(`Theme: ${style.theme}`);
  }

  return lines.join('\n');
}

/**
 * Format WhatsApp configuration for the prompt
 */
function formatWhatsAppConfig(config: WhatsAppConfig): string {
  const intlNumber = formatWhatsAppNumber(config.number);
  const link = generateWhatsAppLink(config);

  return `
Phone: +${intlNumber}
Pre-filled message: "${config.message}"
Floating button: ${config.showFloating ? 'Yes' : 'No'}
Link format: ${link}
WhatsApp URL: https://wa.me/${intlNumber}
`.trim();
}

/**
 * Build context payload with Nigerian-specific references
 */
function buildContextPayload(pageType: PageType): string {
  return `
## CONTEXT: Nigerian Real Estate Market

Page Type: ${pageType}

### Nigerian Property Features Reference
- Bore Hole: Private water supply (critical due to public water issues)
- Generator House: Dedicated space for backup power generator
- BQ (Boys Quarters): Staff accommodation, common in luxury properties
- C of O (Certificate of Occupancy): Land title document
- Governor's Consent: Required for property transfer
- POP Ceiling: Plaster of Paris decorative ceiling
- Interlocked Compound: Paved driveway with interlocking stones

### Nigerian Location Context
- Lagos: Commercial capital (Lekki, Ikoyi, Victoria Island, Banana Island)
- Abuja: Federal capital (Maitama, Asokoro, Wuse, Garki)
- Port Harcourt: Oil city (GRA Phase 1, Trans Amadi)

### Communication
- WhatsApp is the PRIMARY communication channel
- All inquiries should route to WhatsApp
`.trim();
}

/**
 * Build the user prompt with all structured data
 */
function buildUserPrompt(data: WizardData): string {
  const intlNumber = formatWhatsAppNumber(data.whatsapp.number);
  const whatsappLink = generateWhatsAppLink(data.whatsapp);

  return `
## TASK
Enhance content for a ${data.pageType.toUpperCase()} page targeting Nigerian real estate buyers.

## STRICT REQUIREMENTS
- Target Market: NIGERIA
- Currency: Nigerian Naira (₦)
- Measurements: Square meters (sqm)
- Contact: WhatsApp integration required

## PROPERTY DATA
${formatPropertyData(data.content)}

## STYLE SPECIFICATIONS
${formatStyleSpecs(data.style)}

## WHATSAPP CONFIGURATION
${formatWhatsAppConfig(data.whatsapp)}
WhatsApp Link: ${whatsappLink}
International Number: ${intlNumber}
wa.me URL: https://wa.me/${intlNumber}

## CONSTRAINTS
- Use ONLY the data provided above
- Do NOT add features not specified
- Do NOT use placeholder text - use actual data
- Do NOT use USD, sqft, or American terms
- Include WhatsApp call-to-action references
`.trim();
}

// ============================================================================
// Main Export
// ============================================================================

/**
 * Build a constrained prompt from wizard data for Nigerian real estate content enhancement.
 * 
 * @param wizardData - Structured data from the template wizard
 * @returns PromptPayload with system, user, and context strings
 */
export function buildConstrainedPrompt(wizardData: WizardData): PromptPayload {
  return {
    system: NIGERIA_SYSTEM_PROMPT,
    user: buildUserPrompt(wizardData),
    context: buildContextPayload(wizardData.pageType),
  };
}

// Export helpers for potential reuse
export { formatNaira, formatNumber, formatWhatsAppNumber, generateWhatsAppLink };

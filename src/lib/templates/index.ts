/**
 * Template System
 * 
 * Main entry point for the Buildr template system.
 * Provides functions to get, list, and render templates.
 */

import { findTemplateById, getTemplatesFromRegistry, TEMPLATE_REGISTRY } from './registry';
import { formatNaira, formatArea } from './format';
import type { TemplateDefinition, PropertyData, TemplateCategory } from './types';

// Re-export types
export type { TemplateDefinition, PropertyData, TemplateCategory } from './types';
export type { NigerianFeature, DocumentType, ColorPreset } from './types';

// Re-export formatting utilities
export { formatNaira, formatArea, formatWhatsAppLink, formatNairaShort } from './format';
export { FEATURE_LABELS, DOCUMENT_LABELS } from './format';

/**
 * Get a template definition by ID
 * @param id - Template ID (e.g., 'tmpl_listing_luxury_ng')
 * @returns Template definition or undefined if not found
 */
export async function getTemplate(id: string): Promise<TemplateDefinition | undefined> {
  return findTemplateById(id);
}

/**
 * List all available templates
 * @param category - Optional category filter
 * @returns Array of template definitions
 */
export function listTemplates(category?: TemplateCategory): TemplateDefinition[] {
  return getTemplatesFromRegistry(category);
}

/**
 * Render a template with property data
 * @param templateId - Template ID to render
 * @param data - Property data to inject
 * @returns Rendered HTML string
 * @throws Error if template not found
 */
export async function renderTemplate(templateId: string, data: PropertyData): Promise<string> {
  const template = await getTemplate(templateId);
  
  if (!template) {
    throw new Error(`Template not found: ${templateId}`);
  }
  
  // For now, generate a basic HTML representation
  // In Phase 2, this will use React Server Components for full rendering
  const html = generateBasicHtml(template, data);
  
  return html;
}

/**
 * Generate basic HTML for a template (placeholder implementation)
 * This will be replaced with RSC rendering in BLDR-2TPL-002/003
 */
function generateBasicHtml(template: TemplateDefinition, data: PropertyData): string {
  const formattedPrice = formatNaira(data.price);
  const formattedArea = formatArea(data.sqm);
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.title || `${data.beds} Bedroom Property`} | ${data.location}</title>
  <meta name="description" content="${data.description || `${data.beds} bedroom property in ${data.location} for ${formattedPrice}`}">
</head>
<body>
  <main data-template="${template.id}">
    <header>
      <h1>${data.title || `${data.beds} Bedroom ${template.category === 'luxury' ? 'Luxury' : ''} Property`}</h1>
      <p class="location">${data.location}</p>
    </header>
    
    <section class="pricing">
      <span class="price">${formattedPrice}</span>
    </section>
    
    <section class="details">
      <div class="stat">
        <span class="value">${data.beds}</span>
        <span class="label">Bedrooms</span>
      </div>
      <div class="stat">
        <span class="value">${data.baths}</span>
        <span class="label">Bathrooms</span>
      </div>
      <div class="stat">
        <span class="value">${formattedArea}</span>
        <span class="label">Area</span>
      </div>
      ${data.parking ? `
      <div class="stat">
        <span class="value">${data.parking}</span>
        <span class="label">Parking</span>
      </div>
      ` : ''}
    </section>
    
    ${data.features && data.features.length > 0 ? `
    <section class="features">
      <h2>Features</h2>
      <ul>
        ${data.features.map(f => `<li>${f}</li>`).join('\n        ')}
      </ul>
    </section>
    ` : ''}
    
    <section class="cta">
      <a href="https://wa.me/${data.whatsappNumber?.replace(/\D/g, '') || '2348000000000'}?text=${encodeURIComponent(data.whatsappMessage || `I am interested in this property in ${data.location}`)}" 
         class="whatsapp-btn">
        Chat on WhatsApp
      </a>
    </section>
  </main>
</body>
</html>
`.trim();
}

// Export registry for direct access if needed
export { TEMPLATE_REGISTRY } from './registry';

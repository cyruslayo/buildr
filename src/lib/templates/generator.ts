/**
 * Template Generator
 * 
 * Orchestrates the wizard → template → project flow.
 * Transforms WizardData into PropertyData and creates a Project in the database.
 */

import { prisma } from '@/lib/db';
import { findTemplateById, getTemplatesFromRegistry } from './registry';
import { formatNaira } from './format';
import type { PropertyData } from './types';
import type { PageType, PropertyType } from '@/lib/constants/nigeria-constants';

/**
 * WizardData as received from the guided wizard
 */
export interface WizardData {
  pageType: PageType;
  propertyType?: PropertyType;
  location?: { city: string; area: string };
  features: string[];
  price: number;
  stylePreset?: string;
  whatsapp: {
    number: string;
    message: string;
    showFloating: boolean;
  };
  // Optional additional fields that may be added in the wizard
  title?: string;
  beds?: number;
  baths?: number;
  sqm?: number;
  description?: string;
}

/**
 * Result of generating a project
 */
export interface GenerationResult {
  projectId: string;
  templateId: string;
  previewUrl: string;
}

/**
 * Maps page type to template category for template selection
 */
function pageTypeToCategory(pageType: PageType): string {
  const mapping: Record<PageType, string> = {
    listing: 'standard',
    land: 'land',
    agent: 'agent',
    shortlet: 'shortlet',
    estate: 'estate',
    inspection: 'estate', // Map inspection to estate for now
    agency: 'agent', // Map agency to agent for now
  };
  return mapping[pageType] || 'standard';
}

/**
 * Selects the best template based on wizard data
 */
export function selectTemplate(data: WizardData): string {
  const category = pageTypeToCategory(data.pageType);
  const templates = getTemplatesFromRegistry();
  
  // Try to find a template matching the category
  const matchingTemplates = templates.filter(t => t.category === category);
  
  if (matchingTemplates.length > 0) {
    // If user selected luxury style, prefer luxury templates
    if (data.stylePreset?.includes('luxury')) {
      const luxuryMatch = matchingTemplates.find(t => 
        t.id.includes('luxury') || t.category === 'luxury'
      );
      if (luxuryMatch) return luxuryMatch.id;
    }
    
    // Return first matching template
    return matchingTemplates[0].id;
  }
  
  // Fallback to first available template
  return templates[0]?.id || 'tmpl_listing_luxury_ng';
}

/**
 * Transforms WizardData into PropertyData for template rendering
 */
export function transformToPropertyData(data: WizardData): PropertyData {
  const location = data.location 
    ? `${data.location.area}, ${data.location.city}`
    : 'Lagos, Nigeria';
  
  return {
    // Core property data
    title: data.title || `${data.propertyType || 'Property'} in ${location}`,
    location,
    price: data.price,
    
    // Property details
    beds: data.beds || 4,
    baths: data.baths || 4,
    sqm: data.sqm || 350,
    
    // Features and description
    features: data.features as any, // Wizard features are strings, PropertyData expects specific types
    description: data.description || `Beautiful ${data.propertyType || 'property'} located in ${location}. Contact us for more details.`,
    
    // WhatsApp integration
    whatsappNumber: data.whatsapp.number.replace(/^0/, '234'),
    whatsappMessage: data.whatsapp.message,
    
    // Trust signals (defaults)
    isVerified: true,
    
    // Images (placeholder for now)
    images: ['/templates/luxury-hero.jpg'],
  };
}

/**
 * Maximum projects per user (free tier)
 * Can be overridden via environment variable
 */
const MAX_PROJECTS_FREE = parseInt(process.env.MAX_PROJECTS_FREE || '5', 10);

/**
 * Checks if user has reached their project limit
 */
export async function checkUsageLimit(userId: string): Promise<{ allowed: boolean; count: number; limit: number }> {
  const count = await prisma.project.count({
    where: { userId },
  });
  
  return {
    allowed: count < MAX_PROJECTS_FREE,
    count,
    limit: MAX_PROJECTS_FREE,
  };
}

/**
 * Generates a project from wizard data
 * 
 * @param userId - The authenticated user's ID
 * @param data - Wizard data from the form
 * @returns Generation result with project ID and preview URL
 * @throws Error if user has reached project limit
 */
export async function generateProject(
  userId: string,
  data: WizardData
): Promise<GenerationResult> {
  // 0. Check usage limits
  const usage = await checkUsageLimit(userId);
  if (!usage.allowed) {
    throw new Error(`You have reached your limit of ${usage.limit} projects. Please upgrade or delete existing projects.`);
  }
  
  // 1. Select the best template
  const templateId = selectTemplate(data);
  const template = await findTemplateById(templateId);
  
  if (!template) {
    throw new Error(`Template not found: ${templateId}`);
  }
  
  // 2. Transform to property data
  const propertyData = transformToPropertyData(data);
  
  // 3. Create project in database
  const project = await prisma.project.create({
    data: {
      name: propertyData.title || 'Untitled Project',
      pageType: data.pageType,
      code: JSON.stringify(propertyData), // Store as JSON for now
      userId,
    },
  });
  
  // 4. Return result
  return {
    projectId: project.id,
    templateId,
    previewUrl: `/preview/${project.id}`,
  };
}

/**
 * Gets a project by ID with its data parsed
 */
export async function getProjectWithData(projectId: string) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { user: { select: { email: true, name: true } } },
  });
  
  if (!project) {
    return null;
  }
  
  // Parse the stored JSON data
  const propertyData = JSON.parse(project.code) as PropertyData;
  
  return {
    ...project,
    propertyData,
  };
}

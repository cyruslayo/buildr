/**
 * React Template Registry
 * Maps template IDs to their Art-Directed React Components.
 * Replaces the string-based 'Ghost Templates' (mvp.ts).
 */

import dynamic from 'next/dynamic';
import React from 'react';
import type { PropertyData } from '@/lib/templates/types';

// Dynamic imports to keep bundle size low
const LuxuryListing1 = dynamic(() => import('./luxury-listing-1'));
const StandardListing = dynamic(() => import('./standard-listing'));
const LandSalePage = dynamic(() => import('./land-sale'));
const AgentBioPage = dynamic(() => import('./agent-bio'));
const ShortletApartment = dynamic(() => import('./shortlet-apartment'));
const OffPlanEstate = dynamic(() => import('./offplan-estate'));

export interface TemplateComponentProps {
  data: PropertyData;
}

export type TemplateComponent = React.ComponentType<TemplateComponentProps>;

export const COMPONENT_REGISTRY: Record<string, TemplateComponent> = {
  // Luxury Listings
  'tmpl_listing_luxury_ng': LuxuryListing1,
  
  // Standard Listings
  'tmpl_listing_standard_ng': StandardListing,
  'tmpl_listing_duplex_ng': StandardListing, // Duplex uses Standard for now
  
  // Land Sales
  'tmpl_land_plot_ng': LandSalePage as any,
  
  // Agent Profiles
  'tmpl_agent_bio_ng': AgentBioPage as any,
  'tmpl_agent_team_ng': AgentBioPage as any, // Team page uses Agent Bio layout
  
  // Short-lets
  'tmpl_shortlet_standard_ng': ShortletApartment as any,
  
  // Estates & Developments
  'tmpl_estate_offplan_ng': OffPlanEstate as any,
  
  // Events (Reuse Standard for now)
  'tmpl_event_inspection_ng': StandardListing,
  
  // Location Guides (Reuse Standard for now)
  'tmpl_location_guide_ng': StandardListing,
  
  // Seller Services (Reuse Agent Bio for now)
  'tmpl_company_sellers_ng': AgentBioPage as any,
};

export function getTemplateComponent(id: string): TemplateComponent | null {
  return COMPONENT_REGISTRY[id] || null;
}

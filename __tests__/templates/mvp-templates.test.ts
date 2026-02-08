/**
 * MVP Templates Tests
 * BLDR-3TPL-003: Create 10 MVP Nigerian Templates
 * 
 * Validates all MVP templates meet Nigerian market requirements.
 */

import { MVP_TEMPLATES } from '@/lib/templates/mvp';

describe('MVP Templates', () => {
  it('has 10 templates', () => {
    expect(MVP_TEMPLATES).toHaveLength(10);
  });
  
  it('all templates are Nigeria-specific', () => {
    MVP_TEMPLATES.forEach(t => {
      expect(t.nigeriaSpecific).toBe(true);
    });
  });
  
  it('all templates have valid categories', () => {
    const validCategories = ['listing', 'land', 'agent', 'shortlet', 'estate', 'inspection', 'agency'];
    MVP_TEMPLATES.forEach(t => {
      expect(validCategories).toContain(t.category);
    });
  });
  
  it('listing template contains Naira formatting', () => {
    const listing = MVP_TEMPLATES.find(t => t.category === 'listing');
    expect(listing).toBeDefined();
    expect(listing!.code).toContain('₦');
  });
  
  it('all templates have WhatsApp integration', () => {
    MVP_TEMPLATES.forEach(t => {
      expect(t.code).toMatch(/wa\.me|WhatsApp|whatsapp/i);
    });
  });
  
  it('all templates have sqm measurements', () => {
    const templatesWithSqm = MVP_TEMPLATES.filter(t => 
      t.category === 'listing' || t.category === 'land' || t.category === 'estate'
    );
    templatesWithSqm.forEach(t => {
      expect(t.code).toContain('sqm');
    });
  });
  
  it('all templates have unique IDs', () => {
    const ids = MVP_TEMPLATES.map(t => t.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
  
  it('all templates have required fields', () => {
    MVP_TEMPLATES.forEach(t => {
      expect(t.id).toBeDefined();
      expect(t.name).toBeDefined();
      expect(t.category).toBeDefined();
      expect(t.code).toBeDefined();
      expect(t.nigeriaSpecific).toBeDefined();
    });
  });
  
  it('covers all required MVP categories', () => {
    const categories = new Set(MVP_TEMPLATES.map(t => t.category));
    expect(categories.has('listing')).toBe(true);
    expect(categories.has('land')).toBe(true);
    expect(categories.has('agent')).toBe(true);
    expect(categories.has('shortlet')).toBe(true);
    expect(categories.has('estate')).toBe(true);
    expect(categories.has('inspection')).toBe(true);
    expect(categories.has('agency')).toBe(true);
  });
});

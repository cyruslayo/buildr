/**
 * Template Schema Tests
 * BLDR-3TPL-001: Define Template Data Model
 * 
 * Tests for Zod schema validation of template structures.
 */

import { TemplateSchema, TemplateCategorySchema } from '@/lib/templates/types';

describe('Template Schema', () => {
  it('validates template structure', () => {
    const template = {
      id: 'tmpl_listing_luxury_ng',
      name: 'Luxury Listing',
      category: 'listing',
      code: '<div>Template</div>',
      isPremium: false,
      nigeriaSpecific: true,
    };
    
    expect(() => TemplateSchema.parse(template)).not.toThrow();
  });
  
  it('requires nigeriaSpecific field', () => {
    const template = { 
      id: 'test', 
      name: 'Test',
      category: 'listing',
      code: '<div>Test</div>',
    };
    expect(() => TemplateSchema.parse(template)).toThrow();
  });
  
  it('validates category enum', () => {
    const validCategories = ['listing', 'land', 'agent', 'shortlet', 'estate', 'inspection', 'agency'];
    
    validCategories.forEach(category => {
      expect(() => TemplateCategorySchema.parse(category)).not.toThrow();
    });
  });
  
  it('rejects invalid category', () => {
    expect(() => TemplateCategorySchema.parse('invalid_category')).toThrow();
  });
  
  it('accepts optional fields', () => {
    const template = {
      id: 'tmpl_test',
      name: 'Test Template',
      category: 'listing',
      code: '<div>Test</div>',
      nigeriaSpecific: true,
      thumbnailUrl: '/images/test.webp',
      previewUrl: '/preview/test',
      tags: ['luxury', 'lagos'],
    };
    
    const result = TemplateSchema.parse(template);
    expect(result.thumbnailUrl).toBe('/images/test.webp');
    expect(result.tags).toEqual(['luxury', 'lagos']);
  });
  
  it('defaults isPremium to false', () => {
    const template = {
      id: 'tmpl_test',
      name: 'Test Template',
      category: 'listing',
      code: '<div>Test</div>',
      nigeriaSpecific: true,
    };
    
    const result = TemplateSchema.parse(template);
    expect(result.isPremium).toBe(false);
  });
  
  it('defaults tags to empty array', () => {
    const template = {
      id: 'tmpl_test',
      name: 'Test Template',
      category: 'listing',
      code: '<div>Test</div>',
      nigeriaSpecific: true,
    };
    
    const result = TemplateSchema.parse(template);
    expect(result.tags).toEqual([]);
  });
});

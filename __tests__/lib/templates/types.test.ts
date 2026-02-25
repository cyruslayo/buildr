/**
 * Template Schema Tests
 * BLDR-3TPL-001: Define Template Data Model
 * 
 * Tests for Zod schema validation of template structures.
 */

import { TemplateSchema, TemplateCategorySchema, TemplateVariableSchema } from '@/lib/templates/types';

describe('Template Category Schema', () => {
  it('validates category enum', () => {
    const validCategories = ['listing', 'land', 'agent', 'shortlet', 'estate', 'inspection', 'agency'];
    
    validCategories.forEach(category => {
      expect(() => TemplateCategorySchema.parse(category)).not.toThrow();
    });
  });
  
  it('rejects invalid category', () => {
    expect(() => TemplateCategorySchema.parse('invalid_category')).toThrow();
  });
});

describe('Template Variable Schema', () => {
  it('validates a basic variable', () => {
    const variable = {
      key: 'price',
      label: 'Property Price',
      type: 'naira',
    };

    expect(() => TemplateVariableSchema.parse(variable)).not.toThrow();
  });

  it('handles optional and default fields', () => {
    const variable = {
      key: 'description',
      label: 'Description',
      type: 'text',
      placeholder: 'Enter property description',
      defaultValue: 'No description provided',
    };

    const result = TemplateVariableSchema.parse(variable);
    expect(result.placeholder).toBe('Enter property description');
    expect(result.defaultValue).toBe('No description provided');
    expect(result.required).toBe(false); // default value
  });

  it('validates type enum values', () => {
    const validTypes = ['text', 'number', 'image', 'color', 'currency', 'phone', 'naira', 'sqm', 'select', 'multiselect'];
    validTypes.forEach(type => {
      expect(() => TemplateVariableSchema.parse({
        key: 'test',
        label: 'Test',
        type
      })).not.toThrow();
    });
  });

  it('rejects invalid type', () => {
    expect(() => TemplateVariableSchema.parse({
      key: 'test',
      label: 'Test',
      type: 'invalid_type'
    })).toThrow();
  });

  it('validates validation object', () => {
    const variable = {
      key: 'bedrooms',
      label: 'Bedrooms',
      type: 'number',
      validation: {
        min: 0,
        max: 20,
        pattern: '^[0-9]+$'
      }
    };

    const result = TemplateVariableSchema.parse(variable);
    expect(result.validation?.min).toBe(0);
    expect(result.validation?.max).toBe(20);
    expect(result.validation?.pattern).toBe('^[0-9]+$');
  });

  it('validates select options', () => {
    const variable = {
      key: 'condition',
      label: 'Condition',
      type: 'select',
      options: ['New', 'Renovated', 'Old']
    };

    const result = TemplateVariableSchema.parse(variable);
    expect(result.options).toEqual(['New', 'Renovated', 'Old']);
  });
});

describe('Template Schema', () => {
  const baseTemplate = {
    id: 'tmpl_listing_luxury_ng',
    name: 'Luxury Listing',
    category: 'listing',
    code: '<div>Template</div>',
    nigeriaSpecific: true,
  };

  it('validates template structure', () => {
    expect(() => TemplateSchema.parse(baseTemplate)).not.toThrow();
  });

  it('requires nigeriaSpecific field', () => {
    const { nigeriaSpecific, ...invalidTemplate } = baseTemplate;
    expect(() => TemplateSchema.parse(invalidTemplate)).toThrow();
  });
  
  it('accepts optional fields', () => {
    const template = {
      ...baseTemplate,
      description: 'A luxury template',
      thumbnailUrl: '/images/test.webp',
      previewUrl: '/preview/test',
      tags: ['luxury', 'lagos'],
      systemPromptOverride: 'Always use formal tone.',
      requiredSections: ['hero', 'gallery', 'footer']
    };
    
    const result = TemplateSchema.parse(template);
    expect(result.description).toBe('A luxury template');
    expect(result.thumbnailUrl).toBe('/images/test.webp');
    expect(result.systemPromptOverride).toBe('Always use formal tone.');
    expect(result.requiredSections).toEqual(['hero', 'gallery', 'footer']);
  });
  
  it('defaults isPremium to false', () => {
    const result = TemplateSchema.parse(baseTemplate);
    expect(result.isPremium).toBe(false);
  });
  
  it('defaults tags to empty array', () => {
    const result = TemplateSchema.parse(baseTemplate);
    expect(result.tags).toEqual([]);
  });

  it('validates nested variables', () => {
    const template = {
      ...baseTemplate,
      variables: [
        {
          key: 'price',
          label: 'Price',
          type: 'naira',
          required: true
        },
        {
          key: 'features',
          label: 'Features',
          type: 'multiselect',
          options: ['Pool', 'Gym', 'Security']
        }
      ]
    };
    
    const result = TemplateSchema.parse(template);
    expect(result.variables).toHaveLength(2);
    expect(result.variables?.[0].key).toBe('price');
    expect(result.variables?.[1].type).toBe('multiselect');
  });

  it('rejects invalid nested variables', () => {
    const template = {
      ...baseTemplate,
      variables: [
        {
          key: 'invalid',
          label: 'Invalid',
          type: 'unsupported_type'
        }
      ]
    };

    expect(() => TemplateSchema.parse(template)).toThrow();
  });
});

import { getTemplate, renderTemplate, listTemplates } from '@/lib/templates';

describe('Template System', () => {
  describe('getTemplate', () => {
    it('returns template by ID', async () => {
      const template = await getTemplate('tmpl_listing_luxury_ng');
      expect(template).toBeDefined();
      expect(template!.id).toBe('tmpl_listing_luxury_ng');
    });

    it('returns undefined for non-existent template', async () => {
      const template = await getTemplate('non_existent_template');
      expect(template).toBeUndefined();
    });

    it('includes required template metadata', async () => {
      const template = await getTemplate('tmpl_listing_luxury_ng');
      expect(template).toHaveProperty('id');
      expect(template).toHaveProperty('name');
      expect(template).toHaveProperty('category');
      expect(template).toHaveProperty('description');
    });
  });

  describe('renderTemplate', () => {
    it('renders template with data', async () => {
      const html = await renderTemplate('tmpl_listing_luxury_ng', {
        price: 85000000,
        beds: 4,
        baths: 4,
        sqm: 350,
        location: 'Lekki Phase 1, Lagos',
      });
      expect(html).toContain('₦85,000,000');
      expect(html).toContain('350 sqm');
    });

    it('includes location in rendered output', async () => {
      const html = await renderTemplate('tmpl_listing_luxury_ng', {
        price: 120000000,
        beds: 5,
        baths: 5,
        sqm: 500,
        location: 'Banana Island, Lagos',
      });
      expect(html).toContain('Banana Island');
    });

    it('throws error for non-existent template', async () => {
      await expect(
        renderTemplate('non_existent', { price: 1000, beds: 1, baths: 1, sqm: 50, location: 'Test' })
      ).rejects.toThrow();
    });
  });

  describe('listTemplates', () => {
    it('returns array of templates', () => {
      const templates = listTemplates();
      expect(Array.isArray(templates)).toBe(true);
      expect(templates.length).toBeGreaterThan(0);
    });

    it('includes luxury templates', () => {
      const templates = listTemplates();
      const luxuryTemplates = templates.filter(t => t.category === 'luxury');
      expect(luxuryTemplates.length).toBeGreaterThanOrEqual(1);
    });

    it('includes standard templates', () => {
      const templates = listTemplates();
      const standardTemplates = templates.filter(t => t.category === 'standard');
      expect(standardTemplates.length).toBeGreaterThanOrEqual(1);
    });
  });
});

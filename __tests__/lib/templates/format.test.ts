import { formatNaira, formatArea, formatWhatsAppLink } from '@/lib/templates/format';

describe('Nigerian Formatting Utilities', () => {
  describe('formatNaira', () => {
    it('formats basic amount with Naira symbol', () => {
      expect(formatNaira(85000000)).toBe('₦85,000,000');
    });

    it('formats large amounts correctly', () => {
      expect(formatNaira(850000000)).toBe('₦850,000,000');
    });

    it('formats smaller amounts', () => {
      expect(formatNaira(25000)).toBe('₦25,000');
    });

    it('handles zero', () => {
      expect(formatNaira(0)).toBe('₦0');
    });

    it('rounds decimal values', () => {
      expect(formatNaira(85000000.50)).toBe('₦85,000,001');
    });
  });

  describe('formatArea', () => {
    it('formats area with sqm suffix', () => {
      expect(formatArea(350)).toBe('350 sqm');
    });

    it('formats large areas with comma separator', () => {
      expect(formatArea(1500)).toBe('1,500 sqm');
    });

    it('handles decimal areas', () => {
      expect(formatArea(350.5)).toBe('350.5 sqm');
    });
  });

  describe('formatWhatsAppLink', () => {
    it('generates correct WhatsApp link', () => {
      const link = formatWhatsAppLink('+2348012345678', 'Hello');
      expect(link).toBe('https://wa.me/2348012345678?text=Hello');
    });

    it('encodes message with special characters', () => {
      const link = formatWhatsAppLink('+2348012345678', 'I am interested in this property!');
      expect(link).toContain('text=');
      expect(link).toContain(encodeURIComponent('I am interested in this property!'));
    });

    it('removes plus sign from phone number', () => {
      const link = formatWhatsAppLink('+2348012345678', 'Test');
      expect(link).not.toContain('+');
      expect(link).toContain('2348012345678');
    });

    it('handles phone numbers without plus sign', () => {
      const link = formatWhatsAppLink('2348012345678', 'Test');
      expect(link).toBe('https://wa.me/2348012345678?text=Test');
    });
  });
});

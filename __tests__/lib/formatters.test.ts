import { formatNumberWithCommas, parseNumericValue, formatCurrencyShorthand } from '../../src/lib/formatters';

describe('Formatters', () => {
  describe('formatNumberWithCommas', () => {
    it('formats numbers with thousands separators', () => {
      expect(formatNumberWithCommas(150000000)).toBe('150,000,000');
      expect(formatNumberWithCommas('150000000')).toBe('150,000,000');
    });

    it('returns empty string for invalid input', () => {
      expect(formatNumberWithCommas('abc')).toBe('');
    });
  });

  describe('parseNumericValue', () => {
    it('removes non-numeric characters', () => {
      expect(parseNumericValue('150,000,000')).toBe('150000000');
      expect(parseNumericValue('₦150,000')).toBe('150000');
    });
  });

  describe('formatCurrencyShorthand', () => {
    it('formats values under 1000', () => {
      expect(formatCurrencyShorthand(500)).toBe('500 Naira');
    });

    it('formats thousands', () => {
      expect(formatCurrencyShorthand(50000)).toBe('50 Thousand Naira');
      expect(formatCurrencyShorthand(50500)).toBe('50.5 Thousand Naira');
    });

    it('formats millions', () => {
      expect(formatCurrencyShorthand(150000000)).toBe('150 Million Naira');
      expect(formatCurrencyShorthand(150500000)).toBe('150.5 Million Naira');
    });

    it('formats billions', () => {
      expect(formatCurrencyShorthand(1500000000)).toBe('1.5 Billion Naira');
    });

    it('truncates instead of rounding up', () => {
      expect(formatCurrencyShorthand(1550000)).toBe('1.5 Million Naira');
    });

    it('supports custom suffix', () => {
      expect(formatCurrencyShorthand(1000, 'USD')).toBe('1 Thousand USD');
    });
  });
});

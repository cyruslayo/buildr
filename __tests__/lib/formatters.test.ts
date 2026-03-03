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
    it('formats large numbers into shorthand', () => {
      expect(formatCurrencyShorthand(150000000)).toBe('150 Million Naira');
      expect(formatCurrencyShorthand(1500000)).toBe('1.5 Million Naira');
      expect(formatCurrencyShorthand(2000000000)).toBe('2 Billion Naira');
      expect(formatCurrencyShorthand(2500000000)).toBe('2.5 Billion Naira');
    });

    it('formats smaller numbers with commas', () => {
      expect(formatCurrencyShorthand(750000)).toBe('750,000 Naira');
      expect(formatCurrencyShorthand(1200)).toBe('1,200 Naira');
    });

    it('handles zero', () => {
      expect(formatCurrencyShorthand(0)).toBe('0 Naira');
    });
  });
});

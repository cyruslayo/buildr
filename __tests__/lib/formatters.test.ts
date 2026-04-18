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
    it('formats thousands correctly', () => {
      expect(formatCurrencyShorthand(500000)).toBe('500 Thousand Naira');
      expect(formatCurrencyShorthand(1200)).toBe('1.2 Thousand Naira');
    });

    it('formats millions correctly', () => {
      expect(formatCurrencyShorthand(1500000)).toBe('1.5 Million Naira');
      expect(formatCurrencyShorthand(150000000)).toBe('150 Million Naira');
    });

    it('formats billions correctly', () => {
      expect(formatCurrencyShorthand(1200000000)).toBe('1.2 Billion Naira');
    });

    it('handles zero', () => {
      expect(formatCurrencyShorthand(0)).toBe('0 Naira');
    });

    it('truncates instead of rounding up', () => {
      // 1.99M should be 1.9M, not 2.0M
      expect(formatCurrencyShorthand(1990000)).toBe('1.9 Million Naira');
    });
  });
});

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
      expect(formatCurrencyShorthand(1000)).toBe('1 Thousand');
      expect(formatCurrencyShorthand(1500)).toBe('1.5 Thousand');
      expect(formatCurrencyShorthand(999999)).toBe('999.9 Thousand');
    });

    it('formats millions correctly', () => {
      expect(formatCurrencyShorthand(1000000)).toBe('1 Million');
      expect(formatCurrencyShorthand(1500000)).toBe('1.5 Million');
      expect(formatCurrencyShorthand(1550000)).toBe('1.5 Million'); // Should floor to 1 decimal
    });

    it('formats billions correctly', () => {
      expect(formatCurrencyShorthand(1000000000)).toBe('1 Billion');
      expect(formatCurrencyShorthand(1500000000)).toBe('1.5 Billion');
    });

    it('returns raw number string for values under 1000', () => {
      expect(formatCurrencyShorthand(999)).toBe('999');
      expect(formatCurrencyShorthand(0)).toBe('0');
    });
  });
});

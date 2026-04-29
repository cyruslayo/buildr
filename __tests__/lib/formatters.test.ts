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
    it('formats Billions correctly', () => {
      expect(formatCurrencyShorthand(1_500_000_000)).toBe('1.5 Billion Naira');
      expect(formatCurrencyShorthand(1_000_000_000)).toBe('1 Billion Naira');
    });

    it('formats Millions correctly', () => {
      expect(formatCurrencyShorthand(150_000_000)).toBe('150 Million Naira');
      expect(formatCurrencyShorthand(1_500_000)).toBe('1.5 Million Naira');
    });

    it('formats Thousands correctly', () => {
      expect(formatCurrencyShorthand(850_000)).toBe('850 Thousand Naira');
      expect(formatCurrencyShorthand(1_200)).toBe('1.2 Thousand Naira');
    });

    it('formats small numbers without shorthand', () => {
      expect(formatCurrencyShorthand(850)).toBe('850 Naira');
    });

    it('uses custom suffix', () => {
      expect(formatCurrencyShorthand(1_000_000, 'NGN')).toBe('1 Million NGN');
    });

    it('truncates instead of rounding up', () => {
      // 1.55 Million should be 1.5 Million if we use Math.floor with one decimal
      expect(formatCurrencyShorthand(1_590_000)).toBe('1.5 Million Naira');
    });
  });
});

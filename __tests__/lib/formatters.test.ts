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
    it('formats billions correctly', () => {
      expect(formatCurrencyShorthand(1500000000)).toBe('1.5 Billion Naira');
      expect(formatCurrencyShorthand(1000000000)).toBe('1 Billion Naira');
    });

    it('formats millions correctly', () => {
      expect(formatCurrencyShorthand(150000000)).toBe('150 Million Naira');
      expect(formatCurrencyShorthand(1500000)).toBe('1.5 Million Naira');
      expect(formatCurrencyShorthand(1000000)).toBe('1 Million Naira');
    });

    it('formats thousands correctly', () => {
      expect(formatCurrencyShorthand(150000)).toBe('150 Thousand Naira');
      expect(formatCurrencyShorthand(1500)).toBe('1.5 Thousand Naira');
      expect(formatCurrencyShorthand(1000)).toBe('1 Thousand Naira');
    });

    it('formats small numbers correctly', () => {
      expect(formatCurrencyShorthand(150)).toBe('150 Naira');
    });

    it('handles zero and NaN', () => {
      expect(formatCurrencyShorthand(0)).toBe('');
      expect(formatCurrencyShorthand(NaN)).toBe('');
    });

    it('truncates instead of rounding up', () => {
      // 1,550,000 should be 1.5 Million not 1.6
      expect(formatCurrencyShorthand(1550000)).toBe('1.5 Million Naira');
    });
  });
});

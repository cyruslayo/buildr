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
      expect(formatCurrencyShorthand(1_500_000_000)).toBe('1.5 Billion Naira');
      expect(formatCurrencyShorthand(2_000_000_000)).toBe('2 Billion Naira');
    });

    it('formats millions correctly', () => {
      expect(formatCurrencyShorthand(150_000_000)).toBe('150 Million Naira');
      expect(formatCurrencyShorthand(1_200_000)).toBe('1.2 Million Naira');
    });

    it('formats thousands correctly', () => {
      expect(formatCurrencyShorthand(150_000)).toBe('150 Thousand Naira');
      expect(formatCurrencyShorthand(1_500)).toBe('1.5 Thousand Naira');
    });

    it('formats small amounts correctly', () => {
      expect(formatCurrencyShorthand(500)).toBe('500 Naira');
    });

    it('handles custom suffix', () => {
      expect(formatCurrencyShorthand(1_000_000, 'NGN')).toBe('1 Million NGN');
    });

    it('returns empty string for zero or negative', () => {
      expect(formatCurrencyShorthand(0)).toBe('');
      expect(formatCurrencyShorthand(-100)).toBe('');
    });
  });
});

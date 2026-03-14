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
      expect(formatCurrencyShorthand(50000)).toBe('50 Thousand Naira');
      expect(formatCurrencyShorthand(50500)).toBe('50.5 Thousand Naira');
    });

    it('formats millions correctly', () => {
      expect(formatCurrencyShorthand(150000000)).toBe('150 Million Naira');
      expect(formatCurrencyShorthand(1500000)).toBe('1.5 Million Naira');
    });

    it('formats billions correctly', () => {
      expect(formatCurrencyShorthand(1000000000)).toBe('1 Billion Naira');
      expect(formatCurrencyShorthand(2500000000)).toBe('2.5 Billion Naira');
    });

    it('returns empty string for zero or negative', () => {
      expect(formatCurrencyShorthand(0)).toBe('');
      expect(formatCurrencyShorthand(-100)).toBe('');
    });

    it('returns exact naira for small amounts', () => {
      expect(formatCurrencyShorthand(500)).toBe('500 Naira');
    });
  });
});

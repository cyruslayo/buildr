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
    it('formats numbers below 1,000', () => {
      expect(formatCurrencyShorthand(500)).toBe('500 Naira');
    });

    it('formats thousands', () => {
      expect(formatCurrencyShorthand(1500)).toBe('1.5 Thousand Naira');
      expect(formatCurrencyShorthand(150000)).toBe('150 Thousand Naira');
    });

    it('formats millions', () => {
      expect(formatCurrencyShorthand(1000000)).toBe('1 Million Naira');
      expect(formatCurrencyShorthand(1500000)).toBe('1.5 Million Naira');
      expect(formatCurrencyShorthand(150900000)).toBe('150.9 Million Naira');
    });

    it('truncates instead of rounding up', () => {
      // 1.59M should be 1.5M, not 1.6M according to truncation logic
      expect(formatCurrencyShorthand(1590000)).toBe('1.5 Million Naira');
    });

    it('formats billions', () => {
      expect(formatCurrencyShorthand(1000000000)).toBe('1 Billion Naira');
      expect(formatCurrencyShorthand(2500000000)).toBe('2.5 Billion Naira');
    });

    it('handles custom suffix', () => {
      expect(formatCurrencyShorthand(1000000, 'NGN')).toBe('1 Million NGN');
    });
  });
});

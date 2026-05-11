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
    it('formats thousands', () => {
      expect(formatCurrencyShorthand(1500)).toBe('1.5 Thousand');
      expect(formatCurrencyShorthand(1000)).toBe('1 Thousand');
    });

    it('formats millions', () => {
      expect(formatCurrencyShorthand(1500000)).toBe('1.5 Million');
      expect(formatCurrencyShorthand(1590000)).toBe('1.6 Million');
      expect(formatCurrencyShorthand(150000000)).toBe('150 Million');
    });

    it('formats billions', () => {
      expect(formatCurrencyShorthand(1500000000)).toBe('1.5 Billion');
      expect(formatCurrencyShorthand(1000000000)).toBe('1 Billion');
    });

    it('returns original string for small numbers', () => {
      expect(formatCurrencyShorthand(500)).toBe('500');
    });

    it('returns empty string for zero or NaN', () => {
      expect(formatCurrencyShorthand(0)).toBe('');
      expect(formatCurrencyShorthand(NaN)).toBe('');
    });
  });
});

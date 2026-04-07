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
    it('handles small amounts', () => {
      expect(formatCurrencyShorthand(500)).toBe('500 Naira');
      expect(formatCurrencyShorthand(999)).toBe('999 Naira');
    });

    it('handles thousands', () => {
      expect(formatCurrencyShorthand(1000)).toBe('1 Thousand Naira');
      expect(formatCurrencyShorthand(1500)).toBe('1.5 Thousand Naira');
      expect(formatCurrencyShorthand(999900)).toBe('999.9 Thousand Naira');
    });

    it('handles millions', () => {
      expect(formatCurrencyShorthand(1000000)).toBe('1 Million Naira');
      expect(formatCurrencyShorthand(1500000)).toBe('1.5 Million Naira');
      expect(formatCurrencyShorthand(150000000)).toBe('150 Million Naira');
    });

    it('handles billions', () => {
      expect(formatCurrencyShorthand(1000000000)).toBe('1 Billion Naira');
      expect(formatCurrencyShorthand(1500000000)).toBe('1.5 Billion Naira');
    });

    it('uses custom suffix', () => {
      expect(formatCurrencyShorthand(1000, 'NGN')).toBe('1 Thousand NGN');
    });
  });
});

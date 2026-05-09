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
    it('formats values under 1000 without suffix', () => {
      expect(formatCurrencyShorthand(500)).toBe('500');
    });

    it('formats thousand values correctly', () => {
      expect(formatCurrencyShorthand(1500)).toBe('1.5 Thousand');
      expect(formatCurrencyShorthand(1000)).toBe('1 Thousand');
      expect(formatCurrencyShorthand(999900)).toBe('999.9 Thousand');
    });

    it('formats million values correctly', () => {
      expect(formatCurrencyShorthand(1500000)).toBe('1.5 Million');
      expect(formatCurrencyShorthand(1000000)).toBe('1 Million');
      expect(formatCurrencyShorthand(155000000)).toBe('155 Million');
    });

    it('formats billion values correctly', () => {
      expect(formatCurrencyShorthand(1500000000)).toBe('1.5 Billion');
    });

    it('rounds to the nearest decimal instead of truncating', () => {
      // 1,590,000 should be 1.6 Million, not 1.5
      expect(formatCurrencyShorthand(1590000)).toBe('1.6 Million');
      expect(formatCurrencyShorthand(1540000)).toBe('1.5 Million');
    });
  });
});

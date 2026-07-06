import { formatNumberWithCommas, parseNumericValue, formatPriceMagnitude } from '../../src/lib/formatters';

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

  describe('formatPriceMagnitude', () => {
    it('returns empty string for zero or negative values', () => {
      expect(formatPriceMagnitude(0)).toBe('');
      expect(formatPriceMagnitude(-100)).toBe('');
    });

    it('returns empty string for small values', () => {
      expect(formatPriceMagnitude(500)).toBe('');
    });

    it('formats thousands', () => {
      expect(formatPriceMagnitude(1000)).toBe('1 Thousand');
      expect(formatPriceMagnitude(50000)).toBe('50 Thousand');
      expect(formatPriceMagnitude(950500)).toBe('950.5 Thousand');
    });

    it('formats millions', () => {
      expect(formatPriceMagnitude(1000000)).toBe('1 Million');
      expect(formatPriceMagnitude(150000000)).toBe('150 Million');
      expect(formatPriceMagnitude(150500000)).toBe('150.5 Million');
    });

    it('formats billions', () => {
      expect(formatPriceMagnitude(1000000000)).toBe('1 Billion');
      expect(formatPriceMagnitude(2500000000)).toBe('2.5 Billion');
    });

    it('handles rounding thresholds correctly', () => {
      // 999,950 should round to 1 Million (when using .toFixed(1) on 1,000,000)
      expect(formatPriceMagnitude(999950)).toBe('1 Million');
      expect(formatPriceMagnitude(999949)).toBe('999.9 Thousand');

      expect(formatPriceMagnitude(999950000)).toBe('1 Billion');
      expect(formatPriceMagnitude(999949999)).toBe('999.9 Million');
    });
  });
});

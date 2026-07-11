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
    it('formats values into human-readable magnitudes', () => {
      expect(formatPriceMagnitude(1000)).toBe('1 Thousand');
      expect(formatPriceMagnitude(1500)).toBe('1.5 Thousand');
      expect(formatPriceMagnitude(999950)).toBe('1 Million');
      expect(formatPriceMagnitude(150000000)).toBe('150 Million');
      expect(formatPriceMagnitude(999950000)).toBe('1 Billion');
      expect(formatPriceMagnitude(2500000000)).toBe('2.5 Billion');
    });

    it('returns empty string for small values', () => {
      expect(formatPriceMagnitude(500)).toBe('');
      expect(formatPriceMagnitude(0)).toBe('');
    });
  });
});

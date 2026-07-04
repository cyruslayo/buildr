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
    it('formats thousands correctly', () => {
      expect(formatPriceMagnitude(1000)).toBe('1 Thousand');
      expect(formatPriceMagnitude(500000)).toBe('500 Thousand');
      expect(formatPriceMagnitude(999949)).toBe('999.9 Thousand');
    });

    it('formats millions correctly', () => {
      expect(formatPriceMagnitude(1000000)).toBe('1 Million');
      expect(formatPriceMagnitude(999999)).toBe('1 Million');
      expect(formatPriceMagnitude(150000000)).toBe('150 Million');
      expect(formatPriceMagnitude(150500000)).toBe('150.5 Million');
    });

    it('formats billions correctly', () => {
      expect(formatPriceMagnitude(1000000000)).toBe('1 Billion');
      expect(formatPriceMagnitude(2700000000)).toBe('2.7 Billion');
    });

    it('returns empty string for small numbers', () => {
      expect(formatPriceMagnitude(0)).toBe('');
      expect(formatPriceMagnitude(500)).toBe('');
    });
  });
});

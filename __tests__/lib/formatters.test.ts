import { formatNumberWithCommas, parseNumericValue, formatMagnitude } from '../../src/lib/formatters';

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

  describe('formatMagnitude', () => {
    it('formats numbers into long compact notation', () => {
      expect(formatMagnitude(1000)).toBe('1 thousand Naira');
      expect(formatMagnitude(1000000)).toBe('1 million Naira');
      expect(formatMagnitude(150000000)).toBe('150 million Naira');
      expect(formatMagnitude(1000000000)).toBe('1 billion Naira');
    });

    it('handles string inputs', () => {
      expect(formatMagnitude('150000000')).toBe('150 million Naira');
      expect(formatMagnitude('150,000,000')).toBe('150 million Naira');
    });

    it('returns empty string for zero or invalid input', () => {
      expect(formatMagnitude(0)).toBe('');
      expect(formatMagnitude('abc')).toBe('');
      expect(formatMagnitude('')).toBe('');
    });
  });
});

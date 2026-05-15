import { formatNumberWithCommas, parseNumericValue, formatMagnitude } from '../../src/lib/formatters';

describe('Formatters', () => {
  describe('formatMagnitude', () => {
    it('formats large numbers into human-readable magnitudes', () => {
      expect(formatMagnitude(150000)).toBe('150 thousand');
      expect(formatMagnitude(1500000)).toBe('1.5 million');
      expect(formatMagnitude(150000000)).toBe('150 million');
      expect(formatMagnitude(1500000000)).toBe('1.5 billion');
    });

    it('returns empty string for numbers less than 1000', () => {
      expect(formatMagnitude(999)).toBe('');
      expect(formatMagnitude(0)).toBe('');
    });
  });

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
});

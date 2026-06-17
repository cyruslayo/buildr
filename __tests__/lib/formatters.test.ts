import { formatNumberWithCommas, parseNumericValue, formatPriceInWords } from '../../src/lib/formatters';

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

  describe('formatPriceInWords', () => {
    it('formats thousands correctly', () => {
      expect(formatPriceInWords(1500)).toBe('1,500 Naira');
      expect(formatPriceInWords(50000)).toBe('50,000 Naira');
    });

    it('formats millions correctly', () => {
      expect(formatPriceInWords(1000000)).toBe('1 Million Naira');
      expect(formatPriceInWords(150000000)).toBe('150 Million Naira');
      expect(formatPriceInWords(12500000)).toBe('12.5 Million Naira');
    });

    it('formats billions correctly', () => {
      expect(formatPriceInWords(1000000000)).toBe('1 Billion Naira');
      expect(formatPriceInWords(1500000000)).toBe('1.5 Billion Naira');
    });

    it('handles zero or negative values', () => {
      expect(formatPriceInWords(0)).toBe('');
      expect(formatPriceInWords(-100)).toBe('');
    });

    it('rounds to one decimal place correctly', () => {
      expect(formatPriceInWords(12550000)).toBe('12.6 Million Naira');
      expect(formatPriceInWords(12440000)).toBe('12.4 Million Naira');
    });
  });
});

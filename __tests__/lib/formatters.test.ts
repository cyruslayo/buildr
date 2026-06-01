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
    it('formats millions correctly', () => {
      expect(formatPriceInWords(150000000)).toBe('150 Million Naira');
      expect(formatPriceInWords(1500000)).toBe('1.5 Million Naira');
    });

    it('formats billions correctly', () => {
      expect(formatPriceInWords(1000000000)).toBe('1 Billion Naira');
      expect(formatPriceInWords(2500000000)).toBe('2.5 Billion Naira');
    });

    it('formats thousands correctly', () => {
      expect(formatPriceInWords(150000)).toBe('150 Thousand Naira');
      expect(formatPriceInWords(1500)).toBe('1.5 Thousand Naira');
    });

    it('formats small amounts correctly', () => {
      expect(formatPriceInWords(500)).toBe('500 Naira');
    });

    it('returns empty string for zero or negative', () => {
      expect(formatPriceInWords(0)).toBe('');
      expect(formatPriceInWords(-100)).toBe('');
    });
  });
});

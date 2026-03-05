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
    it('returns empty string for 0 or negative', () => {
      expect(formatCurrencyShorthand(0)).toBe('');
      expect(formatCurrencyShorthand(-100)).toBe('');
    });

    it('formats thousands', () => {
      expect(formatCurrencyShorthand(1000)).toBe('1 Thousand Naira');
      expect(formatCurrencyShorthand(1500)).toBe('1 Thousand Naira');
      expect(formatCurrencyShorthand(999999)).toBe('999 Thousand Naira');
    });

    it('formats millions', () => {
      expect(formatCurrencyShorthand(1000000)).toBe('1 Million Naira');
      expect(formatCurrencyShorthand(150000000)).toBe('150 Million Naira');
      expect(formatCurrencyShorthand(150500000)).toBe('150.5 Million Naira');
    });

    it('formats billions', () => {
      expect(formatCurrencyShorthand(1000000000)).toBe('1 Billion Naira');
      expect(formatCurrencyShorthand(1500000000)).toBe('1.5 Billion Naira');
    });

    it('formats trillions', () => {
      expect(formatCurrencyShorthand(1000000000000)).toBe('1 Trillion Naira');
      expect(formatCurrencyShorthand(1200000000000)).toBe('1.2 Trillion Naira');
    });

    it('formats small numbers', () => {
      expect(formatCurrencyShorthand(500)).toBe('500 Naira');
    });
  });
});

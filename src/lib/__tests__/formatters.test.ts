import { formatPriceMagnitude } from '../formatters';

describe('formatPriceMagnitude', () => {
  test('returns empty string for values below 1,000', () => {
    expect(formatPriceMagnitude(0)).toBe('');
    expect(formatPriceMagnitude(999)).toBe('');
  });

  test('formats thousands correctly', () => {
    expect(formatPriceMagnitude(1000)).toBe('1 Thousand');
    expect(formatPriceMagnitude(50000)).toBe('50 Thousand');
    expect(formatPriceMagnitude(950000)).toBe('950 Thousand');
  });

  test('formats millions correctly', () => {
    expect(formatPriceMagnitude(1000000)).toBe('1 Million');
    expect(formatPriceMagnitude(1500000)).toBe('1.5 Million');
    expect(formatPriceMagnitude(150000000)).toBe('150 Million');
  });

  test('formats billions correctly', () => {
    expect(formatPriceMagnitude(1000000000)).toBe('1 Billion');
    expect(formatPriceMagnitude(1200000000)).toBe('1.2 Billion');
  });

  test('handles rounding thresholds correctly', () => {
    // Should round up to Million
    expect(formatPriceMagnitude(999950)).toBe('1 Million');
    expect(formatPriceMagnitude(999949)).toBe('999.9 Thousand');

    // Should round up to Billion
    expect(formatPriceMagnitude(999950000)).toBe('1 Billion');
    expect(formatPriceMagnitude(999949999)).toBe('999.9 Million');
  });
});

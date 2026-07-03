const NGN_FORMATTER = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const COMMA_FORMATTER = new Intl.NumberFormat('en-NG');

export const formatCurrency = (amount: number) => {
  return NGN_FORMATTER.format(amount);
}

export const formatNumberWithCommas = (value: string | number) => {
  const num = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
  if (isNaN(num)) return '';
  return COMMA_FORMATTER.format(num);
}

export const parseNumericValue = (value: string) => {
  // Only allow digits, remove currency symbols and commas
  return value.replace(/[^0-9]/g, '');
}

/**
 * Converts a large numeric price into a human-readable magnitude
 * e.g., 150000000 -> "150 Million"
 */
export const formatPriceMagnitude = (value: number) => {
  if (!value || value === 0) return '';
  if (value < 1000) return value.toString();
  if (value < 1000000) {
    return `${(value / 1000).toFixed(1).replace(/\.0$/, '')} Thousand`;
  }
  if (value < 1000000000) {
    return `${(value / 1000000).toFixed(1).replace(/\.0$/, '')} Million`;
  }
  return `${(value / 1000000000).toFixed(1).replace(/\.0$/, '')} Billion`;
};

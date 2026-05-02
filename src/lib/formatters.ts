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
 * Converts large numbers into human-readable shorthand (e.g. "1.5 Million Naira").
 * Crucial for Nigerian real estate pricing where millions/billions are standard.
 */
export const formatCurrencyShorthand = (value: number, suffix = 'Naira') => {
  if (!value || value <= 0) return '';
  if (value < 1000) return `${value} ${suffix}`;
  if (value < 1000000) return `${Math.floor(value / 1000)} Thousand ${suffix}`;
  if (value < 1000000000) return `${Math.floor(value / 100000) / 10} Million ${suffix}`;
  return `${Math.floor(value / 100000000) / 10} Billion ${suffix}`;
};

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
 * Formats a number into a human-readable shorthand (e.g., 1.5 Million)
 * Uses intentional truncation to one decimal place per project standards.
 */
export const formatCurrencyShorthand = (value: number): string => {
  if (value < 1000) return value.toString();

  if (value < 1000000) {
    const k = Math.floor((value / 1000) * 10) / 10;
    return `${k} Thousand`;
  }

  if (value < 1000000000) {
    const m = Math.floor((value / 1000000) * 10) / 10;
    return `${m} Million`;
  }

  const b = Math.floor((value / 1000000000) * 10) / 10;
  return `${b} Billion`;
};

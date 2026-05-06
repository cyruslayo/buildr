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
 * Formats a number into a readable shorthand (e.g., 150 Million)
 * Uses intentional truncation to one decimal place.
 */
export const formatCurrencyShorthand = (value: number) => {
  if (value < 1000) return value.toString();

  if (value < 1000000) {
    const thousands = value / 1000;
    const truncated = Math.floor(thousands * 10) / 10;
    return `${truncated} Thousand`;
  }

  if (value < 1000000000) {
    const millions = value / 1000000;
    const truncated = Math.floor(millions * 10) / 10;
    return `${truncated} Million`;
  }

  const billions = value / 1000000000;
  const truncated = Math.floor(billions * 10) / 10;
  return `${truncated} Billion`;
};

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
 * Converts a numeric price into a human-readable Nigerian currency string.
 * Helps users confirm the magnitude of the price they entered (e.g. 150M vs 15M).
 */
export const formatPriceInWords = (amount: number): string => {
  if (!amount || amount <= 0) return '';

  if (amount >= 1_000_000_000) {
    const billions = Math.floor(amount / 100_000_000) / 10;
    return `${billions.toString().replace(/\.0$/, '')} Billion Naira`;
  }
  if (amount >= 1_000_000) {
    const millions = Math.floor(amount / 100_000) / 10;
    return `${millions.toString().replace(/\.0$/, '')} Million Naira`;
  }
  if (amount >= 1_000) {
    const thousands = Math.floor(amount / 100) / 10;
    return `${thousands.toString().replace(/\.0$/, '')} Thousand Naira`;
  }
  return `${amount} Naira`;
};

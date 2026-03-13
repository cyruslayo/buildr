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
 * Converts large numbers into human-readable Nigerian currency shorthand.
 * e.g., 1500000 -> "1.5 Million Naira"
 */
export const formatCurrencyShorthand = (amount: number): string => {
  if (!amount || amount === 0) return "";

  if (amount >= 1_000_000_000) {
    const value = amount / 1_000_000_000;
    return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)} Billion Naira`;
  }

  if (amount >= 1_000_000) {
    const value = amount / 1_000_000;
    return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)} Million Naira`;
  }

  if (amount >= 1_000) {
    const value = amount / 1_000;
    return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)} Thousand Naira`;
  }

  return `${amount} Naira`;
};

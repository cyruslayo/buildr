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
 * Converts large numbers into human-readable shorthand (e.g. 1,500,000 -> "1.5 Million Naira")
 * Optimized for Nigerian real estate price scales (Thousands, Millions, Billions).
 */
export const formatCurrencyShorthand = (amount: number, suffix: string = "Naira") => {
  if (amount >= 1000000000) {
    const value = amount / 1000000000;
    return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)} Billion ${suffix}`;
  }

  if (amount >= 1000000) {
    const value = amount / 1000000;
    return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)} Million ${suffix}`;
  }

  if (amount >= 1000) {
    const value = amount / 1000;
    return `${value % 1 === 0 ? value.toFixed(0) : value.toFixed(1)} Thousand ${suffix}`;
  }

  return `${amount} ${suffix}`;
};

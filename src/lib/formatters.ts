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
 * Formats a large number into a human-readable shorthand (e.g. 1.5 Million Naira)
 * Optimized for Nigerian real estate price magnitudes.
 */
export const formatCurrencyShorthand = (amount: number, suffix: string = 'Naira') => {
  if (amount < 1000) return `${amount} ${suffix}`;

  const billion = 1000000000;
  const million = 1000000;
  const thousand = 1000;

  if (amount >= billion) {
    const val = Math.floor((amount / billion) * 10) / 10;
    return `${val} Billion ${suffix}`;
  }
  if (amount >= million) {
    const val = Math.floor((amount / million) * 10) / 10;
    return `${val} Million ${suffix}`;
  }
  if (amount >= thousand) {
    const val = Math.floor((amount / thousand) * 10) / 10;
    return `${val} Thousand ${suffix}`;
  }

  return `${amount} ${suffix}`;
};

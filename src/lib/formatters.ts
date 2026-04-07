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
};

/**
 * Formats a large number into a human-readable shorthand (e.g., "1.5 Million Naira")
 * Used for real-time magnitude confirmation in the wizard.
 */
export const formatCurrencyShorthand = (amount: number, suffix: string = 'Naira') => {
  if (amount < 1000) return `${amount} ${suffix}`;

  const formatValue = (val: number) => (val % 1 === 0 ? val.toFixed(0) : val.toFixed(1));

  if (amount >= 1000000000) {
    return `${formatValue(amount / 1000000000)} Billion ${suffix}`;
  }

  if (amount >= 1000000) {
    return `${formatValue(amount / 1000000)} Million ${suffix}`;
  }

  if (amount >= 1000) {
    return `${formatValue(amount / 1000)} Thousand ${suffix}`;
  }

  return `${amount} ${suffix}`;
};

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
 * Converts a number into a human-readable Nigerian shorthand.
 * e.g., 1500000 -> "1.5 Million Naira"
 */
export const formatCurrencyShorthand = (amount: number, suffix: string = 'Naira') => {
  if (amount < 1000) return `${amount} ${suffix}`;

  if (amount >= 1000000000) {
    const billions = amount / 1000000000;
    return `${billions % 1 === 0 ? billions.toFixed(0) : billions.toFixed(1)} Billion ${suffix}`;
  }

  if (amount >= 1000000) {
    const millions = amount / 1000000;
    return `${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)} Million ${suffix}`;
  }

  const thousands = amount / 1000;
  return `${thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(1)} Thousand ${suffix}`;
}

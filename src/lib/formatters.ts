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
 * Converts a numeric value into a human-readable shorthand (e.g., 1.5 Million Naira)
 * Used for real-time magnitude confirmation in the wizard.
 */
export const formatCurrencyShorthand = (amount: number, suffix: string = "Naira") => {
  if (!amount || amount < 1000) return "";

  if (amount >= 1_000_000_000) {
    const billions = amount / 1_000_000_000;
    return `${billions % 1 === 0 ? billions.toFixed(0) : billions.toFixed(1)} Billion ${suffix}`;
  }

  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    return `${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)} Million ${suffix}`;
  }

  if (amount >= 1000) {
    const thousands = amount / 1000;
    return `${thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(1)} Thousand ${suffix}`;
  }

  return "";
};

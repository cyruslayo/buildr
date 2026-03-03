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
 * Formats a numeric value into a human-readable Naira shorthand.
 * Example: 150000000 -> "150 Million Naira"
 */
export const formatCurrencyShorthand = (amount: number): string => {
  if (amount === 0) return '0 Naira';

  if (amount >= 1_000_000_000) {
    const billions = amount / 1_000_000_000;
    return `${Number.isInteger(billions) ? billions : billions.toFixed(1)} Billion Naira`;
  }

  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    return `${Number.isInteger(millions) ? millions : millions.toFixed(1)} Million Naira`;
  }

  if (amount >= 1_000) {
    return `${formatNumberWithCommas(amount)} Naira`;
  }

  return `${amount} Naira`;
};

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
 * Converts numeric values to human-readable Nigerian currency strings.
 * e.g., 150000000 -> '150 Million Naira'
 */
export const formatPriceInWords = (amount: number): string => {
  if (!amount || amount <= 0) return '';

  if (amount >= 1_000_000_000) {
    const billions = amount / 1_000_000_000;
    const formatted = Math.round(billions * 10) / 10;
    return `${formatted.toString().replace(/\.0$/, '')} Billion Naira`;
  }

  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    const formatted = Math.round(millions * 10) / 10;
    return `${formatted.toString().replace(/\.0$/, '')} Million Naira`;
  }

  if (amount >= 1_000) {
    return `${formatNumberWithCommas(amount)} Naira`;
  }

  return `${amount} Naira`;
};

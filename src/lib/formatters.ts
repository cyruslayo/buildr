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

export const formatPriceMagnitude = (value: number): string => {
  if (!value || value < 1000) return '';

  if (value >= 999_950_000) {
    return `${(value / 1_000_000_000).toFixed(1).replace(/\.0$/, '')} Billion`;
  }
  if (value >= 999_950) {
    return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')} Million`;
  }
  if (value >= 999.5) {
    return `${(value / 1_000).toFixed(1).replace(/\.0$/, '')} Thousand`;
  }
  return '';
};

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

export const formatPriceMagnitude = (amount: number) => {
  if (!amount || amount < 1000) return '';

  if (amount >= 999950000) {
    return `${(amount / 1000000000).toFixed(1).replace(/\.0$/, '')} Billion`;
  }

  if (amount >= 999950) {
    return `${(amount / 1000000).toFixed(1).replace(/\.0$/, '')} Million`;
  }

  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1).replace(/\.0$/, '')} Thousand`;
  }

  return '';
};

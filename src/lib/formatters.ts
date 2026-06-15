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

export const formatPriceInWords = (price: number): string => {
  if (price === 0) return '';

  if (price >= 1_000_000_000) {
    const value = Math.round((price / 1_000_000_000) * 10) / 10;
    return `${value.toString().replace(/\.0$/, '')} Billion Naira`;
  }
  if (price >= 1_000_000) {
    const value = Math.round((price / 1_000_000) * 10) / 10;
    return `${value.toString().replace(/\.0$/, '')} Million Naira`;
  }
  if (price >= 1_000) {
    const value = Math.round((price / 1_000) * 10) / 10;
    return `${value.toString().replace(/\.0$/, '')} Thousand Naira`;
  }
  return `${price} Naira`;
};

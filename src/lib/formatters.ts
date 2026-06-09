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

export const formatPriceInWords = (amount: number): string => {
  if (!amount || amount <= 0) return '';

  if (amount >= 1_000_000_000) {
    const value = Math.round(amount / 100_000_000) / 10;
    return `${value} Billion Naira`;
  }

  if (amount >= 1_000_000) {
    const value = Math.round(amount / 100_000) / 10;
    return `${value} Million Naira`;
  }

  if (amount >= 1_000) {
    const value = Math.round(amount / 100) / 10;
    return `${value} Thousand Naira`;
  }

  return `${amount} Naira`;
};

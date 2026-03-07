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

export const formatCurrencyShorthand = (amount: number) => {
  if (amount < 1000) return `${amount} Naira`;

  if (amount < 1000000) {
    const kValue = amount / 1000;
    return `${kValue % 1 === 0 ? kValue : kValue.toFixed(1)} Thousand Naira`;
  }

  if (amount < 1000000000) {
    const mValue = amount / 1000000;
    return `${mValue % 1 === 0 ? mValue : mValue.toFixed(1)} Million Naira`;
  }

  const bValue = amount / 1000000000;
  return `${bValue % 1 === 0 ? bValue : bValue.toFixed(1)} Billion Naira`;
}

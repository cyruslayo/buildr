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

export const formatCurrencyShorthand = (amount: number, suffix: string = 'Naira') => {
  if (amount < 1000) return `${amount} ${suffix}`;

  if (amount < 1000000) {
    const k = Math.floor((amount / 1000) * 10) / 10;
    return `${k} Thousand ${suffix}`;
  }

  if (amount < 1000000000) {
    const m = Math.floor((amount / 1000000) * 10) / 10;
    return `${m} Million ${suffix}`;
  }

  const b = Math.floor((amount / 1000000000) * 10) / 10;
  return `${b} Billion ${suffix}`;
}

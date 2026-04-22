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
  if (amount === 0) return `0 ${suffix}`;
  if (amount < 1000) return `${amount} ${suffix}`;

  let value: number;
  let unit: string;

  if (amount < 1000000) {
    value = amount / 1000;
    unit = 'Thousand';
  } else if (amount < 1000000000) {
    value = amount / 1000000;
    unit = 'Million';
  } else {
    value = amount / 1000000000;
    unit = 'Billion';
  }

  // Truncate to 1 decimal place to avoid rounding up
  const truncated = Math.floor(value * 10) / 10;
  return `${truncated} ${unit} ${suffix}`;
}

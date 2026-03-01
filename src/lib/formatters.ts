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
};

export const formatCurrencyShorthand = (amount: number): string => {
  if (!amount || isNaN(amount) || amount === 0) return "";

  if (amount >= 1_000_000_000) {
    const billions = amount / 1_000_000_000;
    return `${billions % 1 === 0 ? billions : billions.toFixed(1)} Billion Naira`;
  }
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    return `${millions % 1 === 0 ? millions : millions.toFixed(1)} Million Naira`;
  }
  if (amount >= 1_000) {
    const thousands = amount / 1_000;
    return `${thousands % 1 === 0 ? thousands : thousands.toFixed(1)} Thousand Naira`;
  }
  return `${amount} Naira`;
};

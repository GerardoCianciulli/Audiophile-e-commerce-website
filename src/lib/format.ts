const currency = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

/** Formats a price the way the design shows it: "$ 2,999". */
export const formatPrice = (value: number): string => `$ ${currency.format(Math.round(value))}`;

/** "XX99 Mark II Headphones" -> "XX99 MK II", "YX1 Wireless Earphones" -> "YX1". */
export const shortProductName = (name: string): string =>
  name
    .replace(/\s+(Wireless\s+)?(Headphones|Speaker|Earphones)$/i, '')
    .replace(/\bMark\b/i, 'MK')
    .trim();

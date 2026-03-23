// lib/utils/format-currency.ts

/**
 * Format a number as Brazilian Real currency
 * @param value - The numeric value to format
 * @param options - Optional formatting options
 * @returns Formatted currency string (e.g., "R$ 1.234,56")
 */
export function formatCurrency(
  value: number,
  options?: {
    showSymbol?: boolean;
    decimals?: number;
  }
): string {
  const { showSymbol = true, decimals = 2 } = options ?? {};

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: showSymbol ? 'currency' : 'decimal',
    currency: showSymbol ? 'BRL' : undefined,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return formatter.format(value);
}

/**
 * Format a number as plain currency without the R$ symbol
 * @param value - The numeric value to format
 * @returns Formatted number string (e.g., "1.234,56")
 */
export function formatCurrencyPlain(value: number): string {
  return formatCurrency(value, { showSymbol: false });
}

/**
 * Parse a currency string back to number
 * @param value - Currency string (e.g., "R$ 1.234,56" or "1234.56")
 * @returns Parsed number or 0 if invalid
 */
export function parseCurrency(value: string): number {
  // Remove R$ symbol, dots, and replace comma with dot
  const cleaned = value
    .replace(/R\$\s*/g, '')
    .replace(/\./g, '')
    .replace(',', '.');
  
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Calculate discount percentage
 * @param originalPrice - Original price
 * @param currentPrice - Current price
 * @returns Discount percentage (e.g., 20 for 20% off)
 */
export function calculateDiscountPercentage(
  originalPrice: number,
  currentPrice: number
): number {
  if (originalPrice <= 0 || currentPrice <= 0) return 0;
  const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
  return Math.round(discount);
}

/**
 * Format discount badge text
 * @param originalPrice - Original price
 * @param currentPrice - Current price
 * @returns Discount text (e.g., "-20%")
 */
export function formatDiscountBadge(
  originalPrice: number,
  currentPrice: number
): string | null {
  const discount = calculateDiscountPercentage(originalPrice, currentPrice);
  return discount > 0 ? `-${discount}%` : null;
}

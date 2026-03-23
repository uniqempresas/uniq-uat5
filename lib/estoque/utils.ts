import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { StockStatus, StockMetrics, Category } from './types';
import { STOCK_THRESHOLDS, PRODUCT_UNITS } from './constants';

// ============================================
// CLASS UTILITIES
// ============================================

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ============================================
// FORMATTING
// ============================================

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value);
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatDate(date: string | Date, pattern: string = 'dd/MM/yyyy'): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, pattern, { locale: ptBR });
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
}

export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true, locale: ptBR });
}

export function formatUnit(unit: string, quantity: number = 1): string {
  const unitConfig = PRODUCT_UNITS.find((u) => u.value === unit);
  if (!unitConfig) return unit;
  return quantity === 1 ? unitConfig.label : `${quantity} ${unitConfig.plural}`;
}

// ============================================
// STOCK STATUS CALCULATION
// ============================================

export function calculateStockStatus(stock: number, minStock: number): StockStatus {
  if (stock === 0) return 'out';
  if (stock <= minStock * STOCK_THRESHOLDS.CRITICAL_PERCENTAGE) return 'critical';
  if (stock <= minStock * STOCK_THRESHOLDS.LOW_PERCENTAGE) return 'low';
  return 'ok';
}

// ============================================
// CALCULATIONS
// ============================================

export function calculateMargin(cost: number, price: number): number {
  if (price === 0) return 0;
  return ((price - cost) / price) * 100;
}

export function calculateTotalValue(quantity: number, unitCost: number): number {
  return quantity * unitCost;
}

export function calculateWeightedAverageCost(
  currentStock: number,
  currentCost: number,
  newQuantity: number,
  newCost: number
): number {
  const totalStock = currentStock + newQuantity;
  if (totalStock === 0) return 0;
  return ((currentStock * currentCost) + (newQuantity * newCost)) / totalStock;
}

// ============================================
// SKU GENERATION
// ============================================

export function generateSKU(baseName: string): string {
  const cleanName = baseName
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .substring(0, 3);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${cleanName}-${random}`;
}

// ============================================
// BARCODE GENERATION
// ============================================

export function generateEAN13(): string {
  // Brazilian prefix (789)
  const prefix = '789';
  const middle = Math.random().toString().slice(2, 12);
  const partial = prefix + middle;
  
  // Calculate check digit
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(partial[i]);
    sum += i % 2 === 0 ? digit : digit * 3;
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  
  return partial + checkDigit;
}

// ============================================
// SLUG GENERATION
// ============================================

export function generateSlug(name: string, existingSlugs: string[] = []): string {
  let slug = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  // Ensure uniqueness
  if (existingSlugs.includes(slug)) {
    const suffix = Math.random().toString(36).substring(2, 6);
    slug = `${slug}-${suffix}`;
  }
  
  return slug;
}

// ============================================
// CATEGORY TREE UTILITIES
// ============================================

export function buildCategoryTree(categories: Category[]): Category[] {
  const map = new Map<string, Category>();
  const roots: Category[] = [];
  
  // First pass: create map
  categories.forEach((cat) => {
    map.set(cat.id, { ...cat, children: [] });
  });
  
  // Second pass: build tree
  categories.forEach((cat) => {
    const node = map.get(cat.id)!;
    if (cat.parentId) {
      const parent = map.get(cat.parentId);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(node);
      }
    } else {
      roots.push(node);
    }
  });
  
  return roots;
}

export function flattenCategoryTree(categories: Category[], level: number = 0): Category[] {
  const result: Category[] = [];
  
  categories.forEach((cat) => {
    result.push({ ...cat, level });
    if (cat.children && cat.children.length > 0) {
      result.push(...flattenCategoryTree(cat.children, level + 1));
    }
  });
  
  return result;
}

export function getCategoryPath(categories: Category[], categoryId: string): string {
  const path: string[] = [];
  let current = categories.find((c) => c.id === categoryId);
  
  while (current) {
    path.unshift(current.name);
    current = current.parentId 
      ? categories.find((c) => c.id === current!.parentId)
      : undefined;
  }
  
  return path.join(' > ');
}

export function countDescendants(category: Category): number {
  let count = category.productCount || 0;
  if (category.children) {
    category.children.forEach((child) => {
      count += countDescendants(child);
    });
  }
  return count;
}

// ============================================
// SEARCH UTILITIES
// ============================================

export function searchProducts<T extends { name: string; sku: string; barcode?: string }>(
  products: T[],
  query: string
): T[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return products;
  
  return products.filter((product) => {
    return (
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.sku.toLowerCase().includes(normalizedQuery) ||
      product.barcode?.toLowerCase().includes(normalizedQuery)
    );
  });
}

// ============================================
// PAGINATION UTILITIES
// ============================================

export function paginateArray<T>(
  array: T[],
  page: number,
  pageSize: number
): { items: T[]; totalPages: number; totalItems: number } {
  const totalItems = array.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const items = array.slice(startIndex, startIndex + pageSize);
  
  return { items, totalPages, totalItems };
}

// ============================================
// CSV UTILITIES
// ============================================

export function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

// ============================================
// DEBOUNCE UTILITY
// ============================================

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

// ============================================
// METRICS CALCULATIONS
// ============================================

export function calculateStockMetrics(products: { stock: number; cost: number }[]): StockMetrics {
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + p.stock * p.cost, 0);
  const lowStock = products.filter((p) => p.stock > 0 && p.stock < 10).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  
  return {
    totalProducts,
    totalValue,
    lowStock,
    outOfStock,
    entriesThisMonth: 0,
    exitsThisMonth: 0,
  };
}

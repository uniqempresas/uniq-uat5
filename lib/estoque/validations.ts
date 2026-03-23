import { z } from 'zod';

// ============================================
// PRODUCT VALIDATIONS
// ============================================

export const productSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  sku: z.string().min(3, 'SKU deve ter pelo menos 3 caracteres')
    .regex(/^[A-Z0-9-]+$/, 'SKU deve conter apenas letras maiúsculas, números e hífens'),
  barcode: z.string().optional().refine(
    (val) => !val || /^\d{8,14}$/.test(val.replace(/\D/g, '')),
    'Código de barras inválido'
  ),
  categoryId: z.string().min(1, 'Categoria é obrigatória'),
  description: z.string().optional(),
  stock: z.number().min(0, 'Estoque não pode ser negativo'),
  minStock: z.number().min(0, 'Estoque mínimo não pode ser negativo'),
  maxStock: z.number().optional(),
  unit: z.enum(['un', 'kg', 'L', 'm', 'caixa', 'par']),
  cost: z.number().min(0, 'Custo não pode ser negativo'),
  price: z.number().min(0.01, 'Preço deve ser maior que zero'),
  promotionalPrice: z.number().optional().refine(
    (val) => val === undefined || val > 0,
    'Preço promocional deve ser maior que zero'
  ),
  weight: z.number().optional().refine((val) => val === undefined || val >= 0, 'Peso não pode ser negativo'),
  dimensions: z.object({
    width: z.number().optional(),
    height: z.number().optional(),
    depth: z.number().optional(),
  }).optional(),
  notes: z.string().optional(),
  status: z.enum(['active', 'inactive']).default('active'),
});

export type ProductFormData = z.infer<typeof productSchema>;

// ============================================
// CATEGORY VALIDATIONS
// ============================================

export const categorySchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  slug: z.string().optional(),
  parentId: z.string().optional(),
  description: z.string().optional(),
  image: z.string().url('URL de imagem inválida').optional().or(z.literal('')),
  isActive: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

// ============================================
// STOCK MOVEMENT VALIDATIONS
// ============================================

export const stockEntrySchema = z.object({
  productId: z.string().min(1, 'Produto é obrigatório'),
  variationId: z.string().optional(),
  quantity: z.number().int().min(1, 'Quantidade deve ser pelo menos 1'),
  cost: z.number().min(0, 'Custo não pode ser negativo'),
  reason: z.enum(['compra', 'devolucao', 'transferencia', 'ajuste'] as const),
  nfNumber: z.string().optional(),
  nfDate: z.string().optional(),
  notes: z.string().optional(),
});

export const stockExitSchema = z.object({
  productId: z.string().min(1, 'Produto é obrigatório'),
  variationId: z.string().optional(),
  quantity: z.number().int().min(1, 'Quantidade deve ser pelo menos 1'),
  reason: z.enum(['venda', 'amostra', 'perda'] as const),
  reference: z.string().optional(),
  notes: z.string().optional(),
});

export type StockEntryFormData = z.infer<typeof stockEntrySchema>;
export type StockExitFormData = z.infer<typeof stockExitSchema>;

// ============================================
// CSV IMPORT VALIDATIONS
// ============================================

export const csvRowSchema = z.object({
  sku: z.string().min(1, 'SKU é obrigatório'),
  name: z.string().optional(),
  quantity: z.number().int().min(0, 'Quantidade não pode ser negativa'),
  cost: z.number().optional(),
  nfNumber: z.string().optional(),
  nfDate: z.string().optional(),
});

export const csvConfigSchema = z.object({
  skuColumn: z.number().min(0),
  quantityColumn: z.number().min(0),
  costColumn: z.number().min(0).optional(),
  nameColumn: z.number().min(0).optional(),
  nfNumberColumn: z.number().min(0).optional(),
  nfDateColumn: z.number().min(0).optional(),
  hasHeader: z.boolean().default(true),
  generateLabels: z.boolean().default(false),
  updateSalePrice: z.boolean().default(false),
  defaultMargin: z.number().min(0).max(500).default(50),
  sendNotification: z.boolean().default(false),
  nfNumber: z.string().optional(),
});

export type CSVConfig = z.infer<typeof csvConfigSchema>;

// ============================================
// LABEL VALIDATIONS
// ============================================

export const labelConfigSchema = z.object({
  template: z.enum(['40x30', '60x40', 'termica', '50x30', '30x20']),
  format: z.enum(['EAN13', 'CODE128', 'QR']),
  showBarcode: z.boolean().default(true),
  showName: z.boolean().default(true),
  showSku: z.boolean().default(true),
  showPrice: z.boolean().default(true),
  showInternalCode: z.boolean().default(false),
  showDescription: z.boolean().default(false),
  showLogo: z.boolean().default(false),
  showDate: z.boolean().default(false),
});

export const labelProductSchema = z.object({
  productId: z.string().min(1),
  variationId: z.string().optional(),
  quantity: z.number().int().min(1).default(1),
  selected: z.boolean().default(true),
});

export type LabelConfigFormData = z.infer<typeof labelConfigSchema>;
export type LabelProductFormData = z.infer<typeof labelProductSchema>;

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function validateQuantity(quantity: number, availableStock: number): string | null {
  if (quantity <= 0) {
    return 'Quantidade deve ser maior que zero';
  }
  if (quantity > availableStock) {
    return `Quantidade excede o estoque disponível (${availableStock})`;
  }
  return null;
}

export function validateEAN13(barcode: string): boolean {
  if (!/^\d{13}$/.test(barcode)) return false;
  
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(barcode[i]);
    sum += i % 2 === 0 ? digit : digit * 3;
  }
  
  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit === parseInt(barcode[12]);
}

export function validateMargin(cost: number, price: number, minMargin: number = 0): boolean {
  if (price === 0) return false;
  const margin = ((price - cost) / price) * 100;
  return margin >= minMargin;
}

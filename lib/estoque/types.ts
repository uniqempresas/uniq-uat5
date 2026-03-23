// ============================================
// STOCK STATUS TYPES
// ============================================

export type StockStatus = 'ok' | 'low' | 'critical' | 'out';
export type ProductStatus = 'active' | 'inactive';
export type StockMovementType = 'entry' | 'exit' | 'adjustment';
export type MovementReason = 'compra' | 'devolucao' | 'transferencia' | 'ajuste' | 'venda' | 'amostra' | 'perda';

// ============================================
// PRODUCT TYPES
// ============================================

export interface Product {
  id: string;
  name: string;
  sku: string;
  barcode?: string;
  categoryId: string;
  category?: Category;
  stock: number;
  minStock: number;
  maxStock?: number;
  cost: number;
  price: number;
  promotionalPrice?: number;
  images: string[];
  description?: string;
  unit: 'un' | 'kg' | 'L' | 'm' | 'caixa' | 'par';
  location?: string;
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  notes?: string;
  status: ProductStatus;
  stockStatus: StockStatus;
  hasVariations: boolean;
  variations?: ProductVariation[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariation {
  id: string;
  productId: string;
  sku: string;
  barcode?: string;
  attributes: Record<string, string>;
  stock: number;
  minStock: number;
  price: number;
  cost: number;
  promotionalPrice?: number;
  imageUrl?: string;
  isActive: boolean;
  isDefault: boolean;
  location?: string;
}

export interface ProductAttribute {
  id: string;
  name: string;
  type: 'color' | 'size' | 'text' | 'number';
  values: AttributeValue[];
}

export interface AttributeValue {
  id: string;
  value: string;
  colorCode?: string;
  order: number;
}

// ============================================
// CATEGORY TYPES
// ============================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  parent?: Category;
  image?: string;
  productCount: number;
  order: number;
  isActive: boolean;
  level: number;
  children?: Category[];
  createdAt: string;
  updatedAt: string;
}

// ============================================
// STOCK MOVEMENT TYPES
// ============================================

export interface StockMovement {
  id: string;
  productId: string;
  product?: Product;
  variationId?: string;
  type: StockMovementType;
  quantity: number;
  cost: number;
  totalValue: number;
  reason: MovementReason;
  reference?: string;
  notes?: string;
  userId: string;
  userName?: string;
  previousStock: number;
  newStock: number;
  createdAt: string;
}

// ============================================
// STOCK METRICS TYPES
// ============================================

export interface StockMetrics {
  totalProducts: number;
  totalValue: number;
  lowStock: number;
  outOfStock: number;
  entriesThisMonth: number;
  exitsThisMonth: number;
}

export interface StockAlert {
  id: string;
  productId: string;
  product?: Product;
  type: 'low' | 'critical' | 'out';
  currentStock: number;
  minStock: number;
  createdAt: string;
}

export interface TopProduct {
  id: string;
  name: string;
  sold: number;
  percentage: number;
}

// ============================================
// LABEL TYPES
// ============================================

export type LabelFormat = 'EAN13' | 'CODE128' | 'QR';
export type LabelTemplate = '40x30' | '60x40' | 'termica' | '50x30' | '30x20';

export interface LabelConfig {
  template: LabelTemplate;
  format: LabelFormat;
  showBarcode: boolean;
  showName: boolean;
  showSku: boolean;
  showPrice: boolean;
  showInternalCode: boolean;
  showDescription: boolean;
  showLogo: boolean;
  showDate: boolean;
}

export interface LabelProduct {
  productId: string;
  product?: Product;
  variationId?: string;
  quantity: number;
  selected: boolean;
}

export interface LabelPrintJob {
  id: string;
  products: LabelProduct[];
  config: LabelConfig;
  totalLabels: number;
  status: 'pending' | 'printing' | 'completed' | 'error';
}

// ============================================
// CSV IMPORT TYPES
// ============================================

export type CSVValidationStatus = 'valid' | 'warning' | 'error' | 'new';

export interface CSVRow {
  rowNumber: number;
  sku: string;
  name?: string;
  quantity: number;
  cost?: number;
  nfNumber?: string;
  nfDate?: string;
  status: CSVValidationStatus;
  errors: string[];
  warnings: string[];
  productId?: string;
  isNew: boolean;
}

export interface CSVMapping {
  columnIndex: number;
  fieldName: string;
  preview: string;
}

export interface CSVImportResult {
  success: boolean;
  totalRows: number;
  validRows: number;
  newProducts: number;
  updatedProducts: number;
  errors: number;
  totalValue: number;
  movements: StockMovement[];
}

// ============================================
// COMPONENT PROPS
// ============================================

export interface ProductFilters {
  category?: string;
  status?: ProductStatus | 'all';
  stockStatus?: StockStatus | 'all';
  search?: string;
}

export interface StockMovementFilters {
  type?: StockMovementType | 'all';
  startDate?: string;
  endDate?: string;
  productId?: string;
}

export interface CategoryFormData {
  name: string;
  slug?: string;
  parentId?: string;
  description?: string;
  image?: string;
  isActive: boolean;
  order: number;
}

export interface StockEntryFormData {
  productId: string;
  variationId?: string;
  quantity: number;
  cost: number;
  reason: MovementReason;
  nfNumber?: string;
  nfDate?: string;
  notes?: string;
}

export interface StockExitFormData {
  productId: string;
  variationId?: string;
  quantity: number;
  reason: MovementReason;
  reference?: string;
  notes?: string;
}

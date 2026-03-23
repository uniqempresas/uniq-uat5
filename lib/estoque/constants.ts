import { StockStatus, StockMovementType, MovementReason, LabelTemplate, LabelFormat } from './types';

// ============================================
// STOCK STATUS CONFIG
// ============================================

export const STOCK_STATUS_CONFIG = {
  ok: {
    label: 'OK',
    description: 'Estoque adequado',
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-200',
    icon: '#22c55e',
    iconName: 'CheckCircle',
  },
  low: {
    label: 'Baixo',
    description: 'Abaixo do estoque mínimo',
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
    icon: '#f59e0b',
    iconName: 'AlertTriangle',
  },
  critical: {
    label: 'Crítico',
    description: 'Muito abaixo do mínimo',
    bg: 'bg-red-100',
    text: 'text-red-700',
    border: 'border-red-200',
    icon: '#ef4444',
    iconName: 'AlertOctagon',
  },
  out: {
    label: 'Esgotado',
    description: 'Sem estoque',
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-300',
    icon: '#dc2626',
    iconName: 'XCircle',
  },
} as const;

// ============================================
// MOVEMENT CONFIG
// ============================================

export const MOVEMENT_CONFIG = {
  entry: {
    label: 'Entrada',
    bg: 'bg-green-50',
    text: 'text-green-600',
    icon: '#22c55e',
    iconName: 'ArrowDownLeft',
  },
  exit: {
    label: 'Saída',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    icon: '#3b82f6',
    iconName: 'ArrowUpRight',
  },
  adjustment: {
    label: 'Ajuste',
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    icon: '#627271',
    iconName: 'RefreshCw',
  },
} as const;

// ============================================
// MOVEMENT REASONS
// ============================================

export const MOVEMENT_REASONS: Record<MovementReason, { label: string; type: StockMovementType }> = {
  compra: { label: 'Compra', type: 'entry' },
  devolucao: { label: 'Devolução', type: 'entry' },
  transferencia: { label: 'Transferência', type: 'entry' },
  ajuste: { label: 'Ajuste de Inventário', type: 'adjustment' },
  venda: { label: 'Venda', type: 'exit' },
  amostra: { label: 'Amostra', type: 'exit' },
  perda: { label: 'Perda/Break', type: 'exit' },
};

// ============================================
// PRODUCT UNITS
// ============================================

export const PRODUCT_UNITS = [
  { value: 'un', label: 'Unidade (un)', plural: 'unidades' },
  { value: 'kg', label: 'Quilograma (kg)', plural: 'quilogramas' },
  { value: 'L', label: 'Litro (L)', plural: 'litros' },
  { value: 'm', label: 'Metro (m)', plural: 'metros' },
  { value: 'caixa', label: 'Caixa', plural: 'caixas' },
  { value: 'par', label: 'Par', plural: 'pares' },
] as const;

// ============================================
// LABEL TEMPLATES
// ============================================

export const LABEL_TEMPLATES: Record<LabelTemplate, { name: string; width: number; height: number; description: string }> = {
  '40x30': {
    name: '40x30mm',
    width: 40,
    height: 30,
    description: 'Padrão pequeno',
  },
  '60x40': {
    name: '60x40mm',
    width: 60,
    height: 40,
    description: 'Padrão médio',
  },
  '50x30': {
    name: '50x30mm',
    width: 50,
    height: 30,
    description: 'Retrato pequeno',
  },
  '30x20': {
    name: '30x20mm',
    width: 30,
    height: 20,
    description: 'Mini etiquetas',
  },
  termica: {
    name: 'Térmica (100x60mm)',
    width: 100,
    height: 60,
    description: 'Impressora térmica',
  },
};

// ============================================
// LABEL FORMATS
// ============================================

export const LABEL_FORMATS: Record<LabelFormat, { name: string; description: string }> = {
  EAN13: {
    name: 'EAN-13',
    description: 'Código de barras padrão brasileiro',
  },
  CODE128: {
    name: 'CODE128',
    description: 'Código alfanumérico',
  },
  QR: {
    name: 'QR Code',
    description: 'Código QR bidimensional',
  },
};

// ============================================
// DESIGN SYSTEM UNIQ - CLASSES
// ============================================

export const UNIQ_CLASSES = {
  // Cards
  card: 'bg-white rounded-xl shadow-sm border border-gray-200',
  cardHover: 'hover:shadow-md transition-shadow duration-200',
  cardMetric: 'bg-white rounded-xl shadow-sm border border-gray-200 p-5',
  
  // Buttons
  btnPrimary: 'bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors',
  btnSecondary: 'bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50',
  btnDanger: 'bg-red-600 text-white rounded-lg hover:bg-red-700',
  btnSuccess: 'bg-[#86cb92] text-white rounded-lg hover:bg-green-600',
  
  // Inputs
  input: 'border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent',
  
  // Badges
  badgeOk: 'bg-green-100 text-green-700',
  badgeWarning: 'bg-yellow-100 text-yellow-700',
  badgeCritical: 'bg-red-100 text-red-700',
  badgeOut: 'bg-red-100 text-red-800 border border-red-200',
  
  // Upload Zone
  uploadZone: 'border-2 border-dashed border-gray-300 rounded-xl hover:border-[#86cb92] hover:bg-[#86cb92]/5 transition-all cursor-pointer',
  
  // Sidebar
  sidebarBg: 'bg-[#1f2937]',
  sidebarText: 'text-white',
  sidebarTextMuted: 'text-gray-400',
  sidebarHover: 'hover:bg-white/10',
  sidebarActive: 'bg-white/10',
} as const;

// ============================================
// PAGINATION
// ============================================

export const DEFAULT_PAGE_SIZE = 24;
export const MAX_CSV_ROWS = 10000;
export const MAX_LABELS_PER_PRINT = 500;

// ============================================
// STOCK THRESHOLDS
// ============================================

export const STOCK_THRESHOLDS = {
  CRITICAL_PERCENTAGE: 0.2, // 20% or less of minStock
  LOW_PERCENTAGE: 0.5, // 50% or less of minStock
} as const;

// ============================================
// SEARCH DEBOUNCE
// ============================================

export const SEARCH_DEBOUNCE_MS = 300;
export const METRICS_REFRESH_INTERVAL_MS = 30000;

# SPEC: Sprint 12 - Módulo Estoque UI

**Versão:** 1.0.0  
**Data:** 2026-03-21  
**Sprint:** 12  
**Status:** Para Implementação  
**Responsável:** Frontend Team

---

## 1. Visão Geral

Este documento especifica a implementação técnica completa do **Módulo de Gestão de Estoque** para a plataforma UNIQ Empresas. O módulo permite gerenciar produtos, controlar entradas/saídas, categorizar itens, gerar etiquetas e visualizar métricas de estoque em tempo real.

### 1.1 Escopo da Sprint

| Funcionalidade | Prioridade | Status |
|---------------|-----------|--------|
| Dashboard de Estoque | 🔴 CRÍTICA | Implementar |
| Lista de Produtos (grid/lista) | 🔴 CRÍTICA | Implementar |
| Cadastro de Produto | 🔴 CRÍTICA | Implementar |
| Entrada/Saída Manual | 🟡 ALTA | Implementar |
| Entrada em Massa (CSV) | 🟡 ALTA | Implementar |
| Categorias Hierárquicas | 🟡 ALTA | Implementar |
| Movimentações/Histórico | 🟡 ALTA | Implementar |
| Gerador de Etiquetas | 🟢 MÉDIA | Implementar |

### 1.2 Dependências Externas

| Dependência | Descrição | Sprint |
|-------------|-----------|--------|
| **Supabase Tables** | products, categories, stock_movements | Sprint 11 |
| **PDV Integration** | Vendas desconectam estoque | Sprint 13 |
| **MEL Alerts** | IA envia alertas de estoque baixo | Sprint 13+ |

---

## 2. Estrutura de Arquivos

### 2.1 Estrutura de Pastas

```
app/(dashboard)/estoque/
├── layout.tsx                      # Layout com sidebar
├── page.tsx                       # Dashboard (CRÍTICA)
├── produtos/
│   ├── page.tsx                   # Lista de produtos (CRÍTICA)
│   ├── [id]/
│   │   └── page.tsx               # Editar produto (CRÍTICA)
│   └── novo/
│       └── page.tsx               # Novo produto (CRÍTICA)
├── entrada/
│   ├── page.tsx                   # Entrada manual (ALTA)
│   └── massa/
│       └── page.tsx               # Entrada em massa CSV (ALTA)
├── saida/
│   └── page.tsx                   # Saída manual (ALTA)
├── movimentacoes/
│   └── page.tsx                   # Histórico (ALTA)
├── categorias/
│   └── page.tsx                   # Gerenciar categorias (ALTA)
├── etiquetas/
│   └── page.tsx                   # Gerador de etiquetas (MÉDIA)
├── inventario/
│   └── page.tsx                   # Contagem física
└── relatorios/
    └── page.tsx                   # Relatórios

components/estoque/
├── dashboard/
│   ├── stock-metrics-card.tsx     # Card de métrica individual
│   ├── stock-metrics-grid.tsx      # Grid de 4 cards
│   ├── stock-alerts-list.tsx      # Lista de alertas
│   ├── stock-alerts-item.tsx      # Item individual de alerta
│   ├── stock-turnover-chart.tsx    # Gráfico de giro
│   └── quick-actions-card.tsx      # Ações rápidas
├── products/
│   ├── product-card.tsx            # Card de produto (grid)
│   ├── product-list-item.tsx       # Linha de produto (tabela)
│   ├── product-filters.tsx         # Barra de filtros
│   ├── product-search.tsx          # Busca com debounce
│   └── product-form/               # Formulário de produto
│       ├── product-form-tabs.tsx   # Abas do formulário
│       ├── product-info-tab.tsx     # Tab: Informações
│       ├── product-stock-tab.tsx    # Tab: Estoque
│       ├── product-pricing-tab.tsx  # Tab: Preços
│       ├── product-variations-tab.tsx # Tab: Variações
│       └── product-additional-tab.tsx # Tab: Adicionais
├── stock/
│   ├── stock-entry-form.tsx        # Formulário de entrada
│   ├── stock-exit-form.tsx         # Formulário de saída
│   └── stock-movement-table.tsx     # Tabela de movimentações
├── categories/
│   ├── category-tree.tsx           # Árvore hierárquica
│   ├── category-item.tsx           # Item de categoria
│   └── category-form-modal.tsx     # Modal de CRUD
├── labels/
│   ├── label-generator.tsx          # Seletor de produtos
│   ├── label-template-selector.tsx # Templates de etiqueta
│   ├── label-preview.tsx           # Prévia de etiquetas
│   └── label-print-dialog.tsx      # Dialog de impressão
├── csv-import/
│   ├── csv-wizard.tsx              # Wizard 4 etapas
│   ├── csv-upload-step.tsx         # Etapa 1: Upload
│   ├── csv-validation-step.tsx      # Etapa 2: Validação
│   ├── csv-preview-step.tsx         # Etapa 3: Preview
│   └── csv-confirm-step.tsx        # Etapa 4: Confirmação
└── shared/
    ├── stock-status-badge.tsx      # Badge de status
    ├── stock-level-indicator.tsx    # Indicador de nível
    ├── product-image-upload.tsx     # Upload de imagem
    └── hierarchical-select.tsx      # Select hierárquico

lib/estoque/
├── types.ts                        # Tipos TypeScript
├── constants.ts                    # Constantes e enums
├── utils.ts                       # Funções utilitárias
├── mock-data.ts                    # Dados mock para desenvolvimento
└── validations.ts                 # Validações Zod

hooks/
├── use-stock-metrics.ts            # Hook para métricas
├── use-products.ts                 # Hook para produtos
├── use-categories.ts               # Hook para categorias
└── use-stock-movements.ts         # Hook para movimentações
```

---

## 3. Tipos e Interfaces TypeScript

### 3.1 Tipos Principais

```typescript
// ============================================
// PRODUCT TYPES
// ============================================

export type StockStatus = 'ok' | 'low' | 'critical' | 'out';
export type ProductStatus = 'active' | 'inactive';
export type StockMovementType = 'entry' | 'exit' | 'adjustment';
export type MovementReason = 'compra' | 'devolucao' | 'transferencia' | 'ajuste' | 'venda' | 'amostra' | 'perda';

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
  attributes: Record<string, string>; // { "Cor": "Preto", "Tamanho": "M" }
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
```

### 3.2 Props e Interfaces de Componentes

```typescript
// ============================================
// STOCK METRICS CARD
// ============================================

interface StockMetricsCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'default' | 'warning' | 'critical';
  isLoading?: boolean;
}

interface StockMetricsGridProps {
  metrics: StockMetrics;
  isLoading?: boolean;
}

// ============================================
// STOCK ALERTS
// ============================================

interface StockAlertsListProps {
  alerts: StockAlert[];
  isLoading?: boolean;
  onBuyClick?: (productId: string) => void;
  onViewAll?: () => void;
}

interface StockAlertItemProps {
  alert: StockAlert;
  onBuyClick?: () => void;
}

// ============================================
// PRODUCT CARD
// ============================================

interface ProductCardProps {
  product: Product;
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
}

interface ProductListItemProps {
  product: Product;
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
}

// ============================================
// PRODUCT GRID / TABLE
// ============================================

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  viewMode?: 'grid' | 'list';
}

interface ProductFiltersProps {
  categories: Category[];
  selectedCategory?: string;
  selectedStatus?: ProductStatus | 'all';
  selectedStockStatus?: StockStatus | 'all';
  onCategoryChange?: (categoryId: string) => void;
  onStatusChange?: (status: ProductStatus | 'all') => void;
  onStockStatusChange?: (status: StockStatus | 'all') => void;
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// ============================================
// PRODUCT FORM
// ============================================

interface ProductFormTabsProps {
  product?: Partial<Product>;
  onSave?: (product: Partial<Product>) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

interface ProductFormData {
  name: string;
  sku: string;
  categoryId: string;
  description?: string;
  images: string[];
  stock: number;
  minStock: number;
  maxStock?: number;
  unit: string;
  cost: number;
  price: number;
  promotionalPrice?: number;
  barcode?: string;
  weight?: number;
  dimensions?: { width?: number; height?: number; depth?: number };
  notes?: string;
  variations?: ProductVariation[];
}

// ============================================
// STOCK MOVEMENT
// ============================================

interface StockEntryFormProps {
  onSubmit?: (data: StockEntryFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

interface StockEntryFormData {
  productId: string;
  quantity: number;
  cost: number;
  reason: MovementReason;
  nfNumber?: string;
  nfDate?: string;
  notes?: string;
}

interface StockMovementTableProps {
  movements: StockMovement[];
  isLoading?: boolean;
  filters?: StockMovementFilters;
  onFiltersChange?: (filters: StockMovementFilters) => void;
}

interface StockMovementFilters {
  type?: StockMovementType | 'all';
  startDate?: string;
  endDate?: string;
  productId?: string;
}

// ============================================
// CATEGORY TREE
// ============================================

interface CategoryTreeProps {
  categories: Category[];
  selectedCategory?: string;
  onSelect?: (category: Category) => void;
  onEdit?: (category: Category) => void;
  onDelete?: (category: Category) => void;
  onAddChild?: (parentId: string) => void;
  isLoading?: boolean;
}

interface CategoryItemProps {
  category: Category;
  level: number;
  isExpanded: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onAddChild: () => void;
}

interface CategoryFormModalProps {
  category?: Partial<Category>;
  parentId?: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CategoryFormData) => void;
}

interface CategoryFormData {
  name: string;
  slug?: string;
  parentId?: string;
  description?: string;
  image?: string;
  isActive: boolean;
  order: number;
}

// ============================================
// LABEL GENERATOR
// ============================================

interface LabelGeneratorProps {
  products: Product[];
  isLoading?: boolean;
  onPrint?: (config: LabelConfig, products: LabelProduct[]) => void;
}

interface LabelTemplateSelectorProps {
  selected: LabelTemplate;
  onSelect: (template: LabelTemplate) => void;
}

interface LabelPreviewProps {
  products: LabelProduct[];
  config: LabelConfig;
}

// ============================================
// CSV IMPORT WIZARD
// ============================================

interface CSVWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (result: CSVImportResult) => void;
}

interface CSVUploadStepProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
  mapping: CSVMapping[];
  onMappingChange: (mapping: CSVMapping[]) => void;
}

interface CSVValidationStepProps {
  rows: CSVRow[];
  onEditRow: (rowNumber: number, data: Partial<CSVRow>) => void;
  onCreateProduct: (row: CSVRow) => void;
}

interface CSVPreviewStepProps {
  rows: CSVRow[];
  config: CSVPreviewConfig;
  onConfigChange: (config: CSVPreviewConfig) => void;
}

interface CSVPreviewConfig {
  generateLabels: boolean;
  updateSalePrice: boolean;
  defaultMargin: number;
  sendNotification: boolean;
  nfNumber?: string;
}

interface CSVConfirmStepProps {
  isProcessing: boolean;
  progress: number;
  result?: CSVImportResult;
}
```

---

## 4. Design System UNIQ - Estoque

### 4.1 Paleta de Cores

```typescript
// Cores do Design System UNIQ
export const STOCK_COLORS = {
  // Status de Estoque
  ok: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-200',
    icon: '#22c55e',
  },
  low: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
    icon: '#f59e0b',
  },
  critical: {
    bg: 'bg-red-100',
    text: 'text-red-700',
    border: 'border-red-200',
    icon: '#ef4444',
  },
  out: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-300',
    icon: '#dc2626',
  },
} as const;

// Cores de Movimentação
export const MOVEMENT_COLORS = {
  entry: {
    bg: 'bg-green-50',
    text: 'text-green-600',
    icon: '#22c55e',
  },
  exit: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    icon: '#3b82f6',
  },
  adjustment: {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    icon: '#627271',
  },
} as const;
```

### 4.2 Classes CSS Customizadas

```typescript
// Classes Tailwind customizadas para o Design System UNIQ
export const UNIQ_CLASSES = {
  // Cards
  card: 'bg-white rounded-xl shadow-sm border border-gray-200',
  cardHover: 'hover:shadow-md transition-shadow duration-200',
  cardMetric: 'bg-white rounded-xl shadow-sm border border-gray-200 p-5',
  
  // Botões
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
  uploadZone: 'border-2 border-dashed border-gray-300 rounded-xl hover:border-[#86cb92] hover:bg-[#86cb92]/5',
  
  // Sidebar
  sidebarBg: 'bg-[#1f2937]',
  sidebarText: 'text-white',
  sidebarTextMuted: 'text-gray-400',
  sidebarHover: 'hover:bg-white/10',
  sidebarActive: 'bg-white/10',
} as const;
```

### 4.3 Espaçamentos (8pt Grid)

| Elemento | Valor Tailwind |
|----------|---------------|
| Container padding | `p-6` |
| Card padding | `p-5` |
| Card gap | `gap-4` |
| Section gap | `gap-6` |
| Button padding | `px-4 py-2` |
| Input padding | `px-3 py-2` |
| Tabela cell | `px-4 py-3` |

---

## 5. Regras de Negócio

### 5.1 Estoque

| Regra | Descrição |
|-------|-----------|
| RN-EST-001 | Cards de métricas devem atualizar em tempo real (polling a cada 30s) |
| RN-EST-002 | Alertas de estoque ordenados por criticidade: Crítico > Baixo > OK |
| RN-EST-003 | Gráfico de giro mostra apenas produtos com vendas (quantidade > 0) |
| RN-EST-004 | Grid padrão exibe 24 produtos por página |
| RN-EST-005 | Filtros combinam com operador AND |
| RN-EST-006 | Busca em nome, SKU e código de barras (debounce 300ms) |
| RN-EST-007 | SKU deve ser único no sistema |
| RN-EST-008 | Margem calculada: `(preço - custo) / preço × 100` |

### 5.2 Entrada/Saída

| Regra | Descrição |
|-------|-----------|
| RN-EST-009 | Movimentações são imutáveis após criação |
| RN-EST-010 | Entrada atualiza custo médio ponderado: `((EA×CA) + (Q×CN)) / (EA+Q)` |
| RN-EST-011 | Arquivo CSV máximo 10.000 linhas |
| RN-EST-012 | Quantidade deve ser número positivo |
| RN-EST-013 | Estornos disponíveis em até 24h após criação |

### 5.3 Categorias

| Regra | Descrição |
|-------|-----------|
| RN-EST-014 | Máximo 5 níveis de profundidade |
| RN-EST-015 | Slug único em toda hierarquia (auto-gerado + sufixo) |
| RN-EST-016 | Categoria com produtos não pode ser excluída, apenas inativada |

### 5.4 Etiquetas

| Regra | Descrição |
|-------|-----------|
| RN-EST-017 | EAN-13 gerado automaticamente se não informado (prefixo 789) |
| RN-EST-018 | Máximo 500 etiquetas por vez |
| RN-EST-019 | Suporte a Zebra (ZPL) e PDF |

---

## 6. APIs e Integração

### 6.1 Endpoints Futuros (Sprint 11+)

```typescript
// As APIs serão implementadas na Sprint 11
// Estrutura prevista:

// Products
GET    /api/estoque/produtos
GET    /api/estoque/produtos/:id
POST   /api/estoque/produtos
PUT    /api/estoque/produtos/:id
DELETE /api/estoque/produtos/:id

// Categories
GET    /api/estoque/categorias
GET    /api/estoque/categorias/arvore
POST   /api/estoque/categorias
PUT    /api/estoque/categorias/:id
DELETE /api/estoque/categorias/:id

// Stock Movements
GET    /api/estoque/movimentacoes
POST   /api/estoque/movimentacoes/entrada
POST   /api/estoque/movimentacoes/saida

// Metrics
GET    /api/estoque/metricas
GET    /api/estoque/alertas

// CSV Import
POST   /api/estoque/importar/validar
POST   /api/estoque/importar/processar

// Labels
POST   /api/estoque/etiquetas/gerar
GET    /api/estoque/etiquetas/pdf
```

### 6.2 Hooks de Dados

```typescript
// hooks/use-stock-metrics.ts
export function useStockMetrics() {
  // Retorna: { metrics, isLoading, error, refetch }
}

// hooks/use-products.ts
export function useProducts(filters?: ProductFilters) {
  // Retorna: { products, isLoading, error, pagination, refetch }
}

// hooks/use-product.ts
export function useProduct(id: string) {
  // Retorna: { product, isLoading, error, update, remove }
}

// hooks/use-categories.ts
export function useCategories() {
  // Retorna: { categories, tree, isLoading, error, refetch }
}

// hooks/use-stock-movements.ts
export function useStockMovements(filters?: StockMovementFilters) {
  // Retorna: { movements, isLoading, error, pagination }
}
```

---

## 7. Dependências de Bibliotecas

### 7.1 Bibliotecas Existentes (já instaladas)

| Biblioteca | Versão | Uso |
|------------|--------|-----|
| **React** | ^18.x | Framework principal |
| **Next.js** | ^14.x | Framework React |
| **TypeScript** | ^5.x | Tipagem |
| **Tailwind CSS** | ^3.x | Estilização |
| **Lucide React** | ^0.x | Ícones |
| **React Hook Form** | ^7.x | Formulários |
| **Zod** | ^3.x | Validação |
| **shadcn/ui** | latest | Componentes base |
| **date-fns** | ^3.x | Datas |
| **clsx** | ^2.x | Classes condicionais |

### 7.2 Bibliotecas Novas (a instalar)

| Biblioteca | Versão | Uso | Prioridade |
|------------|--------|-----|------------|
| **react-dropzone** | ^14.x | Upload drag-and-drop | ALTA |
| **papaparse** | ^5.x | Parser CSV | ALTA |
| **jszip** | ^3.x | Leitor XLSX | ALTA |
| **bwip-js** | ^3.x | Gerador de código de barras | MÉDIA |
| **react-hot-toast** | ^2.x | Notificações | OPCIONAL |

### 7.3 Comando de Instalação

```bash
npm install react-dropzone papaparse jszip bwip-js
```

---

## 8. Checklist de Implementação

### 8.1 Dashboard de Estoque

- [ ] `components/estoque/dashboard/stock-metrics-card.tsx`
- [ ] `components/estoque/dashboard/stock-metrics-grid.tsx`
- [ ] `components/estoque/dashboard/stock-alerts-list.tsx`
- [ ] `components/estoque/dashboard/stock-alerts-item.tsx`
- [ ] `components/estoque/dashboard/stock-turnover-chart.tsx`
- [ ] `components/estoque/dashboard/quick-actions-card.tsx`
- [ ] `app/(dashboard)/estoque/page.tsx` (atualizar)
- [ ] `hooks/use-stock-metrics.ts`
- [ ] Testes unitários

### 8.2 Lista de Produtos

- [ ] `components/estoque/products/product-card.tsx`
- [ ] `components/estoque/products/product-list-item.tsx`
- [ ] `components/estoque/products/product-filters.tsx`
- [ ] `components/estoque/products/product-search.tsx`
- [ ] `components/estoque/shared/stock-status-badge.tsx`
- [ ] `app/(dashboard)/estoque/produtos/page.tsx`
- [ ] `hooks/use-products.ts`
- [ ] Testes unitários

### 8.3 Cadastro de Produto

- [ ] `components/estoque/products/product-form/product-form-tabs.tsx`
- [ ] `components/estoque/products/product-form/product-info-tab.tsx`
- [ ] `components/estoque/products/product-form/product-stock-tab.tsx`
- [ ] `components/estoque/products/product-form/product-pricing-tab.tsx`
- [ ] `components/estoque/products/product-form/product-variations-tab.tsx`
- [ ] `components/estoque/products/product-form/product-additional-tab.tsx`
- [ ] `components/estoque/shared/product-image-upload.tsx`
- [ ] `components/estoque/shared/hierarchical-select.tsx`
- [ ] `app/(dashboard)/estoque/produtos/novo/page.tsx`
- [ ] `app/(dashboard)/estoque/produtos/[id]/page.tsx`
- [ ] `hooks/use-product.ts`
- [ ] Testes unitários

### 8.4 Entrada de Estoque

- [ ] `components/estoque/stock/stock-entry-form.tsx`
- [ ] `app/(dashboard)/estoque/entrada/page.tsx`
- [ ] `hooks/use-stock-entry.ts`
- [ ] Testes unitários

### 8.5 Entrada em Massa (CSV)

- [ ] `components/estoque/csv-import/csv-wizard.tsx`
- [ ] `components/estoque/csv-import/csv-upload-step.tsx`
- [ ] `components/estoque/csv-import/csv-validation-step.tsx`
- [ ] `components/estoque/csv-import/csv-preview-step.tsx`
- [ ] `components/estoque/csv-import/csv-confirm-step.tsx`
- [ ] `app/(dashboard)/estoque/entrada/massa/page.tsx`
- [ ] `lib/estoque/csv-parser.ts`
- [ ] Testes unitários

### 8.6 Saída de Estoque

- [ ] `components/estoque/stock/stock-exit-form.tsx`
- [ ] `app/(dashboard)/estoque/saida/page.tsx`
- [ ] Testes unitários

### 8.7 Movimentações

- [ ] `components/estoque/stock/stock-movement-table.tsx`
- [ ] `app/(dashboard)/estoque/movimentacoes/page.tsx`
- [ ] `hooks/use-stock-movements.ts`
- [ ] Testes unitários

### 8.8 Categorias

- [ ] `components/estoque/categories/category-tree.tsx`
- [ ] `components/estoque/categories/category-item.tsx`
- [ ] `components/estoque/categories/category-form-modal.tsx`
- [ ] `app/(dashboard)/estoque/categorias/page.tsx`
- [ ] `hooks/use-categories.ts`
- [ ] Testes unitários

### 8.9 Gerador de Etiquetas

- [ ] `components/estoque/labels/label-generator.tsx`
- [ ] `components/estoque/labels/label-template-selector.tsx`
- [ ] `components/estoque/labels/label-preview.tsx`
- [ ] `components/estoque/labels/label-print-dialog.tsx`
- [ ] `app/(dashboard)/estoque/etiquetas/page.tsx`
- [ ] Testes unitários

### 8.10 Utilitários e Tipos

- [ ] `lib/estoque/types.ts`
- [ ] `lib/estoque/constants.ts`
- [ ] `lib/estoque/utils.ts`
- [ ] `lib/estoque/mock-data.ts`
- [ ] `lib/estoque/validations.ts`

---

## 9. Critérios de Aceitação

### 9.1 Dashboard

- [ ] Cards de métricas exibem valores corretos com ícones coloridos
- [ ] Card "Estoque Baixo" usa cor amarela (#f59e0b)
- [ ] Card "Sem Estoque" usa cor vermelha (#ef4444) com borda esquerda
- [ ] Lista de alertas ordenados por criticidade
- [ ] Gráfico de giro com filtros de período funcionais (7d, 30d, 3m)
- [ ] Botões de ações rápidas com ícones Lucide
- [ ] Responsividade mobile (cards empilhados em <1024px)
- [ ] Skeleton de loading nos cards

### 9.2 Produtos

- [ ] Busca em tempo real com debounce 300ms
- [ ] Filtros funcionais (categoria, status, estoque)
- [ ] Toggle entre Grid View e Lista View
- [ ] Badges de status de estoque coloridos
- [ ] Hover effect nos cards (shadow + translate-y)
- [ ] Paginação funcional (24 por página)
- [ ] Estado vazio quando não há produtos

### 9.3 Formulário

- [ ] Abas de navegação funcionais
- [ ] Campos obrigatórios validados
- [ ] SKU único verificado
- [ ] Upload de imagens com preview
- [ ] Margem calculada automaticamente
- [ ] Select hierárquico de categorias

### 9.4 Entrada em Massa

- [ ] Wizard de 4 etapas com indicador de progresso
- [ ] Upload de arquivo com drag-and-drop
- [ ] Mapeamento de colunas
- [ ] Preview de validação com erros destacados
- [ ] Configurações adicionais
- [ ] Toast de sucesso/erro

### 9.5 Categorias

- [ ] Árvore hierárquica com expand/collapse
- [ ] Indicadores de subcategorias e contagem de produtos
- [ ] Modal de criação com validações
- [ ] Upload de imagem com preview
- [ ] Máximo 5 níveis de profundidade

### 9.6 Estados Gerais

- [ ] Loading skeleton em todas as telas
- [ ] Estado vazio com ilustração e CTA
- [ ] Erro state com mensagem e retry
- [ ] Toast notifications para feedback
- [ ] Confirmação para ações destrutivas

### 9.7 Responsividade

| Breakpoint | Layout |
|------------|--------|
| Mobile (<640px) | 1 coluna, drawer sidebar, cards empilhados |
| Tablet (640-1024px) | 2 colunas, sidebar colapsada |
| Desktop (>1024px) | Layout completo, 4 colunas métricas |

---

## 10. Fluxo de Navegação

```
/estoque (Dashboard)
    │
    ├── /estoque/produtos (Lista)
    │       ├── /estoque/produtos/novo (Novo)
    │       └── /estoque/produtos/[id] (Editar)
    │
    ├── /estoque/entrada (Entrada Manual)
    │       └── /estoque/entrada/massa (Entrada CSV)
    │
    ├── /estoque/saida (Saída Manual)
    │
    ├── /estoque/movimentacoes (Histórico)
    │
    ├── /estoque/categorias (Categorias)
    │
    ├── /estoque/etiquetas (Etiquetas)
    │
    ├── /estoque/inventario (Inventário)
    │
    └── /estoque/relatorios (Relatórios)
```

---

## 11. Mock Data para Desenvolvimento

```typescript
// lib/estoque/mock-data.ts
import { mockProducts, mockCategories, mockMovements, mockAlerts, mockStockMetrics } from './mock-data';

export { mockProducts, mockCategories, mockMovements, mockAlerts, mockStockMetrics };
```

### Dados Mock Disponíveis

- **124 produtos** em diversas categorias
- **12 categorias** em estrutura hierárquica
- **Movimentações** de entrada, saída e ajuste
- **Alertas** de estoque baixo e crítico
- **Métricas** para dashboard

---

## 12. Notas de Implementação

### 12.1 Performance

- Use `useMemo` para cálculos pesados
- Implemente virtualização para listas grandes (>100 itens)
- Use debounce de 300ms para buscas
- Lazy load de imagens com placeholder

### 12.2 Acessibilidade

- Todos os inputs devem ter labels
- Use ARIA para modais e dropdowns
- Mantenha contraste adequado (WCAG AA)
- Navegação por teclado funcional

### 12.3 Internacionalização

- Formatadores de moeda: `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`
- Formatadores de data: `date-fns` com locale pt-BR
- Mensagens de erro em português

---

**Documento criado em:** 2026-03-21  
**Próxima Sprint:** Sprint 13 - Integração PDV  
**Sprint anterior:** Sprint 11 - Database Schema

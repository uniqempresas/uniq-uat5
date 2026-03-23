# SPEC: Módulo Marketplace - Sprint 11

**Data:** 2026-03-21  
**Sprint:** 11  
**Módulo:** Marketplace Multi-tenant  
**Responsável:** @vibe-planner  
**Status:** ✅ Especificação Completa

---

## 📋 Resumo Técnico

Este documento detalha a especificação técnica para implementação do **Módulo Marketplace Multi-tenant** da plataforma UNIQ Empresas. O marketplace permite que lojistas listem seus produtos e clientes naveguem/comprem de múltiplos vendedores em uma única plataforma unificada.

---

## 🎯 Objetivos da Implementação

### Para Lojistas/Vendedores (MVP)
- ✅ Listar produtos no marketplace
- ✅ Gerenciar perfil da loja (logo, banner, descrição)
- ✅ Acompanhar métricas de vendas (dashboard)
- ✅ Gerenciar pedidos recebidos
- ✅ Responder avaliações

### Para Clientes/Compradores
- ✅ Explorar lojistas por categoria/localização
- ✅ Ver perfil e produtos de cada lojista
- ✅ Ver avaliações e reputação

---

## 📁 Estrutura de Arquivos

```
src/
├── app/
│   └── (dashboard)/
│       └── marketplace/
│           ├── page.tsx                    # Lista de lojistas (/marketplace)
│           ├── lojista/
│           │   └── [slug]/
│           │       └── page.tsx            # Perfil do lojista (/marketplace/lojista/[slug])
│           └── minha-loja/
│               └── page.tsx                # Painel do vendedor (/marketplace/minha-loja)
├── components/
│   └── marketplace/
│       ├── seller-card.tsx                 # Card de lojista (grid)
│       ├── seller-header.tsx              # Header hero do lojista
│       ├── seller-metrics.tsx             # Métricas do lojista
│       ├── seller-filters.tsx             # Filtros de busca
│       ├── product-card.tsx               # Card de produto (marketplace)
│       ├── product-table.tsx              # Tabela de produtos (admin)
│       ├── order-card.tsx                 # Card de pedido
│       ├── review-item.tsx                # Item de avaliação
│       ├── review-distribution.tsx        # Distribuição de avaliações
│       ├── star-rating.tsx                # Componente de estrelas
│       ├── status-badge.tsx               # Badge de status
│       ├── pagination.tsx                 # Navegação de páginas
│       ├── empty-state.tsx                # Estado vazio
│       ├── store-setup-wizard.tsx         # Onboarding de nova loja
│       ├── image-upload.tsx               # Upload de logo/banner
│       └── metric-card.tsx                # Cards de métricas (dashboard)
├── hooks/
│   ├── marketplace/
│   │   ├── use-sellers.ts                # Hook: lista de lojistas
│   │   ├── use-seller.ts                  # Hook: perfil do lojista
│   │   ├── use-seller-products.ts         # Hook: produtos do lojista
│   │   ├── use-seller-orders.ts           # Hook: pedidos do lojista
│   │   ├── use-seller-reviews.ts          # Hook: avaliações do lojista
│   │   ├── use-my-store.ts                # Hook: minha loja (seller)
│   │   └── use-product-crud.ts             # Hook: CRUD de produtos
│   └── index.ts                           # Export centralizado
├── types/
│   └── marketplace.ts                     # Todos os tipos do marketplace
├── lib/
│   ├── utils/
│   │   ├── format-currency.ts             # Formatação de moeda
│   │   ├── format-date.ts                 # Formatação de data
│   │   └── slugify.ts                     # Gerar slugs
│   └── mocks/
│       └── marketplace.ts                 # Dados mock para desenvolvimento
└── providers/
    └── marketplace-provider.tsx            # Provider de contexto do marketplace
```

---

## 🔗 Rotas e URLs

| Rota | Descrição | Auth | Permissão |
|------|-----------|------|----------|
| `/marketplace` | Lista de lojistas | Opcional | `module:marketplace:read` |
| `/marketplace/lojista/[slug]` | Perfil público do lojista | Opcional | `module:marketplace:read` |
| `/marketplace/minha-loja` | Painel do vendedor | Obrigatório | `module:marketplace:seller` |

---

## 📦 Tipos TypeScript

### Arquivo: `types/marketplace.ts`

```typescript
// ============================================================================
// Seller (Lojista/Vendedor)
// ============================================================================

export interface SellerLocation {
  city: string;
  state: string;
}

export interface Seller {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  banner: string | null;
  description: string;
  location: SellerLocation;
  rating: number;
  reviewCount: number;
  productCount: number;
  salesCount: number;
  isVerified: boolean;
  isPremium: boolean;
  isNew: boolean; // joined < 30 days
  createdAt: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  cnpj?: string;
  businessHours?: string;
  categories?: string[]; // categorias principais
}

export interface SellerCreateInput {
  name: string;
  description: string;
  phone?: string;
  whatsapp?: string;
  businessHours?: string;
}

export interface SellerUpdateInput extends Partial<SellerCreateInput> {
  logo?: string | null;
  banner?: string | null;
}

// ============================================================================
// Product (Produto)
// ============================================================================

export type ProductStatus = 'active' | 'paused' | 'out_of_stock' | 'draft';

export interface Product {
  id: string;
  sellerId: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number; // preço original (para desconto)
  images: string[];
  category: string;
  categoryId?: string;
  stock: number;
  status: ProductStatus;
  salesCount: number;
  rating?: number;
  reviewCount?: number;
  sku?: string;
  tags?: string[];
  hasFreeShipping?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCreateInput {
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  categoryId?: string;
  stock: number;
  sku?: string;
  tags?: string[];
  hasFreeShipping?: boolean;
}

export interface ProductUpdateInput extends Partial<ProductCreateInput> {
  status?: ProductStatus;
}

// ============================================================================
// Order (Pedido)
// ============================================================================

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderCustomer {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  options?: Record<string, string>; // opções do produto
}

export interface Order {
  id: string;
  orderNumber: string;
  sellerId: string;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  notes?: string;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// Review (Avaliação)
// ============================================================================

export interface ReviewReply {
  content: string;
  createdAt: string;
}

export interface Review {
  id: string;
  sellerId: string;
  productId?: string;
  productName?: string;
  customerId?: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  title?: string;
  content: string;
  photos?: string[];
  reply?: ReviewReply;
  isVerifiedPurchase: boolean;
  createdAt: string;
}

export interface ReviewCreateInput {
  sellerId: string;
  productId?: string;
  rating: number;
  title?: string;
  content: string;
  photos?: string[];
}

export interface ReviewReplyInput {
  reviewId: string;
  content: string;
}

// ============================================================================
// Metrics (Métricas do Dashboard)
// ============================================================================

export interface SellerMetrics {
  salesMonth: number;
  salesMonthChange: number; // % variação
  revenueToday: number;
  ordersPending: number;
  ordersNewToday: number;
  productsActive: number;
  productsTotal: number;
}

// ============================================================================
// Filters (Filtros)
// ============================================================================

export type SellerSortOption = 
  | 'relevance' 
  | 'rating_desc' 
  | 'products_desc' 
  | 'sales_desc' 
  | 'newest';

export type ProductSortOption =
  | 'newest'
  | 'price_asc'
  | 'price_desc'
  | 'sales_desc';

export interface SellerFilters {
  search?: string;
  category?: string;
  location?: string;
  minRating?: number;
  sort?: SellerSortOption;
  page?: number;
  limit?: number;
}

export interface ProductFilters {
  search?: string;
  category?: string;
  sort?: ProductSortOption;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export interface OrderFilters {
  search?: string;
  status?: OrderStatus;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

// ============================================================================
// Review Distribution (Distribuição de Avaliações)
// ============================================================================

export interface ReviewDistribution {
  5: number; // count of 5-star reviews
  4: number;
  3: number;
  2: number;
  1: number;
  average: number;
  total: number;
}

// ============================================================================
// Categories (Categorias)
// ============================================================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  count?: number;
}

// Predefined categories for the region
export const MARKETPLACE_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Eletrônicos', slug: 'eletronicos', icon: 'Laptop' },
  { id: 'cat-2', name: 'Roupas e Acessórios', slug: 'roupas', icon: 'Shirt' },
  { id: 'cat-3', name: 'Alimentos e Bebidas', slug: 'alimentos', icon: 'Coffee' },
  { id: 'cat-4', name: 'Beleza e Cosméticos', slug: 'beleza', icon: 'Sparkles' },
  { id: 'cat-5', name: 'Móveis e Decoração', slug: 'moveis', icon: 'Sofa' },
  { id: 'cat-6', name: 'Esportes e Lazer', slug: 'esportes', icon: 'Dumbbell' },
  { id: 'cat-7', name: 'Serviços', slug: 'servicos', icon: 'Briefcase' },
  { id: 'cat-8', name: 'Outros', slug: 'outros', icon: 'Package' },
];

// Predefined locations for the region
export const MARKETPLACE_LOCATIONS = [
  { value: '', label: 'Todas as regiões' },
  { value: 'Suzano', label: 'Suzano, SP' },
  { value: 'Mogi das Cruzes', label: 'Mogi das Cruzes, SP' },
  { value: 'Itaquaquecetuba', label: 'Itaquaquecetuba, SP' },
  { value: 'Poá', label: 'Poá, SP' },
  { value: 'Ferraz de Vasconcelos', label: 'Ferraz de Vasconcelos, SP' },
  { value: 'Santa Isabel', label: 'Santa Isabel, SP' },
];
```

---

## 🧩 Arquitetura de Componentes

### 1. SellerCard

**Localização:** `components/marketplace/seller-card.tsx`

```typescript
interface SellerCardProps {
  seller: Seller;
  onClick?: (seller: Seller) => void;
}

interface SellerCardClasses {
  card: string;
  logo: string;
  logoPlaceholder: string;
  name: string;
  location: string;
  rating: string;
  metrics: string;
  badges: string;
  cta: string;
}

const sellerCardClasses: SellerCardClasses = {
  card: 'bg-white rounded-xl border border-[#e5e7eb] p-6 hover:shadow-lg hover:border-[#86cb92] transition-all duration-300 cursor-pointer group',
  logo: 'w-16 h-16 rounded-xl bg-[#efefef] flex items-center justify-center overflow-hidden',
  logoPlaceholder: 'w-full h-full flex items-center justify-center',
  name: 'text-lg font-semibold text-[#1f2937] group-hover:text-[#3e5653] transition-colors',
  location: 'text-sm text-[#627271] mt-1 flex items-center gap-1',
  rating: 'flex items-center gap-2 mb-3',
  metrics: 'flex items-center gap-4 text-sm text-[#627271] mb-4',
  badges: 'flex flex-wrap gap-2 mb-4',
  cta: 'pt-4 border-t border-[#e5e7eb]',
};
```

**Estados:**
- Default: Card normal com informações do lojista
- Hover: Shadow elevado, borda accent, CTA visível
- Loading: Skeleton com animação pulse
- No Logo: Placeholder com ícone Store
- Premium Badge: Badge dourado com ícone coroa
- Verified Badge: Badge verde com ícone check

### 2. SellerHeader

**Localização:** `components/marketplace/seller-header.tsx`

```typescript
interface SellerHeaderProps {
  seller: Seller;
  onFollow?: () => void;
  onMessage?: () => void;
  isFollowing?: boolean;
  isLoading?: boolean;
}

interface SellerHeaderClasses {
  container: string;
  banner: string;
  bannerOverlay: string;
  profileContainer: string;
  logo: string;
  logoPlaceholder: string;
  info: string;
  name: string;
  verifiedBadge: string;
  location: string;
  joined: string;
  stats: string;
  actions: string;
  followButton: string;
  messageButton: string;
}
```

### 3. ProductCard (Marketplace)

**Localização:** `components/marketplace/product-card.tsx`

```typescript
interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

interface ProductCardClasses {
  card: string;
  image: string;
  imageContainer: string;
  discountBadge: string;
  freeShippingBadge: string;
  content: string;
  name: string;
  price: string;
  originalPrice: string;
  rating: string;
  sales: string;
}
```

### 4. ProductTable

**Localização:** `components/marketplace/product-table.tsx`

```typescript
interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDuplicate: (product: Product) => void;
  onDelete: (product: Product) => void;
  onStatusChange: (product: Product, status: ProductStatus) => void;
  isLoading?: boolean;
}

interface ProductTableClasses {
  container: string;
  table: string;
  thead: string;
  th: string;
  tbody: string;
  tr: string;
  td: string;
  productCell: string;
  productImage: string;
  productInfo: string;
  priceCell: string;
  stockCell: string;
  stockWarning: string;
  statusBadge: string;
  actionsCell: string;
}
```

### 5. OrderCard

**Localização:** `components/marketplace/order-card.tsx`

```typescript
interface OrderCardProps {
  order: Order;
  onViewDetails?: (order: Order) => void;
  onStatusChange?: (order: Order, status: OrderStatus) => void;
}

interface OrderCardClasses {
  card: string;
  header: string;
  orderNumber: string;
  statusBadge: string;
  customerInfo: string;
  productsPreview: string;
  productThumb: string;
  total: string;
  actions: string;
  date: string;
}
```

### 6. ReviewItem

**Localização:** `components/marketplace/review-item.tsx`

```typescript
interface ReviewItemProps {
  review: Review;
  onReply?: (review: Review) => void;
  canReply?: boolean;
}

interface ReviewItemClasses {
  container: string;
  header: string;
  avatar: string;
  customerInfo: string;
  customerName: string;
  date: string;
  rating: string;
  title: string;
  content: string;
  photos: string;
  productLink: string;
  reply: string;
  replyButton: string;
  verifiedBadge: string;
}
```

### 7. ReviewDistribution

**Localização:** `components/marketplace/review-distribution.tsx`

```typescript
interface ReviewDistributionProps {
  distribution: ReviewDistribution;
  orientation?: 'horizontal' | 'vertical';
}

interface ReviewDistributionClasses {
  container: string;
  averageContainer: string;
  averageNumber: string;
  averageStars: string;
  totalReviews: string;
  barsContainer: string;
  barRow: string;
  starLabel: string;
  barContainer: string;
  barFill: string;
  barCount: string;
}
```

### 8. StatusBadge

**Localização:** `components/marketplace/status-badge.tsx`

```typescript
type StatusType = 
  | ProductStatus 
  | OrderStatus 
  | 'verified' 
  | 'new' 
  | 'premium';

interface StatusBadgeProps {
  status: StatusType;
  size?: 'sm' | 'md' | 'lg';
}

const STATUS_CONFIG: Record<StatusType, { label: string; className: string; icon?: string }> = {
  // Product Status
  active: { label: 'Ativo', className: 'bg-green-100 text-green-700' },
  paused: { label: 'Pausado', className: 'bg-amber-100 text-amber-700' },
  out_of_stock: { label: 'Sem estoque', className: 'bg-red-100 text-red-700' },
  draft: { label: 'Rascunho', className: 'bg-gray-100 text-gray-700' },
  
  // Order Status
  pending: { label: 'Pendente', className: 'bg-amber-100 text-amber-700', icon: 'Clock' },
  paid: { label: 'Pago', className: 'bg-blue-100 text-blue-700', icon: 'Check' },
  shipped: { label: 'Enviado', className: 'bg-purple-100 text-purple-700', icon: 'Truck' },
  delivered: { label: 'Entregue', className: 'bg-green-100 text-green-700', icon: 'CheckCheck' },
  cancelled: { label: 'Cancelado', className: 'bg-red-100 text-red-700', icon: 'X' },
  
  // Seller Badges
  verified: { label: 'Verificado', className: 'bg-[#86cb92]/10 text-[#86cb92]' },
  new: { label: 'Novo', className: 'bg-blue-100 text-blue-700' },
  premium: { label: 'Premium', className: 'bg-amber-100 text-amber-700' },
};
```

### 9. StarRating

**Localização:** `components/marketplace/star-rating.tsx`

```typescript
interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  count?: number;
}
```

### 10. Pagination

**Localização:** `components/marketplace/pagination.tsx`

```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisible?: number;
}
```

### 11. EmptyState

**Localização:** `components/marketplace/empty-state.tsx`

```typescript
interface EmptyStateProps {
  title: string;
  description: string;
  icon?: 'store' | 'search' | 'package' | 'orders' | 'reviews';
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

### 12. ImageUpload

**Localização:** `components/marketplace/image-upload.tsx`

```typescript
interface ImageUploadProps {
  label: string;
  value?: string | null;
  onChange: (file: File | null) => void;
  accept?: string;
  maxSize?: number; // in MB
  aspectRatio?: 'square' | 'banner';
  preview?: boolean;
}
```

### 13. MetricCard

**Localização:** `components/marketplace/metric-card.tsx`

```typescript
interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: {
    value: number;
    direction: 'up' | 'down';
  };
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'info';
}

const METRIC_CARD_VARIANTS = {
  default: {
    iconBg: 'bg-[#86cb92]/20',
    iconColor: 'text-[#86cb92]',
  },
  success: {
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  warning: {
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  info: {
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
};
```

### 14. SellerFilters

**Localização:** `components/marketplace/seller-filters.tsx`

```typescript
interface SellerFiltersProps {
  filters: SellerFilters;
  onFiltersChange: (filters: Partial<SellerFilters>) => void;
  categories?: Category[];
  locations?: { value: string; label: string }[];
}

interface SellerFiltersClasses {
  container: string;
  searchWrapper: string;
  searchInput: string;
  select: string;
  sortSelect: string;
}
```

### 15. StoreSetupWizard

**Localização:** `components/marketplace/store-setup-wizard.tsx`

```typescript
interface StoreSetupWizardProps {
  onComplete: (data: SellerCreateInput & { logo?: File; banner?: File }) => void;
  onSkip?: () => void;
}

interface WizardStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<StepProps>;
}
```

---

## 🪝 Hooks

### useSellers

**Localização:** `hooks/marketplace/use-sellers.ts`

```typescript
export function useSellers(initialFilters?: SellerFilters) {
  // State
  const [filters, setFilters] = useState<SellerFilters>({
    page: 1,
    limit: 12,
    sort: 'relevance',
    ...initialFilters,
  });
  
  // Data fetching (mock for MVP)
  const { data, isLoading, error } = useQuery({
    queryKey: ['sellers', filters],
    queryFn: async () => {
      // TODO: Replace with actual API call
      const response = await mockGetSellers(filters);
      return response;
    },
  });
  
  // Actions
  const updateFilters = useCallback((newFilters: Partial<SellerFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  }, []);
  
  const resetFilters = useCallback(() => {
    setFilters({ page: 1, limit: 12, sort: 'relevance' });
  }, []);
  
  return {
    sellers: data?.data ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 1,
    currentPage: filters.page ?? 1,
    isLoading,
    error,
    filters,
    updateFilters,
    resetFilters,
  };
}
```

### useSeller

**Localização:** `hooks/marketplace/use-seller.ts`

```typescript
export function useSeller(slug: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['seller', slug],
    queryFn: async () => {
      const response = await mockGetSellerBySlug(slug);
      return response;
    },
    enabled: !!slug,
  });
  
  return {
    seller: data,
    isLoading,
    error,
  };
}
```

### useSellerProducts

**Localização:** `hooks/marketplace/use-seller-products.ts`

```typescript
export function useSellerProducts(sellerId: string, filters?: ProductFilters) {
  // Similar pattern to useSellers
  // Returns paginated products for a specific seller
}
```

### useSellerOrders

**Localização:** `hooks/marketplace/use-seller-orders.ts`

```typescript
export function useSellerOrders(sellerId: string, filters?: OrderFilters) {
  // Returns paginated orders for a specific seller
  // Includes order status update mutation
}
```

### useSellerReviews

**Localização:** `hooks/marketplace/use-seller-reviews.ts`

```typescript
export function useSellerReviews(sellerId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['seller-reviews', sellerId],
    queryFn: async () => {
      const [reviews, distribution] = await Promise.all([
        mockGetSellerReviews(sellerId),
        mockGetReviewDistribution(sellerId),
      ]);
      return { reviews, distribution };
    },
  });
  
  // Reply mutation
  const replyMutation = useMutation({
    mutationFn: async (input: ReviewReplyInput) => {
      await mockReplyReview(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['seller-reviews', sellerId]);
    },
  });
  
  return {
    reviews: data?.reviews ?? [],
    distribution: data?.distribution,
    isLoading,
    error,
    reply: replyMutation.mutate,
    isReplying: replyMutation.isPending,
  };
}
```

### useMyStore

**Localização:** `hooks/marketplace/use-my-store.ts`

```typescript
export function useMyStore() {
  const { user } = useAuth(); // from existing auth context
  
  const { data: seller, isLoading: isLoadingSeller } = useQuery({
    queryKey: ['my-store'],
    queryFn: async () => {
      if (!user) return null;
      const store = await mockGetMyStore(user.id);
      return store;
    },
    enabled: !!user,
  });
  
  const { data: metrics, isLoading: isLoadingMetrics } = useQuery({
    queryKey: ['my-store-metrics'],
    queryFn: async () => {
      if (!seller?.id) return null;
      return mockGetSellerMetrics(seller.id);
    },
    enabled: !!seller?.id,
  });
  
  const updateMutation = useMutation({
    mutationFn: async (data: SellerUpdateInput) => {
      if (!seller?.id) throw new Error('No store');
      await mockUpdateMyStore(seller.id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['my-store']);
    },
  });
  
  return {
    seller,
    metrics,
    isLoading: isLoadingSeller || isLoadingMetrics,
    isNoStore: !isLoadingSeller && !seller,
    updateStore: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
}
```

### useProductCrud

**Localização:** `hooks/marketplace/use-product-crud.ts`

```typescript
export function useProductCrud() {
  const queryClient = useQueryClient();
  
  const createMutation = useMutation({
    mutationFn: async (data: ProductCreateInput) => {
      return mockCreateProduct(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['seller-products']);
      toast.success('Produto criado com sucesso!');
    },
  });
  
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ProductUpdateInput }) => {
      return mockUpdateProduct(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['seller-products']);
      toast.success('Produto atualizado!');
    },
  });
  
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return mockDeleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['seller-products']);
      toast.success('Produto excluído!');
    },
  });
  
  const duplicateMutation = useMutation({
    mutationFn: async (id: string) => {
      return mockDuplicateProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['seller-products']);
      toast.success('Produto duplicado!');
    },
  });
  
  return {
    create: createMutation.mutate,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,
    duplicate: duplicateMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isDuplicating: duplicateMutation.isPending,
  };
}
```

---

## 🎨 Design Tokens

### Paleta de Cores (Tailwind Custom)

```typescript
// tailwind.config.ts - Already configured
colors: {
  uniq: {
    platinum: '#efefef',      // Background principal
    white: '#ffffff',         // Cards
    sidebar: '#1f2937',       // Sidebar
    primary: '#3e5653',       // Botões primários
    hover: '#1f2937',         // Hover
    accent: '#86cb92',         // Accent/destaque
    text: '#1f2937',          // Texto principal
    muted: '#627271',          // Texto secundário
    border: '#e5e7eb',        // Bordas
  }
}
```

### Classes CSS Reutilizáveis

```typescript
// Card
const cardBase = 'bg-white rounded-xl border border-[#e5e7eb]';

// Card Hover
const cardHover = 'hover:shadow-lg hover:border-[#86cb92] transition-all duration-300';

// Input
const inputBase = 'w-full px-4 py-2.5 rounded-lg border border-[#e5e7eb] bg-white text-[#1f2937]';
const inputFocus = 'focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92]';

// Button Primary
const btnPrimary = 'px-6 py-2.5 bg-[#3e5653] hover:bg-[#1f2937] text-white font-medium rounded-lg transition-all';
const btnPrimarySm = 'px-4 py-2 bg-[#3e5653] hover:bg-[#1f2937] text-white text-sm font-medium rounded-lg transition-all';

// Badge Verified
const badgeVerified = 'flex items-center gap-1 px-2 py-1 bg-[#86cb92]/10 text-[#86cb92] text-xs font-medium rounded-full';

// Badge Premium
const badgePremium = 'px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full flex items-center gap-1';

// Skeleton
const skeleton = 'bg-[#e5e7eb] animate-pulse rounded';
```

---

## 📄 Páginas

### Página 1: Lista de Lojistas (`/marketplace`)

```typescript
// app/(dashboard)/marketplace/page.tsx

export default function MarketplacePage() {
  const {
    sellers,
    total,
    totalPages,
    currentPage,
    isLoading,
    filters,
    updateFilters,
    resetFilters,
  } = useSellers();
  
  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar currentPath="/marketplace" />
      <Header pageTitle="Marketplace" />
      
      <main className="ml-0 lg:ml-64 pt-16 p-4 lg:p-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1f2937]">Marketplace</h1>
          <p className="text-sm text-[#627271] mt-1">
            Encontre os melhores lojistas e produtos da sua região
          </p>
        </div>
        
        {/* Search */}
        <MarketplaceSearch
          value={filters.search ?? ''}
          onChange={(search) => updateFilters({ search })}
          placeholder="Buscar lojistas, produtos..."
        />
        
        {/* Filters */}
        <SellerFilters
          filters={filters}
          onFiltersChange={updateFilters}
          categories={MARKETPLACE_CATEGORIES}
          locations={MARKETPLACE_LOCATIONS}
        />
        
        {/* Results */}
        {isLoading ? (
          <SellerGridSkeleton count={12} />
        ) : sellers.length === 0 ? (
          <EmptyState
            title="Nenhum lojista encontrado"
            description="Tente ajustar seus filtros ou buscar por outro termo."
            icon="search"
            action={{ label: 'Limpar Filtros', onClick: resetFilters }}
          />
        ) : (
          <>
            <SellerGrid sellers={sellers} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => updateFilters({ page })}
            />
          </>
        )}
      </main>
    </div>
  );
}
```

### Página 2: Perfil do Lojista (`/marketplace/lojista/[slug]`)

```typescript
// app/(dashboard)/marketplace/lojista/[slug]/page.tsx

interface PageProps {
  params: { slug: string };
}

export default function SellerProfilePage({ params }: PageProps) {
  const { slug } = params;
  const { seller, isLoading: isLoadingSeller } = useSeller(slug);
  const [activeTab, setActiveTab] = useState<'products' | 'reviews' | 'about'>('products');
  
  const { products, isLoading: isLoadingProducts } = useSellerProducts(seller?.id ?? '');
  const { reviews, distribution } = useSellerReviews(seller?.id ?? '');
  
  if (isLoadingSeller) return <SellerProfileSkeleton />;
  if (!seller) return <SellerNotFound />;
  
  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar currentPath="/marketplace" />
      <Header pageTitle="Marketplace" />
      
      <main className="ml-0 lg:ml-64 pt-16">
        {/* Seller Header/Hero */}
        <SellerHeader seller={seller} />
        
        {/* Tabs */}
        <SellerTabs activeTab={activeTab} onTabChange={setActiveTab} seller={seller} />
        
        {/* Tab Content */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {activeTab === 'products' && (
            <SellerProductsTab 
              products={products}
              isLoading={isLoadingProducts}
            />
          )}
          
          {activeTab === 'reviews' && (
            <SellerReviewsTab
              reviews={reviews}
              distribution={distribution}
            />
          )}
          
          {activeTab === 'about' && (
            <SellerAboutTab seller={seller} />
          )}
        </div>
      </main>
    </div>
  );
}
```

### Página 3: Painel do Lojista (`/marketplace/minha-loja`)

```typescript
// app/(dashboard)/marketplace/minha-loja/page.tsx

export default function MyStorePage() {
  const { seller, metrics, isLoading, isNoStore } = useMyStore();
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'reviews' | 'settings'>('products');
  
  // Handle new store onboarding
  if (isNoStore) {
    return <StoreSetupWizard />;
  }
  
  const { products, isLoading: isLoadingProducts } = useSellerProducts(seller!.id);
  const { orders } = useSellerOrders(seller!.id);
  const { reviews, distribution, reply, isReplying } = useSellerReviews(seller!.id);
  
  const { create, update, delete: deleteProduct, duplicate, isCreating } = useProductCrud();
  
  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar currentPath="/marketplace/minha-loja" />
      <Header pageTitle="Minha Loja" />
      
      <main className="ml-0 lg:ml-64 pt-16 p-4 lg:p-6">
        {/* Metrics */}
        <MetricsGrid metrics={metrics} isLoading={isLoading} />
        
        {/* Tabs */}
        <div className="bg-white rounded-t-xl border border-b-0 border-[#e5e7eb]">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="products">Produtos</TabsTrigger>
              <TabsTrigger value="orders">Pedidos</TabsTrigger>
              <TabsTrigger value="reviews">Avaliações</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Tab Content */}
        <div className="bg-white rounded-b-xl border border-t-0 border-[#e5e7eb] p-6">
          {activeTab === 'products' && (
            <ProductsTab
              products={products}
              isLoading={isLoadingProducts}
              onCreate={() => create({} as ProductCreateInput)} // TODO: Open modal
              onEdit={(product) => update({ id: product.id, data: {} as ProductUpdateInput })}
              onDuplicate={duplicate}
              onDelete={deleteProduct}
            />
          )}
          
          {activeTab === 'orders' && (
            <OrdersTab orders={orders} />
          )}
          
          {activeTab === 'reviews' && (
            <ReviewsTab
              reviews={reviews}
              distribution={distribution}
              onReply={reply}
              isReplying={isReplying}
            />
          )}
          
          {activeTab === 'settings' && (
            <SettingsTab seller={seller} />
          )}
        </div>
      </main>
    </div>
  );
}
```

---

## 🔧 Dependências

### Existentes (Já no projeto)

| Dependência | Versão | Uso |
|-------------|--------|-----|
| Next.js | 14+ | Framework |
| React | 18+ | UI |
| TypeScript | 5+ | Type safety |
| Tailwind CSS | 3.4+ | Styling |
| shadcn/ui | latest | Componentes base |
| Lucide React | latest | Ícones |
| React Hook Form | latest | Formulários |
| Zod | latest | Validação |
| @tanstack/react-query | latest | Data fetching |
| Radix UI | latest | Componentes acessíveis |
| class-variance-authority | latest | Variants |

### Novas (Para instalar)

| Dependência | Versão | Uso | Necessária? |
|-------------|--------|-----|-------------|
| react-dropzone | 14+ | Upload de imagens | Sim (drag & drop) |
| date-fns | 3+ | Formatação de datas | Opcional (pode usar Intl) |

---

## ✅ Checklist de Implementação

### Fase 1: Foundation (Types + Utils)

- [ ] Criar arquivo `types/marketplace.ts` com todas as interfaces
- [ ] Criar arquivo `lib/mocks/marketplace.ts` com dados mock
- [ ] Criar utilitários em `lib/utils/`:
  - [ ] `format-currency.ts`
  - [ ] `format-date.ts`
  - [ ] `slugify.ts`
- [ ] Exportar tipos em `types/index.ts`

### Fase 2: Hooks

- [ ] Criar pasta `hooks/marketplace/`
- [ ] Implementar `use-sellers.ts`
- [ ] Implementar `use-seller.ts`
- [ ] Implementar `use-seller-products.ts`
- [ ] Implementar `use-seller-orders.ts`
- [ ] Implementar `use-seller-reviews.ts`
- [ ] Implementar `use-my-store.ts`
- [ ] Implementar `use-product-crud.ts`
- [ ] Exportar hooks em `hooks/marketplace/index.ts`

### Fase 3: Componentes Base

- [ ] Criar pasta `components/marketplace/`
- [ ] Implementar `star-rating.tsx`
- [ ] Implementar `status-badge.tsx`
- [ ] Implementar `pagination.tsx`
- [ ] Implementar `empty-state.tsx`
- [ ] Implementar `image-upload.tsx` (para logo/banner)
- [ ] Implementar `metric-card.tsx`
- [ ] Implementar `seller-filters.tsx`
- [ ] Implementar `review-distribution.tsx`

### Fase 4: Componentes de Cards

- [ ] Implementar `seller-card.tsx`
- [ ] Implementar `product-card.tsx`
- [ ] Implementar `order-card.tsx`
- [ ] Implementar `review-item.tsx`

### Fase 5: Componentes de Layout

- [ ] Implementar `seller-header.tsx`
- [ ] Implementar `seller-metrics.tsx`
- [ ] Implementar `product-table.tsx`
- [ ] Implementar `store-setup-wizard.tsx`

### Fase 6: Páginas

- [ ] Criar pasta `app/(dashboard)/marketplace/`
- [ ] Implementar página `page.tsx` (lista de lojistas)
- [ ] Criar pasta `app/(dashboard)/marketplace/lojista/[slug]/`
- [ ] Implementar página `page.tsx` (perfil do lojista)
- [ ] Criar pasta `app/(dashboard)/marketplace/minha-loja/`
- [ ] Implementar página `page.tsx` (painel do vendedor)

### Fase 7: Integração e Testes

- [ ] Adicionar rota no sidebar (se aplicável)
- [ ] Testar responsividade em mobile/tablet/desktop
- [ ] Testar todos os estados (loading, empty, error)
- [ ] Testar interações (filtros, paginação, tabs)
- [ ] Testar upload de imagens
- [ ] Verificar acessibilidade (navegação por teclado)
- [ ] Testar performance (lazy loading de imagens)

### Fase 8: Polish

- [ ] Adicionar animações de transição
- [ ] Implementar toasts de feedback
- [ ] Adicionar skeletons de loading
- [ ] Testar edge cases (sem logo, sem banner, etc.)

---

## 🚨 Dependências de Implementação

### Pré-requisitos (Sprints Anteriores)

| Sprint | Módulo | Status Necessário |
|--------|--------|-------------------|
| 01 | Design System | ✅ Completo |
| 02 | Dashboard Base | ✅ Completo |
| 03 | Autenticação | ✅ Completo |
| 05 | Sidebar/Navigation | ✅ Completo |
| 07 | Storefront (básico) | ✅ Completo |

### Integrações Futuras (Não neste Sprint)

| Integração | Sprint Planejado | Notas |
|------------|-------------------|-------|
| Checkout unificado | Sprint 12+ | Carrinho com múltiplos vendedores |
| Pagamentos (MercadoPago/Stripe) | Sprint 13+ | Integração de pagamentos |
| WhatsApp Business API | Sprint 14+ | Mensagens diretas |
| Chat comprador/vendedor | Sprint 15+ | Comunicação em tempo real |
| Importar catálogo Instagram | Sprint 16+ | Sincronização com redes sociais |

---

## 📝 Notas Técnicas

### Performance

1. **Lazy Loading de Imagens**: Usar `next/image` com blur placeholder
2. **Code Splitting**: Cada página é automaticamente split pelo Next.js
3. **Virtualização**: Para listas longas (100+ produtos), considerar `react-window`
4. **Memoização**: Usar `React.memo` para cards que se repetem

### Acessibilidade

1. **Navegação por teclado**: Tabs, filtros e ações devem ser navegáveis
2. **Focus visible**: Garantir `focus-visible` em todos os elementos interativos
3. **ARIA labels**: Adicionar em botões sem texto visível
4. **Alt text**: Todas as imagens devem ter `alt` descritivo
5. **Contraste**: Verificar WCAG AA para todas as cores

### Responsividade

| Breakpoint | Layout |
|------------|--------|
| < 640px (mobile) | 1 coluna, filtros em drawer/modal |
| 640-1023px (tablet) | 2 colunas |
| ≥ 1024px (desktop) | 3-4 colunas |

---

## 🔄 Histórico de Alterações

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-03-21 | @vibe-planner | SPEC inicial - Sprint 11 Marketplace |

---

**Documento gerado para UNIQ Empresas**  
**Próximo passo:** @vibe-implementer implementará o código baseado neste SPEC


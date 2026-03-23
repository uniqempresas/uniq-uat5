# PRD - Sprint 09: Storefront UI

**Projeto:** UNIQ Empresas  
**Tipo:** Frontend (F)  
**Duração:** 2 semanas  
**Período:** Abril/2026 (Semanas 6-7)  
**Metodologia:** Vibe Coding (Frontend First)

---

## 1. Visão Geral

### 1.1 Objetivo
Desenvolver a interface completa da loja virtual pública, incluindo tema visual, carrinho de compras, checkout visual e painel de configuração da loja. Esta sprint foca exclusivamente no frontend com dados mockados.

### 1.2 Contexto do Projeto
A UNIQ Empresas é uma plataforma SaaS modular para pequenos empreendedores que precisam de uma solução completa de gestão. A Storefront UI representa a interface de e-commerce que os clientes finais verão ao acessar a loja virtual de cada empresa.

### 1.3 Stack Tecnológico
- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS v3.4
- **UI Components:** shadcn/ui + Radix UI
- **Ícones:** Lucide React
- **Formulários:** React Hook Form + Zod
- **Gerenciamento de Estado:** React Context (Cart Context)

---

## 2. Estrutura do Projeto

```
app/
├── (store)/                    # Grupo de rotas da loja pública
│   ├── layout.tsx              # Layout com header, footer e cart drawer
│   ├── page.tsx                # Página inicial da loja (grid de produtos)
│   ├── checkout/
│   │   └── page.tsx            # Página de checkout
│   └── produto/
│       └── [slug]/
│           ├── page.tsx        # Página estática do produto
│           └── product-client.tsx # Componente cliente do produto
│
├── dashboard/
│   └── loja/
│       └── configuracoes/
│           └── page.tsx        # Painel de configuração da loja
│
components/
├── storefront/
│   ├── layout/
│   │   ├── store-header.tsx    # Header da loja
│   │   └── store-footer.tsx    # Footer da loja
│   ├── product/
│   │   ├── product-card.tsx    # Card de produto
│   │   ├── product-grid.tsx    # Grid de produtos
│   │   └── product-filters.tsx # Filtros laterais
│   ├── cart/
│   │   └── cart-drawer.tsx     # Drawer do carrinho
│   └── checkout/
│       ├── checkout-steps.tsx  # Indicador de steps
│       ├── checkout-form.tsx   # Form dados pessoais
│       ├── address-form.tsx    # Form endereço
│       ├── payment-selector.tsx # Seletor de pagamento
│       └── checkout-success.tsx # Tela de sucesso
│
├── ui/                         # Componentes shadcn/ui
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── sheet.tsx
│   ├── tabs.tsx
│   └── ... (demais componentes)
│
contexts/
└── cart-context.tsx            # Contexto global do carrinho
│
types/
├── storefront.ts               # Tipos da loja
├── cart.ts                     # Tipos do carrinho
└── checkout.ts                 # Tipos do checkout
│
lib/
├── mocks/
│   └── storefront.ts           # Dados mockados
└── utils/
    └── formatters.ts           # Formatadores (preço, telefone, CEP)
```

---

## 3. Requisitos Funcionais

### 3.1 Tema da Loja Pública (/loja)

#### 3.1.1 Header da Loja (THEME-01)
**Descrição:** Header fixo com logo, busca e carrinho

**Funcionalidades:**
- Logo com link para home
- Campo de busca com ícone de lupa
- Badge com quantidade de itens no carrinho
- Menu mobile com Sheet component
- Categorias em navegação desktop
- Telefone de contato

**Componente:** `components/storefront/layout/store-header.tsx`

**Props:**
```typescript
interface StoreHeaderProps {
  onCartClick?: () => void;
}
```

**Estados:**
- `isScrolled`: boolean - Controla sombra e padding ao scrollar
- `searchQuery`: string - Valor da busca
- `isMobileMenuOpen`: boolean - Controla menu mobile

**Mock Data:** `mockStoreConfig` de `@/lib/mocks/storefront`

---

#### 3.1.2 Grid de Produtos (THEME-02)
**Descrição:** Grid responsivo de cards de produtos

**Funcionalidades:**
- Grid responsivo (1 coluna mobile, 2 tablet, 3-4 desktop)
- Loading skeleton state
- Empty state quando não há produtos
- Cards com hover effects
- Badges (Novo, Mais Vendido, Desconto, Esgotado)

**Componente:** `components/storefront/product/product-grid.tsx`

**Props:**
```typescript
interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}
```

---

#### 3.1.3 Card de Produto (THEME-02)
**Descrição:** Card individual de produto

**Funcionalidades:**
- Imagem com lazy loading
- Título truncado em 2 linhas
- Badge de desconto calculado automaticamente
- Rating com estrelas
- Preço formatado em BRL
- Botão de adicionar ao carrinho
- Estado "Adicionar Mais" se já estiver no carrinho
- Link para página de detalhes

**Componente:** `components/storefront/product/product-card.tsx`

**Props:**
```typescript
interface ProductCardProps {
  product: Product;
}
```

**Features Visuais:**
- Hover: scale 1.02 + shadow-lg
- Imagem: scale 1.05 no hover
- Transições suaves de 300ms

---

#### 3.1.4 Filtros Laterais (THEME-03)
**Descrição:** Sidebar com filtros de categorias e preço

**Funcionalidades:**
- Checkbox para cada categoria com contador
- Slider de faixa de preço (0 a 2000)
- Versão mobile em Sheet component
- Sincronização com URL (opcional)

**Componente:** `components/storefront/product/product-filters.tsx`

**Props:**
```typescript
interface ProductFiltersProps {
  categories: Category[];
  selectedCategories: number[];
  onToggleCategory: (categoryId: number) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
}
```

---

#### 3.1.5 Página de Produto (THEME-04)
**Descrição:** Página detalhada do produto

**Funcionalidades:**
- Galeria de imagens com thumbnails
- Troca de imagem principal ao clicar
- Breadcrumb de navegação
- Badges (Novo, Mais Vendido, Estoque baixo)
- Rating com estrelas preenchidas
- Preço original riscado (se houver desconto)
- Seletor de quantidade (+/-)
- Botão de favoritar (visual)
- Lista de características
- Tabs: Descrição, Especificações, Avaliações
- Produtos relacionados (mesma categoria)

**Componente:** `app/(store)/produto/[slug]/product-client.tsx`

**Estados:**
- `quantity`: number - Quantidade selecionada
- `selectedImage`: number - Índice da imagem ativa

---

#### 3.1.6 Footer (THEME-05)
**Descrição:** Footer com links e informações de contato

**Funcionalidades:**
- 4 colunas: Logo/Redes, Links rápidos, Contato, Horário
- Ícones sociais (Instagram, Facebook, WhatsApp)
- Endereço completo formatado
- Copyright com ano dinâmico

**Componente:** `components/storefront/layout/store-footer.tsx`

---

### 3.2 Carrinho (/carrinho)

#### 3.2.1 Drawer do Carrinho (CART-01)
**Descrição:** Slide-out drawer lateral do carrinho

**Funcionalidades:**
- Abre ao clicar no ícone do header
- Abre automaticamente ao adicionar item
- Fecha ao clicar fora ou no X
- Animação suave de slide
- Título com contador de itens

**Componente:** `components/storefront/cart/cart-drawer.tsx`

---

#### 3.2.2 Lista de Itens (CART-02)
**Descrição:** Lista de produtos no carrinho

**Funcionalidades:**
- Imagem do produto
- Nome truncado em 2 linhas
- SKU do produto
- Preço unitário
- Quantidade atual
- Botão de remover

**Layout:**
- Imagem à esquerda (80x80px)
- Info no centro
- Ações à direita

---

#### 3.2.3 Alterar Quantidade (CART-03)
**Descrição:** Controles de quantidade (+/-)

**Funcionalidades:**
- Botão - (diminui)
- Botão + (aumenta)
- Input central mostrando quantidade
- Não permite menos que 1
- Remove item se quantidade chegar a 0

---

#### 3.2.4 Remover Item (CART-04)
**Descrição:** Botão para remover item do carrinho

**Funcionalidades:**
- Ícone de lixeira (Trash2)
- Cor vermelha no hover
- Toast de confirmação
- Não requer confirmação modal (UX otimizada)

---

#### 3.2.5 Resumo do Carrinho (CART-05)
**Descrição:** Seção de totais

**Funcionalidades:**
- Subtotal (soma dos itens)
- Desconto (se aplicável)
- Frete: Grátis ou valor
- Mensagem: "Faltam R$ X para frete grátis"
- Total final

**Regra de Negócio:**
```typescript
FREE_SHIPPING_THRESHOLD = 299.90;
SHIPPING_COST = 15.90;
```

---

#### 3.2.6 Botão Checkout (CART-06)
**Descrição:** CTA principal para finalizar compra

**Funcionalidades:**
- Texto: "Finalizar Compra"
- Ícone de seta para direita
- Link para /checkout
- Fecha drawer ao clicar
- Size lg, largura total

---

#### 3.2.7 Empty State (CART-07)
**Descrição:** Estado vazio do carrinho

**Funcionalidades:**
- Ícone de carrinho grande
- Título: "Seu carrinho está vazio"
- Subtítulo: "Adicione produtos para começar"
- Botão: "Continuar Comprando"
- Layout centralizado

---

### 3.3 Checkout Visual (/checkout)

#### 3.3.1 Steps Indicador (CHECK-01)
**Descrição:** Indicador visual de progresso

**Steps:**
1. **Dados** - Informações pessoais
2. **Pagamento** - Escolha da forma
3. **Confirmação** - Pedido finalizado

**Funcionalidades:**
- Círculos numerados (1, 2, 3)
- Checkmark nos steps completados
- Linha conectora entre steps
- Labels e descrições
- Responsivo (descrições escondidas em mobile)

**Componente:** `components/storefront/checkout/checkout-steps.tsx`

---

#### 3.3.2 Form Dados Pessoais (CHECK-02)
**Descrição:** Formulário de dados do cliente

**Campos:**
- Nome completo * (text)
- E-mail * (email)
- Telefone/Celular * (text com máscara)

**Validações:**
- Nome: obrigatório, mínimo 3 caracteres
- Email: formato válido
- Telefone: máscara (11) 99999-9999

**Componente:** `components/storefront/checkout/checkout-form.tsx`

---

#### 3.3.3 Form Endereço (CHECK-03)
**Descrição:** Formulário de endereço com busca de CEP

**Campos:**
- CEP * (com máscara 00000-000)
- Rua *
- Número *
- Complemento
- Bairro *
- Cidade *
- Estado * (UF)

**Funcionalidades:**
- Busca automática ao digitar CEP válido
- Preenche campos automaticamente
- Loading state durante busca
- Mock de API para testes

**Mock:**
```typescript
// CEP 01001-000 retorna:
{
  street: 'Praça da Sé',
  neighborhood: 'Sé',
  city: 'São Paulo',
  state: 'SP'
}
```

**Componente:** `components/storefront/checkout/address-form.tsx`

---

#### 3.3.4 Seleção de Pagamento (CHECK-04)
**Descrição:** Seletor de métodos de pagamento

**Métodos:**
1. **Cartão de Crédito**
   - Ícone: CreditCard
   - Descrição: "Parcele em até 12x"
   - Select de parcelas
   
2. **Pix**
   - Ícone: QrCode
   - Descrição: "5% de desconto"
   - Valor com desconto destacado
   
3. **Boleto Bancário**
   - Ícone: Barcode
   - Descrição: "Vencimento em 3 dias úteis"

**Funcionalidades:**
- Radio group com cards
- Destaque visual do selecionado
- Cálculo de desconto automático
- Parcelamento dinâmico

**Componente:** `components/storefront/checkout/payment-selector.tsx`

---

#### 3.3.5 Resumo do Pedido (CHECK-05)
**Descrição:** Sidebar com resumo da compra

**Conteúdo:**
- Lista de itens (nome, quantidade, preço)
- Subtotal
- Frete
- Total destacado

**Funcionalidades:**
- Sticky positioning
- Atualiza em tempo real
- Botões de navegação (Voltar/Continuar)

---

#### 3.3.6 Tela de Sucesso (CHECK-06)
**Descrição:** Confirmação do pedido

**Conteúdo:**
- Ícone de sucesso (CheckCircle)
- Título: "Pedido Confirmado!"
- Mensagem personalizada com nome
- Número do pedido
- Total pago
- Endereço de entrega
- Forma de pagamento
- Botões: "Continuar Comprando", "Acompanhar Pedido"

**Componente:** `components/storefront/checkout/checkout-success.tsx`

---

### 3.4 Painel de Configuração (/admin/loja/config)

#### 3.4.1 Seleção de Tema (CONFIG-01)
**Descrição:** Escolha entre 3 templates

**Templates Disponíveis:**
1. **Moderno** - Design clean e minimalista
2. **Clássico** - Layout tradicional com sidebar
3. **Minimalista** - Máxima simplicidade

**Funcionalidades:**
- Cards com preview
- Lista de features
- Checkmark no selecionado
- Radio group visual

---

#### 3.4.2 Customizador de Cores (CONFIG-02)
**Descrição:** Picker de cores da marca

**Cores Configuráveis:**
- Cor Primária (botões, links)
- Cor Secundária (títulos)
- Cor de Destaque (promoções)
- Cor de Fundo
- Cor do Texto

**Funcionalidades:**
- Input type="color" nativo
- Campo de texto com hex
- Preview ao vivo
- Aplicação em elementos de exemplo

---

#### 3.4.3 Upload de Banner (CONFIG-03)
**Descrição:** Configuração de banner da loja

**Funcionalidades:**
- Upload de imagem (visual)
- Preview do banner
- Upload versão mobile
- Remover/alterar imagem

---

#### 3.4.4 Preview ao Vivo (CONFIG-04)
**Descrição:** Iframe mostrando a loja

**Funcionalidades:**
- Iframe com URL da loja
- Atualização em tempo real
- Modo desktop/mobile toggle
- Link "Ver Loja" em nova aba

---

#### 3.4.5 SEO Básico (CONFIG-05)
**Descrição:** Configurações de meta tags

**Campos:**
- Título da Página (até 60 caracteres)
- Descrição (até 160 caracteres)
- Imagem de compartilhamento

**Funcionalidades:**
- Contador de caracteres
- Preview de como aparece no Google
- Validações de limite

---

## 4. Design System

### 4.1 Cores UNIQ
```css
/* Tailwind Config */
uniq: {
  platinum: '#efefef',    /* Background principal */
  white: '#ffffff',       /* Cards */
  sidebar: '#1f2937',     /* Sidebar admin */
  primary: '#3e5653',     /* Cor principal */
  hover: '#1f2937',       /* Hover botões */
  accent: '#86cb92',      /* Destaques/sucesso */
  text: '#1f2937',        /* Texto principal */
  muted: '#627271',       /* Texto secundário */
  border: '#e5e7eb'       /* Bordas */
}
```

### 4.2 Tipografia
- **Fonte:** Poppins (Google Fonts)
- **Pesos:** 300, 400, 500, 600, 700

### 4.3 Componentes shadcn/ui Utilizados
- `Button` - Botões primários e secundários
- `Card` - Cards de produto e conteúdo
- `Input` - Campos de formulário
- `Sheet` - Menu mobile e drawer
- `Tabs` - Navegação em abas
- `Badge` - Tags e indicadores
- `Slider` - Filtro de preço
- `Checkbox` - Filtros de categoria
- `RadioGroup` - Seleção de tema/pagamento
- `Separator` - Divisores visuais
- `ScrollArea` - Scroll customizado
- `Select` - Dropdowns
- `Dialog` - Modais
- `Toast` - Notificações

### 4.4 Responsividade
**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Padrões:**
- Grid de produtos: 1 col (mobile), 2 cols (tablet), 3-4 cols (desktop)
- Filtros: Sheet em mobile, sidebar fixa em desktop
- Checkout: Coluna única em mobile, 2 cols em desktop

---

## 5. Dados Mock

### 5.1 StoreConfig
```typescript
const mockStoreConfig: StoreConfig = {
  id: 'store-001',
  name: 'Ótica Visão',
  slug: 'otica-visao',
  description: 'A melhor ótica da cidade...',
  logo: '/images/logo-otica.png',
  banner: '/images/banner-otica.jpg',
  phone: '(11) 99999-9999',
  whatsapp: '(11) 99999-9999',
  email: 'contato@oticavisao.com.br',
  address: { /* ... */ },
  social: { instagram, facebook, whatsapp },
  theme: {
    template: 'modern',
    primaryColor: '#3B82F6',
    secondaryColor: '#1F2937',
    accentColor: '#86CB92',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937'
  },
  seo: { title, description, image },
  settings: {
    currency: 'BRL',
    currencySymbol: 'R$',
    freeShippingThreshold: 299.90,
    shippingCost: 15.90,
    showStock: true,
    allowBackorder: false
  }
};
```

### 5.2 Products
```typescript
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Óculos de Sol Ray-Ban Aviador',
    slug: 'oculos-de-sol-ray-ban-aviador',
    price: 899.90,
    originalPrice: 1199.90,
    image: 'https://images.unsplash.com/...',
    images: ['url1', 'url2', 'url3'],
    category: 'Óculos de Sol',
    categoryId: 1,
    description: 'O clássico Aviador...',
    features: ['Proteção UV400', 'Lentes polarizadas'],
    stock: 5,
    sku: 'RB3025-001',
    rating: 4.8,
    reviewCount: 124,
    isNew: false,
    isBestseller: true,
    tags: ['polarizado', 'clássico']
  },
  // ... mais produtos
];
```

### 5.3 Categories
```typescript
const mockCategories: Category[] = [
  { id: 1, name: 'Óculos de Sol', slug: 'oculos-de-sol', count: 15 },
  { id: 2, name: 'Armações', slug: 'armacoes', count: 32 },
  { id: 3, name: 'Lentes', slug: 'lentes', count: 8 },
  { id: 4, name: 'Acessórios', slug: 'acessorios', count: 24 },
  { id: 5, name: 'Infantil', slug: 'infantil', count: 12 },
];
```

### 5.4 Payment Methods
```typescript
const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'credit_card',
    name: 'Cartão de Crédito',
    icon: 'credit-card',
    description: 'Parcele em até 12x',
    installments: [
      { times: 1, value: 1159.70 },
      { times: 2, value: 579.85 },
      // ... até 12x
    ]
  },
  {
    id: 'pix',
    name: 'Pix',
    icon: 'qr-code',
    description: '5% de desconto',
    discount: 5,
    finalValue: 1101.72
  },
  {
    id: 'boleto',
    name: 'Boleto Bancário',
    icon: 'barcode',
    description: 'Vencimento em 3 dias úteis'
  }
];
```

### 5.5 Theme Templates
```typescript
const mockThemeTemplates: ThemeTemplate[] = [
  {
    id: 'modern',
    name: 'Moderno',
    description: 'Design clean e minimalista',
    features: ['Grid responsivo', 'Cards grandes', 'Busca destacada']
  },
  {
    id: 'classic',
    name: 'Clássico',
    description: 'Layout tradicional de e-commerce',
    features: ['Sidebar fixa', 'Filtros visíveis']
  },
  {
    id: 'minimal',
    name: 'Minimalista',
    description: 'Máxima simplicidade',
    features: ['Espaçamento amplo', 'Tipografia destacada']
  }
];
```

---

## 6. Contexto do Carrinho

### 6.1 Interface
```typescript
interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  summary: CartSummary;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  isInCart: (productId: number) => boolean;
}
```

### 6.2 Regras de Negócio
- Frete grátis acima de R$ 299,90
- Custo de frete: R$ 15,90
- Toast ao adicionar/remover item
- Drawer abre automaticamente ao adicionar
- Carrinho persiste em memória (sessão)

---

## 7. Checklist de Aceitação

### 7.1 Tema da Loja Pública
- [ ] Header renderiza com logo, busca e carrinho
- [ ] Navegação por categorias funciona
- [ ] Grid de produtos responsivo (1/2/3/4 colunas)
- [ ] Cards com hover effects e badges
- [ ] Filtros laterais funcionam em desktop
- [ ] Filtros em Sheet funcionam em mobile
- [ ] Página de produto mostra galeria e detalhes
- [ ] Footer com informações completas

### 7.2 Carrinho
- [ ] Drawer abre ao clicar no ícone
- [ ] Drawer abre automaticamente ao adicionar item
- [ ] Lista de itens com imagem, nome, preço
- [ ] Quantidade pode ser alterada (+/-)
- [ ] Item pode ser removido
- [ ] Resumo calcula subtotal, frete e total
- [ ] Mensagem de frete grátis funciona
- [ ] Empty state exibido quando vazio
- [ ] Botão de checkout direciona para /checkout

### 7.3 Checkout
- [ ] Steps indicador mostra progresso
- [ ] Step 1: Form dados pessoais valida campos
- [ ] Step 1: Form endereço busca CEP
- [ ] Step 2: Seletor de pagamento funciona
- [ ] Step 2: Parcelamento exibido para cartão
- [ ] Step 2: Desconto calculado para Pix
- [ ] Resumo do pedido atualizado em tempo real
- [ ] Validação antes de avançar steps
- [ ] Step 3: Tela de sucesso exibe pedido
- [ ] Carrinho é limpo após confirmação

### 7.4 Configuração da Loja
- [ ] Seleção de tema entre 3 opções
- [ ] Customizador de cores atualiza preview
- [ ] Upload de banner (mock/visual)
- [ ] Preview ao vivo em iframe
- [ ] SEO: título e descrição configuráveis
- [ ] Salvamento simulado com toast

### 7.5 Responsividade
- [ ] Layout adaptado para mobile (1 coluna produtos)
- [ ] Menu mobile funciona (Sheet)
- [ ] Carrinho drawer em tela cheia em mobile
- [ ] Checkout em coluna única em mobile
- [ ] Filtros em Sheet em mobile

---

## 8. Fluxo de Navegação

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   /loja     │────▶│   Carrinho  │────▶│  /checkout  │
│  (Home)     │     │   (Drawer)  │     │             │
└─────────────┘     └─────────────┘     └──────┬──────┘
       │                                        │
       ▼                                        ▼
┌─────────────┐                          ┌─────────────┐
│  /produto/  │                          │   Sucesso   │
│   [slug]    │                          │             │
└─────────────┘                          └─────────────┘

┌─────────────────────────────────────────────────────┐
│              /dashboard/loja/configuracoes          │
│                     (Admin)                         │
└─────────────────────────────────────────────────────┘
```

---

## 9. Dependências do Design System

### 9.1 Componentes shadcn/ui (já instalados)
- ✅ button
- ✅ card
- ✅ input
- ✅ label
- ✅ sheet
- ✅ tabs
- ✅ badge
- ✅ slider
- ✅ checkbox
- ✅ radio-group
- ✅ separator
- ✅ scroll-area
- ✅ select
- ✅ dialog
- ✅ toast
- ✅ skeleton
- ✅ accordion
- ✅ tooltip
- ✅ popover
- ✅ dropdown-menu
- ✅ avatar
- ✅ switch
- ✅ table
- ✅ textarea
- ✅ form (react-hook-form integration)

### 9.2 Ícones Lucide
```typescript
import {
  Search, ShoppingCart, Menu, Phone,
  Trash2, Plus, Minus, ArrowRight,
  Check, CheckCircle, Star, ChevronLeft,
  Heart, Package, Clock, ChevronRight,
  CreditCard, QrCode, Barcode,
  Instagram, Facebook, Mail, MapPin,
  SlidersHorizontal, X, Eye, Save,
  Layout, Palette, Image as ImageIcon, Type
} from 'lucide-react';
```

---

## 10. Notas de Implementação

### 10.1 Convenções de Código
- **Componentes:** PascalCase (ProductCard)
- **Hooks:** camelCase com prefixo "use" (useCart)
- **Types/Interfaces:** PascalCase (CartItem)
- **Mocks:** camelCase com prefixo "mock" (mockProducts)
- **Classes CSS:** kebab-case (product-grid)

### 10.2 Performance
- Imagens: Usar componente Next.js Image
- Lazy loading em imagens abaixo da fold
- Memoização de cálculos (useMemo)
- Callbacks memorizados (useCallback)

### 10.3 Acessibilidade
- Aria labels em botões de ícone
- Focus visible em elementos interativos
- Contraste de cores adequado
- Keyboard navigation

### 10.4 SEO
- Meta tags dinâmicas por página
- Slugs descritivos para produtos
- Imagens com alt text
- Estrutura semântica de HTML

---

## 11. Arquivos Entregues

### 11.1 Componentes Criados
1. `components/storefront/layout/store-header.tsx`
2. `components/storefront/layout/store-footer.tsx`
3. `components/storefront/product/product-card.tsx`
4. `components/storefront/product/product-grid.tsx`
5. `components/storefront/product/product-filters.tsx`
6. `components/storefront/cart/cart-drawer.tsx`
7. `components/storefront/checkout/checkout-steps.tsx`
8. `components/storefront/checkout/checkout-form.tsx`
9. `components/storefront/checkout/address-form.tsx`
10. `components/storefront/checkout/payment-selector.tsx`
11. `components/storefront/checkout/checkout-success.tsx`

### 11.2 Páginas Criadas
1. `app/(store)/layout.tsx`
2. `app/(store)/page.tsx`
3. `app/(store)/produto/[slug]/page.tsx`
4. `app/(store)/produto/[slug]/product-client.tsx`
5. `app/(store)/checkout/page.tsx`
6. `app/dashboard/loja/configuracoes/page.tsx`

### 11.3 Context e Types
1. `contexts/cart-context.tsx`
2. `types/storefront.ts`
3. `types/cart.ts`
4. `types/checkout.ts`
5. `lib/mocks/storefront.ts`
6. `lib/utils/formatters.ts`

---

## 12. Referências

### 12.1 Documentação do ROADMAP
- Seção: "Sprint 05: Storefront UI" (linhas 457-547)
- Mock Data disponível em `docs/ROADMAP.md`

### 12.2 Mock Data Completo
```typescript
const mockStorefront = {
  storeConfig: { /* ... */ },
  products: [ /* 6 produtos */ ],
  categories: [ /* 5 categorias */ ],
  cart: { /* itens e resumo */ }
};
```

---

**Data de Criação:** 21/03/2026  
**Responsável:** Vibe Researcher  
**Status:** ✅ Documentação Completa

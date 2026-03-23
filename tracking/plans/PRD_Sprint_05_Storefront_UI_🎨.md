# 📋 PRD - Sprint 05: Storefront UI 🎨

---

## 1. Visão Geral da Sprint

### 1.1 Contexto do Projeto
O **UNIQ Empresas** é uma plataforma SaaS modular que combina Consultoria de Growth + Ferramentas de Gestão + Métricas para pequenos e médios empreendedores. O sistema segue a abordagem **Frontend First** (Interface primeiro, Backend depois), permitindo validação rápida com stakeholders antes de investir em backend.

### 1.2 Objetivo Desta Sprint
A **SPRINT_05** tem como objetivo desenvolver a **interface completa da loja virtual pública**, incluindo:
- Tema customizável da loja (header, grid de produtos, filtros, footer)
- Carrinho de compras com slide-out drawer
- Fluxo de checkout visual (steps, formulários, pagamento)
- Painel de configuração da loja (temas, cores, banner, SEO)
- Preview ao vivo das alterações

### 1.3 Escopo da Sprint

**✅ Incluído nesta Sprint:**
- Interface da loja pública com tema customizado
- Header da loja (logo, busca, carrinho)
- Grid de produtos responsivo com cards
- Filtros laterais (categorias, preço, etc.)
- Página de produto (galeria, descrição, CTA)
- Footer com links e informações
- Carrinho slide-out drawer
- Gerenciamento de itens no carrinho (add, remove, quantidade)
- Checkout com steps visuais (Dados → Pagamento → Confirmação)
- Formulários de dados pessoais e endereço
- Seleção visual de métodos de pagamento
- Tela de sucesso do pedido
- Painel de configuração da loja
- Seleção de templates de tema (3 opções)
- Customizador de cores da marca
- Upload e preview de banner
- Preview ao vivo da loja (iframe)
- Configurações básicas de SEO
- Mock data completo para testes visuais

**❌ NÃO Incluído nesta Sprint:**
- Integração com backend real (API)
- Persistência de dados no banco
- Processamento real de pagamentos
- Cálculo real de frete
- Integração com gateways de pagamento
- Sistema de estoque real
- Autenticação de clientes na loja

### 1.4 Stack Tecnológica

| Camada | Tecnologia | Versão | Uso |
|--------|------------|--------|-----|
| Framework | Next.js | 14.2.5 | App Router, Server Components |
| Linguagem | TypeScript | 5.4.5 | Tipagem estática |
| UI Library | React | 18.3.1 | Componentes funcionais |
| Estilização | Tailwind CSS | 3.4.4 | Utility-first CSS |
| Componentes | shadcn/ui | v4.0.5 | Design System base |
| Animações | Framer Motion | - | Transições suaves |
| Ícones | Lucide React | 0.400.0 | Ícones consistentes |

---

## 2. Análise do Codebase Existente

### 2.1 Componentes do Design System Disponíveis

#### ✅ Componentes Já Implementados (Sprints Anteriores)

| Componente | Arquivo | Status | Uso na Loja |
|------------|---------|--------|-------------|
| **Button** | `components/ui/button.tsx` | ✅ Funcional | CTAs, ações do carrinho |
| **Card** | `components/ui/card.tsx` | ✅ Funcional | Cards de produto |
| **Badge** | `components/ui/badge.tsx` | ✅ Funcional | Tags, status de estoque |
| **Avatar** | `components/ui/avatar.tsx` | ✅ Funcional | Perfil do cliente |
| **Dialog** | `components/ui/dialog.tsx` | ✅ Funcional | Modais de confirmação |
| **Sheet** | Não existe | 🔴 Necessário | Slide-out do carrinho |
| **Input** | `components/ui/input.tsx` | ✅ Funcional | Formulários de checkout |
| **Select** | `components/ui/select.tsx` | ✅ Funcional | Seleção de pagamento |
| **Tabs** | `components/ui/tabs.tsx` | ✅ Funcional | Navegação interna |
| **Skeleton** | `components/ui/skeleton.tsx` | ✅ Funcional | Loading states |
| **Toast** | `components/ui/toast.tsx` | ✅ Funcional | Notificações |
| **Textarea** | `components/ui/textarea.tsx` | ✅ Funcional | Notas do pedido |
| **Checkbox** | `components/ui/checkbox.tsx` | ✅ Funcional | Filtros, aceite de termos |
| **Switch** | `components/ui/switch.tsx` | ✅ Funcional | Toggle de opções |
| **Tooltip** | `components/ui/tooltip.tsx` | ✅ Funcional | Dicas contextuais |
| **Separator** | `components/ui/separator.tsx` | ✅ Funcional | Divisores visuais |
| **Stepper** | Não existe | 🔴 Necessário | Steps do checkout |

### 2.2 Design Tokens Configurados

**Arquivo:** `tailwind.config.ts` (cores UNIQ)

| Token | Valor | Uso na Loja |
|-------|-------|-------------|
| `uniq.primary` | `#3e5653` | Botões primários, header |
| `uniq.accent` | `#86cb92` | Destaques, badges de promoção |
| `uniq.text` | `#1f2937` | Texto principal |
| `uniq.muted` | `#627271` | Texto secundário, preços antigos |
| `uniq.border` | `#e5e7eb` | Bordas, divisores |
| `uniq.platinum` | `#efefef` | Backgrounds |
| `destructive` | `#dc2626` | Erros, botão remover do carrinho |
| `success` | `#22c55e` | Sucesso, pedido confirmado |
| `warning` | `#f59e0b` | Alertas de estoque baixo |
| `info` | `#3b82f6` | Informações |

### 2.3 Dependências a Instalar

```bash
# Animações para o carrinho e checkout
npm install framer-motion

# Componente Sheet (Slide-out drawer) do shadcn
npx shadcn add sheet

# Componente Stepper (Steps do checkout)
npx shadcn add stepper
# OU criar custom stepper

# Componente Slider (Filtro de preço)
npx shadcn add slider

# Componente Accordion (Filtros colapsáveis)
npx shadcn add accordion
```

---

## 3. Estrutura de Telas/Componentes

### 3.1 Arquitetura de Páginas

```
📁 app/
├── 📁 (store)/                    # Grupo de rotas da loja pública
│   ├── 📁 layout.tsx              # Layout da loja (sem sidebar do admin)
│   ├── 📁 page.tsx                # Página inicial da loja (grid de produtos)
│   ├── 📁 produto/
│   │   └── 📁 [slug]/
│   │       └── page.tsx           # Página de detalhe do produto
│   └── 📁 checkout/
│       └── page.tsx               # Checkout completo
├── 📁 (dashboard)/                # Grupo de rotas do admin
│   ├── 📁 layout.tsx              # Layout com sidebar
│   └── 📁 dashboard/
│       └── 📁 loja/
│           └── 📁 configuracoes/
│               └── page.tsx       # Painel de configuração da loja
```

### 3.2 Componentes Específicos da Loja

```
📁 components/
├── 📁 storefront/
│   ├── 📁 layout/
│   │   ├── store-header.tsx       # Header da loja
│   │   ├── store-footer.tsx       # Footer da loja
│   │   └── store-layout.tsx       # Wrapper da loja
│   ├── 📁 product/
│   │   ├── product-card.tsx       # Card de produto no grid
│   │   ├── product-grid.tsx       # Grid de produtos
│   │   ├── product-gallery.tsx    # Galeria de imagens do produto
│   │   ├── product-info.tsx       # Info do produto (nome, preço, desc)
│   │   ├── product-filters.tsx    # Filtros laterais
│   │   └── category-filter.tsx    # Filtro de categorias
│   ├── 📁 cart/
│   │   ├── cart-drawer.tsx        # Slide-out do carrinho
│   │   ├── cart-item.tsx          # Item do carrinho
│   │   ├── cart-summary.tsx       # Resumo do carrinho
│   │   ├── cart-empty.tsx         # Estado vazio
│   │   └── quantity-selector.tsx  # Seletor de quantidade
│   └── 📁 checkout/
│       ├── checkout-steps.tsx     # Steps do checkout
│       ├── checkout-form.tsx      # Formulário de dados
│       ├── address-form.tsx       # Formulário de endereço
│       ├── payment-selector.tsx   # Seleção de pagamento
│       ├── order-summary.tsx      # Resumo do pedido
│       └── checkout-success.tsx   # Tela de sucesso
├── 📁 store-config/
│   ├── theme-selector.tsx         # Seleção de templates
│   ├── color-picker.tsx           # Customizador de cores
│   ├── banner-upload.tsx          # Upload de banner
│   ├── store-preview.tsx          # Preview ao vivo (iframe)
│   └── seo-settings.tsx           # Configurações de SEO
```

---

## 4. Mock Data Completo

### 4.1 Dados da Loja

**Arquivo:** `lib/mocks/storefront.ts`

```typescript
// Configuração da loja
export const mockStoreConfig = {
  id: 'store-001',
  name: 'Ótica Visão',
  slug: 'otica-visao',
  description: 'A melhor ótica da cidade. Óculos de sol, armações e lentes de qualidade.',
  logo: '/images/logo-otica.png',
  favicon: '/images/favicon.ico',
  banner: '/images/banner-otica.jpg',
  bannerMobile: '/images/banner-otica-mobile.jpg',
  phone: '(11) 99999-9999',
  whatsapp: '(11) 99999-9999',
  email: 'contato@oticavisao.com.br',
  address: {
    street: 'Rua das Flores',
    number: '123',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01001-000'
  },
  social: {
    instagram: '@oticavisao',
    facebook: '/oticavisao',
    whatsapp: '5511999999999'
  },
  theme: {
    template: 'modern', // 'modern', 'classic', 'minimal'
    primaryColor: '#3B82F6',
    secondaryColor: '#1F2937',
    accentColor: '#86CB92',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937'
  },
  seo: {
    title: 'Ótica Visão - Óculos de Sol e Armações',
    description: 'Encontre os melhores óculos de sol e armações na Ótica Visão. Qualidade e preço justo.',
    image: '/images/seo-image.jpg'
  },
  settings: {
    currency: 'BRL',
    currencySymbol: 'R$',
    freeShippingThreshold: 299.90,
    shippingCost: 15.90,
    showStock: true,
    allowBackorder: false
  }
};

// Categorias de produtos
export const mockCategories = [
  { id: 1, name: 'Óculos de Sol', slug: 'oculos-de-sol', count: 15, image: '/images/cat-oculos-sol.jpg' },
  { id: 2, name: 'Armações', slug: 'armacoes', count: 32, image: '/images/cat-armacoes.jpg' },
  { id: 3, name: 'Lentes', slug: 'lentes', count: 8, image: '/images/cat-lentes.jpg' },
  { id: 4, name: 'Acessórios', slug: 'acessorios', count: 24, image: '/images/cat-acessorios.jpg' },
  { id: 5, name: 'Infantil', slug: 'infantil', count: 12, image: '/images/cat-infantil.jpg' },
];

// Produtos
export const mockProducts = [
  {
    id: 1,
    name: 'Óculos de Sol Ray-Ban Aviador',
    slug: 'oculos-de-sol-ray-ban-aviador',
    price: 899.90,
    originalPrice: 1199.90,
    image: '/images/oculos1.jpg',
    images: [
      '/images/oculos1.jpg',
      '/images/oculos1-2.jpg',
      '/images/oculos1-3.jpg'
    ],
    category: 'Óculos de Sol',
    categoryId: 1,
    description: 'O clássico Aviador da Ray-Ban com proteção UV400 e lentes polarizadas. Design atemporal que nunca sai de moda.',
    features: [
      'Proteção UV400',
      'Lentes polarizadas',
      'Armação de metal',
      'Estojo incluso'
    ],
    stock: 5,
    sku: 'RB3025-001',
    rating: 4.8,
    reviewCount: 124,
    isNew: false,
    isBestseller: true,
    tags: ['polarizado', 'clássico', 'unissex']
  },
  {
    id: 2,
    name: 'Armação Titanium Ultra Leve',
    price: 459.90,
    image: '/images/oculos2.jpg',
    images: ['/images/oculos2.jpg'],
    category: 'Armações',
    categoryId: 2,
    description: 'Armação em titânio de alta resistência e peso mínimo. Ideal para uso prolongado.',
    features: [
      'Titânio hipoalergênico',
      'Peso: apenas 8g',
      'Resistente à corrosão',
      'Garantia de 2 anos'
    ],
    stock: 12,
    sku: 'TIT-2024-001',
    rating: 4.5,
    reviewCount: 67,
    isNew: true,
    isBestseller: false,
    tags: ['leve', 'titânio', 'durável']
  },
  {
    id: 3,
    name: 'Óculos de Sol Oakley Holbrook',
    price: 749.90,
    originalPrice: 899.90,
    image: '/images/oculos3.jpg',
    images: ['/images/oculos3.jpg', '/images/oculos3-2.jpg'],
    category: 'Óculos de Sol',
    categoryId: 1,
    description: 'Design esportivo com tecnologia Prizm que melhora contraste e visibilidade.',
    features: [
      'Tecnologia Prizm',
      'Resistente a impactos',
      'Ideal para esportes',
      'Proteção UV400'
    ],
    stock: 8,
    sku: 'OO9102-D6',
    rating: 4.9,
    reviewCount: 203,
    isNew: false,
    isBestseller: true,
    tags: ['esportivo', 'prizm', ' masculino']
  },
  {
    id: 4,
    name: 'Lentes de Contato Acuvue Oasys',
    price: 129.90,
    image: '/images/lentes1.jpg',
    category: 'Lentes',
    categoryId: 3,
    description: 'Lentes de contato mensais com tecnologia Hydraclear Plus para máximo conforto.',
    features: [
      'Tecnologia Hydraclear Plus',
      'Proteção UV',
      'Caixa com 6 unidades',
      'Uso mensal'
    ],
    stock: 25,
    sku: 'ACV-OAS-6',
    rating: 4.7,
    reviewCount: 89,
    isNew: false,
    isBestseller: true,
    tags: ['contato', 'mensal', 'conforto']
  },
  {
    id: 5,
    name: 'Armação Vintage Redonda',
    price: 299.90,
    image: '/images/oculos4.jpg',
    category: 'Armações',
    categoryId: 2,
    description: 'Estilo retrô com armação redonda em acetato. Perfeito para quem busca um look diferenciado.',
    features: [
      'Acetato de alta qualidade',
      'Design vintage',
      'Dobradiças reforçadas',
      'Várias cores disponíveis'
    ],
    stock: 0,
    sku: 'VNT-001',
    rating: 4.3,
    reviewCount: 45,
    isNew: true,
    isBestseller: false,
    tags: ['vintage', 'feminino', 'retrô']
  },
  {
    id: 6,
    name: 'Óculos de Sol Polaroid Infantil',
    price: 159.90,
    image: '/images/oculos5.jpg',
    category: 'Infantil',
    categoryId: 5,
    description: 'Óculos de sol infantil com proteção UV400 e armação flexível e resistente.',
    features: [
      'Proteção UV400',
      'Armação flexível',
      'Resistente a quebras',
      'Cordão incluso'
    ],
    stock: 18,
    sku: 'PLD-K001',
    rating: 4.6,
    reviewCount: 34,
    isNew: true,
    isBestseller: false,
    tags: ['infantil', 'flexível', 'seguro']
  }
];

// Carrinho
export const mockCart = {
  items: [
    {
      productId: 1,
      name: 'Óculos de Sol Ray-Ban Aviador',
      price: 899.90,
      originalPrice: 1199.90,
      image: '/images/oculos1.jpg',
      quantity: 1,
      sku: 'RB3025-001'
    },
    {
      productId: 4,
      name: 'Lentes de Contato Acuvue Oasys',
      price: 129.90,
      image: '/images/lentes1.jpg',
      quantity: 2,
      sku: 'ACV-OAS-6'
    }
  ],
  summary: {
    subtotal: 1159.70,
    discount: 0,
    shipping: 0, // Grátis acima de R$ 299,90
    total: 1159.70,
    itemCount: 3
  }
};

// Templates de tema disponíveis
export const mockThemeTemplates = [
  {
    id: 'modern',
    name: 'Moderno',
    description: 'Design clean e minimalista com foco nos produtos',
    preview: '/themes/modern-preview.jpg',
    features: ['Grid responsivo', 'Cards grandes', 'Busca destacada']
  },
  {
    id: 'classic',
    name: 'Clássico',
    description: 'Layout tradicional de e-commerce com sidebar de filtros',
    preview: '/themes/classic-preview.jpg',
    features: ['Sidebar fixa', 'Filtros visíveis', 'Lista de categorias']
  },
  {
    id: 'minimal',
    name: 'Minimalista',
    description: 'Máxima simplicidade com tipografia elegante',
    preview: '/themes/minimal-preview.jpg',
    features: ['Espaçamento amplo', 'Tipografia destacada', 'Sem distrações']
  }
];

// Métodos de pagamento
export const mockPaymentMethods = [
  {
    id: 'credit_card',
    name: 'Cartão de Crédito',
    icon: 'credit-card',
    description: 'Parcele em até 12x',
    installments: [
      { times: 1, value: 1159.70 },
      { times: 2, value: 579.85 },
      { times: 3, value: 386.57 },
      { times: 6, value: 193.28 },
      { times: 12, value: 96.64 }
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
    description: 'Vencimento em 3 dias úteis',
    discount: 0
  }
];

// Pedido de exemplo
export const mockOrder = {
  id: 'ORD-2024-001',
  status: 'completed',
  createdAt: '2024-03-20T14:30:00Z',
  customer: {
    name: 'Maria Silva',
    email: 'maria@email.com',
    phone: '(11) 99999-9999'
  },
  shipping: {
    address: {
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apto 45',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01001-000'
    },
    method: 'Standard',
    cost: 0,
    estimatedDelivery: '23/03/2024'
  },
  payment: {
    method: 'pix',
    status: 'paid',
    paidAt: '2024-03-20T14:35:00Z'
  },
  items: mockCart.items,
  summary: {
    subtotal: 1159.70,
    discount: 57.99,
    shipping: 0,
    total: 1101.72
  }
};
```

---

## 5. User Stories Detalhadas

### 5.1 Tema da Loja Pública

#### THEME-01: Header da Loja
**Como visitante, quero ver um header com logo, busca e carrinho, para navegar facilmente pela loja.**

**Critérios de Aceitação:**
- [ ] Logo da loja alinhado à esquerda
- [ ] Campo de busca central (com ícone de lupa)
- [ ] Ícone de carrinho com badge de quantidade
- [ ] Menu de categorias (desktop)
- [ ] Menu hamburger (mobile)
- [ ] Header fixo ao rolar a página
- [ ] Transição suave de background ao scroll

**Estados:**
- Default: Background transparente/branco
- Scrolled: Background com sombra sutil
- Carrinho vazio: Badge escondido ou "0"

#### THEME-02: Grid de Produtos
**Como visitante, quero ver os produtos em um grid organizado, para visualizar o catálogo facilmente.**

**Critérios de Aceitação:**
- [ ] Grid responsivo: 1 coluna (mobile) → 2 colunas (tablet) → 3-4 colunas (desktop)
- [ ] Cards com imagem, nome, preço e botão "Adicionar"
- [ ] Badge de "Novo", "Promoção" ou "Esgotado"
- [ ] Preço tachado para produtos em promoção
- [ ] Lazy loading das imagens
- [ ] Skeleton loading enquanto carrega

**Estados:**
- Loading: Skeleton cards (6 cards)
- Empty: "Nenhum produto encontrado" com ilustração
- Error: Toast de erro

#### THEME-03: Filtros Laterais
**Como visitante, quero filtrar produtos por categoria e preço, para encontrar o que procuro.**

**Critérios de Aceitação:**
- [ ] Sidebar com filtros (desktop)
- [ ] Filtro colapsável (mobile - drawer)
- [ ] Lista de categorias com checkbox
- [ ] Slider de faixa de preço
- [ ] Contador de resultados
- [ ] Botão "Limpar filtros"
- [ ] Filtros aplicados como chips removíveis

#### THEME-04: Página de Produto
**Como visitante, quero ver detalhes completos de um produto, para decidir a compra.**

**Critérios de Aceitação:**
- [ ] Galeria de imagens com zoom
- [ ] Nome do produto em destaque
- [ ] Preço atual e preço original (se houver desconto)
- [ ] Badge de desconto (%)
- [ ] Descrição detalhada
- [ ] Lista de características
- [ ] Seletor de quantidade
- [ ] Botão "Adicionar ao Carrinho" grande
- [ ] Indicador de estoque
- [ ] Avaliações (stars + count)
- [ ] Produtos relacionados no footer

#### THEME-05: Footer
**Como visitante, quero ver links e informações de contato no footer, para confiar na loja.**

**Critérios de Aceitação:**
- [ ] Links rápidos (Categorias, Sobre, Contato)
- [ ] Informações de contato (telefone, email, endereço)
- [ ] Links para redes sociais
- [ ] Formas de pagamento aceitas (ícones)
- [ ] Selos de segurança
- [ ] Copyright e direitos reservados

### 5.2 Carrinho

#### CART-01: Slide-out Drawer
**Como visitante, quero abrir o carrinho em um drawer lateral, para revisar meus itens sem sair da página.**

**Critérios de Aceitação:**
- [ ] Abre ao clicar no ícone do carrinho
- [ ] Overlay escurecido ao fundo
- [ ] Animação de slide da direita
- [ ] Fecha ao clicar no overlay ou no X
- [ ] Header com título "Meu Carrinho" e quantidade
- [ ] Scroll interno para muitos itens

#### CART-02: Lista de Itens
**Como visitante, quero ver todos os itens no carrinho com imagem, nome e preço, para revisar minha compra.**

**Critérios de Aceitação:**
- [ ] Imagem pequena do produto
- [ ] Nome do produto (truncado se longo)
- [ ] Preço unitário
- [ ] Quantidade atual
- [ ] Preço total do item
- [ ] Lista scrollável

#### CART-03: Alterar Quantidade
**Como visitante, quero alterar a quantidade de um item, para comprar mais ou menos unidades.**

**Critérios de Aceitação:**
- [ ] Botões +/- para incrementar/decrementar
- [ ] Input numérico editável
- [ ] Mínimo: 1
- [ ] Máximo: estoque disponível
- [ ] Atualização em tempo real do subtotal
- [ ] Validação de estoque

#### CART-04: Remover Item
**Como visitante, quero remover um item do carrinho, para desistir de uma compra.**

**Critérios de Aceitação:**
- [ ] Botão de remover (ícone X ou lixeira)
- [ ] Confirmação opcional (pode ser undo)
- [ ] Animação de saída suave
- [ ] Toast "Item removido" com opção "Desfazer"

#### CART-05: Resumo do Carrinho
**Como visitante, quero ver o resumo dos valores, para saber o total da compra.**

**Critérios de Aceitação:**
- [ ] Subtotal (soma dos itens)
- [ ] Frete (gratuito ou valor)
- [ ] Descontos (se houver)
- [ ] Total final
- [ ] Mensagem de frete grátis (se aplicável)
- [ ] "Faltam R$ X para frete grátis" (se aplicável)

#### CART-06: Botão Checkout
**Como visitante, quero um botão claro para finalizar a compra, para prosseguir para o pagamento.**

**Critérios de Aceitação:**
- [ ] Botão grande "Finalizar Compra"
- [ ] Destaque visual (cor primária)
- [ ] Desabilitado se carrinho vazio
- [ ] Link para página de checkout
- [ ] Ícone de seta indicando progressão

#### CART-07: Empty State
**Como visitante, quero ver uma mensagem amigável quando o carrinho está vazio, para entender que preciso adicionar itens.**

**Critérios de Aceitação:**
- [ ] Ilustração/ícone de carrinho vazio
- [ ] Mensagem "Seu carrinho está vazio"
- [ ] Submensagem "Adicione produtos para começar"
- [ ] CTA "Continuar Comprando" (link para loja)

### 5.3 Checkout

#### CHECK-01: Steps Indicador
**Como visitante, quero ver em qual etapa do checkout estou, para saber o progresso da compra.**

**Critérios de Aceitação:**
- [ ] 3 steps: Dados → Pagamento → Confirmação
- [ ] Step atual destacado
- [ ] Steps anteriores com checkmark
- [ ] Steps futuros desabilitados
- [ ] Navegação por clique em steps anteriores
- [ ] Animação de transição entre steps

#### CHECK-02: Form Dados Pessoais
**Como visitante, quero informar meus dados pessoais, para identificação do pedido.**

**Critérios de Aceitação:**
- [ ] Campo Nome completo*
- [ ] Campo Email*
- [ ] Campo Telefone/Celular*
- [ ] Validação em tempo real
- [ ] Máscara de telefone
- [ ] Botão "Continuar" (próximo step)

#### CHECK-03: Form Endereço
**Como visitante, quero informar meu endereço de entrega, para receber o pedido.**

**Critérios de Aceitação:**
- [ ] Campo CEP com máscara*
- [ ] Busca automática de endereço por CEP
- [ ] Campos: Rua*, Número*, Complemento, Bairro*, Cidade*, Estado*
- [ ] Validação de campos obrigatórios
- [ ] Preview do endereço completo
- [ ] Botão "Continuar"

#### CHECK-04: Seleção Pagamento
**Como visitante, quero escolher a forma de pagamento, para definir como vou pagar.**

**Critérios de Aceitação:**
- [ ] 3 opções visuais: Cartão, Pix, Boleto
- [ ] Cards clicáveis com seleção visual
- [ ] Para Cartão: opções de parcelamento
- [ ] Para Pix: mostrar desconto aplicado
- [ ] Para Boleto: informar prazo
- [ ] Resumo do pedido lateral
- [ ] Botão "Finalizar Pedido"

#### CHECK-05: Resumo do Pedido
**Como visitante, quero ver o resumo da compra durante o checkout, para confirmar antes de pagar.**

**Critérios de Aceitação:**
- [ ] Lista de itens (imagem, nome, quantidade, preço)
- [ ] Subtotal
- [ ] Frete
- [ ] Descontos
- [ ] Total final destacado
- [ ] Card fixo ou sticky

#### CHECK-06: Tela de Sucesso
**Como visitante, quero ver uma confirmação após finalizar a compra, para saber que deu tudo certo.**

**Critérios de Aceitação:**
- [ ] Ilustração de sucesso (checkmark, confete)
- [ ] Mensagem "Pedido confirmado!"
- [ ] Número do pedido destacado
- [ ] Resumo do pedido
- [ ] Informações de pagamento (código Pix, link do boleto, etc.)
- [ ] Prazo de entrega estimado
- [ ] Botão "Voltar para a Loja"
- [ ] Botão "Acompanhar Pedido" (opcional)

### 5.4 Painel de Configuração da Loja

#### CONFIG-01: Seleção de Tema
**Como lojista, quero escolher entre templates de tema, para personalizar a aparência da loja.**

**Critérios de Aceitação:**
- [ ] 3 templates disponíveis (Moderno, Clássico, Minimalista)
- [ ] Cards de preview de cada template
- [ ] Indicador de template selecionado
- [ ] Descrição e features de cada um
- [ ] Aplicação imediata no preview

#### CONFIG-02: Customizador de Cores
**Como lojista, quero definir as cores da marca, para alinhar a loja com minha identidade visual.**

**Critérios de Aceitação:**
- [ ] Color picker para cor primária
- [ ] Color picker para cor secundária
- [ ] Color picker para cor de destaque
- [ ] Preview em tempo real das cores
- [ ] Sugestão de cores complementares
- [ ] Botão "Restaurar padrão"

#### CONFIG-03: Banner Config
**Como lojista, quero fazer upload do banner da loja, para promover campanhas na home.**

**Critérios de Aceitação:**
- [ ] Área de upload (drag & drop ou click)
- [ ] Preview do banner atual
- [ ] Validação de formato (jpg, png, webp)
- [ ] Validação de tamanho máximo
- [ ] Versão desktop e mobile
- [ ] Botão "Remover banner"

#### CONFIG-04: Preview ao Vivo
**Como lojista, quero ver uma preview da loja enquanto configuro, para validar as alterações.**

**Critérios de Aceitação:**
- [ ] Iframe mostrando a loja
- [ ] Atualização em tempo real das mudanças
- [ ] Toggle entre desktop/mobile
- [ ] Resoluções: 1920px, 768px, 375px
- [ ] URL de preview (localhost/preview)

#### CONFIG-05: SEO Básico
**Como lojista, quero configurar título, descrição e imagem para SEO, para melhorar meu posicionamento.**

**Critérios de Aceitação:**
- [ ] Campo Título da página (meta title)
- [ ] Campo Descrição (meta description)
- [ ] Upload de imagem OG (Open Graph)
- [ ] Preview de como aparece no Google
- [ ] Preview de como aparece nas redes sociais
- [ ] Contador de caracteres

---

## 6. Especificações Visuais

### 6.1 Design System Aplicado

#### Cores

| Uso | Token | Valor | Notas |
|-----|-------|-------|-------|
| **Cor da marca** | Primary | `#3B82F6` (configurável) | Botões, links |
| **Cor secundária** | Secondary | `#1F2937` | Textos, títulos |
| **Cor de destaque** | Accent | `#86CB92` | Promoções, badges |
| **Background** | Background | `#FFFFFF` | Fundo principal |
| **Surface** | Card | `#FFFFFF` | Cards, drawers |
| **Texto principal** | Text | `#1F2937` | Títulos, body |
| **Texto secundário** | Muted | `#627271` | Descrições |
| **Bordas** | Border | `#E5E7EB` | Divisores |
| **Sucesso** | Success | `#22C55E` | Confirmações |
| **Erro** | Destructive | `#DC2626` | Erros, remoção |

#### Tipografia

| Elemento | Fonte | Tamanho | Peso | Uso |
|----------|-------|---------|------|-----|
| **H1 Loja** | Poppins | 2.5rem (40px) | 700 | Nome da loja |
| **H2 Seção** | Poppins | 1.875rem (30px) | 600 | Títulos de seção |
| **H3 Produto** | Poppins | 1.25rem (20px) | 600 | Nome do produto |
| **H4 Card** | Poppins | 1.125rem (18px) | 500 | Subtítulos |
| **Body** | Poppins | 1rem (16px) | 400 | Texto geral |
| **Small** | Poppins | 0.875rem (14px) | 400 | Descrições, metas |
| **Caption** | Poppins | 0.75rem (12px) | 400 | Labels, tags |
| **Preço** | Poppins | 1.5rem (24px) | 700 | Preços |
| **Preço antigo** | Poppins | 1rem (16px) | 400 | strike-through |

#### Espaçamento

| Token | Valor | Uso |
|-------|-------|-----|
| `space-1` | 4px | Microespaçamentos |
| `space-2` | 8px | Ícones, badges |
| `space-3` | 12px | Padding interno |
| `space-4` | 16px | Cards, seções |
| `space-6` | 24px | Containers |
| `space-8` | 32px | Seções grandes |
| `space-12` | 48px | Layout major |
| `space-16` | 64px | Hero sections |

#### Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `none` | 0px | Inputs |
| `sm` | 4px | Badges, tags |
| `md` | 8px | Buttons |
| `lg` | 12px | Cards |
| `xl` | 16px | Modais |
| `2xl` | 24px | Drawers |
| `full` | 9999px | Avatar, chips |

### 6.2 Componentes Reutilizáveis

#### ProductCard
```typescript
interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  badge?: 'new' | 'sale' | 'bestseller' | 'out-of-stock';
  rating?: number;
  reviewCount?: number;
  onAddToCart: () => void;
  onClick: () => void;
}
```

#### QuantitySelector
```typescript
interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
}
```

#### CartItem
```typescript
interface CartItemProps {
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}
```

#### CheckoutStepper
```typescript
interface CheckoutStepperProps {
  steps: Array<{
    id: string;
    label: string;
    description?: string;
  }>;
  currentStep: number;
  onStepClick?: (step: number) => void;
}
```

---

## 7. Interações e Estados

### 7.1 Estados de Loading

| Componente | Estado | Implementação |
|------------|--------|---------------|
| **Grid de produtos** | Skeleton | 6 cards com pulse animation |
| **Página de produto** | Skeleton | Imagem + texto placeholder |
| **Carrinho** | Spinner | Ícone de loading no botão |
| **Checkout** | Spinner | Loading overlay no formulário |
| **Preview** | Spinner | Loading no iframe |

### 7.2 Estados de Erro

| Cenário | Mensagem | Ação |
|---------|----------|------|
| Produto esgotado | "Produto indisponível" | Botão desabilitado |
| CEP inválido | "CEP não encontrado" | Campo em vermelho |
| Estoque insuficiente | "Apenas X unidades disponíveis" | Limitar quantidade |
| Pagamento recusado | "Não foi possível processar" | Tentar novamente |

### 7.3 Transições e Animações

| Elemento | Transição | Duração | Easing |
|----------|-----------|---------|--------|
| **Carrinho drawer** | Slide right | 300ms | ease-out |
| **Overlay** | Fade in | 200ms | ease |
| **Cards** | Hover scale | 200ms | ease |
| **Toast** | Slide up + fade | 300ms | ease-out |
| **Page transitions** | Fade | 200ms | ease |
| **Accordion** | Height | 300ms | ease-in-out |

### 7.4 Hover/Focus Effects

| Elemento | Hover | Focus |
|----------|-------|-------|
| **ProductCard** | Shadow-lg, scale-[1.02] | Ring-2 ring-primary |
| **Button Primary** | Brightness-110 | Ring-2 ring-offset-2 |
| **Input** | Border-primary | Ring-2 ring-primary |
| **Link** | Underline | Outline-none |
| **Cart Icon** | Scale-110 | Ring-2 |

---

## 8. Critérios de Aceitação (Definition of Done)

### 8.1 Checklist Geral

- [ ] Loja pública renderiza com tema customizado
- [ ] Grid de produtos responsivo (1/2/3/4 colunas)
- [ ] Filtros laterais funcionam (categoria, preço)
- [ ] Página de produto mostra galeria e detalhes
- [ ] Carrinho slide-out abre/fecha corretamente
- [ ] Adicionar/remover itens do carrinho funciona
- [ ] Quantidade pode ser alterada (+/- e input)
- [ ] Checkout com steps visuais (3 etapas)
- [ ] Formulários de dados e endereço validam
- [ ] Seleção de pagamento funciona
- [ ] Tela de sucesso mostra confirmação
- [ ] Painel de configuração acessível
- [ ] Seleção de tema funciona
- [ ] Customizador de cores aplica em tempo real
- [ ] Preview ao vivo mostra alterações
- [ ] Configurações de SEO editáveis

### 8.2 Checklist de Responsividade

| Breakpoint | Mobile (<640px) | Tablet (640-1024px) | Desktop (>1024px) |
|------------|-----------------|---------------------|-------------------|
| Grid produtos | 1 coluna | 2-3 colunas | 3-4 colunas |
| Filtros | Drawer | Drawer/Sidebar | Sidebar fixa |
| Carrinho | Full-screen drawer | Drawer | Drawer |
| Header | Hamburger menu | Logo + busca | Completo |
| Checkout | Single column | Two columns | Two columns |

### 8.3 Checklist de Componentes

| Componente | Criado | Testado | Integrado |
|------------|--------|---------|-----------|
| StoreHeader | [ ] | [ ] | [ ] |
| StoreFooter | [ ] | [ ] | [ ] |
| ProductCard | [ ] | [ ] | [ ] |
| ProductGrid | [ ] | [ ] | [ ] |
| ProductGallery | [ ] | [ ] | [ ] |
| ProductFilters | [ ] | [ ] | [ ] |
| CartDrawer | [ ] | [ ] | [ ] |
| CartItem | [ ] | [ ] | [ ] |
| CartSummary | [ ] | [ ] | [ ] |
| QuantitySelector | [ ] | [ ] | [ ] |
| CheckoutSteps | [ ] | [ ] | [ ] |
| CheckoutForm | [ ] | [ ] | [ ] |
| AddressForm | [ ] | [ ] | [ ] |
| PaymentSelector | [ ] | [ ] | [ ] |
| CheckoutSuccess | [ ] | [ ] | [ ] |
| ThemeSelector | [ ] | [ ] | [ ] |
| ColorPicker | [ ] | [ ] | [ ] |
| StorePreview | [ ] | [ ] | [ ] |
| SEOSettings | [ ] | [ ] | [ ] |

---

## 9. Dependências

### 9.1 Componentes shadcn/ui Já Existentes

Todos os componentes base do Design System já estão implementados e disponíveis:
- Button, Card, Badge, Avatar
- Dialog, Input, Select, Tabs
- Skeleton, Toast, Textarea
- Checkbox, Switch, Tooltip
- Separator, DropdownMenu

### 9.2 Componentes a Instalar

```bash
# Novos componentes necessários
npx shadcn add sheet          # Slide-out drawer do carrinho
npx shadcn add accordion      # Filtros colapsáveis
npx shadcn add slider         # Filtro de preço
npx shadcn add scroll-area    # Scroll customizado
npx shadcn add aspect-ratio   # Proporção de imagens
```

### 9.3 Bibliotecas Adicionais

```bash
# Animações
npm install framer-motion

# Ícones (já instalado)
# lucide-react

# Formatação de moeda (usar Intl ou instalar)
npm install intl
```

---

## 10. Notas de Implementação

### 10.1 Estrutura de Estados (React)

```typescript
// Contexto do Carrinho
interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  summary: {
    subtotal: number;
    shipping: number;
    discount: number;
    total: number;
  };
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

// Contexto da Loja (Tema)
interface StoreContextType {
  config: StoreConfig;
  theme: ThemeSettings;
  updateTheme: (settings: Partial<ThemeSettings>) => void;
  previewUrl: string;
}
```

### 10.2 Padrões de Animação

```typescript
// Slide-out animation (Framer Motion)
const slideVariants = {
  hidden: { x: '100%' },
  visible: { 
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  exit: { 
    x: '100%',
    transition: { duration: 0.2 }
  }
};

// Fade overlay
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};
```

### 10.3 Organização de Mock Data

```
📁 lib/
├── 📁 mocks/
│   ├── storefront.ts       # Dados da loja, produtos, carrinho
│   ├── categories.ts       # Categorias
│   ├── themes.ts           # Templates de tema
│   ├── payment.ts          # Métodos de pagamento
│   └── index.ts            # Exportações
├── 📁 hooks/
│   ├── use-cart.ts         # Hook do carrinho
│   ├── use-store.ts        # Hook da loja
│   └── use-checkout.ts     # Hook do checkout
├── 📁 types/
│   ├── storefront.ts       # Types da loja
│   ├── cart.ts             # Types do carrinho
│   └── checkout.ts         # Types do checkout
```

### 10.4 Performance Considerations

- Usar `next/image` para otimização de imagens
- Implementar lazy loading no grid de produtos
- Virtualização para listas longas (se necessário)
- Debounce na busca (300ms)
- Memoização de componentes com React.memo
- Skeleton loading para melhor perceived performance

### 10.5 SEO e Meta Tags

```typescript
// Página de produto
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.slug);
  
  return {
    title: `${product.name} | ${storeConfig.name}`,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  };
}
```

---

## 11. Riscos e Mitigações

### Risco 1: Complexidade do Carrinho com Contexto
**Descrição:** Gerenciamento de estado do carrinho pode ficar complexo.
**Impacto:** Médio | **Probabilidade:** Média
**Mitigação:**
- Usar React Context + useReducer
- Separar lógica em hooks customizados
- Persistir no localStorage
- Testar edge cases (estoque, quantidades)

### Risco 2: Responsividade Complexa
**Descrição:** Layout precisa funcionar bem em muitos tamanhos.
**Impacto:** Médio | **Probabilidade:** Média
**Mitigação:**
- Mobile-first approach
- Testar em múltiplos breakpoints
- Usar Tailwind breakpoints consistentemente
- Preview em dispositivos reais

### Risco 3: Preview ao Vivo em Iframe
**Descrição:** Sincronizar configurações com preview pode ter delay.
**Impacto:** Baixo | **Probabilidade:** Média
**Mitigação:**
- Usar postMessage para comunicação
- Debounce nas alterações
- Indicador de loading
- Fallback para reload manual

### Risco 4: Muitos Componentes Novos
**Descrição:** 2 semanas pode ser curto para toda a complexidade.
**Impacto:** Alto | **Probabilidade:** Média
**Mitigação:**
- Priorizar: Grid de produtos, Carrinho, Checkout básico
- Configurador pode ser versão simplificada
- Usar componentes shadcn/ui sempre que possível
- Deixar features avançadas para próxima sprint

---

## 12. Referências

### 12.1 Documentação do Projeto
- [PRD Sprint 01 - Design System](./PRD_SPRINT_01_Design_System.md)
- [PRD Sprint 04 - CRM UI](./PRD_SPRINT_04_CRM_UI.md)
- [TRACKING.md](../TRACKING.md)

### 12.2 Inspirações UI
- [Shopify](https://www.shopify.com/) - E-commerce reference
- [Stripe](https://stripe.com/) - Checkout experience
- [Gymshark](https://www.gymshark.com/) - Product cards
- [Apple Store](https://www.apple.com/store) - Product pages
- [Amazon](https://www.amazon.com/) - Filters and search

### 12.3 Recursos
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Documento gerado em:** 20/03/2026  
**Pesquisador:** @vibe-researcher  
**Fase:** FASE 01 - Research (SDD)  
**Próxima Fase:** FASE 02 - Planning (@vibe-planner)  
**Status:** 🟢 PRONTO PARA PLANNING

---

> ⚠️ **IMPORTANTE:** Este é um documento de especificação de produto (PRD). Não contém código implementado. A implementação será realizada na FASE 03 por @vibe-implementer baseado na SPEC técnica que será gerada na FASE 02.

> 🎯 **PRÓXIMOS PASSOS:**
> 1. Usuário deve limpar contexto do chat
> 2. Chamar @vibe-planner para gerar SPEC.md
> 3. Aguardar aprovação do SPEC
> 4. Chamar @vibe-implementer para desenvolvimento

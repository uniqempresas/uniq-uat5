# PRD: Módulo Marketplace - Sprint 11

**Data:** 2026-03-21  
**Sprint:** 11  
**Módulo:** Marketplace Multi-tenant  
**Responsável:** @vibe-researcher  
**Status:** ✅ Completo

---

## 📋 Resumo Executivo

Este PRD descreve os requisitos para o **Módulo Marketplace Multi-tenant** da plataforma UNIQ Empresas. O marketplace permite que lojistas listem seus produtos e clientes naveguem/comprem de múltiplos vendedores em uma única plataforma unificada.

**Código do Módulo:** MKT-11  
**Complexidade:** Média  
**Estimativa:** 2 semanas

---

## 🎯 Problema

### Contexto Atual
O ecossistema UNIQ oferece módulos de CRM, Financeiro e Loja Virtual individual para cada cliente. No entanto, os empreendedores têm dificuldade em:

1. **Descobrir outros fornecedores/parceiros** - Não existe uma forma fácil de encontrar lojistas parceiros na região
2. **Expandir alcance de vendas** - Cada loja opera isoladamente, sem sinergia com outros negócios locais
3. **Competir com grandes marketplaces** - Pequenos lojistas perdem visibilidade para marketplaces consolidados (Mercado Livre, Shopee)

### Dores Identificadas

| DOR | SEVERIDADE | FREQUÊNCIA |
|-----|------------|------------|
| Perda de visibilidade para pequenos negócios | 8/10 | Alta |
| Falta de integração entre lojistas da região | 7/10 | Média |
| Dificuldade em encontrar fornecedores locais | 6/10 | Média |

---

## 💡 Solução

### Conceito
Um **marketplace multi-tenant** onde:
- **Lojistas** podem criar perfil, listar produtos e gerenciar vendas
- **Compradores** podem explorar produtos de múltiplos vendedores, comparar preços e comprar
- **UNIQ** atua como plataforma conectora, gerando network effects entre os negócios locais

### Diferencial UNIQ
> "Enquanto marketplaces genéricos são frios e impessoais, o marketplace UNIQ conecta negócios da mesma região, criando uma comunidade empresarial local."

---

## 👥 Personas

### Persona 1: Lojista/Vendedor - "Maria da Loja"

**Perfil:**
- Dona de loja de cosméticos em Suzano
- 2 funcionários
- Faturamento: R$ 15k/mês
- Usa WhatsApp + Instagram para vendas
- Quer expandrir alcance sem investir em delivery próprio

**Necessidades:**
- Perfil profissional no marketplace
- Listar produtos com fotos e preços
- Gerenciar pedidos em um único lugar
- Acompanhar métricas de vendas
- Receber avaliações para construir reputação

**Fluxo Principal:**
```
Cadastro → Listar Produtos → Receber Pedidos → Gerenciar → Avaliar Feedback
```

### Persona 2: Comprador - "Carlos Cliente"

**Perfil:**
- Empreendedor que precisa de suprimentos para seu negócio
- Procura variedade e melhores preços
- Valoriza avaliações e reputação do vendedor

**Necessidades:**
- Buscar produtos por categoria
- Comparar preços entre vendedores
- Ver reputação/avaliações
- Comprar de múltiplos vendedores no mesmo checkout (futuro)

**Fluxo Principal:**
```
Explorar → Filtrar/Buscar → Ver Perfil do Vendedor → Comprar → Avaliar
```

---

## ⚙️ Funcionalidades

### 1. Navegação no Marketplace (Tela Pública)

**Rota:** `/marketplace`

#### 1.1 Busca e Filtros
| Campo | Tipo | Comportamento |
|-------|------|---------------|
| Busca | Text input | Busca por nome do lojista ou produto |
| Categoria | Select | Todas, Roupas, Alimentos, Serviços, etc. |
| Localização | Select | Todas, Suzano, Mogi das Cruzes, Itaquaquecetuba |
| Avaliação | Select | Qualquer, 5 estrelas, 4+ estrelas, 3+ estrelas |
| Ordenar | Select | Relevância, Mais bem avaliados, Mais produtos, Mais recentes |

#### 1.2 Grid de Lojistas
- Layout responsivo: 1 col (mobile) → 2 col (tablet) → 3-4 col (desktop)
- Cards com: Logo, Nome, Localização, Rating (estrelas), Contagem de avaliações, Produtos, Vendas
- Badges: Verificado, Novo, Premium
- CTA: "Ver Loja"

#### 1.3 Paginação
- 12 lojistas por página
- Navegação: Anterior/Próxima + Números

### 2. Perfil do Lojista (Tela Pública)

**Rota:** `/marketplace/lojista/[slug]`

#### 2.1 Header/Hero
- Banner/capa do lojista (opcional)
- Logo + Nome + Badge Verificado
- Localização + Data de entrada
- Métricas: Rating, Avaliações, Produtos, Vendas
- Ações: Ver Produtos, Enviar Mensagem, Seguir

#### 2.2 Tabs de Navegação
| Tab | Conteúdo |
|-----|----------|
| **Produtos** | Grid de produtos do lojista |
| **Avaliações** | Distribuição + Lista de avaliações |
| **Sobre** | Descrição, Telefone, WhatsApp, Horário, CNPJ |

#### 2.3 Tab Produtos
- Filtros: Categoria, Ordenação
- Grid de cards de produtos
- Cada card: Imagem, Preço (com desconto se aplicável), Nome, Rating, Vendas
- Badges: Promoção (-20%), Frete Grátis

#### 2.4 Tab Avaliações
- Nota geral (0-5 com estrelas)
- Distribuição percentual (5-1 estrelas)
- Lista de avaliações com:
  - Avatar + Nome + Data
  - Rating (estrelas)
  - Título + Texto
  - Fotos (se houver)
  - Produto avaliado (link)
  - Resposta do lojista

#### 2.5 Tab Sobre
- Descrição da loja
- Informações de contato (grid 2x2)

### 3. Painel do Lojista/Vendedor (Tela Autenticada)

**Rota:** `/marketplace/minha-loja`

#### 3.1 Dashboard/Métricas
| Card | Métrica | Descrição |
|------|---------|-----------|
| Vendas | R$ 12.450 | Vendas do mês com variação % |
| Receita | R$ 890 | Receita hoje |
| Pedidos | 12 | Pedidos pendentes |
| Produtos | 42 | Produtos ativos |

#### 3.2 Tabs de Navegação
| Tab | Conteúdo |
|-----|----------|
| **Produtos** | CRUD de produtos + Tabela |
| **Pedidos** | Lista de pedidos recebidos |
| **Avaliações** | Gerenciar respostas |
| **Configurações** | Editar perfil da loja |

#### 3.3 Tab Produtos
**Toolbar:**
- Busca de produtos
- Filtro por status (Todos, Ativos, Pausados, Sem estoque)
- Botão: Novo Produto

**Tabela de Produtos:**
| Coluna | Conteúdo |
|--------|----------|
| Produto | Imagem + Nome + SKU |
| Preço | Preço + Custo |
| Estoque | Quantidade + Alerta |
| Vendas | Contagem |
| Status | Badge (Ativo, Pausado, Sem estoque, Rascunho) |
| Ações | Editar, Duplicar, Excluir |

**Status Badges:**
- 🟢 Ativo: `bg-green-100 text-green-700`
- 🟡 Pausado: `bg-amber-100 text-amber-700`
- 🔴 Sem estoque: `bg-red-100 text-red-700`
- ⚪ Rascunho: `bg-gray-100 text-gray-700`

#### 3.4 Tab Pedidos
**Lista de Pedidos:**
- Número do pedido + Status badge
- Cliente + Data
- Preview produtos + Total
- Ações: Ver Detalhes

**Status de Pedidos:**
- ⏳ Pendente
- 💳 Pago
- 📦 Enviado
- ✅ Entregue
- ❌ Cancelado

#### 3.5 Tab Avaliações
- Nota geral + Distribuição
- Lista de avaliações com botão "Responder"

#### 3.6 Tab Configurações
**Seção 1: Informações da Loja**
- Nome da Loja (text input)
- CNPJ (disabled)
- Descrição (textarea)

**Seção 2: Logo e Banner**
- Upload de Logo (drag & drop)
- Upload de Banner (drag & drop)
- Preview das imagens

---

## 🔄 Fluxo de Usuário

### Fluxo 1: Lojista Novo
```
1. Acessa /marketplace/minha-loja
2. Sistema detecta que não tem perfil
3. Exibe onboarding para criar loja
4. Preenche informações básicas
5. Faz upload de logo e banner
6. Começa a listar produtos
7. Perfil fica visível no marketplace
```

### Fluxo 2: Cliente Navega e Compra
```
1. Acessa /marketplace
2. Filtra por categoria/localização
3. Vê lista de lojistas
4. Clica em um lojista
5. Vê perfil + produtos
6. Clica em produto
7. (Futuro) Checkout no marketplace
8. (MVP) Redireciona para WhatsApp
```

### Fluxo 3: Lojista Gerencia Pedidos
```
1. Recebe notificação de novo pedido
2. Acessa /marketplace/minha-loja → Pedidos
3. Vê lista de pedidos pendentes
4. Atualiza status do pedido
5. Recebe avaliação do cliente
6. Responde avaliação
```

---

## 📐 Wireframes Descritivos

### Wireframe 1: Lista de Lojistas (`/marketplace`)

```
┌─────────────────────────────────────────────────────────────────────┐
│ [SIDEBAR]                           [HEADER]                        │
│                                                             [Perfil]│
│  • Dashboard                                                     │
│  • Marketplace ← ATIVO                                            │
│  • CRM                                                            │
├───────────┬───────────────────────────────────────────────────────┤
│           │  MARKETPLACE                                          │
│           │  Encontre os melhores lojistas e produtos da região   │
│           │                                                       │
│           │  ┌──────────────────────────────────────────────┐     │
│           │  │ 🔍 Buscar lojistas, produtos...             │     │
│           │  └──────────────────────────────────────────────┘     │
│           │                                                       │
│           │  [Categoria ▼] [Localização ▼] [Avaliação ▼] [Ordenar▼]│
│           │                                                       │
│           │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│           │  │ [LOGO]  │ │ [LOGO]  │ │ [LOGO]  │ │ [LOGO]  │       │
│           │  │ Tech    │ │ Beleza  │ │ Doces   │ │ Ótica   │       │
│           │  │ Suzano   │ │ Mogi    │ │ Suzano   │ │ Itaquá  │       │
│           │  │ ★ 4.8    │ │ ★ 4.5    │ │ ★ 4.9    │ │ ★ 4.2    │       │
│           │  │ 42 prods │ │ 156 prods│ │ 28 prods │ │ 15 prods │       │
│           │  │ [Ver Loja]│ │[Ver Loja]│ │[Ver Loja]│ │[Ver Loja]│       │
│           │  └─────────┘ └─────────┘ └─────────┘ └─────────┘       │
│           │                                                       │
│           │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│           │  │ ...     │ │ ...     │ │ ...     │ │ ...     │       │
│           │  └─────────┘ └─────────┘ └─────────┘ └─────────┘       │
│           │                                                       │
│           │              1 2 3 ... 10 ▶                            │
│           │                                                       │
└───────────┴───────────────────────────────────────────────────────┘
```

### Wireframe 2: Perfil do Lojista (`/marketplace/lojista/[slug]`)

```
┌─────────────────────────────────────────────────────────────────────┐
│ [SIDEBAR]                           [HEADER] Marketplace             │
├───────────┬───────────────────────────────────────────────────────┤
│           │  ┌─────────────────────────────────────────────────┐   │
│           │  │ BANNER DE CAPA (escuro/gradiente)               │   │
│           │  │                                                  │   │
│           │  │  ┌────────┐ Tech Solutions Ltda  ★ 4.8 (127)    │   │
│           │  │  │ LOGO   │ 📍 Suzano, SP                       │   │
│           │  │  │ 64px   │ Joined Jan 2024                     │   │
│           │  │  └────────┘                                     │   │
│           │  │                                                  │   │
│           │  │  [Ver Produtos] [Enviar Msg] [♥ Seguir]         │   │
│           │  └─────────────────────────────────────────────────┘   │
│           │                                                         │
│           │  [Produtos (42)] | [Avaliações (127)] | [Sobre]         │
│           │  ───────────────────────────────────────────────────── │
│           │                                                         │
│           │  [Categoria ▼] [Ordenar ▼]          42 produtos         │
│           │                                                         │
│           │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│           │  │  IMG    │ │  IMG    │ │  IMG    │ │  IMG    │       │
│           │  │ -20%    │ │ Frete   │ │         │ │         │       │
│           │  │ R$299   │ │ Grátis  │ │ R$ 89   │ │ R$ 149  │       │
│           │  │ NOTE-   │ │ Teclado │ │ Mouse   │ │ Fone    │       │
│           │  │ Dell    │ │ ★4.7    │ │ ★4.5    │ │ ★4.8    │       │
│           │  └─────────┘ └─────────┘ └─────────┘ └─────────┘       │
│           │                                                         │
└───────────┴───────────────────────────────────────────────────────┘
```

### Wireframe 3: Painel do Lojista (`/marketplace/minha-loja`)

```
┌─────────────────────────────────────────────────────────────────────┐
│ [SIDEBAR]                           [HEADER] Minha Loja       [👤]  │
├───────────┬───────────────────────────────────────────────────────┤
│           │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│           │  │ 📈 Vendas │ │ 💰 Receita│ │ ⏳ Pedidos│ │ 📦Produtos│  │
│           │  │ R$ 12.450│ │ R$ 890   │ │ 12       │ │ 42       │  │
│           │  │ +15%      │ │ hoje     │ │ pendentes│ │ ativos   │  │
│           │  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│           │                                                         │
│           │  [Produtos] | [Pedidos] | [Avaliações] | [Config]     │
│           │  ───────────────────────────────────────────────────── │
│           │                                                         │
│           │  🔍 Buscar produtos...    [Status ▼]     [+ Novo]       │
│           │  ───────────────────────────────────────────────────── │
│           │  PRODUTO      │ PREÇO    │ ESTOQUE │ STATUS  │ AÇÕES │  │
│           │  ──────────────────────────────────────────────────────│
│           │  [📷] Notebook│ R$ 2.499 │ 12      │ 🟢 Ativo │ •••  │  │
│           │       SKU...   │ C:1.800  │ ⚠️ baixo│         │       │  │
│           │  ──────────────────────────────────────────────────────│
│           │  [📷] Teclado│ R$ 189   │ 25      │ 🟢 Ativo │ •••  │  │
│           │  ──────────────────────────────────────────────────────│
│           │  [📷] Mouse   │ R$ 89    │ 0       │ 🔴 S/estoq│ ••• │  │
│           │                                                         │
│           │              1 2 3 ... ▶                               │
│           │                                                         │
└───────────┴───────────────────────────────────────────────────────┘
```

---

## 📊 Mock Data

### Estruturas TypeScript

```typescript
// Tipos do Marketplace
export interface Seller {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  banner: string | null;
  description: string;
  location: { city: string; state: string };
  rating: number;
  reviewCount: number;
  productCount: number;
  salesCount: number;
  isVerified: boolean;
  isPremium: boolean;
  createdAt: string;
  phone?: string;
  whatsapp?: string;
}

export interface Product {
  id: string;
  sellerId: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  stock: number;
  status: 'active' | 'paused' | 'out_of_stock' | 'draft';
  salesCount: number;
  rating?: number;
  reviewCount?: number;
  sku?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  sellerId: string;
  customer: { name: string; email: string };
  items: OrderItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Review {
  id: string;
  sellerId: string;
  productId?: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  title?: string;
  content: string;
  photos?: string[];
  createdAt: string;
  reply?: { content: string; createdAt: string };
}
```

### Dados de Exemplo

```typescript
// Lojistas
export const sellers: Seller[] = [
  {
    id: 'seller-1',
    name: 'Tech Solutions Ltda',
    slug: 'tech-solutions',
    logo: '/logos/lojista-1.jpg',
    banner: '/banners/lojista-1.jpg',
    description: 'Empresa especializada em tecnologia e informática.',
    location: { city: 'Suzano', state: 'SP' },
    rating: 4.8,
    reviewCount: 127,
    productCount: 42,
    salesCount: 89,
    isVerified: true,
    isPremium: true,
    createdAt: '2024-01-15',
    phone: '(11) 99999-9999',
    whatsapp: '(11) 99999-9999',
  },
  {
    id: 'seller-2',
    name: 'Beleza & Estilo',
    slug: 'beleza-estilo',
    logo: '/logos/lojista-2.jpg',
    banner: null,
    description: 'Cosméticos e produtos de beleza.',
    location: { city: 'Mogi das Cruzes', state: 'SP' },
    rating: 4.5,
    reviewCount: 89,
    productCount: 156,
    salesCount: 234,
    isVerified: true,
    isPremium: false,
    createdAt: '2024-03-20',
  },
];

// Produtos
export const products: Product[] = [
  {
    id: 'prod-1',
    sellerId: 'seller-1',
    name: 'Notebook Dell Inspiron 15 8GB RAM 256GB SSD Intel Core i5',
    description: 'Notebook ideal para trabalho e estudos.',
    price: 2499.00,
    compareAtPrice: 2999.00,
    images: ['/produtos/1.jpg'],
    category: 'Eletrônicos',
    stock: 12,
    status: 'active',
    salesCount: 234,
    rating: 4.9,
    reviewCount: 128,
    sku: 'NOTE-DELL-001',
  },
  {
    id: 'prod-2',
    sellerId: 'seller-1',
    name: 'Teclado Mecânico RGB Gamer',
    description: 'Teclado gamer com switches blue.',
    price: 189.00,
    images: ['/produtos/2.jpg'],
    category: 'Periféricos',
    stock: 25,
    status: 'active',
    salesCount: 89,
    rating: 4.7,
    reviewCount: 45,
    sku: 'TECL-GAMER-001',
  },
];

// Pedidos
export const orders: Order[] = [
  {
    id: 'order-1',
    orderNumber: 'PED-2026-0145',
    sellerId: 'seller-1',
    customer: { name: 'Maria Oliveira', email: 'maria@email.com' },
    items: [
      {
        productId: 'prod-1',
        productName: 'Notebook Dell Inspiron 15',
        quantity: 1,
        price: 2499.00,
        image: '/produtos/1.jpg',
      },
    ],
    total: 2499.00,
    status: 'pending',
    createdAt: '2026-03-21T14:30:00Z',
  },
];

// Avaliações
export const reviews: Review[] = [
  {
    id: 'review-1',
    sellerId: 'seller-1',
    productId: 'prod-1',
    customerName: 'João Silva',
    rating: 5,
    title: 'Excelente notebook!',
    content: 'Produto de qualidade, chegou rápido e bem embalado.',
    photos: ['/avaliacoes/1.jpg'],
    createdAt: '2026-03-20',
    reply: {
      content: 'Obrigado pela compra! Estamos à disposição.',
      createdAt: '2026-03-20',
    },
  },
];
```

---

## 🔗 Dependências

### Internas
| Dependência | Módulo | Justificativa |
|-------------|--------|---------------|
| Autenticação | modulo-core-autenticacao | Necessário para identificar lojista |
| Sidebar | modulo-core-sidebar | Layout base da aplicação |
| Estoque/Produtos | modulo-estoque | Produtos listados no marketplace |

### Externas
| Dependência | Tipo | Justificativa |
|-------------|------|---------------|
| Lucide React | UI Library | Ícones consistentes com design system |
| Supabase | Backend | Storage para logos/banners |

### Pré-requisitos de Implementação
1. Design System UNIQ implementado (Sprint 01)
2. Sidebar e layout base (Dashboard)
3. Autenticação com Supabase Auth
4. Estrutura de rotas com React Router v7

---

## ✅ Critérios de Aceitação

### Funcionalidade Core

#### [ ] Tela 1: Lista de Lojistas
- [ ] Header com título "Marketplace" e descrição
- [ ] Barra de busca funcional
- [ ] Filtros: Categoria, Localização, Avaliação, Ordenação
- [ ] Grid responsivo de cards (1/2/3/4 colunas)
- [ ] Card exibe: Logo, Nome, Local, Rating, Badges, CTA
- [ ] Badges: Verificado (verde), Novo (azul), Premium (dourado)
- [ ] Paginação com 12 items por página
- [ ] Estado vazio quando sem resultados
- [ ] Skeleton loading durante carregamento

#### [ ] Tela 2: Perfil do Lojista
- [ ] Header com banner e perfil do lojista
- [ ] Métricas: Rating, Avaliações, Produtos, Vendas
- [ ] Ações: Ver Produtos, Enviar Mensagem, Seguir
- [ ] Tabs: Produtos, Avaliações, Sobre
- [ ] Tab Produtos com filtros e grid
- [ ] Tab Avaliações com distribuição e lista
- [ ] Tab Sobre com informações de contato

#### [ ] Tela 3: Painel do Lojista
- [ ] Cards de métricas (Vendas, Receita, Pedidos, Produtos)
- [ ] Tabs: Produtos, Pedidos, Avaliações, Configurações
- [ ] CRUD de produtos completo
- [ ] Upload de logo e banner
- [ ] Listagem de pedidos com status
- [ ] Resposta a avaliações

### Estados e Edge Cases

| Estado | Comportamento Esperado |
|--------|----------------------|
| Loading | Exibir skeleton em todos os componentes |
| Vazio | "Nenhum lojista encontrado" com CTA limpar filtros |
| Erro | Toast de erro + opção retry |
| Sem logo | Exibir ícone Store como placeholder |
| Sem banner | Usar gradiente escuro padrão |

### Responsividade

| Breakpoint | Layout |
|------------|--------|
| Mobile (<640px) | 1 coluna, filtros em drawer |
| Tablet (640-1023px) | 2 colunas |
| Desktop (≥1024px) | 3-4 colunas |

### Acessibilidade

- [ ] Navegação por teclado nas tabs
- [ ] Focus visible em botões e inputs
- [ ] Alt text em todas as imagens
- [ ] Contraste adequado (WCAG AA)
- [ ] Roles ARIA em componentes customizados

### Performance

- [ ] Lazy loading de imagens
- [ ] Code splitting por rota
- [ ] Tempo de carregamento < 2s

---

## 📁 Estrutura de Arquivos

```
src/
├── app/
│   └── (dashboard)/
│       └── marketplace/
│           ├── page.tsx                    # Lista de lojistas
│           ├── lojista/
│           │   └── [slug]/
│           │       └── page.tsx            # Perfil do lojista
│           └── minha-loja/
│               └── page.tsx                # Painel do vendedor
├── components/
│   └── marketplace/
│       ├── SellerCard.tsx
│       ├── SellerHeader.tsx
│       ├── SellerMetrics.tsx
│       ├── ProductCard.tsx
│       ├── ProductTable.tsx
│       ├── OrderCard.tsx
│       ├── ReviewItem.tsx
│       ├── MarketplaceFilters.tsx
│       ├── MarketplaceSearch.tsx
│       └── StatusBadge.tsx
├── hooks/
│   ├── useSellers.ts
│   ├── useSeller.ts
│   ├── useSellerProducts.ts
│   ├── useSellerOrders.ts
│   ├── useSellerReviews.ts
│   ├── useMyStore.ts
│   └── useProductCrud.ts
└── types/
    └── marketplace.ts
```

---

## 📝 Notas

### MVP vs Futuro
**Este Sprint (MVP):**
- Listagem de lojistas e produtos
- Perfil público do lojista
- Painel do vendedor (gerenciar produtos)
- Avaliações de lojistas

**Futuro (Sprints posteriores):**
- Checkout unificado (carrinho com produtos de múltiplos vendedores)
- Sistema de pagamento integrado
- Chat entre comprador e vendedor
- Notificações push
- Programa de pontos/recompensas

### Integrações Planejadas
- WhatsApp Business API (mensagens)
- Instagram (importar catálogo)
- Mercado Pago / Stripe (pagamentos)

---

## 🔄 Histórico de Alterações

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0.0 | 2026-03-21 | @vibe-researcher | PRD inicial - Sprint 11 Marketplace |

---

**Documento gerado para UNIQ Empresas**
**Próximo passo:** @vibe-planner criará o SPEC.md com especificações técnicas detalhadas.

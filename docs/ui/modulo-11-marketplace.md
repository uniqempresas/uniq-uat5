# 🎯 UNIQ Empresas - Documentação de UI/UX
## Módulo 11: Marketplace Multi-tenant

**Versão:** 1.0  
**Última atualização:** 21/03/2026  
**Módulo:** 11 - Marketplace  
**Total de Telas:** 3 telas principais  
**Tema:** Modo Claro (Light Mode)  
**Responsável:** Frontend Team

---

## 📋 Sumário

1. [Metadados e Visão Geral](#metadados-e-visão-geral)
2. [Tela 1: Lista de Lojistas](#tela-1-lista-de-lojistas)
3. [Tela 2: Perfil do Lojista](#tela-2-perfil-do-lojista)
4. [Tela 3: Painel do Lojista/Vendedor](#tela-3-painel-do-lojistavendedor)
5. [Mock Data](#mock-data)
6. [Checklist de Implementação](#checklist-de-implementação)

---

## 🎨 Design System UNIQ - Modo Claro

### Paleta de Cores

| Token | Cor | Hex | Uso |
|-------|-----|-----|-----|
| **Fundo Principal** | Platinum | `#efefef` | Área de conteúdo principal |
| **Fundo Cards** | Branco | `#ffffff` | Cards, formulários, modais |
| **Sidebar** | Jet Black | `#1f2937` | Barra lateral (sempre escura) |
| **Botões Primários** | Dark Slate Grey | `#3e5653` | Ações principais |
| **Botões Hover** | Jet Black | `#1f2937` | Hover dos botões primários |
| **Accent/Detalhes** | Emerald | `#86cb92` | Ícones, bordas, destaques sutis |
| **Texto Principal** | Jet Black | `#1f2937` | Títulos, textos importantes |
| **Texto Secundário** | Dim Grey | `#627271` | Descrições, labels, placeholders |
| **Texto Sidebar** | Branco/Cinza | `#ffffff` / `#9ca3af` | Textos na sidebar escura |
| **Bordas** | Gray-200 | `#e5e7eb` | Bordas de inputs e cards |
| **Sucesso** | Green | `#16a34a` | Estados de sucesso |
| **Erro** | Red | `#dc2626` | Estados de erro, alertas |
| **Aviso** | Amber | `#f59e0b` | Avisos, atenção |
| **Info** | Blue | `#3b82f6` | Informações |

### Tipografia

- **Fonte:** Poppins (Google Fonts)
- **Importação:** `https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap`

**Hierarquia:**
| Elemento | Tamanho | Peso | Cor |
|----------|---------|------|-----|
| H1 | `text-3xl md:text-4xl` | `font-bold` (700) | `#1f2937` |
| H2 | `text-2xl md:text-3xl` | `font-bold` (700) | `#1f2937` |
| H3 | `text-xl md:text-2xl` | `font-semibold` (600) | `#1f2937` |
| H4 | `text-lg` | `font-semibold` (600) | `#1f2937` |
| Body | `text-base` | `font-normal` (400) | `#627271` |
| Small | `text-sm` | `font-normal` (400) | `#627271` |
| Caption | `text-xs` | `font-medium` (500) | `#627271` |

### Layout Patterns

**Container Principal:**
```
Desktop (>=1024px):
┌──────────────────────────────────────────────────────────────┐
│  SIDEBAR ESCURA     │    HEADER (fixo)                        │
│  bg-[#1f2937]       │    bg-white                             │
│  w-64 (256px)       │    h-16                                 │
│  h-screen fixed     │    border-b border-[#e5e7eb]            │
│                     │                                         │
│  • Logo UNIQ        ├─────────────────────────────────────────┤
│  • Menu Principal   │                                         │
│  • Marketplace      │    CONTEÚDO                             │
│                     │    bg-[#efefef]                         │
│                     │    min-h-[calc(100vh-64px)]             │
│                     │    p-6                                  │
└──────────────────────────────────────────────────────────────┘
```

**Card Pattern:**
- Fundo: `bg-white`
- Borda: `border border-[#e5e7eb]`
- Borda-radius: `rounded-xl` (12px)
- Sombra: `shadow-sm` ou `shadow-md`
- Padding: `p-6` (24px)
- Hover: `hover:shadow-md transition-shadow duration-200`

**Input Pattern:**
- Fundo: `bg-white`
- Borda: `border border-[#e5e7eb]`
- Borda-radius: `rounded-lg` (8px)
- Padding: `py-2.5 px-4`
- Focus: `focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92]`

---

## 📋 Metadados e Visão Geral

| Atributo | Valor |
|----------|-------|
| **Código** | MKT-11 |
| **Nome** | Marketplace Multi-tenant |
| **Título** | Marketplace |
| **Descrição** | Plataforma marketplace onde lojistas podem listar seus produtos e clientes podem navegar e comprar de múltiplos vendedores |
| **URL Base** | `/marketplace` |
| **Permissão** | `module:marketplace:read` / `module:marketplace:seller` |
| **Dependências** | `modulo-core-autenticacao`, `modulo-core-sidebar`, `modulo-estoque` |
| **Versão** | 1.0.0 |
| **Status** | 🆕 Novo |

### Objetivos do Módulo

1. **Para Lojistas/Vendedores:**
   - Listar produtos no marketplace
   - Gerenciar pedidos dos clientes
   - Acompanhar métricas de vendas
   - Receber avaliações

2. **Para Clientes/Compradores:**
   - Explorar produtos de múltiplos lojistas
   - Comparar preços
   - Ver perfil e avaliações dos lojistas
   - Comprar de diferentes vendedores

---

## Tela 1: Lista de Lojistas

**Rota:** `/marketplace`  
**Objetivo:** Grid de lojistas com filtros para navegação  
**Módulo:** Marketplace  
**Tipo:** Página pública autenticada

### Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│ [SIDEBAR]                           [HEADER] Marketplace             │
│                                     Encontre os melhores lojistas     │
│  • Dashboard                                                 │
│  • Marketplace ← ATIVO                                        │
│  • CRM                                                        │
│  • ...                                                        │
├───────────┬───────────────────────────────────────────────────────┤
│           │  [SEARCH BAR]                                         │
│           │  "Buscar lojistas, produtos..."                       │
│           │                                                       │
│           │  [FILTROS]                                            │
│           │  Categoria | Localização | Avaliação | Ordenar por    │
│           │                                                       │
│           │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│           │  │ [LOJA]  │ │ [LOJA]  │ │ [LOJA]  │ │ [LOJA]  │       │
│           │  │  Logo   │ │  Logo   │ │  Logo   │ │  Logo   │       │
│           │  │ Nome    │ │ Nome    │ │ Nome    │ │ Nome    │       │
│           │  │ Local   │ │ Local   │ │ Local   │ │ Local   │       │
│           │  │ ★ 4.5   │ │ ★ 4.8   │ │ ★ 4.2   │ │ ★ 4.9   │       │
│           │  │ 25 prods │ │ 42 prods│ │ 18 prods│ │ 56 prods│       │
│           │  └─────────┘ └─────────┘ └─────────┘ └─────────┘       │
│           │                                                       │
│           │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│           │  │ ...     │ │ ...     │ │ ...     │ │ ...     │       │
│           │  └─────────┘ └─────────┘ └─────────┘ └─────────┘       │
│           │                                                       │
│           │  [PAGINAÇÃO]                                           │
│           │  1 2 3 ... 10  ▶                                     │
│           │                                                       │
└───────────┴───────────────────────────────────────────────────────┘
```

### Componentes

#### 1. Header da Página

**Container:**
```html
<div class="bg-white border-b border-[#e5e7eb] px-6 py-4">
  <div class="max-w-7xl mx-auto">
```

**Título:**
```html
<h1 class="text-2xl font-bold text-[#1f2937]">Marketplace</h1>
<p class="text-sm text-[#627271] mt-1">
  Encontre os melhores lojistas e produtos da sua região
</p>
```

#### 2. Barra de Busca

**Container:**
```html
<div class="max-w-2xl mx-auto mb-6">
  <div class="relative">
    <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#627271]" />
    <input 
      type="text"
      placeholder="Buscar lojistas, produtos..."
      class="w-full pl-12 pr-4 py-3 rounded-xl border border-[#e5e7eb] bg-white text-[#1f2937] placeholder-[#627271] focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92] transition-all"
    />
  </div>
</div>
```

#### 3. Filtros

**Container:**
```html
<div class="flex flex-wrap items-center gap-3 mb-6">
  <!-- Filtro Categoria -->
  <select class="px-4 py-2 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#86cb92]">
    <option>Todas as categorias</option>
    <option>Roupas</option>
    <option>Alimentos</option>
    <option>Serviços</option>
  </select>

  <!-- Filtro Localização -->
  <select class="px-4 py-2 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#86cb92]">
    <option>Todas as regiões</option>
    <option>Suzano</option>
    <option>Mogi das Cruzes</option>
    <option>Itaquaquecetuba</option>
  </select>

  <!-- Filtro Avaliação -->
  <select class="px-4 py-2 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#86cb92]">
    <option>Qualquer avaliação</option>
    <option>★★★★★ 5 estrelas</option>
    <option>★★★★☆ 4+ estrelas</option>
    <option>★★★★☆ 3+ estrelas</option>
  </select>

  <!-- Ordenar por -->
  <select class="px-4 py-2 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#86cb92] ml-auto">
    <option>Ordenar por: Relevância</option>
    <option>Mais bem avaliados</option>
    <option>Mais produtos</option>
    <option>Mais recentes</option>
  </select>
</div>
```

#### 4. Grid de Cards de Lojistas

**Container do Grid:**
```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  <!-- Cards de lojistas -->
</div>
```

#### 5. Card de Lojista

**Container:**
```html
<div class="bg-white rounded-xl border border-[#e5e7eb] p-6 hover:shadow-lg hover:border-[#86cb92] transition-all duration-300 cursor-pointer group">
```

**Header (Logo + Badge Verificado):**
```html
<div class="flex items-start justify-between mb-4">
  <!-- Logo -->
  <div class="w-16 h-16 rounded-xl bg-[#efefef] flex items-center justify-center overflow-hidden">
    <img 
      src="/logos/lojista-1.jpg" 
      alt="Logo" 
      class="w-full h-full object-cover"
    />
    <!-- Placeholder se não tiver logo -->
    <Store class="w-8 h-8 text-[#627271]" />
  </div>
  
  <!-- Badge Verificado -->
  <span class="flex items-center gap-1 px-2 py-1 bg-[#86cb92]/10 text-[#86cb92] text-xs font-medium rounded-full">
    <BadgeCheck class="w-3 h-3" />
    Verificado
  </span>
</div>
```

**Informações do Lojista:**
```html
<div class="mb-4">
  <h3 class="text-lg font-semibold text-[#1f2937] group-hover:text-[#3e5653] transition-colors">
    Tech Solutions Ltda
  </h3>
  <p class="text-sm text-[#627271] mt-1 flex items-center gap-1">
    <MapPin class="w-4 h-4" />
    Suzano, SP
  </p>
</div>
```

**Avaliação:**
```html
<div class="flex items-center gap-2 mb-3">
  <div class="flex items-center">
    <Star class="w-4 h-4 text-amber-400 fill-amber-400" />
    <span class="text-sm font-semibold text-[#1f2937] ml-1">4.8</span>
  </div>
  <span class="text-sm text-[#627271]">(127 avaliações)</span>
</div>
```

**Métricas:**
```html
<div class="flex items-center gap-4 text-sm text-[#627271] mb-4">
  <span class="flex items-center gap-1">
    <Package class="w-4 h-4" />
    42 produtos
  </span>
  <span class="flex items-center gap-1">
    <ShoppingBag class="w-4 h-4" />
    89 vendas
  </span>
</div>
```

**Badges de Categoria:**
```html
<div class="flex flex-wrap gap-2 mb-4">
  <span class="px-2 py-1 bg-[#f3f4f6] text-[#627271] text-xs rounded-full">
    Eletrônicos
  </span>
  <span class="px-2 py-1 bg-[#f3f4f6] text-[#627271] text-xs rounded-full">
    Acessórios
  </span>
</div>
```

**Footer (CTA):**
```html
<div class="pt-4 border-t border-[#e5e7eb]">
  <button class="w-full py-2.5 bg-[#3e5653] hover:bg-[#1f2937] text-white text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2">
    <Eye class="w-4 h-4" />
    Ver Loja
  </button>
</div>
```

#### 6. Card de Lojista - Estados

**Estado Verificado:**
```html
<span class="flex items-center gap-1 px-2 py-1 bg-[#86cb92]/10 text-[#86cb92] text-xs font-medium rounded-full">
  <BadgeCheck class="w-3 h-3" />
  Verificado
</span>
```

**Estado Novo (Badge):**
```html
<span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
  Novo
</span>
```

**Estado Premium (Badge):**
```html
<span class="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full flex items-center gap-1">
  <Crown class="w-3 h-3" />
  Premium
</span>
```

#### 7. Estado Vazio

```html
<div class="text-center py-16">
  <div class="w-24 h-24 bg-[#f3f4f6] rounded-full flex items-center justify-center mx-auto mb-4">
    <Store class="w-12 h-12 text-[#627271]" />
  </div>
  <h3 class="text-xl font-semibold text-[#1f2937] mb-2">Nenhum lojista encontrado</h3>
  <p class="text-[#627271] mb-6 max-w-md mx-auto">
    Tente ajustar seus filtros ou buscar por outro termo.
  </p>
  <button class="bg-[#3e5653] hover:bg-[#1f2937] text-white font-medium px-6 py-2.5 rounded-lg transition-all">
    Limpar Filtros
  </button>
</div>
```

#### 8. Estado Carregando (Skeleton)

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  <!-- 8 Skeleton Cards -->
  <div class="bg-white rounded-xl border border-[#e5e7eb] p-6 animate-pulse">
    <div class="flex items-start justify-between mb-4">
      <div class="w-16 h-16 rounded-xl bg-[#e5e7eb]"></div>
      <div class="w-20 h-6 rounded-full bg-[#e5e7eb]"></div>
    </div>
    <div class="h-6 bg-[#e5e7eb] rounded w-3/4 mb-2"></div>
    <div class="h-4 bg-[#e5e7eb] rounded w-1/2 mb-4"></div>
    <div class="h-4 bg-[#e5e7eb] rounded w-1/3 mb-4"></div>
    <div class="h-8 bg-[#e5e7eb] rounded"></div>
  </div>
  <!-- Repetir 7x -->
</div>
```

#### 9. Paginação

```html
<div class="flex items-center justify-center gap-2 mt-8">
  <button class="p-2 rounded-lg border border-[#e5e7eb] hover:bg-[#f9fafb] disabled:opacity-50">
    <ChevronLeft class="w-5 h-5 text-[#627271]" />
  </button>
  
  <button class="px-4 py-2 text-sm font-medium rounded-lg bg-[#3e5653] text-white">1</button>
  <button class="px-4 py-2 text-sm font-medium rounded-lg text-[#627271] hover:bg-[#f9fafb]">2</button>
  <button class="px-4 py-2 text-sm font-medium rounded-lg text-[#627271] hover:bg-[#f9fafb]">3</button>
  
  <span class="px-2 text-[#627271]">...</span>
  
  <button class="px-4 py-2 text-sm font-medium rounded-lg text-[#627271] hover:bg-[#f9fafb]">10</button>
  
  <button class="p-2 rounded-lg border border-[#e5e7eb] hover:bg-[#f9fafb]">
    <ChevronRight class="w-5 h-5 text-[#627271]" />
  </button>
</div>
```

### Responsividade

| Breakpoint | Grid | Layout |
|------------|------|--------|
| **Mobile (< 640px)** | `grid-cols-1` | Cards empilhados, filtros em drawer |
| **Tablet (640px - 1023px)** | `grid-cols-2` | Cards em 2 colunas |
| **Desktop (>= 1024px)** | `grid-cols-3 xl:grid-cols-4` | Cards em 3-4 colunas |

---

## Tela 2: Perfil do Lojista

**Rota:** `/marketplace/lojista/[id]`  
**Objetivo:** Página pública do lojista com produtos e avaliações  
**Módulo:** Marketplace  
**Tipo:** Página pública (autenticada para comprar)

### Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│ [HEADER LOJISTA]                                                    │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ [Banner/Capa - 200px]                                           │ │
│ │ ┌──────┐                                                         │ │
│ │ │Logo  │ Nome da Loja                        ★ 4.8 (127)        │ │
│ │ │ 64px │ Localização                            89 vendas       │ │
│ │ └──────┘                                                         │ │
│ │ [Seguir] [Enviar Mensagem] [Denunciar]                           │ │
│ └─────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│ [TABS]                                                              │
│ │ Produtos (42) │ Avaliações (127) │ Sobre │                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  [FILTROS]                                                          │
│  Categoria: Todos ▼ | Ordenar: Mais recentes ▼                       │
│                                                                     │
│  [GRID DE PRODUTOS]                                                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐                   │
│  │  IMG    │ │  IMG    │ │  IMG    │ │  IMG    │                   │
│  │ R$ 299  │ │ R$ 89   │ │ R$ 149  │ │ R$ 199  │                   │
│  │ Nome    │ │ Nome    │ │ Nome    │ │ Nome    │                   │
│  │ ★ 4.5   │ │ ★ 4.8   │ │ ★ 4.2   │ │ ★ 4.9   │                   │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘                   │
│                                                                     │
│  [PAGINAÇÃO]                                                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Componentes

#### 1. Header do Lojista (Hero)

**Container:**
```html
<div class="bg-gradient-to-r from-[#3e5653] to-[#627271] text-white">
  <!-- Banner/Capa -->
  <div class="h-48 md:h-56 bg-[#1f2937] relative">
    <img 
      src="/banners/lojista-1.jpg" 
      alt="Banner" 
      class="w-full h-full object-cover opacity-50"
    />
  </div>
</div>
```

**Perfil Info:**
```html
<div class="max-w-7xl mx-auto px-6 -mt-16 relative">
  <div class="flex flex-col md:flex-row md:items-end gap-4">
    <!-- Logo -->
    <div class="w-32 h-32 rounded-2xl bg-white p-2 shadow-lg">
      <div class="w-full h-full rounded-xl bg-[#efefef] flex items-center justify-center overflow-hidden">
        <img 
          src="/logos/lojista-1.jpg" 
          alt="Logo" 
          class="w-full h-full object-cover"
        />
        <Store class="w-12 h-12 text-[#627271]" />
      </div>
    </div>
    
    <!-- Info -->
    <div class="flex-1">
      <div class="flex items-center gap-2 mb-1">
        <h1 class="text-2xl md:text-3xl font-bold text-white">Tech Solutions Ltda</h1>
        <BadgeCheck class="w-6 h-6 text-[#86cb92]" />
      </div>
      <p class="text-white/80 flex items-center gap-1">
        <MapPin class="w-4 h-4" />
        Suzano, São Paulo
      </p>
      <p class="text-white/60 text-sm mt-1">
        Joined em Janeiro 2024
      </p>
    </div>
    
    <!-- Stats -->
    <div class="flex items-center gap-6 text-white/90">
      <div class="text-center">
        <p class="text-2xl font-bold">4.8</p>
        <p class="text-xs text-white/60">★ 127 avaliações</p>
      </div>
      <div class="text-center">
        <p class="text-2xl font-bold">42</p>
        <p class="text-xs text-white/60">Produtos</p>
      </div>
      <div class="text-center">
        <p class="text-2xl font-bold">89</p>
        <p class="text-xs text-white/60">Vendas</p>
      </div>
    </div>
  </div>
  
  <!-- Ações -->
  <div class="flex flex-wrap gap-3 mt-6 pb-6">
    <button class="px-6 py-2.5 bg-[#86cb92] hover:bg-[#86cb92]/90 text-[#1f2937] font-semibold rounded-lg transition-all flex items-center gap-2">
      <ShoppingBag class="w-4 h-4" />
      Ver Produtos
    </button>
    <button class="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all flex items-center gap-2">
      <MessageCircle class="w-4 h-4" />
      Enviar Mensagem
    </button>
    <button class="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all flex items-center gap-2">
      <Heart class="w-4 h-4" />
      Seguir
    </button>
  </div>
</div>
```

#### 2. Tabs de Navegação

```html
<div class="border-b border-[#e5e7eb] bg-white mt-6">
  <div class="max-w-7xl mx-auto px-6">
    <nav class="flex gap-8">
      <button class="py-4 text-sm font-medium text-[#3e5653] border-b-2 border-[#3e5653] flex items-center gap-2">
        <Package class="w-4 h-4" />
        Produtos (42)
      </button>
      <button class="py-4 text-sm font-medium text-[#627271] hover:text-[#1f2937] transition-colors flex items-center gap-2">
        <Star class="w-4 h-4" />
        Avaliações (127)
      </button>
      <button class="py-4 text-sm font-medium text-[#627271] hover:text-[#1f2937] transition-colors flex items-center gap-2">
        <Info class="w-4 h-4" />
        Sobre
      </button>
    </nav>
  </div>
</div>
```

#### 3. Tab: Produtos

**Filtros:**
```html
<div class="flex flex-wrap items-center gap-3 mb-6">
  <select class="px-4 py-2 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#86cb92]">
    <option>Todas as categorias</option>
    <option>Eletrônicos</option>
    <option>Acessórios</option>
    <option>Periféricos</option>
  </select>
  
  <select class="px-4 py-2 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#86cb92]">
    <option>Mais recentes</option>
    <option>Menor preço</option>
    <option>Maior preço</option>
    <option>Mais vendidos</option>
  </select>
  
  <span class="text-sm text-[#627271] ml-auto">
    42 produtos encontrados
  </span>
</div>
```

#### 4. Card de Produto

**Container:**
```html
<div class="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden hover:shadow-lg hover:border-[#86cb92] transition-all duration-300 cursor-pointer group">
```

**Imagem:**
```html
<div class="aspect-square bg-[#efefef] relative overflow-hidden">
  <img 
    src="/produtos/produto-1.jpg" 
    alt="Produto" 
    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
  />
  <!-- Badge Promoção -->
  <span class="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
    -20%
  </span>
  <!-- Badge Frete -->
  <span class="absolute bottom-2 left-2 px-2 py-1 bg-[#86cb92] text-[#1f2937] text-xs font-medium rounded">
    Frete Grátis
  </span>
</div>
```

**Conteúdo:**
```html
<div class="p-4">
  <!-- Nome -->
  <h3 class="text-sm font-medium text-[#1f2937] line-clamp-2 mb-2">
    Notebook Dell Inspiron 15 8GB RAM 256GB SSD Intel Core i5
  </h3>
  
  <!-- Preço -->
  <div class="flex items-baseline gap-2 mb-2">
    <span class="text-xl font-bold text-[#3e5653]">R$ 2.499,00</span>
    <span class="text-sm text-[#627271] line-through">R$ 2.999,00</span>
  </div>
  
  <!-- Avaliação -->
  <div class="flex items-center gap-1 mb-2">
    <div class="flex items-center">
      <Star class="w-3 h-3 text-amber-400 fill-amber-400" />
      <Star class="w-3 h-3 text-amber-400 fill-amber-400" />
      <Star class="w-3 h-3 text-amber-400 fill-amber-400" />
      <Star class="w-3 h-3 text-amber-400 fill-amber-400" />
      <Star class="w-3 h-3 text-amber-400 fill-amber-400" />
    </div>
    <span class="text-xs text-[#627271]">(128)</span>
  </div>
  
  <!-- Vendas -->
  <p class="text-xs text-[#627271]">234 vendidos</p>
</div>
```

#### 5. Tab: Avaliações

**Header de Avaliação:**
```html
<div class="flex items-start gap-6 mb-8 p-6 bg-white rounded-xl border border-[#e5e7eb]">
  <!-- Nota Geral -->
  <div class="text-center">
    <p class="text-5xl font-bold text-[#1f2937]">4.8</p>
    <div class="flex items-center justify-center mt-2">
      <Star class="w-5 h-5 text-amber-400 fill-amber-400" />
      <Star class="w-5 h-5 text-amber-400 fill-amber-400" />
      <Star class="w-5 h-5 text-amber-400 fill-amber-400" />
      <Star class="w-5 h-5 text-amber-400 fill-amber-400" />
      <Star class="w-5 h-5 text-amber-400 fill-amber-400" />
    </div>
    <p class="text-sm text-[#627271] mt-1">127 avaliações</p>
  </div>
  
  <!-- Distribuição -->
  <div class="flex-1">
    <div class="space-y-2">
      <div class="flex items-center gap-3">
        <span class="text-sm text-[#627271] w-16">5 estrelas</span>
        <div class="flex-1 h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
          <div class="h-full bg-amber-400 rounded-full" style="width: 78%"></div>
        </div>
        <span class="text-sm text-[#627271] w-10">78%</span>
      </div>
      <!-- Repetir para 4, 3, 2, 1 estrelas -->
    </div>
  </div>
</div>
```

**Item de Avaliação:**
```html
<div class="border-b border-[#e5e7eb] pb-6 mb-6 last:border-0 last:pb-0">
  <!-- Header -->
  <div class="flex items-start justify-between mb-3">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-[#3e5653] flex items-center justify-center text-white font-bold">
        JO
      </div>
      <div>
        <p class="text-sm font-medium text-[#1f2937]">João Oliveira</p>
        <p class="text-xs text-[#627271]">Há 3 dias</p>
      </div>
    </div>
    <div class="flex items-center">
      <Star class="w-4 h-4 text-amber-400 fill-amber-400" />
      <Star class="w-4 h-4 text-amber-400 fill-amber-400" />
      <Star class="w-4 h-4 text-amber-400 fill-amber-400" />
      <Star class="w-4 h-4 text-amber-400 fill-amber-400" />
      <Star class="w-4 h-4 text-amber-400 fill-amber-400" />
    </div>
  </div>
  
  <!-- Título -->
  <p class="text-sm font-medium text-[#1f2937] mb-2">Excelente atendimento e produto!</p>
  
  <!-- Texto -->
  <p class="text-sm text-[#627271] mb-3">
    Comprei um notebook e chegou no prazo. Atendimento foi muito bom, responderam todas as dúvidas rapidamente.
  </p>
  
  <!-- Fotos (se houver) -->
  <div class="flex gap-2 mb-3">
    <div class="w-16 h-16 rounded-lg bg-[#efefef] overflow-hidden">
      <img src="/avaliacoes/foto-1.jpg" alt="Foto" class="w-full h-full object-cover" />
    </div>
    <div class="w-16 h-16 rounded-lg bg-[#efefef] overflow-hidden">
      <img src="/avaliacoes/foto-2.jpg" alt="Foto" class="w-full h-full object-cover" />
    </div>
  </div>
  
  <!-- Produto Avaliado -->
  <p class="text-xs text-[#627271]">
    Produto: <a href="#" class="text-[#3e5653] hover:underline">Notebook Dell Inspiron 15</a>
  </p>
</div>
```

#### 6. Tab: Sobre

```html
<div class="bg-white rounded-xl border border-[#e5e7eb] p-6">
  <h3 class="text-lg font-semibold text-[#1f2937] mb-4">Sobre a Loja</h3>
  
  <div class="prose prose-sm text-[#627271] mb-6">
    <p>
      A Tech Solutions é uma empresa especializada em tecnologia e informática, 
      oferecendo os melhores produtos de eletrônica e informática da região. 
      Com mais de 5 anos de experiência, garantimos qualidade e confiança em cada venda.
    </p>
  </div>
  
  <div class="grid grid-cols-2 gap-4">
    <div class="p-4 bg-[#f9fafb] rounded-lg">
      <p class="text-xs text-[#627271] mb-1">Telefone</p>
      <p class="text-sm font-medium text-[#1f2937]">(11) 99999-9999</p>
    </div>
    <div class="p-4 bg-[#f9fafb] rounded-lg">
      <p class="text-xs text-[#627271] mb-1">WhatsApp</p>
      <p class="text-sm font-medium text-[#1f2937]">(11) 99999-9999</p>
    </div>
    <div class="p-4 bg-[#f9fafb] rounded-lg">
      <p class="text-xs text-[#627271] mb-1">Horário</p>
      <p class="text-sm font-medium text-[#1f2937]">Seg-Sex: 9h às 18h</p>
    </div>
    <div class="p-4 bg-[#f9fafb] rounded-lg">
      <p class="text-xs text-[#627271] mb-1">CNPJ</p>
      <p class="text-sm font-medium text-[#1f2937]">12.345.678/0001-90</p>
    </div>
  </div>
</div>
```

---

## Tela 3: Painel do Lojista/Vendedor

**Rota:** `/marketplace/minha-loja`  
**Objetivo:** Dashboard do vendedor para gerenciar sua loja no marketplace  
**Módulo:** Marketplace  
**Tipo:** Página autenticada (requer ser lojista)

### Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│ [SIDEBAR]                       [HEADER] Minha Loja                 │
│                                                             [Perfil]│
├───────────┬───────────────────────────────────────────────────────┤
│           │  [MÉTRICAS]                                            │
│           │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐         │
│           │  │ Vendas  │ │Receita  │ │ Pedidos │ │Produtos│         │
│           │  │ R$12.4k │ │ hoje    │ │Pendente │ │Ativos  │         │
│           │  │ +15%    │ │ R$890   │ │ 5 novos │ │  42    │         │
│           │  └─────────┘ └─────────┘ └─────────┘ └─────────┘         │
│           │                                                       │
│           │  [TABS]                                                │
│           │  │ Produtos │ Pedidos │ Avaliações │ Configurações │   │
│           │                                                       │
│           │  ┌─────────────────────────────────────────────────┐   │
│           │  │ [SEARCH + FILTER]                    [+ Novo]   │   │
│           │  ├─────────────────────────────────────────────────┤   │
│           │  │ PRODUTO    │ PREÇO  │ ESTOQUE │ STATUS │ AÇÕES │   │
│           │  ├─────────────────────────────────────────────────┤   │
│           │  │ Notebook   │ 2499   │   12    │ Ativo  │ •••   │   │
│           │  │ Teclado    │ 189    │    8    │ Ativo  │ •••   │   │
│           │  │ Mouse      │  89    │   25    │ Pausado│ •••   │   │
│           │  └─────────────────────────────────────────────────┘   │
│           │                                                       │
│           │  [PAGINAÇÃO]                                           │
│           │                                                       │
└───────────┴───────────────────────────────────────────────────────┘
```

### Componentes

#### 1. Cards de Métricas

**Container:**
```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
```

**Card: Vendas do Mês:**
```html
<div class="bg-white rounded-xl p-6 border border-[#e5e7eb] shadow-sm hover:shadow-md transition-shadow">
  <div class="flex items-start justify-between">
    <div class="w-12 h-12 rounded-xl bg-[#86cb92]/20 flex items-center justify-center">
      <TrendingUp class="w-6 h-6 text-[#86cb92]" />
    </div>
    <span class="flex items-center gap-1 text-xs font-medium text-green-600">
      <ArrowUpRight class="w-3 h-3" />
      +15%
    </span>
  </div>
  <p class="text-2xl font-bold text-[#1f2937] mt-4">R$ 12.450</p>
  <p class="text-sm text-[#627271]">Vendas do mês</p>
</div>
```

**Card: Receita Hoje:**
```html
<div class="bg-white rounded-xl p-6 border border-[#e5e7eb] shadow-sm hover:shadow-md transition-shadow">
  <div class="flex items-start justify-between">
    <div class="w-12 h-12 rounded-xl bg-[#3e5653]/20 flex items-center justify-center">
      <Wallet class="w-6 h-6 text-[#3e5653]" />
    </div>
  </div>
  <p class="text-2xl font-bold text-[#1f2937] mt-4">R$ 890</p>
  <p class="text-sm text-[#627271]">Receita hoje</p>
</div>
```

**Card: Pedidos Pendentes:**
```html
<div class="bg-white rounded-xl p-6 border border-[#e5e7eb] shadow-sm hover:shadow-md transition-shadow">
  <div class="flex items-start justify-between">
    <div class="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
      <Clock class="w-6 h-6 text-amber-600" />
    </div>
    <span class="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
      5 novos
    </span>
  </div>
  <p class="text-2xl font-bold text-[#1f2937] mt-4">12</p>
  <p class="text-sm text-[#627271]">Pedidos pendentes</p>
</div>
```

**Card: Produtos Ativos:**
```html
<div class="bg-white rounded-xl p-6 border border-[#e5e7eb] shadow-sm hover:shadow-md transition-shadow">
  <div class="flex items-start justify-between">
    <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
      <Package class="w-6 h-6 text-blue-600" />
    </div>
  </div>
  <p class="text-2xl font-bold text-[#1f2937] mt-4">42</p>
  <p class="text-sm text-[#627271]">Produtos ativos</p>
</div>
```

#### 2. Tabs de Navegação

```html
<div class="border-b border-[#e5e7eb] bg-white rounded-t-xl">
  <nav class="flex">
    <button class="px-6 py-4 text-sm font-medium text-[#3e5653] border-b-2 border-[#3e5653] flex items-center gap-2">
      <Package class="w-4 h-4" />
      Produtos
    </button>
    <button class="px-6 py-4 text-sm font-medium text-[#627271] hover:text-[#1f2937] transition-colors flex items-center gap-2">
      <ShoppingBag class="w-4 h-4" />
      Pedidos
    </button>
    <button class="px-6 py-4 text-sm font-medium text-[#627271] hover:text-[#1f2937] transition-colors flex items-center gap-2">
      <Star class="w-4 h-4" />
      Avaliações
    </button>
    <button class="px-6 py-4 text-sm font-medium text-[#627271] hover:text-[#1f2937] transition-colors flex items-center gap-2">
      <Settings class="w-4 h-4" />
      Configurações
    </button>
  </nav>
</div>
```

#### 3. Tab: Produtos

**Toolbar:**
```html
<div class="bg-white rounded-b-xl border border-t-0 border-[#e5e7eb] p-4 mb-6">
  <div class="flex flex-wrap items-center gap-4">
    <!-- Busca -->
    <div class="relative flex-1 min-w-[200px]">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#627271]" />
      <input 
        type="text"
        placeholder="Buscar produtos..."
        class="w-full pl-10 pr-4 py-2 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#1f2937] placeholder-[#627271] focus:outline-none focus:ring-2 focus:ring-[#86cb92]"
      />
    </div>
    
    <!-- Filtro Status -->
    <select class="px-4 py-2 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#1f2937]">
      <option>Todos os status</option>
      <option>Ativos</option>
      <option>Pausados</option>
      <option>Sem estoque</option>
    </select>
    
    <!-- Botão Novo -->
    <button class="px-4 py-2 bg-[#3e5653] hover:bg-[#1f2937] text-white text-sm font-medium rounded-lg transition-all flex items-center gap-2">
      <Plus class="w-4 h-4" />
      Novo Produto
    </button>
  </div>
</div>
```

#### 4. Tabela de Produtos

**Container:**
```html
<div class="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden">
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead class="bg-[#f9fafb]">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-[#627271] uppercase tracking-wider">
            Produto
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-[#627271] uppercase tracking-wider">
            Preço
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-[#627271] uppercase tracking-wider">
            Estoque
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-[#627271] uppercase tracking-wider">
            Vendas
          </th>
          <th class="px-6 py-3 text-left text-xs font-medium text-[#627271] uppercase tracking-wider">
            Status
          </th>
          <th class="px-6 py-3 text-right text-xs font-medium text-[#627271] uppercase tracking-wider">
            Ações
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-[#e5e7eb]">
```

**Row de Produto:**
```html
<tr class="hover:bg-gray-50 transition-colors">
  <!-- Produto -->
  <td class="px-6 py-4">
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-lg bg-[#efefef] overflow-hidden flex-shrink-0">
        <img src="/produtos/1.jpg" alt="" class="w-full h-full object-cover" />
      </div>
      <div class="min-w-0">
        <p class="text-sm font-medium text-[#1f2937] truncate">Notebook Dell Inspiron 15</p>
        <p class="text-xs text-[#627271] truncate">SKU: NOTE-DELL-001</p>
      </div>
    </div>
  </td>
  
  <!-- Preço -->
  <td class="px-6 py-4">
    <p class="text-sm font-semibold text-[#1f2937]">R$ 2.499,00</p>
    <p class="text-xs text-[#627271]">Custo: R$ 1.800</p>
  </td>
  
  <!-- Estoque -->
  <td class="px-6 py-4">
    <p class="text-sm text-[#1f2937]">12 unidades</p>
    <p class="text-xs text-amber-600">Estoque baixo</p>
  </td>
  
  <!-- Vendas -->
  <td class="px-6 py-4">
    <p class="text-sm text-[#1f2937]">234 vendas</p>
  </td>
  
  <!-- Status -->
  <td class="px-6 py-4">
    <span class="px-2.5 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
      Ativo
    </span>
  </td>
  
  <!-- Ações -->
  <td class="px-6 py-4 text-right">
    <div class="flex items-center justify-end gap-2">
      <button class="p-2 hover:bg-[#e5e7eb] rounded-lg transition-colors" title="Editar">
        <Pencil class="w-4 h-4 text-[#627271]" />
      </button>
      <button class="p-2 hover:bg-[#e5e7eb] rounded-lg transition-colors" title="Duplicar">
        <Copy class="w-4 h-4 text-[#627271]" />
      </button>
      <button class="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
        <Trash2 class="w-4 h-4 text-red-500" />
      </button>
    </div>
  </td>
</tr>
```

**Status Badges:**
| Status | Classes |
|--------|---------|
| **Ativo** | `bg-green-100 text-green-700` |
| **Pausado** | `bg-amber-100 text-amber-700` |
| **Sem estoque** | `bg-red-100 text-red-700` |
| **Rascunho** | `bg-gray-100 text-gray-700` |

#### 5. Tab: Pedidos

**Toolbar:**
```html
<div class="bg-white rounded-b-xl border border-t-0 border-[#e5e7eb] p-4 mb-6">
  <div class="flex flex-wrap items-center gap-4">
    <!-- Busca -->
    <div class="relative flex-1 min-w-[200px]">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#627271]" />
      <input 
        type="text"
        placeholder="Buscar pedidos..."
        class="w-full pl-10 pr-4 py-2 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#1f2937] placeholder-[#627271] focus:outline-none focus:ring-2 focus:ring-[#86cb92]"
      />
    </div>
    
    <!-- Filtro Status -->
    <select class="px-4 py-2 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#1f2937]">
      <option>Todos os status</option>
      <option>Pendente</option>
      <option>Pago</option>
      <option>Enviado</option>
      <option>Entregue</option>
      <option>Cancelado</option>
    </select>
  </div>
</div>
```

**Card de Pedido:**
```html
<div class="bg-white rounded-xl border border-[#e5e7eb] p-6 mb-4 hover:shadow-md transition-shadow">
  <div class="flex flex-wrap items-start justify-between gap-4">
    <!-- Info -->
    <div>
      <div class="flex items-center gap-3 mb-2">
        <p class="text-sm font-semibold text-[#1f2937]">#PED-2024-0145</p>
        <span class="px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-700">
          Pendente
        </span>
      </div>
      <p class="text-sm text-[#627271]">Cliente: Maria Oliveira</p>
      <p class="text-sm text-[#627271]">Data: 21/03/2026 às 14:30</p>
    </div>
    
    <!-- Produtos -->
    <div class="flex items-center gap-2">
      <div class="w-10 h-10 rounded bg-[#efefef] overflow-hidden">
        <img src="/produtos/1.jpg" alt="" class="w-full h-full object-cover" />
      </div>
      <span class="text-sm text-[#627271]">+2 outros itens</span>
    </div>
    
    <!-- Total -->
    <div class="text-right">
      <p class="text-lg font-bold text-[#1f2937]">R$ 349,90</p>
      <p class="text-sm text-[#627271]">1 item</p>
    </div>
    
    <!-- Ações -->
    <div class="flex items-center gap-2">
      <button class="px-4 py-2 bg-[#3e5653] hover:bg-[#1f2937] text-white text-sm font-medium rounded-lg transition-all">
        Ver Detalhes
      </button>
    </div>
  </div>
</div>
```

#### 6. Tab: Avaliações

```html
<div class="bg-white rounded-xl border border-[#e5e7eb] p-6">
  <div class="flex items-start gap-6">
    <!-- Nota Geral -->
    <div class="text-center min-w-[100px]">
      <p class="text-5xl font-bold text-[#1f2937]">4.8</p>
      <div class="flex items-center justify-center mt-2">
        <Star class="w-5 h-5 text-amber-400 fill-amber-400" />
        <Star class="w-5 h-5 text-amber-400 fill-amber-400" />
        <Star class="w-5 h-5 text-amber-400 fill-amber-400" />
        <Star class="w-5 h-5 text-amber-400 fill-amber-400" />
        <Star class="w-5 h-5 text-amber-400 fill-amber-400" />
      </div>
      <p class="text-sm text-[#627271] mt-1">127 avaliações</p>
    </div>
    
    <!-- Responder -->
    <div class="flex-1">
      <div class="border-b border-[#e5e7eb] pb-4 mb-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-full bg-[#3e5653] flex items-center justify-center text-white text-xs font-bold">
            JO
          </div>
          <span class="text-sm font-medium text-[#1f2937]">João Oliveira</span>
          <span class="text-xs text-[#627271]">• Há 2 dias</span>
        </div>
        <p class="text-sm text-[#1f2937] mb-2">Excelente produto e atendimento!</p>
        <button class="text-sm text-[#3e5653] font-medium hover:underline flex items-center gap-1">
          <Reply class="w-4 h-4" />
          Responder
        </button>
      </div>
    </div>
  </div>
</div>
```

#### 7. Tab: Configurações

```html
<div class="space-y-6">
  <!-- Informações da Loja -->
  <div class="bg-white rounded-xl border border-[#e5e7eb] p-6">
    <h3 class="text-lg font-semibold text-[#1f2937] mb-4">Informações da Loja</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-2">Nome da Loja</label>
        <input 
          type="text"
          value="Tech Solutions Ltda"
          class="w-full px-4 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#86cb92]"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-2">CNPJ</label>
        <input 
          type="text"
          value="12.345.678/0001-90"
          disabled
          class="w-full px-4 py-3 rounded-lg border border-[#e5e7eb] bg-[#f9fafb] text-[#627271]"
        />
      </div>
      
      <div class="md:col-span-2">
        <label class="block text-sm font-medium text-[#1f2937] mb-2">Descrição</label>
        <textarea 
          rows="3"
          class="w-full px-4 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#86cb92]"
        >Empresa especializada em tecnologia e informática.</textarea>
      </div>
    </div>
    
    <button class="mt-6 px-6 py-3 bg-[#3e5653] hover:bg-[#1f2937] text-white font-medium rounded-lg transition-all">
      Salvar Alterações
    </button>
  </div>
  
  <!-- Logo e Banner -->
  <div class="bg-white rounded-xl border border-[#e5e7eb] p-6">
    <h3 class="text-lg font-semibold text-[#1f2937] mb-4">Logo e Banner</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Logo -->
      <div>
        <p class="text-sm font-medium text-[#1f2937] mb-2">Logo</p>
        <div class="border-2 border-dashed border-[#e5e7eb] rounded-xl p-8 text-center hover:border-[#86cb92] transition-colors cursor-pointer">
          <Upload class="w-8 h-8 text-[#627271] mx-auto mb-2" />
          <p class="text-sm text-[#627271]">Arraste ou clique para fazer upload</p>
          <p class="text-xs text-[#627271] mt-1">PNG, JPG ou SVG (máx. 2MB)</p>
        </div>
      </div>
      
      <!-- Banner -->
      <div>
        <p class="text-sm font-medium text-[#1f2937] mb-2">Banner</p>
        <div class="border-2 border-dashed border-[#e5e7eb] rounded-xl p-8 text-center hover:border-[#86cb92] transition-colors cursor-pointer">
          <Upload class="w-8 h-8 text-[#627271] mx-auto mb-2" />
          <p class="text-sm text-[#627271]">Arraste ou clique para fazer upload</p>
          <p class="text-xs text-[#627271] mt-1">PNG ou JPG (máx. 5MB)</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## Mock Data

### Tipos TypeScript

```typescript
// Tipos do Marketplace
export interface Seller {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  banner: string | null;
  description: string;
  location: {
    city: string;
    state: string;
  };
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
  customer: {
    name: string;
    email: string;
  };
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
  reply?: {
    content: string;
    createdAt: string;
  };
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
    customer: {
      name: 'Maria Oliveira',
      email: 'maria@email.com',
    },
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

## ✅ Checklist de Implementação

### Estrutura Base
- [ ] Criar diretório `app/(dashboard)/marketplace/`
- [ ] Criar diretório `app/(dashboard)/marketplace/lojista/[slug]/`
- [ ] Criar diretório `app/(dashboard)/marketplace/minha-loja/`
- [ ] Configurar rotas com layouts compartilhados

### Tela 1: Lista de Lojistas
- [ ] Header da página com título e busca
- [ ] Filtros: categoria, localização, avaliação, ordenação
- [ ] Grid responsivo de cards de lojistas
- [ ] Card de lojista com logo, nome, localização, rating, badges
- [ ] Estado loading com skeletons
- [ ] Estado vazio
- [ ] Paginação
- [ ] Responsividade mobile

### Tela 2: Perfil do Lojista
- [ ] Header com banner e informações do lojista
- [ ] Métricas: rating, vendas, produtos
- [ ] Botões de ação: ver produtos, mensagem, seguir
- [ ] Tabs: Produtos, Avaliações, Sobre
- [ ] Tab Produtos com grid de cards de produtos
- [ ] Tab Avaliações com distribuição e lista de avaliações
- [ ] Tab Sobre com informações da loja
- [ ] Responsividade

### Tela 3: Painel do Lojista
- [ ] Cards de métricas (vendas, receita, pedidos, produtos)
- [ ] Tabs: Produtos, Pedidos, Avaliações, Configurações
- [ ] Tab Produtos com toolbar e tabela
- [ ] Tab Pedidos com lista de cards
- [ ] Tab Avaliações com respostas
- [ ] Tab Configurações com formulários
- [ ] CRUD de produtos
- [ ] Upload de logo e banner
- [ ] Responsividade

### Componentes Reutilizáveis
- [ ] `<SellerCard>` - Card de lojista
- [ ] `<SellerHeader>` - Header do perfil
- [ ] `<ProductCard>` - Card de produto
- [ ] `<ProductTable>` - Tabela de produtos
- [ ] `<OrderCard>` - Card de pedido
- [ ] `<ReviewItem>` - Item de avaliação
- [ ] `<SellerMetrics>` - Métricas do vendedor
- [ ] `<StatusBadge>` - Badge de status

### Estados
- [ ] Implementar skeleton loading para todas as telas
- [ ] Implementar estado vazio com ilustração
- [ ] Implementar estado de erro com retry
- [ ] Implementar toast notifications

### Integrações
- [ ] Hook `useSellers()` - Listar lojistas
- [ ] Hook `useSeller(id)` - Detalhes do lojista
- [ ] Hook `useSellerProducts(sellerId)` - Produtos do lojista
- [ ] Hook `useSellerOrders()` - Pedidos do vendedor
- [ ] Hook `useSellerReviews()` - Avaliações
- [ ] Hook `useMyStore()` - Dados da própria loja
- [ ] Hook `useUpdateStore()` - Atualizar configurações
- [ ] Hook `useProductCrud()` - CRUD de produtos

### Acessibilidade
- [ ] Navegação por teclado nas tabs
- [ ] Focus visible em elementos interativos
- [ ] Roles ARIA apropriados
- [ ] Alt text em imagens
- [ ] Contraste adequado

### Performance
- [ ] Lazy loading de imagens
- [ ] Virtualização em listas grandes
- [ ] Memoização de componentes
- [ ] Code splitting por rota

---

## 📝 Changelog

| Versão | Data | Autor | Alterações |
|--------|------|-------|------------|
| 1.0.0 | 2026-03-21 | Frontend Team | Documentação inicial do Módulo 11 - Marketplace Multi-tenant |

---

**Documento gerado para UNIQ Empresas - Sprint 11: Marketplace UI**

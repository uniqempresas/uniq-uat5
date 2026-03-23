# 🎯 UNIQ Empresas - Documentação de UI/UX
## Módulo 12: Estoque (Sprint 12)

**Versão:** 1.0  
**Última atualização:** 21/03/2026  
**Módulo:** 12 - Estoque  
**Sprint:** 12 - Estoque UI  
**Status:** ⚠️ PLACEHOLDER (página criada, aguardando implementação completa)  
**Duração:** 1 semana  
**Responsável:** Frontend Team  
**Tema:** Modo Claro (Light Mode)

---

## 📋 Sumário

1. [Design System UNIQ - Estoque](#1-design-system-uniq---estoque)
2. [Tela 1: Dashboard de Estoque](#2-tela-1-dashboard-de-estoque)
3. [Tela 2: Lista de Produtos](#3-tela-2-lista-de-produtos)
4. [Tela 3: Entrada de Estoque](#4-tela-3-entrada-de-estoque)
5. [Tela 4: Categorias e Etiquetas](#5-tela-4-categorias-e-etiquetas)
6. [Mock Data (TypeScript)](#6-mock-data-typescript)
7. [Fluxo de Usuário](#7-fluxo-de-usuário)
8. [Regras de Negócio](#8-regras-de-negócio)
9. [Checklist de Aceitação Visual](#9-checklist-de-aceitação-visual)

---

## 1. Design System UNIQ - Estoque

### 1.1 Paleta de Cores

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
| **Estoque OK** | Emerald | `#86cb92` | Badge estoque OK |
| **Estoque Baixo** | Amber | `#f59e0b` | Badge estoque baixo |
| **Estoque Crítico** | Red | `#ef4444` | Badge estoque crítico |
| **Estoque Esgotado** | Red Dark | `#dc2626` | Badge sem estoque |
| **Entrada** | Green | `#22c55e` | Ícone entrada de estoque |
| **Saída** | Blue | `#3b82f6` | Ícone saída de estoque |

### 1.2 Tipografia

- **Fonte:** Poppins (Google Fonts)
- **Importação:** `https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap`

**Hierarquia:**

| Elemento | Tamanho | Peso | Cor |
|----------|---------|------|-----|
| H1 | `text-2xl` | `font-bold` (700) | `#1f2937` |
| H2 | `text-xl` | `font-semibold` (600) | `#1f2937` |
| H3 | `text-lg` | `font-semibold` (600) | `#1f2937` |
| Body | `text-sm` | `font-normal` (400) | `#1f2937` |
| Caption | `text-xs` | `font-normal` (400) | `#627271` |
| Label | `text-sm` | `font-medium` (500) | `#1f2937` |
| Badge | `text-xs` | `font-medium` (500) | Variável |
| SKU/Code | `text-xs` | `font-mono` (400) | `#627271` |
| Metric Value | `text-3xl` | `font-bold` (700) | `#1f2937` |
| Stock Counter | `text-2xl` | `font-bold` (700) | Variável |

### 1.3 Espaçamentos (8pt Grid)

| Elemento | Valor Tailwind |
|----------|---------------|
| Container padding | `p-6` |
| Card padding | `p-5` |
| Card gap | `gap-4` |
| Section gap | `gap-6` |
| Button padding | `px-4 py-2` |
| Input padding | `px-3 py-2` |
| Tabela cell padding | `px-4 py-3` |

### 1.4 Sombras e Bordas

| Elemento | Classes Tailwind |
|----------|-----------------|
| Card | `bg-white rounded-xl shadow-sm border border-gray-200` |
| Card Hover | `hover:shadow-md transition-shadow duration-200` |
| Card Métrica | `bg-white rounded-xl shadow-sm border border-gray-200 p-5` |
| Button Primário | `bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors` |
| Button Secundário | `bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50` |
| Button Danger | `bg-red-600 text-white rounded-lg hover:bg-red-700` |
| Button Success | `bg-[#86cb92] text-white rounded-lg hover:bg-green-600` |
| Input | `border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent` |
| Badge OK | `bg-green-100 text-green-700` |
| Badge Warning | `bg-yellow-100 text-yellow-700` |
| Badge Critical | `bg-red-100 text-red-700` |
| Upload Zone | `border-2 border-dashed border-gray-300 rounded-xl hover:border-[#86cb92] hover:bg-[#86cb92]/5` |

### 1.5 Estados de Estoque - Cores e Ícones

| Status | Cor | Ícone | Background | Classes Tailwind |
|--------|-----|-------|------------|-----------------|
| **Estoque OK** | Verde `#86cb92` | `CheckCircle` | `bg-green-100` | `text-green-600 bg-green-100` |
| **Estoque Baixo** | Amarelo `#f59e0b` | `AlertTriangle` | `bg-yellow-100` | `text-yellow-600 bg-yellow-100` |
| **Estoque Crítico** | Vermelho `#ef4444` | `AlertOctagon` | `bg-red-100` | `text-red-600 bg-red-100` |
| **Sem Estoque** | Vermelho `#dc2626` | `XCircle` | `bg-red-100` | `text-red-700 bg-red-100` |
| **Entrada** | Verde `#22c55e` | `ArrowDownLeft` | `bg-green-50` | `text-green-600` |
| **Saída** | Azul `#3b82f6` | `ArrowUpRight` | `bg-blue-50` | `text-blue-600` |
| **Ajuste** | Cinza `#627271` | `RefreshCw` | `bg-gray-100` | `text-gray-600` |

---

## 2. Tela 1: Dashboard de Estoque

**Rota:** `/estoque`  
**Objetivo:** Visão geral do estoque, métricas principais, alertas e movimentações  
**Módulo:** Estoque (Sprint 12)  
**Tipo:** Página autenticada

### 2.1 Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ SIDEBAR ESCURA                               │ HEADER: Estoque - Dashboard              │
│                                               │ [+ Novo Produto ▼]                      │
│ • Dashboard                                   ├─────────────────────────────────────────┤
│ • Produtos                                   │                                          │
│ • Entrada/Saída                             │ [Cards de Métricas - Grid 4 colunas]     │
│ • Movimentações                             │ ┌────────┐ ┌────────┐ ┌────────┐ ┌─────┐ │
│ • Categorias                                │ │Total   │ │Valor   │ │Estoque│ │Sem  │ │
│ • Fornecedores                              │ │124     │ │R$ 45K  │ │Baixo  │ │Estq │ │
│ • Etiquetas                                │ │Produtos│ │Estoque │ │8      │ │3    │ │
│ • Relatórios                                │ └────────┘ └────────┘ └────────┘ └─────┘ │
│                                               │                                          │
│                                               │ [Alertas de Estoque]                     │
│                                               │ ┌──────────────────────────────────────┐ │
│                                               │ │ Camiseta UNIQ  5un  10min  [Baixo] │ │
│                                               │ │ Mouse Gamer    2un  15min  [Crítico]│ │
│                                               │ └──────────────────────────────────────┘ │
│                                               │                                          │
│                                               │ [Gráfico Giro]        │ [Ações Rápidas] │
│                                               │ [7d|30d|3m]         │ [+ Novo]        │
│                                               │ ████████ Produto X   │ [↓ Entrada CSV] │
│                                               │ ██████ Produto Y     │ [📋 Inventário] │
│                                               │ ████ Produto Z       │ [📊 Relatórios] │
└───────────────────────────────────────────────┴─────────────────────────────────────────┘
```

### 2.2 Componentes

#### 2.2.1 Cards de Métricas (Grid 4 colunas)

**Card 1: Total de Produtos**

```tsx
<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
  <div className="flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-[#627271] mb-1">Total de Produtos</p>
      <h3 className="text-2xl font-bold text-[#1f2937]">124</h3>
      <p className="text-xs text-[#627271] mt-2">Cadastrados</p>
    </div>
    <div className="w-12 h-12 rounded-xl bg-[#86cb92]/20 flex items-center justify-center">
      <Package className="w-6 h-6 text-[#86cb92]" />
    </div>
  </div>
</div>
```

**Card 2: Valor em Estoque**

```tsx
<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
  <div className="flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-[#627271] mb-1">Valor em Estoque</p>
      <h3 className="text-2xl font-bold text-[#1f2937]">R$ 45.230,00</h3>
      <p className="text-xs text-[#627271] mt-2">Custo Total</p>
    </div>
    <div className="w-12 h-12 rounded-xl bg-[#3e5653]/20 flex items-center justify-center">
      <DollarSign className="w-6 h-6 text-[#3e5653]" />
    </div>
  </div>
</div>
```

**Card 3: Estoque Baixo**

```tsx
<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
  <div className="flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-[#627271] mb-1">Estoque Baixo</p>
      <h3 className="text-2xl font-bold text-[#f59e0b]">8</h3>
      <div className="flex items-center gap-1 mt-2">
        <AlertTriangle className="w-3 h-3 text-[#f59e0b]" />
        <span className="text-xs text-[#f59e0b] font-medium">Atenção necessária</span>
      </div>
    </div>
    <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
      <AlertTriangle className="w-6 h-6 text-yellow-600" />
    </div>
  </div>
</div>
```

**Card 4: Produtos sem Estoque**

```tsx
<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 border-l-4 border-l-red-500 hover:shadow-md transition-shadow">
  <div className="flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-[#627271] mb-1">Produtos sem Estoque</p>
      <h3 className="text-2xl font-bold text-[#ef4444]">3</h3>
      <div className="flex items-center gap-1 mt-2">
        <XCircle className="w-3 h-3 text-[#ef4444]" />
        <span className="text-xs text-[#ef4444] font-medium">Esgotados</span>
      </div>
    </div>
    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
      <XCircle className="w-6 h-6 text-red-600" />
    </div>
  </div>
</div>
```

#### 2.2.2 Lista de Alertas de Estoque

```tsx
<div className="bg-white rounded-xl shadow-sm border border-gray-200">
  <div className="p-5 border-b border-gray-200 flex items-center justify-between">
    <div>
      <h3 className="font-semibold text-[#1f2937]">Alertas de Estoque</h3>
      <p className="text-sm text-[#627271]">Produtos que precisam de atenção</p>
    </div>
    <button className="text-[#3e5653] text-sm font-medium hover:underline flex items-center gap-1">
      Ver todos
      <ArrowRight className="w-4 h-4" />
    </button>
  </div>
  
  <div className="divide-y divide-gray-100">
    {/* Item Estoque Baixo */}
    <div className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
        <img src="/api/placeholder/48/48" alt="Produto" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-[#1f2937] truncate">Teclado Mecânico RGB</h4>
        <p className="text-xs text-[#627271]">SKU: TEC-RGB-001</p>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-[#1f2937]">5 un</p>
        <p className="text-xs text-[#627271]">Atual</p>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-[#1f2937]">10 un</p>
        <p className="text-xs text-[#627271]">Mínimo</p>
      </div>
      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
        Baixo
      </span>
      <div className="flex gap-2">
        <button className="px-3 py-1.5 bg-[#3e5653] text-white text-sm rounded-lg hover:bg-[#1f2937] transition-colors">
          Comprar
        </button>
        <button className="p-1.5 text-[#627271] hover:text-[#1f2937] hover:bg-gray-100 rounded-lg">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
    
    {/* Item Estoque Crítico */}
    <div className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
        <img src="/api/placeholder/48/48" alt="Produto" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-[#1f2937] truncate">Mouse Gamer Pro</h4>
        <p className="text-xs text-[#627271]">SKU: MOU-PRO-002</p>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-[#ef4444]">2 un</p>
        <p className="text-xs text-[#627271]">Atual</p>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-[#1f2937]">15 un</p>
        <p className="text-xs text-[#627271]">Mínimo</p>
      </div>
      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
        Crítico
      </span>
      <div className="flex gap-2">
        <button className="px-3 py-1.5 bg-[#ef4444] text-white text-sm rounded-lg hover:bg-red-700 transition-colors">
          Comprar
        </button>
        <button className="p-1.5 text-[#627271] hover:text-[#1f2937] hover:bg-gray-100 rounded-lg">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</div>
```

#### 2.2.3 Gráfico de Giro de Estoque

```tsx
<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
  <div className="flex items-center justify-between mb-6">
    <div>
      <h3 className="font-semibold text-[#1f2937]">Giro de Estoque</h3>
      <p className="text-sm text-[#627271]">Produtos mais vendidos (Top 5)</p>
    </div>
    <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
      <button className="px-3 py-1 text-xs font-medium rounded-md bg-white text-[#1f2937] shadow-sm">7d</button>
      <button className="px-3 py-1 text-xs font-medium rounded-md text-[#627271] hover:text-[#1f2937]">30d</button>
      <button className="px-3 py-1 text-xs font-medium rounded-md text-[#627271] hover:text-[#1f2937]">3m</button>
    </div>
  </div>
  
  <div className="space-y-4">
    <div className="flex items-center gap-4">
      <span className="w-32 text-sm text-[#627271] truncate">Teclado Mecânico RGB</span>
      <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-[#86cb92] rounded-full" style={{ width: '92%' }}></div>
      </div>
      <span className="w-12 text-sm font-medium text-[#1f2937] text-right">92</span>
    </div>
    
    <div className="flex items-center gap-4">
      <span className="w-32 text-sm text-[#627271] truncate">Mouse Gamer Pro</span>
      <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-[#86cb92]/80 rounded-full" style={{ width: '78%' }}></div>
      </div>
      <span className="w-12 text-sm font-medium text-[#1f2937] text-right">78</span>
    </div>
  </div>
</div>
```

#### 2.2.4 Card Ações Rápidas

```tsx
<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
  <h3 className="font-semibold text-[#1f2937] mb-4">Ações Rápidas</h3>
  
  <div className="space-y-2">
    <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors">
      <Plus className="w-5 h-5" />
      <span className="font-medium">Novo Produto</span>
    </button>
    
    <button className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 text-[#1f2937] rounded-lg hover:bg-gray-50 transition-colors">
      <Upload className="w-5 h-5 text-[#627271]" />
      <span className="font-medium">Entrada em Massa (CSV)</span>
    </button>
    
    <button className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 text-[#1f2937] rounded-lg hover:bg-gray-50 transition-colors">
      <ClipboardList className="w-5 h-5 text-[#627271]" />
      <span className="font-medium">Inventário</span>
    </button>
    
    <button className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 text-[#1f2937] rounded-lg hover:bg-gray-50 transition-colors">
      <BarChart3 className="w-5 h-5 text-[#627271]" />
      <span className="font-medium">Relatórios</span>
    </button>
  </div>
</div>
```

---

## 3. Tela 2: Lista de Produtos

**Rota:** `/estoque/produtos`  
**Objetivo:** Listar, filtrar e buscar produtos no estoque  
**Módulo:** Estoque (Sprint 12)

### 3.1 Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ HEADER: Produtos                                    [+ Novo Produto] [Filtros] [Grid] [📋] │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│ [🔍 Buscar produtos...                      ] [Categoria ▼] [Status ▼] [⋮ Mais Filtros] │
│                                                                                         │
│ ┌─────────────────────────────────────────────────────────────────────────────────────┐ │
│ │                                                                                     │ │
│ │  PRODUTO              │ ESTOQUE      │ PREÇO          │ STATUS       │ AÇÕES        │ │
│ │  ──────────────────────────────────────────────────────────────────────────────────  │ │
│ │  📷 Teclado RGB       │ 45 un 🟢    │ R$ 299,00      │ ● Ativo      │ [✏️] [👁]  │ │
│ │     SKU: TEC-001      │ ● OK        │                 │              │              │ │
│ │  ──────────────────────────────────────────────────────────────────────────────────  │ │
│ │  📷 Mouse Gamer       │ 12 un 🟡    │ R$ 199,00      │ ● Ativo      │ [✏️] [👁]  │ │
│ │     SKU: MOU-002       │ ● Baixo     │                 │              │              │ │
│ │  ──────────────────────────────────────────────────────────────────────────────────  │ │
│ │  📷 Monitor 24"        │ 0 un 🔴     │ R$ 1.299,00    │ ○ Inativo    │ [✏️] [👁]  │ │
│ │     SKU: MON-003       │ ● Esgotado  │                 │              │              │ │
│ │                                                                                     │ │
│ └─────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                         │
│ Mostrando 1-20 de 124 produtos     [<] [1] [2] [3] [4] [>]                          │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Componentes

#### 3.2.1 Barra de Busca e Filtros

```tsx
<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
  <div className="flex flex-wrap items-center gap-3">
    <div className="relative flex-1 min-w-[200px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#627271]" />
      <input 
        type="text" 
        placeholder="Buscar por nome, SKU ou código..."
        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
      />
    </div>
    
    <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#86cb92] focus:border-transparent">
      <option>Todas as categorias</option>
      <option>Eletrônicos</option>
      <option>Acessórios</option>
    </select>
    
    <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#86cb92] focus:border-transparent">
      <option>Todos os status</option>
      <option>Ativos</option>
      <option>Inativos</option>
    </select>
    
    <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
      <SlidersHorizontal className="w-4 h-4" />
      <span>Mais Filtros</span>
    </button>
  </div>
</div>
```

#### 3.2.2 Card de Produto (Grid View)

```tsx
<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
  <div className="relative aspect-square bg-gray-100 overflow-hidden">
    <img src="/api/placeholder/300/300" alt="Produto" className="w-full h-full object-cover" />
    
    <div className="absolute top-3 right-3">
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
        <CheckCircle className="w-3 h-3" />
        Em estoque
      </span>
    </div>
  </div>
  
  <div className="p-4">
    <h3 className="font-semibold text-[#1f2937] truncate">Teclado Mecânico RGB</h3>
    <p className="text-xs text-[#627271] mb-2">SKU: TEC-RGB-001</p>
    
    <div className="flex items-center gap-2 mb-3">
      <Package className="w-4 h-4 text-[#627271]" />
      <span className="text-sm font-medium text-[#1f2937]">45 unidades</span>
    </div>
    
    <div className="flex items-center justify-between mb-3">
      <span className="text-lg font-bold text-[#3e5653]">R$ 299,00</span>
    </div>
    
    <div className="flex gap-2">
      <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#3e5653] text-white text-sm rounded-lg hover:bg-[#1f2937] transition-colors">
        <Edit className="w-4 h-4" />
        Editar
      </button>
      <button className="flex items-center justify-center px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
        <Eye className="w-4 h-4 text-[#627271]" />
      </button>
    </div>
  </div>
</div>
```

#### 3.2.3 Tabela de Produtos (List View)

```tsx
<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-[#f9fafb] border-b border-gray-200">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-medium text-[#627271] uppercase tracking-wider">Produto</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-[#627271] uppercase tracking-wider">SKU</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-[#627271] uppercase tracking-wider">Estoque</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-[#627271] uppercase tracking-wider">Preço</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-[#627271] uppercase tracking-wider">Status</th>
          <th className="px-4 py-3 text-right text-xs font-medium text-[#627271] uppercase tracking-wider">Ações</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        <tr className="hover:bg-gray-50 transition-colors">
          <td className="px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <img src="/api/placeholder/40/40" alt="" className="w-8 h-8 rounded object-cover" />
              </div>
              <span className="font-medium text-[#1f2937]">Teclado Mecânico RGB</span>
            </div>
          </td>
          <td className="px-4 py-3 text-sm font-mono text-[#627271]">TEC-RGB-001</td>
          <td className="px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#1f2937]">45 un</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                OK
              </span>
            </div>
          </td>
          <td className="px-4 py-3 text-sm font-medium text-[#1f2937]">R$ 299,00</td>
          <td className="px-4 py-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
              Ativo
            </span>
          </td>
          <td className="px-4 py-3 text-right">
            <div className="flex items-center justify-end gap-1">
              <button className="p-2 text-[#627271] hover:text-[#3e5653] hover:bg-gray-100 rounded-lg">
                <Edit className="w-4 h-4" />
              </button>
              <button className="p-2 text-[#627271] hover:text-[#3e5653] hover:bg-gray-100 rounded-lg">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-2 text-[#627271] hover:text-red-600 hover:bg-red-50 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

---

## 4. Tela 3: Entrada de Estoque

**Rota:** `/estoque/entrada`  
**Objetivo:** Registrar entrada manual ou em massa de produtos  
**Módulo:** Estoque (Sprint 12)

### 4.1 Layout - Entrada Manual

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ HEADER: Nova Entrada de Estoque                                     [Salvar] [Cancelar] │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│ ┌─────────────────────────────────────────────────────────────────────────────────────┐ │
│ │  PRODUTO                                                                         │ │
│ │                                                                                     │ │
│ │  Buscar Produto:                                                                  │ │
│ │  [🔍 Digite nome, SKU ou código de barras...                               ]     │ │
│ │                                                                                     │ │
│ │  Produto Selecionado:                                                              │ │
│ │  ┌───────────────────────────────────────────────────────────────────────────┐     │ │
│ │  │ 📷 Teclado Mecânico RGB                                                     │     │ │
│ │  │ SKU: TEC-RGB-001  │  Estoque Atual: 45 un  │  Última Compra: R$ 180,00     │     │ │
│ │  └───────────────────────────────────────────────────────────────────────────┘     │ │
│ └─────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                         │
│ ┌───────────────────────┐ ┌───────────────────────┐ ┌───────────────────────┐         │
│ │  QUANTIDADE *        │ │  CUSTO UNITÁRIO *     │ │  TOTAL                │         │
│ │                       │ │                       │ │                       │         │
│ │  [    50     ]       │ │  [R$ 185,00   ]       │ │  R$ 9.250,00         │         │
│ │  unidades             │ │                       │ │                       │         │
│ └───────────────────────┘ └───────────────────────┘ └───────────────────────┘         │
│                                                                                         │
│ ┌─────────────────────────────────────────────────────────────────────────────────────┐ │
│ │  MOTIVO *                                                                          │ │
│ │  [Compra                          ▼]                                               │ │
│ │                                                                                     │ │
│ │  COMPRA        - Compra de fornecedor                                              │ │
│ │  DEVOLUÇÃO     - Devolução de cliente                                              │ │
│ │  TRANSFERÊNCIA - Transferência entre lojas                                          │ │
│ │  AJUSTE        - Ajuste de inventário                                             │ │
│ └─────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                         │
│ ┌─────────────────────────────────────────────────────────────────────────────────────┐ │
│ │  DADOS DA NOTA FISCAL (Opcional)                                                   │ │
│ │                                                                                     │ │
│ │  Número NF: [________]   Data: [________]   Série: [___]                          │ │
│ │                                                                                     │ │
│ │  Observações:                                                                       │ │
│ │  [___________________________________________________________________________]    │ │
│ └─────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Layout - Entrada em Massa (Wizard)

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ HEADER: Entrada em Massa via CSV                    [Baixar Modelo] [Ajuda]             │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  ●───◯───◯───◯                                                                          │
│  1      2      3      4                                                                  │
│ Upload Valida Preview Confirma                                                           │
│                                                                                         │
│ ┌─────────────────────────────────────────────────────────────────────────────────────┐ │
│ │  ETAPA 1: UPLOAD DO ARQUIVO                                                        │ │
│ │                                                                                     │ │
│ │  ┌─────────────────────────────────────────────────────────────────────────────┐   │ │
│ │  │                                                                             │   │ │
│ │  │                    ┌─────────────────┐                                        │   │ │
│ │  │                    │                 │                                        │   │ │
│ │  │                    │    [📁]        │                                        │   │ │
│ │  │                    │                 │                                        │   │ │
│ │  │                    │  Arraste seu    │                                        │   │ │
│ │  │                    │  arquivo aqui   │                                        │   │ │
│ │  │                    │                 │                                        │   │ │
│ │  │                    └─────────────────┘                                        │   │ │
│ │  │                                                                             │   │ │
│ │  │  Formatos: CSV, XLS, XLSX    Tamanho máximo: 10MB                             │   │ │
│ │  └─────────────────────────────────────────────────────────────────────────────┘   │ │
│ │                                                                                     │ │
│ │  ┌─────────────────────────────────────────────────────────────────────────────┐   │ │
│ │  │  📄 entrada_estoque.xlsx              2.4 MB    [✕ Remover]                  │   │ │
│ │  │  ✅ 1.247 linhas detectadas                                                    │   │ │
│ │  └─────────────────────────────────────────────────────────────────────────────┘   │ │
│ │                                                                                     │ │
│ │                                              [Voltar]    [Validar Arquivo →]       │ │
│ └─────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Componentes

#### 4.3.1 Formulário de Entrada Manual

```tsx
<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
  {/* Buscar Produto */}
  <div>
    <label className="block text-sm font-medium text-[#1f2937] mb-2">
      Buscar Produto <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#627271]" />
      <input 
        type="text" 
        placeholder="Digite nome, SKU ou código de barras..."
        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
      />
    </div>
  </div>
  
  {/* Grid de Campos */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div>
      <label className="block text-sm font-medium text-[#1f2937] mb-2">
        Quantidade <span className="text-red-500">*</span>
      </label>
      <input 
        type="number" 
        min="1"
        placeholder="0"
        className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
      />
    </div>
    
    <div>
      <label className="block text-sm font-medium text-[#1f2937] mb-2">
        Custo Unitário <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#627271]">R$</span>
        <input 
          type="number" 
          step="0.01"
          min="0"
          placeholder="0,00"
          className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
        />
      </div>
    </div>
    
    <div>
      <label className="block text-sm font-medium text-[#627271] mb-2">Total</label>
      <div className="px-3 py-3 bg-gray-50 rounded-lg">
        <span className="text-xl font-bold text-[#1f2937]">R$ 0,00</span>
      </div>
    </div>
  </div>
  
  {/* Motivo */}
  <div>
    <label className="block text-sm font-medium text-[#1f2937] mb-2">
      Motivo <span className="text-red-500">*</span>
    </label>
    <select className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent">
      <option value="">Selecione...</option>
      <option value="compra">Compra</option>
      <option value="devolucao">Devolução</option>
      <option value="transferencia">Transferência</option>
      <option value="ajuste">Ajuste de Inventário</option>
    </select>
  </div>
</div>
```

#### 4.3.2 Área de Upload CSV

```tsx
<div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-[#86cb92] hover:bg-[#86cb92]/5 transition-all cursor-pointer">
  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#efefef] flex items-center justify-center">
    <Upload className="w-8 h-8 text-[#627271]" />
  </div>
  <p className="text-lg font-medium text-[#1f2937] mb-1">Arraste seu arquivo aqui</p>
  <p className="text-sm text-[#627271] mb-4">ou clique para selecionar</p>
  <p className="text-xs text-[#627271]">CSV, XLS, XLSX até 10MB</p>
  <input type="file" accept=".csv,.xls,.xlsx" className="hidden" />
</div>
```

#### 4.3.3 Indicador de Progresso (Wizard)

```tsx
<div className="flex items-center justify-center gap-2">
  {/* Passo 1 - Completo */}
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-full bg-[#86cb92] flex items-center justify-center text-white text-sm font-medium">✓</div>
    <span className="text-sm font-medium text-[#86cb92]">Upload</span>
  </div>
  <div className="w-12 h-0.5 bg-[#86cb92]"></div>
  
  {/* Passo 2 - Ativo */}
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-full bg-[#3e5653] flex items-center justify-center text-white text-sm font-medium">2</div>
    <span className="text-sm font-medium text-[#3e5653]">Valida</span>
  </div>
  <div className="w-12 h-0.5 bg-[#e5e7eb]"></div>
  
  {/* Passo 3 - Pendente */}
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-full bg-[#e5e7eb] flex items-center justify-center text-[#627271] text-sm font-medium">3</div>
    <span className="text-sm text-[#627271]">Preview</span>
  </div>
  <div className="w-12 h-0.5 bg-[#e5e7eb]"></div>
  
  {/* Passo 4 - Pendente */}
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-full bg-[#e5e7eb] flex items-center justify-center text-[#627271] text-sm font-medium">4</div>
    <span className="text-sm text-[#627271]">Confirma</span>
  </div>
</div>
```

---

## 5. Tela 4: Categorias e Etiquetas

**Rota:** `/estoque/categorias`  
**Rota:** `/estoque/etiquetas`  
**Objetivo:** Gerenciar categorias hierárquicas e gerar etiquetas com códigos de barras  
**Módulo:** Estoque (Sprint 12)

### 5.1 Layout - Categorias (Árvore Hierárquica)

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ HEADER: Categorias de Produtos                         [+ Nova Categoria]              │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│ [🔍 Buscar categorias...              ] [Status: Todas ▼] [Nível: Todos ▼] [📋] [⊞]   │
│                                                                                         │
│ ┌─────────────────────────────────────────────────────────────────────────────────────┐ │
│ │  ÁRVORE DE CATEGORIAS                                                             │ │
│ │                                                                                     │ │
│ │  ▼ 📁 Eletrônicos                                                   [👁] [✏️] [🗑️] │
│ │    ├─ ▶ 📂 Celulares e Smartphones                                 [👁] [✏️] [🗑️]  │
│ │    ├─ ▼ 📂 Computadores                                           [👁] [✏️] [🗑️]  │
│ │    │   ├─ 💻 Notebooks                                             [👁] [✏️] [🗑️]  │
│ │    │   ├─ 🖥️ Desktop                                               [👁] [✏️] [🗑️]  │
│ │    │   └─ ⌨️ Acessórios                                            [👁] [✏️] [🗑️]  │
│ │    └─ ▶ 📂 Áudio e Vídeo                                          [👁] [✏️] [🗑️]  │
│ │                                                                                     │ │
│ │  ▶ 📁 Moda e Acessórios                                      [👁] [✏️] [🗑️]   │
│ │  ▶ 📁 Casa e Decoração                                        [👁] [✏️] [🗑️]   │
│ │  ▶ 📁 Esporte e Lazer                                          [👁] [✏️] [🗑️]   │
│ │                                                                                     │ │
│ └─────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                         │
│ Total: 12 categorias  │  Página 1 de 1                                                 │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Layout - Gerador de Etiquetas

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ HEADER: Geração de Etiquetas                                                          │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│ ┌─────────────────────────────────────────────────────────────────────────────────────┐ │
│ │  ETAPA 1: SELECIONAR PRODUTOS                                                        │ │
│ │                                                                                     │ │
│ │  Modo: (●) Por Produto  ( ) Por Categoria  ( ) Importar Lista                       │ │
│ │                                                                                     │ │
│ │  [🔍 Buscar produto...              ]  [Categoria: Todas ▼]  [Aplicar]             │ │
│ │                                                                                     │ │
│ │  ┌─────────────────────────────────────────────────────────────────────────────┐   │ │
│ │  │ ☑ │ Imagem │ Produto              │ SKU       │ Estoque │ Qtd Etq │ [+][-] │   │ │
│ │  │ ───────────────────────────────────────────────────────────────────────────── │   │ │
│ │  │ ☑ │  [📷]  │ iPhone 15 Pro Max   │ IP15PM    │ 45 un   │ [  2  ] │ [+] [-]│   │ │
│ │  │ ☑ │  [📷]  │ Samsung Galaxy S24  │ SG24      │ 32 un   │ [  1  ] │ [+] [-]│   │ │
│ │  │ ☐ │  [📷]  │ MacBook Air M3      │ MBA-M3    │ 18 un   │ [  0  ] │ [+] [-]│   │ │
│ │  │ ☑ │  [📷]  │ Mouse MX Master 3S    │ MXM-3S    │ 67 un   │ [  5  ] │ [+] [-]│   │ │
│ │  └─────────────────────────────────────────────────────────────────────────────┘   │ │
│ │                                                                                     │ │
│ │  Selecionados: 3 produtos  │  Total de etiquetas: 8                                │ │
│ └─────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                         │
│ ┌─────────────────────────────────────────────────────────────────────────────────────┐ │
│ │  ETAPA 2: CONFIGURAR ETIQUETA                                                        │ │
│ │                                                                                     │ │
│ │  Template:                                                                           │ │
│ │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐                  │ │
│ │  │ ┌─────┐ │  │ ┌─────┐ │  │       │ │  │       │ │  │ ┌───┐   │                  │ │
│ │  │ │▓▓▓▓▓│ │  │ │▓▓▓▓▓│ │  │▓▓▓▓▓▓▓▓▓│ │  │ Nome  │ │  │ │▓▓▓│   │                  │ │
│ │  │ │Código│ │  │ │Nome  │ │  │Código │ │  │ Preço │ │  │ └───┘   │                  │ │
│ │  │ │      │ │  │ │Código│ │  │ └─────┘ │  │Código│ │  │ Padrão  │                  │ │
│ │  │ │40x30 │ │  │ │60x40 │ │  │ Térmica│ │  │50x30 │ │  │ 30x20  │                  │ │
│ │  │ │  ◉   │ │  │ │  ○   │ │  │  ○     │ │  │  ○   │ │  │   ○    │                  │ │
│ │  └─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────┘                  │ │
│ │                                                                                     │ │
│ │  Informações: ☑ Código Barras  ☑ Nome  ☑ SKU  ☑ Preço                              │ │
│ │  Formato: (●) EAN-13  ( ) CODE128  ( ) QR Code                                     │ │
│ └─────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                         │
│ ┌─────────────────────────────────────────────────────────────────────────────────────┐ │
│ │  ETAPA 3: PRÉVIA E IMPRESSÃO                                                        │ │
│ │                                                                                     │ │
│ │  Impressora: [Zebra ZD420                           ▼]  [⚙️ Config]              │ │
│ │  Status: 🟢 Pronta                                                                      │ │
│ │                                                                                     │ │
│ │  [🖨️ Imprimir]  [💾 Salvar PDF]  [👁 Prévia]                                      │ │
│ └─────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### 5.3 Componentes

#### 5.3.1 Item de Categoria (Árvore)

```tsx
<div className="category-item">
  <div className="flex items-center py-3 px-4 hover:bg-[#efefef] rounded-lg group">
    <button className="mr-2 text-[#627271] hover:text-[#3e5653]">
      <ChevronRight className="w-5 h-5 transform rotate-90" />
    </button>
    <div className="flex items-center flex-1">
      <div className="w-10 h-10 rounded-lg bg-[#86cb92]/20 flex items-center justify-center mr-3">
        <img src="/icons/category.svg" className="w-6 h-6" alt=""/>
      </div>
      <div>
        <span className="font-medium text-[#1f2937]">Eletrônicos</span>
        <span className="ml-2 px-2 py-0.5 text-xs bg-[#22c55e]/10 text-[#22c55e] rounded-full">Ativo</span>
      </div>
    </div>
    <div className="flex items-center gap-4 text-sm text-[#627271]">
      <span>3 subcategorias</span>
      <span>245 produtos</span>
    </div>
    <div className="flex items-center gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <button className="p-1.5 text-[#627271] hover:text-[#3e5653] hover:bg-[#e5e7eb] rounded" title="Ver">
        <Eye className="w-4 h-4" />
      </button>
      <button className="p-1.5 text-[#627271] hover:text-[#3e5653] hover:bg-[#e5e7eb] rounded" title="Editar">
        <Edit className="w-4 h-4" />
      </button>
      <button className="p-1.5 text-[#627271] hover:text-[#ef4444] hover:bg-[#ef4444]/10 rounded" title="Excluir">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  </div>
  
  {/* Subcategorias com indentação */}
  <div className="ml-8 border-l-2 border-[#e5e7eb]">
    <div className="ml-4">
      <div className="flex items-center py-2 px-4 hover:bg-[#efefef] rounded-lg group">
        <button className="mr-2 text-[#627271]">
          <ChevronRight className="w-4 h-4" />
        </button>
        <span className="text-[#1f2937]">Celulares e Smartphones</span>
        <span className="ml-auto text-sm text-[#627271]">89 produtos</span>
      </div>
    </div>
  </div>
</div>
```

#### 5.3.2 Template de Etiqueta

```tsx
<div className="relative group cursor-pointer">
  <div className="border-2 border-[#86cb92] rounded-lg p-4 bg-white hover:shadow-lg transition-all">
    {/* Visualização da Etiqueta */}
    <div className="w-full aspect-[4/3] bg-white border border-[#e5e7eb] rounded mb-3 p-2 flex flex-col items-center justify-center">
      <div className="w-full h-8 bg-[#1f2937] mb-2 rounded-sm"></div>
      <div className="text-xs text-[#627271]">789123456789</div>
      <div className="text-[10px] text-[#1f2937] mt-1 font-medium">Produto</div>
      <div className="text-[10px] text-[#627271]">R$ 99,99</div>
    </div>
    <p className="text-sm font-medium text-center text-[#1f2937]">Padrão 40x30</p>
    <p className="text-xs text-center text-[#627271]">40mm × 30mm</p>
  </div>
  {/* Indicador de Seleção */}
  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#86cb92] rounded-full flex items-center justify-center">
    <Check className="w-4 h-4 text-white" />
  </div>
</div>
```

#### 5.3.3 Prévia de Código de Barras

```tsx
<div className="bg-white border border-[#e5e7eb] rounded-lg p-4 text-center">
  <svg className="w-full h-16" viewBox="0 0 200 50">
    {/* Barras EAN-13 simplificado */}
    <rect x="10" y="5" width="2" height="40" fill="#1f2937"/>
    <rect x="14" y="5" width="1" height="40" fill="#1f2937"/>
    <rect x="18" y="5" width="3" height="40" fill="#1f2937"/>
    <rect x="24" y="5" width="1" height="40" fill="#1f2937"/>
    <rect x="28" y="5" width="2" height="40" fill="#1f2937"/>
    <rect x="33" y="5" width="1" height="40" fill="#1f2937"/>
    <rect x="37" y="5" width="3" height="40" fill="#1f2937"/>
    <rect x="43" y="5" width="2" height="40" fill="#1f2937"/>
    <rect x="48" y="5" width="1" height="40" fill="#1f2937"/>
    <rect x="52" y="5" width="3" height="40" fill="#1f2937"/>
    <rect x="58" y="5" width="1" height="40" fill="#1f2937"/>
    <rect x="62" y="5" width="2" height="40" fill="#1f2937"/>
  </svg>
  <p className="text-xs text-[#627271] mt-2 tracking-widest font-mono">7 891234 567890</p>
</div>
```

---

## 6. Mock Data (TypeScript)

```typescript
// Tipos
export interface Product {
  id: string;
  name: string;
  sku: string;
  barcode?: string;
  category: Category;
  stock: number;
  minStock: number;
  maxStock?: number;
  cost: number;
  price: number;
  images: string[];
  status: 'active' | 'inactive';
  stockStatus: 'ok' | 'low' | 'critical' | 'out';
  variations?: ProductVariation[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariation {
  id: string;
  productId: string;
  sku: string;
  attributes: Record<string, string>;
  stock: number;
  minStock: number;
  price: number;
  cost: number;
  isActive: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  image?: string;
  productCount: number;
  children?: Category[];
  isActive: boolean;
}

export interface StockMovement {
  id: string;
  productId: string;
  variationId?: string;
  type: 'entry' | 'exit' | 'adjustment';
  quantity: number;
  cost: number;
  reason: string;
  reference?: string;
  notes?: string;
  userId: string;
  createdAt: string;
}

export interface StockAlert {
  id: string;
  productId: string;
  type: 'low' | 'critical' | 'out';
  currentStock: number;
  minStock: number;
  createdAt: string;
}

// Mock Data - Produtos
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Teclado Mecânico RGB',
    sku: 'TEC-RGB-001',
    barcode: '7891234567890',
    category: { id: '1', name: 'Periféricos', slug: 'perifericos', productCount: 45, isActive: true },
    stock: 45,
    minStock: 10,
    cost: 180,
    price: 299,
    images: ['/products/teclado-1.jpg'],
    status: 'active',
    stockStatus: 'ok',
    createdAt: '2026-01-15T10:30:00Z',
    updatedAt: '2026-03-20T14:22:00Z',
  },
  {
    id: '2',
    name: 'Mouse Gamer Pro',
    sku: 'MOU-PRO-002',
    barcode: '7891234567891',
    category: { id: '1', name: 'Periféricos', slug: 'perifericos', productCount: 45, isActive: true },
    stock: 8,
    minStock: 15,
    cost: 120,
    price: 199,
    images: ['/products/mouse-1.jpg'],
    status: 'active',
    stockStatus: 'low',
    createdAt: '2026-01-10T09:00:00Z',
    updatedAt: '2026-03-18T11:45:00Z',
  },
  {
    id: '3',
    name: 'Monitor 24" Full HD',
    sku: 'MON-24-003',
    barcode: '7891234567892',
    category: { id: '2', name: 'Monitores', slug: 'monitores', productCount: 23, isActive: true },
    stock: 0,
    minStock: 5,
    cost: 850,
    price: 1299,
    images: ['/products/monitor-1.jpg'],
    status: 'inactive',
    stockStatus: 'out',
    createdAt: '2026-01-05T08:15:00Z',
    updatedAt: '2026-03-15T16:30:00Z',
  },
  {
    id: '4',
    name: 'Webcam HD 1080p',
    sku: 'WEB-HD-004',
    barcode: '7891234567893',
    category: { id: '3', name: 'Câmeras', slug: 'cameras', productCount: 12, isActive: true },
    stock: 2,
    minStock: 10,
    cost: 150,
    price: 299,
    images: ['/products/webcam-1.jpg'],
    status: 'active',
    stockStatus: 'critical',
    createdAt: '2026-02-01T14:00:00Z',
    updatedAt: '2026-03-19T09:10:00Z',
  },
];

// Mock Data - Categorias
export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Eletrônicos',
    slug: 'eletronicos',
    productCount: 245,
    isActive: true,
    children: [
      { id: '1-1', name: 'Celulares', slug: 'celulares', parentId: '1', productCount: 89, isActive: true },
      { id: '1-2', name: 'Computadores', slug: 'computadores', parentId: '1', productCount: 156, isActive: true },
    ],
  },
  {
    id: '2',
    name: 'Periféricos',
    slug: 'perifericos',
    productCount: 45,
    isActive: true,
  },
  {
    id: '3',
    name: 'Acessórios',
    slug: 'acessorios',
    productCount: 78,
    isActive: true,
  },
];

// Mock Data - Movimentações
export const mockMovements: StockMovement[] = [
  {
    id: '1',
    productId: '1',
    type: 'entry',
    quantity: 50,
    cost: 185,
    reason: 'Compra',
    reference: 'NF #4521',
    userId: 'user-1',
    createdAt: '2026-03-20T14:30:00Z',
  },
  {
    id: '2',
    productId: '2',
    type: 'exit',
    quantity: 5,
    cost: 120,
    reason: 'Venda',
    userId: 'user-1',
    createdAt: '2026-03-20T10:15:00Z',
  },
  {
    id: '3',
    productId: '4',
    type: 'adjustment',
    quantity: -3,
    cost: 150,
    reason: 'Ajuste de inventário',
    notes: 'Produtos danificados',
    userId: 'user-1',
    createdAt: '2026-03-19T16:00:00Z',
  },
];

// Mock Data - Alertas
export const mockAlerts: StockAlert[] = [
  {
    id: '1',
    productId: '2',
    type: 'low',
    currentStock: 8,
    minStock: 15,
    createdAt: '2026-03-20T08:00:00Z',
  },
  {
    id: '2',
    productId: '4',
    type: 'critical',
    currentStock: 2,
    minStock: 10,
    createdAt: '2026-03-20T08:00:00Z',
  },
  {
    id: '3',
    productId: '3',
    type: 'out',
    currentStock: 0,
    minStock: 5,
    createdAt: '2026-03-15T08:00:00Z',
  },
];

// Mock Data - Métricas Dashboard
export const mockStockMetrics = {
  totalProducts: 124,
  totalValue: 45230.00,
  lowStock: 8,
  outOfStock: 3,
  entriesThisMonth: 156,
  exitsThisMonth: 89,
  topProducts: [
    { id: '1', name: 'Teclado Mecânico RGB', sold: 45 },
    { id: '2', name: 'Mouse Gamer Pro', sold: 32 },
    { id: '5', name: 'Headset Bluetooth', sold: 28 },
    { id: '6', name: 'Mousepad XL', sold: 24 },
    { id: '7', name: 'Hub USB 4 Portas', sold: 18 },
  ],
};
```

---

## 7. Fluxo de Usuário

### 7.1 Fluxo Principal: Gerenciar Estoque

```
┌─────────────────┐
│   Dashboard     │
│   (/estoque)    │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           MENU DE ESTOQUE                                  │
├─────────────────┬─────────────────┬─────────────────┬─────────────────────────┤
│    PRODUTOS     │   ENTRADA      │   CATEGORIAS   │      ETIQUETAS         │
│  (/estoque/     │   (/estoque/   │  (/estoque/    │    (/estoque/          │
│   produtos)     │   entrada)     │   categorias)   │     etiquetas)         │
└────────┬────────┴────────┬────────┴────────┬────────┴────────┬────────┘
         │                 │                 │                 │
         ▼                 ▼                 ▼                 ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  • Listar       │ │  • Entrada      │ │  • Criar        │ │  • Selecionar  │
│  • Buscar       │ │    Manual       │ │    Categoria    │ │    Produtos     │
│  • Filtrar      │ │  • Entrada      │ │  • Editar       │ │  • Template     │
│  • Editar       │ │    CSV          │ │  • Excluir      │ │  • Preview      │
│  • Visualizar   │ │  • Validar      │ │  • Árvore       │ │  • Imprimir     │
└────────┬────────┘ └────────┬────────┘ └────────┬────────┘ └────────┬────────┘
         │                 │                 │                 │
         └────────┬────────┘                 └────────┬────────┘
                  │                                    │
                  ▼                                    ▼
         ┌─────────────────┐                ┌─────────────────┐
         │   Modal/Page    │                │   Modal/Page    │
         │   Detalhes      │                │   Etiqueta      │
         │   Produto       │                │   Preview       │
         └─────────────────┘                └─────────────────┘
```

### 7.2 Fluxo: Entrada em Massa (CSV)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        WIZARD DE ENTRADA EM MASSA                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ● ─── ○ ─── ○ ─── ○                                                        │
│  1      2      3      4                                                   │
│ Upload Valida Preview Confirma                                              │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  1. UPLOAD                                                              │ │
│  │     • Upload arquivo CSV/XLS/XLSX                                       │ │
│  │     • Mapear colunas                                                   │ │
│  │     • Baixar template                                                   │ │
│  │                                                                              │ │
│  │                                        [Baixar Modelo] [Validar →]            │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                     │                                          │
│                                     ▼                                          │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  2. VALIDAÇÃO                                                           │ │
│  │     • Mostrar erros                                                     │ │
│  │     • Mostrar novos produtos                                             │ │
│  │     • Permitir correção                                                  │ │
│  │                                                                              │ │
│  │  Resumo: 1.180 válidos | 22 novos | 3 erros                               │ │
│  │                                                                              │ │
│  │  [Voltar]                                            [Preview →]           │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                     │                                          │
│                                     ▼                                          │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  3. PREVIEW                                                              │ │
│  │     • Mostrar impacto no estoque                                         │ │
│  │     • Configurações adicionais                                            │ │
│  │                                                                              │ │
│  │  Config: ☑ Gerar etiquetas  ☐ Atualizar preço venda                      │ │
│  │                                                                              │ │
│  │  [Voltar]                                          [Confirmar →]           │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                     │                                          │
│                                     ▼                                          │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  4. CONFIRMAÇÃO                                                        │ │
│  │     • Processando...                                                     │ │
│  │     • Resultado                                                          │ │
│  │     • Comprovante                                                       │ │
│  │                                                                              │ │
│  │  ✅ 1.180 produtos atualizados                                           │ │
│  │  ✅ 22 produtos criados                                                   │ │
│  │                                                                              │ │
│  │                                   [Nova Entrada] [Ver Estoque]              │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 7.3 Fluxo: Gerar Etiquetas

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        GERADOR DE ETIQUETAS                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  ETAPA 1: SELECIONAR PRODUTOS                                         │ │
│  │                                                                            │ │
│  │  Modo: Por Produto | Por Categoria | Importar Lista                      │ │
│  │  ↓                                                                              │ │
│  │  ┌─────────────────────────────────────────────────────────────────────┐ │ │
│  │  │ ☑ iPhone 15 Pro Max     │ Qtd: [2]    │ Total: 2 etiquetas        │ │ │
│  │  │ ☑ Samsung Galaxy S24     │ Qtd: [1]    │                           │ │ │
│  │  │ ☐ MacBook Air M3        │ Qtd: [0]    │ Selecionados: 2          │ │ │
│  │  └─────────────────────────────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                     │                                          │
│                                     ▼                                          │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  ETAPA 2: CONFIGURAR TEMPLATE                                           │ │
│  │                                                                            │ │
│  │  Templates: [40x30] [60x40] [Térmica] [50x30] [30x20]                    │ │
│  │  ↓                                                                              │ │
│  │  Informações: ☑ Código  ☑ Nome  ☑ SKU  ☑ Preço                          │ │
│  │  Formato: EAN-13 | CODE128 | QR Code                                     │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                     │                                          │
│                                     ▼                                          │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  ETAPA 3: PRÉVIA E IMPRESSÃO                                           │ │
│  │                                                                            │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐                               │ │
│  │  │ ▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓ │  ... 3 etiquetas            │ │
│  │  │iPhone 15│  │Samsung   │  │iPhone 15 │                               │ │
│  │  │R$8999,00│  │R$5499,00│  │R$8999,00│                               │ │
│  │  └──────────┘  └──────────┘  └──────────┘                               │ │
│  │                                                                            │ │
│  │  Impressora: Zebra ZD420 🟢                                              │ │
│  │                                                                            │ │
│  │  [🖨️ Imprimir]  [💾 PDF]  [👁 Prévia]                                      │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Regras de Negócio

### 8.1 RN-EST-001: Dashboard
| Regra | Descrição | Implementação |
|-------|-----------|---------------|
| RN-EST-001 | Cards de métricas devem atualizar em tempo real | WebSocket ou polling a cada 30s |
| RN-EST-002 | Alertas de estoque ordenados por criticidade | Crítico > Baixo > OK |
| RN-EST-003 | Gráfico de giro mostra apenas produtos com vendas | Filtro: quantidade_vendida > 0 |

### 8.2 RN-EST-002: Produtos
| Regra | Descrição | Implementação |
|-------|-----------|---------------|
| RN-EST-004 | Grid padrão exibe 24 produtos por página | Paginação com limit 24 |
| RN-EST-005 | Filtros combinam com operador AND | Múltiplos filtros simultâneos |
| RN-EST-006 | Busca em nome, SKU e código de barras | Full-text search nos 3 campos |
| RN-EST-007 | SKU deve ser único no sistema | Validação backend + debounce |
| RN-EST-008 | Margem calculada automaticamente | (Preço - Custo) / Preço × 100 |

### 8.3 RN-EST-003: Entrada de Estoque
| Regra | Descrição | Implementação |
|-------|-----------|---------------|
| RN-EST-009 | Movimentações são imutáveis após criação | Sem edição, apenas visualização |
| RN-EST-010 | Entrada atualiza custo médio ponderado | ((EA×CA) + (Q×CN)) / (EA+Q) |
| RN-EST-011 | Arquivo CSV máximo 10.000 linhas | Validação frontend + backend |
| RN-EST-012 | Quantidade deve ser número positivo | Validação no campo |

### 8.4 RN-EST-004: Categorias
| Regra | Descrição | Implementação |
|-------|-----------|---------------|
| RN-EST-013 | Máximo 5 níveis de profundidade | Validação no formulário |
| RN-EST-014 | Slug único em toda hierarquia | Auto-gerado + sufixo numérico |
| RN-EST-015 | Categoria com produtos não pode ser excluída | Apenas inativada |

### 8.5 RN-EST-005: Etiquetas
| Regra | Descrição | Implementação |
|-------|-----------|---------------|
| RN-EST-016 | EAN-13 gerado automaticamente se não informado | Prefixo 789 + número |
| RN-EST-017 | Máximo 500 etiquetas por vez | Fila de impressão |
| RN-EST-018 | Suporte a Zebra (ZPL) e PDF | Geração dual format |

---

## 9. Checklist de Aceitação Visual

### 9.1 Dashboard de Estoque
- [ ] Cards de métricas exibem valores corretos com ícones coloridos
- [ ] Card "Estoque Baixo" usa cor amarela (#f59e0b)
- [ ] Card "Sem Estoque" usa cor vermelha (#ef4444) e borda esquerda
- [ ] Lista de alertas ordenados por criticidade
- [ ] Gráfico de giro com filtros de período funcionais
- [ ] Botões de ações rápidas com ícones Lucide
- [ ] Responsividade mobile (cards empilhados)
- [ ] Skeleton de loading nos cards

### 9.2 Lista de Produtos
- [ ] Busca em tempo real com debounce
- [ ] Filtros funcionais (categoria, status)
- [ ] Toggle entre Grid e Lista
- [ ] Badges de status de estoque coloridos
- [ ] Hover effect nos cards (shadow + translate)
- [ ] Paginação funcional
- [ ] Estado vazio quando não há produtos

### 9.3 Entrada de Estoque
- [ ] Formulário de entrada manual com validações
- [ ] Cálculo automático do total
- [ ] Wizard de entrada CSV com 4 etapas
- [ ] Upload de arquivo com drag-and-drop
- [ ] Preview de validação com erros destacados
- [ ] Indicador de progresso visual
- [ ] Toast de sucesso/erro

### 9.4 Categorias
- [ ] Árvore hierárquica com expand/collapse
- [ ] Indicadores de subcategorias e contagem de produtos
- [ ] Modal de criação com validações
- [ ] Upload de imagem com preview
- [ ] Select hierárquico de categoria pai
- [ ] Badges de status (ativo/inativo)

### 9.5 Etiquetas
- [ ] Seleção de produtos com quantidade
- [ ] Templates visuais de etiquetas
- [ ] Preview em tempo real
- [ ] Suporte a EAN-13, CODE128 e QR Code
- [ ] Configuração de impressora
- [ ] Exportação para PDF
- [ ] Impressão direta (ZPL)

### 9.6 Estados Gerais
- [ ] Loading skeleton em todas as telas
- [ ] Estado vazio com ilustração e CTA
- [ ] Erro state com mensagem e retry
- [ ] Toast notifications para feedback
- [ ] Confirmação para ações destrutivas

### 9.7 Responsividade
| Breakpoint | Layout |
|------------|--------|
| **Mobile (< 640px)** | 1 coluna, drawer sidebar, cards empilhados |
| **Tablet (640-1024px)** | 2 colunas, sidebar colapsada |
| **Desktop (> 1024px)** | Layout completo, 4 colunas métricas |

---

## 📌 Notas de Implementação

### Ícones Lucide React
```tsx
import {
  Package, DollarSign, AlertTriangle, XCircle, CheckCircle,
  Plus, Search, Filter, SlidersHorizontal, Edit, Eye, Trash2,
  ArrowDownLeft, ArrowUpRight, ArrowRight, RefreshCw, Upload,
  Download, ClipboardList, BarChart3, ChevronRight, MoreHorizontal,
  MoreVertical, Check, Settings, Printer, FileText, QrCode
} from 'lucide-react';
```

### Cores Customizadas Tailwind
```javascript
// tailwind.config.js
colors: {
  uniq: {
    platinum: '#efefef',
    white: '#ffffff',
    sidebar: '#1f2937',
    primary: '#3e5653',
    hover: '#1f2937',
    accent: '#86cb92',
    text: '#1f2937',
    muted: '#627271',
    border: '#e5e7eb',
  }
}
```

### Estrutura de Arquivos Sugerida
```
app/
├── estoque/
│   ├── page.tsx                    # Dashboard
│   ├── layout.tsx                  # Layout com sidebar
│   ├── produtos/
│   │   ├── page.tsx               # Lista de produtos
│   │   ├── [id]/page.tsx         # Detalhes do produto
│   │   └── novo/page.tsx         # Novo produto
│   ├── entrada/
│   │   ├── page.tsx              # Entrada manual
│   │   └── massa/page.tsx       # Entrada em massa
│   ├── categorias/
│   │   └── page.tsx              # Gerenciar categorias
│   ├── etiquetas/
│   │   └── page.tsx              # Gerador de etiquetas
│   └── components/
│       ├── ProductCard.tsx
│       ├── ProductTable.tsx
│       ├── StockMetrics.tsx
│       ├── StockAlerts.tsx
│       ├── CategoryTree.tsx
│       ├── LabelGenerator.tsx
│       └── StockMovementForm.tsx
```

---

**Documento versionado. Última atualização: 21/03/2026**
**Sprint 12 - Estoque UI**

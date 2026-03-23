# Módulo 04: Financeiro - Categorias Financeiras

## Metadados

| Atributo | Valor |
|----------|-------|
| **Módulo** | Financeiro |
| **Submódulo** | Categorias Financeiras |
| **Código** | MOD-FIN-CAT-001 |
| **Versão** | 1.0.0 |
| **Status** | Especificação |
| **Responsável** | Frontend Team |
| **Última Atualização** | 2026-03-12 |
| **Dependências** | MOD-FIN-001 |

---

## 1. Design System

### 1.1 Paleta de Cores

| Token | Valor HEX | Uso |
|-------|-----------|-----|
| `--bg-primary` | `#efefef` | Fundo principal |
| `--bg-card` | `#ffffff` | Fundo de cards e modais |
| `--sidebar-bg` | `#1f2937` | Fundo da sidebar |
| `--btn-primary` | `#3e5653` | Botões primários |
| `--btn-primary-hover` | `#1f2937` | Hover de botões |
| `--accent` | `#86cb92` | Destaques, badges receita |
| `--text-primary` | `#1f2937` | Texto principal |
| `--text-secondary` | `#627271` | Texto secundário |
| `--border` | `#e5e7eb` | Bordas e divisores |
| `--category-receita` | `#86cb92` | Categorias de receita |
| `--category-despesa` | `#ef4444` | Categorias de despesa |
| `--category-transferencia` | `#3b82f6` | Transferências |
| `--category-investimento` | `#8b5cf6` | Investimentos |

### 1.2 Tipografia

| Elemento | Fonte | Tamanho | Peso | Cor |
|----------|-------|---------|------|-----|
| Título Página | Poppins | 24px (text-2xl) | 700 | `#1f2937` |
| Card Título | Poppins | 16px (text-base) | 600 | `#1f2937` |
| Nome Categoria | Poppins | 14px (text-sm) | 500 | `#1f2937` |
| Descrição | Poppins | 12px (text-xs) | 400 | `#627271` |
| Badge | Poppins | 11px (text-xs) | 500 | Variável |

### 1.3 Espaçamentos

| Elemento | Valor Tailwind |
|----------|----------------|
| Container padding | `p-6` |
| Card padding | `p-5` |
| Grid gap categorias | `gap-4` |
| Ícone container | `w-12 h-12` |
| Section margin | `mb-6` |

---

## 2. Tela: Listagem de Categorias (/financeiro/categorias)

### 2.1 Estrutura do Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar #1f2937]                                                                   │
│ ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] Categorias Financeiras              [+ Nova Categoria]                 │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Tabs: Todas | Receitas | Despesas | Transferências | Investimentos]           │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Filtros]                                                                       │ │
│ │ [Buscar... 🔍] [Tipo: Todos ▼] [Status: Ativas ▼]        [Visualização: Grid|Lista]│ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Grid de Categorias]                                                            │ │
│ │ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ │ │
│ │ │ [🏠]            │ │ [🛒]            │ │ [💰]            │ │ [📊]            │ │ │
│ │ │ Aluguel         │ │ Compras         │ │ Vendas          │ │ Investimentos   │ │ │
│ │ │ #ef4444         │ │ #f59e0b         │ │ #86cb92         │ │ #8b5cf6         │ │ │
│ │ │ Despesa         │ │ Despesa         │ │ Receita         │ │ Investimento    │ │ │
│ │ │ 45 mov.         │ │ 128 mov.        │ │ 89 mov.         │ │ 12 mov.         │ │ │
│ │ │ R$ 2.500/mês    │ │ R$ 8.900/mês    │ │ R$ 15.400/mês   │ │ R$ 2.000/mês    │ │ │
│ │ │ [✏️] [🗑️]       │ │ [✏️] [🗑️]       │ │ [✏️] [🗑️]       │ │ [✏️] [🗑️]       │ │ │
│ │ └─────────────────┘ └─────────────────┘ └─────────────────┘ └─────────────────┘ │ │
│ │                                                                                 │ │
│ │ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ │ │
│ │ │ [⚡]            │ │ [📱]            │ │ [🚗]            │ │ [📈]            │ │ │
│ │ │ Energia         │ │ Internet        │ │ Transporte      │ │ Marketing       │ │ │
│ │ │ #f97316         │ │ #06b6d4         │ │ #84cc16         │ │ #ec4899         │ │ │
│ │ │ ...             │ │ ...             │ │ ...             │ │ ...             │ │ │
│ │ └─────────────────┘ └─────────────────┘ └─────────────────┘ └─────────────────┘ │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Resumo Lateral]                                                                │ │
│ │ ┌───────────────┐                                                               │ │
│ │ │ Total: 32     │                                                               │ │
│ │ │               │                                                               │ │
│ │ │ Receitas: 8   │                                                               │ │
│ │ │ Despesas: 18  │                                                               │ │
│ │ │ Transfer: 3   │                                                               │ │
│ │ │ Invest: 3     │                                                               │ │
│ │ └───────────────┘                                                               │ │
│ └─────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Componentes

#### 2.2.1 Header da Página

```html
<header class="bg-white border-b border-gray-200 px-6 py-4">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-[#1f2937]">Categorias Financeiras</h1>
      <p class="text-sm text-[#627271]">Organize suas receitas e despesas por categorias</p>
    </div>
    <button class="flex items-center gap-2 px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors">
      <Plus class="w-4 h-4" />
      Nova Categoria
    </button>
  </div>
</header>
```

#### 2.2.2 Tabs de Tipo

```html
<div class="bg-white border-b border-gray-200 px-6">
  <div class="flex gap-1">
    <button class="tab-active px-4 py-3 text-sm font-medium text-[#3e5653] border-b-2 border-[#3e5653]">
      Todas
      <span class="ml-1.5 px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">32</span>
    </button>
    <button class="px-4 py-3 text-sm font-medium text-[#627271] hover:text-[#1f2937] transition-colors">
      <ArrowDownLeft class="w-4 h-4 inline mr-1 text-[#86cb92]" />
      Receitas
      <span class="ml-1.5 px-1.5 py-0.5 bg-green-100 text-green-600 rounded text-xs">8</span>
    </button>
    <button class="px-4 py-3 text-sm font-medium text-[#627271] hover:text-[#1f2937] transition-colors">
      <ArrowUpRight class="w-4 h-4 inline mr-1 text-red-500" />
      Despesas
      <span class="ml-1.5 px-1.5 py-0.5 bg-red-100 text-red-600 rounded text-xs">18</span>
    </button>
    <button class="px-4 py-3 text-sm font-medium text-[#627271] hover:text-[#1f2937] transition-colors">
      <ArrowLeftRight class="w-4 h-4 inline mr-1 text-blue-500" />
      Transferências
      <span class="ml-1.5 px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded text-xs">3</span>
    </button>
    <button class="px-4 py-3 text-sm font-medium text-[#627271] hover:text-[#1f2937] transition-colors">
      <TrendingUp class="w-4 h-4 inline mr-1 text-purple-500" />
      Investimentos
      <span class="ml-1.5 px-1.5 py-0.5 bg-purple-100 text-purple-600 rounded text-xs">3</span>
    </button>
  </div>
</div>
```

#### 2.2.3 Barra de Filtros

```html
<div class="bg-white border-b border-gray-200 px-6 py-4">
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <!-- Busca -->
      <div class="relative">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          type="text" 
          placeholder="Buscar categoria..."
          class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64 focus:ring-2 focus:ring-[#86cb92]"
        />
      </div>
      
      <!-- Filtro Tipo -->
      <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#86cb92]">
        <option value="">Todos os tipos</option>
        <option value="receita">Receita</option>
        <option value="despesa">Despesa</option>
        <option value="transferencia">Transferência</option>
        <option value="investimento">Investimento</option>
      </select>
      
      <!-- Filtro Status -->
      <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#86cb92]">
        <option value="active">Ativas</option>
        <option value="inactive">Inativas</option>
        <option value="all">Todas</option>
      </select>
    </div>
    
    <!-- Toggle Visualização -->
    <div class="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
      <button class="p-2 rounded bg-white shadow-sm text-[#3e5653]" title="Visualização em Grid">
        <LayoutGrid class="w-4 h-4" />
      </button>
      <button class="p-2 rounded text-gray-500 hover:text-[#1f2937]" title="Visualização em Lista">
        <List class="w-4 h-4" />
      </button>
    </div>
  </div>
</div>
```

#### 2.2.4 Card de Categoria (Grid)

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all duration-200 group">
  <!-- Header com Cor -->
  <div class="flex items-start justify-between mb-4">
    <div 
      class="w-14 h-14 rounded-xl flex items-center justify-center"
      style="background-color: rgba(239, 68, 68, 0.15)"
    >
      <Home class="w-7 h-7" style="color: #ef4444" />
    </div>
    <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <button class="p-1.5 hover:bg-gray-100 rounded-lg" title="Editar">
        <Pencil class="w-4 h-4 text-gray-500" />
      </button>
      <button class="p-1.5 hover:bg-red-50 rounded-lg" title="Excluir">
        <Trash2 class="w-4 h-4 text-red-500" />
      </button>
    </div>
  </div>
  
  <!-- Nome e Tipo -->
  <h3 class="font-semibold text-[#1f2937] mb-1">Aluguel</h3>
  <div class="flex items-center gap-2 mb-4">
    <span class="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
      <ArrowUpRight class="w-3 h-3" />
      Despesa
    </span>
    <span class="text-xs text-[#627271]">Fixa</span>
  </div>
  
  <!-- Estatísticas -->
  <div class="space-y-2 pt-4 border-t border-gray-100">
    <div class="flex items-center justify-between text-sm">
      <span class="text-[#627271]">Movimentações</span>
      <span class="font-medium text-[#1f2937]">45</span>
    </div>
    <div class="flex items-center justify-between text-sm">
      <span class="text-[#627271]">Média mensal</span>
      <span class="font-medium text-red-600">R$ 2.500,00</span>
    </div>
    <div class="flex items-center justify-between text-sm">
      <span class="text-[#627271]">Último mês</span>
      <span class="font-medium text-red-600">R$ 2.500,00</span>
    </div>
  </div>
  
  <!-- Cor selecionada -->
  <div class="mt-4 pt-4 border-t border-gray-100">
    <div class="flex items-center gap-2">
      <span class="text-xs text-[#627271]">Cor:</span>
      <div class="w-6 h-6 rounded-full bg-red-500 border-2 border-white shadow-sm"></div>
      <span class="text-xs text-gray-400">#ef4444</span>
    </div>
  </div>
</div>
```

#### 2.2.5 Grid de Categorias

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
  <!-- Categoria 1: Receita -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all">
    <div class="flex items-start justify-between mb-4">
      <div class="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
        <ShoppingCart class="w-7 h-7 text-[#86cb92]" />
      </div>
      <div class="flex items-center gap-1">
        <button class="p-1.5 hover:bg-gray-100 rounded-lg">
          <Pencil class="w-4 h-4 text-gray-500" />
        </button>
        <button class="p-1.5 hover:bg-red-50 rounded-lg">
          <Trash2 class="w-4 h-4 text-red-500" />
        </button>
      </div>
    </div>
    <h3 class="font-semibold text-[#1f2937] mb-1">Vendas</h3>
    <span class="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium mb-4">
      <ArrowDownLeft class="w-3 h-3" />
      Receita
    </span>
    <div class="space-y-2 pt-4 border-t border-gray-100">
      <div class="flex justify-between text-sm">
        <span class="text-[#627271]">Movimentações</span>
        <span class="font-medium">89</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-[#627271]">Média mensal</span>
        <span class="font-medium text-[#86cb92]">R$ 15.400,00</span>
      </div>
    </div>
  </div>
  
  <!-- Categoria 2: Despesa -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all">
    <div class="flex items-start justify-between mb-4">
      <div class="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center">
        <ShoppingBag class="w-7 h-7 text-orange-500" />
      </div>
      <div class="flex items-center gap-1">
        <button class="p-1.5 hover:bg-gray-100 rounded-lg">
          <Pencil class="w-4 h-4 text-gray-500" />
        </button>
        <button class="p-1.5 hover:bg-red-50 rounded-lg">
          <Trash2 class="w-4 h-4 text-red-500" />
        </button>
      </div>
    </div>
    <h3 class="font-semibold text-[#1f2937] mb-1">Compras</h3>
    <span class="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium mb-4">
      <ArrowUpRight class="w-3 h-3" />
      Despesa
    </span>
    <div class="space-y-2 pt-4 border-t border-gray-100">
      <div class="flex justify-between text-sm">
        <span class="text-[#627271]">Movimentações</span>
        <span class="font-medium">128</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-[#627271]">Média mensal</span>
        <span class="font-medium text-red-600">R$ 8.900,00</span>
      </div>
    </div>
  </div>
  
  <!-- Mais categorias... -->
</div>
```

#### 2.2.6 Resumo Lateral

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
  <h3 class="text-lg font-semibold text-[#1f2937] mb-4">Resumo</h3>
  
  <div class="space-y-4">
    <div class="flex items-center justify-between pb-3 border-b border-gray-100">
      <span class="text-sm text-[#627271]">Total de Categorias</span>
      <span class="text-2xl font-bold text-[#1f2937]">32</span>
    </div>
    
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-[#86cb92]"></div>
          <span class="text-sm text-[#627271]">Receitas</span>
        </div>
        <span class="text-sm font-semibold text-[#86cb92]">8</span>
      </div>
      
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-red-500"></div>
          <span class="text-sm text-[#627271]">Despesas</span>
        </div>
        <span class="text-sm font-semibold text-red-600">18</span>
      </div>
      
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-blue-500"></div>
          <span class="text-sm text-[#627271]">Transferências</span>
        </div>
        <span class="text-sm font-semibold text-blue-600">3</span>
      </div>
      
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-purple-500"></div>
          <span class="text-sm text-[#627271]">Investimentos</span>
        </div>
        <span class="text-sm font-semibold text-purple-600">3</span>
      </div>
    </div>
  </div>
  
  <!-- Gráfico de distribuição -->
  <div class="mt-6 pt-4 border-t border-gray-200">
    <p class="text-sm text-[#627271] mb-3">Distribuição</p>
    <div class="h-4 bg-gray-200 rounded-full overflow-hidden flex">
      <div class="h-full bg-[#86cb92]" style="width: 25%"></div>
      <div class="h-full bg-red-500" style="width: 56%"></div>
      <div class="h-full bg-blue-500" style="width: 10%"></div>
      <div class="h-full bg-purple-500" style="width: 9%"></div>
    </div>
    <div class="flex justify-between mt-2 text-xs text-[#627271]">
      <span>25%</span>
      <span>56%</span>
      <span>10%</span>
      <span>9%</span>
    </div>
  </div>
</div>
```

---

## 3. Modal: Nova/Editar Categoria

### 3.1 Estrutura do Modal

```
┌──────────────────────────────────────────────────────────────┐
│ Nova Categoria                                    [X]        │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Nome da Categoria *                                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Ex: Aluguel, Vendas, Salários...                     │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  Tipo *                                Natureza *            │
│  ┌──────────────────┐                  ┌──────────────────┐ │
│  │ Despesa      ▼   │                  │ Fixa         ▼   │ │
│  └──────────────────┘                  └──────────────────┘ │
│                                                              │
│  Ícone *                               Cor *                 │
│  ┌──────────────────────────────────┐ ┌──────────────────┐  │
│  │ [🏠] [🚗] [🍔] [⚡] [💼] [+]    │ │ [🔴] Selecionar  │  │
│  └──────────────────────────────────┘ └──────────────────┘  │
│                                                              │
│  Descrição (opcional)                                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Descreva o propósito desta categoria...              │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ☑ Categoria ativa                                           │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                    [Cancelar]  [Salvar]      │
└──────────────────────────────────────────────────────────────┘
```

### 3.2 Componente do Modal

```html
<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div class="bg-white rounded-xl shadow-xl w-full max-w-xl mx-4 max-h-[90vh] overflow-y-auto">
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
      <h3 class="text-lg font-semibold text-[#1f2937]">Nova Categoria</h3>
      <button class="text-gray-400 hover:text-gray-600">
        <X class="w-5 h-5" />
      </button>
    </div>
    
    <!-- Form -->
    <form class="p-6 space-y-5">
      <!-- Nome -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">
          Nome da Categoria <span class="text-red-500">*</span>
        </label>
        <input 
          type="text" 
          placeholder="Ex: Aluguel, Vendas, Salários..."
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
        />
      </div>
      
      <!-- Tipo e Natureza -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-[#1f2937] mb-1">
            Tipo <span class="text-red-500">*</span>
          </label>
          <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]">
            <option value="">Selecione...</option>
            <option value="receita">📥 Receita</option>
            <option value="despesa">📤 Despesa</option>
            <option value="transferencia">↔️ Transferência</option>
            <option value="investimento">📈 Investimento</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-[#1f2937] mb-1">
            Natureza <span class="text-red-500">*</span>
          </label>
          <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]">
            <option value="">Selecione...</option>
            <option value="fixa">Fixa</option>
            <option value="variavel">Variável</option>
          </select>
        </div>
      </div>
      
      <!-- Ícone -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-2">
          Ícone <span class="text-red-500">*</span>
        </label>
        <div class="grid grid-cols-8 gap-2">
          <button type="button" class="w-10 h-10 rounded-lg border-2 border-[#86cb92] bg-[#86cb92]/10 flex items-center justify-center">
            <Home class="w-5 h-5 text-[#86cb92]" />
          </button>
          <button type="button" class="w-10 h-10 rounded-lg border border-gray-200 hover:border-[#86cb92] hover:bg-[#86cb92]/5 flex items-center justify-center transition-colors">
            <Car class="w-5 h-5 text-gray-500" />
          </button>
          <button type="button" class="w-10 h-10 rounded-lg border border-gray-200 hover:border-[#86cb92] hover:bg-[#86cb92]/5 flex items-center justify-center transition-colors">
            <Utensils class="w-5 h-5 text-gray-500" />
          </button>
          <button type="button" class="w-10 h-10 rounded-lg border border-gray-200 hover:border-[#86cb92] hover:bg-[#86cb92]/5 flex items-center justify-center transition-colors">
            <Zap class="w-5 h-5 text-gray-500" />
          </button>
          <button type="button" class="w-10 h-10 rounded-lg border border-gray-200 hover:border-[#86cb92] hover:bg-[#86cb92]/5 flex items-center justify-center transition-colors">
            <Briefcase class="w-5 h-5 text-gray-500" />
          </button>
          <button type="button" class="w-10 h-10 rounded-lg border border-gray-200 hover:border-[#86cb92] hover:bg-[#86cb92]/5 flex items-center justify-center transition-colors">
            <ShoppingCart class="w-5 h-5 text-gray-500" />
          </button>
          <button type="button" class="w-10 h-10 rounded-lg border border-gray-200 hover:border-[#86cb92] hover:bg-[#86cb92]/5 flex items-center justify-center transition-colors">
            <Heart class="w-5 h-5 text-gray-500" />
          </button>
          <button type="button" class="w-10 h-10 rounded-lg border border-gray-200 hover:border-[#86cb92] hover:bg-[#86cb92]/5 flex items-center justify-center transition-colors">
            <MoreHorizontal class="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
      
      <!-- Cor -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-2">
          Cor <span class="text-red-500">*</span>
        </label>
        <div class="flex items-center gap-3">
          <div class="grid grid-cols-10 gap-2">
            <button type="button" class="w-8 h-8 rounded-full bg-red-500 ring-2 ring-offset-2 ring-red-500"></button>
            <button type="button" class="w-8 h-8 rounded-full bg-orange-500 hover:ring-2 hover:ring-offset-2 hover:ring-orange-500"></button>
            <button type="button" class="w-8 h-8 rounded-full bg-amber-500 hover:ring-2 hover:ring-offset-2 hover:ring-amber-500"></button>
            <button type="button" class="w-8 h-8 rounded-full bg-yellow-500 hover:ring-2 hover:ring-offset-2 hover:ring-yellow-500"></button>
            <button type="button" class="w-8 h-8 rounded-full bg-lime-500 hover:ring-2 hover:ring-offset-2 hover:ring-lime-500"></button>
            <button type="button" class="w-8 h-8 rounded-full bg-[#86cb92] hover:ring-2 hover:ring-offset-2 hover:ring-[#86cb92]"></button>
            <button type="button" class="w-8 h-8 rounded-full bg-emerald-500 hover:ring-2 hover:ring-offset-2 hover:ring-emerald-500"></button>
            <button type="button" class="w-8 h-8 rounded-full bg-teal-500 hover:ring-2 hover:ring-offset-2 hover:ring-teal-500"></button>
            <button type="button" class="w-8 h-8 rounded-full bg-cyan-500 hover:ring-2 hover:ring-offset-2 hover:ring-cyan-500"></button>
            <button type="button" class="w-8 h-8 rounded-full bg-sky-500 hover:ring-2 hover:ring-offset-2 hover:ring-sky-500"></button>
          </div>
        </div>
      </div>
      
      <!-- Descrição -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">
          Descrição <span class="text-gray-400">(opcional)</span>
        </label>
        <textarea 
          rows="3"
          placeholder="Descreva o propósito desta categoria..."
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] resize-none"
        ></textarea>
      </div>
      
      <!-- Status -->
      <div class="flex items-center gap-2">
        <input 
          type="checkbox" 
          id="ativo"
          checked
          class="w-4 h-4 text-[#3e5653] border-gray-300 rounded focus:ring-[#86cb92]"
        />
        <label for="ativo" class="text-sm text-[#1f2937]">Categoria ativa</label>
      </div>
    </form>
    
    <!-- Footer -->
    <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 sticky bottom-0 bg-white">
      <button class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
        Cancelar
      </button>
      <button class="px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors">
        Salvar Categoria
      </button>
    </div>
  </div>
</div>
```

---

## 4. Formulários

### 4.1 Tabela de Campos - Nova Categoria

| Campo | Tipo | Obrigatório | Validação | Placeholder |
|-------|------|-------------|-----------|-------------|
| Nome | Texto | Sim | 3-50 caracteres, único | Ex: Aluguel, Vendas... |
| Tipo | Select | Sim | Um dos valores | Selecione o tipo |
| Natureza | Select | Sim | fixa/variavel | Selecione a natureza |
| Ícone | Select | Sim | Ícone válido | Escolha um ícone |
| Cor | Color | Sim | HEX válido | Selecione uma cor |
| Descrição | Textarea | Não | Max 500 caracteres | Descrição da categoria |
| Ativo | Checkbox | Não | Boolean | Categoria ativa |

### 4.2 Validações

```typescript
const schema = z.object({
  nome: z.string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ0-9\s]+$/, 'Nome contém caracteres inválidos'),
  
  tipo: z.enum(['receita', 'despesa', 'transferencia', 'investimento'], {
    required_error: 'Selecione o tipo da categoria'
  }),
  
  natureza: z.enum(['fixa', 'variavel'], {
    required_error: 'Selecione a natureza'
  }),
  
  icone: z.string().min(1, 'Selecione um ícone'),
  
  cor: z.string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Cor deve ser um HEX válido')
    .default('#86cb92'),
  
  descricao: z.string().max(500).optional(),
  
  ativo: z.boolean().default(true)
});
```

---

## 5. Estados

### 5.1 Estado Loading

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
  <!-- Skeleton Card -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 animate-pulse">
    <div class="flex items-start justify-between mb-4">
      <div class="w-14 h-14 rounded-xl bg-gray-200"></div>
      <div class="flex gap-1">
        <div class="w-7 h-7 rounded-lg bg-gray-200"></div>
        <div class="w-7 h-7 rounded-lg bg-gray-200"></div>
      </div>
    </div>
    <div class="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div class="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
    <div class="space-y-2 pt-4 border-t border-gray-100">
      <div class="h-4 bg-gray-200 rounded"></div>
      <div class="h-4 bg-gray-200 rounded"></div>
    </div>
  </div>
  <!-- Repetir 7x -->
</div>
```

### 5.2 Estado Empty

```html
<div class="flex flex-col items-center justify-center py-16 text-center">
  <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
    <FolderOpen class="w-12 h-12 text-gray-400" />
  </div>
  <h3 class="text-lg font-semibold text-[#1f2937] mb-2">Nenhuma categoria cadastrada</h3>
  <p class="text-sm text-[#627271] mb-6 max-w-md">
    Crie categorias para organizar suas receitas e despesas de forma mais eficiente.
  </p>
  <button class="flex items-center gap-2 px-6 py-3 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors">
    <Plus class="w-5 h-5" />
    Criar Primeira Categoria
  </button>
</div>
```

### 5.3 Estado Error

```html
<div class="flex flex-col items-center justify-center py-16 text-center">
  <div class="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
    <AlertCircle class="w-12 h-12 text-red-500" />
  </div>
  <h3 class="text-lg font-semibold text-[#1f2937] mb-2">Erro ao carregar categorias</h3>
  <p class="text-sm text-[#627271] mb-6">
    Não foi possível carregar a lista de categorias. Tente novamente.
  </p>
  <button class="flex items-center gap-2 px-6 py-3 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors">
    <RefreshCw class="w-5 h-5" />
    Tentar Novamente
  </button>
</div>
```

### 5.4 Estado Delete Confirmation

```html
<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div class="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
    <div class="flex items-center gap-4 mb-4">
      <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
        <AlertTriangle class="w-6 h-6 text-red-500" />
      </div>
      <div>
        <h3 class="text-lg font-semibold text-[#1f2937]">Excluir Categoria?</h3>
        <p class="text-sm text-[#627271]">Esta ação não pode ser desfeita</p>
      </div>
    </div>
    
    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <div class="flex items-start gap-3">
        <Info class="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
          <p class="text-sm text-yellow-800">
            A categoria <strong>"Aluguel"</strong> possui <strong>45 movimentações</strong> associadas.
          </p>
          <p class="text-sm text-yellow-700 mt-1">
            Ao excluir, essas movimentações ficarão sem categoria.
          </p>
        </div>
      </div>
    </div>
    
    <div class="flex items-center justify-end gap-3">
      <button class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
        Cancelar
      </button>
      <button class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
        Excluir Categoria
      </button>
    </div>
  </div>
</div>
```

---

## 6. Regras de Negócio

| Código | Descrição | Severidade |
|--------|-----------|------------|
| **RN-CAT-001** | Nome da categoria deve ser único por tipo (receita/despesa) | Alta |
| **RN-CAT-002** | Categorias com movimentações não podem ser excluídas (apenas inativadas) | Alta |
| **RN-CAT-003** | Categorias padrão do sistema não podem ser excluídas | Alta |
| **RN-CAT-004** | Ao excluir, movimentações ficam sem categoria ou são transferidas para "Outros" | Média |
| **RN-CAT-005** | Máximo de 50 categorias por empresa no plano Starter | Média |
| **RN-CAT-006** | Cores devem ter contraste mínimo WCAG AA para acessibilidade | Média |
| **RN-CAT-007** | Categorias inativas não aparecem em novas transações | Baixa |
| **RN-CAT-008** | Ícones são limitados à biblioteca Lucide React | Baixa |

---

## 7. Checklist

### 7.1 Funcionalidades

- [ ] Listagem de categorias em grid
- [ ] Listagem de categorias em lista
- [ ] Filtros por tipo e status
- [ ] Busca por nome
- [ ] Criar nova categoria
- [ ] Editar categoria existente
- [ ] Excluir categoria (com confirmação)
- [ ] Seleção de ícone
- [ ] Seleção de cor
- [ ] Resumo lateral com estatísticas
- [ ] Visualização em grid/lista
- [ ] Tabs por tipo de categoria

### 7.2 Validações

- [ ] Validação de nome único
- [ ] Validação de campos obrigatórios
- [ ] Validação de formato HEX para cor
- [ ] Limite de caracteres na descrição
- [ ] Confirmação antes de excluir

### 7.3 Estados

- [ ] Estado loading
- [ ] Estado empty
- [ ] Estado error
- [ ] Estado de confirmação de exclusão
- [ ] Estado de sucesso (toast)

### 7.4 Acessibilidade

- [ ] Contraste de cores adequado
- [ ] Navegação por teclado
- [ ] ARIA labels em ícones
- [ ] Focus states visíveis
- [ ] Toast de feedback para ações

---

## 8. Ícones Disponíveis (Lucide React)

| Categoria | Ícones Sugeridos |
|-----------|------------------|
| **Moradia** | Home, Building, Warehouse |
| **Transporte** | Car, Bus, Plane, Train |
| **Alimentação** | Utensils, Coffee, Pizza |
| **Serviços** | Zap, Wifi, Phone, Droplet |
| **Vendas** | ShoppingCart, ShoppingBag, Store |
| **Financeiro** | DollarSign, TrendingUp, PiggyBank |
| **Pessoal** | Heart, Gift, Smile, Users |
| **Trabalho** | Briefcase, Laptop, Hammer |
| **Saúde** | Heart, Activity, Pill |
| **Educação** | BookOpen, GraduationCap |
| **Lazer** | Music, Gamepad2, Film |
| **Outros** | MoreHorizontal, Tag, Box |

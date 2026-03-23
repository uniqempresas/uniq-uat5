# Módulo 05: Estoque - Gestão de Produtos e Inventário

## Metadados

| Atributo | Valor |
|----------|-------|
| **Módulo** | Estoque |
| **Código** | MOD-EST-001 |
| **Versão** | 1.0.0 |
| **Status** | Em Desenvolvimento |
| **Responsável** | Frontend Team |
| **Última Atualização** | 2026-03-12 |

---

## 1. Design System UNIQ - Estoque

### 1.1 Paleta de Cores

| Token | Valor HEX | Uso |
|-------|-----------|-----|
| `--bg-primary` | `#efefef` | Fundo principal da aplicação |
| `--bg-card` | `#ffffff` | Fundo de cards e modais |
| `--sidebar-bg` | `#1f2937` | Fundo da sidebar |
| `--btn-primary` | `#3e5653` | Botões primários |
| `--btn-primary-hover` | `#1f2937` | Hover de botões primários |
| `--accent` | `#86cb92` | Detalhes, badges de estoque OK |
| `--text-primary` | `#1f2937` | Texto principal |
| `--text-secondary` | `#627271` | Texto secundário, placeholders |
| `--border` | `#e5e7eb` | Bordas e divisores |
| `--stock-ok` | `#86cb92` | Estoque OK - verde emerald |
| `--stock-low` | `#f59e0b` | Estoque baixo - amarelo |
| `--stock-critical` | `#ef4444` | Estoque crítico - vermelho |
| `--stock-out` | `#dc2626` | Sem estoque - vermelho escuro |
| `--stock-in` | `#22c55e` | Entrada de estoque - verde |
| `--stock-out-move` | `#3b82f6` | Saída de estoque - azul |
| `--price-cost` | `#627271` | Custo - cinza |
| `--price-sale` | `#3e5653` | Preço de venda - dark slate |

### 1.2 Tipografia

| Elemento | Fonte | Tamanho | Peso | Cor |
|----------|-------|---------|------|-----|
| Título Página | Poppins | 24px (text-2xl) | 700 (bold) | `#1f2937` |
| Subtítulo | Poppins | 14px (text-sm) | 400 | `#627271` |
| Card Título | Poppins | 14px (text-sm) | 500 | `#627271` |
| Card Valor | Poppins | 24px (text-2xl) | 700 | `#1f2937` |
| Card Valor Destaque | Poppins | 28px (text-3xl) | 700 | `#86cb92` |
| Card Valor Alerta | Poppins | 24px (text-2xl) | 700 | `#f59e0b` |
| Card Valor Crítico | Poppins | 24px (text-2xl) | 700 | `#ef4444` |
| Body | Poppins | 14px (text-sm) | 400 | `#1f2937` |
| Caption | Poppins | 12px (text-xs) | 400 | `#627271` |
| Badge | Poppins | 12px (text-xs) | 500 | Variável |
| Tabela Header | Poppins | 12px (text-xs) | 500 | `#627271` |
| Tabela Cell | Poppins | 14px (text-sm) | 400 | `#1f2937` |
| Produto Nome | Poppins | 16px (text-base) | 600 | `#1f2937` |
| Produto SKU | Poppins | 12px (text-xs) | 400 | `#627271` |
| Stock Counter | Poppins | 20px (text-xl) | 700 | Variável |

### 1.3 Espaçamentos

| Elemento | Valor Tailwind |
|----------|----------------|
| Container padding | `p-6` |
| Card padding | `p-5` |
| Card gap | `gap-4` |
| Grid gap métricas | `gap-4` |
| Grid gap produtos | `gap-4` |
| Section margin | `mb-6` |
| Button padding | `px-4 py-2` |
| Input padding | `px-3 py-2` |
| Tabela cell padding | `px-4 py-3` |
| Product card padding | `p-4` |
| Tab padding | `px-4 py-3` |

### 1.4 Sombras e Bordas

| Elemento | Classes Tailwind |
|----------|------------------|
| Card | `bg-white rounded-xl shadow-sm border border-gray-200` |
| Card Hover | `hover:shadow-md transition-shadow duration-200` |
| Card Métrica | `bg-white rounded-xl shadow-sm border border-gray-200 p-5` |
| Product Card | `bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden` |
| Product Card Hover | `hover:shadow-lg hover:-translate-y-1 transition-all duration-200` |
| Button Primário | `bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors` |
| Button Secundário | `bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50` |
| Button Danger | `bg-red-600 text-white rounded-lg hover:bg-red-700` |
| Button Success | `bg-[#86cb92] text-white rounded-lg hover:bg-green-600` |
| Input | `border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent` |
| Badge | `px-2.5 py-1 rounded-full text-xs font-medium` |
| Badge Estoque OK | `bg-green-100 text-green-700` |
| Badge Estoque Baixo | `bg-yellow-100 text-yellow-700` |
| Badge Estoque Crítico | `bg-red-100 text-red-700` |
| Badge Sem Estoque | `bg-red-100 text-red-700 border border-red-200` |
| Tab Ativa | `border-b-2 border-[#3e5653] text-[#3e5653]` |
| Tab Inativa | `text-[#627271] hover:text-[#1f2937]` |
| Upload Zone | `border-2 border-dashed border-gray-300 rounded-xl hover:border-[#86cb92] hover:bg-[#86cb92]/5` |

### 1.5 Estados de Estoque - Cores e Ícones

| Status | Cor | Ícone | Background | Classes Tailwind |
|--------|-----|-------|------------|------------------|
| **Estoque OK** | Verde `#86cb92` | CheckCircle | `bg-green-100` | `text-green-600 bg-green-100` |
| **Estoque Baixo** | Amarelo `#f59e0b` | AlertTriangle | `bg-yellow-100` | `text-yellow-600 bg-yellow-100` |
| **Estoque Crítico** | Vermelho `#ef4444` | AlertOctagon | `bg-red-100` | `text-red-600 bg-red-100` |
| **Sem Estoque** | Vermelho `#dc2626` | XCircle | `bg-red-100` | `text-red-700 bg-red-100 border-red-200` |
| **Entrada** | Verde `#22c55e` | ArrowDownLeft | `bg-green-50` | `text-green-600` |
| **Saída** | Azul `#3b82f6` | ArrowUpRight | `bg-blue-50` | `text-blue-600` |
| **Ajuste** | Cinza `#627271` | RefreshCw | `bg-gray-100` | `text-gray-600` |

---

## 2. Tela 1: Dashboard de Estoque (/estoque)

### 2.1 Estrutura do Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar #1f2937 - Estoque destacado]                                               │
│ ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] Estoque - Dashboard                             [+ Novo Produto ▼]     │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Cards de Métricas - Grid 4 colunas]                                            │ │
│ │ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────┐ │ │
│ │ │ [Package]        │ │ [DollarSign]     │ │ [AlertTriangle]  │ │ [XCircle]    │ │ │
│ │ │ 124              │ │ R$ 45.230,00     │ │ 8                │ │ 3            │ │ │
│ │ │ Total de         │ │ Valor em         │ │ Estoque          │ │ Produtos sem │ │ │
│ │ │ Produtos         │ │ Estoque          │ │ Baixo            │ │ Estoque      │ │ │
│ │ │ Cadastrados      │ │ Custo Total      │ │ ⚠️ Atenção       │ │ Crítico!     │ │ │
│ │ └──────────────────┘ └──────────────────┘ └──────────────────┘ └──────────────┘ │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Alertas de Estoque]                                    [Ver todos →]          │ │
│ │ ┌─────────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ [Image] Produto A          5 un     10 min    [Baixo]        [Comprar]      │ │ │
│ │ │ [Image] Produto B          3 un     15 min    [Baixo]        [Comprar]      │ │ │
│ │ │ [Image] Produto C          2 un     20 min    [Crítico]      [Comprar]      │ │ │
│ │ └─────────────────────────────────────────────────────────────────────────────┘ │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Gráfico de Giro]                    │ [Ações Rápidas]                        │ │
│ │                                      │ ┌─────────────────────────────────────┐│ │
│ │  [Filtro: 7d │ 30d │ 3m │ 6m │ 1a]   │ │ [+ Novo Produto]                    ││ │
│ │                                      │ │ [↓ Entrada em Massa]                ││ │
│ │  Produtos mais vendidos (Top 5)      │ │ [📋 Inventário]                     ││ │
│ │  ████████████████ Produto X          │ │ [📊 Relatórios]                     ││ │
│ │  ████████████ Produto Y              │ │                                     ││ │
│ │  █████████ Produto Z                 │ │ [Estoque por Categoria]             ││ │
│ │  ██████ Produto W                    │ │ [Pie Chart]                         ││ │
│ │  ███ Produto V                       │ │                                     ││ │
│ │                                      │ │                                     ││ │
│ └─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Últimas Movimentações]                           [Ver histórico →]            │ │
│ │ Data/Hora │ Produto │ Tipo │ Qtd │ Estoque Anterior → Novo │ Responsável      │ │
│ └─────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Componentes

#### 2.2.1 Cards de Métricas

**Card 1: Total de Produtos**

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
  <div class="flex items-start justify-between">
    <div>
      <p class="text-sm font-medium text-[#627271] mb-1">Total de Produtos</p>
      <h3 class="text-2xl font-bold text-[#1f2937]">124</h3>
      <p class="text-xs text-[#627271] mt-2">Cadastrados</p>
    </div>
    <div class="w-12 h-12 rounded-xl bg-[#86cb92]/20 flex items-center justify-center">
      <Package class="w-6 h-6 text-[#86cb92]" />
    </div>
  </div>
</div>
```

**Card 2: Valor em Estoque**

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
  <div class="flex items-start justify-between">
    <div>
      <p class="text-sm font-medium text-[#627271] mb-1">Valor em Estoque</p>
      <h3 class="text-2xl font-bold text-[#1f2937]">R$ 45.230,00</h3>
      <p class="text-xs text-[#627271] mt-2">Custo Total</p>
    </div>
    <div class="w-12 h-12 rounded-xl bg-[#3e5653]/20 flex items-center justify-center">
      <DollarSign class="w-6 h-6 text-[#3e5653]" />
    </div>
  </div>
</div>
```

**Card 3: Estoque Baixo**

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
  <div class="flex items-start justify-between">
    <div>
      <p class="text-sm font-medium text-[#627271] mb-1">Estoque Baixo</p>
      <h3 class="text-2xl font-bold text-[#f59e0b]">8</h3>
      <div class="flex items-center gap-1 mt-2">
        <AlertTriangle class="w-3 h-3 text-[#f59e0b]" />
        <span class="text-xs text-[#f59e0b] font-medium">Atenção necessária</span>
      </div>
    </div>
    <div class="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
      <AlertTriangle class="w-6 h-6 text-yellow-600" />
    </div>
  </div>
</div>
```

**Card 4: Produtos sem Estoque**

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow border-l-4 border-l-red-500">
  <div class="flex items-start justify-between">
    <div>
      <p class="text-sm font-medium text-[#627271] mb-1">Produtos sem Estoque</p>
      <h3 class="text-2xl font-bold text-[#ef4444]">3</h3>
      <div class="flex items-center gap-1 mt-2">
        <XCircle class="w-3 h-3 text-[#ef4444]" />
        <span class="text-xs text-[#ef4444] font-medium">Esgotados</span>
      </div>
    </div>
    <div class="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
      <XCircle class="w-6 h-6 text-red-600" />
    </div>
  </div>
</div>
```

#### 2.2.2 Lista de Alertas de Estoque

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200">
  <div class="p-5 border-b border-gray-200 flex items-center justify-between">
    <div>
      <h3 class="font-semibold text-[#1f2937]">Alertas de Estoque</h3>
      <p class="text-sm text-[#627271]">Produtos que precisam de atenção</p>
    </div>
    <button class="text-[#3e5653] text-sm font-medium hover:underline">Ver todos →</button>
  </div>
  
  <div class="divide-y divide-gray-100">
    <!-- Item Estoque Baixo -->
    <div class="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
      <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
        <img src="/api/placeholder/48/48" alt="Produto" class="w-full h-full object-cover" />
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="font-medium text-[#1f2937] truncate">Teclado Mecânico RGB</h4>
        <p class="text-xs text-[#627271]">SKU: TEC-RGB-001</p>
      </div>
      <div class="text-center">
        <p class="text-sm font-semibold text-[#1f2937]">5 un</p>
        <p class="text-xs text-[#627271]">Atual</p>
      </div>
      <div class="text-center">
        <p class="text-sm font-semibold text-[#1f2937]">10 un</p>
        <p class="text-xs text-[#627271]">Mínimo</p>
      </div>
      <span class="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
        Baixo
      </span>
      <div class="flex gap-2">
        <button class="px-3 py-1.5 bg-[#3e5653] text-white text-sm rounded-lg hover:bg-[#1f2937] transition-colors">
          Comprar
        </button>
        <button class="p-1.5 text-[#627271] hover:text-[#1f2937] hover:bg-gray-100 rounded-lg">
          <MoreHorizontal class="w-4 h-4" />
        </button>
      </div>
    </div>
    
    <!-- Item Estoque Crítico -->
    <div class="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
      <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
        <img src="/api/placeholder/48/48" alt="Produto" class="w-full h-full object-cover" />
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="font-medium text-[#1f2937] truncate">Mouse Gamer Pro</h4>
        <p class="text-xs text-[#627271]">SKU: MOU-PRO-002</p>
      </div>
      <div class="text-center">
        <p class="text-sm font-semibold text-[#ef4444]">2 un</p>
        <p class="text-xs text-[#627271]">Atual</p>
      </div>
      <div class="text-center">
        <p class="text-sm font-semibold text-[#1f2937]">15 un</p>
        <p class="text-xs text-[#627271]">Mínimo</p>
      </div>
      <span class="px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
        Crítico
      </span>
      <div class="flex gap-2">
        <button class="px-3 py-1.5 bg-[#ef4444] text-white text-sm rounded-lg hover:bg-red-700 transition-colors">
          Comprar
        </button>
        <button class="p-1.5 text-[#627271] hover:text-[#1f2937] hover:bg-gray-100 rounded-lg">
          <MoreHorizontal class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</div>
```

#### 2.2.3 Gráfico de Giro de Estoque

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
  <div class="flex items-center justify-between mb-6">
    <div>
      <h3 class="font-semibold text-[#1f2937]">Giro de Estoque</h3>
      <p class="text-sm text-[#627271]">Produtos mais vendidos (Top 5)</p>
    </div>
    <div class="flex gap-1 bg-gray-100 rounded-lg p-1">
      <button class="px-3 py-1 text-xs font-medium rounded-md bg-white text-[#1f2937] shadow-sm">7d</button>
      <button class="px-3 py-1 text-xs font-medium rounded-md text-[#627271] hover:text-[#1f2937]">30d</button>
      <button class="px-3 py-1 text-xs font-medium rounded-md text-[#627271] hover:text-[#1f2937]">3m</button>
    </div>
  </div>
  
  <div class="space-y-4">
    <div class="flex items-center gap-4">
      <span class="w-32 text-sm text-[#627271] truncate">Teclado Mecânico RGB</span>
      <div class="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
        <div class="h-full bg-[#86cb92] rounded-full" style="width: 92%"></div>
      </div>
      <span class="w-12 text-sm font-medium text-[#1f2937] text-right">92</span>
    </div>
    
    <div class="flex items-center gap-4">
      <span class="w-32 text-sm text-[#627271] truncate">Mouse Gamer Pro</span>
      <div class="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
        <div class="h-full bg-[#86cb92]/80 rounded-full" style="width: 78%"></div>
      </div>
      <span class="w-12 text-sm font-medium text-[#1f2937] text-right">78</span>
    </div>
  </div>
</div>
```

### 2.3 Regras de Negócio (RN-EST)

| Regra | Descrição | Implementação |
|-------|-----------|---------------|
| RN-EST-001 | Cards de métricas devem atualizar em tempo real | WebSocket ou polling a cada 30s |
| RN-EST-002 | Alertas de estoque devem ser ordenados por criticidade | Crítico > Baixo > OK |
| RN-EST-003 | Gráfico de giro mostra apenas produtos com vendas | Filtro: quantidade_vendida > 0 |


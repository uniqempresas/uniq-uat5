# Módulo 04: Financeiro - Gestão Financeira Completa

## Metadados

| Atributo | Valor |
|----------|-------|
| **Módulo** | Financeiro |
| **Código** | MOD-FIN-001 |
| **Versão** | 1.0.0 |
| **Status** | Em Desenvolvimento |
| **Responsável** | Frontend Team |
| **Última Atualização** | 2026-03-12 |

---

## 1. Design System UNIQ - Financeiro

### 1.1 Paleta de Cores

| Token | Valor HEX | Uso |
|-------|-----------|-----|
| `--bg-primary` | `#efefef` | Fundo principal da aplicação |
| `--bg-card` | `#ffffff` | Fundo de cards e modais |
| `--sidebar-bg` | `#1f2937` | Fundo da sidebar |
| `--btn-primary` | `#3e5653` | Botões primários |
| `--btn-primary-hover` | `#1f2937` | Hover de botões primários |
| `--accent` | `#86cb92` | Detalhes, badges de receita, destaques |
| `--text-primary` | `#1f2937` | Texto principal |
| `--text-secondary` | `#627271` | Texto secundário, placeholders |
| `--border` | `#e5e7eb` | Bordas e divisores |
| `--status-income` | `#86cb92` | Receita - verde emerald |
| `--status-expense` | `#ef4444` | Despesa - vermelho |
| `--status-pending` | `#f59e0b` | Pendente - amarelo |
| `--status-paid` | `#22c55e` | Pago - verde |
| `--status-overdue` | `#dc2626` | Vencido - vermelho escuro |
| `--status-scheduled` | `#3b82f6` | Agendado - azul |

### 1.2 Tipografia

| Elemento | Fonte | Tamanho | Peso | Cor |
|----------|-------|---------|------|-----|
| Título Página | Poppins | 24px (text-2xl) | 700 (bold) | `#1f2937` |
| Subtítulo | Poppins | 14px (text-sm) | 400 | `#627271` |
| Card Título | Poppins | 14px (text-sm) | 500 | `#627271` |
| Card Valor | Poppins | 24px (text-2xl) | 700 | `#1f2937` |
| Card Valor Positivo | Poppins | 24px (text-2xl) | 700 | `#86cb92` |
| Card Valor Negativo | Poppins | 24px (text-2xl) | 700 | `#ef4444` |
| Body | Poppins | 14px (text-sm) | 400 | `#1f2937` |
| Caption | Poppins | 12px (text-xs) | 400 | `#627271` |
| Badge | Poppins | 12px (text-xs) | 500 | Variável |
| Tabela Header | Poppins | 12px (text-xs) | 500 | `#627271` |
| Tabela Cell | Poppins | 14px (text-sm) | 400 | `#1f2937` |

### 1.3 Espaçamentos

| Elemento | Valor Tailwind |
|----------|----------------|
| Container padding | `p-6` |
| Card padding | `p-5` |
| Card gap | `gap-4` |
| Grid gap métricas | `gap-4` |
| Section margin | `mb-6` |
| Button padding | `px-4 py-2` |
| Input padding | `px-3 py-2` |
| Tabela cell padding | `px-4 py-3` |

### 1.4 Sombras e Bordas

| Elemento | Classes Tailwind |
|----------|------------------|
| Card | `bg-white rounded-xl shadow-sm border border-gray-200` |
| Card Hover | `hover:shadow-md transition-shadow duration-200` |
| Card Métrica | `bg-white rounded-xl shadow-sm border border-gray-200 p-5` |
| Button Primário | `bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors` |
| Button Secundário | `bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50` |
| Button Danger | `bg-red-600 text-white rounded-lg hover:bg-red-700` |
| Button Success | `bg-green-600 text-white rounded-lg hover:bg-green-700` |
| Input | `border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent` |
| Badge | `px-2.5 py-1 rounded-full text-xs font-medium` |
| Badge Pendente | `bg-yellow-100 text-yellow-700` |
| Badge Pago | `bg-green-100 text-green-700` |
| Badge Vencido | `bg-red-100 text-red-700` |
| Badge Agendado | `bg-blue-100 text-blue-700` |

---

## 2. Tela 1: Dashboard Financeiro (/financeiro)

### 2.1 Estrutura do Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar #1f2937 - Financeiro destacado]                                            │
│ ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] Financeiro - Dashboard                    [Período ▼]  [Atualizar]     │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Cards de Métricas - Grid 4 colunas]                                            │ │
│ │ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────┐ │ │
│ │ │ [Wallet]         │ │ [ArrowDownLeft]  │ │ [ArrowUpRight]   │ │ [TrendingUp] │ │ │
│ │ │ R$ 15.430,00     │ │ R$ 8.200,00      │ │ R$ 3.450,00      │ │ [Mini Chart] │ │ │
│ │ │ Saldo em Contas  │ │ A Receber        │ │ A Pagar          │ │ +R$ 11.780   │ │ │
│ │ │ +12% vs mês ant. │ │ 5 títulos       │ │ 8 títulos ⚠️    │ │ Fluxo do Mês │ │ │
│ │ └──────────────────┘ └──────────────────┘ └──────────────────┘ └──────────────┘ │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Gráfico de Fluxo de Caixa]              │ [Contas Próximas do Vencimento]    │ │
│ │                                          │                                    │ │
│ │  [Filtro: 7d │ 30d │ 3m │ 6m │ 1a]      │  • Despesa X - R$ 1.200 - 2 dias   │ │
│ │                                          │  • Receita Y - R$ 3.400 - 3 dias   │ │
│ │      Receitas (verde)                    │  • Despesa Z - R$ 890 - 5 dias     │ │
│ │     ╱                                    │  [Ver todas →]                     │ │
│ │    ╱  Despesas (vermelho)                │                                    │ │
│ │   ╱╲                                     │                                    │ │
│ │  ╱  ╲                                    │                                    │ │
│ │ ╱    ╲____                               │                                    │ │
│ │                                          │                                    │ │
│ └─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Ações Rápidas]                                                                 │ │
│ │ [+ Nova Receita] [+ Nova Despesa] [↔ Transferência] [☰ Conciliar]              │ │
│ └─────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Componentes

#### 2.2.1 Cards de Métricas

**Card 1: Saldo Atual**

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
  <div class="flex items-start justify-between">
    <div>
      <p class="text-sm font-medium text-[#627271] mb-1">Saldo em Contas</p>
      <h3 class="text-2xl font-bold text-[#1f2937]">R$ 15.430,00</h3>
      <div class="flex items-center gap-1 mt-2">
        <TrendingUp class="w-3 h-3 text-[#86cb92]" />
        <span class="text-xs text-[#86cb92] font-medium">+12%</span>
        <span class="text-xs text-[#627271]">vs mês passado</span>
      </div>
    </div>
    <div class="w-12 h-12 rounded-xl bg-[#86cb92]/20 flex items-center justify-center">
      <Wallet class="w-6 h-6 text-[#86cb92]" />
    </div>
  </div>
</div>
```

**Card 2: A Receber**

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
  <div class="flex items-start justify-between">
    <div>
      <p class="text-sm font-medium text-[#627271] mb-1">Contas a Receber</p>
      <h3 class="text-2xl font-bold text-[#1f2937]">R$ 8.200,00</h3>
      <p class="text-xs text-[#627271] mt-2">5 títulos</p>
    </div>
    <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
      <ArrowDownLeft class="w-6 h-6 text-blue-600" />
    </div>
  </div>
</div>
```

**Card 3: A Pagar**

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
  <div class="flex items-start justify-between">
    <div>
      <p class="text-sm font-medium text-[#627271] mb-1">Contas a Pagar</p>
      <h3 class="text-2xl font-bold text-[#1f2937]">R$ 3.450,00</h3>
      <div class="flex items-center gap-1 mt-2">
        <AlertTriangle class="w-3 h-3 text-yellow-600" />
        <span class="text-xs text-yellow-600 font-medium">8 títulos</span>
      </div>
    </div>
    <div class="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
      <ArrowUpRight class="w-6 h-6 text-red-600" />
    </div>
  </div>
</div>
```

**Card 4: Fluxo do Mês**

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
  <div class="flex items-start justify-between">
    <div class="flex-1">
      <p class="text-sm font-medium text-[#627271] mb-1">Fluxo do Mês</p>
      <h3 class="text-2xl font-bold text-[#86cb92]">+R$ 11.780</h3>
      <p class="text-xs text-[#627271] mt-2">Receita - Despesa</p>
      <!-- Mini gráfico de barras -->
      <div class="flex items-end gap-1 mt-3 h-8">
        <div class="w-3 bg-[#86cb92]/30 rounded-t" style="height: 60%"></div>
        <div class="w-3 bg-[#86cb92]/50 rounded-t" style="height: 80%"></div>
        <div class="w-3 bg-[#86cb92]/40 rounded-t" style="height: 45%"></div>
        <div class="w-3 bg-[#86cb92]/60 rounded-t" style="height: 90%"></div>
        <div class="w-3 bg-[#86cb92] rounded-t" style="height: 100%"></div>
      </div>
    </div>
    <div class="w-12 h-12 rounded-xl bg-[#3e5653]/20 flex items-center justify-center">
      <TrendingUp class="w-6 h-6 text-[#3e5653]" />
    </div>
  </div>
</div>
```

#### 2.2.2 Grid de Métricas

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
  <!-- Card Saldo -->
  <div class="...">...</div>
  <!-- Card A Receber -->
  <div class="...">...</div>
  <!-- Card A Pagar -->
  <div class="...">...</div>
  <!-- Card Fluxo -->
  <div class="...">...</div>
</div>
```

#### 2.2.3 Gráfico de Fluxo de Caixa

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-lg font-semibold text-[#1f2937]">Fluxo de Caixa</h3>
    <div class="flex items-center gap-2">
      <!-- Filtros de período -->
      <div class="flex bg-gray-100 rounded-lg p-1">
        <button class="px-3 py-1 text-xs font-medium rounded-md bg-white shadow-sm text-[#1f2937]">7 dias</button>
        <button class="px-3 py-1 text-xs font-medium rounded-md text-[#627271] hover:text-[#1f2937]">30 dias</button>
        <button class="px-3 py-1 text-xs font-medium rounded-md text-[#627271] hover:text-[#1f2937]">3 meses</button>
        <button class="px-3 py-1 text-xs font-medium rounded-md text-[#627271] hover:text-[#1f2937]">6 meses</button>
        <button class="px-3 py-1 text-xs font-medium rounded-md text-[#627271] hover:text-[#1f2937]">1 ano</button>
      </div>
    </div>
  </div>
  
  <!-- Legenda -->
  <div class="flex items-center gap-4 mb-4">
    <div class="flex items-center gap-2">
      <div class="w-3 h-3 rounded-full bg-[#86cb92]"></div>
      <span class="text-sm text-[#627271]">Receitas</span>
    </div>
    <div class="flex items-center gap-2">
      <div class="w-3 h-3 rounded-full bg-red-500"></div>
      <span class="text-sm text-[#627271]">Despesas</span>
    </div>
  </div>
  
  <!-- Área do Gráfico -->
  <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center relative">
    <!-- Gráfico será renderizado pela biblioteca (Chart.js/Recharts) -->
    <div id="cash-flow-chart" class="w-full h-full"></div>
  </div>
</div>
```

#### 2.2.4 Lista de Contas Próximas do Vencimento

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-lg font-semibold text-[#1f2937]">Próximas do Vencimento</h3>
    <span class="text-xs text-[#627271]">Próximos 7 dias</span>
  </div>
  
  <div class="space-y-3">
    <!-- Item 1 -->
    <div class="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
          <ArrowUpRight class="w-4 h-4 text-red-600" />
        </div>
        <div>
          <p class="text-sm font-medium text-[#1f2937]">Aluguel Escritório</p>
          <p class="text-xs text-[#627271]">Despesa Fixa</p>
        </div>
      </div>
      <div class="text-right">
        <p class="text-sm font-semibold text-red-600">R$ 2.500,00</p>
        <p class="text-xs text-red-500">Vence amanhã</p>
      </div>
    </div>
    
    <!-- Item 2 -->
    <div class="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-100">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
          <ArrowDownLeft class="w-4 h-4 text-yellow-600" />
        </div>
        <div>
          <p class="text-sm font-medium text-[#1f2937]">Cliente ABC Ltda</p>
          <p class="text-xs text-[#627271]">Venda #1234</p>
        </div>
      </div>
      <div class="text-right">
        <p class="text-sm font-semibold text-[#86cb92]">R$ 3.400,00</p>
        <p class="text-xs text-yellow-600">Vence em 3 dias</p>
      </div>
    </div>
    
    <!-- Item 3 -->
    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
          <ArrowUpRight class="w-4 h-4 text-gray-600" />
        </div>
        <div>
          <p class="text-sm font-medium text-[#1f2937]">Fornecedor XYZ</p>
          <p class="text-xs text-[#627271]">Compra de materiais</p>
        </div>
      </div>
      <div class="text-right">
        <p class="text-sm font-semibold text-red-600">R$ 890,00</p>
        <p class="text-xs text-[#627271]">Vence em 5 dias</p>
      </div>
    </div>
  </div>
  
  <button class="w-full mt-4 py-2 text-sm text-[#3e5653] font-medium hover:bg-gray-50 rounded-lg transition-colors">
    Ver todas
    <ChevronRight class="w-4 h-4 inline ml-1" />
  </button>
</div>
```

#### 2.2.5 Ações Rápidas

```html
<div class="flex flex-wrap items-center gap-3 mt-6">
  <button class="flex items-center gap-2 px-4 py-2.5 bg-[#86cb92] text-white rounded-lg hover:bg-[#6bb87a] transition-colors">
    <Plus class="w-4 h-4" />
    Nova Receita
    <ArrowDownLeft class="w-4 h-4" />
  </button>
  
  <button class="flex items-center gap-2 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
    <Plus class="w-4 h-4" />
    Nova Despesa
    <ArrowUpRight class="w-4 h-4" />
  </button>
  
  <button class="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
    <ArrowLeftRight class="w-4 h-4" />
    Transferência
  </button>
  
  <button class="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
    <CheckSquare class="w-4 h-4" />
    Conciliar
  </button>
</div>
```

---

## 3. Tela 2: Contas a Pagar (/financeiro/pagar)

### 3.1 Estrutura do Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar #1f2937]                                                                   │
│ ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] Contas a Pagar                           [+ Nova Despesa]              │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Filtros]                                                                       │ │
│ │ [Período: ▼] [Status: Todas ▼] [Categoria: Todas ▼] [Fornecedor: 🔍] [Filtrar]│ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Ações em Massa - aparece ao selecionar]                                        │ │
│ │ [Marcar como Paga] [Excluir] [Exportar]                    [Selecionados: 3]    │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Tabela de Contas]                                          [Resumo Lateral]    │ │
│ │ ┌───────────────────────────────────────────────────────────┐ ┌───────────────┐ │ │
│ │ │ ☐ Descrição      Categoria  Fornecedor  Venc.  Valor   Status  Ações      │ │ │
│ │ │ ☐ Aluguel        Imóvel     Imobiliaria 12/03  2.500  [Pend]  👁 ✏️ 🗑 💰 │ │ │
│ │ │ ☐ Energia        Serviços   CEMIG       15/03   890   [Pend]  👁 ✏️ 🗑 💰 │ │ │
│ │ │ ☐ Internet       Serviços   Vivo        20/03   299   [Paga]  👁 ✏️ 🗑    │ │ │
│ │ │ ☐ Fornecedor X   Compras    XYZ Ltda    10/03  1.200  [Venc]  👁 ✏️ 🗑 💰 │ │ │
│ │ └───────────────────────────────────────────────────────────┘ │ Total:        │ │ │
│ │                                                              │ R$ 24.567,00 │ │ │
│ │                                                              │              │ │ │
│ │                                                              │ Pendentes:   │ │ │
│ │                                                              │ R$ 8.450,00  │ │ │
│ │                                                              │              │ │ │
│ │                                                              │ Vencidas:    │ │ │
│ │                                                              │ R$ 2.100,00  │ │ │
│ │                                                              └───────────────┘ │ │
│ │ [← 1 2 3 ... 10 →]                                              Exibindo 1-10 │ │
│ └─────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Componentes

#### 3.2.1 Header da Página

```html
<header class="bg-white border-b border-gray-200 px-6 py-4">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-[#1f2937]">Contas a Pagar</h1>
      <p class="text-sm text-[#627271]">Gerencie suas despesas e pagamentos</p>
    </div>
    <button class="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
      <Plus class="w-4 h-4" />
      Nova Despesa
    </button>
  </div>
</header>
```

#### 3.2.2 Barra de Filtros

```html
<div class="bg-white border-b border-gray-200 px-6 py-4">
  <div class="flex flex-wrap items-center gap-3">
    <!-- Período -->
    <div class="relative">
      <Calendar class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input 
        type="text" 
        placeholder="Período"
        class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-40 focus:ring-2 focus:ring-[#86cb92]"
      />
    </div>
    
    <!-- Status -->
    <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#86cb92]">
      <option value="">Todas</option>
      <option value="pending">Pendentes</option>
      <option value="paid">Pagas</option>
      <option value="overdue">Vencidas</option>
      <option value="scheduled">Agendadas</option>
    </select>
    
    <!-- Categoria -->
    <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#86cb92]">
      <option value="">Todas as Categorias</option>
      <option value="suppliers">Fornecedores</option>
      <option value="employees">Funcionários</option>
      <option value="taxes">Impostos</option>
      <option value="rent">Aluguel</option>
      <option value="marketing">Marketing</option>
    </select>
    
    <!-- Fornecedor -->
    <div class="relative">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input 
        type="text" 
        placeholder="Buscar fornecedor..."
        class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-56 focus:ring-2 focus:ring-[#86cb92]"
      />
    </div>
    
    <button class="px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors">
      Filtrar
    </button>
  </div>
</div>
```

#### 3.2.3 Ações em Massa

```html
<div class="bg-blue-50 border-b border-blue-100 px-6 py-3 flex items-center justify-between">
  <div class="flex items-center gap-2">
    <span class="text-sm font-medium text-blue-900">3 selecionados</span>
  </div>
  <div class="flex items-center gap-2">
    <button class="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">
      <CheckCircle class="w-4 h-4" />
      Marcar como Paga
    </button>
    <button class="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700">
      <Trash2 class="w-4 h-4" />
      Excluir
    </button>
    <button class="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
      <Download class="w-4 h-4" />
      Exportar
    </button>
  </div>
</div>
```

#### 3.2.4 Tabela de Contas

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
  <table class="w-full">
    <thead class="bg-gray-50 border-b border-gray-200">
      <tr>
        <th class="px-4 py-3 w-10">
          <input type="checkbox" class="rounded border-gray-300" />
        </th>
        <th class="px-4 py-3 text-left text-xs font-medium text-[#627271] uppercase tracking-wider">Descrição</th>
        <th class="px-4 py-3 text-left text-xs font-medium text-[#627271] uppercase tracking-wider">Categoria</th>
        <th class="px-4 py-3 text-left text-xs font-medium text-[#627271] uppercase tracking-wider">Fornecedor</th>
        <th class="px-4 py-3 text-left text-xs font-medium text-[#627271] uppercase tracking-wider">Vencimento</th>
        <th class="px-4 py-3 text-right text-xs font-medium text-[#627271] uppercase tracking-wider">Valor</th>
        <th class="px-4 py-3 text-center text-xs font-medium text-[#627271] uppercase tracking-wider">Status</th>
        <th class="px-4 py-3 text-center text-xs font-medium text-[#627271] uppercase tracking-wider">Ações</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <!-- Linha 1 - Pendente -->
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="px-4 py-3">
          <input type="checkbox" class="rounded border-gray-300" />
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
              <Home class="w-4 h-4 text-red-600" />
            </div>
            <span class="text-sm font-medium text-[#1f2937]">Aluguel Escritório</span>
          </div>
        </td>
        <td class="px-4 py-3">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            <Building class="w-3 h-3" />
            Imóvel
          </span>
        </td>
        <td class="px-4 py-3 text-sm text-[#1f2937]">Imobiliária Central</td>
        <td class="px-4 py-3 text-sm text-[#1f2937]">12/03/2026</td>
        <td class="px-4 py-3 text-sm font-medium text-red-600 text-right">R$ 2.500,00</td>
        <td class="px-4 py-3 text-center">
          <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            Pendente
          </span>
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center justify-center gap-1">
            <button class="p-1.5 text-gray-400 hover:text-[#3e5653] hover:bg-gray-100 rounded transition-colors" title="Ver">
              <Eye class="w-4 h-4" />
            </button>
            <button class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Editar">
              <Edit class="w-4 h-4" />
            </button>
            <button class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Excluir">
              <Trash2 class="w-4 h-4" />
            </button>
            <button class="p-1.5 text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors" title="Pagar">
              <DollarSign class="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
      
      <!-- Linha 2 - Paga -->
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="px-4 py-3">
          <input type="checkbox" class="rounded border-gray-300" />
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <Wifi class="w-4 h-4 text-blue-600" />
            </div>
            <span class="text-sm font-medium text-[#1f2937]">Internet Empresarial</span>
          </div>
        </td>
        <td class="px-4 py-3">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
            <Zap class="w-3 h-3" />
            Serviços
          </span>
        </td>
        <td class="px-4 py-3 text-sm text-[#1f2937]">Vivo Empresas</td>
        <td class="px-4 py-3 text-sm text-[#1f2937]">20/03/2026</td>
        <td class="px-4 py-3 text-sm font-medium text-red-600 text-right">R$ 299,00</td>
        <td class="px-4 py-3 text-center">
          <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle class="w-3 h-3 mr-1" />
            Paga
          </span>
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center justify-center gap-1">
            <button class="p-1.5 text-gray-400 hover:text-[#3e5653] hover:bg-gray-100 rounded transition-colors">
              <Eye class="w-4 h-4" />
            </button>
            <button class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
              <Edit class="w-4 h-4" />
            </button>
            <button class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
      
      <!-- Linha 3 - Vencida -->
      <tr class="hover:bg-gray-50 transition-colors bg-red-50/50">
        <td class="px-4 py-3">
          <input type="checkbox" class="rounded border-gray-300" />
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
              <Package class="w-4 h-4 text-orange-600" />
            </div>
            <span class="text-sm font-medium text-[#1f2937]">Material de Escritório</span>
          </div>
        </td>
        <td class="px-4 py-3">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
            <ShoppingCart class="w-3 h-3" />
            Compras
          </span>
        </td>
        <td class="px-4 py-3 text-sm text-[#1f2937]">Papelaria XYZ</td>
        <td class="px-4 py-3 text-sm text-red-600 font-medium">10/03/2026</td>
        <td class="px-4 py-3 text-sm font-medium text-red-600 text-right">R$ 450,00</td>
        <td class="px-4 py-3 text-center">
          <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <AlertCircle class="w-3 h-3 mr-1" />
            Vencida
          </span>
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center justify-center gap-1">
            <button class="p-1.5 text-gray-400 hover:text-[#3e5653] hover:bg-gray-100 rounded transition-colors">
              <Eye class="w-4 h-4" />
            </button>
            <button class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
              <Edit class="w-4 h-4" />
            </button>
            <button class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
              <Trash2 class="w-4 h-4" />
            </button>
            <button class="p-1.5 text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors">
              <DollarSign class="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

#### 3.2.5 Resumo Lateral

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
  <h3 class="text-lg font-semibold text-[#1f2937] mb-4">Resumo</h3>
  
  <div class="space-y-4">
    <div class="flex items-center justify-between pb-3 border-b border-gray-100">
      <span class="text-sm text-[#627271]">Total em Contas</span>
      <span class="text-lg font-bold text-[#1f2937]">R$ 24.567,00</span>
    </div>
    
    <div class="flex items-center justify-between">
      <span class="text-sm text-[#627271]">Pendentes</span>
      <span class="text-sm font-semibold text-yellow-600">R$ 8.450,00</span>
    </div>
    
    <div class="flex items-center justify-between">
      <span class="text-sm text-[#627271]">Pagas</span>
      <span class="text-sm font-semibold text-green-600">R$ 14.017,00</span>
    </div>
    
    <div class="flex items-center justify-between">
      <span class="text-sm text-[#627271]">Vencidas</span>
      <span class="text-sm font-semibold text-red-600">R$ 2.100,00</span>
    </div>
    
    <div class="flex items-center justify-between">
      <span class="text-sm text-[#627271]">Agendadas</span>
      <span class="text-sm font-semibold text-blue-600">R$ 0,00</span>
    </div>
  </div>
  
  <div class="mt-6 pt-4 border-t border-gray-200">
    <div class="flex items-center gap-2 text-sm text-[#627271]">
      <AlertTriangle class="w-4 h-4 text-yellow-500" />
      <span>2 contas vencendo esta semana</span>
    </div>
  </div>
</div>
```

### 3.3 Modal de Pagamento

```html
<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div class="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-[#1f2937]">Registrar Pagamento</h3>
      <button class="text-gray-400 hover:text-gray-600">
        <X class="w-5 h-5" />
      </button>
    </div>
    
    <!-- Content -->
    <div class="p-6 space-y-4">
      <!-- Detalhes da Conta -->
      <div class="bg-gray-50 rounded-lg p-4 space-y-2">
        <div class="flex justify-between">
          <span class="text-sm text-[#627271]">Descrição:</span>
          <span class="text-sm font-medium text-[#1f2937]">Aluguel Escritório</span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm text-[#627271]">Fornecedor:</span>
          <span class="text-sm font-medium text-[#1f2937]">Imobiliária Central</span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm text-[#627271]">Valor Original:</span>
          <span class="text-sm font-medium text-red-600">R$ 2.500,00</span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm text-[#627271]">Vencimento:</span>
          <span class="text-sm font-medium text-[#1f2937]">12/03/2026</span>
        </div>
      </div>
      
      <!-- Formulário -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-[#1f2937] mb-1">Data do Pagamento</label>
          <input 
            type="date" 
            value="2026-03-12"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-[#1f2937] mb-1">Valor Pago</label>
          <input 
            type="text" 
            value="R$ 2.500,00"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]"
          />
        </div>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">Forma de Pagamento</label>
        <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]">
          <option value="">Selecione...</option>
          <option value="money">Dinheiro</option>
          <option value="credit">Cartão de Crédito</option>
          <option value="debit">Cartão de Débito</option>
          <option value="pix">PIX</option>
          <option value="boleto">Boleto</option>
          <option value="transfer">Transferência</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">Conta Bancária</label>
        <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]">
          <option value="">Selecione...</option>
          <option value="1">Itaú - Corrente (***1234)</option>
          <option value="2">Bradesco - Corrente (***5678)</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">Comprovante (opcional)</label>
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#86cb92] transition-colors cursor-pointer">
          <Upload class="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p class="text-sm text-[#627271]">Arraste ou clique para anexar</p>
          <p class="text-xs text-gray-400 mt-1">PDF, JPG ou PNG até 5MB</p>
        </div>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">Observações</label>
        <textarea 
          rows="2"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] resize-none"
          placeholder="Adicione observações sobre o pagamento..."
        ></textarea>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
      <button class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
        Cancelar
      </button>
      <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
        Confirmar Pagamento
      </button>
    </div>
  </div>
</div>
```

---

## 4. Tela 3: Contas a Receber (/financeiro/receber)

### 4.1 Estrutura do Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar #1f2937]                                                                   │
│ ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] Contas a Receber                        [+ Nova Receita]               │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Filtros]                                                                       │ │
│ │ [Período: ▼] [Status: Todas ▼] [Categoria: Todas ▼] [Cliente: 🔍] [Filtrar]   │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Tabela de Recebíveis]                                                          │ │
│ │ ┌───────────────────────────────────────────────────────────────────────────┐   │ │
│ │ │ ☐ Descrição      Cliente        Venc.    Valor    Status    Ações        │   │ │
│ │ │ ☐ Venda #1234    ABC Ltda      15/03   R$ 5.000  [Pend]   👁 ✏️ 🗑 💰 📧│   │ │
│ │ │ ☐ Serviço X      Cliente B     20/03   R$ 2.500  [Pend]   👁 ✏️ 🗑 💰 📧│   │ │
│ │ │ ☐ Venda #1230    XYZ Corp      05/03   R$ 1.200  [Pago]   👁 ✏️ 🗑      │   │ │
│ │ │ ☐ Consultoria    Empresa C     01/03   R$ 3.000  [Atras]  👁 ✏️ 🗑 💰 📧│   │ │
│ │ └───────────────────────────────────────────────────────────────────────────┘   │ │
│ │                                                                                 │ │
│ │ [Resumo Lateral]                                                                │ │
│ │ ┌───────────────┐                                                               │ │
│ │ │ Total:        │                                                               │ │
│ │ │ R$ 32.150,00 │                                                               │ │
│ │ │               │                                                               │ │
│ │ │ A Receber:   │                                                               │ │
│ │ │ R$ 12.300,00 │                                                               │ │
│ │ │               │                                                               │ │
│ │ │ Recebido:    │                                                               │ │
│ │ │ R$ 19.850,00 │                                                               │ │
│ │ │               │                                                               │ │
│ │ │ Em Atraso:   │                                                               │ │
│ │ │ R$ 3.000,00  │                                                               │ │
│ │ └───────────────┘                                                               │ │
│ └─────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Componentes

#### 4.2.1 Header (variante receitas)

```html
<header class="bg-white border-b border-gray-200 px-6 py-4">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-[#1f2937]">Contas a Receber</h1>
      <p class="text-sm text-[#627271]">Gerencie suas receitas e cobranças</p>
    </div>
    <button class="flex items-center gap-2 px-4 py-2 bg-[#86cb92] text-white rounded-lg hover:bg-[#6bb87a] transition-colors">
      <Plus class="w-4 h-4" />
      Nova Receita
    </button>
  </div>
</header>
```

#### 4.2.2 Tabela de Recebíveis

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
  <table class="w-full">
    <thead class="bg-gray-50 border-b border-gray-200">
      <tr>
        <th class="px-4 py-3 w-10">
          <input type="checkbox" class="rounded border-gray-300" />
        </th>
        <th class="px-4 py-3 text-left text-xs font-medium text-[#627271] uppercase tracking-wider">Descrição</th>
        <th class="px-4 py-3 text-left text-xs font-medium text-[#627271] uppercase tracking-wider">Cliente</th>
        <th class="px-4 py-3 text-left text-xs font-medium text-[#627271] uppercase tracking-wider">Vencimento</th>
        <th class="px-4 py-3 text-right text-xs font-medium text-[#627271] uppercase tracking-wider">Valor</th>
        <th class="px-4 py-3 text-center text-xs font-medium text-[#627271] uppercase tracking-wider">Status</th>
        <th class="px-4 py-3 text-center text-xs font-medium text-[#627271] uppercase tracking-wider">Ações</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <!-- Linha Pendente -->
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="px-4 py-3">
          <input type="checkbox" class="rounded border-gray-300" />
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-[#86cb92]/20 flex items-center justify-center">
              <ShoppingBag class="w-4 h-4 text-[#86cb92]" />
            </div>
            <div>
              <span class="text-sm font-medium text-[#1f2937]">Venda #1234</span>
              <p class="text-xs text-[#627271]">Produtos diversos</p>
            </div>
          </div>
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-full bg-[#3e5653] flex items-center justify-center text-white text-xs font-medium">
              A
            </div>
            <span class="text-sm text-[#1f2937]">ABC Ltda</span>
          </div>
        </td>
        <td class="px-4 py-3 text-sm text-[#1f2937]">15/03/2026</td>
        <td class="px-4 py-3 text-sm font-medium text-[#86cb92] text-right">R$ 5.000,00</td>
        <td class="px-4 py-3 text-center">
          <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            Pendente
          </span>
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center justify-center gap-1">
            <button class="p-1.5 text-gray-400 hover:text-[#3e5653] hover:bg-gray-100 rounded transition-colors">
              <Eye class="w-4 h-4" />
            </button>
            <button class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
              <Edit class="w-4 h-4" />
            </button>
            <button class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
              <Trash2 class="w-4 h-4" />
            </button>
            <button class="p-1.5 text-[#86cb92] hover:text-[#6bb87a] hover:bg-green-50 rounded transition-colors" title="Receber">
              <DollarSign class="w-4 h-4" />
            </button>
            <button class="p-1.5 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Enviar Cobrança">
              <Send class="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
      
      <!-- Linha em Atraso -->
      <tr class="hover:bg-gray-50 transition-colors bg-red-50/50">
        <td class="px-4 py-3">
          <input type="checkbox" class="rounded border-gray-300" />
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <Briefcase class="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <span class="text-sm font-medium text-[#1f2937]">Consultoria</span>
              <p class="text-xs text-[#627271]">Serviço de implementação</p>
            </div>
          </div>
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-medium">
              E
            </div>
            <span class="text-sm text-[#1f2937]">Empresa C</span>
          </div>
        </td>
        <td class="px-4 py-3 text-sm text-red-600 font-medium">01/03/2026</td>
        <td class="px-4 py-3 text-sm font-medium text-[#86cb92] text-right">R$ 3.000,00</td>
        <td class="px-4 py-3 text-center">
          <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <AlertCircle class="w-3 h-3 mr-1" />
            Em Atraso
          </span>
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center justify-center gap-1">
            <button class="p-1.5 text-gray-400 hover:text-[#3e5653] hover:bg-gray-100 rounded transition-colors">
              <Eye class="w-4 h-4" />
            </button>
            <button class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
              <Edit class="w-4 h-4" />
            </button>
            <button class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
              <Trash2 class="w-4 h-4" />
            </button>
            <button class="p-1.5 text-[#86cb92] hover:text-[#6bb87a] hover:bg-green-50 rounded transition-colors">
              <DollarSign class="w-4 h-4" />
            </button>
            <button class="p-1.5 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
              <Send class="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### 4.3 Modal de Recebimento

```html
<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div class="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-[#1f2937]">Registrar Recebimento</h3>
      <button class="text-gray-400 hover:text-gray-600">
        <X class="w-5 h-5" />
      </button>
    </div>
    
    <div class="p-6 space-y-4">
      <!-- Detalhes -->
      <div class="bg-gray-50 rounded-lg p-4 space-y-2">
        <div class="flex justify-between">
          <span class="text-sm text-[#627271]">Descrição:</span>
          <span class="text-sm font-medium text-[#1f2937]">Venda #1234</span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm text-[#627271]">Cliente:</span>
          <span class="text-sm font-medium text-[#1f2937]">ABC Ltda</span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm text-[#627271]">Valor Original:</span>
          <span class="text-sm font-medium text-[#86cb92]">R$ 5.000,00</span>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-[#1f2937] mb-1">Data do Recebimento</label>
          <input 
            type="date" 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-[#1f2937] mb-1">Valor Recebido</label>
          <input 
            type="text" 
            value="R$ 5.000,00"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]"
          />
        </div>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">Forma de Recebimento</label>
        <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]">
          <option value="">Selecione...</option>
          <option value="money">Dinheiro</option>
          <option value="pix">PIX</option>
          <option value="boleto">Boleto</option>
          <option value="transfer">Transferência</option>
          <option value="check">Cheque</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">Conta Bancária de Destino</label>
        <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]">
          <option value="">Selecione...</option>
          <option value="1">Itaú - Corrente (***1234)</option>
        </select>
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-[#1f2937] mb-1">Desconto (opcional)</label>
          <input 
            type="text" 
            placeholder="R$ 0,00"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-[#1f2937] mb-1">Juros (opcional)</label>
          <input 
            type="text" 
            placeholder="R$ 0,00"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]"
          />
        </div>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">Observações</label>
        <textarea 
          rows="2"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] resize-none"
        ></textarea>
      </div>
    </div>
    
    <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
      <button class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
        Cancelar
      </button>
      <button class="px-4 py-2 bg-[#86cb92] text-white rounded-lg hover:bg-[#6bb87a] transition-colors">
        Confirmar Recebimento
      </button>
    </div>
  </div>
</div>
```

### 4.4 Modal de Envio de Cobrança

```html
<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div class="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-[#1f2937]">Enviar Cobrança</h3>
      <button class="text-gray-400 hover:text-gray-600">
        <X class="w-5 h-5" />
      </button>
    </div>
    
    <div class="p-6 space-y-4">
      <!-- Destinatário -->
      <div class="bg-gray-50 rounded-lg p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-[#3e5653] flex items-center justify-center text-white font-medium">
            A
          </div>
          <div>
            <p class="text-sm font-medium text-[#1f2937]">ABC Ltda</p>
            <p class="text-xs text-[#627271]">contato@abcltda.com.br</p>
          </div>
        </div>
      </div>
      
      <!-- Valor em Destaque -->
      <div class="text-center py-4 border-y border-gray-100">
        <p class="text-sm text-[#627271] mb-1">Valor em Aberto</p>
        <p class="text-3xl font-bold text-[#86cb92]">R$ 5.000,00</p>
        <p class="text-xs text-yellow-600 mt-1">Vence em 3 dias (15/03/2026)</p>
      </div>
      
      <!-- Canal de Envio -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-2">Enviar via</label>
        <div class="flex gap-3">
          <button class="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-blue-500 bg-blue-50 rounded-lg">
            <Mail class="w-5 h-5 text-blue-600" />
            <span class="text-sm font-medium text-blue-700">E-mail</span>
          </button>
          <button class="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50">
            <MessageCircle class="w-5 h-5 text-green-600" />
            <span class="text-sm font-medium text-gray-700">WhatsApp</span>
          </button>
        </div>
      </div>
      
      <!-- Template -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">Template da Mensagem</label>
        <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] mb-2">
          <option value="friendly">Cobrança Amigável</option>
          <option value="formal">Cobrança Formal</option>
          <option value="urgent">Urgente</option>
          <option value="custom">Personalizado</option>
        </select>
        
        <!-- Preview -->
        <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p class="text-sm text-[#1f2937] whitespace-pre-line">Prezado(a),</p>
          <p class="text-sm text-[#1f2937] mt-2 whitespace-pre-line">
            Gostaríamos de lembrar que a fatura no valor de <strong>R$ 5.000,00</strong> vencerá em <strong>15/03/2026</strong>.
          </p>
          <p class="text-sm text-[#1f2937] mt-2 whitespace-pre-line">
            Caso já tenha efetuado o pagamento, por favor desconsidere esta mensagem.
          </p>
          <p class="text-sm text-[#1f2937] mt-4 whitespace-pre-line">
            Atenciosamente,<br/>
            Equipe UNIQ
          </p>
        </div>
      </div>
      
      <!-- Anexar Boleto -->
      <div class="flex items-center gap-2">
        <input type="checkbox" id="attach-boleto" class="rounded border-gray-300" checked />
        <label for="attach-boleto" class="text-sm text-[#1f2937]">Anexar boleto/código PIX</label>
      </div>
    </div>
    
    <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
      <button class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
        Cancelar
      </button>
      <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
        <Send class="w-4 h-4" />
        Enviar Cobrança
      </button>
    </div>
  </div>
</div>
```

---

## 5. Tela 4: Fluxo de Caixa (/financeiro/fluxo)

### 5.1 Estrutura do Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar #1f2937]                                                                   │
│ ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] Fluxo de Caixa                                                         │ │
│ │ [Visualização: ● Calendário  ○ Lista]  [Mês: Março 2026 ▼]  [Conta: Todas ▼]   │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Visualização em Calendário]                                                    │ │
│ │ ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┐                                     │ │
│ │ │ DOM │ SEG │ TER │ QUA │ QUI │ SEX │ SÁB │                                     │ │
│ │ ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤                                     │ │
│ │ │     │  1  │  2  │  3  │  4  │  5  │  6  │                                     │ │
│ │ │     │+5.0 │-800 │+2.3 │-500 │+1.2 │     │                                     │ │
│ │ │     │ 💚  │ 💔  │ 💚  │ 💔  │ 💚  │     │                                     │ │
│ │ ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤                                     │ │
│ │ │  7  │  8  │  9  │ 10  │ 11  │ 12  │ 13  │                                     │ │
│ │ │     │-1.2 │+800 │-2.5 │     │ 🔴  │     │                                     │ │
│ │ │     │ 💔  │ 💚  │ 💔  │     │     │     │                                     │ │
│ │ ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤                                     │ │
│ │ │ ... │     │     │     │     │     │     │                                     │ │
│ │ └─────┴─────┴─────┴─────┴─────┴─────┴─────┘                                     │ │
│ │                                                                                 │ │
│ │ Legenda: 💚 Entrada  💔 Saída  🔴 Saldo Negativo                                │ │
│ └─────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Componentes

#### 5.2.1 Visualização em Calendário

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
  <!-- Header do Calendário -->
  <div class="flex items-center justify-between mb-4">
    <div class="flex items-center gap-4">
      <button class="p-2 hover:bg-gray-100 rounded-lg">
        <ChevronLeft class="w-5 h-5" />
      </button>
      <h3 class="text-lg font-semibold text-[#1f2937]">Março 2026</h3>
      <button class="p-2 hover:bg-gray-100 rounded-lg">
        <ChevronRight class="w-5 h-5" />
      </button>
    </div>
    
    <div class="flex items-center gap-2 text-sm">
      <div class="flex items-center gap-1">
        <div class="w-3 h-3 rounded-full bg-[#86cb92]"></div>
        <span class="text-[#627271]">Entrada</span>
      </div>
      <div class="flex items-center gap-1">
        <div class="w-3 h-3 rounded-full bg-red-500"></div>
        <span class="text-[#627271]">Saída</span>
      </div>
      <div class="flex items-center gap-1">
        <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
        <span class="text-[#627271]">Saldo Negativo</span>
      </div>
    </div>
  </div>
  
  <!-- Grid do Calendário -->
  <div class="grid grid-cols-7 gap-1">
    <!-- Dias da Semana -->
    <div class="text-center py-2 text-xs font-medium text-[#627271] uppercase">Dom</div>
    <div class="text-center py-2 text-xs font-medium text-[#627271] uppercase">Seg</div>
    <div class="text-center py-2 text-xs font-medium text-[#627271] uppercase">Ter</div>
    <div class="text-center py-2 text-xs font-medium text-[#627271] uppercase">Qua</div>
    <div class="text-center py-2 text-xs font-medium text-[#627271] uppercase">Qui</div>
    <div class="text-center py-2 text-xs font-medium text-[#627271] uppercase">Sex</div>
    <div class="text-center py-2 text-xs font-medium text-[#627271] uppercase">Sáb</div>
    
    <!-- Dias (exemplo) -->
    <div class="h-24 border border-gray-100 rounded-lg p-2 bg-gray-50/50"></div>
    
    <!-- Dia com movimentação -->
    <div class="h-24 border border-gray-100 rounded-lg p-2 hover:bg-gray-50 cursor-pointer transition-colors">
      <span class="text-sm font-medium text-[#1f2937]">1</span>
      <div class="mt-1 space-y-0.5">
        <div class="text-xs text-[#86cb92] font-medium">+ R$ 5.000</div>
        <div class="text-xs text-red-500">- R$ 800</div>
        <div class="text-xs font-medium text-[#1f2937] border-t border-gray-200 pt-0.5">R$ 4.200</div>
      </div>
    </div>
    
    <!-- Dia com saldo negativo -->
    <div class="h-24 border border-red-200 rounded-lg p-2 bg-red-50 hover:bg-red-100 cursor-pointer transition-colors">
      <span class="text-sm font-medium text-[#1f2937]">12</span>
      <div class="mt-1">
        <div class="flex items-center gap-1">
          <AlertCircle class="w-3 h-3 text-red-500" />
          <span class="text-xs text-red-600 font-medium">R$ -1.200</span>
        </div>
        <div class="text-xs text-red-500 mt-0.5">- R$ 2.500</div>
      </div>
    </div>
    
    <!-- Mais dias... -->
  </div>
</div>
```

#### 5.2.2 Visualização em Lista

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
  <div class="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
    <h3 class="text-lg font-semibold text-[#1f2937]">Movimentações do Período</h3>
    <button class="text-sm text-[#3e5653] hover:underline">Exportar</button>
  </div>
  
  <div class="divide-y divide-gray-200">
    <!-- Dia Agrupado -->
    <div>
      <!-- Header do Dia -->
      <div class="bg-gray-50 px-5 py-3 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="text-lg font-bold text-[#1f2937]">01</span>
          <div>
            <p class="text-sm font-medium text-[#1f2937]">Sábado, 01 de Março</p>
            <p class="text-xs text-[#627271]">Saldo Inicial: R$ 12.430,00</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-sm font-medium text-[#86cb92]">+ R$ 5.000,00</p>
          <p class="text-sm font-medium text-red-500">- R$ 800,00</p>
          <p class="text-sm font-bold text-[#1f2937]">Saldo: R$ 16.630,00</p>
        </div>
      </div>
      
      <!-- Transações do Dia -->
      <div class="divide-y divide-gray-100">
        <!-- Receita -->
        <div class="px-5 py-3 flex items-center justify-between hover:bg-gray-50">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-[#86cb92]/20 flex items-center justify-center">
              <ArrowDownLeft class="w-4 h-4 text-[#86cb92]" />
            </div>
            <div>
              <p class="text-sm font-medium text-[#1f2937]">Recebimento - ABC Ltda</p>
              <p class="text-xs text-[#627271]">Venda #1234 • Boleto</p>
            </div>
          </div>
          <span class="text-sm font-medium text-[#86cb92]">+ R$ 5.000,00</span>
        </div>
        
        <!-- Despesa -->
        <div class="px-5 py-3 flex items-center justify-between hover:bg-gray-50">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
              <ArrowUpRight class="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p class="text-sm font-medium text-[#1f2937]">Pagamento - Fornecedor X</p>
              <p class="text-xs text-[#627271]">Compra de materiais • PIX</p>
            </div>
          </div>
          <span class="text-sm font-medium text-red-600">- R$ 800,00</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## 6. Tela 5: Categorias (/financeiro/categorias)

### 6.1 Estrutura do Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar #1f2937]                                                                   │
│ ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] Categorias Financeiras                   [+ Nova Categoria]            │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Abas: Receitas | Despesas]                                                     │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Grid de Categorias]                                                            │ │
│ │ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │ │
│ │ │ [💼]         │ │ [🏢]         │ │ [📊]         │ │ [🎯]         │            │ │
│ │ │ Vendas       │ │ Serviços     │ │ Consultoria  │ │ Outros       │            │ │
│ │ │              │ │              │ │              │ │              │            │ │
│ │ │ R$ 45.000   │ │ R$ 12.500   │ │ R$ 8.000    │ │ R$ 2.300    │            │ │
│ │ │ este mês    │ │ este mês    │ │ este mês    │ │ este mês    │            │ │
│ │ │              │ │              │ │              │ │              │            │ │
│ │ │ [✏️] [🗑]   │ │ [✏️] [🗑]   │ │ [✏️] [🗑]   │ │ [✏️] [🗑]   │            │ │
│ │ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘            │ │
│ │                                                                                 │ │
│ │ [Seção: Categorias do Sistema (não editáveis)]                                  │ │
│ │ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                             │ │
│ │ │ [🔒]         │ │ [🔒]         │ │ [🔒]         │                             │ │
│ │ │ Transferência│ │ Ajuste       │ │ Juros        │                             │ │
│ │ │ Recebido     │ │ de Caixa     │ │ Recebidos    │                             │ │
│ │ └──────────────┘ └──────────────┘ └──────────────┘                             │ │
│ └─────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Componentes

#### 6.2.1 Grid de Categorias

```html
<div class="space-y-6">
  <!-- Abas -->
  <div class="flex items-center gap-1 border-b border-gray-200">
    <button class="px-4 py-2 text-sm font-medium text-[#86cb92] border-b-2 border-[#86cb92]">
      Receitas
      <span class="ml-1 px-2 py-0.5 bg-[#86cb92]/20 rounded-full text-xs">8</span>
    </button>
    <button class="px-4 py-2 text-sm font-medium text-[#627271] hover:text-[#1f2937]">
      Despesas
      <span class="ml-1 px-2 py-0.5 bg-gray-100 rounded-full text-xs">12</span>
    </button>
  </div>
  
  <!-- Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <!-- Card Categoria -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow group">
      <div class="flex items-start justify-between mb-3">
        <div class="w-12 h-12 rounded-xl bg-[#86cb92]/20 flex items-center justify-center">
          <ShoppingBag class="w-6 h-6 text-[#86cb92]" />
        </div>
        <div class="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <button class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
            <Edit class="w-4 h-4" />
          </button>
          <button class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded">
            <Trash2 class="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <h4 class="text-base font-semibold text-[#1f2937] mb-1">Vendas</h4>
      <p class="text-xs text-[#627271] mb-3">Receita</p>
      
      <div class="pt-3 border-t border-gray-100">
        <p class="text-xs text-[#627271]">Total este mês</p>
        <p class="text-lg font-bold text-[#86cb92]">R$ 45.000,00</p>
      </div>
    </div>
    
    <!-- Mais categorias... -->
  </div>
  
  <!-- Seção Sistema -->
  <div class="pt-6 border-t border-gray-200">
    <h3 class="text-sm font-medium text-[#627271] mb-4">Categorias do Sistema</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-gray-50 rounded-xl border border-gray-200 p-5 opacity-75">
        <div class="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center mb-3">
          <ArrowLeftRight class="w-6 h-6 text-gray-500" />
        </div>
        <h4 class="text-base font-semibold text-[#1f2937]">Transferência</h4>
        <p class="text-xs text-[#627271]">Receita</p>
        <div class="mt-3 flex items-center gap-1 text-xs text-gray-400">
          <Lock class="w-3 h-3" />
          Sistema
        </div>
      </div>
    </div>
  </div>
</div>
```

### 6.3 Modal Nova Categoria

```html
<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div class="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-[#1f2937]">Nova Categoria</h3>
      <button class="text-gray-400 hover:text-gray-600">
        <X class="w-5 h-5" />
      </button>
    </div>
    
    <div class="p-6 space-y-4">
      <!-- Nome -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">Nome da Categoria</label>
        <input 
          type="text" 
          placeholder="Ex: Vendas"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]"
        />
      </div>
      
      <!-- Tipo -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">Tipo</label>
        <div class="flex gap-3">
          <label class="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-[#86cb92] bg-[#86cb92]/10 rounded-lg cursor-pointer">
            <input type="radio" name="type" value="income" class="text-[#86cb92]" checked />
            <ArrowDownLeft class="w-4 h-4 text-[#86cb92]" />
            <span class="text-sm font-medium text-[#86cb92]">Receita</span>
          </label>
          <label class="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-red-300">
            <input type="radio" name="type" value="expense" class="text-red-500" />
            <ArrowUpRight class="w-4 h-4 text-red-500" />
            <span class="text-sm font-medium text-gray-700">Despesa</span>
          </label>
        </div>
      </div>
      
      <!-- Cor -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-2">Cor</label>
        <div class="flex flex-wrap gap-2">
          <button class="w-8 h-8 rounded-lg bg-[#86cb92] ring-2 ring-offset-2 ring-[#86cb92]"></button>
          <button class="w-8 h-8 rounded-lg bg-blue-500 hover:ring-2 hover:ring-offset-2 hover:ring-blue-500"></button>
          <button class="w-8 h-8 rounded-lg bg-green-500 hover:ring-2 hover:ring-offset-2 hover:ring-green-500"></button>
          <button class="w-8 h-8 rounded-lg bg-yellow-500 hover:ring-2 hover:ring-offset-2 hover:ring-yellow-500"></button>
          <button class="w-8 h-8 rounded-lg bg-orange-500 hover:ring-2 hover:ring-offset-2 hover:ring-orange-500"></button>
          <button class="w-8 h-8 rounded-lg bg-red-500 hover:ring-2 hover:ring-offset-2 hover:ring-red-500"></button>
          <button class="w-8 h-8 rounded-lg bg-purple-500 hover:ring-2 hover:ring-offset-2 hover:ring-purple-500"></button>
          <button class="w-8 h-8 rounded-lg bg-pink-500 hover:ring-2 hover:ring-offset-2 hover:ring-pink-500"></button>
        </div>
      </div>
      
      <!-- Ícone -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-2">Ícone</label>
        <div class="grid grid-cols-8 gap-2">
          <button class="w-10 h-10 rounded-lg bg-[#86cb92]/20 flex items-center justify-center ring-2 ring-[#86cb92]">
            <ShoppingBag class="w-5 h-5 text-[#86cb92]" />
          </button>
          <button class="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center">
            <Briefcase class="w-5 h-5 text-gray-500" />
          </button>
          <button class="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center">
            <DollarSign class="w-5 h-5 text-gray-500" />
          </button>
          <button class="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center">
            <TrendingUp class="w-5 h-5 text-gray-500" />
          </button>
          <button class="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center">
            <Home class="w-5 h-5 text-gray-500" />
          </button>
          <button class="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center">
            <Car class="w-5 h-5 text-gray-500" />
          </button>
          <button class="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center">
            <Utensils class="w-5 h-5 text-gray-500" />
          </button>
          <button class="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center">
            <MoreHorizontal class="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
    
    <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
      <button class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
        Cancelar
      </button>
      <button class="px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors">
        Criar Categoria
      </button>
    </div>
  </div>
</div>
```

---

## 7. Tela 6: Contas Bancárias (/financeiro/contas)

### 7.1 Estrutura do Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar #1f2937]                                                                   │
│ ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] Contas Bancárias                        [+ Nova Conta]                 │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Card Saldo Consolidado]                                                        │ │
│ │ ┌───────────────────────────────────────────────────────────────────────────┐   │ │
│ │ │ Saldo Consolidado                                         R$ 45.230,00   │   │ │
│ │ │ Total em 3 contas ativas                                                  │   │ │
│ │ └───────────────────────────────────────────────────────────────────────────┘   │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Lista de Contas]                                                               │ │
│ │ ┌───────────────────────────────────────────────────────────────────────────┐   │ │
│ │ │ [🏦 Itaú]                    Corrente  Ag: 1234  CC: ***4321              │   │ │
│ │ │                              R$ 23.450,00                [Ativa] [✏️ 🗑 📄]│   │ │
│ │ ├───────────────────────────────────────────────────────────────────────────┤   │ │
│ │ │ [🏦 Bradesco]                Corrente  Ag: 5678  CC: ***9876              │   │ │
│ │ │                              R$ 15.780,00                [Ativa] [✏️ 🗑 📄]│   │ │
│ │ ├───────────────────────────────────────────────────────────────────────────┤   │ │
│ │ │ [🏦 Nubank]                  Poupança  Ag: 0001  CC: ***5555              │   │ │
│ │ │                              R$ 6.000,00                 [Ativa] [✏️ 🗑 📄]│   │ │
│ │ └───────────────────────────────────────────────────────────────────────────┘   │ │
│ │                                                                                 │ │
│ │ [Botão Flutuante: ↔ Transferência]                                             │ │
│ └─────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 7.2 Componentes

#### 7.2.1 Card Saldo Consolidado

```html
<div class="bg-gradient-to-r from-[#3e5653] to-[#627271] rounded-xl shadow-lg p-6 text-white">
  <div class="flex items-center justify-between">
    <div>
      <p class="text-sm text-white/80 mb-1">Saldo Consolidado</p>
      <h3 class="text-3xl font-bold">R$ 45.230,00</h3>
      <p class="text-sm text-white/70 mt-2">Total em 3 contas ativas</p>
    </div>
    <div class="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center">
      <Landmark class="w-8 h-8" />
    </div>
  </div>
</div>
```

#### 7.2.2 Lista de Contas

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
  <!-- Conta Itaú -->
  <div class="p-5 hover:bg-gray-50 transition-colors border-b border-gray-100">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-[#EC7000] to-[#FF8C00] flex items-center justify-center text-white font-bold text-lg">
          Itaú
        </div>
        <div>
          <h4 class="text-base font-semibold text-[#1f2937]">Itaú Unibanco</h4>
          <div class="flex items-center gap-3 text-sm text-[#627271] mt-1">
            <span class="px-2 py-0.5 bg-gray-100 rounded text-xs">Corrente</span>
            <span>Ag: 1234</span>
            <span>CC: ***4321</span>
          </div>
        </div>
      </div>
      
      <div class="text-right">
        <p class="text-xl font-bold text-[#1f2937]">R$ 23.450,00</p>
        <span class="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
          <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          Ativa
        </span>
      </div>
      
      <div class="flex items-center gap-1 ml-4">
        <button class="p-2 text-gray-400 hover:text-[#3e5653] hover:bg-gray-100 rounded-lg" title="Extrato">
          <FileText class="w-4 h-4" />
        </button>
        <button class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="Editar">
          <Edit class="w-4 h-4" />
        </button>
        <button class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Excluir">
          <Trash2 class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
  
  <!-- Mais contas... -->
</div>
```

#### 7.2.3 Modal Nova Conta

```html
<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div class="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-[#1f2937]">Nova Conta Bancária</h3>
      <button class="text-gray-400 hover:text-gray-600">
        <X class="w-5 h-5" />
      </button>
    </div>
    
    <div class="p-6 space-y-4">
      <!-- Banco -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">Banco</label>
        <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]">
          <option value="">Selecione o banco...</option>
          <option value="341">Itaú (341)</option>
          <option value="237">Bradesco (237)</option>
          <option value="001">Banco do Brasil (001)</option>
          <option value="104">Caixa (104)</option>
          <option value="260">Nubank (260)</option>
          <option value="077">Inter (077)</option>
          <option value="other">Outro</option>
        </select>
      </div>
      
      <!-- Nome Personalizado -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">Nome Personalizado</label>
        <input 
          type="text" 
          placeholder="Ex: Conta Principal"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]"
        />
      </div>
      
      <!-- Tipo -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">Tipo de Conta</label>
        <div class="flex gap-3">
          <label class="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-[#3e5653] bg-[#3e5653]/10 rounded-lg cursor-pointer">
            <input type="radio" name="accountType" value="checking" checked />
            <Wallet class="w-4 h-4" />
            <span class="text-sm font-medium">Corrente</span>
          </label>
          <label class="flex-1 flex items-center justify-center gap-2 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
            <input type="radio" name="accountType" value="savings" />
            <PiggyBank class="w-4 h-4" />
            <span class="text-sm font-medium">Poupança</span>
          </label>
        </div>
      </div>
      
      <!-- Agência e Conta -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-[#1f2937] mb-1">Agência</label>
          <input 
            type="text" 
            placeholder="0000"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-[#1f2937] mb-1">Conta</label>
          <input 
            type="text" 
            placeholder="00000-0"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]"
          />
        </div>
      </div>
      
      <!-- Saldo Inicial -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">Saldo Inicial</label>
        <input 
          type="text" 
          placeholder="R$ 0,00"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]"
        />
        <p class="text-xs text-[#627271] mt-1">Saldo atual da conta no momento do cadastro</p>
      </div>
    </div>
    
    <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
      <button class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
        Cancelar
      </button>
      <button class="px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors">
        Adicionar Conta
      </button>
    </div>
  </div>
</div>
```

#### 7.2.4 Modal Transferência

```html
<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div class="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-[#1f2937]">Transferência entre Contas</h3>
      <button class="text-gray-400 hover:text-gray-600">
        <X class="w-5 h-5" />
      </button>
    </div>
    
    <div class="p-6 space-y-4">
      <!-- Conta Origem -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">Conta de Origem</label>
        <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]">
          <option value="">Selecione...</option>
          <option value="1">Itaú - Corrente (Saldo: R$ 23.450,00)</option>
          <option value="2">Bradesco - Corrente (Saldo: R$ 15.780,00)</option>
        </select>
      </div>
      
      <!-- Ícone Transferência -->
      <div class="flex justify-center">
        <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <ArrowDown class="w-5 h-5 text-gray-400" />
        </div>
      </div>
      
      <!-- Conta Destino -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">Conta de Destino</label>
        <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]">
          <option value="">Selecione...</option>
          <option value="2">Bradesco - Corrente</option>
          <option value="3">Nubank - Poupança</option>
        </select>
      </div>
      
      <!-- Valor -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">Valor</label>
        <input 
          type="text" 
          placeholder="R$ 0,00"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]"
        />
      </div>
      
      <!-- Data -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">Data da Transferência</label>
        <input 
          type="date" 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]"
        />
      </div>
      
      <!-- Observação -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">Observação (opcional)</label>
        <textarea 
          rows="2"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] resize-none"
          placeholder="Ex: Reserva de emergência"
        ></textarea>
      </div>
    </div>
    
    <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
      <button class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
        Cancelar
      </button>
      <button class="px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors flex items-center gap-2">
        <ArrowLeftRight class="w-4 h-4" />
        Confirmar Transferência
      </button>
    </div>
  </div>
</div>
```

---

## 8. Tela 7: Relatórios (/financeiro/relatorios)

### 8.1 Estrutura do Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar #1f2937]                                                                   │
│ ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] Relatórios Financeiros                                                 │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Seleção de Relatório]                                                          │ │
│ │ [▼ DRE] [▼ Fluxo de Caixa] [▼ Contas em Atraso] [▼ por Categoria] [▼ Evolução] │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Filtros]                                                                       │ │
│ │ [Período: 01/03/2026 a 31/03/2026] [Conta: Todas ▼] [Formato: PDF ▼] [Gerar]   │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Visualização do Relatório]                                                     │ │
│ │ ┌───────────────────────────────────────────────────────────────────────────┐   │ │
│ │ │                        DRE - MARÇO 2026                                  │   │ │
│ │ │                                                                           │   │ │
│ │ │ RECEITAS                                                                  │   │ │
│ │ │   Vendas de Produtos                               R$ 35.000,00          │   │ │
│ │ │   Prestação de Serviços                            R$ 12.500,00          │   │ │
│ │ │   Outras Receitas                                   R$ 3.500,00          │   │ │
│ │ │ ─────────────────────────────────────────────────────────────────────    │   │ │
│ │ │ TOTAL DE RECEITAS                                  R$ 51.000,00          │   │ │
│ │ │                                                                           │   │ │
│ │ │ DESPESAS                                                                  │   │ │
│ │ │   Custos Operacionais                              R$ 18.000,00          │   │ │
│ │ │   Despesas Administrativas                         R$ 8.500,00           │   │ │
│ │ │   Impostos                                          R$ 5.200,00          │   │ │
│ │ │ ─────────────────────────────────────────────────────────────────────    │   │ │
│ │ │ TOTAL DE DESPESAS                                  R$ 31.700,00          │   │ │
│ │ │                                                                           │   │ │
│ │ │ ═════════════════════════════════════════════════════════════════════    │   │ │
│ │ │ RESULTADO DO PERÍODO (LUCRO)                       R$ 19.300,00          │   │ │
│ │ │ Margem de Lucro: 37,8%                                                   │   │ │
│ │ │ ═════════════════════════════════════════════════════════════════════    │   │ │
│ │ │                                                                           │   │ │
│ │ └───────────────────────────────────────────────────────────────────────────┘   │ │
│ │                                                                                 │ │
│ │ [Ações: 📄 PDF] [📊 Excel] [🖨️ Imprimir] [✉️ Agendar]                          │ │
│ └─────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Componentes

#### 8.2.1 Seleção de Relatório

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
  <div class="flex flex-wrap gap-2">
    <button class="px-4 py-2 bg-[#3e5653] text-white rounded-lg text-sm font-medium">
      DRE
    </button>
    <button class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
      Fluxo de Caixa Detalhado
    </button>
    <button class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
      Contas em Atraso
    </button>
    <button class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
      Receitas por Categoria
    </button>
    <button class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
      Evolução Mensal
    </button>
  </div>
</div>
```

#### 8.2.2 Filtros de Relatório

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
  <div class="flex flex-wrap items-center gap-3">
    <!-- Período -->
    <div class="flex items-center gap-2">
      <Calendar class="w-4 h-4 text-[#627271]" />
      <input 
        type="date" 
        class="px-3 py-2 border border-gray-300 rounded-lg text-sm"
        value="2026-03-01"
      />
      <span class="text-[#627271]">até</span>
      <input 
        type="date" 
        class="px-3 py-2 border border-gray-300 rounded-lg text-sm"
        value="2026-03-31"
      />
    </div>
    
    <!-- Conta -->
    <select class="px-3 py-2 border border-gray-300 rounded-lg text-sm">
      <option value="">Todas as Contas</option>
      <option value="1">Itaú - Corrente</option>
      <option value="2">Bradesco - Corrente</option>
    </select>
    
    <!-- Comparativo -->
    <label class="flex items-center gap-2">
      <input type="checkbox" class="rounded border-gray-300" />
      <span class="text-sm text-[#627271]">Incluir comparativo</span>
    </label>
    
    <button class="ml-auto px-4 py-2 bg-[#3e5653] text-white rounded-lg text-sm hover:bg-[#1f2937] transition-colors">
      Gerar Relatório
    </button>
  </div>
</div>
```

#### 8.2.3 Visualização DRE

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
  <!-- Header -->
  <div class="bg-[#3e5653] text-white px-6 py-4">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-lg font-semibold">Demonstração do Resultado do Exercício</h3>
        <p class="text-sm text-white/80">Período: 01/03/2026 a 31/03/2026</p>
      </div>
      <div class="text-right">
        <p class="text-2xl font-bold text-[#86cb92]">R$ 19.300,00</p>
        <p class="text-sm text-white/80">Lucro Líquido</p>
      </div>
    </div>
  </div>
  
  <!-- Conteúdo -->
  <div class="p-6">
    <!-- Receitas -->
    <div class="mb-6">
      <h4 class="text-sm font-semibold text-[#86cb92] uppercase tracking-wider mb-3">Receitas</h4>
      <div class="space-y-2">
        <div class="flex justify-between py-2 border-b border-gray-100">
          <span class="text-sm text-[#1f2937]">Vendas de Produtos</span>
          <span class="text-sm font-medium text-[#1f2937]">R$ 35.000,00</span>
        </div>
        <div class="flex justify-between py-2 border-b border-gray-100">
          <span class="text-sm text-[#1f2937]">Prestação de Serviços</span>
          <span class="text-sm font-medium text-[#1f2937]">R$ 12.500,00</span>
        </div>
        <div class="flex justify-between py-2 border-b border-gray-100">
          <span class="text-sm text-[#1f2937]">Outras Receitas</span>
          <span class="text-sm font-medium text-[#1f2937]">R$ 3.500,00</span>
        </div>
        <div class="flex justify-between py-3 bg-[#86cb92]/10 px-3 rounded">
          <span class="text-sm font-semibold text-[#1f2937]">TOTAL DE RECEITAS</span>
          <span class="text-sm font-bold text-[#86cb92]">R$ 51.000,00</span>
        </div>
      </div>
    </div>
    
    <!-- Despesas -->
    <div class="mb-6">
      <h4 class="text-sm font-semibold text-red-500 uppercase tracking-wider mb-3">Despesas</h4>
      <div class="space-y-2">
        <div class="flex justify-between py-2 border-b border-gray-100">
          <span class="text-sm text-[#1f2937]">Custos Operacionais</span>
          <span class="text-sm font-medium text-[#1f2937]">R$ 18.000,00</span>
        </div>
        <div class="flex justify-between py-2 border-b border-gray-100">
          <span class="text-sm text-[#1f2937]">Despesas Administrativas</span>
          <span class="text-sm font-medium text-[#1f2937]">R$ 8.500,00</span>
        </div>
        <div class="flex justify-between py-2 border-b border-gray-100">
          <span class="text-sm text-[#1f2937]">Impostos</span>
          <span class="text-sm font-medium text-[#1f2937]">R$ 5.200,00</span>
        </div>
        <div class="flex justify-between py-3 bg-red-50 px-3 rounded">
          <span class="text-sm font-semibold text-[#1f2937]">TOTAL DE DESPESAS</span>
          <span class="text-sm font-bold text-red-600">R$ 31.700,00</span>
        </div>
      </div>
    </div>
    
    <!-- Resultado -->
    <div class="pt-4 border-t-2 border-gray-200">
      <div class="flex justify-between items-center py-3 bg-[#3e5653] text-white px-4 rounded-lg">
        <span class="font-semibold">RESULTADO DO PERÍODO (LUCRO)</span>
        <span class="text-xl font-bold text-[#86cb92]">R$ 19.300,00</span>
      </div>
      <p class="text-center text-sm text-[#627271] mt-2">
        Margem de Lucro: <span class="font-semibold text-[#86cb92]">37,8%</span>
      </p>
    </div>
  </div>
</div>
```

#### 8.2.4 Gráfico de Pizza - Receitas por Categoria

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
  <h3 class="text-lg font-semibold text-[#1f2937] mb-4">Receitas por Categoria</h3>
  
  <div class="flex items-center gap-8">
    <!-- Gráfico -->
    <div class="w-48 h-48 relative">
      <div class="absolute inset-0 rounded-full" style="
        background: conic-gradient(
          #86cb92 0deg 200deg,
          #3b82f6 200deg 290deg,
          #f59e0b 290deg 340deg,
          #ef4444 340deg 360deg
        );
      "></div>
      <div class="absolute inset-4 bg-white rounded-full flex items-center justify-center">
        <div class="text-center">
          <p class="text-xs text-[#627271]">Total</p>
          <p class="text-lg font-bold text-[#1f2937]">R$ 51K</p>
        </div>
      </div>
    </div>
    
    <!-- Legenda -->
    <div class="space-y-3">
      <div class="flex items-center gap-3">
        <div class="w-4 h-4 rounded bg-[#86cb92]"></div>
        <div>
          <p class="text-sm font-medium text-[#1f2937]">Vendas</p>
          <p class="text-xs text-[#627271]">R$ 35.000 (68,6%)</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="w-4 h-4 rounded bg-blue-500"></div>
        <div>
          <p class="text-sm font-medium text-[#1f2937]">Serviços</p>
          <p class="text-xs text-[#627271]">R$ 12.500 (24,5%)</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="w-4 h-4 rounded bg-amber-500"></div>
        <div>
          <p class="text-sm font-medium text-[#1f2937]">Consultoria</p>
          <p class="text-xs text-[#627271]">R$ 3.000 (5,9%)</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="w-4 h-4 rounded bg-red-500"></div>
        <div>
          <p class="text-sm font-medium text-[#1f2937]">Outros</p>
          <p class="text-xs text-[#627271]">R$ 500 (1,0%)</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

#### 8.2.5 Ações de Exportação

```html
<div class="flex items-center justify-end gap-3">
  <button class="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
    <FileText class="w-4 h-4" />
    Exportar PDF
  </button>
  <button class="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
    <Table class="w-4 h-4" />
    Exportar Excel
  </button>
  <button class="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
    <Printer class="w-4 h-4" />
    Imprimir
  </button>
  <button class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
    <Mail class="w-4 h-4" />
    Agendar Envio
  </button>
</div>
```

---

## 9. Estados e Interações

### 9.1 Estados de Loading

#### Skeleton para Cards
```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 animate-pulse">
  <div class="flex items-start justify-between">
    <div class="space-y-3 flex-1">
      <div class="h-4 bg-gray-200 rounded w-1/3"></div>
      <div class="h-8 bg-gray-200 rounded w-2/3"></div>
      <div class="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
    <div class="w-12 h-12 bg-gray-200 rounded-xl"></div>
  </div>
</div>
```

#### Spinner para Tabelas
```html
<div class="flex items-center justify-center py-12">
  <div class="w-8 h-8 border-4 border-[#86cb92] border-t-transparent rounded-full animate-spin"></div>
  <span class="ml-3 text-sm text-[#627271]">Carregando movimentações...</span>
</div>
```

### 9.2 Estado Vazio

```html
<div class="flex flex-col items-center justify-center py-16 text-center">
  <div class="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
    <Wallet class="w-12 h-12 text-gray-400" />
  </div>
  <h3 class="text-lg font-semibold text-[#1f2937] mb-2">Nenhuma movimentação encontrada</h3>
  <p class="text-sm text-[#627271] mb-6 max-w-md">
    Não há contas cadastradas para o período selecionado. Comece criando sua primeira movimentação.
  </p>
  <div class="flex gap-3">
    <button class="px-4 py-2 bg-[#86cb92] text-white rounded-lg hover:bg-[#6bb87a]">
      <Plus class="w-4 h-4 inline mr-2" />
      Nova Receita
    </button>
    <button class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
      <Plus class="w-4 h-4 inline mr-2" />
      Nova Despesa
    </button>
  </div>
</div>
```

### 9.3 Hover nas Linhas da Tabela

```html
<tr class="hover:bg-gray-50 transition-colors group cursor-pointer">
  <td class="px-4 py-3">...</td>
  <!-- Ações aparecem no hover -->
  <td class="px-4 py-3">
    <div class="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <button class="p-1.5 hover:bg-gray-200 rounded"><Eye class="w-4 h-4" /></button>
      <button class="p-1.5 hover:bg-blue-100 rounded"><Edit class="w-4 h-4" /></button>
    </div>
  </td>
</tr>
```

### 9.4 Toast Notifications

```html
<!-- Sucesso -->
<div class="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in">
  <CheckCircle class="w-5 h-5" />
  <div>
    <p class="font-medium">Pagamento registrado!</p>
    <p class="text-sm text-green-100">Aluguel Escritório - R$ 2.500,00</p>
  </div>
  <button class="text-green-200 hover:text-white"><X class="w-4 h-4" /></button>
</div>

<!-- Erro -->
<div class="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
  <AlertCircle class="w-5 h-5" />
  <div>
    <p class="font-medium">Erro ao processar</p>
    <p class="text-sm text-red-100">Saldo insuficiente na conta selecionada</p>
  </div>
</div>
```

---

## 10. Responsividade

### 10.1 Breakpoints

```css
/* Mobile First */
/* sm: 640px  - Tablets pequenos */
/* md: 768px  - Tablets */
/* lg: 1024px - Desktops */
/* xl: 1280px - Desktops grandes */
```

### 10.2 Grid de Métricas Responsivo

```html
<!-- 1 coluna mobile, 2 colunas tablet, 4 colunas desktop -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- Cards... -->
</div>
```

### 10.3 Tabela Responsiva

```html
<div class="overflow-x-auto -mx-4 px-4">
  <table class="w-full min-w-[800px]">
    <!-- ... -->
  </table>
</div>
```

### 10.4 Sidebar Mobile

```html
<!-- Mobile: Sidebar como drawer -->
<div class="lg:hidden">
  <button class="p-2" onClick={toggleSidebar}>
    <Menu class="w-6 h-6" />
  </button>
  
  <div class={cn(
    "fixed inset-0 z-50 transform transition-transform",
    sidebarOpen ? "translate-x-0" : "-translate-x-full"
  )}>
    <div class="w-64 h-full bg-[#1f2937]" onClick={(e) => e.stopPropagation()}>
      <!-- Menu items... -->
    </div>
  </div>
</div>
```

### 10.5 Cards Empilhados Mobile

```html
<!-- Desktop: Grid lado a lado -->
<!-- Mobile: Stack vertical -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div class="lg:col-span-2">
    <!-- Gráfico principal -->
  </div>
  <div>
    <!-- Sidebar info -->
  </div>
</div>
```

---

## 11. Regras de Negócio (RN-FIN)

| Código | Descrição | Validação |
|--------|-----------|-----------|
| **RN-FIN-001** | Conta não pode ser excluída se tiver movimentações | Verificar histórico antes da exclusão |
| **RN-FIN-002** | Transferência requer saldo suficiente na origem | `saldo_origem >= valor_transferencia` |
| **RN-FIN-003** | Data de vencimento não pode ser anterior à data de emissão | `vencimento >= emissao` |
| **RN-FIN-004** | Conta vencida fica com status "Vencida" automaticamente | Job diário para atualização |
| **RN-FIN-005** | Categoria do sistema não pode ser editada | Campo `is_system = true` |
| **RN-FIN-006** | Pagamento pode ter valor diferente do original | Campo `valor_pago` opcional |
| **RN-FIN-007** | Saldo é atualizado automaticamente após pagamento/recebimento | Trigger em transações |
| **RN-FIN-008** | Contas em atraso calculam juros conforme configuração | Taxa configurável por empresa |
| **RN-FIN-009** | DRE inclui apenas contas pagas/recebidas no período | Filtro por status |
| **RN-FIN-010** | Fluxo de caixa projeta saldo futuro baseado em contas pendentes | Agregação de projeções |
| **RN-FIN-011** | Categoria não pode ser excluída se tiver movimentações | Verificar vínculos |
| **RN-FIN-012** | Transferência entre contas gera duas transações | Saída na origem, entrada no destino |
| **RN-FIN-013** | Envio de cobrança registra histórico de comunicação | Log de envios |
| **RN-FIN-014** | Conta bancária deve ter saldo inicial ao criar | Campo obrigatório |
| **RN-FIN-015** | Conciliação permite vínculo de múltiplas transações | Matching manual ou automático |

---

## 12. Acessibilidade

### 12.1 Navegação por Teclado

```html
<!-- Tabela navegável -->
<table role="grid" aria-label="Contas a pagar">
  <thead>
    <tr role="row">
      <th role="columnheader" tabindex="0" aria-sort="none">Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr role="row" tabindex="0" aria-selected="false">
      <td role="gridcell">Aluguel</td>
    </tr>
  </tbody>
</table>
```

### 12.2 Labels e Descrições

```html
<!-- Botões com aria-label -->
<button aria-label="Marcar conta como paga">
  <DollarSign class="w-4 h-4" />
</button>

<!-- Status com aria-live -->
<div aria-live="polite" aria-atomic="true">
  <span class="sr-only">Status:</span>
  <span>Pendente</span>
</div>
```

### 12.3 Cores e Contraste

```css
/* Todos os textos mantêm contraste mínimo WCAG AA (4.5:1) */
/* Status não dependem apenas de cor */
```

---

## 13. Dependências

### 13.1 Bibliotecas de Gráficos

```json
{
  "recharts": "^2.10.0",
  "chart.js": "^4.4.0",
  "react-chartjs-2": "^5.2.0"
}
```

### 13.2 Ícones

```typescript
// Lucide React
import { 
  Wallet, ArrowDownLeft, ArrowUpRight, TrendingUp,
  Plus, Eye, Edit, Trash2, DollarSign, Send,
  Calendar, Search, Filter, CheckCircle, AlertCircle,
  ChevronLeft, ChevronRight, Download, Upload,
  FileText, Table, Printer, Mail, X,
  Home, Wifi, Package, ShoppingBag, Briefcase,
  Building, Zap, ShoppingCart, Landmark,
  ArrowLeftRight, CheckSquare, PiggyBank, MoreHorizontal,
  Menu, Lock, AlertTriangle
} from 'lucide-react';
```

---

## 14. Changelog

| Versão | Data | Autor | Alterações |
|--------|------|-------|------------|
| 1.0.0 | 2026-03-12 | Frontend Team | Documentação inicial do Módulo Financeiro |

---

## 15. Checklist de Implementação

### Componentes Base
- [ ] Cards de Métricas
- [ ] Tabela de Contas
- [ ] Modais (Pagamento, Recebimento, Transferência)
- [ ] Filtros e Busca
- [ ] Gráficos (Linha, Pizza)
- [ ] Calendário Financeiro
- [ ] Grid de Categorias
- [ ] Cards de Contas Bancárias

### Funcionalidades
- [ ] CRUD Contas a Pagar
- [ ] CRUD Contas a Receber
- [ ] Registro de Pagamento
- [ ] Registro de Recebimento
- [ ] Envio de Cobrança (Email/WhatsApp)
- [ ] Transferência entre Contas
- [ ] Conciliação Bancária
- [ ] Relatórios e Exportações

### Estados
- [ ] Loading em todas as telas
- [ ] Estado vazio com CTA
- [ ] Erros de API com retry
- [ ] Sucesso com toast notification

### Responsividade
- [ ] Mobile (< 640px)
- [ ] Tablet (640px - 1024px)
- [ ] Desktop (> 1024px)
- [ ] Teste em dispositivos reais

### Acessibilidade
- [ ] Navegação por teclado
- [ ] Labels ARIA
- [ ] Contraste de cores
- [ ] Teste com leitor de tela

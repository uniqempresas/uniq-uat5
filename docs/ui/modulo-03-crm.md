# Módulo 03: CRM - Customer Relationship Management

## Metadados

| Atributo | Valor |
|----------|-------|
| **Módulo** | CRM |
| **Código** | MOD-CRM-001 |
| **Versão** | 1.0.0 |
| **Status** | Em Desenvolvimento |
| **Responsável** | Frontend Team |
| **Última Atualização** | 2026-03-12 |

---

## 1. Design System UNIQ - CRM

### 1.1 Paleta de Cores

| Token | Valor HEX | Uso |
|-------|-----------|-----|
| `--bg-primary` | `#efefef` | Fundo principal da aplicação |
| `--bg-card` | `#ffffff` | Fundo de cards e modais |
| `--sidebar-bg` | `#1f2937` | Fundo da sidebar |
| `--btn-primary` | `#3e5653` | Botões primários |
| `--btn-primary-hover` | `#1f2937` | Hover de botões primários |
| `--accent` | `#86cb92` | Detalhes, badges de sucesso, destaques |
| `--text-primary` | `#1f2937` | Texto principal |
| `--text-secondary` | `#627271` | Texto secundário, placeholders |
| `--border` | `#e5e7eb` | Bordas e divisores |
| `--status-new` | `#f3f4f6` | Novo - fundo |
| `--status-new-text` | `#374151` | Novo - texto |
| `--status-qualification` | `#dbeafe` | Qualificação - fundo |
| `--status-qualification-text` | `#1e40af` | Qualificação - texto |
| `--status-proposal` | `#fef3c7` | Proposta - fundo |
| `--status-proposal-text` | `#92400e` | Proposta - texto |
| `--status-negotiation` | `#ffedd5` | Negociação - fundo |
| `--status-negotiation-text` | `#c2410c` | Negociação - texto |
| `--status-won` | `#dcfce7` | Fechado Ganho - fundo |
| `--status-won-text` | `#166534` | Fechado Ganho - texto |
| `--status-lost` | `#fee2e2` | Fechado Perdido - fundo |
| `--status-lost-text` | `#991b1b` | Fechado Perdido - texto |

### 1.2 Tipografia

| Elemento | Fonte | Tamanho | Peso | Cor |
|----------|-------|---------|------|-----|
| Título Página | Poppins | 24px (text-2xl) | 700 (bold) | `#1f2937` |
| Subtítulo | Poppins | 14px (text-sm) | 400 | `#627271` |
| Card Título | Poppins | 16px (text-base) | 600 | `#1f2937` |
| Card Valor | Poppins | 18px (text-lg) | 700 | `#3e5653` |
| Body | Poppins | 14px (text-sm) | 400 | `#1f2937` |
| Caption | Poppins | 12px (text-xs) | 400 | `#627271` |
| Badge | Poppins | 12px (text-xs) | 500 | Variável |

### 1.3 Espaçamentos

| Elemento | Valor Tailwind |
|----------|----------------|
| Container padding | `p-6` |
| Card padding | `p-4` |
| Card gap | `gap-4` |
| Kanban column gap | `gap-4` |
| Kanban card gap | `gap-3` |
| Section margin | `mb-6` |
| Button padding | `px-4 py-2` |
| Input padding | `px-3 py-2` |

### 1.4 Sombras e Bordas

| Elemento | Classes Tailwind |
|----------|------------------|
| Card | `bg-white rounded-lg shadow-sm border border-gray-200` |
| Card Hover | `hover:shadow-md transition-shadow duration-200` |
| Button Primário | `bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors` |
| Button Secundário | `bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50` |
| Input | `border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent` |
| Badge | `px-2 py-1 rounded-full text-xs font-medium` |

---

## 2. Tela 1: Pipeline de Vendas (/crm)

### 2.1 Estrutura do Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar #1f2937]                                                           │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] CRM - Pipeline de Vendas                    [Nova Oportunidade]│ │
│ ├─────────────────────────────────────────────────────────────────────────┤ │
│ │ [Dashboard Cards]                                                       │ │
│ │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐ │ │
│ │ │ Total Opps  │ │ Valor Total │ │ Conversão   │ │ Média Dias Fechar   │ │ │
│ │ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────────────┘ │ │
│ ├─────────────────────────────────────────────────────────────────────────┤ │
│ │ [Kanban Pipeline]                                                       │ │
│ │ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────────────┐ │ │
│ │ │ NOVO    │ │QUALIFICA│ │PROPOSTA │ │NEGOCIAÇ │ │ FECHADO             │ │ │
│ │ │ (12)    │ │ (8)     │ │ (5)     │ │ (3)     │ │ Ganho(4) │Perdido(2)│ │ │
│ │ ├─────────┤ ├─────────┤ ├─────────┤ ├─────────┤ ├─────────┤ ├─────────┤ │ │
│ │ │[Card 1] │ │[Card 3] │ │[Card 6] │ │[Card 9] │ │[Card]   │ │[Card]   │ │ │
│ │ │[Card 2] │ │[Card 4] │ │[Card 7] │ │[Card 10]│ │[Card]   │ │         │ │ │
│ │ │         │ │[Card 5] │ │[Card 8] │ │         │ │         │ │         │ │ │
│ │ │+ Nova   │ │+ Nova   │ │+ Nova   │ │+ Nova   │ │         │ │         │ │ │
│ │ └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘ │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Componentes

#### 2.2.1 Header da Página

**Estrutura HTML/Tailwind:**

```html
<header class="bg-white border-b border-gray-200 px-6 py-4">
  <div class="flex items-center justify-between">
    <!-- Título e Subtítulo -->
    <div>
      <h1 class="text-2xl font-bold text-[#1f2937]">CRM</h1>
      <p class="text-sm text-[#627271]">Pipeline de Vendas</p>
    </div>

    <!-- Ações -->
    <div class="flex items-center gap-3">
      <!-- Busca -->
      <div class="relative">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar oportunidades..."
          class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#86cb92] focus:border-transparent w-64"
        />
      </div>

      <!-- Filtros -->
      <button class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
        <Filter class="w-4 h-4" />
        Filtros
      </button>

      <!-- Botão Nova Oportunidade -->
      <button class="flex items-center gap-2 px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors">
        <Plus class="w-4 h-4" />
        Nova Oportunidade
      </button>
    </div>
  </div>
</header>
```

**Estados:**

| Estado | Comportamento |
|--------|---------------|
| Default | Layout padrão com todos os elementos visíveis |
| Loading | Skeleton no título e subtítulo, botões desabilitados |
| Empty | Mesmo layout, Kanban vazio com estado específico |
| Error | Toast de erro, botão de retry |

#### 2.2.2 Dashboard Cards (Métricas)

**Estrutura:**

```html
<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6 py-4">
  <!-- Card 1: Total de Oportunidades -->
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-xs text-[#627271] uppercase tracking-wide">Total Oportunidades</p>
        <p class="text-2xl font-bold text-[#1f2937] mt-1">32</p>
        <p class="text-xs text-green-600 mt-1 flex items-center gap-1">
          <TrendingUp class="w-3 h-3" />
          +12% vs mês anterior
        </p>
      </div>
      <div class="w-12 h-12 bg-[#86cb92]/10 rounded-full flex items-center justify-center">
        <Target class="w-6 h-6 text-[#86cb92]" />
      </div>
    </div>
  </div>

  <!-- Card 2: Valor Total no Pipeline -->
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-xs text-[#627271] uppercase tracking-wide">Valor no Pipeline</p>
        <p class="text-2xl font-bold text-[#1f2937] mt-1">R$ 245.890</p>
        <p class="text-xs text-green-600 mt-1 flex items-center gap-1">
          <TrendingUp class="w-3 h-3" />
          +8% vs mês anterior
        </p>
      </div>
      <div class="w-12 h-12 bg-[#3e5653]/10 rounded-full flex items-center justify-center">
        <DollarSign class="w-6 h-6 text-[#3e5653]" />
      </div>
    </div>
  </div>

  <!-- Card 3: Taxa de Conversão -->
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-xs text-[#627271] uppercase tracking-wide">Taxa de Conversão</p>
        <p class="text-2xl font-bold text-[#1f2937] mt-1">28.5%</p>
        <p class="text-xs text-red-500 mt-1 flex items-center gap-1">
          <TrendingDown class="w-3 h-3" />
          -2% vs mês anterior
        </p>
      </div>
      <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
        <Percent class="w-6 h-6 text-orange-600" />
      </div>
    </div>
  </div>

  <!-- Card 4: Média de Dias para Fechar -->
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-xs text-[#627271] uppercase tracking-wide">Média Dias para Fechar</p>
        <p class="text-2xl font-bold text-[#1f2937] mt-1">18 dias</p>
        <p class="text-xs text-green-600 mt-1 flex items-center gap-1">
          <TrendingDown class="w-3 h-3" />
          -3 dias vs mês anterior
        </p>
      </div>
      <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
        <Clock class="w-6 h-6 text-blue-600" />
      </div>
    </div>
  </div>
</section>
```

**Estados:**

| Estado | Comportamento |
|--------|---------------|
| Loading | Skeleton shimmer nos cards |
| Loaded | Dados animados com contador |
| Error | Card com ícone de erro e retry |

#### 2.2.3 Kanban de Pipeline

**Estrutura da Coluna:**

```html
<!-- Container do Kanban -->
<div class="flex gap-4 px-6 pb-6 overflow-x-auto">
  <!-- Coluna: Novo -->
  <div class="flex-shrink-0 w-80">
    <!-- Header da Coluna -->
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-2">
        <h3 class="font-semibold text-[#1f2937]">Novo</h3>
        <span class="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">12</span>
      </div>
      <button class="p-1 hover:bg-gray-100 rounded transition-colors">
        <MoreHorizontal class="w-4 h-4 text-gray-400" />
      </button>
    </div>

    <!-- Área de Cards (Drop Zone) -->
    <div class="bg-gray-100/50 rounded-lg p-3 min-h-[200px] space-y-3" data-column="novo">
      <!-- Cards aqui -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-move hover:shadow-md transition-all duration-200 group">
        <!-- Conteúdo do Card -->
      </div>

      <!-- Botão Adicionar -->
      <button class="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-[#86cb92] hover:text-[#86cb92] transition-colors flex items-center justify-center gap-2">
        <Plus class="w-4 h-4" />
        Nova Oportunidade
      </button>
    </div>
  </div>

  <!-- Coluna: Qualificação -->
  <div class="flex-shrink-0 w-80">
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-2">
        <h3 class="font-semibold text-[#1f2937]">Qualificação</h3>
        <span class="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">8</span>
      </div>
    </div>
    <div class="bg-gray-100/50 rounded-lg p-3 min-h-[200px] space-y-3" data-column="qualificacao">
      <!-- Cards -->
    </div>
  </div>

  <!-- Coluna: Proposta -->
  <div class="flex-shrink-0 w-80">
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-2">
        <h3 class="font-semibold text-[#1f2937]">Proposta</h3>
        <span class="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">5</span>
      </div>
    </div>
    <div class="bg-gray-100/50 rounded-lg p-3 min-h-[200px] space-y-3" data-column="proposta">
      <!-- Cards -->
    </div>
  </div>

  <!-- Coluna: Negociação -->
  <div class="flex-shrink-0 w-80">
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-2">
        <h3 class="font-semibold text-[#1f2937]">Negociação</h3>
        <span class="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">3</span>
      </div>
    </div>
    <div class="bg-gray-100/50 rounded-lg p-3 min-h-[200px] space-y-3" data-column="negociacao">
      <!-- Cards -->
    </div>
  </div>

  <!-- Coluna: Fechado -->
  <div class="flex-shrink-0 w-96">
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-2">
        <h3 class="font-semibold text-[#1f2937]">Fechado</h3>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <!-- Sub-coluna: Ganho -->
      <div>
        <div class="flex items-center gap-2 mb-2">
          <span class="w-2 h-2 bg-green-500 rounded-full"></span>
          <span class="text-sm font-medium text-[#1f2937]">Ganho</span>
          <span class="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs">4</span>
        </div>
        <div class="bg-green-50/50 rounded-lg p-2 min-h-[150px] space-y-2" data-column="ganho">
          <!-- Cards ganhos -->
        </div>
      </div>

      <!-- Sub-coluna: Perdido -->
      <div>
        <div class="flex items-center gap-2 mb-2">
          <span class="w-2 h-2 bg-red-500 rounded-full"></span>
          <span class="text-sm font-medium text-[#1f2937]">Perdido</span>
          <span class="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-xs">2</span>
        </div>
        <div class="bg-red-50/50 rounded-lg p-2 min-h-[150px] space-y-2" data-column="perdido">
          <!-- Cards perdidos -->
        </div>
      </div>
    </div>
  </div>
</div>
```

#### 2.2.4 Card de Oportunidade

**Estrutura Completa:**

```html
<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-move hover:shadow-md transition-all duration-200 group relative" draggable="true">
  <!-- Ações Rápidas (aparecem no hover) -->
  <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
    <button class="p-1.5 bg-white shadow-sm rounded hover:bg-gray-50" title="Editar">
      <Pencil class="w-3.5 h-3.5 text-gray-600" />
    </button>
    <button class="p-1.5 bg-white shadow-sm rounded hover:bg-gray-50" title="Arquivar">
      <Archive class="w-3.5 h-3.5 text-gray-600" />
    </button>
  </div>

  <!-- Tags -->
  <div class="flex flex-wrap gap-1.5 mb-2">
    <span class="px-2 py-0.5 bg-[#86cb92]/10 text-[#3e5653] rounded text-xs font-medium">Prioritário</span>
    <span class="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">B2B</span>
  </div>

  <!-- Título -->
  <h4 class="font-semibold text-[#1f2937] mb-1 line-clamp-2">Implementação Sistema ERP</h4>

  <!-- Cliente -->
  <p class="text-sm text-[#627271] mb-3">Tech Solutions Ltda</p>

  <!-- Valor -->
  <div class="flex items-baseline gap-1 mb-2">
    <span class="text-lg font-bold text-[#3e5653]">R$ 5.000,00</span>
  </div>

  <!-- Probabilidade com Barra -->
  <div class="mb-3">
    <div class="flex items-center justify-between text-xs mb-1">
      <span class="text-[#627271]">Probabilidade</span>
      <span class="font-medium text-[#1f2937]">70%</span>
    </div>
    <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
      <div class="h-full bg-gradient-to-r from-[#86cb92] to-[#3e5653] rounded-full" style="width: 70%"></div>
    </div>
  </div>

  <!-- Data Prevista -->
  <div class="flex items-center gap-1.5 text-xs text-[#627271] mb-3">
    <Calendar class="w-3.5 h-3.5" />
    <span>Fechamento: 15/03/2026</span>
  </div>

  <!-- Footer: Responsável -->
  <div class="flex items-center justify-between pt-3 border-t border-gray-100">
    <div class="flex items-center gap-2">
      <div class="w-6 h-6 bg-[#3e5653] rounded-full flex items-center justify-center">
        <span class="text-xs text-white font-medium">JD</span>
      </div>
      <span class="text-xs text-[#627271]">João Dias</span>
    </div>
    <MessageCircle class="w-4 h-4 text-gray-400 hover:text-[#86cb92] cursor-pointer transition-colors" />
  </div>
</div>
```

**Variações por Probabilidade:**

| Probabilidade | Cor da Barra |
|---------------|--------------|
| 0-30% | `bg-red-500` |
| 31-50% | `bg-yellow-500` |
| 51-70% | `bg-blue-500` |
| 71-90% | `bg-[#86cb92]` |
| 91-100% | `bg-[#3e5653]` |

**Estados do Card:**

| Estado | Classes Tailwind |
|--------|------------------|
| Default | `bg-white shadow-sm border-gray-200` |
| Hover | `shadow-md border-[#86cb92]/30` |
| Dragging | `opacity-50 rotate-2 scale-105 shadow-xl` |
| Drop Target | `ring-2 ring-[#86cb92] ring-offset-2` |
| Selected | `ring-2 ring-[#3e5653]` |

### 2.3 Estados do Kanban

#### 2.3.1 Estado Loading

```html
<div class="animate-pulse space-y-3">
  <div class="h-4 bg-gray-200 rounded w-1/3"></div>
  <div class="h-32 bg-gray-200 rounded"></div>
  <div class="h-32 bg-gray-200 rounded"></div>
</div>
```

#### 2.3.2 Estado Vazio (Coluna)

```html
<div class="flex flex-col items-center justify-center py-8 text-center">
  <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
    <Inbox class="w-8 h-8 text-gray-400" />
  </div>
  <p class="text-sm text-[#627271]">Nenhuma oportunidade</p>
  <button class="mt-2 text-sm text-[#3e5653] font-medium hover:underline">
    + Criar primeira
  </button>
</div>
```

### 2.4 Comportamentos e Interações

#### 2.4.1 Drag and Drop

**Regras:**
- Cards podem ser arrastados entre colunas
- Apenas cards com status "Fechado" podem ser movidos para Ganho/Perdido
- Movimento para "Fechado" exige confirmação com modal
- Colunas destino recebem highlight ao arrastar

**Efeitos Visuais:**
```css
/* Durante o drag */
.card-dragging {
  opacity: 0.5;
  transform: rotate(2deg) scale(1.05);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Drop zone ativa */
.drop-active {
  background-color: rgba(134, 203, 146, 0.1);
  border: 2px dashed #86cb92;
}
```

#### 2.4.2 Hover States

**Card:**
- Elevação suave (`shadow-md`)
- Borda com cor de accent
- Ações rápidas aparecem no canto superior direito

**Coluna:**
- Header recebe background sutil
- Botão "+ Nova" fica mais destacado

---

## 3. Tela 2: Cadastro de Clientes (/crm/clientes)

### 3.1 Estrutura do Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar]                                                                   │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] Clientes                      [Novo] [Importar] [Exportar]     │ │
│ ├─────────────────────────────────────────────────────────────────────────┤ │
│ │ ┌─────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ [Filtros] Busca | Segmento ▼ | Status ▼ | Data ▼                   │ │ │
│ │ ├─────────────────────────────────────────────────────────────────────┤ │ │
│ │ │                                                                     │ │ │
│ │ │ [Tabela de Clientes]                                               │ │ │
│ │ │ ┌────┬──────────────┬─────────────┬──────────┬──────────┬─────────┐ │ │ │
│ │ │ │ ☑  │ Nome         │ Email       │ Telefone │ Total    │ Ações   │ │ │ │
│ │ │ ├────┼──────────────┼─────────────┼──────────┼──────────┼─────────┤ │ │ │
│ │ │ │ ☑  │ Ana Silva    │ ana@...     │ (11)...  │ R$ 12.5k │ 👁 ✏️ 🗑 │ │ │ │
│ │ │ │ ☐  │ Carlos...    │ carlos@...  │ (21)...  │ R$ 8.2k  │ 👁 ✏️ 🗑 │ │ │ │
│ │ │ │ ☐  │ ...          │ ...         │ ...      │ ...      │ ...     │ │ │ │
│ │ │ └────┴──────────────┴─────────────┴──────────┴──────────┴─────────┘ │ │ │
│ │ │                                                                     │ │ │
│ │ │ [Paginação]                    Mostrando 1-10 de 150 resultados     │ │ │
│ │ └─────────────────────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Componentes

#### 3.2.1 Header com Ações em Massa

```html
<header class="bg-white border-b border-gray-200 px-6 py-4">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-[#1f2937]">Clientes</h1>
      <p class="text-sm text-[#627271]">Gerencie seus clientes e contatos</p>
    </div>

    <div class="flex items-center gap-3">
      <!-- Botões visíveis quando há seleção -->
      <div id="acoes-massa" class="hidden items-center gap-2 pr-3 border-r border-gray-200">
        <span class="text-sm text-[#627271]"><span id="count-selecionados">0</span> selecionados</span>
        <button class="p-2 hover:bg-gray-100 rounded-lg" title="Exportar selecionados">
          <Download class="w-4 h-4 text-gray-600" />
        </button>
        <button class="p-2 hover:bg-gray-100 rounded-lg" title="Excluir selecionados">
          <Trash2 class="w-4 h-4 text-red-500" />
        </button>
      </div>

      <button class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
        <Upload class="w-4 h-4" />
        Importar
      </button>

      <button class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
        <Download class="w-4 h-4" />
        Exportar
      </button>

      <button class="flex items-center gap-2 px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors">
        <Plus class="w-4 h-4" />
        Novo Cliente
      </button>
    </div>
  </div>
</header>
```

#### 3.2.2 Barra de Filtros

```html
<div class="bg-white border-b border-gray-200 px-6 py-3">
  <div class="flex items-center gap-3">
    <!-- Busca -->
    <div class="relative flex-1 max-w-md">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder="Buscar por nome, email ou telefone..."
        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
      />
    </div>

    <!-- Filtro Segmento -->
    <div class="relative">
      <select class="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-[#86cb92] focus:border-transparent bg-white cursor-pointer">
        <option value="">Segmento</option>
        <option value="b2b">B2B</option>
        <option value="b2c">B2C</option>
        <option value="enterprise">Enterprise</option>
        <option value="startup">Startup</option>
      </select>
      <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>

    <!-- Filtro Status -->
    <div class="relative">
      <select class="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-[#86cb92] focus:border-transparent bg-white cursor-pointer">
        <option value="">Status</option>
        <option value="ativo">Ativo</option>
        <option value="inativo">Inativo</option>
        <option value="potencial">Potencial</option>
      </select>
      <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>

    <!-- Filtro Data -->
    <div class="relative">
      <input
        type="date"
        placeholder="Data de cadastro"
        class="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
      />
    </div>

    <!-- Limpar Filtros -->
    <button class="text-sm text-[#3e5653] hover:underline">
      Limpar filtros
    </button>
  </div>
</div>
```

#### 3.2.3 Tabela de Clientes

```html
<div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
  <table class="w-full">
    <thead class="bg-gray-50 border-b border-gray-200">
      <tr>
        <th class="px-4 py-3 w-12">
          <input type="checkbox" class="rounded border-gray-300 text-[#3e5653] focus:ring-[#86cb92]" />
        </th>
        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Nome</th>
        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Telefone</th>
        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Comprado</th>
        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Última Compra</th>
        <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
        <th class="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide w-24">Ações</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50 transition-colors group" data-selected="false">
        <td class="px-4 py-3">
          <input type="checkbox" class="rounded border-gray-300 text-[#3e5653] focus:ring-[#86cb92]" />
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 bg-[#86cb92] rounded-full flex items-center justify-center">
              <span class="text-sm text-white font-medium">AS</span>
            </div>
            <div>
              <p class="font-medium text-[#1f2937]">Ana Silva</p>
              <p class="text-xs text-[#627271]">Cliente desde 2024</p>
            </div>
          </div>
        </td>
        <td class="px-4 py-3 text-sm text-[#1f2937]">ana.silva@empresa.com.br</td>
        <td class="px-4 py-3 text-sm text-[#1f2937]">(11) 98765-4321</td>
        <td class="px-4 py-3 text-sm font-semibold text-[#3e5653]">R$ 12.500,00</td>
        <td class="px-4 py-3 text-sm text-[#627271]">15/02/2026</td>
        <td class="px-4 py-3">
          <span class="inline-flex px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            Ativo
          </span>
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center justify-center gap-1">
            <button class="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Ver detalhes">
              <Eye class="w-4 h-4 text-gray-500" />
            </button>
            <button class="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Editar">
              <Pencil class="w-4 h-4 text-gray-500" />
            </button>
            <button class="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Excluir">
              <Trash2 class="w-4 h-4 text-red-500" />
            </button>
          </div>
        </td>
      </tr>
      <!-- Mais linhas... -->
    </tbody>
  </table>
</div>
```

**Estados da Linha:**

| Estado | Classes CSS |
|--------|-------------|
| Default | `bg-white` |
| Hover | `bg-gray-50` |
| Selecionado | `bg-[#86cb92]/10` |
| Loading | Skeleton em todas as células |

#### 3.2.4 Paginação

```html
<div class="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200">
  <div class="text-sm text-[#627271]">
    Mostrando <span class="font-medium text-[#1f2937]">1-10</span> de <span class="font-medium text-[#1f2937]">150</span> resultados
  </div>

  <div class="flex items-center gap-2">
    <!-- Controles de página -->
    <button class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
      <ChevronLeft class="w-4 h-4 text-gray-600" />
    </button>

    <div class="flex items-center gap-1">
      <button class="px-3 py-2 bg-[#3e5653] text-white rounded-lg text-sm font-medium">1</button>
      <button class="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">2</button>
      <button class="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">3</button>
      <span class="px-2 text-gray-400">...</span>
      <button class="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">15</button>
    </div>

    <button class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
      <ChevronRight class="w-4 h-4 text-gray-600" />
    </button>
  </div>

  <!-- Itens por página -->
  <div class="flex items-center gap-2">
    <span class="text-sm text-[#627271]">Itens por página:</span>
    <select class="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#86cb92]">
      <option value="10">10</option>
      <option value="25">25</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
  </div>
</div>
```

#### 3.2.5 Estado Vazio

```html
<div class="flex flex-col items-center justify-center py-16 text-center">
  <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
    <Users class="w-12 h-12 text-gray-400" />
  </div>
  <h3 class="text-lg font-semibold text-[#1f2937] mb-2">Nenhum cliente cadastrado</h3>
  <p class="text-sm text-[#627271] mb-6 max-w-md">
    Comece cadastrando seu primeiro cliente para gerenciar oportunidades e acompanhar o histórico de compras.
  </p>
  <button class="flex items-center gap-2 px-6 py-3 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors">
    <Plus class="w-5 h-5" />
    Cadastrar Primeiro Cliente
  </button>
</div>
```

---

## 4. Tela 3: Detalhes do Cliente (/crm/clientes/:id)

### 4.1 Estrutura do Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar]                                                                   │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] Tech Solutions Ltda.          [Whats] [Editar] [Excluir]       │ │
│ ├─────────────────────────────────────────────────────────────────────────┤ │
│ │ [Tabs: Visão Geral | Histórico | Oportunidades | Interações]            │ │
│ ├─────────────────────────────────────────────────────────────────────────┤ │
│ │                                                                         │ │
│ │ ┌─────────────────────┐ ┌─────────────────────────────────────────┐   │ │
│ │ │ [Card: Info Pessoal]│ │ [Card: Conteúdo da Aba Selecionada]     │   │ │
│ │ │ ┌─────────────────┐ │ │                                         │   │ │
│ │ │ │ Avatar          │ │ │ ABA VISÃO GERAL:                        │   │ │
│ │ │ │ Nome            │ │ │ - Informações pessoais                  │   │ │
│ │ │ │ Status Badge    │ │ │ - Anotações                             │   │ │
│ │ │ │                 │ │ │ - Tags                                  │   │ │
│ │ │ │ [Editar]        │ │ │ - Responsável                           │   │ │
│ │ │ └─────────────────┘ │ │                                         │   │ │
│ │ │                     │ │ ABA HISTÓRICO:                          │   │ │
│ │ │ [Card: Contato]     │ │ - Lista de pedidos                      │   │ │
│ │ │ - Email             │ │ - Total gasto                           │   │ │
│ │ │ - Telefone          │ │ - Ticket médio                          │   │ │
│ │ │ - WhatsApp          │ │ - Produtos mais comprados               │   │ │
│ │ │ - Endereço          │ │                                         │   │ │
│ │ │                     │ │ ABA OPORTUNIDADES:                      │   │ │
│ │ │ [Card: Métricas]    │ │ - Pipeline do cliente                   │   │ │
│ │ │ - Total Gasto       │ │ - Oportunidades abertas                 │   │ │
│ │ │ - Ticket Médio      │ │ - Oportunidades fechadas                │   │ │
│ │ │ - Compras           │ │                                         │   │ │
│ │ │ - Conversão         │ │ ABA INTERAÇÕES:                         │   │ │
│ │ │                     │ │ - Timeline de contatos                  │   │ │
│ │ └─────────────────────┘ │ - Registro de ligações                  │   │ │
│ │                         │ - Emails enviados                       │   │ │
│ │                         │ - Nova Interação                        │   │ │
│ │                         └─────────────────────────────────────────┘   │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Componentes

#### 4.2.1 Header do Cliente

```html
<header class="bg-white border-b border-gray-200 px-6 py-6">
  <div class="flex items-start justify-between">
    <div class="flex items-start gap-4">
      <!-- Avatar -->
      <div class="w-20 h-20 bg-[#3e5653] rounded-full flex items-center justify-center">
        <span class="text-2xl text-white font-bold">TS</span>
      </div>

      <div>
        <div class="flex items-center gap-3 mb-1">
          <h1 class="text-2xl font-bold text-[#1f2937]">Tech Solutions Ltda.</h1>
          <span class="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Ativo</span>
        </div>
        <p class="text-sm text-[#627271] mb-2">Cliente desde 15/01/2024</p>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2">
          <span class="px-2 py-1 bg-[#86cb92]/10 text-[#3e5653] rounded text-xs font-medium">B2B</span>
          <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">Enterprise</span>
          <span class="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">Prioritário</span>
        </div>
      </div>
    </div>

    <!-- Ações -->
    <div class="flex items-center gap-2">
      <a href="https://wa.me/5511987654321" target="_blank" class="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
        <MessageCircle class="w-4 h-4" />
        WhatsApp
      </a>

      <button class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
        <Pencil class="w-4 h-4" />
        Editar
      </button>

      <button class="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
        <Trash2 class="w-4 h-4" />
        Excluir
      </button>
    </div>
  </div>
</header>
```

#### 4.2.2 Navegação por Abas

```html
<nav class="bg-white border-b border-gray-200 px-6">
  <div class="flex gap-1">
    <button class="tab-active px-4 py-3 text-sm font-medium text-[#3e5653] border-b-2 border-[#3e5653]">
      Visão Geral
    </button>
    <button class="px-4 py-3 text-sm font-medium text-[#627271] hover:text-[#1f2937] transition-colors">
      Histórico de Compras
      <span class="ml-1.5 px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">12</span>
    </button>
    <button class="px-4 py-3 text-sm font-medium text-[#627271] hover:text-[#1f2937] transition-colors">
      Oportunidades
      <span class="ml-1.5 px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded text-xs">3</span>
    </button>
    <button class="px-4 py-3 text-sm font-medium text-[#627271] hover:text-[#1f2937] transition-colors">
      Interações
      <span class="ml-1.5 px-1.5 py-0.5 bg-purple-100 text-purple-600 rounded text-xs">8</span>
    </button>
  </div>
</nav>
```

**Estado das Abas:**

| Estado | Classes |
|--------|---------|
| Ativa | `text-[#3e5653] border-b-2 border-[#3e5653]` |
| Inativa | `text-[#627271] hover:text-[#1f2937]` |
| Com Badge | Badge com cor correspondente ao contexto |

#### 4.2.3 Sidebar de Informações

```html
<!-- Card: Informações de Contato -->
<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
  <h3 class="font-semibold text-[#1f2937] mb-4 flex items-center gap-2">
    <User class="w-4 h-4 text-[#627271]" />
    Informações de Contato
  </h3>

  <div class="space-y-3">
    <div>
      <p class="text-xs text-[#627271] mb-1">Email</p>
      <a href="mailto:contato@techsolutions.com.br" class="text-sm text-[#3e5653] hover:underline">
        contato@techsolutions.com.br
      </a>
    </div>

    <div>
      <p class="text-xs text-[#627271] mb-1">Telefone</p>
      <p class="text-sm text-[#1f2937]">(11) 3456-7890</p>
    </div>

    <div>
      <p class="text-xs text-[#627271] mb-1">Celular</p>
      <p class="text-sm text-[#1f2937]">(11) 98765-4321</p>
    </div>

    <div>
      <p class="text-xs text-[#627271] mb-1">Endereço</p>
      <p class="text-sm text-[#1f2937]">
        Av. Paulista, 1000, Sala 502<br/>
        Bela Vista, São Paulo - SP<br/>
        CEP: 01310-100
      </p>
    </div>
  </div>
</div>

<!-- Card: Métricas -->
<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
  <h3 class="font-semibold text-[#1f2937] mb-4 flex items-center gap-2">
    <BarChart3 class="w-4 h-4 text-[#627271]" />
    Métricas
  </h3>

  <div class="grid grid-cols-2 gap-4">
    <div>
      <p class="text-xs text-[#627271] mb-1">Total Gasto</p>
      <p class="text-lg font-bold text-[#3e5653]">R$ 45.890</p>
    </div>

    <div>
      <p class="text-xs text-[#627271] mb-1">Ticket Médio</p>
      <p class="text-lg font-bold text-[#3e5653]">R$ 3.824</p>
    </div>

    <div>
      <p class="text-xs text-[#627271] mb-1">Total de Compras</p>
      <p class="text-lg font-bold text-[#1f2937]">12</p>
    </div>

    <div>
      <p class="text-xs text-[#627271] mb-1">Taxa de Conversão</p>
      <p class="text-lg font-bold text-[#86cb92]">75%</p>
    </div>
  </div>
</div>

<!-- Card: Responsável -->
<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
  <h3 class="font-semibold text-[#1f2937] mb-4 flex items-center gap-2">
    <Users class="w-4 h-4 text-[#627271]" />
    Responsável
  </h3>

  <div class="flex items-center gap-3">
    <div class="w-10 h-10 bg-[#86cb92] rounded-full flex items-center justify-center">
      <span class="text-sm text-white font-medium">JD</span>
    </div>
    <div>
      <p class="font-medium text-[#1f2937]">João Dias</p>
      <p class="text-xs text-[#627271]">Consultor de Vendas</p>
    </div>
  </div>
</div>
```

#### 4.2.4 Aba: Visão Geral

```html
<div class="space-y-6">
  <!-- Anotações -->
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
    <h3 class="font-semibold text-[#1f2937] mb-4">Anotações</h3>
    <textarea
      class="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
      rows="4"
      placeholder="Adicione anotações sobre este cliente..."
    ></textarea>
    <div class="flex justify-end mt-3">
      <button class="px-4 py-2 bg-[#3e5653] text-white rounded-lg text-sm hover:bg-[#1f2937] transition-colors">
        Salvar Anotação
      </button>
    </div>
  </div>

  <!-- Informações Adicionais -->
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
    <h3 class="font-semibold text-[#1f2937] mb-4">Informações Adicionais</h3>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <p class="text-xs text-[#627271] mb-1">CNPJ</p>
        <p class="text-sm text-[#1f2937]">12.345.678/0001-90</p>
      </div>
      <div>
        <p class="text-xs text-[#627271] mb-1">Segmento</p>
        <p class="text-sm text-[#1f2937]">Tecnologia / Software</p>
      </div>
      <div>
        <p class="text-xs text-[#627271] mb-1">Tamanho da Empresa</p>
        <p class="text-sm text-[#1f2937]">50-100 funcionários</p>
      </div>
      <div>
        <p class="text-xs text-[#627271] mb-1">Origem</p>
        <p class="text-sm text-[#1f2937]">Indicação</p>
      </div>
    </div>
  </div>
</div>
```

#### 4.2.5 Aba: Histórico de Compras

```html
<div class="space-y-6">
  <!-- Cards de Resumo -->
  <div class="grid grid-cols-3 gap-4">
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <p class="text-xs text-[#627271] mb-1">Total em Compras</p>
      <p class="text-2xl font-bold text-[#3e5653]">R$ 45.890,00</p>
    </div>
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <p class="text-xs text-[#627271] mb-1">Ticket Médio</p>
      <p class="text-2xl font-bold text-[#3e5653]">R$ 3.824,17</p>
    </div>
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <p class="text-xs text-[#627271] mb-1">Total de Pedidos</p>
      <p class="text-2xl font-bold text-[#1f2937]">12</p>
    </div>
  </div>

  <!-- Lista de Pedidos -->
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div class="px-4 py-3 border-b border-gray-200">
      <h3 class="font-semibold text-[#1f2937]">Pedidos Recentes</h3>
    </div>
    <table class="w-full">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Pedido</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Data</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Produtos</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
          <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Total</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr class="hover:bg-gray-50">
          <td class="px-4 py-3">
            <p class="font-medium text-[#3e5653]">#PED-2026-0123</p>
          </td>
          <td class="px-4 py-3 text-sm text-[#1f2937]">15/02/2026</td>
          <td class="px-4 py-3 text-sm text-[#627271]">5 itens</td>
          <td class="px-4 py-3">
            <span class="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Entregue</span>
          </td>
          <td class="px-4 py-3 text-sm font-semibold text-right text-[#1f2937]">R$ 5.890,00</td>
        </tr>
        <!-- Mais pedidos... -->
      </tbody>
    </table>
  </div>

  <!-- Produtos Mais Comprados -->
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
    <h3 class="font-semibold text-[#1f2937] mb-4">Produtos Mais Comprados</h3>
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <Package class="w-5 h-5 text-gray-500" />
          </div>
          <div>
            <p class="font-medium text-[#1f2937]">Licença ERP Enterprise</p>
            <p class="text-xs text-[#627271]">Comprado 5 vezes</p>
          </div>
        </div>
        <p class="font-semibold text-[#3e5653]">R$ 25.000,00</p>
      </div>
      <!-- Mais produtos... -->
    </div>
  </div>
</div>
```

#### 4.2.6 Aba: Oportunidades

```html
<div class="space-y-6">
  <!-- Header com Ação -->
  <div class="flex items-center justify-between">
    <h3 class="font-semibold text-[#1f2937]">Oportunidades do Cliente</h3>
    <button class="flex items-center gap-2 px-4 py-2 bg-[#3e5653] text-white rounded-lg text-sm hover:bg-[#1f2937] transition-colors">
      <Plus class="w-4 h-4" />
      Nova Oportunidade
    </button>
  </div>

  <!-- Oportunidades Abertas -->
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <div class="px-4 py-3 bg-blue-50 border-b border-blue-100">
      <h4 class="font-medium text-blue-800 flex items-center gap-2">
        <Clock class="w-4 h-4" />
        Oportunidades Abertas (3)
      </h4>
    </div>
    <div class="divide-y divide-gray-200">
      <!-- Card de Oportunidade -->
      <div class="p-4 hover:bg-gray-50 transition-colors">
        <div class="flex items-start justify-between">
          <div>
            <h5 class="font-semibold text-[#1f2937]">Implementação Módulo Financeiro</h5>
            <div class="flex items-center gap-4 mt-2 text-sm text-[#627271]">
              <span class="flex items-center gap-1">
                <Calendar class="w-4 h-4" />
                Fechamento: 30/03/2026
              </span>
              <span class="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">Proposta</span>
            </div>
          </div>
          <div class="text-right">
            <p class="text-lg font-bold text-[#3e5653]">R$ 15.000,00</p>
            <p class="text-xs text-[#627271]">70% probabilidade</p>
          </div>
        </div>
        <div class="mt-3">
          <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full bg-yellow-500 rounded-full" style="width: 70%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Oportunidades Fechadas -->
  <div class="grid grid-cols-2 gap-4">
    <!-- Ganhas -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="px-4 py-3 bg-green-50 border-b border-green-100">
        <h4 class="font-medium text-green-800 flex items-center gap-2">
          <CheckCircle class="w-4 h-4" />
          Oportunidades Ganhas (8)
        </h4>
      </div>
      <div class="divide-y divide-gray-200">
        <div class="p-4 hover:bg-gray-50">
          <div class="flex items-center justify-between">
            <span class="font-medium text-[#1f2937]">Licença Anual ERP</span>
            <span class="font-semibold text-green-600">R$ 12.000</span>
          </div>
          <p class="text-xs text-[#627271] mt-1">Fechado em 15/01/2026</p>
        </div>
      </div>
    </div>

    <!-- Perdidas -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="px-4 py-3 bg-red-50 border-b border-red-100">
        <h4 class="font-medium text-red-800 flex items-center gap-2">
          <XCircle class="w-4 h-4" />
          Oportunidades Perdidas (2)
        </h4>
      </div>
      <div class="divide-y divide-gray-200">
        <div class="p-4 hover:bg-gray-50">
          <div class="flex items-center justify-between">
            <span class="font-medium text-[#1f2937]">Consultoria Avançada</span>
            <span class="font-semibold text-red-600">R$ 8.000</span>
          </div>
          <p class="text-xs text-[#627271] mt-1">Perdido em 10/12/2025</p>
          <p class="text-xs text-red-600 mt-1">Motivo: Preço alto</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

#### 4.2.7 Aba: Interações

```html
<div class="space-y-6">
  <!-- Nova Interação -->
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
    <h3 class="font-semibold text-[#1f2937] mb-4">Registrar Nova Interação</h3>
    <div class="flex gap-3">
      <div class="flex-1">
        <select class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#86cb92] mb-3">
          <option value="">Tipo de interação...</option>
          <option value="ligacao">Ligação</option>
          <option value="email">Email</option>
          <option value="reuniao">Reunião</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="visita">Visita</option>
        </select>
        <textarea
          class="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-[#86cb92]"
          rows="3"
          placeholder="Descreva a interação..."
        ></textarea>
      </div>
      <button class="px-6 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors self-end">
        Registrar
      </button>
    </div>
  </div>

  <!-- Timeline -->
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
    <h3 class="font-semibold text-[#1f2937] mb-6">Histórico de Interações</h3>
    <div class="space-y-6">
      <!-- Item da Timeline -->
      <div class="flex gap-4">
        <div class="flex flex-col items-center">
          <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Phone class="w-5 h-5 text-blue-600" />
          </div>
          <div class="w-0.5 h-full bg-gray-200 mt-2"></div>
        </div>
        <div class="flex-1 pb-6">
          <div class="flex items-start justify-between">
            <div>
              <p class="font-medium text-[#1f2937]">Ligação de follow-up</p>
              <p class="text-sm text-[#627271] mt-1">
                Cliente demonstrou interesse em adicionar módulo de relatórios. Agendada demonstração para próxima semana.
              </p>
            </div>
            <div class="text-right">
              <p class="text-xs text-[#627271]">Hoje, 14:30</p>
              <div class="flex items-center gap-1 mt-1">
                <div class="w-6 h-6 bg-[#86cb92] rounded-full flex items-center justify-center">
                  <span class="text-xs text-white">JD</span>
                </div>
                <span class="text-xs text-[#627271]">João Dias</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mais itens... -->
      <div class="flex gap-4">
        <div class="flex flex-col items-center">
          <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <MessageCircle class="w-5 h-5 text-green-600" />
          </div>
          <div class="w-0.5 h-full bg-gray-200 mt-2"></div>
        </div>
        <div class="flex-1 pb-6">
          <div class="flex items-start justify-between">
            <div>
              <p class="font-medium text-[#1f2937]">Mensagem WhatsApp</p>
              <p class="text-sm text-[#627271] mt-1">
                Enviado material de apoio sobre implementação. Cliente confirmou recebimento.
              </p>
            </div>
            <div class="text-right">
              <p class="text-xs text-[#627271]">Ontem, 16:45</p>
              <div class="flex items-center gap-1 mt-1">
                <div class="w-6 h-6 bg-[#86cb92] rounded-full flex items-center justify-center">
                  <span class="text-xs text-white">JD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex gap-4">
        <div class="flex flex-col items-center">
          <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <Mail class="w-5 h-5 text-purple-600" />
          </div>
        </div>
        <div class="flex-1">
          <div class="flex items-start justify-between">
            <div>
              <p class="font-medium text-[#1f2937]">Email enviado</p>
              <p class="text-sm text-[#627271] mt-1">
                Proposta comercial enviada para aprovação da diretoria.
              </p>
            </div>
            <div class="text-right">
              <p class="text-xs text-[#627271]">12/03/2026, 09:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## 5. Tela 4: Nova Oportunidade (/crm/oportunidades/nova)

### 5.1 Estrutura do Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar]                                                                   │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] ← Voltar | Nova Oportunidade                                 │ │
│ ├─────────────────────────────────────────────────────────────────────────┤ │
│ │ ┌─────────────────────────────────────┐ ┌───────────────────────────┐   │ │
│ │ │ [Formulário]                        │ │ [Sidebar Resumo]          │   │ │
│ │ │                                     │ │                           │   │ │
│ │ │ 1. DADOS DA OPORTUNIDADE            │ │ ┌─────────────────────┐   │   │ │
│ │ │ ┌───────────────────────────────┐   │ │ │ Preview do Card     │   │   │ │
│ │ │ │ Título*                       │   │ │ │                     │   │   │ │
│ │ │ └───────────────────────────────┘   │ │ │ [Título]            │   │   │ │
│ │ │ ┌───────────────────────────────┐   │ │ │ [Cliente]           │   │   │ │
│ │ │ │ Cliente*          [▼]         │   │ │ │ [Valor]             │   │   │ │
│ │ │ └───────────────────────────────┘   │ │ │ [Probabilidade]     │   │   │ │
│ │ │ ┌───────────────────────────────┐   │ │ └─────────────────────┘   │   │ │
│ │ │ │ Valor Estimado: R$ [_____]    │   │ │                           │   │ │
│ │ │ └───────────────────────────────┘   │ │ CÁLCULOS:                 │   │ │
│ │ │ Probabilidade: [=========●===] 70%  │ │ - Valor: R$ 10.000        │   │ │
│ │ │                                     │ │ - Probabilidade: 70%      │   │ │
│ │ │ 2. DETALHES                         │ │ - Receita Esperada:       │   │ │
│ │ │ ┌───────────────────────────────┐   │ │   R$ 7.000,00             │   │ │
│ │ │ │ Descrição                     │   │ │                           │   │ │
│ │ │ │ [                            │   │ │                           │   │ │
│ │ │ │                             ] │   │ │                           │   │ │
│ │ │ └───────────────────────────────┘   │ │                           │   │ │
│ │ │ ┌───────────────────────────────┐   │ │                           │   │ │
│ │ │ │ Produtos/Serviços [Multi]     │   │ │                           │   │ │
│ │ │ └───────────────────────────────┘   │ │                           │   │ │
│ │ │ ┌───────────────────────────────┐   │ │                           │   │ │
│ │ │ │ Origem [▼]                    │   │ │                           │   │ │
│ │ │ └───────────────────────────────┘   │ │                           │   │ │
│ │ │ ┌───────────────────────────────┐   │ │                           │   │ │
│ │ │ │ Responsável*      [▼]         │   │ │                           │   │ │
│ │ │ └───────────────────────────────┘   │ │                           │   │ │
│ │ │                                     │ │                           │   │ │
│ │ │ 3. STATUS INICIAL                   │ │                           │   │ │
│ │ │ (○) Novo (○) Qualificação          │ │                           │   │ │
│ │ │ (●) Proposta (○) Negociação        │ │                           │   │ │
│ │ │                                     │ │                           │   │ │
│ │ │ Tags: [Tag 1] [Tag 2] [+ Add]      │ │                           │   │ │
│ │ │                                     │ │                           │   │ │
│ │ └─────────────────────────────────────┘ └───────────────────────────┘   │ │
│ │                                                                         │ │
│ │ [Cancelar]                           [Criar Oportunidade]               │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Componentes

#### 5.2.1 Formulário Principal

```html
<form class="max-w-5xl mx-auto">
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Coluna Principal -->
    <div class="lg:col-span-2 space-y-6">
      <!-- Seção 1: Dados da Oportunidade -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-semibold text-[#1f2937] mb-4 flex items-center gap-2">
          <span class="w-6 h-6 bg-[#3e5653] text-white rounded-full flex items-center justify-center text-sm">1</span>
          Dados da Oportunidade
        </h2>

        <div class="space-y-4">
          <!-- Título -->
          <div>
            <label class="block text-sm font-medium text-[#1f2937] mb-1">
              Título <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Ex: Implementação Sistema ERP"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
              required
            />
          </div>

          <!-- Cliente -->
          <div>
            <label class="block text-sm font-medium text-[#1f2937] mb-1">
              Cliente <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] appearance-none bg-white">
                <option value="">Selecione um cliente...</option>
                <option value="1">Tech Solutions Ltda.</option>
                <option value="2">Ana Silva</option>
              </select>
              <Plus class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3e5653] cursor-pointer" title="Cadastrar novo cliente" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <!-- Valor -->
            <div>
              <label class="block text-sm font-medium text-[#1f2937] mb-1">
                Valor Estimado <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                <input
                  type="text"
                  placeholder="0,00"
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]"
                />
              </div>
            </div>

            <!-- Data Prevista -->
            <div>
              <label class="block text-sm font-medium text-[#1f2937] mb-1">
                Data Prevista de Fechamento <span class="text-red-500">*</span>
              </label>
              <input
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]"
              />
            </div>
          </div>

          <!-- Probabilidade -->
          <div>
            <label class="block text-sm font-medium text-[#1f2937] mb-2">
              Probabilidade: <span class="text-[#3e5653] font-bold">70%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value="70"
              class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3e5653]"
            />
            <div class="flex justify-between text-xs text-[#627271] mt-1">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Seção 2: Detalhes -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-semibold text-[#1f2937] mb-4 flex items-center gap-2">
          <span class="w-6 h-6 bg-[#3e5653] text-white rounded-full flex items-center justify-center text-sm">2</span>
          Detalhes
        </h2>

        <div class="space-y-4">
          <!-- Descrição -->
          <div>
            <label class="block text-sm font-medium text-[#1f2937] mb-1">Descrição</label>
            <textarea
              rows="4"
              placeholder="Descreva detalhes da oportunidade..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] resize-none"
            ></textarea>
          </div>

          <!-- Produtos/Serviços -->
          <div>
            <label class="block text-sm font-medium text-[#1f2937] mb-1">Produtos/Serviços</label>
            <select multiple class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] min-h-[100px]">
              <option value="1">Licença ERP Básico</option>
              <option value="2">Licença ERP Enterprise</option>
              <option value="3">Módulo Financeiro</option>
              <option value="4">Módulo RH</option>
              <option value="5">Suporte Premium</option>
              <option value="6">Treinamento</option>
            </select>
            <p class="text-xs text-[#627271] mt-1">Segure Ctrl/Cmd para selecionar múltiplos</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <!-- Origem -->
            <div>
              <label class="block text-sm font-medium text-[#1f2937] mb-1">Origem</label>
              <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] bg-white">
                <option value="">Selecione...</option>
                <option value="indicacao">Indicação</option>
                <option value="site">Site</option>
                <option value="redes">Redes Sociais</option>
                <option value="evento">Evento</option>
                <option value="ligacao">Ligação Ativa</option>
                <option value="parceiro">Parceiro</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <!-- Responsável -->
            <div>
              <label class="block text-sm font-medium text-[#1f2937] mb-1">
                Responsável <span class="text-red-500">*</span>
              </label>
              <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] bg-white">
                <option value="">Selecione...</option>
                <option value="1">João Dias</option>
                <option value="2">Maria Santos</option>
                <option value="3">Pedro Costa</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Seção 3: Status Inicial -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-semibold text-[#1f2937] mb-4 flex items-center gap-2">
          <span class="w-6 h-6 bg-[#3e5653] text-white rounded-full flex items-center justify-center text-sm">3</span>
          Status Inicial
        </h2>

        <!-- Radio Buttons Pipeline -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <label class="relative flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input type="radio" name="status" value="novo" class="w-4 h-4 text-[#3e5653] focus:ring-[#86cb92]" />
            <span class="ml-2 text-sm">
              <span class="block font-medium text-[#1f2937]">Novo</span>
            </span>
          </label>

          <label class="relative flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input type="radio" name="status" value="qualificacao" class="w-4 h-4 text-[#3e5653] focus:ring-[#86cb92]" />
            <span class="ml-2 text-sm">
              <span class="block font-medium text-[#1f2937]">Qualificação</span>
            </span>
          </label>

          <label class="relative flex items-center p-3 border-2 border-[#3e5653] bg-[#86cb92]/5 rounded-lg cursor-pointer">
            <input type="radio" name="status" value="proposta" class="w-4 h-4 text-[#3e5653] focus:ring-[#86cb92]" checked />
            <span class="ml-2 text-sm">
              <span class="block font-medium text-[#1f2937]">Proposta</span>
            </span>
            <Check class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3e5653]" />
          </label>

          <label class="relative flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input type="radio" name="status" value="negociacao" class="w-4 h-4 text-[#3e5653] focus:ring-[#86cb92]" />
            <span class="ml-2 text-sm">
              <span class="block font-medium text-[#1f2937]">Negociação</span>
            </span>
          </label>
        </div>

        <!-- Tags -->
        <div>
          <label class="block text-sm font-medium text-[#1f2937] mb-2">Tags</label>
          <div class="flex flex-wrap gap-2">
            <button class="px-3 py-1.5 bg-[#86cb92]/10 text-[#3e5653] rounded-full text-sm font-medium flex items-center gap-1">
              Prioritário
              <X class="w-3 h-3" />
            </button>
            <button class="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-1">
              B2B
              <X class="w-3 h-3" />
            </button>
            <button class="px-3 py-1.5 border border-dashed border-gray-300 text-gray-500 rounded-full text-sm hover:border-[#86cb92] hover:text-[#86cb92] transition-colors flex items-center gap-1">
              <Plus class="w-3 h-3" />
              Adicionar tag
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar Resumo -->
    <div class="lg:col-span-1">
      <div class="sticky top-6 space-y-4">
        <!-- Preview do Card -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 class="font-semibold text-[#1f2937] mb-4">Preview no Pipeline</h3>
          <div class="bg-white rounded-lg shadow border border-gray-200 p-4 opacity-75">
            <div class="flex flex-wrap gap-1.5 mb-2">
              <span class="px-1.5 py-0.5 bg-[#86cb92]/10 text-[#3e5653] rounded text-xs">Prioritário</span>
            </div>
            <h4 class="font-semibold text-[#1f2937] text-sm mb-1 truncate">Implementação Sistema ERP</h4>
            <p class="text-xs text-[#627271] mb-2 truncate">Tech Solutions Ltda.</p>
            <p class="text-base font-bold text-[#3e5653] mb-2">R$ 10.000,00</p>
            <div class="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-[#86cb92] rounded-full" style="width: 70%"></div>
            </div>
          </div>
        </div>

        <!-- Cálculos -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <h3 class="font-semibold text-[#1f2937] mb-4">Resumo</h3>
          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-[#627271]">Valor Estimado:</span>
              <span class="font-medium text-[#1f2937]">R$ 10.000,00</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-[#627271]">Probabilidade:</span>
              <span class="font-medium text-[#1f2937]">70%</span>
            </div>
            <div class="h-px bg-gray-200 my-3"></div>
            <div class="flex justify-between">
              <span class="text-sm font-medium text-[#1f2937]">Receita Esperada:</span>
              <span class="text-lg font-bold text-[#86cb92]">R$ 7.000,00</span>
            </div>
          </div>
        </div>

        <!-- Dicas -->
        <div class="bg-blue-50 rounded-lg border border-blue-100 p-4">
          <div class="flex items-start gap-2">
            <HelpCircle class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 class="font-medium text-blue-800 text-sm mb-1">Dica</h4>
              <p class="text-xs text-blue-700">
                Oportunidades com probabilidade acima de 50% têm maior chance de fechamento. Mantenha o cliente engajado!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer Actions -->
  <div class="flex items-center justify-between pt-6 mt-6 border-t border-gray-200">
    <button type="button" class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
      Cancelar
    </button>
    <button type="submit" class="px-6 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors flex items-center gap-2">
      <Plus class="w-4 h-4" />
      Criar Oportunidade
    </button>
  </div>
</form>
```

### 5.3 Estados do Formulário

| Estado | Comportamento |
|--------|---------------|
| Default | Campos vazios, botão submit habilitado |
| Validando | Bordas vermelhas em campos inválidos, mensagens de erro |
| Loading | Spinner no botão, campos desabilitados |
| Sucesso | Redirect para pipeline com toast de sucesso |
| Erro | Toast de erro, campos mantêm valores |

---

## 6. Tela 5: Dashboard Analítico (/crm/analytics)

### 6.1 Estrutura do Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar]                                                                   │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] Dashboard Analítico           [Hoje ▼] [Exportar Relatório]    │ │
│ ├─────────────────────────────────────────────────────────────────────────┤ │
│ │ [Filtros de Período]                                                    │ │
│ │ [7 dias] [30 dias] [Este Mês] [Mês Anterior] [Personalizado]            │ │
│ ├─────────────────────────────────────────────────────────────────────────┤ │
│ │ ┌─────────────────────────┐ ┌─────────────────────────┐                 │ │
│ │ │ [Card: Gráfico Funil]   │ │ [Card: Gráfico Receita] │                 │ │
│ │ │                         │ │                         │                 │ │
│ │ │    ╱╲                   │ │    ╱╲        ╱╲         │                 │ │
│ │ │   ╱  ╲                  │ │   ╱  ╲      ╱  ╲        │                 │ │
│ │ │  ╱    ╲                 │ │  ╱    ╲____╱    ╲       │                 │ │
│ │ │ ╱      ╲                │ │ ╱                  ╲     │                 │ │
│ │ │╱        ╲               │ │╱                    ╲____│                 │ │
│ │ │                          │ │                         │                 │ │
│ │ │ Taxas de conversão       │ │ Comparativo períodos   │                 │ │
│ │ └─────────────────────────┘ └─────────────────────────┘                 │ │
│ │ ┌─────────────────────────┐ ┌─────────────────────────┐                 │ │
│ │ │ [Card: Top Vendedores]  │ │ [Card: Origem Leads]    │                 │ │
│ │ │                         │ │                         │                 │ │
│ │ │ 1. João Dias  R$ 150k   │ │     ╭───────╮           │                 │ │
│ │ │ 2. Maria S.   R$ 120k   │ │    ╱   35%  ╲          │                 │ │
│ │ │ 3. Pedro C.   R$ 95k    │ │   │  Site   │          │                 │ │
│ │ │                          │ │    ╲_______╱          │                 │ │
│ │ │ [Ver ranking completo]  │ │                         │                 │ │
│ │ └─────────────────────────┘ └─────────────────────────┘                 │ │
│ │ ┌─────────────────────────────────────────────────────┐                 │ │
│ │ │ [Card: Previsão de Vendas]                          │                 │ │
│ │ │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐     │                 │ │
│ │ │ │ Mês Atual   │ │ Próximo Mês │ │ Trimestre   │     │                 │ │
│ │ │ │ R$ 500k     │ │ R$ 650k     │ │ R$ 1.8M     │     │                 │ │
│ │ │ │ projeção    │ │ projeção    │ │ projeção    │     │                 │ │
│ │ │ └─────────────┘ └─────────────┘ └─────────────┘     │                 │ │
│ │ └─────────────────────────────────────────────────────┘                 │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Componentes

#### 6.2.1 Header com Filtros de Período

```html
<header class="bg-white border-b border-gray-200 px-6 py-4">
  <div class="flex items-center justify-between mb-4">
    <div>
      <h1 class="text-2xl font-bold text-[#1f2937]">Dashboard Analítico</h1>
      <p class="text-sm text-[#627271]">Métricas e relatórios do CRM</p>
    </div>

    <div class="flex items-center gap-3">
      <button class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
        <Download class="w-4 h-4" />
        Exportar Relatório
      </button>
    </div>
  </div>

  <!-- Filtros de Período -->
  <div class="flex items-center gap-2">
    <button class="px-4 py-2 bg-[#3e5653] text-white rounded-lg text-sm font-medium">7 dias</button>
    <button class="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">30 dias</button>
    <button class="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Este Mês</button>
    <button class="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Mês Anterior</button>
    <button class="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
      <Calendar class="w-4 h-4" />
      Personalizado
    </button>
  </div>
</header>
```

#### 6.2.2 Cards de Gráficos

```html
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
  <!-- Gráfico de Funil -->
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="font-semibold text-[#1f2937]">Funil de Vendas</h3>
      <button class="p-2 hover:bg-gray-100 rounded-lg">
        <MoreHorizontal class="w-4 h-4 text-gray-400" />
      </button>
    </div>

    <!-- Representação do Funil -->
    <div class="space-y-3">
      <!-- Novo -->
      <div class="flex items-center gap-4">
        <div class="w-20 text-sm text-[#627271]">Novo</div>
        <div class="flex-1 h-8 bg-gray-100 rounded-r-lg overflow-hidden">
          <div class="h-full bg-gray-300 rounded-r-lg flex items-center justify-end px-3" style="width: 100%">
            <span class="text-sm font-medium text-gray-700">100 (100%)</span>
          </div>
        </div>
      </div>

      <!-- Qualificação -->
      <div class="flex items-center gap-4">
        <div class="w-20 text-sm text-[#627271]">Qualificação</div>
        <div class="flex-1 h-8 bg-gray-100 rounded-r-lg overflow-hidden">
          <div class="h-full bg-blue-400 rounded-r-lg flex items-center justify-end px-3" style="width: 75%">
            <span class="text-sm font-medium text-white">75 (75%)</span>
          </div>
        </div>
      </div>

      <!-- Proposta -->
      <div class="flex items-center gap-4">
        <div class="w-20 text-sm text-[#627271]">Proposta</div>
        <div class="flex-1 h-8 bg-gray-100 rounded-r-lg overflow-hidden">
          <div class="h-full bg-yellow-400 rounded-r-lg flex items-center justify-end px-3" style="width: 50%">
            <span class="text-sm font-medium text-gray-800">50 (67%)</span>
          </div>
        </div>
      </div>

      <!-- Negociação -->
      <div class="flex items-center gap-4">
        <div class="w-20 text-sm text-[#627271]">Negociação</div>
        <div class="flex-1 h-8 bg-gray-100 rounded-r-lg overflow-hidden">
          <div class="h-full bg-orange-400 rounded-r-lg flex items-center justify-end px-3" style="width: 30%">
            <span class="text-sm font-medium text-white">30 (60%)</span>
          </div>
        </div>
      </div>

      <!-- Fechado -->
      <div class="flex items-center gap-4">
        <div class="w-20 text-sm text-[#627271]">Fechado</div>
        <div class="flex-1 h-8 bg-gray-100 rounded-r-lg overflow-hidden">
          <div class="h-full bg-green-500 rounded-r-lg flex items-center justify-end px-3" style="width: 25%">
            <span class="text-sm font-medium text-white">25 (83%)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Taxa de Conversão Geral -->
    <div class="mt-6 pt-6 border-t border-gray-200">
      <div class="flex items-center justify-between">
        <span class="text-sm text-[#627271]">Taxa de Conversão Geral</span>
        <span class="text-2xl font-bold text-[#86cb92]">25%</span>
      </div>
      <p class="text-xs text-[#627271] mt-1">25 oportunidades fechadas de 100 novas</p>
    </div>
  </div>

  <!-- Gráfico de Receita -->
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="font-semibold text-[#1f2937]">Evolução de Receita</h3>
      <div class="flex items-center gap-4 text-sm">
        <span class="flex items-center gap-1">
          <span class="w-3 h-3 bg-[#3e5653] rounded"></span>
          Período Atual
        </span>
        <span class="flex items-center gap-1">
          <span class="w-3 h-3 bg-gray-300 rounded"></span>
          Período Anterior
        </span>
      </div>
    </div>

    <!-- Placeholder para gráfico -->
    <div class="h-64 flex items-end justify-between gap-2">
      <div class="flex-1 flex flex-col items-center gap-2">
        <div class="w-full flex gap-1 items-end h-48">
          <div class="flex-1 bg-gray-200 rounded-t" style="height: 60%"></div>
          <div class="flex-1 bg-[#3e5653] rounded-t" style="height: 80%"></div>
        </div>
        <span class="text-xs text-[#627271]">Jan</span>
      </div>
      <div class="flex-1 flex flex-col items-center gap-2">
        <div class="w-full flex gap-1 items-end h-48">
          <div class="flex-1 bg-gray-200 rounded-t" style="height: 70%"></div>
          <div class="flex-1 bg-[#3e5653] rounded-t" style="height: 90%"></div>
        </div>
        <span class="text-xs text-[#627271]">Fev</span>
      </div>
      <div class="flex-1 flex flex-col items-center gap-2">
        <div class="w-full flex gap-1 items-end h-48">
          <div class="flex-1 bg-gray-200 rounded-t" style="height: 50%"></div>
          <div class="flex-1 bg-[#3e5653] rounded-t" style="height: 75%"></div>
        </div>
        <span class="text-xs text-[#627271]">Mar</span>
      </div>
    </div>

    <!-- Total -->
    <div class="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 gap-4">
      <div>
        <p class="text-xs text-[#627271]">Receita Total</p>
        <p class="text-xl font-bold text-[#3e5653]">R$ 245.890</p>
        <p class="text-xs text-green-600 flex items-center gap-1">
          <TrendingUp class="w-3 h-3" />
          +12% vs anterior
        </p>
      </div>
      <div>
        <p class="text-xs text-[#627271]">Ticket Médio</p>
        <p class="text-xl font-bold text-[#3e5653]">R$ 4.098</p>
        <p class="text-xs text-green-600 flex items-center gap-1">
          <TrendingUp class="w-3 h-3" />
          +5% vs anterior
        </p>
      </div>
    </div>
  </div>

  <!-- Top Vendedores -->
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="font-semibold text-[#1f2937]">Top Vendedores</h3>
      <button class="text-sm text-[#3e5653] hover:underline">Ver ranking completo</button>
    </div>

    <div class="space-y-4">
      <!-- #1 -->
      <div class="flex items-center gap-4 p-3 bg-[#86cb92]/10 rounded-lg border border-[#86cb92]/20">
        <div class="w-8 h-8 bg-[#86cb92] rounded-full flex items-center justify-center">
          <span class="text-sm text-white font-bold">1</span>
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-[#3e5653] rounded-full flex items-center justify-center">
              <span class="text-xs text-white">JD</span>
            </div>
            <div>
              <p class="font-medium text-[#1f2937]">João Dias</p>
              <p class="text-xs text-[#627271]">Consultor Senior</p>
            </div>
          </div>
        </div>
        <div class="text-right">
          <p class="font-bold text-[#1f2937]">R$ 150.890</p>
          <p class="text-xs text-green-600">32% conversão</p>
        </div>
      </div>

      <!-- #2 -->
      <div class="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
        <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <span class="text-sm text-gray-600 font-bold">2</span>
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span class="text-xs text-white">MS</span>
            </div>
            <div>
              <p class="font-medium text-[#1f2937]">Maria Santos</p>
              <p class="text-xs text-[#627271]">Consultora Plena</p>
            </div>
          </div>
        </div>
        <div class="text-right">
          <p class="font-bold text-[#1f2937]">R$ 120.450</p>
          <p class="text-xs text-green-600">28% conversão</p>
        </div>
      </div>

      <!-- #3 -->
      <div class="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
        <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <span class="text-sm text-gray-600 font-bold">3</span>
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span class="text-xs text-white">PC</span>
            </div>
            <div>
              <p class="font-medium text-[#1f2937]">Pedro Costa</p>
              <p class="text-xs text-[#627271]">Consultor Junior</p>
            </div>
          </div>
        </div>
        <div class="text-right">
          <p class="font-bold text-[#1f2937]">R$ 95.200</p>
          <p class="text-xs text-yellow-600">22% conversão</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Origem de Leads -->
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h3 class="font-semibold text-[#1f2937] mb-6">Origem de Leads</h3>

    <!-- Representação simplificada de gráfico de pizza -->
    <div class="flex items-center justify-center mb-6">
      <div class="relative w-40 h-40">
        <svg viewBox="0 0 100 100" class="transform -rotate-90">
          <!-- Site: 35% -->
          <circle cx="50" cy="50" r="40" fill="none" stroke="#3e5653" stroke-width="20" stroke-dasharray="88 251" />
          <!-- Indicação: 25% -->
          <circle cx="50" cy="50" r="40" fill="none" stroke="#86cb92" stroke-width="20" stroke-dasharray="63 251" stroke-dashoffset="-88" />
          <!-- Redes Sociais: 20% -->
          <circle cx="50" cy="50" r="40" fill="none" stroke="#627271" stroke-width="20" stroke-dasharray="50 251" stroke-dashoffset="-151" />
          <!-- Eventos: 15% -->
          <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" stroke-width="20" stroke-dasharray="38 251" stroke-dashoffset="-201" />
          <!-- Outros: 5% -->
          <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" stroke-width="20" stroke-dasharray="13 251" stroke-dashoffset="-239" />
        </svg>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-2xl font-bold text-[#1f2937]">100</span>
        </div>
      </div>
    </div>

    <!-- Legenda -->
    <div class="space-y-2">
      <div class="flex items-center justify-between text-sm">
        <span class="flex items-center gap-2">
          <span class="w-3 h-3 bg-[#3e5653] rounded"></span>
          Site
        </span>
        <span class="font-medium">35%</span>
      </div>
      <div class="flex items-center justify-between text-sm">
        <span class="flex items-center gap-2">
          <span class="w-3 h-3 bg-[#86cb92] rounded"></span>
          Indicação
        </span>
        <span class="font-medium">25%</span>
      </div>
      <div class="flex items-center justify-between text-sm">
        <span class="flex items-center gap-2">
          <span class="w-3 h-3 bg-[#627271] rounded"></span>
          Redes Sociais
        </span>
        <span class="font-medium">20%</span>
      </div>
      <div class="flex items-center justify-between text-sm">
        <span class="flex items-center gap-2">
          <span class="w-3 h-3 bg-gray-200 rounded"></span>
          Eventos
        </span>
        <span class="font-medium">15%</span>
      </div>
      <div class="flex items-center justify-between text-sm">
        <span class="flex items-center gap-2">
          <span class="w-3 h-3 bg-gray-100 rounded"></span>
          Outros
        </span>
        <span class="font-medium">5%</span>
      </div>
    </div>
  </div>
</div>
```

#### 6.2.3 Card de Previsão de Vendas

```html
<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mx-6 mb-6">
  <div class="flex items-center justify-between mb-6">
    <h3 class="font-semibold text-[#1f2937] flex items-center gap-2">
      <TrendingUp class="w-5 h-5 text-[#86cb92]" />
      Previsão de Vendas
    </h3>
    <span class="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Baseado em ML</span>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <!-- Mês Atual -->
    <div class="p-4 bg-gray-50 rounded-lg">
      <p class="text-sm text-[#627271] mb-1">Mês Atual</p>
      <p class="text-2xl font-bold text-[#3e5653]">R$ 500.000</p>
      <div class="flex items-center gap-2 mt-2">
        <div class="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
          <div class="h-full bg-[#86cb92] rounded-full" style="width: 85%"></div>
        </div>
        <span class="text-xs text-[#627271]">85% atingido</span>
      </div>
      <p class="text-xs text-[#627271] mt-2">Projeção: R$ 520.000</p>
    </div>

    <!-- Próximo Mês -->
    <div class="p-4 bg-[#86cb92]/5 rounded-lg border border-[#86cb92]/20">
      <p class="text-sm text-[#627271] mb-1">Próximo Mês (Projeção)</p>
      <p class="text-2xl font-bold text-[#3e5653]">R$ 650.000</p>
      <p class="text-xs text-green-600 mt-2 flex items-center gap-1">
        <TrendingUp class="w-3 h-3" />
        +30% vs mês atual
      </p>
      <p class="text-xs text-[#627271] mt-1">Baseado no pipeline atual</p>
    </div>

    <!-- Trimestre -->
    <div class="p-4 bg-gray-50 rounded-lg">
      <p class="text-sm text-[#627271] mb-1">Trimestre (Projeção)</p>
      <p class="text-2xl font-bold text-[#3e5653]">R$ 1.800.000</p>
      <p class="text-xs text-green-600 mt-2 flex items-center gap-1">
        <TrendingUp class="w-3 h-3" />
        +15% vs trimestre anterior
      </p>
      <p class="text-xs text-[#627271] mt-1">Confiança: 78%</p>
    </div>
  </div>

  <!-- Insight -->
  <div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
    <div class="flex items-start gap-3">
      <Sparkles class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
      <div>
        <h4 class="font-medium text-blue-800 text-sm mb-1">Insight da IA</h4>
        <p class="text-sm text-blue-700">
          Oportunidades na fase de "Proposta" têm 85% de chance de fechamento nos próximos 15 dias.
          Considere priorizar follow-ups nesta etapa para maximizar a receita.
        </p>
      </div>
    </div>
  </div>
</div>
```

---

## 7. Estados e Comportamentos

### 7.1 Estados de Loading

```html
<!-- Skeleton para Cards -->
<div class="animate-pulse space-y-4">
  <div class="h-8 bg-gray-200 rounded w-1/4"></div>
  <div class="h-4 bg-gray-200 rounded w-1/2"></div>
  <div class="h-32 bg-gray-200 rounded"></div>
</div>

<!-- Spinner -->
<div class="flex items-center justify-center py-8">
  <div class="w-8 h-8 border-3 border-gray-200 border-t-[#3e5653] rounded-full animate-spin"></div>
  <span class="ml-3 text-[#627271]">Carregando...</span>
</div>

<!-- Skeleton para Tabela -->
<table class="w-full">
  <tbody class="divide-y divide-gray-200">
    <tr class="animate-pulse">
      <td class="px-4 py-4"><div class="h-4 bg-gray-200 rounded w-8"></div></td>
      <td class="px-4 py-4"><div class="h-4 bg-gray-200 rounded w-32"></div></td>
      <td class="px-4 py-4"><div class="h-4 bg-gray-200 rounded w-48"></div></td>
      <td class="px-4 py-4"><div class="h-4 bg-gray-200 rounded w-24"></div></td>
      <td class="px-4 py-4"><div class="h-4 bg-gray-200 rounded w-20"></div></td>
    </tr>
  </tbody>
</table>
```

### 7.2 Estados de Erro

```html
<!-- Toast de Erro -->
<div class="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
  <AlertCircle class="w-5 h-5" />
  <div>
    <p class="font-medium">Erro ao carregar dados</p>
    <p class="text-sm opacity-90">Tente novamente em alguns instantes.</p>
  </div>
  <button class="ml-2 px-3 py-1 bg-white/20 rounded hover:bg-white/30 transition-colors">
    Tentar
  </button>
</div>

<!-- Card de Erro -->
<div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
  <AlertCircle class="w-12 h-12 text-red-500 mx-auto mb-3" />
  <h3 class="font-semibold text-red-800 mb-1">Não foi possível carregar</h3>
  <p class="text-sm text-red-600 mb-4">Ocorreu um erro ao carregar os dados do CRM.</p>
  <button class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
    Tentar Novamente
  </button>
</div>
```

### 7.3 Estados Vazios

```html
<!-- Estado Vazio - Kanban -->
<div class="flex flex-col items-center justify-center py-12 text-center">
  <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
    <Kanban class="w-10 h-10 text-gray-400" />
  </div>
  <h3 class="text-lg font-semibold text-[#1f2937]">Pipeline vazio</h3>
  <p class="text-sm text-[#627271] mb-4 max-w-sm">
    Comece criando sua primeira oportunidade para visualizar o pipeline de vendas.
  </p>
  <button class="flex items-center gap-2 px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors">
    <Plus class="w-4 h-4" />
    Criar Oportunidade
  </button>
</div>
```

---

## 8. Responsividade

### 8.1 Breakpoints

| Breakpoint | Largura | Comportamento |
|------------|---------|---------------|
| Mobile | < 640px | Lista em vez de Kanban, menu hamburguer |
| Tablet | 640px - 1024px | Kanban compacto, sidebar colapsável |
| Desktop | > 1024px | Layout completo |

### 8.2 Mobile Adaptations

#### Pipeline Mobile (Lista)

```html
<!-- Versão Mobile do Pipeline -->
<div class="space-y-3 px-4 py-4">
  <!-- Filtro por Etapa -->
  <div class="flex gap-2 overflow-x-auto pb-2">
    <button class="px-3 py-1.5 bg-[#3e5653] text-white rounded-full text-sm whitespace-nowrap">Todas (32)</button>
    <button class="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap">Novo (12)</button>
    <button class="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm whitespace-nowrap">Qualificação (8)</button>
  </div>

  <!-- Lista de Cards -->
  <div class="space-y-3">
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div class="flex items-start justify-between mb-2">
        <span class="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs">Proposta</span>
        <span class="text-lg font-bold text-[#3e5653]">R$ 5.000</span>
      </div>
      <h4 class="font-semibold text-[#1f2937]">Implementação Sistema ERP</h4>
      <p class="text-sm text-[#627271]">Tech Solutions Ltda.</p>
      <div class="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <span class="text-xs text-[#627271]">70% probabilidade</span>
        <button class="p-2 hover:bg-gray-100 rounded-full">
          <MoreVertical class="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  </div>

  <!-- FAB -->
  <button class="fixed bottom-6 right-6 w-14 h-14 bg-[#3e5653] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#1f2937] transition-colors">
    <Plus class="w-6 h-6" />
  </button>
</div>
```

---

## 9. Ícones (Lucide React)

### 9.1 Ícones por Contexto

| Contexto | Ícone | Nome |
|----------|-------|------|
| CRM Principal | Target | Target |
| Clientes | Users | Users |
| Nova Oportunidade | Plus | Plus |
| Editar | Pencil | Pencil |
| Excluir | Trash2 | Trash2 |
| WhatsApp | MessageCircle | MessageCircle |
| Busca | Search | Search |
| Filtro | Filter | Filter |
| Pipeline | Kanban | Kanban |
| Dashboard | BarChart3 | BarChart3 |
| Calendar | Calendar | Calendar |
| Relógio/Dias | Clock | Clock |
| Dinheiro | DollarSign | DollarSign |
| Percentual | Percent | Percent |
| Tendência Subida | TrendingUp | TrendingUp |
| Tendência Descida | TrendingDown | TrendingDown |
| Check | Check | Check |
| Check Circle | CheckCircle | CheckCircle |
| X Circle | XCircle | XCircle |
| Alerta | AlertCircle | AlertCircle |
| Download | Download | Download |
| Upload | Upload | Upload |
| Mais Opções | MoreHorizontal | MoreHorizontal |
| Seta Direita | ChevronRight | ChevronRight |
| Seta Esquerda | ChevronLeft | ChevronLeft |
| Seta Baixo | ChevronDown | ChevronDown |
| Olho/Ver | Eye | Eye |
| Arquivar | Archive | Archive |
| Pacote | Package | Package |
| Telefone | Phone | Phone |
| Email | Mail | Mail |
| Ajuda | HelpCircle | HelpCircle |
| Brilho/IA | Sparkles | Sparkles |

---

## 10. Regras de Negócio (RN-CRM)

### RN-CRM-001: Criação de Oportunidade
**Descrição:** Toda oportunidade deve ter um cliente associado  
**Validação:** Campo cliente é obrigatório  
**Mensagem de Erro:** "Selecione um cliente para a oportunidade"

### RN-CRM-002: Valor Mínimo
**Descrição:** Oportunidades devem ter valor maior que zero  
**Validação:** `valor > 0`  
**Mensagem de Erro:** "O valor estimado deve ser maior que R$ 0,00"

### RN-CRM-003: Movimentação no Pipeline
**Descrição:** Oportunidades só podem avançar sequencialmente nas etapas  
**Exceção:** É permitido retroceder para qualquer etapa anterior  
**Regra:** Novo → Qualificação → Proposta → Negociação → Fechado

### RN-CRM-004: Fechamento de Oportunidade
**Descrição:** Ao mover para "Fechado", deve-se especificar Ganho ou Perdido  
**Ação:** Exibir modal de confirmação  
**Campos:** Status (Ganho/Perdido), Motivo (se perdido), Valor final (se ganho)

### RN-CRM-005: Probabilidade Padrão
**Descrição:** Cada etapa do pipeline tem probabilidade sugerida  
- Novo: 10%
- Qualificação: 25%
- Proposta: 50%
- Negociação: 75%
- Fechado Ganho: 100%
- Fechado Perdido: 0%

### RN-CRM-006: Receita Esperada
**Descrição:** Cálculo automático de receita ponderada  
**Fórmula:** `Receita Esperada = Valor Estimado × Probabilidade`

### RN-CRM-007: Exclusão de Cliente
**Descrição:** Cliente com oportunidades não pode ser excluído  
**Validação:** Verificar existência de oportunidades vinculadas  
**Ação:** Sugerir arquivamento ou inativação

### RN-CRM-008: Atribuição de Responsável
**Descrição:** Toda oportunidade deve ter um responsável  
**Default:** Usuário logado  
**Permissão:** Apenas gestores podem reatribuir oportunidades

### RN-CRM-009: Data de Fechamento
**Descrição:** Data prevista não pode ser no passado  
**Validação:** `data_prevista >= data_atual`  
**Mensagem de Erro:** "A data prevista deve ser hoje ou no futuro"

### RN-CRM-010: Interações
**Descrição:** Clientes com oportunidades ativas devem ter interação mínima  
**Regra:** Alertar se mais de 7 dias sem interação  
**Visual:** Badge "Sem contato" em amarelo no card

---

## 11. Navegação

### 11.1 Estrutura de URLs

| Rota | Descrição |
|------|-----------|
| `/crm` | Pipeline de Vendas (Kanban) |
| `/crm/clientes` | Lista de Clientes |
| `/crm/clientes/novo` | Cadastro de Cliente |
| `/crm/clientes/:id` | Detalhes do Cliente |
| `/crm/clientes/:id/editar` | Edição de Cliente |
| `/crm/oportunidades/nova` | Nova Oportunidade |
| `/crm/oportunidades/:id/editar` | Editar Oportunidade |
| `/crm/analytics` | Dashboard Analítico |

### 11.2 Sidebar Navigation

```
CRM (Menu Ativo)
├── 📊 Pipeline
├── 👥 Clientes
├── 📈 Analytics
```

---

## 12. Checklist de Implementação

### 12.1 Estrutura

- [ ] Criar rotas conforme especificação
- [ ] Configurar layout com sidebar
- [ ] Implementar proteção de rotas

### 12.2 Componentes Base

- [ ] Card de Oportunidade
- [ ] Coluna do Kanban
- [ ] Card de Cliente (tabela)
- [ ] Header de página
- [ ] Badge de Status

### 12.3 Funcionalidades

- [ ] Drag and drop no Kanban
- [ ] Filtros e busca
- [ ] Paginação
- [ ] Formulário de oportunidade
- [ ] Formulário de cliente
- [ ] Timeline de interações

### 12.4 Integrações

- [ ] API de oportunidades (CRUD)
- [ ] API de clientes (CRUD)
- [ ] API de interações
- [ ] API de analytics
- [ ] WebSocket para atualizações em tempo real (opcional)

### 12.5 Testes

- [ ] Testes unitários dos componentes
- [ ] Testes de integração das APIs
- [ ] Testes E2E do fluxo principal
- [ ] Testes de responsividade

### 12.6 Acessibilidade

- [ ] Navegação por teclado
- [ ] ARIA labels nos elementos interativos
- [ ] Contraste de cores adequado
- [ ] Screen reader friendly

---

## 13. Anexos

### 13.1 Tokens de Design

```javascript
// Tailwind Config Extensions
{
  colors: {
    uniq: {
      platinum: '#efefef',
      white: '#ffffff',
      jet: '#1f2937',
      slate: '#3e5653',
      emerald: '#86cb92',
      dim: '#627271',
    }
  },
  fontFamily: {
    poppins: ['Poppins', 'sans-serif'],
  }
}
```

### 13.2 Variantes de Badges

```html
<!-- Status do Pipeline -->
<span class="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">Novo</span>
<span class="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Qualificação</span>
<span class="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Proposta</span>
<span class="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">Negociação</span>
<span class="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Ganho</span>
<span class="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">Perdido</span>

<!-- Status do Cliente -->
<span class="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Ativo</span>
<span class="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">Inativo</span>
<span class="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Potencial</span>
```

---

**Documento criado em:** 2026-03-12  
**Versão:** 1.0.0  
**Status:** Aprovado para desenvolvimento

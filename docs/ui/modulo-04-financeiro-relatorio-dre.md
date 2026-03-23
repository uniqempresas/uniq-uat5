# Módulo 04: Financeiro - Relatório DRE

## Metadados

| Atributo | Valor |
|----------|-------|
| **Módulo** | Financeiro |
| **Submódulo** | Relatório DRE (Demonstração do Resultado do Exercício) |
| **Código** | MOD-FIN-RPT-DRE-001 |
| **Versão** | 1.0.0 |
| **Status** | Especificação |
| **Responsável** | Frontend Team |
| **Última Atualização** | 2026-03-12 |
| **Dependências** | MOD-FIN-001, MOD-FIN-CAT-001 |

---

## 1. Design System

### 1.1 Paleta de Cores

| Token | Valor HEX | Uso |
|-------|-----------|-----|
| `--bg-primary` | `#efefef` | Fundo principal |
| `--bg-card` | `#ffffff` | Fundo de cards |
| `--dre-receita` | `#86cb92` | Receitas (verde) |
| `--dre-cmv` | `#f59e0b` | CMV/CSP (amarelo) |
| `--dre-despesa` | `#ef4444` | Despesas (vermelho) |
| `--dre-lucro` | `#22c55e` | Lucro (verde escuro) |
| `--dre-prejuizo` | `#dc2626` | Prejuízo (vermelho escuro) |
| `--dre-subtotal` | `#3e5653` | Subtotais |
| `--text-primary` | `#1f2937` | Texto principal |
| `--text-secondary` | `#627271` | Texto secundário |

### 1.2 Tipografia

| Elemento | Fonte | Tamanho | Peso | Cor |
|----------|-------|---------|------|-----|
| Título Página | Poppins | 24px | 700 | `#1f2937` |
| Seção DRE | Poppins | 16px | 600 | `#3e5653` |
| Linha Item | Poppins | 14px | 400 | `#1f2937` |
| Valor | Poppins | 14px | 500 | Variável |
| Total | Poppins | 16px | 700 | Variável |
| Percentual | Poppins | 12px | 400 | `#627271` |

---

## 2. Tela: Relatório DRE (/financeiro/relatorios/dre)

### 2.1 Estrutura do Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar #1f2937]                                                                   │
│ ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] DRE - Demonstração do Resultado                                        │ │
│ │          Análise detalhada da performance financeira                            │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Filtros e Período]                                                             │ │
│ │ [Período: ▼] [Comparar com: ▼] [Tipo: Sintético|Analítico ▼] [📊 Visualizar]   │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Cards de Indicadores]                                                          │ │
│ │ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────┐ │ │
│ │ │ [💰]             │ │ [📈]             │ │ [📊]             │ │ [🎯]         │ │ │
│ │ │ R$ 45.000        │ │ 35%              │ │ R$ 15.750        │ │ 25%          │ │ │
│ │ │ Receita Líquida  │ │ Margem Bruta     │ │ Lucro Líquido    │ │ Margem Líquida│ │ │
│ │ │ vs mês ant: +12% │ │ Meta: 40%        │ │ vs mês ant: +8%  │ │ Meta: 20%    │ │ │
│ │ └──────────────────┘ └──────────────────┘ └──────────────────┘ └──────────────┘ │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Tabela DRE]                                                                    │ │
│ │ ┌─────────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ DESCRIÇÃO                              ATUAL      %        ANTERIOR    Δ%   │ │ │
│ │ │ ═══════════════════════════════════════════════════════════════════════════│ │ │
│ │ │ RECEITA BRUTA                          R$50.000   100%     R$45.000   +11%  │ │ │
│ │ │   Vendas de Produtos                   R$35.000    70%     R$32.000   +9%   │ │ │
│ │ │   Serviços Prestados                   R$15.000    30%     R$13.000   +15%  │ │ │
│ │ │ ───────────────────────────────────────────────────────────────────────────│ │ │
│ │ │ (-) IMPOSTOS S/ VENDAS                 (R$5.000)  -10%     (R$4.500)  +11%  │ │ │
│ │ │   ICMS                                 (R$2.500)  -5%      (R$2.250)  +11%  │ │ │
│ │ │   PIS/COFINS                           (R$1.500)  -3%      (R$1.350)  +11%  │ │ │
│ │ │   ISS                                  (R$1.000)  -2%      (R$900)    +11%  │ │ │
│ │ │ ───────────────────────────────────────────────────────────────────────────│ │ │
│ │ │ = RECEITA LÍQUIDA                      R$45.000   100%     R$40.500   +11%  │ │ │
│ │ │     [green bar 100%]                                                      │ │ │
│ │ │ ───────────────────────────────────────────────────────────────────────────│ │ │
│ │ │ (-) CUSTO DAS MERCADORIAS VENDIDAS     (R$18.000) -40%     (R$16.200) +11%  │ │ │
│ │ │   Compras de Mercadorias               (R$15.000) -33%     (R$13.500) +11%  │ │ │
│ │ │   Frete sobre Compras                  (R$2.000)  -4%      (R$1.800)  +11%  │ │ │
│ │ │   Outros Custos Diretos                (R$1.000)  -2%      (R$900)    +11%  │ │ │
│ │ │ ───────────────────────────────────────────────────────────────────────────│ │ │
│ │ │ = LUCRO BRUTO                          R$27.000   60%      R$24.300   +11%  │ │ │
│ │ │     [green bar 60%]                                                       │ │ │
│ │ │ ───────────────────────────────────────────────────────────────────────────│ │ │
│ │ │ (-) DESPESAS OPERACIONAIS              (R$8.000)  -18%     (R$7.500)  +7%   │ │ │
│ │ │   ▼ Despesas com Pessoal               (R$5.000)  -11%     (R$4.800)  +4%   │ │ │
│ │ │     Salários e Encargos                (R$4.000)  -9%      (R$3.800)  +5%   │ │ │
│ │ │     Pró-Labore                         (R$1.000)  -2%      (R$1.000)  0%    │ │ │
│ │ │   ▼ Despesas Administrativas           (R$2.000)  -4%      (R$1.900)  +5%   │ │ │
│ │ │     Aluguel                            (R$1.200)  -3%      (R$1.200)  0%    │ │ │
│ │ │     Energia/Água/Telefone              (R$500)    -1%      (R$450)    +11%  │ │ │
│ │ │     Outras                             (R$300)    -1%      (R$250)    +20%  │ │ │
│ │ │   ▼ Despesas Comerciais                (R$1.000)  -2%      (R$800)    +25%  │ │ │
│ │ │     Marketing                          (R$800)    -2%      (R$600)    +33%  │ │ │
│ │ │     Comissões                          (R$200)    0%       (R$200)    0%    │ │ │
│ │ │ ───────────────────────────────────────────────────────────────────────────│ │ │
│ │ │ = LUCRO/PREJUÍZO OPERACIONAL           R$19.000   42%      R$16.800   +13%  │ │ │
│ │ │ ───────────────────────────────────────────────────────────────────────────│ │ │
│ │ │ (+/-) RECEITAS/DESPESAS FINANCEIRAS    (R$500)    -1%      (R$400)    +25%  │ │ │
│ │ │   Receitas Financeiras                 R$200      0%       R$150     +33%   │ │ │
│ │ │   Despesas Financeiras                 (R$700)    -2%      (R$550)    +27%  │ │ │
│ │ │ ───────────────────────────────────────────────────────────────────────────│ │ │
│ │ │ = LUCRO/PREJUÍZO LÍQUIDO               R$18.500   41%      R$16.400   +13%  │ │ │
│ │ │     [green bar 41%]                                                       │ │ │
│ │ └─────────────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                                 │ │
│ │ [Gráfico de Evolução]                                                           │ │
│ │ ┌─────────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ DRE - Evolução Mensal                                                       │ │ │
│ │ │                                                                             │ │ │
│ │ │  R$50k ┤                                              ╭────╮                │ │ │
│ │ │        │                                    ╭────╮   │    │                │ │ │
│ │ │  R$40k ┤           ╭────╮          ╭────╮  │    │   │    │                │ │ │
│ │ │        │  ╭────╮  │    │ ╭────╮  │    │  │    │   │    │                │ │ │
│ │ │  R$30k ┤  │    │  │    │ │    │  │    │  │    │   │    │                │ │ │
│ │ │        │  │    │  │    │ │    │  │    │  │    │   │    │                │ │ │
│ │ │  R$20k ┤  │    │  │    │ │    │  │    │  │    │   │    │                │ │ │
│ │ │        │  │    │  │    │ │    │  │    │  │    │   │    │                │ │ │
│ │ │  R$10k ┤  │    │  │    │ │    │  │    │  │    │   │    │                │ │ │
│ │ │        │  │    │  │    │ │    │  │    │  │    │   │    │                │ │ │
│ │ │     R$0┴──┴────┴──┴────┴─┴────┴──┴────┴──┴────┴───┴────┴────           │ │ │
│ │ │        Jan  Fev  Mar  Abr  Mai  Jun  Jul  Ago  Set  Out  Nov  Dez       │ │ │
│ │ │                                                                             │ │ │
│ │ │     ─── Receita Líquida    ─ ─ Despesas    ─·─ Lucro Líquido              │ │ │
│ │ └─────────────────────────────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Componentes

#### 2.2.1 Header da Página

```html
<header class="bg-white border-b border-gray-200 px-6 py-4">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-[#1f2937]">DRE - Demonstração do Resultado</h1>
      <p class="text-sm text-[#627271]">Análise detalhada da performance financeira</p>
    </div>
    <div class="flex items-center gap-3">
      <button class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
        <Printer class="w-4 h-4" />
        Imprimir
      </button>
      <button class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
        <Download class="w-4 h-4" />
        Exportar PDF
      </button>
      <button class="flex items-center gap-2 px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937]">
        <FileSpreadsheet class="w-4 h-4" />
        Exportar Excel
      </button>
    </div>
  </div>
</header>
```

#### 2.2.2 Barra de Filtros

```html
<div class="bg-white border-b border-gray-200 px-6 py-4">
  <div class="flex items-center gap-4">
    <!-- Período -->
    <div class="flex items-center gap-2">
      <label class="text-sm text-[#627271]">Período:</label>
      <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#86cb92]">
        <option value="2026-03">Março/2026</option>
        <option value="2026-02">Fevereiro/2026</option>
        <option value="2026-01">Janeiro/2026</option>
        <option value="custom">Personalizado...</option>
      </select>
    </div>
    
    <!-- Comparar com -->
    <div class="flex items-center gap-2">
      <label class="text-sm text-[#627271]">Comparar com:</label>
      <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#86cb92]">
        <option value="previous">Mês Anterior</option>
        <option value="same_last_year">Mesmo Mês Ano Anterior</option>
        <option value="average">Média do Ano</option>
        <option value="budget">Orçamento</option>
      </select>
    </div>
    
    <!-- Tipo -->
    <div class="flex items-center gap-2">
      <label class="text-sm text-[#627271]">Tipo:</label>
      <div class="flex bg-gray-100 rounded-lg p-1">
        <button class="px-3 py-1.5 text-sm font-medium rounded-md bg-white shadow-sm text-[#1f2937]">
          Sintético
        </button>
        <button class="px-3 py-1.5 text-sm font-medium rounded-md text-[#627271] hover:text-[#1f2937]">
          Analítico
        </button>
      </div>
    </div>
    
    <!-- Visualização -->
    <button class="flex items-center gap-2 px-4 py-2 border border-[#86cb92] text-[#86cb92] rounded-lg hover:bg-green-50">
      <BarChart3 class="w-4 h-4" />
      Visualização Gráfica
    </button>
  </div>
</div>
```

#### 2.2.3 Cards de Indicadores

```html
<div class="grid grid-cols-1 md:grid-cols-4 gap-4 px-6 py-4">
  <!-- Receita Líquida -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-[#627271] mb-1">Receita Líquida</p>
        <h3 class="text-2xl font-bold text-[#1f2937]">R$ 45.000,00</h3>
        <div class="flex items-center gap-1 mt-2">
          <TrendingUp class="w-3 h-3 text-[#86cb92]" />
          <span class="text-xs text-[#86cb92] font-medium">+11%</span>
          <span class="text-xs text-[#627271]">vs mês anterior</span>
        </div>
      </div>
      <div class="w-12 h-12 rounded-xl bg-[#86cb92]/20 flex items-center justify-center">
        <DollarSign class="w-6 h-6 text-[#86cb92]" />
      </div>
    </div>
  </div>
  
  <!-- Margem Bruta -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-[#627271] mb-1">Margem Bruta</p>
        <h3 class="text-2xl font-bold text-[#1f2937]">60%</h3>
        <div class="flex items-center gap-1 mt-2">
          <Target class="w-3 h-3 text-orange-500" />
          <span class="text-xs text-orange-500 font-medium">Meta: 65%</span>
        </div>
      </div>
      <div class="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
        <Percent class="w-6 h-6 text-orange-600" />
      </div>
    </div>
    <!-- Progress bar -->
    <div class="mt-3">
      <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div class="h-full bg-orange-500 rounded-full" style="width: 60%"></div>
      </div>
    </div>
  </div>
  
  <!-- Lucro Líquido -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-[#627271] mb-1">Lucro Líquido</p>
        <h3 class="text-2xl font-bold text-[#86cb92]">R$ 18.500,00</h3>
        <div class="flex items-center gap-1 mt-2">
          <TrendingUp class="w-3 h-3 text-[#86cb92]" />
          <span class="text-xs text-[#86cb92] font-medium">+13%</span>
          <span class="text-xs text-[#627271]">vs mês anterior</span>
        </div>
      </div>
      <div class="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
        <TrendingUp class="w-6 h-6 text-green-600" />
      </div>
    </div>
  </div>
  
  <!-- Margem Líquida -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-[#627271] mb-1">Margem Líquida</p>
        <h3 class="text-2xl font-bold text-[#3e5653]">41%</h3>
        <div class="flex items-center gap-1 mt-2">
          <CheckCircle class="w-3 h-3 text-[#86cb92]" />
          <span class="text-xs text-[#86cb92] font-medium">Acima da meta (35%)</span>
        </div>
      </div>
      <div class="w-12 h-12 rounded-xl bg-[#3e5653]/20 flex items-center justify-center">
        <PieChart class="w-6 h-6 text-[#3e5653]" />
      </div>
    </div>
  </div>
</div>
```

#### 2.2.4 Tabela DRE

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mx-6">
  <table class="w-full">
    <thead class="bg-gray-50 border-b border-gray-200">
      <tr>
        <th class="px-4 py-3 text-left text-xs font-semibold text-[#627271] uppercase">Descrição</th>
        <th class="px-4 py-3 text-right text-xs font-semibold text-[#627271] uppercase">Valor (R$)</th>
        <th class="px-4 py-3 text-right text-xs font-semibold text-[#627271] uppercase">%</th>
        <th class="px-4 py-3 text-right text-xs font-semibold text-[#627271] uppercase">Anterior</th>
        <th class="px-4 py-3 text-right text-xs font-semibold text-[#627271] uppercase">Δ %</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <!-- RECEITA BRUTA -->
      <tr class="bg-[#86cb92]/5">
        <td class="px-4 py-3 font-semibold text-[#1f2937]">RECEITA BRUTA</td>
        <td class="px-4 py-3 text-right font-semibold text-[#86cb92]">50.000,00</td>
        <td class="px-4 py-3 text-right font-semibold">100%</td>
        <td class="px-4 py-3 text-right text-[#627271]">45.000,00</td>
        <td class="px-4 py-3 text-right">
          <span class="text-[#86cb92]">+11%</span>
        </td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-4 py-2 pl-8 text-[#627271]">Vendas de Produtos</td>
        <td class="px-4 py-2 text-right text-[#1f2937]">35.000,00</td>
        <td class="px-4 py-2 text-right text-[#627271]">70%</td>
        <td class="px-4 py-2 text-right text-[#627271]">32.000,00</td>
        <td class="px-4 py-2 text-right text-[#86cb92]">+9%</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-4 py-2 pl-8 text-[#627271]">Serviços Prestados</td>
        <td class="px-4 py-2 text-right text-[#1f2937]">15.000,00</td>
        <td class="px-4 py-2 text-right text-[#627271]">30%</td>
        <td class="px-4 py-2 text-right text-[#627271]">13.000,00</td>
        <td class="px-4 py-2 text-right text-[#86cb92]">+15%</td>
      </tr>
      
      <!-- IMPOSTOS -->
      <tr class="bg-red-50/30">
        <td class="px-4 py-3 font-semibold text-red-600">(-) IMPOSTOS S/ VENDAS</td>
        <td class="px-4 py-3 text-right font-semibold text-red-600">(5.000,00)</td>
        <td class="px-4 py-3 text-right font-semibold text-red-600">-10%</td>
        <td class="px-4 py-3 text-right text-[#627271]">(4.500,00)</td>
        <td class="px-4 py-3 text-right text-red-600">+11%</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-4 py-2 pl-8 text-[#627271]">ICMS</td>
        <td class="px-4 py-2 text-right text-red-600">(2.500,00)</td>
        <td class="px-4 py-2 text-right text-[#627271]">-5%</td>
        <td class="px-4 py-2 text-right text-[#627271]">(2.250,00)</td>
        <td class="px-4 py-2 text-right text-red-600">+11%</td>
      </tr>
      <tr class="hover:bg-gray-50">
        <td class="px-4 py-2 pl-8 text-[#627271]">PIS/COFINS</td>
        <td class="px-4 py-2 text-right text-red-600">(1.500,00)</td>
        <td class="px-4 py-2 text-right text-[#627271]">-3%</td>
        <td class="px-4 py-2 text-right text-[#627271]">(1.350,00)</td>
        <td class="px-4 py-2 text-right text-red-600">+11%</td>
      </tr>
      
      <!-- RECEITA LÍQUIDA -->
      <tr class="bg-[#3e5653] text-white">
        <td class="px-4 py-4 font-bold">= RECEITA LÍQUIDA</td>
        <td class="px-4 py-4 text-right font-bold">45.000,00</td>
        <td class="px-4 py-4 text-right font-bold">100%</td>
        <td class="px-4 py-4 text-right text-gray-300">40.500,00</td>
        <td class="px-4 py-4 text-right">
          <span class="text-[#86cb92]">+11%</span>
        </td>
      </tr>
      <tr>
        <td colspan="5" class="px-4 py-1">
          <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full bg-[#86cb92] rounded-full" style="width: 100%"></div>
          </div>
        </td>
      </tr>
      
      <!-- CMV -->
      <tr class="bg-orange-50/30">
        <td class="px-4 py-3 font-semibold text-orange-600">(-) CUSTO DAS MERCADORIAS</td>
        <td class="px-4 py-3 text-right font-semibold text-orange-600">(18.000,00)</td>
        <td class="px-4 py-3 text-right font-semibold text-orange-600">-40%</td>
        <td class="px-4 py-3 text-right text-[#627271]">(16.200,00)</td>
        <td class="px-4 py-3 text-right text-orange-600">+11%</td>
      </tr>
      
      <!-- LUCRO BRUTO -->
      <tr class="bg-green-100">
        <td class="px-4 py-4 font-bold text-green-800">= LUCRO BRUTO</td>
        <td class="px-4 py-4 text-right font-bold text-green-700">27.000,00</td>
        <td class="px-4 py-4 text-right font-bold text-green-700">60%</td>
        <td class="px-4 py-4 text-right text-green-600">24.300,00</td>
        <td class="px-4 py-4 text-right text-green-600">+11%</td>
      </tr>
      <tr>
        <td colspan="5" class="px-4 py-1">
          <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full bg-green-500 rounded-full" style="width: 60%"></div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## 3. Formulários

### 3.1 Tabela de Campos - Filtros

| Campo | Tipo | Obrigatório | Opções | Descrição |
|-------|------|-------------|--------|-----------|
| Período | Select | Sim | Meses/Ano | Mês de referência |
| Comparar com | Select | Não | previous, last_year, average, budget | Base de comparação |
| Tipo | Toggle | Sim | sintetico, analitico | Nível de detalhe |
| Categorias | MultiSelect | Não | Lista de categorias | Filtrar por categoria |

---

## 4. Regras de Negócio

| Código | Descrição | Severidade |
|--------|-----------|------------|
| **RN-DRE-001** | Fórmula: Receita Líquida = Receita Bruta - Impostos | Alta |
| **RN-DRE-002** | Fórmula: Lucro Bruto = Receita Líquida - CMV | Alta |
| **RN-DRE-003** | Fórmula: Lucro Líquido = Lucro Bruto - Despesas + Res. Financeiro | Alta |
| **RN-DRE-004** | Percentuais calculados sobre Receita Líquida | Alta |
| **RN-DRE-005** | Variação calculada: (Atual - Anterior) / Anterior × 100 | Média |
| **RN-DRE-006** | Meta de margem bruta configurável por empresa | Média |
| **RN-DRE-007** | Histórico DRE mantido por 5 anos | Média |

---

## 5. Checklist

### 5.1 Funcionalidades

- [ ] Geração automática do DRE
- [ ] Filtro por período
- [ ] Comparação com período anterior
- [ ] Visualização sintética/analítica
- [ ] Exportação PDF
- [ ] Exportação Excel
- [ ] Gráfico de evolução
- [ ] Cards de indicadores
- [ ] Progress bars visuais
- [ ] Drill-down por categoria

### 5.2 Cálculos

- [ ] Receita Bruta
- [ ] Impostos
- [ ] Receita Líquida
- [ ] CMV
- [ ] Lucro Bruto
- [ ] Despesas Operacionais
- [ ] Resultado Financeiro
- [ ] Lucro Líquido
- [ ] Margens (%)
- [ ] Variações (%)

### 5.3 Estados

- [ ] Loading de geração
- [ ] Empty (sem dados)
- [ ] Error
- [ ] Dados carregados
- [ ] Exportando

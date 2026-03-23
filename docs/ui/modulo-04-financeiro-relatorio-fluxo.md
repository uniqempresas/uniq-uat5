# Módulo 04: Financeiro - Relatório Fluxo de Caixa

## Metadados

| Atributo | Valor |
|----------|-------|
| **Módulo** | Financeiro |
| **Submódulo** | Relatório Fluxo de Caixa |
| **Código** | MOD-FIN-RPT-FLX-001 |
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
| `--fluxo-entrada` | `#86cb92` | Entradas (verde) |
| `--fluxo-saida` | `#ef4444` | Saídas (vermelho) |
| `--fluxo-saldo` | `#3b82f6` | Saldo (azul) |
| `--fluxo-acumulado` | `#3e5653` | Saldo Acumulado |
| `--fluxo-projecao` | `#8b5cf6` | Projeção (roxo) |
| `--text-primary` | `#1f2937` | Texto principal |

### 1.2 Tipografia

| Elemento | Fonte | Tamanho | Peso | Cor |
|----------|-------|---------|------|-----|
| Título | Poppins | 24px | 700 | `#1f2937` |
| Mês/Período | Poppins | 16px | 600 | `#3e5653` |
| Valor | Poppins | 14px | 500 | Variável |
| Total | Poppins | 16px | 700 | Variável |

---

## 2. Tela: Fluxo de Caixa (/financeiro/relatorios/fluxo-caixa)

### 2.1 Estrutura do Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar #1f2937]                                                                   │
│ ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] Fluxo de Caixa                                                         │ │
│ │          Acompanhe entradas, saídas e saldo em períodos                         │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Filtros]                                                                       │ │
│ │ [Período: Jan/2026 - Dez/2026 ▼] [Conta: Todas ▼] [Tipo: Realizado+Projetado ▼]│ │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Cards Resumo]                                                                  │ │
│ │ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────┐ │ │
│ │ │ [↓]              │ │ [↑]              │ │ [=]              │ │ [📈]         │ │ │
│ │ │ R$ 450.000       │ │ R$ 320.000       │ │ R$ 130.000       │ │ R$ 45.000    │ │ │
│ │ │ Total Entradas   │ │ Total Saídas     │ │ Saldo Período    │ │ Média Mensal │ │ │
│ │ │ 12 meses         │ │ 12 meses         │ │ +28,9%           │ │ vs ano ant   │ │ │
│ │ └──────────────────┘ └──────────────────┘ └──────────────────┘ └──────────────┘ │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Gráfico Principal - Combinado]                                                 │ │
│ │ ┌─────────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │                                                                             │ │ │
│ │ │    R$80k ┤                                    ╭────╮                        │ │ │
│ │ │          │       ╭────╮          ╭────╮     ╭╯    ╰──╮                     │ │ │
│ │ │    R$60k ┤  ╭────╯    ╰────╮    │    │────╯          │                     │ │ │
│ │ │          │  │               ╰────╯    │               │                     │ │ │
│ │ │    R$40k ┤──┤                           ╭────────────╯                     │ │ │
│ │ │          │  │                      ╭────╯                                  │ │ │
│ │ │    R$20k ┤  ╰────╮          ╭────╯                                         │ │ │
│ │ │          │       ╰────╮  ╭──╯                                              │ │ │
│ │ │      R$0 ┴────────────┴──┴────────────────────────────────────               │ │ │
│ │ │          Jan  Fev  Mar  Abr  Mai  Jun  Jul  Ago  Set  Out  Nov  Dez       │ │ │
│ │ │                                                                             │ │ │
│ │ │     ▬▬▬ Entradas  ▬ ▬ Saídas  ─ · ─ Saldo Acumulado  ··· Projeção         │ │ │
│ │ └─────────────────────────────────────────────────────────────────────────────┘ │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Tabela de Fluxo de Caixa]                                                      │ │
│ │ ┌─────────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ PERÍODO      ENTRADAS      SAÍDAS        SALDO MÊS    SALDO ACUMULADO      │ │ │
│ │ │ ═══════════════════════════════════════════════════════════════════════════│ │ │
│ │ │ Jan/26       R$ 32.000     R$ 28.000     R$ 4.000      R$ 4.000            │ │ │
│ │ │              [====      ]  [====      ]  [▓          ] [▓▓          ]      │ │ │
│ │ │ ───────────────────────────────────────────────────────────────────────────│ │ │
│ │ │ Fev/26       R$ 35.000     R$ 30.000     R$ 5.000      R$ 9.000            │ │ │
│ │ │              [====      ]  [====      ]  [▓▓         ] [▓▓▓         ]      │ │ │
│ │ │ ───────────────────────────────────────────────────────────────────────────│ │ │
│ │ │ Mar/26       R$ 42.000     R$ 35.000     R$ 7.000      R$ 16.000           │ │ │
│ │ │              [=====     ]  [=====     ]  [▓▓▓        ] [▓▓▓▓▓       ]      │ │ │
│ │ │ ───────────────────────────────────────────────────────────────────────────│ │ │
│ │ │ ...                                                                         │ │ │
│ │ │ ───────────────────────────────────────────────────────────────────────────│ │ │
│ │ │ Nov/26 (P)   R$ 38.000     R$ 32.000     R$ 6.000      R$ 125.000          │ │ │
│ │ │              [=====     ]  [=====     ]  [▓▓▓        ] [▓▓▓▓▓▓▓▓▓▓▓  ]    │ │ │
│ │ │ ───────────────────────────────────────────────────────────────────────────│ │ │
│ │ │ Dez/26 (P)   R$ 45.000     R$ 38.000     R$ 7.000      R$ 132.000          │ │ │
│ │ │              [======    ]  [======    ]  [▓▓▓▓       ] [▓▓▓▓▓▓▓▓▓▓▓▓▓ ]    │ │ │
│ │ │ ═══════════════════════════════════════════════════════════════════════════│ │ │
│ │ │ TOTAL        R$ 450.000    R$ 320.000    R$ 130.000    ─                   │ │ │
│ │ │              [==========]  [========  ]  [▓▓▓▓▓      ]                     │ │ │
│ │ │                                                                             │ │ │
│ │ │ Legenda: (P) = Projeção  │  Realizado: 75%  │  Projeção: 25%               │ │ │
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
      <h1 class="text-2xl font-bold text-[#1f2937]">Fluxo de Caixa</h1>
      <p class="text-sm text-[#627271]">Acompanhe entradas, saídas e saldo em períodos</p>
    </div>
    <div class="flex items-center gap-3">
      <button class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
        <Printer class="w-4 h-4" />
        Imprimir
      </button>
      <button class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
        <Download class="w-4 h-4" />
        PDF
      </button>
      <button class="flex items-center gap-2 px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937]">
        <FileSpreadsheet class="w-4 h-4" />
        Excel
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
      <div class="flex items-center gap-2">
        <select class="px-3 py-2 border border-gray-300 rounded-lg text-sm">
          <option>Jan/2026</option>
          <option>Fev/2026</option>
          <option>Mar/2026</option>
        </select>
        <span class="text-[#627271]">até</span>
        <select class="px-3 py-2 border border-gray-300 rounded-lg text-sm">
          <option>Dez/2026</option>
          <option>Nov/2026</option>
        </select>
      </div>
    </div>
    
    <!-- Conta -->
    <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm">
      <option value="">Todas as contas</option>
      <option value="1">Itaú - Corrente</option>
      <option value="2">Bradesco - Poupança</option>
    </select>
    
    <!-- Tipo -->
    <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm">
      <option value="all">Realizado + Projetado</option>
      <option value="realizado">Apenas Realizado</option>
      <option value="projetado">Apenas Projetado</option>
    </select>
  </div>
</div>
```

#### 2.2.3 Cards de Resumo

```html
<div class="grid grid-cols-1 md:grid-cols-4 gap-4 px-6 py-4">
  <!-- Entradas -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-[#627271] mb-1">Total Entradas</p>
        <h3 class="text-2xl font-bold text-[#86cb92]">R$ 450.000,00</h3>
        <p class="text-xs text-[#627271] mt-2">Período: 12 meses</p>
      </div>
      <div class="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
        <ArrowDownLeft class="w-6 h-6 text-green-600" />
      </div>
    </div>
  </div>
  
  <!-- Saídas -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-[#627271] mb-1">Total Saídas</p>
        <h3 class="text-2xl font-bold text-red-600">R$ 320.000,00</h3>
        <p class="text-xs text-[#627271] mt-2">Período: 12 meses</p>
      </div>
      <div class="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
        <ArrowUpRight class="w-6 h-6 text-red-600" />
      </div>
    </div>
  </div>
  
  <!-- Saldo -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-[#627271] mb-1">Saldo do Período</p>
        <h3 class="text-2xl font-bold text-blue-600">R$ 130.000,00</h3>
        <div class="flex items-center gap-1 mt-2">
          <TrendingUp class="w-3 h-3 text-[#86cb92]" />
          <span class="text-xs text-[#86cb92] font-medium">+28,9%</span>
        </div>
      </div>
      <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
        <Wallet class="w-6 h-6 text-blue-600" />
      </div>
    </div>
  </div>
  
  <!-- Média -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-[#627271] mb-1">Média Mensal</p>
        <h3 class="text-2xl font-bold text-[#3e5653]">R$ 10.833,00</h3>
        <div class="flex items-center gap-1 mt-2">
          <TrendingUp class="w-3 h-3 text-[#86cb92]" />
          <span class="text-xs text-[#86cb92] font-medium">vs ano anterior</span>
        </div>
      </div>
      <div class="w-12 h-12 rounded-xl bg-[#3e5653]/20 flex items-center justify-center">
        <BarChart3 class="w-6 h-6 text-[#3e5653]" />
      </div>
    </div>
  </div>
</div>
```

#### 2.2.4 Tabela de Fluxo

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mx-6">
  <table class="w-full">
    <thead class="bg-gray-50 border-b border-gray-200">
      <tr>
        <th class="px-4 py-3 text-left text-xs font-semibold text-[#627271] uppercase">Período</th>
        <th class="px-4 py-3 text-right text-xs font-semibold text-[#627271] uppercase">Entradas</th>
        <th class="px-4 py-3 text-right text-xs font-semibold text-[#627271] uppercase">Saídas</th>
        <th class="px-4 py-3 text-right text-xs font-semibold text-[#627271] uppercase">Saldo Mês</th>
        <th class="px-4 py-3 text-right text-xs font-semibold text-[#627271] uppercase">Saldo Acumulado</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr class="hover:bg-gray-50">
        <td class="px-4 py-4">
          <span class="font-medium text-[#1f2937]">Janeiro/2026</span>
        </td>
        <td class="px-4 py-4">
          <div class="text-right">
            <span class="text-[#86cb92] font-medium">R$ 32.000,00</span>
            <div class="w-20 h-1.5 bg-gray-200 rounded-full ml-auto mt-1">
              <div class="h-full bg-[#86cb92] rounded-full" style="width: 71%"></div>
            </div>
          </div>
        </td>
        <td class="px-4 py-4">
          <div class="text-right">
            <span class="text-red-600 font-medium">R$ 28.000,00</span>
            <div class="w-20 h-1.5 bg-gray-200 rounded-full ml-auto mt-1">
              <div class="h-full bg-red-500 rounded-full" style="width: 88%"></div>
            </div>
          </div>
        </td>
        <td class="px-4 py-4">
          <div class="text-right">
            <span class="text-blue-600 font-medium">R$ 4.000,00</span>
            <div class="w-20 h-1.5 bg-gray-200 rounded-full ml-auto mt-1">
              <div class="h-full bg-blue-500 rounded-full" style="width: 40%"></div>
            </div>
          </div>
        </td>
        <td class="px-4 py-4">
          <div class="text-right">
            <span class="text-[#3e5653] font-bold">R$ 4.000,00</span>
            <div class="w-20 h-1.5 bg-gray-200 rounded-full ml-auto mt-1">
              <div class="h-full bg-[#3e5653] rounded-full" style="width: 3%"></div>
            </div>
          </div>
        </td>
      </tr>
      
      <!-- Projeção -->
      <tr class="bg-purple-50/30 hover:bg-purple-50/50">
        <td class="px-4 py-4">
          <div class="flex items-center gap-2">
            <span class="font-medium text-purple-700">Novembro/2026</span>
            <span class="px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">P</span>
          </div>
        </td>
        <td class="px-4 py-4 text-right text-purple-700">R$ 38.000,00</td>
        <td class="px-4 py-4 text-right text-purple-700">R$ 32.000,00</td>
        <td class="px-4 py-4 text-right text-purple-700 font-medium">R$ 6.000,00</td>
        <td class="px-4 py-4 text-right text-purple-700 font-bold">R$ 125.000,00</td>
      </tr>
      
      <!-- Total -->
      <tr class="bg-[#3e5653] text-white">
        <td class="px-4 py-4 font-bold">TOTAL / MÉDIA</td>
        <td class="px-4 py-4 text-right font-bold text-green-300">R$ 450.000,00</td>
        <td class="px-4 py-4 text-right font-bold text-red-300">R$ 320.000,00</td>
        <td class="px-4 py-4 text-right font-bold text-blue-300">R$ 130.000,00</td>
        <td class="px-4 py-4 text-right font-bold">─</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## 3. Regras de Negócio

| Código | Descrição | Severidade |
|--------|-----------|------------|
| **RN-FLX-001** | Saldo Mês = Entradas - Saídas | Alta |
| **RN-FLX-002** | Saldo Acumulado = Soma dos saldos mensais | Alta |
| **RN-FLX-003** | Projeções baseadas em média dos últimos 3 meses | Média |
| **RN-FLX-004** | Realizado = transações conciliadas | Alta |
| **RN-FLX-005** | Projetado = transações agendadas futuras | Média |
| **RN-FLX-006** | Alerta quando saldo acumulado < 0 | Alta |

---

## 4. Checklist

- [ ] Gráfico combinado (barras + linha)
- [ ] Filtro por período
- [ ] Filtro por conta
- [ ] Toggle Realizado/Projetado
- [ ] Tabela com indicadores visuais
- [ ] Exportação PDF/Excel
- [ ] Alerta de saldo negativo
- [ ] Legenda de projeção

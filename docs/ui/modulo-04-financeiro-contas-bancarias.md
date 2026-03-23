# Módulo 04: Financeiro - Gestão de Contas Bancárias

## Metadados

| Atributo | Valor |
|----------|-------|
| **Módulo** | Financeiro |
| **Submódulo** | Gestão de Contas Bancárias |
| **Código** | MOD-FIN-CTA-001 |
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
| `--bg-card` | `#ffffff` | Fundo de cards |
| `--btn-primary` | `#3e5653` | Botões primários |
| `--accent` | `#86cb92` | Destaques |
| `--bank-orange` | `#f97316` | Itaú branding |
| `--bank-red` | `#dc2626` | Bradesco branding |
| `--bank-blue` | `#2563eb` | Caixa branding |
| `--status-active` | `#22c55e` | Conta ativa |
| `--status-inactive` | `#ef4444` | Conta inativa |
| `--text-primary` | `#1f2937` | Texto principal |
| `--text-secondary` | `#627271` | Texto secundário |

---

## 2. Tela: Gestão de Contas Bancárias (/financeiro/contas)

### 2.1 Estrutura do Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar #1f2937]                                                                   │
│ ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] Contas Bancárias                      [+ Nova Conta]                   │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Cards de Resumo]                                                               │ │
│ │ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────┐ │ │
│ │ │ [🏦]             │ │ [💰]             │ │ [📊]             │ │ [🔄]         │ │ │
│ │ │ 5                │ │ R$ 125.000       │ │ R$ 25.000        │ │ R$ 50.000    │ │ │
│ │ │ Contas Ativas    │ │ Saldo Total      │ │ Média por Conta  │ │ Mov. do Mês  │ │ │
│ │ └──────────────────┘ └──────────────────┘ └──────────────────┘ └──────────────┘ │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Lista de Contas]                                                               │ │
│ │                                                                                 │ │
│ │ ┌─────────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │                                                                             │ │ │
│ │ │  ┌──────────┐                                                               │ │ │
│ │ │  │ 🏦 Itaú  │  Conta Corrente                                              │ │ │
│ │ │  │          │  Ag: 1234 | CC: 56789-0                                     │ │ │
│ │ │  └──────────┘                                                               │ │ │
│ │ │                                                                             │ │ │
│ │ │  ┌───────────────────────────────────────────────────────────────────────┐ │ │ │
│ │ │  │ SALDO ATUAL                                                           │ │ │ │
│ │ │  │                                                                       │ │ │ │
│ │ │  │                  R$ 45.230,00                                         │ │ │ │
│ │ │  │                                                                       │ │ │ │
│ │ │  │  [Histórico]                                [Transferir] [Extrato]    │ │ │ │
│ │ │  └───────────────────────────────────────────────────────────────────────┘ │ │ │
│ │ │                                                                             │ │ │
│ │ │  ┌────────────────────────────────────────────────────────────────────────┐│ │ │
│ │ │  │ MOVIMENTAÇÃO DO MÊS                                                  ││ │ │
│ │ │  │                                                                       ││ │ │
│ │ │  │  Entradas: R$ 15.000,00  ████████████████████                        ││ │ │
│ │ │  │  Saídas:   R$  8.500,00  ████████████                                ││ │ │
│ │ │  │  Saldo:    +R$  6.500,00                                              ││ │ │
│ │ │  │                                                                       ││ │ │
│ │ │  │  ─────|────────|────────|────────|────────|───────                    ││ │ │
│ │ │  │  01    05      10       15       20       25       30                 ││ │ │
│ │ │  │       [Mini gráfico de linha do saldo ao longo do mês]                ││ │ │
│ │ │  └────────────────────────────────────────────────────────────────────────┘│ │ │
│ │ │                                                                             │ │ │
│ │ │  [Ativa 🟢]                                              [✏️] [⚙️] [🗑]    │ │ │
│ │ │                                                                             │ │ │
│ │ └─────────────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                                 │ │
│ │ ┌─────────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │  ┌──────────┐                                                               │ │ │
│ │ │  │ 🏦 Brad. │  Conta Poupança                                               │ │ │
│ │ │  │          │  Ag: 5678 | CC: 12345-6                                      │ │ │
│ │ │  └──────────┘                                                               │ │ │
│ │ │                                                                             │ │ │
│ │ │  ┌───────────────────────────────────────────────────────────────────────┐ │ │ │
│ │ │  │ R$ 32.450,00                                                          │ │ │ │
│ │ │  └───────────────────────────────────────────────────────────────────────┘ │ │ │
│ │ │  ...                                                                        │ │ │
│ │ └─────────────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                                 │ │
│ │ ┌─────────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │  🏦 Caixa Econômica - Conta Salário                                         │ │ │
│ │ │  R$ 15.000,00                                                               │ │ │
│ │ └─────────────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                                 │ │
│ └─────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Componentes

#### 2.2.1 Header da Página

```html
<header class="bg-white border-b border-gray-200 px-6 py-4">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-[#1f2937]">Contas Bancárias</h1>
      <p class="text-sm text-[#627271]">Gerencie suas contas e acompanhe saldos</p>
    </div>
    <button class="flex items-center gap-2 px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors">
      <Plus class="w-4 h-4" />
      Nova Conta
    </button>
  </div>
</header>
```

#### 2.2.2 Cards de Resumo

```html
<div class="grid grid-cols-1 md:grid-cols-4 gap-4 px-6 py-4">
  <!-- Contas Ativas -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-[#627271] mb-1">Contas Ativas</p>
        <h3 class="text-2xl font-bold text-[#1f2937]">5</h3>
      </div>
      <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
        <Landmark class="w-6 h-6 text-blue-600" />
      </div>
    </div>
  </div>
  
  <!-- Saldo Total -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-[#627271] mb-1">Saldo Total</p>
        <h3 class="text-2xl font-bold text-[#86cb92]">R$ 125.000,00</h3>
      </div>
      <div class="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
        <Wallet class="w-6 h-6 text-green-600" />
      </div>
    </div>
  </div>
  
  <!-- Média -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-[#627271] mb-1">Média por Conta</p>
        <h3 class="text-2xl font-bold text-[#3e5653]">R$ 25.000,00</h3>
      </div>
      <div class="w-12 h-12 rounded-xl bg-[#3e5653]/20 flex items-center justify-center">
        <PieChart class="w-6 h-6 text-[#3e5653]" />
      </div>
    </div>
  </div>
  
  <!-- Movimentação -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-[#627271] mb-1">Mov. do Mês</p>
        <h3 class="text-2xl font-bold text-[#1f2937]">R$ 50.000,00</h3>
        <p class="text-xs text-[#86cb92] mt-2">+15% vs mês anterior</p>
      </div>
      <div class="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
        <Activity class="w-6 h-6 text-orange-600" />
      </div>
    </div>
  </div>
</div>
```

#### 2.2.3 Card de Conta Bancária (Detalhado)

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mx-6 mb-4">
  <!-- Header -->
  <div class="flex items-start justify-between p-6 border-b border-gray-200">
    <div class="flex items-center gap-4">
      <!-- Logo/Ícone do Banco -->
      <div class="w-16 h-16 rounded-xl bg-orange-500 flex items-center justify-center">
        <span class="text-white font-bold text-lg">Itaú</span>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold text-[#1f2937]">Conta Corrente</h3>
        <p class="text-sm text-[#627271]">Ag: 1234 | CC: 56789-0</p>
        <div class="flex items-center gap-2 mt-1">
          <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
            <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            Ativa
          </span>
          <span class="text-xs text-[#627271]">• Principal</span>
        </div>
      </div>
    </div>
    
    <div class="flex items-center gap-2">
      <button class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
        <History class="w-5 h-5" />
      </button>
      <button class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
        <Edit class="w-5 h-5" />
      </button>
      <button class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
        <Trash2 class="w-5 h-5" />
      </button>
    </div>
  </div>
  
  <!-- Saldo -->
  <div class="p-6 bg-gradient-to-r from-orange-50 to-transparent">
    <p class="text-sm text-[#627271] mb-1">Saldo Atual</p>
    <div class="flex items-baseline gap-2">
      <h2 class="text-4xl font-bold text-[#1f2937]">R$ 45.230,00</h2>
      <span class="text-sm text-[#86cb92] flex items-center gap-1">
        <TrendingUp class="w-4 h-4" /
        +12% este mês
      </span>
    </div>
    
    <div class="flex items-center gap-3 mt-4">
      <button class="flex items-center gap-2 px-4 py-2 bg-[#3e5653] text-white rounded-lg text-sm">
        <ArrowLeftRight class="w-4 h-4" />
        Transferir
      </button>
      <button class="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">
        <FileText class="w-4 h-4" />
        Extrato
      </button>
      <button class="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">
        <BarChart3 class="w-4 h-4" />
        Relatórios
      </button>
    </div>
  </div>
  
  <!-- Movimentação do Mês -->
  <div class="p-6 border-t border-gray-200">
    <h4 class="text-sm font-medium text-[#1f2937] mb-4">Movimentação do Mês</h4>
    
    <div class="grid grid-cols-3 gap-4 mb-4">
      <div>
        <p class="text-xs text-[#627271]">Entradas</p>
        <p class="text-lg font-semibold text-[#86cb92]">R$ 15.000,00</p>
      </div>
      <div>
        <p class="text-xs text-[#627271]">Saídas</p>
        <p class="text-lg font-semibold text-red-600">R$ 8.500,00</p>
      </div>
      <div>
        <p class="text-xs text-[#627271]">Saldo</p>
        <p class="text-lg font-semibold text-[#3e5653]">+R$ 6.500,00</p>
      </div>
    </div>
    
    <!-- Mini Gráfico -->
    <div class="h-24 flex items-end gap-1">
      <div class="flex-1 bg-[#86cb92]/30 rounded-t" style="height: 40%"></div>
      <div class="flex-1 bg-[#86cb92]/40 rounded-t" style="height: 60%"></div>
      <div class="flex-1 bg-[#86cb92]/50 rounded-t" style="height: 45%"></div>
      <div class="flex-1 bg-[#86cb92]/60 rounded-t" style="height: 80%"></div>
      <div class="flex-1 bg-[#86cb92]/70 rounded-t" style="height: 65%"></div>
      <div class="flex-1 bg-[#86cb92]/80 rounded-t" style="height: 90%"></div>
      <div class="flex-1 bg-[#86cb92] rounded-t" style="height: 100%"></div>
      <div class="flex-1 bg-[#86cb92]/90 rounded-t" style="height: 85%"></div>
    </div>
    <div class="flex justify-between mt-2 text-xs text-[#627271]">
      <span>01</span>
      <span>05</span>
      <span>10</span>
      <span>15</span>
      <span>20</span>
      <span>25</span>
      <span>30</span>
    </div>
  </div>
</div>
```

#### 2.2.4 Card de Conta (Compacto)

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all">
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="w-12 h-12 rounded-lg bg-red-600 flex items-center justify-center">
        <span class="text-white font-bold text-sm">Brad.</span>
      </div>
      <div>
        <p class="font-medium text-[#1f2937]">Conta Poupança</p>
        <p class="text-xs text-[#627271]">Ag: 5678 | CC: 12345-6</p>
      </div>
    </div>
    <div class="text-right">
      <p class="text-xl font-bold text-[#1f2937]">R$ 32.450,00</p>
      <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
        <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
        Ativa
      </span>
    </div>
  </div>
</div>
```

---

## 3. Modal: Nova Conta Bancária

```html
<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div class="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-[#1f2937]">Nova Conta Bancária</h3>
      <button class="text-gray-400 hover:text-gray-600">
        <X class="w-5 h-5" />
      </button>
    </div>
    
    <form class="p-6 space-y-5">
      <!-- Banco -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">
          Banco <span class="text-red-500">*</span>
        </label>
        <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]">
          <option value="">Selecione o banco...</option>
          <option value="341">🏦 Itaú (341)</option>
          <option value="237">🏦 Bradesco (237)</option>
          <option value="104">🏦 Caixa Econômica (104)</option>
          <option value="001">🏦 Banco do Brasil (001)>
          <option value="033">🏦 Santander (033)</option>
          <option value="other">🏦 Outro...</option>
        </select>
      </div>
      
      <!-- Tipo e Apelido -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-[#1f2937] mb-1">
            Tipo <span class="text-red-500">*</span>
          </label>
          <select class="w-full px-3 py-2 border border-gray-300 rounded-lg">
            <option value="corrente">Conta Corrente</option>
            <option value="poupanca">Conta Poupança</option>
            <option value="salario">Conta Salário</option>
            <option value="investimento">Investimento</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-[#1f2937] mb-1">Apelido</label>
          <input 
            type="text" 
            placeholder="Ex: Conta Principal"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
      
      <!-- Agência e Conta -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-[#1f2937] mb-1">
            Agência <span class="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            placeholder="0000"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-[#1f2937] mb-1">
            Conta <span class="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            placeholder="00000-0"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
      
      <!-- Saldo Inicial -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">Saldo Inicial</label>
        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
          <input 
            type="text" 
            placeholder="0,00"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
      
      <!-- Opções -->
      <div class="space-y-2">
        <label class="flex items-center gap-2">
          <input type="checkbox" checked class="w-4 h-4 text-[#3e5653] rounded" />
          <span class="text-sm text-[#1f2937]">Conta ativa</span>
        </label>
        <label class="flex items-center gap-2">
          <input type="checkbox" class="w-4 h-4 text-[#3e5653] rounded" />
          <span class="text-sm text-[#1f2937]">Definir como conta principal</span>
        </label>
        <label class="flex items-center gap-2">
          <input type="checkbox" checked class="w-4 h-4 text-[#3e5653] rounded" />
          <span class="text-sm text-[#1f2937]">Incluir no fluxo de caixa</span>
        </label>
      </div>
    </form>
    
    <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
      <button class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
        Cancelar
      </button>
      <button class="px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937]">
        Salvar Conta
      </button>
    </div>
  </div>
</div>
```

---

## 4. Regras de Negócio

| Código | Descrição | Severidade |
|--------|-----------|------------|
| **RN-CTA-001** | Uma conta deve ser definida como principal | Média |
| **RN-CTA-002** | Contas inativas não aparecem em transações | Média |
| **RN-CTA-003** | Apenas uma conta principal por empresa | Alta |
| **RN-CTA-004** | Contas com saldo/saldo a usar não podem ser excluídas | Alta |
| **RN-CTA-005** | Código do banco validado conforme Febraban | Média |

---

## 5. Checklist

- [ ] Listagem de contas com detalhes
- [ ] Cards de resumo com saldo total
- [ ] Visualização de saldo por conta
- [ ] Gráfico de movimentação
- [ ] CRUD completo de contas
- [ ] Definir conta principal
- [ ] Ativar/inativar conta
- [ ] Validação de código bancário
- [ ] Estados: loading, empty, error
- [ ] Integração com extrato bancário

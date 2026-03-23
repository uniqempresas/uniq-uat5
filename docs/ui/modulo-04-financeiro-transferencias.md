# Módulo 04: Financeiro - Transferência entre Contas

## Metadados

| Atributo | Valor |
|----------|-------|
| **Módulo** | Financeiro |
| **Submódulo** | Transferências |
| **Código** | MOD-FIN-TRF-001 |
| **Versão** | 1.0.0 |
| **Status** | Especificação |
| **Responsável** | Frontend Team |
| **Última Atualização** | 2026-03-12 |
| **Dependências** | MOD-FIN-001, MOD-FIN-CTA-001 |

---

## 1. Design System

### 1.1 Paleta de Cores

| Token | Valor HEX | Uso |
|-------|-----------|-----|
| `--bg-primary` | `#efefef` | Fundo principal |
| `--bg-card` | `#ffffff` | Fundo de cards e modais |
| `--btn-primary` | `#3e5653` | Botões primários |
| `--accent` | `#86cb92` | Destaques positivos |
| `--transfer-color` | `#3b82f6` | Cor temática de transferência |
| `--text-primary` | `#1f2937` | Texto principal |
| `--text-secondary` | `#627271` | Texto secundário |
| `--border` | `#e5e7eb` | Bordas e divisores |
| `--status-completed` | `#22c55e` | Transferência concluída |
| `--status-pending` | `#f59e0b` | Transferência agendada |
| `--status-cancelled` | `#ef4444` | Transferência cancelada |

### 1.2 Tipografia

| Elemento | Fonte | Tamanho | Peso | Cor |
|----------|-------|---------|------|-----|
| Título Página | Poppins | 24px (text-2xl) | 700 | `#1f2937` |
| Card Valor | Poppins | 20px (text-xl) | 700 | `#1f2937` |
| Label | Poppins | 12px (text-xs) | 500 | `#627271` |
| Valor Destaque | Poppins | 28px (text-3xl) | 700 | `#3b82f6` |

---

## 2. Tela: Transferências (/financeiro/transferencias)

### 2.1 Estrutura do Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar #1f2937]                                                                   │
│ ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] Transferências entre Contas            [+ Nova Transferência]          │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Cards de Resumo]                                                               │ │
│ │ ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐           │ │
│ │ │ [↔️]               │ │ [📅]               │ │ [✅]               │           │ │
│ │ │ R$ 25.000,00       │ │ 5                  │ │ R$ 150.000,00      │           │ │
│ │ │ Transferido (Mês)  │ │ Agendadas          │ │ Total no Ano       │           │ │
│ │ └────────────────────┘ └────────────────────┘ └────────────────────┘           │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Filtros]                                                                       │ │
│ │ [Período ▼] [Conta Origem ▼] [Conta Destino ▼] [Status ▼] [🔍 Buscar]          │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Tabela de Transferências]                                                      │ │
│ │ ┌─────────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ Data       Origem → Destino         Valor       Status      Ações          │ │ │
│ │ │ ───────────────────────────────────────────────────────────────────────────│ │ │
│ │ │ 12/03/26   Itaú → Bradesco         R$ 5.000    [✓]         👁 ✏️ 🗑        │ │ │
│ │ │            Conta Corrente           │           Concluída                 │ │ │
│ │ │            Conta Poupança           │                                      │ │ │
│ │ │ ───────────────────────────────────────────────────────────────────────────│ │ │
│ │ │ 15/03/26   Bradesco → Itaú         R$ 3.000    [⏰]         👁 ✏️ 🗑        │ │ │
│ │ │            Poupança    Corrente     │           Agendada                  │ │ │
│ │ │ ───────────────────────────────────────────────────────────────────────────│ │ │
│ │ │ 10/03/26   Itaú → Carteira         R$ 1.500    [✗]         👁 ✏️ 🗑        │ │ │
│ │ │            Corrente    Digital      │           Cancelada                 │ │ │
│ │ └─────────────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                                 │ │
│ │ [← 1 2 3 ... 10 →]                                           Exibindo 1-10      │ │
│ └─────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Componentes

#### 2.2.1 Header da Página

```html
<header class="bg-white border-b border-gray-200 px-6 py-4">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-[#1f2937]">Transferências entre Contas</h1>
      <p class="text-sm text-[#627271]">Movimente valores entre suas contas bancárias</p>
    </div>
    <button class="flex items-center gap-2 px-4 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-blue-700 transition-colors">
      <ArrowLeftRight class="w-4 h-4" />
      Nova Transferência
    </button>
  </div>
</header>
```

#### 2.2.2 Cards de Resumo

```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 py-4">
  <!-- Transferido no Mês -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-[#627271] mb-1">Transferido (Mês)</p>
        <h3 class="text-2xl font-bold text-[#1f2937]">R$ 25.000,00</h3>
        <p class="text-xs text-[#627271] mt-2">12 transferências</p>
      </div>
      <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
        <ArrowLeftRight class="w-6 h-6 text-blue-600" />
      </div>
    </div>
  </div>
  
  <!-- Agendadas -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-[#627271] mb-1">Transferências Agendadas</p>
        <h3 class="text-2xl font-bold text-[#1f2937]">5</h3>
        <p class="text-xs text-yellow-600 mt-2">R$ 18.500,00</p>
      </div>
      <div class="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
        <Calendar class="w-6 h-6 text-yellow-600" />
      </div>
    </div>
  </div>
  
  <!-- Total no Ano -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-[#627271] mb-1">Total no Ano</p>
        <h3 class="text-2xl font-bold text-[#1f2937]">R$ 150.000,00</h3>
        <div class="flex items-center gap-1 mt-2">
          <TrendingUp class="w-3 h-3 text-[#86cb92]" />
          <span class="text-xs text-[#86cb92] font-medium">+15%</span>
          <span class="text-xs text-[#627271]">vs ano anterior</span>
        </div>
      </div>
      <div class="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
        <TrendingUp class="w-6 h-6 text-green-600" />
      </div>
    </div>
  </div>
</div>
```

#### 2.2.3 Barra de Filtros

```html
<div class="bg-white border-b border-gray-200 px-6 py-4">
  <div class="flex flex-wrap items-center gap-3">
    <!-- Período -->
    <div class="relative">
      <Calendar class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input 
        type="text" 
        placeholder="Período"
        class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-40 focus:ring-2 focus:ring-blue-500"
      />
    </div>
    
    <!-- Conta Origem -->
    <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
      <option value="">Todas as origens</option>
      <option value="1">Itaú - Corrente (***1234)</option>
      <option value="2">Bradesco - Poupança (***5678)</option>
      <option value="3">Carteira Digital</option>
    </select>
    
    <!-- Conta Destino -->
    <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
      <option value="">Todos os destinos</option>
      <option value="1">Itaú - Corrente (***1234)</option>
      <option value="2">Bradesco - Poupança (***5678)</option>
      <option value="3">Carteira Digital</option>
    </select>
    
    <!-- Status -->
    <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
      <option value="">Todos</option>
      <option value="completed">Concluídas</option>
      <option value="scheduled">Agendadas</option>
      <option value="cancelled">Canceladas</option>
    </select>
    
    <!-- Busca -->
    <div class="relative flex-1 max-w-xs">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input 
        type="text" 
        placeholder="Buscar transferência..."
        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
</div>
```

#### 2.2.4 Tabela de Transferências

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mx-6">
  <table class="w-full">
    <thead class="bg-gray-50 border-b border-gray-200">
      <tr>
        <th class="px-4 py-3 text-left text-xs font-medium text-[#627271] uppercase">Data</th>
        <th class="px-4 py-3 text-left text-xs font-medium text-[#627271] uppercase">Origem → Destino</th>
        <th class="px-4 py-3 text-right text-xs font-medium text-[#627271] uppercase">Valor</th>
        <th class="px-4 py-3 text-center text-xs font-medium text-[#627271] uppercase">Status</th>
        <th class="px-4 py-3 text-center text-xs font-medium text-[#627271] uppercase">Ações</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <!-- Transferência Concluída -->
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="px-4 py-4">
          <div class="text-sm font-medium text-[#1f2937]">12/03/2026</div>
          <div class="text-xs text-[#627271]">10:30</div>
        </td>
        <td class="px-4 py-4">
          <div class="flex items-center gap-3">
            <div class="flex flex-col items-center">
              <div class="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Building class="w-5 h-5 text-orange-600" />
              </div>
              <span class="text-xs text-[#627271] mt-1">Itaú</span>
            </div>
            <div class="flex flex-col items-center">
              <ArrowRight class="w-5 h-5 text-blue-500" />
              <span class="text-xs text-blue-500">Corrente</span>
            </div>
            <div class="flex flex-col items-center">
              <div class="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <Building class="w-5 h-5 text-red-600" />
              </div>
              <span class="text-xs text-[#627271] mt-1">Bradesco</span>
            </div>
          </div>
          <div class="text-xs text-[#627271] mt-1 ml-14">***1234 → ***5678</div>
        </td>
        <td class="px-4 py-4 text-right">
          <div class="text-sm font-semibold text-[#1f2937]">R$ 5.000,00</div>
        </td>
        <td class="px-4 py-4 text-center">
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle class="w-3 h-3" />
            Concluída
          </span>
        </td>
        <td class="px-4 py-4">
          <div class="flex items-center justify-center gap-1">
            <button class="p-1.5 text-gray-400 hover:text-[#3e5653] hover:bg-gray-100 rounded transition-colors" title="Ver">
              <Eye class="w-4 h-4" />
            </button>
            <button class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Editar">
              <Edit class="w-4 h-4" />
            </button>
            <button class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Cancelar">
              <X class="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
      
      <!-- Transferência Agendada -->
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="px-4 py-4">
          <div class="text-sm font-medium text-[#1f2937]">15/03/2026</div>
          <div class="text-xs text-yellow-600">Agendado</div>
        </td>
        <td class="px-4 py-4">
          <div class="flex items-center gap-3">
            <div class="flex flex-col items-center">
              <div class="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <Building class="w-5 h-5 text-red-600" />
              </div>
              <span class="text-xs text-[#627271] mt-1">Bradesco</span>
            </div>
            <div class="flex flex-col items-center">
              <ArrowRight class="w-5 h-5 text-blue-500" />
              <span class="text-xs text-blue-500">Poupança</span>
            </div>
            <div class="flex flex-col items-center">
              <div class="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Building class="w-5 h-5 text-orange-600" />
              </div>
              <span class="text-xs text-[#627271] mt-1">Itaú</span>
            </div>
          </div>
        </td>
        <td class="px-4 py-4 text-right">
          <div class="text-sm font-semibold text-[#1f2937]">R$ 3.000,00</div>
        </td>
        <td class="px-4 py-4 text-center">
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <Clock class="w-3 h-3" />
            Agendada
          </span>
        </td>
        <td class="px-4 py-4">
          <div class="flex items-center justify-center gap-1">
            <button class="p-1.5 text-gray-400 hover:text-[#3e5653] hover:bg-gray-100 rounded">
              <Eye class="w-4 h-4" />
            </button>
            <button class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
              <Edit class="w-4 h-4" />
            </button>
            <button class="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded" title="Cancelar">
              <X class="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## 3. Modal: Nova Transferência

### 3.1 Estrutura do Modal

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Nova Transferência                                                [X]        │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Valor da Transferência *                                                    │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ R$ 0,00                                                              │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Data da Transferência *                                                     │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ 📅 12/03/2026                                                        │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│  ☑ Agendar para data futura                                                  │
│                                                                              │
│  Conta de Origem *                    Conta de Destino *                     │
│  ┌──────────────────────────┐        ┌──────────────────────────┐           │
│  │ 🏦 Selecione...       ▼  │   →    │ 🏦 Selecione...       ▼  │           │
│  └──────────────────────────┘        └──────────────────────────┘           │
│                                                                              │
│  [Preview das contas selecionadas]                                           │
│  ┌───────────────────┐      ┌───────────────────┐                           │
│  │ Itaú Corrente     │  →   │ Bradesco Poupança │                           │
│  │ R$ 15.430,00      │      │ R$ 8.200,00       │                           │
│  └───────────────────┘      └───────────────────┘                           │
│                                                                              │
│  Categoria (opcional)                                                        │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Transferência entre contas                                      ▼    │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Descrição (opcional)                                                        │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Transferência mensal para reserva de emergência...                   │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Anexar Comprovante (opcional)                                               │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ [📎] Arraste ou clique para anexar o comprovante                     │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│                                     [Cancelar]  [Confirmar Transferência]    │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Componente do Modal

```html
<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div class="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
          <ArrowLeftRight class="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-[#1f2937]">Nova Transferência</h3>
          <p class="text-sm text-[#627271]">Movimente valores entre suas contas</p>
        </div>
      </div>
      <button class="text-gray-400 hover:text-gray-600">
        <X class="w-5 h-5" />
      </button>
    </div>
    
    <!-- Form -->
    <form class="p-6 space-y-5">
      <!-- Valor -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">
          Valor da Transferência <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">R$</span>
          <input 
            type="text" 
            placeholder="0,00"
            class="w-full pl-10 pr-4 py-3 text-2xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <!-- Data e Agendamento -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-[#1f2937] mb-1">
            Data da Transferência <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <Calendar class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="date" 
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div class="flex items-end">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <span class="text-sm text-[#1f2937]">Agendar para data futura</span>
          </label>
        </div>
      </div>
      
      <!-- Contas Origem e Destino -->
      <div class="grid grid-cols-[1fr,auto,1fr] gap-4 items-start">
        <!-- Origem -->
        <div>
          <label class="block text-sm font-medium text-[#1f2937] mb-1">
            Conta de Origem <span class="text-red-500">*</span>
          </label>
          <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="">Selecione...</option>
            <option value="1">🏦 Itaú - Corrente (***1234)</option>
            <option value="2">🏦 Bradesco - Poupança (***5678)</option>
            <option value="3">💵 Carteira Digital</option>
          </select>
          <p class="text-xs text-[#627271] mt-1">Saldo: R$ 15.430,00</p>
        </div>
        
        <!-- Seta -->
        <div class="flex items-center justify-center pt-7">
          <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <ArrowRight class="w-5 h-5 text-blue-600" />
          </div>
        </div>
        
        <!-- Destino -->
        <div>
          <label class="block text-sm font-medium text-[#1f2937] mb-1">
            Conta de Destino <span class="text-red-500">*</span>
          </label>
          <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="">Selecione...</option>
            <option value="1">🏦 Itaú - Corrente (***1234)</option>
            <option value="2">🏦 Bradesco - Poupança (***5678)</option>
            <option value="3">💵 Carteira Digital</option>
          </select>
          <p class="text-xs text-[#627271] mt-1">Saldo: R$ 8.200,00</p>
        </div>
      </div>
      
      <!-- Preview da Transferência -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p class="text-sm font-medium text-blue-900 mb-3">Resumo da Transferência</p>
        <div class="flex items-center justify-between">
          <div class="text-center">
            <div class="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mx-auto mb-2">
              <Building class="w-6 h-6 text-orange-600" />
            </div>
            <p class="text-sm font-medium text-[#1f2937]">Itaú</p>
            <p class="text-xs text-[#627271]">Corrente ***1234</p>
            <p class="text-sm font-semibold text-[#1f2937] mt-1">R$ 15.430,00</p>
            <p class="text-xs text-red-600">- R$ 5.000,00</p>
          </div>
          
          <div class="flex flex-col items-center">
            <ArrowRight class="w-8 h-8 text-blue-500" />
            <p class="text-lg font-bold text-blue-600 mt-1">R$ 5.000,00</p>
          </div>
          
          <div class="text-center">
            <div class="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mx-auto mb-2">
              <Building class="w-6 h-6 text-red-600" />
            </div>
            <p class="text-sm font-medium text-[#1f2937]">Bradesco</p>
            <p class="text-xs text-[#627271]">Poupança ***5678</p>
            <p class="text-sm font-semibold text-[#1f2937] mt-1">R$ 8.200,00</p>
            <p class="text-xs text-[#86cb92]">+ R$ 5.000,00</p>
          </div>
        </div>
      </div>
      
      <!-- Categoria -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">
          Categoria <span class="text-gray-400">(opcional)</span>
        </label>
        <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
          <option value="">Transferência entre contas</option>
          <option value="reserva">Reserva de Emergência</option>
          <option value="investimento">Investimento</option>
          <option value="outra">Outra categoria</option>
        </select>
      </div>
      
      <!-- Descrição -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">
          Descrição <span class="text-gray-400">(opcional)</span>
        </label>
        <textarea 
          rows="2"
          placeholder="Adicione uma observação..."
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
        ></textarea>
      </div>
      
      <!-- Anexo -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">
          Anexar Comprovante <span class="text-gray-400">(opcional)</span>
        </label>
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer">
          <Upload class="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p class="text-sm text-[#627271]">Arraste ou clique para anexar</p>
          <p class="text-xs text-gray-400 mt-1">PDF, JPG ou PNG até 5MB</p>
        </div>
      </div>
    </form>
    
    <!-- Footer -->
    <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 sticky bottom-0 bg-white">
      <button class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
        Cancelar
      </button>
      <button class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
        Confirmar Transferência
      </button>
    </div>
  </div>
</div>
```

---

## 4. Formulários

### 4.1 Tabela de Campos

| Campo | Tipo | Obrigatório | Validação | Placeholder |
|-------|------|-------------|-----------|-------------|
| Valor | Currency | Sim | > 0, <= saldo origem | 0,00 |
| Data | Date | Sim | Data válida | Selecione |
| Agendar | Checkbox | Não | Boolean | - |
| Conta Origem | Select | Sim | Conta válida, saldo suficiente | Selecione... |
| Conta Destino | Select | Sim | Diferente da origem | Selecione... |
| Categoria | Select | Não | Categoria existente | Transferência entre contas |
| Descrição | Textarea | Não | Max 500 caracteres | Observação... |
| Anexo | File | Não | PDF/JPG/PNG, max 5MB | - |

### 4.2 Validações

```typescript
const schema = z.object({
  valor: z.number()
    .positive('Valor deve ser maior que zero')
    .refine(val => val <= saldoOrigem, {
      message: 'Saldo insuficiente na conta de origem'
    }),
  
  data: z.date({
    required_error: 'Selecione a data da transferência'
  }),
  
  agendar: z.boolean().default(false),
  
  contaOrigemId: z.string()
    .uuid('Selecione uma conta de origem válida'),
  
  contaDestinoId: z.string()
    .uuid('Selecione uma conta de destino válida')
    .refine(val => val !== contaOrigemId, {
      message: 'Conta de destino deve ser diferente da origem'
    }),
  
  categoriaId: z.string().uuid().optional(),
  
  descricao: z.string().max(500).optional(),
  
  anexo: z.instanceof(File)
    .refine(file => file.size <= 5 * 1024 * 1024, 'Arquivo deve ter no máximo 5MB')
    .refine(file => ['pdf', 'jpg', 'jpeg', 'png'].includes(file.extension), 'Formato inválido')
    .optional()
});
```

---

## 5. Estados

### 5.1 Estado Loading

```html
<div class="animate-pulse space-y-4 p-6">
  <!-- Skeleton Cards -->
  <div class="grid grid-cols-3 gap-4">
    <div class="h-24 bg-gray-200 rounded-xl"></div>
    <div class="h-24 bg-gray-200 rounded-xl"></div>
    <div class="h-24 bg-gray-200 rounded-xl"></div>
  </div>
  <!-- Skeleton Table -->
  <div class="h-64 bg-gray-200 rounded-xl"></div>
</div>
```

### 5.2 Estado Empty

```html
<div class="flex flex-col items-center justify-center py-16 text-center">
  <div class="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
    <ArrowLeftRight class="w-12 h-12 text-blue-500" />
  </div>
  <h3 class="text-lg font-semibold text-[#1f2937] mb-2">Nenhuma transferência realizada</h3>
  <p class="text-sm text-[#627271] mb-6 max-w-md">
    Realize sua primeira transferência entre contas para organizar melhor suas finanças.
  </p>
  <button class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
    <ArrowLeftRight class="w-5 h-5" />
    Nova Transferência
  </button>
</div>
```

### 5.3 Estado Error - Saldo Insuficiente

```html
<div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
  <div class="flex items-start gap-3">
    <AlertCircle class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
    <div>
      <p class="text-sm font-medium text-red-800">Saldo insuficiente</p>
      <p class="text-sm text-red-700 mt-1">
        A conta Itaú Corrente possui apenas <strong>R$ 3.500,00</strong> disponíveis.
      </p>
    </div>
  </div>
</div>
```

### 5.4 Estado Success

```html
<!-- Toast de sucesso -->
<div class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
  <CheckCircle class="w-5 h-5" />
  <div>
    <p class="font-medium">Transferência realizada!</p>
    <p class="text-sm text-green-100">R$ 5.000,00 transferidos com sucesso</p>
  </div>
</div>
```

---

## 6. Regras de Negócio

| Código | Descrição | Severidade |
|--------|-----------|------------|
| **RN-TRF-001** | Conta de origem e destino devem ser diferentes | Alta |
| **RN-TRF-002** | Valor deve ser maior que zero | Alta |
| **RN-TRF-003** | Conta de origem deve ter saldo suficiente | Alta |
| **RN-TRF-004** | Transferências agendadas podem ser canceladas | Média |
| **RN-TRF-005** | Transferências concluídas não podem ser editadas | Alta |
| **RN-TRF-006** | Data futura apenas se marcado como agendada | Média |
| **RN-TRF-007** | Limite de 10 agendamentos futuros por conta | Baixa |
| **RN-TRF-008** | Histórico mantido por 5 anos | Média |
| **RN-TRF-009** | Comprovante obrigatório para valores > R$ 10.000 | Média |

---

## 7. Checklist

### 7.1 Funcionalidades

- [ ] Listagem de transferências
- [ ] Filtros por período, conta e status
- [ ] Nova transferência
- [ ] Editar transferência agendada
- [ ] Cancelar transferência
- [ ] Visualizar detalhes
- [ ] Anexar comprovante
- [ ] Preview de saldos
- [ ] Validação de saldo insuficiente
- [ ] Agendamento para data futura

### 7.2 Validações

- [ ] Valor maior que zero
- [ ] Saldo suficiente na origem
- [ ] Contas diferentes
- [ ] Data válida
- [ ] Campos obrigatórios

### 7.3 Estados

- [ ] Loading inicial
- [ ] Empty state
- [ ] Error state
- [ ] Confirmação de cancelamento
- [ ] Toast de sucesso
- [ ] Validação de saldo

### 7.4 Acessibilidade

- [ ] Contraste adequado
- [ ] Navegação por teclado
- [ ] ARIA labels
- [ ] Focus states
- [ ] Mensagens de erro claras

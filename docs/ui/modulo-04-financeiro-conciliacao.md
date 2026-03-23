# Módulo 04: Financeiro - Conciliação Bancária

## Metadados

| Atributo | Valor |
|----------|-------|
| **Módulo** | Financeiro |
| **Submódulo** | Conciliação Bancária |
| **Código** | MOD-FIN-CON-001 |
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
| `--bg-card` | `#ffffff` | Fundo de cards |
| `--btn-primary` | `#3e5653` | Botões primários |
| `--accent` | `#86cb92` | Sucesso, conciliado |
| `--concil-pending` | `#f59e0b` | Pendente de conciliação |
| `--concil-matched` | `#22c55e` | Conciliado automaticamente |
| `--concil-manual` | `#3b82f6` | Conciliado manualmente |
| `--concil-divergent` | `#ef4444` | Divergente |
| `--text-primary` | `#1f2937` | Texto principal |
| `--text-secondary` | `#627271` | Texto secundário |

### 1.2 Ícones de Status

| Status | Ícone | Cor |
|--------|-------|-----|
| Pendente | Clock | `#f59e0b` |
| Conciliado Auto | Sparkles | `#22c55e` |
| Conciliado Manual | CheckCircle | `#3b82f6` |
| Divergente | AlertTriangle | `#ef4444` |
| Ignorado | EyeOff | `#627271` |

---

## 2. Tela: Conciliação Bancária (/financeiro/conciliacao)

### 2.1 Estrutura do Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar #1f2937]                                                                   │
│ ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] Conciliação Bancária                                                 │ │
│ │          Sincronize extratos bancários com seu sistema                        │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Cards de Resumo]                                                               │ │
│ │ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌─────────────┐ │ │
│ │ │ [📄]             │ │ [✨]             │ │ [✓]              │ │ [⚠️]        │ │ │
│ │ │ 156              │ │ 89               │ │ 45               │ │ 22          │ │ │
│ │ │ Transações       │ │ Auto             │ │ Manual           │ │ Divergentes │ │ │
│ │ │ Importadas       │ │ Conciliadas      │ │ Conciliadas      │ │             │ │ │
│ │ └──────────────────┘ └──────────────────┘ └──────────────────┘ └─────────────┘ │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Ações]                                                                         │ │
│ │ [Importar Extrato] [Conciliar Automático] [Exportar Relatório]                │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Filtros e Busca]                                                               │ │
│ │ [Conta: Todas ▼] [Período ▼] [Status: Pendentes ▼] [🔍 Buscar...]             │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Tabela de Conciliação]                                                         │ │
│ │ ┌─────────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ Data     Descrição Extrato          Valor    Tipo   Status   Ação/Match   │ │ │
│ │ │ ───────────────────────────────────────────────────────────────────────────│ │ │
│ │ │ 12/03    TRANSFRecebida123          5.000    Entrada [⚠️]    [Venda #1234]│ │ │
│ │ │          PIX Recebido                      Pendente        95% match     │ │ │
│ │ │ ───────────────────────────────────────────────────────────────────────────│ │ │
│ │ │ 12/03    PAGAMENTO Fornecedor XYZ   2.500    Saída   [✨]    [Compra #98] │ │ │
│ │ │          Boleto pago                       Auto OK        100% match     │ │ │
│ │ │ ───────────────────────────────────────────────────────────────────────────│ │ │
│ │ │ 11/03    TARIFA BANCARIA              12,50  Saída   [✓]    [Taxa Bancária]│ │ │
│ │ │          Tarifa mensal                     Manual          Categorizado   │ │ │
│ │ │ ───────────────────────────────────────────────────────────────────────────│ │ │
│ │ │ 10/03    TRANSF ENVIADA 456         3.000    Saída   [⚠️]    [??]         │ │ │
│ │ │          PIX Enviido                       Divergente      Não encontrado  │ │ │
│ │ └─────────────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                                 │ │
│ │ [Ações em Massa - ao selecionar]                                                │ │
│ │ [Conciliar Selecionados] [Ignorar] [Categorizar]          Selecionados: 3       │ │
│ └─────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Componentes

#### 2.2.1 Header da Página

```html
<header class="bg-white border-b border-gray-200 px-6 py-4">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-[#1f2937]">Conciliação Bancária</h1>
      <p class="text-sm text-[#627271]">Sincronize extratos bancários com seu sistema</p>
    </div>
    <div class="flex items-center gap-3">
      <button class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
        <History class="w-4 h-4" />
        Histórico
      </button>
      <button class="flex items-center gap-2 px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937]">
        <Settings class="w-4 h-4" />
        Configurar
      </button>
    </div>
  </div>
</header>
```

#### 2.2.2 Cards de Resumo

```html
<div class="grid grid-cols-1 md:grid-cols-4 gap-4 px-6 py-4">
  <!-- Transações Importadas -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-[#627271] mb-1">Transações Importadas</p>
        <h3 class="text-2xl font-bold text-[#1f2937]">156</h3>
        <p class="text-xs text-[#627271] mt-2">Período: 01-12/03/2026</p>
      </div>
      <div class="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
        <FileText class="w-6 h-6 text-gray-600" />
      </div>
    </div>
  </div>
  
  <!-- Auto Conciliadas -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-[#627271] mb-1">Auto Conciliadas</p>
        <h3 class="text-2xl font-bold text-[#86cb92]">89</h3>
        <p class="text-xs text-[#86cb92] mt-2">57% do total</p>
      </div>
      <div class="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
        <Sparkles class="w-6 h-6 text-green-600" />
      </div>
    </div>
  </div>
  
  <!-- Manual Conciliadas -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-[#627271] mb-1">Manual Conciliadas</p>
        <h3 class="text-2xl font-bold text-blue-600">45</h3>
        <p class="text-xs text-blue-600 mt-2">29% do total</p>
      </div>
      <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
        <CheckCircle class="w-6 h-6 text-blue-600" />
      </div>
    </div>
  </div>
  
  <!-- Divergentes -->
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm font-medium text-[#627271] mb-1">Pendentes</p>
        <h3 class="text-2xl font-bold text-yellow-600">22</h3>
        <p class="text-xs text-yellow-600 mt-2">14% do total</p>
      </div>
      <div class="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
        <AlertTriangle class="w-6 h-6 text-yellow-600" />
      </div>
    </div>
  </div>
</div>
```

#### 2.2.3 Ações Principais

```html
<div class="flex items-center gap-3 px-6 py-4 border-b border-gray-200">
  <button class="flex items-center gap-2 px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937]">
    <Upload class="w-4 h-4" />
    Importar Extrato
  </button>
  
  <button class="flex items-center gap-2 px-4 py-2 border border-[#86cb92] text-[#86cb92] rounded-lg hover:bg-green-50">
    <Sparkles class="w-4 h-4" />
    Conciliar Automático
  </button>
  
  <button class="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
    <Download class="w-4 h-4" />
    Exportar Relatório
  </button>
  
  <div class="ml-auto flex items-center gap-2">
    <span class="text-sm text-[#627271]">Última importação:</span>
    <span class="text-sm font-medium text-[#1f2937]">12/03/2026 14:30</span>
  </div>
</div>
```

#### 2.2.4 Barra de Filtros

```html
<div class="bg-white border-b border-gray-200 px-6 py-3">
  <div class="flex items-center gap-3">
    <!-- Conta -->
    <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#86cb92]">
      <option value="">Todas as contas</option>
      <option value="1">Itaú - Corrente (***1234)</option>
      <option value="2">Bradesco - Poupança (***5678)</option>
    </select>
    
    <!-- Período -->
    <div class="relative">
      <Calendar class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input 
        type="text" 
        placeholder="Período"
        class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-40"
      />
    </div>
    
    <!-- Status -->
    <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#86cb92]">
      <option value="pending">Pendentes</option>
      <option value="auto">Auto Conciliadas</option>
      <option value="manual">Manual Conciliadas</option>
      <option value="divergent">Divergentes</option>
      <option value="all">Todas</option>
    </select>
    
    <!-- Tipo -->
    <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#86cb92]">
      <option value="">Entradas e Saídas</option>
      <option value="credit">Apenas Entradas</option>
      <option value="debit">Apenas Saídas</option>
    </select>
    
    <!-- Busca -->
    <div class="relative flex-1 max-w-xs">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input 
        type="text" 
        placeholder="Buscar transação..."
        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
      />
    </div>
  </div>
</div>
```

#### 2.2.5 Tabela de Conciliação

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mx-6">
  <table class="w-full">
    <thead class="bg-gray-50 border-b border-gray-200">
      <tr>
        <th class="px-3 py-3 w-10">
          <input type="checkbox" class="rounded border-gray-300" />
        </th>
        <th class="px-4 py-3 text-left text-xs font-medium text-[#627271] uppercase">Data</th>
        <th class="px-4 py-3 text-left text-xs font-medium text-[#627271] uppercase">Descrição do Extrato</th>
        <th class="px-4 py-3 text-right text-xs font-medium text-[#627271] uppercase">Valor</th>
        <th class="px-4 py-3 text-center text-xs font-medium text-[#627271] uppercase">Tipo</th>
        <th class="px-4 py-3 text-center text-xs font-medium text-[#627271] uppercase">Status</th>
        <th class="px-4 py-3 text-left text-xs font-medium text-[#627271] uppercase">Match/Sugestão</th>
        <th class="px-4 py-3 text-center text-xs font-medium text-[#627271] uppercase">Ações</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <!-- Transação Pendente com Sugestão -->
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="px-3 py-4">
          <input type="checkbox" class="rounded border-gray-300" />
        </td>
        <td class="px-4 py-4">
          <div class="text-sm font-medium text-[#1f2937]">12/03/2026</div>
        </td>
        <td class="px-4 py-4">
          <div class="text-sm font-medium text-[#1f2937]">TRANSFRecebida123</div>
          <div class="text-xs text-[#627271]">PIX Recebido</div>
        </td>
        <td class="px-4 py-4 text-right">
          <div class="text-sm font-semibold text-[#86cb92]">+ R$ 5.000,00</div>
        </td>
        <td class="px-4 py-4 text-center">
          <span class="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
            <ArrowDownLeft class="w-3 h-3" />
            Entrada
          </span>
        </td>
        <td class="px-4 py-4 text-center">
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
            <Clock class="w-3 h-3" />
            Pendente
          </span>
        </td>
        <td class="px-4 py-4">
          <div class="bg-green-50 border border-green-200 rounded-lg p-2">
            <div class="flex items-center gap-2">
              <CheckCircle class="w-4 h-4 text-green-600" />
              <span class="text-sm font-medium text-green-800">Venda #1234</span>
            </div>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-xs text-green-600">95% match</span>
              <span class="text-xs text-gray-400">|</span>
              <span class="text-xs text-green-600">R$ 5.000,00</span>
            </div>
          </div>
        </td>
        <td class="px-4 py-4">
          <div class="flex items-center justify-center gap-1">
            <button class="px-3 py-1.5 bg-green-600 text-white text-xs rounded hover:bg-green-700">
              Confirmar
            </button>
            <button class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
              <Search class="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
      
      <!-- Transação Auto Conciliada -->
      <tr class="bg-green-50/30 hover:bg-green-50/50 transition-colors">
        <td class="px-3 py-4">
          <input type="checkbox" class="rounded border-gray-300" />
        </td>
        <td class="px-4 py-4">
          <div class="text-sm font-medium text-[#1f2937]">12/03/2026</div>
        </td>
        <td class="px-4 py-4">
          <div class="text-sm font-medium text-[#1f2937]">PAGAMENTO Fornecedor XYZ</div>
          <div class="text-xs text-[#627271]">Boleto pago</div>
        </td>
        <td class="px-4 py-4 text-right">
          <div class="text-sm font-semibold text-red-600">- R$ 2.500,00</div>
        </td>
        <td class="px-4 py-4 text-center">
          <span class="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
            <ArrowUpRight class="w-3 h-3" />
            Saída
          </span>
        </td>
        <td class="px-4 py-4 text-center">
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <Sparkles class="w-3 h-3" />
            Auto OK
          </span>
        </td>
        <td class="px-4 py-4">
          <div class="flex items-center gap-2">
            <CheckCircle class="w-4 h-4 text-green-600" />
            <span class="text-sm text-[#1f2937]">Compra #98</span>
            <span class="text-xs text-green-600">(100%)</span>
          </div>
        </td>
        <td class="px-4 py-4">
          <div class="flex items-center justify-center gap-1">
            <button class="p-1.5 text-gray-400 hover:text-[#3e5653] hover:bg-gray-100 rounded">
              <Eye class="w-4 h-4" />
            </button>
            <button class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
              <Edit class="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
      
      <!-- Transação Divergente -->
      <tr class="bg-red-50/30 hover:bg-red-50/50 transition-colors">
        <td class="px-3 py-4">
          <input type="checkbox" class="rounded border-gray-300" />
        </td>
        <td class="px-4 py-4">
          <div class="text-sm font-medium text-[#1f2937]">10/03/2026</div>
        </td>
        <td class="px-4 py-4">
          <div class="text-sm font-medium text-[#1f2937]">TRANSF ENVIADA 456</div>
          <div class="text-xs text-[#627271]">PIX Enviado</div>
        </td>
        <td class="px-4 py-4 text-right">
          <div class="text-sm font-semibold text-red-600">- R$ 3.000,00</div>
        </td>
        <td class="px-4 py-4 text-center">
          <span class="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
            <ArrowUpRight class="w-3 h-3" />
            Saída
          </span>
        </td>
        <td class="px-4 py-4 text-center">
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <AlertTriangle class="w-3 h-3" />
            Divergente
          </span>
        </td>
        <td class="px-4 py-4">
          <div class="text-sm text-red-600">Nenhum match encontrado</div>
          <button class="text-xs text-blue-600 hover:underline mt-1">
            + Criar manualmente
          </button>
        </td>
        <td class="px-4 py-4">
          <div class="flex items-center justify-center gap-1">
            <button class="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Criar Transação">
              <Plus class="w-4 h-4" />
            </button>
            <button class="p-1.5 text-gray-400 hover:text-[#3e5653] hover:bg-gray-100 rounded">
              <Search class="w-4 h-4" />
            </button>
            <button class="p-1.5 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded">
              <EyeOff class="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## 3. Modal: Importar Extrato

```html
<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div class="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-[#1f2937]">Importar Extrato Bancário</h3>
      <button class="text-gray-400 hover:text-gray-600">
        <X class="w-5 h-5" />
      </button>
    </div>
    
    <div class="p-6 space-y-5">
      <!-- Conta -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">
          Conta Bancária <span class="text-red-500">*</span>
        </label>
        <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]">
          <option value="">Selecione a conta...</option>
          <option value="1">Itaú - Corrente (***1234)</option>
          <option value="2">Bradesco - Poupança (***5678)</option>
        </select>
      </div>
      
      <!-- Upload -->
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-2">
          Arquivo do Extrato <span class="text-red-500">*</span>
        </label>
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#86cb92] transition-colors cursor-pointer">
          <Upload class="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p class="text-sm text-[#627271]">Arraste o arquivo OFX ou clique para selecionar</p>
          <p class="text-xs text-gray-400 mt-2">Formatos aceitos: OFX, CSV, XLSX</p>
        </div>
      </div>
      
      <!-- Configurações -->
      <div class="bg-gray-50 rounded-lg p-4 space-y-3">
        <p class="text-sm font-medium text-[#1f2937]">Opções de Importação</p>
        <label class="flex items-center gap-2">
          <input type="checkbox" checked class="w-4 h-4 text-[#3e5653] rounded" />
          <span class="text-sm text-[#1f2937]">Conciliar automaticamente quando possível</span>
        </label>
        <label class="flex items-center gap-2">
          <input type="checkbox" checked class="w-4 h-4 text-[#3e5653] rounded" />
          <span class="text-sm text-[#1f2937]">Ignorar transações já importadas</span>
        </label>
      </div>
    </div>
    
    <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
      <button class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
        Cancelar
      </button>
      <button class="px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937]">
        Importar Extrato
      </button>
    </div>
  </div>
</div>
```

---

## 4. Modal: Conciliação Manual

```html
<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div class="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
      <h3 class="text-lg font-semibold text-[#1f2937]">Conciliação Manual</h3>
      <button class="text-gray-400 hover:text-gray-600">
        <X class="w-5 h-5" />
      </button>
    </div>
    
    <div class="p-6">
      <!-- Dados do Extrato -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p class="text-sm font-medium text-blue-900 mb-3">Dados do Extrato</p>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-xs text-blue-700">Data</p>
            <p class="text-sm font-medium text-blue-900">12/03/2026</p>
          </div>
          <div>
            <p class="text-xs text-blue-700">Valor</p>
            <p class="text-sm font-medium text-[#86cb92]">R$ 5.000,00</p>
          </div>
          <div class="col-span-2">
            <p class="text-xs text-blue-700">Descrição</p>
            <p class="text-sm font-medium text-blue-900">TRANSFRecebida123 - PIX Recebido</p>
          </div>
        </div>
      </div>
      
      <!-- Sugestões -->
      <div class="mb-6">
        <p class="text-sm font-medium text-[#1f2937] mb-3">Sugestões de Match</p>
        <div class="space-y-2">
          <div class="flex items-center gap-4 p-3 border-2 border-green-500 bg-green-50 rounded-lg cursor-pointer">
            <div class="flex-shrink-0">
              <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle class="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-[#1f2937]">Venda #1234</p>
              <p class="text-xs text-[#627271]">Cliente: ABC Ltda • 12/03/2026</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-semibold text-[#86cb92]">R$ 5.000,00</p>
              <span class="text-xs text-green-600">95% match</span>
            </div>
          </div>
          
          <div class="flex items-center gap-4 p-3 border border-gray-200 hover:border-blue-300 rounded-lg cursor-pointer transition-colors">
            <div class="flex-shrink-0">
              <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <span class="text-sm text-gray-600">85%</span>
              </div>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-[#1f2937]">Recebimento #567</p>
              <p class="text-xs text-[#627271]">Cliente: XYZ Corp • 11/03/2026</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-semibold text-[#86cb92]">R$ 4.800,00</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Buscar Manual -->
      <div>
        <p class="text-sm font-medium text-[#1f2937] mb-3">Ou busque manualmente</p>
        <div class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar transação por código, cliente ou valor..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]"
          />
        </div>
      </div>
    </div>
    
    <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 sticky bottom-0 bg-white">
      <button class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
        Ignorar Transação
      </button>
      <button class="px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937]">
        Confirmar Conciliação
      </button>
    </div>
  </div>
</div>
```

---

## 5. Formulários

### 5.1 Tabela de Campos - Importação

| Campo | Tipo | Obrigatório | Validação | Descrição |
|-------|------|-------------|-----------|-----------|
| Conta | Select | Sim | Conta ativa | Conta do extrato |
| Arquivo | File | Sim | OFX, CSV, XLSX | Arquivo do extrato |
| Auto Conciliar | Checkbox | Não | Boolean | Conciliar automaticamente |
| Ignorar Duplicados | Checkbox | Não | Boolean | Pular transações existentes |

### 5.2 Validações

```typescript
const importSchema = z.object({
  contaId: z.string().uuid('Selecione uma conta válida'),
  
  arquivo: z.instanceof(File)
    .refine(file => {
      const validTypes = ['.ofx', '.csv', '.xlsx'];
      return validTypes.some(type => file.name.toLowerCase().endsWith(type));
    }, 'Formato deve ser OFX, CSV ou XLSX')
    .refine(file => file.size <= 10 * 1024 * 1024, 'Arquivo deve ter no máximo 10MB'),
  
  autoConciliar: z.boolean().default(true),
  ignorarDuplicados: z.boolean().default(true)
});
```

---

## 6. Regras de Negócio

| Código | Descrição | Severidade |
|--------|-----------|------------|
| **RN-CON-001** | Match automático quando valor, data e descrição coincidem ≥90% | Alta |
| **RN-CON-002** | Match sugerido quando coincidência entre 70-89% | Média |
| **RN-CON-003** | Transações duplicadas não devem ser importadas | Alta |
| **RN-CON-004** | Extratos mantidos por 7 anos | Alta |
| **RN-CON-005** | Conciliação manual gera log de auditoria | Média |
| **RN-CON-006** | Apenas usuários com permissão FIN-CONC podem conciliar | Alta |
| **RN-CON-007** | Transações ignoradas ficam marcadas mas não aparecem em relatórios | Média |
| **RN-CON-008** | Divergências > R$ 1.000 geram alerta | Média |

---

## 7. Checklist

### 7.1 Funcionalidades

- [ ] Importar extrato (OFX, CSV, XLSX)
- [ ] Preview antes de importar
- [ ] Conciliação automática
- [ ] Sugestões de match
- [ ] Conciliação manual
- [ ] Ignorar transações
- [ ] Buscar transações no sistema
- [ ] Exportar relatório de conciliação
- [ ] Histórico de importações
- [ ] Ações em massa

### 7.2 Estados

- [ ] Loading de importação
- [ ] Preview de transações
- [ ] Empty (sem extratos)
- [ ] Error na importação
- [ ] Sucesso de conciliação
- [ ] Confirmação de ignorar

### 7.3 Métricas

- [ ] Total importado
- [ ] Taxa de conciliação automática
- [ ] Transações pendentes
- [ ] Divergências
- [ ] Tempo médio de conciliação

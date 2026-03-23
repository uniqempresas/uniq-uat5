# Módulo 04: Financeiro - Nova Receita (Fluxo Completo)

## Metadados

| Atributo | Valor |
|----------|-------|
| **Módulo** | Financeiro |
| **Submódulo** | Nova Receita - Fluxo Completo |
| **Código** | MOD-FIN-REC-FLOW-001 |
| **Versão** | 1.0.0 |
| **Status** | Especificação |
| **Responsável** | Frontend Team |
| **Última Atualização** | 2026-03-12 |
| **Dependências** | MOD-FIN-001, MOD-FIN-CAT-001, MOD-03-CRM |

---

## 1. Design System

### 1.1 Paleta de Cores

| Token | Valor HEX | Uso |
|-------|-----------|-----|
| `--bg-primary` | `#efefef` | Fundo principal |
| `--receita-primary` | `#86cb92` | Cor temática receita |
| `--receita-light` | `#dcfce7` | Backgrounds receita |
| `--receita-dark` | `#166534` | Textos destacados |
| `--text-primary` | `#1f2937` | Texto principal |
| `--text-secondary` | `#627271` | Texto secundário |
| `--status-pending` | `#f59e0b` | Pendente |
| `--status-received` | `#22c55e` | Recebido |
| `--status-overdue` | `#ef4444` | Atrasado |

---

## 2. Fluxo Completo: Nova Receita

### 2.1 Estrutura do Fluxo (Stepper)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar #1f2937]                                                                   │
│ ┌─────────────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] Nova Receita                                                           │ │
│ │          Registre uma nova entrada financeira                                   │ │
│ ├─────────────────────────────────────────────────────────────────────────────────┤ │
│ │                                                                                 │ │
│ │  [Stepper: 1 → 2 → 3 → 4]                                                       │ │
│ │  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐                                 │ │
│ │  │   1    │──│   2    │──│   3    │──│   4    │                                 │ │
│ │  │ Dados  │  │Cliente │  │Parcelas│  │Review  │                                 │ │
│ │  │Básicos │  │        │  │        │  │        │                                 │ │
│ │  └────────┘  └────────┘  └────────┘  └────────┘                                 │ │
│ │                                                                                 │ │
│ └─────────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Step 1: Dados Básicos

### 3.1 Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ Step 1 de 4: Dados Básicos da Receita                                             │
│                                                                                   │
│  Descrição *                                                                       │
│  ┌──────────────────────────────────────────────────────────────────────────────┐ │
│  │ Venda de Produtos - Pedido #1234                                             │ │
│  └──────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                   │
│  Categoria *                              Valor Total *                           │
│  ┌──────────────────────────────┐        ┌──────────────────────────────────────┐ │
│  │ Vendas                   ▼   │        │ R$ 5.000,00                          │ │
│  └──────────────────────────────┘        └──────────────────────────────────────┘ │
│                                                                                   │
│  Data de Emissão *                        Data de Vencimento *                    │
│  ┌──────────────────────────────┐        ┌──────────────────────────────────────┐ │
│  │ 📅 12/03/2026                │        │ 📅 15/03/2026                        │ │
│  └──────────────────────────────┘        └──────────────────────────────────────┘ │
│                                                                                   │
│  Conta Bancária *                         Forma de Recebimento *                  │
│  ┌──────────────────────────────┐        ┌──────────────────────────────────────┐ │
│  │ Itaú - Corrente (***1234) ▼  │        │ Boleto                           ▼   │ │
│  └──────────────────────────────┘        └──────────────────────────────────────┘ │
│                                                                                   │
│  Centro de Custo (opcional)               Número do Documento                     │
│  ┌──────────────────────────────┐        ┌──────────────────────────────────────┐ │
│  │ Vendas                   ▼   │        │ REC-2026-00123                       │ │
│  └──────────────────────────────┘        └──────────────────────────────────────┘ │
│                                                                                   │
│  Observações                                                                       │
│  ┌──────────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                              │ │
│  └──────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                   │
│  [Voltar ao Dashboard]                                    [Continuar → Cliente]   │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Componente

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
  <!-- Step Indicator -->
  <div class="mb-8">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-full bg-[#86cb92] text-white flex items-center justify-center text-sm font-bold">1</div>
        <span class="text-sm font-medium text-[#86cb92]">Dados Básicos</span>
      </div>
      <div class="flex-1 h-0.5 bg-gray-200 mx-4"></div>
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm">2</div>
        <span class="text-sm text-gray-500">Cliente</span>
      </div>
      <div class="flex-1 h-0.5 bg-gray-200 mx-4"></div>
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm">3</div>
        <span class="text-sm text-gray-500">Parcelas</span>
      </div>
      <div class="flex-1 h-0.5 bg-gray-200 mx-4"></div>
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm">4</div>
        <span class="text-sm text-gray-500">Revisão</span>
      </div>
    </div>
  </div>
  
  <!-- Form -->
  <form class="space-y-5">
    <!-- Descrição -->
    <div>
      <label class="block text-sm font-medium text-[#1f2937] mb-1">
        Descrição <span class="text-red-500">*</span>
      </label>
      <input 
        type="text" 
        placeholder="Ex: Venda de Produtos - Pedido #1234"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]"
      />
    </div>
    
    <!-- Categoria e Valor -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">
          Categoria <span class="text-red-500">*</span>
        </label>
        <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]">
          <option value="">Selecione...</option>
          <option value="vendas">📦 Vendas</option>
          <option value="servicos">🔧 Serviços</option>
          <option value="recorrente">🔄 Receita Recorrente</option>
          <option value="outros">📋 Outros</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">
          Valor Total <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
          <input 
            type="text" 
            placeholder="0,00"
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] font-semibold text-lg"
          />
        </div>
      </div>
    </div>
    
    <!-- Datas -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">
          Data de Emissão <span class="text-red-500">*</span>
        </label>
        <input 
          type="date" 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">
          Data de Vencimento <span class="text-red-500">*</span>
        </label>
        <input 
          type="date" 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]"
        />
      </div>
    </div>
    
    <!-- Conta e Forma -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">
          Conta Bancária <span class="text-red-500">*</span>
        </label>
        <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]">
          <option value="">Selecione...</option>
          <option value="1">🏦 Itaú - Corrente (***1234)</option>
          <option value="2">🏦 Bradesco - Poupança (***5678)</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">
          Forma de Recebimento <span class="text-red-500">*</span>
        </label>
        <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]">
          <option value="">Selecione...</option>
          <option value="boleto">📄 Boleto</option>
          <option value="pix">⚡ PIX</option>
          <option value="transferencia">🏦 Transferência</option>
          <option value="dinheiro">💵 Dinheiro</option>
          <option value="cartao">💳 Cartão</option>
        </select>
      </div>
    </div>
    
    <!-- Centro de Custo e Documento -->
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">
          Centro de Custo <span class="text-gray-400">(opcional)</span>
        </label>
        <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]">
          <option value="">Selecione...</option>
          <option value="vendas">Vendas</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-[#1f2937] mb-1">
          Número do Documento
        </label>
        <input 
          type="text" 
          placeholder="Gerado automaticamente"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
          disabled
        />
      </div>
    </div>
    
    <!-- Observações -->
    <div>
      <label class="block text-sm font-medium text-[#1f2937] mb-1">Observações</label>
      <textarea 
        rows="3"
        placeholder="Adicione informações complementares..."
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] resize-none"
      ></textarea>
    </div>
  </form>
  
  <!-- Actions -->
  <div class="flex items-center justify-between pt-6 border-t border-gray-200 mt-6">
    <button class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
      ← Voltar ao Dashboard
    </button>
    <button class="px-6 py-2 bg-[#86cb92] text-white rounded-lg hover:bg-[#6bb87a] font-medium">
      Continuar → Cliente
    </button>
  </div>
</div>
```

---

## 4. Step 2: Seleção do Cliente

### 4.1 Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ Step 2 de 4: Selecionar Cliente                                                   │
│                                                                                   │
│  Cliente *                                                                         │
│  ┌──────────────────────────────────────────────────────────────────────────────┐ │
│  │ 🔍 Buscar cliente existente ou cadastrar novo...                             │ │
│  └──────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                   │
│  OU                                                                               │
│                                                                                   │
│  [+ Cadastrar Novo Cliente]                                                       │
│                                                                                   │
│  ── Clientes Sugeridos ──                                                         │
│                                                                                   │
│  ┌──────────────────────────────────────────────────────────────────────────────┐ │
│  │ [👤]                                    [👤]                                 │ │
│  │ Ana Silva                              Carlos Mendes                         │ │
│  │ ana@email.com                          carlos@empresa.com                    │ │
│  │ (11) 98765-4321                        (21) 98765-4321                       │ │
│  │ Última compra: 10/03/2026              Última compra: 05/03/2026             │ │
│  │ [Selecionar]                           [Selecionar]                          │ │
│  └──────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                   │
│  ┌──────────────────────────────────────────────────────────────────────────────┐ │
│  │ [👤]                                                                         │ │
│  │ Tech Solutions Ltda                                                          │ │
│  │ contato@techsolutions.com.br                                                 │ │
│  │ (11) 3456-7890                                                               │ │
│  │ [Selecionar]                                                                 │ │
│  └──────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                   │
│  [← Voltar: Dados Básicos]                                [Continuar → Parcelas]  │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Componente

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
  <!-- Busca -->
  <div class="mb-6">
    <label class="block text-sm font-medium text-[#1f2937] mb-2">
      Cliente <span class="text-red-500">*</span>
    </label>
    <div class="relative">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input 
        type="text" 
        placeholder="Buscar cliente existente ou cadastrar novo..."
        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]"
      />
    </div>
  </div>
  
  <!-- Divider -->
  <div class="relative my-6">
    <div class="absolute inset-0 flex items-center">
      <div class="w-full border-t border-gray-200"></div>
    </div>
    <div class="relative flex justify-center">
      <span class="px-2 bg-white text-sm text-[#627271]">OU</span>
    </div>
  </div>
  
  <!-- Novo Cliente Button -->
  <button class="w-full py-3 border-2 border-dashed border-[#86cb92] text-[#86cb92] rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center gap-2">
    <Plus class="w-5 h-5" />
    Cadastrar Novo Cliente
  </button>
  
  <!-- Clientes Sugeridos -->
  <div class="mt-8">
    <p class="text-sm font-medium text-[#627271] mb-4">Clientes Frequentes</p>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Cliente 1 -->
      <div class="border border-gray-200 rounded-lg p-4 hover:border-[#86cb92] hover:shadow-sm transition-all cursor-pointer">
        <div class="flex items-start gap-3">
          <div class="w-12 h-12 rounded-full bg-[#86cb92] flex items-center justify-center flex-shrink-0">
            <span class="text-white font-medium">AS</span>
          </div>
          <div class="flex-1">
            <p class="font-medium text-[#1f2937]">Ana Silva</p>
            <p class="text-sm text-[#627271]">ana@email.com</p>
            <p class="text-sm text-[#627271]">(11) 98765-4321</p>
            <p class="text-xs text-gray-400 mt-2">Última compra: 10/03/2026</p>
          </div>
        </div>
        <button class="w-full mt-3 py-2 bg-[#86cb92] text-white rounded-lg text-sm hover:bg-[#6bb87a]">
          Selecionar
        </button>
      </div>
      
      <!-- Cliente 2 -->
      <div class="border border-gray-200 rounded-lg p-4 hover:border-[#86cb92] hover:shadow-sm transition-all cursor-pointer">
        <div class="flex items-start gap-3">
          <div class="w-12 h-12 rounded-full bg-[#3e5653] flex items-center justify-center flex-shrink-0">
            <span class="text-white font-medium">CM</span>
          </div>
          <div class="flex-1">
            <p class="font-medium text-[#1f2937]">Carlos Mendes</p>
            <p class="text-sm text-[#627271]">carlos@empresa.com</p>
            <p class="text-sm text-[#627271]">(21) 98765-4321</p>
            <p class="text-xs text-gray-400 mt-2">Última compra: 05/03/2026</p>
          </div>
        </div>
        <button class="w-full mt-3 py-2 bg-[#86cb92] text-white rounded-lg text-sm hover:bg-[#6bb87a]">
          Selecionar
        </button>
      </div>
    </div>
  </div>
  
  <!-- Actions -->
  <div class="flex items-center justify-between pt-6 border-t border-gray-200 mt-6">
    <button class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
      ← Voltar: Dados Básicos
    </button>
    <button class="px-6 py-2 bg-[#86cb92] text-white rounded-lg hover:bg-[#6bb87a] font-medium">
      Continuar → Parcelas
    </button>
  </div>
</div>
```

---

## 5. Step 3: Parcelas

### 5.1 Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ Step 3 de 4: Configurar Parcelas                                                  │
│                                                                                   │
│  Forma de Parcelamento                                                             │
│  ┌──────────────────────────────┐  ┌──────────────────────────────┐              │
│  │ ☑ À Vista                    │  │ ○ Parcelado                  │              │
│  └──────────────────────────────┘  └──────────────────────────────┘              │
│                                                                                   │
│  ──────────────────────────────────────────────────────────────────────────────── │
│                                                                                   │
│  Valor Total: R$ 5.000,00                                                          │
│                                                                                   │
│  ☑ Gerar recorrência mensal                                                        │
│                                                                                   │
│  ┌──────────────────────────────────────────────────────────────────────────────┐ │
│  │ #  │ Vencimento    │ Valor          │ Status    │ Ações                     │ │
│  │ ───┼───────────────┼────────────────┼───────────┼───────────────────────────│ │
│  │ 1  │ 15/03/2026    │ R$ 5.000,00    │ Pendente  │ [👁] [✏️] [🗑]            │ │
│  └──────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                   │
│  [+ Adicionar Parcela]                                                            │
│                                                                                   │
│  [← Voltar: Cliente]                                      [Continuar → Revisão]   │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Componente Parcelado

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
  <!-- Tipo de Parcelamento -->
  <div class="mb-6">
    <label class="block text-sm font-medium text-[#1f2937] mb-3">Forma de Parcelamento</label>
    <div class="flex gap-4">
      <label class="flex-1 flex items-center gap-3 p-4 border-2 border-[#86cb92] bg-green-50 rounded-lg cursor-pointer">
        <input type="radio" name="parcelamento" value="vista" checked class="w-4 h-4 text-[#86cb92]" />
        <div>
          <p class="font-medium text-[#1f2937]">À Vista</p>
          <p class="text-sm text-[#627271]">Recebimento único</p>
        </div>
      </label>
      
      <label class="flex-1 flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
        <input type="radio" name="parcelamento" value="parcelado" class="w-4 h-4" />
        <div>
          <p class="font-medium text-[#1f2937]">Parcelado</p>
          <p class="text-sm text-[#627271]">Dividir em várias parcelas</p>
        </div>
      </label>
    </div>
  </div>
  
  <!-- Resumo -->
  <div class="bg-gray-50 rounded-lg p-4 mb-6">
    <div class="flex items-center justify-between">
      <span class="text-sm text-[#627271]">Valor Total:</span>
      <span class="text-xl font-bold text-[#86cb92]">R$ 5.000,00</span>
    </div>
  </div>
  
  <!-- Configuração de Parcelas -->
  <div class="grid grid-cols-3 gap-4 mb-6">
    <div>
      <label class="block text-sm font-medium text-[#1f2937] mb-1">Número de Parcelas</label>
      <select class="w-full px-3 py-2 border border-gray-300 rounded-lg">
        <option value="1">1x</option>
        <option value="2">2x</option>
        <option value="3">3x</option>
        <option value="4">4x</option>
        <option value="5">5x</option>
        <option value="6">6x</option>
        <option value="12">12x</option>
      </select>
    </div>
    <div>
      <label class="block text-sm font-medium text-[#1f2937] mb-1">Primeiro Vencimento</label>
      <input type="date" class="w-full px-3 py-2 border border-gray-300 rounded-lg" />
    </div>
    <div>
      <label class="block text-sm font-medium text-[#1f2937] mb-1">Periodicidade</label>
      <select class="w-full px-3 py-2 border border-gray-300 rounded-lg">
        <option value="monthly">Mensal</option>
        <option value="weekly">Semanal</option>
        <option value="biweekly">Quinzenal</option>
      </select>
    </div>
  </div>
  
  <!-- Tabela de Parcelas -->
  <div class="border border-gray-200 rounded-lg overflow-hidden">
    <table class="w-full">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-4 py-3 text-left text-xs font-medium text-[#627271]">#</th>
          <th class="px-4 py-3 text-left text-xs font-medium text-[#627271]">Vencimento</th>
          <th class="px-4 py-3 text-right text-xs font-medium text-[#627271]">Valor</th>
          <th class="px-4 py-3 text-center text-xs font-medium text-[#627271]">Status</th>
          <th class="px-4 py-3 text-center text-xs font-medium text-[#627271]">Ações</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr>
          <td class="px-4 py-3">1</td>
          <td class="px-4 py-3">
            <input type="date" value="2026-03-15" class="px-2 py-1 border border-gray-300 rounded text-sm" />
          </td>
          <td class="px-4 py-3">
            <div class="relative">
              <span class="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">R$</span>
              <input type="text" value="1.666,67" class="pl-8 pr-2 py-1 border border-gray-300 rounded text-sm w-28 text-right" />
            </div>
          </td>
          <td class="px-4 py-3 text-center">
            <span class="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">Pendente</span>
          </td>
          <td class="px-4 py-3">
            <div class="flex items-center justify-center gap-1">
              <button class="p-1 text-gray-400 hover:text-blue-600"><Edit class="w-4 h-4" /></button>
              <button class="p-1 text-gray-400 hover:text-red-600"><Trash2 class="w-4 h-4" /></button>
            </div>
          </td>
        </tr>
        <!-- Mais parcelas... -->
      </tbody>
    </table>
  </div>
  
  <!-- Recorrência -->
  <div class="mt-4">
    <label class="flex items-center gap-2">
      <input type="checkbox" class="w-4 h-4 text-[#86cb92] rounded" />
      <span class="text-sm text-[#1f2937]">Gerar recorrência mensal automática</span>
    </label>
  </div>
  
  <!-- Actions -->
  <div class="flex items-center justify-between pt-6 border-t border-gray-200 mt-6">
    <button class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
      ← Voltar: Cliente
    </button>
    <button class="px-6 py-2 bg-[#86cb92] text-white rounded-lg hover:bg-[#6bb87a] font-medium">
      Continuar → Revisão
    </button>
  </div>
</div>
```

---

## 6. Step 4: Revisão e Confirmação

### 6.1 Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ Step 4 de 4: Revisar e Confirmar                                                  │
│                                                                                   │
│  ┌──────────────────────────────────────────────────────────────────────────────┐ │
│  │ 📋 RESUMO DA RECEITA                                                         │ │
│  │                                                                              │ │
│  │  Descrição:        Venda de Produtos - Pedido #1234                          │ │
│  │  Categoria:        📦 Vendas                                                 │ │
│  │  Valor Total:      R$ 5.000,00                                               │ │
│  │  Data Emissão:     12/03/2026                                                │ │
│  │  Vencimento:       15/03/2026                                                │ │
│  │  Forma Recebto:    Boleto                                                    │ │
│  │  Conta:            Itaú - Corrente (***1234)                                 │ │
│  │                                                                              │ │
│  │ ──────────────────────────────────────────────────────────────────────────── │ │
│  │                                                                              │ │
│  │  👤 CLIENTE                                                                  │ │
│  │  Ana Silva                                                                   │ │
│  │  ana@email.com | (11) 98765-4321                                             │ │
│  │                                                                              │ │
│  │ ──────────────────────────────────────────────────────────────────────────── │ │
│  │                                                                              │ │
│  │  💰 PARCELAS (3x)                                                            │ │
│  │  #1: 15/03/2026 - R$ 1.666,67                                                │ │
│  │  #2: 15/04/2026 - R$ 1.666,67                                                │ │
│  │  #3: 15/05/2026 - R$ 1.666,66                                                │ │
│  │                                                                              │ │
│  └──────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                   │
│  ☑ Enviar boleto por email ao cliente                                             │
│  ☑ Notificar quando recebido                                                       │
│  ☐ Gerar NF-e automaticamente                                                     │
│                                                                                   │
│  [← Voltar: Parcelas]                                      [✓ Confirmar Receita]  │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Componente

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
  <!-- Resumo -->
  <div class="bg-[#86cb92]/5 border border-[#86cb92]/20 rounded-xl p-6 mb-6">
    <h3 class="text-lg font-semibold text-[#1f2937] mb-4 flex items-center gap-2">
      <ClipboardList class="w-5 h-5 text-[#86cb92]" />
      Resumo da Receita
    </h3>
    
    <div class="space-y-3">
      <div class="flex justify-between">
        <span class="text-[#627271]">Descrição:</span>
        <span class="font-medium text-[#1f2937]">Venda de Produtos - Pedido #1234</span>
      </div>
      <div class="flex justify-between">
        <span class="text-[#627271]">Categoria:</span>
        <span class="font-medium text-[#1f2937]">📦 Vendas</span>
      </div>
      <div class="flex justify-between">
        <span class="text-[#627271]">Valor Total:</span>
        <span class="font-bold text-xl text-[#86cb92]">R$ 5.000,00</span>
      </div>
      <div class="flex justify-between">
        <span class="text-[#627271]">Vencimento:</span>
        <span class="font-medium text-[#1f2937]">15/03/2026</span>
      </div>
      <div class="flex justify-between">
        <span class="text-[#627271]">Forma:</span>
        <span class="font-medium text-[#1f2937]">Boleto</span>
      </div>
      <div class="flex justify-between">
        <span class="text-[#627271]">Conta:</span>
        <span class="font-medium text-[#1f2937]">Itaú - Corrente (***1234)</span>
      </div>
    </div>
    
    <hr class="my-4 border-[#86cb92]/20" />
    
    <h4 class="font-medium text-[#1f2937] mb-2 flex items-center gap-2">
      <User class="w-4 h-4 text-[#627271]" />
      Cliente
    </h4>
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-[#86cb92] flex items-center justify-center">
        <span class="text-white text-sm font-medium">AS</span>
      </div>
      <div>
        <p class="font-medium text-[#1f2937]">Ana Silva</p>
        <p class="text-sm text-[#627271]">ana@email.com • (11) 98765-4321</p>
      </div>
    </div>
    
    <hr class="my-4 border-[#86cb92]/20" />
    
    <h4 class="font-medium text-[#1f2937] mb-2 flex items-center gap-2">
      <DollarSign class="w-4 h-4 text-[#627271]" />
      Parcelas (3x)
    </h4>
    <div class="space-y-1">
      <div class="flex justify-between text-sm">
        <span class="text-[#627271]">#1: 15/03/2026</span>
        <span class="font-medium">R$ 1.666,67</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-[#627271]">#2: 15/04/2026</span>
        <span class="font-medium">R$ 1.666,67</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-[#627271]">#3: 15/05/2026</span>
        <span class="font-medium">R$ 1.666,66</span>
      </div>
    </div>
  </div>
  
  <!-- Opções -->
  <div class="space-y-3 mb-6">
    <label class="flex items-center gap-2">
      <input type="checkbox" checked class="w-4 h-4 text-[#86cb92] rounded" />
      <span class="text-sm text-[#1f2937]">Enviar boleto por email ao cliente</span>
    </label>
    <label class="flex items-center gap-2">
      <input type="checkbox" checked class="w-4 h-4 text-[#86cb92] rounded" />
      <span class="text-sm text-[#1f2937]">Notificar quando recebido</span>
    </label>
    <label class="flex items-center gap-2">
      <input type="checkbox" class="w-4 h-4 text-[#86cb92] rounded" />
      <span class="text-sm text-[#1f2937]">Gerar NF-e automaticamente</span>
    </label>
  </div>
  
  <!-- Actions -->
  <div class="flex items-center justify-between pt-6 border-t border-gray-200">
    <button class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
      ← Voltar: Parcelas
    </button>
    <button class="px-6 py-2 bg-[#86cb92] text-white rounded-lg hover:bg-[#6bb87a] font-medium flex items-center gap-2">
      <Check class="w-5 h-5" />
      Confirmar Receita
    </button>
  </div>
</div>
```

---

## 7. Regras de Negócio

| Código | Descrição | Severidade |
|--------|-----------|------------|
| **RN-REC-001** | Valor deve ser maior que zero | Alta |
| **RN-REC-002** | Data de vencimento deve ser posterior à emissão | Alta |
| **RN-REC-003** | Soma das parcelas deve ser igual ao valor total | Alta |
| **RN-REC-004** | Cliente pode ser nulo para receitas genéricas | Média |
| **RN-REC-005** | Número de documento gerado automaticamente | Média |
| **RN-REC-006** | Boleto gerado automaticamente se forma = boleto | Alta |
| **RN-REC-007** | Email enviado se opção marcada | Média |

---

## 8. Checklist

- [ ] Stepper com 4 passos
- [ ] Validação em cada step
- [ ] Persistência de dados entre steps
- [ ] Busca e seleção de cliente
- [ ] Cadastro rápido de novo cliente
- [ ] Configuração de parcelas
- [ ] Cálculo automático de valores
- [ ] Tela de revisão completa
- [ ] Geração de boleto
- [ ] Envio de email
- [ ] Toast de sucesso
- [ ] Redirecionamento após criação

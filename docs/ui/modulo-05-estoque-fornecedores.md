# 📁 Módulo 05 - Estoque: Fornecedores

## Metadados
| Atributo | Valor |
|----------|-------|
| **Módulo** | Estoque |
| **Sub-módulo** | Fornecedores |
| **Versão** | 1.0.0 |
| **Status** | Em Desenvolvimento |
| **Responsável** | UI/UX Team |
| **Data** | 12/03/2026 |

---

## 🎨 Design System

### Paleta de Cores UNIQ
```scss
$jet-black: #1f2937;          // Textos principais
$dark-slate-grey: #3e5653;    // Headers e navegação
$dim-grey: #627271;           // Textos secundários
$platinum: #efefef;           // Backgrounds
$emerald: #86cb92;            // Destaque, botões primários
$white: #ffffff;              // Superfície
$status-ok: #22c55e;          // Ativo
$status-baixo: #f59e0b;       // Pendente
$status-critico: #ef4444;     // Inativo
$bordas: #e5e7eb;             // Bordas, divisores
```

### Tipografia
| Nível | Fonte | Tamanho | Peso | Uso |
|-------|-------|---------|------|-----|
| H1 | Inter | 24px | 700 | Título da página |
| H2 | Inter | 20px | 600 | Seções |
| H3 | Inter | 16px | 600 | Cards |
| Body | Inter | 14px | 400 | Conteúdo |
| Small | Inter | 12px | 400 | Labels |

---

## 📱 Tela - Listagem de Fornecedores

### Layout ASCII

```
+----------------------------------------------------------------------------------------------------------+
|  [LOGO]  UNIQ Empresas                                          [🔍] [🌙] [👤 Admin ▼]                  |
+----------------------------------------------------------------------------------------------------------+
|                                                                                                          |
|  [🏠] Dashboard    [📦] Estoque    [💰] Financeiro    [👥] CRM    [🛒] Loja    [📅] Agendamentos        |
|                                          ▼                                                               |
|                                    ┌─────────────────────────┐                                             |
|                                    │ • Produtos              │                                             |
|                                    │ • Categorias            │                                             |
|                                    │ • Fornecedores    ←     │                                             |
|                                    │ • Entradas              │                                             |
|                                    └─────────────────────────┘                                             |
+----------------------------------------------------------------------------------------------------------+
|                                                                                                          |
|  Fornecedores                                                        [+ Novo Fornecedor]                 |
|  Gerencie seus fornecedores e contatos                                                                   |
|                                                                                                          |
+----------------------------------------------------------------------------------------------------------+
|                                                                                                          |
|  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐   |
|  │  [🔍 Buscar fornecedor...    ]    [Status: Todos ▼]    [Tipo: Todos ▼]    [📥 Importar] [📤]   │   |
|  └──────────────────────────────────────────────────────────────────────────────────────────────────┘   |
|                                                                                                          |
|  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐   |
|  │  LISTA DE FORNECEDORES                                                                           │   |
|  │                                                                                                  │   |
|  │  ┌───────────────────────────────────────────────────────────────────────────────────────────┐  │   |
|  │  │ [Logo]  Tech Distribuidora Ltda.                        🟢 Ativo  │  [👁] [✏️] [🗑️]        │  │   |
|  │  │         CNPJ: 12.345.678/0001-90                                                        │  │   |
|  │  │         📧 contato@techdist.com.br  │  📱 (11) 98765-4321                                │  │   |
|  │  │         📍 São Paulo, SP  │  🏷️ Eletrônicos, Tecnologia  │  📦 145 pedidos               │  │   |
|  │  └───────────────────────────────────────────────────────────────────────────────────────────┘  │   |
|  │                                                                                                  │   |
|  │  ┌───────────────────────────────────────────────────────────────────────────────────────────┐  │   |
|  │  │ [Logo]  Moda Brasil Atacado                             🟢 Ativo  │  [👁] [✏️] [🗑️]        │  │   |
|  │  │         CNPJ: 98.765.432/0001-21                                                        │  │   |
|  │  │         📧 vendas@modabrasil.com.br  │  📱 (21) 97654-3210                              │  │   |
|  │  │         📍 Rio de Janeiro, RJ  │  🏷️ Vestuário, Acessórios  │  📦 89 pedidos              │  │   |
|  │  └───────────────────────────────────────────────────────────────────────────────────────────┘  │   |
|  │                                                                                                  │   |
|  │  ┌───────────────────────────────────────────────────────────────────────────────────────────┐  │   |
|  │  │ [Logo]  Casa & Cia Importadora                          🟡 Pendente │ [👁] [✏️] [🗑️]       │  │   |
|  │  │         CNPJ: 45.678.901/0001-34                                                        │  │   |
|  │  │         📧 comercial@casacia.com  │  📱 (31) 96543-2109                                  │  │   |
|  │  │         📍 Belo Horizonte, MG  │  🏷️ Decoração, Móveis  │  📦 0 pedidos                 │  │   |
|  │  └───────────────────────────────────────────────────────────────────────────────────────────┘  │   |
|  │                                                                                                  │   |
|  └──────────────────────────────────────────────────────────────────────────────────────────────────┘   |
|                                                                                                          |
|  Total: 24 fornecedores  │  Página 1 de 3                                     [<] [1] [2] [3] [>]        |
|                                                                                                          |
+----------------------------------------------------------------------------------------------------------+
```

---

## 📱 Tela - Cadastro/Edição de Fornecedor

### Layout ASCII - Visão Completa

```
+----------------------------------------------------------------------------------------------------------+
|  Novo Fornecedor                                             [Salvar Rascunho]  [Cancelar]  [Salvar]    |
+----------------------------------------------------------------------------------------------------------+
|                                                                                                          |
|  ┌─────────────────────────────────────┐  ┌───────────────────────────────────────────────────────────┐  |
|  │  INFORMAÇÕES PRINCIPAIS             │  │  ENDEREÇO                                                 │  |
|  │                                     │  │                                                           │  |
|  │  Tipo *                             │  │  CEP *                                                    │  |
|  │  (●) PJ    ( ) PF                   │  │  [01310-100                    ]  [🔍 Buscar]             │  |
|  │                                     │  │                                                           │  |
|  │  CNPJ *                             │  │  Logradouro *                                             │  |
|  │  [12.345.678/0001-90          ]     │  │  [Avenida Paulista                                         │  |
|  │                                     │  │                                                           │  |
|  │  Razão Social *                     │  │  Número *              Complemento                        │  |
|  │  [Tech Distribuidora Ltda.           ]│  │  [1000    ]            [Sala 1501           ]             │  |
|  │                                     │  │                                                           │  |
|  │  Nome Fantasia                      │  │  Bairro *                    Cidade *                     │  |
|  │  [Tech Distribuidora                 ]│  │  [Bela Vista                 ] [São Paulo               ] │  |
|  │                                     │  │                                                           │  │
|  │  Inscrição Estadual                 │  │  Estado *                                                   │  │
|  │  [123.456.789.0               ]     │  │  [São Paulo                              ▼]               │  │
|  │                                     │  │                                                           │  │
|  │  Inscrição Municipal                │  │                                                           │  │
|  │  [9876543                     ]     │  │                                                           │  │
|  │                                     │  │                                                           │  │
|  └─────────────────────────────────────┘  └───────────────────────────────────────────────────────────┘  │
|                                                                                                          │
|  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐  |
|  │  CONTATOS                                        [+ Adicionar Contato]                              │  |
|  │                                                                                                     │  |
|  │  ┌─────────────────────────────────────────────────────────────────────────────────────────────┐   │  |
|  │  │  Contato Principal                                                    [⭐ Principal] [✕]   │   │  |
|  │  │                                                                                             │   │  |
|  │  │  Nome *                              Email *                                                │   │  |
|  │  │  [João Silva                    ]    [joao.silva@techdist.com.br                     ]     │   │  |
|  │  │                                                                                             │   │  |
|  │  │  Telefone *                          Celular                    Cargo                     │   │  |
|  │  │  [(11) 3456-7890                ]    [(11) 98765-4321       ]   [Gerente Comercial ▼]     │   │  |
|  │  │                                                                                             │   │  |
|  │  └─────────────────────────────────────────────────────────────────────────────────────────────┘   │  |
|  │                                                                                                     │  |
|  │  ┌─────────────────────────────────────────────────────────────────────────────────────────────┐   │  |
|  │  │  Contato Comercial                                                    [⭐] [✕]               │   │  |
|  │  │                                                                                             │   │  |
|  │  │  Nome *                              Email *                                                │   │  |
|  │  │  [Maria Santos                  ]    [maria.santos@techdist.com.br                   ]     │   │  |
|  │  │                                                                                             │   │  |
|  │  │  Telefone                            Celular *                  Cargo                     │   │  |
|  │  │  [(11) 3456-7891                ]    [(11) 98765-4322       ]   [Vendedora ▼]             │   │  |
|  │  │                                                                                             │   │  |
|  │  └─────────────────────────────────────────────────────────────────────────────────────────────┘   │  |
|  │                                                                                                     │  |
|  └─────────────────────────────────────────────────────────────────────────────────────────────────────┘  |
|                                                                                                          │
|  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐  |
|  │  INFORMAÇÕES COMERCIAIS                                                                             │  |
|  │                                                                                                     │  |
|  │  Categorias Fornecidas *                                                                            │  |
|  │  [Eletrônicos ▼]  [Tecnologia ▼]  [×]  [Adicionar categoria]                                        │  |
|  │                                                                                                     │  |
|  │  Condição de Pagamento Padrão                                                                       │  |
|  │  [30/60/90 dias                          ▼]                                                         │  |
|  │                                                                                                     │  |
|  │  Observações Internas                                                                               │  |
|  │  [Fornecedor principal de eletrônicos. Desconto de 5% para pagamento à vista...                     │  |
|  │                                                                                                     │  │
|  │  ☑ Ativo                                                                                            │  │
|  │                                                                                                     │  │
|  └─────────────────────────────────────────────────────────────────────────────────────────────────────┘  │
|                                                                                                          │
|  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐  |
|  │  DADOS BANCÁRIOS                                         [+ Adicionar Conta Bancária]               │  |
|  │                                                                                                     │  |
|  │  ┌─────────────────────────────────────────────────────────────────────────────────────────────┐   │  |
|  │  │  Banco *                    Agência *          Conta *              Tipo                    │   │  |
|  │  │  [001 - Banco do Brasil ▼]  [1234-5          ] [123456-7        ]  [Corrente ● Poupança ○]  │   │  |
|  │  │  [Chave Pix: CNPJ                          ]  [⭐ Principal] [✕]                              │   │  |
|  │  └─────────────────────────────────────────────────────────────────────────────────────────────┘   │  |
|  │                                                                                                     │  |
|  └─────────────────────────────────────────────────────────────────────────────────────────────────────┘  │
|                                                                                                          │
|                                                                                                          │
|       [Cancelar]                                    [Salvar Rascunho]              [Salvar Fornecedor]   |
|                                                                                                          │
+----------------------------------------------------------------------------------------------------------+
```

---

## 📱 Modal - Visualizar Fornecedor (Detalhes)

### Layout ASCII

```
+----------------------------------------------------------------------------------------------------------+
|  Tech Distribuidora Ltda.                                               [✕]  [✏️ Editar]               |
+----------------------------------------------------------------------------------------------------------+
|                                                                                                          |
|  ┌─────────────────────────────────────┐  ┌───────────────────────────────────────────────────────────┐  |
|  │  [Logo Grande]                      │  │  RESUMO                                                   │  |
|  │                                     │  │                                                           │  |
|  │  🟢 Ativo desde 15/01/2024          │  │  📦 Total de Pedidos: 145                                 │  |
|  │                                     │  │  💰 Valor Total Comprado: R$ 245.890,00                   │  |
|  │  CNPJ: 12.345.678/0001-90           │  │  📊 Ticket Médio: R$ 1.695,00                             │  |
|  │  IE: 123.456.789.0                  │  │  ⏰ Última Compra: 10/03/2026                             │  |
|  │                                     │  │                                                           │  |
|  └─────────────────────────────────────┘  └───────────────────────────────────────────────────────────┘  |
|                                                                                                          |
|  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐  |
|  │  ENDEREÇO                                                                                           │  |
|  │  📍 Avenida Paulista, 1000 - Sala 1501                                                              │  |
|  │     Bela Vista - São Paulo/SP - CEP: 01310-100                                                      │  |
|  └─────────────────────────────────────────────────────────────────────────────────────────────────────┘  |
|                                                                                                          |
|  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐  |
|  │  CONTATOS                                                                                           │  |
|  │                                                                                                     │  |
|  │  ┌─────────────────────────────────────────────────────────────────────────────────────────────┐   │  |
|  │  │  ⭐ João Silva (Principal)        Gerente Comercial                                         │   │  |
|  │  │     📧 joao.silva@techdist.com.br  │  📱 (11) 98765-4321  │  ☎️ (11) 3456-7890             │   │  |
|  │  │     [📋 Copiar]  [📧 Enviar Email]  [📱 WhatsApp]                                          │   │  |
|  │  └─────────────────────────────────────────────────────────────────────────────────────────────┘   │  |
|  │                                                                                                     │  |
|  │  ┌─────────────────────────────────────────────────────────────────────────────────────────────┐   │  |
|  │  │  Maria Santos                    Vendedora                                                  │   │  |
|  │  │     📧 maria.santos@techdist.com.br  │  📱 (11) 98765-4322                                  │   │  |
|  │  │     [📋 Copiar]  [📧 Enviar Email]  [📱 WhatsApp]                                          │   │  |
|  │  └─────────────────────────────────────────────────────────────────────────────────────────────┘   │  |
|  │                                                                                                     │  |
|  └─────────────────────────────────────────────────────────────────────────────────────────────────────┘  |
|                                                                                                          |
|  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐  |
|  │  HISTÓRICO DE PEDIDOS                                    [Ver Todos →]                              │  |
|  │                                                                                                     │  |
|  │  Pedido      Data         Produtos    Valor       Status        Ações                               │  |
|  │  ─────────────────────────────────────────────────────────────────────────────────────────────────  │  |
|  │  #EST-2456   10/03/2026   12 itens    R$ 15.430,00  ✅ Recebido    [👁] [📄]                        │  |
|  │  #EST-2434   25/02/2026   8 itens     R$ 8.950,00   ✅ Recebido    [👁] [📄]                        │  |
|  │  #EST-2389   10/02/2026   15 itens    R$ 22.100,00  ✅ Recebido    [👁] [📄]                        │  |
|  │  #EST-2356   28/01/2026   6 itens     R$ 4.560,00   ⏳ Pendente    [👁] [📄]                        │  |
|  │                                                                                                     │  |
|  └─────────────────────────────────────────────────────────────────────────────────────────────────────┘  |
|                                                                                                          |
|  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐  |
|  │  PRODUTOS FORNECIDOS                                    [Ver Todos →]                               │  |
|  │                                                                                                     │  |
|  │  [Lista de produtos com imagem, nome, SKU, último preço, estoque]                                  │  |
|  │                                                                                                     │  |
|  └─────────────────────────────────────────────────────────────────────────────────────────────────────┘  |
|                                                                                                          |
|       [Inativar Fornecedor]           [📄 Gerar Relatório]             [✏️ Editar Fornecedor]            |
|                                                                                                          |
+----------------------------------------------------------------------------------------------------------+
```

---

## 🔧 Componentes

### Card de Fornecedor (Listagem)
```html
<div class="bg-white rounded-lg border border-[#e5e7eb] p-4 hover:shadow-md transition-shadow">
  <div class="flex items-start gap-4">
    <div class="w-16 h-16 rounded-lg bg-[#efefef] flex items-center justify-center flex-shrink-0">
      <img src="/logo-fornecedor.jpg" class="w-12 h-12 object-contain" alt="Logo"/>
    </div>
    <div class="flex-1 min-w-0">
      <div class="flex items-start justify-between">
        <div>
          <h3 class="font-semibold text-[#1f2937] truncate">Tech Distribuidora Ltda.</h3>
          <p class="text-sm text-[#627271]">CNPJ: 12.345.678/0001-90</p>
        </div>
        <span class="px-2 py-1 text-xs font-medium bg-[#22c55e]/10 text-[#22c55e] rounded-full">Ativo</span>
      </div>
      
      <div class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-[#627271]">
        <span class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          contato@techdist.com.br
        </span>
        <span class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
          (11) 98765-4321
        </span>
        <span class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          São Paulo, SP
        </span>
      </div>
      
      <div class="flex flex-wrap items-center gap-2 mt-2">
        <span class="px-2 py-0.5 text-xs bg-[#efefef] text-[#627271] rounded">Eletrônicos</span>
        <span class="px-2 py-0.5 text-xs bg-[#efefef] text-[#627271] rounded">Tecnologia</span>
        <span class="ml-auto text-sm text-[#627271]">
          <span class="font-medium text-[#1f2937]">145</span> pedidos
        </span>
      </div>
    </div>
    
    <div class="flex items-center gap-1">
      <button class="p-2 text-[#627271] hover:text-[#3e5653] hover:bg-[#efefef] rounded-lg">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
      </button>
      <button class="p-2 text-[#627271] hover:text-[#3e5653] hover:bg-[#efefef] rounded-lg">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
      </button>
      <button class="p-2 text-[#627271] hover:text-[#ef4444] hover:bg-[#ef4444]/10 rounded-lg">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
      </button>
    </div>
  </div>
</div>
```

### Campo de CEP com Busca
```html
<div class="grid grid-cols-3 gap-4">
  <div class="col-span-2">
    <label class="block text-sm font-medium text-[#1f2937] mb-1">CEP *</label>
    <div class="flex gap-2">
      <input 
        type="text" 
        placeholder="01310-100"
        class="flex-1 px-4 py-2 border border-[#e5e7eb] rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
        maxlength="9"
      />
      <button class="px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#627271] transition-colors flex items-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        Buscar
      </button>
    </div>
  </div>
</div>
```

### Card de Contato
```html
<div class="bg-[#efefef]/50 rounded-lg p-4 border border-[#e5e7eb]">
  <div class="flex items-center justify-between mb-3">
    <div class="flex items-center gap-2">
      <h4 class="font-medium text-[#1f2937]">Contato Principal</h4>
      <span class="px-2 py-0.5 text-xs bg-[#86cb92]/20 text-[#3e5653] rounded-full">⭐ Principal</span>
    </div>
    <button class="text-[#ef4444] hover:bg-[#ef4444]/10 p-1 rounded">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </div>
  
  <div class="grid grid-cols-2 gap-4">
    <div>
      <label class="block text-xs font-medium text-[#627271] mb-1">Nome *</label>
      <input type="text" class="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:ring-2 focus:ring-[#86cb92]"/>
    </div>
    <div>
      <label class="block text-xs font-medium text-[#627271] mb-1">Email *</label>
      <input type="email" class="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:ring-2 focus:ring-[#86cb92]"/>
    </div>
    <div>
      <label class="block text-xs font-medium text-[#627271] mb-1">Telefone</label>
      <input type="tel" class="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:ring-2 focus:ring-[#86cb92]"/>
    </div>
    <div>
      <label class="block text-xs font-medium text-[#627271] mb-1">Celular *</label>
      <input type="tel" class="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:ring-2 focus:ring-[#86cb92]"/>
    </div>
  </div>
</div>
```

---

## 📋 Formulários

### Formulário Completo de Fornecedor

#### Aba: Informações Básicas

| Campo | Tipo | Obrigatório | Máscara/Validação | Placeholder |
|-------|------|-------------|-------------------|-------------|
| Tipo | Radio | Sim | PJ/PF | PJ |
| CNPJ | Text | Sim | 00.000.000/0000-00 | 12.345.678/0001-90 |
| CPF | Text | Condicional | 000.000.000-00 | 123.456.789-00 |
| Razão Social | Text | Sim (PJ) | - | Tech Distribuidora Ltda. |
| Nome Completo | Text | Sim (PF) | - | João da Silva |
| Nome Fantasia | Text | Não | - | Tech Distribuidora |
| Inscrição Estadual | Text | Não | - | 123.456.789.0 |
| Inscrição Municipal | Text | Não | - | 9876543 |
| Logo | File | Não | JPG/PNG, 2MB | - |

#### Aba: Endereço

| Campo | Tipo | Obrigatório | Máscara | Placeholder |
|-------|------|-------------|---------|-------------|
| CEP | Text | Sim | 00000-000 | 01310-100 |
| Logradouro | Text | Sim | - | Avenida Paulista |
| Número | Text | Sim | - | 1000 |
| Complemento | Text | Não | - | Sala 1501 |
| Bairro | Text | Sim | - | Bela Vista |
| Cidade | Text | Sim | - | São Paulo |
| Estado | Select | Sim | - | São Paulo |

#### Aba: Contatos (Array)

| Campo | Tipo | Obrigatório | Máscara | Placeholder |
|-------|------|-------------|---------|-------------|
| Nome | Text | Sim | - | João Silva |
| Email | Email | Sim | - | joao@empresa.com |
| Telefone | Tel | Não | (00) 0000-0000 | (11) 3456-7890 |
| Celular | Tel | Não | (00) 00000-0000 | (11) 98765-4321 |
| Cargo | Select | Não | - | Gerente Comercial |
| Principal | Checkbox | Não | Boolean | ☑ |

#### Aba: Dados Bancários (Array)

| Campo | Tipo | Obrigatório | Máscara | Placeholder |
|-------|------|-------------|---------|-------------|
| Banco | Select | Sim | - | 001 - Banco do Brasil |
| Agência | Text | Sim | - | 1234-5 |
| Conta | Text | Sim | - | 123456-7 |
| Tipo | Radio | Sim | Corrente/Poupança | Corrente |
| Chave Pix | Select | Não | - | CNPJ |
| Principal | Checkbox | Não | Boolean | ☑ |

---

## 📜 Regras de Negócio

### RN-EST-FOR-001 - Documentos
- **PJ**: CNPJ obrigatório, válido via API ReceitaWS
- **PF**: CPF obrigatório, validação de dígitos
- Duplicidade: Não permitir CNPJ/CPF já cadastrado
- Inscrição Estadual: "ISENTO" permitido para ME

### RN-EST-FOR-002 - Endereço
- Busca automática de endereço por CEP (ViaCEP)
- CEP inválido: exibir erro e permitir preenchimento manual
- Complemento não obrigatório mas recomendado

### RN-EST-FOR-003 - Contatos
- Mínimo 1 contato obrigatório
- Apenas 1 contato pode ser marcado como "Principal"
- Se excluir contato principal, definir outro ou bloquear
- Email deve ser válido e único no sistema

### RN-EST-FOR-004 - Dados Bancários
- Campos opcionais (mas recomendados)
- Validação de dígito verificador
- Chave Pix: CPF, CNPJ, Email, Celular ou Aleatória
- QR Code Pix gerado automaticamente

### RN-EST-FOR-005 - Status
- **Ativo**: Pode receber pedidos
- **Inativo**: Não aparece em novos pedidos, histórico preservado
- **Pendente**: Cadastro incompleto, aguardando revisão
- Exclusão apenas se nunca teve pedidos

### RN-EST-FOR-006 - Categorias
- Múltiplas categorias permitidas
- Produtos do fornecedor herdam categorias (padrão)
- Relatório de performance por categoria

---

## 🎭 Estados

### Estado Loading
```html
<div class="animate-pulse space-y-4">
  <div class="h-32 bg-[#efefef] rounded-lg"></div>
  <div class="h-32 bg-[#efefef] rounded-lg"></div>
  <div class="h-32 bg-[#efefef] rounded-lg"></div>
</div>
```

### Estado Empty
```html
<div class="text-center py-16">
  <div class="w-24 h-24 mx-auto mb-4 rounded-full bg-[#efefef] flex items-center justify-center">
    <svg class="w-12 h-12 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
    </svg>
  </div>
  <h3 class="text-lg font-medium text-[#1f2937] mb-2">Nenhum fornecedor cadastrado</h3>
  <p class="text-[#627271] mb-4">Cadastre seus fornecedores para gerenciar compras</p>
  <button class="bg-[#3e5653] text-white px-4 py-2 rounded-lg">Cadastrar Fornecedor</button>
</div>
```

### Estado CEP Buscando
```html
<div class="relative">
  <input type="text" class="w-full px-4 py-2 border border-[#e5e7eb] rounded-lg pr-10"/>
  <svg class="absolute right-3 top-2.5 w-5 h-5 text-[#627271] animate-spin" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
  </svg>
</div>
```

---

## ✅ Checklist de Implementação

### Estrutura
- [ ] Rota `/estoque/fornecedores` criada
- [ ] Layout com sidebar responsivo
- [ ] Breadcumbs: Dashboard > Estoque > Fornecedores
- [ ] SEO: título e metadados

### Listagem
- [ ] Cards de fornecedores
- [ ] Filtros (busca, status, categoria)
- [ ] Ordenação (nome, data, pedidos)
- [ ] Paginação
- [ ] Exportar para Excel/CSV
- [ ] Importar fornecedores

### CRUD
- [ ] Formulário completo com validações
- [ ] Busca de CEP automática
- [ ] Upload de logo
- [ ] Adicionar/remover contatos dinamicamente
- [ ] Adicionar/remover contas bancárias
- [ ] Validação de CNPJ/CPF
- [ ] Validação de email único

### Integrações
- [ ] API ViaCEP para endereço
- [ ] API ReceitaWS para consulta CNPJ
- [ ] Upload de imagens (Storage)
- [ ] API de fornecedores (CRUD)

### Acessibilidade
- [ ] Keyboard navigation
- [ ] ARIA labels
- [ ] Contraste WCAG 2.1 AA
- [ ] Focus management
- [ ] Screen reader friendly

---

## 📊 Relatórios e Analytics

| Relatório | Descrição | Filtros |
|-----------|-----------|---------|
| Performance | Compras por fornecedor | Período, categoria |
| Produtos | Produtos mais comprados | Fornecedor, período |
| Financeiro | Valor total por fornecedor | Status, data |
| Inadimplência | Pedidos pendentes | Atraso, valor |

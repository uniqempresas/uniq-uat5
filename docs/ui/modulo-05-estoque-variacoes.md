# 📁 Módulo 05 - Estoque: Variações de Produto

## Metadados
| Atributo | Valor |
|----------|-------|
| **Módulo** | Estoque |
| **Sub-módulo** | Variações de Produto |
| **Versão** | 1.0.0 |
| **Status** | Em Desenvolvimento |
| **Responsável** | UI/UX Team |
| **Data** | 12/03/2026 |

---

## 🎨 Design System

### Paleta de Cores UNIQ
```scss
$jet-black: #1f2937;          // Textos principais
$dark-slate-grey: #3e5653;    // Headers
$dim-grey: #627271;           // Textos secundários
$platinum: #efefef;           // Backgrounds
$emerald: #86cb92;            // Destaque, ações
$white: #ffffff;              // Superfície
$status-ok: #22c55e;          // Em estoque
$status-baixo: #f59e0b;       // Baixo estoque
$status-critico: #ef4444;     // Sem estoque
$bordas: #e5e7eb;             // Bordas
```

### Tipografia
| Nível | Fonte | Tamanho | Peso | Uso |
|-------|-------|---------|------|-----|
| H1 | Inter | 24px | 700 | Título |
| H2 | Inter | 18px | 600 | Seções |
| H3 | Inter | 16px | 600 | Variações |
| Body | Inter | 14px | 400 | Conteúdo |
| Small | Inter | 12px | 400 | Códigos |

---

## 📱 Tela - Produto com Variações

### Layout ASCII - Visão Geral

```
+----------------------------------------------------------------------------------------------------------+
|  [LOGO]  UNIQ Empresas                                          [🔍] [🌙] [👤 Admin ▼]                  |
+----------------------------------------------------------------------------------------------------------+
|                                                                                                          |
|  [🏠] Dashboard    [📦] Estoque    [💰] Financeiro    [👥] CRM    [🛒] Loja    [📅] Agendamentos        |
+----------------------------------------------------------------------------------------------------------+
|                                                                                                          |
|  ← Voltar para Produtos                                                                                  |
|                                                                                                          |
|  Editar Produto                                                                                          |
|                                                                                                          |
|  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐   |
|  │  [📷]  Camiseta UNIQ Básica                                                     🟢 Ativo          │   |
|  │        SKU Base: CAM-BAS-001                                                                    │   |
|  │        Tipo: Produto com Variações                                                              │   |
|  │                                                                                                 │   |
|  │        [ℹ️ Informações] [💰 Preços] [📦 Estoque] [🎨 Variações] [🖼️ Imagens] [⚙️ Config]        │   |
|  └──────────────────────────────────────────────────────────────────────────────────────────────────┘   |
|                                                                                                          |
|  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐   |
|  │  VARIAÇÕES DO PRODUTO                                                                            │   |
|  │                                                                                                  │   |
|  │  Atributos Configurados:                                                                         │   |
|  │  ┌────────────────────────┐  ┌─────────────────────────────────────────────────────────────┐    │   |
|  │  │ COR                    │  │ TAMANHO                                                     │    │   |
|  │  │                        │  │                                                             │    │   |
|  │  │ ● Preto    #000000     │  │ ● P    ● M    ● G    ● GG                                   │    │   |
|  │  │ ● Branco   #FFFFFF     │  │                                                             │    │   |
|  │  │ ● Azul     #0066CC     │  │ ● 2G (opcional)                                             │    │   |
|  │  │ ● Vermelho #CC0000     │  │                                                             │    │   |
|  │  │                        │  │                                                             │    │   |
|  │  │ [+ Adicionar Cor]      │  │ [+ Adicionar Tamanho]                                       │    │   |
|  │  └────────────────────────┘  └─────────────────────────────────────────────────────────────┘    │   |
|  │                                                                                                  │   |
|  │  [🔄 Gerar Combinções]  [⚙️ Configurar Atributos]                                                │   |
|  │                                                                                                  │   |
|  └──────────────────────────────────────────────────────────────────────────────────────────────────┘   |
|                                                                                                          |
|  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐   |
|  │  MATRIZ DE VARIAÇÕES                                             [📥 Exportar] [🖨️ Etiquetas]    │   |
|  │                                                                                                  │   |
|  │  Filtros: [Todas as Cores ▼] [Todos Tamanhos ▼] [Status: Todos ▼]  [🔍 Buscar...            ]    │   |
|  │                                                                                                  │   |
|  │  Variação              SKU              Código de Barras    Estoque   Preço    Status    Ações   │   |
|  │  ─────────────────────────────────────────────────────────────────────────────────────────────  │   |
|  │  Preto / P            CAM-BAS-001-PT-P   7891234567890      45 un    R$ 79,90 🟢        [✏️][🗑️] │   |
|  │  Preto / M            CAM-BAS-001-PT-M   7891234567891      32 un    R$ 79,90 🟢        [✏️][🗑️] │   |
|  │  Preto / G            CAM-BAS-001-PT-G   7891234567892      18 un    R$ 79,90 🟡        [✏️][🗑️] │   |
|  │  Preto / GG           CAM-BAS-001-PT-GG  7891234567893       8 un    R$ 79,90 🟡        [✏️][🗑️] │   |
|  │  Branco / P           CAM-BAS-001-BR-P   7891234567894      50 un    R$ 79,90 🟢        [✏️][🗑️] │   |
|  │  Branco / M           CAM-BAS-001-BR-M   7891234567895      38 un    R$ 79,90 🟢        [✏️][🗑️] │   |
|  │  Branco / G           CAM-BAS-001-BR-G   7891234567896      22 un    R$ 79,90 🟡        [✏️][🗑️] │   |
|  │  Branco / GG          CAM-BAS-001-BR-GG  7891234567897      12 un    R$ 79,90 🟡        [✏️][🗑️] │   |
|  │  Azul / P             CAM-BAS-001-AZ-P   7891234567898      28 un    R$ 79,90 🟡        [✏️][🗑️] │   |
|  │  Azul / M             CAM-BAS-001-AZ-M   7891234567899      15 un    R$ 79,90 🟡        [✏️][🗑️] │   |
|  │  Azul / G             CAM-BAS-001-AZ-G   7891234567900       5 un    R$ 79,90 🔴        [✏️][🗑️] │   |
|  │  ...                  ...              ...               ...      ...       ...       ...      │   |
|  │                                                                                                  │   |
|  │  Total: 16 variações    │    Estoque total: 387 unidades                                        │   |
|  │                                                                                                  │   |
|  │  Edição em Massa: [Selecionar Todas]  [Aplicar Preço: R$       ]  [Ajustar Estoque: +    un]    │   |
|  │                                                                                                  │   |
|  └──────────────────────────────────────────────────────────────────────────────────────────────────┘   |
|                                                                                                          |
+----------------------------------------------------------------------------------------------------------+
```

---

## 📱 Modal - Configurar Atributos

### Layout ASCII

```
+----------------------------------------------------------+
|  Configurar Atributos de Variação                  [✕]   |
+----------------------------------------------------------+
|                                                          |
|  Atributos são as características que diferenciam as    │
|  variações do produto (ex: Cor, Tamanho, Voltagem).     │
|                                                          |
|  ┌────────────────────────────────────────────────────┐  |
|  │  ATRIBUTOS ATIVOS                                  │  |
|  │                                                    │  |
|  │  ┌─────────────────────────────────────────────┐  │  |
|  │  │  🎨 COR                              [✕]    │  │  |
|  │  │                                             │  │  |
|  │  │  Valores:                                   │  │  |
|  │  │  ┌──────┬─────────────┬──────────┐         │  │  |
|  │  │  │ ☐    │ Preto       │ ■ #000000│  [✕]    │  │  |
|  │  │  │ ☐    │ Branco      │ ■ #FFFFFF│  [✕]    │  │  |
|  │  │  │ ☐    │ Azul        │ ■ #0066CC│  [✕]    │  │  |
|  │  │  │ ☐    │ Vermelho    │ ■ #CC0000│  [✕]    │  │  |
|  │  │  └──────┴─────────────┴──────────┘         │  │  |
|  │  │                                             │  │  |
|  │  │  [+ Adicionar Valor]                        │  │  |
|  │  └─────────────────────────────────────────────┘  │  |
|  │                                                    │  |
|  │  ┌─────────────────────────────────────────────┐  │  |
|  │  │  📏 TAMANHO                          [✕]    │  │  |
|  │  │                                             │  │  |
|  │  │  Valores:                                   │  │  |
|  │  │  ┌──────┬─────────────┬──────────┐         │  │  |
|  │  │  │ ☐    │ P           │          │  [✕]    │  │  |
|  │  │  │ ☐    │ M           │          │  [✕]    │  │  |
|  │  │  │ ☐    │ G           │          │  [✕]    │  │  |
|  │  │  │ ☐    │ GG          │          │  [✕]    │  │  |
|  │  │  │ ☐    │ 2G          │          │  [✕]    │  │  |
|  │  │  └──────┴─────────────┴──────────┘         │  │  |
|  │  │                                             │  │  |
|  │  │  [+ Adicionar Valor]                        │  │  |
|  │  └─────────────────────────────────────────────┘  │  |
|  │                                                    │  |
|  └────────────────────────────────────────────────────┘  |
|                                                          |
|  ┌────────────────────────────────────────────────────┐  |
|  │  ADICIONAR NOVO ATRIBUTO                           │  |
|  │                                                    │  |
|  │  Nome do Atributo:                                 │  |
|  │  [Ex: Material, Voltagem, Capacidade               ]│  |
|  │                                                    │  |
|  │  [+ Adicionar Atributo]                            │  |
|  │                                                    │  |
|  └────────────────────────────────────────────────────┘  |
|                                                          |
|  ⚠️ Atenção: Adicionar ou remover atributos pode       │
|     afetar variações existentes.                        │
|                                                          |
|       [Cancelar]              [Salvar e Gerar]           │
|                                                          |
+----------------------------------------------------------+
```

---

## 📱 Modal - Editar Variação Individual

### Layout ASCII

```
+----------------------------------------------------------+
|  Editar Variação: Preto / M                        [✕]   |
+----------------------------------------------------------+
|                                                          |
|  ┌────────────────────────────────────────────────────┐  |
|  │  IDENTIFICAÇÃO                                     │  |
|  │                                                    │  |
|  │  SKU *                                             │  |
|  │  [CAM-BAS-001-PT-M                                 ]│  |
|  │                                                    │  |
|  │  Código de Barras (EAN-13)                         │  |
|  │  [7891234567891                                    ]│  |
|  │  [🔢 Gerar Código]                                 │  |
|  │                                                    │  |
|  └────────────────────────────────────────────────────┘  |
|                                                          |
|  ┌────────────────────────────────────────────────────┐  |
|  │  IMAGEM DA VARIAÇÃO                                │  |
|  │                                                    │  |
|  │       ┌─────────────┐                              │  |
|  │       │             │                              │  |
|  │       │   [📷]      │  [📁 Alterar Imagem]         │  |
|  │       │             │                              │  |
|  │       │  400x400    │                              │  |
|  │       │             │                              │  |
|  │       └─────────────┘                              │  |
|  │                                                    │  |
|  │  ☑ Usar imagem do produto pai                      │  |
|  │                                                    │  |
|  └────────────────────────────────────────────────────┘  |
|                                                          |
|  ┌────────────────────────────────────────────────────┐  |
|  │  PREÇOS                                            │  |
|  │                                                    │  |
|  │  Preço de Venda *                                  │  |
|  │  [R$ 79,90                                         ]│  |
|  │  [> Herdado do produto pai: R$ 79,90              ]│  |
|  │                                                    │  |
|  │  Preço Promocional                                 │  |
|  │  [R$                                                 ]│  |
|  │                                                    │  |
|  │  Custo *                                           │  |
|  │  [R$ 35,00                                         ]│  |
|  │                                                    │  |
|  └────────────────────────────────────────────────────┘  |
|                                                          |
|  ┌────────────────────────────────────────────────────┐  |
|  │  ESTOQUE                                           │  |
|  │                                                    │  |
|  │  Quantidade em Estoque                             │  |
|  │  [32    ] unidades                                 │  |
|  │                                                    │  |
|  │  Estoque Mínimo                                    │  |
  │  │  [10    ] unidades                                 │  │
|  │  [> Alerta quando estoque ≤ mínimo                ]│  |
|  │                                                    │  |
|  │  Localização no Depósito                           │  |
|  │  [Prateleira A-12                                  ]│  |
|  │                                                    │  |
|  └────────────────────────────────────────────────────┘  |
|                                                          |
|  ┌────────────────────────────────────────────────────┐  |
|  │  STATUS                                            │  |
|  │                                                    │  |
|  │  ☑ Ativo                                           │  |
|  │  [> Desative para esconder da loja                ]│  |
|  │                                                    │  |
|  │  ☐ Destaque                                        │  |
|  │  [> Marcar como variação principal                ]│  |
|  │                                                    │  |
|  └────────────────────────────────────────────────────┘  |
|                                                          |
|       [Cancelar]              [Salvar Variação]          │
|                                                          |
+----------------------------------------------------------+
```

---

## 📱 Modal - Gerar Combinações

### Layout ASCII

```
+----------------------------------------------------------+
|  Gerar Combinações de Variações                    [✕]   |
+----------------------------------------------------------+
|                                                          |
|  Selecione os valores de cada atributo para criar as    │
|  combinações:                                            │
|                                                          |
|  ┌────────────────────────────────────────────────────┐  |
|  │  🎨 COR (selecione 1 ou mais)                      │  |
|  │                                                    │  |
|  │  ☑ Preto      ☑ Branco      ☑ Azul      ☑ Vermelho│  |
|  │                                                    │  |
|  │  [Selecionar Todas]  [Limpar Seleção]              │  |
|  │                                                    │  |
|  └────────────────────────────────────────────────────┘  |
|                                                          |
|  ┌────────────────────────────────────────────────────┐  |
|  │  📏 TAMANHO (selecione 1 ou mais)                  │  |
|  │                                                    │  |
|  │  ☑ P    ☑ M    ☑ G    ☑ GG    ☐ 2G               │  |
|  │                                                    │  |
|  │  [Selecionar Todas]  [Limpar Seleção]              │  |
|  │                                                    │  │
|  └────────────────────────────────────────────────────┘  │
|                                                          |
|  PREVIEW DAS VARIAÇÕES QUE SERÃO CRIADAS:                │
|                                                          |
|  ┌────────────────────────────────────────────────────┐  │
|  │  Variação          │ SKU Sugerido        │ Ação   │  │
|  │  ──────────────────────────────────────────────────│  │
|  │  Preto / P         │ CAM-BAS-001-PT-P    │ ✓ Novo │  │
|  │  Preto / M         │ CAM-BAS-001-PT-M    │ ✓ Novo │  │
|  │  Preto / G         │ CAM-BAS-001-PT-G    │ ✓ Novo │  │
|  │  ...               │ ...                 │ ...    │  │
|  │  Vermelho / GG     │ CAM-BAS-001-VM-GG   │ ✓ Novo │  │
|  │  ──────────────────────────────────────────────────│  │
|  │  Total: 16 novas variações                         │  │
|  └────────────────────────────────────────────────────┘  │
|                                                          │
|  OPÇÕES DE GERAÇÃO:                                      │
|                                                          │
|  ☑ Usar preço do produto pai para todas                  │
|  ☑ Gerar códigos de barras automaticamente               │
|  ☐ Copiar imagem do produto pai                          │
|                                                          │
|  [⚠️ Já existem 4 variações. Deseja manter ou substituir?]│
|                                                          │
|       [Cancelar]              [Gerar 16 Variações]       │
|                                                          │
+----------------------------------------------------------+
```

---

## 🔧 Componentes

### Card de Atributo
```html
<div class="bg-[#efefef] rounded-lg p-4">
  <div class="flex items-center justify-between mb-3">
    <div class="flex items-center gap-2">
      <span class="text-xl">🎨</span>
      <h4 class="font-semibold text-[#1f2937]">COR</h4>
    </div>
    <button class="text-[#ef4444] hover:bg-[#ef4444]/10 p-1 rounded">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </div>
  
  <div class="space-y-2">
    <div class="flex items-center gap-2 p-2 bg-white rounded">
      <div class="w-6 h-6 rounded-full border border-[#e5e7eb]" style="background: #000000;"></div>
      <span class="text-sm flex-1">Preto</span>
      <code class="text-xs text-[#627271]">#000000</code>
      <button class="text-[#627271] hover:text-[#ef4444]">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
    <div class="flex items-center gap-2 p-2 bg-white rounded">
      <div class="w-6 h-6 rounded-full border border-[#e5e7eb]" style="background: #FFFFFF;"></div>
      <span class="text-sm flex-1">Branco</span>
      <code class="text-xs text-[#627271]">#FFFFFF</code>
      <button class="text-[#627271] hover:text-[#ef4444]">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>
  
  <button class="mt-3 text-sm text-[#3e5653] hover:underline flex items-center gap-1">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
    </svg>
    Adicionar Cor
  </button>
</div>
```

### Linha da Matriz de Variações
```html
<tr class="border-b border-[#e5e7eb] hover:bg-[#efefef] transition-colors">
  <td class="py-3 px-4">
    <div class="flex items-center gap-2">
      <div class="flex items-center gap-1">
        <div class="w-4 h-4 rounded-full border" style="background: #000000;"></div>
        <span class="text-sm">Preto</span>
      </div>
      <span class="text-[#627271]">/</span>
      <span class="text-sm font-medium">M</span>
    </div>
  </td>
  <td class="py-3 px-4 font-mono text-sm">CAM-BAS-001-PT-M</td>
  <td class="py-3 px-4 font-mono text-sm">7891234567891</td>
  <td class="py-3 px-4">
    <span class="font-medium text-[#1f2937]">32</span>
    <span class="text-sm text-[#627271]">un</span>
  </td>
  <td class="py-3 px-4">R$ 79,90</td>
  <td class="py-3 px-4">
    <span class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-[#22c55e]/10 text-[#22c55e] rounded-full">
      <span class="w-1.5 h-1.5 rounded-full bg-[#22c55e]"></span>
      Em Estoque
    </span>
  </td>
  <td class="py-3 px-4">
    <div class="flex items-center gap-1">
      <button class="p-1.5 text-[#627271] hover:text-[#3e5653] hover:bg-[#e5e7eb] rounded" title="Editar">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
      </button>
      <button class="p-1.5 text-[#627271] hover:text-[#ef4444] hover:bg-[#ef4444]/10 rounded" title="Excluir">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
        </svg>
      </button>
    </div>
  </td>
</tr>
```

### Seletor de Cor
```html
<div class="flex items-center gap-2 p-2 bg-white rounded border border-[#e5e7eb]">
  <input 
    type="color" 
    value="#000000"
    class="w-8 h-8 rounded cursor-pointer border-0 p-0"
  />
  <input 
    type="text" 
    placeholder="Nome da cor"
    class="flex-1 text-sm border-0 focus:ring-0 p-0"
    value="Preto"
  />
  <input 
    type="text" 
    placeholder="#000000"
    class="w-20 text-sm font-mono border-0 focus:ring-0 p-0 text-[#627271]"
    value="#000000"
  />
  <button class="text-[#627271] hover:text-[#ef4444]">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
    </svg>
  </button>
</div>
```

---

## 📋 Formulários

### Estrutura de Dados

```typescript
interface ProductVariation {
  id: string;
  productId: string;
  sku: string;
  barcode: string;
  attributes: {
    [attributeName: string]: string;  // { "Cor": "Preto", "Tamanho": "M" }
  };
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  imageUrl?: string;
  isActive: boolean;
  isDefault: boolean;
  location?: string;
}

interface ProductAttribute {
  id: string;
  name: string;
  type: 'color' | 'size' | 'text' | 'number';
  values: AttributeValue[];
}

interface AttributeValue {
  id: string;
  value: string;
  colorCode?: string;  // Para tipo 'color'
  order: number;
}
```

---

## 📜 Regras de Negócio

### RN-EST-VAR-001 - SKU
- SKU deve ser único em todo o sistema
- Padrão sugerido: `{SKU-BASE}-{ATTR1}-{ATTR2}`
- Exemplo: `CAM-BAS-001-PT-M` (Camiseta Básica Preto M)
- Permite edição manual

### RN-EST-VAR-002 - Combinações
- Todas as combinações de atributos devem ser únicas
- Não permitir duplicatas de variações
- Máximo 100 variações por produto
- Máximo 3 atributos por produto

### RN-EST-VAR-003 - Estoque
- Estoque é por variação, não por produto
- Alerta de estoque baixo por variação
- Variação pode ter estoque 0 (esgotado)
- Todas as variações somam o estoque total do produto

### RN-EST-VAR-004 - Preços
- Preço pode ser igual ou diferente entre variações
- Se não informado, herda do produto pai
- Promoções aplicam-se por variação
- Variação inativa não aparece na loja

### RN-EST-VAR-005 - Imagens
- Cada variação pode ter imagem própria
- Se não tiver imagem, usa a do produto pai
- Troca de imagem ao selecionar cor (na loja)

### RN-EST-VAR-006 - Vendas
- Cliente deve selecionar todos os atributos
- Mostrar variações disponíveis (estoque > 0)
- Não permitir compra de variação sem estoque
- Carrinho armazena ID da variação

---

## 🎭 Estados

### Estado Sem Variações
```html
<div class="text-center py-12 bg-[#efefef] rounded-lg">
  <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-white flex items-center justify-center">
    <svg class="w-8 h-8 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
    </svg>
  </div>
  <h3 class="text-lg font-medium text-[#1f2937] mb-2">Nenhuma variação configurada</h3>
  <p class="text-sm text-[#627271] mb-4">Configure atributos e gere combinações</p>
  <button class="bg-[#3e5653] text-white px-4 py-2 rounded-lg">
    Configurar Variações
  </button>
</div>
```

### Estado Muitas Variações
```html
<div class="bg-[#f59e0b]/10 border border-[#f59e0b] rounded-lg p-4">
  <div class="flex items-start gap-3">
    <svg class="w-5 h-5 text-[#f59e0b] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
    </svg>
    <div>
      <h4 class="font-medium text-[#f59e0b]">Muitas variações</h4>
      <p class="text-sm text-[#f59e0b]/80">Você está tentando criar 256 variações. O máximo recomendado é 100.</p>
      <p class="text-sm text-[#627271] mt-1">Considere dividir este produto ou reduzir os atributos.</p>
    </div>
  </div>
</div>
```

---

## ✅ Checklist de Implementação

- [ ] Interface de configuração de atributos
- [ ] Gerador automático de combinações
- [ ] Matriz de variações com filtros
- [ ] Edição individual de variações
- [ ] Edição em massa de preços/estoque
- [ ] Upload de imagem por variação
- [ ] Geração automática de SKU
- [ ] Geração de códigos de barras
- [ ] Validação de unicidade
- [ ] Limites de variações
- [ ] Herança de dados do produto pai
- [ ] Integração com loja (troca de imagem)
- [ ] Exportação de variações
- [ ] Impressão de etiquetas por variação

---

## 📊 Exemplos de Uso

### Produtos Típicos com Variações

| Categoria | Atributo 1 | Atributo 2 | Atributo 3 |
|-----------|------------|------------|------------|
| Vestuário | Cor | Tamanho | - |
| Calçados | Cor | Tamanho | - |
| Eletrônicos | Cor | Capacidade | - |
| Móveis | Cor | Material | - |
| Alimentos | Sabor | Tamanho | - |

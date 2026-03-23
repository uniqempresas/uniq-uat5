# 📁 Módulo 05 - Estoque: Geração de Etiquetas

## Metadados
| Atributo | Valor |
|----------|-------|
| **Módulo** | Estoque |
| **Sub-módulo** | Etiquetas e Código de Barras |
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
$emerald: #86cb92;            // Ações primárias
$white: #ffffff;              // Superfície
$bordas: #e5e7eb;             // Bordas
$status-ok: #22c55e;          // Sucesso
$status-critico: #ef4444;     // Erro
```

### Tipografia
| Nível | Fonte | Tamanho | Peso | Uso |
|-------|-------|---------|------|-----|
| H1 | Inter | 24px | 700 | Título |
| H2 | Inter | 18px | 600 | Seções |
| H3 | Inter | 16px | 600 | Sub-seções |
| Body | Inter | 14px | 400 | Conteúdo |
| Code | Mono | 12px | 400 | Códigos de barras |

---

## 📱 Tela - Geração de Etiquetas

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
|                                    │ • Etiquetas       ←     │                                             |
|                                    │ • Entradas              │                                             |
|                                    └─────────────────────────┘                                             |
+----------------------------------------------------------------------------------------------------------+
|                                                                                                          |
|  Geração de Etiquetas                                                                                    |
|  Crie e imprima etiquetas com código de barras                                                           |
|                                                                                                          |
+----------------------------------------------------------------------------------------------------------+
|                                                                                                          |
|  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐   |
|  │  ETAPA 1: SELECIONAR PRODUTOS                                                                    │   |
|  │                                                                                                  │   |
|  │  Modo de Seleção:                                                                                │   |
|  │  (●) Por Produto    ( ) Por Categoria    ( ) Por Entrada    ( ) Importar Lista                   │   |
|  │                                                                                                  │   |
|  │  [🔍 Buscar produto...              ]  [Categoria: Todas ▼]  [Aplicar Filtros]                   │   |
|  │                                                                                                  │   |
|  │  ┌────────────────────────────────────────────────────────────────────────────────────────────┐ │   |
|  │  │  ☑    Imagem     Produto                    SKU        Estoque    Qtd Etiquetas    Ações   │ │   |
|  │  │  ───────────────────────────────────────────────────────────────────────────────────────── │ │   |
|  │  │  ☑   [📷]       iPhone 15 Pro Max          IP15PM     45 un     [  2    ]      [+][-]     │ │   |
|  │  │  ☑   [📷]       Samsung Galaxy S24         SG24      32 un     [  1    ]      [+][-]     │ │   |
|  │  │  ☐   [📷]       MacBook Air M3             MBA-M3    18 un     [  0    ]      [+][-]     │ │   |
|  │  │  ☑   [📷]       Mouse Logitech MX Master   MXM-3S    67 un     [  5    ]      [+][-]     │ │   |
|  │  │  ☐   [📷]       Teclado Mecânico Keychron  KCK8      23 un     [  0    ]      [+][-]     │ │   |
|  │  └────────────────────────────────────────────────────────────────────────────────────────────┘ │   |
|  │                                                                                                  │   |
|  │  Selecionados: 3 produtos  │  Total de etiquetas: 8                                               │   |
|  │                                                                                                  │   |
|  └──────────────────────────────────────────────────────────────────────────────────────────────────┘   |
|                                                                                                          |
|  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐   |
|  │  ETAPA 2: CONFIGURAR ETIQUETA                                                                    │   |
|  │                                                                                                  │   |
|  │  Template de Etiqueta:                                                                           │   |
|  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐                                │   |
|  │  │ ┌─────┐ │  │ ┌─────┐ │  │       │ │  │       │ │  │ ┌───┐   │                                │   |
|  │  │ │▓▓▓▓▓│ │  │ │▓▓▓▓▓│ │  │▓▓▓▓▓▓▓▓▓│ │  │ Nome  │ │  │ │▓▓▓│   │                                │   |
|  │  │ │▓▓▓▓▓│ │  │ │▓▓▓▓▓│ │  │▓▓▓▓▓▓▓▓▓│ │  │ Preço │ │  │ └───┘   │                                │   |
|  │  │ └──┬──┘ │  │ └──┬──┘ │  │   Nome  │ │  │ Código│ │  │  Padrão │                                │   |
|  │  │ Nome   │  │ Nome   │  │   Código│ │  │       │ │  │  Simples│                                │   |
|  │  │ Código │  │ Preço  │  │ └───────┘ │  │ ┌───┐ │ │  │         │                                │   |
|  │  │        │  │ Código │  │  Térmica │  │ │▓▓▓│ │ │  │         │                                │   |
|  │  │ Padrão │  │        │  │  Contínua│  │ └───┘ │ │  │         │                                │   |
|  │  │ 40x30  │  │ 60x40  │  │  40x25  │  │ Preço │ │  │  30x20  │                                │   |
|  │  │  ◉    │  │   ○    │  │   ○     │  │  ○    │ │  │   ○     │                                │   |
|  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────┘                                │   |
|  │                                                                                                  │   |
|  │  Informações a Imprimir:                                                                         │   |
|  │  ☑ Código de Barras (EAN-13)    ☑ Nome do Produto    ☑ SKU    ☑ Preço                          │   |
|  │  ☑ Código Interno               ☐ Descrição Curta    ☐ Logo da Loja    ☐ Data                    │   |
|  │                                                                                                  │   |
|  │  Formato do Código:                                                                              │   |
|  │  (●) EAN-13    ( ) CODE128    ( ) QR Code    ( ) Apenas Número                                   │   |
|  │                                                                                                  │   |
|  └──────────────────────────────────────────────────────────────────────────────────────────────────┘   |
|                                                                                                          |
|  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐   |
|  │  ETAPA 3: PRÉVIA E IMPRESSÃO                                                                     │   |
|  │                                                                                                  │   |
|  │  Configurações da Impressora:                                                                    │   |
|  │  Impressora: [Zebra ZD420                    ▼]  [⚙️ Configurar]                                 │   |
|  │  Tipo: Térmica    Porta: USB    Status: 🟢 Pronta                                                │   |
|  │                                                                                                  │   |
|  │  [🖨️ Imprimir]    [💾 Salvar PDF]    [📤 Exportar]    [👁 Prévia]                                │   |
|  │                                                                                                  │   |
|  └──────────────────────────────────────────────────────────────────────────────────────────────────┘   |
|                                                                                                          |
+----------------------------------------------------------------------------------------------------------+
```

---

## 📱 Modal - Prévia de Etiquetas

### Layout ASCII

```
+----------------------------------------------------------------------------------------------------------+
|  Prévia de Etiquetas                                       [💾 PDF]  [🖨️ Imprimir]  [✕]                 |
+----------------------------------------------------------------------------------------------------------+
|                                                                                                          |
|  Zoom: [-] 100% [+]    Orientação: (●) Retrato  ( ) Paisagem    Mostrar cortes: ☑                      |
|                                                                                                          |
|  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐   |
|  │                                                                                                  │   |
|  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │   |
|  │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │       │   |
|  │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │       │   |
|  │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │       │   |
|  │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │       │   |
|  │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │       │   |
|  │  │ 789123456789 │  │ 789123456790 │  │ 789123456789 │  │ 789123456789 │  │ 789123456789 │       │   |
|  │  │              │  │              │  │              │  │              │  │              │       │   |
|  │  │ iPhone 15    │  │ iPhone 15    │  │ Samsung S24  │  │ Samsung S24  │  │ Mouse MX     │       │   |
|  │  │ Pro Max      │  │ Pro Max      │  │              │  │              │  │ Master       │       │   |
|  │  │              │  │              │  │              │  │              │  │              │       │   |
|  │  │ SKU: IP15PM  │  │ SKU: IP15PM  │  │ SKU: SG24    │  │ SKU: SG24    │  │ SKU: MXM-3S  │       │   |
|  │  │              │  │              │  │              │  │              │  │              │       │   |
|  │  │ R$ 8.999,00  │  │ R$ 8.999,00  │  │ R$ 5.499,00  │  │ R$ 5.499,00  │  │ R$ 499,00    │       │   |
|  │  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘       │   |
|  │                                                                                                  │   |
|  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │   |
|  │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │              │  │              │       │   |
|  │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │              │  │              │       │   |
|  │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │              │  │              │       │   |
|  │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │              │  │              │       │   |
|  │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │ ▓▓▓▓▓▓▓▓▓▓▓▓ │  │              │  │              │       │   |
|  │  │ 789123456791 │  │ 789123456791 │  │ 789123456792 │  │              │  │              │       │   |
|  │  │              │  │              │  │              │  │              │  │              │       │   |
|  │  │ Mouse MX     │  │ Mouse MX     │  │ Mouse MX     │  │              │  │              │       │   |
|  │  │ Master       │  │ Master       │  │ Master       │  │              │  │              │       │   |
|  │  │              │  │              │  │              │  │              │  │              │       │   |
|  │  │ SKU: MXM-3S  │  │ SKU: MXM-3S  │  │ SKU: MXM-3S  │  │              │  │              │       │   |
|  │  │              │  │              │  │              │  │              │  │              │       │   |
|  │  │ R$ 499,00    │  │ R$ 499,00    │  │ R$ 499,00    │  │              │  │              │       │   |
|  │  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘       │   |
|  │                                                                                                  │   |
|  │                                              ...                                                 │   |
|  │                                                                                                  │   |
|  └──────────────────────────────────────────────────────────────────────────────────────────────────┘   |
|                                                                                                          |
|  Página 1 de 2    │    Total: 8 etiquetas    │    Tamanho: 40mm x 30mm                                 |
|                                                                                                          |
+----------------------------------------------------------------------------------------------------------+
```

---

## 📱 Modal - Configurar Impressora

### Layout ASCII

```
+----------------------------------------------------------+
|  Configurar Impressora                             [✕]   |
+----------------------------------------------------------+
|                                                          |
|  Impressora:                                             |
|  [Zebra ZD420                                      ▼]   |
|                                                          |
|  ┌────────────────────────────────────────────────────┐  |
|  │  DRIVER E CONEXÃO                                  │  |
|  │                                                    │  |
|  │  Tipo: (●) Térmica Direta    ( ) Térmica Transfer │  |
|  │                                                    │  |
|  │  Conexão: (●) USB    ( ) Ethernet    ( ) Serial   │  |
|  │  Porta: [USB001                                 ▼]  │  |
|  │                                                    │  |
|  │  [🔄 Testar Conexão]                               │  |
|  │  🟢 Conectado - Pronto para impressão              │  |
|  │                                                    │  |
|  └────────────────────────────────────────────────────┘  |
|                                                          |
|  ┌────────────────────────────────────────────────────┐  |
|  │  CONFIGURAÇÕES DE IMPRESSÃO                        │  |
|  │                                                    │  |
|  │  Largura da Etiqueta:                              │  |
|  │  [40    ] mm                                       │  |
|  │                                                    │  |
|  │  Altura da Etiqueta:                               │  |
|  │  [30    ] mm                                       │  |
|  │                                                    │  |
|  │  Espaçamento:                                      │  |
|  │  [2     ] mm                                       │  |
|  │                                                    │  |
|  │  Margem Esquerda:                                  │  |
|  │  [0     ] mm                                       │  |
|  │                                                    │  |
|  │  Velocidade:                                       │  |
|  │  [Média (4 ips)                              ▼]   │  |
|  │                                                    │  |
|  │  Escuridão:                                        │  |
|  │  [|||||●|||||                    ]                 │  |
|  │  Leve                    Escuro                    │  |
|  │                                                    │  |
|  └────────────────────────────────────────────────────┘  |
|                                                          |
|  ┌────────────────────────────────────────────────────┐  |
|  │  CONFIGURAÇÕES AVANÇADAS                           │  |
|  │                                                    │  |
|  │  ☑ Cortar etiquetas após impressão                 │  |
|  │  ☑ Retroceder mídia                                │  |
|  │  ☐ Imprimir em modo espelho                        │  |
|  │                                                    │  |
|  │  Formato de Comando:                               │  |
|  │  [ZPL (Zebra Programming Language)           ▼]   │  |
|  │                                                    │  |
|  └────────────────────────────────────────────────────┘  |
|                                                          |
|  [🔄 Restaurar Padrão]        [Cancelar]  [Salvar Config]│
|                                                          |
+----------------------------------------------------------+
```

---

## 🔧 Componentes

### Card de Template
```html
<div class="relative group cursor-pointer">
  <div class="border-2 border-[#86cb92] rounded-lg p-4 bg-white hover:shadow-lg transition-all">
    <!-- Visualização da Etiqueta -->
    <div class="w-full aspect-[4/3] bg-white border border-[#e5e7eb] rounded mb-3 p-2 flex flex-col items-center justify-center">
      <div class="w-full h-8 bg-[#1f2937] mb-2 rounded-sm"></div>
      <div class="text-xs text-[#627271]">789123456789</div>
      <div class="text-[10px] text-[#1f2937] mt-1 font-medium">Produto</div>
      <div class="text-[10px] text-[#627271]">R$ 99,99</div>
    </div>
    <p class="text-sm font-medium text-center text-[#1f2937]">Padrão 40x30</p>
    <p class="text-xs text-center text-[#627271]">40mm × 30mm</p>
  </div>
  <!-- Indicador de Seleção -->
  <div class="absolute -top-2 -right-2 w-6 h-6 bg-[#86cb92] rounded-full flex items-center justify-center">
    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
    </svg>
  </div>
</div>
```

### Linha de Produto para Seleção
```html
<div class="flex items-center gap-4 p-3 hover:bg-[#efefef] rounded-lg transition-colors border-b border-[#e5e7eb] last:border-0">
  <input type="checkbox" checked class="w-5 h-5 text-[#86cb92] rounded focus:ring-[#86cb92]"/>
  <div class="w-12 h-12 rounded-lg bg-[#efefef] flex items-center justify-center flex-shrink-0">
    <img src="/product-thumb.jpg" class="w-10 h-10 object-contain" alt=""/>
  </div>
  <div class="flex-1 min-w-0">
    <p class="font-medium text-[#1f2937] truncate">iPhone 15 Pro Max 256GB Titânio Natural</p>
    <p class="text-sm text-[#627271]">SKU: IP15PM-256-TN</p>
  </div>
  <div class="text-sm text-[#627271]">
    <span class="font-medium text-[#1f2937]">45</span> un em estoque
  </div>
  <div class="flex items-center gap-2">
    <button class="w-8 h-8 rounded-lg border border-[#e5e7eb] flex items-center justify-center hover:bg-[#efefef]">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg>
    </button>
    <input type="number" value="2" min="0" class="w-16 text-center border border-[#e5e7eb] rounded-lg py-1"/>
    <button class="w-8 h-8 rounded-lg border border-[#e5e7eb] flex items-center justify-center hover:bg-[#efefef]">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
    </button>
  </div>
</div>
```

### Prévia de Código de Barras
```html
<div class="bg-white border border-[#e5e7eb] rounded-lg p-4 text-center">
  <svg class="w-full h-16" viewBox="0 0 200 50">
    <!-- Barras do código EAN-13 -->
    <rect x="10" y="5" width="2" height="40" fill="#1f2937"/>
    <rect x="14" y="5" width="1" height="40" fill="#1f2937"/>
    <rect x="18" y="5" width="3" height="40" fill="#1f2937"/>
    <!-- ... mais barras ... -->
  </svg>
  <p class="text-xs text-[#627271] mt-2 tracking-widest">7 891234 567890</p>
</div>
```

---

## 📋 Configurações

### Templates de Etiqueta

| Nome | Dimensões | Uso | Código de Barras |
|------|-----------|-----|------------------|
| Padrão | 40mm × 30mm | Geral | Sim |
| Grande | 60mm × 40mm | Produtos volumosos | Sim |
| Térmica Contínua | 40mm × 25mm | Rolos térmicos | Sim |
| Simples | 30mm × 20mm | Preços | Não |
| Joia | 25mm × 15mm | Pequenos itens | Sim (compacto) |

### Formatos de Código de Barras

| Formato | Dígitos | Uso | Exemplo |
|---------|---------|-----|---------|
| EAN-13 | 13 | Produtos de varejo | 7891234567890 |
| CODE128 | Variável | Logística, interno | UNIQ2024 |
| QR Code | Variável | Informações extensas | [QR] |
| UPC-A | 12 | Importados EUA | 012345678905 |

---

## 📜 Regras de Negócio

### RN-EST-ETQ-001 - Código EAN-13
- Prefixo brasileiro: 789
- Auto-gerado se não informado
- Validação de dígito verificador
- Não permite duplicatas

### RN-EST-ETQ-002 - Geração em Massa
- Limite de 500 etiquetas por vez
- Fila de impressão para grandes volumes
- Geração em background com notificação

### RN-EST-ETQ-003 - Impressoras
- Suporte nativo Zebra (ZPL)
- Suporte EPSON (ESC/POS)
- Impressoras térmicas genéricas
- Exportação PDF para impressoras comuns

### RN-EST-ETQ-004 - Preços
- Usar preço atual do produto
- Opção de preço promocional
- Formatação: R$ 9.999,99
- Sempre 2 casas decimais

### RN-EST-ETQ-005 - Estoque
- Não permite gerar etiquetas para produtos sem estoque
- Alerta se estoque abaixo da quantidade solicitada
- Atualização automática após impressão (opcional)

---

## 🎭 Estados

### Estado Imprimindo
```html
<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div class="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
    <div class="text-center">
      <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-[#86cb92]/20 flex items-center justify-center">
        <svg class="w-8 h-8 text-[#86cb92] animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-[#1f2937]">Imprimindo...</h3>
      <p class="text-sm text-[#627271] mt-1">Etiqueta 3 de 8</p>
      <div class="mt-4 h-2 bg-[#efefef] rounded-full overflow-hidden">
        <div class="h-full bg-[#86cb92] rounded-full transition-all" style="width: 37%"></div>
      </div>
    </div>
  </div>
</div>
```

### Estado Erro de Impressão
```html
<div class="bg-[#ef4444]/10 border border-[#ef4444] rounded-lg p-4">
  <div class="flex items-start gap-3">
    <svg class="w-5 h-5 text-[#ef4444] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
    <div>
      <h4 class="font-medium text-[#ef4444]">Erro de impressão</h4>
      <p class="text-sm text-[#ef4444]/80">Impressora desconectada ou sem papel.</p>
      <div class="mt-2 flex gap-2">
        <button class="text-sm text-[#ef4444] underline">Tentar novamente</button>
        <button class="text-sm text-[#627271]">Salvar PDF</button>
      </div>
    </div>
  </div>
</div>
```

---

## ✅ Checklist de Implementação

- [ ] Rota `/estoque/etiquetas` criada
- [ ] Seleção de produtos por múltiplos critérios
- [ ] Quantidade configurável por produto
- [ ] Templates visuais de etiquetas
- [ ] Preview em tempo real
- [ ] Suporte a múltiplos formatos de código de barras
- [ ] Configuração de impressora térmica
- [ ] Geração de PDF
- [ ] Impressão direta (browser/serial)
- [ ] Validação de EAN-13
- [ ] Limites de impressão em massa
- [ ] Fila de processamento
- [ ] Histórico de impressões

---

## 🔌 Integrações de Impressão

### Impressoras Térmicas (USB/Serial)
```javascript
// Web Serial API para comunicação direta
async function printZPL(zplCode) {
  const port = await navigator.serial.requestPort();
  await port.open({ baudRate: 9600 });
  const writer = port.writable.getWriter();
  await writer.write(new TextEncoder().encode(zplCode));
  writer.releaseLock();
}
```

### Geração ZPL (Zebra)
```zpl
^XA
^FO50,50^BY3^BCN,100,Y,N,N^FD789123456789^FS
^FO50,160^A0N,30,30^FDiPhone 15 Pro Max^FS
^FO50,200^A0N,20,20^FDSKU: IP15PM-256-TN^FS
^FO50,230^A0N,25,25^FDR$ 8.999,00^FS
^XZ
```

### Geração PDF
- Biblioteca: jsPDF + bwip-js (códigos de barras)
- Formato: A4 com múltiplas etiquetas por página
- Margens configuráveis
- Marcas de corte opcionais

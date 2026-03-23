# 📁 Módulo 05 - Estoque: Entrada em Massa

## Metadados
| Atributo | Valor |
|----------|-------|
| **Módulo** | Estoque |
| **Sub-módulo** | Entrada em Massa |
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
$emerald: #86cb92;            // Sucesso, validado
$white: #ffffff;              // Superfície
$status-ok: #22c55e;          // Válido
$status-baixo: #f59e0b;       // Atenção
$status-critico: #ef4444;     // Erro
$bordas: #e5e7eb;             // Bordas
$info: #3b82f6;               // Info
```

---

## 📱 Tela - Entrada em Massa (Wizard)

### Layout ASCII - Etapa 1: Upload

```
+----------------------------------------------------------------------------------------------------------+
|  [LOGO]  UNIQ Empresas                                          [🔍] [🌙] [👤 Admin ▼]                  |
+----------------------------------------------------------------------------------------------------------+
|                                                                                                          |
|  [🏠] Dashboard    [📦] Estoque    [💰] Financeiro    [👥] CRM    [🛒] Loja    [📅] Agendamentos        |
+----------------------------------------------------------------------------------------------------------+
|                                                                                                          |
|  Entrada em Massa                                                                                        |
|  Importe produtos via planilha para atualizar estoque                                                    |
|                                                                                                          |
+----------------------------------------------------------------------------------------------------------+
|                                                                                                          |
|  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐   |
|  │  PROGRESSO DO PROCESSO                                                                           │   |
|  │                                                                                                  │   |
|  │  ●───◯───◯───◯                                                                                   │   |
|  │  1      2      3      4                                                                          │   |
|  │ Upload Valida Preview Confirma                                                                   │   |
|  │                                                                                                  │   |
|  └──────────────────────────────────────────────────────────────────────────────────────────────────┘   |
|                                                                                                          |
|  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐   |
|  │  ETAPA 1: UPLOAD DO ARQUIVO                                                                      │   |
|  │                                                                                                  │   |
|  │  ┌───────────────────────────────────────────────────────────────────────────────────────────┐  │   |
|  │  │                                                                                           │  │   |
|  │  │                    ┌─────────────────┐                                                  │  │   |
|  │  │                    │                 │                                                  │  │   |
|  │  │                    │    [📁]         │                                                  │  │   |
|  │  │                    │                 │                                                  │  │   |
|  │  │                    │  Arraste seu    │                                                  │  │   |
|  │  │                    │  arquivo aqui   │                                                  │  │   |
|  │  │                    │                 │                                                  │  │   |
|  │  │                    │  ou clique para │                                                  │  │   |
|  │  │                    │  selecionar     │                                                  │  │   |
|  │  │                    │                 │                                                  │  │   |
|  │  │                    └─────────────────┘                                                  │  │   |
|  │  │                                                                                           │  │   |
|  │  │  Formatos aceitos: CSV, XLS, XLSX    Tamanho máximo: 10MB                                 │  │   |
|  │  │                                                                                           │  │   |
|  │  └───────────────────────────────────────────────────────────────────────────────────────────┘  │   |
|  │                                                                                                  │   |
|  │  ┌───────────────────────────────────────────────────────────────────────────────────────────┐  │   |
|  │  │  ARQUIVO SELECIONADO                                                                      │  │   |
|  │  │  📄 entrada_estoque_marco2026.xlsx                  2.4 MB    [✕ Remover]                 │  │   |
|  │  │  ✅ 1.247 linhas detectadas                                                               │  │   |
|  │  └───────────────────────────────────────────────────────────────────────────────────────────┘  │   |
|  │                                                                                                  │   |
|  │  ┌───────────────────────────────────────────────────────────────────────────────────────────┐  │   |
|  │  │  MAPEAMENTO DE COLUNAS                                                                    │  │   |
|  │  │                                                                                           │  │   |
|  │  │  Coluna do Arquivo → Campo do Sistema         Preview (Linha 1)                           │  │   |
|  │  │  ────────────────────────────────────────────────────────────────                          │  │   |
|  │  │  Coluna A          → Código/SKU           │  IP15PM-256-TN        [✓]                     │  │   |
|  │  │  Coluna B          → Quantidade           │  50                   [✓]                     │  │   |
|  │  │  Coluna C          → Preço de Custo       │  7.500,00             [✓]                     │  │   |
|  │  │  Coluna D          → Número da NF         │  4521                 [✓]                     │  │   |
|  │  │  Coluna E          → Data de Entrada      │  10/03/2026           [✓]                     │  │   |
|  │  │  Coluna F          → [Ignorar ▼]          │  Fornecedor XYZ       [○]                     │  │   |
|  │  │                                                                                           │  │   |
|  │  │  [+ Adicionar Mapeamento]                                                                 │  │   |
|  │  └───────────────────────────────────────────────────────────────────────────────────────────┘  │   |
|  │                                                                                                  │   |
|  │  [📥 Baixar Modelo]                                              [Validar Arquivo →]            │   |
|  │                                                                                                  │   |
|  └──────────────────────────────────────────────────────────────────────────────────────────────────┘   |
|                                                                                                          |
|  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐   |
|  │  DICAS E INSTRUÇÕES                                                                              │   |
|  │                                                                                                  │   |
|  │  • Código/SKU é obrigatório e deve existir no cadastro de produtos                               │   |
|  │  • Quantidade deve ser um número positivo                                                        │   |
|  │  • Data aceita formatos: DD/MM/AAAA, AAAA-MM-DD                                                  │   |
|  │  • Use ponto ou vírgula para decimais no preço                                                   │   |
|  │  • Produtos novos serão identificados e listados para criação                                    │   |
|  │                                                                                                  │   |
|  └──────────────────────────────────────────────────────────────────────────────────────────────────┘   |
|                                                                                                          |
+----------------------------------------------------------------------------------------------------------+
```

---

### Layout ASCII - Etapa 2: Validação

```
+----------------------------------------------------------------------------------------------------------+
|  ...                                                                                                     |
|  ●───●───◯───◯                                                                                           |
|  1      2      3      4                                                                                  |
| Upload Valida Preview Confirma                                                                           |
+----------------------------------------------------------------------------------------------------------+
|                                                                                                          |
|  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐   |
|  │  ETAPA 2: VALIDAÇÃO                                                                              │   |
|  │                                                                                                  │   |
|  │  Resumo da Validação:                                                                            │   |
|  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                              │   |
|  │  │             │  │             │  │             │  │             │                              │   |
|  │  │   1.180    │  │     45     │  │     22     │  │     0      │                              │   |
|  │  │             │  │             │  │             │  │             │                              │   |
|  │  │   Válidos  │  │ Atenção    │  │   Novos    │  │   Erros    │                              │   |
|  │  │   ✓        │  │    ⚠️      │  │    🆕      │  │   ✗        │                              │   |
|  │  │             │  │             │  │             │  │             │                              │   |
|  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘                              │   |
|  │                                                                                                  │   |
|  │  ─────────────────────────────────────────────────────────────────────────────────────────────  │   |
|  │                                                                                                  │   |
|  │  FILTROS: [Todos ▼]  [🔍 Buscar SKU...            ]                                              │   |
|  │                                                                                                  │   |
|  │  Linha │ SKU           │ Nome                    │ Qtd  │ Custo      │ Status     │ Ação        │   |
|  │  ─────────────────────────────────────────────────────────────────────────────────────────────  │   |
|  │  1     │ IP15PM-256    │ iPhone 15 Pro Max 256GB │ 50   │ R$ 7.500   │ ✓ Válido   │ [👁]        │   |
|  │  2     │ SG24-128      │ Galaxy S24 128GB        │ 30   │ R$ 4.200   │ ✓ Válido   │ [👁]        │   |
|  │  3     │ MXM3S         │ Mouse MX Master 3S      │ 100  │ R$ 380     │ ✓ Válido   │ [👁]        │   |
|  │  45    │ PROD-NOVO-001 │ NOVO: Smart TV 55"      │ 10   │ R$ 2.800   │ 🆕 Novo    │ [✏️ Criar]  │   |
|  │  46    │ PROD-novo-002 │ NOVO: Soundbar LG       │ 15   │ R$ 1.200   │ 🆕 Novo    │ [✏️ Criar]  │   |
|  │  89    │ IP15PM-256    │ iPhone 15 Pro Max       │ -5   │ R$ 7.500   │ ⚠️ Inválido│ [!] Qtd < 0 │   |
|  │  90    │ XYZ-123       │ PRODUTO NÃO ENCONTRADO  │ 20   │ R$ 500     │ ✗ Erro     │ [🔍 Buscar] │   |
|  │  ...   │ ...           │ ...                     │ ...  │ ...        │ ...        │ ...         │   |
|  │                                                                                                  │   |
|  │  Mostrando 1-20 de 1.247 resultados                                                              │   |
|  │                                                                                                  │   |
|  │  [⬅️ Voltar e Corrigir]                                          [Continuar →]                   │   |
|  │                                                                                                  │   |
|  └──────────────────────────────────────────────────────────────────────────────────────────────────┘   |
|                                                                                                          |
+----------------------------------------------------------------------------------------------------------+
```

---

### Layout ASCII - Etapa 3: Preview

```
+----------------------------------------------------------------------------------------------------------+
|  ...                                                                                                     |
|  ●───●───●───◯                                                                                           |
|  1      2      3      4                                                                                  |
| Upload Valida Preview Confirma                                                                           |
+----------------------------------------------------------------------------------------------------------+
|                                                                                                          |
|  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐   |
|  │  ETAPA 3: PREVIEW DAS MUDANÇAS                                                                   │   |
|  │                                                                                                  │   |
|  │  Esta operação irá:                                                                              │   |
|  │                                                                                                  │   |
|  │  • Criar 22 novos produtos                                                                       │   |
|  │  • Atualizar estoque de 1.180 produtos existentes                                                │   |
|  │  • Registrar entrada com valor total de R$ 1.245.890,00                                          │   |
|  │  • Gerar movimentações de estoque para auditoria                                                 │   |
|  │                                                                                                  │   |
|  │  ─────────────────────────────────────────────────────────────────────────────────────────────  │   |
|  │                                                                                                  │   |
|  │  IMPACTO NO ESTOQUE (Top 10 por Valor)                                                           │   |
|  │                                                                                                  │   |
|  │  Produto                    Est. Atual  Entrada  Est. Final  Custo Unit.  Valor Total            │   |
|  │  ─────────────────────────────────────────────────────────────────────────────────────────────  │   |
|  │  iPhone 15 Pro Max 256GB      45        +50       95         R$ 7.500     R$ 375.000,00          │   |
|  │  MacBook Air M3              12        +25       37         R$ 8.900     R$ 222.500,00          │   |
|  │  Galaxy S24 Ultra            23        +30       53         R$ 6.200     R$ 186.000,00          │   |
|  │  ...                         ...       ...       ...        ...          ...                    │   |
|  │                                                                                                  │   |
|  │  ─────────────────────────────────────────────────────────────────────────────────────────────  │   |
|  │                                                                                                  │   |
|  │  CONFIGURAÇÕES ADICIONAIS:                                                                       │   |
|  │                                                                                                  │   |
|  │  ☑ Gerar etiquetas para produtos novos                                                           │   |
|  │  ☑ Atualizar preço de venda baseado na margem                                                    │   |
|  │     Margem padrão: [30    ] %                                                                    │   |
|  │  ☐ Enviar notificação ao gestor                                                                  │   |
|  │  ☑ Registrar NF de entrada                                                                       │   |
|  │     Número NF: [4521    ]                                                                        │   |
|  │                                                                                                  │   |
|  │  [⬅️ Voltar]                                                     [Confirmar Entrada →]            │   |
|  │                                                                                                  │   |
|  └──────────────────────────────────────────────────────────────────────────────────────────────────┘   |
|                                                                                                          |
+----------------------------------------------------------------------------------------------------------+
```

---

### Layout ASCII - Etapa 4: Confirmação/Processando

```
+----------------------------------------------------------------------------------------------------------+
|  ...                                                                                                     |
|  ●───●───●───●                                                                                           |
|  1      2      3      4                                                                                  |
| Upload Valida Preview Confirma                                                                           |
+----------------------------------------------------------------------------------------------------------+
|                                                                                                          |
|  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐   |
|  │                                                                                                  │   |
|  │                              ✅ PROCESSAMENTO CONCLUÍDO                                          │   |
|  │                                                                                                  │   |
|  │  ┌───────────────────────────────────────────────────────────────────────────────────────────┐  │   |
|  │  │                                                                                           │  │   |
|  │  │                    ┌─────────┐                                                          │  │   |
|  │  │                    │   ✅    │                                                          │  │   |
|  │  │                    │         │                                                          │  │   |
|  │  │                    └─────────┘                                                          │  │   |
|  │  │                                                                                           │  │   |
|  │  │              1.180 produtos atualizados com sucesso                                       │  │   |
|  │  │                 22 produtos criados com sucesso                                           │  │   |
|  │  │                                                                                           │  │   |
|  │  │              Valor total movimentado: R$ 1.245.890,00                                     │  │   |
|  │  │              Nota Fiscal: #4521                                                           │  │   |
|  │  │              Data: 12/03/2026 14:35                                                       │  │   |
|  │  │                                                                                           │  │   |
|  │  │                    [📄 Comprovante]  [📧 Email]  [🖨️ Imprimir]                             │  │   |
|  │  │                                                                                           │  │   |
|  │  └───────────────────────────────────────────────────────────────────────────────────────────┘  │   |
|  │                                                                                                  │   |
|  │  DETALHES DO PROCESSAMENTO:                                                                      │   |
|  │                                                                                                  │   |
|  │  ┌──────────────────────────┐  ┌──────────────────────────┐  ┌──────────────────────────┐       │   |
|  │  │ PRODUTOS ATUALIZADOS     │  │ PRODUTOS CRIADOS         │  │ ETIQUETAS GERADAS        │       │   |
|  │  │                          │  │                          │  │                          │       │   |
|  │  │ 1.180 itens              │  │ 22 itens                 │  │ 1.202 etiquetas          │       │   |
|  │  │                          │  │                          │  │                          │       │   |
|  │  │ [📋 Ver Lista]           │  │ [📋 Ver Lista]           │  │ [🖨️ Imprimir]            │       │   |
|  │  └──────────────────────────┘  └──────────────────────────┘  └──────────────────────────┘       │   |
|  │                                                                                                  │   |
|  │                                                    [🔄 Nova Entrada]  [📦 Ver Estoque]           │   |
|  │                                                                                                  │   |
|  └──────────────────────────────────────────────────────────────────────────────────────────────────┘   |
|                                                                                                          |
+----------------------------------------------------------------------------------------------------------+
```

---

## 🔧 Componentes

### Área de Upload
```html
<div class="border-2 border-dashed border-[#e5e7eb] rounded-lg p-12 text-center hover:border-[#86cb92] hover:bg-[#86cb92]/5 transition-all cursor-pointer">
  <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-[#efefef] flex items-center justify-center">
    <svg class="w-8 h-8 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
    </svg>
  </div>
  <p class="text-lg font-medium text-[#1f2937] mb-1">Arraste seu arquivo aqui</p>
  <p class="text-sm text-[#627271] mb-4">ou clique para selecionar</p>
  <p class="text-xs text-[#627271]">CSV, XLS, XLSX até 10MB</p>
  <input type="file" accept=".csv,.xls,.xlsx" class="hidden"/>
</div>
```

### Indicador de Progresso
```html
<div class="flex items-center justify-center gap-2">
  <!-- Passo 1 - Completo -->
  <div class="flex items-center gap-2">
    <div class="w-8 h-8 rounded-full bg-[#86cb92] flex items-center justify-center text-white text-sm font-medium">✓</div>
    <span class="text-sm font-medium text-[#86cb92]">Upload</span>
  </div>
  <div class="w-12 h-0.5 bg-[#86cb92]"></div>
  
  <!-- Passo 2 - Ativo -->
  <div class="flex items-center gap-2">
    <div class="w-8 h-8 rounded-full bg-[#3e5653] flex items-center justify-center text-white text-sm font-medium">2</div>
    <span class="text-sm font-medium text-[#3e5653]">Valida</span>
  </div>
  <div class="w-12 h-0.5 bg-[#e5e7eb]"></div>
  
  <!-- Passo 3 - Pendente -->
  <div class="flex items-center gap-2">
    <div class="w-8 h-8 rounded-full bg-[#e5e7eb] flex items-center justify-center text-[#627271] text-sm font-medium">3</div>
    <span class="text-sm text-[#627271]">Preview</span>
  </div>
  <div class="w-12 h-0.5 bg-[#e5e7eb]"></div>
  
  <!-- Passo 4 - Pendente -->
  <div class="flex items-center gap-2">
    <div class="w-8 h-8 rounded-full bg-[#e5e7eb] flex items-center justify-center text-[#627271] text-sm font-medium">4</div>
    <span class="text-sm text-[#627271]">Confirma</span>
  </div>
</div>
```

### Card de Resumo
```html
<div class="bg-[#efefef] rounded-lg p-6 text-center">
  <div class="text-3xl font-bold text-[#1f2937]">1.180</div>
  <div class="text-sm text-[#627271] mt-1">Válidos</div>
  <div class="w-10 h-10 mx-auto mt-3 rounded-full bg-[#22c55e]/20 flex items-center justify-center">
    <svg class="w-5 h-5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
    </svg>
  </div>
</div>
```

### Linha de Validação
```html
<tr class="border-b border-[#e5e7eb] hover:bg-[#efefef]">
  <td class="py-3 px-4">1</td>
  <td class="py-3 px-4 font-mono text-sm">IP15PM-256</td>
  <td class="py-3 px-4">iPhone 15 Pro Max 256GB</td>
  <td class="py-3 px-4 text-center">50</td>
  <td class="py-3 px-4">R$ 7.500,00</td>
  <td class="py-3 px-4">
    <span class="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-[#22c55e]/10 text-[#22c55e] rounded-full">
      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
      Válido
    </span>
  </td>
  <td class="py-3 px-4">
    <button class="p-1 text-[#627271] hover:text-[#3e5653]">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
    </button>
  </td>
</tr>
```

---

## 📋 Estrutura do Arquivo Modelo

### CSV Modelo
```csv
sku,quantidade,preco_custo,numero_nf,data_entrada,nome_produto
IP15PM-256,50,7500.00,4521,10/03/2026,iPhone 15 Pro Max 256GB
SG24-128,30,4200.00,4521,10/03/2026,Galaxy S24 128GB
MXM3S,100,380.00,4521,10/03/2026,Mouse MX Master 3S
```

### Validações por Campo

| Campo | Tipo | Obrigatório | Validação | Ação se Inválido |
|-------|------|-------------|-----------|------------------|
| SKU | String | Sim | Existe no sistema | Marcar como novo |
| quantidade | Number | Sim | > 0 | Erro |
| preco_custo | Decimal | Sim | >= 0 | Erro |
| numero_nf | String | Não | - | Aviso |
| data_entrada | Date | Não | Data válida | Usar data atual |
| nome_produto | String | Se SKU novo | - | Usar SKU como nome |

---

## 📜 Regras de Negócio

### RN-EST-MASS-001 - Identificação de Produtos
- SKU existente → Atualiza estoque
- SKU não existe → Cria como produto novo
- SKU duplicado no arquivo → Soma quantidades

### RN-EST-MASS-002 - Validações
- Quantidade deve ser número inteiro positivo
- Preço de custo >= 0
- Data não pode ser futura
- Limite: 10.000 linhas por arquivo

### RN-EST-MASS-003 - Criação de Produtos
- Produtos novos criam alerta para completar cadastro
- Categoria padrão: "Sem categoria"
- Status: Ativo
- Tipo: Simples
- Preço de venda calculado pela margem

### RN-EST-MASS-004 - Auditoria
- Todas as entradas registram movimentação
- NF de entrada vinculada (se informada)
- Usuário responsável logado
- Data/hora do processamento

### RN-EST-MASS-005 - Rollback
- Possível cancelar até 24h após entrada
- Requer permissão de administrador
- Gera movimentação de saída compensatória

---

## 🎭 Estados

### Estado Processando
```html
<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
    <div class="text-center">
      <div class="w-16 h-16 mx-auto mb-4">
        <svg class="w-full h-full text-[#86cb92] animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-[#1f2937]">Processando entrada...</h3>
      <p class="text-sm text-[#627271] mt-1">Por favor, não feche esta janela</p>
      <div class="mt-4">
        <div class="flex justify-between text-sm mb-1">
          <span class="text-[#627271]">Progresso</span>
          <span class="text-[#1f2937]">67%</span>
        </div>
        <div class="h-2 bg-[#efefef] rounded-full overflow-hidden">
          <div class="h-full bg-[#86cb92] rounded-full transition-all duration-300" style="width: 67%"></div>
        </div>
      </div>
      <p class="text-xs text-[#627271] mt-2">Processando linha 834 de 1.247...</p>
    </div>
  </div>
</div>
```

### Estado Erro de Validação
```html
<div class="bg-[#ef4444]/10 border border-[#ef4444] rounded-lg p-4 flex items-start gap-3">
  <svg class="w-5 h-5 text-[#ef4444] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
  <div>
    <h4 class="font-medium text-[#ef4444]">3 erros encontrados</h4>
    <ul class="text-sm text-[#ef4444]/80 mt-1 space-y-1">
      <li>• Linha 45: Quantidade negativa (-5)</li>
      <li>• Linha 89: Preço inválido ("mil reais")</li>
      <li>• Linha 156: Data futura (31/12/2026)</li>
    </ul>
    <button class="mt-3 text-sm text-[#ef4444] underline hover:no-underline">Baixar relatório de erros</button>
  </div>
</div>
```

---

## ✅ Checklist de Implementação

- [ ] Rota `/estoque/entrada-massa` criada
- [ ] Wizard em 4 etapas
- [ ] Upload de CSV/Excel
- [ ] Parser de arquivo robusto
- [ ] Mapeamento dinâmico de colunas
- [ ] Validação em tempo real
- [ ] Preview de mudanças
- [ ] Criação de produtos novos
- [ ] Processamento em background
- [ ] Barra de progresso
- [ ] Relatório de resultado
- [ ] Geração de etiquetas
- [ ] Rollback de entrada
- [ ] Download de modelo
- [ ] Exportação de erros

---

## 📊 Performance

| Métrica | Alvo | Notas |
|---------|------|-------|
| Upload | < 5s | Arquivos até 10MB |
| Validação | < 30s | 1.000 linhas |
| Processamento | < 2min | 1.000 linhas |
| Memória | < 512MB | Para grandes arquivos |

---

## 🔒 Segurança

- Validação de tipo de arquivo
- Limite de tamanho (10MB)
- Sanitização de dados
- Rate limiting por usuário
- Log de todas as operações

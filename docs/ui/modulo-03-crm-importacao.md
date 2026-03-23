# 📥 Módulo 03: CRM - Importação de Clientes

## Metadados
- **Módulo:** 03 - CRM (Customer Relationship Management)
- **Tópico:** Importação de Clientes via CSV/Excel
- **Versão:** 1.0
- **Data:** 12/03/2026
- **Status:** Draft

---

## 🎨 Design System - Importação

### Paleta de Cores
```css
Jet Black:         #1f2937  /* Textos primários, títulos */
Dim Grey:          #627271  /* Textos secundários, labels */
Dark Slate Grey:   #3e5653  /* Header, botões primários */
Platinum:          #efefef  /* Backgrounds alternados */
Emerald:           #86cb92  /* Sucesso, linhas válidas */
Bordas:            #e5e7eb  /* Cards, divisores */

/* Cores Semânticas */
Amarelo Alerta:    #f59e0b  /* Avisos, validação pendente */
Vermelho Erro:     #ef4444  /* Erros, linhas inválidas */
Azul Info:         #3b82f6  /* Informações, processando */
Cinza Neutro:      #9ca3af  /* Desabilitado, placeholder */
```

### Tipografia
- **Título Processo:** Inter, 20px, font-weight 600, #1f2937
- **Instruções:** Inter, 14px, #627271
- **Labels:** Inter, 12px, font-weight 500, #627271, uppercase
- **Preview Dados:** Inter, 13px, monospace, #1f2937

### Progresso Visual
- Barra de progresso: `h-2`, `#86cb92` para completo
- Steps: 4 etapas numeradas com conexão visual
- Status: Ícones de check, alerta e erro

---

## 📱 Tela: Importação de Clientes - Wizard

### Layout ASCII - Step 1: Upload

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  HEADER                                                                     │
│  [Logo]  Importar Clientes  [🔍 Buscar]  [🔔]  [👤]                   [⚙️]  │
├─────────────────────────────────────────────────────────────────────────────┤
│  BREADCRUMB: Dashboard > CRM > Clientes > Importar                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PASSOS DO PROCESSO                                                         │
│  ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐                                   │
│  │  1  │────│  2  │────│  3  │────│  4  │                                   │
│  │ 📤  │    │ 🗺️  │    │ 👁️  │    │ ✅  │                                   │
│  │     │    │     │    │     │    │     │                                   │
│  │ UP- │    │ MAPEA-│   │ PRE- │    │ CON- │                                   │
│  │ LOAD│    │ MENTO│    │ VIEW │    │ FIRMA│                                   │
│  └─────┘    └─────┘    └─────┘    └─────┘                                   │
│    ●●●        ○○○        ○○○        ○○○                                     │
│                                                                             │
│  ╔═══════════════════════════════════════════════════════════════════════╗  │
│  ║                                                                       ║  │
│  ║          ┌─────────────────────────────────────────────────┐          ║  │
│  ║          │                                                 │          ║  │
│  ║          │              📤 UPLOAD DO ARQUIVO               │          ║  │
│  ║          │                                                 │          ║  │
│  ║          │      Arraste e solte seu arquivo aqui           │          ║  │
│  ║          │              ou clique para selecionar          │          ║  │
│  ║          │                                                 │          ║  │
│  ║          │      Formatos aceitos: CSV, XLS, XLSX           │          ║  │
│  ║          │      Tamanho máximo: 10 MB                      │          ║  │
│  ║          │      Limite de linhas: 10.000 registros         │          ║  │
│  ║          │                                                 │          ║  │
│  ║          │           [📋 Baixar Modelo CSV]                │          ║  │
│  ║          │                                                 │          ║  │
│  ║          └─────────────────────────────────────────────────┘          ║  │
│  ║                                                                       ║  │
│  ╚═══════════════════════════════════════════════════════════════════════╝  │
│                                                                             │
│  📋 INSTRUÇÕES IMPORTANTES                                                  │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ • A primeira linha deve conter os nomes das colunas                   │  │
│  │ • Colunas obrigatórias: Nome, Email ou Telefone                       │  │
│  │ • Evite caracteres especiais nos nomes das colunas                    │  │
│  │ • Datas devem estar no formato DD/MM/AAAA ou AAAA-MM-DD               │  │
│  │ • Telefones aceitam formatos: (11) 99999-9999 ou 11999999999          │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│                                                      [Cancelar]  [Próximo >]│
└─────────────────────────────────────────────────────────────────────────────┘
```

### Layout ASCII - Step 2: Mapeamento de Colunas

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ...                                                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PASSOS: ●●●    ○○○    ○○○    ○○○   (Step 2 ativo)                          │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  🗺️ MAPEAMENTO DE COLUNAS                                           │    │
│  │                                                                     │    │
│  │  Arquivo: clientes_empresa.csv (847 linhas)                         │    │
│  │                                                                     │    │
│  │  ┌───────────────────────────────────────────────────────────────┐  │    │
│  │  │ COLUNA DO ARQUIVO    →    CAMPO DO SISTEMA    │  OBRIGATÓRIO │  │    │
│  │  ├───────────────────────────────────────────────────────────────┤  │    │
│  │  │ Nome_Cliente    ▼  →  [Nome Completo      ▼]  │      ●       │  │    │
│  │  │ Email_Principal ▼  →  [Email              ▼]  │      ●       │  │    │
│  │  │ Telefone        ▼  →  [Telefone           ▼]  │      ●       │  │    │
│  │  │ Celular         ▼  →  [Celular            ▼]  │      ○       │  │    │
│  │  │ Empresa         ▼  →  [Nome da Empresa    ▼]  │      ○       │  │    │
│  │  │ Cargo           ▼  →  [Cargo              ▼]  │      ○       │  │    │
│  │  │ Cidade          ▼  →  [Cidade             ▼]  │      ○       │  │    │
│  │  │ Estado          ▼  →  [Estado             ▼]  │      ○       │  │    │
│  │  │ Data_Nasc       ▼  →  [Data de Nascimento ▼]  │      ○       │  │    │
│  │  │ Tags            ▼  →  [Não importar       ▼]  │      ○       │  │    │
│  │  │ ─────────────   ▼  →  [Observações        ▼]  │      ○       │  │    │
│  │  └───────────────────────────────────────────────────────────────┘  │    │
│  │                                                                     │    │
│  │  [+ Adicionar campo personalizado]                                  │    │
│  │                                                                     │    │
│  │  ⚠️ Campos não mapeados serão ignorados na importação               │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│                                               [< Voltar]  [Próximo: Preview]│
└─────────────────────────────────────────────────────────────────────────────┘
```

### Layout ASCII - Step 3: Preview e Validação

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ...                                                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PASSOS: ●●●    ●●●    ○○○    ○○○   (Step 3 ativo)                          │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  👁️ PREVIEW E VALIDAÇÃO                                             │    │
│  │                                                                     │    │
│  │  📊 RESUMO DA VALIDAÇÃO                                             │    │
│  │  ┌────────────────┬────────────────┬────────────────┬────────────┐  │    │
│  │  │ ✅ Válidos     │ ⚠️ Alertas     │ ❌ Erros       │ 📝 Total   │  │    │
│  │  │     812        │      25        │      10        │    847     │  │    │
│  │  │   (95.9%)      │    (3.0%)      │    (1.1%)      │            │  │    │
│  │  └────────────────┴────────────────┴────────────────┴────────────┘  │    │
│  │                                                                     │    │
│  │  🔍 VISUALIZAÇÃO DOS DADOS (Primeiras 5 linhas)                     │    │
│  │                                                                     │    │
│  │  ┌───┬────────────────┬────────────────────┬───────────────┬──────┐ │    │
│  │  │   │ Nome Completo  │ Email              │ Telefone      │Stat  │ │    │
│  │  ├───┼────────────────┼────────────────────┼───────────────┼──────┤ │    │
│  │  │ 1 │ Ana Silva      │ ana@email.com      │ 1199999-9999  │  ✅  │ │    │
│  │  │ 2 │ Carlos Mendes  │ carlos@email.com   │ 1198888-8888  │  ✅  │ │    │
│  │  │ 3 │ João Santos    │ email_invalido     │ 1197777-7777  │  ⚠️  │ │    │
│  │  │ 4 │ Maria Souza    │ maria@email.com    │ telefone      │  ❌  │ │    │
│  │  │ 5 │ Pedro Costa    │                    │ 1196666-6666  │  ⚠️  │ │    │
│  │  └───┴────────────────┴────────────────────┴───────────────┴──────┘ │    │
│  │                                                                     │    │
│  │  ⚠️ ALERTAS IDENTIFICADOS (25 registros)                            │    │
│  │  ┌────────────────────────────────────────────────────────────────┐ │    │
│  │  │ Linha 3: Email inválido "email_invalido" - Será ignorado       │ │    │
│  │  │ Linha 5: Email ausente - Cliente será criado sem email         │ │    │
│  │  │ Linha 12: Telefone já existe - Possível duplicata              │ │    │
│  │  │ ...                                                            │ │    │
│  │  └────────────────────────────────────────────────────────────────┘ │    │
│  │                                                                     │    │
│  │  ❌ ERROS A CORRIGIR (10 registros) - NÃO SERÃO IMPORTADOS          │    │
│  │  ┌────────────────────────────────────────────────────────────────┐ │    │
│  │  │ Linha 4: Telefone inválido "telefone"                          │ │    │
│  │  │ Linha 18: Nome ausente - Campo obrigatório                     │ │    │
│  │  │ Linha 25: Email e Telefone ausentes - Pelo menos um obrigatório│ │    │
│  │  │ ...                                                            │ │    │
│  │  └────────────────────────────────────────────────────────────────┘ │    │
│  │                                                                     │    │
│  │  [📥 Baixar relatório de erros completo]                            │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ○ Importar apenas registros válidos (ignorar com alertas)                  │
│  ● Importar registros válidos e com alertas                                 │
│                                                                             │
│                                               [< Voltar]  [Próximo: Confirmar]│
└─────────────────────────────────────────────────────────────────────────────┘
```

### Layout ASCII - Step 4: Confirmação e Processamento

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ...                                                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PASSOS: ●●●    ●●●    ●●●    ○○○   (Step 4 ativo)                          │
│                                                                             │
│  ╔═══════════════════════════════════════════════════════════════════════╗  │
│  ║                                                                       ║  │
│  ║                        ✅ CONFIRMAÇÃO                                 ║  │
│  ║                                                                       ║  │
│  ║   Você está prestes a importar:                                       ║  │
│  ║                                                                       ║  │
│  ║   • Total de registros a importar: 837                                ║  │
│  ║   • Novos clientes: 792                                               ║  │
│  ║   • Atualizações: 45 (baseado em email/telefone)                      ║  │
│  ║   • Com alertas: 25                                                   ║  │
│  ║   • Serão ignorados: 10 (com erros)                                   ║  │
│  ║                                                                       ║  │
│  ║   ─────────────────────────────────────────────────────────────────   ║  │
│  ║                                                                       ║  │
│  ║   Campos a serem preenchidos:                                         ║  │
│  ║   • Nome Completo, Email, Telefone, Celular                           ║  │
│  ║   • Empresa, Cargo, Cidade, Estado                                    ║  │
│  ║                                                                       ║  │
│  ║   ○ Atribuir etiqueta automaticamente: [_______________ ▼]            ║  │
│  ║   ○ Atribuir responsável: [_______________ ▼]                         ║  │
│  ║   ○ Adicionar à lista: [_______________ ▼]                            ║  │
│  ║                                                                       ║  │
│  ╚═══════════════════════════════════════════════════════════════════════╝  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  ⏳ PROGRESSO DA IMPORTAÇÃO                                         │    │
│  │                                                                     │    │
│  │  Processando... 467 de 837 (55%)                                    │    │
│  │  [████████████████████████████░░░░░░░░░░░░░░░░░░░░░░]               │    │
│  │                                                                     │    │
│  │  Tempo estimado: 2 minutos restantes                                │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ⚠️ Não feche esta página até a importação ser concluída                    │
│                                                                             │
│                                               [< Voltar]  [Iniciar Importação]│
└─────────────────────────────────────────────────────────────────────────────┘
```

### Layout ASCII - Resultado Sucesso

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ...                                                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ╔═══════════════════════════════════════════════════════════════════════╗  │
│  ║                                                                       ║  │
│  ║                    ✅ IMPORTAÇÃO CONCLUÍDA!                           ║  │
│  ║                                                                       ║  │
│  ║   ┌─────────────────────────────────────────────────────────────┐     ║  │
│  ║   │                                                             │     ║  │
│  ║   │                    🎉                                       │     ║  │
│  ║   │                                                             │     ║  │
│  ║   │           837 clientes importados com sucesso!              │     ║  │
│  ║   │                                                             │     ║  │
│  ║   │   ┌──────────┬──────────┬──────────┐                        │     ║  │
│  ║   │   │ Novos    │ Atualiz. │ Ignorado │                        │     ║  │
│  ║   │   │   792    │    45    │    10    │                        │     ║  │
│  ║   │   └──────────┴──────────┴──────────┘                        │     ║  │
│  ║   │                                                             │     ║  │
│  ║   │   Tempo total: 3 minutos e 24 segundos                      │     ║  │
│  ║   │                                                             │     ║  │
│  ║   └─────────────────────────────────────────────────────────────┘     ║  │
│  ║                                                                       ║  │
│  ╚═══════════════════════════════════════════════════════════════════════╝  │
│                                                                             │
│  [📥 Baixar relatório completo]  [👥 Ver clientes importados]              │
│                                                                             │
│  [🔄 Nova Importação]                                            [Fechar ×]│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🖥️ Componentes

### 1. Área de Upload Drag & Drop

```html
<div 
  class="border-2 border-dashed border-[#3e5653] rounded-xl p-12 text-center hover:border-[#86cb92] hover:bg-[#86cb92]/5 transition-all cursor-pointer bg-white"
  ondragover="handleDragOver(event)"
  ondrop="handleDrop(event)"
  onclick="document.getElementById('fileInput').click()"
>
  <input 
    type="file" 
    id="fileInput" 
    class="hidden" 
    accept=".csv,.xls,.xlsx"
    onchange="handleFileSelect(event)"
  >
  <div class="w-20 h-20 mx-auto mb-4 bg-[#3e5653]/10 rounded-full flex items-center justify-center">
    <svg class="w-10 h-10 text-[#3e5653]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
    </svg>
  </div>
  <h3 class="text-lg font-semibold text-[#1f2937] mb-2">
    Arraste e solte seu arquivo aqui
  </h3>
  <p class="text-[#627271] mb-1">ou clique para selecionar</p>
  <p class="text-sm text-[#9ca3af] mt-4">
    Formatos aceitos: CSV, XLS, XLSX • Tamanho máximo: 10 MB
  </p>
  <button class="mt-6 inline-flex items-center px-4 py-2 border border-[#3e5653] text-[#3e5653] rounded-lg hover:bg-[#3e5653] hover:text-white transition-colors">
    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
    </svg>
    Baixar Modelo CSV
  </button>
</div>
```

### 2. Linha de Mapeamento de Coluna

```html
<div class="flex items-center gap-4 p-4 bg-white border border-[#e5e7eb] rounded-lg hover:shadow-sm transition-shadow">
  <!-- Coluna do Arquivo -->
  <div class="flex-1">
    <label class="block text-xs font-medium text-[#627271] uppercase mb-1">
      Coluna do Arquivo
    </label>
    <div class="relative">
      <select class="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#1f2937] focus:ring-2 focus:ring-[#3e5653] focus:border-transparent appearance-none bg-white">
        <option>Nome_Cliente</option>
        <option>Email_Principal</option>
        <option>Telefone</option>
      </select>
      <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#627271] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>
  </div>
  
  <!-- Seta -->
  <div class="pt-5">
    <svg class="w-5 h-5 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
    </svg>
  </div>
  
  <!-- Campo do Sistema -->
  <div class="flex-1">
    <label class="block text-xs font-medium text-[#627271] uppercase mb-1">
      Campo do Sistema
    </label>
    <div class="relative">
      <select class="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#1f2937] focus:ring-2 focus:ring-[#3e5653] focus:border-transparent appearance-none bg-white">
        <option value="nome">Nome Completo</option>
        <option value="email">Email</option>
        <option value="telefone">Telefone</option>
        <option value="">Não importar</option>
      </select>
      <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#627271] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>
  </div>
  
  <!-- Obrigatório -->
  <div class="pt-5">
    <span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
      Obrigatório
    </span>
  </div>
  
  <!-- Remover -->
  <button class="pt-5 p-2 text-[#627271] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
    </svg>
  </button>
</div>
```

### 3. Badge de Status de Linha

```html
<!-- Sucesso -->
<span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#86cb92]/10">
  <svg class="w-4 h-4 text-[#86cb92]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
  </svg>
</span>

<!-- Alerta -->
<span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#f59e0b]/10">
  <svg class="w-4 h-4 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
  </svg>
</span>

<!-- Erro -->
<span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100">
  <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
  </svg>
</span>
```

### 4. Barra de Progresso de Importação

```html
<div class="bg-white p-6 rounded-lg border border-[#e5e7eb]">
  <div class="flex justify-between items-center mb-2">
    <span class="text-sm font-medium text-[#1f2937]">Processando importação...</span>
    <span class="text-sm font-medium text-[#3e5653]">467 de 837 (55%)</span>
  </div>
  <div class="w-full bg-[#efefef] rounded-full h-3 overflow-hidden">
    <div 
      class="bg-[#86cb92] h-3 rounded-full transition-all duration-500 ease-out"
      style="width: 55%"
    ></div>
  </div>
  <div class="flex justify-between items-center mt-2 text-sm text-[#627271]">
    <span>⏱️ Tempo decorrido: 1m 45s</span>
    <span>⏳ Estimado: 2m restantes</span>
  </div>
  <div class="mt-4 p-3 bg-[#efefef] rounded-lg">
    <div class="flex items-center gap-2 text-sm text-[#627271]">
      <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Importando: João da Silva (joao@email.com)</span>
    </div>
  </div>
</div>
```

---

## 📋 Estrutura do Arquivo Modelo

| Coluna | Tipo | Obrigatório | Formato | Exemplo |
|--------|------|-------------|---------|---------|
| nome | Texto | Sim | Máx. 150 caracteres | João da Silva |
| email | Email | Parcial | válido RFC 5322 | joao@email.com |
| telefone | Texto | Parcial | DDD + número | 11999999999 |
| celular | Texto | Não | DDD + número | 11988888888 |
| empresa | Texto | Não | Máx. 150 caracteres | Empresa XYZ |
| cargo | Texto | Não | Máx. 100 caracteres | Gerente Comercial |
| endereco | Texto | Não | Máx. 255 caracteres | Rua ABC, 123 |
| cidade | Texto | Não | Máx. 100 caracteres | São Paulo |
| estado | Texto | Não | Sigla UF | SP |
| cep | Texto | Não | 8 dígitos | 01001000 |
| data_nascimento | Data | Não | DD/MM/AAAA ou AAAA-MM-DD | 15/03/1990 |
| origem | Texto | Não | Máx. 50 caracteres | Indicação |
| tags | Texto | Não | Separadas por vírgula | VIP, Ativo, Lead Quente |

**Nota:** Pelo menos um dos campos (email OU telefone) é obrigatório por registro.

---

## 🔄 Estados

### Estado: Upload em Progresso

```html
<div class="bg-white p-8 rounded-xl border-2 border-[#86cb92] text-center">
  <div class="w-16 h-16 mx-auto mb-4 relative">
    <svg class="w-16 h-16 text-[#86cb92] animate-spin" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
  <h3 class="text-lg font-semibold text-[#1f2937] mb-2">Fazendo upload...</h3>
  <p class="text-[#627271]">clientes_empresa.csv</p>
  <div class="mt-4 w-full max-w-xs mx-auto">
    <div class="w-full bg-[#efefef] rounded-full h-2">
      <div class="bg-[#86cb92] h-2 rounded-full transition-all" style="width: 67%"></div>
    </div>
    <p class="text-sm text-[#627271] mt-2">4.2 MB de 6.3 MB</p>
  </div>
</div>
```

### Estado: Processando Dados

```html
<div class="bg-[#3e5653]/5 p-6 rounded-lg border border-[#3e5653]/20">
  <div class="flex items-center justify-center">
    <svg class="w-8 h-8 text-[#3e5653] animate-spin mr-3" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <span class="text-[#1f2937] font-medium">Analisando e validando dados...</span>
  </div>
  <p class="text-center text-sm text-[#627271] mt-2">
    Isso pode levar alguns instantes dependendo do tamanho do arquivo
  </p>
</div>
```

### Estado: Erro no Upload

```html
<div class="bg-red-50 p-6 rounded-xl border-2 border-red-200">
  <div class="flex items-start">
    <div class="flex-shrink-0">
      <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    </div>
    <div class="ml-4 flex-1">
      <h3 class="text-lg font-medium text-red-800">Erro ao processar arquivo</h3>
      <p class="mt-1 text-red-700">
        O arquivo excede o limite de 10 MB. Tente dividir em arquivos menores ou comprima o arquivo.
      </p>
      <div class="mt-4 flex gap-3">
        <button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          Tentar novamente
        </button>
        <button class="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-100">
          Ver requisitos
        </button>
      </div>
    </div>
  </div>
</div>
```

---

## 📜 Regras de Negócio

### RN-CRM-IMP-001: Formato de Arquivo
- **Formatos Aceitos:** CSV (.csv), Excel 97-2003 (.xls), Excel 2007+ (.xlsx)
- **Codificação:** UTF-8 (obrigatório para caracteres especiais)
- **Delimitador CSV:** Vírgula (,) ou ponto-e-vírgula (;) - auto-detecção
- **Limite de Tamanho:** 10 MB por arquivo
- **Limite de Registros:** 10.000 linhas (excluindo cabeçalho)

### RN-CRM-IMP-002: Validação de Email
- **Formato:** Deve seguir RFC 5322
- **Duplicidade:** Emails duplicados no arquivo são marcados como alerta
- **Existente:** Se email já existe no sistema, cliente será atualizado (merge)
- **Vazio:** Registro sem email é válido se tiver telefone

### RN-CRM-IMP-003: Validação de Telefone
- **Formatos Aceitos:** (11) 99999-9999, 11999999999, +55 11 99999-9999
- **Limpeza:** Sistema remove caracteres não numéricos
- **DDD:** Deve ser válido (11-99)
- **Duplicidade:** Telefones duplicados são marcados como alerta

### RN-CRM-IMP-004: Campos Obrigatórios
- **Regra:** Pelo menos Nome + (Email OU Telefone)
- **Nome:** Mínimo 2 caracteres, máximo 150
- **Email OU Telefone:** Pelo menos um deve estar presente e válido
- **Registros Inválidos:** São ignorados na importação final

### RN-CRM-IMP-005: Atualização vs Criação
- **Critério de Merge:** Email ou Telefone (se configurado) já existente
- **Prioridade:** Dados do arquivo sobrescrevem dados existentes
- **Campos Vazios:** No arquivo não sobrescrevem campos preenchidos
- **Log:** Todas as atualizações são registradas no histórico

### RN-CRM-IMP-006: Processamento em Lote
- **Tamanho do Lote:** 100 registros por requisição
- **Retry:** Máximo 3 tentativas em caso de erro de rede
- **Rollback:** Possível cancelar importação em andamento
- **Notificação:** Email ao concluir ou em caso de erro crítico

---

## ✅ Checklist de Validação

### Design
- [ ] Wizard com 4 steps claramente identificados
- [ ] Área de drag & drop com feedback visual
- [ ] Indicadores de obrigatoriedade visíveis
- [ ] Status de validação com cores semânticas

### Funcional
- [ ] Upload aceita CSV, XLS, XLSX
- [ ] Mapeamento de colunas funciona corretamente
- [ ] Preview mostra até 5 linhas com status
- [ ] Validação de email em tempo real
- [ ] Validação de telefone com formatação

### Performance
- [ ] Upload com progresso visual
- [ ] Validação em chunks para arquivos grandes
- [ ] Cancelamento de importação em andamento
- [ ] Timeout de 30 minutos para importações

### Acessibilidade
- [ ] Upload funciona com teclado
- [ ] Erros de validação anunciados por screen reader
- [ ] Contraste adequado nos status
- [ ] Focus management entre steps

### Negócio
- [ ] Regras de obrigatoriedade validadas
- [ ] Merge de duplicatas funciona
- [ ] Log de importação completo
- [ ] Relatório de erros exportável

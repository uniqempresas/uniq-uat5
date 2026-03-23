# 🎯 Módulo 03: CRM - Segmentação de Clientes

## Metadados
- **Módulo:** 03 - CRM (Customer Relationship Management)
- **Tópico:** Segmentação de Clientes (RFV, Tags, Comportamento)
- **Versão:** 1.0
- **Data:** 12/03/2026
- **Status:** Draft

---

## 🎨 Design System - Segmentação

### Paleta de Cores
```css
Jet Black:         #1f2937  /* Textos primários, títulos */
Dim Grey:          #627271  /* Textos secundários, labels */
Dark Slate Grey:   #3e5653  /* Header, botões primários */
Platinum:          #efefef  /* Backgrounds alternados */
Emerald:           #86cb92  /* Sucesso, RFV Alto */
Bordas:            #e5e7eb  /* Cards, divisores */

/* Cores RFV */
RFV Alto:          #86cb92  /* Verde - Clientes campeões */
RFV Médio-Alto:    #3b82f6  /* Azul - Clientes promissores */
RFV Médio:         #f59e0b  /* Amarelo - Clientes em risco */
RFV Baixo:         #ef4444  /* Vermelho - Clientes perdidos */
RFV Hibernando:    #9ca3af  /* Cinza - Inativos */

/* Cores de Tags */
Tag Azul:          #dbeafe  /* Background azul claro */
Tag Verde:         #d1fae5  /* Background verde claro */
Tag Amarela:       #fef3c7  /* Background amarelo claro */
Tag Vermelha:      #fee2e2  /* Background vermelho claro */
Tag Roxa:          #ede9fe  /* Background roxo claro */
```

### Tipografia
- **Título Segmento:** Inter, 20px, font-weight 600, #1f2937
- **Nome do Cliente:** Inter, 14px, font-weight 500, #1f2937
- **Score RFV:** Inter, 24px, font-weight 700
- **Tags:** Inter, 12px, font-weight 500

---

## 📱 Tela: Listagem de Segmentos

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  HEADER                                                                     │
│  [Logo]  Segmentação de Clientes  [🔍 Buscar]  [🔔]  [👤]             [⚙️]  │
├─────────────────────────────────────────────────────────────────────────────┤
│  BREADCRUMB: Dashboard > CRM > Clientes > Segmentação                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [+ Novo Segmento]  [📥 Importar]  [📤 Exportar Todos]                     │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  🔍 FILTROS RÁPIDOS                                                 │    │
│  │                                                                     │    │
│  │  Por RFV: [Todos ▼]  Por Tag: [Todas ▼]  Origem: [Todas ▼]         │    │
│  │                                                                     │    │
│  │  [⚙️ Filtros Avançados]                                             │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  MEUS SEGMENTOS SALVOS                                                      │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  ⭐ Clientes VIP                                                    │    │
│  │  📊 247 clientes  |  💰 R$ 450K em vendas  |  📅 Criado há 15 dias │    │
│  │  [👁️ Ver] [✏️ Editar] [📤 Exportar] [🗑️ Excluir]                   │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │  🔥 Leads Quentes                                                   │    │
│  │  📊 89 clientes   |  💰 R$ 0 em vendas   |  📅 Criado há 3 dias    │    │
│  │  [👁️ Ver] [✏️ Editar] [📤 Exportar] [🗑️ Excluir]                   │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │  ⚠️ Risco de Churn                                                  │    │
│  │  📊 156 clientes  |  💰 R$ 180K em vendas  |  📅 Criado há 7 dias  │    │
│  │  [👁️ Ver] [✏️ Editar] [📤 Exportar] [🗑️ Excluir]                   │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │  🎉 Aniversariantes do Mês                                          │    │
│  │  📊 34 clientes   |  💰 R$ 85K em vendas   |  📅 Criado há 30 dias │    │
│  │  [👁️ Ver] [✏️ Editar] [📤 Exportar] [🗑️ Excluir]                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  SEGMENTAÇÃO POR RFV                                                        │
│                                                                             │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐                   │
│  │  🏆      │  💎      │  ⚠️      │  ❌      │  💤      │                   │
│  │ CAMPEÕES │ VALIOSOS │ RISCO    │ PERDIDOS │ HIBERNANDO                 │
│  │          │          │          │          │                           │
│  │   89     │   156    │   203    │   412    │   187    │                   │
│  │ clientes │ clientes │ clientes │ clientes │ clientes │                   │
│  │          │          │          │          │                           │
│  │  #86cb92 │  #3b82f6 │  #f59e0b │  #ef4444 │  #9ca3af │                   │
│  │          │          │          │          │                           │
│  │ [Ver →]  │ [Ver →]  │ [Ver →]  │ [Ver →]  │ [Ver →]  │                   │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘                   │
│                                                                             │
│  NUVEM DE TAGS                                                              │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                     │    │
│  │   [VIP]  [Lead Quente]  [Ativo]  [Inativo]  [Indicação]            │    │
│  │   [São Paulo]  [B2B]  [B2C]  [Recorrente]  [Novo]                  │    │
│  │   [Alto Ticket]  [Suporte]  [Crítico]  [Parceiro]                  │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📱 Tela: Construtor de Segmento (Modal)

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  NOVO SEGMENTO                                                    [×]       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Nome do Segmento *                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌───────────────────────────────────────┐  ┌─────────────────────────────┐ │
│  │  CONDIÇÕES DISPONÍVEIS                │  │  SEU SEGMENTO               │ │
│  │                                       │  │                             │ │
│  │  📊 Dados do Cliente                  │  │  👥 Clientes encontrados:   │ │
│  │  ├─ Nome                              │  │     247                     │ │
│  │  ├─ Email                             │  │                             │ │
│  │  ├─ Telefone                          │  │  CONDIÇÕES:                 │ │
│  │  ├─ Data de Nascimento                │  │                             │ │
│  │  ├─ Cidade                            │  │  [🗑️] RFV Score é ALTO     │ │
│  │  └─ Estado                            │  │       [E]                   │ │
│  │                                       │  │  [🗑️] Total em Compras     │ │
│  │  🏷️ Tags e Segmentação                │  │       maior que R$ 5.000    │ │
│  │  ├─ Tags                              │  │       [E]                   │ │
│  │  ├─ RFV Score                         │  │  [🗑️] Última Compra há      │ │
│  │  ├─ Segmento Atual                    │  │       menos de 60 dias      │ │
│  │  └─ Origem                            │  │                             │ │
│  │                                       │  │  [+ Adicionar Condição]     │ │
│  │  💰 Dados Comerciais                  │  │                             │ │
│  │  ├─ Total em Compras                  │  │  ────────────────────────   │ │
│  │  ├─ Ticket Médio                      │  │                             │ │
│  │  ├─ Quantidade de Pedidos             │  │  OPERADOR LÓGICO:           │ │
│  │  ├─ Última Compra                     │  │                             │ │
│  │  ├─ Primeira Compra                   │  │  ○ Qualquer condição (OU)   │ │
│  │  └─ Produtos Comprados                │  │  ● Todas as condições (E)   │ │
│  │                                       │  │                             │ │
│  │  📅 Datas e Recorrência               │  │                             │ │
│  │  ├─ Data de Cadastro                  │  │                             │ │
│  │  ├─ Dias desde última compra          │  │                             │ │
│  │  └─ Frequência de compra              │  │                             │ │
│  │                                       │  │                             │ │
│  │  📧 Comunicação                       │  │                             │ │
│  │  ├─ Emails abertos                    │  │                             │ │
│  │  ├─ Campanhas respondidas             │  │                             │ │
│  │  └─ Status de email                   │  │                             │ │
│  │                                       │  │                             │ │
│  └───────────────────────────────────────┘  └─────────────────────────────┘ │
│                                                                             │
│  ○ Segmento Dinâmico (atualiza automaticamente)                             │
│  ● Segmento Estático (fotografia no momento da criação)                     │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  👁️ PREVIEW DOS CLIENTES (5 de 247)                                 │    │
│  │                                                                     │    │
│  │  Ana Silva          | VIP | RFV: 852 | R$ 12.450 | Últ: 15 dias    │    │
│  │  Carlos Mendes      | VIP | RFV: 789 | R$ 8.920  | Últ: 22 dias    │    │
│  │  Fernanda Lima      | VIP | RFV: 734 | R$ 6.780  | Últ: 31 dias    │    │
│  │  [Ver todos os 247 clientes...]                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  [Cancelar]                              [💾 Salvar Segmento]               │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📱 Tela: Detalhe de Segmento - Visualização Clientes

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ...                                                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ← VOLTAR  |  ⭐ CLIENTES VIP                                                │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  📊 RESUMO DO SEGMENTO                                              │    │
│  │                                                                     │    │
│  │  ┌─────────────┬─────────────┬─────────────┬─────────────┐          │    │
│  │  │ 247         │ R$ 2.4M     │ R$ 9.8K     │ 23 dias     │          │    │
│  │  │ CLIENTES    │ EM VENDAS   │ TICKET MÉDIO│ ÚLT. COMPRA │          │    │
│  │  └─────────────┴─────────────┴─────────────┴─────────────┘          │    │
│  │                                                                     │    │
│  │  DISTRIBUIÇÃO RFV:                                                  │    │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━       │    │
│  │  ████████████████████████████████████████░░░░░░░░░░░░░░░░░░░░       │    │
│  │  Alto: 85% | Médio: 12% | Baixo: 3%                                 │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  [🔍 Buscar...]  [Filtrar ▼]  [📊 Colunas ▼]  [📥 Exportar]  [✉️ Email]    │
│                                                                             │
│  ┌────┬────────────────┬────────────┬───────┬────────────┬──────────────┐   │
│  │ ☐  │ CLIENTE        │ RFV        │ TAGS  │ TOTAL      │ ÚLT. COMPRA  │   │
│  ├────┼────────────────┼────────────┼───────┼────────────┼──────────────┤   │
│  │ ☐  │ Ana Silva      │ 🏆 923     │[VIP]  │ R$ 15.430  │ 12/03/2026   │   │
│  │ ☐  │ Carlos Mendes  │ 🏆 891     │[VIP]  │ R$ 12.890  │ 10/03/2026   │   │
│  │ ☐  │ Fernanda Lima  │ 💎 856     │[VIP]  │ R$ 11.245  │ 08/03/2026   │   │
│  │ ☐  │ João Santos    │ 💎 834     │[VIP]  │ R$ 10.678  │ 05/03/2026   │   │
│  │ ☐  │ Maria Souza    │ 💎 812     │[VIP]  │ R$ 9.890   │ 01/03/2026   │   │
│  ├────┴────────────────┴────────────┴───────┴────────────┴──────────────┤   │
│  │  ☐ Selecionar todos  |  5 de 247 selecionados                        │   │
│  │                                                                     │   │
│  │  [< Anterior]  1  2  3  ...  25  [Próximo >]                        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  AÇÕES EM MASSA (quando selecionado):                                       │
│  [Adicionar Tag]  [Remover Tag]  [Enviar Email]  [Exportar]  [Excluir]      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🖥️ Componentes

### 1. Card de Segmento Salvo

```html
<div class="bg-white p-5 rounded-xl shadow-sm border border-[#e5e7eb] hover:shadow-md transition-shadow">
  <div class="flex items-start justify-between mb-3">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-[#86cb92]/10 flex items-center justify-center">
        <span class="text-xl">⭐</span>
      </div>
      <div>
        <h3 class="font-semibold text-[#1f2937]">Clientes VIP</h3>
        <p class="text-xs text-[#627271]">Criado há 15 dias</p>
      </div>
    </div>
    <span class="px-2 py-1 text-xs font-medium rounded-full bg-[#86cb92]/10 text-[#86cb92]">
      Dinâmico
    </span>
  </div>
  
  <div class="grid grid-cols-3 gap-4 py-3 border-y border-[#e5e7eb]">
    <div class="text-center">
      <div class="text-xl font-bold text-[#1f2937]">247</div>
      <div class="text-xs text-[#627271]">clientes</div>
    </div>
    <div class="text-center">
      <div class="text-xl font-bold text-[#86cb92]">R$ 450K</div>
      <div class="text-xs text-[#627271]">em vendas</div>
    </div>
    <div class="text-center">
      <div class="text-xl font-bold text-[#1f2937]">9.8K</div>
      <div class="text-xs text-[#627271]">ticket médio</div>
    </div>
  </div>
  
  <div class="flex gap-2 mt-4">
    <button class="flex-1 px-3 py-2 text-sm text-[#3e5653] bg-[#efefef] rounded-lg hover:bg-[#3e5653] hover:text-white transition-colors">
      👁️ Ver
    </button>
    <button class="flex-1 px-3 py-2 text-sm text-[#3e5653] bg-[#efefef] rounded-lg hover:bg-[#3e5653] hover:text-white transition-colors">
      ✏️ Editar
    </button>
    <button class="flex-1 px-3 py-2 text-sm text-[#3e5653] bg-[#efefef] rounded-lg hover:bg-[#3e5653] hover:text-white transition-colors">
      📤 Exportar
    </button>
    <button class="px-3 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
      🗑️
    </button>
  </div>
</div>
```

### 2. Card de Quadrante RFV

```html
<div class="bg-gradient-to-br from-[#86cb92]/10 to-[#86cb92]/5 p-6 rounded-xl border-2 border-[#86cb92]/30 hover:border-[#86cb92] transition-all cursor-pointer">
  <div class="flex items-center justify-between mb-4">
    <span class="text-3xl">🏆</span>
    <span class="text-xs font-medium px-2 py-1 rounded-full bg-[#86cb92] text-white">
      89 clientes
    </span>
  </div>
  <h3 class="text-lg font-semibold text-[#1f2937] mb-1">Campeões</h3>
  <p class="text-sm text-[#627271] mb-4">Compram frequentemente e gastam muito</p>
  <div class="flex items-center justify-between">
    <div class="text-xs text-[#627271]">
      <span class="block">Score RFV: 750+</span>
      <span class="block">Ticket médio: Alto</span>
    </div>
    <svg class="w-5 h-5 text-[#86cb92]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
    </svg>
  </div>
</div>
```

### 3. Badge de Tag

```html
<!-- Tag Azul - Categoria -->
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
  VIP
  <button class="ml-1 text-blue-600 hover:text-blue-800">
    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
    </svg>
  </button>
</span>

<!-- Tag Verde - Status Positivo -->
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#86cb92]/20 text-[#3e5653]">
  Ativo
</span>

<!-- Tag Amarela - Alerta -->
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
  Lead Quente
</span>

<!-- Tag Vermelha - Urgente -->
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
  Crítico
</span>
```

### 4. Score RFV com Visual

```html
<div class="flex items-center gap-3">
  <!-- Score Alto -->
  <div class="flex items-center gap-2">
    <span class="text-2xl">🏆</span>
    <div>
      <div class="text-2xl font-bold text-[#86cb92]">923</div>
      <div class="text-xs text-[#627271]">RFV Score</div>
    </div>
  </div>
  <div class="h-10 w-px bg-[#e5e7eb]"></div>
  <!-- Detalhamento -->
  <div class="flex gap-4 text-xs">
    <div class="text-center">
      <div class="font-semibold text-[#1f2937]">R</div>
      <div class="text-[#86cb92]">5 dias</div>
    </div>
    <div class="text-center">
      <div class="font-semibold text-[#1f2937]">F</div>
      <div class="text-[#86cb92]">12x</div>
    </div>
    <div class="text-center">
      <div class="font-semibold text-[#1f2937]">V</div>
      <div class="text-[#86cb92]">R$890</div>
    </div>
  </div>
</div>
```

### 5. Construtor de Condição

```html
<div class="bg-white p-4 rounded-lg border border-[#e5e7eb] mb-3">
  <div class="flex items-center gap-3 flex-wrap">
    <!-- Campo -->
    <div class="relative">
      <select class="pl-3 pr-8 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#1f2937] bg-white appearance-none min-w-[140px]">
        <option>RFV Score</option>
        <option>Total em Compras</option>
        <option>Última Compra</option>
      </select>
      <svg class="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#627271] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>
    
    <!-- Operador -->
    <div class="relative">
      <select class="pl-3 pr-8 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#1f2937] bg-white appearance-none">
        <option>é</option>
        <option>não é</option>
        <option>maior que</option>
        <option>menor que</option>
        <option>entre</option>
      </select>
      <svg class="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#627271] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>
    
    <!-- Valor -->
    <div class="relative">
      <select class="pl-3 pr-8 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#1f2937] bg-white appearance-none min-w-[120px]">
        <option>ALTO</option>
        <option>MÉDIO-ALTO</option>
        <option>MÉDIO</option>
        <option>BAIXO</option>
      </select>
      <svg class="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#627271] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>
    
    <!-- Operador Lógico -->
    <span class="px-3 py-1 text-xs font-medium rounded-full bg-[#3e5653] text-white">
      E
    </span>
    
    <!-- Remover -->
    <button class="p-2 text-[#627271] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-auto">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
      </svg>
    </button>
  </div>
</div>
```

---

## 📋 Formulário: Criação de Segmento

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| Nome do Segmento | Texto | Sim | Máx. 100 caracteres, único |
| Descrição | Textarea | Não | Máx. 500 caracteres |
| Condições | Array | Sim | Mínimo 1 condição |
| Operador Lógico | Radio | Sim | E (todas) / OU (qualquer) |
| Tipo | Radio | Sim | Dinâmico / Estático |
| Cor/Ícone | Select | Não | Para identificação visual |

### Campos Disponíveis para Condição

| Campo | Tipo | Operadores | Valores |
|-------|------|------------|---------|
| RFV Score | Select | é, não é | Alto, Médio-Alto, Médio, Baixo |
| Total em Compras | Number | =, >, <, entre | Valor monetário |
| Ticket Médio | Number | =, >, <, entre | Valor monetário |
| Quantidade de Pedidos | Number | =, >, <, entre | Número inteiro |
| Última Compra | Date | há X dias, antes de, depois de | Data ou período |
| Data de Cadastro | Date | antes de, depois de, entre | Data |
| Tags | Multi-select | contém, não contém | Lista de tags |
| Cidade/Estado | Texto | é, não é, contém | Texto livre |
| Origem | Select | é, não é | Lista de origens |
| Aniversário | Date | mês é, dia é | Mês ou dia |

---

## 🔄 Estados

### Estado: Calculando Segmento

```html
<div class="bg-[#3e5653]/5 p-6 rounded-lg border border-[#3e5653]/20 text-center">
  <svg class="w-10 h-10 text-[#3e5653] animate-spin mx-auto mb-3" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
  <h3 class="text-lg font-medium text-[#1f2937]">Calculando segmento...</h3>
  <p class="text-sm text-[#627271] mt-1">
    Analisando 10.247 clientes com suas condições
  </p>
</div>
```

### Estado: Segmento Vazio

```html
<div class="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
  <div class="flex items-start">
    <svg class="w-6 h-6 text-yellow-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
    <div>
      <h3 class="text-sm font-medium text-yellow-800">Nenhum cliente encontrado</h3>
      <p class="mt-1 text-sm text-yellow-700">
        Suas condições são muito restritivas. Tente ajustar os critérios para encontrar mais clientes.
      </p>
      <button class="mt-3 text-sm font-medium text-yellow-800 hover:text-yellow-900 underline">
        Ajustar condições
      </button>
    </div>
  </div>
</div>
```

### Estado: Lista Vazia (Sem Segmentos)

```html
<div class="bg-white p-12 rounded-xl border border-[#e5e7eb] text-center">
  <div class="w-20 h-20 mx-auto mb-4 bg-[#efefef] rounded-full flex items-center justify-center">
    <svg class="w-10 h-10 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
    </svg>
  </div>
  <h3 class="text-xl font-semibold text-[#1f2937] mb-2">Nenhum segmento criado</h3>
  <p class="text-[#627271] mb-6 max-w-md mx-auto">
    Crie seu primeiro segmento para organizar seus clientes e realizar ações em grupo.
  </p>
  <button class="px-6 py-3 bg-[#3e5653] text-white rounded-lg hover:bg-[#627271] font-medium">
    + Criar Primeiro Segmento
  </button>
</div>
```

---

## 📜 Regras de Negócio

### RN-CRM-SEG-001: Cálculo RFV
- **Recência (R):** Días desde a última compra (menor = melhor)
  - 0-30 dias: 5 pontos
  - 31-60 dias: 4 pontos
  - 61-90 dias: 3 pontos
  - 91-180 dias: 2 pontos
  - 180+ dias: 1 ponto
- **Frequência (F):** Quantidade de compras no período
  - 10+ compras: 5 pontos
  - 7-9 compras: 4 pontos
  - 4-6 compras: 3 pontos
  - 2-3 compras: 2 pontos
  - 1 compra: 1 ponto
- **Valor (V):** Ticket médio
  - R$ 1.000+: 5 pontos
  - R$ 500-999: 4 pontos
  - R$ 250-499: 3 pontos
  - R$ 100-249: 2 pontos
  - < R$ 100: 1 ponto
- **Score Total:** R × 100 + F × 10 + V (máx. 555)

### RN-CRM-SEG-002: Classificação RFV
- **Campeões (750+):** Clientes mais valiosos
- **Valiosos (550-749):** Bons clientes
- **Em Risco (350-549):** Precisam de atenção
- **Perdidos (150-349):** Inativos
- **Hibernando (<150):** Sem compras recentes

### RN-CRM-SEG-003: Segmentos Dinâmicos vs Estáticos
- **Dinâmico:** Atualiza automaticamente quando clientes entram/saem das condições
- **Estático:** Fotografia no momento da criação, não atualiza
- **Limite:** Máximo 50 segmentos dinâmicos por conta

### RN-CRM-SEG-004: Condições Compostas
- **Operador E:** Todas as condições devem ser verdadeiras (AND)
- **Operador OU:** Qualquer condição pode ser verdadeira (OR)
- **Aninhamento:** Máximo 3 níveis de condições aninhadas
- **Limite:** Máximo 10 condições por segmento

### RN-CRM-SEG-005: Exportação de Segmentos
- **Formatos:** CSV, Excel, PDF
- **Limite:** Máximo 10.000 registros por exportação
- **Frequência:** Máximo 10 exportações por hora
- **Dados:** Respeita LGPD (sem dados sensíveis sem consentimento)

### RN-CRM-SEG-006: Ações em Massa
- **Disponíveis:** Adicionar tag, remover tag, enviar email, exportar
- **Limite:** Máximo 1.000 clientes por ação
- **Rate Limit:** Máximo 5 ações em massa por minuto
- **Log:** Todas as ações são registradas no histórico

---

## ✅ Checklist de Validação

### Design
- [ ] Cards de segmento com informações resumidas
- [ ] Quadrantes RFV com cores distintas
- [ ] Tags com cores semânticas
- [ ] Construtor de condições intuitivo

### Funcional
- [ ] Cálculo RFV atualiza diariamente
- [ ] Preview de segmento em tempo real
- [ ] Segmentos dinâmicos atualizam automaticamente
- [ ] Exportação funciona com filtros aplicados

### Performance
- [ ] Cálculo de segmento < 5 segundos
- [ ] Listagem paginada (50 itens por página)
- [ ] Cache de segmentos dinâmicos (5 min)
- [ ] Busca com debounce (300ms)

### Acessibilidade
- [ ] Cores RFV têm alternativa textual
- [ ] Contraste adequado em todas as tags
- [ ] Modal de construtor focável
- [ ] Keyboard navigation na lista

### Negócio
- [ ] Cálculo RFV segue regras definidas
- [ ] Classificação automática funciona
- [ ] Limites de segmentos respeitados
- [ ] Ações em massa com rate limit

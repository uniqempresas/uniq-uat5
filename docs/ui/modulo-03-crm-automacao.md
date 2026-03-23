# ⚡ Módulo 03: CRM - Automação de Workflows

## Metadados
- **Módulo:** 03 - CRM (Customer Relationship Management)
- **Tópico:** Automação de Workflows (Emails, Tarefas, Condições)
- **Versão:** 1.0
- **Data:** 12/03/2026
- **Status:** Draft

---

## 🎨 Design System - Automação

### Paleta de Cores
```css
Jet Black:         #1f2937  /* Textos primários, títulos */
Dim Grey:          #627271  /* Textos secundários, labels */
Dark Slate Grey:   #3e5653  /* Header, botões primários */
Platinum:          #efefef  /* Backgrounds alternados */
Emerald:           #86cb92  /* Ativo, sucesso */
Bordas:            #e5e7eb  /* Cards, divisores */

/* Cores Semânticas Workflow */
Trigger (Quando):  #3b82f6  /* Azul - Gatilhos */
Condition (Se):    #f59e0b  /* Amarelo - Condições */
Action (Então):    #86cb92  /* Verde - Ações */

/* Status Workflow */
Ativo:             #86cb92  /* Verde */
Pausado:           #f59e0b  /* Amarelo */
Rascunho:          #9ca3af  /* Cinza */
Erro:              #ef4444  /* Vermelho */
```

### Tipografia
- **Nome Workflow:** Inter, 18px, font-weight 600, #1f2937
- **Blocos de Passos:** Inter, 14px, font-weight 500
- **Descrição:** Inter, 13px, #627271
- **Código/Variáveis:** Mono, 12px, #3e5653

### Estrutura Visual
- Blocos conectados por linhas verticais
- Cada bloco com cor identificadora
- Indicador de status em cada bloco
- Preview de execução

---

## 📱 Tela: Lista de Workflows

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  HEADER                                                                     │
│  [Logo]  Automações  [🔍 Buscar]  [🔔]  [👤]                          [⚙️]  │
├─────────────────────────────────────────────────────────────────────────────┤
│  BREADCRUMB: Dashboard > CRM > Automações                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [+ Nova Automação]  [📋 Usar Template]                                     │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  🔍 FILTROS                                                         │    │
│  │                                                                     │    │
│  │  Status: [Todos ▼]  Trigger: [Todos ▼]  [🔎 Buscar nome...]        │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  ⚡ Boas-vindas novos clientes                            [● Ativo] │    │
│  │                                                                     │    │
│  │  QUANDO: Cliente é criado                                           │    │
│  │     SE: Origem é "Website"                                          │    │
│  │   ENTÃO: Enviar email de boas-vindas + Criar tarefa de follow-up    │    │
│  │                                                                     │    │
│  │  📊 Últimos 7 dias: 45 execuções | 2 falhas | 95.5% sucesso        │    │
│  │                                                                     │    │
│  │  [▶️ Executar] [⏸️ Pausar] [✏️ Editar] [📊 Analytics] [🗑️]         │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │  ⚡ Follow-up pós-venda                                  [⏸️ Pausado]│    │
│  │                                                                     │    │
│  │  QUANDO: 7 dias após venda ser fechada                              │    │
│  │     SE: Nenhuma condição                                            │    │
│  │   ENTÃO: Enviar email de satisfação + Criar tarefa                  │    │
│  │                                                                     │    │
│  │  📊 Últimos 7 dias: 23 execuções | 0 falhas | 100% sucesso         │    │
│  │                                                                     │    │
│  │  [▶️ Retomar] [✏️ Editar] [📊 Analytics] [🗑️]                      │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │  ⚡ Reativação clientes inativos                         [● Ativo] │    │
│  │                                                                     │    │
│  │  QUANDO: 90 dias sem compra                                         │    │
│  │     SE: RFV Score é "Médio" ou superior                             │    │
│  │   ENTÃO: Enviar email com desconto + Notificar vendedor             │    │
│  │                                                                     │    │
│  │  📊 Últimos 7 dias: 12 execuções | 1 falha | 91.7% sucesso         │    │
│  │                                                                     │    │
│  │  [▶️ Executar] [⏸️ Pausar] [✏️ Editar] [📊 Analytics] [🗑️]         │    │
│  ├─────────────────────────────────────────────────────────────────────┤    │
│  │  ⚡ Alerta aniversário cliente                           [● Ativo] │    │
│  │                                                                     │    │
│  │  QUANDO: Dia do aniversário do cliente                              │    │
│  │     SE: Cliente é "Ativo"                                           │    │
│  │   ENTÃO: Enviar email de parabéns + SMS com oferta                  │    │
│  │                                                                     │    │
│  │  📊 Últimos 7 dias: 8 execuções | 0 falhas | 100% sucesso          │    │
│  │                                                                     │    │
│  │  [▶️ Executar] [⏸️ Pausar] [✏️ Editar] [📊 Analytics] [🗑️]         │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  [< Anterior]  1  2  3  ...  5  [Próximo >]                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📱 Tela: Editor de Workflow (Visual Builder)

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  EDITOR DE AUTOMAÇÃO                                              [×]       │
│  [💾 Salvar] [💾 Salvar Rascunho] [👁️ Preview] [▶️ Ativar]                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Nome da Automação *                                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Boas-vindas novos clientes                                          │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  Descrição                                                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Envia email de boas-vindas e cria tarefa para novos clientes        │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ╔═══════════════════════════════════════════════════════════════════╗      │
│  ║                                                                   ║      │
│  ║  🟦 QUANDO (TRIGGER)                                              ║      │
│  ║  ┌─────────────────────────────────────────────────────────────┐  ║      │
│  ║  │  [🗑️]                                                        │  ║      │
│  ║  │                                                               │  ║      │
│  ║  │  Cliente é criado                                             │  ║      │
│  ║  │  ┌─────────────────────────────────────────────────────────┐  │  ║      │
│  ║  │  │ Origem do cadastro:  [Qualquer origem              ▼]  │  │  ║      │
│  ║  │  └─────────────────────────────────────────────────────────┘  │  ║      │
│  ║  │                                                               │  ║      │
│  ║  └─────────────────────────────────────────────────────────────┘  ║      │
│  ║                              │                                    ║      │
│  ║                              ▼                                    ║      │
│  ║  🟨 SE (CONDIÇÃO)                                                 ║      │
│  ║  ┌─────────────────────────────────────────────────────────────┐  ║      │
│  ║  │  [🗑️]  [+ Adicionar condição]                                │  ║      │
│  ║  │                                                               │  ║      │
│  ║  │  Origem  é  "Website"                                         │  ║      │
│  ║  │      [E]                                                      │  ║      │
│  ║  │  Tags  contém  "Lead Quente"                                  │  ║      │
│  ║  │                                                               │  ║      │
│  ║  │  ○ Quaisquer condições (OU)                                   │  ║      │
│  ║  │  ● Todas as condições (E)                                     │  ║      │
│  ║  │                                                               │  ║      │
│  ║  └─────────────────────────────────────────────────────────────┘  ║      │
│  ║                              │                                    ║      │
│  ║                              ▼                                    ║      │
│  ║  🟩 ENTÃO (AÇÃO 1)                                                ║      │
│  ║  ┌─────────────────────────────────────────────────────────────┐  ║      │
│  ║  │  [🗑️]  [↑] [↓]                                               │  ║      │
│  ║  │                                                               │  ║      │
│  ║  │  Enviar email                                                   ║      │
│  ║  │  ┌─────────────────────────────────────────────────────────┐  │  ║      │
│  ║  │  │ Template:  [Boas-vindas - Padrão                    ▼]  │  │  ║      │
│  ║  │  │ Para:      {{cliente.email}}                              │  │  ║      │
│  ║  │  │ Assunto:   Bem-vindo à UNIQ, {{cliente.nome}}!            │  │  ║      │
│  ║  │  │                                                             │  │  ║      │
│  ║  │  │ [✏️ Editar Template]  [👁️ Preview]                         │  │  ║      │
│  ║  │  └─────────────────────────────────────────────────────────┘  │  ║      │
│  ║  │                                                               │  ║      │
│  ║  └─────────────────────────────────────────────────────────────┘  ║      │
│  ║                              │                                    ║      │
│  ║                              ▼                                    ║      │
│  ║  🟩 ENTÃO (AÇÃO 2)                                                ║      │
│  ║  ┌─────────────────────────────────────────────────────────────┐  ║      │
│  ║  │  [🗑️]  [↑] [↓]                                               │  ║      │
│  ║  │                                                               │  ║      │
│  ║  │  Criar tarefa                                                 │  ║      │
│  ║  │  ┌─────────────────────────────────────────────────────────┐  │  ║      │
│  ║  │  │ Título:    Fazer contato inicial - {{cliente.nome}}       │  │  ║      │
│  ║  │  │ Descrição: Entrar em contato dentro de 24h...             │  │  ║      │
│  ║  │  │ Responsável: [Vendedor atribuído ao cliente        ▼]     │  │  ║      │
│  ║  │  │ Prazo:       [2 dias após criação                  ▼]     │  │  ║      │
│  ║  │  │ Prioridade:  [Alta                                 ▼]     │  │  ║      │
│  ║  │  └─────────────────────────────────────────────────────────┘  │  ║      │
│  ║  │                                                               │  ║      │
│  ║  └─────────────────────────────────────────────────────────────┘  ║      │
│  ║                              │                                    ║      │
│  ║                              ▼                                    ║      │
│  ║  [+ Adicionar Ação]                                               ║      │
│  ║                                                                   ║      │
│  ╚═══════════════════════════════════════════════════════════════════╝      │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════    │
│                                                                             │
│  CONFIGURAÇÕES AVANÇADAS                                                    │
│                                                                             │
│  ○ Permitir múltiplas execuções para o mesmo cliente                        │
│  ● Executar apenas uma vez por cliente                                      │
│                                                                             │
│  Tempo de espera entre execuções: [0] dias                                  │
│                                                                             │
│  Notificar em caso de falha: [✓] Email do administrador                     │
│                                                                             │
│  [Cancelar]                                    [💾 Salvar Rascunho] [▶️ Ativar]│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📱 Tela: Analytics de Workflow

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ...                                                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ← VOLTAR  |  ⚡ Boas-vindas novos clientes                                 │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  📊 PERFORMANCE GERAL                                               │    │
│  │                                                                     │    │
│  │  ┌────────────┬────────────┬────────────┬────────────┐              │    │
│  │  │ 1.247      │ 45         │ 2          │ 95.6%      │              │    │
│  │  │ EXECUÇÕES  │ ÚLT. 7 DIAS│ FALHAS     │ TAXA SUCESSO              │    │
│  │  │ (total)    │            │ (total)    │            │              │    │
│  │  └────────────┴────────────┴────────────┴────────────┘              │    │
│  │                                                                     │    │
│  │  📈 EXECUÇÕES POR DIA                                               │    │
│  │  ┌──────────────────────────────────────────────────────────────┐   │    │
│  │  │      │                                                        │   │    │
│  │  │  50  │    ██                                                  │   │    │
│  │  │  40  │    ██        ██                                        │   │    │
│  │  │  30  │    ██   ██   ██   ██                                   │   │    │
│  │  │  20  │    ██   ██   ██   ██   ██                              │   │    │
│  │  │  10  │ ██ ██   ██   ██   ██   ██   ██                         │   │    │
│  │  │   0  └───────────────────────────────────────────────────────   │   │    │
│  │  │      Seg  Ter  Qua  Qui  Sex  Sab  Dom                         │   │    │
│  │  └──────────────────────────────────────────────────────────────┘   │    │
│  │                                                                     │    │
│  │  🎯 TAXA DE CONVERSÃO POR PASSO                                     │    │
│  │  ┌──────────────────────────────────────────────────────────────┐   │    │
│  │  │ Trigger:  100% ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━     │   │    │
│  │  │ Condição:  85% ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━░░░░░░░░░░     │   │    │
│  │  │ Ação 1:   100% ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━     │   │    │
│  │  │ Ação 2:    98% ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━░░░░░     │   │    │
│  │  └──────────────────────────────────────────────────────────────┘   │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  📋 ÚLTIMAS EXECUÇÕES                                               │    │
│  │                                                                     │    │
│  │  Data          │ Cliente          │ Status  │ Duração  │ Ações     │    │
│  │  ─────────────────────────────────────────────────────────────────  │    │
│  │  12/03 14:30   │ Ana Silva        │ ✅ OK   │ 2.3s     │ [Ver]     │    │
│  │  12/03 14:28   │ Carlos Mendes    │ ✅ OK   │ 1.8s     │ [Ver]     │    │
│  │  12/03 14:25   │ João Santos      │ ❌ Falha│ 0.5s     │ [Ver] [↻] │    │
│  │  12/03 14:22   │ Maria Souza      │ ✅ OK   │ 2.1s     │ [Ver]     │    │
│  │  12/03 14:20   │ Pedro Costa      │ ✅ OK   │ 1.9s     │ [Ver]     │    │
│  │                                                                     │    │
│  │  [Ver todas as execuções...]                                        │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🖥️ Componentes

### 1. Card de Workflow

```html
<div class="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden hover:shadow-md transition-shadow">
  <div class="p-5">
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-[#3b82f6]/10 flex items-center justify-center">
          <span class="text-xl">⚡</span>
        </div>
        <div>
          <h3 class="font-semibold text-[#1f2937]">Boas-vindas novos clientes</h3>
          <p class="text-xs text-[#627271]">Criado em 01/03/2026</p>
        </div>
      </div>
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#86cb92]/10 text-[#86cb92]">
        <span class="w-1.5 h-1.5 bg-[#86cb92] rounded-full mr-1.5"></span>
        Ativo
      </span>
    </div>
    
    <div class="space-y-2 mb-4">
      <div class="flex items-center gap-2 text-sm">
        <span class="w-2 h-2 rounded-full bg-[#3b82f6]"></span>
        <span class="text-[#627271]">QUANDO:</span>
        <span class="text-[#1f2937]">Cliente é criado</span>
      </div>
      <div class="flex items-center gap-2 text-sm">
        <span class="w-2 h-2 rounded-full bg-[#f59e0b]"></span>
        <span class="text-[#627271]">SE:</span>
        <span class="text-[#1f2937]">Origem é "Website"</span>
      </div>
      <div class="flex items-center gap-2 text-sm">
        <span class="w-2 h-2 rounded-full bg-[#86cb92]"></span>
        <span class="text-[#627271]">ENTÃO:</span>
        <span class="text-[#1f2937]">Enviar email + Criar tarefa</span>
      </div>
    </div>
    
    <div class="pt-4 border-t border-[#e5e7eb]">
      <div class="flex items-center justify-between text-sm">
        <span class="text-[#627271]">Últimos 7 dias:</span>
        <div class="flex gap-4">
          <span class="text-[#1f2937]"><strong>45</strong> execuções</span>
          <span class="text-red-500"><strong>2</strong> falhas</span>
          <span class="text-[#86cb92]"><strong>95.5%</strong> sucesso</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="px-5 py-3 bg-[#efefef] flex gap-2">
    <button class="flex-1 px-3 py-1.5 text-sm text-[#3e5653] bg-white rounded-lg hover:bg-[#3e5653] hover:text-white transition-colors border border-[#e5e7eb]">
      ▶️ Executar
    </button>
    <button class="flex-1 px-3 py-1.5 text-sm text-[#3e5653] bg-white rounded-lg hover:bg-[#3e5653] hover:text-white transition-colors border border-[#e5e7eb]">
      ⏸️ Pausar
    </button>
    <button class="px-3 py-1.5 text-sm text-[#3e5653] bg-white rounded-lg hover:bg-[#3e5653] hover:text-white transition-colors border border-[#e5e7eb]">
      ✏️
    </button>
    <button class="px-3 py-1.5 text-sm text-[#3e5653] bg-white rounded-lg hover:bg-[#3e5653] hover:text-white transition-colors border border-[#e5e7eb]">
      📊
    </button>
    <button class="px-3 py-1.5 text-sm text-red-600 bg-white rounded-lg hover:bg-red-50 transition-colors border border-[#e5e7eb]">
      🗑️
    </button>
  </div>
</div>
```

### 2. Bloco de Trigger (Quando)

```html
<div class="bg-blue-50 rounded-xl border-2 border-[#3b82f6]/30 p-5">
  <div class="flex items-center justify-between mb-4">
    <div class="flex items-center gap-2">
      <span class="w-8 h-8 rounded-full bg-[#3b82f6] text-white flex items-center justify-center text-sm font-bold">1</span>
      <span class="font-semibold text-[#3b82f6]">QUANDO (TRIGGER)</span>
    </div>
    <button class="p-1 text-[#627271] hover:text-red-500">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
      </svg>
    </button>
  </div>
  
  <div class="bg-white rounded-lg p-4">
    <div class="relative">
      <label class="block text-xs font-medium text-[#627271] uppercase mb-1">Tipo de Trigger</label>
      <select class="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#1f2937] bg-white appearance-none focus:ring-2 focus:ring-[#3b82f6]">
        <option>Cliente é criado</option>
        <option>Negócio muda de etapa</option>
        <option>Data específica</option>
        <option>Tag é adicionada</option>
        <option>Compra é realizada</option>
      </select>
      <svg class="absolute right-3 top-7 w-4 h-4 text-[#627271] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>
    
    <div class="mt-4 p-3 bg-[#efefef] rounded-lg">
      <label class="block text-xs font-medium text-[#627271] mb-2">Configuração</label>
      <div class="relative">
        <select class="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#1f2937] bg-white appearance-none">
          <option>Qualquer origem</option>
          <option>Website</option>
          <option>Indicação</option>
          <option>Redes Sociais</option>
        </select>
        <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#627271] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    </div>
  </div>
</div>
```

### 3. Bloco de Condição (Se)

```html
<div class="bg-yellow-50 rounded-xl border-2 border-[#f59e0b]/30 p-5">
  <div class="flex items-center justify-between mb-4">
    <div class="flex items-center gap-2">
      <span class="w-8 h-8 rounded-full bg-[#f59e0b] text-white flex items-center justify-center text-sm font-bold">2</span>
      <span class="font-semibold text-[#f59e0b]">SE (CONDIÇÃO)</span>
    </div>
    <div class="flex gap-2">
      <button class="px-3 py-1 text-xs bg-[#f59e0b] text-white rounded-lg hover:bg-[#f59e0b]/80">
        + Adicionar condição
      </button>
      <button class="p-1 text-[#627271] hover:text-red-500">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
        </svg>
      </button>
    </div>
  </div>
  
  <div class="space-y-3">
    <!-- Condição 1 -->
    <div class="bg-white rounded-lg p-4">
      <div class="flex items-center gap-3">
        <div class="flex-1">
          <select class="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#1f2937] bg-white">
            <option>Origem</option>
            <option>Tags</option>
            <option>RFV Score</option>
            <option>Cidade</option>
          </select>
        </div>
        <div class="w-24">
          <select class="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#1f2937] bg-white">
            <option>é</option>
            <option>não é</option>
            <option>contém</option>
          </select>
        </div>
        <div class="flex-1">
          <select class="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#1f2937] bg-white">
            <option>Website</option>
            <option>Indicação</option>
            <option>Redes Sociais</option>
          </select>
        </div>
        <button class="p-2 text-[#627271] hover:text-red-500">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Operador Lógico -->
    <div class="flex justify-center">
      <div class="bg-[#3e5653] text-white px-4 py-1 rounded-full text-sm font-medium">
        E
      </div>
    </div>
    
    <!-- Condição 2 -->
    <div class="bg-white rounded-lg p-4">
      <div class="flex items-center gap-3">
        <div class="flex-1">
          <select class="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#1f2937] bg-white">
            <option>Tags</option>
            <option>Origem</option>
            <option>RFV Score</option>
          </select>
        </div>
        <div class="w-24">
          <select class="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#1f2937] bg-white">
            <option>contém</option>
            <option>é</option>
            <option>não é</option>
          </select>
        </div>
        <div class="flex-1">
          <input type="text" value="Lead Quente" class="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#1f2937]" placeholder="Valor">
        </div>
        <button class="p-2 text-[#627271] hover:text-red-500">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
  
  <div class="mt-4 flex gap-4">
    <label class="flex items-center gap-2 cursor-pointer">
      <input type="radio" name="logic" class="w-4 h-4 text-[#f59e0b]">
      <span class="text-sm text-[#1f2937]">Quaisquer condições (OU)</span>
    </label>
    <label class="flex items-center gap-2 cursor-pointer">
      <input type="radio" name="logic" checked class="w-4 h-4 text-[#f59e0b]">
      <span class="text-sm text-[#1f2937]">Todas as condições (E)</span>
    </label>
  </div>
</div>
```

### 4. Bloco de Ação (Então)

```html
<div class="bg-green-50 rounded-xl border-2 border-[#86cb92]/30 p-5">
  <div class="flex items-center justify-between mb-4">
    <div class="flex items-center gap-2">
      <span class="w-8 h-8 rounded-full bg-[#86cb92] text-white flex items-center justify-center text-sm font-bold">3</span>
      <span class="font-semibold text-[#86cb92]">ENTÃO (AÇÃO)</span>
    </div>
    <div class="flex gap-1">
      <button class="p-1 text-[#627271] hover:text-[#1f2937]" title="Mover para cima">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
        </svg>
      </button>
      <button class="p-1 text-[#627271] hover:text-[#1f2937]" title="Mover para baixo">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      <button class="p-1 text-[#627271] hover:text-red-500">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
        </svg>
      </button>
    </div>
  </div>
  
  <div class="bg-white rounded-lg p-4">
    <div class="relative mb-4">
      <label class="block text-xs font-medium text-[#627271] uppercase mb-1">Tipo de Ação</label>
      <select class="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#1f2937] bg-white appearance-none focus:ring-2 focus:ring-[#86cb92]">
        <option>Enviar email</option>
        <option>Criar tarefa</option>
        <option>Adicionar tag</option>
        <option>Enviar SMS</option>
        <option>Notificar usuário</option>
        <option>Webhooks</option>
      </select>
      <svg class="absolute right-3 top-7 w-4 h-4 text-[#627271] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>
    
    <div class="space-y-3">
      <div>
        <label class="block text-xs font-medium text-[#627271] mb-1">Template de Email</label>
        <div class="relative">
          <select class="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#1f2937] bg-white appearance-none">
            <option>Boas-vindas - Padrão</option>
            <option>Boas-vindas - VIP</option>
            <option>+ Criar novo template</option>
          </select>
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#627271] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>
      
      <div>
        <label class="block text-xs font-medium text-[#627271] mb-1">Para</label>
        <input type="text" value="{{cliente.email}}" class="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#1f2937] font-mono bg-[#efefef]/50" readonly>
      </div>
      
      <div>
        <label class="block text-xs font-medium text-[#627271] mb-1">Assunto</label>
        <input type="text" value="Bem-vindo à UNIQ, {{cliente.nome}}!" class="w-full px-3 py-2 border border-[#e5e7eb] rounded-lg text-sm text-[#1f2937]">
      </div>
      
      <div class="flex gap-2 pt-2">
        <button class="px-3 py-1.5 text-xs text-[#3b82f6] bg-[#3b82f6]/10 rounded-lg hover:bg-[#3b82f6]/20">
          ✏️ Editar Template
        </button>
        <button class="px-3 py-1.5 text-xs text-[#627271] bg-[#efefef] rounded-lg hover:bg-[#e5e7eb]">
          👁️ Preview
        </button>
      </div>
    </div>
  </div>
</div>
```

### 5. Conector Vertical

```html
<div class="flex justify-center py-2">
  <div class="w-0.5 h-6 bg-[#e5e7eb]"></div>
</div>
<div class="flex justify-center">
  <div class="w-3 h-3 rounded-full bg-[#e5e7eb]"></div>
</div>
<div class="flex justify-center py-2">
  <div class="w-0.5 h-6 bg-[#e5e7eb]"></div>
</div>
```

### 6. Botão Adicionar Elemento

```html
<div class="flex justify-center py-4">
  <button class="flex items-center gap-2 px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#627271] transition-colors">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
    </svg>
    Adicionar Ação
  </button>
</div>
```

---

## 📋 Triggers Disponíveis

| Trigger | Descrição | Parâmetros |
|---------|-----------|------------|
| Cliente é criado | Quando novo cliente é cadastrado | Origem, Data |
| Negócio muda de etapa | Pipeline avança ou retrocede | Etapa anterior, Nova etapa |
| Data específica | Aniversário, data de cadastro | Campo de data, Condição |
| Tag é adicionada | Tag aplicada ao cliente | Nome da tag |
| Tag é removida | Tag removida do cliente | Nome da tag |
| Compra realizada | Venda fechada com sucesso | Valor, Produtos |
| Email aberto | Cliente abre email enviado | Campanha, Tempo |
| Link clicado | Cliente clica em link do email | URL, Campanha |
| Tarefa completada | Ação interna finalizada | Tipo, Responsável |
| Tempo sem interação | Inatividade detectada | Dias, Canal |

---

## 📋 Ações Disponíveis

| Ação | Descrição | Configuração |
|------|-----------|--------------|
| Enviar email | Dispara email transacional | Template, Destinatário, Variáveis |
| Enviar SMS | Mensagem de texto | Template, Número |
| Criar tarefa | Geração de atividade | Título, Responsável, Prazo, Prioridade |
| Adicionar tag | Aplicação de etiqueta | Nome da tag |
| Remover tag | Remoção de etiqueta | Nome da tag |
| Mover negócio | Altera etapa do pipeline | Etapa de destino |
| Notificar usuário | Alerta interno | Usuário, Canal (email/app) |
| Atualizar campo | Modifica dado do cliente | Campo, Novo valor |
| Aguardar | Delay entre ações | Dias/Horas |
| Webhook | Integração externa | URL, Método, Payload |

---

## 📋 Variáveis Disponíveis

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `{{cliente.nome}}` | Nome completo | Ana Silva |
| `{{cliente.primeiro_nome}}` | Primeiro nome | Ana |
| `{{cliente.email}}` | Email | ana@email.com |
| `{{cliente.telefone}}` | Telefone | 11999999999 |
| `{{cliente.empresa}}` | Nome da empresa | Empresa XYZ |
| `{{cliente.data_cadastro}}` | Data de criação | 12/03/2026 |
| `{{vendedor.nome}}` | Responsável | Carlos Mendes |
| `{{empresa.nome}}` | Sua empresa | UNIQ Empresas |
| `{{negocio.valor}}` | Valor do negócio | R$ 5.000,00 |
| `{{negocio.etapa}}` | Etapa atual | Proposta |

---

## 🔄 Estados

### Estado: Workflow Executando

```html
<div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
  <div class="flex items-center">
    <svg class="w-5 h-5 text-blue-500 animate-spin mr-3" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <div>
      <p class="text-sm font-medium text-blue-900">Executando workflow...</p>
      <p class="text-xs text-blue-700">Ação 2 de 3: Enviando email para cliente</p>
    </div>
  </div>
</div>
```

### Estado: Erro na Execução

```html
<div class="bg-red-50 border border-red-200 rounded-lg p-4">
  <div class="flex items-start">
    <svg class="w-5 h-5 text-red-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
    <div class="flex-1">
      <p class="text-sm font-medium text-red-900">Falha na execução</p>
      <p class="text-xs text-red-700 mt-1">Erro ao enviar email: caixa de entrada do destinatário está cheia</p>
      <div class="mt-3 flex gap-2">
        <button class="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700">
          Tentar novamente
        </button>
        <button class="px-3 py-1 text-xs border border-red-300 text-red-700 rounded hover:bg-red-100">
          Ver detalhes
        </button>
      </div>
    </div>
  </div>
</div>
```

### Estado: Rascunho Não Salvo

```html
<div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
  <div class="flex items-start">
    <svg class="w-5 h-5 text-yellow-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
    <div>
      <p class="text-sm font-medium text-yellow-800">Alterações não salvas</p>
      <p class="text-xs text-yellow-700 mt-1">Você tem alterações não salvas neste workflow.</p>
    </div>
  </div>
</div>
```

---

## 📜 Regras de Negócio

### RN-CRM-AUT-001: Execução de Workflows
- **Gatilho:** Workflow é acionado imediatamente após o trigger
- **Ordem:** Ações são executadas sequencialmente (uma após a outra)
- **Falha:** Se uma ação falha, as subsequentes não são executadas
- **Retry:** Falhas em emails tentam 3x com intervalo de 5 minutos

### RN-CRM-AUT-002: Condições
- **Avaliação:** Condições são avaliadas antes das ações
- **Falso:** Se condição for falsa, workflow termina sem executar ações
- **Vazio:** Condição vazia = sempre verdadeira (executa sempre)
- **Aninhamento:** Máximo 5 condições aninhadas por workflow

### RN-CRM-AUT-003: Limites de Execução
- **Frequência:** Máximo 1 execução por cliente a cada 1 hora (exceto se configurado)
- **Volume:** Máximo 10.000 execuções por dia por workflow
- **Concordância:** Máximo 5 workflows executando simultaneamente
- **Timeout:** Workflow expira após 1 hora de execução

### RN-CRM-AUT-004: Variáveis e Templates
- **Escapamento:** Variáveis são escapadas para prevenir XSS
- **Fallback:** Se variável não existe, mostra string vazia
- **Personalização:** Máximo 10 variáveis por campo de template
- **Tamanho:** Emails limitados a 100KB (incluindo HTML)

### RN-CRM-AUT-005: Histórico e Analytics
- **Retenção:** Logs mantidos por 90 dias
- **Detalhes:** Cada execução registra entrada, saída e tempo
- **Exportação:** Analytics disponíveis em CSV/PDF
- **Privacidade:** Dados sensíveis são mascarados nos logs

### RN-CRM-AUT-006: Templates de Email
- **Aprovação:** Templates novos precisam de aprovação antes do uso
- **Variáveis:** Sistema valida se todas as variáveis existem
- **Spam Score:** Emails são verificados contra filtros de spam
- **Unsubscribe:** Todos os emails devem conter link de descadastro

---

## ✅ Checklist de Validação

### Design
- [ ] Blocos com cores identificadoras (Trigger/Condição/Ação)
- [ ] Conectores visuais entre elementos
- [ ] Indicadores de status claros
- [ ] Preview de execução disponível

### Funcional
- [ ] Triggers executam corretamente
- [ ] Condições avaliam lógica E/OU
- [ ] Ações executam em sequência
- [ ] Variáveis são substituídas corretamente
- [ ] Retry automático em falhas

### Performance
- [ ] Workflow executa em < 5 segundos
- [ ] Limite de 10.000 execuções/dia
- [ ] Rate limiting por cliente
- [ ] Timeout de 1 hora implementado

### Acessibilidade
- [ ] Editor funciona com teclado
- [ ] Cores não são único indicador de status
- [ ] Labels claros em todos os campos
- [ ] Foco visível em elementos interativos

### Negócio
- [ ] Histórico completo de execuções
- [ ] Analytics por passo do workflow
- [ ] Notificação de falhas
- [ ] Exportação de logs
- [ ] Respeito a LGPD nos emails

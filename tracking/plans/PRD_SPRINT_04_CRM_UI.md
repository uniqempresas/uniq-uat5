# 📋 PRD - SPRINT_04: CRM UI (Gestão de Clientes e Pipeline)

---

## 1. Visão Geral da Sprint

### 1.1 Contexto do Projeto
O **UNIQ Empresas** é uma plataforma SaaS modular que combina Consultoria de Growth + Ferramentas de Gestão + Métricas para pequenos e médios empreendedores. O sistema segue a abordagem **Frontend First** (Interface primeiro, Backend depois), permitindo validação rápida com stakeholders antes de investir em backend.

### 1.2 Objetivo Desta Sprint
A **SPRINT_04** tem como objetivo desenvolver a **interface completa do módulo CRM**, incluindo:
- Lista de clientes com filtros e busca
- Cadastro e edição de clientes com formulários complexos
- Pipeline de vendas com Kanban drag & drop
- Detalhamento de oportunidades com timeline de interações
- Sistema de tags e segmentação de clientes

### 1.3 Escopo da Sprint

**✅ Incluído nesta Sprint:**
- Interface de lista de clientes com filtros, busca e paginação
- Formulário completo de cadastro/edição de clientes
- Sistema de múltiplos contatos por cliente
- Tags/Chips de segmentação editáveis
- Kanban de pipeline de vendas com drag & drop
- Cards de oportunidades com valor e probabilidade
- Timeline de interações visual
- Modal de detalhe da oportunidade
- Estados empty e loading para todas as telas
- Mock data completo para testes visuais

**❌ NÃO Incluído nesta Sprint:**
- Integração com backend real (API)
- Persistência de dados no banco
- Autenticação funcional
- Upload de arquivos (fotos, documentos)
- Notificações push reais
- Relatórios avançados de CRM

### 1.4 Stack Tecnológica

| Camada | Tecnologia | Versão | Uso |
|--------|------------|--------|-----|
| Framework | Next.js | 14.2.5 | App Router, Server Components |
| Linguagem | TypeScript | 5.4.5 | Tipagem estática |
| UI Library | React | 18.3.1 | Componentes funcionais |
| Estilização | Tailwind CSS | 3.4.4 | Utility-first CSS |
| Componentes | shadcn/ui | v4.0.5 | Design System base |
| Drag & Drop | @dnd-kit | - | Kanban interativo |
| Ícones | Lucide React | 0.400.0 | Ícones consistentes |
| Formulários | React Hook Form | - | Validação e controle |
| Validação | Zod | - | Schema validation |

---

## 2. Estado Atual (Análise do Código)

### 2.1 Componentes do Design System Disponíveis

#### ✅ Componentes Já Implementados (Sprint 01)

| Componente | Arquivo | Status | Uso no CRM |
|------------|---------|--------|------------|
| **Button** | `components/ui/button.tsx` | ✅ Funcional | Ações, CTAs |
| **Card** | `components/ui/card.tsx` | ✅ Funcional | Containers, cards de oportunidade |
| **Badge** | `components/ui/badge.tsx` | ✅ Funcional | Status, tags |
| **Avatar** | `components/ui/avatar.tsx` | ✅ Funcional | Fotos de clientes |
| **Dialog** | `components/ui/dialog.tsx` | ✅ Funcional | Modais de cadastro |
| **Table** | `components/ui/table.tsx` | ✅ Funcional | Lista de clientes |
| **Input** | `components/ui/input.tsx` | ✅ Funcional | Formulários |
| **Select** | `components/ui/select.tsx` | ✅ Funcional | Dropdowns |
| **Tabs** | `components/ui/tabs.tsx` | ✅ Funcional | Navegação interna |
| **Skeleton** | `components/ui/skeleton.tsx` | ✅ Funcional | Loading states |
| **Toast** | `components/ui/toast.tsx` | ✅ Funcional | Notificações |
| **Textarea** | `components/ui/textarea.tsx` | ✅ Funcional | Anotações |
| **Checkbox** | `components/ui/checkbox.tsx` | ✅ Funcional | Seleção múltipla |
| **Switch** | `components/ui/switch.tsx` | ✅ Funcional | Toggles |
| **Tooltip** | `components/ui/tooltip.tsx` | ✅ Funcional | Dicas contextuais |

### 2.2 Design Tokens Configurados

**Arquivo:** `tailwind.config.ts` (cores UNIQ)

| Token | Valor | Uso no CRM |
|-------|-------|------------|
| `uniq.primary` | `#3e5653` | Botões primários, header |
| `uniq.accent` | `#86cb92` | Destaques, valores, tags |
| `uniq.text` | `#1f2937` | Texto principal |
| `uniq.muted` | `#627271` | Texto secundário |
| `uniq.border` | `#e5e7eb` | Bordas, divisores |
| `destructive` | `#dc2626` | Erros, perda de oportunidade |
| `success` | `#22c55e` | Sucesso, oportunidade ganha |
| `warning` | `#f59e0b` | Atenção, proposta enviada |
| `info` | `#3b82f6` | Novo lead |

### 2.3 Dependências a Instalar

```bash
# Drag & Drop para Kanban
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# Formulários e validação
npm install react-hook-form @hookform/resolvers zod

# Formatação de dados
npm install date-fns

# Input de telefone
npm install react-phone-number-input

# Color picker para tags (opcional)
npm install react-colorful
```

---

## 3. User Stories

### 3.1 Lista de Clientes

**US-01: Visualizar lista de clientes**
> Como usuário, quero ver uma lista de todos os meus clientes em uma tabela organizada, para ter uma visão geral da minha base de clientes.

**Critérios de Aceitação:**
- [ ] Tabela mostra nome, email, telefone, última compra, total gasto e tags
- [ ] Colunas são ordenáveis (click no header)
- [ ] Avatar com iniciais quando não há foto
- [ ] Tags coloridas são exibidas em formato de chips

**US-02: Buscar clientes**
> Como usuário, quero buscar clientes por nome ou email, para encontrar rapidamente um cliente específico.

**Critérios de Aceitação:**
- [ ] Campo de busca no topo da página
- [ ] Busca em tempo real (debounce 300ms)
- [ ] Highlight do termo buscado nos resultados

**US-03: Filtrar clientes**
> Como usuário, quero filtrar clientes por data de última compra, valor gasto ou tags, para segmentar minha base.

**Critérios de Aceitação:**
- [ ] Filtro por período (últimos 7 dias, 30 dias, 90 dias, custom)
- [ ] Filtro por valor mínimo/máximo gasto
- [ ] Filtro por tags (multi-select)
- [ ] Filtros acumulativos (AND logic)
- [ ] Botão "Limpar filtros"

**US-04: Paginação**
> Como usuário, quero navegar entre páginas da lista, para gerenciar grandes volumes de clientes.

**Critérios de Aceitação:**
- [ ] 10/25/50/100 itens por página
- [ ] Controles de navegação (anterior/próximo)
- [ ] Indicador "Mostrando X-Y de Z clientes"
- [ ] Ir para página específica (input)

**US-05: Ações em massa**
> Como usuário, quero selecionar múltiplos clientes e exportar seus dados, para facilitar relatórios.

**Critérios de Aceitação:**
- [ ] Checkbox em cada linha
- [ ] Checkbox no header para selecionar todos
- [ ] Ações: Exportar CSV, Adicionar tag, Remover tag
- [ ] Indicador "X clientes selecionados"

**US-06: Empty state**
> Como usuário, quero ver uma mensagem amigável quando não há clientes, para entender que preciso cadastrar.

**Critérios de Aceitação:**
- [ ] Ilustração/ícone amigável
- [ ] Mensagem "Nenhum cliente cadastrado"
- [ ] CTA para cadastrar primeiro cliente

---

### 3.2 Cadastro/Edição de Cliente

**US-07: Cadastrar novo cliente**
> Como usuário, quero cadastrar um novo cliente com dados completos, para manter minha base atualizada.

**Critérios de Aceitação:**
- [ ] Modal/dialog para cadastro
- [ ] Campos: Nome*, Email*, Telefone, Endereço completo
- [ ] Validação visual em tempo real
- [ ] Indicador de campos obrigatórios (*)
- [ ] Toast de sucesso ao salvar

**US-08: Adicionar múltiplos contatos**
> Como usuário, quero adicionar vários contatos (telefones/emails) para um cliente, para ter todas as formas de contato.

**Critérios de Aceitação:**
- [ ] Botão "+ Adicionar contato"
- [ ] Campos dinâmicos (tipo: telefone/email, valor)
- [ ] Remover contato individual (ícone X)
- [ ] Máximo 5 contatos por tipo
- [ ] Validação de formato (email válido, telefone válido)

**US-09: Adicionar tags ao cliente**
> Como usuário, quero adicionar tags de segmentação aos clientes, para organizar minha base.

**Critérios de Aceitação:**
- [ ] Campo de tags com autocomplete
- [ ] Criar nova tag se não existir
- [ ] Seletor de cor para cada tag
- [ ] Remover tag (X no chip)
- [ ] Tags sugeridas: VIP, Recorrente, Novo, Inativo

**US-10: Visualizar histórico de interações**
> Como usuário, quero ver um histórico visual das interações com o cliente, para ter contexto nas conversas.

**Critérios de Aceitação:**
- [ ] Timeline vertical com datas
- [ ] Ícones por tipo de interação (ligação, email, visita, compra)
- [ ] Cores por tipo
- [ ] Expandir para ver detalhes

**US-11: Editar cliente existente**
> Como usuário, quero editar os dados de um cliente, para manter as informações atualizadas.

**Critérios de Aceitação:**
- [ ] Mesmo formulário do cadastro (reutilizar)
- [ ] Dados pré-preenchidos
- [ ] Botão "Salvar alterações"
- [ ] Toast de confirmação

---

### 3.3 Pipeline de Vendas (Kanban)

**US-12: Visualizar pipeline de vendas**
> Como usuário, quero ver minhas oportunidades de venda organizadas em um Kanban, para acompanhar o funil de vendas.

**Critérios de Aceitação:**
- [ ] Colunas: Novo Lead, Contato Feito, Proposta Enviada, Negociação, Fechado Ganho, Fechado Perdido
- [ ] Cards com: Cliente, Valor estimado, Probabilidade, Próximo follow-up
- [ ] Cores por coluna (header com cor definida)
- [ ] Scroll horizontal quando necessário

**US-13: Mover oportunidades no Kanban**
> Como usuário, quero mover cards entre as colunas arrastando, para atualizar o estágio da oportunidade.

**Critérios de Aceitação:**
- [ ] Drag & drop funcional entre colunas
- [ ] Preview/placeholder durante o drag
- [ ] Highlight da coluna de destino
- [ ] Animação suave ao soltar
- [ ] Atualização do resumo (contador/total por coluna)

**US-14: Adicionar nova oportunidade rápida**
> Como usuário, quero adicionar uma nova oportunidade diretamente no Kanban, para não sair do contexto.

**Critérios de Aceitação:**
- [ ] Botão "+" em cada coluna
- [ ] Form rápido: Cliente (busca), Valor estimado
- [ ] Criar na coluna clicada
- [ ] Card aparece no topo da coluna

**US-15: Ver resumo do pipeline**
> Como usuário, quero ver estatísticas do pipeline, para entender o estado das minhas vendas.

**Critérios de Aceitação:**
- [ ] Cards no topo: Total em aberto, Total negociando, Taxa de conversão
- [ ] Cada coluna mostra: Quantidade de cards, Valor total
- [ ] Atualiza em tempo real

---

### 3.4 Detalhe da Oportunidade

**US-16: Visualizar detalhes da oportunidade**
> Como usuário, quero ver todos os detalhes de uma oportunidade em um painel lateral/modal, para ter contexto completo.

**Critérios de Aceitação:**
- [ ] Header: Nome do cliente, Valor estimado (destaque), Probabilidade
- [ ] Info: Estágio atual, Último contato, Próximo follow-up
- [ ] Tabs: Timeline, Interações, Lembretes

**US-17: Timeline de interações da oportunidade**
> Como usuário, quero ver todas as interações relacionadas a uma oportunidade, para acompanhar o histórico.

**Critérios de Aceitação:**
- [ ] Timeline vertical cronológica
- [ ] Tipos: Ligação, Email, Reunião, Proposta, Nota
- [ ] Cada item: Data, Tipo, Resumo, Responsável
- [ ] Filtro por tipo de interação

**US-18: Registrar nova interação**
> Como usuário, quero registrar uma nova interação na oportunidade, para manter o histórico atualizado.

**Critérios de Aceitação:**
- [ ] Form: Tipo (select), Data, Notas (textarea)
- [ ] Botão "Salvar interação"
- [ ] Aparece no topo da timeline
- [ ] Atualiza "Último contato"

**US-19: Agendar follow-up**
> Como usuário, quero agendar um lembrete de follow-up, para não esquecer de contatar o cliente.

**Critérios de Aceitação:**
- [ ] Datepicker para data
- [ ] Select de hora
- [ ] Campo de descrição
- [ ] Badge "Follow-up agendado" no card

**US-20: Ações da oportunidade (Ganhar/Perder)**
> Como usuário, quero marcar uma oportunidade como ganha ou perdida, para atualizar o status final.

**Critérios de Aceitação:**
- [ ] Botão "Marcar como Ganha" (verde)
- [ ] Botão "Marcar como Perdida" (vermelho)
- [ ] Modal de confirmação
- [ ] Campo "Motivo" (para perdida)
- [ ] Valor real (para ganha)
- [ ] Move para coluna final automaticamente

---

## 4. Interface & Fluxos

### 4.1 Arquitetura de Páginas

```
📁 app/
├── 📁 crm/
│   ├── 📁 clientes/
│   │   └── page.tsx              # Lista de clientes
│   ├── 📁 oportunidades/
│   │   └── page.tsx              # Kanban de pipeline
│   └── 📁 layout.tsx             # Layout compartilhado CRM
```

### 4.2 Componentes CRM Específicos

```
📁 components/
├── 📁 crm/
│   ├── 📁 customers/
│   │   ├── customer-table.tsx           # Tabela de clientes
│   │   ├── customer-filters.tsx         # Filtros da lista
│   │   ├── customer-form.tsx            # Form de cadastro/edição
│   │   ├── customer-contacts.tsx        # Gerenciamento de contatos
│   │   └── customer-tags.tsx            # Gerenciamento de tags
│   ├── 📁 pipeline/
│   │   ├── kanban-board.tsx             # Board principal
│   │   ├── kanban-column.tsx            # Coluna do kanban
│   │   ├── kanban-card.tsx              # Card de oportunidade
│   │   ├── opportunity-quick-add.tsx    # Add rápido de oportunidade
│   │   └── pipeline-stats.tsx           # Estatísticas do pipeline
│   ├── 📁 opportunities/
│   │   ├── opportunity-detail.tsx       # Detalhe da oportunidade
│   │   ├── opportunity-timeline.tsx     # Timeline de interações
│   │   ├── interaction-form.tsx         # Form de nova interação
│   │   └── opportunity-actions.tsx      # Ações (ganhar/perder)
│   └── 📁 shared/
│       ├── tag-input.tsx                # Input de tags com cores
│       ├── contact-input.tsx            # Input de contatos dinâmico
│       └── timeline.tsx                 # Componente timeline genérico
```

### 4.3 Mock Data Estruturado

**Arquivo:** `lib/mocks/crm.ts`

```typescript
export const mockCustomers = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    avatar: null,
    address: {
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apto 45',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01001-000'
    },
    contacts: [
      { type: 'phone', value: '(11) 99999-9999', primary: true },
      { type: 'email', value: 'joao@email.com', primary: true },
      { type: 'phone', value: '(11) 98888-8888', primary: false }
    ],
    tags: [
      { id: 1, name: 'VIP', color: '#F59E0B' },
      { id: 2, name: 'Recorrente', color: '#10B981' }
    ],
    lastPurchase: '2026-03-10',
    totalSpent: 12500.00,
    totalOrders: 8,
    notes: 'Cliente desde 2025, sempre pontual nos pagamentos.',
    createdAt: '2025-06-15',
    interactions: [
      {
        id: 1,
        type: 'purchase',
        date: '2026-03-10',
        description: 'Compra #12345 - R$ 2.500,00',
        user: 'Sistema'
      },
      {
        id: 2,
        type: 'call',
        date: '2026-03-05',
        description: 'Ligação de follow-up sobre novo pedido',
        user: 'Ana Silva'
      }
    ]
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '(11) 98888-8888',
    avatar: null,
    address: {
      street: 'Av. Paulista',
      number: '1000',
      complement: '',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100'
    },
    contacts: [
      { type: 'email', value: 'maria@email.com', primary: true }
    ],
    tags: [
      { id: 3, name: 'Novo', color: '#3B82F6' }
    ],
    lastPurchase: null,
    totalSpent: 0,
    totalOrders: 0,
    notes: 'Lead capturado pelo site em março/2026.',
    createdAt: '2026-03-01',
    interactions: []
  },
  // ... mais 18 clientes para teste
];

export const mockPipelineStages = [
  {
    id: 'novo_lead',
    name: 'Novo Lead',
    color: '#3B82F6',
    order: 1,
    count: 5,
    total: 15000
  },
  {
    id: 'contato_feito',
    name: 'Contato Feito',
    color: '#8B5CF6',
    order: 2,
    count: 3,
    total: 8000
  },
  {
    id: 'proposta_enviada',
    name: 'Proposta Enviada',
    color: '#F59E0B',
    order: 3,
    count: 4,
    total: 25000
  },
  {
    id: 'negociacao',
    name: 'Negociação',
    color: '#EC4899',
    order: 4,
    count: 2,
    total: 12000
  },
  {
    id: 'fechado_ganho',
    name: 'Fechado (Ganho)',
    color: '#10B981',
    order: 5,
    count: 12,
    total: 45000
  },
  {
    id: 'fechado_perdido',
    name: 'Fechado (Perdido)',
    color: '#6B7280',
    order: 6,
    count: 3,
    total: 8000
  }
];

export const mockOpportunities = [
  {
    id: 1,
    customerId: 1,
    customerName: 'João Silva',
    customerAvatar: null,
    title: 'Projeto de Consultoria',
    value: 15000,
    probability: 60,
    stage: 'proposta_enviada',
    lastContact: '2026-03-14',
    nextFollowUp: '2026-03-17',
    createdAt: '2026-03-01',
    interactions: [
      {
        id: 1,
        type: 'email',
        date: '2026-03-14',
        description: 'Proposta enviada por email',
        user: 'Ana Silva'
      },
      {
        id: 2,
        type: 'call',
        date: '2026-03-10',
        description: 'Primeira ligação apresentando serviço',
        user: 'Ana Silva'
      }
    ]
  },
  {
    id: 2,
    customerId: 2,
    customerName: 'Maria Santos',
    customerAvatar: null,
    title: 'Compra de Produtos',
    value: 2500,
    probability: 20,
    stage: 'novo_lead',
    lastContact: '2026-03-13',
    nextFollowUp: '2026-03-16',
    createdAt: '2026-03-13',
    interactions: [
      {
        id: 1,
        type: 'meeting',
        date: '2026-03-13',
        description: 'Visita à loja física',
        user: 'Pedro Santos'
      }
    ]
  },
  // ... mais oportunidades
];

export const mockTagOptions = [
  { id: 1, name: 'VIP', color: '#F59E0B' },
  { id: 2, name: 'Recorrente', color: '#10B981' },
  { id: 3, name: 'Novo', color: '#3B82F6' },
  { id: 4, name: 'Inativo', color: '#6B7280' },
  { id: 5, name: 'Pendente', color: '#EF4444' },
  { id: 6, name: 'Indicação', color: '#8B5CF6' }
];
```

---

## 5. Requisitos Funcionais

### 5.1 Lista de Clientes (RF-01 a RF-06)

#### RF-01: Tabela de Clientes
**Prioridade:** Alta | **Status:** 🔴 Não Implementado

**Props:**
```typescript
interface CustomerTableProps {
  customers: Customer[];
  loading?: boolean;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onSelect: (selectedIds: number[]) => void;
  selectedIds: number[];
  sortConfig: { key: string; direction: 'asc' | 'desc' } | null;
  onSort: (key: string) => void;
}
```

**Colunas:**
| Coluna | Acesso | Ordenável | Width |
|--------|--------|-----------|-------|
| Checkbox | Seleção | Não | 40px |
| Nome | `customer.name` | Sim | Flex |
| Email | `customer.email` | Sim | 200px |
| Telefone | `customer.phone` | Sim | 140px |
| Última Compra | `customer.lastPurchase` | Sim | 140px |
| Total Gasto | `customer.totalSpent` | Sim | 120px |
| Tags | `customer.tags` | Não | 200px |
| Ações | Editar/Excluir | Não | 100px |

**Estados:**
- Empty: "Nenhum cliente cadastrado" + ilustração
- Loading: Skeleton rows (5)
- Error: Toast de erro + retry

---

#### RF-02: Filtros de Clientes
**Prioridade:** Alta | **Status:** 🔴 Não Implementado

**Filtros Disponíveis:**
```typescript
interface CustomerFilters {
  search: string;           // Busca por nome/email
  lastPurchaseDate: {       // Período
    from: Date | null;
    to: Date | null;
  };
  totalSpent: {             // Faixa de valor
    min: number | null;
    max: number | null;
  };
  tags: number[];           // IDs das tags
  hasPurchase: 'all' | 'yes' | 'no';
}
```

**UI:**
- Barra de filtros expansível (ícone de filtro)
- Chips de filtros ativos com X para remover
- Botão "Limpar todos"

---

#### RF-03: Formulário de Cliente
**Prioridade:** Alta | **Status:** 🔴 Não Implementado

**Campos:**
```typescript
interface CustomerFormData {
  name: string;             // * Obrigatório
  email: string;            // * Obrigatório, email válido
  phone: string;            // Opcional, telefone válido
  address: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contacts: Contact[];      // Múltiplos contatos
  tags: Tag[];              // Array de tags
  notes: string;            // Textarea
}
```

**Validação:**
- Nome: mínimo 3 caracteres
- Email: formato válido
- Telefone: formato brasileiro
- Tags: máximo 5 tags

**Componentes:**
- Input com label e mensagem de erro
- TagInput customizado (criar novo)
- ContactInput dinâmico (criar novo)
- Textarea para notas

---

#### RF-04: Kanban Board
**Prioridade:** Alta | **Status:** 🔴 Não Implementado

**Estrutura:**
```typescript
interface KanbanBoardProps {
  stages: PipelineStage[];
  opportunities: Opportunity[];
  onDragEnd: (result: DropResult) => void;
  onAddOpportunity: (stageId: string, data: Partial<Opportunity>) => void;
  onEditOpportunity: (opportunity: Opportunity) => void;
  onDeleteOpportunity: (id: number) => void;
}
```

**Drag & Drop:**
- Biblioteca: @dnd-kit
- Cards arrastáveis entre colunas
- Scroll automático ao arrastar para borda
- Placeholder visual durante drag
- Animação de retorno se soltar fora

**Colunas:**
- Header com nome, contador, valor total
- Cor de fundo sutil baseada na cor do estágio
- Altura fixa com scroll interno
- Botão "+" no footer

**Cards:**
- Cliente (nome, avatar)
- Título da oportunidade
- Valor formatado (R$)
- Probabilidade (barra de progresso)
- Próximo follow-up (data)
- Hover: elevação + shadow

---

#### RF-05: Detalhe da Oportunidade
**Prioridade:** Alta | **Status:** 🔴 Não Implementado

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│ [Avatar] Cliente Nome                    [X] Fechar        │
│ Valor: R$ 15.000,00    Probabilidade: 60%                   │
├─────────────────────────────────────────────────────────────┤
│ [Timeline] [Interações] [Lembretes]                        │
├─────────────────────────────────────────────────────────────┤
│ Conteúdo da aba ativa                                       │
├─────────────────────────────────────────────────────────────┤
│ [Marcar como Perdida]  [Marcar como Ganha]                  │
└─────────────────────────────────────────────────────────────┘
```

**Timeline:**
- Linha vertical conectando eventos
- Cada evento: ícone + data + descrição + responsável
- Cores por tipo:
  - Ligação: azul
  - Email: verde
  - Reunião: roxo
  - Proposta: amarelo
  - Nota: cinza
  - Compra: verde escuro

**Ações:**
- Botão "Marcar como Ganha": verde, abre modal de confirmação
- Botão "Marcar como Perdida": vermelho, abre modal com motivo

---

#### RF-06: Timeline Component
**Prioridade:** Média | **Status:** 🔴 Não Implementado

**Props:**
```typescript
interface TimelineProps {
  events: TimelineEvent[];
  onAddEvent?: (event: Partial<TimelineEvent>) => void;
  showAddButton?: boolean;
}

interface TimelineEvent {
  id: number;
  type: 'call' | 'email' | 'meeting' | 'proposal' | 'note' | 'purchase';
  date: string;
  description: string;
  user: string;
  metadata?: Record<string, any>;
}
```

**Features:**
- Agrupamento por data ("Hoje", "Ontem", "Esta semana", etc.)
- Filtro por tipo de evento
- Expandir/collapse detalhes
- Indicador de tempo relativo ("2 horas atrás")

---

## 6. Requisitos Não-Funcionais

### 6.1 Performance

| Requisito | Critério | Implementação |
|-----------|----------|---------------|
| **Initial Load** | < 2s | Server Components, lazy loading |
| **Tabela (100 itens)** | < 500ms | Virtualização se necessário |
| **Drag & Drop** | 60fps | GPU acceleration, @dnd-kit |
| **Busca** | < 100ms | Debounce 300ms, client-side |
| **Form Submit** | < 300ms | Optimistic UI, mock delay |

### 6.2 Acessibilidade

| Requisito | Critério | Checklist |
|-----------|----------|-----------|
| **Keyboard Navigation** | Tab order lógico | ✅ Tab através dos cards do Kanban |
| **Focus Visible** | Ring de 2px | ✅ Tailwind `focus-visible:ring-2` |
| **ARIA Labels** | Descrições claras | ✅ Botões têm aria-label |
| **Color Contrast** | WCAG AA (4.5:1) | ✅ Cores validadas |
| **Screen Readers** | Anúncios corretos | ✅ Live regions para notificações |

### 6.3 Responsividade

| Breakpoint | Adaptações |
|------------|------------|
| **Desktop (>1024px)** | Sidebar fixo, Kanban horizontal, tabela completa |
| **Tablet (768-1024px)** | Sidebar colapsável, Kanban scroll horizontal |
| **Mobile (<768px)** | Bottom nav opcional, Kanban em lista, cards empilhados |

### 6.4 Estados de UI

**Loading States:**
- Tabela: Skeleton rows (5) com pulse animation
- Kanban: Skeleton cards em cada coluna
- Form: Disabled inputs com spinner no botão
- Timeline: Skeleton eventos

**Empty States:**
- Lista de clientes: Ilustração + "Nenhum cliente" + CTA
- Kanban vazio: "Arraste oportunidades para cá" + hint
- Timeline vazia: "Nenhuma interação registrada" + botão add
- Busca sem resultados: "Nenhum resultado para 'X'" + limpar filtros

**Error States:**
- Toast notifications para erros
- Retry button em falhas de "carregamento"
- Form validation visual (borda vermelha, mensagem abaixo)

---

## 7. Critérios de Aceitação (Definition of Done)

### 7.1 Checklist Geral

- [ ] Lista de clientes renderiza com mock data
- [ ] Filtros funcionam (busca, data, valor, tags)
- [ ] Paginação funciona corretamente
- [ ] Formulário de cliente com validação visual
- [ ] Múltiplos contatos podem ser adicionados/removidos
- [ ] Tags podem ser adicionadas com seleção de cor
- [ ] Timeline de interações visível
- [ ] Kanban renderiza cards em colunas
- [ ] Drag & drop funciona entre colunas
- [ ] Detalhe da oportunidade abre em modal/drawer
- [ ] Timeline de oportunidade exibe interações
- [ ] Form de nova interação funciona
- [ ] Ações "Ganhar/Perder" funcionam
- [ ] Estados empty implementados em todas as telas
- [ ] Estados loading implementados (skeletons)
- [ ] Responsividade testada em 3 breakpoints
- [ ] Acessibilidade: navegação por teclado funcional

### 7.2 Checklist de Componentes

| Componente | Criado | Testado | Integrado |
|------------|--------|---------|-----------|
| CustomerTable | [ ] | [ ] | [ ] |
| CustomerFilters | [ ] | [ ] | [ ] |
| CustomerForm | [ ] | [ ] | [ ] |
| ContactInput | [ ] | [ ] | [ ] |
| TagInput | [ ] | [ ] | [ ] |
| KanbanBoard | [ ] | [ ] | [ ] |
| KanbanColumn | [ ] | [ ] | [ ] |
| KanbanCard | [ ] | [ ] | [ ] |
| OpportunityDetail | [ ] | [ ] | [ ] |
| Timeline | [ ] | [ ] | [ ] |
| InteractionForm | [ ] | [ ] | [ ] |

---

## 8. Notas de Implementação

### 8.1 Biblioteca de Drag & Drop

**Opção Recomendada: @dnd-kit**

```typescript
// Instalação
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

// Uso básico
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
```

**Vantagens:**
- Moderna e leve
- Suporte a TypeScript nativo
- Acessível (keyboard navigation)
- Performance otimizada
- Boa documentação

### 8.2 Estrutura de Dados para Kanban

```typescript
// Estado do board
interface KanbanState {
  stages: PipelineStage[];
  opportunities: Opportunity[];
}

// Durante drag
interface DragState {
  activeId: string | null;
  overId: string | null;
}

// Handler de drag end
const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;
  
  if (!over) return;
  
  const activeId = active.id;
  const overId = over.id;
  
  // Se mudou de coluna
  if (activeId !== overId) {
    // Atualizar stage da oportunidade
    // Recalcular estatísticas
  }
};
```

### 8.3 Padrão de Formulários

```typescript
// Com React Hook Form + Zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const customerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  tags: z.array(z.object({
    id: z.number(),
    name: z.string(),
    color: z.string()
  })).max(5, 'Máximo de 5 tags'),
  notes: z.string().max(500, 'Máximo de 500 caracteres').optional()
});

type CustomerFormData = z.infer<typeof customerSchema>;

const CustomerForm = () => {
  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      email: '',
      tags: [],
      notes: ''
    }
  });
  
  const onSubmit = (data: CustomerFormData) => {
    // Mock submission
    console.log(data);
    toast({
      title: 'Cliente salvo com sucesso!',
      variant: 'success'
    });
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Fields */}
      </form>
    </Form>
  );
};
```

### 8.4 Organização de Arquivos de Mock

```
📁 lib/
├── 📁 mocks/
│   ├── crm.ts              # Dados de clientes e oportunidades
│   ├── pipeline.ts         # Dados do pipeline
│   ├── tags.ts             # Tags disponíveis
│   └── index.ts            # Exportações
├── utils.ts                # Funções utilitárias (já existe)
└── 📁 hooks/               # Custom hooks
    ├── use-customers.ts    # Hook de clientes (mock)
    ├── use-opportunities.ts # Hook de oportunidades (mock)
    └── use-pipeline.ts     # Hook do pipeline (mock)
```

---

## 9. Riscos e Mitigações

### Risco 1: Complexidade do Drag & Drop
**Descrição:** Implementar Kanban drag & drop pode ser complexo e consumir tempo.
**Impacto:** Alto | **Probabilidade:** Média
**Mitigação:**
- Usar @dnd-kit (biblioteca moderna e bem documentada)
- Começar com versão simples (apenas visual, sem lógica complexa)
- Testar em desktop primeiro, mobile depois

### Risco 2: Performance com Muitos Dados
**Descrição:** Se houver muitos clientes ou oportunidades, a UI pode ficar lenta.
**Impacto:** Médio | **Probabilidade:** Média
**Mitigação:**
- Implementar paginação desde o início
- Considerar virtualização para tabelas grandes
- Lazy loading de componentes pesados
- Otimizar re-renders com React.memo

### Risco 3: Inconsistência Visual
**Descrição:** Novos componentes podem não seguir exatamente o design system existente.
**Impacto:** Médio | **Probabilidade:** Média
**Mitigação:**
- Reusar componentes shadcn/ui sempre que possível
- Seguir tokens de cores do tailwind.config.ts
- Criar componentes compartilhados (TagInput, ContactInput)
- Revisão visual antes de finalizar

### Risco 4: Sobrecarga da Sprint
**Descrição:** 2 semanas pode ser curto para toda a complexidade do CRM.
**Impacto:** Alto | **Probabilidade:** Média
**Mitigação:**
- Priorizar: Lista de clientes e Kanban são obrigatórios
- Formulário pode ser versão simplificada inicial
- Timeline pode ser read-only no primeiro momento
- Deixar exportação CSV para sprint futura

### Risco 5: Validação Complexa de Formulários
**Descrição:** Formulário com múltiplos contatos e tags pode ter validação complexa.
**Impacto:** Médio | **Probabilidade:** Baixa
**Mitigação:**
- Usar React Hook Form + Zod (padrão do projeto)
- Validar campos individuais
- Feedback visual imediato
- Testar edge cases (máximo de tags, contatos duplicados)

---

## 10. Referências

### 10.1 Documentação do Projeto
- [PRD Sprint 01 - Design System](./PRD_SPRINT_01_Design_System.md)
- [ROADMAP Completo](../docs/ROADMAP.md)
- [TRACKING.md](../tracking/TRACKING.md)

### 10.2 Bibliotecas e Recursos
- [@dnd-kit Documentation](https://docs.dndkit.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)

### 10.3 Inspirações UI
- [Trello](https://trello.com/) - Kanban drag & drop
- [HubSpot CRM](https://www.hubspot.com/products/crm) - Pipeline visual
- [Pipedrive](https://www.pipedrive.com/) - Oportunidades e timeline
- [Salesforce](https://www.salesforce.com/) - Gestão de clientes

### 10.4 Componentes de Referência
- **Kanban:** Trello, Notion, Linear
- **Timeline:** GitHub, Jira
- **Formulários Complexos:** Typeform, Airtable
- **Tabelas:** Airtable, Notion databases

---

**Documento gerado em:** 20/03/2026  
**Pesquisador:** @vibe-researcher  
**Fase:** FASE 01 - Research (SDD)  
**Próxima Fase:** FASE 02 - Planning (@vibe-planner)  
**Status:** 🟢 PRONTO PARA PLANNING

---

> ⚠️ **IMPORTANTE:** Este é um documento de especificação de produto (PRD). Não contém código implementado. A implementação será realizada na FASE 03 por @vibe-implementer baseado na SPEC técnica que será gerada na FASE 02.

> 🎯 **PRÓXIMOS PASSOS:**
> 1. Usuário deve limpar contexto do chat
> 2. Chamar @vibe-planner para gerar SPEC.md
> 3. Aguardar aprovação do SPEC
> 4. Chamar @vibe-implementer para desenvolvimento

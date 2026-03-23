# 📋 SPEC TÉCNICA - SPRINT 04: CRM UI (Gestão de Clientes e Pipeline)

---

## 1. Visão Geral da Implementação

### 1.1 Resumo Técnico

Esta especificação define a implementação técnica do módulo CRM do UNIQ Empresas, incluindo:
- **Lista de Clientes**: Tabela com filtros avançados, busca, paginação e ações em massa
- **Cadastro/Edição de Clientes**: Formulário complexo com múltiplos contatos, tags e validação
- **Pipeline Kanban**: Sistema drag & drop completo usando @dnd-kit
- **Detalhe de Oportunidades**: Timeline de interações, ações de pipeline e lembretes

### 1.2 Stack e Dependências

| Camada | Tecnologia | Versão | Propósito |
|--------|------------|--------|-----------|
| Framework | Next.js | 14.2.5 | App Router, Server Components |
| Linguagem | TypeScript | 5.4.5 | Tipagem estática |
| UI Library | React | 18.3.1 | Componentes funcionais |
| Estilização | Tailwind CSS | 3.4.4 | Utility-first CSS |
| Componentes | shadcn/ui | v4.0.5 | Design System base |
| **Drag & Drop** | **@dnd-kit** | latest | **Kanban interativo** |
| **Formulários** | **react-hook-form** | latest | **Gestão de formulários** |
| **Validação** | **Zod** | latest | **Schema validation** |
| **Datas** | **date-fns** | latest | **Formatação de datas** |
| Ícones | Lucide React | 0.400.0 | Ícones consistentes |

### 1.3 Novas Dependências a Instalar

```bash
# Drag & Drop para Kanban
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# Formulários e validação
npm install react-hook-form @hookform/resolvers zod

# Formatação de datas
npm install date-fns

# Input de telefone (opcional, usar lib leve)
npm install react-phone-number-input
```

---

## 2. Estrutura de Arquivos e Pastas

```
📁 components/
├── 📁 crm/
│   ├── 📁 customers/
│   │   ├── customer-table.tsx           # Tabela de clientes com filtros
│   │   ├── customer-filters.tsx         # Barra de filtros avançados
│   │   ├── customer-form.tsx            # Form completo cadastro/edição
│   │   ├── customer-contacts.tsx        # Gerenciamento de contatos dinâmicos
│   │   ├── customer-tags.tsx            # Input de tags com cores
│   │   └── customer-detail-modal.tsx    # Modal de detalhes do cliente
│   ├── 📁 pipeline/
│   │   ├── kanban-board.tsx             # Board principal com DndContext
│   │   ├── kanban-column.tsx            # Coluna sortável do kanban
│   │   ├── kanban-card.tsx              # Card arrastável de oportunidade
│   │   ├── kanban-drag-overlay.tsx      # Overlay durante drag
│   │   ├── opportunity-quick-add.tsx    # Form rápido de nova oportunidade
│   │   └── pipeline-stats.tsx           # Cards de estatísticas
│   ├── 📁 opportunities/
│   │   ├── opportunity-detail-drawer.tsx # Drawer de detalhes
│   │   ├── opportunity-timeline.tsx     # Timeline de interações
│   │   ├── interaction-form.tsx         # Form de nova interação
│   │   ├── opportunity-actions.tsx      # Botões Ganhar/Perder/Mover
│   │   └── follow-up-scheduler.tsx      # Agendador de follow-up
│   └── 📁 shared/
│       ├── timeline.tsx                 # Componente timeline genérico
│       ├── tag-input.tsx                # Input de tags com chips coloridos
│       ├── contact-input.tsx            # Input de contatos dinâmico
│       ├── customer-search.tsx          # Busca de cliente autocomplete
│       └── probability-bar.tsx          # Barra de probabilidade visual

📁 app/
├── 📁 crm/
│   ├── 📁 clientes/
│   │   └── page.tsx                     # Página lista de clientes
│   ├── 📁 pipeline/
│   │   └── page.tsx                     # Página kanban de vendas
│   ├── 📁 oportunidades/
│   │   └── [id]/
│   │       └── page.tsx                 # Página detalhe oportunidade
│   └── layout.tsx                       # Layout compartilhado CRM

📁 lib/
├── 📁 mocks/
│   ├── crm-data.ts                      # Mock data completo
│   ├── pipeline-data.ts                 # Dados do pipeline
│   └── index.ts                         # Exportações
├── 📁 hooks/
│   ├── use-customers.ts                 # Hook de clientes
│   ├── use-opportunities.ts             # Hook de oportunidades
│   ├── use-pipeline.ts                  # Hook do pipeline
│   └── use-debounce.ts                  # Hook de debounce
├── 📁 schemas/
│   ├── customer-schema.ts               # Schemas Zod
│   ├── opportunity-schema.ts            # Schemas Zod
│   └── index.ts                         # Exportações
└── utils.ts                             # Funções utilitárias

📁 types/
└── crm.ts                               # Types TypeScript
```

---

## 3. Types e Interfaces

### 3.1 Types Principais

```typescript
// 📁 types/crm.ts

// ============================================
// CUSTOMER TYPES
// ============================================

export interface Contact {
  id: string;
  type: 'phone' | 'email' | 'whatsapp';
  value: string;
  primary: boolean;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string | null;
  address?: Address;
  contacts: Contact[];
  tags: Tag[];
  lastPurchase?: string | null;
  totalSpent: number;
  totalOrders: number;
  notes?: string;
  createdAt: string;
  interactions: CustomerInteraction[];
}

export interface CustomerInteraction {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'purchase' | 'note' | 'visit';
  date: string;
  description: string;
  user: string;
}

// ============================================
// PIPELINE TYPES
// ============================================

export interface PipelineStage {
  id: string;
  name: string;
  color: string;
  order: number;
  count: number;
  total: number;
}

export interface Opportunity {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar?: string | null;
  title: string;
  value: number;
  probability: number;
  stage: string;
  lastContact?: string | null;
  nextFollowUp?: string | null;
  createdAt: string;
  interactions: OpportunityInteraction[];
  status: 'open' | 'won' | 'lost';
  lostReason?: string;
  actualValue?: number;
}

export interface OpportunityInteraction {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'proposal' | 'note';
  date: string;
  description: string;
  user: string;
}

// ============================================
// FILTER TYPES
// ============================================

export interface CustomerFilters {
  search: string;
  lastPurchaseDate: {
    from: Date | null;
    to: Date | null;
  };
  totalSpent: {
    min: number | null;
    max: number | null;
  };
  tags: string[];
  hasPurchase: 'all' | 'yes' | 'no';
}

export interface SortConfig {
  key: keyof Customer | null;
  direction: 'asc' | 'desc';
}

// ============================================
// KANBAN TYPES
// ============================================

export interface KanbanColumnType {
  id: string;
  stage: PipelineStage;
  opportunities: Opportunity[];
}

export interface DragItem {
  id: string;
  type: 'column' | 'opportunity';
}
```

---

## 4. Schemas Zod

### 4.1 Schema de Cliente

```typescript
// 📁 lib/schemas/customer-schema.ts

import { z } from 'zod';

export const contactSchema = z.object({
  id: z.string(),
  type: z.enum(['phone', 'email', 'whatsapp']),
  value: z.string().min(1, 'Valor é obrigatório'),
  primary: z.boolean().default(false),
});

export const tagSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Nome da tag é obrigatório'),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Cor deve ser um HEX válido'),
});

export const addressSchema = z.object({
  street: z.string().min(1, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z.string().length(2, 'Estado deve ter 2 caracteres'),
  zipCode: z.string().regex(/^\\d{5}-?\\d{3}$/, 'CEP inválido'),
});

export const customerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  address: addressSchema.optional(),
  contacts: z.array(contactSchema).max(10, 'Máximo de 10 contatos'),
  tags: z.array(tagSchema).max(5, 'Máximo de 5 tags'),
  notes: z.string().max(1000, 'Máximo de 1000 caracteres').optional(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;
```

### 4.2 Schema de Oportunidade

```typescript
// 📁 lib/schemas/opportunity-schema.ts

import { z } from 'zod';

export const opportunityInteractionSchema = z.object({
  id: z.string(),
  type: z.enum(['call', 'email', 'meeting', 'proposal', 'note']),
  date: z.string().datetime(),
  description: z.string().min(1, 'Descrição é obrigatória'),
  user: z.string(),
});

export const opportunitySchema = z.object({
  customerId: z.string().min(1, 'Cliente é obrigatório'),
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  value: z.number().min(0, 'Valor deve ser positivo'),
  probability: z.number().min(0).max(100, 'Probabilidade deve ser entre 0 e 100'),
  stage: z.string().min(1, 'Etapa é obrigatória'),
  nextFollowUp: z.string().datetime().optional().nullable(),
});

export const interactionFormSchema = z.object({
  type: z.enum(['call', 'email', 'meeting', 'proposal', 'note']),
  date: z.string().datetime(),
  description: z.string().min(5, 'Descrição deve ter pelo menos 5 caracteres'),
});

export const winOpportunitySchema = z.object({
  actualValue: z.number().min(0, 'Valor real deve ser positivo'),
});

export const loseOpportunitySchema = z.object({
  lostReason: z.string().min(5, 'Motivo deve ter pelo menos 5 caracteres'),
});

export type OpportunityFormData = z.infer<typeof opportunitySchema>;
export type InteractionFormData = z.infer<typeof interactionFormSchema>;
```

---

## 5. Mock Data Completo

### 5.1 Mock de Clientes

```typescript
// 📁 lib/mocks/crm-data.ts

import { Customer, PipelineStage, Opportunity, Tag } from '@/types/crm';

export const mockCustomers: Customer[] = [
  {
    id: 'cust-001',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999',
    avatar: null,
    address: {
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apto 45',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01001-000',
    },
    contacts: [
      { id: 'cont-001', type: 'phone', value: '(11) 99999-9999', primary: true },
      { id: 'cont-002', type: 'email', value: 'joao.silva@email.com', primary: true },
      { id: 'cont-003', type: 'phone', value: '(11) 98888-8888', primary: false },
    ],
    tags: [
      { id: 'tag-001', name: 'VIP', color: '#F59E0B' },
      { id: 'tag-002', name: 'Recorrente', color: '#10B981' },
    ],
    lastPurchase: '2026-03-10',
    totalSpent: 12500.00,
    totalOrders: 8,
    notes: 'Cliente desde 2025, sempre pontual nos pagamentos. Prefere contato por WhatsApp.',
    createdAt: '2025-06-15T10:00:00Z',
    interactions: [
      {
        id: 'int-001',
        type: 'purchase',
        date: '2026-03-10T14:30:00Z',
        description: 'Compra #12345 - R$ 2.500,00',
        user: 'Sistema',
      },
      {
        id: 'int-002',
        type: 'call',
        date: '2026-03-05T09:00:00Z',
        description: 'Ligação de follow-up sobre novo pedido',
        user: 'Ana Silva',
      },
    ],
  },
  {
    id: 'cust-002',
    name: 'Maria Santos',
    email: 'maria.santos@empresa.com',
    phone: '(11) 98888-8888',
    avatar: null,
    address: {
      street: 'Av. Paulista',
      number: '1000',
      complement: 'Sala 501',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100',
    },
    contacts: [
      { id: 'cont-004', type: 'email', value: 'maria.santos@empresa.com', primary: true },
    ],
    tags: [
      { id: 'tag-003', name: 'Novo', color: '#3B82F6' },
    ],
    lastPurchase: null,
    totalSpent: 0,
    totalOrders: 0,
    notes: 'Lead capturado pelo site em março/2026. Empresa de médio porte, interessada em consultoria.',
    createdAt: '2026-03-01T08:00:00Z',
    interactions: [],
  },
  {
    id: 'cust-003',
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@startup.io',
    phone: '(21) 97777-7777',
    avatar: null,
    address: {
      street: 'Rua do Ouvidor',
      number: '50',
      complement: '',
      neighborhood: 'Centro',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '20040-030',
    },
    contacts: [
      { id: 'cont-005', type: 'phone', value: '(21) 97777-7777', primary: true },
      { id: 'cont-006', type: 'whatsapp', value: '(21) 97777-7777', primary: false },
    ],
    tags: [
      { id: 'tag-004', name: 'Inativo', color: '#6B7280' },
    ],
    lastPurchase: '2025-12-20',
    totalSpent: 3500.00,
    totalOrders: 2,
    notes: 'Cliente inativo desde dezembro. Último contato em janeiro sem resposta.',
    createdAt: '2025-08-10T10:00:00Z',
    interactions: [
      {
        id: 'int-003',
        type: 'email',
        date: '2026-01-15T10:00:00Z',
        description: 'Email de reativação enviado - sem resposta',
        user: 'Carlos Mendes',
      },
    ],
  },
  // ... mais 17 clientes
];

export const mockTags: Tag[] = [
  { id: 'tag-001', name: 'VIP', color: '#F59E0B' },
  { id: 'tag-002', name: 'Recorrente', color: '#10B981' },
  { id: 'tag-003', name: 'Novo', color: '#3B82F6' },
  { id: 'tag-004', name: 'Inativo', color: '#6B7280' },
  { id: 'tag-005', name: 'Pendente', color: '#EF4444' },
  { id: 'tag-006', name: 'Indicação', color: '#8B5CF6' },
];
```

### 5.2 Mock do Pipeline

```typescript
// 📁 lib/mocks/pipeline-data.ts

import { PipelineStage, Opportunity } from '@/types/crm';

export const mockPipelineStages: PipelineStage[] = [
  {
    id: 'novo_lead',
    name: 'Novo Lead',
    color: '#3B82F6',
    order: 1,
    count: 5,
    total: 15000,
  },
  {
    id: 'contato_feito',
    name: 'Contato Feito',
    color: '#8B5CF6',
    order: 2,
    count: 3,
    total: 8000,
  },
  {
    id: 'proposta_enviada',
    name: 'Proposta Enviada',
    color: '#F59E0B',
    order: 3,
    count: 4,
    total: 25000,
  },
  {
    id: 'negociacao',
    name: 'Negociação',
    color: '#EC4899',
    order: 4,
    count: 2,
    total: 12000,
  },
  {
    id: 'fechado_ganho',
    name: 'Fechado (Ganho)',
    color: '#10B981',
    order: 5,
    count: 12,
    total: 45000,
  },
  {
    id: 'fechado_perdido',
    name: 'Fechado (Perdido)',
    color: '#6B7280',
    order: 6,
    count: 3,
    total: 8000,
  },
];

export const mockOpportunities: Opportunity[] = [
  {
    id: 'opp-001',
    customerId: 'cust-001',
    customerName: 'João Silva',
    customerAvatar: null,
    title: 'Projeto de Consultoria Q2',
    value: 15000,
    probability: 60,
    stage: 'proposta_enviada',
    lastContact: '2026-03-14',
    nextFollowUp: '2026-03-17',
    createdAt: '2026-03-01T10:00:00Z',
    status: 'open',
    interactions: [
      {
        id: 'opp-int-001',
        type: 'email',
        date: '2026-03-14T14:00:00Z',
        description: 'Proposta comercial enviada por email com detalhes do projeto',
        user: 'Ana Silva',
      },
      {
        id: 'opp-int-002',
        type: 'call',
        date: '2026-03-10T10:30:00Z',
        description: 'Primeira ligação apresentando serviços de consultoria',
        user: 'Ana Silva',
      },
    ],
  },
  {
    id: 'opp-002',
    customerId: 'cust-002',
    customerName: 'Maria Santos',
    customerAvatar: null,
    title: 'Compra de Produtos Premium',
    value: 2500,
    probability: 20,
    stage: 'novo_lead',
    lastContact: '2026-03-13',
    nextFollowUp: '2026-03-16',
    createdAt: '2026-03-13T09:00:00Z',
    status: 'open',
    interactions: [
      {
        id: 'opp-int-003',
        type: 'meeting',
        date: '2026-03-13T09:00:00Z',
        description: 'Visita à loja física - conhecimento dos produtos',
        user: 'Pedro Santos',
      },
    ],
  },
  {
    id: 'opp-003',
    customerId: 'cust-003',
    customerName: 'Pedro Oliveira',
    customerAvatar: null,
    title: 'Renovação de Contrato',
    value: 8000,
    probability: 40,
    stage: 'negociacao',
    lastContact: '2026-03-12',
    nextFollowUp: '2026-03-15',
    createdAt: '2026-02-20T11:00:00Z',
    status: 'open',
    interactions: [
      {
        id: 'opp-int-004',
        type: 'proposal',
        date: '2026-03-12T15:00:00Z',
        description: 'Nova proposta de valor enviada para reativação',
        user: 'Carlos Mendes',
      },
    ],
  },
  // ... mais oportunidades
];
```

---

## 6. Componentes Detalhados

### 6.1 KanbanBoard (COMPONENTE CRÍTICO)

**Arquivo:** `components/crm/pipeline/kanban-board.tsx`

```typescript
'use client';

import React, { useState, useCallback, useMemo } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  DropAnimation,
  closestCorners,
  KeyboardSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { PipelineStage, Opportunity } from '@/types/crm';
import { KanbanColumn } from './kanban-column';
import { KanbanCard } from './kanban-card';
import { KanbanDragOverlay } from './kanban-drag-overlay';

interface KanbanBoardProps {
  stages: PipelineStage[];
  opportunities: Opportunity[];
  onMoveOpportunity: (opportunityId: string, newStageId: string) => void;
  onAddOpportunity: (stageId: string, data: Partial<Opportunity>) => void;
  onEditOpportunity: (opportunity: Opportunity) => void;
  onDeleteOpportunity: (id: string) => void;
  onCardClick?: (opportunity: Opportunity) => void;
  loading?: boolean;
}

export function KanbanBoard({
  stages,
  opportunities,
  onMoveOpportunity,
  onAddOpportunity,
  onEditOpportunity,
  onDeleteOpportunity,
  onCardClick,
  loading = false,
}: KanbanBoardProps) {
  // Estado para drag ativo
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeOpportunity, setActiveOpportunity] = useState<Opportunity | null>(null);

  // Configuração dos sensores (mouse e teclado)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Previne drag acidental em clicks
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Agrupa oportunidades por estágio
  const opportunitiesByStage = useMemo(() => {
    const grouped: Record<string, Opportunity[]> = {};
    stages.forEach((stage) => {
      grouped[stage.id] = opportunities.filter((opp) => opp.stage === stage.id);
    });
    return grouped;
  }, [opportunities, stages]);

  // Handlers de drag
  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
    
    const opportunity = opportunities.find((opp) => opp.id === active.id);
    if (opportunity) {
      setActiveOpportunity(opportunity);
    }
  }, [opportunities]);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const activeId = active.id as string;
    const overId = over.id as string;
    
    // Se está sobre uma coluna diferente, atualiza visual
    const activeOpportunity = opportunities.find((opp) => opp.id === activeId);
    const overStage = stages.find((stage) => stage.id === overId);
    
    if (activeOpportunity && overStage && activeOpportunity.stage !== overStage.id) {
      // Poderia adicionar preview visual aqui
    }
  }, [opportunities, stages]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    
    setActiveId(null);
    setActiveOpportunity(null);
    
    if (!over) return;
    
    const activeId = active.id as string;
    const overId = over.id as string;
    
    const opportunity = opportunities.find((opp) => opp.id === activeId);
    
    if (!opportunity) return;
    
    // Verifica se soltou sobre uma coluna (stage)
    const overStage = stages.find((stage) => stage.id === overId);
    
    if (overStage && opportunity.stage !== overStage.id) {
      onMoveOpportunity(activeId, overStage.id);
    } else {
      // Verifica se soltou sobre outro card
      const overOpportunity = opportunities.find((opp) => opp.id === overId);
      if (overOpportunity && opportunity.stage !== overOpportunity.stage) {
        onMoveOpportunity(activeId, overOpportunity.stage);
      }
    }
  }, [opportunities, stages, onMoveOpportunity]);

  // Animação de drop
  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };

  if (loading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className="min-w-[300px] w-[300px] bg-muted/50 rounded-lg p-4"
          >
            <div className="h-6 w-32 bg-muted rounded animate-pulse mb-4" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4 min-h-[500px]">
        <SortableContext
          items={stages.map((s) => s.id)}
          strategy={horizontalListSortingStrategy}
        >
          {stages.map((stage) => (
            <KanbanColumn
              key={stage.id}
              stage={stage}
              opportunities={opportunitiesByStage[stage.id] || []}
              onAddOpportunity={onAddOpportunity}
              onEditOpportunity={onEditOpportunity}
              onDeleteOpportunity={onDeleteOpportunity}
              onCardClick={onCardClick}
            />
          ))}
        </SortableContext>
      </div>

      <DragOverlay dropAnimation={dropAnimation}>
        {activeOpportunity ? (
          <KanbanDragOverlay opportunity={activeOpportunity} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
```

### 6.2 KanbanColumn

**Arquivo:** `components/crm/pipeline/kanban-column.tsx`

```typescript
'use client';

import React from 'react';
import { useSortable, useDroppable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PipelineStage, Opportunity } from '@/types/crm';
import { KanbanCard } from './kanban-card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatCurrency } from '@/lib/utils';

interface KanbanColumnProps {
  stage: PipelineStage;
  opportunities: Opportunity[];
  onAddOpportunity: (stageId: string, data: Partial<Opportunity>) => void;
  onEditOpportunity: (opportunity: Opportunity) => void;
  onDeleteOpportunity: (id: string) => void;
  onCardClick?: (opportunity: Opportunity) => void;
}

export function KanbanColumn({
  stage,
  opportunities,
  onAddOpportunity,
  onEditOpportunity,
  onDeleteOpportunity,
  onCardClick,
}: KanbanColumnProps) {
  const {
    setNodeRef: setSortableRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: stage.id,
    data: {
      type: 'column',
      stage,
    },
  });

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: stage.id,
    data: {
      type: 'column',
      stage,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Calcula totais
  const totalValue = opportunities.reduce((sum, opp) => sum + opp.value, 0);
  const weightedValue = opportunities.reduce(
    (sum, opp) => sum + (opp.value * opp.probability) / 100,
    0
  );

  const handleAddClick = () => {
    onAddOpportunity(stage.id, {
      stage: stage.id,
      title: 'Nova Oportunidade',
      value: 0,
      probability: 20,
    });
  };

  return (
    <div
      ref={setSortableRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        min-w-[300px] w-[300px] flex flex-col rounded-lg border bg-card
        ${isDragging ? 'opacity-50' : ''}
        ${isOver ? 'ring-2 ring-primary ring-offset-2' : ''}
      `}
    >
      {/* Header da Coluna */}
      <div
        className="p-3 border-b rounded-t-lg"
        style={{ backgroundColor: `${stage.color}15` }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: stage.color }}
            />
            <h3 className="font-semibold text-sm">{stage.name}</h3>
          </div>
          <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded-full">
            {opportunities.length}
          </span>
        </div>
        
        {/* Resumo financeiro */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Total:</span>
            <span className="font-medium">{formatCurrency(totalValue)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Ponderado:</span>
            <span className="font-medium text-primary">
              {formatCurrency(weightedValue)}
            </span>
          </div>
        </div>
      </div>

      {/* Área de Drop (Cards) */}
      <div
        ref={setDroppableRef}
        className={`
          flex-1 p-2 space-y-2 min-h-[200px]
          ${isOver ? 'bg-muted/50' : ''}
        `}
      >
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2 pr-2">
            {opportunities.map((opportunity) => (
              <KanbanCard
                key={opportunity.id}
                opportunity={opportunity}
                stageColor={stage.color}
                onEdit={onEditOpportunity}
                onDelete={onDeleteOpportunity}
                onClick={onCardClick}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Footer com botão add */}
      <div className="p-2 border-t">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={handleAddClick}
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar oportunidade
        </Button>
      </div>
    </div>
  );
}
```

### 6.3 KanbanCard

**Arquivo:** `components/crm/pipeline/kanban-card.tsx`

```typescript
'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Opportunity } from '@/types/crm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, TrendingUp, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface KanbanCardProps {
  opportunity: Opportunity;
  stageColor: string;
  onEdit: (opportunity: Opportunity) => void;
  onDelete: (id: string) => void;
  onClick?: (opportunity: Opportunity) => void;
}

export function KanbanCard({
  opportunity,
  stageColor,
  onEdit,
  onDelete,
  onClick,
}: KanbanCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: opportunity.id,
    data: {
      type: 'opportunity',
      opportunity,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Cor da probabilidade
  const getProbabilityColor = (prob: number) => {
    if (prob >= 70) return 'bg-green-500';
    if (prob >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Iniciais do cliente
  const initials = opportunity.customerName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow
        ${isDragging ? 'opacity-50 rotate-2 shadow-xl' : ''}
      `}
      onClick={() => onClick?.(opportunity)}
    >
      {/* Indicador de cor do estágio */}
      <div
        className="h-1 rounded-t-lg"
        style={{ backgroundColor: stageColor }}
      />

      <CardHeader className="p-3 pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarFallback className="text-xs bg-primary/10">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground truncate">
                {opportunity.customerName}
              </p>
              <h4 className="text-sm font-medium truncate">
                {opportunity.title}
              </h4>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-6 w-6 -mr-1">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(opportunity)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete(opportunity.id)}
              >
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="p-3 pt-0 space-y-2">
        {/* Valor */}
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-primary">
            {formatCurrency(opportunity.value)}
          </span>
        </div>

        {/* Probabilidade */}
        <div className="flex items-center gap-2">
          <TrendingUp className="w-3 h-3 text-muted-foreground" />
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full ${getProbabilityColor(opportunity.probability)}`}
              style={{ width: `${opportunity.probability}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {opportunity.probability}%
          </span>
        </div>

        {/* Follow-up */}
        {opportunity.nextFollowUp && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>
              {format(new Date(opportunity.nextFollowUp), "dd MMM", {
                locale: ptBR,
              })}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

### 6.4 CustomerTable

**Arquivo:** `components/crm/customers/customer-table.tsx`

```typescript
'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Customer, SortConfig } from '@/types/crm';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  ArrowUpDown,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface CustomerTableProps {
  customers: Customer[];
  loading?: boolean;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  selectedIds: string[];
  onSelect: (selectedIds: string[]) => void;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
}

export function CustomerTable({
  customers,
  loading = false,
  onEdit,
  onDelete,
  selectedIds,
  onSelect,
  sortConfig,
  onSort,
}: CustomerTableProps) {
  const handleSelectAll = () => {
    if (selectedIds.length === customers.length) {
      onSelect([]);
    } else {
      onSelect(customers.map((c) => c.id));
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelect(selectedIds.filter((sid) => sid !== id));
    } else {
      onSelect([...selectedIds, id]);
    }
  };

  const getSortIcon = (columnKey: string) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown className="w-3 h-3 ml-1" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="w-3 h-3 ml-1" />
    ) : (
      <ChevronDown className="w-3 h-3 ml-1" />
    );
  };

  if (loading) {
    return (
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"><Skeleton className="h-4 w-4" /></TableHead>
              <TableHead><Skeleton className="h-4 w-24" /></TableHead>
              <TableHead><Skeleton className="h-4 w-32" /></TableHead>
              <TableHead><Skeleton className="h-4 w-24" /></TableHead>
              <TableHead><Skeleton className="h-4 w-20" /></TableHead>
              <TableHead><Skeleton className="h-4 w-24" /></TableHead>
              <TableHead><Skeleton className="h-4 w-20" /></TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell><Skeleton className="h-4 w-8" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="border rounded-lg p-12 text-center">
        <div className="text-muted-foreground">
          <p className="text-lg font-medium mb-2">Nenhum cliente encontrado</p>
          <p className="text-sm">
            Tente ajustar os filtros ou adicione um novo cliente.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox
                checked={
                  selectedIds.length === customers.length && customers.length > 0
                }
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => onSort('name')}
            >
              <div className="flex items-center">
                Nome
                {getSortIcon('name')}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => onSort('email')}
            >
              <div className="flex items-center">
                Email
                {getSortIcon('email')}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => onSort('phone')}
            >
              <div className="flex items-center">
                Telefone
                {getSortIcon('phone')}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => onSort('lastPurchase')}
            >
              <div className="flex items-center">
                Última Compra
                {getSortIcon('lastPurchase')}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => onSort('totalSpent')}
            >
              <div className="flex items-center">
                Total Gasto
                {getSortIcon('totalSpent')}
              </div>
            </TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <Checkbox
                  checked={selectedIds.includes(customer.id)}
                  onCheckedChange={() => handleSelectOne(customer.id)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-primary/10">
                      {customer.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{customer.name}</span>
                </div>
              </TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone || '-'}</TableCell>
              <TableCell>
                {customer.lastPurchase
                  ? format(new Date(customer.lastPurchase), 'dd/MM/yyyy', {
                      locale: ptBR,
                    })
                  : '-'}
              </TableCell>
              <TableCell>{formatCurrency(customer.totalSpent)}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {customer.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag.id}
                      style={{
                        backgroundColor: `${tag.color}20`,
                        color: tag.color,
                        borderColor: tag.color,
                      }}
                      variant="outline"
                      className="text-xs"
                    >
                      {tag.name}
                    </Badge>
                  ))}
                  {customer.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{customer.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(customer)}>
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => onDelete(customer)}
                    >
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
```

### 6.5 CustomerForm

**Arquivo:** `components/crm/customers/customer-form.tsx`

```typescript
'use client';

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Customer, Contact, Tag } from '@/types/crm';
import { customerSchema, CustomerFormData } from '@/lib/schemas/customer-schema';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ContactInput } from './customer-contacts';
import { TagInput } from './customer-tags';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Plus, X } from 'lucide-react';

interface CustomerFormProps {
  customer?: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CustomerFormData) => void;
  availableTags: Tag[];
}

export function CustomerForm({
  customer,
  open,
  onOpenChange,
  onSubmit,
  availableTags,
}: CustomerFormProps) {
  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: customer
      ? {
          name: customer.name,
          email: customer.email,
          phone: customer.phone || '',
          address: customer.address || {
            street: '',
            number: '',
            complement: '',
            neighborhood: '',
            city: '',
            state: '',
            zipCode: '',
          },
          contacts: customer.contacts,
          tags: customer.tags,
          notes: customer.notes || '',
        }
      : {
          name: '',
          email: '',
          phone: '',
          address: {
            street: '',
            number: '',
            complement: '',
            neighborhood: '',
            city: '',
            state: '',
            zipCode: '',
          },
          contacts: [],
          tags: [],
          notes: '',
        },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'contacts',
  });

  const handleSubmit = (data: CustomerFormData) => {
    onSubmit(data);
    if (!customer) {
      form.reset();
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {customer ? 'Editar Cliente' : 'Novo Cliente'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-6">
                {/* Dados Básicos */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Dados Básicos
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome *</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome completo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="email@exemplo.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone Principal</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(00) 00000-0000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                {/* Contatos Adicionais */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Contatos Adicionais
                    </h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        append({
                          id: `new-${Date.now()}`,
                          type: 'phone',
                          value: '',
                          primary: false,
                        })
                      }
                      disabled={fields.length >= 10}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Adicionar
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {fields.map((field, index) => (
                      <ContactInput
                        key={field.id}
                        index={index}
                        control={form.control}
                        onRemove={() => remove(index)}
                      />
                    ))}
                    {fields.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        Nenhum contato adicional. Clique em "Adicionar" para incluir.
                      </p>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Endereço */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Endereço
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="address.street"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Rua</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome da rua" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address.number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número</FormLabel>
                          <FormControl>
                            <Input placeholder="123" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address.complement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Complemento</FormLabel>
                          <FormControl>
                            <Input placeholder="Apto, Sala, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="address.neighborhood"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bairro</FormLabel>
                          <FormControl>
                            <Input placeholder="Bairro" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cidade</FormLabel>
                          <FormControl>
                            <Input placeholder="Cidade" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="address.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="SP"
                              maxLength={2}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address.zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CEP</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="00000-000"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Separator />

                {/* Tags */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Tags
                  </h3>
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TagInput
                            tags={field.value}
                            onChange={field.onChange}
                            availableTags={availableTags}
                            maxTags={5}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                {/* Anotações */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Anotações
                  </h3>
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Observações sobre o cliente..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </ScrollArea>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {customer ? 'Salvar Alterações' : 'Criar Cliente'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
```

### 6.6 TagInput

**Arquivo:** `components/crm/shared/tag-input.tsx`

```typescript
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Tag } from '@/types/crm';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface TagInputProps {
  tags: Tag[];
  onChange: (tags: Tag[]) => void;
  availableTags: Tag[];
  maxTags?: number;
}

const PRESET_COLORS = [
  '#EF4444', // red
  '#F97316', // orange
  '#F59E0B', // amber
  '#84CC16', // lime
  '#10B981', // emerald
  '#06B6D4', // cyan
  '#3B82F6', // blue
  '#8B5CF6', // violet
  '#D946EF', // fuchsia
  '#F43F5E', // rose
];

export function TagInput({
  tags,
  onChange,
  availableTags,
  maxTags = 5,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredAvailable = availableTags.filter(
    (tag) => !tags.some((t) => t.id === tag.id)
  );

  const handleAddTag = () => {
    if (!inputValue.trim() || tags.length >= maxTags) return;

    const existingTag = availableTags.find(
      (t) => t.name.toLowerCase() === inputValue.toLowerCase()
    );

    if (existingTag && !tags.some((t) => t.id === existingTag.id)) {
      onChange([...tags, existingTag]);
    } else if (!existingTag) {
      const newTag: Tag = {
        id: `new-${Date.now()}`,
        name: inputValue.trim(),
        color: selectedColor,
      };
      onChange([...tags, newTag]);
    }

    setInputValue('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleRemoveTag = (tagId: string) => {
    onChange(tags.filter((t) => t.id !== tagId));
  };

  const handleSelectExisting = (tag: Tag) => {
    if (tags.length < maxTags) {
      onChange([...tags, tag]);
    }
    setIsOpen(false);
  };

  return (
    <div className="space-y-2">
      {/* Tags existentes */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag.id}
            style={{
              backgroundColor: `${tag.color}20`,
              color: tag.color,
              borderColor: tag.color,
            }}
            variant="outline"
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            {tag.name}
            <button
              type="button"
              onClick={() => handleRemoveTag(tag.id)}
              className="ml-1 hover:opacity-70"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>

      {/* Input para nova tag */}
      {tags.length < maxTags && (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8"
            >
              <Plus className="w-3 h-3 mr-1" />
              Adicionar tag
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-3">
              <Input
                ref={inputRef}
                placeholder="Nome da tag..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />

              {/* Seletor de cor */}
              <div className="flex flex-wrap gap-1">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? 'border-foreground scale-110'
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              {/* Tags disponíveis */}
              {filteredAvailable.length > 0 && (
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground mb-2">
                    Tags existentes:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {filteredAvailable.map((tag) => (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => handleSelectExisting(tag)}
                        className="text-xs px-2 py-1 rounded-full border hover:opacity-80 transition-opacity"
                        style={{
                          backgroundColor: `${tag.color}20`,
                          color: tag.color,
                          borderColor: tag.color,
                        }}
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <Button
                type="button"
                size="sm"
                className="w-full"
                onClick={handleAddTag}
                disabled={!inputValue.trim()}
              >
                Criar "{inputValue || 'nova tag'}"
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}

      {tags.length >= maxTags && (
        <p className="text-xs text-muted-foreground">
          Limite de {maxTags} tags atingido.
        </p>
      )}
    </div>
  );
}
```

### 6.7 Timeline Component

**Arquivo:** `components/crm/shared/timeline.tsx`

```typescript
'use client';

import React from 'react';
import { OpportunityInteraction, CustomerInteraction } from '@/types/crm';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Phone,
  Mail,
  Users,
  FileText,
  StickyNote,
  ShoppingCart,
  MapPin,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

type TimelineEvent = OpportunityInteraction | CustomerInteraction;

interface TimelineProps {
  events: TimelineEvent[];
  showAddButton?: boolean;
  onAddEvent?: () => void;
}

const eventConfig: Record<
  string,
  { icon: React.ElementType; color: string; label: string }
> = {
  call: { icon: Phone, color: 'bg-blue-500', label: 'Ligação' },
  email: { icon: Mail, color: 'bg-green-500', label: 'Email' },
  meeting: { icon: Users, color: 'bg-purple-500', label: 'Reunião' },
  proposal: { icon: FileText, color: 'bg-yellow-500', label: 'Proposta' },
  note: { icon: StickyNote, color: 'bg-gray-500', label: 'Nota' },
  purchase: { icon: ShoppingCart, color: 'bg-emerald-600', label: 'Compra' },
  visit: { icon: MapPin, color: 'bg-orange-500', label: 'Visita' },
};

export function Timeline({
  events,
  showAddButton = false,
  onAddEvent,
}: TimelineProps) {
  // Ordena eventos do mais recente para o mais antigo
  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Agrupa por data
  const groupedEvents = sortedEvents.reduce((groups, event) => {
    const date = format(new Date(event.date), 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(event);
    return groups;
  }, {} as Record<string, TimelineEvent[]>);

  const getRelativeDateLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    }
    if (date.toDateString() === yesterday.toDateString()) {
      return 'Ontem';
    }
    return format(date, "dd 'de' MMMM", { locale: ptBR });
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground text-sm">
          Nenhuma interação registrada
        </p>
        {showAddButton && (
          <button
            onClick={onAddEvent}
            className="text-primary text-sm hover:underline mt-2"
          >
            Registrar primeira interação
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedEvents).map(([date, dayEvents]) => (
        <div key={date}>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">
            {getRelativeDateLabel(date)}
          </h4>
          <div className="space-y-4">
            {dayEvents.map((event) => {
              const config = eventConfig[event.type] || eventConfig.note;
              const Icon = config.icon;
              const initials = event.user
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase();

              return (
                <div key={event.id} className="flex gap-3">
                  {/* Linha e ícone */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full ${config.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="w-0.5 flex-1 bg-border mt-2" />
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="secondary" className="text-xs mb-1">
                          {config.label}
                        </Badge>
                        <p className="text-sm">{event.description}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(event.date), 'HH:mm')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <Avatar className="w-5 h-5">
                        <AvatarFallback className="text-[10px]">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">
                        {event.user}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## 7. Configuração do @dnd-kit

### 7.1 Setup Completo

```typescript
// 📁 lib/dnd-config.ts

import {
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

export function useDndSensors() {
  return useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
}
```

### 7.2 Drag Overlay Component

```typescript
// 📁 components/crm/pipeline/kanban-drag-overlay.tsx

import React from 'react';
import { Opportunity } from '@/types/crm';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatCurrency } from '@/lib/utils';
import { TrendingUp } from 'lucide-react';

interface KanbanDragOverlayProps {
  opportunity: Opportunity;
}

export function KanbanDragOverlay({ opportunity }: KanbanDragOverlayProps) {
  const initials = opportunity.customerName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card className="w-[280px] rotate-3 shadow-2xl opacity-95 cursor-grabbing">
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="text-xs bg-primary/10">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground truncate">
              {opportunity.customerName}
            </p>
            <h4 className="text-sm font-medium truncate">
              {opportunity.title}
            </h4>
          </div>
        </div>

        <div className="text-lg font-bold text-primary">
          {formatCurrency(opportunity.value)}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <TrendingUp className="w-3 h-3 text-muted-foreground" />
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${opportunity.probability}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {opportunity.probability}%
          </span>
        </div>
      </div>
    </Card>
  );
}
```

---

## 8. Páginas

### 8.1 Página de Clientes

```typescript
// 📁 app/crm/clientes/page.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { Customer, CustomerFilters, SortConfig } from '@/types/crm';
import { CustomerTable } from '@/components/crm/customers/customer-table';
import { CustomerForm } from '@/components/crm/customers/customer-form';
import { CustomerFilters as FilterBar } from '@/components/crm/customers/customer-filters';
import { Button } from '@/components/ui/button';
import { Plus, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockCustomers, mockTags } from '@/lib/mocks/crm-data';
import { useDebounce } from '@/lib/hooks/use-debounce';

export default function CustomersPage() {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'asc',
  });
  const [filters, setFilters] = useState<CustomerFilters>({
    search: '',
    lastPurchaseDate: { from: null, to: null },
    totalSpent: { min: null, max: null },
    tags: [],
    hasPurchase: 'all',
  });
  const [formOpen, setFormOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(filters.search, 300);

  // Filtra e ordena clientes
  const filteredCustomers = useMemo(() => {
    let result = [...customers];

    // Filtro de busca
    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(searchLower) ||
          c.email.toLowerCase().includes(searchLower)
      );
    }

    // Filtro de tags
    if (filters.tags.length > 0) {
      result = result.filter((c) =>
        filters.tags.some((tagId) => c.tags.some((t) => t.id === tagId))
      );
    }

    // Ordenação
    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [customers, debouncedSearch, filters.tags, sortConfig]);

  const handleSort = (key: string) => {
    setSortConfig((current) => ({
      key: key as keyof Customer,
      direction:
        current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleAdd = () => {
    setEditingCustomer(null);
    setFormOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormOpen(true);
  };

  const handleDelete = (customer: Customer) => {
    if (confirm(`Tem certeza que deseja excluir ${customer.name}?`)) {
      setCustomers((prev) => prev.filter((c) => c.id !== customer.id));
      toast({
        title: 'Cliente excluído',
        description: `${customer.name} foi removido com sucesso.`,
      });
    }
  };

  const handleSubmit = (data: any) => {
    if (editingCustomer) {
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === editingCustomer.id ? { ...c, ...data } : c
        )
      );
      toast({
        title: 'Cliente atualizado',
        description: 'As alterações foram salvas com sucesso.',
      });
    } else {
      const newCustomer: Customer = {
        ...data,
        id: `cust-${Date.now()}`,
        totalSpent: 0,
        totalOrders: 0,
        createdAt: new Date().toISOString(),
        interactions: [],
      };
      setCustomers((prev) => [newCustomer, ...prev]);
      toast({
        title: 'Cliente criado',
        description: `${data.name} foi adicionado com sucesso.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie sua base de clientes e leads
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Cliente
          </Button>
        </div>
      </div>

      <FilterBar filters={filters} onFiltersChange={setFilters} tags={mockTags} />

      {selectedIds.length > 0 && (
        <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
          <span className="text-sm">
            {selectedIds.length} cliente(s) selecionado(s)
          </span>
          <Button variant="ghost" size="sm" onClick={() => setSelectedIds([])}>
            Limpar seleção
          </Button>
        </div>
      )}

      <CustomerTable
        customers={filteredCustomers}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        selectedIds={selectedIds}
        onSelect={setSelectedIds}
        sortConfig={sortConfig}
        onSort={handleSort}
      />

      <CustomerForm
        customer={editingCustomer}
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleSubmit}
        availableTags={mockTags}
      />
    </div>
  );
}
```

### 8.2 Página do Pipeline

```typescript
// 📁 app/crm/pipeline/page.tsx

'use client';

import React, { useState } from 'react';
import { PipelineStage, Opportunity } from '@/types/crm';
import { KanbanBoard } from '@/components/crm/pipeline/kanban-board';
import { PipelineStats } from '@/components/crm/pipeline/pipeline-stats';
import { OpportunityDetailDrawer } from '@/components/crm/opportunities/opportunity-detail-drawer';
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockPipelineStages, mockOpportunities } from '@/lib/mocks/pipeline-data';

export default function PipelinePage() {
  const { toast } = useToast();
  const [stages, setStages] = useState<PipelineStage[]>(mockPipelineStages);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMoveOpportunity = (opportunityId: string, newStageId: string) => {
    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === opportunityId ? { ...opp, stage: newStageId } : opp
      )
    );

    const stage = stages.find((s) => s.id === newStageId);
    toast({
      title: 'Oportunidade movida',
      description: `Movida para "${stage?.name}"`,
    });
  };

  const handleAddOpportunity = (stageId: string, data: Partial<Opportunity>) => {
    const newOpportunity: Opportunity = {
      id: `opp-${Date.now()}`,
      customerId: 'new',
      customerName: 'Novo Cliente',
      title: data.title || 'Nova Oportunidade',
      value: data.value || 0,
      probability: data.probability || 20,
      stage: stageId,
      createdAt: new Date().toISOString(),
      status: 'open',
      interactions: [],
    };

    setOpportunities((prev) => [newOpportunity, ...prev]);
    toast({
      title: 'Oportunidade criada',
      description: 'Nova oportunidade adicionada ao pipeline.',
    });
  };

  const handleEditOpportunity = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    setDrawerOpen(true);
  };

  const handleDeleteOpportunity = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta oportunidade?')) {
      setOpportunities((prev) => prev.filter((opp) => opp.id !== id));
      toast({
        title: 'Oportunidade excluída',
        variant: 'destructive',
      });
    }
  };

  const handleCardClick = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    setDrawerOpen(true);
  };

  // Calcula estatísticas
  const stats = {
    totalOpen: opportunities.filter((o) => o.status === 'open').length,
    totalValue: opportunities.reduce((sum, o) => sum + o.value, 0),
    weightedValue: opportunities.reduce(
      (sum, o) => sum + (o.value * o.probability) / 100,
      0
    ),
    conversionRate: 0, // Mock
  };

  return (
    <div className="space-y-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pipeline de Vendas</h1>
          <p className="text-muted-foreground">
            Acompanhe e gerencie suas oportunidades
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      <PipelineStats stats={stats} />

      <div className="flex-1 min-h-0">
        <KanbanBoard
          stages={stages}
          opportunities={opportunities}
          onMoveOpportunity={handleMoveOpportunity}
          onAddOpportunity={handleAddOpportunity}
          onEditOpportunity={handleEditOpportunity}
          onDeleteOpportunity={handleDeleteOpportunity}
          onCardClick={handleCardClick}
        />
      </div>

      <OpportunityDetailDrawer
        opportunity={selectedOpportunity}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        stages={stages}
        onMove={handleMoveOpportunity}
        onWin={(id, value) => {
          setOpportunities((prev) =>
            prev.map((o) =>
              o.id === id
                ? { ...o, status: 'won', actualValue: value, stage: 'fechado_ganho' }
                : o
            )
          );
        }}
        onLose={(id, reason) => {
          setOpportunities((prev) =>
            prev.map((o) =>
              o.id === id
                ? { ...o, status: 'lost', lostReason: reason, stage: 'fechado_perdido' }
                : o
            )
          );
        }}
      />
    </div>
  );
}
```

---

## 9. Cronograma de Implementação

### Semana 1: Lista de Clientes + Formulários

| Dia | Tarefa | Componentes | Status |
|-----|--------|-------------|--------|
| **Dia 1** | Setup e Types | Criar types/crm.ts, schemas Zod | ⬜ |
| **Dia 1** | Mock Data | Implementar mocks completos | ⬜ |
| **Dia 2** | CustomerTable | Tabela com ordenação e seleção | ⬜ |
| **Dia 2** | CustomerFilters | Filtros de busca e tags | ⬜ |
| **Dia 3** | TagInput | Componente de tags com cores | ⬜ |
| **Dia 3** | ContactInput | Input de contatos dinâmico | ⬜ |
| **Dia 4** | CustomerForm | Form completo com validação | ⬜ |
| **Dia 4** | Timeline | Componente timeline genérico | ⬜ |
| **Dia 5** | Página Clientes | Integração e testes | ⬜ |
| **Dia 5** | Review | Code review e ajustes | ⬜ |

### Semana 2: Kanban + Detalhes

| Dia | Tarefa | Componentes | Status |
|-----|--------|-------------|--------|
| **Dia 6** | Dnd Setup | Configurar @dnd-kit | ⬜ |
| **Dia 6** | KanbanColumn | Colunas sortáveis | ⬜ |
| **Dia 7** | KanbanCard | Cards arrastáveis | ⬜ |
| **Dia 7** | KanbanBoard | Board principal com DndContext | ⬜ |
| **Dia 8** | Drag Overlay | Overlay durante drag | ⬜ |
| **Dia 8** | PipelineStats | Cards de estatísticas | ⬜ |
| **Dia 9** | OpportunityDetail | Drawer de detalhes | ⬜ |
| **Dia 9** | InteractionForm | Form de nova interação | ⬜ |
| **Dia 10** | Actions | Botões Ganhar/Perder/Mover | ⬜ |
| **Dia 10** | Página Pipeline | Integração completa | ⬜ |
| **Dia 11-12** | Testes | Testes manuais e ajustes | ⬜ |
| **Dia 13-14** | Polish | Estados empty, loading, responsivo | ⬜ |

---

## 10. Checklist de Definition of Done

### 10.1 Funcionalidades

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

### 10.2 Componentes

| Componente | Criado | Testado | Integrado |
|------------|--------|---------|-----------|
| CustomerTable | ⬜ | ⬜ | ⬜ |
| CustomerFilters | ⬜ | ⬜ | ⬜ |
| CustomerForm | ⬜ | ⬜ | ⬜ |
| ContactInput | ⬜ | ⬜ | ⬜ |
| TagInput | ⬜ | ⬜ | ⬜ |
| KanbanBoard | ⬜ | ⬜ | ⬜ |
| KanbanColumn | ⬜ | ⬜ | ⬜ |
| KanbanCard | ⬜ | ⬜ | ⬜ |
| OpportunityDetail | ⬜ | ⬜ | ⬜ |
| Timeline | ⬜ | ⬜ | ⬜ |
| InteractionForm | ⬜ | ⬜ | ⬜ |

### 10.3 Código

- [ ] TypeScript sem erros (`npm run type-check`)
- [ ] ESLint passa (`npm run lint`)
- [ ] Build funciona (`npm run build`)
- [ ] Código formatado (Prettier)
- [ ] Sem console.log de debug
- [ ] Props tipadas corretamente
- [ ] Estados de loading implementados
- [ ] Tratamento de erros básico

---

## 11. Testes Manuais

### 11.1 Cenários de Drag & Drop

| Cenário | Passos | Esperado | Status |
|---------|--------|----------|--------|
| Mover card entre colunas | Arrastar card da coluna 1 para coluna 2 | Card move, contadores atualizam | ⬜ |
| Cancelar drag | Arrastar e soltar fora | Card volta à posição original | ⬜ |
| Drag rápido | Click e arraste rápido | Não ativa drag acidental | ⬜ |
| Scroll horizontal | Arrastar para borda direita | Board scrolla automaticamente | ⬜ |
| Visual durante drag | Iniciar drag | Overlay aparece com card | ⬜ |
| Highlight de coluna | Arrastar sobre coluna | Coluna destaca visualmente | ⬜ |

### 11.2 CRUD de Cliente

| Cenário | Passos | Esperado | Status |
|---------|--------|----------|--------|
| Criar cliente | Preencher form, clicar salvar | Cliente aparece na lista | ⬜ |
| Validar campos | Deixar nome vazio, tentar salvar | Erro visual aparece | ⬜ |
| Adicionar contato | Clicar "+ Adicionar", preencher | Contato aparece na lista | ⬜ |
| Remover contato | Clicar X no contato | Contato é removido | ⬜ |
| Adicionar tag | Digitar nome, selecionar cor | Tag aparece como chip | ⬜ |
| Limite de tags | Tentar adicionar 6ª tag | Botão desabilitado, mensagem | ⬜ |
| Editar cliente | Clicar editar, alterar, salvar | Dados atualizados na lista | ⬜ |
| Excluir cliente | Clicar excluir, confirmar | Cliente removido da lista | ⬜ |

### 11.3 Filtros e Busca

| Cenário | Passos | Esperado | Status |
|---------|--------|----------|--------|
| Busca por nome | Digitar "João" | Mostra apenas "João Silva" | ⬜ |
| Busca por email | Digitar "@empresa" | Mostra clientes com esse email | ⬜ |
| Filtro por tag | Selecionar "VIP" | Mostra apenas clientes VIP | ⬜ |
| Limpar filtros | Clicar "Limpar" | Lista volta ao estado inicial | ⬜ |
| Combinar filtros | Busca + tag + data | Resultados combinam todos | ⬜ |

### 11.4 Timeline

| Cenário | Passos | Esperado | Status |
|---------|--------|----------|--------|
| Ver timeline | Abrir detalhe de cliente | Timeline mostra interações | ⬜ |
| Ordem cronológica | Ver timeline | Eventos do mais recente primeiro | ⬜ |
| Ícones por tipo | Ver diferentes tipos | Cada tipo tem ícone e cor | ⬜ |
| Timeline vazia | Ver cliente sem interações | Mensagem "Nenhuma interação" | ⬜ |
| Adicionar interação | Preencher form, salvar | Interação aparece no topo | ⬜ |

---

## 12. Riscos do Kanban e Mitigações

### Risco 1: Performance com Muitos Cards

**Descrição:** Com 50+ cards, o Kanban pode ficar lento.

**Mitigações Implementadas:**
- ✅ Virtualização via ScrollArea (renderiza apenas visíveis)
- ✅ React.memo em cards
- ✅ Otimização de re-renders com useMemo/useCallback
- ⚠️ Considerar pagination/virtualização adicional se necessário

### Risco 2: Estado Complexo

**Descrição:** Gerenciar estado de cards, colunas e drag pode ser complexo.

**Mitigações Implementadas:**
- ✅ @dnd-kit gerencia estado de drag internamente
- ✅ Estado separado: stages (estático) + opportunities (dinâmico)
- ✅ Operações puras para atualização
- ⚠️ Log de ações para debugging

### Risco 3: Mobile (Touch)

**Descrição:** Drag & drop em touch pode ser problemático.

**Mitigações Implementadas:**
- ✅ @dnd-kit suporta touch nativamente
- ✅ Activation constraint (8px) previne drag acidental
- ✅ ScrollArea para navegação
- ⚠️ Fallback para lista em mobile (se necessário)

### Risco 4: Acessibilidade

**Descrição:** Navegação por teclado pode ser difícil.

**Mitigações Implementadas:**
- ✅ KeyboardSensor para navegação por teclado
- ✅ ARIA labels em todos os botões
- ✅ Focus rings visíveis
- ✅ Anúncios para screen readers

---

## 13. Notas Técnicas

### 13.1 Convenções de Código

```typescript
// ✅ Props interfaces sempre exportadas
export interface ComponentProps { }

// ✅ Handlers prefixados com 'handle'
const handleDragEnd = () => { };

// ✅ Callbacks de props prefixados com 'on'
onDragEnd={handleDragEnd}

// ✅ Estados booleanos com 'is', 'has', 'show'
const [isLoading, setIsLoading] = useState(false);
const [hasError, setHasError] = useState(false);
const [showModal, setShowModal] = useState(false);

// ✅ Arrays no plural
const customers: Customer[] = [];

// ✅ Funções de filtro com nome descritivo
const filteredCustomers = useMemo(() => { }, []);
```

### 13.2 Padrões de Componente

```typescript
// ✅ Default export para páginas
export default function Page() { }

// ✅ Named exports para componentes reutilizáveis
export function Component() { }

// ✅ Loading prop em todos os componentes de lista
interface Props {
  loading?: boolean;
}

// ✅ Error handling básico
try {
  // operação
} catch (error) {
  toast({
    title: 'Erro',
    description: 'Não foi possível completar a ação.',
    variant: 'destructive',
  });
}
```

---

## 14. Referências

### Documentação

- [@dnd-kit Documentation](https://docs.dndkit.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [date-fns](https://date-fns.org/)

### Inspirações UI

- [Trello](https://trello.com/) - Kanban drag & drop
- [HubSpot CRM](https://www.hubspot.com/products/crm) - Pipeline visual
- [Pipedrive](https://www.pipedrive.com/) - Oportunidades e timeline
- [Linear](https://linear.app/) - Interface clean

---

**Documento gerado em:** 20/03/2026  
**Planner:** @vibe-planner  
**Fase:** FASE 02 - Planning (SDD)  
**Próxima Fase:** FASE 03 - Implementation (@vibe-implementer)  
**Status:** 🟢 PRONTO PARA IMPLEMENTAÇÃO

---

> ⚠️ **IMPORTANTE:** Este SPEC deve ser usado pelo @vibe-implementer para desenvolvimento. Antes de iniciar a implementação, o usuário DEVE limpar o contexto do chat para garantir qualidade.

> 🎯 **PRÓXIMOS PASSOS:**
> 1. Usuário deve limpar contexto do chat
> 2. Chamar @vibe-implementer
> 3. Fornecer este SPEC como referência
> 4. Acompanhar desenvolvimento

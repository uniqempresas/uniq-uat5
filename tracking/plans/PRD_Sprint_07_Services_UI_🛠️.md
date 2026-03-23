# 📋 PRD - Sprint 07: Services UI 🛠️

---

## 1. Visão Geral da Sprint

### 1.1 Contexto do Projeto
O **UNIQ Empresas** é uma plataforma SaaS modular que combina Consultoria de Growth + Ferramentas de Gestão + Métricas para pequenos e médios empreendedores. O sistema segue a abordagem **Frontend First** (Interface primeiro, Backend depois), permitindo validação rápida com stakeholders antes de investir em backend.

### 1.2 Objetivo Desta Sprint
A **Sprint 07** tem como objetivo desenvolver a **interface completa de cadastro e gestão de serviços**, incluindo:
- Lista de serviços com cards informativos e filtros
- Formulário completo de cadastro de serviços
- Controle de ativo/inativo para cada serviço
- Preview visual do catálogo de serviços
- Integração visual com a loja virtual

### 1.3 Escopo da Sprint

**✅ Incluído nesta Sprint:**
- Grid de serviços com cards (nome, preço, duração, categoria)
- Campo de busca por nome de serviço
- Filtros por categoria e faixa de preço
- Toggle ativo/inativo para cada serviço
- Empty state personalizado ("Nenhum serviço cadastrado")
- Formulário de cadastro completo (dados básicos, preço, duração)
- Suporte a variações de preço
- Seleção de categoria com tags
- Upload de imagens do serviço (UI apenas)
- Configuração de disponibilidade (dias/horários)
- Catálogo público de serviços (preview da loja)
- Modal de detalhe do serviço
- CTA "Agendar" no catálogo
- Estados empty e loading para todas as telas
- Mock data completo para testes visuais

**❌ NÃO Incluído nesta Sprint:**
- Integração com backend real (API)
- Persistência de dados no banco
- Autenticação funcional
- Upload real de arquivos (apenas UI)
- Sistema de agendamento funcional
- Integração com gateway de pagamento

### 1.4 Stack Tecnológica

| Camada | Tecnologia | Versão | Uso |
|--------|------------|--------|-----|
| Framework | Next.js | 14.2.5 | App Router, Server Components |
| Linguagem | TypeScript | 5.4.5 | Tipagem estática |
| UI Library | React | 18.3.1 | Componentes funcionais |
| Estilização | Tailwind CSS | 3.4.4 | Utility-first CSS |
| Componentes | shadcn/ui | v4.0.5 | Design System base |
| Ícones | Lucide React | 0.400.0 | Ícones consistentes |
| Formulários | React Hook Form | - | Validação e controle |
| Validação | Zod | - | Schema validation |

---

## 2. Análise do Codebase

### 2.1 Componentes do Design System Disponíveis

#### ✅ Componentes Já Implementados

| Componente | Arquivo | Status | Uso nos Serviços |
|------------|---------|--------|------------------|
| **Button** | `components/ui/button.tsx` | ✅ Funcional | Ações, CTAs, salvar serviço |
| **Card** | `components/ui/card.tsx` | ✅ Funcional | Cards de serviços, containers |
| **Badge** | `components/ui/badge.tsx` | ✅ Funcional | Categorias, status ativo/inativo |
| **Avatar** | `components/ui/avatar.tsx` | ✅ Funcional | Imagens dos serviços |
| **Dialog** | `components/ui/dialog.tsx` | ✅ Funcional | Modal de cadastro/edição |
| **Table** | `components/ui/table.tsx` | ✅ Funcional | Lista alternativa de serviços |
| **Input** | `components/ui/input.tsx` | ✅ Funcional | Formulários de serviço |
| **Select** | `components/ui/select.tsx` | ✅ Funcional | Seleção de categoria |
| **Tabs** | `components/ui/tabs.tsx` | ✅ Funcional | Navegação lista/catálogo |
| **Skeleton** | `components/ui/skeleton.tsx` | ✅ Funcional | Loading states |
| **Toast** | `components/ui/toast.tsx` | ✅ Funcional | Notificações de sucesso/erro |
| **Textarea** | `components/ui/textarea.tsx` | ✅ Funcional | Descrição do serviço |
| **Checkbox** | `components/ui/checkbox.tsx` | ✅ Funcional | Dias da semana disponíveis |
| **Switch** | `components/ui/switch.tsx` | ✅ Funcional | Ativar/desativar serviço |
| **Label** | `components/ui/label.tsx` | ✅ Funcional | Labels de formulário |

### 2.2 Design Tokens Configurados

**Arquivo:** `tailwind.config.ts` (cores UNIQ)

| Token | Valor | Uso nos Serviços |
|-------|-------|------------------|
| `uniq.primary` | `#3e5653` | Botões primários, header |
| `uniq.accent` | `#86cb92` | Preços, destaques, categorias |
| `uniq.text` | `#1f2937` | Texto principal |
| `uniq.muted` | `#627271` | Descrições, textos secundários |
| `uniq.border` | `#e5e7eb` | Bordas de cards |
| `uniq.platinum` | `#efefef` | Background da página |
| `destructive` | `#dc2626` | Erros, serviço inativo |
| `success` | `#22c55e` | Serviço ativo, sucesso |
| `warning` | `#f59e0b` | Alertas de preço |

### 2.3 Estrutura de Pastas Existente

```
📦 C:\Users\henri\.gemini\antigravity\playground\vector-perseverance\uniq-uat5
├── 📁 app/
│   ├── 📁 dashboard/
│   │   └── page.tsx              ✅ Dashboard principal
│   ├── layout.tsx                ✅ Layout base
│   ├── page.tsx                  ✅ Landing page
│   └── globals.css               ✅ Estilos globais
├── 📁 components/
│   ├── 📁 ui/                    ✅ Componentes shadcn/ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── dialog.tsx
│   │   ├── switch.tsx
│   │   └── ... (todos prontos)
│   ├── sidebar.tsx               ✅ Navegação lateral
│   ├── header.tsx                ✅ Header com busca
│   └── metric-card.tsx           ✅ Cards de métricas
├── 📁 lib/
│   └── utils.ts                  ✅ Utilitários (cn)
├── 📁 tracking/
│   └── plans/                    ✅ PRDs anteriores
└── tailwind.config.ts            ✅ Configuração UNIQ
```

---

## 3. Telas/Componentes

### 3.1 Tela 7.1: Lista de Serviços

**Arquivo:** `app/servicos/page.tsx`

#### Layout da Página

```
┌─────────────────────────────────────────────────────────────────┐
│  Sidebar  │  Header (Título: "Serviços" + Breadcrumbs)          │
│  (fixed)  ├─────────────────────────────────────────────────────┤
│           │                                                     │
│           │  [Barra de Ações]                                   │
│           │  ┌───────────────────────────────────────────────┐  │
│           │  │ 🔍 Buscar serviço...    │ Filtros ▼ │ + Novo │  │
│           │  └───────────────────────────────────────────────┘  │
│           │                                                     │
│           │  [Grid de Cards - 3 colunas desktop]                │
│           │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │
│           │  │ 📷 Imagem   │ │ 📷 Imagem   │ │ 📷 Imagem   │   │
│           │  │ Corte de    │ │ Manicure    │ │ Hidratação  │   │
│           │  │ Cabelo      │ │             │ │             │   │
│           │  │             │ │ R$ 35,00    │ │ R$ 60,00    │   │
│           │  │ R$ 45,00    │ │ ⏱ 45min     │ │ ⏱ 60min     │   │
│           │  │ ⏱ 30min     │ │ Cabelo      │ │ Cabelo      │   │
│           │  │ Cabelo  [ON]│ │ [ON]  [✏️]  │ │ [OFF] [✏️]  │   │
│           │  └─────────────┘ └─────────────┘ └─────────────┘   │
│           │                                                     │
│           │  [Paginação: < 1 2 3 ... 10 >]                     │
│           │                                                     │
└───────────┴─────────────────────────────────────────────────────┘
```

#### Componentes da Tela

| Componente | Arquivo | Props | Descrição |
|------------|---------|-------|-----------|
| **ServiceCard** | `components/service-card.tsx` | `service: Service, onEdit, onToggleActive` | Card individual do serviço |
| **ServiceSearch** | `app/servicos/components/search-bar.tsx` | `value, onChange, placeholder` | Campo de busca |
| **ServiceFilters** | `app/servicos/components/filters.tsx` | `filters, onChange` | Filtros por categoria/preço |
| **EmptyState** | `app/servicos/components/empty-state.tsx` | `onAddNew` | Estado vazio com CTA |
| **ServiceGrid** | `app/servicos/components/service-grid.tsx` | `services, loading` | Grid responsivo de cards |

#### Especificações Visuais do ServiceCard

```typescript
interface ServiceCardProps {
  service: {
    id: number;
    name: string;
    price: number;
    duration: number; // minutos
    category: string;
    active: boolean;
    image?: string;
    description?: string;
  };
  onEdit: (id: number) => void;
  onToggleActive: (id: number, active: boolean) => void;
}
```

**Estilo do Card:**
- Background: `bg-uniq-white`
- Borda: `border border-uniq-border`
- Border radius: `rounded-xl`
- Sombra: `shadow-sm hover:shadow-md`
- Transição: `transition-shadow duration-200`

**Seções do Card:**
1. **Imagem** (topo): `h-40 w-full object-cover rounded-t-xl`
   - Fallback: ícone `Scissors` centralizado em `bg-uniq-platinum`
2. **Conteúdo** (padding: 16px):
   - Nome: `text-lg font-semibold text-uniq-text`
   - Preço: `text-xl font-bold text-uniq-accent`
   - Duração: `text-sm text-uniq-muted flex items-center gap-1` (ícone Clock)
   - Categoria: Badge com variant="secondary"
3. **Ações** (footer):
   - Switch toggle para ativar/desativar
   - Botão editar (ícone Pencil)

#### Estados do Card

| Estado | Estilo |
|--------|--------|
| **Default** | Sombra leve, hover elevação |
| **Hover** | `shadow-md`, escala 1.02 |
| **Active ON** | Switch verde (accent), badge "Ativo" |
| **Active OFF** | Switch cinza, opacidade reduzida no card (0.7) |
| **Loading** | Skeleton com animação pulse |

### 3.2 Tela 7.2: Cadastro de Serviço

**Arquivo:** `app/servicos/novo/page.tsx` (novo) ou Modal

#### Layout do Formulário

```
┌─────────────────────────────────────────────────────────────────┐
│  Sidebar  │  Header (Título: "Novo Serviço")                    │
│  (fixed)  ├─────────────────────────────────────────────────────┤
│           │                                                     │
│           │  [Tabs: Dados Básicos │ Preço │ Disponibilidade]    │
│           │                                                     │
│           │  ┌───────────────────────────────────────────────┐  │
│           │  │ Aba: Dados Básicos                            │  │
│           │  │                                               │  │
│           │  │  Nome do Serviço *                            │  │
│           │  │  ┌─────────────────────────────────────────┐  │  │
│           │  │  │ Corte de Cabelo Masculino                 │  │  │
│           │  │  └─────────────────────────────────────────┘  │  │
│           │  │                                               │  │
│           │  │  Descrição                                    │  │
│           │  │  ┌─────────────────────────────────────────┐  │  │
│           │  │  │ Corte moderno com acabamento na...      │  │  │
│           │  │  │                                         │  │  │
│           │  │  └─────────────────────────────────────────┘  │  │
│           │  │                                               │  │
│           │  │  Categoria *              Duração (min) *     │  │
│           │  │  ┌──────────────────┐    ┌──────────────┐    │  │
│           │  │  │ Cabelo ▼         │    │ 30           │    │  │
│           │  │  └──────────────────┘    └──────────────┘    │  │
│           │  │                                               │  │
│           │  │  [Upload de Imagens]                          │  │
│           │  │  ┌────────┐ ┌────────┐ ┌────────┐            │  │
│           │  │  │   📷   │ │   📷   │ │   +    │            │  │
│           │  │  │  img1  │ │  img2  │ │  add   │            │  │
│           │  │  └────────┘ └────────┘ └────────┘            │  │
│           │  │                                               │  │
│           │  └───────────────────────────────────────────────┘  │
│           │                                                     │
│           │  [Cancelar]                    [Salvar Serviço 💾]  │
│           │                                                     │
└───────────┴─────────────────────────────────────────────────────┘
```

#### Componentes do Formulário

| Componente | Arquivo | Props | Descrição |
|------------|---------|-------|-----------|
| **ServiceForm** | `app/servicos/components/service-form.tsx` | `initialData?, onSubmit, onCancel` | Formulário principal |
| **PriceSection** | `app/servicos/components/price-section.tsx` | `value, onChange` | Configuração de preço |
| **AvailabilitySection** | `app/servicos/components/availability-section.tsx` | `schedule, onChange` | Dias/horários disponíveis |
| **ImageUpload** | `app/servicos/components/image-upload.tsx` | `images, onChange` | Upload de imagens (UI) |
| **VariationRow** | `app/servicos/components/price-variation.tsx` | `variation, onChange, onRemove` | Linha de variação de preço |

#### Especificações dos Campos

**SERV-FORM-01: Dados Básicos**

| Campo | Tipo | Obrigatório | Placeholder | Validação |
|-------|------|-------------|-------------|-----------|
| Nome | Input | ✅ | "Ex: Corte de Cabelo" | Min 3 caracteres |
| Descrição | Textarea | ❌ | "Descreva o serviço..." | Max 500 caracteres |
| Categoria | Select | ✅ | "Selecione..." | - |
| Duração | Input number | ✅ | "30" | Min 5, Max 480 min |

**SERV-FORM-02: Preço**

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| Preço Base | Input currency | ✅ | Valor padrão do serviço |
| Variações | Array | ❌ | Preços por tamanho, etc. |

**Variações de Preço:**
```typescript
interface PriceVariation {
  id: string;
  name: string;      // ex: "Corte + Barba"
  price: number;     // ex: 65.00
  duration: number;  // ex: 45 (minutos)
}
```

**SERV-FORM-03: Duração**
- Input tipo number com sufixo "min"
- Valor mínimo: 5 minutos
- Valor máximo: 8 horas (480 min)
- Step: 5 minutos

**SERV-FORM-04: Categoria**
- Select dropdown com categorias existentes
- Opção "+ Nova Categoria" no final
- Badge colorida por categoria

**SERV-FORM-05: Imagens**
- Grid de thumbnails (máx 5 imagens)
- Área de drop para upload
- Preview com opção de remover
- Progress bar simulada durante upload

**SERV-FORM-06: Disponibilidade**
- Checkboxes para dias da semana
- Time picker para horário de início/fim
- Opção "Mesmo horário todos os dias"
- Pausa para almoço (opcional)

```
Dias da Semana:
☑️ Seg  ☑️ Ter  ☑️ Qua  ☑️ Qui  ☑️ Sex  ☐ Sáb  ☐ Dom

Horário:
Das [ 08:00 ] às [ 18:00 ]

Pausa para almoço:
Das [ 12:00 ] às [ 13:00 ] ☐ Não faço pausa
```

### 3.3 Tela 7.3: Catálogo de Serviços (Público)

**Arquivo:** `app/servicos/catalogo/page.tsx` (preview)

#### Layout do Catálogo

```
┌─────────────────────────────────────────────────────────────────┐
│  Sidebar  │  Header (Título: "Catálogo de Serviços")            │
│  (fixed)  ├─────────────────────────────────────────────────────┤
│           │                                                     │
│           │  [Preview da Loja Virtual]                          │
│           │  ┌───────────────────────────────────────────────┐  │
│           │  │                                               │  │
│           │  │  💇‍♂️ Nossos Serviços                          │  │
│           │  │                                               │  │
│           │  │  ┌─────────────┐ ┌─────────────┐ ┌──────────┐ │  │
│           │  │  │ 📷 Imagem   │ │ 📷 Imagem   │ │ 📷 Imagem│ │  │
│           │  │  │             │ │             │ │          │ │  │
│           │  │  │ Corte de    │ │ Manicure    │ │ Pedicure │ │  │
│           │  │  │ Cabelo      │ │             │ │          │ │  │
│           │  │  │             │ │ A partir de │ │A partir de│  │
│           │  │  │ A partir de │ │ R$ 35,00    │ │ R$ 40,00 │ │  │
│           │  │  │ R$ 45,00    │ │             │ │          │ │  │
│           │  │  │             │ │ [Ver Detalhes]│[Ver Detalhes]│  │
│           │  │  │ [Agendar]   │ │             │ │          │ │  │
│           │  │  └─────────────┘ └─────────────┘ └──────────┘ │  │
│           │  │                                               │  │
│           │  └───────────────────────────────────────────────┘  │
│           │                                                     │
│           │  [Info: Este é um preview de como aparece na loja]  │
│           │                                                     │
└───────────┴─────────────────────────────────────────────────────┘
```

#### Componentes do Catálogo

| Componente | Arquivo | Props | Descrição |
|------------|---------|-------|-----------|
| **CatalogView** | `app/servicos/catalogo/page.tsx` | `services` | Preview do catálogo |
| **CatalogCard** | `app/servicos/components/catalog-card.tsx` | `service` | Card no estilo loja |
| **ServiceDetailModal** | `app/servicos/components/service-detail-modal.tsx` | `service, open, onClose` | Detalhes do serviço |

#### Especificações do CatalogCard

**Estilo (visual de loja):**
- Mais limpo e focado em conversão
- Imagem maior e destacada
- Preço em destaque com "A partir de"
- Botão CTA primário "Agendar"
- Hover com elevação e sombra

**Modal de Detalhes:**
- Imagem em destaque (se houver)
- Nome e descrição completa
- Preço/variações listadas
- Duração estimada
- Botão "Agendar Agora" fixo no bottom

---

## 4. Mock Data

### 4.1 Estrutura de Dados

**Arquivo:** `lib/mocks/services.ts`

```typescript
export interface Service {
  id: number;
  name: string;
  description?: string;
  price: number;
  duration: number; // minutos
  category: string;
  active: boolean;
  images: string[];
  variations?: PriceVariation[];
  availability: AvailabilitySchedule;
  createdAt: string;
  updatedAt: string;
}

export interface PriceVariation {
  id: string;
  name: string;
  price: number;
  duration: number;
}

export interface AvailabilitySchedule {
  monday: { active: boolean; start: string; end: string; };
  tuesday: { active: boolean; start: string; end: string; };
  wednesday: { active: boolean; start: string; end: string; };
  thursday: { active: boolean; start: string; end: string; };
  friday: { active: boolean; start: string; end: string; };
  saturday: { active: boolean; start: string; end: string; };
  sunday: { active: boolean; start: string; end: string; };
  lunchBreak?: { start: string; end: string; enabled: boolean; };
}

export interface ServiceCategory {
  id: number;
  name: string;
  color: string;
  count: number;
}
```

### 4.2 Mock Data Completo

```typescript
export const mockServices: Service[] = [
  {
    id: 1,
    name: "Corte de Cabelo Masculino",
    description: "Corte moderno com acabamento na navalha. Inclui lavagem e finalização.",
    price: 45.00,
    duration: 30,
    category: "Cabelo",
    active: true,
    images: ["/images/corte-masculino.jpg"],
    variations: [
      { id: "v1", name: "Corte + Barba", price: 65.00, duration: 45 },
      { id: "v2", name: "Corte Infantil", price: 35.00, duration: 20 },
    ],
    availability: {
      monday: { active: true, start: "09:00", end: "18:00" },
      tuesday: { active: true, start: "09:00", end: "18:00" },
      wednesday: { active: true, start: "09:00", end: "18:00" },
      thursday: { active: true, start: "09:00", end: "18:00" },
      friday: { active: true, start: "09:00", end: "19:00" },
      saturday: { active: true, start: "09:00", end: "14:00" },
      sunday: { active: false, start: "", end: "" },
      lunchBreak: { start: "12:00", end: "13:00", enabled: true },
    },
    createdAt: "2026-03-15T10:00:00Z",
    updatedAt: "2026-03-18T14:30:00Z",
  },
  {
    id: 2,
    name: "Manicure",
    description: "Cutilagem, esmaltação e hidratação das mãos.",
    price: 35.00,
    duration: 45,
    category: "Unhas",
    active: true,
    images: ["/images/manicure.jpg"],
    availability: {
      monday: { active: true, start: "10:00", end: "18:00" },
      tuesday: { active: true, start: "10:00", end: "18:00" },
      wednesday: { active: true, start: "10:00", end: "18:00" },
      thursday: { active: true, start: "10:00", end: "18:00" },
      friday: { active: true, start: "10:00", end: "19:00" },
      saturday: { active: true, start: "10:00", end: "16:00" },
      sunday: { active: false, start: "", end: "" },
    },
    createdAt: "2026-03-16T09:00:00Z",
    updatedAt: "2026-03-16T09:00:00Z",
  },
  {
    id: 3,
    name: "Pedicure",
    description: "Cutilagem, esmaltação e hidratação dos pés.",
    price: 40.00,
    duration: 50,
    category: "Unhas",
    active: true,
    images: [],
    availability: {
      monday: { active: true, start: "10:00", end: "18:00" },
      tuesday: { active: true, start: "10:00", end: "18:00" },
      wednesday: { active: true, start: "10:00", end: "18:00" },
      thursday: { active: true, start: "10:00", end: "18:00" },
      friday: { active: true, start: "10:00", end: "19:00" },
      saturday: { active: true, start: "10:00", end: "16:00" },
      sunday: { active: false, start: "", end: "" },
    },
    createdAt: "2026-03-16T10:00:00Z",
    updatedAt: "2026-03-16T10:00:00Z",
  },
  {
    id: 4,
    name: "Hidratação Capilar",
    description: "Tratamento profundo para cabelos ressecados.",
    price: 60.00,
    duration: 60,
    category: "Cabelo",
    active: false,
    images: ["/images/hidratacao.jpg"],
    availability: {
      monday: { active: true, start: "09:00", end: "17:00" },
      tuesday: { active: true, start: "09:00", end: "17:00" },
      wednesday: { active: true, start: "09:00", end: "17:00" },
      thursday: { active: true, start: "09:00", end: "17:00" },
      friday: { active: true, start: "09:00", end: "17:00" },
      saturday: { active: false, start: "", end: "" },
      sunday: { active: false, start: "", end: "" },
    },
    createdAt: "2026-03-17T08:00:00Z",
    updatedAt: "2026-03-19T16:00:00Z",
  },
  {
    id: 5,
    name: "Barba Completa",
    description: "Aparação, modelagem e hidratação da barba.",
    price: 30.00,
    duration: 25,
    category: "Barba",
    active: true,
    images: [],
    availability: {
      monday: { active: true, start: "09:00", end: "18:00" },
      tuesday: { active: true, start: "09:00", end: "18:00" },
      wednesday: { active: true, start: "09:00", end: "18:00" },
      thursday: { active: true, start: "09:00", end: "18:00" },
      friday: { active: true, start: "09:00", end: "19:00" },
      saturday: { active: true, start: "09:00", end: "14:00" },
      sunday: { active: false, start: "", end: "" },
    },
    createdAt: "2026-03-18T11:00:00Z",
    updatedAt: "2026-03-18T11:00:00Z",
  },
];

export const mockServiceCategories: ServiceCategory[] = [
  { id: 1, name: "Cabelo", color: "#3b82f6", count: 5 },
  { id: 2, name: "Unhas", color: "#ec4899", count: 3 },
  { id: 3, name: "Barba", color: "#8b5cf6", count: 2 },
  { id: 4, name: "Estética", color: "#10b981", count: 4 },
  { id: 5, name: "Massagem", color: "#f59e0b", count: 2 },
];

// Helper functions
export const getActiveServices = () => mockServices.filter(s => s.active);
export const getServicesByCategory = (category: string) => 
  mockServices.filter(s => s.category === category);
export const getServiceById = (id: number) => 
  mockServices.find(s => s.id === id);
```

---

## 5. Interações e Estados

### 5.1 Estados de Loading

| Componente | Estado | Estilo |
|------------|--------|--------|
| **ServiceCard** | Skeleton pulse | `animate-pulse bg-gray-200` |
| **ServiceGrid** | Skeleton grid | 6 cards skeleton |
| **Form Submit** | Button loading | Spinner + "Salvando..." |
| **Image Upload** | Progress bar | `bg-uniq-accent` animado |
| **Search** | Debounce 300ms | Loading no input |

### 5.2 Estados de Erro

| Cenário | Mensagem | Ação |
|---------|----------|------|
| **Form inválido** | Toast com campos obrigatórios | Focar primeiro erro |
| **Erro de rede** | "Erro ao carregar serviços" | Botão "Tentar novamente" |
| **Upload falhou** | "Erro ao enviar imagem" | Retry individual |
| **Serviço não encontrado** | "Serviço não existe" | Redirecionar para lista |

### 5.3 Transições e Animações

| Elemento | Animação | Duração |
|----------|----------|---------|
| **Card hover** | `scale(1.02)` + sombra | 200ms ease-out |
| **Modal open** | Fade in + slide up | 300ms ease-out |
| **Modal close** | Fade out + slide down | 200ms ease-in |
| **Switch toggle** | Slide do thumb | 150ms ease |
| **Toast** | Slide in from right | 300ms ease-out |
| **Grid filter** | Fade + reorder | 300ms ease |

### 5.4 Hover/Focus Effects

| Elemento | Hover | Focus |
|----------|-------|-------|
| **ServiceCard** | `shadow-md`, `translateY(-2px)` | - |
| **Button Primary** | `bg-uniq-hover` | `ring-2 ring-uniq-accent` |
| **Input** | - | `ring-2 ring-uniq-accent border-uniq-accent` |
| **Switch** | - | `ring-2 ring-uniq-accent` |
| **IconButton** | `bg-uniq-platinum` | `ring-2 ring-uniq-accent` |

---

## 6. Design System Aplicado

### 6.1 Paleta de Cores

```
┌─────────────────────────────────────────────────────────────┐
│                    PALETA UNIQ EMPRESAS                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  PRIMÁRIA                                                   │
│  ┌──────────┬──────────┬──────────┐                        │
│  │ #3e5653  │ #1f2937  │ #ffffff  │                        │
│  │ Primary  │ Hover    │ Text     │                        │
│  └──────────┴──────────┴──────────┘                        │
│                                                             │
│  ACCENT (Preços, Destaques)                                │
│  ┌───────────────────────────────┐                         │
│  │ #86cb92                       │                         │
│  │ Verde lima                    │                         │
│  └───────────────────────────────┘                         │
│                                                             │
│  NEUTRAS                                                    │
│  ┌──────────┬──────────┬──────────┬──────────┐             │
│  │ #ffffff  │ #efefef  │ #e5e7eb  │ #1f2937  │             │
│  │ Cards    │ BG       │ Border   │ Text     │             │
│  └──────────┴──────────┴──────────┴──────────┘             │
│  ┌──────────┐                                              │
│  │ #627271  │                                              │
│  │ Muted    │                                              │
│  └──────────┘                                              │
│                                                             │
│  SEMÂNTICAS (Categorias)                                    │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐  │
│  │ #3b82f6  │ #ec4899  │ #8b5cf6  │ #10b981  │ #f59e0b  │  │
│  │ Cabelo   │ Unhas    │ Barba    │ Estética │ Massagem │  │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Tipografia

| Elemento | Fonte | Tamanho | Peso | Cor |
|----------|-------|---------|------|-----|
| **Page Title** | Poppins | 24px | 600 | `uniq-text` |
| **Card Title** | Poppins | 18px | 600 | `uniq-text` |
| **Price** | Poppins | 20px | 700 | `uniq-accent` |
| **Description** | Poppins | 14px | 400 | `uniq-muted` |
| **Label** | Poppins | 14px | 500 | `uniq-text` |
| **Badge** | Poppins | 12px | 500 | variável |
| **Button** | Poppins | 14px | 500 | branco |

### 6.3 Espaçamento

| Elemento | Padding | Margin |
|----------|---------|--------|
| **Page** | 24px | - |
| **Card** | 16px | 16px |
| **Card Grid** | - | 24px gap |
| **Form Section** | 24px | 32px entre seções |
| **Input** | 12px 16px | 8px abaixo |
| **Button** | 10px 16px | - |

### 6.4 Componentes Reutilizáveis

**ServiceCard:**
```typescript
// Props
interface ServiceCardProps {
  service: Service;
  onEdit: (id: number) => void;
  onToggleActive: (id: number, active: boolean) => void;
  view?: 'admin' | 'catalog'; // 'admin' default
}

// Uso
<ServiceCard
  service={service}
  onEdit={handleEdit}
  onToggleActive={handleToggle}
  view="admin"
/>
```

**ServiceForm:**
```typescript
// Props
interface ServiceFormProps {
  initialData?: Service; // Omitido = novo serviço
  onSubmit: (data: ServiceFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

// Uso
<ServiceForm
  initialData={service}
  onSubmit={handleSave}
  onCancel={() => router.back()}
/>
```

---

## 7. Critérios de Aceitação

### 7.1 Lista de Serviços (SERV-01 a SERV-05)

- [ ] **SERV-01:** Grid de serviços em cards responsivo (1 col mobile, 2 tablet, 3 desktop)
- [ ] **SERV-02:** Campo de busca por nome funciona em tempo real (debounce 300ms)
- [ ] **SERV-03:** Filtros por categoria e faixa de preço funcionam corretamente
- [ ] **SERV-04:** Toggle ativo/inativo atualiza visualmente o card e estado
- [ ] **SERV-05:** Empty state aparece quando não há serviços cadastrados

### 7.2 Cadastro de Serviço (SERV-FORM-01 a SERV-FORM-06)

- [ ] **SERV-FORM-01:** Campos obrigatórios (nome, categoria, duração) validados
- [ ] **SERV-FORM-02:** Preço base aceita valores decimais e mostra em formato moeda
- [ ] **SERV-FORM-02:** Variações de preço podem ser adicionadas/removidas
- [ ] **SERV-FORM-03:** Duração aceita valores entre 5 e 480 minutos
- [ ] **SERV-FORM-04:** Categoria pode ser selecionada de dropdown
- [ ] **SERV-FORM-05:** Upload de imagens mostra preview e permite remover
- [ ] **SERV-FORM-06:** Dias da semana podem ser selecionados com checkboxes
- [ ] **SERV-FORM-06:** Horários são validados (início < fim)

### 7.3 Catálogo de Serviços (CAT-01 a CAT-04)

- [ ] **CAT-01:** Grid de serviços em estilo loja (visual diferente do admin)
- [ ] **CAT-02:** Modal de detalhe abre ao clicar "Ver Detalhes"
- [ ] **CAT-03:** Botão "Agendar" presente em todos os cards
- [ ] **CAT-04:** Preview mostra como aparece na loja virtual

### 7.4 UX e Performance

- [ ] Estados de loading implementados em todas as telas
- [ ] Estados de erro tratados com mensagens claras
- [ ] Transições suaves entre estados
- [ ] Responsividade testada em 3 breakpoints
- [ ] Acessibilidade: focus visível, ARIA labels

### 7.5 Design System

- [ ] Cores UNIQ aplicadas consistentemente
- [ ] Tipografia Poppins mantida em todos os textos
- [ ] Espaçamento segue o grid de 4px/8px
- [ ] Componentes reutilizáveis documentados

---

## 8. Dependências

### 8.1 Já Instaladas (Design System)

```bash
# Componentes base já existem
- @radix-ui/react-dialog
- @radix-ui/react-select
- @radix-ui/react-switch
- @radix-ui/react-checkbox
- @radix-ui/react-label
- lucide-react
- class-variance-authority
- tailwind-merge
- clsx
```

### 8.2 Necessárias (Instalar)

```bash
# Formulários e validação
npm install react-hook-form zod @hookform/resolvers

# Manipulação de datas para disponibilidade
npm install date-fns

# Currency input (opcional, pode usar input nativo)
npm install react-currency-input-field
```

### 8.3 Estrutura de Arquivos a Criar

```
📦 app/servicos/
├── 📁 components/
│   ├── service-card.tsx          # Card de serviço
│   ├── service-grid.tsx          # Grid de cards
│   ├── service-skeleton.tsx      # Loading skeleton
│   ├── search-bar.tsx            # Busca
│   ├── filters.tsx               # Filtros
│   ├── empty-state.tsx           # Estado vazio
│   ├── service-form.tsx          # Formulário principal
│   ├── price-section.tsx         # Seção de preço
│   ├── price-variation.tsx       # Variação de preço
│   ├── availability-section.tsx  # Disponibilidade
│   ├── image-upload.tsx          # Upload de imagens
│   ├── catalog-card.tsx          # Card do catálogo
│   └── service-detail-modal.tsx  # Modal de detalhes
├── 📁 hooks/
│   ├── use-services.ts           # Hook de serviços
│   └── use-service-form.ts       # Hook do formulário
├── 📁 types/
│   └── service.ts                # Tipos TypeScript
├── page.tsx                      # Lista de serviços
├── 📁 novo/
│   └── page.tsx                  # Novo serviço
├── 📁 [id]/
│   └── page.tsx                  # Editar serviço
└── 📁 catalogo/
    └── page.tsx                  # Preview catálogo

📦 lib/mocks/
├── services.ts                   # Mock data de serviços
└── categories.ts                 # Mock de categorias
```

---

## 9. Notas de Implementação

### 9.1 Dicas para o @vibe-implementer

1. **Reutilize componentes existentes:** Todos os componentes de UI (Button, Card, Input, etc.) já estão prontos em `components/ui/`. Não recrie!

2. **Siga o padrão de estilo existente:**
   - Use `cn()` do `lib/utils` para classes condicionais
   - Siga o padrão de cores `uniq-*` do tailwind.config.ts
   - Mantenha a tipografia Poppins

3. **Mock data primeiro:** Comece criando o mock data em `lib/mocks/services.ts` para ter dados para testar visualmente.

4. **Estados de loading são essenciais:** Implemente skeletons para melhor UX. Use `components/ui/skeleton.tsx`.

5. **Formulário com react-hook-form:**
   ```typescript
   import { useForm } from 'react-hook-form';
   import { zodResolver } from '@hookform/resolvers/zod';
   
   const form = useForm({
     resolver: zodResolver(serviceSchema),
     defaultValues: initialData || defaultService,
   });
   ```

6. **Currency input:** Formate valores como moeda brasileira (R$):
   ```typescript
   const formatCurrency = (value: number) => 
     new Intl.NumberFormat('pt-BR', {
       style: 'currency',
       currency: 'BRL'
     }).format(value);
   ```

7. **Switch para ativo/inativo:**
   ```typescript
   <Switch
     checked={service.active}
     onCheckedChange={(checked) => onToggleActive(service.id, checked)}
   />
   ```

8. **Empty state com CTA:**
   Quando `services.length === 0`, mostre ilustração + texto "Nenhum serviço cadastrado" + botão "Cadastrar primeiro serviço".

9. **Tabs para navegação:** Use `components/ui/tabs.tsx` para separar "Lista" e "Catálogo" na mesma página ou use navegação separada.

10. **Preview do catálogo:** O catálogo deve ter visual diferente - mais limpo, focado em conversão, com preços em destaque.

### 9.2 Código de Referência

**Exemplo de ServiceCard:**
```tsx
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Scissors, Clock, Pencil } from "lucide-react";

export function ServiceCard({ service, onEdit, onToggleActive }) {
  return (
    <Card className={`overflow-hidden transition-shadow hover:shadow-md ${
      !service.active && 'opacity-70'
    }`}>
      {/* Imagem ou placeholder */}
      <div className="h-40 bg-uniq-platinum flex items-center justify-center">
        {service.images?.[0] ? (
          <img src={service.images[0]} alt={service.name} className="w-full h-full object-cover" />
        ) : (
          <Scissors className="w-12 h-12 text-uniq-muted" />
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-uniq-text">{service.name}</h3>
        <p className="text-xl font-bold text-uniq-accent mt-1">
          {formatCurrency(service.price)}
        </p>
        <div className="flex items-center gap-2 mt-2 text-sm text-uniq-muted">
          <Clock className="w-4 h-4" />
          {service.duration} min
        </div>
        <Badge variant="secondary" className="mt-2">{service.category}</Badge>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="flex items-center gap-2">
          <Switch
            checked={service.active}
            onCheckedChange={(checked) => onToggleActive(service.id, checked)}
          />
          <span className="text-sm text-uniq-muted">
            {service.active ? 'Ativo' : 'Inativo'}
          </span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => onEdit(service.id)}>
          <Pencil className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
```

### 9.3 Checklist Antes de Entregar

- [ ] Todos os componentes de UI importados de `@/components/ui/`
- [ ] Mock data funcional e variado
- [ ] Estados de loading implementados
- [ ] Estados de erro tratados
- [ ] Responsividade testada (mobile, tablet, desktop)
- [ ] Navegação do sidebar funcionando
- [ ] Cores e tipografia consistentes
- [ ] Transições suaves aplicadas
- [ ] Toast de sucesso ao salvar/editar
- [ ] Empty state implementado

---

## 10. Referências

### Documentação do Projeto
- [PRD Sprint 01: Design System](./PRD_SPRINT_01_Design_System.md)
- [PRD Sprint 04: CRM UI](./PRD_SPRINT_04_CRM_UI.md)
- [SPEC Sprint 03: Dashboard](./SPEC_SPRINT_03_Dashboard_UI.md)

### Componentes shadcn/ui
- [Button](https://ui.shadcn.com/docs/components/button)
- [Card](https://ui.shadcn.com/docs/components/card)
- [Dialog](https://ui.shadcn.com/docs/components/dialog)
- [Select](https://ui.shadcn.com/docs/components/select)
- [Switch](https://ui.shadcn.com/docs/components/switch)
- [Tabs](https://ui.shadcn.com/docs/components/tabs)
- [Form](https://ui.shadcn.com/docs/components/form)

### Inspiração UI
- [Tailwind UI - Cards](https://tailwindui.com/components/application-ui/lists/grid-lists)
- [Tailwind UI - Forms](https://tailwindui.com/components/application-ui/forms/form-layouts)
- [Shadcn Examples](https://ui.shadcn.com/examples/dashboard)

---

**Documento gerado em:** 20/03/2026  
**Pesquisador:** @vibe-researcher  
**Fase:** FASE 01 - Research (SDD)  
**Próxima Fase:** FASE 02 - Planning (@vibe-planner)  
**Sprint:** 07 - Services UI 🛠️ (Frontend Only)

---

> ⚠️ **IMPORTANTE:** Este é um documento de especificação de produto (PRD). Não contém código implementado. A implementação será realizada na FASE 03 por @vibe-implementer baseado na SPEC técnica que será gerada na FASE 02.

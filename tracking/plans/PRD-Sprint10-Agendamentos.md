---
date: 2026-03-21T12:00:00-03:00
researcher: vibe-researcher
branch: master
repository: uniq-empresas
topic: "Sprint 10: Agendamentos UI - Frontend Only"
tags: [sprint, frontend, agendamentos, calendar, react, typescript, dnd-kit]
status: complete
ui_spec: docs/ui/modulo-08-agendamentos.md
roadmap_ref: docs/ROADMAP.md Sprint 14
---

# PRD - Sprint 10: Agendamentos UI 📅

**Projeto:** UNIQ Empresas  
**Tipo:** Frontend (UI Only)  
**Data de Criação:** 2026-03-21  
**Responsável:** Frontend Team  
**Referência UI:** `docs/ui/modulo-08-agendamentos.md`  
**Referência Roadmap:** `docs/ROADMAP.md` (Sprint 14)

---

## 1. Resumo Executivo

### 1.1 Objetivo
Desenvolver a interface completa do módulo de Agendamentos para a plataforma UNIQ Empresas, permitindo que pequenos empreendedores (salões, clínicas, consultórios, barbearias) gerenciem seus horários de atendimento de forma visual e intuitiva.

### 1.2 Escopo desta Sprint (Frontend Only)
- ✅ Calendário visual com múltiplas visualizações (Dia, Semana, Mês)
- ✅ Modal de criação de agendamentos (3 passos)
- ✅ Drawer de detalhes do agendamento
- ✅ Configurações da agenda (horários, serviços, profissionais)
- ✅ Lista de espera
- ✅ Integração visual com design system existente
- ❌ Backend/API (será desenvolvido em sprint futura)
- ❌ Integração real com WhatsApp
- ❌ Sincronização com Google Calendar

### 1.3 Stakeholders
- Salões de beleza
- Clínicas e consultórios
- Barbearias
- Estúdios de tatuagem
- Qualquer negócio de serviços com agendamento

---

## 2. Design System - Especificações Visuais

### 2.1 Paleta de Cores

| Token | Valor HEX | Uso |
|-------|-----------|-----|
| `--bg-primary` | `#efefef` | Fundo principal da aplicação |
| `--bg-card` | `#ffffff` | Fundo de cards e modais |
| `--btn-primary` | `#3e5653` | Botões primários |
| `--btn-primary-hover` | `#1f2937` | Hover de botões primários |
| `--btn-success` | `#86cb92` | Botões de sucesso/confirmar |
| `--accent` | `#86cb92` | Detalhes, indicadores de disponibilidade |
| `--text-primary` | `#1f2937` | Texto principal |
| `--text-secondary` | `#627271` | Texto secundário, placeholders |
| `--border` | `#e5e7eb` | Bordas e divisores |
| `--status-pending` | `#fef3c7` | Agendamento pendente - fundo |
| `--status-pending-text` | `#92400e` | Agendamento pendente - texto |
| `--status-confirmed` | `#dcfce7` | Confirmado - fundo |
| `--status-confirmed-text` | `#166534` | Confirmado - texto |
| `--status-completed` | `#dbeafe` | Concluído - fundo |
| `--status-completed-text` | `#1e40af` | Concluído - texto |
| `--status-cancelled` | `#fee2e2` | Cancelado - fundo |
| `--status-cancelled-text` | `#991b1b` | Cancelado - texto |
| `--status-blocked` | `#fee2e2` | Horário bloqueado - fundo |
| `--status-blocked-text` | `#dc2626` | Horário bloqueado - texto |
| `--status-waiting` | `#ffedd5` | Lista de espera - fundo |
| `--status-waiting-text` | `#c2410c` | Lista de espera - texto |

### 2.2 Tipografia

| Elemento | Fonte | Tamanho | Peso | Cor |
|----------|-------|---------|------|-----|
| Título Página | Poppins | 24px (text-2xl) | 700 (bold) | `#1f2937` |
| Subtítulo | Poppins | 14px (text-sm) | 400 | `#627271` |
| Calendário Mês | Poppins | 20px (text-xl) | 600 | `#1f2937` |
| Card Título | Poppins | 14px (text-sm) | 600 | `#1f2937` |
| Card Horário | Poppins | 12px (text-xs) | 500 | `#627271` |
| Badge Status | Poppins | 11px (text-xs) | 500 | Variável |

### 2.3 Classes Tailwind Padrão

```tsx
// Card padrão
bg-white rounded-lg shadow-sm border border-gray-200

// Botão Primário
bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors

// Botão Sucesso
bg-[#86cb92] text-white rounded-lg hover:bg-[#22c55e] transition-colors

// Input
border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent

// Event Card
rounded-md shadow-sm cursor-pointer hover:shadow-md transition-shadow
```

---

## 3. Estrutura de Componentes

### 3.1 Componentes Principais (mínimo 10)

| # | Componente | Descrição | Localização |
|---|------------|-----------|-------------|
| 1 | `CalendarWeekView` | Visualização semanal com grid de horários e drag-drop | `app/components/calendar/CalendarWeekView.tsx` |
| 2 | `CalendarDayView` | Visualização diária detalhada | `app/components/calendar/CalendarDayView.tsx` |
| 3 | `CalendarMonthView` | Visualização mensal com cards compactos | `app/components/calendar/CalendarMonthView.tsx` |
| 4 | `MiniCalendar` | Calendário compacto para sidebar | `app/components/calendar/MiniCalendar.tsx` |
| 5 | `NewAppointmentModal` | Modal de novo agendamento (3 passos) | `app/components/modals/NewAppointmentModal.tsx` |
| 6 | `AppointmentDetailsDrawer` | Drawer lateral com detalhes e ações | `app/components/drawers/AppointmentDetailsDrawer.tsx` |
| 7 | `TimeSlotGrid` | Grid de horários com slots clicáveis | `app/components/calendar/TimeSlotGrid.tsx` |
| 8 | `AppointmentCard` | Card de agendamento com status colorido | `app/components/cards/AppointmentCard.tsx` |
| 9 | `ProfessionalFilter` | Filtro de profissionais com avatares | `app/components/filters/ProfessionalFilter.tsx` |
| 10 | `ScheduleConfigPage` | Página de configurações da agenda | `app/agendamentos/configuracoes/page.tsx` |
| 11 | `ServiceConfigModal` | Modal de configuração de serviços | `app/components/modals/ServiceModal.tsx` |
| 12 | `WaitlistPage` | Página de lista de espera | `app/agendamentos/lista-espera/page.tsx` |
| 13 | `PublicBookingPage` | Página pública de agendamento | `app/(public)/agendar/[businessSlug]/page.tsx` |
| 14 | `StatusLegend` | Legenda de cores por status | `app/components/calendar/StatusLegend.tsx` |
| 15 | `AppointmentTimeline` | Timeline de histórico do agendamento | `app/components/timeline/AppointmentTimeline.tsx` |

### 3.2 Hooks Customizados

| Hook | Descrição |
|------|-----------|
| `useCalendar` | Gerenciamento de estado do calendário (data atual, visualização) |
| `useAppointments` | CRUD de agendamentos e mock data |
| `useDragAndDrop` | Lógica de drag & drop com @dnd-kit |
| `useAvailability` | Verificação de horários disponíveis |
| `useProfessionals` | Gerenciamento de profissionais |
| `useServices` | Gerenciamento de serviços |
| `useWaitlist` | Gerenciamento da lista de espera |

### 3.3 Utilitários

| Utilitário | Descrição |
|------------|-----------|
| `dateUtils.ts` | Funções de manipulação de data/hora |
| `statusColors.ts` | Mapeamento de cores por status |
| `formatters.ts` | Formatação de moeda, telefone, etc. |
| `mockData.ts` | Dados mockados para desenvolvimento |

---

## 4. Funcionalidades Detalhadas

### 4.1 Calendário de Agendamentos (/agendamentos)

#### Visualização Semanal (Padrão)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Header: Agendamentos                                [+ Novo Agendamento]    │
│ [Today] [< Março 2025 >]              [Dia][Semana][Mês] [🔍][👤]          │
├─────────────────────────────────────────────────────────────────────────────┤
│ [● Pendente] [● Confirmado] [● Concluído] [● Cancelado] [● Bloqueado]       │
├─────────────────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │       │ Seg 10 │ Ter 11 │ Qua 12 │ Qui 13 │ Sex 14 │ Sáb 15 │            │
│ ├───────┼────────┼────────┼────────┼────────┼────────┼────────┤            │
│ │ 08:00 │ ┌────┐ │        │ ┌────┐ │        │ ┌────┐ │ ┌────┐ │            │
│ │       │ │Maria│ │        │ │João│ │        │ │Ana │ │ │Pedro│ │            │
│ │       │ └────┘ │        │ └────┘ │        │ └────┘ │ └────┘ │            │
│ ├───────┼────────┼────────┼────────┼────────┼────────┼────────┤            │
│ │ 09:00 │ ┌────┐ │ ┌────┐ │        │ ┌────┐ │        │        │            │
│ │       │ │Carla│ │ │BLOQ│ │        │ │Marcos│ │        │        │            │
│ └───────┴────────┴────────┴────────┴────────┴────────┴────────┘            │
│                                                                           │
│ [Mini Calendar]  [Profissionais]  [Próximos Hoje]                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Funcionalidades:**
- ✅ Grid de horários das 8h às 20h (configurável)
- ✅ Cards de agendamento arrastáveis (drag & drop)
- ✅ Cores por status: Pendente (âmbar), Confirmado (verde), Concluído (azul), Cancelado (vermelho), Bloqueado (cinza)
- ✅ Clique em slot vazio → abre modal novo agendamento
- ✅ Clique em card → abre drawer de detalhes
- ✅ Navegação por semanas (anterior/próxima)
- ✅ Botão "Hoje" para voltar ao dia atual

#### Visualização Diária
- Agenda detalhada de um único dia
- Timeline vertical com todos os agendamentos
- Mais espaço para informações do cliente

#### Visualização Mensal
- Grid de dias do mês
- Indicadores de agendamentos por dia
- Navegação rápida entre meses

### 4.2 Modal Novo Agendamento

**Stepper: Cliente → Serviço → Data/Hora**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Novo Agendamento                                                    [X]     │
├─────────────────────────────────────────────────────────────────────────────┤
│  [Cliente] → [Serviço] → [Horário]                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ Passo 1: Cliente                                                            │
│ ┌───────────────────────────────────────────────────────────────────────┐   │
│ │ [Buscar cliente...                    🔍]                             │   │
│ │                                                                       │   │
│ │ Clientes Recentes:                                                    │   │
│ │ ┌────────┐ ┌────────┐ ┌────────┐                                     │   │
│ │ │ 👤     │ │ 👤     │ │ 👤     │                                     │   │
│ │ │ Maria  │ │ João   │ │ Ana    │                                     │   │
│ │ └────────┘ └────────┘ └────────┘                                     │   │
│ │                                                                       │   │
│ │ [+ Novo Cliente]                                                     │   │
│ └───────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ Passo 2: Serviço e Profissional                                             │
│ ┌───────────────────────────────────────────────────────────────────────┐   │
│ │ Serviço *                    Profissional *                           │   │
│ │ [Selecione... ▼]            [Selecione... ▼]                          │   │
│ │                                                                       │   │
│ │ Duração: 60 min    Valor: R$ 120,00                                   │   │
│ └───────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ Passo 3: Data e Hora                                                        │
│ ┌───────────────────────────────────────────────────────────────────────┐   │
│ │    ◀    Março 2025    ▶                                               │   │
│ │ ┌─────────────────────────────┐  ┌──────────────────────────────┐    │   │
│ │ │ Calendário                 │  │ Horários Disponíveis:        │    │   │
│ │ │                            │  │ ┌────┐┌────┐┌────┐┌────┐    │    │   │
│ │ │ D  S  T  Q  Q  S  S       │  │ │09:00││10:00││11:00││14:00│    │    │   │
│ │ │          1  2  3  4       │  │ └────┘└────┘└────┘└────┘    │    │   │
│ │ │ 5  6  7  8  9 [10] 11     │  └──────────────────────────────┘    │   │
│ │ └─────────────────────────────┘                                      │   │
│ └───────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│ Observações (opcional)                                                      │
│ ┌─────────────────────────────────────────────────────────────────────┐     │
│ │                                                                     │     │
│ └─────────────────────────────────────────────────────────────────────┘     │
│                                                                             │
│ ☑ Enviar confirmação por WhatsApp                                         │
│ ☑ Adicionar à lista de espera se não houver vaga                          │
│                                                                             │
│                                          [Cancelar]  [Voltar]  [Confirmar]  │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Funcionalidades:**
- ✅ Busca de cliente existente com autocomplete
- ✅ Cadastro rápido de novo cliente
- ✅ Seleção de serviço com duração e preço
- ✅ Seleção de profissional (opcional)
- ✅ Mini calendário com dias disponíveis
- ✅ Grid de horários disponíveis
- ✅ Campo de observações
- ✅ Checkbox para enviar confirmação WhatsApp
- ✅ Checkbox para lista de espera

### 4.3 Drawer Detalhes do Agendamento

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │ Agendamento #123                                              [✕]      │  │
│  ├────────────────────────────────────────────────────────────────────────┤  │
│  │                                                                        │  │
│  │ ┌──────────────────────────────────────────────────────────────────┐   │  │
│  │ │ 👤 Maria Silva                                                   │   │  │
│  │ │ 📞 (11) 99999-9999                                               │   │  │
│  │ │ 💇‍♀️ Corte Feminino                                              │   │  │
│  │ │ 👤 Profissional: Ana                                             │   │  │
│  │ │ 📅 Segunda-feira, 10 de Março de 2025                            │   │  │
│  │ │ 🕐 14:00 - 14:45 (45 min)                                        │   │  │
│  │ │ 💰 R$ 80,00                                                      │   │  │
│  │ │ 🏷️ [Confirmado]                                                  │   │  │
│  │ └──────────────────────────────────────────────────────────────────┘   │  │
│  │                                                                        │  │
│  │ Ações:                                                                 │  │
│  │ [✓ Confirmar] [✓ Concluir] [✕ Cancelar] [🔄 Reagendar]                │  │
│  │                                                                        │  │
│  │ ─────────────────────────────────────────────────────────────────────  │  │
│  │                                                                        │  │
│  │ Histórico:                                                             │  │
│  │ ● 10/03 10:00 - Agendamento criado por Admin                          │  │
│  │ ● 10/03 10:05 - Confirmação enviada por WhatsApp                      │  │
│  │ ● 09/03 09:00 - Lembrete automático enviado                           │  │
│  │                                                                        │  │
│  │ ─────────────────────────────────────────────────────────────────────  │  │
│  │                                                                        │  │
│  │ Observações:                                                           │  │
│  │ Cliente preferência por shampoo sem sal.                              │  │
│  │                                                                        │  │
│  │ [💬 Enviar Mensagem]  [✏️ Editar]  [🗑️ Excluir]                       │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Funcionalidades:**
- ✅ Informações completas do agendamento
- ✅ Timeline de histórico (criação, confirmações, lembretes)
- ✅ Ações rápidas: Confirmar, Concluir, Cancelar, Reagendar
- ✅ Botão para enviar mensagem WhatsApp
- ✅ Edição de observações

### 4.4 Configuração de Agenda (/agendamentos/configuracoes)

**Tabs: Horários | Serviços | Profissionais | Bloqueios | Lembretes**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Configurações da Agenda                                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ [Horários] [Serviços] [Profissionais] [Bloqueios] [Lembretes]               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ HORÁRIOS DE FUNCIONAMENTO                                                   │
│                                                                             │
│ ☑ Segunda-feira    das [08:00] até [18:00]  [+ Adicionar horário]          │
│ ☑ Terça-feira      das [08:00] até [18:00]                                 │
│ ☑ Quarta-feira     das [08:00] até [18:00]                                 │
│ ☑ Quinta-feira     das [08:00] até [18:00]                                 │
│ ☑ Sexta-feira      das [08:00] até [20:00]                                 │
│ ☐ Sábado           (Fechado)                                                │
│ ☐ Domingo          (Fechado)                                                │
│                                                                             │
│ Intervalo para almoço:                                                      │
│ Das [12:00] até [13:00]  ☑ Aplicar intervalo                               │
│                                                                             │
│ FERIADOS E DIAS ESPECIAIS                                                   │
│ ┌────────────┬──────────────┬────────────────┬────────┐                    │
│ │ Data       │ Descrição    │ Tipo           │ Ações  │                    │
│ ├────────────┼──────────────┼────────────────┼────────┤                    │
│ │ 01/01/2025 │ Ano Novo     │ Feriado Nac.   │ 🗑️     │                    │
│ │ 25/12/2025 │ Natal        │ Feriado Nac.   │ 🗑️     │                    │
│ └────────────┴──────────────┴────────────────┴────────┘                    │
│                                                                             │
│ [+ Adicionar Feriado]                                                       │
│                                             [Salvar Alterações]             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Funcionalidades:**
- ✅ Configuração de horários por dia da semana
- ✅ Múltiplos horários por dia (ex: manhã e tarde)
- ✅ Intervalo de almoço configurável
- ✅ Gerenciamento de feriados
- ✅ Configuração de serviços (nome, duração, preço, profissionais)
- ✅ Cadastro de profissionais (nome, cor, serviços, horários)
- ✅ Bloqueios de horário (férias, reuniões, etc.)

### 4.5 Lista de Espera (/agendamentos/lista-espera)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Lista de Espera                                    [+ Adicionar à Lista]    │
├─────────────────────────────────────────────────────────────────────────────┤
│ [Todos 15] [Pendentes 8] [Convertidos 4] [Cancelados 3]  [🔍 Buscar]        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ 1  👤 Maria Silva                                                       │ │
│ │    📞 (11) 99999-9999                                                   │ │
│ │    💇‍♀️ Corte Feminino - Qualquer profissional                         │ │
│ │    📅 Preferência: Segunda ou Quarta após 14h                           │ │
│ │    ⏱️ Aguardando há 2 dias                                              │ │
│ │    [🏷️ Pendente]                                                       │ │
│ │    [✓ Converter] [✉️ Notificar] [🗑️ Remover]                          │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ ESTATÍSTICAS                                                            │ │
│ │ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐                        │ │
│ │ │   15    │ │    8    │ │    4    │ │    3    │                        │ │
│ │ │  Total  │ │Pendente │ │Convertido│ │Cancelado│                        │ │
│ │ └─────────┘ └─────────┘ └─────────┘ └─────────┘                        │ │
│ │                                                                         │ │
│ │ Tempo médio de espera: 4 dias                                           │ │
│ │ Taxa de conversão: 27%                                                  │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Dependências

### 5.1 Bibliotecas Obrigatórias

```json
{
  "dependencies": {
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/sortable": "^8.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "date-fns": "^3.6.0",
    "react-calendar": "^5.0.0",
    "lucide-react": "^0.400.0"
  }
}
```

| Biblioteca | Versão | Propósito |
|------------|--------|-----------|
| `@dnd-kit/core` | ^6.1.0 | Drag & drop functionality |
| `@dnd-kit/sortable` | ^8.0.0 | Sortable drag & drop |
| `@dnd-kit/utilities` | ^3.2.2 | Utilitários para dnd-kit |
| `date-fns` | ^3.6.0 | Manipulação de datas |
| `react-calendar` | ^5.0.0 | Componente de calendário base |
| `lucide-react` | ^0.400.0 | Ícones (já incluso no projeto) |

### 5.2 Componentes shadcn/ui Necessários

- ✅ `Dialog` - Modais
- ✅ `Drawer` - Painel lateral de detalhes
- ✅ `Button` - Botões
- ✅ `Input` - Campos de texto
- ✅ `Select` - Dropdowns
- ✅ `Calendar` - Calendário base
- ✅ `Popover` - Popups
- ✅ `Badge` - Status indicators
- ✅ `Avatar` - Fotos de profissionais
- ✅ `Textarea` - Campos de observações
- ✅ `Checkbox` - Checkboxes
- ✅ `ScrollArea` - Scroll customizado
- ✅ `Separator` - Divisores
- ✅ `Skeleton` - Loading states
- ✅ `Tabs` - Tabs de navegação
- ✅ `Tooltip` - Tooltips informativos

### 5.3 Componentes Internos Existentes

- ✅ `Sidebar` - Menu lateral
- ✅ `Header` - Cabeçalho da página
- ✅ `Card` - Cards base

---

## 6. Mock Data

### 6.1 Agendamentos

```typescript
const mockAppointments = [
  {
    id: '1',
    clientName: 'Maria Silva',
    clientId: 'c1',
    service: 'Corte Feminino',
    serviceId: 's1',
    professional: 'Ana',
    professionalId: 'p1',
    startTime: '2026-03-21T10:00:00',
    endTime: '2026-03-21T10:45:00',
    status: 'confirmed',
    color: '#86cb92',
    phone: '(11) 99999-9999',
    notes: 'Cliente prefere shampoo sem sal',
    price: 80.00
  },
  {
    id: '2',
    clientName: 'João Pereira',
    clientId: 'c2',
    service: 'Barba',
    serviceId: 's2',
    professional: 'Carlos',
    professionalId: 'p2',
    startTime: '2026-03-21T11:00:00',
    endTime: '2026-03-21T11:30:00',
    status: 'pending',
    color: '#f59e0b',
    phone: '(11) 98888-8888',
    notes: '',
    price: 35.00
  },
  // ... mais agendamentos
];
```

### 6.2 Profissionais

```typescript
const mockProfessionals = [
  {
    id: 'p1',
    name: 'Ana Silva',
    email: 'ana@exemplo.com',
    phone: '(11) 99999-1111',
    color: '#86cb92',
    avatar: null,
    services: ['s1', 's3', 's4'],
    workDays: ['mon', 'tue', 'wed', 'thu', 'fri'],
    startTime: '09:00',
    endTime: '18:00'
  },
  {
    id: 'p2',
    name: 'Carlos Souza',
    email: 'carlos@exemplo.com',
    phone: '(11) 99999-2222',
    color: '#3b82f6',
    avatar: null,
    services: ['s2', 's5'],
    workDays: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
    startTime: '10:00',
    endTime: '20:00'
  }
];
```

### 6.3 Serviços

```typescript
const mockServices = [
  {
    id: 's1',
    name: 'Corte Feminino',
    duration: 45,
    price: 80.00,
    category: 'Cabelo',
    professionals: ['p1'],
    isActive: true,
    allowOnlineBooking: true
  },
  {
    id: 's2',
    name: 'Barba',
    duration: 30,
    price: 35.00,
    category: 'Barba',
    professionals: ['p2'],
    isActive: true,
    allowOnlineBooking: true
  }
];
```

### 6.4 Horários de Funcionamento

```typescript
const mockSchedule = {
  monday: { start: '09:00', end: '18:00', isOpen: true, intervals: [{ start: '12:00', end: '13:00' }] },
  tuesday: { start: '09:00', end: '18:00', isOpen: true, intervals: [{ start: '12:00', end: '13:00' }] },
  wednesday: { start: '09:00', end: '18:00', isOpen: true, intervals: [{ start: '12:00', end: '13:00' }] },
  thursday: { start: '09:00', end: '18:00', isOpen: true, intervals: [{ start: '12:00', end: '13:00' }] },
  friday: { start: '09:00', end: '20:00', isOpen: true, intervals: [{ start: '12:00', end: '13:00' }] },
  saturday: { start: '09:00', end: '13:00', isOpen: true, intervals: [] },
  sunday: { isOpen: false }
};
```

---

## 7. Estrutura de Arquivos

```
app/
├── agendamentos/
│   ├── page.tsx                          # Página principal do calendário
│   ├── configuracoes/
│   │   └── page.tsx                      # Configurações da agenda
│   └── lista-espera/
│       └── page.tsx                      # Lista de espera
│
├── (public)/
│   └── agendar/
│       └── [businessSlug]/
│           └── page.tsx                  # Página pública de agendamento
│
├── components/
│   ├── calendar/
│   │   ├── CalendarWeekView.tsx          # Visualização semanal
│   │   ├── CalendarDayView.tsx           # Visualização diária
│   │   ├── CalendarMonthView.tsx         # Visualização mensal
│   │   ├── MiniCalendar.tsx              # Calendário compacto
│   │   ├── TimeSlotGrid.tsx              # Grid de horários
│   │   ├── AppointmentCard.tsx           # Card de agendamento
│   │   └── StatusLegend.tsx              # Legenda de status
│   │
│   ├── modals/
│   │   ├── NewAppointmentModal.tsx       # Modal novo agendamento
│   │   └── ServiceModal.tsx              # Modal de serviço
│   │
│   ├── drawers/
│   │   └── AppointmentDetailsDrawer.tsx  # Drawer de detalhes
│   │
│   ├── filters/
│   │   └── ProfessionalFilter.tsx        # Filtro de profissionais
│   │
│   └── timeline/
│       └── AppointmentTimeline.tsx       # Timeline de histórico
│
├── hooks/
│   ├── useCalendar.ts
│   ├── useAppointments.ts
│   ├── useDragAndDrop.ts
│   ├── useAvailability.ts
│   ├── useProfessionals.ts
│   ├── useServices.ts
│   └── useWaitlist.ts
│
├── lib/
│   ├── utils/
│   │   ├── dateUtils.ts
│   │   ├── statusColors.ts
│   │   └── formatters.ts
│   └── mock/
│       └── appointments.ts
│
└── types/
    └── appointments.ts                   # Tipos TypeScript
```

---

## 8. Tipos TypeScript

```typescript
// types/appointments.ts

export type AppointmentStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'completed' 
  | 'cancelled' 
  | 'no-show'
  | 'blocked';

export interface Appointment {
  id: string;
  clientName: string;
  clientId: string;
  service: string;
  serviceId: string;
  professional: string;
  professionalId: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  color: string;
  phone: string;
  notes?: string;
  price: number;
}

export interface Professional {
  id: string;
  name: string;
  email: string;
  phone: string;
  color: string;
  avatar: string | null;
  services: string[];
  workDays: string[];
  startTime: string;
  endTime: string;
}

export interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  category: string;
  professionals: string[];
  isActive: boolean;
  allowOnlineBooking: boolean;
}

export interface TimeSlot {
  date: Date;
  hour: number;
  minute: number;
}

export interface ScheduleConfig {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isOpen: boolean;
  start?: string;
  end?: string;
  intervals: Interval[];
}

export interface Interval {
  start: string;
  end: string;
}

export interface WaitlistItem {
  id: string;
  clientName: string;
  clientPhone: string;
  serviceId: string;
  serviceName: string;
  preferredProfessional?: string;
  preferredDays?: string;
  preferredTime?: string;
  status: 'pending' | 'converted' | 'cancelled';
  waitingDays: number;
  notes?: string;
  createdAt: string;
}
```

---

## 9. Regras de Negócio (Frontend)

### 9.1 Disponibilidade de Horários
- Verificar se horário está dentro do expediente
- Verificar conflitos com agendamentos existentes
- Considerar duração do serviço
- Respeitar intervalos de almoço

### 9.2 Cores de Status
```typescript
const statusColors = {
  pending: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-400' },
  confirmed: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-400' },
  completed: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-400' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-400' },
  'no-show': { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-400' },
  blocked: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-400' },
  waiting: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-400' }
};
```

### 9.3 Validações
- Cliente obrigatório
- Serviço obrigatório
- Data/hora obrigatórios
- Horário deve ser futuro
- Não permitir agendamentos sobrepostos para o mesmo profissional

---

## 10. Checklist de Implementação

### ✅ Componentes Core
- [ ] `CalendarWeekView` - Visualização semanal com drag-and-drop
- [ ] `CalendarDayView` - Visualização diária detalhada
- [ ] `CalendarMonthView` - Visualização mensal
- [ ] `MiniCalendar` - Calendário compacto para sidebar
- [ ] `NewAppointmentModal` - Modal de novo agendamento (3 passos)
- [ ] `AppointmentDetailsDrawer` - Detalhes e ações do agendamento
- [ ] `PublicBookingPage` - Página pública de agendamento
- [ ] `ConfigPage` - Configurações da agenda (5 tabs)
- [ ] `WaitlistPage` - Lista de espera

### ✅ Estados
- [ ] Loading states para todas as visualizações
- [ ] Empty states quando não há agendamentos
- [ ] Error states com retry
- [ ] Skeleton screens para carregamento

### ✅ Funcionalidades
- [ ] Criar/editar/cancelar agendamentos
- [ ] Drag-and-drop para reagendamento (@dnd-kit)
- [ ] Filtro por profissionais
- [ ] Busca de clientes em tempo real
- [ ] Seleção de horários disponíveis
- [ ] Bloqueio de horários (visual)
- [ ] Lista de espera com prioridade
- [ ] Notificações automáticas (configuração visual)
- [ ] Histórico de atendimentos

### ✅ Responsividade
- [ ] Desktop: Layout completo com sidebar
- [ ] Tablet: Layout adaptativo
- [ ] Mobile: Visualização simplificada, lista de agendamentos

### ✅ Acessibilidade
- [ ] Navegação por teclado no calendário
- [ ] ARIA labels em elementos interativos
- [ ] Contraste adequado das cores
- [ ] Suporte a screen readers

---

## 11. URLs das Telas

| Tela | Rota | Acesso |
|------|------|--------|
| Calendário | `/agendamentos` | Admin |
| Novo Agendamento | `/agendamentos?modal=new` | Admin |
| Configurações | `/agendamentos/configuracoes` | Admin |
| Lista de Espera | `/agendamentos/lista-espera` | Admin |
| Agendamento Público | `/agendar/[businessSlug]` | Público |

---

## 12. Notas de Implementação

### 12.1 Prioridade de Desenvolvimento
1. **Alta:** Calendário semanal, Modal novo agendamento, Drawer detalhes
2. **Média:** Configurações, Visualizações dia/mês, Lista de espera
3. **Baixa:** Página pública, Integrações visuais

### 12.2 Considerações Técnicas
- Usar `date-fns` para todas as operações de data
- Implementar drag & drop apenas na visualização semanal inicialmente
- Mock data deve ser suficiente para demonstração completa
- Manter consistência com design system existente
- Usar variáveis CSS do tema UNIQ

### 12.3 Integrações Futuras (Backend)
- Supabase para persistência
- WhatsApp API para notificações
- Google Calendar sync
- Módulo MEL (Lembretes)
- Módulo CRM (Clientes)

---

## 13. Anexos

### 13.1 Cores de Profissionais (Padrão)
```typescript
const professionalColors = [
  '#86cb92', // Emerald
  '#3b82f6', // Blue
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#8b5cf6', // Violet
  '#06b6d4', // Cyan
  '#f97316', // Orange
  '#10b981', // Green
];
```

### 13.2 Slug de Negócio (Público)
- Format: `/agendar/[businessSlug]`
- Exemplo: `/agendar/salao-beleza-total`
- Slug gerado a partir do nome da empresa (kebab-case)

---

**Fim do PRD**

*Documento criado em: 2026-03-21*  
*Baseado em: docs/ui/modulo-08-agendamentos.md*  
*Referência: docs/ROADMAP.md - Sprint 14*

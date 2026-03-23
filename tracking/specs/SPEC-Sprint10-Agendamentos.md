# SPEC - Sprint 10: Agendamentos UI 📅

## Overview Técnico

- **Stack:** React 19 + TypeScript 5.4 + Vite + Tailwind CSS 4.0 + shadcn/ui
- **Padrão:** Componentes funcionais com hooks
- **Estado:** useState/useReducer locais (mock data)
- **Drag & Drop:** @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities
- **Data:** date-fns para manipulação de datas
- **Design System:** Cores UNIQ (#3e5653, #86cb92, status colors)

**Data da SPEC:** 21/03/2026  
**Baseada no PRD:** `tracking/plans/PRD-Sprint10-Agendamentos.md`  
**Referência UI:** `docs/ui/modulo-08-agendamentos.md`

---

## 1. Estrutura de Diretórios

```
app/
├── (dashboard)/
│   └── agendamentos/
│       ├── page.tsx                          # Página principal do calendário
│       ├── configuracoes/
│       │   └── page.tsx                      # Configurações da agenda
│       └── lista-espera/
│           └── page.tsx                      # Lista de espera
│
├── (public)/
│   └── agendar/
│       └── [businessSlug]/
│           └── page.tsx                      # Página pública de agendamento
│
├── components/
│   ├── calendar/
│   │   ├── CalendarWeekView.tsx              # Visualização semanal com drag-drop
│   │   ├── CalendarDayView.tsx               # Visualização diária detalhada
│   │   ├── CalendarMonthView.tsx             # Visualização mensal
│   │   ├── MiniCalendar.tsx                  # Calendário compacto para sidebar
│   │   ├── TimeSlotGrid.tsx                  # Grid de horários
│   │   ├── AppointmentCard.tsx               # Card de agendamento
│   │   └── StatusLegend.tsx                  # Legenda de status
│   │
│   ├── modals/
│   │   ├── NewAppointmentModal.tsx           # Modal novo agendamento (3 passos)
│   │   └── ServiceModal.tsx                  # Modal de serviço
│   │
│   ├── drawers/
│   │   └── AppointmentDetailsDrawer.tsx      # Drawer de detalhes
│   │
│   ├── filters/
│   │   └── ProfessionalFilter.tsx            # Filtro de profissionais
│   │
│   └── timeline/
│       └── AppointmentTimeline.tsx           # Timeline de histórico
│
├── hooks/
│   ├── useAppointments.ts                    # CRUD de agendamentos
│   ├── useCalendarNavigation.ts              # Navegação do calendário
│   ├── useDragAndDrop.ts                     # Lógica de drag & drop
│   ├── useProfessionalFilter.ts              # Filtro de profissionais
│   ├── useAvailableSlots.ts                  # Verificação de horários
│   ├── useServices.ts                        # Gestão de serviços
│   └── useWaitlist.ts                        # Lista de espera
│
├── lib/
│   ├── utils/
│   │   ├── dateUtils.ts                      # Funções de data/hora
│   │   ├── statusColors.ts                   # Mapeamento de cores
│   │   └── formatters.ts                     # Formatação de valores
│   └── mocks/
│       └── appointments.ts                   # Mock data completo
│
└── types/
    └── appointments.ts                       # Tipos TypeScript
```

---

## 2. Dependências

### 2.1 Instalar Pacotes

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities date-fns
```

### 2.2 Componentes shadcn/ui Necessários

```bash
npx shadcn add dialog drawer button input select calendar popover badge avatar textarea checkbox scroll-area separator skeleton tabs tooltip
```

### 2.3 package.json

```json
{
  "dependencies": {
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/sortable": "^8.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "date-fns": "^3.6.0",
    "lucide-react": "^0.400.0"
  }
}
```

---

## 3. Interfaces TypeScript

### 3.1 Tipos Principais

**Arquivo:** `app/types/appointments.ts`

```typescript
// ============================================
// TIPOS DE STATUS
// ============================================

export type AppointmentStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'completed' 
  | 'cancelled' 
  | 'no-show'
  | 'blocked';

export type WaitlistStatus = 'pending' | 'converted' | 'cancelled' | 'notified';

export type CalendarView = 'day' | 'week' | 'month';

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

// ============================================
// ENTIDADES PRINCIPAIS
// ============================================

export interface Appointment {
  id: string;
  clientName: string;
  clientId: string;
  clientPhone: string;
  clientEmail?: string;
  service: string;
  serviceId: string;
  professional: string;
  professionalId: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  status: AppointmentStatus;
  color: string;
  notes?: string;
  price: number;
  duration: number; // minutos
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  history?: AppointmentHistoryItem[];
}

export interface Professional {
  id: string;
  name: string;
  email: string;
  phone: string;
  color: string;
  avatar: string | null;
  services: string[]; // IDs dos serviços
  workDays: DayOfWeek[];
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  isActive: boolean;
}

export interface Service {
  id: string;
  name: string;
  duration: number; // minutos
  price: number;
  category: string;
  professionals: string[]; // IDs dos profissionais
  isActive: boolean;
  allowOnlineBooking: boolean;
  description?: string;
}

export interface TimeSlot {
  date: Date;
  hour: number;
  minute: number;
  isAvailable: boolean;
  isBlocked?: boolean;
}

export interface ScheduleConfig {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
  lunchBreak: {
    enabled: boolean;
    start: string; // HH:mm
    end: string; // HH:mm
  };
}

export interface DaySchedule {
  isOpen: boolean;
  start?: string; // HH:mm
  end?: string; // HH:mm
  intervals: TimeInterval[];
}

export interface TimeInterval {
  start: string; // HH:mm
  end: string; // HH:mm
}

export interface WaitlistItem {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  serviceId: string;
  serviceName: string;
  preferredProfessional?: string;
  preferredProfessionalId?: string;
  preferredDays?: string;
  preferredTime?: string;
  status: WaitlistStatus;
  waitingDays: number;
  notes?: string;
  createdAt: string;
  notifiedAt?: string;
}

export interface AppointmentHistoryItem {
  id: string;
  action: 'created' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled' | 'reminder_sent' | 'message_sent';
  timestamp: string;
  performedBy?: string;
  details?: string;
}

export interface BlockedSlot {
  id: string;
  date: string; // ISO string
  startTime?: string; // HH:mm
  endTime?: string; // HH:mm
  allDay: boolean;
  reason: string;
  professionalId?: string;
  isRecurring?: boolean;
  recurrencePattern?: 'daily' | 'weekly' | 'monthly';
}

export interface Holiday {
  id: string;
  date: string; // YYYY-MM-DD
  description: string;
  type: 'national' | 'local' | 'custom';
}

// ============================================
// TIPOS DE FORMULÁRIO
// ============================================

export interface AppointmentFormData {
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  serviceId: string;
  serviceName: string;
  professionalId: string;
  professionalName: string;
  date: Date;
  time: string; // HH:mm
  duration: number;
  price: number;
  notes: string;
  sendConfirmation: boolean;
  addToWaitlist: boolean;
}

export interface PublicBookingData {
  serviceId: string;
  serviceName: string;
  professionalId: string;
  professionalName: string;
  date: Date | null;
  time: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  notes: string;
  receiveReminders: boolean;
}

// ============================================
// TIPOS DE PROPS
// ============================================

export interface CalendarWeekViewProps {
  currentDate: Date;
  appointments: Appointment[];
  professionals: Professional[];
  selectedProfessionals: string[];
  onAppointmentClick: (appointment: Appointment) => void;
  onSlotClick: (slot: TimeSlot) => void;
  onDropAppointment: (appointmentId: string, newSlot: TimeSlot) => void;
  isLoading?: boolean;
}

export interface CalendarDayViewProps {
  currentDate: Date;
  appointments: Appointment[];
  professionals: Professional[];
  selectedProfessionals: string[];
  onAppointmentClick: (appointment: Appointment) => void;
  onSlotClick: (slot: TimeSlot) => void;
}

export interface CalendarMonthViewProps {
  currentDate: Date;
  appointments: Appointment[];
  professionals: Professional[];
  selectedProfessionals: string[];
  onDateSelect: (date: Date) => void;
  onAppointmentClick: (appointment: Appointment) => void;
}

export interface MiniCalendarProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
  appointments: Appointment[];
}

export interface AppointmentCardProps {
  appointment: Appointment;
  onClick: (appointment: Appointment) => void;
  isDragging?: boolean;
  style?: React.CSSProperties;
}

export interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDate?: Date;
  initialTime?: string;
  onSubmit: (data: AppointmentFormData) => void;
}

export interface AppointmentDetailsDrawerProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => void;
  onComplete: (id: string) => void;
  onCancel: (id: string) => void;
  onReschedule: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface ProfessionalFilterProps {
  professionals: Professional[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export interface TimeSlotGridProps {
  selectedDate: Date;
  availableSlots: TimeSlot[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  isLoading?: boolean;
}

export interface StatusLegendProps {
  showBlocked?: boolean;
}

export interface AppointmentTimelineProps {
  history: AppointmentHistoryItem[];
}

export interface WaitlistItemProps {
  item: WaitlistItem;
  index: number;
  onConvert: (item: WaitlistItem) => void;
  onNotify: (item: WaitlistItem) => void;
  onEdit: (item: WaitlistItem) => void;
  onRemove: (id: string) => void;
}

export interface PublicBookingPageProps {
  businessSlug: string;
}
```

---

## 4. Mock Data Completo

### 4.1 Agendamentos

**Arquivo:** `app/lib/mocks/appointments.ts`

```typescript
import { Appointment, Professional, Service, WaitlistItem, ScheduleConfig, Holiday } from '@/types/appointments';

export const mockAppointments: Appointment[] = [
  {
    id: 'apt-001',
    clientName: 'Maria Silva',
    clientId: 'cli-001',
    clientPhone: '(11) 99999-9999',
    clientEmail: 'maria@email.com',
    service: 'Corte Feminino',
    serviceId: 'srv-001',
    professional: 'Ana',
    professionalId: 'prof-001',
    startTime: '2026-03-24T10:00:00',
    endTime: '2026-03-24T10:45:00',
    status: 'confirmed',
    color: '#86cb92',
    notes: 'Cliente prefere shampoo sem sal',
    price: 80.00,
    duration: 45,
    createdAt: '2026-03-20T14:30:00',
    updatedAt: '2026-03-20T14:30:00',
    history: [
      { id: 'hist-001', action: 'created', timestamp: '2026-03-20T14:30:00', performedBy: 'Admin' },
      { id: 'hist-002', action: 'confirmed', timestamp: '2026-03-21T09:15:00', performedBy: 'Sistema' }
    ]
  },
  {
    id: 'apt-002',
    clientName: 'João Pereira',
    clientId: 'cli-002',
    clientPhone: '(11) 98888-8888',
    service: 'Barba',
    serviceId: 'srv-002',
    professional: 'Carlos',
    professionalId: 'prof-002',
    startTime: '2026-03-24T11:00:00',
    endTime: '2026-03-24T11:30:00',
    status: 'pending',
    color: '#f59e0b',
    price: 35.00,
    duration: 30,
    createdAt: '2026-03-21T10:00:00',
    updatedAt: '2026-03-21T10:00:00'
  },
  {
    id: 'apt-003',
    clientName: 'Ana Luiza',
    clientId: 'cli-003',
    clientPhone: '(11) 97777-7777',
    service: 'Coloração',
    serviceId: 'srv-003',
    professional: 'Ana',
    professionalId: 'prof-001',
    startTime: '2026-03-24T14:00:00',
    endTime: '2026-03-24T16:00:00',
    status: 'confirmed',
    color: '#86cb92',
    notes: 'Tinta importada',
    price: 180.00,
    duration: 120,
    createdAt: '2026-03-19T16:00:00',
    updatedAt: '2026-03-19T16:00:00'
  },
  {
    id: 'apt-004',
    clientName: 'Pedro Santos',
    clientId: 'cli-004',
    clientPhone: '(11) 96666-6666',
    service: 'Corte Masculino',
    serviceId: 'srv-004',
    professional: 'Carlos',
    professionalId: 'prof-002',
    startTime: '2026-03-25T09:00:00',
    endTime: '2026-03-25T09:30:00',
    status: 'completed',
    color: '#3b82f6',
    price: 50.00,
    duration: 30,
    createdAt: '2026-03-18T11:00:00',
    updatedAt: '2026-03-25T09:35:00'
  },
  {
    id: 'apt-005',
    clientName: 'Carla Mendes',
    clientId: 'cli-005',
    clientPhone: '(11) 95555-5555',
    service: 'Manicure',
    serviceId: 'srv-005',
    professional: 'Fernanda',
    professionalId: 'prof-003',
    startTime: '2026-03-25T10:00:00',
    endTime: '2026-03-25T10:30:00',
    status: 'cancelled',
    color: '#ef4444',
    notes: 'Cancelado pelo cliente',
    price: 40.00,
    duration: 30,
    createdAt: '2026-03-20T09:00:00',
    updatedAt: '2026-03-24T08:00:00'
  },
  {
    id: 'apt-006',
    clientName: 'Lucas Oliveira',
    clientId: 'cli-006',
    clientPhone: '(11) 94444-4444',
    service: 'Hidratação',
    serviceId: 'srv-006',
    professional: 'Ana',
    professionalId: 'prof-001',
    startTime: '2026-03-25T14:00:00',
    endTime: '2026-03-25T14:40:00',
    status: 'pending',
    color: '#f59e0b',
    price: 60.00,
    duration: 40,
    createdAt: '2026-03-22T15:00:00',
    updatedAt: '2026-03-22T15:00:00'
  },
  {
    id: 'apt-007',
    clientName: 'Sofia Lima',
    clientId: 'cli-007',
    clientPhone: '(11) 93333-3333',
    service: 'Maquiagem',
    serviceId: 'srv-007',
    professional: 'Juliana',
    professionalId: 'prof-004',
    startTime: '2026-03-26T09:00:00',
    endTime: '2026-03-26T10:00:00',
    status: 'confirmed',
    color: '#86cb92',
    notes: 'Maquiagem para festa',
    price: 120.00,
    duration: 60,
    createdAt: '2026-03-21T18:00:00',
    updatedAt: '2026-03-21T18:00:00'
  },
  {
    id: 'apt-008',
    clientName: 'Marcos Silva',
    clientId: 'cli-008',
    clientPhone: '(11) 92222-2222',
    service: 'Tatuagem',
    serviceId: 'srv-008',
    professional: 'Ricardo',
    professionalId: 'prof-005',
    startTime: '2026-03-26T14:00:00',
    endTime: '2026-03-26T17:00:00',
    status: 'confirmed',
    color: '#86cb92',
    notes: 'Tatuagem de 3h',
    price: 450.00,
    duration: 180,
    createdAt: '2026-03-15T10:00:00',
    updatedAt: '2026-03-15T10:00:00'
  },
  {
    id: 'apt-009',
    clientName: 'Bia Costa',
    clientId: 'cli-009',
    clientPhone: '(11) 91111-1111',
    service: 'Depilação',
    serviceId: 'srv-009',
    professional: 'Fernanda',
    professionalId: 'prof-003',
    startTime: '2026-03-27T11:00:00',
    endTime: '2026-03-27T12:00:00',
    status: 'no-show',
    color: '#6b7280',
    price: 70.00,
    duration: 60,
    createdAt: '2026-03-20T16:00:00',
    updatedAt: '2026-03-27T12:05:00'
  },
  {
    id: 'apt-010',
    clientName: 'Tiago Rocha',
    clientId: 'cli-010',
    clientPhone: '(11) 90000-0000',
    service: 'Corte Masculino',
    serviceId: 'srv-004',
    professional: 'Carlos',
    professionalId: 'prof-002',
    startTime: '2026-03-27T16:00:00',
    endTime: '2026-03-27T16:30:00',
    status: 'pending',
    color: '#f59e0b',
    price: 50.00,
    duration: 30,
    createdAt: '2026-03-23T14:00:00',
    updatedAt: '2026-03-23T14:00:00'
  },
  {
    id: 'apt-011',
    clientName: 'BLOCKED',
    clientId: '',
    clientPhone: '',
    service: 'Bloqueado',
    serviceId: '',
    professional: '',
    professionalId: '',
    startTime: '2026-03-24T12:00:00',
    endTime: '2026-03-24T13:00:00',
    status: 'blocked',
    color: '#dc2626',
    notes: 'Almoço',
    price: 0,
    duration: 60,
    createdAt: '2026-01-01T00:00:00',
    updatedAt: '2026-01-01T00:00:00'
  }
];

export const mockProfessionals: Professional[] = [
  {
    id: 'prof-001',
    name: 'Ana Silva',
    email: 'ana.silva@salao.com',
    phone: '(11) 99999-1111',
    color: '#86cb92',
    avatar: null,
    services: ['srv-001', 'srv-003', 'srv-006'],
    workDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    startTime: '09:00',
    endTime: '18:00',
    isActive: true
  },
  {
    id: 'prof-002',
    name: 'Carlos Souza',
    email: 'carlos@barbearia.com',
    phone: '(11) 99999-2222',
    color: '#3b82f6',
    avatar: null,
    services: ['srv-002', 'srv-004'],
    workDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    startTime: '10:00',
    endTime: '20:00',
    isActive: true
  },
  {
    id: 'prof-003',
    name: 'Fernanda Lima',
    email: 'fernanda@estetica.com',
    phone: '(11) 99999-3333',
    color: '#ec4899',
    avatar: null,
    services: ['srv-005', 'srv-009'],
    workDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    startTime: '09:00',
    endTime: '17:00',
    isActive: true
  },
  {
    id: 'prof-004',
    name: 'Juliana Costa',
    email: 'juliana@maquiagem.com',
    phone: '(11) 99999-4444',
    color: '#f59e0b',
    avatar: null,
    services: ['srv-007'],
    workDays: ['wednesday', 'thursday', 'friday', 'saturday'],
    startTime: '09:00',
    endTime: '18:00',
    isActive: true
  },
  {
    id: 'prof-005',
    name: 'Ricardo Mendes',
    email: 'ricardo@tatuagem.com',
    phone: '(11) 99999-5555',
    color: '#8b5cf6',
    avatar: null,
    services: ['srv-008'],
    workDays: ['tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    startTime: '14:00',
    endTime: '20:00',
    isActive: true
  }
];

export const mockServices: Service[] = [
  {
    id: 'srv-001',
    name: 'Corte Feminino',
    duration: 45,
    price: 80.00,
    category: 'Cabelo',
    professionals: ['prof-001'],
    isActive: true,
    allowOnlineBooking: true,
    description: 'Corte, lavagem e finalização'
  },
  {
    id: 'srv-002',
    name: 'Barba',
    duration: 30,
    price: 35.00,
    category: 'Barba',
    professionals: ['prof-002'],
    isActive: true,
    allowOnlineBooking: true,
    description: 'Barba completa com toalha quente'
  },
  {
    id: 'srv-003',
    name: 'Coloração',
    duration: 120,
    price: 180.00,
    category: 'Cabelo',
    professionals: ['prof-001'],
    isActive: true,
    allowOnlineBooking: true,
    description: 'Coloração completa com produtos de qualidade'
  },
  {
    id: 'srv-004',
    name: 'Corte Masculino',
    duration: 30,
    price: 50.00,
    category: 'Cabelo',
    professionals: ['prof-002'],
    isActive: true,
    allowOnlineBooking: true,
    description: 'Corte masculino moderno'
  },
  {
    id: 'srv-005',
    name: 'Manicure',
    duration: 30,
    price: 40.00,
    category: 'Unhas',
    professionals: ['prof-003'],
    isActive: true,
    allowOnlineBooking: true,
    description: 'Cuidados com as unhas das mãos'
  },
  {
    id: 'srv-006',
    name: 'Hidratação',
    duration: 40,
    price: 60.00,
    category: 'Cabelo',
    professionals: ['prof-001'],
    isActive: true,
    allowOnlineBooking: true,
    description: 'Hidratação profunda para cabelos'
  },
  {
    id: 'srv-007',
    name: 'Maquiagem',
    duration: 60,
    price: 120.00,
    category: 'Maquiagem',
    professionals: ['prof-004'],
    isActive: true,
    allowOnlineBooking: true,
    description: 'Maquiagem social ou para eventos'
  },
  {
    id: 'srv-008',
    name: 'Tatuagem',
    duration: 180,
    price: 450.00,
    category: 'Tatuagem',
    professionals: ['prof-005'],
    isActive: true,
    allowOnlineBooking: false,
    description: 'Sessão de tatuagem (preço por sessão)'
  },
  {
    id: 'srv-009',
    name: 'Depilação',
    duration: 60,
    price: 70.00,
    category: 'Estética',
    professionals: ['prof-003'],
    isActive: true,
    allowOnlineBooking: true,
    description: 'Depilação com cera'
  }
];

export const mockWaitlist: WaitlistItem[] = [
  {
    id: 'wl-001',
    clientName: 'Maria Silva',
    clientPhone: '(11) 99999-9999',
    serviceId: 'srv-001',
    serviceName: 'Corte Feminino',
    preferredDays: 'Segunda ou Quarta',
    preferredTime: 'após 14h',
    status: 'pending',
    waitingDays: 2,
    notes: 'Cliente preferencial',
    createdAt: '2026-03-19T10:00:00'
  },
  {
    id: 'wl-002',
    clientName: 'João Pereira',
    clientPhone: '(11) 98888-8888',
    serviceId: 'srv-005',
    serviceName: 'Manicure',
    preferredProfessional: 'Ana',
    preferredProfessionalId: 'prof-003',
    preferredDays: 'Qualquer dia',
    preferredTime: 'pela manhã',
    status: 'pending',
    waitingDays: 5,
    createdAt: '2026-03-16T14:00:00'
  },
  {
    id: 'wl-003',
    clientName: 'Carla Santos',
    clientPhone: '(11) 97777-7777',
    serviceId: 'srv-006',
    serviceName: 'Hidratação',
    preferredDays: 'Sexta-feira',
    status: 'notified',
    waitingDays: 7,
    notes: 'Disponível após as 15h',
    createdAt: '2026-03-14T09:00:00',
    notifiedAt: '2026-03-20T10:00:00'
  },
  {
    id: 'wl-004',
    clientName: 'Paulo Henrique',
    clientPhone: '(11) 96666-6666',
    serviceId: 'srv-004',
    serviceName: 'Corte Masculino',
    preferredProfessional: 'Carlos',
    preferredProfessionalId: 'prof-002',
    status: 'converted',
    waitingDays: 3,
    createdAt: '2026-03-18T16:00:00'
  },
  {
    id: 'wl-005',
    clientName: 'Fernanda Lima',
    clientPhone: '(11) 95555-5555',
    serviceId: 'srv-003',
    serviceName: 'Coloração',
    status: 'cancelled',
    waitingDays: 1,
    notes: 'Desistiu - já fez em outro lugar',
    createdAt: '2026-03-20T11:00:00'
  }
];

export const mockScheduleConfig: ScheduleConfig = {
  monday: { isOpen: true, start: '09:00', end: '18:00', intervals: [] },
  tuesday: { isOpen: true, start: '09:00', end: '18:00', intervals: [] },
  wednesday: { isOpen: true, start: '09:00', end: '18:00', intervals: [] },
  thursday: { isOpen: true, start: '09:00', end: '18:00', intervals: [] },
  friday: { isOpen: true, start: '09:00', end: '20:00', intervals: [] },
  saturday: { isOpen: true, start: '09:00', end: '14:00', intervals: [] },
  sunday: { isOpen: false, intervals: [] },
  lunchBreak: { enabled: true, start: '12:00', end: '13:00' }
};

export const mockHolidays: Holiday[] = [
  { id: 'hol-001', date: '2026-01-01', description: 'Ano Novo', type: 'national' },
  { id: 'hol-002', date: '2026-04-03', description: 'Sexta-feira Santa', type: 'national' },
  { id: 'hol-003', date: '2026-04-05', description: 'Páscoa', type: 'national' },
  { id: 'hol-004', date: '2026-04-21', description: 'Tiradentes', type: 'national' },
  { id: 'hol-005', date: '2026-05-01', description: 'Dia do Trabalho', type: 'national' },
  { id: 'hol-006', date: '2026-06-04', description: 'Corpus Christi', type: 'national' },
  { id: 'hol-007', date: '2026-09-07', description: 'Independência', type: 'national' },
  { id: 'hol-008', date: '2026-10-12', description: 'Nossa Senhora', type: 'national' },
  { id: 'hol-009', date: '2026-11-02', description: 'Finados', type: 'national' },
  { id: 'hol-010', date: '2026-11-15', description: 'Proclamação da República', type: 'national' },
  { id: 'hol-011', date: '2026-12-25', description: 'Natal', type: 'national' }
];

export const professionalColors = [
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

---

## 5. Cores de Status

### 5.1 Configuração de Cores

**Arquivo:** `app/lib/utils/statusColors.ts`

```typescript
import { AppointmentStatus, WaitlistStatus } from '@/types/appointments';

export const statusColors: Record<AppointmentStatus, { bg: string; text: string; border: string; label: string }> = {
  pending: {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    border: 'border-amber-400',
    label: 'Pendente'
  },
  confirmed: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-400',
    label: 'Confirmado'
  },
  completed: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-400',
    label: 'Concluído'
  },
  cancelled: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-400',
    label: 'Cancelado'
  },
  'no-show': {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-400',
    label: 'Não Compareceu'
  },
  blocked: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    border: 'border-red-400',
    label: 'Bloqueado'
  }
};

export const waitlistStatusColors: Record<WaitlistStatus, { bg: string; text: string; label: string }> = {
  pending: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Pendente' },
  converted: { bg: 'bg-green-100', text: 'text-green-800', label: 'Convertido' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelado' },
  notified: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Notificado' }
};

export const getStatusBadgeClass = (status: AppointmentStatus): string => {
  const colors = statusColors[status];
  return `${colors.bg} ${colors.text} border ${colors.border}`;
};

export const getStatusLabel = (status: AppointmentStatus): string => {
  return statusColors[status].label;
};

export const getStatusBorderColor = (status: AppointmentStatus): string => {
  const colors = statusColors[status];
  return `border-l-4 ${colors.border.replace('border-', 'border-l-')}`;
};
```

---

## 6. Componentes Principais

### 6.1 CalendarWeekView

**Arquivo:** `app/components/calendar/CalendarWeekView.tsx`

```typescript
'use client';

import React from 'react';
import { format, startOfWeek, addDays, isToday, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DndContext, useDraggable, useDroppable, DragOverlay, closestCenter } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Clock } from 'lucide-react';
import { Appointment, TimeSlot, CalendarWeekViewProps } from '@/types/appointments';
import { getStatusBadgeClass } from '@/lib/utils/statusColors';
import { cn } from '@/lib/utils';

// Funções utilitárias
const getWeekDays = (currentDate: Date): Date[] => {
  const start = startOfWeek(currentDate, { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
};

const generateHours = (start: number, end: number): number[] => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const formatHour = (hour: number): string => {
  return `${hour.toString().padStart(2, '0')}:00`;
};

const getAppointmentsForSlot = (appointments: Appointment[], day: Date, hour: number): Appointment[] => {
  return appointments.filter(apt => {
    const aptDate = new Date(apt.startTime);
    return isSameDay(aptDate, day) && aptDate.getHours() === hour;
  });
};

// Componente Draggable Appointment
interface DraggableAppointmentProps {
  appointment: Appointment;
  onClick: (appointment: Appointment) => void;
}

function DraggableAppointment({ appointment, onClick }: DraggableAppointmentProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: appointment.id,
    data: { appointment }
  });

  const style = transform ? {
    transform: CSS.Translate.toString(transform),
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={(e) => {
        e.stopPropagation();
        onClick(appointment);
      }}
      style={style}
      className={cn(
        'mb-1 p-2 rounded-md text-xs cursor-pointer shadow-sm hover:shadow-md transition-all',
        getStatusBadgeClass(appointment.status),
        isDragging && 'opacity-50 rotate-2 scale-105 z-50'
      )}
    >
      <div className="font-semibold truncate">{appointment.clientName}</div>
      <div className="truncate opacity-75">{appointment.service}</div>
      <div className="flex items-center gap-1 mt-1">
        <Clock className="w-3 h-3" />
        <span>{format(new Date(appointment.startTime), 'HH:mm')}</span>
      </div>
    </div>
  );
}

// Componente Droppable Slot
interface DroppableSlotProps {
  day: Date;
  hour: number;
  appointments: Appointment[];
  isBlocked: boolean;
  onSlotClick: (slot: TimeSlot) => void;
  onAppointmentClick: (appointment: Appointment) => void;
  children: React.ReactNode;
}

function DroppableSlot({ 
  day, 
  hour, 
  appointments, 
  isBlocked, 
  onSlotClick, 
  onAppointmentClick,
  children 
}: DroppableSlotProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `${day.toISOString()}-${hour}`,
    data: { date: day, hour, minute: 0 }
  });

  return (
    <div
      ref={setNodeRef}
      onClick={() => !isBlocked && onSlotClick({ date: day, hour, minute: 0, isAvailable: true })}
      className={cn(
        'flex-1 border-r border-b border-gray-200 last:border-r-0 p-1 relative min-h-[80px]',
        isBlocked 
          ? 'bg-red-50 cursor-not-allowed' 
          : isOver 
            ? 'bg-[#86cb92]/30 cursor-pointer' 
            : 'hover:bg-gray-50 cursor-pointer'
      )}
    >
      {isBlocked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs text-red-500 font-medium">Bloqueado</span>
        </div>
      )}
      {children}
    </div>
  );
}

// Componente Principal
export function CalendarWeekView({
  currentDate,
  appointments,
  professionals,
  selectedProfessionals,
  onAppointmentClick,
  onSlotClick,
  onDropAppointment,
  isLoading
}: CalendarWeekViewProps) {
  const weekDays = getWeekDays(currentDate);
  const hours = generateHours(8, 20);
  const [activeDrag, setActiveDrag] = React.useState<Appointment | null>(null);

  const filteredAppointments = appointments.filter(apt => 
    selectedProfessionals.length === 0 || selectedProfessionals.includes(apt.professionalId)
  );

  const handleDragStart = (event: any) => {
    const { active } = event;
    const appointment = appointments.find(apt => apt.id === active.id);
    if (appointment) {
      setActiveDrag(appointment);
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setActiveDrag(null);

    if (over) {
      const [dateStr, hourStr] = over.id.split('-');
      const newSlot: TimeSlot = {
        date: new Date(dateStr),
        hour: parseInt(hourStr),
        minute: 0,
        isAvailable: true
      };
      onDropAppointment(active.id, newSlot);
    }
  };

  if (isLoading) {
    return <CalendarWeekViewSkeleton />;
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col h-full bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header dos Dias */}
        <div className="flex border-b border-gray-200 flex-shrink-0">
          <div className="w-20 flex-shrink-0 border-r border-gray-200 p-2 bg-gray-50" />
          {weekDays.map((day) => (
            <div
              key={day.toISOString()}
              className={cn(
                'flex-1 p-3 text-center border-r border-gray-200 last:border-r-0',
                isToday(day) ? 'bg-[#86cb92]/10' : 'bg-white'
              )}
            >
              <div className={cn(
                'text-xs font-medium',
                isToday(day) ? 'text-[#3e5653]' : 'text-gray-500'
              )}>
                {format(day, 'EEE', { locale: ptBR })}
              </div>
              <div className={cn(
                'text-lg font-semibold',
                isToday(day) ? 'text-[#3e5653]' : 'text-gray-900'
              )}>
                {format(day, 'dd')}
              </div>
            </div>
          ))}
        </div>

        {/* Grid de Horários */}
        <div className="flex-1 overflow-y-auto">
          {hours.map((hour) => (
            <div key={hour} className="flex min-h-[80px]">
              {/* Coluna de Horário */}
              <div className="w-20 flex-shrink-0 border-r border-b border-gray-200 p-2 bg-gray-50 text-xs text-gray-500 text-center flex items-center justify-center">
                {formatHour(hour)}
              </div>
              
              {/* Colunas dos Dias */}
              {weekDays.map((day) => {
                const slotAppointments = getAppointmentsForSlot(filteredAppointments, day, hour);
                const isBlocked = hour === 12; // Exemplo: almoço bloqueado
                
                return (
                  <DroppableSlot
                    key={`${day.toISOString()}-${hour}`}
                    day={day}
                    hour={hour}
                    appointments={slotAppointments}
                    isBlocked={isBlocked}
                    onSlotClick={onSlotClick}
                    onAppointmentClick={onAppointmentClick}
                  >
                    {slotAppointments.map((appointment) => (
                      <DraggableAppointment
                        key={appointment.id}
                        appointment={appointment}
                        onClick={onAppointmentClick}
                      />
                    ))}
                  </DroppableSlot>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeDrag ? (
          <div className={cn(
            'p-2 rounded-md text-xs shadow-lg cursor-grabbing',
            getStatusBadgeClass(activeDrag.status),
            'opacity-90 scale-105'
          )}>
            <div className="font-semibold truncate">{activeDrag.clientName}</div>
            <div className="truncate opacity-75">{activeDrag.service}</div>
            <div className="flex items-center gap-1 mt-1">
              <Clock className="w-3 h-3" />
              <span>{format(new Date(activeDrag.startTime), 'HH:mm')}</span>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

// Skeleton Loading
function CalendarWeekViewSkeleton() {
  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex border-b border-gray-200">
        <div className="w-20 h-14 bg-gray-100 animate-pulse" />
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex-1 h-14 bg-gray-100 animate-pulse" />
        ))}
      </div>
      {Array.from({ length: 8 }).map((_, hour) => (
        <div key={hour} className="flex h-20">
          <div className="w-20 bg-gray-50 animate-pulse" />
          {Array.from({ length: 7 }).map((_, day) => (
            <div key={day} className="flex-1 bg-gray-50 animate-pulse m-0.5" />
          ))}
        </div>
      ))}
    </div>
  );
}
```

### 6.2 NewAppointmentModal (3 Steps)

**Arquivo:** `app/components/modals/NewAppointmentModal.tsx`

```typescript
'use client';

import React, { useState, useEffect } from 'react';
import { format, startOfToday, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar as CalendarIcon, 
  User, 
  Scissors, 
  Clock, 
  ChevronRight, 
  Check, 
  Search, 
  Plus, 
  Loader2,
  DollarSign,
  ChevronLeft
} from 'lucide-react';
import { AppointmentFormData, NewAppointmentModalProps, Service, Professional, Client } from '@/types/appointments';
import { mockServices, mockProfessionals } from '@/lib/mocks/appointments';
import { cn } from '@/lib/utils';

// Mock de clientes recentes
const recentClients: Client[] = [
  { id: 'cli-001', name: 'Maria Silva', phone: '(11) 99999-9999', email: 'maria@email.com' },
  { id: 'cli-002', name: 'João Pereira', phone: '(11) 98888-8888', email: 'joao@email.com' },
  { id: 'cli-003', name: 'Ana Luiza', phone: '(11) 97777-7777', email: 'ana@email.com' },
  { id: 'cli-004', name: 'Pedro Santos', phone: '(11) 96666-6666', email: 'pedro@email.com' },
];

// Interface extendida para Client
interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

const steps = [
  { id: 1, label: 'Cliente', icon: User },
  { id: 2, label: 'Serviço', icon: Scissors },
  { id: 3, label: 'Horário', icon: Clock }
];

export function NewAppointmentModal({
  isOpen,
  onClose,
  initialDate,
  initialTime,
  onSubmit
}: NewAppointmentModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchResults, setSearchResults] = useState<Client[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  
  const [formData, setFormData] = useState<AppointmentFormData>({
    clientId: '',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    serviceId: '',
    serviceName: '',
    professionalId: '',
    professionalName: '',
    date: initialDate || new Date(),
    time: initialTime || '',
    duration: 60,
    price: 0,
    notes: '',
    sendConfirmation: true,
    addToWaitlist: false
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormData({
        clientId: '',
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        serviceId: '',
        serviceName: '',
        professionalId: '',
        professionalName: '',
        date: initialDate || new Date(),
        time: initialTime || '',
        duration: 60,
        price: 0,
        notes: '',
        sendConfirmation: true,
        addToWaitlist: false
      });
    }
  }, [isOpen, initialDate, initialTime]);

  // Load available slots when date changes
  useEffect(() => {
    if (step === 3 && formData.date) {
      loadAvailableSlots();
    }
  }, [step, formData.date, formData.professionalId, formData.serviceId]);

  const loadAvailableSlots = async () => {
    setLoadingSlots(true);
    // Simular chamada API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock de horários disponíveis
    const slots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
    setAvailableSlots(slots);
    setLoadingSlots(false);
  };

  const searchClients = (query: string) => {
    setFormData({ ...formData, clientName: query });
    
    if (query.length >= 2) {
      const results = recentClients.filter(client => 
        client.name.toLowerCase().includes(query.toLowerCase()) ||
        client.phone.includes(query)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const selectClient = (client: Client) => {
    setFormData({
      ...formData,
      clientId: client.id,
      clientName: client.name,
      clientPhone: client.phone,
      clientEmail: client.email || ''
    });
    setSearchResults([]);
  };

  const selectService = (serviceId: string) => {
    const service = mockServices.find(s => s.id === serviceId);
    if (service) {
      setFormData({
        ...formData,
        serviceId: service.id,
        serviceName: service.name,
        duration: service.duration,
        price: service.price
      });
    }
  };

  const selectProfessional = (professionalId: string) => {
    const professional = mockProfessionals.find(p => p.id === professionalId);
    if (professional) {
      setFormData({
        ...formData,
        professionalId: professional.id,
        professionalName: professional.name
      });
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.clientId && formData.clientName;
      case 2:
        return formData.serviceId && formData.professionalId;
      case 3:
        return formData.time;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
    onClose();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#1f2937] flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-[#3e5653]" />
            Novo Agendamento
          </DialogTitle>
        </DialogHeader>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {steps.map((s, index) => (
            <div key={s.id} className="flex items-center">
              <div
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors',
                  step === s.id
                    ? 'bg-[#3e5653] text-white'
                    : step > s.id
                      ? 'bg-[#86cb92] text-white'
                      : 'bg-gray-100 text-gray-500'
                )}
              >
                <s.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{s.label}</span>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Cliente */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar cliente por nome ou telefone..."
                className="pl-10 border-gray-300 focus:ring-[#86cb92] focus:border-[#86cb92]"
                value={formData.clientName}
                onChange={(e) => searchClients(e.target.value)}
              />
            </div>

            {/* Resultados da Busca */}
            {searchResults.length > 0 && (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {searchResults.map((client) => (
                  <button
                    key={client.id}
                    onClick={() => selectClient(client)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 text-left"
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-[#3e5653] text-white">
                        {client.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{client.name}</p>
                      <p className="text-sm text-gray-500">{client.phone}</p>
                    </div>
                    <Check className="w-4 h-4 text-[#86cb92]" />
                  </button>
                ))}
              </div>
            )}

            {/* Clientes Recentes */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Clientes Recentes</h4>
              <div className="grid grid-cols-3 gap-3">
                {recentClients.map((client) => (
                  <button
                    key={client.id}
                    onClick={() => selectClient(client)}
                    className={cn(
                      'flex flex-col items-center p-3 border rounded-lg transition-colors',
                      formData.clientId === client.id
                        ? 'border-[#86cb92] bg-[#86cb92]/5'
                        : 'border-gray-200 hover:border-[#86cb92] hover:bg-[#86cb92]/5'
                    )}
                  >
                    <Avatar className="w-12 h-12 mb-2">
                      <AvatarFallback className="bg-gray-200 text-gray-600">
                        {client.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-900 truncate w-full text-center">
                      {client.name.split(' ')[0]}
                    </span>
                    <span className="text-xs text-gray-500">{client.phone}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Novo Cliente */}
            <Button
              variant="outline"
              className="w-full border-dashed border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Cadastrar Novo Cliente
            </Button>
          </div>
        )}

        {/* Step 2: Serviço */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Serviço *
                </label>
                <Select
                  value={formData.serviceId}
                  onValueChange={selectService}
                >
                  <SelectTrigger className="border-gray-300 focus:ring-[#86cb92]">
                    <SelectValue placeholder="Selecione um serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockServices.filter(s => s.isActive).map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{service.name}</span>
                          <span className="text-gray-500 ml-4">{formatCurrency(service.price)}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Profissional *
                </label>
                <Select
                  value={formData.professionalId}
                  onValueChange={selectProfessional}
                >
                  <SelectTrigger className="border-gray-300 focus:ring-[#86cb92]">
                    <SelectValue placeholder="Selecione um profissional" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProfessionals.filter(p => p.isActive).map((professional) => (
                      <SelectItem key={professional.id} value={professional.id}>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: professional.color }}
                          />
                          <span>{professional.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Resumo do Serviço */}
            {formData.serviceId && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Duração</p>
                      <p className="font-medium text-gray-900">{formData.duration} min</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Valor</p>
                      <p className="font-medium text-gray-900">{formatCurrency(formData.price)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Serviços Populares */}
            {!formData.serviceId && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Serviços Populares</h4>
                <div className="grid grid-cols-2 gap-3">
                  {mockServices.slice(0, 4).map((service) => (
                    <button
                      key={service.id}
                      onClick={() => selectService(service.id)}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#86cb92] hover:bg-[#86cb92]/5 transition-colors text-left"
                    >
                      <div className="w-10 h-10 bg-[#3e5653]/10 rounded-lg flex items-center justify-center">
                        <Scissors className="w-5 h-5 text-[#3e5653]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{service.name}</p>
                        <p className="text-xs text-gray-500">{service.duration} min</p>
                      </div>
                      <span className="text-sm font-medium text-[#3e5653]">
                        {formatCurrency(service.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Data e Hora */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Mini Calendário */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selecione a Data
                </label>
                <div className="border border-gray-200 rounded-lg p-3">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => date && setFormData({ ...formData, date })}
                    disabled={(date) => isBefore(date, startOfToday())}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Horários Disponíveis */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horários Disponíveis
                </label>
                <div className="border border-gray-200 rounded-lg p-3 h-[280px] overflow-y-auto">
                  {loadingSlots ? (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                    </div>
                  ) : availableSlots.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setFormData({ ...formData, time: slot })}
                          className={cn(
                            'p-2 text-sm rounded-md border transition-all',
                            formData.time === slot
                              ? 'bg-[#3e5653] text-white border-[#3e5653]'
                              : 'border-gray-200 hover:border-[#86cb92] hover:bg-[#86cb92]/5'
                          )}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <CalendarIcon className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Nenhum horário disponível</p>
                      <p className="text-xs text-gray-400">Tente outra data</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Observações */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Observações (opcional)
              </label>
              <Textarea
                placeholder="Notas sobre o agendamento..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="border-gray-300 focus:ring-[#86cb92] focus:border-[#86cb92] resize-none"
                rows={3}
              />
            </div>

            {/* Opções */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.sendConfirmation}
                  onChange={(e) => setFormData({ ...formData, sendConfirmation: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-[#86cb92] focus:ring-[#86cb92]"
                />
                <span className="text-sm text-gray-700">Enviar confirmação por WhatsApp</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.addToWaitlist}
                  onChange={(e) => setFormData({ ...formData, addToWaitlist: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-[#86cb92] focus:ring-[#86cb92]"
                />
                <span className="text-sm text-gray-700">Adicionar à lista de espera se não houver vaga</span>
              </label>
            </div>
          </div>
        )}

        {/* Footer */}
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} className="border-gray-300">
            Cancelar
          </Button>
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="border-gray-300"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Voltar
            </Button>
          )}
          {step < 3 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="bg-[#3e5653] hover:bg-[#1f2937] text-white"
            >
              Continuar
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              className="bg-[#86cb92] hover:bg-[#22c55e] text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Confirmar Agendamento
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### 6.3 AppointmentDetailsDrawer

**Arquivo:** `app/components/drawers/AppointmentDetailsDrawer.tsx`

```typescript
'use client';

import React from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  User,
  Phone,
  Scissors,
  Calendar,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  RefreshCw,
  Trash2,
  MessageCircle,
  Edit3,
  MapPin,
  History
} from 'lucide-react';
import { AppointmentDetailsDrawerProps } from '@/types/appointments';
import { getStatusBadgeClass, getStatusLabel } from '@/lib/utils/statusColors';
import { cn } from '@/lib/utils';

export function AppointmentDetailsDrawer({
  appointment,
  isOpen,
  onClose,
  onConfirm,
  onComplete,
  onCancel,
  onReschedule,
  onDelete
}: AppointmentDetailsDrawerProps) {
  if (!appointment) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getActionButtons = () => {
    switch (appointment.status) {
      case 'pending':
        return (
          <>
            <Button
              onClick={() => onConfirm(appointment.id)}
              className="bg-[#86cb92] hover:bg-[#22c55e] text-white flex-1"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirmar
            </Button>
            <Button
              onClick={() => onCancel(appointment.id)}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50 flex-1"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
          </>
        );
      case 'confirmed':
        return (
          <>
            <Button
              onClick={() => onComplete(appointment.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white flex-1"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Concluir
            </Button>
            <Button
              onClick={() => onCancel(appointment.id)}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50 flex-1"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
          </>
        );
      case 'completed':
      case 'cancelled':
      case 'no-show':
        return (
          <Button
            onClick={() => onReschedule(appointment.id)}
            variant="outline"
            className="border-gray-300 flex-1"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reagendar
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-w-md">
        <DrawerHeader className="border-b border-gray-200">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl font-bold text-[#1f2937]">
              Agendamento #{appointment.id.slice(-3)}
            </DrawerTitle>
            <Badge className={cn(getStatusBadgeClass(appointment.status), 'capitalize')}>
              {getStatusLabel(appointment.status)}
            </Badge>
          </div>
        </DrawerHeader>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="p-6 space-y-6">
            {/* Informações do Cliente */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Cliente
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-[#3e5653]" />
                  <span className="font-medium text-gray-900">{appointment.clientName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{appointment.clientPhone}</span>
                </div>
              </div>
            </div>

            {/* Detalhes do Serviço */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Serviço
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Scissors className="w-5 h-5 text-[#3e5653]" />
                  <span className="font-medium text-gray-900">{appointment.service}</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">Profissional: {appointment.professional}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{appointment.duration} minutos</span>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-[#3e5653]">{formatCurrency(appointment.price)}</span>
                </div>
              </div>
            </div>

            {/* Data e Horário */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Data e Horário
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#3e5653]" />
                  <span className="text-gray-700">
                    {format(parseISO(appointment.startTime), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">
                    {format(parseISO(appointment.startTime), 'HH:mm')} - {format(parseISO(appointment.endTime), 'HH:mm')}
                  </span>
                </div>
              </div>
            </div>

            {/* Observações */}
            {appointment.notes && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Observações
                </h3>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-800">{appointment.notes}</p>
                </div>
              </div>
            )}

            {/* Histórico */}
            {appointment.history && appointment.history.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Histórico
                </h3>
                <div className="space-y-2">
                  {appointment.history.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 text-sm">
                      <History className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-gray-700">{item.details || item.action}</p>
                        <p className="text-xs text-gray-400">
                          {format(parseISO(item.timestamp), 'dd/MM/yyyy HH:mm')}
                          {item.performedBy && ` por ${item.performedBy}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ações Secundárias */}
            <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-gray-300"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-gray-300"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(appointment.id)}
                className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir
              </Button>
            </div>
          </div>
        </ScrollArea>

        {/* Footer com Ações Principais */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-2">
            {getActionButtons()}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
```

---

## 7. Hooks Customizados

### 7.1 useAppointments

**Arquivo:** `app/hooks/useAppointments.ts`

```typescript
'use client';

import { useState, useCallback } from 'react';
import { Appointment, AppointmentFormData, AppointmentStatus } from '@/types/appointments';
import { mockAppointments } from '@/lib/mocks/appointments';
import { format, addMinutes, parseISO } from 'date-fns';

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [isLoading, setIsLoading] = useState(false);

  const createAppointment = useCallback((formData: AppointmentFormData): Appointment => {
    const service = { duration: formData.duration, price: formData.price };
    const startDateTime = new Date(formData.date);
    const [hours, minutes] = formData.time.split(':').map(Number);
    startDateTime.setHours(hours, minutes);
    
    const endDateTime = addMinutes(startDateTime, service.duration);

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      clientName: formData.clientName,
      clientId: formData.clientId,
      clientPhone: formData.clientPhone,
      clientEmail: formData.clientEmail,
      service: formData.serviceName,
      serviceId: formData.serviceId,
      professional: formData.professionalName,
      professionalId: formData.professionalId,
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      status: 'pending',
      color: '#f59e0b',
      notes: formData.notes,
      price: formData.price,
      duration: formData.duration,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setAppointments(prev => [...prev, newAppointment]);
    return newAppointment;
  }, []);

  const updateAppointmentStatus = useCallback((id: string, status: AppointmentStatus) => {
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === id
          ? { ...apt, status, updatedAt: new Date().toISOString() }
          : apt
      )
    );
  }, []);

  const deleteAppointment = useCallback((id: string) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
  }, []);

  const rescheduleAppointment = useCallback((id: string, newStartTime: Date, newEndTime: Date) => {
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === id
          ? { 
              ...apt, 
              startTime: newStartTime.toISOString(), 
              endTime: newEndTime.toISOString(),
              status: 'pending',
              updatedAt: new Date().toISOString()
            }
          : apt
      )
    );
  }, []);

  return {
    appointments,
    isLoading,
    createAppointment,
    updateAppointmentStatus,
    deleteAppointment,
    rescheduleAppointment
  };
}
```

### 7.2 useCalendarNavigation

**Arquivo:** `app/hooks/useCalendarNavigation.ts`

```typescript
'use client';

import { useState, useCallback } from 'react';
import { 
  addWeeks, 
  subWeeks, 
  addMonths, 
  subMonths, 
  startOfWeek, 
  endOfWeek,
  startOfMonth,
  endOfMonth
} from 'date-fns';
import { CalendarView } from '@/types/appointments';

export function useCalendarNavigation(initialDate: Date = new Date()) {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [currentView, setCurrentView] = useState<CalendarView>('week');

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  const goToPrevious = useCallback(() => {
    switch (currentView) {
      case 'day':
        setCurrentDate(prev => new Date(prev.setDate(prev.getDate() - 1)));
        break;
      case 'week':
        setCurrentDate(prev => subWeeks(prev, 1));
        break;
      case 'month':
        setCurrentDate(prev => subMonths(prev, 1));
        break;
    }
  }, [currentView]);

  const goToNext = useCallback(() => {
    switch (currentView) {
      case 'day':
        setCurrentDate(prev => new Date(prev.setDate(prev.getDate() + 1)));
        break;
      case 'week':
        setCurrentDate(prev => addWeeks(prev, 1));
        break;
      case 'month':
        setCurrentDate(prev => addMonths(prev, 1));
        break;
    }
  }, [currentView]);

  const setView = useCallback((view: CalendarView) => {
    setCurrentView(view);
  }, []);

  const setDate = useCallback((date: Date) => {
    setCurrentDate(date);
  }, []);

  return {
    currentDate,
    currentView,
    goToToday,
    goToPrevious,
    goToNext,
    setView,
    setDate
  };
}
```

### 7.3 useProfessionalFilter

**Arquivo:** `app/hooks/useProfessionalFilter.ts`

```typescript
'use client';

import { useState, useCallback } from 'react';
import { Professional } from '@/types/appointments';

export function useProfessionalFilter(professionals: Professional[]) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleProfessional = useCallback((id: string) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(pId => pId !== id)
        : [...prev, id]
    );
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds(professionals.map(p => p.id));
  }, [professionals]);

  const deselectAll = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const isSelected = useCallback((id: string) => {
    return selectedIds.includes(id);
  }, [selectedIds]);

  return {
    selectedIds,
    toggleProfessional,
    selectAll,
    deselectAll,
    isSelected
  };
}
```

---

## 8. Páginas

### 8.1 Página Principal (/agendamentos)

**Arquivo:** `app/(dashboard)/agendamentos/page.tsx`

```typescript
'use client';

import React, { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarWeekView } from '@/components/calendar/CalendarWeekView';
import { MiniCalendar } from '@/components/calendar/MiniCalendar';
import { StatusLegend } from '@/components/calendar/StatusLegend';
import { ProfessionalFilter } from '@/components/filters/ProfessionalFilter';
import { NewAppointmentModal } from '@/components/modals/NewAppointmentModal';
import { AppointmentDetailsDrawer } from '@/components/drawers/AppointmentDetailsDrawer';
import { useAppointments } from '@/hooks/useAppointments';
import { useCalendarNavigation } from '@/hooks/useCalendarNavigation';
import { useProfessionalFilter } from '@/hooks/useProfessionalFilter';
import { mockProfessionals, mockAppointments } from '@/lib/mocks/appointments';
import { Appointment, AppointmentFormData, TimeSlot } from '@/types/appointments';
import { cn } from '@/lib/utils';

export default function AgendamentosPage() {
  const { 
    appointments, 
    createAppointment, 
    updateAppointmentStatus,
    deleteAppointment 
  } = useAppointments();
  
  const { 
    currentDate, 
    currentView, 
    goToToday, 
    goToPrevious, 
    goToNext, 
    setView,
    setDate
  } = useCalendarNavigation();

  const { 
    selectedIds, 
    toggleProfessional 
  } = useProfessionalFilter(mockProfessionals);

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [initialSlot, setInitialSlot] = useState<{ date?: Date; time?: string }>({});

  const handleSlotClick = (slot: TimeSlot) => {
    setInitialSlot({
      date: slot.date,
      time: `${slot.hour.toString().padStart(2, '0')}:${slot.minute.toString().padStart(2, '0')}`
    });
    setIsNewModalOpen(true);
  };

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDrawerOpen(true);
  };

  const handleDropAppointment = (appointmentId: string, newSlot: TimeSlot) => {
    console.log('Reagendando:', appointmentId, 'para', newSlot);
    // Implementar lógica de reagendamento
  };

  const handleSubmitAppointment = (formData: AppointmentFormData) => {
    createAppointment(formData);
    setIsNewModalOpen(false);
  };

  const todayAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.startTime);
    const today = new Date();
    return aptDate.toDateString() === today.toDateString();
  });

  return (
    <div className="min-h-screen bg-[#efefef]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1f2937]">Agendamentos</h1>
            <p className="text-sm text-[#627271]">Gerencie os horários da sua agenda</p>
          </div>
          <Button
            onClick={() => {
              setInitialSlot({});
              setIsNewModalOpen(true);
            }}
            className="bg-[#3e5653] hover:bg-[#1f2937] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Novo Agendamento
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Navegação de Data */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={goToToday}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Hoje
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                className="text-gray-600 hover:bg-gray-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h2 className="text-lg font-semibold text-[#1f2937] min-w-[200px] text-center capitalize">
                {format(currentDate, "MMMM 'de' yyyy", { locale: ptBR })}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                className="text-gray-600 hover:bg-gray-100"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Controles de Visualização */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              {(['day', 'week', 'month'] as const).map((view) => (
                <button
                  key={view}
                  onClick={() => setView(view)}
                  className={cn(
                    'px-3 py-1.5 text-sm font-medium rounded-md transition-all',
                    currentView === view
                      ? 'bg-white text-[#1f2937] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  )}
                >
                  {view === 'day' && 'Dia'}
                  {view === 'week' && 'Semana'}
                  {view === 'month' && 'Mês'}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="border-gray-300">
                <Search className="w-4 h-4 text-gray-600" />
              </Button>
              <Button variant="outline" size="icon" className="border-gray-300">
                <Filter className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>

        {/* Legenda de Status */}
        <StatusLegend />
      </div>

      {/* Conteúdo Principal */}
      <div className="flex h-[calc(100vh-220px)]">
        {/* Área do Calendário */}
        <div className="flex-1 p-6 overflow-hidden">
          <CalendarWeekView
            currentDate={currentDate}
            appointments={appointments}
            professionals={mockProfessionals}
            selectedProfessionals={selectedIds}
            onAppointmentClick={handleAppointmentClick}
            onSlotClick={handleSlotClick}
            onDropAppointment={handleDropAppointment}
          />
        </div>

        {/* Sidebar Direita */}
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          {/* Mini Calendário */}
          <div className="p-4 border-b border-gray-200">
            <MiniCalendar
              currentDate={currentDate}
              onDateSelect={setDate}
              appointments={appointments}
            />
          </div>

          {/* Filtro de Profissionais */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-[#1f2937] mb-3">Profissionais</h3>
            <ProfessionalFilter
              professionals={mockProfessionals}
              selectedIds={selectedIds}
              onToggle={toggleProfessional}
            />
          </div>

          {/* Próximos Agendamentos */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-[#1f2937]">Hoje</h3>
              <Button variant="ghost" size="sm" className="text-xs text-[#3e5653]">
                Ver Todos
              </Button>
            </div>
            <div className="space-y-2">
              {todayAppointments.slice(0, 5).map((appointment) => (
                <div
                  key={appointment.id}
                  onClick={() => handleAppointmentClick(appointment)}
                  className={cn(
                    'p-3 rounded-lg border-l-4 cursor-pointer hover:shadow-sm transition-shadow',
                    'bg-white border border-gray-200',
                    appointment.status === 'confirmed' && 'border-l-green-500',
                    appointment.status === 'pending' && 'border-l-amber-500',
                    appointment.status === 'completed' && 'border-l-blue-500',
                    appointment.status === 'cancelled' && 'border-l-red-500'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">
                      {format(new Date(appointment.startTime), 'HH:mm')}
                    </span>
                    <span className={cn(
                      'text-xs px-2 py-0.5 rounded-full',
                      appointment.status === 'confirmed' && 'bg-green-100 text-green-700',
                      appointment.status === 'pending' && 'bg-amber-100 text-amber-700',
                      appointment.status === 'completed' && 'bg-blue-100 text-blue-700',
                      appointment.status === 'cancelled' && 'bg-red-100 text-red-700'
                    )}>
                      {appointment.status === 'confirmed' && 'Confirmado'}
                      {appointment.status === 'pending' && 'Pendente'}
                      {appointment.status === 'completed' && 'Concluído'}
                      {appointment.status === 'cancelled' && 'Cancelado'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{appointment.clientName}</p>
                  <p className="text-xs text-gray-500">{appointment.service}</p>
                </div>
              ))}
              {todayAppointments.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">
                  Nenhum agendamento hoje
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modais */}
      <NewAppointmentModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        initialDate={initialSlot.date}
        initialTime={initialSlot.time}
        onSubmit={handleSubmitAppointment}
      />

      <AppointmentDetailsDrawer
        appointment={selectedAppointment}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedAppointment(null);
        }}
        onConfirm={(id) => {
          updateAppointmentStatus(id, 'confirmed');
          setIsDrawerOpen(false);
        }}
        onComplete={(id) => {
          updateAppointmentStatus(id, 'completed');
          setIsDrawerOpen(false);
        }}
        onCancel={(id) => {
          updateAppointmentStatus(id, 'cancelled');
          setIsDrawerOpen(false);
        }}
        onReschedule={(id) => {
          console.log('Reagendar:', id);
        }}
        onDelete={(id) => {
          deleteAppointment(id);
          setIsDrawerOpen(false);
        }}
      />
    </div>
  );
}
```

---

## 9. Checklist de Implementação

### 9.1 Componentes Core

- [ ] `CalendarWeekView` - Visualização semanal com drag-and-drop @dnd-kit
- [ ] `CalendarDayView` - Visualização diária detalhada
- [ ] `CalendarMonthView` - Visualização mensal
- [ ] `MiniCalendar` - Calendário compacto para sidebar
- [ ] `NewAppointmentModal` - Modal de novo agendamento (3 passos)
- [ ] `AppointmentDetailsDrawer` - Drawer lateral com detalhes e ações
- [ ] `TimeSlotGrid` - Grid de horários disponíveis
- [ ] `AppointmentCard` - Card de agendamento com status colorido
- [ ] `ProfessionalFilter` - Filtro de profissionais com avatares
- [ ] `StatusLegend` - Legenda de cores por status
- [ ] `ServiceModal` - Modal de configuração de serviços
- [ ] `ProfessionalCard` - Card de profissional
- [ ] `WaitlistItem` - Item da lista de espera
- [ ] `PublicBookingForm` - Formulário de agendamento público
- [ ] `AppointmentTimeline` - Timeline de histórico

### 9.2 Hooks

- [ ] `useAppointments` - CRUD de agendamentos
- [ ] `useCalendarNavigation` - Navegação do calendário
- [ ] `useDragAndDrop` - Lógica de drag & drop
- [ ] `useProfessionalFilter` - Filtro de profissionais
- [ ] `useAvailableSlots` - Verificação de horários disponíveis
- [ ] `useServices` - Gestão de serviços
- [ ] `useWaitlist` - Lista de espera

### 9.3 Páginas

- [ ] `/agendamentos` - Página principal do calendário
- [ ] `/agendamentos/configuracoes` - Configurações da agenda
- [ ] `/agendamentos/lista-espera` - Lista de espera
- [ ] `/agendar/[businessSlug]` - Página pública de agendamento

### 9.4 Estados

- [ ] Loading states para todas as visualizações
- [ ] Empty states quando não há agendamentos
- [ ] Error states com retry
- [ ] Skeleton screens para carregamento

### 9.5 Funcionalidades

- [ ] Criar/editar/cancelar agendamentos
- [ ] Drag-and-drop para reagendamento (@dnd-kit)
- [ ] Filtro por profissionais
- [ ] Busca de clientes em tempo real
- [ ] Seleção de horários disponíveis
- [ ] Bloqueio de horários (visual)
- [ ] Lista de espera com prioridade

---

## 10. Notas de Implementação

### 10.1 Prioridade de Desenvolvimento

1. **Alta (Sprint 10.1):**
   - Calendário semanal com drag & drop
   - Modal novo agendamento (3 passos)
   - Drawer de detalhes
   - Mock data completo

2. **Média (Sprint 10.2):**
   - Visualizações dia/mês
   - Configurações da agenda
   - Lista de espera

3. **Baixa (Sprint 10.3):**
   - Página pública de agendamento
   - Integrações visuais

### 10.2 Considerações Técnicas

- Usar `date-fns` para todas as operações de data
- Implementar drag & drop apenas na visualização semanal inicialmente
- Mock data deve ser suficiente para demonstração completa
- Manter consistência com design system existente
- Usar variáveis CSS do tema UNIQ

### 10.3 Integrações Futuras (Backend)

- Supabase para persistência
- WhatsApp API para notificações
- Google Calendar sync
- Módulo MEL (Lembretes)
- Módulo CRM (Clientes)

---

**Fim do SPEC**

*Documento criado em: 21/03/2026*  
*Baseado em: tracking/plans/PRD-Sprint10-Agendamentos.md*  
*Referência UI: docs/ui/modulo-08-agendamentos.md*

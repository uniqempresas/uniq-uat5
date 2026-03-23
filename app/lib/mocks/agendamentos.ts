import { Appointment, Professional, Service, WaitlistItem, ScheduleConfig, Holiday } from '@/app/types/agendamentos';

export const mockAppointments: Appointment[] = [
  {
    id: 'apt-001',
    clientName: 'Maria Silva',
    clientId: 'cli-001',
    clientPhone: '(11) 99999-9999',
    clientEmail: 'maria@email.com',
    service: 'Corte Feminino',
    serviceId: 'srv-001',
    professional: 'Ana Silva',
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
    professional: 'Carlos Souza',
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
    professional: 'Ana Silva',
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
    professional: 'Carlos Souza',
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
    professional: 'Fernanda Lima',
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
    professional: 'Ana Silva',
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
    professional: 'Juliana Costa',
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
    professional: 'Ricardo Mendes',
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
    professional: 'Fernanda Lima',
    professionalId: 'prof-003',
    startTime: '2026-03-27T11:00:00',
    endTime: '2026-03-27T12:00:00',
    status: 'no_show',
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
    professional: 'Carlos Souza',
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

export const recentClients = [
  { id: 'cli-001', name: 'Maria Silva', phone: '(11) 99999-9999', email: 'maria@email.com' },
  { id: 'cli-002', name: 'João Pereira', phone: '(11) 98888-8888', email: 'joao@email.com' },
  { id: 'cli-003', name: 'Ana Luiza', phone: '(11) 97777-7777', email: 'ana@email.com' },
  { id: 'cli-004', name: 'Pedro Santos', phone: '(11) 96666-6666', email: 'pedro@email.com' },
];

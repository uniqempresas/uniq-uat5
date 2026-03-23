// ============================================
// TIPOS DE STATUS
// ============================================

export type AppointmentStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'completed' 
  | 'cancelled' 
  | 'no_show'
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

export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

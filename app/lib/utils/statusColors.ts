import { AppointmentStatus, WaitlistStatus } from '@/app/types/agendamentos';

export const statusColors: Record<AppointmentStatus, { bg: string; text: string; border: string; label: string; dot: string }> = {
  pending: {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    border: 'border-amber-400',
    label: 'Pendente',
    dot: 'bg-amber-400'
  },
  confirmed: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-400',
    label: 'Confirmado',
    dot: 'bg-green-500'
  },
  completed: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-400',
    label: 'Concluído',
    dot: 'bg-blue-500'
  },
  cancelled: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-400',
    label: 'Cancelado',
    dot: 'bg-red-500'
  },
  no_show: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-400',
    label: 'Não Compareceu',
    dot: 'bg-gray-400'
  },
  blocked: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    border: 'border-red-400',
    label: 'Bloqueado',
    dot: 'bg-red-600'
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

export const getStatusDotColor = (status: AppointmentStatus): string => {
  return statusColors[status].dot;
};

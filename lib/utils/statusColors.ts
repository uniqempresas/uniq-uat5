import { AppointmentStatus, WaitlistStatus } from '@/types/agendamentos';

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

// Mapeamento para cores Tailwind do appointment
export const getAppointmentColorClasses = (color: string): { bg: string; text: string; border: string } => {
  // Mapeamento de cores hex para classes Tailwind
  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    '#86cb92': { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-400' },
    '#3b82f6': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-400' },
    '#f59e0b': { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-400' },
    '#ec4899': { bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-400' },
    '#8b5cf6': { bg: 'bg-violet-100', text: 'text-violet-800', border: 'border-violet-400' },
    '#ef4444': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-400' },
    '#6b7280': { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-400' },
  };

  return colorMap[color] || { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-400' };
};

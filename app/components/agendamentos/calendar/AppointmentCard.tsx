'use client';

import { Appointment } from '@/app/types/agendamentos';
import { getStatusBadgeClass } from '@/app/lib/utils/statusColors';
import { Clock, User } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface AppointmentCardProps {
  appointment: Appointment;
  onClick: (appointment: Appointment) => void;
  isDragging?: boolean;
  style?: React.CSSProperties;
}

export function AppointmentCard({ appointment, onClick, isDragging, style }: AppointmentCardProps) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick(appointment);
      }}
      style={style}
      className={cn(
        'p-2 rounded-md text-xs cursor-pointer shadow-sm hover:shadow-md transition-all border',
        getStatusBadgeClass(appointment.status),
        isDragging && 'opacity-50 rotate-2 scale-105 z-50'
      )}
    >
      <div className="font-semibold truncate flex items-center gap-1">
        <User className="w-3 h-3" />
        {appointment.clientName}
      </div>
      <div className="truncate opacity-75">{appointment.service}</div>
      <div className="flex items-center gap-1 mt-1">
        <Clock className="w-3 h-3" />
        <span>{format(new Date(appointment.startTime), 'HH:mm')}</span>
      </div>
    </div>
  );
}

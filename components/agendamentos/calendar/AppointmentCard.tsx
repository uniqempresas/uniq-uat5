'use client';

import React from 'react';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';
import { Appointment } from '@/types/agendamentos';
import { getStatusBadgeClass } from '@/lib/utils/statusColors';
import { cn } from '@/lib/utils';

interface AppointmentCardProps {
  appointment: Appointment;
  onClick: (appointment: Appointment) => void;
  isDragging?: boolean;
  style?: React.CSSProperties;
}

export function AppointmentCard({ appointment, onClick, isDragging, style }: AppointmentCardProps) {
  const startTime = new Date(appointment.startTime);
  
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick(appointment);
      }}
      style={style}
      className={cn(
        'mb-1 p-2 rounded-md text-xs cursor-pointer shadow-sm hover:shadow-md transition-all border-l-4',
        getStatusBadgeClass(appointment.status),
        isDragging && 'opacity-50 rotate-2 scale-105 z-50 shadow-lg',
        'truncate'
      )}
    >
      <div className="font-semibold truncate">{appointment.clientName}</div>
      <div className="truncate opacity-75">{appointment.service}</div>
      <div className="flex items-center gap-1 mt-1">
        <Clock className="w-3 h-3" />
        <span>{format(startTime, 'HH:mm')}</span>
      </div>
    </div>
  );
}

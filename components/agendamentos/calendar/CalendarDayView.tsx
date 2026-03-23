'use client';

import React from 'react';
import { format, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Clock } from 'lucide-react';
import { Appointment, TimeSlot, CalendarDayViewProps } from '@/types/agendamentos';
import { getStatusBadgeClass } from '@/lib/utils/statusColors';
import { cn } from '@/lib/utils';

const generateHours = (start: number, end: number): number[] => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const formatHour = (hour: number): string => {
  return `${hour.toString().padStart(2, '0')}:00`;
};

const getAppointmentsForHour = (appointments: Appointment[], hour: number): Appointment[] => {
  return appointments.filter(apt => {
    const aptDate = new Date(apt.startTime);
    return aptDate.getHours() === hour;
  });
};

export function CalendarDayView({
  currentDate,
  appointments,
  selectedProfessionals,
  onAppointmentClick,
  onSlotClick
}: CalendarDayViewProps) {
  const hours = generateHours(8, 20);
  
  const filteredAppointments = appointments.filter(apt => {
    const isSameDate = isSameDay(new Date(apt.startTime), currentDate);
    const isProfessionalSelected = selectedProfessionals.length === 0 || 
      selectedProfessionals.includes(apt.professionalId);
    return isSameDate && isProfessionalSelected;
  });

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {format(currentDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
          </h2>
          <p className="text-sm text-gray-500">
            {filteredAppointments.length} agendamento{filteredAppointments.length !== 1 && 's'}
          </p>
        </div>
      </div>

      {/* Grid de Horários */}
      <div className="flex-1 overflow-y-auto">
        {hours.map((hour) => {
          const slotAppointments = getAppointmentsForHour(filteredAppointments, hour);
          const isBlocked = hour === 12; // Almoço

          return (
            <div
              key={hour}
              className="flex min-h-[100px] border-b border-gray-200 last:border-b-0"
            >
              {/* Coluna de Horário */}
              <div className="w-24 flex-shrink-0 p-3 bg-gray-50 text-sm text-gray-500 text-center border-r border-gray-200">
                {formatHour(hour)}
              </div>
              
              {/* Coluna de Agendamentos */}
              <div
                onClick={() => !isBlocked && onSlotClick({ date: currentDate, hour, minute: 0, isAvailable: true })}
                className={cn(
                  'flex-1 p-3 relative',
                  isBlocked 
                    ? 'bg-red-50 cursor-not-allowed' 
                    : 'hover:bg-gray-50 cursor-pointer'
                )}
              >
                {isBlocked ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm text-red-500 font-medium">Bloqueado - Almoço</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {slotAppointments.map((appointment) => {
                      const startTime = new Date(appointment.startTime);
                      return (
                        <div
                          key={appointment.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onAppointmentClick(appointment);
                          }}
                          className={cn(
                            'p-3 rounded-lg border-l-4 shadow-sm hover:shadow-md transition-all cursor-pointer',
                            getStatusBadgeClass(appointment.status)
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{appointment.clientName}</span>
                            <div className="flex items-center gap-1 text-xs opacity-75">
                              <Clock className="w-3 h-3" />
                              {format(startTime, 'HH:mm')}
                            </div>
                          </div>
                          <div className="text-sm opacity-75 mt-1">{appointment.service}</div>
                          <div className="flex items-center gap-2 mt-2 text-xs opacity-60">
                            <span>{appointment.professional}</span>
                            <span>•</span>
                            <span>{appointment.duration} min</span>
                          </div>
                        </div>
                      );
                    })}
                    
                    {slotAppointments.length === 0 && !isBlocked && (
                      <div className="h-full flex items-center justify-center text-sm text-gray-400">
                        Clique para agendar
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

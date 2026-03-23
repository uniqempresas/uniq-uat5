'use client';

import React from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Clock } from 'lucide-react';
import { Appointment, CalendarMonthViewProps } from '@/types/agendamentos';
import { getStatusBadgeClass } from '@/lib/utils/statusColors';
import { cn } from '@/lib/utils';

export function CalendarMonthView({
  currentDate,
  appointments,
  selectedProfessionals,
  onDateSelect,
  onAppointmentClick
}: CalendarMonthViewProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days: Date[] = [];
  let day = calendarStart;
  while (day <= calendarEnd) {
    days.push(day);
    day = addDays(day, 1);
  }

  const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  const getAppointmentsForDay = (date: Date): Appointment[] => {
    return appointments.filter(apt => {
      const isSame = isSameDay(new Date(apt.startTime), date);
      const isProfessionalSelected = selectedProfessionals.length === 0 || 
        selectedProfessionals.includes(apt.professionalId);
      return isSame && isProfessionalSelected;
    });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header dos Dias da Semana */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {weekDays.map((weekDay) => (
          <div
            key={weekDay}
            className="p-3 text-center text-sm font-semibold text-gray-600 bg-gray-50"
          >
            {weekDay}
          </div>
        ))}
      </div>

      {/* Grid do Mês */}
      <div className="flex-1 grid grid-cols-7 auto-rows-fr overflow-y-auto">
        {days.map((date, index) => {
          const isCurrentMonth = isSameMonth(date, currentDate);
          const isTodayDate = isToday(date);
          const dayAppointments = getAppointmentsForDay(date);

          return (
            <div
              key={index}
              onClick={() => onDateSelect(date)}
              className={cn(
                'border-r border-b border-gray-200 p-2 min-h-[100px] cursor-pointer transition-colors',
                !isCurrentMonth && 'bg-gray-50/50',
                isCurrentMonth && 'hover:bg-gray-50',
                isTodayDate && 'bg-[#86cb92]/5'
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={cn(
                    'text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full',
                    isTodayDate
                      ? 'bg-[#3e5653] text-white'
                      : isCurrentMonth
                        ? 'text-gray-900'
                        : 'text-gray-400'
                  )}
                >
                  {format(date, 'd')}
                </span>
                {dayAppointments.length > 0 && (
                  <span className="text-xs text-gray-500">
                    {dayAppointments.length} agend.
                  </span>
                )}
              </div>

              <div className="space-y-1">
                {dayAppointments.slice(0, 3).map((appointment) => {
                  const startTime = new Date(appointment.startTime);
                  return (
                    <div
                      key={appointment.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAppointmentClick(appointment);
                      }}
                      className={cn(
                        'px-2 py-1 rounded text-xs cursor-pointer border-l-2 truncate',
                        getStatusBadgeClass(appointment.status)
                      )}
                    >
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span className="font-medium">{format(startTime, 'HH:mm')}</span>
                      </div>
                      <div className="truncate text-[10px] opacity-75">
                        {appointment.clientName}
                      </div>
                    </div>
                  );
                })}
                {dayAppointments.length > 3 && (
                  <div className="text-xs text-gray-500 text-center py-1">
                    +{dayAppointments.length - 3} mais
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

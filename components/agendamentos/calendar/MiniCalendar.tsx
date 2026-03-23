'use client';

import React from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Appointment } from '@/types/agendamentos';

interface MiniCalendarProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
  appointments?: Appointment[];
}

export function MiniCalendar({ currentDate, onDateSelect, appointments = [] }: MiniCalendarProps) {
  const [viewDate, setViewDate] = React.useState(currentDate);

  const monthStart = startOfMonth(viewDate);
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

  const hasAppointments = (date: Date) => {
    return appointments.some(apt => isSameDay(new Date(apt.startTime), date));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setViewDate(prev => addDays(prev, -30))}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <span className="text-sm font-semibold text-gray-900">
          {format(viewDate, 'MMMM yyyy', { locale: ptBR })}
        </span>
        <button
          onClick={() => setViewDate(prev => addDays(prev, 30))}
          className="p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((weekDay) => (
          <div
            key={weekDay}
            className="text-center text-xs font-medium text-gray-500 py-1"
          >
            {weekDay}
          </div>
        ))}
        {days.map((date, index) => {
          const isCurrentMonth = isSameMonth(date, viewDate);
          const isSelected = isSameDay(date, currentDate);
          const isTodayDate = isToday(date);
          const hasEvents = hasAppointments(date);

          return (
            <button
              key={index}
              onClick={() => onDateSelect(date)}
              className={cn(
                'relative h-8 text-sm rounded-md transition-all',
                !isCurrentMonth && 'text-gray-300',
                isCurrentMonth && 'text-gray-700 hover:bg-gray-100',
                isSelected && 'bg-[#3e5653] text-white hover:bg-[#2d413f]',
                isTodayDate && !isSelected && 'text-[#86cb92] font-bold'
              )}
            >
              {format(date, 'd')}
              {hasEvents && !isSelected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#86cb92]"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

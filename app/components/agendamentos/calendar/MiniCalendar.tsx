'use client';

import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, startOfWeek, endOfWeek, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Appointment } from '@/app/types/agendamentos';

interface MiniCalendarProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
  appointments: Appointment[];
}

export function MiniCalendar({ currentDate, onDateSelect, appointments }: MiniCalendarProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  const getAppointmentsForDay = (day: Date) => {
    return appointments.filter(apt => {
      const aptDate = new Date(apt.startTime);
      return isSameDay(aptDate, day);
    });
  };

  const goToPreviousMonth = () => {
    onDateSelect(subMonths(currentDate, 1));
  };

  const goToNextMonth = () => {
    onDateSelect(addMonths(currentDate, 1));
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPreviousMonth}
          className="h-7 w-7"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-semibold text-gray-900">
          {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={goToNextMonth}
          className="h-7 w-7"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 py-1"
          >
            {day}
          </div>
        ))}
        
        {days.map((day) => {
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isToday = isSameDay(day, new Date());
          const isSelected = isSameDay(day, currentDate);
          const dayAppointments = getAppointmentsForDay(day);
          
          return (
            <button
              key={day.toISOString()}
              onClick={() => onDateSelect(day)}
              className={cn(
                'h-8 w-8 rounded-full text-xs flex items-center justify-center relative transition-colors',
                !isCurrentMonth && 'text-gray-300',
                isCurrentMonth && !isSelected && !isToday && 'text-gray-700 hover:bg-gray-100',
                isToday && !isSelected && 'text-[#3e5653] font-semibold bg-[#86cb92]/20',
                isSelected && 'bg-[#3e5653] text-white'
              )}
            >
              {format(day, 'd')}
              {dayAppointments.length > 0 && (
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#86cb92]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

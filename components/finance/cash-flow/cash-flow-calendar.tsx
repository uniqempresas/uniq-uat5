'use client';

import { useState, useMemo } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addMonths,
  subMonths
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CashFlowData } from '@/lib/types/finance';
import { formatCurrency } from '@/lib/utils/currency';

interface CashFlowCalendarProps {
  data: CashFlowData[];
  onDayClick?: (date: Date) => void;
}

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export function CashFlowCalendar({ data, onDayClick }: CashFlowCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const dataByDate = useMemo(() => {
    return data.reduce((acc, item) => {
      acc[item.date] = item;
      return acc;
    }, {} as Record<string, CashFlowData>);
  }, [data]);

  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div className="bg-white rounded-xl border border-uniq-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-uniq-text capitalize">
          {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
        </h3>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium text-uniq-muted"
          >
            {day}
          </div>
        ))}

        {calendarDays.map((day) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const dayData = dataByDate[dateStr];
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isTodayDate = isToday(day);

          return (
            <div
              key={dateStr}
              onClick={() => onDayClick?.(day)}
              className={`
                min-h-24 p-2 border border-uniq-border/50 cursor-pointer
                hover:bg-uniq-platinum/50 transition-colors
                ${isCurrentMonth ? 'bg-white' : 'bg-uniq-platinum/30'}
                ${isTodayDate ? 'ring-2 ring-uniq-accent' : ''}
              `}
            >
              <div className="text-sm font-medium text-uniq-text mb-1">
                {format(day, 'd')}
              </div>
              
              {dayData && (
                <div className="space-y-1">
                  {dayData.income > 0 && (
                    <div className="text-xs text-uniq-accent font-medium truncate">
                      +{formatCurrency(dayData.income)}
                    </div>
                  )}
                  {dayData.expense > 0 && (
                    <div className="text-xs text-red-500 font-medium truncate">
                      -{formatCurrency(dayData.expense)}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-uniq-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-uniq-accent rounded-full" />
          <span className="text-sm text-uniq-muted">Entrada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="text-sm text-uniq-muted">Saída</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-uniq-accent rounded-full" />
          <span className="text-sm text-uniq-muted">Hoje</span>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useCallback } from 'react';
import { 
  addDays, 
  subDays, 
  addWeeks, 
  subWeeks, 
  addMonths, 
  subMonths,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth
} from 'date-fns';
import { CalendarView } from '@/app/types/agendamentos';

export function useCalendarNavigation(initialDate = new Date()) {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [currentView, setCurrentView] = useState<CalendarView>('week');

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  const goToPrevious = useCallback(() => {
    switch (currentView) {
      case 'day':
        setCurrentDate(prev => subDays(prev, 1));
        break;
      case 'week':
        setCurrentDate(prev => subWeeks(prev, 1));
        break;
      case 'month':
        setCurrentDate(prev => subMonths(prev, 1));
        break;
    }
  }, [currentView]);

  const goToNext = useCallback(() => {
    switch (currentView) {
      case 'day':
        setCurrentDate(prev => addDays(prev, 1));
        break;
      case 'week':
        setCurrentDate(prev => addWeeks(prev, 1));
        break;
      case 'month':
        setCurrentDate(prev => addMonths(prev, 1));
        break;
    }
  }, [currentView]);

  const goToDate = useCallback((date: Date) => {
    setCurrentDate(date);
  }, []);

  const setView = useCallback((view: CalendarView) => {
    setCurrentView(view);
  }, []);

  const getViewRange = useCallback(() => {
    switch (currentView) {
      case 'day':
        return { start: currentDate, end: currentDate };
      case 'week':
        return { 
          start: startOfWeek(currentDate, { weekStartsOn: 1 }), 
          end: endOfWeek(currentDate, { weekStartsOn: 1 }) 
        };
      case 'month':
        return { 
          start: startOfMonth(currentDate), 
          end: endOfMonth(currentDate) 
        };
      default:
        return { start: currentDate, end: currentDate };
    }
  }, [currentDate, currentView]);

  return {
    currentDate,
    currentView,
    goToToday,
    goToPrevious,
    goToNext,
    goToDate,
    setView,
    getViewRange
  };
}

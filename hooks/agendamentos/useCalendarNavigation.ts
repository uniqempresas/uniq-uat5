'use client';

import { useState, useCallback } from 'react';
import { addWeeks, subWeeks, addDays, subDays, addMonths, subMonths, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { CalendarView } from '@/types/agendamentos';

export function useCalendarNavigation(initialDate: Date = new Date()) {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [currentView, setCurrentView] = useState<CalendarView>('week');

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  const navigatePrevious = useCallback(() => {
    setCurrentDate(prev => {
      switch (currentView) {
        case 'day':
          return subDays(prev, 1);
        case 'week':
          return subWeeks(prev, 1);
        case 'month':
          return subMonths(prev, 1);
        default:
          return prev;
      }
    });
  }, [currentView]);

  const navigateNext = useCallback(() => {
    setCurrentDate(prev => {
      switch (currentView) {
        case 'day':
          return addDays(prev, 1);
        case 'week':
          return addWeeks(prev, 1);
        case 'month':
          return addMonths(prev, 1);
        default:
          return prev;
      }
    });
  }, [currentView]);

  const setDate = useCallback((date: Date) => {
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
          end: endOfWeek(currentDate, { weekStartsOn: 1 }),
        };
      case 'month':
        return {
          start: startOfMonth(currentDate),
          end: endOfMonth(currentDate),
        };
      default:
        return { start: currentDate, end: currentDate };
    }
  }, [currentDate, currentView]);

  return {
    currentDate,
    currentView,
    goToToday,
    navigatePrevious,
    navigateNext,
    setDate,
    setView,
    getViewRange,
  };
}

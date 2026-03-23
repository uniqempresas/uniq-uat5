'use client';

import { useState, useEffect, useCallback } from 'react';
import { TimeSlot } from '@/types/agendamentos';

export function useAvailableSlots(professionalId: string, date: Date, duration: number) {
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadAvailableSlots = useCallback(async () => {
    setIsLoading(true);
    
    // Simular chamada API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock de horários disponíveis (8h às 20h)
    const slots: TimeSlot[] = [
      { date, hour: 8, minute: 0, isAvailable: true },
      { date, hour: 9, minute: 0, isAvailable: true },
      { date, hour: 10, minute: 0, isAvailable: true },
      { date, hour: 11, minute: 0, isAvailable: true },
      { date, hour: 14, minute: 0, isAvailable: true },
      { date, hour: 15, minute: 0, isAvailable: true },
      { date, hour: 16, minute: 0, isAvailable: true },
      { date, hour: 17, minute: 0, isAvailable: true },
      { date, hour: 18, minute: 0, isAvailable: true },
      { date, hour: 19, minute: 0, isAvailable: true },
    ];
    
    setAvailableSlots(slots);
    setIsLoading(false);
  }, [professionalId, date, duration]);

  useEffect(() => {
    if (professionalId && date) {
      loadAvailableSlots();
    }
  }, [professionalId, date, duration, loadAvailableSlots]);

  return {
    availableSlots,
    isLoading,
    refreshSlots: loadAvailableSlots,
  };
}

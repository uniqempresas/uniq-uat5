'use client';

import { useState, useCallback } from 'react';
import { TimeSlot } from '@/types/agendamentos';

export function useDragAndDrop(onDropAppointment: (appointmentId: string, newSlot: TimeSlot) => void) {
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const handleDragStart = useCallback((event: { active: { id: string } }) => {
    setActiveDragId(event.active.id);
  }, []);

  const handleDragEnd = useCallback((event: { active: { id: string }; over: { id: string } | null }) => {
    const { active, over } = event;
    setActiveDragId(null);

    if (over) {
      const [dateStr, hourStr] = over.id.split('|');
      const newSlot: TimeSlot = {
        date: new Date(dateStr),
        hour: parseInt(hourStr, 10),
        minute: 0,
        isAvailable: true,
      };
      onDropAppointment(active.id, newSlot);
    }
  }, [onDropAppointment]);

  return {
    activeDragId,
    handleDragStart,
    handleDragEnd,
  };
}

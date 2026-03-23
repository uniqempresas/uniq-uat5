'use client';

import { useState, useEffect, useCallback } from 'react';
import { format, isSameDay, parseISO } from 'date-fns';
import { Appointment, TimeSlot } from '@/app/types/agendamentos';

export function useAvailableSlots(
  appointments: Appointment[],
  professionalId?: string,
  serviceDuration: number = 30
) {
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateSlots = useCallback((date: Date, startHour = 8, endHour = 20): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const slotDate = new Date(date);
        slotDate.setHours(hour, minute, 0, 0);
        
        slots.push({
          date: slotDate,
          hour,
          minute,
          isAvailable: true
        });
      }
    }
    
    return slots;
  }, []);

  const checkAvailability = useCallback((date: Date) => {
    setIsLoading(true);
    
    // Generate all possible slots
    const allSlots = generateSlots(date);
    
    // Filter out booked slots
    const dayAppointments = appointments.filter(apt => {
      const aptDate = parseISO(apt.startTime);
      const sameDay = isSameDay(aptDate, date);
      const sameProfessional = !professionalId || apt.professionalId === professionalId;
      return sameDay && sameProfessional && apt.status !== 'cancelled';
    });
    
    const availableSlotsResult = allSlots.map(slot => {
      const slotTime = format(slot.date, 'HH:mm');
      const isBooked = dayAppointments.some(apt => {
        const aptStart = format(parseISO(apt.startTime), 'HH:mm');
        return aptStart === slotTime;
      });
      
      return {
        ...slot,
        isAvailable: !isBooked
      };
    });
    
    setAvailableSlots(availableSlotsResult);
    setIsLoading(false);
    
    return availableSlotsResult;
  }, [appointments, professionalId, generateSlots]);

  const getAvailableTimes = useCallback((date: Date): string[] => {
    const slots = generateSlots(date);
    const dayAppointments = appointments.filter(apt => {
      const aptDate = parseISO(apt.startTime);
      return isSameDay(aptDate, date) && apt.status !== 'cancelled';
    });
    
    return slots
      .filter(slot => {
        const slotTime = format(slot.date, 'HH:mm');
        return !dayAppointments.some(apt => {
          const aptStart = format(parseISO(apt.startTime), 'HH:mm');
          return aptStart === slotTime;
        });
      })
      .map(slot => format(slot.date, 'HH:mm'));
  }, [appointments, generateSlots]);

  return {
    availableSlots,
    isLoading,
    checkAvailability,
    getAvailableTimes
  };
}

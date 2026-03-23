'use client';

import { useState, useCallback } from 'react';
import { Appointment, AppointmentFormData } from '@/app/types/agendamentos';
import { mockAppointments } from '@/app/lib/mocks/agendamentos';

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [isLoading, setIsLoading] = useState(false);

  const createAppointment = useCallback((data: AppointmentFormData) => {
    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      clientName: data.clientName,
      clientId: data.clientId,
      clientPhone: data.clientPhone,
      clientEmail: data.clientEmail,
      service: data.serviceName,
      serviceId: data.serviceId,
      professional: data.professionalName,
      professionalId: data.professionalId,
      startTime: new Date(data.date).toISOString().split('T')[0] + 'T' + data.time + ':00',
      endTime: new Date(data.date).toISOString().split('T')[0] + 'T' + data.time + ':00',
      status: 'confirmed',
      color: '#86cb92',
      notes: data.notes,
      price: data.price,
      duration: data.duration,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setAppointments(prev => [...prev, newAppointment]);
    return newAppointment;
  }, []);

  const updateAppointment = useCallback((id: string, data: Partial<Appointment>) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === id 
          ? { ...apt, ...data, updatedAt: new Date().toISOString() }
          : apt
      )
    );
  }, []);

  const deleteAppointment = useCallback((id: string) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
  }, []);

  const confirmAppointment = useCallback((id: string) => {
    updateAppointment(id, { status: 'confirmed' });
  }, [updateAppointment]);

  const completeAppointment = useCallback((id: string) => {
    updateAppointment(id, { status: 'completed' });
  }, [updateAppointment]);

  const cancelAppointment = useCallback((id: string) => {
    updateAppointment(id, { status: 'cancelled' });
  }, [updateAppointment]);

  const rescheduleAppointment = useCallback((id: string, newStartTime: string) => {
    updateAppointment(id, { startTime: newStartTime });
  }, [updateAppointment]);

  return {
    appointments,
    isLoading,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    confirmAppointment,
    completeAppointment,
    cancelAppointment,
    rescheduleAppointment
  };
}

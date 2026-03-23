'use client';

import React from 'react';
import { format, startOfWeek, addDays, isToday, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DndContext, useDraggable, useDroppable, DragOverlay, closestCenter } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Clock } from 'lucide-react';
import { Appointment, TimeSlot, CalendarWeekViewProps } from '@/types/agendamentos';
import { getStatusBadgeClass } from '@/lib/utils/statusColors';
import { cn } from '@/lib/utils';

// Funções utilitárias
const getWeekDays = (currentDate: Date): Date[] => {
  const start = startOfWeek(currentDate, { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
};

const generateHours = (start: number, end: number): number[] => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const formatHour = (hour: number): string => {
  return `${hour.toString().padStart(2, '0')}:00`;
};

const getAppointmentsForSlot = (appointments: Appointment[], day: Date, hour: number): Appointment[] => {
  return appointments.filter(apt => {
    const aptDate = new Date(apt.startTime);
    return isSameDay(aptDate, day) && aptDate.getHours() === hour;
  });
};

// Componente Draggable Appointment
interface DraggableAppointmentProps {
  appointment: Appointment;
  onClick: (appointment: Appointment) => void;
}

function DraggableAppointment({ appointment, onClick }: DraggableAppointmentProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: appointment.id,
    data: { appointment }
  });

  const style = transform ? {
    transform: CSS.Translate.toString(transform),
  } : undefined;

  const startTime = new Date(appointment.startTime);

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={(e) => {
        e.stopPropagation();
        onClick(appointment);
      }}
      style={style}
      className={cn(
        'mb-1 p-2 rounded-md text-xs cursor-pointer shadow-sm hover:shadow-md transition-all border-l-4',
        getStatusBadgeClass(appointment.status),
        isDragging && 'opacity-50 rotate-2 scale-105 z-50'
      )}
    >
      <div className="font-semibold truncate">{appointment.clientName}</div>
      <div className="truncate opacity-75">{appointment.service}</div>
      <div className="flex items-center gap-1 mt-1">
        <Clock className="w-3 h-3" />
        <span>{format(startTime, 'HH:mm')}</span>
      </div>
    </div>
  );
}

// Componente Droppable Slot
interface DroppableSlotProps {
  day: Date;
  hour: number;
  isBlocked: boolean;
  onSlotClick: (slot: TimeSlot) => void;
  children: React.ReactNode;
}

function DroppableSlot({ 
  day, 
  hour, 
  isBlocked, 
  onSlotClick, 
  children 
}: DroppableSlotProps) {
  const slotId = `${day.toISOString().split('T')[0]}|${hour}`;
  
  const { setNodeRef, isOver } = useDroppable({
    id: slotId,
    data: { date: day, hour, minute: 0 },
    disabled: isBlocked
  });

  return (
    <div
      ref={setNodeRef}
      onClick={() => !isBlocked && onSlotClick({ date: day, hour, minute: 0, isAvailable: true })}
      className={cn(
        'flex-1 border-r border-b border-gray-200 last:border-r-0 p-1 relative min-h-[80px]',
        isBlocked 
          ? 'bg-red-50 cursor-not-allowed' 
          : isOver 
            ? 'bg-[#86cb92]/30 cursor-pointer' 
            : 'hover:bg-gray-50 cursor-pointer'
      )}
    >
      {isBlocked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs text-red-500 font-medium">Bloqueado</span>
        </div>
      )}
      {children}
    </div>
  );
}

// Componente Principal
export function CalendarWeekView({
  currentDate,
  appointments,
  professionals,
  selectedProfessionals,
  onAppointmentClick,
  onSlotClick,
  onDropAppointment,
  isLoading
}: CalendarWeekViewProps) {
  const weekDays = getWeekDays(currentDate);
  const hours = generateHours(8, 20);
  const [activeDrag, setActiveDrag] = React.useState<Appointment | null>(null);

  const filteredAppointments = appointments.filter(apt => 
    selectedProfessionals.length === 0 || selectedProfessionals.includes(apt.professionalId)
  );

  const handleDragStart = (event: { active: { id: string } }) => {
    const { active } = event;
    const appointment = appointments.find(apt => apt.id === active.id);
    if (appointment) {
      setActiveDrag(appointment);
    }
  };

  const handleDragEnd = (event: { active: { id: string }; over: { id: string } | null }) => {
    const { active, over } = event;
    setActiveDrag(null);

    if (over) {
      const [dateStr, hourStr] = over.id.split('|');
      const newSlot: TimeSlot = {
        date: new Date(dateStr),
        hour: parseInt(hourStr, 10),
        minute: 0,
        isAvailable: true
      };
      onDropAppointment(active.id, newSlot);
    }
  };

  if (isLoading) {
    return <CalendarWeekViewSkeleton />;
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col h-full bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header dos Dias */}
        <div className="flex border-b border-gray-200 flex-shrink-0">
          <div className="w-20 flex-shrink-0 border-r border-gray-200 p-2 bg-gray-50" />
          {weekDays.map((day) => (
            <div
              key={day.toISOString()}
              className={cn(
                'flex-1 p-3 text-center border-r border-gray-200 last:border-r-0',
                isToday(day) ? 'bg-[#86cb92]/10' : 'bg-white'
              )}
            >
              <div className={cn(
                'text-xs font-medium',
                isToday(day) ? 'text-[#3e5653]' : 'text-gray-500'
              )}>
                {format(day, 'EEE', { locale: ptBR })}
              </div>
              <div className={cn(
                'text-lg font-semibold',
                isToday(day) ? 'text-[#3e5653]' : 'text-gray-900'
              )}>
                {format(day, 'dd')}
              </div>
            </div>
          ))}
        </div>

        {/* Grid de Horários */}
        <div className="flex-1 overflow-y-auto">
          {hours.map((hour) => (
            <div key={hour} className="flex min-h-[80px]">
              {/* Coluna de Horário */}
              <div className="w-20 flex-shrink-0 border-r border-b border-gray-200 p-2 bg-gray-50 text-xs text-gray-500 text-center flex items-center justify-center">
                {formatHour(hour)}
              </div>
              
              {/* Colunas dos Dias */}
              {weekDays.map((day) => {
                const slotAppointments = getAppointmentsForSlot(filteredAppointments, day, hour);
                const isBlocked = hour === 12; // Exemplo: almoço bloqueado
                
                return (
                  <DroppableSlot
                    key={`${day.toISOString()}-${hour}`}
                    day={day}
                    hour={hour}
                    isBlocked={isBlocked}
                    onSlotClick={onSlotClick}
                  >
                    {slotAppointments.map((appointment) => (
                      <DraggableAppointment
                        key={appointment.id}
                        appointment={appointment}
                        onClick={onAppointmentClick}
                      />
                    ))}
                  </DroppableSlot>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeDrag ? (
          <div className={cn(
            'p-2 rounded-md text-xs shadow-lg cursor-grabbing border-l-4',
            getStatusBadgeClass(activeDrag.status),
            'opacity-90 scale-105'
          )}>
            <div className="font-semibold truncate">{activeDrag.clientName}</div>
            <div className="truncate opacity-75">{activeDrag.service}</div>
            <div className="flex items-center gap-1 mt-1">
              <Clock className="w-3 h-3" />
              <span>{format(new Date(activeDrag.startTime), 'HH:mm')}</span>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

// Skeleton Loading
function CalendarWeekViewSkeleton() {
  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex border-b border-gray-200">
        <div className="w-20 h-14 bg-gray-100 animate-pulse" />
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex-1 h-14 bg-gray-100 animate-pulse" />
        ))}
      </div>
      {Array.from({ length: 8 }).map((_, hour) => (
        <div key={hour} className="flex h-20">
          <div className="w-20 bg-gray-50 animate-pulse" />
          {Array.from({ length: 7 }).map((_, day) => (
            <div key={day} className="flex-1 bg-gray-50 animate-pulse m-0.5" />
          ))}
        </div>
      ))}
    </div>
  );
}

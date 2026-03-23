'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Filter,
  Calendar as CalendarIcon,
  Clock,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { CalendarWeekView } from '@/components/agendamentos/calendar/CalendarWeekView';
import { CalendarDayView } from '@/components/agendamentos/calendar/CalendarDayView';
import { CalendarMonthView } from '@/components/agendamentos/calendar/CalendarMonthView';
import { MiniCalendar } from '@/components/agendamentos/calendar/MiniCalendar';
import { ProfessionalFilter } from '@/components/agendamentos/calendar/ProfessionalFilter';
import { NewAppointmentModal } from '@/components/agendamentos/modals/NewAppointmentModal';
import { useAppointments } from '@/hooks/agendamentos/useAppointments';
import { useCalendarNavigation } from '@/hooks/agendamentos/useCalendarNavigation';
import { useProfessionalFilter } from '@/hooks/agendamentos/useProfessionalFilter';
import { Appointment, TimeSlot, AppointmentFormData } from '@/types/agendamentos';
import { mockProfessionals, mockAppointments } from '@/lib/mocks/agendamentos';
import { getStatusBadgeClass, getStatusLabel } from '@/lib/utils/statusColors';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const statusLegend = [
  { status: 'pending', label: 'Pendente', color: 'bg-amber-400' },
  { status: 'confirmed', label: 'Confirmado', color: 'bg-green-500' },
  { status: 'completed', label: 'Concluído', color: 'bg-blue-500' },
  { status: 'cancelled', label: 'Cancelado', color: 'bg-red-500' },
  { status: 'blocked', label: 'Bloqueado', color: 'bg-gray-400' },
];

export default function AgendamentosPage() {
  const { 
    appointments, 
    createAppointment, 
    updateAppointment 
  } = useAppointments();
  
  const { 
    currentDate, 
    currentView, 
    goToToday, 
    navigatePrevious, 
    navigateNext, 
    setDate, 
    setView 
  } = useCalendarNavigation();

  const { 
    selectedProfessionals, 
    toggleProfessional 
  } = useProfessionalFilter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ date?: Date; time?: string }>({});

  const handleSlotClick = (slot: TimeSlot) => {
    setSelectedSlot({ 
      date: slot.date, 
      time: `${slot.hour.toString().padStart(2, '0')}:00` 
    });
    setIsModalOpen(true);
  };

  const handleAppointmentClick = (appointment: Appointment) => {
    console.log('Appointment clicked:', appointment);
    // Aqui poderia abrir um drawer de detalhes
  };

  const handleDropAppointment = (appointmentId: string, newSlot: TimeSlot) => {
    const dateStr = newSlot.date.toISOString().split('T')[0];
    const timeStr = `${newSlot.hour.toString().padStart(2, '0')}:00:00`;
    
    updateAppointment(appointmentId, {
      startTime: `${dateStr}T${timeStr}`,
      endTime: `${dateStr}T${timeStr}`,
    });
  };

  const handleSubmitAppointment = (data: AppointmentFormData) => {
    createAppointment(data);
    setIsModalOpen(false);
  };

  // Agendamentos de hoje para a sidebar
  const todayAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.startTime);
    const today = new Date();
    return (
      aptDate.getDate() === today.getDate() &&
      aptDate.getMonth() === today.getMonth() &&
      aptDate.getFullYear() === today.getFullYear() &&
      (selectedProfessionals.length === 0 || selectedProfessionals.includes(apt.professionalId))
    );
  }).slice(0, 5);

  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      
      <Header
        pageTitle="Agendamentos"
        breadcrumbs={[
          { label: 'Início', href: '/dashboard' },
          { label: 'Agendamentos' }
        ]}
      />

      {/* Main Content */}
      <main className="ml-0 lg:ml-64 pt-16">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Navegação de Data */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={goToToday}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Hoje
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={navigatePrevious}
                className="text-gray-600 hover:bg-gray-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h2 className="text-lg font-semibold text-[#1f2937] min-w-[180px] text-center capitalize">
                {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={navigateNext}
                className="text-gray-600 hover:bg-gray-100"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Controles de Visualização */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              {(['day', 'week', 'month'] as const).map((view) => (
                <button
                  key={view}
                  onClick={() => setView(view)}
                  className={cn(
                    'px-3 py-1.5 text-sm font-medium rounded-md transition-all',
                    currentView === view
                      ? 'bg-white text-[#1f2937] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  )}
                >
                  {view === 'day' && 'Dia'}
                  {view === 'week' && 'Semana'}
                  {view === 'month' && 'Mês'}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="border-gray-300">
                <Search className="w-4 h-4 text-gray-600" />
              </Button>
              <Button variant="outline" size="icon" className="border-gray-300">
                <Filter className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>

        {/* Legenda de Status */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">Status:</span>
          {statusLegend.map((status) => (
            <div key={status.label} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-full ${status.color}`}></div>
              <span className="text-xs text-gray-600">{status.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex h-[calc(100vh-220px)]">
        {/* Área do Calendário */}
        <div className="flex-1 p-6 overflow-hidden">
          {currentView === 'week' && (
            <CalendarWeekView
              currentDate={currentDate}
              appointments={appointments}
              professionals={mockProfessionals}
              selectedProfessionals={selectedProfessionals}
              onAppointmentClick={handleAppointmentClick}
              onSlotClick={handleSlotClick}
              onDropAppointment={handleDropAppointment}
            />
          )}
          {currentView === 'day' && (
            <CalendarDayView
              currentDate={currentDate}
              appointments={appointments}
              professionals={mockProfessionals}
              selectedProfessionals={selectedProfessionals}
              onAppointmentClick={handleAppointmentClick}
              onSlotClick={handleSlotClick}
            />
          )}
          {currentView === 'month' && (
            <CalendarMonthView
              currentDate={currentDate}
              appointments={appointments}
              professionals={mockProfessionals}
              selectedProfessionals={selectedProfessionals}
              onDateSelect={setDate}
              onAppointmentClick={handleAppointmentClick}
            />
          )}
        </div>

        {/* Sidebar Direita */}
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          {/* Mini Calendário */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-[#1f2937] mb-3">Calendário</h3>
            <MiniCalendar
              currentDate={currentDate}
              onDateSelect={setDate}
              appointments={appointments}
            />
          </div>

          {/* Filtro de Profissionais */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-[#1f2937] mb-3">Profissionais</h3>
            <ProfessionalFilter
              professionals={mockProfessionals}
              selectedIds={selectedProfessionals}
              onToggle={toggleProfessional}
            />
          </div>

          {/* Próximos Agendamentos */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-[#1f2937]">Hoje</h3>
              <Button variant="ghost" size="sm" className="text-xs text-[#3e5653]">
                Ver Todos
              </Button>
            </div>
            <div className="space-y-2">
              {todayAppointments.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  Nenhum agendamento hoje
                </p>
              ) : (
                todayAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className={cn(
                      'p-3 rounded-lg border-l-4 cursor-pointer hover:shadow-sm transition-shadow',
                      getStatusBadgeClass(appointment.status),
                      'bg-opacity-50'
                    )}
                    onClick={() => handleAppointmentClick(appointment)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-900">
                        {format(new Date(appointment.startTime), 'HH:mm')}
                      </span>
                      <Badge variant="secondary" className="text-[10px]">
                        {getStatusLabel(appointment.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mt-1 truncate">
                      {appointment.clientName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {appointment.service}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Novo Agendamento */}
      <NewAppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialDate={selectedSlot.date}
        initialTime={selectedSlot.time}
        onSubmit={handleSubmitAppointment}
      />
      </main>
    </div>
  );
}

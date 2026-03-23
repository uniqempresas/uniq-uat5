'use client';

import { Appointment } from '@/types/chat';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AppointmentCardProps {
  appointment: Appointment;
  onSendDetails?: () => void;
}

export function AppointmentCard({ appointment, onSendDetails }: AppointmentCardProps) {
  const formatDate = (date: string) => {
    return format(new Date(date), "dd 'de' MMMM", { locale: ptBR });
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden max-w-[280px]">
      <div className="bg-gradient-to-r from-[#86cb92]/10 to-transparent px-4 py-3 border-b border-[#e5e7eb]">
        <h4 className="text-[14px] font-semibold text-[#1f2937] flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#86cb92]" />
          {appointment.title}
        </h4>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-[13px] text-[#627271]">
          <Calendar className="w-4 h-4 text-[#86cb92]" />
          <span>{formatDate(appointment.date)}</span>
        </div>
        
        <div className="flex items-center gap-2 text-[13px] text-[#627271]">
          <Clock className="w-4 h-4 text-[#86cb92]" />
          <span>{appointment.time}</span>
        </div>
        
        {appointment.professional && (
          <div className="flex items-center gap-2 text-[13px] text-[#627271]">
            <User className="w-4 h-4 text-[#86cb92]" />
            <span>{appointment.professional}</span>
          </div>
        )}
        
        {appointment.location && (
          <div className="flex items-center gap-2 text-[13px] text-[#627271]">
            <MapPin className="w-4 h-4 text-[#86cb92]" />
            <span>{appointment.location}</span>
          </div>
        )}
      </div>
      
      {onSendDetails && (
        <div className="px-4 py-3 bg-[#f9fafb] border-t border-[#e5e7eb]">
          <button 
            onClick={onSendDetails}
            className="w-full py-2 bg-[#86cb92] hover:bg-[#5fb86e] text-white 
                       rounded-lg text-[13px] font-medium transition-colors"
          >
            Ver Detalhes
          </button>
        </div>
      )}
    </div>
  );
}

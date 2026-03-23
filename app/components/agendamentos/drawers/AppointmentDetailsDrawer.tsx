'use client';

import { Appointment } from '@/app/types/agendamentos';
import { getStatusBadgeClass, getStatusLabel } from '@/app/lib/utils/statusColors';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Scissors, 
  DollarSign, 
  FileText,
  CheckCircle,
  XCircle,
  RotateCcw,
  Trash2,
  History
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface AppointmentDetailsDrawerProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => void;
  onComplete: (id: string) => void;
  onCancel: (id: string) => void;
  onReschedule: (id: string) => void;
  onDelete: (id: string) => void;
}

export function AppointmentDetailsDrawer({
  appointment,
  isOpen,
  onClose,
  onConfirm,
  onComplete,
  onCancel,
  onReschedule,
  onDelete
}: AppointmentDetailsDrawerProps) {
  if (!appointment) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return {
      date: format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }),
      time: format(date, 'HH:mm'),
      weekday: format(date, 'EEEE', { locale: ptBR })
    };
  };

  const startInfo = formatDateTime(appointment.startTime);
  const endInfo = formatDateTime(appointment.endTime);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge className={getStatusBadgeClass(appointment.status)}>
              {getStatusLabel(appointment.status)}
            </Badge>
            <span className="text-xs text-gray-500">
              #{appointment.id}
            </span>
          </div>
          
          <SheetTitle className="text-xl">
            {appointment.clientName}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Informações do Agendamento */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#3e5653]" />
              Data e Horário
            </h3>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Data:</span>
                <span className="text-sm font-medium">{startInfo.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Horário:</span>
                <span className="text-sm font-medium">
                  {startInfo.time} - {endInfo.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Duração:</span>
                <span className="text-sm font-medium">{appointment.duration} minutos</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Serviço */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Scissors className="w-4 h-4 text-[#3e5653]" />
              Serviço
            </h3>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{appointment.service}</p>
                <p className="text-sm text-gray-500">Profissional: {appointment.professional}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-[#3e5653]">{formatCurrency(appointment.price)}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Cliente */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-4 h-4 text-[#3e5653]" />
              Cliente
            </h3>
            
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-[#3e5653] text-white">
                  {appointment.clientName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <p className="font-medium">{appointment.clientName}</p>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Phone className="w-3 h-3" />
                  {appointment.clientPhone}
                </div>
                {appointment.clientEmail && (
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Mail className="w-3 h-3" />
                    {appointment.clientEmail}
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Observações */}
          {appointment.notes && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#3e5653]" />
                Observações
              </h3>
              
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                {appointment.notes}
              </p>
            </div>
          )}

          <Separator />

          {/* Ações */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900">Ações</h3>
            
            <div className="grid grid-cols-2 gap-2">
              {appointment.status === 'pending' && (
                <Button
                  onClick={() => onConfirm(appointment.id)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirmar
                </Button>
              )}
              
              {appointment.status === 'confirmed' && (
                <Button
                  onClick={() => onComplete(appointment.id)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Concluir
                </Button>
              )}
              
              {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => onReschedule(appointment.id)}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reagendar
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => onCancel(appointment.id)}
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                </>
              )}
            </div>

            <Button
              variant="ghost"
              onClick={() => onDelete(appointment.id)}
              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir Agendamento
            </Button>
          </div>

          {/* Histórico */}
          {appointment.history && appointment.history.length > 0 && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <History className="w-4 h-4 text-[#3e5653]" />
                  Histórico
                </h3>
                
                <div className="space-y-2">
                  {appointment.history.map((item) => (
                    <div key={item.id} className="text-sm">
                      <div className="flex items-center justify-between">
                        <span className="capitalize">{item.action.replace('_', ' ')}</span>
                        <span className="text-gray-500">
                          {format(new Date(item.timestamp), 'dd/MM/yyyy HH:mm')}
                        </span>
                      </div>
                      {item.performedBy && (
                        <p className="text-xs text-gray-500">Por: {item.performedBy}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

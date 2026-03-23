'use client';

import React, { useState, useEffect } from 'react';
import { format, startOfToday, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar as CalendarIcon, 
  User, 
  Scissors, 
  Clock, 
  ChevronRight, 
  Check, 
  Search, 
  Plus, 
  Loader2,
  DollarSign,
  ChevronLeft
} from 'lucide-react';
import { AppointmentFormData } from '@/app/types/agendamentos';
import { mockServices, mockProfessionals, recentClients } from '@/app/lib/mocks/agendamentos';
import { cn } from '@/lib/utils';
import { Client } from '@/app/types/agendamentos';

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDate?: Date;
  initialTime?: string;
  onSubmit: (data: AppointmentFormData) => void;
}

const steps = [
  { id: 1, label: 'Cliente', icon: User },
  { id: 2, label: 'Serviço', icon: Scissors },
  { id: 3, label: 'Horário', icon: Clock }
];

export function NewAppointmentModal({
  isOpen,
  onClose,
  initialDate,
  initialTime,
  onSubmit
}: NewAppointmentModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchResults, setSearchResults] = useState<Client[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  
  const [formData, setFormData] = useState<AppointmentFormData>({
    clientId: '',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    serviceId: '',
    serviceName: '',
    professionalId: '',
    professionalName: '',
    date: initialDate || new Date(),
    time: initialTime || '',
    duration: 60,
    price: 0,
    notes: '',
    sendConfirmation: true,
    addToWaitlist: false
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormData({
        clientId: '',
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        serviceId: '',
        serviceName: '',
        professionalId: '',
        professionalName: '',
        date: initialDate || new Date(),
        time: initialTime || '',
        duration: 60,
        price: 0,
        notes: '',
        sendConfirmation: true,
        addToWaitlist: false
      });
    }
  }, [isOpen, initialDate, initialTime]);

  // Load available slots when date changes
  useEffect(() => {
    if (step === 3 && formData.date) {
      loadAvailableSlots();
    }
  }, [step, formData.date, formData.professionalId, formData.serviceId]);

  const loadAvailableSlots = async () => {
    setLoadingSlots(true);
    // Simular chamada API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock de horários disponíveis
    const slots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
    setAvailableSlots(slots);
    setLoadingSlots(false);
  };

  const searchClients = (query: string) => {
    setFormData({ ...formData, clientName: query });
    
    if (query.length >= 2) {
      const results = recentClients.filter(client => 
        client.name.toLowerCase().includes(query.toLowerCase()) ||
        client.phone.includes(query)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const selectClient = (client: Client) => {
    setFormData({
      ...formData,
      clientId: client.id,
      clientName: client.name,
      clientPhone: client.phone,
      clientEmail: client.email || ''
    });
    setSearchResults([]);
  };

  const selectService = (serviceId: string) => {
    const service = mockServices.find(s => s.id === serviceId);
    if (service) {
      setFormData({
        ...formData,
        serviceId: service.id,
        serviceName: service.name,
        duration: service.duration,
        price: service.price
      });
    }
  };

  const selectProfessional = (professionalId: string) => {
    const professional = mockProfessionals.find(p => p.id === professionalId);
    if (professional) {
      setFormData({
        ...formData,
        professionalId: professional.id,
        professionalName: professional.name
      });
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.clientId && formData.clientName;
      case 2:
        return formData.serviceId && formData.professionalId;
      case 3:
        return formData.time;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
    onClose();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#1f2937] flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-[#3e5653]" />
            Novo Agendamento
          </DialogTitle>
        </DialogHeader>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {steps.map((s, index) => (
            <div key={s.id} className="flex items-center">
              <div
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors',
                  step === s.id
                    ? 'bg-[#3e5653] text-white'
                    : step > s.id
                      ? 'bg-[#86cb92] text-white'
                      : 'bg-gray-100 text-gray-500'
                )}
              >
                <s.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{s.label}</span>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Cliente */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar cliente por nome ou telefone..."
                className="pl-10 border-gray-300 focus:ring-[#86cb92] focus:border-[#86cb92]"
                value={formData.clientName}
                onChange={(e) => searchClients(e.target.value)}
              />
            </div>

            {/* Resultados da Busca */}
            {searchResults.length > 0 && (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {searchResults.map((client) => (
                  <button
                    key={client.id}
                    onClick={() => selectClient(client)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 text-left"
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-[#3e5653] text-white">
                        {client.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{client.name}</p>
                      <p className="text-sm text-gray-500">{client.phone}</p>
                    </div>
                    <Check className="w-4 h-4 text-[#86cb92]" />
                  </button>
                ))}
              </div>
            )}

            {/* Clientes Recentes */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Clientes Recentes</h4>
              <div className="grid grid-cols-3 gap-3">
                {recentClients.map((client) => (
                  <button
                    key={client.id}
                    onClick={() => selectClient(client)}
                    className={cn(
                      'flex flex-col items-center p-3 border rounded-lg transition-colors',
                      formData.clientId === client.id
                        ? 'border-[#86cb92] bg-[#86cb92]/5'
                        : 'border-gray-200 hover:border-[#86cb92] hover:bg-[#86cb92]/5'
                    )}
                  >
                    <Avatar className="w-12 h-12 mb-2">
                      <AvatarFallback className="bg-gray-200 text-gray-600">
                        {client.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-900 truncate w-full text-center">
                      {client.name.split(' ')[0]}
                    </span>
                    <span className="text-xs text-gray-500">{client.phone}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Novo Cliente */}
            <Button
              variant="outline"
              className="w-full border-dashed border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Cadastrar Novo Cliente
            </Button>
          </div>
        )}

        {/* Step 2: Serviço */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Serviço *
                </label>
                <Select
                  value={formData.serviceId}
                  onValueChange={selectService}
                >
                  <SelectTrigger className="border-gray-300 focus:ring-[#86cb92]">
                    <SelectValue placeholder="Selecione um serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockServices.filter(s => s.isActive).map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{service.name}</span>
                          <span className="text-gray-500 ml-4">{formatCurrency(service.price)}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Profissional *
                </label>
                <Select
                  value={formData.professionalId}
                  onValueChange={selectProfessional}
                >
                  <SelectTrigger className="border-gray-300 focus:ring-[#86cb92]">
                    <SelectValue placeholder="Selecione um profissional" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProfessionals.filter(p => p.isActive).map((professional) => (
                      <SelectItem key={professional.id} value={professional.id}>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: professional.color }}
                          />
                          <span>{professional.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Resumo do Serviço */}
            {formData.serviceId && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Duração</p>
                      <p className="font-medium text-gray-900">{formData.duration} min</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Valor</p>
                      <p className="font-medium text-gray-900">{formatCurrency(formData.price)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Serviços Populares */}
            {!formData.serviceId && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Serviços Populares</h4>
                <div className="grid grid-cols-2 gap-3">
                  {mockServices.slice(0, 4).map((service) => (
                    <button
                      key={service.id}
                      onClick={() => selectService(service.id)}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#86cb92] hover:bg-[#86cb92]/5 transition-colors text-left"
                    >
                      <div className="w-10 h-10 bg-[#3e5653]/10 rounded-lg flex items-center justify-center">
                        <Scissors className="w-5 h-5 text-[#3e5653]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{service.name}</p>
                        <p className="text-xs text-gray-500">{service.duration} min</p>
                      </div>
                      <span className="text-sm font-medium text-[#3e5653]">
                        {formatCurrency(service.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Data e Hora */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Mini Calendário */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selecione a Data
                </label>
                <div className="border border-gray-200 rounded-lg p-3">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => date && setFormData({ ...formData, date })}
                    disabled={(date) => isBefore(date, startOfToday())}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Horários Disponíveis */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horários Disponíveis
                </label>
                <div className="border border-gray-200 rounded-lg p-3 h-[280px] overflow-y-auto">
                  {loadingSlots ? (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                    </div>
                  ) : availableSlots.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setFormData({ ...formData, time: slot })}
                          className={cn(
                            'p-2 text-sm rounded-md border transition-all',
                            formData.time === slot
                              ? 'bg-[#3e5653] text-white border-[#3e5653]'
                              : 'border-gray-200 hover:border-[#86cb92] hover:bg-[#86cb92]/5'
                          )}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <Clock className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Nenhum horário disponível</p>
                      <p className="text-xs text-gray-400">Tente outra data</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Observações */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Observações (opcional)
              </label>
              <Textarea
                placeholder="Notas sobre o agendamento..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="border-gray-300 focus:ring-[#86cb92] focus:border-[#86cb92] resize-none"
                rows={3}
              />
            </div>

            {/* Opções */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.sendConfirmation}
                  onChange={(e) => setFormData({ ...formData, sendConfirmation: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-[#86cb92] focus:ring-[#86cb92]"
                />
                <span className="text-sm text-gray-700">Enviar confirmação por WhatsApp</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.addToWaitlist}
                  onChange={(e) => setFormData({ ...formData, addToWaitlist: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-[#86cb92] focus:ring-[#86cb92]"
                />
                <span className="text-sm text-gray-700">Adicionar à lista de espera se não houver vaga</span>
              </label>
            </div>
          </div>
        )}

        {/* Footer */}
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} className="border-gray-300">
            Cancelar
          </Button>
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="border-gray-300"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Voltar
            </Button>
          )}
          {step < 3 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="bg-[#3e5653] hover:bg-[#1f2937] text-white"
            >
              Continuar
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              className="bg-[#86cb92] hover:bg-[#22c55e] text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Confirmar Agendamento
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

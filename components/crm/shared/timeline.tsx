'use client';

import React from 'react';
import { OpportunityInteraction, CustomerInteraction } from '@/types/crm';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Phone,
  Mail,
  Users,
  FileText,
  StickyNote,
  ShoppingCart,
  MapPin,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

type TimelineEvent = OpportunityInteraction | CustomerInteraction;

interface TimelineProps {
  events: TimelineEvent[];
  showAddButton?: boolean;
  onAddEvent?: () => void;
}

const eventConfig: Record<
  string,
  { icon: React.ElementType; color: string; label: string }
> = {
  call: { icon: Phone, color: 'bg-blue-500', label: 'Ligação' },
  email: { icon: Mail, color: 'bg-green-500', label: 'Email' },
  meeting: { icon: Users, color: 'bg-purple-500', label: 'Reunião' },
  proposal: { icon: FileText, color: 'bg-yellow-500', label: 'Proposta' },
  note: { icon: StickyNote, color: 'bg-gray-500', label: 'Nota' },
  purchase: { icon: ShoppingCart, color: 'bg-emerald-600', label: 'Compra' },
  visit: { icon: MapPin, color: 'bg-orange-500', label: 'Visita' },
};

export function Timeline({
  events,
  showAddButton = false,
  onAddEvent,
}: TimelineProps) {
  // Ordena eventos do mais recente para o mais antigo
  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Agrupa por data
  const groupedEvents = sortedEvents.reduce((groups, event) => {
    const date = format(new Date(event.date), 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(event);
    return groups;
  }, {} as Record<string, TimelineEvent[]>);

  const getRelativeDateLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    }
    if (date.toDateString() === yesterday.toDateString()) {
      return 'Ontem';
    }
    return format(date, "dd 'de' MMMM", { locale: ptBR });
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground text-sm">
          Nenhuma interação registrada
        </p>
        {showAddButton && (
          <button
            onClick={onAddEvent}
            className="text-primary text-sm hover:underline mt-2"
          >
            Registrar primeira interação
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedEvents).map(([date, dayEvents]) => (
        <div key={date}>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">
            {getRelativeDateLabel(date)}
          </h4>
          <div className="space-y-4">
            {dayEvents.map((event) => {
              const config = eventConfig[event.type] || eventConfig.note;
              const Icon = config.icon;
              const initials = event.user
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase();

              return (
                <div key={event.id} className="flex gap-3">
                  {/* Linha e ícone */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full ${config.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="w-0.5 flex-1 bg-border mt-2" />
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="secondary" className="text-xs mb-1">
                          {config.label}
                        </Badge>
                        <p className="text-sm">{event.description}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(event.date), 'HH:mm')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <Avatar className="w-5 h-5">
                        <AvatarFallback className="text-[10px]">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">
                        {event.user}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scissors, Clock, Calendar, X } from "lucide-react";
import type { ServiceDetailModalProps, Service } from "@/app/types/service";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function ServiceDetailModal({ 
  service, 
  open, 
  onClose, 
  onSchedule 
}: ServiceDetailModalProps) {
  if (!service) return null;

  const hasVariations = service.variations && service.variations.length > 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] p-0 overflow-hidden">
        {/* Imagem Header */}
        <div className="h-48 bg-uniq-platinum flex items-center justify-center relative">
          {service.images?.[0] ? (
            <img 
              src={service.images[0]} 
              alt={service.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Scissors className="w-16 h-16 text-uniq-muted" />
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <ScrollArea className="max-h-[calc(90vh-12rem)]">
          <div className="p-6 space-y-6">
            {/* Header Info */}
            <div>
              <Badge 
                variant="secondary"
                className="mb-2"
                style={{ 
                  backgroundColor: `${getCategoryColor(service.category)}20`,
                  color: getCategoryColor(service.category),
                }}
              >
                {service.category}
              </Badge>
              <DialogTitle className="text-2xl font-bold text-uniq-text">
                {service.name}
              </DialogTitle>
            </div>

            {/* Descrição */}
            {service.description && (
              <p className="text-uniq-muted leading-relaxed">
                {service.description}
              </p>
            )}

            {/* Preços */}
            <div className="space-y-3">
              <h4 className="font-semibold text-uniq-text">Preços</h4>
              
              {/* Preço Base */}
              <div className="flex items-center justify-between p-3 bg-uniq-platinum/50 rounded-lg">
                <span className="text-uniq-text">Serviço Padrão</span>
                <span className="font-bold text-uniq-accent">
                  {formatCurrency(service.price)}
                </span>
              </div>

              {/* Variações */}
              {hasVariations && (
                <div className="space-y-2">
                  {service.variations.map((variation) => (
                    <div 
                      key={variation.id}
                      className="flex items-center justify-between p-3 border border-uniq-border rounded-lg"
                    >
                      <div>
                        <span className="text-uniq-text">{variation.name}</span>
                        <span className="text-xs text-uniq-muted ml-2">
                          ({variation.duration} min)
                        </span>
                      </div>
                      <span className="font-bold text-uniq-accent">
                        {formatCurrency(variation.price)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Duração */}
            <div className="flex items-center gap-3 text-uniq-muted">
              <Clock className="w-5 h-5" />
              <span>Duração estimada: <strong className="text-uniq-text">{service.duration} minutos</strong></span>
            </div>

            {/* Disponibilidade */}
            <div className="space-y-2">
              <h4 className="font-semibold text-uniq-text flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Disponibilidade
              </h4>
              <div className="flex flex-wrap gap-2">
                {getActiveDays(service.availability).map((day) => (
                  <Badge key={day} variant="outline" className="text-xs">
                    {day}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer Fixo */}
        <div className="p-4 border-t border-uniq-border bg-uniq-white">
          <Button 
            className="w-full bg-uniq-primary hover:bg-uniq-hover"
            onClick={() => {
              onSchedule(service.id);
              onClose();
            }}
          >
            Agendar Agora
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Cabelo': '#3b82f6',
    'Unhas': '#ec4899',
    'Barba': '#8b5cf6',
    'Estética': '#10b981',
    'Massagem': '#f59e0b',
  };
  return colors[category] || '#627271';
}

function getActiveDays(availability: Service['availability']): string[] {
  const days: string[] = [];
  const dayNames: Record<string, string> = {
    monday: 'Seg',
    tuesday: 'Ter',
    wednesday: 'Qua',
    thursday: 'Qui',
    friday: 'Sex',
    saturday: 'Sáb',
    sunday: 'Dom',
  };

  Object.entries(availability).forEach(([key, value]) => {
    if (key !== 'lunchBreak' && value.active) {
      days.push(dayNames[key]);
    }
  });

  return days;
}

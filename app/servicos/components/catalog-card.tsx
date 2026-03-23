"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scissors, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CatalogCardProps } from "@/app/types/service";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function CatalogCard({ 
  service, 
  onViewDetails, 
  onSchedule 
}: CatalogCardProps) {
  const hasVariations = service.variations && service.variations.length > 0;
  const minPrice = hasVariations 
    ? Math.min(service.price, ...service.variations.map(v => v.price))
    : service.price;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
      {/* Imagem */}
      <div className="h-48 bg-uniq-platinum flex items-center justify-center overflow-hidden relative">
        {service.images?.[0] ? (
          <>
            <img 
              src={service.images[0]} 
              alt={service.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </>
        ) : (
          <Scissors className="w-16 h-16 text-uniq-muted/50" />
        )}
      </div>

      <CardContent className="p-5 space-y-4">
        {/* Categoria */}
        <Badge 
          variant="secondary" 
          className="text-xs"
          style={{ 
            backgroundColor: `${getCategoryColor(service.category)}15`,
            color: getCategoryColor(service.category),
          }}
        >
          {service.category}
        </Badge>

        {/* Nome */}
        <h3 className="text-lg font-semibold text-uniq-text line-clamp-2">
          {service.name}
        </h3>

        {/* Preço */}
        <div className="space-y-1">
          {hasVariations && (
            <span className="text-xs text-uniq-muted">A partir de</span>
          )}
          <p className="text-2xl font-bold text-uniq-accent">
            {formatCurrency(minPrice)}
          </p>
        </div>

        {/* Duração */}
        <div className="flex items-center gap-2 text-sm text-uniq-muted">
          <Clock className="w-4 h-4" />
          {service.duration} minutos
        </div>

        {/* Ações */}
        <div className="pt-2 space-y-2">
          <Button 
            className="w-full bg-uniq-primary hover:bg-uniq-hover"
            onClick={() => onSchedule(service.id)}
          >
            Agendar
          </Button>
          <Button 
            variant="ghost" 
            className="w-full text-uniq-muted hover:text-uniq-text"
            onClick={() => onViewDetails(service)}
          >
            Ver Detalhes
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
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

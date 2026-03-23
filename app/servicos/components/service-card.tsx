"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Scissors, Clock, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ServiceCardProps } from "@/app/types/service";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function ServiceCard({ 
  service, 
  onEdit, 
  onToggleActive,
  view = 'admin' 
}: ServiceCardProps) {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-200 hover:shadow-md",
        !service.active && view === 'admin' && 'opacity-70'
      )}
    >
      {/* Imagem ou placeholder */}
      <div className="h-40 bg-uniq-platinum flex items-center justify-center overflow-hidden">
        {service.images?.[0] ? (
          <img 
            src={service.images[0]} 
            alt={service.name} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <Scissors className="w-12 h-12 text-uniq-muted" />
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-uniq-text line-clamp-1">
          {service.name}
        </h3>
        <p className="text-xl font-bold text-uniq-accent mt-1">
          {formatCurrency(service.price)}
        </p>
        <div className="flex items-center gap-2 mt-2 text-sm text-uniq-muted">
          <Clock className="w-4 h-4" />
          {service.duration} min
        </div>
        <Badge 
          variant="secondary" 
          className="mt-2"
          style={{ 
            backgroundColor: `${getCategoryColor(service.category)}20`,
            color: getCategoryColor(service.category),
            borderColor: getCategoryColor(service.category)
          }}
        >
          {service.category}
        </Badge>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Switch
            checked={service.active}
            onCheckedChange={(checked) => onToggleActive(service.id, checked)}
          />
          <span className="text-sm text-uniq-muted">
            {service.active ? 'Ativo' : 'Inativo'}
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onEdit(service.id)}
          className="hover:bg-uniq-platinum"
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </CardFooter>
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

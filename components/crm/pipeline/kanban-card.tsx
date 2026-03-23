'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Opportunity } from '@/types/crm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, TrendingUp, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface KanbanCardProps {
  opportunity: Opportunity;
  stageColor: string;
  onEdit: (opportunity: Opportunity) => void;
  onDelete: (id: string) => void;
  onClick?: (opportunity: Opportunity) => void;
}

export function KanbanCard({
  opportunity,
  stageColor,
  onEdit,
  onDelete,
  onClick,
}: KanbanCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: opportunity.id,
    data: {
      type: 'opportunity',
      opportunity,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getProbabilityColor = (prob: number) => {
    if (prob >= 70) return 'bg-green-500';
    if (prob >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const initials = opportunity.customerName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow
        ${isDragging ? 'opacity-50 rotate-2 shadow-xl' : ''}
      `}
      onClick={() => onClick?.(opportunity)}
    >
      {/* Indicador de cor do estágio */}
      <div
        className="h-1 rounded-t-lg"
        style={{ backgroundColor: stageColor }}
      />

      <CardHeader className="p-3 pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarFallback className="text-xs bg-primary/10">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground truncate">
                {opportunity.customerName}
              </p>
              <h4 className="text-sm font-medium truncate">
                {opportunity.title}
              </h4>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-6 w-6 -mr-1">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(opportunity)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete(opportunity.id)}
              >
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="p-3 pt-0 space-y-2">
        {/* Valor */}
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-primary">
            {formatCurrency(opportunity.value)}
          </span>
        </div>

        {/* Probabilidade */}
        <div className="flex items-center gap-2">
          <TrendingUp className="w-3 h-3 text-muted-foreground" />
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full ${getProbabilityColor(opportunity.probability)}`}
              style={{ width: `${opportunity.probability}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {opportunity.probability}%
          </span>
        </div>

        {/* Follow-up */}
        {opportunity.nextFollowUp && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>
              {format(new Date(opportunity.nextFollowUp), "dd MMM", {
                locale: ptBR,
              })}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

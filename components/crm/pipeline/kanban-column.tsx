'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { PipelineStage, Opportunity } from '@/types/crm';
import { KanbanCard } from './kanban-card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatCurrency } from '@/lib/utils';

interface KanbanColumnProps {
  stage: PipelineStage;
  opportunities: Opportunity[];
  onAddOpportunity: (stageId: string, data: Partial<Opportunity>) => void;
  onEditOpportunity: (opportunity: Opportunity) => void;
  onDeleteOpportunity: (id: string) => void;
  onCardClick?: (opportunity: Opportunity) => void;
}

export function KanbanColumn({
  stage,
  opportunities,
  onAddOpportunity,
  onEditOpportunity,
  onDeleteOpportunity,
  onCardClick,
}: KanbanColumnProps) {
  const {
    setNodeRef: setSortableRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: stage.id,
    data: {
      type: 'column',
      stage,
    },
  });

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: stage.id,
    data: {
      type: 'column',
      stage,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const totalValue = opportunities.reduce((sum, opp) => sum + opp.value, 0);
  const weightedValue = opportunities.reduce(
    (sum, opp) => sum + (opp.value * opp.probability) / 100,
    0
  );

  const handleAddClick = () => {
    onAddOpportunity(stage.id, {
      stage: stage.id,
      title: 'Nova Oportunidade',
      value: 0,
      probability: 20,
    });
  };

  return (
    <div
      ref={setSortableRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        min-w-[300px] w-[300px] flex flex-col rounded-lg border bg-card
        ${isDragging ? 'opacity-50' : ''}
        ${isOver ? 'ring-2 ring-primary ring-offset-2' : ''}
      `}
    >
      {/* Header da Coluna */}
      <div
        className="p-3 border-b rounded-t-lg"
        style={{ backgroundColor: `${stage.color}15` }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: stage.color }}
            />
            <h3 className="font-semibold text-sm">{stage.name}</h3>
          </div>
          <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded-full">
            {opportunities.length}
          </span>
        </div>
        
        {/* Resumo financeiro */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Total:</span>
            <span className="font-medium">{formatCurrency(totalValue)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Ponderado:</span>
            <span className="font-medium text-primary">
              {formatCurrency(weightedValue)}
            </span>
          </div>
        </div>
      </div>

      {/* Área de Drop (Cards) */}
      <div
        ref={setDroppableRef}
        className={`
          flex-1 p-2 space-y-2 min-h-[200px]
          ${isOver ? 'bg-muted/50' : ''}
        `}
      >
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2 pr-2">
            {opportunities.map((opportunity) => (
              <KanbanCard
                key={opportunity.id}
                opportunity={opportunity}
                stageColor={stage.color}
                onEdit={onEditOpportunity}
                onDelete={onDeleteOpportunity}
                onClick={onCardClick}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Footer com botão add */}
      <div className="p-2 border-t">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={handleAddClick}
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar oportunidade
        </Button>
      </div>
    </div>
  );
}

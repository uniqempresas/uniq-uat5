'use client';

import React, { useState, useCallback, useMemo } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  DropAnimation,
  closestCorners,
  KeyboardSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { PipelineStage, Opportunity } from '@/types/crm';
import { KanbanColumn } from './kanban-column';
import { KanbanCard } from './kanban-card';
import { KanbanDragOverlay } from './kanban-drag-overlay';

interface KanbanBoardProps {
  stages: PipelineStage[];
  opportunities: Opportunity[];
  onMoveOpportunity: (opportunityId: string, newStageId: string) => void;
  onAddOpportunity: (stageId: string, data: Partial<Opportunity>) => void;
  onEditOpportunity: (opportunity: Opportunity) => void;
  onDeleteOpportunity: (id: string) => void;
  onCardClick?: (opportunity: Opportunity) => void;
  loading?: boolean;
}

export function KanbanBoard({
  stages,
  opportunities,
  onMoveOpportunity,
  onAddOpportunity,
  onEditOpportunity,
  onDeleteOpportunity,
  onCardClick,
  loading = false,
}: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeOpportunity, setActiveOpportunity] = useState<Opportunity | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const opportunitiesByStage = useMemo(() => {
    const grouped: Record<string, Opportunity[]> = {};
    stages.forEach((stage) => {
      grouped[stage.id] = opportunities.filter((opp) => opp.stage === stage.id);
    });
    return grouped;
  }, [opportunities, stages]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
    
    const opportunity = opportunities.find((opp) => opp.id === active.id);
    if (opportunity) {
      setActiveOpportunity(opportunity);
    }
  }, [opportunities]);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const activeId = active.id as string;
    const overId = over.id as string;
    
    const activeOpportunity = opportunities.find((opp) => opp.id === activeId);
    const overStage = stages.find((stage) => stage.id === overId);
    
    if (activeOpportunity && overStage && activeOpportunity.stage !== overStage.id) {
      // Preview visual poderia ser adicionado aqui
    }
  }, [opportunities, stages]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    
    setActiveId(null);
    setActiveOpportunity(null);
    
    if (!over) return;
    
    const activeId = active.id as string;
    const overId = over.id as string;
    
    const opportunity = opportunities.find((opp) => opp.id === activeId);
    
    if (!opportunity) return;
    
    const overStage = stages.find((stage) => stage.id === overId);
    
    if (overStage && opportunity.stage !== overStage.id) {
      onMoveOpportunity(activeId, overStage.id);
    } else {
      const overOpportunity = opportunities.find((opp) => opp.id === overId);
      if (overOpportunity && opportunity.stage !== overOpportunity.stage) {
        onMoveOpportunity(activeId, overOpportunity.stage);
      }
    }
  }, [opportunities, stages, onMoveOpportunity]);

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };

  if (loading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className="min-w-[300px] w-[300px] bg-muted/50 rounded-lg p-4"
          >
            <div className="h-6 w-32 bg-muted rounded animate-pulse mb-4" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4 min-h-[500px]">
        <SortableContext
          items={stages.map((s) => s.id)}
          strategy={horizontalListSortingStrategy}
        >
          {stages.map((stage) => (
            <KanbanColumn
              key={stage.id}
              stage={stage}
              opportunities={opportunitiesByStage[stage.id] || []}
              onAddOpportunity={onAddOpportunity}
              onEditOpportunity={onEditOpportunity}
              onDeleteOpportunity={onDeleteOpportunity}
              onCardClick={onCardClick}
            />
          ))}
        </SortableContext>
      </div>

      <DragOverlay dropAnimation={dropAnimation}>
        {activeOpportunity ? (
          <KanbanDragOverlay opportunity={activeOpportunity} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

import React from 'react';
import { Opportunity } from '@/types/crm';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatCurrency } from '@/lib/utils';
import { TrendingUp } from 'lucide-react';

interface KanbanDragOverlayProps {
  opportunity: Opportunity;
}

export function KanbanDragOverlay({ opportunity }: KanbanDragOverlayProps) {
  const initials = opportunity.customerName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card className="w-[280px] rotate-3 shadow-2xl opacity-95 cursor-grabbing">
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="w-8 h-8">
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

        <div className="text-lg font-bold text-primary">
          {formatCurrency(opportunity.value)}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <TrendingUp className="w-3 h-3 text-muted-foreground" />
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${opportunity.probability}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {opportunity.probability}%
          </span>
        </div>
      </div>
    </Card>
  );
}

'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { PipelineStage, Opportunity } from '@/types/crm';
import { KanbanBoard } from '@/components/crm/pipeline/kanban-board';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockPipelineStages, mockOpportunities } from '@/lib/mocks/pipeline-data';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Timeline } from '@/components/crm/shared/timeline';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function PipelinePage() {
  const { toast } = useToast();
  const [stages] = useState<PipelineStage[]>(mockPipelineStages);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMoveOpportunity = (opportunityId: string, newStageId: string) => {
    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === opportunityId ? { ...opp, stage: newStageId } : opp
      )
    );

    const stage = stages.find((s) => s.id === newStageId);
    toast({
      title: 'Oportunidade movida',
      description: `Movida para "${stage?.name}"`,
    });
  };

  const handleAddOpportunity = (stageId: string, data: Partial<Opportunity>) => {
    const newOpportunity: Opportunity = {
      id: `opp-${Date.now()}`,
      customerId: 'new',
      customerName: 'Novo Cliente',
      title: data.title || 'Nova Oportunidade',
      value: data.value || 0,
      probability: data.probability || 20,
      stage: stageId,
      createdAt: new Date().toISOString(),
      status: 'open',
      interactions: [],
    };

    setOpportunities((prev) => [newOpportunity, ...prev]);
    toast({
      title: 'Oportunidade criada',
      description: 'Nova oportunidade adicionada ao pipeline.',
    });
  };

  const handleEditOpportunity = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    setDrawerOpen(true);
  };

  const handleDeleteOpportunity = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta oportunidade?')) {
      setOpportunities((prev) => prev.filter((opp) => opp.id !== id));
      toast({
        title: 'Oportunidade excluída',
      });
    }
  };

  const handleCardClick = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    setDrawerOpen(true);
  };

  const stats = {
    totalOpen: opportunities.filter((o) => o.status === 'open').length,
    totalValue: opportunities.reduce((sum, o) => sum + o.value, 0),
    weightedValue: opportunities.reduce(
      (sum, o) => sum + (o.value * o.probability) / 100,
      0
    ),
  };

  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      <Header
        pageTitle="Pipeline de Vendas"
        breadcrumbs={[
          { label: 'Início', href: '/dashboard' },
          { label: 'CRM', href: '/crm' },
          { label: 'Pipeline' },
        ]}
      />

      <main className="ml-0 lg:ml-64 pt-16 p-4 lg:p-6 min-h-[calc(100vh-64px)]">
        <div className="space-y-6 h-full">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-uniq-text">Pipeline de Vendas</h1>
              <p className="text-uniq-muted">
                Acompanhe e gerencie suas oportunidades
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg bg-white">
              <p className="text-sm text-uniq-muted">Oportunidades Abertas</p>
              <p className="text-2xl font-bold text-uniq-text">{stats.totalOpen}</p>
            </div>
            <div className="p-4 border rounded-lg bg-white">
              <p className="text-sm text-uniq-muted">Valor Total</p>
              <p className="text-2xl font-bold text-uniq-text">{formatCurrency(stats.totalValue)}</p>
            </div>
            <div className="p-4 border rounded-lg bg-white">
              <p className="text-sm text-uniq-muted">Valor Ponderado</p>
              <p className="text-2xl font-bold text-uniq-accent">{formatCurrency(stats.weightedValue)}</p>
            </div>
          </div>

          <div className="flex-1 min-h-0">
            <KanbanBoard
              stages={stages}
              opportunities={opportunities}
              onMoveOpportunity={handleMoveOpportunity}
              onAddOpportunity={handleAddOpportunity}
              onEditOpportunity={handleEditOpportunity}
              onDeleteOpportunity={handleDeleteOpportunity}
              onCardClick={handleCardClick}
            />
          </div>
        </div>
      </main>

      {/* Drawer de Detalhes */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent className="w-[500px] sm:max-w-[500px]">
          {selectedOpportunity && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedOpportunity.title}</SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Header Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-uniq-muted">Cliente:</span>
                    <span className="font-medium text-uniq-text">{selectedOpportunity.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-uniq-muted">Valor:</span>
                    <span className="text-2xl font-bold text-uniq-primary">
                      {formatCurrency(selectedOpportunity.value)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-uniq-muted">Probabilidade:</span>
                    <Badge variant="secondary">{selectedOpportunity.probability}%</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-uniq-muted">Criada em:</span>
                    <span className="text-uniq-text">
                      {format(new Date(selectedOpportunity.createdAt), 'dd/MM/yyyy', { locale: ptBR })}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      handleMoveOpportunity(selectedOpportunity.id, 'fechado_ganho');
                      setDrawerOpen(false);
                    }}
                  >
                    Marcar como Ganha
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      handleMoveOpportunity(selectedOpportunity.id, 'fechado_perdido');
                      setDrawerOpen(false);
                    }}
                  >
                    Marcar como Perdida
                  </Button>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-uniq-text">Timeline</h3>
                  <Timeline events={selectedOpportunity.interactions} />
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

'use client';

import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  DollarSign, 
  Percent, 
  Clock, 
  Users, 
  Kanban,
  Plus,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Calendar,
  Building2
} from 'lucide-react';
import Link from 'next/link';
import { mockOpportunities, mockPipelineStages } from '@/lib/mocks/pipeline-data';
import { mockCustomers } from '@/lib/mocks/crm-data';
import { formatCurrency } from '@/lib/utils';
import { PipelineStage, Opportunity } from '@/types/crm';

export default function CrmDashboardPage() {
  // Calcular métricas
  const totalOpportunities = mockOpportunities.length;
  const totalValue = mockOpportunities.reduce((sum, opp) => sum + opp.value, 0);
  const wonOpportunities = mockOpportunities.filter(opp => opp.stage === 'fechado_ganho');
  const lostOpportunities = mockOpportunities.filter(opp => opp.stage === 'fechado_perdido');
  const totalClosed = wonOpportunities.length + lostOpportunities.length;
  const conversionRate = totalClosed > 0 ? (wonOpportunities.length / totalClosed) * 100 : 0;
  
  // Oportunidades recentes (últimas 5)
  const recentOpportunities = [...mockOpportunities]
    .sort((a, b) => {
      const dateA = a.lastContact ? new Date(a.lastContact).getTime() : 0;
      const dateB = b.lastContact ? new Date(b.lastContact).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 5);

  // Encontrar nome do estágio
  const getStageName = (stageId: string) => {
    const stage = mockPipelineStages.find((s: PipelineStage) => s.id === stageId);
    return stage?.name || stageId;
  };

  // Cor do badge baseado no estágio
  const getStageBadgeColor = (stageId: string) => {
    switch(stageId) {
      case 'novo_lead': return 'bg-gray-100 text-gray-700';
      case 'contato_feito': return 'bg-purple-100 text-purple-700';
      case 'proposta_enviada': return 'bg-yellow-100 text-yellow-700';
      case 'negociacao': return 'bg-pink-100 text-pink-700';
      case 'fechado_ganho': return 'bg-green-100 text-green-700';
      case 'fechado_perdido': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      
      <Header
        pageTitle="CRM"
        breadcrumbs={[
          { label: 'Início', href: '/dashboard' },
          { label: 'CRM' }
        ]}
      />

      <main className="ml-0 lg:ml-64 pt-16 p-4 lg:p-6 min-h-[calc(100vh-64px)]">
        {/* Header com ações */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-uniq-text">CRM</h1>
            <p className="text-uniq-muted">Gestão de clientes e oportunidades</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/crm/pipeline">
              <Button variant="outline" className="gap-2">
                <Kanban className="w-4 h-4" />
                Pipeline
              </Button>
            </Link>
            <Link href="/crm/clientes">
              <Button variant="outline" className="gap-2">
                <Users className="w-4 h-4" />
                Clientes
              </Button>
            </Link>
            <Button className="bg-uniq-primary hover:bg-uniq-hover gap-2">
              <Plus className="w-4 h-4" />
              Nova Oportunidade
            </Button>
          </div>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total de Oportunidades */}
          <Card className="border-uniq-border shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-uniq-muted uppercase tracking-wide">Total Oportunidades</p>
                  <p className="text-2xl font-bold text-uniq-text mt-1">{totalOpportunities}</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +12% vs mês anterior
                  </p>
                </div>
                <div className="w-12 h-12 bg-uniq-accent/10 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-uniq-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Valor no Pipeline */}
          <Card className="border-uniq-border shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-uniq-muted uppercase tracking-wide">Valor no Pipeline</p>
                  <p className="text-2xl font-bold text-uniq-text mt-1">{formatCurrency(totalValue)}</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +8% vs mês anterior
                  </p>
                </div>
                <div className="w-12 h-12 bg-uniq-primary/10 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-uniq-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Taxa de Conversão */}
          <Card className="border-uniq-border shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-uniq-muted uppercase tracking-wide">Taxa de Conversão</p>
                  <p className="text-2xl font-bold text-uniq-text mt-1">{conversionRate.toFixed(1)}%</p>
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" />
                    -2% vs mês anterior
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Percent className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Média de Dias para Fechar */}
          <Card className="border-uniq-border shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-uniq-muted uppercase tracking-wide">Média Dias para Fechar</p>
                  <p className="text-2xl font-bold text-uniq-text mt-1">18 dias</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" />
                    -3 dias vs mês anterior
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal - Oportunidades Recentes */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pipeline Resumo */}
            <Card className="border-uniq-border shadow-sm">
              <CardHeader className="border-b border-uniq-border px-6 py-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-uniq-text">Pipeline Resumido</CardTitle>
                  <Link href="/crm/pipeline">
                    <Button variant="ghost" size="sm" className="gap-1 text-uniq-primary">
                      Ver Pipeline
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {mockPipelineStages.filter((s: PipelineStage) => s.id !== 'fechado_ganho' && s.id !== 'fechado_perdido').map((stage: PipelineStage) => {
                    const count = mockOpportunities.filter((opp: Opportunity) => opp.stage === stage.id).length;
                    const value = mockOpportunities
                      .filter((opp: Opportunity) => opp.stage === stage.id)
                      .reduce((sum, opp) => sum + opp.value, 0);
                    
                    return (
                      <div 
                        key={stage.id}
                        className="bg-gray-50 rounded-lg p-3 text-center hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div 
                          className="w-3 h-3 rounded-full mx-auto mb-2"
                          style={{ backgroundColor: stage.color }}
                        />
                        <p className="text-xs text-uniq-muted mb-1">{stage.name}</p>
                        <p className="text-lg font-bold text-uniq-text">{count}</p>
                        <p className="text-xs text-uniq-primary">{formatCurrency(value)}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Oportunidades Recentes */}
            <Card className="border-uniq-border shadow-sm">
              <CardHeader className="border-b border-uniq-border px-6 py-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-uniq-text">Oportunidades Recentes</CardTitle>
                  <Link href="/crm/pipeline">
                    <Button variant="ghost" size="sm" className="gap-1 text-uniq-primary">
                      Ver Todas
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-uniq-border">
                  {recentOpportunities.map((opp: Opportunity) => (
                    <div 
                      key={opp.id}
                      className="p-4 hover:bg-uniq-platinum/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-uniq-text">{opp.title}</h4>
                            <Badge className={getStageBadgeColor(opp.stage)}>
                              {getStageName(opp.stage)}
                            </Badge>
                          </div>
                          <p className="text-sm text-uniq-muted mb-2">{opp.customerName}</p>
                          <div className="flex items-center gap-4 text-xs text-uniq-muted">
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              {formatCurrency(opp.value)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Percent className="w-3 h-3" />
                              {opp.probability}% probabilidade
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {opp.nextFollowUp ? new Date(opp.nextFollowUp).toLocaleDateString('pt-BR') : 'Sem follow-up'}
                            </span>
                          </div>
                        </div>
                        <div className="w-8 h-8 bg-uniq-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-xs text-uniq-primary font-medium">
                            {opp.customerName.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coluna Lateral */}
          <div className="space-y-6">
            {/* Acesso Rápido */}
            <Card className="border-uniq-border shadow-sm">
              <CardHeader className="border-b border-uniq-border px-6 py-4">
                <CardTitle className="text-lg font-semibold text-uniq-text">Acesso Rápido</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Link href="/crm/pipeline">
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-uniq-border hover:border-uniq-primary hover:bg-uniq-primary/5 transition-all cursor-pointer group">
                      <div className="w-10 h-10 bg-uniq-primary/10 rounded-lg flex items-center justify-center group-hover:bg-uniq-primary/20">
                        <Kanban className="w-5 h-5 text-uniq-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-uniq-text">Pipeline de Vendas</p>
                        <p className="text-xs text-uniq-muted">Kanban de oportunidades</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-uniq-muted group-hover:text-uniq-primary" />
                    </div>
                  </Link>

                  <Link href="/crm/clientes">
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-uniq-border hover:border-uniq-primary hover:bg-uniq-primary/5 transition-all cursor-pointer group">
                      <div className="w-10 h-10 bg-uniq-accent/10 rounded-lg flex items-center justify-center group-hover:bg-uniq-accent/20">
                        <Users className="w-5 h-5 text-uniq-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-uniq-text">Clientes</p>
                        <p className="text-xs text-uniq-muted">{mockCustomers.length} cadastrados</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-uniq-muted group-hover:text-uniq-primary" />
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Resumo por Estágio */}
            <Card className="border-uniq-border shadow-sm">
              <CardHeader className="border-b border-uniq-border px-6 py-4">
                <CardTitle className="text-lg font-semibold text-uniq-text">Por Estágio</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {mockPipelineStages.filter((s: PipelineStage) => s.id !== 'fechado_ganho' && s.id !== 'fechado_perdido').map((stage: PipelineStage) => {
                    const count = mockOpportunities.filter((opp: Opportunity) => opp.stage === stage.id).length;
                    const percentage = (count / totalOpportunities) * 100;
                    
                    return (
                      <div key={stage.id} className="flex items-center gap-3">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: stage.color }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-uniq-text">{stage.name}</span>
                            <span className="text-sm font-medium text-uniq-text">{count}</span>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all"
                              style={{ 
                                width: `${percentage}%`,
                                backgroundColor: stage.color 
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Clientes em Destaque */}
            <Card className="border-uniq-border shadow-sm">
              <CardHeader className="border-b border-uniq-border px-6 py-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-uniq-text">Top Clientes</CardTitle>
                  <Link href="/crm/clientes">
                    <Button variant="ghost" size="sm" className="gap-1 text-uniq-primary">
                      Ver Todos
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {[...mockCustomers]
                    .sort((a, b) => b.totalSpent - a.totalSpent)
                    .slice(0, 3)
                    .map((customer) => (
                    <div key={customer.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-uniq-primary/10 rounded-full flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-uniq-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-uniq-text truncate">{customer.name}</p>
                        <p className="text-xs text-uniq-muted">{customer.totalSpent > 0 ? formatCurrency(customer.totalSpent) : 'Sem compras'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

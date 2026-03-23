'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, RefreshCw, Printer, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { CaixaStatusCard, MovimentacaoList } from '@/components/pdv/caixa/caixa-status';
import { AberturaForm } from '@/components/pdv/caixa/abertura-form';
import { SangriaForm } from '@/components/pdv/caixa/sangria-form';
import { SuprimentoForm } from '@/components/pdv/caixa/suprimento-form';
import { FechamentoForm } from '@/components/pdv/caixa/fechamento-form';
import { mockCaixa, mockCaixaMovimentacoes } from '@/lib/mocks/pdv-sales';
import { Caixa, CaixaStatus, MovimentacaoType } from '@/types/caixa';
import { useToast } from '@/hooks/use-toast';

export default function CaixaPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [caixa, setCaixa] = useState<Caixa>(mockCaixa);
  const [movimentacoes, setMovimentacoes] = useState(mockCaixaMovimentacoes);
  
  // Dialog states
  const [showAbertura, setShowAbertura] = useState(false);
  const [showSangria, setShowSangria] = useState(false);
  const [showSuprimento, setShowSuprimento] = useState(false);
  const [showFechamento, setShowFechamento] = useState(false);

  const handleAbertura = (data: { openingAmount: number; operatorName: string }) => {
    const newCaixa: Caixa = {
      ...caixa,
      status: CaixaStatus.ABERTO,
      openedAt: new Date().toISOString(),
      openedBy: data.operatorName,
      openingAmount: data.openingAmount,
      currentBalance: data.openingAmount,
      expectedBalance: data.openingAmount,
      currentOperator: data.operatorName
    };
    
    setCaixa(newCaixa);
    setShowAbertura(false);
    
    toast({
      title: 'Caixa aberto',
      description: `Caixa aberto por ${data.operatorName} com valor de ${formatCurrency(data.openingAmount)}`
    });
  };

  const handleSangria = (data: { amount: number; reason: string }) => {
    const newMovimentacao = {
      id: `mov-${Date.now()}`,
      caixaId: caixa.id,
      type: MovimentacaoType.SANGRIA,
      amount: -data.amount,
      description: data.reason,
      timestamp: new Date().toISOString(),
      operator: caixa.currentOperator || 'Operador'
    };
    
    setMovimentacoes([newMovimentacao, ...movimentacoes]);
    setCaixa({
      ...caixa,
      currentBalance: caixa.currentBalance - data.amount
    });
    setShowSangria(false);
    
    toast({
      title: 'Sangria realizada',
      description: `Retirada de ${formatCurrency(data.amount)} realizada com sucesso`
    });
  };

  const handleSuprimento = (data: { amount: number; reason: string }) => {
    const newMovimentacao = {
      id: `mov-${Date.now()}`,
      caixaId: caixa.id,
      type: MovimentacaoType.SUPRIMENTO,
      amount: data.amount,
      description: data.reason,
      timestamp: new Date().toISOString(),
      operator: caixa.currentOperator || 'Operador'
    };
    
    setMovimentacoes([newMovimentacao, ...movimentacoes]);
    setCaixa({
      ...caixa,
      currentBalance: caixa.currentBalance + data.amount
    });
    setShowSuprimento(false);
    
    toast({
      title: 'Suprimento realizado',
      description: `Adição de ${formatCurrency(data.amount)} realizada com sucesso`
    });
  };

  const handleFechamento = (data: { cashAmount: number }) => {
    const difference = data.cashAmount - caixa.currentBalance;
    
    setCaixa({
      ...caixa,
      status: CaixaStatus.FECHADO,
      closedAt: new Date().toISOString(),
      closedBy: caixa.currentOperator,
      closingAmount: data.cashAmount,
      difference
    });
    setShowFechamento(false);
    
    toast({
      title: 'Caixa fechado',
      description: `Caixa fechado com diferença de ${formatCurrency(difference)}`
    });
  };

  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      
      <Header
        pageTitle="Caixa"
        breadcrumbs={[
          { label: 'Início', href: '/dashboard' },
          { label: 'PDV', href: '/pdv' },
          { label: 'Caixa' }
        ]}
      />

      {/* Main Content */}
      <main className="ml-0 lg:ml-64 pt-16 p-4 lg:p-6 min-h-[calc(100vh-64px)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Status e Ações */}
          <div className="lg:col-span-2 space-y-6">
            <CaixaStatusCard
              caixa={caixa}
              onOpenCaixa={() => setShowAbertura(true)}
              onSangria={() => setShowSangria(true)}
              onSuprimento={() => setShowSuprimento(true)}
              onFechar={() => setShowFechamento(true)}
            />

            {/* Resumo do Dia */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Dia</CardTitle>
                <CardDescription>Visão geral das vendas e movimentações</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <ResumoCard
                    label="Total em Vendas"
                    value={caixa.totalSales}
                    isCurrency
                  />
                  <ResumoCard
                    label="Quantidade"
                    value={caixa.salesCount}
                  />
                  <ResumoCard
                    label="Itens Vendidos"
                    value={caixa.itemsCount}
                  />
                  <ResumoCard
                    label="Ticket Médio"
                    value={caixa.salesCount > 0 ? caixa.totalSales / caixa.salesCount : 0}
                    isCurrency
                  />
                </div>
              </CardContent>
            </Card>

            {/* Movimentações */}
            <MovimentacaoList movimentacoes={movimentacoes} />
          </div>

          {/* Right Column - Ações Rápidas */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {caixa.status === 'fechado' ? (
                  <Button 
                    className="w-full bg-[#86cb92] hover:bg-[#86cb92]/90 text-[#3e5653]"
                    onClick={() => setShowAbertura(true)}
                  >
                    Abrir Caixa
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setShowSangria(true)}
                    >
                      Registrar Sangria
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setShowSuprimento(true)}
                    >
                      Registrar Suprimento
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={() => setShowFechamento(true)}
                    >
                      Fechar Caixa
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exportar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar para Excel
                </Button>
                <Button variant="outline" className="w-full">
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimir Relatório
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Dialogs */}
      <Dialog open={showAbertura} onOpenChange={setShowAbertura}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Abrir Caixa</DialogTitle>
          </DialogHeader>
          <AberturaForm
            onSubmit={handleAbertura}
            onCancel={() => setShowAbertura(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showSangria} onOpenChange={setShowSangria}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Sangria</DialogTitle>
          </DialogHeader>
          <SangriaForm
            onSubmit={handleSangria}
            onCancel={() => setShowSangria(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showSuprimento} onOpenChange={setShowSuprimento}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Suprimento</DialogTitle>
          </DialogHeader>
          <SuprimentoForm
            onSubmit={handleSuprimento}
            onCancel={() => setShowSuprimento(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showFechamento} onOpenChange={setShowFechamento}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Fechar Caixa</DialogTitle>
          </DialogHeader>
          <FechamentoForm
            caixa={caixa}
            onSubmit={handleFechamento}
            onCancel={() => setShowFechamento(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ResumoCard({ 
  label, 
  value, 
  isCurrency = false 
}: { 
  label: string; 
  value: number;
  isCurrency?: boolean;
}) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-bold text-[#3e5653]">
        {isCurrency ? formatCurrency(value) : value}
      </p>
    </div>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

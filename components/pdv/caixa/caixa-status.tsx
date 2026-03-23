'use client';

import { 
  ArrowDown, 
  ArrowUp, 
  Lock, 
  Unlock, 
  DollarSign,
  TrendingUp,
  ShoppingCart,
  CreditCard,
  QrCode
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Caixa, CaixaMovimentacao, CaixaStatus, MovimentacaoType } from '@/types/caixa';
import { cn } from '@/lib/utils';

// Re-export forms from individual files
export { AberturaForm } from './abertura-form';
export { SangriaForm } from './sangria-form';
export { SuprimentoForm } from './suprimento-form';
export { FechamentoForm } from './fechamento-form';

interface CaixaStatusProps {
  caixa: Caixa;
  onOpenCaixa?: () => void;
  onSangria?: () => void;
  onSuprimento?: () => void;
  onFechar?: () => void;
}

export function CaixaStatusCard({ caixa, onSangria, onSuprimento, onFechar }: CaixaStatusProps) {
  const isOpen = caixa.status === CaixaStatus.ABERTO;

  return (
    <Card className={cn(
      "border-l-4",
      isOpen ? 'border-l-green-500' : 'border-l-red-500'
    )}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              {isOpen ? (
                <>
                  <Unlock className="w-5 h-5 text-green-500" />
                  <span className="text-green-600">Caixa Aberto</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 text-red-500" />
                  <span className="text-red-600">Caixa Fechado</span>
                </>
              )}
            </CardTitle>
            <CardDescription>
              Operador: {caixa.currentOperator}
            </CardDescription>
          </div>
          
          <div className="text-right">
            <p className="text-3xl font-bold text-[#3e5653]">
              {formatCurrency(caixa.currentBalance)}
            </p>
            <p className="text-sm text-gray-500">Saldo atual</p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            icon={<DollarSign className="w-4 h-4" />}
            label="Dinheiro"
            value={caixa.totalCash}
            color="bg-green-100 text-green-600"
          />
          <MetricCard
            icon={<CreditCard className="w-4 h-4" />}
            label="Cartão"
            value={caixa.totalCard}
            color="bg-blue-100 text-blue-600"
          />
          <MetricCard
            icon={<QrCode className="w-4 h-4" />}
            label="Pix"
            value={caixa.totalPix}
            color="bg-purple-100 text-purple-600"
          />
          <MetricCard
            icon={<ShoppingCart className="w-4 h-4" />}
            label="Vendas"
            value={caixa.salesCount}
            color="bg-amber-100 text-amber-600"
            isCount
          />
        </div>
      </CardContent>

      {isOpen && (
        <CardFooter className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={onSangria} className="flex-1">
            <ArrowDown className="w-4 h-4 mr-2" />
            Sangria
          </Button>
          <Button variant="outline" onClick={onSuprimento} className="flex-1">
            <ArrowUp className="w-4 h-4 mr-2" />
            Suprimento
          </Button>
          <Button variant="destructive" onClick={onFechar} className="flex-1">
            <Lock className="w-4 h-4 mr-2" />
            Fechar Caixa
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

function MetricCard({ 
  icon, 
  label, 
  value, 
  color,
  isCount = false
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: number; 
  color: string;
  isCount?: boolean;
}) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-2", color)}>
        {icon}
      </div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-bold text-[#1f2937]">
        {isCount ? value : formatCurrency(value)}
      </p>
    </div>
  );
}

interface MovimentacaoListProps {
  movimentacoes: CaixaMovimentacao[];
}

export function MovimentacaoList({ movimentacoes }: MovimentacaoListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Movimentações do Dia
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {movimentacoes.map((mov) => (
            <MovimentacaoItem key={mov.id} movimentacao={mov} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function MovimentacaoItem({ movimentacao }: { movimentacao: CaixaMovimentacao }) {
  const isPositive = movimentacao.amount >= 0;
  const isNegative = movimentacao.amount < 0;

  const getTypeIcon = (type: MovimentacaoType) => {
    switch (type) {
      case MovimentacaoType.ABERTURA:
        return <Unlock className="w-4 h-4" />;
      case MovimentacaoType.SANGRIA:
        return <ArrowDown className="w-4 h-4" />;
      case MovimentacaoType.SUPRIMENTO:
        return <ArrowUp className="w-4 h-4" />;
      case MovimentacaoType.VENDA:
        return <ShoppingCart className="w-4 h-4" />;
      case MovimentacaoType.ESTORNO:
        return <TrendingUp className="w-4 h-4 rotate-180" />;
      case MovimentacaoType.FECHAMENTO:
        return <Lock className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
      <div className={cn(
        "w-10 h-10 rounded-lg flex items-center justify-center",
        isPositive && !isNegative ? 'bg-green-100 text-green-600' : 
        isNegative ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-600'
      )}>
        {getTypeIcon(movimentacao.type)}
      </div>

      <div className="flex-1">
        <p className="font-medium text-sm">{movimentacao.description}</p>
        <p className="text-xs text-gray-500">
          {new Date(movimentacao.timestamp).toLocaleTimeString('pt-BR')} • {movimentacao.operator}
        </p>
      </div>

      <p className={cn(
        "font-bold",
        isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-600'
      )}>
        {isPositive ? '+' : ''}{formatCurrency(movimentacao.amount)}
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

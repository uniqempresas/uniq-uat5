'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, Lock } from 'lucide-react';
import { Caixa } from '@/types/caixa';

interface FechamentoFormProps {
  caixa: Caixa;
  onSubmit: (data: { cashAmount: number; cardAmount: number; pixAmount: number; observations?: string; supervisorPassword: string }) => void;
  onCancel: () => void;
}

export function FechamentoForm({ caixa, onSubmit, onCancel }: FechamentoFormProps) {
  const [cashAmount, setCashAmount] = useState(caixa.totalCash.toString());
  const [cardAmount, setCardAmount] = useState(caixa.totalCard.toString());
  const [pixAmount, setPixAmount] = useState(caixa.totalPix.toString());
  const [observations, setObservations] = useState('');
  const [supervisorPassword, setSupervisorPassword] = useState('');

  const totalCounted = parseFloat(cashAmount || '0') + parseFloat(cardAmount || '0') + parseFloat(pixAmount || '0');
  const difference = totalCounted - caixa.currentBalance;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      cashAmount: parseFloat(cashAmount) || 0,
      cardAmount: parseFloat(cardAmount) || 0,
      pixAmount: parseFloat(pixAmount) || 0,
      observations,
      supervisorPassword
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-red-800">
          <p className="font-medium">Atenção</p>
          <p>O fechamento de caixa é uma operação irreversível. Verifique os valores antes de confirmar.</p>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">Saldo esperado no sistema</p>
        <p className="text-2xl font-bold text-[#3e5653]">{formatCurrency(caixa.currentBalance)}</p>
      </div>

      <div className="space-y-3">
        <p className="font-medium">Valores Contados</p>
        
        <div className="space-y-2">
          <Label htmlFor="cashAmount">Dinheiro</Label>
          <Input
            id="cashAmount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0,00"
            value={cashAmount}
            onChange={(e) => setCashAmount(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cardAmount">Cartão</Label>
          <Input
            id="cardAmount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0,00"
            value={cardAmount}
            onChange={(e) => setCardAmount(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="pixAmount">Pix</Label>
          <Input
            id="pixAmount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0,00"
            value={pixAmount}
            onChange={(e) => setPixAmount(e.target.value)}
          />
        </div>
      </div>

      <div className="p-4 bg-gray-100 rounded-lg">
        <div className="flex justify-between text-sm mb-1">
          <span>Total Contado:</span>
          <span className="font-medium">{formatCurrency(totalCounted)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span>Diferença:</span>
          <span className={difference >= 0 ? 'text-green-600' : 'text-red-600'}>
            {difference > 0 ? '+' : ''}{formatCurrency(difference)}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="observations">Observações</Label>
        <Textarea
          id="observations"
          placeholder="Observações sobre o fechamento (opcional)"
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="supervisorPassword" className="flex items-center gap-2">
          <Lock className="w-4 h-4" />
          Senha do Supervisor *
        </Label>
        <Input
          id="supervisorPassword"
          type="password"
          placeholder="••••••"
          value={supervisorPassword}
          onChange={(e) => setSupervisorPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancelar
        </Button>
        <Button 
          type="submit" 
          variant="destructive"
          className="flex-1"
        >
          Fechar Caixa
        </Button>
      </div>
    </form>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

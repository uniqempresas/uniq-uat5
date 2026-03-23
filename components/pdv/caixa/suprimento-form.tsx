'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Info } from 'lucide-react';

interface SuprimentoFormProps {
  onSubmit: (data: { amount: number; reason: string }) => void;
  onCancel: () => void;
}

export function SuprimentoForm({ onSubmit, onCancel }: SuprimentoFormProps) {
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      amount: parseFloat(amount) || 0,
      reason
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-medium">Suprimento</p>
          <p>O suprimento adiciona dinheiro ao caixa, geralmente para troco.</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Valor do Suprimento *</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="0,00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="reason">Motivo *</Label>
        <Input
          id="reason"
          placeholder="Informe o motivo do suprimento"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancelar
        </Button>
        <Button 
          type="submit" 
          className="flex-1 bg-[#86cb92] hover:bg-[#86cb92]/90 text-[#3e5653]"
        >
          Confirmar Suprimento
        </Button>
      </div>
    </form>
  );
}

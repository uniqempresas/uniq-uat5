'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface AberturaFormProps {
  onSubmit: (data: { openingAmount: number; operatorName: string; observations?: string }) => void;
  onCancel: () => void;
  defaultOperator?: string;
}

export function AberturaForm({ onSubmit, onCancel, defaultOperator }: AberturaFormProps) {
  const [amount, setAmount] = useState('');
  const [operator, setOperator] = useState(defaultOperator || '');
  const [observations, setObservations] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      openingAmount: parseFloat(amount) || 0,
      operatorName: operator,
      observations
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="openingAmount">Valor de Abertura *</Label>
        <Input
          id="openingAmount"
          type="number"
          step="0.01"
          min="0"
          placeholder="0,00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <p className="text-xs text-gray-500">Valor inicial em dinheiro no caixa</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="operator">Operador *</Label>
        <Input
          id="operator"
          placeholder="Nome do operador"
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="observations">Observações</Label>
        <Textarea
          id="observations"
          placeholder="Observações opcionais"
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
          rows={3}
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
          Abrir Caixa
        </Button>
      </div>
    </form>
  );
}

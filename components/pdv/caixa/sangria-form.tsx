'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertTriangle } from 'lucide-react';

interface SangriaFormProps {
  onSubmit: (data: { amount: number; reason: string; supervisorPassword?: string }) => void;
  onCancel: () => void;
}

export function SangriaForm({ onSubmit, onCancel }: SangriaFormProps) {
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [supervisorPassword, setSupervisorPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      amount: parseFloat(amount) || 0,
      reason,
      supervisorPassword
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <p className="font-medium">Atenção</p>
          <p>A sangria retira dinheiro do caixa. Esta operação requer senha do supervisor.</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Valor da Sangria *</Label>
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
          placeholder="Informe o motivo da retirada"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="supervisorPassword">Senha do Supervisor *</Label>
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
          Confirmar Sangria
        </Button>
      </div>
    </form>
  );
}

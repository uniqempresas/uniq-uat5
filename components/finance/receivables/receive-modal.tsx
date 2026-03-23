'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Receivable, PaymentMethod } from '@/lib/types/finance';
import { formatCurrency } from '@/lib/utils/currency';
import { format } from 'date-fns';

interface ReceiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  receivable: Receivable | null;
  onConfirm: (data: {
    id: number;
    paidDate: string;
    paymentMethod: PaymentMethod;
    discount: number;
    interest: number;
    accountId?: number;
  }) => void;
}

const paymentMethods: { value: PaymentMethod; label: string }[] = [
  { value: 'cash', label: 'Dinheiro' },
  { value: 'credit_card', label: 'Cartão de Crédito' },
  { value: 'debit_card', label: 'Cartão de Débito' },
  { value: 'pix', label: 'PIX' },
  { value: 'bank_transfer', label: 'Transferência Bancária' },
  { value: 'boleto', label: 'Boleto' }
];

export function ReceiveModal({
  isOpen,
  onClose,
  receivable,
  onConfirm
}: ReceiveModalProps) {
  const [paidDate, setPaidDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [discount, setDiscount] = useState('');
  const [interest, setInterest] = useState('');

  if (!receivable) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      id: receivable.id,
      paidDate,
      paymentMethod,
      discount: Number(discount) || 0,
      interest: Number(interest) || 0
    });
    onClose();
  };

  const finalAmount = receivable.amount 
    - (Number(discount) || 0) 
    + (Number(interest) || 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar Recebimento</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-uniq-platinum/50 p-4 rounded-lg">
            <p className="text-sm text-uniq-muted">Título</p>
            <p className="font-medium">{receivable.description}</p>
            <p className="text-sm text-uniq-muted mt-1">Cliente</p>
            <p className="font-medium">{receivable.client}</p>
            <p className="text-2xl font-bold text-uniq-accent mt-2">
              {formatCurrency(receivable.amount)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paidDate">Data do Recebimento</Label>
              <Input
                id="paidDate"
                type="date"
                value={paidDate}
                onChange={(e) => setPaidDate(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Forma de Pagamento</Label>
              <Select value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discount">Desconto (R$)</Label>
              <Input
                id="discount"
                type="number"
                step="0.01"
                min="0"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="0,00"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="interest">Juros (R$)</Label>
              <Input
                id="interest"
                type="number"
                step="0.01"
                min="0"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                placeholder="0,00"
              />
            </div>
          </div>

          <div className="border-t border-uniq-border pt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-uniq-muted">Valor Final</span>
              <span className="text-xl font-bold text-uniq-accent">
                {formatCurrency(finalAmount)}
              </span>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-uniq-accent hover:bg-uniq-accent/90">
              Confirmar Recebimento
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

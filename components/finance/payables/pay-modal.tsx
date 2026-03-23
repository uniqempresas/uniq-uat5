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
import { Payable, PaymentMethod } from '@/lib/types/finance';
import { formatCurrency } from '@/lib/utils/currency';
import { format } from 'date-fns';
import { mockBankAccounts } from '@/lib/mocks/finance';

interface PayModalProps {
  isOpen: boolean;
  onClose: () => void;
  payable: Payable | null;
  onConfirm: (data: {
    id: number;
    paidDate: string;
    paymentMethod: PaymentMethod;
    accountId: number;
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

export function PayModal({
  isOpen,
  onClose,
  payable,
  onConfirm
}: PayModalProps) {
  const [paidDate, setPaidDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank_transfer');
  const [accountId, setAccountId] = useState<number>(mockBankAccounts[0]?.id || 1);

  if (!payable) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      id: payable.id,
      paidDate,
      paymentMethod,
      accountId
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar Pagamento</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-uniq-platinum/50 p-4 rounded-lg">
            <p className="text-sm text-uniq-muted">Título</p>
            <p className="font-medium">{payable.description}</p>
            <p className="text-sm text-uniq-muted mt-1">Fornecedor</p>
            <p className="font-medium">{payable.supplier}</p>
            <p className="text-2xl font-bold text-red-600 mt-2">
              {formatCurrency(payable.amount)}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paidDate">Data do Pagamento</Label>
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
            <Select 
              value={paymentMethod} 
              onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}
            >
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

          <div className="space-y-2">
            <Label htmlFor="account">Conta Bancária</Label>
            <Select 
              value={accountId.toString()} 
              onValueChange={(v) => setAccountId(Number(v))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma conta" />
              </SelectTrigger>
              <SelectContent>
                {mockBankAccounts.map((account) => (
                  <SelectItem key={account.id} value={account.id.toString()}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="destructive">
              Confirmar Pagamento
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Banknote, 
  CreditCard, 
  QrCode, 
  Wallet,
  User,
  X,
  Check,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CartPDV } from '@/types/pdv';
import { Payment, PaymentMethodType } from '@/types/payment';
import { Sale } from '@/types/venda';
import { cn } from '@/lib/utils';
import { mockCustomers } from '@/lib/mocks/pdv-products';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartPDV;
  onComplete: () => Promise<Partial<Sale> | undefined>;
}

export function CheckoutModal({ isOpen, onClose, cart, onComplete }: CheckoutModalProps) {
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<typeof mockCustomers[0] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [completedSale, setCompletedSale] = useState<Partial<Sale> | null>(null);

  const totalPaid = payments.reduce((acc, p) => acc + p.amount, 0);
  const remaining = Math.max(0, cart.total - totalPaid);

  useEffect(() => {
    if (!isOpen) {
      setPayments([]);
      setSelectedCustomer(null);
      setShowSuccess(false);
      setCompletedSale(null);
    }
  }, [isOpen]);

  const handleAddPayment = (payment: Payment) => {
    setPayments(prev => [...prev, payment]);
  };

  const handleRemovePayment = (id: string) => {
    setPayments(prev => prev.filter(p => p.id !== id));
  };

  const handleComplete = async () => {
    if (remaining > 0) return;
    
    setIsProcessing(true);
    try {
      const sale = await onComplete();
      if (sale) {
        setCompletedSale(sale);
        setShowSuccess(true);
        
        // Disparar confetti
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3e5653', '#86cb92', '#ffffff']
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNewSale = () => {
    setShowSuccess(false);
    setCompletedSale(null);
    setPayments([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg md:max-w-2xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto p-0 sm:p-6">
        <DialogHeader className="px-4 pt-4 sm:px-0 sm:pt-0">
          <DialogTitle className="text-lg md:text-xl">
            {showSuccess ? 'Venda Concluída' : 'Finalizar Venda'}
          </DialogTitle>
        </DialogHeader>

        {showSuccess && completedSale ? (
          <SuccessView 
            sale={completedSale} 
            onNewSale={handleNewSale}
          />
        ) : (
          <div className="space-y-4 md:space-y-6 px-4 pb-4 sm:px-0 sm:pb-0">
            {/* Sale Summary */}
            <div className="bg-[#3e5653]/5 p-3 md:p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatCurrency(cart.subtotal)}</span>
              </div>
              {cart.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Desconto</span>
                  <span>-{formatCurrency(cart.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg md:text-xl font-bold pt-2 border-t">
                <span>Total</span>
                <span className="text-[#3e5653]">{formatCurrency(cart.total)}</span>
              </div>
            </div>

            {/* Customer Selection */}
            <CustomerSelect 
              value={selectedCustomer}
              onChange={setSelectedCustomer}
            />

            {/* Payment Methods */}
            <PaymentSection
              remaining={remaining}
              total={cart.total}
              payments={payments}
              onAdd={handleAddPayment}
              onRemove={handleRemovePayment}
            />

            {/* Actions - Touch optimized buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button 
                variant="outline" 
                onClick={onClose} 
                className="flex-1 min-h-[52px] text-base"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleComplete}
                disabled={remaining > 0 || isProcessing}
                className={cn(
                  "flex-1 min-h-[52px] text-base bg-[#86cb92] hover:bg-[#86cb92]/90 text-[#3e5653] font-semibold",
                  remaining > 0 && "opacity-50 cursor-not-allowed"
                )}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>Finalizar Venda</>
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function CustomerSelect({ 
  value, 
  onChange 
}: { 
  value: typeof mockCustomers[0] | null; 
  onChange: (c: typeof mockCustomers[0] | null) => void;
}) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filtered = mockCustomers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.includes(search)
  );

  if (value) {
    return (
      <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#3e5653] rounded-full flex items-center justify-center text-white">
            <User className="w-5 h-5" />
          </div>
          <div>
            <p className="font-medium">{value.name}</p>
            <p className="text-sm text-gray-500">{value.phone}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => onChange(null)} className="min-h-[44px] min-w-[44px]">
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label className="text-base font-medium">Cliente</Label>
      <div className="relative">
        <Input
          placeholder="Buscar cliente por nome ou telefone..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="min-h-[48px] text-base"
        />
        
        {isOpen && search && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filtered.map(c => (
              <button
                key={c.id}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 min-h-[52px]"
                onClick={() => {
                  onChange(c);
                  setIsOpen(false);
                  setSearch('');
                }}
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-sm text-gray-500">{c.phone}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PaymentSection({ 
  remaining, 
  total,
  payments,
  onAdd,
  onRemove
}: { 
  remaining: number; 
  total: number;
  payments: Payment[];
  onAdd: (p: Payment) => void;
  onRemove: (id: string) => void;
}) {
  const [activeTab, setActiveTab] = useState('dinheiro');
  const [cashAmount, setCashAmount] = useState('');
  const [cardAmount, setCardAmount] = useState('');

  const handleCashPayment = () => {
    const amount = parseFloat(cashAmount);
    if (amount > 0) {
      onAdd({
        id: Math.random().toString(36),
        method: PaymentMethodType.DINHEIRO,
        amount: Math.min(amount, total),
        receivedAmount: amount,
        change: Math.max(0, amount - remaining),
        status: 'approved'
      });
      setCashAmount('');
    }
  };

  const handleCardPayment = () => {
    const amount = parseFloat(cardAmount);
    if (amount > 0) {
      onAdd({
        id: Math.random().toString(36),
        method: PaymentMethodType.CARTAO_CREDITO,
        amount: Math.min(amount, remaining),
        status: 'approved'
      });
      setCardAmount('');
    }
  };

  const handlePixPayment = () => {
    onAdd({
      id: Math.random().toString(36),
      method: PaymentMethodType.PIX,
      amount: remaining,
      status: 'approved'
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium">Forma de Pagamento</Label>
        <div className="text-right">
          <p className="text-xs md:text-sm text-gray-600">Restante</p>
          <p className={cn(
            "text-lg md:text-xl font-bold",
            remaining > 0 ? 'text-amber-600' : 'text-green-600'
          )}>
            {formatCurrency(remaining)}
          </p>
        </div>
      </div>

      {payments.length > 0 && (
        <div className="space-y-2">
          {payments.map(p => (
            <div key={p.id} className="flex items-center justify-between p-2 md:p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="capitalize text-sm md:text-base">{getPaymentMethodName(p.method)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm md:text-base">{formatCurrency(p.amount)}</span>
                <Button variant="ghost" size="sm" onClick={() => onRemove(p.id)} className="min-h-[36px] min-w-[36px]">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {remaining > 0 && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Mobile: Scrollable tabs, Desktop: Grid tabs */}
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="dinheiro" className="text-xs md:text-sm">
              <Banknote className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Dinheiro</span>
              <span className="sm:hidden">$</span>
            </TabsTrigger>
            <TabsTrigger value="cartao" className="text-xs md:text-sm">
              <CreditCard className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Cartão</span>
              <span className="sm:hidden">CC</span>
            </TabsTrigger>
            <TabsTrigger value="pix" className="text-xs md:text-sm">
              <QrCode className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Pix</span>
              <span className="sm:hidden">QR</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dinheiro" className="space-y-4">
            <div className="space-y-2">
              <Label className="text-base font-medium">Valor Recebido</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0,00"
                value={cashAmount}
                onChange={(e) => setCashAmount(e.target.value)}
                className="min-h-[52px] text-lg"
              />
            </div>
            
            {parseFloat(cashAmount) > 0 && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>Troco:</span>
                  <span className="font-bold text-green-600">
                    {formatCurrency(Math.max(0, parseFloat(cashAmount) - remaining))}
                  </span>
                </div>
              </div>
            )}
            
            <Button onClick={handleCashPayment} className="w-full min-h-[52px] text-base">
              Adicionar Pagamento
            </Button>
          </TabsContent>

          <TabsContent value="cartao" className="space-y-4">
            <div className="space-y-2">
              <Label className="text-base font-medium">Valor</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0,00"
                value={cardAmount}
                onChange={(e) => setCardAmount(e.target.value)}
                className="min-h-[52px] text-lg"
              />
            </div>
            
            <Button onClick={handleCardPayment} className="w-full min-h-[52px] text-base">
              Adicionar Pagamento
            </Button>
          </TabsContent>

          <TabsContent value="pix" className="space-y-4">
            <div className="flex flex-col items-center p-4 md:p-6 bg-gray-50 rounded-lg">
              <div className="w-40 h-40 md:w-48 md:h-48 bg-white p-3 md:p-4 rounded-xl shadow-sm">
                <QrCode className="w-full h-full" />
              </div>
              <p className="mt-4 text-sm md:text-base text-gray-600 text-center px-4">
                Escaneie o QR Code com seu app bancário
              </p>
              <p className="text-xl md:text-2xl font-bold text-[#3e5653] mt-2">
                {formatCurrency(remaining)}
              </p>
            </div>
            
            <Button onClick={handlePixPayment} className="w-full min-h-[52px] text-base">
              Confirmar Pagamento Pix
            </Button>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

function SuccessView({ 
  sale, 
  onNewSale 
}: { 
  sale: Partial<Sale>; 
  onNewSale: () => void;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center text-center py-6 md:py-8 space-y-4 md:space-y-6 px-4">
      <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
        <Check className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl md:text-2xl font-bold text-green-600">Venda Concluída!</h3>
        <p className="text-sm md:text-base text-gray-600">
          Venda #{sale.number} finalizada com sucesso
        </p>
        <p className="text-2xl md:text-3xl font-bold text-[#3e5653]">
          {formatCurrency(sale.total || 0)}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
        <Button 
          variant="outline" 
          onClick={() => router.push('/pdv/relatorios')}
          className="flex-1 min-h-[52px] text-base"
        >
          Ver Relatórios
        </Button>
        <Button 
          onClick={onNewSale}
          className="flex-1 min-h-[52px] text-base bg-[#86cb92] hover:bg-[#86cb92]/90 text-[#3e5653] font-semibold"
        >
          Nova Venda
        </Button>
      </div>
    </div>
  );
}

function getPaymentMethodName(method: PaymentMethodType): string {
  const names: Record<PaymentMethodType, string> = {
    [PaymentMethodType.DINHEIRO]: 'Dinheiro',
    [PaymentMethodType.CARTAO_CREDITO]: 'Cartão de Crédito',
    [PaymentMethodType.CARTAO_DEBITO]: 'Cartão de Débito',
    [PaymentMethodType.PIX]: 'Pix',
    [PaymentMethodType.BOLETO]: 'Boleto',
    [PaymentMethodType.VALE]: 'Vale',
    [PaymentMethodType.CREDITO_LOJA]: 'Crédito Loja'
  };
  return names[method];
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

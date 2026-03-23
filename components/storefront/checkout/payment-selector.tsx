'use client';

import React, { useState } from 'react';
import { CreditCard, QrCode, Barcode } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { formatPrice } from '@/lib/utils/formatters';
import { mockPaymentMethods } from '@/lib/mocks/storefront';

interface PaymentSelectorProps {
  selectedMethod: string;
  onSelect: (methodId: string) => void;
  total: number;
}

const iconMap = {
  'credit-card': CreditCard,
  'qr-code': QrCode,
  'barcode': Barcode,
};

export function PaymentSelector({ selectedMethod, onSelect, total }: PaymentSelectorProps) {
  const [installments, setInstallments] = useState(1);
  
  return (
    <RadioGroup value={selectedMethod} onValueChange={onSelect} className="space-y-3">
      {mockPaymentMethods.map((method) => {
        const Icon = iconMap[method.icon as keyof typeof iconMap] || CreditCard;
        const isSelected = selectedMethod === method.id;
        
        // Calcular valor final com desconto
        const finalValue = method.discount
          ? total * (1 - method.discount / 100)
          : total;
        
        return (
          <div key={method.id}>
            <Card
              className={`p-4 cursor-pointer transition-all ${
                isSelected
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'hover:border-border'
              }`}
              onClick={() => onSelect(method.id)}
            >
              <div className="flex items-start gap-4">
                <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <Label
                        htmlFor={method.id}
                        className="font-semibold cursor-pointer"
                      >
                        {method.name}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {method.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Opções específicas por método */}
                  {isSelected && method.id === 'credit_card' && method.installments && (
                    <div className="mt-4 pl-13">
                      <p className="text-sm font-medium mb-2">Parcelamento:</p>
                      <select
                        value={installments}
                        onChange={(e) => setInstallments(Number(e.target.value))}
                        className="w-full p-2 border border-border rounded-lg text-sm"
                      >
                        {method.installments.map((inst) => (
                          <option key={inst.times} value={inst.times}>
                            {inst.times}x de {formatPrice(inst.value)}
                            {inst.times === 1 ? ' (à vista)' : ' sem juros'}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  
                  {isSelected && method.discount && method.discount > 0 && (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-700">
                        Desconto de {method.discount}% aplicado!
                      </p>
                      <p className="text-lg font-bold text-green-700">
                        {formatPrice(finalValue)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </RadioGroup>
  );
}

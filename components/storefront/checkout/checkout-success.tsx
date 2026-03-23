'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, Package, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CustomerData, AddressData } from '@/types/checkout';
import { formatPrice } from '@/lib/utils/formatters';

interface CheckoutSuccessProps {
  orderId: string;
  customer: CustomerData;
  address: AddressData;
  paymentMethod: string;
  total: number;
}

export function CheckoutSuccess({
  orderId,
  customer,
  address,
  paymentMethod,
  total,
}: CheckoutSuccessProps) {
  const paymentMethodLabels: Record<string, string> = {
    credit_card: 'Cartão de Crédito',
    pix: 'Pix',
    boleto: 'Boleto Bancário',
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Pedido Confirmado!
        </h1>
        <p className="text-muted-foreground">
          Obrigado pela sua compra, {customer.name.split(' ')[0]}!
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4 pb-4 border-b">
            <div>
              <p className="text-sm text-muted-foreground">Número do Pedido</p>
              <p className="text-lg font-semibold">{orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold text-primary">{formatPrice(total)}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Endereço de Entrega</p>
                <p className="text-sm text-muted-foreground">
                  {address.street}, {address.number}
                  {address.complement && ` - ${address.complement}`}
                  <br />
                  {address.neighborhood} - {address.city}/{address.state}
                  <br />
                  CEP: {address.zipCode}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Forma de Pagamento</p>
                <p className="text-sm text-muted-foreground">
                  {paymentMethodLabels[paymentMethod] || paymentMethod}
                </p>
                {paymentMethod === 'pix' && (
                  <p className="text-sm text-green-600 mt-1">
                    Pagamento confirmado ✓
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <Button className="w-full" size="lg" asChild>
          <Link href="/">
            Continuar Comprando
            <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
        
        <Button variant="outline" className="w-full" asChild>
          <Link href="/pedidos">
            Acompanhar Pedido
          </Link>
        </Button>
      </div>
    </div>
  );
}

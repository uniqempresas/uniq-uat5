'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckoutSteps } from '@/components/storefront/checkout/checkout-steps';
import { CheckoutForm } from '@/components/storefront/checkout/checkout-form';
import { AddressForm } from '@/components/storefront/checkout/address-form';
import { PaymentSelector } from '@/components/storefront/checkout/payment-selector';
import { CheckoutSuccess } from '@/components/storefront/checkout/checkout-success';
import { useCart } from '@/contexts/cart-context';
import { CustomerData, AddressData, CheckoutStep } from '@/types/checkout';
import { toast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/utils/formatters';

const INITIAL_CUSTOMER_DATA: CustomerData = {
  name: '',
  email: '',
  phone: '',
};

const INITIAL_ADDRESS_DATA: AddressData = {
  zipCode: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, summary, clearCart } = useCart();
  
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('dados');
  const [customerData, setCustomerData] = useState<CustomerData>(INITIAL_CUSTOMER_DATA);
  const [addressData, setAddressData] = useState<AddressData>(INITIAL_ADDRESS_DATA);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  // Validação de dados
  const validateCustomerData = (): boolean => {
    if (!customerData.name.trim()) {
      toast({ title: 'Erro', description: 'Nome é obrigatório' });
      return false;
    }
    if (!customerData.email.trim() || !customerData.email.includes('@')) {
      toast({ title: 'Erro', description: 'E-mail válido é obrigatório' });
      return false;
    }
    if (!customerData.phone.trim()) {
      toast({ title: 'Erro', description: 'Telefone é obrigatório' });
      return false;
    }
    return true;
  };
  
  const validateAddressData = (): boolean => {
    if (!addressData.zipCode.trim()) {
      toast({ title: 'Erro', description: 'CEP é obrigatório' });
      return false;
    }
    if (!addressData.street.trim()) {
      toast({ title: 'Erro', description: 'Rua é obrigatória' });
      return false;
    }
    if (!addressData.number.trim()) {
      toast({ title: 'Erro', description: 'Número é obrigatório' });
      return false;
    }
    if (!addressData.neighborhood.trim()) {
      toast({ title: 'Erro', description: 'Bairro é obrigatório' });
      return false;
    }
    return true;
  };
  
  const handleNext = () => {
    if (currentStep === 'dados') {
      if (!validateCustomerData() || !validateAddressData()) return;
      setCurrentStep('pagamento');
    } else if (currentStep === 'pagamento') {
      handleSubmit();
    }
  };
  
  const handleBack = () => {
    if (currentStep === 'pagamento') {
      setCurrentStep('dados');
    }
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simula chamada à API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newOrderId = `ORD-${Date.now()}`;
    setOrderId(newOrderId);
    setIsComplete(true);
    setCurrentStep('confirmacao');
    clearCart();
    
    toast({
      title: 'Pedido realizado!',
      description: `Seu pedido ${newOrderId} foi confirmado.`,
    });
    
    setIsSubmitting(false);
  };
  
  // Redireciona se carrinho vazio
  if (items.length === 0 && !isComplete) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Carrinho vazio
        </h1>
        <p className="text-muted-foreground mb-6">
          Adicione produtos para finalizar a compra
        </p>
        <Button onClick={() => router.push('/')}>Continuar Comprando</Button>
      </div>
    );
  }
  
  // Tela de sucesso
  if (isComplete) {
    return (
      <CheckoutSuccess
        orderId={orderId}
        customer={customerData}
        address={addressData}
        paymentMethod={paymentMethod}
        total={summary.total}
      />
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <CheckoutSteps currentStep={currentStep} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Formulários */}
        <div className="lg:col-span-2 space-y-6">
          {currentStep === 'dados' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Dados Pessoais</CardTitle>
                </CardHeader>
                <CardContent>
                  <CheckoutForm
                    data={customerData}
                    onChange={setCustomerData}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Endereço de Entrega</CardTitle>
                </CardHeader>
                <CardContent>
                  <AddressForm
                    data={addressData}
                    onChange={setAddressData}
                  />
                </CardContent>
              </Card>
            </>
          )}
          
          {currentStep === 'pagamento' && (
            <Card>
              <CardHeader>
                <CardTitle>Forma de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <PaymentSelector
                  selectedMethod={paymentMethod}
                  onSelect={setPaymentMethod}
                  total={summary.total}
                />
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Resumo */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Lista de itens */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              {/* Totais */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(summary.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frete</span>
                  <span>
                    {summary.shipping === 0 ? 'Grátis' : formatPrice(summary.shipping)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(summary.total)}</span>
                </div>
              </div>
              
              {/* Botões */}
              <div className="space-y-2 pt-4">
                {currentStep === 'pagamento' && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleBack}
                  >
                    Voltar
                  </Button>
                )}
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleNext}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? 'Processando...'
                    : currentStep === 'dados'
                    ? 'Continuar'
                    : 'Finalizar Pedido'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

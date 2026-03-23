import { CartItem, CartSummary } from './cart';

// Dados do Cliente
export interface CustomerData {
  name: string;
  email: string;
  phone: string;
}

// Dados de Endereço
export interface AddressData {
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

// Método de Pagamento
export interface PaymentMethod {
  id: 'credit_card' | 'pix' | 'boleto';
  name: string;
  icon: string;
  description: string;
  discount?: number;
  installments?: InstallmentOption[];
  finalValue?: number;
}

export interface InstallmentOption {
  times: number;
  value: number;
}

// Pedido
export interface Order {
  id: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  customer: CustomerData;
  shipping: {
    address: AddressData;
    method: string;
    cost: number;
    estimatedDelivery: string;
  };
  payment: {
    method: string;
    status: 'pending' | 'paid' | 'failed';
    paidAt?: string;
  };
  items: CartItem[];
  summary: CartSummary;
}

// Steps do Checkout
export type CheckoutStep = 'dados' | 'pagamento' | 'confirmacao';

export interface CheckoutState {
  currentStep: CheckoutStep;
  customer: CustomerData;
  address: AddressData;
  paymentMethod: string;
  isLoading: boolean;
}

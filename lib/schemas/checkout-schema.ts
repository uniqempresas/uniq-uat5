import { z } from 'zod';
import { PaymentMethodType } from '@/types/payment';

export const paymentSchema = z.object({
  method: z.nativeEnum(PaymentMethodType),
  amount: z.number().positive('Valor deve ser positivo'),
  brand: z.string().optional(),
  installments: z.number().min(1).max(12).optional(),
  receivedAmount: z.number().optional(),
  change: z.number().optional()
});

export const checkoutSchema = z.object({
  payments: z.array(paymentSchema).min(1, 'Selecione pelo menos uma forma de pagamento'),
  customerId: z.number().optional(),
  notes: z.string().optional()
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

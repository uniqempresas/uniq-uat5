// 📁 lib/schemas/customer-schema.ts

import { z } from 'zod';

export const contactSchema = z.object({
  id: z.string(),
  type: z.enum(['phone', 'email', 'whatsapp']),
  value: z.string().min(1, 'Valor é obrigatório'),
  primary: z.boolean(),
});

export const tagSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Nome da tag é obrigatório'),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Cor deve ser um HEX válido'),
});

export const addressSchema = z.object({
  street: z.string().min(1, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z.string().length(2, 'Estado deve ter 2 caracteres'),
  zipCode: z.string().regex(/^\d{5}-?\d{3}$/, 'CEP inválido'),
});

export const customerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  address: addressSchema.optional(),
  contacts: z.array(contactSchema).max(10, 'Máximo de 10 contatos'),
  tags: z.array(tagSchema).max(5, 'Máximo de 5 tags'),
  notes: z.string().max(1000, 'Máximo de 1000 caracteres').optional(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;

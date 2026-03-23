// 📁 lib/schemas/opportunity-schema.ts

import { z } from 'zod';

export const opportunityInteractionSchema = z.object({
  id: z.string(),
  type: z.enum(['call', 'email', 'meeting', 'proposal', 'note']),
  date: z.string().datetime(),
  description: z.string().min(1, 'Descrição é obrigatória'),
  user: z.string(),
});

export const opportunitySchema = z.object({
  customerId: z.string().min(1, 'Cliente é obrigatório'),
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  value: z.number().min(0, 'Valor deve ser positivo'),
  probability: z.number().min(0).max(100, 'Probabilidade deve ser entre 0 e 100'),
  stage: z.string().min(1, 'Etapa é obrigatória'),
  nextFollowUp: z.string().datetime().optional().nullable(),
});

export const interactionFormSchema = z.object({
  type: z.enum(['call', 'email', 'meeting', 'proposal', 'note']),
  date: z.string().datetime(),
  description: z.string().min(5, 'Descrição deve ter pelo menos 5 caracteres'),
});

export const winOpportunitySchema = z.object({
  actualValue: z.number().min(0, 'Valor real deve ser positivo'),
});

export const loseOpportunitySchema = z.object({
  lostReason: z.string().min(5, 'Motivo deve ter pelo menos 5 caracteres'),
});

export type OpportunityFormData = z.infer<typeof opportunitySchema>;
export type InteractionFormData = z.infer<typeof interactionFormSchema>;

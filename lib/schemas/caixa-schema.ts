import { z } from 'zod';

export const aberturaSchema = z.object({
  openingAmount: z.number().min(0, 'Valor não pode ser negativo'),
  operatorName: z.string().min(1, 'Nome do operador é obrigatório'),
  observations: z.string().optional()
});

export const sangriaSchema = z.object({
  amount: z.number().positive('Valor deve ser positivo'),
  reason: z.string().min(5, 'Motivo deve ter pelo menos 5 caracteres'),
  supervisorPassword: z.string().min(1, 'Senha do supervisor é obrigatória')
});

export const suprimentoSchema = z.object({
  amount: z.number().positive('Valor deve ser positivo'),
  reason: z.string().min(5, 'Motivo deve ter pelo menos 5 caracteres')
});

export const fechamentoSchema = z.object({
  cashAmount: z.number().min(0),
  cardAmount: z.number().min(0),
  pixAmount: z.number().min(0),
  observations: z.string().optional(),
  supervisorPassword: z.string().min(1, 'Senha do supervisor é obrigatória')
});

export type AberturaFormData = z.infer<typeof aberturaSchema>;
export type SangriaFormData = z.infer<typeof sangriaSchema>;
export type SuprimentoFormData = z.infer<typeof suprimentoSchema>;
export type FechamentoFormData = z.infer<typeof fechamentoSchema>;

import { z } from 'zod';

// Schema para variação de preço
export const priceVariationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Nome da variação é obrigatório'),
  price: z.number().min(0, 'Preço deve ser maior ou igual a zero'),
  duration: z.number().min(5, 'Duração mínima é 5 minutos').max(480, 'Duração máxima é 8 horas'),
});

// Schema para disponibilidade de um dia
export const dayAvailabilitySchema = z.object({
  active: z.boolean(),
  start: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato inválido (HH:MM)'),
  end: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato inválido (HH:MM)'),
});

// Schema para disponibilidade completa
export const availabilityScheduleSchema = z.object({
  monday: dayAvailabilitySchema,
  tuesday: dayAvailabilitySchema,
  wednesday: dayAvailabilitySchema,
  thursday: dayAvailabilitySchema,
  friday: dayAvailabilitySchema,
  saturday: dayAvailabilitySchema,
  sunday: dayAvailabilitySchema,
  lunchBreak: z.object({
    start: z.string(),
    end: z.string(),
    enabled: z.boolean(),
  }).optional(),
});

// Schema principal do serviço
export const serviceSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres').max(100, 'Nome muito longo'),
  description: z.string().max(500, 'Descrição muito longa').optional(),
  price: z.number().min(0, 'Preço deve ser maior ou igual a zero'),
  duration: z.number().min(5, 'Duração mínima é 5 minutos').max(480, 'Duração máxima é 8 horas'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  active: z.boolean().default(true),
  images: z.array(z.string()).max(5, 'Máximo de 5 imagens'),
  variations: z.array(priceVariationSchema).default([]),
  availability: availabilityScheduleSchema,
});

// Tipo inferido do schema
export type ServiceFormValues = z.infer<typeof serviceSchema>;

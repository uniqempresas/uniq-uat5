import { z } from 'zod';

export const employeeFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),

  email: z
    .string()
    .email('Email inválido'),

  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(val), {
      message: 'Telefone inválido',
    }),

  position: z
    .string()
    .max(100, 'Cargo deve ter no máximo 100 caracteres')
    .optional(),

  role: z.enum(['admin', 'manager', 'seller', 'viewer']),

  modules: z.array(
    z.object({
      module: z.string(),
      permissions: z.array(z.string()),
    })
  ),

  notifyByEmail: z.boolean(),
  whatsappAccess: z.boolean(),
});

export type EmployeeFormSchema = z.infer<typeof employeeFormSchema>;

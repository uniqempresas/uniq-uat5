import { z } from "zod";

// Helper para validação de CNPJ
const isValidCNPJ = (cnpj: string): boolean => {
  // Remove caracteres não numéricos
  const cleanCNPJ = cnpj.replace(/[^\d]/g, "");
  
  if (cleanCNPJ.length !== 14) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/(\d)\1{13}/.test(cleanCNPJ)) return false;
  
  // Algoritmo de validação de CNPJ
  let sum = 0;
  let weight = 2;
  
  for (let i = 11; i >= 0; i--) {
    sum += parseInt(cleanCNPJ.charAt(i)) * weight;
    weight = weight === 9 ? 2 : weight + 1;
  }
  
  const digit1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (parseInt(cleanCNPJ.charAt(12)) !== digit1) return false;
  
  sum = 0;
  weight = 2;
  
  for (let i = 12; i >= 0; i--) {
    sum += parseInt(cleanCNPJ.charAt(i)) * weight;
    weight = weight === 9 ? 2 : weight + 1;
  }
  
  const digit2 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return parseInt(cleanCNPJ.charAt(13)) === digit2;
};

// Schema de Login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Digite um email válido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Schema de Cadastro - Step 1 (Dados Pessoais)
export const personalInfoSchema = z.object({
  fullName: z
    .string()
    .min(1, "Nome completo é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Digite um email válido"),
  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .regex(/^\(\d{2}\)\s?\d{4,5}-\d{4}$/, "Telefone inválido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z
    .string()
    .min(1, "Confirmação de senha é obrigatória"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

// Schema de Cadastro - Step 2 (Dados da Empresa)
export const companyInfoSchema = z.object({
  companyName: z
    .string()
    .min(1, "Nome da empresa é obrigatório"),
  cnpj: z
    .string()
    .min(1, "CNPJ é obrigatório")
    .refine((val) => isValidCNPJ(val), "CNPJ inválido"),
  segment: z
    .string()
    .min(1, "Selecione um segmento"),
  logo: z
    .string()
    .optional(),
});

export type CompanyInfoFormData = z.infer<typeof companyInfoSchema>;

// Schema de Cadastro - Step 3 (Plano)
export const planSelectionSchema = z.object({
  planId: z
    .string()
    .min(1, "Selecione um plano"),
});

export type PlanSelectionFormData = z.infer<typeof planSelectionSchema>;

// Schema completo de Cadastro (todos os steps)
export const registerSchema = z.object({
  // Step 1
  fullName: personalInfoSchema.shape.fullName,
  email: personalInfoSchema.shape.email,
  phone: personalInfoSchema.shape.phone,
  password: personalInfoSchema.shape.password,
  confirmPassword: personalInfoSchema.shape.confirmPassword,
  // Step 2
  companyName: companyInfoSchema.shape.companyName,
  cnpj: companyInfoSchema.shape.cnpj,
  segment: companyInfoSchema.shape.segment,
  logo: companyInfoSchema.shape.logo,
  // Step 3
  planId: planSelectionSchema.shape.planId,
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

// Schema de Recuperação de Senha
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Digite um email válido"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Schema de Nova Senha
export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, "Nova senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z
    .string()
    .min(1, "Confirmação é obrigatória"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

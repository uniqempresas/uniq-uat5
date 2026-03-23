// ============================================
// VALIDADORES ZOD PARA FORNECEDORES
// ============================================

import { z } from 'zod';

/**
 * Schema de validação para Endereço
 */
export const addressSchema = z.object({
  cep: z.string().min(1, 'CEP é obrigatório'),
  street: z.string().min(1, 'Logradouro é obrigatório'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z.string().min(1, 'Estado é obrigatório'),
});

/**
 * Schema de validação para Contato
 */
export const contactSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Nome do contato é obrigatório'),
  role: z.string().optional(),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  phone: z.string().optional(),
  mobile: z.string().optional(),
  isPrimary: z.boolean(),
});

/**
 * Schema de validação para Conta Bancária
 */
export const bankAccountSchema = z.object({
  id: z.string(),
  bank: z.string().min(1, 'Banco é obrigatório'),
  bankName: z.string().optional(),
  agency: z.string().min(1, 'Agência é obrigatória'),
  account: z.string().min(1, 'Conta é obrigatória'),
  accountType: z.enum(['checking', 'savings']),
  pixKey: z.string().optional(),
  pixType: z.enum(['cnpj', 'cpf', 'email', 'phone', 'random']).optional(),
  isPrimary: z.boolean(),
});

/**
 * Schema principal de validação de fornecedor
 */
export const supplierSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  legalName: z.string().min(1, 'Razão Social é obrigatória'),
  document: z.string().min(1, 'Documento é obrigatório'),
  documentType: z.enum(['cnpj', 'cpf']),
  category: z.string().min(1, 'Categoria é obrigatória'),
  rating: z.number().min(1).max(5),
  status: z.enum(['active', 'inactive', 'pending']),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  phone: z.string().optional(),
  address: addressSchema,
  contacts: z.array(contactSchema),
  bankAccounts: z.array(bankAccountSchema),
  paymentTerms: z.string().optional(),
  notes: z.string().optional(),
  logo: z.string().nullable().optional(),
});

/**
 * Tipo inferido do schema
 */
export type SupplierFormSchema = z.infer<typeof supplierSchema>;

/**
 * Schema para validação parcial (usado em atualizações)
 */
export const supplierPartialSchema = supplierSchema.partial();

/**
 * Valida CNPJ
 */
export const validateCNPJ = (cnpj: string): boolean => {
  const cleanCNPJ = cnpj.replace(/\D/g, '');
  
  if (cleanCNPJ.length !== 14) return false;
  
  // Verifica dígitos verificadores
  let sum = 0;
  let multiplier = 2;
  
  for (let i = 11; i >= 0; i--) {
    sum += parseInt(cleanCNPJ[i]) * multiplier;
    multiplier = multiplier === 9 ? 2 : multiplier + 1;
  }
  
  const digit1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  
  sum = 0;
  multiplier = 2;
  
  for (let i = 12; i >= 0; i--) {
    sum += parseInt(cleanCNPJ[i]) * multiplier;
    multiplier = multiplier === 9 ? 2 : multiplier + 1;
  }
  
  const digit2 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  
  return (
    parseInt(cleanCNPJ[12]) === digit1 &&
    parseInt(cleanCNPJ[13]) === digit2
  );
};

/**
 * Valida CPF
 */
export const validateCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/\D/g, '');
  
  if (cleanCPF.length !== 11) return false;
  
  // Verifica dígitos verificadores
  let sum = 0;
  
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF[i]) * (10 - i);
  }
  
  let digit1 = sum % 11;
  digit1 = digit1 < 2 ? 0 : 11 - digit1;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF[i]) * (11 - i);
  }
  
  let digit2 = sum % 11;
  digit2 = digit2 < 2 ? 0 : 11 - digit2;
  
  return (
    parseInt(cleanCPF[9]) === digit1 &&
    parseInt(cleanCPF[10]) === digit2
  );
};

/**
 * Valida documento (CPF ou CNPJ)
 */
export const validateDocument = (
  document: string,
  type: 'cnpj' | 'cpf'
): boolean => {
  return type === 'cnpj' 
    ? validateCNPJ(document) 
    : validateCPF(document);
};
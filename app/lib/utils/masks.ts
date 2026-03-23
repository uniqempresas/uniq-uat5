// ============================================
// MÁSCARAS DE FORMATAÇÃO
// ============================================

/**
 * Aplica máscara de CNPJ (00.000.000/0000-00)
 */
export const maskCNPJ = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .slice(0, 18);
};

/**
 * Aplica máscara de CPF (000.000.000-00)
 */
export const maskCPF = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2')
    .slice(0, 14);
};

/**
 * Aplica máscara de CEP (00000-000)
 */
export const maskCEP = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 9);
};

/**
 * Aplica máscara de telefone brasileiro ((00) 00000-0000)
 */
export const maskPhone = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 15);
};

/**
 * Seleciona a máscara correta baseado no tipo de documento
 */
export const maskDocument = (value: string, type: 'cnpj' | 'cpf'): string => {
  return type === 'cnpj' ? maskCNPJ(value) : maskCPF(value);
};

/**
 * Remove todas as máscara de um documento
 */
export const unmaskDocument = (value: string): string => {
  return value.replace(/\D/g, '');
};

/**
 * Formata valor monetário para Real brasileiro
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * Formata valor monetário compactado (R$ 1,2M, R$ 500K, etc)
 */
export const formatCurrencyCompact = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
};
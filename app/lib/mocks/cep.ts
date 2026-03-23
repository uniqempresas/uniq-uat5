// ============================================
// MOCK DATA - CEP (Simulação de API)
// ============================================

import { CEPResult } from '@/app/types/suppliers';

/**
 * Database simulado de CEPs brasileiros
 * Os CEPs estão sem máscara (apenas números)
 */
export const mockCEPData: Record<string, CEPResult> = {
  '01310100': {
    cep: '01310-100',
    logradouro: 'Avenida Paulista',
    bairro: 'Bela Vista',
    cidade: 'São Paulo',
    estado: 'SP'
  },
  '20040001': {
    cep: '20040-001',
    logradouro: 'Rua da Quitanda',
    bairro: 'Centro',
    cidade: 'Rio de Janeiro',
    estado: 'RJ'
  },
  '30130000': {
    cep: '30130-000',
    logradouro: 'Avenida Cristiano Machado',
    bairro: 'Vila Cloris',
    cidade: 'Belo Horizonte',
    estado: 'MG'
  },
  '74000000': {
    cep: '74000-000',
    logradouro: 'Avenida Anhanguera',
    bairro: 'Setor Norte Ferroviário',
    cidade: 'Goiânia',
    estado: 'GO'
  },
  '13020000': {
    cep: '13020-000',
    logradouro: 'Avenida Brasil',
    bairro: 'Jardim São Luiz',
    cidade: 'Campinas',
    estado: 'SP'
  },
  '88000000': {
    cep: '88000-000',
    logradouro: 'Rua Main',
    bairro: 'Centro',
    cidade: 'Florianópolis',
    estado: 'SC'
  },
  '01001000': {
    cep: '01001-000',
    logradouro: 'Praça da Sé',
    bairro: 'Sé',
    cidade: 'São Paulo',
    estado: 'SP'
  },
  '20010020': {
    cep: '20010-020',
    logradouro: 'Avenida Rio Branco',
    bairro: 'Centro',
    cidade: 'Rio de Janeiro',
    estado: 'RJ'
  },
  '70000000': {
    cep: '70000-000',
    logradouro: 'Esplanada dos Ministérios',
    bairro: 'Zona Civico-Administrativa',
    cidade: 'Brasília',
    estado: 'DF'
  },
  '60010000': {
    cep: '60010-000',
    logradouro: 'Avenida Duque de Caxias',
    bairro: 'Centro',
    cidade: 'Fortaleza',
    estado: 'CE'
  },
  '50030000': {
    cep: '50030-000',
    logradouro: 'Avenida涨ensiveiro',
    bairro: 'Boa Vista',
    cidade: 'Recife',
    estado: 'PE'
  },
  '40010000': {
    cep: '40010-000',
    logradouro: 'Avenida ACM',
    bairro: 'Nazaré',
    cidade: 'Salvador',
    estado: 'BA'
  },
  '90010000': {
    cep: '90010-000',
    logradouro: 'Avenida Borges de Medeiros',
    bairro: 'Centro',
    cidade: 'Porto Alegre',
    estado: 'RS'
  },
  '80010000': {
    cep: '80010-000',
    logradouro: 'Avenida Batel',
    bairro: 'Batel',
    cidade: 'Curitiba',
    estado: 'PR'
  },
  '01001001': {
    cep: '01001-001',
    logradouro: 'Praça da Sé',
    bairro: 'Sé',
    cidade: 'São Paulo',
    estado: 'SP'
  },
  '04543000': {
    cep: '04543-000',
    logradouro: 'Avenida Faria Lima',
    bairro: 'Itaim Bibi',
    cidade: 'São Paulo',
    estado: 'SP'
  },
  '05401000': {
    cep: '05401-000',
    logradouro: 'Avenida Brigadeiro Faria Lima',
    bairro: 'Jardim Paulistano',
    cidade: 'São Paulo',
    estado: 'SP'
  },
  '05713000': {
    cep: '05713-000',
    logradouro: 'Avenida Giovanni Battista',
    bairro: 'Vila Sanches',
    cidade: 'São Paulo',
    estado: 'SP'
  },
  '05051000': {
    cep: '05051-000',
    logradouro: 'Avenida Paulo VI',
    bairro: 'Sumarezinho',
    cidade: 'São Paulo',
    estado: 'SP'
  },
  '04250000': {
    cep: '04250-000',
    logradouro: 'Rua Clélia',
    bairro: 'Vila Água Branca',
    cidade: 'São Paulo',
    estado: 'SP'
  }
};

/**
 * Lista de estados brasileiros com código
 */
export const brazilianStates = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];
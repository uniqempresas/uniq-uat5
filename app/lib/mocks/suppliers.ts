// ============================================
// MOCK DATA - FORNECEDORES
// ============================================

import { Supplier, Category } from '@/app/types/suppliers';

export const mockSuppliers: Supplier[] = [
  {
    id: 'sup-001',
    name: 'Tech Distribuidora Ltda',
    legalName: 'Tech Distribuidora Comercio de Eletronicos Ltda',
    document: '12.345.678/0001-90',
    documentType: 'cnpj',
    category: 'tecnologia',
    rating: 4.8,
    ratingCount: 23,
    status: 'active',
    email: 'contato@techdist.com.br',
    phone: '(11) 3456-7890',
    address: {
      cep: '01310-100',
      street: 'Avenida Paulista',
      number: '1000',
      complement: 'Sala 1501',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP'
    },
    contacts: [
      {
        id: 'cont-001',
        name: 'João Silva',
        role: 'Gerente Comercial',
        email: 'joao.silva@techdist.com.br',
        phone: '(11) 3456-7890',
        mobile: '(11) 98765-4321',
        isPrimary: true
      }
    ],
    bankAccounts: [
      {
        id: 'bank-001',
        bank: '001',
        bankName: 'Banco do Brasil',
        agency: '1234-5',
        account: '123456-7',
        accountType: 'checking',
        pixKey: '12.345.678/0001-90',
        pixType: 'cnpj',
        isPrimary: true
      }
    ],
    paymentTerms: '30/60/90',
    notes: 'Fornecedor principal de eletrônicos. Entrega em 48h.',
    logo: null,
    totalPurchases: 145,
    totalSpent: 245890.00,
    lastPurchase: '2026-03-10',
    averageTicket: 1695.79,
    createdAt: '2024-01-15',
    updatedAt: '2026-03-10'
  },
  {
    id: 'sup-002',
    name: 'Papelaria ABC',
    legalName: 'ABC Papelaria e Escritorio Ltda',
    document: '98.765.432/0001-21',
    documentType: 'cnpj',
    category: 'materiais',
    rating: 4.2,
    ratingCount: 15,
    status: 'active',
    email: 'vendas@papelariaabc.com.br',
    phone: '(21) 2543-2109',
    address: {
      cep: '20040-001',
      street: 'Rua da Quitanda',
      number: '89',
      complement: 'Loja A',
      neighborhood: 'Centro',
      city: 'Rio de Janeiro',
      state: 'RJ'
    },
    contacts: [
      {
        id: 'cont-003',
        name: 'Carlos Oliveira',
        role: 'Proprietário',
        email: 'carlos@papelariaabc.com.br',
        phone: '(21) 2543-2109',
        mobile: '(21) 98765-4321',
        isPrimary: true
      }
    ],
    bankAccounts: [],
    paymentTerms: '28/56',
    notes: '',
    logo: null,
    totalPurchases: 67,
    totalSpent: 45320.00,
    lastPurchase: '2026-02-28',
    averageTicket: 676.42,
    createdAt: '2024-03-20',
    updatedAt: '2026-02-28'
  },
  {
    id: 'sup-003',
    name: 'Logística Express',
    legalName: 'Express Logistica e Transporte Ltda',
    document: '45.678.901/0001-34',
    documentType: 'cnpj',
    category: 'logistica',
    rating: 3.5,
    ratingCount: 8,
    status: 'pending',
    email: 'contato@logisticaexpress.com',
    phone: '(31) 3344-5566',
    address: {
      cep: '30130-000',
      street: 'Avenida Cristiano Machado',
      number: '1500',
      complement: 'Galpão 3',
      neighborhood: 'Vila Cloris',
      city: 'Belo Horizonte',
      state: 'MG'
    },
    contacts: [],
    bankAccounts: [],
    paymentTerms: '',
    notes: 'Aguardando documentação completa.',
    logo: null,
    totalPurchases: 0,
    totalSpent: 0,
    lastPurchase: null,
    averageTicket: 0,
    createdAt: '2026-03-15',
    updatedAt: '2026-03-15'
  },
  {
    id: 'sup-004',
    name: 'Distribuidora de Alimentos Norte',
    legalName: 'Distribuidora Norte Alimentos Ltda',
    document: '34.567.890/0001-56',
    documentType: 'cnpj',
    category: 'alimentacao',
    rating: 4.6,
    ratingCount: 31,
    status: 'active',
    email: 'vendas@distnorte.com.br',
    phone: '(62) 3456-7890',
    address: {
      cep: '74000-000',
      street: 'Avenida Anhanguera',
      number: '5000',
      complement: '',
      neighborhood: 'Setor Norte Ferroviário',
      city: 'Goiânia',
      state: 'GO'
    },
    contacts: [
      {
        id: 'cont-004',
        name: 'Ana Paula Costa',
        role: 'Diretora Comercial',
        email: 'ana.costa@distnorte.com.br',
        phone: '(62) 3456-7890',
        mobile: '(62) 98765-4321',
        isPrimary: true
      }
    ],
    bankAccounts: [
      {
        id: 'bank-002',
        bank: '237',
        bankName: 'Banco Bradesco',
        agency: '1234-5',
        account: '12345-6',
        accountType: 'checking',
        pixKey: '34.567.890/0001-56',
        pixType: 'cnpj',
        isPrimary: true
      }
    ],
    paymentTerms: '30/45/60',
    notes: 'Entregas de segunda a sexta. Pedido mínimo R$ 500.',
    logo: null,
    totalPurchases: 89,
    totalSpent: 156780.00,
    lastPurchase: '2026-03-15',
    averageTicket: 1761.57,
    createdAt: '2024-06-01',
    updatedAt: '2026-03-15'
  },
  {
    id: 'sup-005',
    name: 'Móveis Planejados Premium',
    legalName: 'Premium Moveis Planejados Eireli',
    document: '56.789.012/0001-78',
    documentType: 'cnpj',
    category: 'moveis',
    rating: 4.9,
    ratingCount: 42,
    status: 'active',
    email: 'contato@moveispremium.com.br',
    phone: '(19) 3456-7890',
    address: {
      cep: '13020-000',
      street: 'Avenida Brasil',
      number: '1500',
      complement: 'Galpão A',
      neighborhood: 'Jardim São Luiz',
      city: 'Campinas',
      state: 'SP'
    },
    contacts: [
      {
        id: 'cont-005',
        name: 'Roberto Mendes',
        role: 'Projetista',
        email: 'roberto@moveispremium.com.br',
        phone: '(19) 3456-7890',
        mobile: '(19) 98765-4321',
        isPrimary: true
      }
    ],
    bankAccounts: [],
    paymentTerms: '50% entrada, 50% entrega',
    notes: 'Fabricação sob encomenda. Prazo de 30 dias.',
    logo: null,
    totalPurchases: 12,
    totalSpent: 89500.00,
    lastPurchase: '2026-01-20',
    averageTicket: 7458.33,
    createdAt: '2025-01-10',
    updatedAt: '2026-01-20'
  },
  {
    id: 'sup-006',
    name: 'Embalagens Eco Verde',
    legalName: 'Eco Verde Embalagens Sustentaveis Ltda',
    document: '78.901.234/0001-90',
    documentType: 'cnpj',
    category: 'embalagens',
    rating: 4.0,
    ratingCount: 12,
    status: 'inactive',
    email: 'comercial@ecoembalagens.com.br',
    phone: '(48) 3456-7890',
    address: {
      cep: '88000-000',
      street: 'Rua Main',
      number: '200',
      complement: '',
      neighborhood: 'Centro',
      city: 'Florianópolis',
      state: 'SC'
    },
    contacts: [],
    bankAccounts: [],
    paymentTerms: '30 dias',
    notes: 'Fornecedor inativado por atraso nas entregas.',
    logo: null,
    totalPurchases: 23,
    totalSpent: 12300.00,
    lastPurchase: '2025-12-01',
    averageTicket: 534.78,
    createdAt: '2025-02-15',
    updatedAt: '2026-02-01'
  }
];

export const mockCategories: Category[] = [
  { id: 'materiais', name: 'Materiais', count: 12 },
  { id: 'tecnologia', name: 'Tecnologia', count: 8 },
  { id: 'logistica', name: 'Logística', count: 5 },
  { id: 'servicos', name: 'Serviços', count: 9 },
  { id: 'vestuario', name: 'Vestuário', count: 4 },
  { id: 'alimentacao', name: 'Alimentação', count: 3 },
  { id: 'moveis', name: 'Móveis', count: 2 },
  { id: 'embalagens', name: 'Embalagens', count: 2 }
];

/**
 * Lista de categorias pré-definidas para o formulário
 */
export const categoryOptions = [
  { value: 'materiais', label: 'Materiais' },
  { value: 'tecnologia', label: 'Tecnologia' },
  { value: 'logistica', label: 'Logística' },
  { value: 'servicos', label: 'Serviços' },
  { value: 'vestuario', label: 'Vestuário' },
  { value: 'alimentacao', label: 'Alimentação' },
  { value: 'moveis', label: 'Móveis' },
  { value: 'embalagens', label: 'Embalagens' },
  { value: 'embalagens', label: 'Embalagens' },
  { value: 'papelaria', label: 'Papelaria' },
  { value: 'construcao', label: 'Construção' },
  { value: 'limpeza', label: 'Limpeza' },
  { value: 'escritorio', label: 'Escritório' },
  { value: 'outros', label: 'Outros' },
];

/**
 * Lista de condições de pagamento
 */
export const paymentTermsOptions = [
  { value: '7', label: '7 dias' },
  { value: '15', label: '15 dias' },
  { value: '28', label: '28 dias' },
  { value: '30', label: '30 dias' },
  { value: '30/60', label: '30/60 dias' },
  { value: '30/60/90', label: '30/60/90 dias' },
  { value: '45', label: '45 dias' },
  { value: '45/60', label: '45/60 dias' },
  { value: '60', label: '60 dias' },
  { value: '60/90', label: '60/90 dias' },
  { value: '90', label: '90 dias' },
  { value: 'vista', label: 'À vista' },
  { value: 'entrada', label: '50% entrada, 50% entrega' },
];

/**
 * Lista de bancos brasileiros comuns
 */
export const bankOptions = [
  { value: '001', label: '001 - Banco do Brasil' },
  { value: '033', label: '033 - Banco Santander' },
  { value: '041', label: '041 - Banco do Estado do Rio Grande do Sul' },
  { value: '104', label: '104 - Caixa Econômica Federal' },
  { value: '237', label: '237 - Banco Bradesco' },
  { value: '341', label: '341 - Banco Itaú' },
  { value: '389', label: '389 - Banco Mercantil do Brasil' },
  { value: '422', label: '422 - Banco Safra' },
  { value: '748', label: '748 - Banco Sicredi' },
  { value: '756', label: '756 - Banco Cooperativo do Brasil' },
  { value: '065', label: '065 - Banco皮ick' },
  { value: '077', label: '077 - Banco Inter' },
  { value: '212', label: '212 - Banco Original' },
  { value: '021', label: '021 - Banco Banrisul' },
  { value: '004', label: '004 - Banco do Estado do Amazonas' },
];
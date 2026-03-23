import { PDVProduct, Category, Customer, Seller } from '@/types/pdv';

export const mockPDVProducts: PDVProduct[] = [
  // ÓCULOS DE SOL
  {
    id: 1,
    name: 'Óculos Ray-Ban Aviador Classic',
    price: 899.90,
    costPrice: 450.00,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    stock: 15,
    category: 'Óculos de Sol',
    categoryId: 1,
    barcode: '7891234567890',
    sku: 'RB-3025-001',
    minStock: 5,
    isActive: true,
    description: 'O clássico Aviador da Ray-Ban com proteção UV400'
  },
  {
    id: 2,
    name: 'Óculos Oakley Holbrook',
    price: 749.90,
    costPrice: 375.00,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop',
    stock: 8,
    category: 'Óculos de Sol',
    categoryId: 1,
    barcode: '7899876543210',
    sku: 'OK-HB-002',
    minStock: 3,
    isActive: true,
    description: 'Design esportivo com tecnologia Prizm'
  },
  {
    id: 3,
    name: 'Óculos Polaroid Feminino',
    price: 299.90,
    costPrice: 120.00,
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=500&h=500&fit=crop',
    stock: 22,
    category: 'Óculos de Sol',
    categoryId: 1,
    barcode: '7894561237890',
    sku: 'PLD-FEM-003',
    minStock: 5,
    isActive: true,
    description: 'Estilo moderno com lentes polarizadas'
  },
  {
    id: 4,
    name: 'Óculos Persol PO0649',
    price: 1299.00,
    costPrice: 650.00,
    image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=500&h=500&fit=crop',
    stock: 4,
    category: 'Óculos de Sol',
    categoryId: 1,
    barcode: '7897894561230',
    sku: 'PSL-649-004',
    minStock: 2,
    isActive: true,
    description: 'Ícone de estilo italiano desde 1961'
  },
  
  // ARMAÇÕES
  {
    id: 5,
    name: 'Armação Titanium Ultra Leve',
    price: 459.90,
    costPrice: 180.00,
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500&h=500&fit=crop',
    stock: 12,
    category: 'Armações',
    categoryId: 2,
    barcode: '7893216549870',
    sku: 'TIT-UL-005',
    minStock: 5,
    isActive: true,
    description: 'Armação em titânio hipoalergênico, apenas 8g'
  },
  {
    id: 6,
    name: 'Armação Acetato Vintage',
    price: 329.90,
    costPrice: 130.00,
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500&h=500&fit=crop',
    stock: 18,
    category: 'Armações',
    categoryId: 2,
    barcode: '7896549873210',
    sku: 'ACE-VNT-006',
    minStock: 5,
    isActive: true,
    description: 'Estilo retrô com acetato de alta qualidade'
  },
  {
    id: 7,
    name: 'Armação Metal Flexível',
    price: 279.90,
    costPrice: 110.00,
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500&h=500&fit=crop',
    stock: 25,
    category: 'Armações',
    categoryId: 2,
    barcode: '7891472583690',
    sku: 'MTL-FLX-007',
    minStock: 8,
    isActive: true,
    description: 'Hastes flexíveis para maior durabilidade'
  },
  {
    id: 8,
    name: 'Armação Infantil Resistente',
    price: 199.90,
    costPrice: 80.00,
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500&h=500&fit=crop',
    stock: 3,
    category: 'Armações',
    categoryId: 2,
    barcode: '7893692581470',
    sku: 'INF-RES-008',
    minStock: 5,
    isActive: true,
    description: 'Silicone flexível e resistente a quebras'
  },
  
  // LENTES
  {
    id: 9,
    name: 'Lente Transitions Signature',
    price: 450.00,
    costPrice: 225.00,
    image: 'https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=500&h=500&fit=crop',
    stock: 30,
    category: 'Lentes',
    categoryId: 3,
    barcode: '7897418529630',
    sku: 'LNT-TRN-009',
    minStock: 10,
    isActive: true,
    description: 'Lentes que escurecem conforme a luz'
  },
  {
    id: 10,
    name: 'Lente Anti Reflexo Premium',
    price: 180.00,
    costPrice: 90.00,
    image: 'https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=500&h=500&fit=crop',
    stock: 50,
    category: 'Lentes',
    categoryId: 3,
    barcode: '7899638527410',
    sku: 'LNT-AR-010',
    minStock: 15,
    isActive: true,
    description: 'Tratamento anti reflexo de última geração'
  },
  {
    id: 11,
    name: 'Lente Blue Control',
    price: 280.00,
    costPrice: 140.00,
    image: 'https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=500&h=500&fit=crop',
    stock: 20,
    category: 'Lentes',
    categoryId: 3,
    barcode: '7891597534560',
    sku: 'LNT-BC-011',
    minStock: 8,
    isActive: true,
    description: 'Proteção contra luz azul de telas'
  },
  
  // ACESSÓRIOS
  {
    id: 12,
    name: 'Estojo Rigido Premium',
    price: 89.90,
    costPrice: 35.00,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    stock: 40,
    category: 'Acessórios',
    categoryId: 4,
    barcode: '7893579514560',
    sku: 'EST-RGD-012',
    minStock: 10,
    isActive: true,
    description: 'Proteção máxima para seus óculos'
  },
  {
    id: 13,
    name: 'Kit Limpeza Completo',
    price: 39.90,
    costPrice: 15.00,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    stock: 100,
    category: 'Acessórios',
    categoryId: 4,
    barcode: '7898527419630',
    sku: 'KLT-LMP-013',
    minStock: 25,
    isActive: true,
    description: 'Spray, flanela e chave de ajuste'
  },
  {
    id: 14,
    name: 'Cordão de Silicone',
    price: 29.90,
    costPrice: 10.00,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    stock: 60,
    category: 'Acessórios',
    categoryId: 4,
    barcode: '7894567891230',
    sku: 'CRD-SLC-014',
    minStock: 15,
    isActive: true,
    description: 'Ideal para esportes e atividades'
  },
  
  // LENTES DE CONTATO
  {
    id: 15,
    name: 'Acuvue Oasys (caixa c/6)',
    price: 129.90,
    costPrice: 65.00,
    image: 'https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=500&h=500&fit=crop',
    stock: 45,
    category: 'Lentes de Contato',
    categoryId: 5,
    barcode: '7891237894560',
    sku: 'ACV-OAS-015',
    minStock: 12,
    isActive: true,
    description: 'Lentes mensais com Hydraclear Plus'
  },
  {
    id: 16,
    name: 'Biofinity (caixa c/6)',
    price: 149.90,
    costPrice: 75.00,
    image: 'https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=500&h=500&fit=crop',
    stock: 30,
    category: 'Lentes de Contato',
    categoryId: 5,
    barcode: '7894561237890',
    sku: 'BIO-FFN-016',
    minStock: 8,
    isActive: true,
    description: 'Lentes mensais de alta oxigenação'
  },
  {
    id: 17,
    name: 'Air Optix Colors',
    price: 179.90,
    costPrice: 90.00,
    image: 'https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=500&h=500&fit=crop',
    stock: 20,
    category: 'Lentes de Contato',
    categoryId: 5,
    barcode: '7897891234560',
    sku: 'AOX-CLR-017',
    minStock: 6,
    isActive: true,
    description: 'Lentes coloridas mensais'
  },
  
  // INFANTIL
  {
    id: 18,
    name: 'Óculos de Sol Infantil Flex',
    price: 159.90,
    costPrice: 64.00,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    stock: 15,
    category: 'Infantil',
    categoryId: 6,
    barcode: '7893217896540',
    sku: 'INF-SOL-018',
    minStock: 5,
    isActive: true,
    description: 'Proteção UV400 com armação flexível'
  },
  {
    id: 19,
    name: 'Armação Infantil Personagens',
    price: 249.90,
    costPrice: 100.00,
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500&h=500&fit=crop',
    stock: 8,
    category: 'Infantil',
    categoryId: 6,
    barcode: '7896543217890',
    sku: 'INF-PER-019',
    minStock: 3,
    isActive: true,
    description: 'Personagens infantis em acetato'
  },
  {
    id: 20,
    name: 'Lentes de Contato Infantil',
    price: 199.90,
    costPrice: 100.00,
    image: 'https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=500&h=500&fit=crop',
    stock: 5,
    category: 'Infantil',
    categoryId: 6,
    barcode: '7899874563210',
    sku: 'INF-LNT-020',
    minStock: 2,
    isActive: true,
    description: 'Lentes esféricas especiais para crianças'
  }
];

// ============================================
// CATEGORIAS
// ============================================

export const mockPDVCategories: Category[] = [
  { id: 1, name: 'Óculos de Sol', slug: 'oculos-de-sol', count: 49, color: '#f59e0b', icon: 'sun', isActive: true },
  { id: 2, name: 'Armações', slug: 'armacoes', count: 85, color: '#3b82f6', icon: 'glasses', isActive: true },
  { id: 3, name: 'Lentes', slug: 'lentes', count: 32, color: '#10b981', icon: 'eye', isActive: true },
  { id: 4, name: 'Acessórios', slug: 'acessorios', count: 45, color: '#8b5cf6', icon: 'box', isActive: true },
  { id: 5, name: 'Lentes de Contato', slug: 'lentes-contato', count: 28, color: '#ec4899', icon: 'contact', isActive: true },
  { id: 6, name: 'Infantil', slug: 'infantil', count: 18, color: '#f97316', icon: 'baby', isActive: true },
];

// ============================================
// CLIENTES
// ============================================

export const mockCustomers: Customer[] = [
  {
    id: 1,
    name: 'Maria Silva Santos',
    email: 'maria.silva@email.com',
    phone: '(11) 98765-4321',
    cpf: '123.456.789-00',
    rg: '12.345.678-9',
    address: {
      street: 'Rua das Flores',
      number: '123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01001-000'
    },
    birthDate: '1985-03-15',
    createdAt: '2023-01-10T10:00:00',
    totalPurchases: 12,
    totalSpent: 5847.50,
    isActive: true
  },
  {
    id: 2,
    name: 'João Pedro Oliveira',
    email: 'joao.oliveira@email.com',
    phone: '(11) 91234-5678',
    cpf: '987.654.321-00',
    address: {
      street: 'Avenida Paulista',
      number: '1000',
      complement: 'Apto 45',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100'
    },
    birthDate: '1990-07-22',
    createdAt: '2023-02-15T14:30:00',
    totalPurchases: 5,
    totalSpent: 2349.80,
    isActive: true
  },
  {
    id: 3,
    name: 'Ana Carolina Mendes',
    email: 'ana.mendes@email.com',
    phone: '(11) 99876-5432',
    cpf: '456.789.123-00',
    address: {
      street: 'Rua Augusta',
      number: '500',
      neighborhood: 'Consolação',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01305-100'
    },
    createdAt: '2023-03-20T09:15:00',
    totalPurchases: 3,
    totalSpent: 1197.60,
    isActive: true
  },
  {
    id: 4,
    name: 'Carlos Eduardo Souza',
    email: 'carlos.souza@email.com',
    phone: '(11) 93456-7890',
    cpf: '789.123.456-00',
    address: {
      street: 'Rua Oscar Freire',
      number: '800',
      neighborhood: 'Jardins',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01426-001'
    },
    birthDate: '1988-11-30',
    createdAt: '2023-04-05T16:45:00',
    totalPurchases: 8,
    totalSpent: 4230.00,
    isActive: true
  },
  {
    id: 5,
    name: 'Fernanda Lima Costa',
    email: 'fernanda.costa@email.com',
    phone: '(11) 94567-8901',
    cpf: '321.654.987-00',
    createdAt: '2023-05-12T11:20:00',
    totalPurchases: 1,
    totalSpent: 459.90,
    isActive: true
  }
];

// ============================================
// VENDEDORES
// ============================================

export const mockSellers: Seller[] = [
  {
    id: 1,
    name: 'Ana Silva',
    email: 'ana.silva@uniq.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    role: 'admin',
    isActive: true,
    stats: {
      totalSales: 156,
      totalAmount: 45750.00,
      averageTicket: 293.27
    }
  },
  {
    id: 2,
    name: 'Pedro Santos',
    email: 'pedro.santos@uniq.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
    role: 'seller',
    isActive: true,
    stats: {
      totalSales: 124,
      totalAmount: 32890.00,
      averageTicket: 265.24
    }
  },
  {
    id: 3,
    name: 'Maria Costa',
    email: 'maria.costa@uniq.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    role: 'seller',
    isActive: true,
    stats: {
      totalSales: 98,
      totalAmount: 26780.00,
      averageTicket: 273.27
    }
  },
  {
    id: 4,
    name: 'Lucas Oliveira',
    email: 'lucas.oliveira@uniq.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas',
    role: 'operator',
    isActive: true
  }
];

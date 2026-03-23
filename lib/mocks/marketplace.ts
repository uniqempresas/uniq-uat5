// lib/mocks/marketplace.ts - Mock data for Marketplace

import type {
  Seller,
  Product,
  Order,
  Review,
  SellerMetrics,
  ReviewDistribution,
  PaginatedResponse,
  SellerFilters,
  ProductFilters,
  OrderFilters,
  ProductCreateInput,
} from '@/types/marketplace';

// ============================================================================
// Sellers Mock Data
// ============================================================================

export const mockSellers: Seller[] = [
  {
    id: 'seller-1',
    name: 'Tech Solutions Ltda',
    slug: 'tech-solutions',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop',
    banner: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=400&fit=crop',
    description: 'Empresa especializada em tecnologia e informática, oferecendo os melhores produtos de eletrônica e informática da região. Com mais de 5 anos de experiência, garantimos qualidade e confiança em cada venda.',
    location: { city: 'Suzano', state: 'SP' },
    rating: 4.8,
    reviewCount: 127,
    productCount: 42,
    salesCount: 89,
    isVerified: true,
    isPremium: true,
    isNew: false,
    createdAt: '2024-01-15',
    phone: '(11) 99999-9999',
    whatsapp: '(11) 99999-9999',
    email: 'contato@techsolutions.com.br',
    cnpj: '12.345.678/0001-90',
    businessHours: 'Seg-Sex: 9h às 18h',
    categories: ['Eletrônicos', 'Acessórios'],
  },
  {
    id: 'seller-2',
    name: 'Beleza & Estilo',
    slug: 'beleza-estilo',
    logo: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=200&fit=crop',
    banner: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1200&h=400&fit=crop',
    description: 'Cosméticos e produtos de beleza de alta qualidade. Trabajamos com as melhores marcas do mercado para garantir a satisfação das nossas clientes.',
    location: { city: 'Mogi das Cruzes', state: 'SP' },
    rating: 4.5,
    reviewCount: 89,
    productCount: 156,
    salesCount: 234,
    isVerified: true,
    isPremium: false,
    isNew: false,
    createdAt: '2024-03-20',
    phone: '(11) 88888-8888',
    whatsapp: '(11) 88888-8888',
    categories: ['Beleza e Cosméticos'],
  },
  {
    id: 'seller-3',
    name: 'Doces da Vovó',
    slug: 'doces-da-vovo',
    logo: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&h=200&fit=crop',
    banner: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=1200&h=400&fit=crop',
    description: 'Doces artesanais feitos com receitas de família. Tortas, bolos, brigadeiros e muito mais!',
    location: { city: 'Suzano', state: 'SP' },
    rating: 4.9,
    reviewCount: 56,
    productCount: 28,
    salesCount: 412,
    isVerified: true,
    isPremium: true,
    isNew: false,
    createdAt: '2023-11-10',
    phone: '(11) 77777-7777',
    whatsapp: '(11) 77777-7777',
    businessHours: 'Seg-Sáb: 8h às 18h',
    categories: ['Alimentos e Bebidas'],
  },
  {
    id: 'seller-4',
    name: 'Ótica Express',
    slug: 'otica-express',
    logo: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=200&h=200&fit=crop',
    banner: null,
    description: 'Óculos de grau, solares e lentes de contato. Atendimento personalizado e preços acessíveis.',
    location: { city: 'Itaquaquecetuba', state: 'SP' },
    rating: 4.2,
    reviewCount: 34,
    productCount: 15,
    salesCount: 67,
    isVerified: false,
    isPremium: false,
    isNew: true,
    createdAt: '2026-02-28',
    categories: ['Outros'],
  },
  {
    id: 'seller-5',
    name: 'Esporte Total',
    slug: 'esporte-total',
    logo: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=200&fit=crop',
    banner: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=400&fit=crop',
    description: 'Artigos esportivos para todas as modalidades. futebol, musculação, natação e muito mais.',
    location: { city: 'Mogi das Cruzes', state: 'SP' },
    rating: 4.6,
    reviewCount: 78,
    productCount: 89,
    salesCount: 156,
    isVerified: true,
    isPremium: false,
    isNew: false,
    createdAt: '2024-06-15',
    phone: '(11) 66666-6666',
    categories: ['Esportes e Lazer'],
  },
  {
    id: 'seller-6',
    name: 'Móveis & CIA',
    slug: 'moveis-cia',
    logo: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop',
    banner: 'https://images.unsplash.com/photo-1550226891-ef816aed4a98?w=1200&h=400&fit=crop',
    description: 'Móveis planejados e prontos para sua casa ou empresa. Qualidade e bom gosto.',
    location: { city: 'Poá', state: 'SP' },
    rating: 4.7,
    reviewCount: 45,
    productCount: 34,
    salesCount: 78,
    isVerified: true,
    isPremium: true,
    isNew: false,
    createdAt: '2024-02-20',
    businessHours: 'Seg-Sex: 9h às 18h, Sáb: 9h às 13h',
    categories: ['Móveis e Decoração'],
  },
  {
    id: 'seller-7',
    name: 'Roupas da Moda',
    slug: 'roupas-da-moda',
    logo: null,
    banner: null,
    description: 'Moda feminina e masculina com as últimas tendências. Qualidade e preço justo.',
    location: { city: 'Ferraz de Vasconcelos', state: 'SP' },
    rating: 4.3,
    reviewCount: 23,
    productCount: 67,
    salesCount: 45,
    isVerified: false,
    isPremium: false,
    isNew: true,
    createdAt: '2026-03-01',
    categories: ['Roupas e Acessórios'],
  },
  {
    id: 'seller-8',
    name: 'Auto Peças Plus',
    slug: 'auto-pecas-plus',
    logo: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=200&fit=crop',
    banner: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop',
    description: 'Peças e acessórios para automobiles de todas as marcas. Original e equivalente.',
    location: { city: 'Suzano', state: 'SP' },
    rating: 4.4,
    reviewCount: 67,
    productCount: 234,
    salesCount: 189,
    isVerified: true,
    isPremium: false,
    isNew: false,
    createdAt: '2024-04-10',
    phone: '(11) 55555-5555',
    categories: ['Outros'],
  },
];

// ============================================================================
// Products Mock Data
// ============================================================================

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    sellerId: 'seller-1',
    name: 'Notebook Dell Inspiron 15 8GB RAM 256GB SSD Intel Core i5',
    description: 'Notebook ideal para trabalho e estudos. Processador Intel Core i5 de 10ª geração, 8GB RAM, 256GB SSD.',
    price: 2499.00,
    compareAtPrice: 2999.00,
    images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop'],
    category: 'Eletrônicos',
    stock: 12,
    status: 'active',
    salesCount: 234,
    rating: 4.9,
    reviewCount: 128,
    sku: 'NOTE-DELL-001',
    hasFreeShipping: true,
    createdAt: '2024-06-15',
    updatedAt: '2026-03-15',
  },
  {
    id: 'prod-2',
    sellerId: 'seller-1',
    name: 'Teclado Mecânico RGB Gamer',
    description: 'Teclado gamer com switches blue, iluminação RGB personalizável e anti-ghosting.',
    price: 189.00,
    images: ['https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600&h=600&fit=crop'],
    category: 'Eletrônicos',
    stock: 25,
    status: 'active',
    salesCount: 89,
    rating: 4.7,
    reviewCount: 45,
    sku: 'TECL-GAMER-001',
    hasFreeShipping: true,
    createdAt: '2024-07-20',
    updatedAt: '2026-02-28',
  },
  {
    id: 'prod-3',
    sellerId: 'seller-1',
    name: 'Mouse Gamer Wireless 7200 DPI',
    description: 'Mouse sem fio com sensor óptico de alta precisão, 6 botões programáveis.',
    price: 129.00,
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop'],
    category: 'Eletrônicos',
    stock: 0,
    status: 'out_of_stock',
    salesCount: 156,
    rating: 4.5,
    reviewCount: 78,
    sku: 'MOUSE-GAMER-001',
    hasFreeShipping: false,
    createdAt: '2024-08-10',
    updatedAt: '2026-03-10',
  },
  {
    id: 'prod-4',
    sellerId: 'seller-1',
    name: 'Monitor LED 24" Full HD',
    description: 'Monitor de 24 polegadas com resolução Full HD, tempo de resposta de 5ms.',
    price: 899.00,
    compareAtPrice: 1099.00,
    images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop'],
    category: 'Eletrônicos',
    stock: 8,
    status: 'active',
    salesCount: 67,
    rating: 4.8,
    reviewCount: 34,
    sku: 'MON-LED-24-001',
    hasFreeShipping: true,
    createdAt: '2024-09-05',
    updatedAt: '2026-03-01',
  },
  {
    id: 'prod-5',
    sellerId: 'seller-2',
    name: 'Kit Maquiagem Profissional',
    description: 'Kit completo com 12 cores de sombra, blush, base e pincéis profissionais.',
    price: 89.90,
    images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop'],
    category: 'Beleza e Cosméticos',
    stock: 45,
    status: 'active',
    salesCount: 234,
    rating: 4.6,
    reviewCount: 89,
    sku: 'MAQ-PRO-001',
    hasFreeShipping: true,
    createdAt: '2024-05-10',
    updatedAt: '2026-03-15',
  },
  {
    id: 'prod-6',
    sellerId: 'seller-2',
    name: 'Perfume Feminino Chanel N°5 100ml',
    description: 'Perfume original Chanel N°5, essência sofisticada para ocasiões especiais.',
    price: 459.90,
    images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=600&fit=crop'],
    category: 'Beleza e Cosméticos',
    stock: 12,
    status: 'active',
    salesCount: 67,
    rating: 4.9,
    reviewCount: 45,
    sku: 'PERF-CHAN-001',
    hasFreeShipping: true,
    createdAt: '2024-06-20',
    updatedAt: '2026-03-10',
  },
  {
    id: 'prod-7',
    sellerId: 'seller-3',
    name: 'Torta Holandesa 500g',
    description: 'Torta holandesa cremosa com biscoito maizena e cobertura de chocolate belga.',
    price: 45.90,
    images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop'],
    category: 'Alimentos e Bebidas',
    stock: 15,
    status: 'active',
    salesCount: 567,
    rating: 5.0,
    reviewCount: 234,
    sku: 'DOC-TORTA-001',
    hasFreeShipping: false,
    createdAt: '2024-04-15',
    updatedAt: '2026-03-18',
  },
  {
    id: 'prod-8',
    sellerId: 'seller-3',
    name: 'Brigadeiro Gourmet cx/30un',
    description: 'Caixa com 30 brigadeiros gourmet de chocolate meio amargo.',
    price: 39.90,
    images: ['https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=600&fit=crop'],
    category: 'Alimentos e Bebidas',
    stock: 30,
    status: 'active',
    salesCount: 890,
    rating: 4.9,
    reviewCount: 456,
    sku: 'DOC-BRIG-001',
    hasFreeShipping: false,
    createdAt: '2024-05-01',
    updatedAt: '2026-03-20',
  },
  {
    id: 'prod-9',
    sellerId: 'seller-5',
    name: 'Bola de Futebol Adidas Pro',
    description: 'Bola oficial tamanho 5, couro sintético de alta qualidade.',
    price: 189.90,
    images: ['https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=600&h=600&fit=crop'],
    category: 'Esportes e Lazer',
    stock: 20,
    status: 'active',
    salesCount: 123,
    rating: 4.7,
    reviewCount: 56,
    sku: 'ESP-BOLA-001',
    hasFreeShipping: true,
    createdAt: '2024-07-10',
    updatedAt: '2026-03-15',
  },
  {
    id: 'prod-10',
    sellerId: 'seller-5',
    name: 'Halteres Reguláveis 20kg Par',
    description: 'Par de halteres com pesos ajustáveis de 1 a 10kg cada.',
    price: 299.90,
    images: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=600&fit=crop'],
    category: 'Esportes e Lazer',
    stock: 10,
    status: 'active',
    salesCount: 78,
    rating: 4.5,
    reviewCount: 34,
    sku: 'ESP-HAL-001',
    hasFreeShipping: true,
    createdAt: '2024-08-20',
    updatedAt: '2026-03-01',
  },
  {
    id: 'prod-11',
    sellerId: 'seller-6',
    name: 'Sofá 3 Lugares Retrátil',
    description: 'Sofá clássico 3 lugares com mecanismo retrátil e reclinável.',
    price: 2499.00,
    compareAtPrice: 2999.00,
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop'],
    category: 'Móveis e Decoração',
    stock: 3,
    status: 'active',
    salesCount: 45,
    rating: 4.6,
    reviewCount: 23,
    sku: 'MOV-SOFA-001',
    hasFreeShipping: true,
    createdAt: '2024-09-01',
    updatedAt: '2026-03-10',
  },
  {
    id: 'prod-12',
    sellerId: 'seller-7',
    name: 'Camisa Social Slim Fit',
    description: 'Camisa social masculina em algodão com corte slim.',
    price: 79.90,
    images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=600&fit=crop'],
    category: 'Roupas e Acessórios',
    stock: 50,
    status: 'active',
    salesCount: 89,
    rating: 4.4,
    reviewCount: 34,
    sku: 'ROU-CAM-001',
    hasFreeShipping: false,
    createdAt: '2026-02-15',
    updatedAt: '2026-03-18',
  },
];

// ============================================================================
// Orders Mock Data
// ============================================================================

export const mockOrders: Order[] = [
  {
    id: 'order-1',
    orderNumber: 'PED-2026-0145',
    sellerId: 'seller-1',
    customer: { name: 'Maria Oliveira', email: 'maria@email.com', phone: '(11) 99999-1111' },
    items: [
      {
        id: 'item-1',
        productId: 'prod-1',
        productName: 'Notebook Dell Inspiron 15',
        productImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop',
        quantity: 1,
        price: 2499.00,
      },
    ],
    subtotal: 2499.00,
    shipping: 0,
    discount: 0,
    total: 2499.00,
    status: 'pending',
    notes: 'Cliente solicita entrega no período da manhã.',
    shippingAddress: {
      street: 'Rua das Flores, 123',
      city: 'Suzano',
      state: 'SP',
      zipCode: '08673-100',
    },
    createdAt: '2026-03-21T14:30:00Z',
    updatedAt: '2026-03-21T14:30:00Z',
  },
  {
    id: 'order-2',
    orderNumber: 'PED-2026-0144',
    sellerId: 'seller-1',
    customer: { name: 'João Silva', email: 'joao@email.com' },
    items: [
      {
        id: 'item-2',
        productId: 'prod-2',
        productName: 'Teclado Mecânico RGB',
        productImage: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=100&h=100&fit=crop',
        quantity: 1,
        price: 189.00,
      },
      {
        id: 'item-3',
        productId: 'prod-4',
        productName: 'Monitor LED 24"',
        productImage: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=100&h=100&fit=crop',
        quantity: 1,
        price: 899.00,
      },
    ],
    subtotal: 1088.00,
    shipping: 25.00,
    discount: 50.00,
    total: 1063.00,
    status: 'paid',
    shippingAddress: {
      street: 'Av. Brasil, 456',
      city: 'Mogi das Cruzes',
      state: 'SP',
      zipCode: '08780-100',
    },
    createdAt: '2026-03-20T10:15:00Z',
    updatedAt: '2026-03-20T15:45:00Z',
  },
  {
    id: 'order-3',
    orderNumber: 'PED-2026-0143',
    sellerId: 'seller-1',
    customer: { name: 'Ana Costa', email: 'ana@email.com' },
    items: [
      {
        id: 'item-4',
        productId: 'prod-1',
        productName: 'Notebook Dell Inspiron 15',
        productImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop',
        quantity: 1,
        price: 2499.00,
      },
    ],
    subtotal: 2499.00,
    shipping: 0,
    discount: 200.00,
    total: 2299.00,
    status: 'shipped',
    notes: 'Enviado via Correios - PAC',
    shippingAddress: {
      street: 'Rua do Sol, 789',
      city: 'Itaquaquecetuba',
      state: 'SP',
      zipCode: '08570-100',
    },
    createdAt: '2026-03-18T09:00:00Z',
    updatedAt: '2026-03-19T16:30:00Z',
  },
  {
    id: 'order-4',
    orderNumber: 'PED-2026-0142',
    sellerId: 'seller-1',
    customer: { name: 'Pedro Santos', email: 'pedro@email.com' },
    items: [
      {
        id: 'item-5',
        productId: 'prod-2',
        productName: 'Teclado Mecânico RGB',
        productImage: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=100&h=100&fit=crop',
        quantity: 2,
        price: 189.00,
      },
    ],
    subtotal: 378.00,
    shipping: 15.00,
    discount: 0,
    total: 393.00,
    status: 'delivered',
    shippingAddress: {
      street: 'Alameda das Palmeiras, 321',
      city: 'Poá',
      state: 'SP',
      zipCode: '08550-100',
    },
    createdAt: '2026-03-10T11:20:00Z',
    updatedAt: '2026-03-15T14:00:00Z',
  },
  {
    id: 'order-5',
    orderNumber: 'PED-2026-0141',
    sellerId: 'seller-2',
    customer: { name: 'Carla Mendes', email: 'carla@email.com' },
    items: [
      {
        id: 'item-6',
        productId: 'prod-5',
        productName: 'Kit Maquiagem Profissional',
        productImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop',
        quantity: 1,
        price: 89.90,
      },
    ],
    subtotal: 89.90,
    shipping: 10.00,
    discount: 0,
    total: 99.90,
    status: 'pending',
    createdAt: '2026-03-21T16:45:00Z',
    updatedAt: '2026-03-21T16:45:00Z',
  },
];

// ============================================================================
// Reviews Mock Data
// ============================================================================

export const mockReviews: Review[] = [
  {
    id: 'review-1',
    sellerId: 'seller-1',
    productId: 'prod-1',
    productName: 'Notebook Dell Inspiron 15',
    customerName: 'João Silva',
    rating: 5,
    title: 'Excelente notebook!',
    content: 'Produto de qualidade, chegou rápido e bem embalado. Superou minhas expectativas!',
    photos: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop'],
    isVerifiedPurchase: true,
    createdAt: '2026-03-20',
    reply: {
      content: 'Obrigado pela compra! Estamos à disposição.',
      createdAt: '2026-03-20',
    },
  },
  {
    id: 'review-2',
    sellerId: 'seller-1',
    productId: 'prod-2',
    productName: 'Teclado Mecânico RGB',
    customerName: 'Maria Oliveira',
    rating: 5,
    title: 'Melhor teclado que já tive!',
    content: 'A iluminação RGB é linda e os switches blue têm um click satisfatório. Recomendo!',
    isVerifiedPurchase: true,
    createdAt: '2026-03-18',
  },
  {
    id: 'review-3',
    sellerId: 'seller-1',
    productId: 'prod-4',
    productName: 'Monitor LED 24"',
    customerName: 'Carlos Santos',
    rating: 4,
    title: 'Bom custo-benefício',
    content: 'Monitor bom para o preço. A única coisa que melhoraria é ter mais entradas HDMI.',
    isVerifiedPurchase: true,
    createdAt: '2026-03-15',
  },
  {
    id: 'review-4',
    sellerId: 'seller-2',
    productId: 'prod-5',
    productName: 'Kit Maquiagem Profissional',
    customerName: 'Fernanda Lima',
    rating: 5,
    title: 'Amei o kit!',
    content: 'Chegou tudo certinho, cores lindas e pincéis de qualidade. Vou comprar mais vezes!',
    photos: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop'],
    isVerifiedPurchase: true,
    createdAt: '2026-03-19',
    reply: {
      content: 'Que alegria ler seu feedback! Obrigada e volte sempre! 💄',
      createdAt: '2026-03-19',
    },
  },
  {
    id: 'review-5',
    sellerId: 'seller-3',
    productId: 'prod-7',
    productName: 'Torta Holandesa',
    customerName: 'Patricia Almeida',
    rating: 5,
    title: 'Torta deliciosa!',
    content: 'A melhor torta holandesa que já provei! Ingredientes de qualidade e sabor incrível.',
    isVerifiedPurchase: true,
    createdAt: '2026-03-17',
  },
  {
    id: 'review-6',
    sellerId: 'seller-3',
    productId: 'prod-8',
    productName: 'Brigadeiro Gourmet',
    customerName: 'Roberto Ferreira',
    rating: 4,
    content: 'Brigadeiros muito bons, mas achei que poderiam ser um pouco maiores.',
    isVerifiedPurchase: true,
    createdAt: '2026-03-14',
  },
  {
    id: 'review-7',
    sellerId: 'seller-1',
    productId: 'prod-1',
    productName: 'Notebook Dell Inspiron 15',
    customerName: 'Lucas Oliveira',
    rating: 5,
    title: 'Perfeito para trabalho!',
    content: 'Rapidez na entrega e produto exatamente como descrito. Recomendo a loja!',
    isVerifiedPurchase: true,
    createdAt: '2026-03-12',
  },
];

// ============================================================================
// Metrics Mock Data
// ============================================================================

export const mockSellerMetrics: SellerMetrics = {
  salesMonth: 12450,
  salesMonthChange: 15,
  revenueToday: 890,
  ordersPending: 12,
  ordersNewToday: 5,
  productsActive: 42,
  productsTotal: 48,
};

// ============================================================================
// Review Distribution Mock Data
// ============================================================================

export const mockReviewDistribution: ReviewDistribution = {
  5: 99,
  4: 18,
  3: 7,
  2: 2,
  1: 1,
  average: 4.8,
  total: 127,
};

// ============================================================================
// Mock API Functions
// ============================================================================

/**
 * Get paginated sellers with filters
 */
export async function mockGetSellers(
  filters: SellerFilters
): Promise<PaginatedResponse<Seller>> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filtered = [...mockSellers];

  // Apply filters
  if (filters.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.name.toLowerCase().includes(search) ||
        s.description.toLowerCase().includes(search) ||
        s.categories?.some((c) => c.toLowerCase().includes(search))
    );
  }

  if (filters.category) {
    filtered = filtered.filter((s) =>
      s.categories?.some((c) =>
        c.toLowerCase().includes(filters.category!.toLowerCase())
      )
    );
  }

  if (filters.location) {
    filtered = filtered.filter(
      (s) => s.location.city === filters.location
    );
  }

  if (filters.minRating) {
    filtered = filtered.filter(
      (s) => s.rating >= (filters.minRating || 0)
    );
  }

  // Apply sorting
  switch (filters.sort) {
    case 'rating_desc':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'products_desc':
      filtered.sort((a, b) => b.productCount - a.productCount);
      break;
    case 'sales_desc':
      filtered.sort((a, b) => b.salesCount - a.salesCount);
      break;
    case 'newest':
      filtered.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    default:
      // relevance - prioritize verified and premium
      filtered.sort((a, b) => {
        if (a.isPremium !== b.isPremium) return a.isPremium ? -1 : 1;
        if (a.isVerified !== b.isVerified) return a.isVerified ? -1 : 1;
        return b.rating - a.rating;
      });
  }

  // Pagination
  const page = filters.page || 1;
  const limit = filters.limit || 12;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  return {
    data: paginated,
    total: filtered.length,
    page,
    limit,
    totalPages: Math.ceil(filtered.length / limit),
    hasNext: end < filtered.length,
    hasPrev: page > 1,
  };
}

/**
 * Get seller by slug
 */
export async function mockGetSellerBySlug(
  slug: string
): Promise<Seller | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockSellers.find((s) => s.slug === slug) || null;
}

/**
 * Get products by seller
 */
export async function mockGetSellerProducts(
  sellerId: string,
  filters?: ProductFilters
): Promise<PaginatedResponse<Product>> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  let filtered = mockProducts.filter((p) => p.sellerId === sellerId);

  if (filters?.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
    );
  }

  if (filters?.category) {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === filters.category!.toLowerCase()
    );
  }

  // Sorting
  switch (filters?.sort) {
    case 'price_asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'sales_desc':
      filtered.sort((a, b) => b.salesCount - a.salesCount);
      break;
    case 'newest':
    default:
      filtered.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }

  const page = filters?.page || 1;
  const limit = filters?.limit || 12;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  return {
    data: paginated,
    total: filtered.length,
    page,
    limit,
    totalPages: Math.ceil(filtered.length / limit),
    hasNext: end < filtered.length,
    hasPrev: page > 1,
  };
}

/**
 * Get orders by seller
 */
export async function mockGetSellerOrders(
  sellerId: string,
  filters?: OrderFilters
): Promise<PaginatedResponse<Order>> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  let filtered = mockOrders.filter((o) => o.sellerId === sellerId);

  if (filters?.status) {
    filtered = filtered.filter((o) => o.status === filters.status);
  }

  if (filters?.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(
      (o) =>
        o.orderNumber.toLowerCase().includes(search) ||
        o.customer.name.toLowerCase().includes(search)
    );
  }

  // Sort by date (newest first)
  filtered.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const page = filters?.page || 1;
  const limit = filters?.limit || 10;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  return {
    data: paginated,
    total: filtered.length,
    page,
    limit,
    totalPages: Math.ceil(filtered.length / limit),
    hasNext: end < filtered.length,
    hasPrev: page > 1,
  };
}

/**
 * Get reviews by seller
 */
export async function mockGetSellerReviews(
  sellerId: string
): Promise<Review[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockReviews.filter((r) => r.sellerId === sellerId);
}

/**
 * Get review distribution for seller
 */
export async function mockGetReviewDistribution(
  sellerId: string
): Promise<ReviewDistribution> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockReviewDistribution;
}

/**
 * Reply to a review
 */
export async function mockReplyReview(
  reviewId: string,
  content: string
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const review = mockReviews.find((r) => r.id === reviewId);
  if (review) {
    review.reply = {
      content,
      createdAt: new Date().toISOString(),
    };
  }
}

/**
 * Get seller's own store
 */
export async function mockGetMyStore(): Promise<Seller | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  // Simulate logged-in seller
  return mockSellers[0];
}

/**
 * Get seller's metrics
 */
export async function mockGetSellerMetrics(
  sellerId: string
): Promise<SellerMetrics> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockSellerMetrics;
}

/**
 * Update seller profile
 */
export async function mockUpdateMyStore(
  sellerId: string,
  data: Partial<Seller>
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = mockSellers.findIndex((s) => s.id === sellerId);
  if (index !== -1) {
    mockSellers[index] = { ...mockSellers[index], ...data };
  }
}

/**
 * Create product
 */
export async function mockCreateProduct(
  data: ProductCreateInput
): Promise<Product> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newProduct: Product = {
    id: `prod-${Date.now()}`,
    sellerId: data.sellerId || 'seller-1',
    name: data.name,
    description: data.description,
    price: data.price,
    compareAtPrice: data.compareAtPrice,
    images: data.images,
    category: data.category,
    categoryId: data.categoryId,
    stock: data.stock,
    status: data.status || 'active',
    salesCount: 0,
    sku: data.sku,
    tags: data.tags,
    hasFreeShipping: data.hasFreeShipping,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockProducts.push(newProduct);
  return newProduct;
}

/**
 * Update product
 */
export async function mockUpdateProduct(
  productId: string,
  data: Partial<Product>
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = mockProducts.findIndex((p) => p.id === productId);
  if (index !== -1) {
    mockProducts[index] = {
      ...mockProducts[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
  }
}

/**
 * Delete product
 */
export async function mockDeleteProduct(productId: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const index = mockProducts.findIndex((p) => p.id === productId);
  if (index !== -1) {
    mockProducts.splice(index, 1);
  }
}

/**
 * Duplicate product
 */
export async function mockDuplicateProduct(productId: string): Promise<Product> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const original = mockProducts.find((p) => p.id === productId);
  if (!original) throw new Error('Product not found');
  
  const duplicate: Product = {
    ...original,
    id: `prod-${Date.now()}`,
    name: `${original.name} (Cópia)`,
    status: 'draft',
    salesCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockProducts.push(duplicate);
  return duplicate;
}

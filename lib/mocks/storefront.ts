import { StoreConfig, Category, Product, ThemeTemplate } from '@/types/storefront';
import { CartItem, CartSummary } from '@/types/cart';
import { PaymentMethod, Order } from '@/types/checkout';

// Configuração da loja
export const mockStoreConfig: StoreConfig = {
  id: 'store-001',
  name: 'Ótica Visão',
  slug: 'otica-visao',
  description: 'A melhor ótica da cidade. Óculos de sol, armações e lentes de qualidade.',
  logo: '/images/logo-otica.png',
  favicon: '/images/favicon.ico',
  banner: '/images/banner-otica.jpg',
  bannerMobile: '/images/banner-otica-mobile.jpg',
  phone: '(11) 99999-9999',
  whatsapp: '(11) 99999-9999',
  email: 'contato@oticavisao.com.br',
  address: {
    street: 'Rua das Flores',
    number: '123',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01001-000'
  },
  social: {
    instagram: '@oticavisao',
    facebook: '/oticavisao',
    whatsapp: '5511999999999'
  },
  theme: {
    template: 'modern',
    primaryColor: '#3B82F6',
    secondaryColor: '#1F2937',
    accentColor: '#86CB92',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937'
  },
  seo: {
    title: 'Ótica Visão - Óculos de Sol e Armações',
    description: 'Encontre os melhores óculos de sol e armações na Ótica Visão. Qualidade e preço justo.',
    image: '/images/seo-image.jpg'
  },
  settings: {
    currency: 'BRL',
    currencySymbol: 'R$',
    freeShippingThreshold: 299.90,
    shippingCost: 15.90,
    showStock: true,
    allowBackorder: false
  }
};

// Categorias de produtos
export const mockCategories: Category[] = [
  { id: 1, name: 'Óculos de Sol', slug: 'oculos-de-sol', count: 15, image: '/images/cat-oculos-sol.jpg' },
  { id: 2, name: 'Armações', slug: 'armacoes', count: 32, image: '/images/cat-armacoes.jpg' },
  { id: 3, name: 'Lentes', slug: 'lentes', count: 8, image: '/images/cat-lentes.jpg' },
  { id: 4, name: 'Acessórios', slug: 'acessorios', count: 24, image: '/images/cat-acessorios.jpg' },
  { id: 5, name: 'Infantil', slug: 'infantil', count: 12, image: '/images/cat-infantil.jpg' },
];

// Produtos
export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Óculos de Sol Ray-Ban Aviador',
    slug: 'oculos-de-sol-ray-ban-aviador',
    price: 899.90,
    originalPrice: 1199.90,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&h=800&fit=crop'
    ],
    category: 'Óculos de Sol',
    categoryId: 1,
    description: 'O clássico Aviador da Ray-Ban com proteção UV400 e lentes polarizadas. Design atemporal que nunca sai de moda.',
    features: ['Proteção UV400', 'Lentes polarizadas', 'Armação de metal', 'Estojo incluso'],
    stock: 5,
    sku: 'RB3025-001',
    rating: 4.8,
    reviewCount: 124,
    isNew: false,
    isBestseller: true,
    tags: ['polarizado', 'clássico', 'unissex']
  },
  {
    id: 2,
    name: 'Armação Titanium Ultra Leve',
    slug: 'armacao-titanium-ultra-leve',
    price: 459.90,
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800&h=800&fit=crop'],
    category: 'Armações',
    categoryId: 2,
    description: 'Armação em titânio de alta resistência e peso mínimo. Ideal para uso prolongado.',
    features: ['Titânio hipoalergênico', 'Peso: apenas 8g', 'Resistente à corrosão', 'Garantia de 2 anos'],
    stock: 12,
    sku: 'TIT-2024-001',
    rating: 4.5,
    reviewCount: 67,
    isNew: true,
    isBestseller: false,
    tags: ['leve', 'titânio', 'durável']
  },
  {
    id: 3,
    name: 'Óculos de Sol Oakley Holbrook',
    slug: 'oculos-de-sol-oakley-holbrook',
    price: 749.90,
    originalPrice: 899.90,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=800&fit=crop'
    ],
    category: 'Óculos de Sol',
    categoryId: 1,
    description: 'Design esportivo com tecnologia Prizm que melhora contraste e visibilidade.',
    features: ['Tecnologia Prizm', 'Resistente a impactos', 'Ideal para esportes', 'Proteção UV400'],
    stock: 8,
    sku: 'OO9102-D6',
    rating: 4.9,
    reviewCount: 203,
    isNew: false,
    isBestseller: true,
    tags: ['esportivo', 'prizm', 'masculino']
  },
  {
    id: 4,
    name: 'Lentes de Contato Acuvue Oasys',
    slug: 'lentes-de-contato-acuvue-oasys',
    price: 129.90,
    image: 'https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=800&h=800&fit=crop'],
    category: 'Lentes',
    categoryId: 3,
    description: 'Lentes de contato mensais com tecnologia Hydraclear Plus para máximo conforto.',
    features: ['Tecnologia Hydraclear Plus', 'Proteção UV', 'Caixa com 6 unidades', 'Uso mensal'],
    stock: 25,
    sku: 'ACV-OAS-6',
    rating: 4.7,
    reviewCount: 89,
    isNew: false,
    isBestseller: true,
    tags: ['contato', 'mensal', 'conforto']
  },
  {
    id: 5,
    name: 'Armação Vintage Redonda',
    slug: 'armacao-vintage-redonda',
    price: 299.90,
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800&h=800&fit=crop'],
    category: 'Armações',
    categoryId: 2,
    description: 'Estilo retrô com armação redonda em acetato. Perfeito para quem busca um look diferenciado.',
    features: ['Acetato de alta qualidade', 'Design vintage', 'Dobradiças reforçadas', 'Várias cores disponíveis'],
    stock: 0,
    sku: 'VNT-001',
    rating: 4.3,
    reviewCount: 45,
    isNew: true,
    isBestseller: false,
    tags: ['vintage', 'feminino', 'retrô']
  },
  {
    id: 6,
    name: 'Óculos de Sol Polaroid Infantil',
    slug: 'oculos-de-sol-polaroid-infantil',
    price: 159.90,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop'],
    category: 'Infantil',
    categoryId: 5,
    description: 'Óculos de sol infantil com proteção UV400 e armação flexível e resistente.',
    features: ['Proteção UV400', 'Armação flexível', 'Resistente a quebras', 'Cordão incluso'],
    stock: 18,
    sku: 'PLD-K001',
    rating: 4.6,
    reviewCount: 34,
    isNew: true,
    isBestseller: false,
    tags: ['infantil', 'flexível', 'seguro']
  }
];

// Carrinho inicial
export const mockCartItems: CartItem[] = [
  {
    productId: 1,
    name: 'Óculos de Sol Ray-Ban Aviador',
    price: 899.90,
    originalPrice: 1199.90,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    quantity: 1,
    sku: 'RB3025-001'
  },
  {
    productId: 4,
    name: 'Lentes de Contato Acuvue Oasys',
    price: 129.90,
    image: 'https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=500&h=500&fit=crop',
    quantity: 2,
    sku: 'ACV-OAS-6'
  }
];

export const mockCartSummary: CartSummary = {
  subtotal: 1159.70,
  discount: 0,
  shipping: 0,
  total: 1159.70,
  itemCount: 3
};

// Templates de tema
export const mockThemeTemplates: ThemeTemplate[] = [
  {
    id: 'modern',
    name: 'Moderno',
    description: 'Design clean e minimalista com foco nos produtos',
    preview: '/themes/modern-preview.jpg',
    features: ['Grid responsivo', 'Cards grandes', 'Busca destacada']
  },
  {
    id: 'classic',
    name: 'Clássico',
    description: 'Layout tradicional de e-commerce com sidebar de filtros',
    preview: '/themes/classic-preview.jpg',
    features: ['Sidebar fixa', 'Filtros visíveis', 'Lista de categorias']
  },
  {
    id: 'minimal',
    name: 'Minimalista',
    description: 'Máxima simplicidade com tipografia elegante',
    preview: '/themes/minimal-preview.jpg',
    features: ['Espaçamento amplo', 'Tipografia destacada', 'Sem distrações']
  }
];

// Métodos de pagamento
export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'credit_card',
    name: 'Cartão de Crédito',
    icon: 'credit-card',
    description: 'Parcele em até 12x',
    installments: [
      { times: 1, value: 1159.70 },
      { times: 2, value: 579.85 },
      { times: 3, value: 386.57 },
      { times: 6, value: 193.28 },
      { times: 12, value: 96.64 }
    ]
  },
  {
    id: 'pix',
    name: 'Pix',
    icon: 'qr-code',
    description: '5% de desconto',
    discount: 5,
    finalValue: 1101.72
  },
  {
    id: 'boleto',
    name: 'Boleto Bancário',
    icon: 'barcode',
    description: 'Vencimento em 3 dias úteis',
    discount: 0
  }
];

// Pedido de exemplo
export const mockOrder: Order = {
  id: 'ORD-2024-001',
  status: 'completed',
  createdAt: '2024-03-20T14:30:00Z',
  customer: {
    name: 'Maria Silva',
    email: 'maria@email.com',
    phone: '(11) 99999-9999'
  },
  shipping: {
    address: {
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apto 45',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01001-000'
    },
    method: 'Standard',
    cost: 0,
    estimatedDelivery: '23/03/2024'
  },
  payment: {
    method: 'pix',
    status: 'paid',
    paidAt: '2024-03-20T14:35:00Z'
  },
  items: mockCartItems,
  summary: {
    subtotal: 1159.70,
    discount: 57.99,
    shipping: 0,
    total: 1101.72,
    itemCount: 3
  }
};

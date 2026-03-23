import { FAQ } from '@/types/chat';

export const mockFAQ: FAQ[] = [
  {
    id: 'faq-1',
    question: 'Qual o horário de funcionamento?',
    answer: 'Nosso horário de atendimento é de segunda a sexta, das 9h às 18h. Aos sábados, das 9h às 13h.',
    keywords: ['horário', 'funcionamento', 'aberto', 'fecha'],
    isActive: true
  },
  {
    id: 'faq-2',
    question: 'Como faço para rastrear meu pedido?',
    answer: 'Você pode rastrear seu pedido pelo link enviado por WhatsApp ou pelo nosso site na área "Meus Pedidos".',
    keywords: ['rastrear', 'pedido', 'onde está', 'entrega'],
    isActive: true
  },
  {
    id: 'faq-3',
    question: 'Vocês fazem delivery?',
    answer: 'Sim! Fazemos delivery para toda a região. O prazo e valor do frete variam de acordo com sua localização.',
    keywords: ['delivery', 'entrega', 'frete', 'casa'],
    isActive: true
  },
  {
    id: 'faq-4',
    question: 'Quais formas de pagamento são aceitas?',
    answer: 'Aceitamos PIX, cartão de crédito (parcelamento em até 3x sem juros), cartão de débito e dinheiro.',
    keywords: ['pagamento', 'pix', 'cartão', 'parcelar'],
    isActive: true
  },
  {
    id: 'faq-5',
    question: 'Vocês têm garantia nos produtos?',
    answer: 'Sim! Oferecemos 1 ano de garantia de fábrica em todos os óculos de sol e armações. Para lentes, a garantia é de 6 meses.',
    keywords: ['garantia', 'defeito', 'quebrou'],
    isActive: true
  }
];

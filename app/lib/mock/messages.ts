import { Message } from '@/types/chat';

export const mockMessages: Record<string, Message[]> = {
  'conv-1': [
    {
      id: 'msg-1',
      conversationId: 'conv-1',
      sender: 'client',
      content: 'Olá! Vi no Instagram que vocês vendem óculos de sol. Tem algum modelo para homens?',
      timestamp: '2026-03-21T14:28:00',
      status: 'read'
    },
    {
      id: 'msg-2',
      conversationId: 'conv-1',
      sender: 'bot',
      content: 'Olá! 👋 Que bom que você nos encontrou! Sim, temos vários modelos de óculos de sol masculino. Posso te mostrar alguns?',
      timestamp: '2026-03-21T14:29:00',
      quickReplies: ['Ver modelos', 'Preços', 'Forma de pagamento']
    },
    {
      id: 'msg-3',
      conversationId: 'conv-1',
      sender: 'client',
      content: 'Quero ver os modelos!',
      timestamp: '2026-03-21T14:30:00',
      status: 'read'
    },
    {
      id: 'msg-4',
      conversationId: 'conv-1',
      sender: 'bot',
      content: 'Aqui estão nossos modelos masculino mais vendidos! 🕶️',
      timestamp: '2026-03-21T14:31:00',
      attachments: [
        {
          type: 'product',
          product: {
            id: 'prod-1',
            name: 'Óculos Ray-Ban Aviator',
            description: 'Masculino • Preto • Vintage',
            price: 349.90
          }
        }
      ],
      quickReplies: ['Ver mais modelos', 'Comprar agora']
    },
    {
      id: 'msg-5',
      conversationId: 'conv-1',
      sender: 'client',
      content: 'Obrigada pela ajuda! Vou verificar o estoque.',
      timestamp: '2026-03-21T14:32:00',
      status: 'read'
    }
  ],
  'conv-2': [
    {
      id: 'msg-6',
      conversationId: 'conv-2',
      sender: 'client',
      content: 'Bom dia! gostaria de saber sobre cross-sell',
      timestamp: '2026-03-21T13:40:00',
      status: 'read'
    },
    {
      id: 'msg-7',
      conversationId: 'conv-2',
      sender: 'bot',
      content: '🤖 Olá! Analisei seu histórico de vendas e encontrei 3 oportunidades de cross-sell interessantes:',
      timestamp: '2026-03-21T13:42:00',
      quickReplies: ['Ver detalhes', 'Ignorar']
    },
    {
      id: 'msg-8',
      conversationId: 'conv-2',
      sender: 'bot',
      content: '💡 Oportunidade 1: Clientes que compram armações frequentemente também compram lentes polarizadas.',
      timestamp: '2026-03-21T13:43:00'
    },
    {
      id: 'msg-9',
      conversationId: 'conv-2',
      sender: 'bot',
      content: '💡 Oportunidade 2: Kit limpeza é um complemento natural para todas as compras.',
      timestamp: '2026-03-21T13:44:00'
    },
    {
      id: 'msg-10',
      conversationId: 'conv-2',
      sender: 'bot',
      content: '💡 Oportunidade 3: Estojo para óculos tem alta taxa de conversão com clientes novos.',
      timestamp: '2026-03-21T13:45:00'
    }
  ],
  'conv-3': [
    {
      id: 'msg-11',
      conversationId: 'conv-3',
      sender: 'client',
      content: 'Olá, quero saber sobre o produto X',
      timestamp: '2026-03-20T10:00:00',
      status: 'read'
    },
    {
      id: 'msg-12',
      conversationId: 'conv-3',
      sender: 'system',
      content: 'Conversa encerrada automaticamente após 24h de inatividade',
      timestamp: '2026-03-21T10:20:00'
    }
  ],
  'conv-4': [
    {
      id: 'msg-13',
      conversationId: 'conv-4',
      sender: 'client',
      content: 'Tem esse produto disponível para retirada amanhã?',
      timestamp: '2026-03-21T09:15:00'
    }
  ],
  'conv-5': [
    {
      id: 'msg-14',
      conversationId: 'conv-5',
      sender: 'client',
      content: 'Vi que tem promoção em óculos de sol?',
      timestamp: '2026-03-21T11:30:00'
    }
  ],
  'conv-6': [
    {
      id: 'msg-15',
      conversationId: 'conv-6',
      sender: 'client',
      content: 'Olá! Gostaria de saber sobre horários de funcionamento.',
      timestamp: '2026-03-20T16:45:00',
      status: 'read'
    },
    {
      id: 'msg-16',
      conversationId: 'conv-6',
      sender: 'bot',
      content: 'Olá! 👋Nosso horário de atendimento é de segunda a sexta, das 9h às 18h. Aos sábados, das 9h às 13h.',
      timestamp: '2026-03-20T16:46:00',
      quickReplies: ['Obrigado(a)!', 'Tenho mais dúvidas']
    },
    {
      id: 'msg-17',
      conversationId: 'conv-6',
      sender: 'client',
      content: 'Obrigado!',
      timestamp: '2026-03-20T16:47:00',
      status: 'read'
    }
  ]
};

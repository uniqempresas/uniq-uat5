import { AutoMessage } from '@/types/chat';

export const mockAutoMessages: AutoMessage[] = [
  {
    id: 'auto-1',
    name: 'Saudação Inicial',
    content: 'Olá! 👋 Sou a MEL, sua assistente virtual. Como posso ajudar?',
    trigger: {
      type: 'greeting',
      conditions: ['horario_comercial']
    },
    quickReplies: ['Ver produtos', 'Meus pedidos', 'Agendar', 'Falar com atendente'],
    isActive: true,
    createdAt: '2026-01-15T00:00:00'
  },
  {
    id: 'auto-2',
    name: 'Fora do Horário',
    content: 'Olá! Agora estamos fora do horário de atendimento. Retornaremos às 9h. Você também pode deixar sua mensagem que responderemos assim que possível! 😊',
    trigger: {
      type: 'outside_hours',
      conditions: ['22:00-09:00']
    },
    isActive: true,
    createdAt: '2026-01-15T00:00:00'
  },
  {
    id: 'auto-3',
    name: 'Status do Pedido',
    content: 'Seu pedido está em preparo! Previsão de entrega: 15 minutos. 🚀',
    trigger: {
      type: 'keyword',
      conditions: ['pedido', 'entrega', 'rastrear']
    },
    quickReplies: ['Ver detalhes', 'Outra dúvida'],
    isActive: true,
    createdAt: '2026-01-20T00:00:00'
  },
  {
    id: 'auto-4',
    name: 'Horário de Funcionamento',
    content: '📅 Nosso horário de atendimento é:\n• Segunda a Sexta: 9h às 18h\n• Sábado: 9h às 13h\n• Domingo: Fechado',
    trigger: {
      type: 'keyword',
      conditions: ['horário', 'funcionamento', 'aberto', 'fecha']
    },
    isActive: true,
    createdAt: '2026-01-20T00:00:00'
  },
  {
    id: 'auto-5',
    name: 'Despedida',
    content: 'Foi um prazer ajudar! 😊 Se tiver mais dúvidas, é só chamar. Até logo!',
    trigger: {
      type: 'keyword',
      conditions: ['obrigado', 'tchau', 'até logo', 'valeu']
    },
    isActive: true,
    createdAt: '2026-01-25T00:00:00'
  }
];

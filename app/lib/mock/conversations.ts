import { Conversation } from '@/types/chat';

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    client: {
      id: 'cli-1',
      name: 'Maria Clara Santos',
      avatar: null,
      initials: 'MC',
      isOnline: true,
      phone: '(11) 99999-9999',
      color: 'blue'
    },
    lastMessage: {
      text: 'Obrigada pela ajuda! Vou verificar o estoque.',
      sender: 'client',
      timestamp: '2026-03-21T14:32:00'
    },
    unreadCount: 2,
    status: 'active',
    melHandling: false,
    tags: ['vendas', 'optica']
  },
  {
    id: 'conv-2',
    client: {
      id: 'cli-2',
      name: 'João Oliveira',
      avatar: null,
      initials: 'JO',
      isOnline: true,
      phone: '(11) 98888-8888',
      color: 'purple'
    },
    lastMessage: {
      text: '🤖: Encontrei 3 oportunidades de cross-sell...',
      sender: 'bot',
      timestamp: '2026-03-21T13:45:00'
    },
    unreadCount: 0,
    status: 'active',
    melHandling: true,
    tags: ['mel', 'insights']
  },
  {
    id: 'conv-3',
    client: {
      id: 'cli-3',
      name: 'Pedro Almeida',
      avatar: null,
      initials: 'PA',
      isOnline: false,
      phone: '(11) 97777-7777',
      color: 'amber'
    },
    lastMessage: {
      text: 'Encerrada automaticamente após 24h de inatividade',
      sender: 'system',
      timestamp: '2026-03-21T10:20:00'
    },
    unreadCount: 0,
    status: 'closed',
    melHandling: false,
    tags: []
  },
  {
    id: 'conv-4',
    client: {
      id: 'cli-4',
      name: 'Ana Silva',
      avatar: null,
      initials: 'AS',
      isOnline: false,
      isAway: true,
      phone: '(11) 96666-6666',
      color: 'teal'
    },
    lastMessage: {
      text: 'Tem esse produto disponível para retirada amanhã?',
      sender: 'client',
      timestamp: '2026-03-21T09:15:00'
    },
    unreadCount: 0,
    status: 'pending',
    melHandling: false,
    tags: ['retirada']
  },
  {
    id: 'conv-5',
    client: {
      id: 'cli-5',
      name: 'Carlos Eduardo',
      avatar: null,
      initials: 'CE',
      isOnline: true,
      phone: '(11) 95555-5555',
      color: 'pink'
    },
    lastMessage: {
      text: 'Vi que tem promoção em óculos de sol?',
      sender: 'client',
      timestamp: '2026-03-21T11:30:00'
    },
    unreadCount: 1,
    status: 'active',
    melHandling: false,
    tags: ['promoção', 'óculos']
  },
  {
    id: 'conv-6',
    client: {
      id: 'cli-6',
      name: 'Fernanda Lima',
      avatar: null,
      initials: 'FL',
      isOnline: false,
      phone: '(11) 94444-4444',
      color: 'indigo'
    },
    lastMessage: {
      text: 'Olá! Gostaria de saber sobre horários de funcionamento.',
      sender: 'client',
      timestamp: '2026-03-20T16:45:00'
    },
    unreadCount: 0,
    status: 'closed',
    melHandling: true,
    tags: ['horário']
  }
];

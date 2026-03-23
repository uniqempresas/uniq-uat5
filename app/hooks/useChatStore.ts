import { create } from 'zustand';
import { Conversation, Message, AutoMessage, FAQ } from '@/types/chat';
import { mockConversations } from '@/lib/mock/conversations';
import { mockMessages } from '@/lib/mock/messages';
import { mockAutoMessages } from '@/lib/mock/autoMessages';
import { mockFAQ } from '@/lib/mock/faq';

interface ChatState {
  // Estado
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  autoMessages: AutoMessage[];
  faqs: FAQ[];
  selectedConversationId: string | null;
  
  // Ações
  selectConversation: (id: string | null) => void;
  sendMessage: (conversationId: string, content: string) => void;
  addAutoMessage: (message: AutoMessage) => void;
  updateAutoMessage: (id: string, message: AutoMessage) => void;
  deleteAutoMessage: (id: string) => void;
  addFAQ: (faq: FAQ) => void;
  updateFAQ: (id: string, faq: FAQ) => void;
  deleteFAQ: (id: string) => void;
  markAsRead: (conversationId: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: mockConversations,
  messages: mockMessages,
  autoMessages: mockAutoMessages,
  faqs: mockFAQ,
  selectedConversationId: null,
  
  selectConversation: (id) => set({ selectedConversationId: id }),
  
  sendMessage: (conversationId, content) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      sender: 'client',
      content,
      timestamp: new Date().toISOString(),
      status: 'sent',
    };
    
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: [...(state.messages[conversationId] || []), newMessage],
      },
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? { ...conv, lastMessage: { text: content, sender: 'client' as const, timestamp: newMessage.timestamp }, unreadCount: 0 }
          : conv
      ),
    }));
  },
  
  addAutoMessage: (message) => 
    set((state) => ({ autoMessages: [...state.autoMessages, message] })),
  
  updateAutoMessage: (id, message) =>
    set((state) => ({
      autoMessages: state.autoMessages.map((m) => (m.id === id ? message : m)),
    })),
  
  deleteAutoMessage: (id) =>
    set((state) => ({
      autoMessages: state.autoMessages.filter((m) => m.id !== id),
    })),
  
  addFAQ: (faq) => set((state) => ({ faqs: [...state.faqs, faq] })),
  
  updateFAQ: (id, faq) =>
    set((state) => ({
      faqs: state.faqs.map((f) => (f.id === id ? faq : f)),
    })),
  
  deleteFAQ: (id) =>
    set((state) => ({ faqs: state.faqs.filter((f) => f.id !== id) })),
  
  markAsRead: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
      ),
    })),
}));

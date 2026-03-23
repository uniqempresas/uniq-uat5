# SPEC - Sprint 10: Chatbot UI (MEL) 🤖

## Overview Técnico

- **Stack:** React 19 + TypeScript 5.4 + Next.js 15 + Tailwind CSS 4.0 + shadcn/ui
- **Padrão:** Componentes funcionais com hooks
- **Estado:** Zustand para estado global do chat
- **Data:** date-fns para manipulação de datas
- **Design System:** Cores MEL (#86cb92 emerald), sidebar dark (#1f2937), tema WhatsApp-style

**Data da SPEC:** 21/03/2026  
**Baseada no PRD:** `tracking/plans/prd-sprint-10-chatbot.md`  
**Referência UI:** `docs/ui/modulo-10-chatbot.md`  
**Contexto MEL:** `docs/ui/modulo-09-mel.md`

---

## 1. Estrutura de Diretórios

```
app/
├── chat/
│   ├── page.tsx                              # Redireciona para /conversas
│   ├── conversas/
│   │   └── page.tsx                         # Painel de conversas (lista WhatsApp)
│   ├── conversa/
│   │   └── [id]/
│   │       └── page.tsx                     # Janela de conversa específica
│   └── configuracoes/
│       └── page.tsx                         # Dashboard de configuração chatbot
│
├── components/
│   └── chat/
│       ├── ConversationsList.tsx             # Lista estilo WhatsApp
│       ├── ConversationItem.tsx             # Item de conversa individual
│       ├── ConversationHeader.tsx           # Header com info do cliente
│       ├── MessageBubble.tsx                 # Balão de mensagem (user/bot)
│       ├── QuickReplies.tsx                 # Botões de resposta rápida
│       ├── TypingIndicator.tsx               # Indicador de digitação animado
│       ├── MessageInput.tsx                 # Input com anexo e emoji
│       ├── ProductCard.tsx                  # Card de produto no chat
│       ├── AppointmentCard.tsx               # Card de agendamento
│       ├── DateSeparator.tsx                 # Separador de data
│       ├── SystemMessage.tsx                 # Mensagem de sistema
│       ├── ChatFilters.tsx                   # Filtros (Todas, Não Lidas, Abertas)
│       ├── ChatSearch.tsx                   # Busca de conversas
│       ├── MELBadge.tsx                     # Badge indicativo MEL
│       ├── StatsCards.tsx                    # Cards de estatísticas
│       ├── AutoMessageEditor.tsx            # Editor de mensagens auto
│       ├── FAQEditor.tsx                    # Editor de FAQ
│       ├── KeywordManager.tsx                # Gerenciador de palavras-chave
│       ├── BehaviorSettings.tsx              # Configurações de comportamento
│       └── index.ts                         # Export barrel
│
├── hooks/
│   ├── useConversations.ts                  # Gerenciamento de conversas
│   ├── useMessages.ts                       # CRUD de mensagens e mock data
│   ├── useTypingIndicator.ts                # Simulação de digitação
│   ├── useQuickReplies.ts                  # Gerenciamento de quick replies
│   ├── useChatFilters.ts                   # Filtros de conversas
│   ├── useChatSearch.ts                     # Busca em tempo real
│   ├── useMELConfig.ts                     # Configurações do chatbot MEL
│   └── useAutoMessages.ts                  # Mensagens automáticas
│
├── lib/
│   ├── utils/
│   │   ├── chatUtils.ts                    # Funções auxiliares para chat
│   │   ├── messageTypes.ts                 # Mapeamento de tipos de mensagem
│   │   └── chatColors.ts                   # Cores por tipo de conversa
│   └── mock/
│       ├── conversations.ts                  # Dados mockados de conversas
│       ├── messages.ts                      # Dados mockados de mensagens
│       ├── autoMessages.ts                  # Mensagens automáticas mock
│       └── faq.ts                          # FAQ mock
│
└── types/
    └── chat.ts                             # Tipos TypeScript completos
```

---

## 2. Dependências

### 2.1 Instalar Pacotes

```bash
npm install zustand date-fns
```

### 2.2 Componentes shadcn/ui Necessários

```bash
npx shadcn add dialog button input textarea select badge avatar scroll-area separator skeleton tabs toggle popover tooltip
```

### 2.3 package.json

```json
{
  "dependencies": {
    "date-fns": "^3.6.0",
    "lucide-react": "^0.400.0",
    "zustand": "^4.5.0"
  }
}
```

---

## 3. Interfaces TypeScript

### 3.1 Tipos Principais

**Arquivo:** `app/types/chat.ts`

```typescript
// ============================================
// ENUMS E TIPOS BASE
// ============================================

export type MessageSender = 'client' | 'bot' | 'system';
export type ConversationStatus = 'active' | 'pending' | 'closed';
export type MessageStatus = 'sent' | 'delivered' | 'read';
export type TriggerType = 'greeting' | 'keyword' | 'outside_hours' | 'manual';
export type FilterType = 'all' | 'unread' | 'open';

// ============================================
// ENTIDADES PRINCIPAIS
// ============================================

export interface Client {
  id: string;
  name: string;
  avatar: string | null;
  initials: string;
  isOnline: boolean;
  isAway?: boolean;
  phone: string;
  color: string;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: MessageSender;
  content: string;
  timestamp: string;
  status?: MessageStatus;
  quickReplies?: string[];
  attachments?: Attachment[];
}

export interface Attachment {
  type: 'product' | 'appointment' | 'image' | 'document';
  product?: Product;
  appointment?: Appointment;
  imageUrl?: string;
  documentUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

export interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  professional?: string;
  location?: string;
}

export interface Conversation {
  id: string;
  client: Client;
  lastMessage: {
    text: string;
    sender: MessageSender;
    timestamp: string;
  };
  unreadCount: number;
  status: ConversationStatus;
  melHandling: boolean;
  tags: string[];
}

export interface AutoMessage {
  id: string;
  name: string;
  content: string;
  trigger: {
    type: TriggerType;
    conditions: string[];
  };
  quickReplies?: string[];
  isActive: boolean;
  createdAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  isActive: boolean;
}

export interface KeywordMapping {
  id: string;
  keyword: string;
  autoMessageId: string;
  priority: number;
}

export interface ChatStats {
  autoMessagesCount: number;
  faqCount: number;
  keywordsCount: number;
  resolutionRate: number;
  resolutionRateChange: number;
  conversationsToday: number;
  onlineNow: number;
}

// ============================================
// PROPS DE COMPONENTES
// ============================================

export interface ConversationsListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (id: string) => void;
  isLoading?: boolean;
}

export interface ConversationItemProps {
  conversation: Conversation;
  isSelected?: boolean;
  onClick: () => void;
}

export interface ConversationHeaderProps {
  client: Client;
  melHandling: boolean;
  onInfoClick?: () => void;
  onTransferClick?: () => void;
  onSettingsClick?: () => void;
}

export interface MessageBubbleProps {
  message: Message;
  showAvatar?: boolean;
}

export interface QuickRepliesProps {
  replies: string[];
  onSelect: (reply: string) => void;
}

export interface TypingIndicatorProps {
  isTyping: boolean;
  sender: 'client' | 'bot';
}

export interface MessageInputProps {
  onSend: (content: string) => void;
  onAttach?: (file: File) => void;
  placeholder?: string;
  disabled?: boolean;
}

export interface ProductCardProps {
  product: Product;
  onSendDetails?: () => void;
}

export interface DateSeparatorProps {
  date: string;
}

export interface SystemMessageProps {
  content: string;
  type: 'transfer' | 'status' | 'info';
}

export interface ChatFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    unread: number;
    open: number;
  };
}

export interface StatsCardsProps {
  stats: ChatStats;
}

export interface AutoMessageEditorProps {
  message?: AutoMessage;
  isOpen: boolean;
  onClose: () => void;
  onSave: (message: AutoMessage) => void;
}

export interface FAQEditorProps {
  faq?: FAQ;
  isOpen: boolean;
  onClose: () => void;
  onSave: (faq: FAQ) => void;
}
```

---

## 4. Design System - Tokens Visuais

### 4.1 Cores do Chatbot (MEL Theme)

| Token | Hex | Uso |
|-------|-----|-----|
| `chat-bg-main` | `#f9fafb` | Área de chat principal |
| `chat-bg-cards` | `#ffffff` | Cards, mensagens, modais |
| `chat-sidebar` | `#1f2937` | Barra lateral (dark) |
| `chat-bubble-user` | `#86cb92` | Mensagens do usuário |
| `chat-bubble-bot` | `#ffffff` | Mensagens do bot |
| `chat-accent` | `#86cb92` | Ícones, status online |
| `chat-text-primary` | `#1f2937` | Títulos, textos importantes |
| `chat-text-secondary` | `#627271` | Descrições, timestamps |
| `chat-border` | `#e5e7eb` | Bordas de inputs e cards |
| `chat-success` | `#16a34a` | Estados de sucesso |
| `chat-error` | `#dc2626` | Estados de erro |
| `chat-warning` | `#f59e0b` | Avisos |
| `chat-online` | `#22c55e` | Indicador online |
| `chat-offline` | `#9ca3af` | Indicador offline |

### 4.2 Classes Tailwind Padrão

```tsx
// Sidebar (Dark Theme)
bg-[#1f2937] text-white

// Bubble Usuário (direita)
bg-[#86cb92] text-white rounded-2xl rounded-tr-sm px-4 py-3

// Bubble Bot (esquerda)
bg-white text-[#1f2937] rounded-2xl rounded-tl-sm px-4 py-3 border border-[#e5e7eb]

// Max-width bubbles
max-w-[75%]

// Input mensagem
bg-[#f3f4f6] rounded-2xl focus:ring-2 focus:ring-[#86cb92]/50

// Conversa Item
px-4 py-3 hover:bg-white/5 cursor-pointer

// Conversa Ativa
bg-white/10 border-l-2 border-[#86cb92]

// Avatar Online
w-3.5 h-3.5 bg-[#22c55e] border-2 border-[#1f2937] rounded-full

// Quick Reply
bg-[#86cb92]/10 text-[#86cb92] rounded-full border border-[#86cb92]/30
```

### 4.3 Tipografia

| Elemento | Tamanho | Peso | Cor |
|----------|---------|------|-----|
| H1 (Header Conv.) | 16px | 600 | `#ffffff` |
| H2 (Nome Cliente) | 16px | 600 | `#1f2937` |
| H3 (Preview Mens.) | 14px | 500 | `#1f2937` |
| Body | 14px | 400 | `#1f2937` |
| Timestamp | 11-12px | 400 | `#627271` |
| Mensagem Chat | 15px | 400 | `#1f2937` / `#ffffff` |
| Quick Reply | 13px | 500 | `#86cb92` |

---

## 5. Arquitetura de Componentes

### 5.1 Componentes Core

#### ConversationsList
```tsx
// app/components/chat/ConversationsList.tsx
'use client';

import { Conversation } from '@/types/chat';
import { ConversationItem } from './ConversationItem';
import { ChatSearch } from './ChatSearch';
import { ChatFilters } from './ChatFilters';
import { cn } from '@/lib/utils';

interface ConversationsListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (id: string) => void;
  isLoading?: boolean;
}

export function ConversationsList({
  conversations,
  selectedId,
  onSelect,
  isLoading
}: ConversationsListProps) {
  // ... implementação
}
```

#### ConversationItem
```tsx
// app/components/chat/ConversationItem.tsx
'use client';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Conversation } from '@/types/chat';
import { MELBadge } from './MELBadge';
import { cn } from '@/lib/utils';

interface ConversationItemProps {
  conversation: Conversation;
  isSelected?: boolean;
  onClick: () => void;
}

export function ConversationItem({
  conversation,
  isSelected,
  onClick
}: ConversationItemProps) {
  const { client, lastMessage, unreadCount, status, melHandling } = conversation;
  
  return (
    <div
      onClick={onClick}
      className={cn(
        'px-4 py-3 cursor-pointer transition-colors',
        isSelected 
          ? 'bg-white/10 border-l-2 border-[#86cb92]' 
          : 'border-l-2 border-transparent hover:bg-white/5',
        status === 'closed' && 'opacity-70'
      )}
    >
      {/* Avatar com status */}
      <div className="relative">
        <AvatarWithStatus client={client} />
      </div>
      
      {/* Conteúdo */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-[14px] font-semibold text-white truncate flex items-center gap-2">
            {client.name}
            {melHandling && <MELBadge />}
          </h3>
          <span className="text-[11px] text-white/50">
            {formatTimestamp(lastMessage.timestamp)}
          </span>
        </div>
        {/* Preview + Badge */}
      </div>
    </div>
  );
}
```

#### MessageBubble
```tsx
// app/components/chat/MessageBubble.tsx
'use client';

import { Message } from '@/types/chat';
import { QuickReplies } from './QuickReplies';
import { ProductCard } from './ProductCard';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
  showAvatar?: boolean;
}

export function MessageBubble({ message, showAvatar = true }: MessageBubbleProps) {
  const isUser = message.sender === 'client';
  const isBot = message.sender === 'bot';
  const isSystem = message.sender === 'system';
  
  if (isSystem) {
    return <SystemMessage content={message.content} type="info" />;
  }
  
  return (
    <div className={cn('flex gap-3 mb-4', isUser && 'flex-row-reverse')}>
      {/* Avatar MEL para bot */}
      {isBot && showAvatar && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#86cb92] to-[#5fb86e] flex items-center justify-center flex-shrink-0">
          <Zap className="w-5 h-5 text-white" />
        </div>
      )}
      
      {/* Bubble */}
      <div className={cn('max-w-[75%] space-y-2', isBot && 'space-y-3')}>
        <div
          className={cn(
            'rounded-2xl px-4 py-3 shadow-sm',
            isUser
              ? 'bg-[#86cb92] text-white rounded-tr-sm'
              : 'bg-white text-[#1f2937] rounded-tl-sm border border-[#e5e7eb]'
          )}
        >
          <p className="text-[15px] leading-relaxed">{message.content}</p>
          <Timestamp timestamp={message.timestamp} sender={message.sender} />
        </div>
        
        {/* Quick Replies */}
        {message.quickReplies && message.quickReplies.length > 0 && (
          <QuickReplies replies={message.quickReplies} onSelect={() => {}} />
        )}
        
        {/* Anexos */}
        {message.attachments?.map((attachment, idx) => (
          <AttachmentRenderer key={idx} attachment={attachment} />
        ))}
      </div>
    </div>
  );
}
```

#### QuickReplies
```tsx
// app/components/chat/QuickReplies.tsx
'use client';

interface QuickRepliesProps {
  replies: string[];
  onSelect: (reply: string) => void;
}

export function QuickReplies({ replies, onSelect }: QuickRepliesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {replies.map((reply, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(reply)}
          className="px-4 py-2 bg-[#86cb92]/10 text-[#86cb92] rounded-full text-[13px] font-medium 
                     hover:bg-[#86cb92]/20 transition-all border border-[#86cb92]/30"
        >
          {reply}
        </button>
      ))}
    </div>
  );
}
```

#### TypingIndicator
```tsx
// app/components/chat/TypingIndicator.tsx
'use client';

interface TypingIndicatorProps {
  isTyping: boolean;
  sender?: 'client' | 'bot';
}

export function TypingIndicator({ isTyping, sender = 'bot' }: TypingIndicatorProps) {
  if (!isTyping) return null;
  
  return (
    <div className="flex items-start gap-3 mb-4">
      {sender === 'bot' && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#86cb92] to-[#5fb86e] 
                        flex items-center justify-center flex-shrink-0">
          <Zap className="w-5 h-5 text-white" />
        </div>
      )}
      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-[#e5e7eb] min-w-[80px]">
        <div className="flex items-center gap-1.5">
          <Dot delay={0} />
          <Dot delay={150} />
          <Dot delay={300} />
        </div>
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <div 
      className="w-2 h-2 bg-[#86cb92] rounded-full animate-bounce"
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}
```

#### MessageInput
```tsx
// app/components/chat/MessageInput.tsx
'use client';

import { useState, useRef } from 'react';
import { Paperclip, Smile, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  onSend: (content: string) => void;
  onAttach?: (file: File) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function MessageInput({
  onSend,
  onAttach,
  placeholder = 'Digite sua mensagem...',
  disabled
}: MessageInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };
  
  return (
    <div className="flex items-end gap-3">
      <button className="p-3 hover:bg-[#f3f4f6] rounded-full transition-colors" title="Anexar">
        <Paperclip className="w-5 h-5 text-[#627271]" />
      </button>
      
      <button className="p-3 hover:bg-[#f3f4f6] rounded-full transition-colors" title="Emoji">
        <Smile className="w-5 h-5 text-[#627271]" />
      </button>
      
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full px-4 py-3 pr-12 bg-[#f3f4f6] border-0 rounded-2xl resize-none 
                     text-[15px] text-[#1f2937] placeholder-[#627271] 
                     focus:outline-none focus:ring-2 focus:ring-[#86cb92]/50 transition-all"
          rows={1}
          style={{ minHeight: '48px', maxHeight: '120px' }}
        />
      </div>
      
      <button
        onClick={handleSend}
        disabled={!message.trim() || disabled}
        className={cn(
          'p-3 rounded-full transition-colors shadow-md flex-shrink-0',
          message.trim() 
            ? 'bg-[#86cb92] hover:bg-[#5fb86e] cursor-pointer' 
            : 'bg-gray-300 cursor-not-allowed'
        )}
      >
        <Send className="w-5 h-5 text-white" />
      </button>
    </div>
  );
}
```

#### ProductCard
```tsx
// app/components/chat/ProductCard.tsx
'use client';

import { Product } from '@/types/chat';
import { formatCurrency } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSendDetails?: () => void;
}

export function ProductCard({ product, onSendDetails }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
      <div className="flex gap-4 p-4">
        {/* Imagem placeholder */}
        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <ShoppingCart className="w-12 h-12 text-gray-300" />
        </div>
        <div className="flex-1">
          <h4 className="text-[14px] font-semibold text-[#1f2937]">{product.name}</h4>
          <p className="text-[12px] text-[#627271] mb-2">{product.description}</p>
          <p className="text-[18px] font-bold text-[#86cb92]">
            {formatCurrency(product.price)}
          </p>
        </div>
      </div>
      <div className="px-4 py-3 bg-[#f9fafb] border-t border-[#e5e7eb]">
        <button 
          onClick={onSendDetails}
          className="w-full py-2 bg-[#86cb92] hover:bg-[#5fb86e] text-white 
                     rounded-lg text-[13px] font-medium transition-colors"
        >
          Enviar Detalhes
        </button>
      </div>
    </div>
  );
}
```

---

## 6. Hooks Customizados

### 6.1 useConversations

```typescript
// app/hooks/useConversations.ts
'use client';

import { useState, useCallback } from 'react';
import { Conversation, FilterType } from '@/types/chat';
import { mockConversations } from '@/lib/mock/conversations';

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const markAsRead = useCallback((id: string) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === id ? { ...conv, unreadCount: 0 } : conv
      )
    );
  }, []);
  
  const selectConversation = useCallback((id: string) => {
    setSelectedId(id);
    markAsRead(id);
  }, [markAsRead]);
  
  const getFiltered = useCallback((filter: FilterType) => {
    switch (filter) {
      case 'unread':
        return conversations.filter(c => c.unreadCount > 0);
      case 'open':
        return conversations.filter(c => c.status === 'active' || c.status === 'pending');
      default:
        return conversations;
    }
  }, [conversations]);
  
  return {
    conversations,
    selectedId,
    selectConversation,
    markAsRead,
    getFiltered,
    getOnlineCount: () => conversations.filter(c => c.client.isOnline).length,
    getTodayCount: () => conversations.length,
  };
}
```

### 6.2 useTypingIndicator

```typescript
// app/hooks/useTypingIndicator.ts
'use client';

import { useState, useCallback, useRef } from 'react';

export function useTypingIndicator(delayMs: number = 2000) {
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  const triggerTyping = useCallback(() => {
    setIsTyping(true);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Simula resposta após delay
    timeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, delayMs);
  }, [delayMs]);
  
  const stopTyping = useCallback(() => {
    setIsTyping(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);
  
  return { isTyping, triggerTyping, stopTyping };
}
```

### 6.3 useChatStore (Zustand)

```typescript
// app/hooks/useChatStore.ts
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
          ? { ...conv, lastMessage: { text: content, sender: 'client' as const, timestamp: newMessage.timestamp } }
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
}));
```

---

## 7. Mock Data

### 7.1 Conversas

```typescript
// app/lib/mock/conversations.ts
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
  }
];
```

### 7.2 Mensagens

```typescript
// app/lib/mock/messages.ts
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
  ]
};
```

### 7.3 Mensagens Automáticas

```typescript
// app/lib/mock/autoMessages.ts
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
  }
];
```

### 7.4 FAQ

```typescript
// app/lib/mock/faq.ts
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
  }
];
```

---

## 8. Páginas

### 8.1 Painel de Conversas (`/chat/conversas`)

```tsx
// app/chat/conversas/page.tsx
'use client';

import { Sidebar } from '@/components/sidebar';
import { ConversationsList } from '@/components/chat/ConversationsList';
import { ChatSearch } from '@/components/chat/ChatSearch';
import { ChatFilters } from '@/components/chat/ChatFilters';
import { useConversations } from '@/hooks/useConversations';
import { MessageSquare } from 'lucide-react';

export default function ConversasPage() {
  const {
    conversations,
    selectedId,
    selectConversation,
    getFiltered,
    getOnlineCount,
    getTodayCount,
  } = useConversations();
  
  return (
    <div className="flex h-screen bg-[#1f2937]">
      {/* Sidebar de Conversas */}
      <aside className="w-80 flex flex-col border-r border-white/10">
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#86cb92] to-[#5fb86e] 
                              flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-[16px] font-semibold text-white">MEL Chatbot</h1>
                <p className="text-[12px] text-white/60">Atendimento Automático</p>
              </div>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Plus className="w-5 h-5 text-white/80" />
            </button>
          </div>
          
          <ChatSearch />
        </div>
        
        {/* Filtros */}
        <ChatFilters 
          activeFilter="all" 
          onFilterChange={() => {}} 
          counts={{ all: 12, unread: 2, open: 8 }}
        />
        
        {/* Lista de Conversas */}
        <ConversationsList
          conversations={conversations}
          selectedId={selectedId || undefined}
          onSelect={selectConversation}
        />
        
        {/* Footer Stats */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-between text-[12px] text-white/60">
            <span>{getTodayCount()} conversas hoje</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
              {getOnlineCount()} online
            </span>
          </div>
        </div>
      </aside>
      
      {/* Área Principal - Placeholder */}
      <main className="flex-1 flex items-center justify-center bg-[#f9fafb]">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#86cb92]/10 
                          flex items-center justify-center">
            <MessageSquare className="w-12 h-12 text-[#86cb92]" />
          </div>
          <h2 className="text-[20px] font-semibold text-[#1f2937] mb-2">
            Selecione uma conversa
          </h2>
          <p className="text-[14px] text-[#627271]">
            Escolha uma conversa na lista ao lado para começar
          </p>
        </div>
      </main>
    </div>
  );
}
```

### 8.2 Janela de Conversa (`/chat/conversa/[id]`)

```tsx
// app/chat/conversa/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { Sidebar } from '@/components/sidebar';
import { ConversationHeader } from '@/components/chat/ConversationHeader';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { MessageInput } from '@/components/chat/MessageInput';
import { TypingIndicator } from '@/components/chat/TypingIndicator';
import { DateSeparator } from '@/components/chat/DateSeparator';
import { useConversations } from '@/hooks/useConversations';
import { useChatStore } from '@/hooks/useChatStore';
import { useTypingIndicator } from '@/hooks/useTypingIndicator';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function ConversaPage() {
  const params = useParams();
  const conversationId = params.id as string;
  
  const { conversations, selectConversation } = useConversations();
  const { messages, sendMessage } = useChatStore();
  const { isTyping, triggerTyping } = useTypingIndicator(3000);
  
  const conversation = conversations.find(c => c.id === conversationId);
  const conversationMessages = messages[conversationId] || [];
  
  if (!conversation) {
    return <div>Conversa não encontrada</div>;
  }
  
  const handleSend = (content: string) => {
    sendMessage(conversationId, content);
    // Simula resposta do bot
    triggerTyping();
  };
  
  // Agrupar mensagens por data
  const groupedMessages = groupMessagesByDate(conversationMessages);
  
  return (
    <div className="flex h-screen bg-[#f9fafb]">
      {/* Sidebar */}
      <aside className="w-80 flex flex-col bg-[#1f2937] border-r border-white/10">
        {/* ... mesma estrutura da página de conversas ... */}
      </aside>
      
      {/* Área de Chat */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <ConversationHeader 
          client={conversation.client}
          melHandling={conversation.melHandling}
          onInfoClick={() => {}}
          onTransferClick={() => {}}
          onSettingsClick={() => {}}
        />
        
        {/* Mensagens */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#f9fafb]">
          <div className="max-w-3xl mx-auto space-y-4">
            {groupedMessages.map((group, idx) => (
              <div key={idx}>
                <DateSeparator date={group.date} />
                {group.messages.map(message => (
                  <MessageBubble key={message.id} message={message} />
                ))}
              </div>
            ))}
            
            {isTyping && <TypingIndicator isTyping={isTyping} />}
          </div>
        </div>
        
        {/* Input */}
        <footer className="bg-white border-t border-[#e5e7eb] px-6 py-4">
          <div className="max-w-3xl mx-auto">
            <MessageInput 
              onSend={handleSend}
              placeholder="Digite sua mensagem..."
            />
            
            {/* Tags */}
            <div className="flex items-center gap-2 mt-3 text-[11px] text-[#627271]">
              {conversation.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-[#f3f4f6] rounded">#{tag}</span>
              ))}
              <span className="text-[#86cb92] cursor-pointer hover:underline">
                + adicionar tag
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function groupMessagesByDate(messages: Message[]) {
  // Implementar lógica de agrupamento por data
}
```

### 8.3 Configurações (`/chat/configuracoes`)

```tsx
// app/chat/configuracoes/page.tsx
'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { StatsCards } from '@/components/chat/StatsCards';
import { AutoMessageEditor } from '@/components/chat/AutoMessageEditor';
import { FAQEditor } from '@/components/chat/FAQEditor';
import { useChatStore } from '@/hooks/useChatStore';
import { Zap, MessageSquare, HelpCircle, Tag, Settings, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ConfiguracoesPage() {
  const { autoMessages, faqs, addAutoMessage, updateAutoMessage, deleteAutoMessage } = useChatStore();
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingMessage, setEditingMessage] = useState<AutoMessage | undefined>();
  
  const stats = {
    autoMessagesCount: autoMessages.length,
    faqCount: faqs.length,
    keywordsCount: 48,
    resolutionRate: 78,
    resolutionRateChange: 5,
    conversationsToday: 12,
    onlineNow: 8
  };
  
  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <Sidebar />
      
      <Header 
        pageTitle="Configurações do Chatbot"
        breadcrumbs={[
          { label: 'Início', href: '/dashboard' },
          { label: 'Chat', href: '/chat/conversas' },
          { label: 'Configurações' }
        ]}
      />
      
      <main className="ml-0 lg:ml-64 pt-16 p-6">
        {/* Header com ações */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#86cb92] to-[#5fb86e] 
                            flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-[20px] font-semibold text-[#1f2937]">Configurações do Chatbot</h1>
              <p className="text-[14px] text-[#627271]">Personalize o comportamento e respostas da MEL</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Settings className="w-5 h-5" />
              Preview
            </Button>
            <Button className="bg-[#86cb92] hover:bg-[#5fb86e] gap-2">
              <Zap className="w-5 h-5" />
              Sincronizar
            </Button>
          </div>
        </div>
        
        {/* Stats */}
        <StatsCards stats={stats} />
        
        {/* Tabs */}
        <Tabs defaultValue="auto" className="mt-6">
          <TabsList className="bg-white p-1 rounded-xl border border-[#e5e7eb] w-fit">
            <TabsTrigger value="auto" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Mensagens Auto
            </TabsTrigger>
            <TabsTrigger value="faq" className="gap-2">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="keywords" className="gap-2">
              <Tag className="w-4 h-4" />
              Palavras-chave
            </TabsTrigger>
            <TabsTrigger value="behavior" className="gap-2">
              <Settings className="w-4 h-4" />
              Comportamento
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="auto" className="mt-6">
            <Card className="border-[#e5e7eb]">
              <CardHeader className="border-b border-[#e5e7eb] flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Mensagens Automáticas</CardTitle>
                  <p className="text-[13px] text-[#627271]">
                    Respostas enviadas automaticamente em situações específicas
                  </p>
                </div>
                <Button 
                  className="bg-[#86cb92] hover:bg-[#5fb86e]"
                  onClick={() => {
                    setEditingMessage(undefined);
                    setEditorOpen(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Mensagem
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-[#e5e7eb]">
                  {autoMessages.map(message => (
                    <AutoMessageItem
                      key={message.id}
                      message={message}
                      onEdit={() => {
                        setEditingMessage(message);
                        setEditorOpen(true);
                      }}
                      onDelete={() => deleteAutoMessage(message.id)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Outros tabs... */}
        </Tabs>
      </main>
      
      {/* Editor Modal */}
      <AutoMessageEditor
        message={editingMessage}
        isOpen={editorOpen}
        onClose={() => setEditorOpen(false)}
        onSave={(msg) => {
          if (editingMessage) {
            updateAutoMessage(msg.id, msg);
          } else {
            addAutoMessage(msg);
          }
          setEditorOpen(false);
        }}
      />
    </div>
  );
}

function AutoMessageItem({ 
  message, 
  onEdit, 
  onDelete 
}: { 
  message: AutoMessage; 
  onEdit: () => void; 
  onDelete: () => void;
}) {
  return (
    <div className="px-6 py-4 hover:bg-[#f9fafb] transition-colors group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#86cb92]/10 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-[#86cb92]" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-[14px] font-semibold text-[#1f2937]">{message.name}</h3>
              {message.isActive && (
                <Badge className="bg-green-100 text-green-700">Ativo</Badge>
              )}
            </div>
            <p className="text-[12px] text-[#627271] truncate max-w-md">
              &quot;{message.content}&quot;
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[12px] text-[#627271]">
            Trigger: {message.trigger.type}
          </span>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="sm" onClick={onEdit}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onDelete}>
              <Trash className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 9. Utilitários

### 9.1 chatUtils

```typescript
// app/lib/utils/chatUtils.ts
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MessageSender, ConversationStatus } from '@/types/chat';

export function formatTimestamp(timestamp: string): string {
  const date = parseISO(timestamp);
  
  if (isToday(date)) {
    return format(date, 'HH:mm', { locale: ptBR });
  }
  
  if (isYesterday(date)) {
    return `Ontem ${format(date, 'HH:mm', { locale: ptBR })}`;
  }
  
  return format(date, 'dd/MM HH:mm', { locale: ptBR });
}

export function formatDateSeparator(timestamp: string): string {
  const date = parseISO(timestamp);
  
  if (isToday(date)) {
    return 'Hoje';
  }
  
  if (isYesterday(date)) {
    return 'Ontem';
  }
  
  return format(date, "EEEE, d 'de' MMMM", { locale: ptBR });
}

export function getStatusLabel(status: ConversationStatus): string {
  const labels: Record<ConversationStatus, string> = {
    active: 'Ativa',
    pending: 'Aguardando',
    closed: 'Encerrada'
  };
  
  return labels[status] || status;
}

export function getMessageSenderLabel(sender: MessageSender): string {
  const labels: Record<MessageSender, string> = {
    client: 'Cliente',
    bot: 'MEL',
    system: 'Sistema'
  };
  
  return labels[sender] || sender;
}

export function getAvatarInitials(name: string): string {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}
```

### 9.2 chatColors

```typescript
// app/lib/utils/chatColors.ts
export const avatarColors = [
  'from-blue-400 to-blue-600',
  'from-purple-400 to-purple-600',
  'from-amber-400 to-amber-600',
  'from-teal-400 to-teal-600',
  'from-pink-400 to-pink-600',
  'from-indigo-400 to-indigo-600',
];

export const statusColors = {
  online: '#22c55e',
  offline: '#9ca3af',
  away: '#f59e0b',
};

export const conversationStatusStyles = {
  active: {
    border: 'border-l-2 border-[#86cb92]',
    bg: 'bg-white/10',
  },
  pending: {
    border: 'border-l-2 border-transparent',
    bg: 'hover:bg-white/5',
    badge: { text: 'Aguardando', color: 'amber' as const }
  },
  closed: {
    border: 'border-l-2 border-transparent',
    bg: 'hover:bg-white/5 opacity-70',
    badge: { text: 'Encerrada', color: 'gray' as const }
  }
};

export const messageStatusIcons = {
  sent: '✓',
  delivered: '✓✓',
  read: '✓✓',
};
```

---

## 10. Checklist de Implementação

### Fase 1: Foundation (Alta Prioridade)
- [ ] Criar estrutura de diretórios (`app/chat/**`, `app/components/chat/**`, etc.)
- [ ] Definir tipos TypeScript completos em `app/types/chat.ts`
- [ ] Criar mock data (conversations, messages, autoMessages, faq)
- [ ] Implementar Zustand store (`useChatStore.ts`)
- [ ] Criar hooks base (useConversations, useTypingIndicator)

### Fase 2: Core Components (Alta Prioridade)
- [ ] `ConversationsList` - Lista estilo WhatsApp
- [ ] `ConversationItem` - Item com avatar, status, preview
- [ ] `MessageBubble` - Balões user/bot
- [ ] `QuickReplies` - Botões de resposta rápida
- [ ] `TypingIndicator` - Animação de digitação
- [ ] `MessageInput` - Input com anexo

### Fase 3: Secondary Components (Média Prioridade)
- [ ] `ConversationHeader` - Header com info cliente
- [ ] `ProductCard` - Card de produto no chat
- [ ] `AppointmentCard` - Card de agendamento
- [ ] `DateSeparator` - Separador de data
- [ ] `SystemMessage` - Mensagem de sistema
- [ ] `ChatFilters` - Filtros
- [ ] `ChatSearch` - Busca
- [ ] `MELBadge` - Badge MEL

### Fase 4: Páginas (Alta Prioridade)
- [ ] `/chat/conversas` - Painel de conversas
- [ ] `/chat/conversa/[id]` - Janela de conversa
- [ ] `/chat/configuracoes` - Dashboard de configuração

### Fase 5: Config Pages Components (Média Prioridade)
- [ ] `StatsCards` - Cards de estatísticas
- [ ] `AutoMessageEditor` - Editor de mensagens auto
- [ ] `FAQEditor` - Editor de FAQ
- [ ] `KeywordManager` - Gerenciador de palavras-chave
- [ ] `BehaviorSettings` - Configurações de comportamento

### Fase 6: Polish & A11y (Baixa Prioridade)
- [ ] Loading states com skeletons
- [ ] Empty states informativos
- [ ] Error states com retry
- [ ] Navegação por teclado
- [ ] ARIA labels
- [ ] Responsividade (mobile view)

---

## 11. Notas de Implementação

### 11.1 Ordem de Desenvolvimento

1. **Primeiro:** Tipos + Mock Data + Store (Zustand)
2. **Segundo:** Componentes core do chat (ConversationsList, MessageBubble, etc.)
3. **Terceiro:** Páginas principais (conversas, conversa/[id])
4. **Quarto:** Componentes de configuração
5. **Quinto:** Página de configurações completa

### 11.2 Integração com MEL

O chatbot é o coração da experiência MEL:
- Badge 🤖 indica involvement da MEL
- Mensagens de MEL têm avatar especial (raio/⚡)
- Quick replies seguem paleta emerald (#86cb92)
- Tiping indicator usa animação bounce

### 11.3 Integrações Futuras (Backend)

Quando.backend estiver pronto:
- Substituir mock data por chamadas Supabase
- Implementar WebSocket para tempo real
- Integrar com WhatsApp Business API
- Adicionar NLP para detecção de intenção

---

## 12. Referências

- **PRD:** `tracking/plans/prd-sprint-10-chatbot.md`
- **UI Spec:** `docs/ui/modulo-10-chatbot.md`
- **MEL Context:** `docs/ui/modulo-09-mel.md`
- **Design System:** Design tokens MEL (#86cb92 emerald theme)
- **Padrão Existente:** Seguir estrutura de `SPEC-Sprint10-Agendamentos.md`

---

*SPEC criada em: 2026-03-21*  
*Baseada no PRD de: @vibe-researcher*

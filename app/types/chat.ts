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
  sender?: 'client' | 'bot';
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

export interface AppointmentCardProps {
  appointment: Appointment;
  onSendDetails?: () => void;
}

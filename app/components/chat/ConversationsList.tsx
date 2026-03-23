'use client';

import { Conversation } from '@/types/chat';
import { ConversationItem } from './ConversationItem';
import { ChatSearch } from './ChatSearch';
import { ChatFilters } from './ChatFilters';
import { MessageSquare } from 'lucide-react';
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
  return (
    <div className="flex-1 overflow-y-auto">
      <ChatSearch />
      <ChatFilters 
        activeFilter="all" 
        onFilterChange={() => {}} 
        counts={{ all: conversations.length, unread: conversations.filter(c => c.unreadCount > 0).length, open: conversations.filter(c => c.status === 'active' || c.status === 'pending').length }}
      />
      
      <div className="py-2">
        {conversations.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <MessageSquare className="w-12 h-12 mx-auto text-white/30 mb-3" />
            <p className="text-white/50 text-sm">Nenhuma conversa encontrada</p>
          </div>
        ) : (
          conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isSelected={conversation.id === selectedId}
              onClick={() => onSelect(conversation.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

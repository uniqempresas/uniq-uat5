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
    getUnreadCount: () => conversations.filter(c => c.unreadCount > 0).length,
    getOpenCount: () => conversations.filter(c => c.status === 'active' || c.status === 'pending').length,
  };
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Zap, Settings, MessageSquare } from 'lucide-react';
import { ConversationsList } from '@/components/chat/ConversationsList';
import { useConversations } from '@/hooks/useConversations';
import { useChatStore } from '@/hooks/useChatStore';
import { cn } from '@/lib/utils';

export default function ChatPage() {
  const router = useRouter();
  const {
    conversations,
    selectedId,
    selectConversation,
    getOnlineCount,
    getTodayCount,
    getUnreadCount
  } = useConversations();
  const { messages, sendMessage } = useChatStore();
  const [filter, setFilter] = useState<'all' | 'unread' | 'open'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredConversations = conversations.filter(conv => {
    // Apply search filter
    if (searchQuery && !conv.client.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply status filter
    if (filter === 'unread' && conv.unreadCount === 0) return false;
    if (filter === 'open' && conv.status === 'closed') return false;
    
    return true;
  });
  
  const handleSelectConversation = (id: string) => {
    selectConversation(id);
    router.push(`/chat/conversa/${id}`);
  };
  
  return (
    <div className="flex h-screen bg-[#1f2937]">
      {/* Sidebar de Conversas */}
      <aside className="w-80 flex flex-col border-r border-white/10">
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <Link href="/chat" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#86cb92] to-[#5fb86e] 
                              flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-[16px] font-semibold text-white">MEL Chatbot</h1>
                <p className="text-[12px] text-white/60">Atendimento Automático</p>
              </div>
            </Link>
            <div className="flex items-center gap-1">
              <Link 
                href="/chat/configuracoes"
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                title="Configurações"
              >
                <Settings className="w-5 h-5 text-white/80" />
              </Link>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Nova conversa">
                <Plus className="w-5 h-5 text-white/80" />
              </button>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar conversas..."
              className={cn(
                'w-full pl-10 pr-10 py-2.5 rounded-xl text-[14px]',
                'bg-white/10 text-white placeholder-white/40',
                'border-0 focus:outline-none focus:ring-2 focus:ring-[#86cb92]/50',
                'transition-all'
              )}
            />
          </div>
        </div>
        
        {/* Filters */}
        <div className="px-4 py-2 border-b border-white/10">
          <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg">
            {(['all', 'unread', 'open'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all',
                  filter === f
                    ? 'bg-[#86cb92] text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                )}
              >
                {f === 'all' ? 'Todas' : f === 'unread' ? 'Não Lidas' : 'Abertas'}
                <span className={cn(
                  'px-1.5 py-0.5 rounded text-[10px]',
                  filter === f ? 'bg-white/20' : 'bg-white/10'
                )}>
                  {f === 'all' ? conversations.length : f === 'unread' ? getUnreadCount() : conversations.filter(c => c.status !== 'closed').length}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Lista de Conversas */}
        <ConversationsList
          conversations={filteredConversations}
          selectedId={selectedId || undefined}
          onSelect={handleSelectConversation}
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

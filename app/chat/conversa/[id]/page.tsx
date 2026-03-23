'use client';

import { useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Zap, Settings, MoreVertical } from 'lucide-react';
import { ConversationHeader } from '@/components/chat/ConversationHeader';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { MessageInput } from '@/components/chat/MessageInput';
import { TypingIndicator } from '@/components/chat/TypingIndicator';
import { DateSeparator } from '@/components/chat/DateSeparator';
import { ConversationsList } from '@/components/chat/ConversationsList';
import { useConversations } from '@/hooks/useConversations';
import { useChatStore } from '@/hooks/useChatStore';
import { useTypingIndicator } from '@/hooks/useTypingIndicator';
import { Message } from '@/types/chat';
import { cn } from '@/lib/utils';

export default function ConversaPage() {
  const params = useParams();
  const router = useRouter();
  const conversationId = params.id as string;
  
  const { conversations, selectConversation } = useConversations();
  const { messages, sendMessage, markAsRead } = useChatStore();
  const { isTyping, triggerTyping } = useTypingIndicator(3000);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const conversation = conversations.find(c => c.id === conversationId);
  const conversationMessages = messages[conversationId] || [];
  
  // Mark as read when entering conversation
  useEffect(() => {
    if (conversationId) {
      markAsRead(conversationId);
    }
  }, [conversationId, markAsRead]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationMessages, isTyping]);
  
  if (!conversation) {
    return (
      <div className="flex h-screen bg-[#f9fafb] items-center justify-center">
        <div className="text-center">
          <p className="text-[18px] text-[#1f2937] mb-4">Conversa não encontrada</p>
          <Link href="/chat" className="text-[#86cb92] hover:underline">
            Voltar para conversas
          </Link>
        </div>
      </div>
    );
  }
  
  const handleSend = (content: string) => {
    sendMessage(conversationId, content);
    // Simulate bot response
    triggerTyping();
  };
  
  const handleQuickReply = (reply: string) => {
    handleSend(reply);
  };
  
  // Group messages by date
  const groupedMessages: { date: string; messages: Message[] }[] = [];
  let currentDate = '';
  
  conversationMessages.forEach((msg) => {
    const msgDate = new Date(msg.timestamp).toDateString();
    if (msgDate !== currentDate) {
      currentDate = msgDate;
      groupedMessages.push({ date: msg.timestamp, messages: [msg] });
    } else {
      groupedMessages[groupedMessages.length - 1].messages.push(msg);
    }
  });
  
  return (
    <div className="flex h-screen bg-[#f9fafb]">
      {/* Sidebar */}
      <aside className="w-80 flex flex-col bg-[#1f2937] border-r border-white/10">
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <Link href="/chat" className="flex items-center gap-3 mb-4">
            <ArrowLeft className="w-5 h-5 text-white/80" />
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#86cb92] to-[#5fb86e] 
                            flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-[16px] font-semibold text-white">MEL Chatbot</h1>
              <p className="text-[12px] text-white/60">Atendimento Automático</p>
            </div>
          </Link>
        </div>
        
        {/* Conversations List */}
        <ConversationsList
          conversations={conversations}
          selectedId={conversationId}
          onSelect={(id) => router.push(`/chat/conversa/${id}`)}
        />
      </aside>
      
      {/* Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <ConversationHeader 
          client={conversation.client}
          melHandling={conversation.melHandling}
          onInfoClick={() => {}}
          onTransferClick={() => {}}
          onSettingsClick={() => router.push('/chat/configuracoes')}
        />
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#f9fafb]">
          <div className="max-w-3xl mx-auto space-y-4">
            {groupedMessages.map((group, idx) => (
              <div key={idx}>
                <DateSeparator date={group.date} />
                {group.messages.map((message) => (
                  <MessageBubble 
                    key={message.id} 
                    message={message}
                    onQuickReply={handleQuickReply}
                  />
                ))}
              </div>
            ))}
            
            {isTyping && <TypingIndicator isTyping={isTyping} />}
            
            <div ref={messagesEndRef} />
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
            {conversation.tags.length > 0 && (
              <div className="flex items-center gap-2 mt-3 text-[11px] text-[#627271]">
                {conversation.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-[#f3f4f6] rounded">#{tag}</span>
                ))}
                <span className="text-[#86cb92] cursor-pointer hover:underline">
                  + adicionar tag
                </span>
              </div>
            )}
          </div>
        </footer>
      </main>
    </div>
  );
}

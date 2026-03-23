'use client';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Conversation } from '@/types/chat';
import { MELBadge } from './MELBadge';
import { cn } from '@/lib/utils';
import { getColorByName } from '@/lib/utils/chatColors';

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
  const colorClass = getColorByName(client.name);
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return format(date, 'HH:mm', { locale: ptBR });
    } else if (diffDays === 1) {
      return 'Ontem';
    } else if (diffDays < 7) {
      return format(date, 'EEE', { locale: ptBR });
    }
    return format(date, 'dd/MM', { locale: ptBR });
  };
  
  return (
    <div
      onClick={onClick}
      className={cn(
        'px-4 py-3 cursor-pointer transition-colors border-l-2',
        isSelected 
          ? 'bg-white/10 border-l-[#86cb92]' 
          : 'border-l-transparent hover:bg-white/5',
        status === 'closed' && 'opacity-70'
      )}
    >
      <div className="flex items-center gap-3">
        {/* Avatar com status */}
        <div className="relative flex-shrink-0">
          {client.avatar ? (
            <img src={client.avatar} alt={client.name} className="w-12 h-12 rounded-full" />
          ) : (
            <div className={cn('w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-semibold text-sm', colorClass)}>
              {client.initials}
            </div>
          )}
          {client.isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#22c55e] border-2 border-[#1f2937] rounded-full" />
          )}
          {client.isAway && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#f59e0b] border-2 border-[#1f2937] rounded-full" />
          )}
        </div>
        
        {/* Conteúdo */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <h3 className="text-[14px] font-semibold text-white truncate flex items-center gap-2">
              {client.name}
              {melHandling && <MELBadge />}
            </h3>
            <span className="text-[11px] text-white/50 flex-shrink-0 ml-2">
              {formatTime(lastMessage.timestamp)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <p className={cn(
              'text-[13px] truncate',
              unreadCount > 0 ? 'text-white font-medium' : 'text-white/60'
            )}>
              {lastMessage.sender === 'bot' && '🤖 '}
              {lastMessage.text}
            </p>
            
            {unreadCount > 0 && (
              <span className="ml-2 flex-shrink-0 w-5 h-5 bg-[#86cb92] rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </div>
          
          {/* Tags */}
          {conversation.tags.length > 0 && (
            <div className="flex items-center gap-1 mt-1.5">
              {conversation.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-white/10 text-white/60 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

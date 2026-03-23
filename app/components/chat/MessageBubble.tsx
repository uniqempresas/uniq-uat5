'use client';

import { Message } from '@/types/chat';
import { QuickReplies } from './QuickReplies';
import { ProductCard } from './ProductCard';
import { AppointmentCard } from './AppointmentCard';
import { SystemMessage } from './SystemMessage';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Zap, Check, CheckCheck } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  showAvatar?: boolean;
  onQuickReply?: (reply: string) => void;
}

export function MessageBubble({ message, showAvatar = true, onQuickReply }: MessageBubbleProps) {
  const isUser = message.sender === 'client';
  const isBot = message.sender === 'bot';
  const isSystem = message.sender === 'system';
  
  if (isSystem) {
    return <SystemMessage content={message.content} type="info" />;
  }
  
  const formatTime = (timestamp: string) => {
    return format(new Date(timestamp), 'HH:mm', { locale: ptBR });
  };
  
  return (
    <div className={cn('flex gap-3 mb-4', isUser && 'flex-row-reverse')}>
      {/* Avatar MEL para bot */}
      {isBot && showAvatar && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#86cb92] to-[#5fb86e] flex items-center justify-center flex-shrink-0">
          <Zap className="w-5 h-5 text-white" />
        </div>
      )}
      
      {/* Avatar placeholder for user messages */}
      {isUser && showAvatar && (
        <div className="w-10 h-10 flex-shrink-0" />
      )}
      
      {/* Bubble */}
      <div className={cn('max-w-[75%] space-y-2', isBot && 'space-y-3')}>
        <div
          className={cn(
            'rounded-2xl px-4 py-3 shadow-sm',
            isUser
              ? 'bg-gradient-to-r from-[#86cb92] to-[#5fb86e] text-white rounded-tr-sm'
              : 'bg-white text-[#1f2937] rounded-tl-sm border border-[#e5e7eb]'
          )}
        >
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
          
          {/* Timestamp e status */}
          <div className={cn(
            'flex items-center gap-1 mt-1',
            isUser ? 'justify-end' : 'justify-start'
          )}>
            <span className={cn(
              'text-[11px]',
              isUser ? 'text-white/80' : 'text-[#627271]'
            )}>
              {formatTime(message.timestamp)}
            </span>
            
            {isUser && message.status && (
              <span className="text-white/80">
                {message.status === 'read' ? (
                  <CheckCheck className="w-4 h-4" />
                ) : message.status === 'delivered' ? (
                  <CheckCheck className="w-4 h-4" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
              </span>
            )}
          </div>
        </div>
        
        {/* Quick Replies */}
        {message.quickReplies && message.quickReplies.length > 0 && (
          <QuickReplies 
            replies={message.quickReplies} 
            onSelect={onQuickReply || (() => {})} 
          />
        )}
        
        {/* Anexos */}
        {message.attachments?.map((attachment, idx) => (
          <div key={idx}>
            {attachment.type === 'product' && attachment.product && (
              <ProductCard product={attachment.product} />
            )}
            {attachment.type === 'appointment' && attachment.appointment && (
              <AppointmentCard appointment={attachment.appointment} />
            )}
            {attachment.type === 'image' && attachment.imageUrl && (
              <img 
                src={attachment.imageUrl} 
                alt="Attachment" 
                className="max-w-[250px] rounded-xl shadow-sm"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
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
  
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);
  
  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <div className="flex items-end gap-3">
      <button 
        className="p-3 hover:bg-[#f3f4f6] rounded-full transition-colors" 
        title="Anexar"
        onClick={() => {
          const input = document.createElement('input');
          input.type = 'file';
          input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file && onAttach) {
              onAttach(file);
            }
          };
          input.click();
        }}
      >
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
          onKeyDown={handleKeyDown}
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

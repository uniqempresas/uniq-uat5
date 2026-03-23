'use client';

import { Zap } from 'lucide-react';

interface TypingIndicatorProps {
  isTyping: boolean;
  sender?: 'client' | 'bot';
}

function Dot({ delay }: { delay: number }) {
  return (
    <div 
      className="w-2 h-2 bg-[#86cb92] rounded-full animate-bounce"
      style={{ animationDelay: `${delay}ms` }}
    />
  );
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
      <div className="bg-white rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm border border-[#e5e7eb] min-w-[80px]">
        <div className="flex items-center gap-1.5">
          <Dot delay={0} />
          <Dot delay={150} />
          <Dot delay={300} />
        </div>
      </div>
    </div>
  );
}

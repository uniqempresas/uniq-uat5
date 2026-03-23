'use client';

import { Client } from '@/types/chat';
import { MELBadge } from './MELBadge';
import { Info, Phone, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getColorByName } from '@/lib/utils/chatColors';

interface ConversationHeaderProps {
  client: Client;
  melHandling: boolean;
  onInfoClick?: () => void;
  onTransferClick?: () => void;
  onSettingsClick?: () => void;
}

export function ConversationHeader({
  client,
  melHandling,
  onInfoClick,
  onTransferClick,
  onSettingsClick
}: ConversationHeaderProps) {
  const colorClass = getColorByName(client.name);
  
  return (
    <header className="bg-white border-b border-[#e5e7eb] px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Avatar e Info */}
        <div className="flex items-center gap-3">
          <div className="relative">
            {client.avatar ? (
              <img src={client.avatar} alt={client.name} className="w-10 h-10 rounded-full" />
            ) : (
              <div className={cn('w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-semibold text-sm', colorClass)}>
                {client.initials}
              </div>
            )}
            {client.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#22c55e] border-2 border-white rounded-full" />
            )}
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[16px] font-semibold text-[#1f2937]">{client.name}</h1>
              {melHandling && <MELBadge />}
            </div>
            <p className="text-[12px] text-[#627271] flex items-center gap-1">
              {client.isOnline ? (
                <>
                  <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full" />
                  Online
                </>
              ) : client.isAway ? (
                <>
                  <span className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full" />
                  Ausente
                </>
              ) : (
                'Offline'
              )}
            </p>
          </div>
        </div>
        
        {/* Ações */}
        <div className="flex items-center gap-1">
          <button 
            onClick={onInfoClick}
            className="p-2 hover:bg-[#f3f4f6] rounded-full transition-colors"
            title="Informações"
          >
            <Info className="w-5 h-5 text-[#627271]" />
          </button>
          <button 
            onClick={onTransferClick}
            className="p-2 hover:bg-[#f3f4f6] rounded-full transition-colors"
            title="Transferir"
          >
            <Phone className="w-5 h-5 text-[#627271]" />
          </button>
          <button 
            onClick={onSettingsClick}
            className="p-2 hover:bg-[#f3f4f6] rounded-full transition-colors"
            title="Mais opções"
          >
            <MoreVertical className="w-5 h-5 text-[#627271]" />
          </button>
        </div>
      </div>
    </header>
  );
}

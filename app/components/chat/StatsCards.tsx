'use client';

import { ChatStats } from '@/types/chat';
import { MessageSquare, HelpCircle, Tag, TrendingUp, Users, MessageCircle } from 'lucide-react';

interface StatsCardsProps {
  stats: ChatStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Mensagens Auto',
      value: stats.autoMessagesCount,
      icon: MessageSquare,
      color: 'bg-[#86cb92]/10 text-[#86cb92]',
      href: '#auto'
    },
    {
      title: 'FAQ',
      value: stats.faqCount,
      icon: HelpCircle,
      color: 'bg-blue-50 text-blue-600',
      href: '#faq'
    },
    {
      title: 'Palavras-chave',
      value: stats.keywordsCount,
      icon: Tag,
      color: 'bg-purple-50 text-purple-600',
      href: '#keywords'
    },
    {
      title: 'Taxa Resolução',
      value: `${stats.resolutionRate}%`,
      change: stats.resolutionRateChange,
      icon: TrendingUp,
      color: 'bg-green-50 text-green-600',
      href: '#behavior'
    },
  ];
  
  const bottomCards = [
    {
      title: 'Conversas Hoje',
      value: stats.conversationsToday,
      icon: MessageCircle,
      color: 'text-[#1f2937]'
    },
    {
      title: 'Online Agora',
      value: stats.onlineNow,
      icon: Users,
      color: 'text-[#86cb92]',
      subtitle: 'atendentes'
    }
  ];
  
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {cards.map((card) => (
          <a
            key={card.title}
            href={card.href}
            className="bg-white rounded-xl p-4 border border-[#e5e7eb] hover:border-[#86cb92] hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center`}>
                <card.icon className="w-5 h-5" />
              </div>
              {card.change !== undefined && (
                <span className={`text-[12px] font-medium ${card.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {card.change >= 0 ? '+' : ''}{card.change}%
                </span>
              )}
            </div>
            <p className="text-[24px] font-bold text-[#1f2937]">{card.value}</p>
            <p className="text-[12px] text-[#627271]">{card.title}</p>
          </a>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {bottomCards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl p-4 border border-[#e5e7eb]"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg bg-[#f3f4f6] flex items-center justify-center ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[20px] font-bold text-[#1f2937]">{card.value}</p>
                <p className="text-[12px] text-[#627271]">{card.subtitle || card.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

import { format, isToday, isYesterday, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MessageSender, ConversationStatus } from '@/types/chat';

export function formatTimestamp(timestamp: string): string {
  const date = parseISO(timestamp);
  
  if (isToday(date)) {
    return format(date, 'HH:mm', { locale: ptBR });
  }
  
  if (isYesterday(date)) {
    return `Ontem ${format(date, 'HH:mm', { locale: ptBR })}`;
  }
  
  return format(date, 'dd/MM HH:mm', { locale: ptBR });
}

export function formatDateSeparator(timestamp: string): string {
  const date = parseISO(timestamp);
  
  if (isToday(date)) {
    return 'Hoje';
  }
  
  if (isYesterday(date)) {
    return 'Ontem';
  }
  
  return format(date, "EEEE, d 'de' MMMM", { locale: ptBR });
}

export function getStatusLabel(status: ConversationStatus): string {
  const labels: Record<ConversationStatus, string> = {
    active: 'Ativa',
    pending: 'Aguardando',
    closed: 'Encerrada'
  };
  
  return labels[status] || status;
}

export function getMessageSenderLabel(sender: MessageSender): string {
  const labels: Record<MessageSender, string> = {
    client: 'Cliente',
    bot: 'MEL',
    system: 'Sistema'
  };
  
  return labels[sender] || sender;
}

export function getAvatarInitials(name: string): string {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

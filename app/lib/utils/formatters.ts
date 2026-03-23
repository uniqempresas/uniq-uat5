import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// ============================================
// FORMATADORES
// ============================================

/**
 * Formata data para "último acesso"
 * @example "Há 2 horas", "Há 3 dias", "Nunca"
 */
export function formatLastAccess(date?: Date): string {
  if (!date) return 'Nunca';

  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Agora mesmo';
  if (minutes < 60) return `Há ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
  if (hours < 24) return `Há ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  if (days < 7) return `Há ${days} ${days === 1 ? 'dia' : 'dias'}`;
  if (days < 30) return `Há ${Math.floor(days / 7)} ${Math.floor(days / 7) === 1 ? 'semana' : 'semanas'}`;

  return format(date, 'dd/MM/yyyy');
}

/**
 * Formata telefone com máscara
 * @example "(11) 98765-4321"
 */
export function formatPhone(value: string): string {
  const numbers = value.replace(/\D/g, '');

  if (numbers.length <= 11) {
    return numbers
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  }

  return value;
}

/**
 * Gera iniciais do nome
 * @example "Maria Silva" -> "MS"
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Formata data para input date
 */
export function formatDateForInput(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/**
 * Formata data relativa
 */
export function formatRelativeDate(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
}

/**
 * Formata valor para moeda brasileira
 * @example R$ 1.234,56
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

/**
 * Formata valor para exibição em loja (mesmo que formatCurrency)
 * @example R$ 1.234,56
 */
export function formatPrice(value: number): string {
  return formatCurrency(value);
}

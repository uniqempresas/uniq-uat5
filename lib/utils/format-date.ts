// lib/utils/format-date.ts

/**
 * Format a date string to Brazilian format
 * @param date - Date string (ISO format)
 * @param options - Formatting options
 * @returns Formatted date string
 */
export function formatDate(
  date: string | Date,
  options?: {
    format?: 'short' | 'medium' | 'long' | 'full';
    includeTime?: boolean;
    relative?: boolean;
  }
): string {
  const { format = 'medium', includeTime = false, relative = false } = options ?? {};
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (relative) {
    return formatRelativeDate(dateObj);
  }

  const formatOptionsMap: Record<string, Intl.DateTimeFormatOptions> = {
    short: { day: '2-digit', month: '2-digit', year: '2-digit' },
    medium: { day: '2-digit', month: 'short', year: 'numeric' },
    long: { day: '2-digit', month: 'long', year: 'numeric' },
    full: { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' },
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };

  const formatOptions = formatOptionsMap[format] || formatOptionsMap.medium;

  const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
    ...formatOptions,
    ...(includeTime ? timeOptions : {}),
  });

  return dateFormatter.format(dateObj);
}

/**
 * Format a date as relative time (e.g., "há 2 dias")
 * @param date - Date string or Date object
 * @returns Relative time string
 */
export function formatRelativeDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'agora mesmo';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `há ${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `há ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `há ${diffInDays} ${diffInDays === 1 ? 'dia' : 'dias'}`;
  }

  if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `há ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
  }

  if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `há ${months} ${months === 1 ? 'mês' : 'meses'}`;
  }

  const years = Math.floor(diffInDays / 365);
  return `há ${years} ${years === 1 ? 'ano' : 'anos'}`;
}

/**
 * Format date for order display
 * @param date - Date string
 * @returns Formatted date string for orders (e.g., "21/03/2026 às 14:30")
 */
export function formatOrderDate(date: string): string {
  const dateObj = new Date(date);
  const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const timeFormatter = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${dateFormatter.format(dateObj)} às ${timeFormatter.format(dateObj)}`;
}

/**
 * Get month name
 * @param date - Date string or Date object
 * @returns Month name in Portuguese
 */
export function getMonthName(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(dateObj);
}

/**
 * Get joined date text
 * @param date - Date string (seller joined date)
 * @returns Text like "Joined em Janeiro 2024"
 */
export function formatJoinedDate(date: string): string {
  const dateObj = new Date(date);
  const month = getMonthName(dateObj);
  const year = dateObj.getFullYear();
  return `Joined em ${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
}

export const avatarColors = [
  'from-blue-400 to-blue-600',
  'from-purple-400 to-purple-600',
  'from-amber-400 to-amber-600',
  'from-teal-400 to-teal-600',
  'from-pink-400 to-pink-600',
  'from-indigo-400 to-indigo-600',
];

export const statusColors = {
  online: '#22c55e',
  offline: '#9ca3af',
  away: '#f59e0b',
};

export const conversationStatusStyles = {
  active: {
    border: 'border-l-2 border-[#86cb92]',
    bg: 'bg-white/10',
  },
  pending: {
    border: 'border-l-2 border-transparent',
    bg: 'hover:bg-white/5',
    badge: { text: 'Aguardando', color: 'amber' as const }
  },
  closed: {
    border: 'border-l-2 border-transparent',
    bg: 'hover:bg-white/5 opacity-70',
    badge: { text: 'Encerrada', color: 'gray' as const }
  }
};

export const messageStatusIcons = {
  sent: '✓',
  delivered: '✓✓',
  read: '✓✓',
};

export function getColorByName(name: string): string {
  const colors = [
    'from-blue-400 to-blue-600',
    'from-purple-400 to-purple-600',
    'from-amber-400 to-amber-600',
    'from-teal-400 to-teal-600',
    'from-pink-400 to-pink-600',
    'from-indigo-400 to-indigo-600',
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
}

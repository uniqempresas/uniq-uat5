'use client';

import { AppointmentStatus } from '@/app/types/agendamentos';
import { statusColors } from '@/app/lib/utils/statusColors';

interface StatusLegendProps {
  showBlocked?: boolean;
}

export function StatusLegend({ showBlocked = true }: StatusLegendProps) {
  const statuses: AppointmentStatus[] = showBlocked 
    ? ['pending', 'confirmed', 'completed', 'cancelled', 'no_show', 'blocked']
    : ['pending', 'confirmed', 'completed', 'cancelled', 'no_show'];

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <span className="text-xs text-gray-500">Status:</span>
      {statuses.map((status) => (
        <div key={status} className="flex items-center gap-1.5">
          <div className={`w-2.5 h-2.5 rounded-full ${statusColors[status].dot}`} />
          <span className="text-xs text-gray-600">{statusColors[status].label}</span>
        </div>
      ))}
    </div>
  );
}

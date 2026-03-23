import { Badge } from '@/components/ui/badge';
import { TransactionStatus } from '@/lib/types/finance';

interface StatusBadgeProps {
  status: TransactionStatus;
  label?: string;
  className?: string;
}

const statusConfig: Record<TransactionStatus, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string; className?: string }> = {
  pending: { variant: 'outline', label: 'Pendente', className: 'border-yellow-500 text-yellow-700 bg-yellow-50' },
  paid: { variant: 'default', label: 'Pago', className: 'bg-green-500 hover:bg-green-600' },
  overdue: { variant: 'destructive', label: 'Vencido' },
  scheduled: { variant: 'secondary', label: 'Agendado', className: 'bg-blue-100 text-blue-700 hover:bg-blue-200' }
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge variant={config.variant} className={`${config.className || ''} ${className || ''}`}>
      {label || config.label}
    </Badge>
  );
}

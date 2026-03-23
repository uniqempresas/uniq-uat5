import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UpcomingBill } from '@/lib/types/finance';
import { formatCurrency } from '@/lib/utils/currency';
import { ArrowDownLeft, ArrowUpRight, AlertCircle } from 'lucide-react';

interface UpcomingBillsProps {
  bills: UpcomingBill[];
}

export function UpcomingBills({ bills }: UpcomingBillsProps) {
  return (
    <Card className="border-uniq-border h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-uniq-text">
          Próximos Vencimentos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {bills.length === 0 ? (
          <p className="text-uniq-muted text-center py-4">Nenhum vencimento próximo</p>
        ) : (
          bills.map((bill) => (
            <div
              key={bill.id}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                bill.isUrgent 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-uniq-platinum/30 border-uniq-border'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  bill.type === 'income' ? 'bg-uniq-accent/20' : 'bg-red-100'
                }`}>
                  {bill.type === 'income' ? (
                    <ArrowDownLeft className="h-4 w-4 text-uniq-accent" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-uniq-text text-sm">{bill.description}</p>
                  <p className="text-xs text-uniq-muted">{bill.category}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`font-semibold text-sm ${
                  bill.type === 'income' ? 'text-uniq-accent' : 'text-uniq-text'
                }`}>
                  {bill.type === 'income' ? '+' : '-'}{formatCurrency(bill.amount)}
                </p>
                <div className="flex items-center gap-1 justify-end">
                  {bill.isUrgent && (
                    <AlertCircle className="h-3 w-3 text-red-500" />
                  )}
                  <p className={`text-xs ${
                    bill.isUrgent ? 'text-red-500 font-medium' : 'text-uniq-muted'
                  }`}>
                    {bill.dueIn}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

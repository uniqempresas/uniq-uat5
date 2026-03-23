import { Badge } from '@/components/ui/badge';
import { TransactionType } from '@/lib/types/finance';
import { mockCategories } from '@/lib/mocks/finance';
import { ShoppingBag, Briefcase, Users, RefreshCw, MoreHorizontal, Home, Package, Zap, FileText, ShoppingCart } from 'lucide-react';

interface CategoryBadgeProps {
  category: string;
  type: TransactionType;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingBag,
  Briefcase,
  Users,
  RefreshCw,
  MoreHorizontal,
  Home,
  Package,
  Zap,
  FileText,
  ShoppingCart
};

export function CategoryBadge({ category, type, className }: CategoryBadgeProps) {
  const categories = type === 'income' ? mockCategories.income : mockCategories.expense;
  const categoryData = categories.find(c => c.name === category);
  
  if (!categoryData) {
    return <Badge variant="outline" className={className}>{category}</Badge>;
  }
  
  const IconComponent = iconMap[categoryData.icon] || MoreHorizontal;
  
  return (
    <Badge 
      variant="outline" 
      className={`gap-1 ${className}`}
      style={{ borderColor: categoryData.color, color: categoryData.color, backgroundColor: `${categoryData.color}15` }}
    >
      <IconComponent className="h-3 w-3" />
      {category}
    </Badge>
  );
}

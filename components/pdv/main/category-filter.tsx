'use client';

import { Category } from '@/types/pdv';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  LayoutGrid, 
  Sun, 
  Glasses, 
  Eye, 
  Package, 
  Contact,
  Baby
} from 'lucide-react';

interface CategoryFilterProps {
  categories: Category[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  'sun': <Sun className="w-4 h-4" />,
  'glasses': <Glasses className="w-4 h-4" />,
  'eye': <Eye className="w-4 h-4" />,
  'box': <Package className="w-4 h-4" />,
  'contact': <Contact className="w-4 h-4" />,
  'baby': <Baby className="w-4 h-4" />,
};

// Desktop sidebar version - hidden on mobile
export function CategoryFilter({ categories, selectedId, onSelect }: CategoryFilterProps) {
  const totalCount = categories.reduce((acc, c) => acc + c.count, 0);

  return (
    <div className="hidden lg:flex w-64 bg-white border-r h-full flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-[#1f2937]">Categorias</h2>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          <CategoryButton
            active={selectedId === null}
            onClick={() => onSelect(null)}
            icon={<LayoutGrid className="w-4 h-4" />}
            label="Todas"
            count={totalCount}
            color="#6b7280"
          />
          
          <Separator className="my-2" />
          
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              active={selectedId === category.id}
              onClick={() => onSelect(category.id)}
              icon={iconMap[category.icon || ''] || <Package className="w-4 h-4" />}
              label={category.name}
              count={category.count}
              color={category.color || '#6b7280'}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

interface CategoryButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count: number;
  color?: string;
}

function CategoryButton({ active, onClick, icon, label, count, color = '#6b7280' }: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200",
        active 
          ? 'bg-[#3e5653] text-white shadow-md' 
          : 'hover:bg-gray-100 text-[#1f2937]'
      )}
    >
      <div 
        className="w-8 h-8 rounded-lg flex items-center justify-center"
        style={{ 
          backgroundColor: active ? 'rgba(255,255,255,0.2)' : `${color}20`,
          color: active ? 'white' : color
        }}
      >
        {icon}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate text-sm">{label}</p>
      </div>
      
      <span className={cn(
        "text-xs px-2 py-0.5 rounded-full",
        active ? 'bg-white/20' : 'bg-gray-100 text-gray-600'
      )}>
        {count}
      </span>
    </button>
  );
}

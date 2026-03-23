'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Sun, Glasses, Eye, Package, Contact, Baby, X } from 'lucide-react';
import { Category } from '@/types/pdv';
import { cn } from '@/lib/utils';

interface CategoryDrawerProps {
  categories: Category[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
  isOpen: boolean;
  onClose: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  'sun': <Sun className="w-5 h-5" />,
  'glasses': <Glasses className="w-5 h-5" />,
  'eye': <Eye className="w-5 h-5" />,
  'box': <Package className="w-5 h-5" />,
  'contact': <Contact className="w-5 h-5" />,
  'baby': <Baby className="w-5 h-5" />,
};

export function CategoryDrawer({ categories, selectedId, onSelect, isOpen, onClose }: CategoryDrawerProps) {
  const totalCount = categories.reduce((acc, c) => acc + c.count, 0);

  const handleSelect = (id: number | null) => {
    onSelect(id);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="left" className="w-80 flex flex-col p-0">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-semibold">Categorias</SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-10 w-10 md:hidden min-h-[44px] min-w-[44px]"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <SheetDescription className="text-left">
            Selecione uma categoria para filtrar os produtos
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="p-3 space-y-1">
            <CategoryButton
              active={selectedId === null}
              onClick={() => handleSelect(null)}
              icon={<LayoutGrid className="w-5 h-5" />}
              label="Todas"
              count={totalCount}
              color="#6b7280"
            />

            <Separator className="my-3" />

            {categories.map((category) => (
              <CategoryButton
                key={category.id}
                active={selectedId === category.id}
                onClick={() => handleSelect(category.id)}
                icon={iconMap[category.icon || ''] || <Package className="w-5 h-5" />}
                label={category.name}
                count={category.count}
                color={category.color || '#6b7280'}
              />
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
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
        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
        "min-h-[52px] md:min-h-[48px]", // Touch target mobile
        active
          ? 'bg-[#3e5653] text-white shadow-md'
          : 'hover:bg-gray-100 text-[#1f2937]'
      )}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{
          backgroundColor: active ? 'rgba(255,255,255,0.2)' : `${color}20`,
          color: active ? 'white' : color
        }}
      >
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-base md:text-sm">{label}</p>
      </div>

      <span className={cn(
        "text-sm px-2.5 py-1 rounded-full font-medium",
        active ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
      )}>
        {count}
      </span>
    </button>
  );
}

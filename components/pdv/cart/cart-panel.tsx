'use client';

import { X, Trash2, ShoppingCart, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { CartPDV, CartItemPDV } from '@/types/pdv';
import { cn } from '@/lib/utils';

interface CartPanelProps {
  items: CartItemPDV[];
  summary: CartPDV;
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
  onClear: () => void;
  onCheckout: () => void;
  onApplyDiscount: () => void;
}

export function CartPanel({
  items,
  summary,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemove,
  onClear,
  onCheckout,
  onApplyDiscount
}: CartPanelProps) {
  const hasItems = items.length > 0;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-lg flex flex-col p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              <span>Carrinho ({summary.itemCount} {summary.itemCount === 1 ? 'item' : 'itens'})</span>
            </div>
            
            {hasItems && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClear}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 min-h-[44px] min-w-[44px]"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Limpar</span>
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 my-2 md:my-4">
          {!hasItems ? (
            <EmptyCart />
          ) : (
            <div className="space-y-2 md:space-y-3 px-4">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={(qty) => onUpdateQuantity(item.id, qty)}
                  onRemove={() => onRemove(item.id)}
                />
              ))}
            </div>
          )}
        </ScrollArea>

        {hasItems && (
          <CartSummary
            summary={summary}
            onApplyDiscount={onApplyDiscount}
            onCheckout={onCheckout}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-20 text-center px-4">
      <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <ShoppingCart className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
      </div>
      <h3 className="text-base md:text-lg font-semibold text-[#1f2937]">Carrinho vazio</h3>
      <p className="text-sm md:text-base text-gray-500 mt-1">Clique em um produto para adicionar</p>
    </div>
  );
}

interface CartItemProps {
  item: CartItemPDV;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-gray-50 rounded-lg group">
      <img
        src={item.image}
        alt={item.name}
        className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover bg-white"
      />

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm text-[#1f2937] truncate">{item.name}</h4>
        <p className="text-xs md:text-sm text-gray-500">
          {formatCurrency(item.price)} un.
        </p>
      </div>

      <QuantityControl
        value={item.quantity}
        min={1}
        max={item.stock}
        onChange={onUpdateQuantity}
      />

      <div className="text-right min-w-[60px] md:min-w-[80px]">
        <p className="font-semibold text-sm md:text-base text-[#3e5653]">{formatCurrency(item.subtotal)}</p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600 hover:bg-red-50 min-h-[44px] min-w-[44px] flex-shrink-0"
        onClick={onRemove}
      >
        <X className="w-4 h-4 md:w-5 md:h-5" />
      </Button>
    </div>
  );
}

interface QuantityControlProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

function QuantityControl({ value, min = 1, max, onChange }: QuantityControlProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (!max || value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 md:h-8 md:w-8 border-gray-200 min-h-[36px] min-w-[36px] md:min-h-[32px] md:min-w-[32px]"
        onClick={handleDecrement}
        disabled={value <= min}
      >
        <span className="text-base md:text-lg">−</span>
      </Button>

      <div className="w-10 h-9 md:w-12 md:h-8 flex items-center justify-center border border-gray-200 rounded-md font-medium text-sm md:text-base">
        {value}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 md:h-8 md:w-8 border-gray-200 min-h-[36px] min-w-[36px] md:min-h-[32px] md:min-w-[32px]"
        onClick={handleIncrement}
        disabled={max !== undefined && value >= max}
      >
        <span className="text-base md:text-lg">+</span>
      </Button>
    </div>
  );
}

interface CartSummaryProps {
  summary: CartPDV;
  onApplyDiscount: () => void;
  onCheckout: () => void;
}

function CartSummary({ summary, onApplyDiscount, onCheckout }: CartSummaryProps) {
  return (
    <div className="border-t p-4 space-y-4 bg-white">
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>{formatCurrency(summary.subtotal)}</span>
        </div>

        {summary.discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Desconto</span>
            <span>-{formatCurrency(summary.discount)}</span>
          </div>
        )}

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span className="text-[#1f2937]">TOTAL</span>
          <span className="text-[#3e5653]">{formatCurrency(summary.total)}</span>
        </div>
      </div>

      {/* Action buttons - Full width on mobile */}
      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          onClick={onApplyDiscount}
          className="border-[#3e5653] text-[#3e5653] hover:bg-[#3e5653]/10 min-h-[52px] text-base font-medium"
        >
          <Tag className="w-5 h-5 md:w-4 md:h-4 mr-2" />
          Desconto
        </Button>
        
        <Button 
          onClick={onCheckout}
          className="bg-[#86cb92] hover:bg-[#86cb92]/90 text-[#3e5653] font-semibold min-h-[52px] text-base"
        >
          <ShoppingCart className="w-5 h-5 md:w-4 md:h-4 mr-2" />
          Finalizar
        </Button>
      </div>
    </div>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

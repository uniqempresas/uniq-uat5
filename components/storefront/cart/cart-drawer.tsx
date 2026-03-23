'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/cart-context';
import { formatPrice } from '@/lib/utils/formatters';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';

export function CartDrawer() {
  const {
    items,
    isOpen,
    summary,
    closeCart,
    removeItem,
    updateQuantity,
  } = useCart();
  
  const handleQuantityChange = (productId: number, delta: number) => {
    const item = items.find(i => i.productId === productId);
    if (item) {
      const newQuantity = item.quantity + delta;
      if (newQuantity > 0) {
        updateQuantity(productId, newQuantity);
      }
    }
  };
  
  const handleRemove = (productId: number, productName: string) => {
    removeItem(productId);
    toast({
      title: 'Item removido',
      description: `${productName} foi removido do carrinho.`,
    });
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader className="space-y-2.5 pb-4">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Meu Carrinho
            {summary.itemCount > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                ({summary.itemCount} {summary.itemCount === 1 ? 'item' : 'itens'})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
              <ShoppingCart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Seu carrinho está vazio
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Adicione produtos para começar
            </p>
            <Button onClick={closeCart} variant="outline">
              Continuar Comprando
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 p-3 bg-muted/50 rounded-lg"
                  >
                    {/* Image */}
                    <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-white">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground line-clamp-2">
                        {item.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        SKU: {item.sku}
                      </p>
                      <p className="text-sm font-semibold text-primary mt-2">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-red-500"
                        onClick={() => handleRemove(item.productId, item.name)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleQuantityChange(item.productId, -1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleQuantityChange(item.productId, 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <Separator className="my-4" />
            
            {/* Summary */}
            <SheetFooter className="flex-col gap-4">
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(summary.subtotal)}</span>
                </div>
                
                {summary.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Desconto</span>
                    <span className="font-medium text-green-600">
                      -{formatPrice(summary.discount)}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="font-medium">
                    {summary.shipping === 0 ? (
                      <span className="text-green-600">Grátis</span>
                    ) : (
                      formatPrice(summary.shipping)
                    )}
                  </span>
                </div>
                
                {summary.subtotal < 299.90 && (
                  <p className="text-xs text-muted-foreground text-center">
                    Faltam {formatPrice(299.90 - summary.subtotal)} para frete grátis
                  </p>
                )}
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(summary.total)}</span>
                </div>
              </div>
              
              <Button className="w-full" size="lg" asChild>
                <Link href="/checkout" onClick={closeCart}>
                  Finalizar Compra
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              
              <Button
                variant="ghost"
                className="w-full"
                onClick={closeCart}
              >
                Continuar Comprando
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

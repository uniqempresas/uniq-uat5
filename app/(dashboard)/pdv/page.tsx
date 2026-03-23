'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PDVProvider, usePDVContext } from '@/contexts/pdv-context';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { PDVHeader } from '@/components/pdv/main/pdv-header';
import { ProductGrid } from '@/components/pdv/main/product-grid';
import { CategoryFilter } from '@/components/pdv/main/category-filter';
import { CategoryDrawer } from '@/components/pdv/main/category-drawer';
import { CartPanel } from '@/components/pdv/cart/cart-panel';
import { CheckoutModal } from '@/components/pdv/checkout/checkout-modal';
import { mockPDVCategories } from '@/lib/mocks/pdv-products';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function PDVContent() {
  const router = useRouter();
  const {
    filteredProducts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyDiscount,
    isCheckoutOpen,
    setIsCheckoutOpen,
    isCartOpen,
    setIsCartOpen,
    completeSale,
    caixa
  } = usePDVContext();

  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [discountAmount, setDiscountAmount] = useState('');
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);

  // Configurar atalhos de teclado
  useKeyboardShortcuts({
    'F1': () => setShowShortcuts(true),
    'F2': () => document.getElementById('search-input')?.focus(),
    'F7': () => setShowDiscount(true),
    'F8': () => clearCart(),
    'F9': () => router.push('/pdv/caixa'),
    'F10': () => router.push('/pdv/relatorios'),
    'F12': () => cart.items.length > 0 && setIsCheckoutOpen(true)
  });

  const handleApplyDiscount = () => {
    const amount = parseFloat(discountAmount);
    if (amount > 0) {
      applyDiscount(amount);
      setShowDiscount(false);
      setDiscountAmount('');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#efefef]">
      <PDVHeader
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onOpenShortcuts={() => setShowShortcuts(true)}
        onToggleCart={() => setIsCartOpen(true)}
        onToggleCategories={() => setIsCategoryDrawerOpen(true)}
        caixaStatus={caixa.status === 'aberto' ? 'aberto' : 'fechado'}
        operatorName={caixa.currentOperator || 'Operador'}
        cartItemCount={cart.itemCount}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar - hidden on mobile */}
        <CategoryFilter
          categories={mockPDVCategories}
          selectedId={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <main className="flex-1 overflow-auto p-2 md:p-4 lg:p-6">
          <ProductGrid
            products={filteredProducts}
            onAddToCart={addToCart}
          />
        </main>
      </div>

      {/* Mobile category drawer */}
      <CategoryDrawer
        categories={mockPDVCategories}
        selectedId={selectedCategory}
        onSelect={setSelectedCategory}
        isOpen={isCategoryDrawerOpen}
        onClose={() => setIsCategoryDrawerOpen(false)}
      />

      <CartPanel
        items={cart.items}
        summary={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onClear={clearCart}
        onCheckout={() => setIsCheckoutOpen(true)}
        onApplyDiscount={() => setShowDiscount(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onComplete={completeSale}
      />

      {/* Shortcuts Modal */}
      <Dialog open={showShortcuts} onOpenChange={setShowShortcuts}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg md:text-xl">Atalhos de Teclado</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4">
            <ShortcutItem shortcut="F1" description="Ajuda / Atalhos" />
            <ShortcutItem shortcut="F2" description="Buscar produto" />
            <ShortcutItem shortcut="F3" description="Buscar cliente" />
            <ShortcutItem shortcut="F7" description="Aplicar desconto" />
            <ShortcutItem shortcut="F8" description="Limpar carrinho" />
            <ShortcutItem shortcut="F9" description="Controle de caixa" />
            <ShortcutItem shortcut="F10" description="Relatórios" />
            <ShortcutItem shortcut="F12" description="Finalizar venda" />
          </div>
          <Button onClick={() => setShowShortcuts(false)} className="w-full min-h-[48px]">Fechar</Button>
        </DialogContent>
      </Dialog>

      {/* Discount Modal */}
      <Dialog open={showDiscount} onOpenChange={setShowDiscount}>
        <DialogContent className="max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle className="text-lg md:text-xl">Aplicar Desconto</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-base font-medium">Valor do Desconto (R$)</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0,00"
                value={discountAmount}
                onChange={(e) => setDiscountAmount(e.target.value)}
                className="min-h-[52px] text-lg"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setShowDiscount(false)} className="flex-1 min-h-[48px]">
                Cancelar
              </Button>
              <Button onClick={handleApplyDiscount} className="flex-1 min-h-[48px] bg-[#86cb92] hover:bg-[#86cb92]/90 text-[#3e5653]">
                Aplicar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ShortcutItem({ shortcut, description }: { shortcut: string; description: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
      <kbd className="px-2 py-1.5 bg-white border rounded text-sm font-mono">{shortcut}</kbd>
      <span className="text-sm">{description}</span>
    </div>
  );
}

export default function PDVPage() {
  return (
    <PDVProvider>
      <PDVContent />
    </PDVProvider>
  );
}

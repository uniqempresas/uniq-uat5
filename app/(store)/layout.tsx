import { CartProvider } from '@/contexts/cart-context';
import { StoreHeader } from '@/components/storefront/layout/store-header';
import { StoreFooter } from '@/components/storefront/layout/store-footer';
import { CartDrawer } from '@/components/storefront/cart/cart-drawer';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <StoreHeader />
        <main className="flex-1 pt-[140px]">
          {children}
        </main>
        <StoreFooter />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

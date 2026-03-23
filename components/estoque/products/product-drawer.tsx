'use client';

import { useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ProductForm, ProductFormData } from './product-form';
import { Product, Category } from '@/lib/estoque/types';

interface ProductDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  categories: Category[];
  onSave: (data: ProductFormData) => void;
  isLoading?: boolean;
}

export function ProductDrawer({
  isOpen,
  onClose,
  product,
  categories,
  onSave,
  isLoading = false,
}: ProductDrawerProps) {
  // Reset form when drawer closes
  useEffect(() => {
    if (!isOpen) {
      // Form will be reset via initialData prop change
    }
  }, [isOpen]);

  const handleSubmit = (data: ProductFormData) => {
    onSave(data);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <SheetContent className="w-full md:w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {product ? 'Editar Produto' : 'Novo Produto'}
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6">
          <ProductForm
            initialData={product}
            categories={categories}
            onSubmit={handleSubmit}
            onCancel={handleClose}
            isLoading={isLoading}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

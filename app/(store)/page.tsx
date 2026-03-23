'use client';

import React, { useState, useMemo } from 'react';
import { ProductGrid } from '@/components/storefront/product/product-grid';
import { ProductFilters } from '@/components/storefront/product/product-filters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { mockProducts, mockCategories, mockStoreConfig } from '@/lib/mocks/storefront';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export default function StorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Filtra produtos
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      // Filtro de busca
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filtro de categoria
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.categoryId)) {
        return false;
      }
      
      // Filtro de preço
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      
      return true;
    });
  }, [searchQuery, selectedCategories, priceRange]);
  
  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setPriceRange([0, 2000]);
  };
  
  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 2000;
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner */}
      <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-primary to-primary/70">
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {mockStoreConfig.name}
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              {mockStoreConfig.description}
            </p>
          </div>
        </div>
      </div>
      
      {/* Search & Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <ProductFilters
                  categories={mockCategories}
                  selectedCategories={selectedCategories}
                  onToggleCategory={toggleCategory}
                  priceRange={priceRange}
                  onPriceChange={setPriceRange}
                />
              </div>
            </SheetContent>
          </Sheet>
          
          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearFilters}>
              <X className="w-4 h-4 mr-2" />
              Limpar
            </Button>
          )}
        </div>
      </div>
      
      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
          {searchQuery && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Busca: {searchQuery}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => setSearchQuery('')}
              />
            </Badge>
          )}
          {selectedCategories.map((catId) => {
            const category = mockCategories.find((c) => c.id === catId);
            return (
              <Badge key={catId} variant="secondary" className="flex items-center gap-1">
                {category?.name}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => toggleCategory(catId)}
                />
              </Badge>
            );
          })}
        </div>
      )}
      
      {/* Content */}
      <div className="flex gap-8">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <ProductFilters
            categories={mockCategories}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
          />
        </aside>
        
        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-4 text-sm text-muted-foreground">
            {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado
            {filteredProducts.length !== 1 ? 's' : ''}
          </div>
          <ProductGrid products={filteredProducts} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

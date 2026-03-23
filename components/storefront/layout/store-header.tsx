'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Menu, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/contexts/cart-context';
import { mockStoreConfig, mockCategories } from '@/lib/mocks/storefront';

interface StoreHeaderProps {
  onCartClick?: () => void;
}

export function StoreHeader({ onCartClick }: StoreHeaderProps) {
  const { summary, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    } else {
      openCart();
    }
  };
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-primary">
              {mockStoreConfig.name}
            </h1>
          </Link>
          
          {/* Search - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4"
              />
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Phone - Desktop */}
            <a
              href={`tel:${mockStoreConfig.phone}`}
              className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{mockStoreConfig.phone}</span>
            </a>
            
            {/* Cart Button */}
            <Button
              variant="outline"
              size="icon"
              className="relative"
              onClick={handleCartClick}
            >
              <ShoppingCart className="w-5 h-5" />
              {summary.itemCount > 0 && (
                <Badge
                  variant="default"
                  className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs"
                >
                  {summary.itemCount}
                </Badge>
              )}
            </Button>
            
            {/* Mobile Menu Toggle */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <div className="flex flex-col gap-6">
                  <h2 className="text-xl font-bold text-primary">
                    {mockStoreConfig.name}
                  </h2>
                  
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Buscar produtos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10"
                    />
                  </div>
                  
                  {/* Categories */}
                  <nav className="flex flex-col gap-2">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase">
                      Categorias
                    </h3>
                    {mockCategories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/categoria/${category.slug}`}
                        className="py-2 text-foreground hover:text-primary transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {category.name}
                        <span className="ml-2 text-xs text-muted-foreground">
                          ({category.count})
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Navigation - Desktop */}
        <nav className="hidden lg:flex items-center gap-6 mt-4 pt-4 border-t border-border">
          {mockCategories.map((category) => (
            <Link
              key={category.id}
              href={`/categoria/${category.slug}`}
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

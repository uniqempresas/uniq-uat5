'use client';

import { Search, ShoppingCart, Keyboard, Info, User, Menu, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PDVHeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit?: () => void;
  onOpenShortcuts?: () => void;
  onOpenCaixa?: () => void;
  onOpenRelatorios?: () => void;
  caixaStatus: 'aberto' | 'fechado';
  operatorName: string;
  cartItemCount: number;
  onToggleCart: () => void;
  onToggleCategories?: () => void;
}

export function PDVHeader({
  searchValue,
  onSearchChange,
  onSearchSubmit,
  onOpenShortcuts,
  onToggleCart,
  onToggleCategories,
  caixaStatus,
  operatorName,
  cartItemCount
}: PDVHeaderProps) {
  return (
    <header className="bg-[#3e5653] text-white shadow-lg">
      {/* Main Header - Mobile Compact */}
      <div className="flex items-center justify-between px-3 py-2 md:px-4 md:py-3">
        {/* Left: Logo + Menu (mobile) or just Logo (desktop) */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Categories Toggle (Mobile only) */}
          {onToggleCategories && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCategories}
              className="md:hidden min-h-[44px] min-w-[44px] hover:bg-white/10"
            >
              <Menu className="w-5 h-5" />
            </Button>
          )}

          {/* Logo */}
          <div className="w-9 h-9 md:w-10 md:h-10 bg-[#86cb92] rounded-lg flex items-center justify-center">
            <span className="text-[#3e5653] font-bold text-lg md:text-xl">U</span>
          </div>
          
          {/* Title - hidden on mobile */}
          <div className="hidden md:block">
            <h1 className="font-bold text-lg">UNIQ PDV</h1>
            <p className="text-xs text-white/70">Ponto de Venda</p>
          </div>
        </div>

        {/* Search Bar - Full width on mobile, constrained on desktop */}
        <div className="flex-1 max-w-xl mx-3 md:max-w-2xl md:mx-8">
          <div className="relative">
            <Search className="absolute left-2.5 md:left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
            <Input
              id="search-input"
              type="text"
              placeholder="Buscar (F2)..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && onSearchSubmit) {
                  onSearchSubmit();
                }
              }}
              className="pl-9 md:pl-10 pr-16 md:pr-12 py-2 md:py-2.5 bg-white text-gray-900 border-0 focus-visible:ring-[#86cb92] text-sm md:text-base"
            />
            {/* F2 badge - hidden on mobile search focus indicator */}
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden md:flex">
              <Badge variant="secondary" className="text-xs bg-gray-100">
                F2
              </Badge>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1 md:gap-3">
          {/* Caixa Status - hidden on mobile */}
          <div className={cn(
            "hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg",
            caixaStatus === 'aberto' ? 'bg-green-500/20' : 'bg-red-500/20'
          )}>
            <span className={cn(
              "w-2 h-2 rounded-full",
              caixaStatus === 'aberto' ? 'bg-green-400 animate-pulse' : 'bg-red-400'
            )} />
            <span className="text-sm font-medium">
              {caixaStatus === 'aberto' ? 'Aberto' : 'Fechado'}
            </span>
          </div>

          {/* Operator - hidden on mobile */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg">
            <User className="w-4 h-4" />
            <span className="text-sm">{operatorName}</span>
          </div>

          {/* Cart Button - Touch optimized */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCart}
            className="relative hover:bg-white/10 min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#86cb92] text-[#3e5653] text-xs font-bold rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>

          {/* Help Button - Touch optimized */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenShortcuts}
            className="hover:bg-white/10 min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0"
          >
            <Info className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Shortcut Bar - Hidden on mobile */}
      <div className="hidden md:flex items-center gap-1 px-4 py-2 bg-black/20 overflow-x-auto">
        <ShortcutButton shortcut="F1" label="Ajuda" />
        <ShortcutButton shortcut="F2" label="Buscar" />
        <ShortcutButton shortcut="F3" label="Cliente" />
        <ShortcutButton shortcut="F7" label="Desconto" />
        <ShortcutButton shortcut="F8" label="Limpar" />
        <ShortcutButton shortcut="F9" label="Caixa" />
        <ShortcutButton shortcut="F10" label="Relatórios" />
        <ShortcutButton shortcut="F12" label="Finalizar" highlight />
      </div>
    </header>
  );
}

function ShortcutButton({ 
  shortcut, 
  label, 
  highlight = false 
}: { 
  shortcut: string; 
  label: string; 
  highlight?: boolean;
}) {
  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-1.5 rounded text-sm whitespace-nowrap",
      highlight 
        ? 'bg-[#86cb92] text-[#3e5653] font-semibold' 
        : 'bg-white/10 hover:bg-white/20'
    )}>
      <Keyboard className="w-3 h-3" />
      <span className="font-mono text-xs opacity-70">{shortcut}</span>
      <span>{label}</span>
    </div>
  );
}

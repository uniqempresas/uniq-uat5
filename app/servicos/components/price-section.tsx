"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PriceSectionProps, PriceVariation } from "@/app/types/service";

export function PriceSection({ 
  basePrice, 
  variations, 
  onBasePriceChange, 
  onVariationsChange 
}: PriceSectionProps) {
  const handleAddVariation = () => {
    const newVariation: PriceVariation = {
      id: crypto.randomUUID(),
      name: '',
      price: basePrice,
      duration: 30,
    };
    onVariationsChange([...variations, newVariation]);
  };

  const handleRemoveVariation = (id: string) => {
    onVariationsChange(variations.filter(v => v.id !== id));
  };

  const handleVariationChange = (id: string, field: keyof PriceVariation, value: string | number) => {
    onVariationsChange(
      variations.map(v => 
        v.id === id ? { ...v, [field]: value } : v
      )
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const parseCurrency = (value: string) => {
    const numeric = value.replace(/[^\d,]/g, '').replace(',', '.');
    return parseFloat(numeric) || 0;
  };

  return (
    <div className="space-y-6">
      {/* Preço Base */}
      <div className="space-y-2">
        <Label htmlFor="base-price">Preço Base *</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-uniq-muted">
            R$
          </span>
          <Input
            id="base-price"
            type="text"
            value={formatCurrency(basePrice).replace('R$ ', '')}
            onChange={(e) => onBasePriceChange(parseCurrency(e.target.value))}
            className="pl-10"
            placeholder="0,00"
          />
        </div>
      </div>

      {/* Variações */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Variações de Preço</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddVariation}
            className="gap-1"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </Button>
        </div>

        {variations.length === 0 && (
          <p className="text-sm text-uniq-muted">
            Nenhuma variação cadastrada. Adicione variações como &quot;Corte + Barba&quot; ou &quot;Corte Infantil&quot;.
          </p>
        )}

        {variations.map((variation, index) => (
          <div 
            key={variation.id}
            className="grid grid-cols-12 gap-3 items-start p-3 border border-uniq-border rounded-lg bg-uniq-platinum/30"
          >
            <div className="col-span-5">
              <Input
                placeholder="Nome da variação"
                value={variation.name}
                onChange={(e) => handleVariationChange(variation.id, 'name', e.target.value)}
              />
            </div>
            <div className="col-span-3">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-uniq-muted text-sm">
                  R$
                </span>
                <Input
                  type="text"
                  value={formatCurrency(variation.price).replace('R$ ', '')}
                  onChange={(e) => handleVariationChange(variation.id, 'price', parseCurrency(e.target.value))}
                  className="pl-8"
                  placeholder="0,00"
                />
              </div>
            </div>
            <div className="col-span-3">
              <div className="relative">
                <Input
                  type="number"
                  value={variation.duration}
                  onChange={(e) => handleVariationChange(variation.id, 'duration', parseInt(e.target.value) || 0)}
                  className="pr-10"
                  min={5}
                  max={480}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-uniq-muted text-sm">
                  min
                </span>
              </div>
            </div>
            <div className="col-span-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveVariation(variation.id)}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Module } from '@/types/employee';
import { cn } from '@/lib/utils';
import {
  Users,
  Wallet,
  Package,
  ShoppingCart,
  Store,
  Calendar,
  Settings,
} from 'lucide-react';

interface ModuleCheckboxProps {
  module: Module;
  selected: boolean;
  onChange: (selected: boolean) => void;
  disabled?: boolean;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Wallet,
  Package,
  ShoppingCart,
  Store,
  Calendar,
  Settings,
};

export function ModuleCheckbox({
  module,
  selected,
  onChange,
  disabled,
}: ModuleCheckboxProps) {
  const Icon = iconMap[module.icon] || Users;

  return (
    <label
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
        selected
          ? "border-[#86cb92] bg-[#86cb92]/5"
          : "border-[#e5e7eb] hover:bg-[#f9fafb]",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <Checkbox
        checked={selected}
        onCheckedChange={onChange}
        disabled={disabled}
        className="border-[#e5e7eb] data-[state=checked]:bg-[#3e5653] data-[state=checked]:border-[#3e5653]"
      />
      <Icon className="w-5 h-5 text-[#627271]" />
      <span className="text-sm text-[#1f2937]">{module.name}</span>
    </label>
  );
}

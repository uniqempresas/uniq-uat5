"use client";

import { useState, useCallback } from "react";
import { Search, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SearchBarProps } from "@/app/types/service";

export function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Buscar serviço...",
  loading = false 
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  // Debounce de 300ms
  const debouncedOnChange = useCallback(
    debounce((val: string) => onChange(val), 300),
    [onChange]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    debouncedOnChange(newValue);
  };

  return (
    <div className="relative flex-1 max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-uniq-muted" />
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          "w-full pl-10 pr-10 py-2.5 rounded-lg border bg-uniq-white text-sm text-uniq-text placeholder-uniq-muted focus:outline-none transition-all",
          isFocused
            ? "ring-2 ring-uniq-accent border-uniq-accent"
            : "border-uniq-border"
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {loading && (
        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-uniq-muted animate-spin" />
      )}
    </div>
  );
}

// Utility debounce function
function debounce<T extends (...args: string[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

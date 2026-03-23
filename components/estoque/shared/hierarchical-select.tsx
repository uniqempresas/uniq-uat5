'use client';

import { cn } from '@/lib/estoque/utils';
import { Category } from '@/lib/estoque/types';
import { ChevronRight, Folder, FolderOpen } from 'lucide-react';
import { useState } from 'react';

interface HierarchicalSelectProps {
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function HierarchicalSelect({
  categories,
  value,
  onChange,
  placeholder = 'Selecione uma categoria',
  className,
}: HierarchicalSelectProps) {
  // Build tree from flat list
  const buildTree = (cats: Category[], parentId?: string): Category[] => {
    return cats
      .filter(c => c.parentId === parentId)
      .map(c => ({
        ...c,
        children: buildTree(cats, c.id),
      }))
      .sort((a, b) => a.order - b.order);
  };

  const tree = buildTree(categories);

  const renderOptions = (items: Category[], level: number = 0): React.ReactNode[] => {
    return items.flatMap(item => [
      <option key={item.id} value={item.id} style={{ paddingLeft: `${level * 16}px` }}>
        {item.name}
      </option>,
      ...(item.children ? renderOptions(item.children, level + 1) : []),
    ]);
  };

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm',
        'focus:ring-2 focus:ring-[#86cb92] focus:border-transparent',
        'bg-white',
        className
      )}
    >
      <option value="">{placeholder}</option>
      {renderOptions(tree)}
    </select>
  );
}

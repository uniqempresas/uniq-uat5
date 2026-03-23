'use client';

import { Button } from '../../../../components/ui/button';
import { LayoutGrid, List } from 'lucide-react';

interface ViewToggleProps {
  value: 'cards' | 'table';
  onChange: (value: 'cards' | 'table') => void;
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-[#efefef] rounded-lg">
      <Button
        variant={value === 'cards' ? 'secondary' : 'ghost'}
        size="icon"
        onClick={() => onChange('cards')}
        className="h-8 w-8"
      >
        <LayoutGrid className="w-5 h-5" />
      </Button>
      <Button
        variant={value === 'table' ? 'secondary' : 'ghost'}
        size="icon"
        onClick={() => onChange('table')}
        className="h-8 w-8"
      >
        <List className="w-5 h-5" />
      </Button>
    </div>
  );
}

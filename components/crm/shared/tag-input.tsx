'use client';

import React, { useState, useRef } from 'react';
import { Tag } from '@/types/crm';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface TagInputProps {
  tags: Tag[];
  onChange: (tags: Tag[]) => void;
  availableTags: Tag[];
  maxTags?: number;
}

const PRESET_COLORS = [
  '#EF4444', // red
  '#F97316', // orange
  '#F59E0B', // amber
  '#84CC16', // lime
  '#10B981', // emerald
  '#06B6D4', // cyan
  '#3B82F6', // blue
  '#8B5CF6', // violet
  '#D946EF', // fuchsia
  '#F43F5E', // rose
];

export function TagInput({
  tags,
  onChange,
  availableTags,
  maxTags = 5,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredAvailable = availableTags.filter(
    (tag) => !tags.some((t) => t.id === tag.id)
  );

  const handleAddTag = () => {
    if (!inputValue.trim() || tags.length >= maxTags) return;

    const existingTag = availableTags.find(
      (t) => t.name.toLowerCase() === inputValue.toLowerCase()
    );

    if (existingTag && !tags.some((t) => t.id === existingTag.id)) {
      onChange([...tags, existingTag]);
    } else if (!existingTag) {
      const newTag: Tag = {
        id: `new-${Date.now()}`,
        name: inputValue.trim(),
        color: selectedColor,
      };
      onChange([...tags, newTag]);
    }

    setInputValue('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleRemoveTag = (tagId: string) => {
    onChange(tags.filter((t) => t.id !== tagId));
  };

  const handleSelectExisting = (tag: Tag) => {
    if (tags.length < maxTags) {
      onChange([...tags, tag]);
    }
    setIsOpen(false);
  };

  return (
    <div className="space-y-2">
      {/* Tags existentes */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag.id}
            style={{
              backgroundColor: `${tag.color}20`,
              color: tag.color,
              borderColor: tag.color,
            }}
            variant="outline"
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            {tag.name}
            <button
              type="button"
              onClick={() => handleRemoveTag(tag.id)}
              className="ml-1 hover:opacity-70"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>

      {/* Input para nova tag */}
      {tags.length < maxTags && (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8"
            >
              <Plus className="w-3 h-3 mr-1" />
              Adicionar tag
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-3">
              <Input
                ref={inputRef}
                placeholder="Nome da tag..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />

              {/* Seletor de cor */}
              <div className="flex flex-wrap gap-1">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? 'border-foreground scale-110'
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              {/* Tags disponíveis */}
              {filteredAvailable.length > 0 && (
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground mb-2">
                    Tags existentes:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {filteredAvailable.map((tag) => (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => handleSelectExisting(tag)}
                        className="text-xs px-2 py-1 rounded-full border hover:opacity-80 transition-opacity"
                        style={{
                          backgroundColor: `${tag.color}20`,
                          color: tag.color,
                          borderColor: tag.color,
                        }}
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <Button
                type="button"
                size="sm"
                className="w-full"
                onClick={handleAddTag}
                disabled={!inputValue.trim()}
              >
                Criar &quot;{inputValue || 'nova tag'}&quot;
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}

      {tags.length >= maxTags && (
        <p className="text-xs text-muted-foreground">
          Limite de {maxTags} tags atingido.
        </p>
      )}
    </div>
  );
}

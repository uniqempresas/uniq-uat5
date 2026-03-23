'use client';

import { Category } from '@/lib/estoque/types';
import { ChevronRight, Folder } from 'lucide-react';
import { useState } from 'react';

interface CategoryTreeProps {
  categories: Category[];
  selectedCategory?: string;
  onSelect?: (category: Category) => void;
  onEdit?: (category: Category) => void;
  onDelete?: (category: Category) => void;
  onAddChild?: (parentId: string) => void;
  isLoading?: boolean;
}

export function CategoryTree({
  categories,
  selectedCategory,
  onSelect,
  onEdit,
  onDelete,
  onAddChild,
  isLoading = false,
}: CategoryTreeProps) {
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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Folder className="w-5 h-5 text-[#86cb92]" />
          <h3 className="font-semibold text-[#1f2937]">Árvore de Categorias</h3>
        </div>
      </div>

      <div className="p-4">
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : tree.length === 0 ? (
          <div className="text-center py-8 text-[#627271]">
            Nenhuma categoria encontrada
          </div>
        ) : (
          <div className="space-y-1">
            {tree.map((category) => (
              <CategoryNode
                key={category.id}
                category={category}
                level={0}
                selectedCategory={selectedCategory}
                onSelect={onSelect}
                onEdit={onEdit}
                onDelete={onDelete}
                onAddChild={onAddChild}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 text-sm text-[#627271]">
        Total: {categories.length} categorias
      </div>
    </div>
  );
}

interface CategoryNodeProps {
  category: Category;
  level: number;
  selectedCategory?: string;
  onSelect?: (category: Category) => void;
  onEdit?: (category: Category) => void;
  onDelete?: (category: Category) => void;
  onAddChild?: (parentId: string) => void;
}

function CategoryNode({
  category,
  level,
  selectedCategory,
  onSelect,
  onEdit,
  onDelete,
  onAddChild,
}: CategoryNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const hasChildren = category.children && category.children.length > 0;
  const isSelected = selectedCategory === category.id;

  return (
    <div>
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
          isSelected
            ? 'bg-[#86cb92]/10 text-[#3e5653]'
            : 'hover:bg-gray-50 text-[#1f2937]'
        }`}
        style={{ paddingLeft: `${level * 20 + 12}px` }}
      >
        {/* Expand/Collapse Button */}
        {hasChildren ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-0.5 hover:bg-gray-200 rounded"
          >
            <ChevronRight
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
            />
          </button>
        ) : (
          <span className="w-5" />
        )}

        {/* Category Info */}
        <div
          className="flex-1 min-w-0"
          onClick={() => onSelect?.(category)}
        >
          <div className="flex items-center gap-2">
            <span className="font-medium truncate">{category.name}</span>
            {hasChildren && (
              <span className="text-xs text-[#627271]">
                ({category.children?.length} subcategorias)
              </span>
            )}
          </div>
          <div className="text-xs text-[#627271]">
            {category.productCount} produtos
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {onAddChild && (
            <button
              onClick={() => onAddChild(category.id)}
              className="p-1.5 text-[#627271] hover:text-[#3e5653] hover:bg-gray-100 rounded-lg text-xs"
              title="Adicionar subcategoria"
            >
              +
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(category)}
              className="p-1.5 text-[#627271] hover:text-[#3e5653] hover:bg-gray-100 rounded-lg"
              title="Editar"
            >
              ✏️
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(category)}
              className="p-1.5 text-[#627271] hover:text-red-600 hover:bg-red-50 rounded-lg"
              title="Excluir"
            >
              🗑️
            </button>
          )}
        </div>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div>
          {category.children?.map((child) => (
            <CategoryNode
              key={child.id}
              category={child}
              level={level + 1}
              selectedCategory={selectedCategory}
              onSelect={onSelect}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddChild={onAddChild}
            />
          ))}
        </div>
      )}
    </div>
  );
}

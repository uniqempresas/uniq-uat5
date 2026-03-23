'use client';

import { useState } from 'react';
import { useCategories } from '@/hooks/use-categories';
import { CategoryTree } from '@/components/estoque/categories/category-tree';
import { Sidebar } from '@/components/sidebar';
import { Plus, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function CategoriasPage() {
  const { categories, categoryTree, isLoading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  return (
    <div className="min-h-screen bg-[#efefef] flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col ml-0 lg:ml-64">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/estoque"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[#627271]" />
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-[#1f2937]">Categorias</h1>
              <p className="text-sm text-[#627271]">{categories.length} categorias cadastradas</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#86cb92] text-white rounded-lg hover:bg-green-600 transition-colors">
            <Plus className="w-4 h-4" />
            Nova Categoria
          </button>
        </header>

        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Category Tree */}
            <div className="lg:col-span-2">
              <CategoryTree
                categories={categoryTree}
                selectedCategory={selectedCategory}
                onSelect={(cat) => setSelectedCategory(cat.id)}
                onEdit={(cat) => console.log('Edit:', cat)}
                onDelete={(cat) => console.log('Delete:', cat)}
                onAddChild={(parentId) => console.log('Add child:', parentId)}
                isLoading={isLoading}
              />
            </div>

            {/* Category Details */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <h3 className="font-semibold text-[#1f2937] mb-4">Detalhes da Categoria</h3>
                
                {selectedCategory ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-[#627271]">Nome</p>
                      <p className="font-medium text-[#1f2937]">
                        {categories.find(c => c.id === selectedCategory)?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#627271]">Slug</p>
                      <p className="font-mono text-sm text-[#1f2937]">
                        {categories.find(c => c.id === selectedCategory)?.slug}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#627271]">Produtos</p>
                      <p className="font-medium text-[#1f2937]">
                        {categories.find(c => c.id === selectedCategory)?.productCount}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#627271]">Status</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        categories.find(c => c.id === selectedCategory)?.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {categories.find(c => c.id === selectedCategory)?.isActive ? 'Ativa' : 'Inativa'}
                      </span>
                    </div>

                    <div className="pt-4 border-t border-gray-200 flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors">
                        Editar
                      </button>
                      <button className="flex-1 px-4 py-2 border border-gray-300 text-[#627271] rounded-lg hover:bg-gray-50 transition-colors">
                        Ver Produtos
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-[#627271] py-8">
                    Selecione uma categoria para ver os detalhes
                  </p>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mt-6">
                <h3 className="font-semibold text-[#1f2937] mb-4">Ações Rápidas</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Plus className="w-5 h-5 text-[#627271]" />
                    <span className="text-[#1f2937]">Nova Categoria</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5 text-[#627271]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span className="text-[#1f2937]">Importar Categorias</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

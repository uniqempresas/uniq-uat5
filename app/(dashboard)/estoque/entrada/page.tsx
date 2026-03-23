'use client';

import { useState } from 'react';
import { useProducts } from '@/hooks/use-products';
import { useCategories } from '@/hooks/use-categories';
import { Sidebar } from '@/components/sidebar';
import { Search, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function EntradaEstoquePage() {
  const { products } = useProducts();
  const { categories } = useCategories();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [cost, setCost] = useState<number>(0);
  const [reason, setReason] = useState<string>('compra');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedProductData = products.find(p => p.id === selectedProduct);

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
              <h1 className="text-xl font-semibold text-[#1f2937]">Entrada de Estoque</h1>
              <p className="text-sm text-[#627271]">Registrar entrada manual</p>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Product Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-[#1f2937] mb-4">Selecionar Produto</h3>
              
              {!selectedProduct ? (
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#627271]" />
                    <input
                      type="text"
                      placeholder="Buscar por nome, SKU ou código de barras..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
                    />
                  </div>

                  {searchQuery && (
                    <div className="border border-gray-200 rounded-lg divide-y divide-gray-100 max-h-64 overflow-y-auto">
                      {filteredProducts.slice(0, 10).map((product) => (
                        <button
                          key={product.id}
                          onClick={() => {
                            setSelectedProduct(product.id);
                            setCost(product.cost);
                          }}
                          className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 text-left transition-colors"
                        >
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            {product.images[0] ? (
                              <img src={product.images[0]} alt="" className="w-full h-full object-cover rounded" />
                            ) : (
                              <span className="text-xs text-gray-400">Sem img</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-[#1f2937]">{product.name}</p>
                            <p className="text-sm text-[#627271]">SKU: {product.sku}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-[#1f2937]">{product.stock} un</p>
                            <p className="text-sm text-[#627271]">Em estoque</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-[#86cb92]/5 border border-[#86cb92]/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        {selectedProductData?.images[0] ? (
                          <img src={selectedProductData.images[0]} alt="" className="w-full h-full object-cover rounded" />
                        ) : null}
                      </div>
                      <div>
                        <p className="font-medium text-[#1f2937]">{selectedProductData?.name}</p>
                        <p className="text-sm text-[#627271]">SKU: {selectedProductData?.sku} • Estoque atual: {selectedProductData?.stock} un</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedProduct(null);
                        setQuantity(1);
                        setCost(0);
                      }}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Alterar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Entry Details */}
            {selectedProduct && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-[#1f2937] mb-4">Detalhes da Entrada</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#1f2937] mb-2">
                      Quantidade <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1f2937] mb-2">
                      Custo Unitário <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#627271]">R$</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={cost}
                        onChange={(e) => setCost(Number(e.target.value))}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1f2937] mb-2">
                      Total
                    </label>
                    <div className="px-3 py-2 bg-gray-50 rounded-lg text-lg font-bold text-[#1f2937]">
                      R$ {(quantity * cost).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-[#1f2937] mb-2">
                    Motivo <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
                  >
                    <option value="compra">Compra</option>
                    <option value="devolucao">Devolução</option>
                    <option value="transferencia">Transferência</option>
                    <option value="ajuste">Ajuste de Inventário</option>
                  </select>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-[#1f2937] mb-2">
                    Observações
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Informações adicionais..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-4">
              <Link
                href="/estoque"
                className="px-6 py-2 border border-gray-300 text-[#627271] rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </Link>
              <button
                disabled={!selectedProduct || quantity < 1}
                className="px-6 py-2 bg-[#86cb92] text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Salvar Entrada
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

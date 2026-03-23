'use client';

import { useState } from 'react';
import { useProducts } from '@/hooks/use-products';
import { Sidebar } from '@/components/sidebar';
import { ChevronLeft, Printer, Download, QrCode } from 'lucide-react';
import Link from 'next/link';
import { LABEL_TEMPLATES, LABEL_FORMATS } from '@/lib/estoque/constants';
import { LabelTemplate, LabelFormat } from '@/lib/estoque/types';
import { StockStatusBadge } from '@/components/estoque/shared/stock-status-badge';

export default function EtiquetasPage() {
  const { products, isLoading } = useProducts();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [template, setTemplate] = useState<LabelTemplate>('60x40');
  const [format, setFormat] = useState<LabelFormat>('EAN13');

  const toggleProduct = (id: string) => {
    setSelectedProducts(prev =>
      prev.includes(id)
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
  };

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
              <h1 className="text-xl font-semibold text-[#1f2937]">Gerador de Etiquetas</h1>
              <p className="text-sm text-[#627271]">Imprima etiquetas com códigos de barras</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-[#627271] rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Exportar PDF
            </button>
            <button
              disabled={selectedProducts.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-[#86cb92] text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Printer className="w-4 h-4" />
              Imprimir
            </button>
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Product Selection */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-5 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#1f2937]">Selecionar Produtos</h3>
                  <button
                    onClick={toggleAll}
                    className="text-sm text-[#3e5653] hover:underline"
                  >
                    {selectedProducts.length === products.length ? 'Desmarcar todos' : 'Selecionar todos'}
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
                {isLoading ? (
                  <div className="p-8 text-center text-[#627271]">
                    Carregando produtos...
                  </div>
                ) : products.length === 0 ? (
                  <div className="p-8 text-center text-[#627271]">
                    Nenhum produto cadastrado
                  </div>
                ) : (
                  products.slice(0, 50).map((product) => (
                    <label
                      key={product.id}
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => toggleProduct(product.id)}
                        className="w-5 h-5 rounded border-gray-300 text-[#86cb92] focus:ring-[#86cb92]"
                      />
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {product.images[0] ? (
                          <img src={product.images[0]} alt="" className="w-full h-full object-cover rounded" />
                        ) : (
                          <span className="text-xs text-gray-400">IMG</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[#1f2937] truncate">{product.name}</p>
                        <p className="text-sm text-[#627271]">SKU: {product.sku}</p>
                      </div>
                      <StockStatusBadge status={product.stockStatus} size="sm" />
                      <div className="text-right">
                        <p className="font-medium text-[#1f2937]">
                          R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </label>
                  ))
                )}
              </div>

              <div className="p-4 border-t border-gray-200 text-sm text-[#627271]">
                {selectedProducts.length} de {products.length} produtos selecionados
              </div>
            </div>

            {/* Configuration */}
            <div className="lg:col-span-1 space-y-6">
              {/* Template Selection */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <h3 className="font-semibold text-[#1f2937] mb-4">Modelo de Etiqueta</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(LABEL_TEMPLATES).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => setTemplate(key as LabelTemplate)}
                      className={`p-3 border-2 rounded-lg text-center transition-colors ${
                        template === key
                          ? 'border-[#86cb92] bg-[#86cb92]/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div
                        className="mx-auto mb-2 bg-gray-200 rounded"
                        style={{ width: value.width / 4, height: value.height / 4 }}
                      />
                      <p className="text-sm font-medium text-[#1f2937]">{value.name}</p>
                      <p className="text-xs text-[#627271]">{value.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Format Selection */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <h3 className="font-semibold text-[#1f2937] mb-4">Formato do Código</h3>
                <div className="space-y-2">
                  {Object.entries(LABEL_FORMATS).map(([key, value]) => (
                    <label
                      key={key}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="radio"
                        name="format"
                        checked={format === key}
                        onChange={() => setFormat(key as LabelFormat)}
                        className="w-4 h-4 text-[#86cb92] focus:ring-[#86cb92]"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-[#1f2937]">{value.name}</p>
                        <p className="text-xs text-[#627271]">{value.description}</p>
                      </div>
                      {key === 'QR' && <QrCode className="w-5 h-5 text-[#627271]" />}
                    </label>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <h3 className="font-semibold text-[#1f2937] mb-4">Prévia</h3>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="mx-auto" style={{ width: 150, height: 100 }}>
                    <div className="w-full h-full border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center p-2">
                      <div className="w-full h-6 bg-gray-200 rounded mb-1" />
                      <div className="w-full h-4 bg-gray-100 rounded mb-1" />
                      <div className="w-3/4 h-2 bg-gray-200 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// app/(dashboard)/marketplace/page.tsx - Marketplace listing page
'use client';

import * as React from "react";
import { Search } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { SellerCard } from "@/components/marketplace/seller-card";
import { SellerFilters } from "@/components/marketplace/seller-filters";
import { Pagination } from "@/components/marketplace/pagination";
import { EmptyState } from "@/components/marketplace/empty-state";
import { useSellers } from "@/hooks/marketplace";
import { MARKETPLACE_CATEGORIES, MARKETPLACE_LOCATIONS } from "@/types/marketplace";

export default function MarketplacePage() {
  const {
    sellers,
    total,
    totalPages,
    currentPage,
    isLoading,
    filters,
    updateFilters,
    resetFilters,
  } = useSellers();

  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      <Header pageTitle="Marketplace" />

      <main className="ml-0 lg:ml-64 pt-16 p-4 lg:p-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-uniq-text">Marketplace</h1>
          <p className="text-sm text-uniq-muted mt-1">
            Encontre os melhores lojistas e produtos da sua região
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-uniq-muted" />
            <input
              type="text"
              value={filters.search ?? ""}
              onChange={(e) => updateFilters({ search: e.target.value || undefined })}
              placeholder="Buscar lojistas, produtos..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-uniq-border bg-uniq-white text-uniq-text placeholder-uniq-muted focus:outline-none focus:ring-2 focus:ring-uniq-accent focus:border-uniq-accent transition-all"
            />
          </div>
        </div>

        {/* Filters */}
        <SellerFilters
          filters={filters}
          onFiltersChange={updateFilters}
          categories={MARKETPLACE_CATEGORIES}
          locations={MARKETPLACE_LOCATIONS}
          className="mb-6"
        />

        {/* Results Info */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-uniq-muted">
            {total} {total === 1 ? "lojista" : "lojistas"} encontrado{total !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-uniq-white rounded-xl border border-uniq-border p-6 animate-pulse"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 rounded-xl bg-uniq-border" />
                  <div className="w-20 h-6 rounded-full bg-uniq-border" />
                </div>
                <div className="h-6 bg-uniq-border rounded w-3/4 mb-2" />
                <div className="h-4 bg-uniq-border rounded w-1/2 mb-4" />
                <div className="h-4 bg-uniq-border rounded w-1/3 mb-4" />
                <div className="h-8 bg-uniq-border rounded" />
              </div>
            ))}
          </div>
        ) : sellers.length === 0 ? (
          <EmptyState
            title="Nenhum lojista encontrado"
            description="Tente ajustar seus filtros ou buscar por outro termo."
            icon="search"
            action={{ label: "Limpar Filtros", onClick: resetFilters }}
          />
        ) : (
          <>
            {/* Seller Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {sellers.map((seller: typeof sellers[0]) => (
                <SellerCard key={seller.id} seller={seller} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => updateFilters({ page })}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

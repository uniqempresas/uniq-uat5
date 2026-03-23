// app/(dashboard)/marketplace/lojista/[slug]/page.tsx - Seller profile page
'use client';

import * as React from "react";
import { useParams } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { SellerHeader } from "@/components/marketplace/seller-header";
import { ProductCard } from "@/components/marketplace/product-card";
import { ReviewItem } from "@/components/marketplace/review-item";
import { ReviewDistribution } from "@/components/marketplace/review-distribution";
import { Pagination } from "@/components/marketplace/pagination";
import { EmptyState } from "@/components/marketplace/empty-state";
import { StarRating } from "@/components/marketplace/star-rating";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useSeller, useSellerProducts, useSellerReviews } from "@/hooks/marketplace";
import { MARKETPLACE_CATEGORIES } from "@/types/marketplace";

type TabType = "products" | "reviews" | "about";

export default function SellerProfilePage() {
  const params = useParams();
  const slug = params.slug as string;

  const { seller, isLoading: isLoadingSeller } = useSeller(slug);
  const [activeTab, setActiveTab] = React.useState<TabType>("products");

  const {
    products,
    total: totalProducts,
    totalPages: totalProductsPages,
    currentPage: currentProductsPage,
    isLoading: isLoadingProducts,
    updateFilters,
  } = useSellerProducts(seller?.id ?? "", { limit: 8 });

  const { reviews, distribution } = useSellerReviews(seller?.id ?? "");

  const [isFollowing, setIsFollowing] = React.useState(false);

  const tabs: { id: TabType; label: string; count?: number }[] = [
    { id: "products", label: "Produtos", count: seller?.productCount },
    { id: "reviews", label: "Avaliações", count: seller?.reviewCount },
    { id: "about", label: "Sobre" },
  ];

  if (isLoadingSeller) {
    return (
      <div className="min-h-screen bg-uniq-platinum">
        <Sidebar />
        <Header pageTitle="Marketplace" />

        {/* Banner Skeleton */}
        <div className="h-56 bg-gradient-to-r from-uniq-primary to-uniq-muted animate-pulse" />

        <main className="ml-0 lg:ml-64 pt-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
            {/* Profile Skeleton */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="w-32 h-32 rounded-2xl bg-uniq-border animate-pulse" />
              <div className="flex-1">
                <div className="h-8 bg-uniq-border rounded w-64 mb-2 animate-pulse" />
                <div className="h-4 bg-uniq-border rounded w-32 animate-pulse" />
              </div>
            </div>

            {/* Tabs Skeleton */}
            <div className="flex gap-8 border-b border-uniq-border">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 w-24 bg-uniq-border rounded animate-pulse" />
              ))}
            </div>

            {/* Content Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-uniq-white rounded-xl border border-uniq-border overflow-hidden animate-pulse"
                >
                  <div className="aspect-square bg-uniq-border" />
                  <div className="p-4">
                    <div className="h-4 bg-uniq-border rounded w-3/4 mb-2" />
                    <div className="h-6 bg-uniq-border rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="min-h-screen bg-uniq-platinum">
        <Sidebar />
        <Header pageTitle="Marketplace" />
        <main className="ml-0 lg:ml-64 pt-16">
          <div className="flex items-center justify-center min-h-[60vh]">
            <EmptyState
              title="Lojista não encontrado"
              description="Este lojista pode ter removido sua loja ou o link está incorreto."
              icon="store"
              action={{
                label: "Voltar ao Marketplace",
                onClick: () => (window.location.href = "/marketplace"),
              }}
            />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      <Header pageTitle="Marketplace" />

      {/* Seller Header */}
      <SellerHeader
        seller={seller}
        isFollowing={isFollowing}
        onFollow={() => setIsFollowing(!isFollowing)}
        onMessage={() => alert("Funcionalidade de mensagens em desenvolvimento")}
      />

      {/* Tabs */}
      <div className="border-b border-uniq-border bg-uniq-white mt-0">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <nav className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 text-sm font-medium transition-colors flex items-center gap-2 border-b-2 ${
                  activeTab === tab.id
                    ? "text-uniq-primary border-uniq-primary"
                    : "text-uniq-muted border-transparent hover:text-uniq-text"
                }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className="text-xs bg-uniq-platinum px-2 py-0.5 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        {/* Products Tab */}
        {activeTab === "products" && (
          <div>
            {/* Product Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <select
                  value={""}
                  onChange={(e) => updateFilters({ category: e.target.value || undefined })}
                  className="px-4 py-2 rounded-lg border border-uniq-border bg-uniq-white text-sm text-uniq-text focus:outline-none focus:ring-2 focus:ring-uniq-accent"
                >
                  <option value="">Todas as categorias</option>
                  {MARKETPLACE_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <select
                  value={"newest"}
                  onChange={(e) => updateFilters({ sort: e.target.value as any })}
                  className="px-4 py-2 rounded-lg border border-uniq-border bg-uniq-white text-sm text-uniq-text focus:outline-none focus:ring-2 focus:ring-uniq-accent"
                >
                  <option value="newest">Mais recentes</option>
                  <option value="price_asc">Menor preço</option>
                  <option value="price_desc">Maior preço</option>
                  <option value="sales_desc">Mais vendidos</option>
                </select>
              </div>

              <span className="text-sm text-uniq-muted">
                {totalProducts} produtos encontrados
              </span>
            </div>

            {/* Product Grid */}
            {isLoadingProducts ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-uniq-white rounded-xl border border-uniq-border overflow-hidden animate-pulse"
                  >
                    <div className="aspect-square bg-uniq-border" />
                    <div className="p-4">
                      <div className="h-4 bg-uniq-border rounded w-3/4 mb-2" />
                      <div className="h-6 bg-uniq-border rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <EmptyState
                title="Nenhum produto encontrado"
                description="Este lojista ainda não possui produtos cadastrados."
                icon="package"
              />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {products.map((product: typeof products[0]) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {totalProductsPages > 1 && (
                  <Pagination
                    currentPage={currentProductsPage}
                    totalPages={totalProductsPages}
                    onPageChange={(page) => updateFilters({ page })}
                  />
                )}
              </>
            )}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div>
            {/* Distribution */}
            {distribution && (
              <div className="bg-uniq-white rounded-xl border border-uniq-border p-6 mb-6">
                <ReviewDistribution distribution={distribution} />
              </div>
            )}

            {/* Reviews List */}
            <div className="bg-uniq-white rounded-xl border border-uniq-border p-6">
              {reviews.length === 0 ? (
                <EmptyState
                  title="Nenhuma avaliação ainda"
                  description="Este lojista ainda não recebeu avaliações."
                  icon="reviews"
                />
              ) : (
                reviews.map((review: typeof reviews[0]) => (
                  <ReviewItem key={review.id} review={review} />
                ))
              )}
            </div>
          </div>
        )}

        {/* About Tab */}
        {activeTab === "about" && (
          <div className="bg-uniq-white rounded-xl border border-uniq-border p-6">
            <h3 className="text-lg font-semibold text-uniq-text mb-4">Sobre a Loja</h3>

            <div className="prose prose-sm text-uniq-muted mb-6">
              <p>{seller.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {seller.phone && (
                <div className="p-4 bg-uniq-platinum rounded-lg">
                  <div className="flex items-center gap-2 text-uniq-muted mb-1">
                    <Phone className="w-4 h-4" />
                    <p className="text-xs">Telefone</p>
                  </div>
                  <p className="text-sm font-medium text-uniq-text">{seller.phone}</p>
                </div>
              )}

              {seller.whatsapp && (
                <div className="p-4 bg-uniq-platinum rounded-lg">
                  <div className="flex items-center gap-2 text-uniq-muted mb-1">
                    <Phone className="w-4 h-4" />
                    <p className="text-xs">WhatsApp</p>
                  </div>
                  <p className="text-sm font-medium text-uniq-text">{seller.whatsapp}</p>
                </div>
              )}

              {seller.email && (
                <div className="p-4 bg-uniq-platinum rounded-lg">
                  <div className="flex items-center gap-2 text-uniq-muted mb-1">
                    <Mail className="w-4 h-4" />
                    <p className="text-xs">E-mail</p>
                  </div>
                  <p className="text-sm font-medium text-uniq-text">{seller.email}</p>
                </div>
              )}

              <div className="p-4 bg-uniq-platinum rounded-lg">
                <div className="flex items-center gap-2 text-uniq-muted mb-1">
                  <MapPin className="w-4 h-4" />
                  <p className="text-xs">Localização</p>
                </div>
                <p className="text-sm font-medium text-uniq-text">
                  {seller.location.city}, {seller.location.state}
                </p>
              </div>

              {seller.businessHours && (
                <div className="p-4 bg-uniq-platinum rounded-lg col-span-2">
                  <div className="flex items-center gap-2 text-uniq-muted mb-1">
                    <Clock className="w-4 h-4" />
                    <p className="text-xs">Horário de Funcionamento</p>
                  </div>
                  <p className="text-sm font-medium text-uniq-text">
                    {seller.businessHours}
                  </p>
                </div>
              )}

              {seller.cnpj && (
                <div className="p-4 bg-uniq-platinum rounded-lg">
                  <p className="text-xs text-uniq-muted mb-1">CNPJ</p>
                  <p className="text-sm font-medium text-uniq-text">{seller.cnpj}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

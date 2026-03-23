// app/(dashboard)/marketplace/minha-loja/page.tsx - My store dashboard
'use client';

import * as React from "react";
import { Plus, Search } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { SellerMetrics } from "@/components/marketplace/seller-metrics";
import { ProductTable } from "@/components/marketplace/product-table";
import { OrderCard } from "@/components/marketplace/order-card";

export const dynamic = 'force-dynamic';
import { ReviewItem } from "@/components/marketplace/review-item";
import { ReviewDistribution } from "@/components/marketplace/review-distribution";
import { Pagination } from "@/components/marketplace/pagination";
import { EmptyState } from "@/components/marketplace/empty-state";
import { StoreSetupWizard } from "@/components/marketplace/store-setup-wizard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  useMyStore,
  useSellerProducts,
  useSellerOrders,
  useSellerReviews,
  useProductCrud,
} from "@/hooks/marketplace";
import type { Product, ProductStatus, SellerCreateInput, Review } from "@/types/marketplace";

type TabValue = "products" | "orders" | "reviews" | "settings";

export default function MyStorePage() {
  const { seller, metrics, isLoading: isLoadingStore, isNoStore, updateStore } = useMyStore();
  const [activeTab, setActiveTab] = React.useState<TabValue>("products");

  // Product filters
  const [productSearch, setProductSearch] = React.useState("");
  const [productStatusFilter, setProductStatusFilter] = React.useState<string>("all");

  // Product CRUD
  const { create, update, delete: deleteProduct, duplicate } = useProductCrud();

  // Order filters
  const [orderSearch, setOrderSearch] = React.useState("");
  const [orderStatusFilter, setOrderStatusFilter] = React.useState<string>("all");

  // Products
  const {
    products,
    total: totalProducts,
    totalPages: totalProductsPages,
    currentPage: currentProductsPage,
    isLoading: isLoadingProducts,
    updateFilters: updateProductFilters,
  } = useSellerProducts(seller?.id ?? "", { limit: 10 });

  // Orders
  const {
    orders,
    total: totalOrders,
    totalPages: totalOrdersPages,
    currentPage: currentOrdersPage,
    isLoading: isLoadingOrders,
    updateFilters: updateOrderFilters,
  } = useSellerOrders(seller?.id ?? "", { limit: 10 });

  // Reviews
  const { reviews, distribution, reply, isReplying } = useSellerReviews(seller?.id ?? "");

  // Modal state
  const [isProductModalOpen, setIsProductModalOpen] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);

  // Handle new store setup
  const handleStoreSetup = (data: SellerCreateInput & { logo?: File; banner?: File }) => {
    console.log("Creating store with data:", data);
    // In real app, would create store via API
  };

  // Handle store setup skip
  const handleSkipSetup = () => {
    console.log("Skipping store setup");
    // In real app, would show message
  };

  // Filter products
  const filteredProducts = React.useMemo(() => {
    return products.filter((p: typeof products[0]) => {
      if (productSearch && !p.name.toLowerCase().includes(productSearch.toLowerCase())) {
        return false;
      }
      if (productStatusFilter !== "all" && p.status !== productStatusFilter) {
        return false;
      }
      return true;
    });
  }, [products, productSearch, productStatusFilter]);

  // Filter orders
  const filteredOrders = React.useMemo(() => {
    return orders.filter((o: typeof orders[0]) => {
      if (orderSearch && !o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) && !o.customer.name.toLowerCase().includes(orderSearch.toLowerCase())) {
        return false;
      }
      if (orderStatusFilter !== "all" && o.status !== orderStatusFilter) {
        return false;
      }
      return true;
    });
  }, [orders, orderSearch, orderStatusFilter]);

  // Product handlers
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    if (confirm(`Deseja excluir o produto "${product.name}"?`)) {
      deleteProduct(product.id);
    }
  };

  const handleStatusChange = (product: Product, status: ProductStatus) => {
    update({ id: product.id, data: { status } });
  };

  // Review handlers
  const handleReplyReview = (review: typeof reviews[0]) => {
    // In real app, would open a dialog
    const response = prompt("Digite sua resposta:");
    if (response) {
      reply({ reviewId: review.id, content: response });
    }
  };

  // Show store setup wizard for new sellers
  if (isNoStore) {
    return (
      <div className="min-h-screen bg-uniq-platinum">
        <Sidebar />
        <Header pageTitle="Minha Loja" />
        <main className="ml-0 lg:ml-64 pt-16 p-4 lg:p-6">
          <StoreSetupWizard onComplete={handleStoreSetup} onSkip={handleSkipSetup} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      <Header pageTitle="Minha Loja" />

      <main className="ml-0 lg:ml-64 pt-16 p-4 lg:p-6">
        {/* Metrics */}
        <SellerMetrics metrics={metrics} isLoading={isLoadingStore} className="mb-6" />

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabValue)}>
          <div className="bg-uniq-white rounded-t-xl border border-b-0 border-uniq-border">
            <TabsList className="w-full justify-start rounded-none border-b border-uniq-border bg-transparent h-auto p-0">
              <TabsTrigger
                value="products"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-uniq-primary data-[state=active]:bg-transparent data-[state=active]:text-uniq-primary px-6 py-4"
              >
                Produtos
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-uniq-primary data-[state=active]:bg-transparent data-[state=active]:text-uniq-primary px-6 py-4"
              >
                Pedidos
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-uniq-primary data-[state=active]:bg-transparent data-[state=active]:text-uniq-primary px-6 py-4"
              >
                Avaliações
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-uniq-primary data-[state=active]:bg-transparent data-[state=active]:text-uniq-primary px-6 py-4"
              >
                Configurações
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Products Tab */}
          <TabsContent value="products" className="m-0">
            <div className="bg-uniq-white rounded-b-xl border border-t-0 border-uniq-border">
              {/* Toolbar */}
              <div className="p-4 border-b border-uniq-border">
                <div className="flex flex-wrap items-center gap-4">
                  {/* Search */}
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-uniq-muted" />
                    <Input
                      type="text"
                      placeholder="Buscar produtos..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full pl-10"
                    />
                  </div>

                  {/* Status Filter */}
                  <Select
                    value={productStatusFilter}
                    onValueChange={setProductStatusFilter}
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os status</SelectItem>
                      <SelectItem value="active">Ativos</SelectItem>
                      <SelectItem value="paused">Pausados</SelectItem>
                      <SelectItem value="out_of_stock">Sem estoque</SelectItem>
                      <SelectItem value="draft">Rascunhos</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* New Product Button */}
                  <Button
                    onClick={() => {
                      setEditingProduct(null);
                      setIsProductModalOpen(true);
                    }}
                    className="bg-uniq-primary hover:bg-uniq-hover"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Produto
                  </Button>
                </div>
              </div>

              {/* Table */}
              <div className="p-4">
                <ProductTable
                  products={filteredProducts}
                  isLoading={isLoadingProducts}
                  onEdit={handleEditProduct}
                  onDuplicate={(p) => duplicate(p.id)}
                  onDelete={handleDeleteProduct}
                  onStatusChange={handleStatusChange}
                />

                {/* Pagination */}
                {totalProductsPages > 1 && (
                  <div className="mt-4">
                    <Pagination
                      currentPage={currentProductsPage}
                      totalPages={totalProductsPages}
                      onPageChange={(page) => updateProductFilters({ page })}
                    />
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="m-0">
            <div className="bg-uniq-white rounded-b-xl border border-t-0 border-uniq-border">
              {/* Toolbar */}
              <div className="p-4 border-b border-uniq-border">
                <div className="flex flex-wrap items-center gap-4">
                  {/* Search */}
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-uniq-muted" />
                    <Input
                      type="text"
                      placeholder="Buscar pedidos..."
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      className="w-full pl-10"
                    />
                  </div>

                  {/* Status Filter */}
                  <Select
                    value={orderStatusFilter}
                    onValueChange={setOrderStatusFilter}
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os status</SelectItem>
                      <SelectItem value="pending">Pendentes</SelectItem>
                      <SelectItem value="paid">Pagos</SelectItem>
                      <SelectItem value="shipped">Enviados</SelectItem>
                      <SelectItem value="delivered">Entregues</SelectItem>
                      <SelectItem value="cancelled">Cancelados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Orders List */}
              <div className="p-4 space-y-4">
                {isLoadingOrders ? (
                  [...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-uniq-white rounded-xl border border-uniq-border p-6 animate-pulse"
                    >
                      <div className="flex justify-between">
                        <div>
                          <div className="h-6 bg-uniq-border rounded w-32 mb-2" />
                          <div className="h-4 bg-uniq-border rounded w-48" />
                        </div>
                        <div className="h-8 bg-uniq-border rounded w-24" />
                      </div>
                    </div>
                  ))
                ) : filteredOrders.length === 0 ? (
                  <EmptyState
                    title="Nenhum pedido encontrado"
                    description="Você ainda não recebeu nenhum pedido."
                    icon="orders"
                  />
                ) : (
                  <>
                    {filteredOrders.map((order: typeof filteredOrders[0]) => (
                      <OrderCard key={order.id} order={order} />
                    ))}

                    {totalOrdersPages > 1 && (
                      <div className="mt-4">
                        <Pagination
                          currentPage={currentOrdersPage}
                          totalPages={totalOrdersPages}
                          onPageChange={(page) => updateOrderFilters({ page })}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="m-0">
            <div className="bg-uniq-white rounded-b-xl border border-t-0 border-uniq-border p-6">
              {/* Distribution */}
              {distribution && (
                <div className="mb-6">
                  <ReviewDistribution
                    distribution={distribution}
                    orientation="vertical"
                  />
                </div>
              )}

              {/* Reviews List */}
              {reviews.length === 0 ? (
                <EmptyState
                  title="Nenhuma avaliação ainda"
                  description="Você ainda não recebeu avaliações."
                  icon="reviews"
                />
              ) : (
                <div className="space-y-6">
                  {reviews.map((review: Review) => (
                    <ReviewItem
                      key={review.id}
                      review={review}
                      canReply
                      onReply={handleReplyReview}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="m-0">
            <div className="bg-uniq-white rounded-b-xl border border-t-0 border-uniq-border p-6">
              {/* Store Info Form */}
              <div className="space-y-6">
                <div className="border-b border-uniq-border pb-6">
                  <h3 className="text-lg font-semibold text-uniq-text mb-4">
                    Informações da Loja
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-uniq-text mb-2">
                        Nome da Loja
                      </label>
                      <Input
                        defaultValue={seller?.name}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-uniq-text mb-2">
                        CNPJ
                      </label>
                      <Input
                        defaultValue={seller?.cnpj}
                        disabled
                        className="w-full bg-uniq-platinum"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-uniq-text mb-2">
                        Descrição
                      </label>
                      <textarea
                        defaultValue={seller?.description}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-uniq-border bg-white text-uniq-text focus:outline-none focus:ring-2 focus:ring-uniq-accent focus:border-uniq-accent"
                      />
                    </div>
                  </div>

                  <Button
                    className="mt-6 bg-uniq-primary hover:bg-uniq-hover"
                    onClick={() => {
                      // Would save changes
                      alert("Alterações salvas com sucesso!");
                    }}
                  >
                    Salvar Alterações
                  </Button>
                </div>

                {/* Logo and Banner */}
                <div>
                  <h3 className="text-lg font-semibold text-uniq-text mb-4">
                    Logo e Banner
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Logo */}
                    <div>
                      <p className="text-sm font-medium text-uniq-text mb-2">Logo</p>
                      <div className="border-2 border-dashed border-uniq-border rounded-xl p-8 text-center hover:border-uniq-accent transition-colors cursor-pointer">
                        <div className="w-24 h-24 mx-auto mb-4 rounded-lg bg-uniq-platinum flex items-center justify-center overflow-hidden">
                          {seller?.logo ? (
                            <img
                              src={seller.logo}
                              alt="Logo"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-uniq-muted text-sm">Upload</span>
                          )}
                        </div>
                        <p className="text-sm text-uniq-muted">
                          Arraste ou clique para fazer upload
                        </p>
                        <p className="text-xs text-uniq-muted mt-1">
                          PNG, JPG ou SVG (máx. 2MB)
                        </p>
                      </div>
                    </div>

                    {/* Banner */}
                    <div>
                      <p className="text-sm font-medium text-uniq-text mb-2">Banner</p>
                      <div className="border-2 border-dashed border-uniq-border rounded-xl p-8 text-center hover:border-uniq-accent transition-colors cursor-pointer">
                        <div className="w-full h-24 mx-auto mb-4 rounded-lg bg-uniq-platinum flex items-center justify-center overflow-hidden">
                          {seller?.banner ? (
                            <img
                              src={seller.banner}
                              alt="Banner"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-uniq-muted text-sm">Upload</span>
                          )}
                        </div>
                        <p className="text-sm text-uniq-muted">
                          Arraste ou clique para fazer upload
                        </p>
                        <p className="text-xs text-uniq-muted mt-1">
                          PNG ou JPG (máx. 5MB)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Product Modal (placeholder) */}
      <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Editar Produto" : "Novo Produto"}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-uniq-muted text-center">
              Formulário de produto em desenvolvimento...
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsProductModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-uniq-primary hover:bg-uniq-hover"
              onClick={() => setIsProductModalOpen(false)}
            >
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

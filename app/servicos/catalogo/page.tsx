"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { CatalogCard } from "../components/catalog-card";
import { ServiceDetailModal } from "../components/service-detail-modal";
import { useServices } from "@/app/hooks/use-services";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import type { Service } from "@/app/types/service";

export default function CatalogPage() {
  const { filteredServices, filters, setFilters, categories, loading } = useServices();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const activeServices = filteredServices.filter((s) => s.active);

  const handleSchedule = (serviceId: number) => {
    // TODO: Implementar agendamento
    console.log('Agendar serviço:', serviceId);
  };

  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      
      <Header
        pageTitle="Catálogo de Serviços"
        breadcrumbs={[
          { label: "Início", href: "/dashboard" },
          { label: "Serviços", href: "/servicos" },
          { label: "Catálogo" },
        ]}
      />

      <main className="ml-0 lg:ml-64 pt-16 p-6 min-h-[calc(100vh-64px)]">
        {/* Info Banner */}
        <div className="mb-6 p-4 bg-uniq-accent/10 border border-uniq-accent/20 rounded-lg flex items-start gap-3">
          <Info className="w-5 h-5 text-uniq-accent flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-uniq-text">Preview da Loja Virtual</h4>
            <p className="text-sm text-uniq-muted">
              Esta é uma prévia de como seus serviços aparecem para os clientes na loja virtual.
              Apenas serviços ativos são exibidos.
            </p>
          </div>
        </div>

        {/* Filtros por Categoria */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilters({ ...filters, category: null })}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !filters.category
                ? 'bg-uniq-primary text-white'
                : 'bg-uniq-white text-uniq-text hover:bg-uniq-platinum'
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilters({ ...filters, category: cat.name })}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filters.category === cat.name
                  ? 'text-white'
                  : 'bg-uniq-white text-uniq-text hover:bg-uniq-platinum'
              }`}
              style={{
                backgroundColor: filters.category === cat.name ? cat.color : undefined,
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid do Catálogo */}
        {activeServices.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-uniq-muted">
              Nenhum serviço ativo no momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeServices.map((service) => (
              <CatalogCard
                key={service.id}
                service={service}
                onViewDetails={setSelectedService}
                onSchedule={handleSchedule}
              />
            ))}
          </div>
        )}

        {/* Modal de Detalhes */}
        <ServiceDetailModal
          service={selectedService}
          open={!!selectedService}
          onClose={() => setSelectedService(null)}
          onSchedule={handleSchedule}
        />
      </main>
    </div>
  );
}

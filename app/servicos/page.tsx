"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { ServiceGrid } from "./components/service-grid";
import { SearchBar } from "./components/search-bar";
import { Filters } from "./components/filters";
import { useServices } from "@/app/hooks/use-services";

export default function ServicesPage() {
  const router = useRouter();
  const {
    filteredServices,
    loading,
    filters,
    setFilters,
    toggleServiceActive,
    categories,
  } = useServices();

  const handleEdit = (id: number) => {
    router.push(`/servicos/${id}`);
  };

  const handleAddNew = () => {
    router.push('/servicos/novo');
  };

  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      
      <Header
        pageTitle="Serviços"
        breadcrumbs={[
          { label: "Início", href: "/dashboard" },
          { label: "Serviços" },
        ]}
      />

      <main className="ml-0 lg:ml-64 pt-16 p-6 min-h-[calc(100vh-64px)]">
        {/* Barra de Ações */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <SearchBar
              value={filters.search}
              onChange={(value) => setFilters({ ...filters, search: value })}
              placeholder="Buscar serviço..."
              loading={loading}
            />
            <div className="hidden sm:block">
              <Filters
                filters={filters}
                onChange={setFilters}
                categories={categories}
              />
            </div>
          </div>
          <Button 
            onClick={handleAddNew}
            className="gap-2 bg-uniq-primary hover:bg-uniq-hover"
          >
            <Plus className="w-4 h-4" />
            Novo Serviço
          </Button>
        </div>

        {/* Filtros Mobile */}
        <div className="sm:hidden mb-6">
          <Filters
            filters={filters}
            onChange={setFilters}
            categories={categories}
          />
        </div>

        {/* Grid de Serviços */}
        <ServiceGrid
          services={filteredServices}
          loading={loading}
          onEdit={handleEdit}
          onToggleActive={toggleServiceActive}
          onAddNew={handleAddNew}
        />
      </main>
    </div>
  );
}

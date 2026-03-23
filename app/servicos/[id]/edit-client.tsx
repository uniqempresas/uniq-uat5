'use client';

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { ServiceForm } from "../components/service-form";
import { ServiceSkeleton } from "../components/service-skeleton";
import { useServices } from "@/app/hooks/use-services";
import { getServiceById } from "@/lib/mocks/services";
import { toast } from "@/hooks/use-toast";
import type { Service, ServiceFormData } from "@/app/types/service";

export function EditServicePageClient() {
  const router = useRouter();
  const params = useParams();
  const { updateService, loading: saving } = useServices();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  const serviceId = parseInt(params.id as string);

  useEffect(() => {
    // Simula busca do serviço
    const found = getServiceById(serviceId);
    if (found) {
      setService(found);
    } else {
      toast({
        title: "Erro",
        description: "Serviço não encontrado",
        variant: "error",
      });
      router.push('/servicos');
    }
    setLoading(false);
  }, [serviceId, router]);

  const handleSubmit = async (data: ServiceFormData) => {
    try {
      await updateService(serviceId, data);
      toast({
        title: "Sucesso!",
        description: "Serviço atualizado com sucesso!",
      });
      router.push('/servicos');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar serviço. Tente novamente.",
        variant: "error",
      });
    }
  };

  const handleCancel = () => {
    router.push('/servicos');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-uniq-platinum">
        <Sidebar />
        <Header 
          pageTitle="Editar Serviço"
          breadcrumbs={[
            { label: "Início", href: "/dashboard" },
            { label: "Serviços", href: "/servicos" },
            { label: "Carregando..." },
          ]}
        />
        <main className="ml-0 lg:ml-64 pt-16 p-6">
          <div className="max-w-3xl mx-auto">
            <ServiceSkeleton />
          </div>
        </main>
      </div>
    );
  }

  if (!service) return null;

  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      
      <Header
        pageTitle="Editar Serviço"
        breadcrumbs={[
          { label: "Início", href: "/dashboard" },
          { label: "Serviços", href: "/servicos" },
          { label: service.name },
        ]}
      />

      <main className="ml-0 lg:ml-64 pt-16 p-6 min-h-[calc(100vh-64px)]">
        <div className="max-w-3xl mx-auto">
          <ServiceForm
            initialData={service}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={saving}
          />
        </div>
      </main>
    </div>
  );
}

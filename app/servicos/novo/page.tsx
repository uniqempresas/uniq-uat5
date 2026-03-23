"use client";

import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { ServiceForm } from "../components/service-form";
import { useServices } from "@/app/hooks/use-services";
import { toast } from "@/hooks/use-toast";
import type { ServiceFormData } from "@/app/types/service";

export default function NewServicePage() {
  const router = useRouter();
  const { createService, loading } = useServices();

  const handleSubmit = async (data: ServiceFormData) => {
    try {
      await createService(data);
      toast({
        title: "Sucesso!",
        description: "Serviço criado com sucesso!",
      });
      router.push('/servicos');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao criar serviço. Tente novamente.",
        variant: "error",
      });
    }
  };

  const handleCancel = () => {
    router.push('/servicos');
  };

  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      
      <Header
        pageTitle="Novo Serviço"
        breadcrumbs={[
          { label: "Início", href: "/dashboard" },
          { label: "Serviços", href: "/servicos" },
          { label: "Novo" },
        ]}
      />

      <main className="ml-0 lg:ml-64 pt-16 p-6 min-h-[calc(100vh-64px)]">
        <div className="max-w-3xl mx-auto">
          <ServiceForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
}

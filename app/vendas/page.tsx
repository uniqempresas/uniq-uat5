import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function VendasPage() {
  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      <Header
        pageTitle="Vendas"
        breadcrumbs={[
          { label: "Início", href: "/dashboard" },
          { label: "Vendas" },
        ]}
      />
      
      <main className="ml-0 lg:ml-64 pt-16 p-4 lg:p-6 min-h-[calc(100vh-64px)]">
        <Card className="border-uniq-border">
          <CardContent className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 rounded-full bg-uniq-accent/20 flex items-center justify-center mb-4">
              <Construction className="w-10 h-10 text-uniq-accent" />
            </div>
            <h2 className="text-xl font-semibold text-uniq-text mb-2">
              Módulo em Desenvolvimento
            </h2>
            <p className="text-uniq-muted text-center max-w-md">
              O módulo Vendas está sendo construído e estará disponível em breve.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { CompanyForm } from "@/components/empresa/company-form";
import { LogoUpload } from "@/components/empresa/logo-upload";
import { ColorPicker } from "@/components/empresa/color-picker";
import { StorePreview } from "@/components/empresa/store-preview";

export default function EmpresaPage() {
  return (
    <div className="min-h-screen bg-uniq-platinum">
      {/* Sidebar */}
      <Sidebar />

      {/* Header */}
      <Header
        pageTitle="Minha Empresa"
        breadcrumbs={[
          { label: "Início", href: "/dashboard" },
          { label: "Minha Empresa" },
        ]}
      />

      {/* Main Content */}
      <main className="ml-0 lg:ml-64 pt-16 p-4 lg:p-6 min-h-[calc(100vh-64px)]">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column (2/3) */}
          <div className="xl:col-span-2 space-y-6">
            <CompanyForm />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LogoUpload />
              <ColorPicker />
            </div>
          </div>

          {/* Right Column (1/3) */}
          <div className="space-y-6">
            <StorePreview />
          </div>
        </div>
      </main>
    </div>
  );
}

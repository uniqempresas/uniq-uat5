// components/marketplace/store-setup-wizard.tsx
'use client';

import * as React from "react";
import { Store, Upload, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { SellerCreateInput } from "@/types/marketplace";

interface StoreSetupWizardProps {
  onComplete: (data: SellerCreateInput & { logo?: File; banner?: File }) => void;
  onSkip?: () => void;
}

interface WizardStep {
  id: number;
  title: string;
  description: string;
}

const STEPS: WizardStep[] = [
  { id: 1, title: "Informações Básicas", description: "Nome e descrição da sua loja" },
  { id: 2, title: "Logo e Banner", description: "Personalize sua marca" },
  { id: 3, title: "Contato", description: "Telefone e horários" },
];

export function StoreSetupWizard({ onComplete, onSkip }: StoreSetupWizardProps) {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [formData, setFormData] = React.useState<SellerCreateInput>({
    name: "",
    description: "",
    phone: "",
    whatsapp: "",
    businessHours: "",
  });
  const [logo, setLogo] = React.useState<File | null>(null);
  const [banner, setBanner] = React.useState<File | null>(null);
  const [logoPreview, setLogoPreview] = React.useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = React.useState<string | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBanner(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete({ ...formData, logo: logo || undefined, banner: banner || undefined });
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return formData.name.trim().length > 0 && formData.description.trim().length > 0;
    }
    return true;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-uniq-white rounded-xl border border-uniq-border p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-uniq-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Store className="w-8 h-8 text-uniq-accent" />
          </div>
          <h2 className="text-2xl font-bold text-uniq-text mb-2">
            Configure sua loja
          </h2>
          <p className="text-uniq-muted">
            Vamos criar o perfil da sua loja no marketplace
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {STEPS.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all",
                    currentStep > step.id
                      ? "bg-uniq-accent text-uniq-text"
                      : currentStep === step.id
                      ? "bg-uniq-primary text-white"
                      : "bg-uniq-border text-uniq-muted"
                  )}
                >
                  {currentStep > step.id ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs mt-2",
                    currentStep >= step.id ? "text-uniq-text" : "text-uniq-muted"
                  )}
                >
                  {step.title}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    "w-16 h-0.5 mx-2",
                    currentStep > step.id ? "bg-uniq-accent" : "bg-uniq-border"
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-uniq-text">
                {STEPS[0].title}
              </h3>
              <p className="text-sm text-uniq-muted mb-4">
                {STEPS[0].description}
              </p>

              <div>
                <label className="block text-sm font-medium text-uniq-text mb-2">
                  Nome da Loja *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Ex: Tech Solutions Ltda"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-uniq-text mb-2">
                  Descrição *
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Descreva sua loja..."
                  rows={4}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-uniq-text">
                {STEPS[1].title}
              </h3>
              <p className="text-sm text-uniq-muted mb-4">
                {STEPS[1].description}
              </p>

              <div>
                <label className="block text-sm font-medium text-uniq-text mb-2">
                  Logo da Loja
                </label>
                <div className="border-2 border-dashed border-uniq-border rounded-xl p-8 text-center hover:border-uniq-accent transition-colors cursor-pointer relative">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="w-24 h-24 object-cover mx-auto rounded-lg"
                    />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-uniq-muted mx-auto mb-2" />
                      <p className="text-sm text-uniq-muted">
                        Arraste ou clique para fazer upload
                      </p>
                      <p className="text-xs text-uniq-muted mt-1">
                        PNG, JPG ou SVG (máx. 2MB)
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-uniq-text mb-2">
                  Banner da Loja
                </label>
                <div className="border-2 border-dashed border-uniq-border rounded-xl p-8 text-center hover:border-uniq-accent transition-colors cursor-pointer relative">
                  {bannerPreview ? (
                    <img
                      src={bannerPreview}
                      alt="Banner preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-uniq-muted mx-auto mb-2" />
                      <p className="text-sm text-uniq-muted">
                        Arraste ou clique para fazer upload
                      </p>
                      <p className="text-xs text-uniq-muted mt-1">
                        PNG ou JPG (máx. 5MB)
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-uniq-text">
                {STEPS[2].title}
              </h3>
              <p className="text-sm text-uniq-muted mb-4">
                {STEPS[2].description}
              </p>

              <div>
                <label className="block text-sm font-medium text-uniq-text mb-2">
                  Telefone
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="(11) 99999-9999"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-uniq-text mb-2">
                  WhatsApp
                </label>
                <Input
                  value={formData.whatsapp}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp: e.target.value })
                  }
                  placeholder="(11) 99999-9999"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-uniq-text mb-2">
                  Horário de Funcionamento
                </label>
                <Input
                  value={formData.businessHours}
                  onChange={(e) =>
                    setFormData({ ...formData, businessHours: e.target.value })
                  }
                  placeholder="Ex: Seg-Sex: 9h às 18h"
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={currentStep === 1 ? onSkip : handleBack}
            className="px-6"
          >
            {currentStep === 1 ? "Pular" : "Voltar"}
          </Button>

          {currentStep < 3 ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="px-6 bg-uniq-primary hover:bg-uniq-hover"
            >
              Próximo
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={!canProceed()}
              className="px-6 bg-uniq-accent hover:bg-uniq-accent/90 text-uniq-text"
            >
              Criar Loja
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

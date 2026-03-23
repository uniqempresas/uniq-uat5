"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { registerSchema, type RegisterFormData } from "@/lib/validations";
import { mockRegister } from "@/lib/auth-mock";
import { StepIndicator } from "./step-indicator";
import { StepPersonal } from "./step-personal";
import { StepCompany } from "./step-company";
import { StepPlan } from "./step-plan";

interface RegisterWizardProps {
  onComplete?: () => void;
}

const steps = [
  { id: 1, title: "Dados Pessoais", description: "Suas informações" },
  { id: 2, title: "Empresa", description: "Dados da empresa" },
  { id: 3, title: "Plano", description: "Escolha seu plano" },
];

export function RegisterWizard({ onComplete }: RegisterWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      cnpj: "",
      segment: "",
      logo: "",
      planId: "",
    },
    mode: "onChange",
  });

  const validateStep = async (step: number): Promise<boolean> => {
    let fieldsToValidate: string[] = [];

    switch (step) {
      case 1:
        fieldsToValidate = ["fullName", "email", "phone", "password", "confirmPassword"];
        break;
      case 2:
        fieldsToValidate = ["companyName", "cnpj", "segment"];
        break;
      case 3:
        fieldsToValidate = ["planId"];
        break;
    }

    const result = await form.trigger(fieldsToValidate as any);
    return result;
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await mockRegister({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        companyName: data.companyName,
        cnpj: data.cnpj,
        segment: data.segment,
        logo: data.logo,
        planId: data.planId,
      });

      toast({
        title: "Conta criada com sucesso!",
        description: "Verifique seu email para confirmar o cadastro.",
        variant: "default",
      });

      onComplete?.();
      router.push("/verificar");
    } catch (error) {
      toast({
        title: "Erro ao criar conta",
        description: "Tente novamente mais tarde.",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepPersonal form={form} />;
      case 2:
        return <StepCompany form={form} />;
      case 3:
        return <StepPlan form={form} />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="space-y-1 pb-4">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-uniq-primary rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">U</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center text-uniq-text">
          Criar sua conta
        </CardTitle>
        <CardDescription className="text-center text-uniq-muted">
          Preencha os dados para começar
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <StepIndicator steps={steps} currentStep={currentStep} />

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {renderStep()}

          <div className="flex gap-3 pt-4">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={isLoading}
                className="flex-1 h-11"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            )}

            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="flex-1 h-11 bg-uniq-primary hover:bg-uniq-hover text-white"
              >
                Próximo
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 h-11 bg-uniq-accent hover:bg-uniq-accent/90 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  "Criar conta"
                )}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

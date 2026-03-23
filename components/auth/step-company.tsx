"use client";

import { UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { RegisterFormData } from "@/lib/validations";
import { COMPANY_SEGMENTS } from "@/lib/auth-mock";
import { LogoUpload } from "./logo-upload";

interface StepCompanyProps {
  form: UseFormReturn<RegisterFormData>;
}

// Format CNPJ
const formatCNPJ = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  return numbers.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3/$4-$5"
  );
};

export function StepCompany({ form }: StepCompanyProps) {
  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value);
    form.setValue("cnpj", formatted);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="companyName" className="text-sm font-medium text-uniq-text flex items-center">
          Nome da Empresa
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="companyName"
          placeholder="Empresa LTDA"
          {...form.register("companyName")}
          className="h-11 bg-[#f9fafb] border-uniq-border rounded-lg focus:border-uniq-accent focus:ring-2 focus:ring-uniq-accent"
        />
        {form.formState.errors.companyName && (
          <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
            {form.formState.errors.companyName.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="cnpj" className="text-sm font-medium text-uniq-text flex items-center">
          CNPJ
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="cnpj"
          placeholder="12.345.678/0001-90"
          maxLength={18}
          {...form.register("cnpj")}
          onChange={handleCNPJChange}
          className="h-11 bg-[#f9fafb] border-uniq-border rounded-lg focus:border-uniq-accent focus:ring-2 focus:ring-uniq-accent"
        />
        {form.formState.errors.cnpj && (
          <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
            {form.formState.errors.cnpj.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="segment" className="text-sm font-medium text-uniq-text flex items-center">
          Segmento
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Select
          value={form.watch("segment")}
          onValueChange={(value) => form.setValue("segment", value)}
        >
          <SelectTrigger className="h-11 bg-[#f9fafb] border-uniq-border rounded-lg focus:border-uniq-accent focus:ring-2 focus:ring-uniq-accent">
            <SelectValue placeholder="Selecione um segmento" />
          </SelectTrigger>
          <SelectContent>
            {COMPANY_SEGMENTS.filter(s => s.value !== "").map((segment) => (
              <SelectItem key={segment.value} value={segment.value}>
                {segment.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.segment && (
          <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
            {form.formState.errors.segment.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-uniq-text">
          Logo da Empresa
        </Label>
        <LogoUpload
          value={form.watch("logo")}
          onChange={(value) => form.setValue("logo", value)}
        />
      </div>
    </div>
  );
}

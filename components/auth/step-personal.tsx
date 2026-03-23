"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { RegisterFormData } from "@/lib/validations";

interface StepPersonalProps {
  form: UseFormReturn<RegisterFormData>;
}

// Format phone number
const formatPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 10) {
    return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }
  return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};

export function StepPersonal({ form }: StepPersonalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    form.setValue("phone", formatted);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-sm font-medium text-uniq-text flex items-center">
          Nome Completo
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="fullName"
          placeholder="João Silva"
          {...form.register("fullName")}
          className="h-11 bg-[#f9fafb] border-uniq-border rounded-lg focus:border-uniq-accent focus:ring-2 focus:ring-uniq-accent"
        />
        {form.formState.errors.fullName && (
          <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
            {form.formState.errors.fullName.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-uniq-text flex items-center">
          Email
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="joao@empresa.com"
          {...form.register("email")}
          className="h-11 bg-[#f9fafb] border-uniq-border rounded-lg focus:border-uniq-accent focus:ring-2 focus:ring-uniq-accent"
        />
        {form.formState.errors.email && (
          <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium text-uniq-text flex items-center">
          Telefone
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="phone"
          placeholder="(11) 98765-4321"
          {...form.register("phone")}
          onChange={handlePhoneChange}
          className="h-11 bg-[#f9fafb] border-uniq-border rounded-lg focus:border-uniq-accent focus:ring-2 focus:ring-uniq-accent"
        />
        {form.formState.errors.phone && (
          <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
            {form.formState.errors.phone.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-uniq-text flex items-center">
          Senha
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••"
            {...form.register("password")}
            className="h-11 bg-[#f9fafb] border-uniq-border rounded-lg focus:border-uniq-accent focus:ring-2 focus:ring-uniq-accent pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-uniq-muted hover:text-uniq-text"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {form.formState.errors.password && (
          <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium text-uniq-text flex items-center">
          Confirmar Senha
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••"
            {...form.register("confirmPassword")}
            className="h-11 bg-[#f9fafb] border-uniq-border rounded-lg focus:border-uniq-accent focus:ring-2 focus:ring-uniq-accent pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-uniq-muted hover:text-uniq-text"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {form.formState.errors.confirmPassword && (
          <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
            {form.formState.errors.confirmPassword.message}
          </p>
        )}
      </div>
    </div>
  );
}

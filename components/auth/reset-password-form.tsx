"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { resetPasswordSchema, type ResetPasswordFormData } from "@/lib/validations";
import { mockResetPassword } from "@/lib/auth-mock";
import { PasswordStrength } from "./password-strength";

interface ResetPasswordFormProps {
  token?: string;
  onSuccess?: () => void;
}

export function ResetPasswordForm({ token: propToken, onSuccess }: ResetPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = propToken || searchParams.get("token") || "";
  const { toast } = useToast();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const watchPassword = form.watch("password");

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      await mockResetPassword(token, data.password);
      setIsSuccess(true);
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Erro ao redefinir senha",
        description: "Tente novamente mais tarde.",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="w-full shadow-lg">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-uniq-accent/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-uniq-accent" />
            </div>
            <h3 className="text-xl font-bold text-uniq-text mb-2">
              Senha alterada!
            </h3>
            <p className="text-uniq-muted mb-6">
              Sua senha foi redefinida com sucesso.
            </p>
            <Button
              onClick={() => router.push("/login")}
              className="bg-uniq-primary hover:bg-uniq-hover text-white"
            >
              Ir para o login
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="space-y-1 pb-6">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-uniq-primary rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">U</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center text-uniq-text">
          Nova senha
        </CardTitle>
        <CardDescription className="text-center text-uniq-muted">
          Digite sua nova senha
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-uniq-text">
              Nova senha
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••"
                disabled={isLoading}
                {...form.register("password")}
                className="h-11 bg-[#f9fafb] border-uniq-border focus:border-uniq-accent focus:ring-uniq-accent pr-10"
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
            <PasswordStrength password={watchPassword} />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-uniq-text">
              Confirmar nova senha
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••"
                disabled={isLoading}
                {...form.register("confirmPassword")}
                className="h-11 bg-[#f9fafb] border-uniq-border focus:border-uniq-accent focus:ring-uniq-accent pr-10"
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
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-uniq-primary hover:bg-uniq-hover text-white font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Alterando...
              </>
            ) : (
              "Alterar senha"
            )}
          </Button>

          <div className="text-center">
            <Link
              href="/login"
              className="text-sm text-uniq-primary hover:underline"
            >
              Voltar para o login
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
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
import { loginSchema, type LoginFormData } from "@/lib/validations";
import { mockLogin } from "@/lib/auth-mock";

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await mockLogin(data.email, data.password);
      toast({
        title: "Login realizado!",
        description: "Redirecionando para o dashboard...",
        variant: "default",
      });
      onSuccess?.();
      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Email ou senha incorretos",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="space-y-1 pb-6">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-uniq-primary rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">U</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center text-uniq-text">
          Entrar na sua conta
        </CardTitle>
        <CardDescription className="text-center text-uniq-muted">
          Digite suas credenciais para continuar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-uniq-text">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              disabled={isLoading}
              {...form.register("email")}
              className="h-11 bg-[#f9fafb] border-uniq-border focus:border-uniq-accent focus:ring-uniq-accent"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium text-uniq-text">
                Senha
              </Label>
              <Link
                href="/recuperar"
                className="text-sm text-uniq-primary hover:underline"
              >
                Esqueci minha senha
              </Link>
            </div>
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
            {form.formState.errors.password && (
              <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                {form.formState.errors.password.message}
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
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>

          <div className="text-center">
            <p className="text-sm text-uniq-muted">
              Não tem uma conta?{" "}
              <Link
                href="/cadastro"
                className="text-uniq-primary hover:underline font-medium"
              >
                Criar conta
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

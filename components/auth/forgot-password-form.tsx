"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, Mail } from "lucide-react";
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
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/lib/validations";
import { mockForgotPassword } from "@/lib/auth-mock";

interface ForgotPasswordFormProps {
  onSuccess?: () => void;
}

export function ForgotPasswordForm({ onSuccess }: ForgotPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      await mockForgotPassword(data.email);
      setIsSent(true);
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Erro ao enviar email",
        description: "Tente novamente mais tarde.",
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <Card className="w-full shadow-lg">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-uniq-accent/10 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-uniq-accent" />
            </div>
            <h3 className="text-xl font-bold text-uniq-text mb-2">
              Email enviado!
            </h3>
            <p className="text-uniq-muted mb-6">
              Enviamos as instruções de recuperação para o seu email.
            </p>
            <Button
              onClick={() => router.push("/nova-senha")}
              className="bg-uniq-primary hover:bg-uniq-hover text-white"
            >
              Simular link do email
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
          Recuperar senha
        </CardTitle>
        <CardDescription className="text-center text-uniq-muted">
          Digite seu email para receber as instruções
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
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.email.message}
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
                Enviando...
              </>
            ) : (
              "Enviar instruções"
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

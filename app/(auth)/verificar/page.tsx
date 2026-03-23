"use client";

import { useRouter } from "next/navigation";
import { Mail, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VerificarPage() {
  const router = useRouter();

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="space-y-1 pb-6">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-uniq-primary rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">U</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center text-uniq-text">
          Verifique seu email
        </CardTitle>
        <CardDescription className="text-center text-uniq-muted">
          Enviamos um link de confirmação
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-uniq-accent/10 flex items-center justify-center">
            <Mail className="w-10 h-10 text-uniq-accent" />
          </div>
          
          <h3 className="text-lg font-semibold text-uniq-text mb-2">
            Email enviado com sucesso!
          </h3>
          
          <p className="text-uniq-muted mb-2">
            Verifique sua caixa de entrada e clique no link de confirmação para ativar sua conta.
          </p>
          
          <p className="text-sm text-uniq-muted mb-8 max-w-sm mx-auto">
            Se não encontrar o email, verifique sua pasta de spam ou lixo eletrônico.
          </p>
          
          <Button
            onClick={() => router.push("/login")}
            className="bg-uniq-primary hover:bg-uniq-hover text-white px-8"
          >
            Ir para o login
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

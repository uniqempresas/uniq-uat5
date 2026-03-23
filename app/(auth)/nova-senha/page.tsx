import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Nova Senha - UNIQ Empresas",
  description: "Defina sua nova senha na UNIQ Empresas",
};

export default function NovaSenhaPage() {
  return (
    <div className="w-full">
      <Suspense fallback={<div>Carregando...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}

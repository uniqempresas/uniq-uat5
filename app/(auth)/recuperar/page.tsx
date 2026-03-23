import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recuperar Senha - UNIQ Empresas",
  description: "Recupere sua senha da UNIQ Empresas",
};

export default function RecuperarPage() {
  return (
    <div className="w-full">
      <ForgotPasswordForm />
    </div>
  );
}

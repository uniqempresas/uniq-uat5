import { RegisterWizard } from "@/components/auth/register-wizard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastro - UNIQ Empresas",
  description: "Crie sua conta na UNIQ Empresas",
};

export default function CadastroPage() {
  return (
    <div className="w-full max-w-lg">
      <RegisterWizard />
    </div>
  );
}

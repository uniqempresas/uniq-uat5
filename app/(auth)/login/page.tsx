import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - UNIQ Empresas",
  description: "Entre na sua conta UNIQ Empresas",
};

export default function LoginPage() {
  return (
    <div className="w-full">
      <LoginForm />
    </div>
  );
}

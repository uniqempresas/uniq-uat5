import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UNIQ Empresas - Dashboard",
  description: "Plataforma de gestão empresarial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-poppins antialiased">
        {children}
      </body>
    </html>
  );
}

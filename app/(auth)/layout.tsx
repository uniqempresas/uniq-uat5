"use client";

import { Toaster } from "@/components/ui/toaster";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-uniq-platinum flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
      <Toaster />
    </div>
  );
}

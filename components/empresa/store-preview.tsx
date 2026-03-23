"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye } from "lucide-react";
import { mockCompany } from "@/lib/mocks/company";

interface StorePreviewProps {
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  logo?: string | null;
}

export function StorePreview({ colors = mockCompany.colors, logo }: StorePreviewProps) {
  return (
    <Card className="border-uniq-border shadow-sm">
      <CardHeader className="border-b border-uniq-border px-6 py-4 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-uniq-text flex items-center gap-2">
          <Eye className="w-5 h-5 text-uniq-accent" />
          Preview da Loja
        </CardTitle>
        <Button variant="outline" size="sm" className="text-uniq-primary">
          <ExternalLink className="w-4 h-4 mr-2" />
          Abrir Loja
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        {/* Mock Browser */}
        <div className="rounded-lg border border-uniq-border overflow-hidden bg-white">
          {/* Browser Header */}
          <div className="bg-uniq-platinum px-3 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-white rounded px-3 py-1 text-xs text-uniq-muted text-center">
                minhaloja.uniq.com.br
              </div>
            </div>
          </div>

          {/* Mock Store Content */}
          <div className="p-4 space-y-4">
            {/* Header */}
            <div
              className="h-12 rounded flex items-center px-4"
              style={{ backgroundColor: colors.primary }}
            >
              {logo ? (
                <img src={logo} alt="Logo" className="h-8 w-auto" />
              ) : (
                <span className="text-white font-bold">SUA LOJA</span>
              )}
            </div>

            {/* Banner */}
            <div
              className="h-24 rounded flex items-center justify-center"
              style={{ backgroundColor: colors.accent + "30" }}
            >
              <span style={{ color: colors.primary }} className="font-semibold">
                Banner Promocional
              </span>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div
                    className="aspect-square rounded"
                    style={{ backgroundColor: colors.secondary + "20" }}
                  />
                  <div
                    className="h-3 rounded w-3/4"
                    style={{ backgroundColor: colors.secondary + "40" }}
                  />
                  <div
                    className="h-3 rounded w-1/2"
                    style={{ backgroundColor: colors.accent + "60" }}
                  />
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              className="w-full py-2 rounded text-white font-medium text-sm"
              style={{ backgroundColor: colors.primary }}
            >
              Ver Produtos
            </button>
          </div>
        </div>

        <p className="text-xs text-uniq-muted text-center mt-4">
          Preview simplificado - Cores aplicadas em tempo real
        </p>
      </CardContent>
    </Card>
  );
}

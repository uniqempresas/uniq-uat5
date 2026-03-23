"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockCompany } from "@/lib/mocks/company";
import { Palette, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_COLORS = {
  primary: "#3e5653",
  secondary: "#1f2937",
  accent: "#86cb92",
};

interface ColorConfig {
  key: keyof typeof DEFAULT_COLORS;
  label: string;
  description: string;
}

const colorConfigs: ColorConfig[] = [
  {
    key: "primary",
    label: "Cor Primária",
    description: "Usada em botões, links e elementos principais",
  },
  {
    key: "secondary",
    label: "Cor Secundária",
    description: "Usada em textos e elementos de suporte",
  },
  {
    key: "accent",
    label: "Cor de Destaque",
    description: "Usada em destaques e indicadores",
  },
];

export function ColorPicker() {
  const [colors, setColors] = useState(mockCompany.colors);

  const handleColorChange = (key: keyof typeof DEFAULT_COLORS, value: string) => {
    setColors((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setColors(DEFAULT_COLORS);
  };

  return (
    <Card className="border-uniq-border shadow-sm">
      <CardHeader className="border-b border-uniq-border px-6 py-4 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-uniq-text flex items-center gap-2">
          <Palette className="w-5 h-5 text-uniq-accent" />
          Cores da Marca
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="text-uniq-muted"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Restaurar padrão
        </Button>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {colorConfigs.map((config) => (
          <div key={config.key} className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-uniq-text">
                  {config.label}
                </Label>
                <p className="text-xs text-uniq-muted">{config.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={colors[config.key]}
                  onChange={(e) => handleColorChange(config.key, e.target.value)}
                  className="w-12 h-12 rounded-lg border-2 border-uniq-border cursor-pointer bg-transparent"
                />
                <code className="px-2 py-1 bg-uniq-platinum rounded text-sm text-uniq-text font-mono">
                  {colors[config.key]}
                </code>
              </div>
            </div>
            {/* Preview bar */}
            <div
              className="h-8 rounded-lg transition-colors"
              style={{ backgroundColor: colors[config.key] }}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// Helper Label component
function Label({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block text-sm font-medium", className)}>{children}</label>
  );
}

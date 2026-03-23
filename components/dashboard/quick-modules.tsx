"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockQuickModules } from "@/lib/mocks/dashboard";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Users,
  Store,
  Wallet,
  Package,
  ShoppingCart,
  Calendar,
  Wrench,
} from "lucide-react";

const iconMap = {
  Users,
  Store,
  Wallet,
  Package,
  ShoppingCart,
  Calendar,
  Wrench,
};

const colorMap = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    hover: "hover:border-blue-300 hover:bg-blue-50",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    hover: "hover:border-purple-300 hover:bg-purple-50",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    hover: "hover:border-green-300 hover:bg-green-50",
  },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-600",
    hover: "hover:border-orange-300 hover:bg-orange-50",
  },
  pink: {
    bg: "bg-pink-100",
    text: "text-pink-600",
    hover: "hover:border-pink-300 hover:bg-pink-50",
  },
  indigo: {
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    hover: "hover:border-indigo-300 hover:bg-indigo-50",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-600",
    hover: "hover:border-red-300 hover:bg-red-50",
  },
};

type ColorKey = keyof typeof colorMap;

export function QuickModules() {
  return (
    <Card className="border-uniq-border shadow-sm">
      <CardHeader className="border-b border-uniq-border px-6 py-4">
        <CardTitle className="text-lg font-semibold text-uniq-text">
          Acesso Rápido
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {mockQuickModules.map((module) => {
            const Icon = iconMap[module.icon as keyof typeof iconMap];
            const colors = colorMap[module.color as ColorKey];

            return (
              <Link
                key={module.id}
                href={module.route}
                className={cn(
                  "flex flex-col items-center gap-3 p-4 rounded-xl border border-uniq-border transition-all duration-200",
                  "hover:shadow-md hover:-translate-y-0.5",
                  colors.hover
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                    colors.bg
                  )}
                >
                  <Icon className={cn("w-6 h-6", colors.text)} />
                </div>
                <span className="text-sm font-medium text-uniq-text text-center">
                  {module.name}
                </span>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

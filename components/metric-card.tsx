"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  iconBgColor?: string;
  iconColor?: string;
  trend?: {
    value: string;
    isPositive: boolean;
    label?: string;
  };
  subtitle?: string;
  alert?: string;
  className?: string;
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  iconBgColor = "bg-uniq-accent/20",
  iconColor = "text-uniq-accent",
  trend,
  subtitle,
  alert,
  className,
}: MetricCardProps) {
  return (
    <Card
      className={cn(
        "p-6 border-uniq-border bg-uniq-white hover:shadow-md transition-shadow duration-200",
        className
      )}
    >
      <div className="flex items-start justify-between">
        {/* Icon Container */}
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
            iconBgColor
          )}
        >
          <Icon className={cn("w-6 h-6", iconColor)} />
        </div>

        {/* Content */}
        <div className="flex-1 ml-4">
          <p className="text-sm text-uniq-muted uppercase font-medium">
            {title}
          </p>
          <p className="text-2xl font-bold text-uniq-text mt-1">{value}</p>

          {/* Trend */}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend.isPositive ? (
                <ArrowUpRight className="w-4 h-4 text-green-600" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-600" />
              )}
              <span
                className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                {trend.value}
              </span>
              {trend.label && (
                <span className="text-xs text-uniq-muted ml-1">
                  {trend.label}
                </span>
              )}
            </div>
          )}

          {/* Subtitle */}
          {subtitle && (
            <p className="text-xs text-uniq-accent font-medium mt-2">
              {subtitle}
            </p>
          )}

          {/* Alert */}
          {alert && (
            <p className="text-xs text-red-600 font-medium mt-2">{alert}</p>
          )}
        </div>
      </div>
    </Card>
  );
}

// Componente MetricCard exportado como default também
export default MetricCard;

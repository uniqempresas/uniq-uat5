"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  recommended?: boolean;
}

interface PlanCardProps {
  plan: Plan;
  isSelected: boolean;
  onSelect: () => void;
  isRecommended?: boolean;
}

export function PlanCard({ plan, isSelected, onSelect, isRecommended }: PlanCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`
        relative rounded-xl p-5 cursor-pointer transition-all duration-300
        ${isSelected 
          ? "border-2 border-uniq-primary bg-white shadow-md ring-2 ring-uniq-primary ring-opacity-20" 
          : isRecommended 
            ? "border-2 border-uniq-accent bg-white" 
            : "border border-uniq-border bg-white hover:border-uniq-primary"
        }
      `}
    >
      {isRecommended && (
        <div className="absolute top-0 right-0 bg-uniq-accent text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
          Recomendado
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-lg font-bold text-uniq-text">
            {plan.name}
          </h4>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-uniq-primary">
              {plan.price}
            </span>
            <span className="text-sm text-uniq-muted">
              {plan.period}
            </span>
          </div>
        </div>

        <div
          className={`
            w-6 h-6 rounded-full border-2 flex items-center justify-center
            ${isSelected 
              ? "border-uniq-primary bg-uniq-primary" 
              : "border-uniq-border"
            }
          `}
        >
          {isSelected && <Check className="w-4 h-4 text-white" />}
        </div>
      </div>

      <ul className="space-y-2 mb-4">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-uniq-text">
            <Check className="w-4 h-4 text-uniq-accent flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        className={`
          w-full transition-colors
          ${isSelected 
            ? "bg-uniq-accent hover:bg-uniq-accent/90 text-white" 
            : "bg-uniq-primary hover:bg-uniq-hover text-white"
          }
        `}
      >
        {isSelected ? "Selecionado" : "Selecionar"}
      </Button>
    </div>
  );
}

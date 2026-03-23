"use client";

import { UseFormReturn } from "react-hook-form";

import type { RegisterFormData } from "@/lib/validations";
import { MOCK_PLANS } from "@/lib/auth-mock";
import { PlanCard } from "./plan-card";

interface StepPlanProps {
  form: UseFormReturn<RegisterFormData>;
}

export function StepPlan({ form }: StepPlanProps) {
  const selectedPlanId = form.watch("planId");

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-uniq-text">
          Escolha seu plano
        </h3>
        <p className="text-sm text-uniq-muted mt-1">
          Selecione o plano que melhor atende às suas necessidades
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isSelected={selectedPlanId === plan.id}
            onSelect={() => form.setValue("planId", plan.id)}
            isRecommended={plan.recommended}
          />
        ))}
      </div>

      {form.formState.errors.planId && (
        <p className="text-sm text-red-500 text-center">
          {form.formState.errors.planId.message}
        </p>
      )}
    </div>
  );
}

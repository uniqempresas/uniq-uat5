"use client";

import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: { id: number; title: string; description: string }[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep === step.id;
        const isPending = currentStep < step.id;

        return (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold transition-all duration-300
                  ${isCompleted 
                    ? "border-uniq-accent bg-uniq-accent text-white" 
                    : isActive 
                      ? "border-uniq-primary bg-uniq-primary text-white" 
                      : "border-uniq-border bg-white text-uniq-muted"
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.id
                )}
              </div>
              <div className="mt-2 text-center hidden sm:block">
                <p className={`text-sm font-medium ${isActive || isCompleted ? "text-uniq-text" : "text-uniq-muted"}`}>
                  {step.title}
                </p>
                <p className="text-xs text-uniq-muted">
                  {step.description}
                </p>
              </div>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${
                  isCompleted ? "bg-uniq-accent" : "bg-uniq-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

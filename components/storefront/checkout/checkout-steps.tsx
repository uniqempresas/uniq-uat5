'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type CheckoutStep = 'dados' | 'pagamento' | 'confirmacao';

interface CheckoutStepsProps {
  currentStep: CheckoutStep;
}

const steps = [
  { id: 'dados', label: 'Dados', description: 'Informações pessoais' },
  { id: 'pagamento', label: 'Pagamento', description: 'Escolha a forma' },
  { id: 'confirmacao', label: 'Confirmação', description: 'Pedido finalizado' },
];

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const currentIndex = steps.findIndex(step => step.id === currentStep);
  
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isUpcoming = index > currentIndex;
          
          return (
            <React.Fragment key={step.id}>
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors',
                    {
                      'bg-primary text-primary-foreground': isCompleted || isCurrent,
                      'bg-muted text-muted-foreground': isUpcoming,
                    }
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={cn('text-sm font-medium', {
                      'text-foreground': isCompleted || isCurrent,
                      'text-muted-foreground': isUpcoming,
                    })}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    {step.description}
                  </p>
                </div>
              </div>
              
              {/* Connector */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-4 transition-colors',
                    {
                      'bg-primary': index < currentIndex,
                      'bg-border': index >= currentIndex,
                    }
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import { ChevronLeft, ChevronRight, FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface WizardProgressProps {
  currentStep: number;
  steps: { label: string; description?: string }[];
}

export function WizardProgress({ currentStep, steps }: WizardProgressProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isPending = index > currentStep;

        return (
          <div key={index} className="flex items-center">
            {/* Step Circle */}
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  isCompleted
                    ? 'bg-[#86cb92] text-white'
                    : isCurrent
                    ? 'bg-[#3e5653] text-white'
                    : 'bg-gray-200 text-[#627271]'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`text-sm font-medium hidden sm:block ${
                  isCompleted
                    ? 'text-[#86cb92]'
                    : isCurrent
                    ? 'text-[#3e5653]'
                    : 'text-[#627271]'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-2 ${
                  index < currentStep ? 'bg-[#86cb92]' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious?: () => void;
  onNext?: () => void;
  onFinish?: () => void;
  canGoNext?: boolean;
  canGoBack?: boolean;
  isProcessing?: boolean;
}

export function WizardNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onFinish,
  canGoNext = true,
  canGoBack = true,
  isProcessing = false,
}: WizardNavigationProps) {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
      <div>
        {canGoBack && !isFirstStep && (
          <button
            onClick={onPrevious}
            disabled={isProcessing}
            className="flex items-center gap-2 px-4 py-2 text-[#627271] hover:text-[#1f2937] transition-colors disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar
          </button>
        )}
      </div>

      <div className="text-sm text-[#627271]">
        Etapa {currentStep + 1} de {totalSteps}
      </div>

      <div>
        {!isLastStep ? (
          <button
            onClick={onNext}
            disabled={!canGoNext || isProcessing}
            className="flex items-center gap-2 px-6 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próximo
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onFinish}
            disabled={isProcessing}
            className="flex items-center gap-2 px-6 py-2 bg-[#86cb92] text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <span className="animate-spin">⏳</span>
                Processando...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                Confirmar
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

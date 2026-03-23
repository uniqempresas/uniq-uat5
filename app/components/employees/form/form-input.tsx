'use client';

import { Input } from '@/components/ui/input';
import { AlertCircle } from 'lucide-react';

interface FormInputProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
  helpText?: string;
}

export function FormInput({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
  error,
  helpText,
}: FormInputProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-[#1f2937]">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <Input
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
      />
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
      {helpText && !error && (
        <p className="text-xs text-[#627271]">{helpText}</p>
      )}
    </div>
  );
}

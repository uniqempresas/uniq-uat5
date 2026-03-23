'use client';

import { Separator } from '@/components/ui/separator';
import { LucideIcon } from 'lucide-react';

interface FormSectionProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export function FormSection({ title, icon: Icon, children }: FormSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-[#86cb92]" />
        <h3 className="text-lg font-semibold text-[#1f2937]">{title}</h3>
      </div>
      <Separator className="bg-[#e5e7eb]" />
      {children}
    </div>
  );
}

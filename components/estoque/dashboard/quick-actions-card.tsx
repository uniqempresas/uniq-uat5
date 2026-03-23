'use client';

import { Plus, Upload, ClipboardList, BarChart3 } from 'lucide-react';
import Link from 'next/link';

interface QuickActionsCardProps {
  className?: string;
}

export function QuickActionsCard({ className }: QuickActionsCardProps) {
  const actions = [
    {
      icon: Plus,
      label: 'Novo Produto',
      href: '/estoque/produtos/novo',
      primary: true,
    },
    {
      icon: Upload,
      label: 'Entrada em Massa (CSV)',
      href: '/estoque/entrada/massa',
      primary: false,
    },
    {
      icon: ClipboardList,
      label: 'Inventário',
      href: '/estoque/inventario',
      primary: false,
    },
    {
      icon: BarChart3,
      label: 'Relatórios',
      href: '/estoque/relatorios',
      primary: false,
    },
  ];

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-5 ${className}`}>
      <h3 className="font-semibold text-[#1f2937] mb-4">Ações Rápidas</h3>
      
      <div className="space-y-2">
        {actions.map((action) => {
          const Icon = action.icon;
          const content = (
            <>
              <Icon className="w-5 h-5" />
              <span className="font-medium">{action.label}</span>
            </>
          );

          if (action.href.startsWith('/')) {
            return (
              <Link
                key={action.label}
                href={action.href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  action.primary
                    ? 'bg-[#3e5653] text-white hover:bg-[#1f2937]'
                    : 'border border-gray-200 text-[#1f2937] hover:bg-gray-50'
                }`}
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              key={action.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                action.primary
                  ? 'bg-[#3e5653] text-white hover:bg-[#1f2937]'
                  : 'border border-gray-200 text-[#1f2937] hover:bg-gray-50'
              }`}
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}

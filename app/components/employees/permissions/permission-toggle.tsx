'use client';

import { PermissionRow as PermissionRowType } from '@/types/permission';
import { cn } from '@/lib/utils';

interface PermissionToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  color?: 'blue' | 'green' | 'red';
}

const colors = {
  blue: {
    active: 'bg-blue-500',
    inactive: 'bg-gray-200',
  },
  green: {
    active: 'bg-green-500',
    inactive: 'bg-gray-200',
  },
  red: {
    active: 'bg-red-500',
    inactive: 'bg-gray-200',
  },
};

export function PermissionToggle({
  checked,
  onChange,
  disabled,
  color = 'blue',
}: PermissionToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
        checked ? colors[color].active : colors[color].inactive,
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
}

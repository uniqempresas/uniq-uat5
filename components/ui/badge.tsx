import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-uniq-primary text-white hover:bg-uniq-hover",
        secondary: "border-transparent bg-uniq-platinum text-uniq-text hover:bg-uniq-border",
        destructive: "border-transparent bg-red-100 text-red-700 hover:bg-red-200",
        outline: "text-uniq-text",
        success: "border-transparent bg-green-100 text-green-700",
        warning: "border-transparent bg-yellow-100 text-yellow-700",
        info: "border-transparent bg-blue-100 text-blue-700",
        accent: "border-transparent bg-uniq-accent/20 text-uniq-accent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

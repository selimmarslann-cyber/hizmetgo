import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group rounded-full",
  {
    variants: {
      variant: {
        default:
          "bg-brand-500 text-white hover:bg-brand-600 shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_1px_3px_rgba(0,0,0,0.03)] active:scale-[0.98] rounded-full px-4 md:px-5 py-2.5",
        destructive:
          "bg-danger text-white hover:bg-red-700 shadow-md hover:shadow-lg active:scale-[0.98]",
        outline:
          "border border-brand-200 text-brand-700 bg-white hover:bg-brand-50 active:scale-[0.98] rounded-full",
        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-sm hover:shadow-md active:scale-[0.98]",
        ghost:
          "text-brand-600 hover:bg-brand-50 active:scale-[0.98] rounded-full",
        link: "text-brand-500 underline-offset-4 hover:underline hover:text-brand-600 font-semibold",
        premium:
          "bg-brand-500 text-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        default: "h-12 px-6 py-3 text-base",
        sm: "h-9 px-3 text-xs md:text-sm rounded-full",
        lg: "h-11 px-6 text-sm md:text-base rounded-full",
        xl: "h-16 px-10 text-xl",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        aria-label={
          props["aria-label"] ||
          (typeof props.children === "string" ? props.children : undefined)
        }
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

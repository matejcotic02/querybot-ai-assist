import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold ring-offset-background transition-all duration-[250ms] ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-[135deg] from-[#A37BFF] to-[#7D5CFF] text-white rounded-xl shadow-[0_4px_16px_rgba(163,123,255,0.4)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(163,123,255,0.5)] hover:opacity-95 active:scale-[0.98] active:shadow-[0_2px_8px_rgba(125,92,255,0.4)]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-soft rounded-xl",
        outline: "border border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground hover:border-primary/30 rounded-xl",
        secondary: "bg-gradient-to-[135deg] from-[#A37BFF] to-[#7D5CFF] text-white rounded-xl shadow-[0_4px_16px_rgba(163,123,255,0.4)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(163,123,255,0.5)] hover:opacity-95 active:scale-[0.98] active:shadow-[0_2px_8px_rgba(125,92,255,0.4)]",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-xl",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 text-base",
        sm: "h-9 px-3 text-sm",
        lg: "h-auto px-7 py-3.5 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

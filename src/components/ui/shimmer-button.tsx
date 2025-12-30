import React, { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "rgba(255, 255, 255, 0.15)",
      shimmerSize = "200%",
      shimmerDuration = "2.5s",
      borderRadius = "100px",
      background = "#8E60F7",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        style={
          {
            "--shimmer-color": shimmerColor,
            "--shimmer-size": shimmerSize,
            "--shimmer-duration": shimmerDuration,
            "--radius": borderRadius,
            "--bg": background,
          } as CSSProperties
        }
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-8 py-4 text-white [border-radius:var(--radius)]",
          "transform-gpu transition-all duration-300 ease-out",
          "hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25",
          "active:scale-[0.98]",
          "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100",
          className,
          "[background:var(--bg)]",
        )}
        ref={ref}
        {...props}
      >
        {/* Subtle shimmer overlay - always visible, smooth continuous animation */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden [border-radius:var(--radius)]"
          style={{ zIndex: 1 }}
        >
          <div
            className="absolute inset-0 animate-shimmer-sweep"
            style={{
              background: `linear-gradient(
                110deg,
                transparent 25%,
                var(--shimmer-color) 45%,
                var(--shimmer-color) 55%,
                transparent 75%
              )`,
              backgroundSize: "var(--shimmer-size) 100%",
              animationDuration: "var(--shimmer-duration)",
            }}
          />
        </div>

        {/* Inner highlight for depth */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 [border-radius:var(--radius)]",
            "bg-gradient-to-b from-white/10 via-transparent to-black/10",
          )}
          style={{ zIndex: 2 }}
        />

        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2 font-medium">
          {children}
        </span>
      </button>
    );
  },
);

ShimmerButton.displayName = "ShimmerButton";

export { ShimmerButton };

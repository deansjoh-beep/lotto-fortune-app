import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-3xl p-6 transition-all duration-300",
        "hover:border-[rgba(255,46,147,0.3)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

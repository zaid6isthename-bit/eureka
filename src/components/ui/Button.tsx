"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ 
  className, 
  variant = "primary", 
  size = "md", 
  asChild = false,
  ...props 
}, ref) => {
  // Base classes with CSS variable fallback
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  let classes = "";

  switch (variant) {
    case "primary":
      classes = `${baseClasses} bg-[var(--reclaim-primary)] text-white hover:bg-[var(--reclaim-primary-dark)] focus-visible:ring-reclaim-primary`;
      break;
    case "secondary":
      classes = `${baseClasses} bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus-visible:ring-gray-500`;
      break;
    case "danger":
      classes = `${baseClasses} bg-[var(--reclaim-danger)] text-white hover:bg-[#B91C1C] focus-visible:ring-red-500`;
      break;
    case "ghost":
      classes = `${baseClasses} hover:bg-gray-50 focus-visible:ring-gray-500`;
      break;
  }

  if (size === "sm") {
    classes += " h-8 px-3 text-sm";
  } else if (size === "lg") {
    classes += " h-10 px-8 text-lg";
  } else {
    classes += " h-10 px-4 text-base";
  }

  return <button ref={ref} className={cn(classes, className)} {...props} />;
});

Button.displayName = "Button";
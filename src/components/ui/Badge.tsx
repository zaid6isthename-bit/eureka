"use client";

import React from "react";
import { cn } from "@/lib/utils";


export interface BadgeProps extends React.ButtonHTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ 
  className, 
  variant = "primary", 
  size = "md",
  ...props 
}) => {
  const sizeClasses = size === "sm" ? "text-xs py-0.5" : "text-sm py-1";
  
  const variantClasses = {
    primary: "bg-primary-100 text-primary-600",
    success: "bg-success-100 text-success-600",
    warning: "bg-warning-100 text-warning-600",
    danger: "bg-danger-100 text-danger-600",
    info: "bg-info-blue-100 text-info-blue-600",
  };

  return (
    <span 
      className={cn(
        "inline-flex items-center rounded-full",
        sizeClasses,
        variantClasses[variant],
        className
      )} 
      {...props}
    />
  );
});

Badge.displayName = "Badge";
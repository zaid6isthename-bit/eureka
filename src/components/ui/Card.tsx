"use client";

import React from "react";
import { cn } from "@/lib/utils";


export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "subtle" | "bordered";
  hasHeader?: boolean;
  hasFooter?: boolean;
  className?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ 
  className, 
  variant = "default", 
  hasHeader = false,
  hasFooter = false,
  ...props 
}) => {
  const cardClasses = cn(
    "rounded-lg border",
    variant === "default" ? "bg-white shadow-sm" : "",
    variant === "elevated" ? "bg-white shadow-md" : "",
    variant === "subtle" ? "bg-gray-50" : "",
    variant === "bordered" ? "border border-gray-200" : "",
    "overflow-hidden"
  );

  return (
    <div className={cardClasses} {...props}>
      {hasHeader && <div className="px-6 py-4 border-b border-gray-200" />}
      {hasFooter && <div className="px-6 py-4 border-t border-gray-200" />}
    </div>
  );
});

Card.displayName = "Card";
"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";

export interface AlertCardProps {
  type: "high" | "medium" | "low";
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
}

export function AlertCard({ type, title, description, actionText = "View Details", actionHref = "#" }: AlertCardProps) {
  const variantMap: Record<"high" | "medium" | "low", "danger" | "warning" | "info"> = {
    high: "danger",
    medium: "warning", 
    low: "info",
  };


  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 border-[var(--border)] hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div className="flex items-start flex-1">
          <div className="flex-shrink-0">
            <Badge variant={variantMap[type]} className="mt-1">
              {type[0].toUpperCase() + type.slice(1)}
            </Badge>
          </div>
          <div className="ml-3">
            <h3 className="font-medium text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <Badge variant={variantMap[type]} size="sm" className="mt-2">
          {type[0].toUpperCase() + type.slice(1)}
        </Badge>
      </div>
      
      {actionText && (
        <div className="mt-4">
          <a href={actionHref} className="text-primary-600 hover:text-primary-400 text-sm font-medium">
            {actionText}
          </a>
        </div>
      )}
    </div>
  );
}
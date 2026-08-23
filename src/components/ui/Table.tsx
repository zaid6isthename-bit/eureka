"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface TableProps {
  className?: string;
  children: React.ReactNode;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(({ className, children }, ref) => {
  return (
    <table className={cn("w-full rounded-lg border border-gray-200", className)} ref={ref}>
      {children}
    </table>
  );
});

Table.displayName = "Table";

export interface TableHeaderProps {
  children: React.ReactNode;
}

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(({ children }, ref) => {
  return (
    <thead>
      {children}
    </thead>
  );
});

TableHeader.displayName = "TableHeader";

export interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(({ className, children }, ref) => {
  return (
    <tbody className={className} ref={ref}>
      {children}
    </tbody>
  );
});

TableBody.displayName = "TableBody";

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  className?: string;
  children: React.ReactNode;
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(({ className, children, ...props }, ref) => {
  const rowClasses = cn(
    "bg-[#0E1424] border-b border-[#232B45]",
    "last:border-0",
    "hover:bg-[#161D33] transition-colors duration-150",
    className
  );
  return (
    <tr ref={ref} className={rowClasses} {...props}>
      {children}
    </tr>
  );
});

TableRow.displayName = "TableRow";

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  className?: string;
  children: React.ReactNode;
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(({ className, children, ...props }, ref) => {
  const cellClasses = cn(
    "p-4",
    "whitespace-nowrap",
    "text-sm font-medium",
    className
  );
  return (
    <td ref={ref} className={cellClasses} {...props}>
      {children}
    </td>
  );
});

TableCell.displayName = "TableCell";
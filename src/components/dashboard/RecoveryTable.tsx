"use client";

import React from "react";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";


export interface RecoveryOpportunity {
  id: string;
  sku: string;
  emoji: string;
  score: number;
  value: number;
  units: number;
  daysIdle: number;
  estimatedRecovery: { min: number; max: number };
  recoveryTime: string;
}

export interface RecoveryTableProps {
  opportunities: RecoveryOpportunity[];
  onRowSelect?: (id: string) => void;
}

export function RecoveryTable({ opportunities, onRowSelect }: RecoveryTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell className="w-24">SKU</TableCell>
          <TableCell className="w-16">Score</TableCell>
          <TableCell className="w-24">Value</TableCell>
          <TableCell className="w-16">Days Idle</TableCell>
          <TableCell className="w-24">Est. Recovery</TableCell>
          <TableCell className="text-right">Action</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {opportunities.map((opp) => (
          <TableRow 
            key={opp.id}
            className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
            onClick={() => onRowSelect && onRowSelect(opp.id)}
          >
            <TableCell className="font-medium text-gray-900">
              {opp.emoji} {opp.sku}
            </TableCell>
            <TableCell>
              <Badge variant="success" size="sm">
                {opp.score}/100
              </Badge>
            </TableCell>
            <TableCell>
              <span className="font-semibold text-gray-900">₹{opp.value.toLocaleString()}</span>
              <span className="text-xs text-gray-500"> @₹{(opp.value / opp.units).toLocaleString()}/unit</span>
            </TableCell>
            <TableCell>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                {opp.daysIdle} days
              </span>
            </TableCell>
            <TableCell>
              <span className="font-semibold text-success-600">₹{opp.estimatedRecovery.min.toLocaleString()} - ₹{opp.estimatedRecovery.max.toLocaleString()}</span>
              <span className="text-xs text-gray-500">{opp.recoveryTime}</span>
            </TableCell>
            <TableCell className="text-right">
              <button className="px-3 py-1.5 text-sm font-medium text-primary-600 hover:text-primary-400 rounded">
                Start Recovery
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
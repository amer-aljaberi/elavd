"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Loader2, FileX } from "lucide-react";

interface DashboardTableProps {
  headers: string[];
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function DashboardTable({ headers, children, className, isLoading, emptyMessage }: DashboardTableProps) {
  const hasRows = React.Children.count(children) > 0;
  return (
    <div className={cn("rounded-xl border border-border/60 bg-background/60 backdrop-blur overflow-hidden shadow-sm", className)}>
      <div className="w-full overflow-x-auto">
        <Table className="min-w-[640px] sm:min-w-0">
          <TableHeader className="bg-foreground/[0.03]">
            <TableRow className="hover:bg-transparent border-border/60">
              {headers.map((header, index) => (
                <TableHead key={index} className="text-[10px] ltr:text-left rtl:text-right sm:text-[11px] uppercase font-semibold tracking-wide text-muted-foreground py-2 sm:py-3">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={headers.length}>
                  <div className="flex items-center justify-center py-10 text-muted-foreground gap-3">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="text-sm font-medium">Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : hasRows ? (
              children
            ) : (
              <TableRow>
                <TableCell colSpan={headers.length}>
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="h-12 w-12 rounded-xl border border-border/60 flex items-center justify-center text-muted-foreground mb-3">
                      <FileX className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-medium text-foreground">No results</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {emptyMessage || "We couldn’t find anything matching your criteria."}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function DashboardTableRow({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <TableRow className={cn("border-border/60 hover:bg-foreground/[0.02] transition-colors group", className)}>
      {children}
    </TableRow>
  );
}

export function DashboardTableCell({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <TableCell className={cn("py-3 sm:py-4 text-xs sm:text-sm font-medium text-foreground/90 whitespace-nowrap", className)}>
      {children}
    </TableCell>
  );
}

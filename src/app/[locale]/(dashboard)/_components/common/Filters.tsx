"use client";

import React from "react";
import { Search as SearchIcon, Filter as FilterIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchBoxProps {
  placeholder?: string;
  onChange?: (val: string) => void;
  className?: string;
  filters?: { label: string; value: string }[];
  onFilterSelect?: (val: string) => void;
  selectedFilterValue?: string;
}

export function DashboardSearch({ placeholder, onChange, className, filters, onFilterSelect, selectedFilterValue }: SearchBoxProps) {
  return (
    <div className={cn("flex flex-col md:flex-row items-stretch md:items-center gap-3", className)}>
      <div className="relative group flex-1">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
        <input
          type="text"
          placeholder={placeholder || "Search items..."}
          onChange={(e) => onChange?.(e.target.value)}
          className="h-11 w-full rounded-full bg-background/60 backdrop-blur border border-border/60 focus:ring-2 focus:ring-primary/10 focus:border-border transition-all outline-none pl-11 pr-10 text-sm font-medium shadow-sm"
        />
      </div>
      {filters && onFilterSelect && (
        <DashboardFilter options={filters} onSelect={onFilterSelect} selectedValue={selectedFilterValue} />
      )}
    </div>
  );
}

export function DashboardFilter({ options, onSelect, selectedValue }: { options: { label: string, value: string }[], onSelect: (val: string) => void, selectedValue?: string }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex items-center gap-2 px-4 py-2 bg-background/60 backdrop-blur rounded-full border border-border/60">
        <FilterIcon className="h-4 w-4 text-foreground/70" />
        <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/80">Filter</span>
      </div>

      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onSelect(opt.value)}
          className={cn(
            "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap border transition-all",
            selectedValue === opt.value
              ? "bg-foreground text-background border-transparent"
              : "border-border/60 hover:border-foreground/20 hover:bg-foreground/[0.03]"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function DashboardPagination({ page, totalPages, onPrev, onNext }: { page: number, totalPages: number, onPrev: () => void, onNext: () => void }) {
  return (
    <div className="flex items-center justify-between mt-8 p-4 bg-background/60 backdrop-blur border border-border/60 rounded-xl">
      <p className="text-xs font-medium text-muted-foreground">Page <span className="text-foreground font-semibold">{page}</span> of <span className="text-foreground font-semibold">{totalPages}</span></p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrev}
          disabled={page <= 1}
          className="h-9 w-9 p-0 rounded-full border-border/60 hover:border-foreground/30"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={page >= totalPages}
          className="h-9 w-9 p-0 rounded-full border-border/60 hover:border-foreground/30"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function DashboardSelectFilter({
  value,
  options,
  onChange,
  className,
  placeholder,
}: {
  value: string;
  options: { label: string; value: string }[];
  onChange: (val: string) => void;
  className?: string;
  placeholder?: string;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={cn("h-9 rounded-full border-border/60 bg-background/60 w-[160px]", className)}>
        <SelectValue placeholder={placeholder || "Filter"} />
      </SelectTrigger>
      <SelectContent className="rounded-xl border-border/60 bg-background/70 backdrop-blur">
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value} className="cursor-pointer">
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

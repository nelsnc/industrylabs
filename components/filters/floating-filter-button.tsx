"use client";

import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingFilterButtonProps {
  onClick: () => void;
  activeFilterCount?: number;
  className?: string;
}

export function FloatingFilterButton({
  onClick,
  activeFilterCount = 0,
  className,
}: FloatingFilterButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "fixed left-4 top-24 z-40",
        "flex items-center gap-2",
        "shadow-lg",
        className
      )}
      aria-label="Open filters"
    >
      <SlidersHorizontal className="h-4 w-4" />
      <span>Filters</span>
      {activeFilterCount > 0 && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-semibold text-blue-700">
          {activeFilterCount}
        </span>
      )}
    </Button>
  );
}

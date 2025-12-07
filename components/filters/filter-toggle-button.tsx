"use client";

import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterToggleButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  activeFilterCount?: number;
  className?: string;
}

export function FilterToggleButton({
  isOpen,
  onToggle,
  activeFilterCount = 0,
  className,
}: FilterToggleButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onToggle}
      className={cn(
        "w-full justify-start gap-2 text-sm font-medium",
        className
      )}
      aria-label={isOpen ? "Close filters" : "Open filters"}
    >
      {isOpen ? (
        <>
          <PanelLeftClose className="h-4 w-4" />
          <span>Hide Filters</span>
        </>
      ) : (
        <>
          <PanelLeftOpen className="h-4 w-4" />
          <span>Show Filters</span>
          {activeFilterCount > 0 && (
            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
              {activeFilterCount}
            </span>
          )}
        </>
      )}
    </Button>
  );
}

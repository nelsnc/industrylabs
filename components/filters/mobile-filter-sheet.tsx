"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { ToolFilters } from "./tool-filters";
import type { IntegrationOption } from "@/lib/airtable-helpers";

/**
 * NOTE: This component is currently unused.
 * Mobile filtering is handled by HRTalentClient with Sheet component.
 * This file is kept for potential future use.
 * Updated for TASK-118 dynamic integration filter compatibility.
 */

interface MobileFilterSheetProps {
  availableIntegrations?: IntegrationOption[];
}

export function MobileFilterSheet({
  availableIntegrations = [],
}: MobileFilterSheetProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filter Tools</SheetTitle>
          <SheetDescription>
            Refine your search by company size, budget, region, and more
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <ToolFilters availableIntegrations={availableIntegrations} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

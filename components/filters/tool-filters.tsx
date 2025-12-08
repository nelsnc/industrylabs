"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CompanySizeFilter } from "./company-size-filter";
import { BudgetRangeFilter } from "./budget-range-filter";
import { RegionFilter } from "./region-filter";
import { ComplianceFilter } from "./compliance-filter";
import { IntegrationFilter } from "./integration-filter";
import { UseCaseFilter } from "./use-case-filter";
import { FilterToggleButton } from "./filter-toggle-button";
import { cn } from "@/lib/utils";
import type { IntegrationOption } from "@/lib/airtable-helpers";

interface ToolFiltersProps {
  isOpen?: boolean;
  onToggle?: () => void;
  availableIntegrations: IntegrationOption[];
}

export function ToolFilters({
  isOpen = true,
  onToggle,
  availableIntegrations,
}: ToolFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check if any filters are active
  const hasActiveFilters =
    searchParams.has("size") ||
    searchParams.has("budgetMin") ||
    searchParams.has("budgetMax") ||
    searchParams.has("region") ||
    searchParams.has("compliance") ||
    searchParams.has("integrations") ||
    searchParams.has("useCases");

  // Count active filters for badge
  const activeFilterCount = getActiveFilterCount(searchParams);

  const handleClearAll = () => {
    // Remove all filter params but preserve other params if any
    const params = new URLSearchParams(searchParams);
    params.delete("size");
    params.delete("budgetMin");
    params.delete("budgetMax");
    params.delete("region");
    params.delete("compliance");
    params.delete("integrations");
    params.delete("useCases");

    const queryString = params.toString();
    router.push(queryString ? `?${queryString}` : window.location.pathname);
  };

  return (
    <div className={cn(
      "relative transition-all duration-300 ease-in-out",
      isOpen ? "w-[280px]" : "w-0"
    )}>
      {/* Filter Content */}
      <div className={cn(
        "overflow-hidden transition-all duration-300",
        !isOpen && "opacity-0 invisible"
      )}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <div className="flex items-center gap-3">
              {hasActiveFilters && (
                <Button onClick={handleClearAll} variant="ghost" size="sm">
                  Clear all
                </Button>
              )}
              {onToggle && (
                <FilterToggleButton
                  isOpen={isOpen}
                  onToggle={onToggle}
                />
              )}
            </div>
          </div>

          <Separator />

          <UseCaseFilter />
          <Separator />

          <CompanySizeFilter />
          <Separator />

          <BudgetRangeFilter />
          <Separator />

          <RegionFilter />
          <Separator />

          <ComplianceFilter />
          <Separator />

          <IntegrationFilter availableIntegrations={availableIntegrations} />
        </div>
      </div>
    </div>
  );
}

// Helper function to count active filters
function getActiveFilterCount(searchParams: URLSearchParams): number {
  let count = 0;

  const sizes = searchParams.get("size")?.split(",") || [];
  count += sizes.length;

  if (searchParams.has("budgetMin") || searchParams.has("budgetMax")) {
    count += 1;
  }

  const regions = searchParams.get("region")?.split(",") || [];
  count += regions.length;

  const compliance = searchParams.get("compliance")?.split(",") || [];
  count += compliance.length;

  const integrations = searchParams.get("integrations")?.split(",") || [];
  count += integrations.length;

  const useCases = searchParams.get("useCases")?.split(",") || [];
  count += useCases.length;

  return count;
}

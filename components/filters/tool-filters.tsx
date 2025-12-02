"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CompanySizeFilter } from "./company-size-filter";
import { BudgetRangeFilter } from "./budget-range-filter";
import { RegionFilter } from "./region-filter";
import { ComplianceFilter } from "./compliance-filter";
import { IntegrationFilter } from "./integration-filter";

export function ToolFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check if any filters are active
  const hasActiveFilters =
    searchParams.has("size") ||
    searchParams.has("budgetMin") ||
    searchParams.has("budgetMax") ||
    searchParams.has("region") ||
    searchParams.has("compliance") ||
    searchParams.has("integrations");

  const handleClearAll = () => {
    // Remove all filter params but preserve other params if any
    const params = new URLSearchParams(searchParams);
    params.delete("size");
    params.delete("budgetMin");
    params.delete("budgetMax");
    params.delete("region");
    params.delete("compliance");
    params.delete("integrations");

    const queryString = params.toString();
    router.push(queryString ? `?${queryString}` : window.location.pathname);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <Button onClick={handleClearAll} variant="ghost" size="sm">
            Clear all
          </Button>
        )}
      </div>

      <Separator />

      <CompanySizeFilter />
      <Separator />

      <BudgetRangeFilter />
      <Separator />

      <RegionFilter />
      <Separator />

      <ComplianceFilter />
      <Separator />

      <IntegrationFilter />
    </div>
  );
}

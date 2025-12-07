"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const USE_CASE_OPTIONS = [
  { value: "recruiting", label: "Recruiting & ATS" },
  { value: "onboarding", label: "Onboarding & Training" },
  { value: "performance", label: "Performance Management" },
  { value: "engagement", label: "Employee Engagement" },
  { value: "analytics", label: "HR Analytics & Reporting" },
];

interface ActiveFilter {
  type: string;
  label: string;
  value: string;
}

export function ActiveFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Build list of active filters
  const activeFilters: ActiveFilter[] = [];

  // Company size filters
  const sizes = searchParams.get("size")?.split(",") || [];
  sizes.forEach((size) => {
    activeFilters.push({
      type: "size",
      label: `${size} employees`,
      value: size,
    });
  });

  // Budget filters
  const budgetMin = searchParams.get("budgetMin");
  const budgetMax = searchParams.get("budgetMax");
  if (budgetMin || budgetMax) {
    let label = "Budget: ";
    if (budgetMin && budgetMax) {
      label += `£${parseInt(budgetMin).toLocaleString()}-£${parseInt(budgetMax).toLocaleString()}`;
    } else if (budgetMin) {
      label += `From £${parseInt(budgetMin).toLocaleString()}`;
    } else if (budgetMax) {
      label += `Up to £${parseInt(budgetMax).toLocaleString()}`;
    }
    activeFilters.push({
      type: "budget",
      label,
      value: "budget",
    });
  }

  // Region filters
  const regions = searchParams.get("region")?.split(",") || [];
  regions.forEach((region) => {
    activeFilters.push({
      type: "region",
      label: region,
      value: region,
    });
  });

  // Compliance filters
  const compliance = searchParams.get("compliance")?.split(",") || [];
  compliance.forEach((comp) => {
    activeFilters.push({
      type: "compliance",
      label: comp,
      value: comp,
    });
  });

  // Integration filters
  const integrations = searchParams.get("integrations")?.split(",") || [];
  integrations.forEach((integration) => {
    activeFilters.push({
      type: "integrations",
      label: integration,
      value: integration,
    });
  });

  // Use Case filters
  const useCases = searchParams.get("useCases")?.split(",") || [];
  useCases.forEach((useCase) => {
    const useCaseLabel = USE_CASE_OPTIONS.find((uc) => uc.value === useCase)?.label || useCase;
    activeFilters.push({
      type: "useCases",
      label: useCaseLabel,
      value: useCase,
    });
  });

  const handleRemove = (filter: ActiveFilter) => {
    const params = new URLSearchParams(searchParams);

    if (filter.type === "budget") {
      params.delete("budgetMin");
      params.delete("budgetMax");
    } else {
      // For multi-select filters, remove just the specific value
      const currentValues = params.get(filter.type)?.split(",") || [];
      const newValues = currentValues.filter((v) => v !== filter.value);

      if (newValues.length > 0) {
        params.set(filter.type, newValues.join(","));
      } else {
        params.delete(filter.type);
      }
    }

    router.push(`?${params.toString()}`);
  };

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-sm text-gray-600">Active filters:</span>
      {activeFilters.map((filter, index) => (
        <Badge
          key={`${filter.type}-${filter.value}-${index}`}
          variant="secondary"
          className="gap-1 pr-1"
        >
          {filter.label}
          <button
            onClick={() => handleRemove(filter)}
            className="ml-1 hover:bg-gray-300 rounded-sm p-0.5"
            aria-label={`Remove ${filter.label} filter`}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
    </div>
  );
}

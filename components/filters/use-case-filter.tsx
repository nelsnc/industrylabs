"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const USE_CASE_OPTIONS = [
  { value: "recruiting", label: "Recruiting & ATS" },
  { value: "onboarding", label: "Onboarding & Training" },
  { value: "performance", label: "Performance Management" },
  { value: "engagement", label: "Employee Engagement" },
  { value: "analytics", label: "HR Analytics & Reporting" },
];

export function UseCaseFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current selections from URL (comma-separated)
  const currentUseCases = searchParams.get("useCases")?.split(",") || [];

  const handleToggle = (useCaseValue: string) => {
    const params = new URLSearchParams(searchParams);

    let newUseCases: string[];
    if (currentUseCases.includes(useCaseValue)) {
      // Remove from selection
      newUseCases = currentUseCases.filter((uc) => uc !== useCaseValue);
    } else {
      // Add to selection
      newUseCases = [...currentUseCases, useCaseValue];
    }

    if (newUseCases.length > 0) {
      params.set("useCases", newUseCases.join(","));
    } else {
      params.delete("useCases");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-900">Use Case</h3>
      <div className="space-y-2">
        {USE_CASE_OPTIONS.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={`use-case-${option.value}`}
              checked={currentUseCases.includes(option.value)}
              onCheckedChange={() => handleToggle(option.value)}
            />
            <Label
              htmlFor={`use-case-${option.value}`}
              className="text-sm font-normal cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}

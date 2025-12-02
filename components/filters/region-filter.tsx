"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const REGION_OPTIONS = [
  { value: "UK", label: "United Kingdom" },
  { value: "EU", label: "European Union" },
  { value: "US", label: "United States" },
  { value: "Global", label: "Global" },
];

export function RegionFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current selections from URL (comma-separated)
  const currentRegions = searchParams.get("region")?.split(",") || [];

  const handleToggle = (regionValue: string) => {
    const params = new URLSearchParams(searchParams);

    let newRegions: string[];
    if (currentRegions.includes(regionValue)) {
      // Remove from selection
      newRegions = currentRegions.filter((r) => r !== regionValue);
    } else {
      // Add to selection
      newRegions = [...currentRegions, regionValue];
    }

    if (newRegions.length > 0) {
      params.set("region", newRegions.join(","));
    } else {
      params.delete("region");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-900">Supported Regions</h3>
      <div className="space-y-2">
        {REGION_OPTIONS.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={`region-${option.value}`}
              checked={currentRegions.includes(option.value)}
              onCheckedChange={() => handleToggle(option.value)}
            />
            <Label
              htmlFor={`region-${option.value}`}
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

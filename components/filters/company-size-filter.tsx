"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const SIZE_OPTIONS = [
  { value: "1-50", label: "1-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "500+", label: "500+ employees" },
];

export function CompanySizeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current selections from URL (comma-separated)
  const currentSizes = searchParams.get("size")?.split(",") || [];

  const handleToggle = (sizeValue: string) => {
    const params = new URLSearchParams(searchParams);

    let newSizes: string[];
    if (currentSizes.includes(sizeValue)) {
      // Remove from selection
      newSizes = currentSizes.filter((s) => s !== sizeValue);
    } else {
      // Add to selection
      newSizes = [...currentSizes, sizeValue];
    }

    if (newSizes.length > 0) {
      params.set("size", newSizes.join(","));
    } else {
      params.delete("size");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-900">Company Size</h3>
      <div className="space-y-2">
        {SIZE_OPTIONS.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={`size-${option.value}`}
              checked={currentSizes.includes(option.value)}
              onCheckedChange={() => handleToggle(option.value)}
            />
            <Label
              htmlFor={`size-${option.value}`}
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

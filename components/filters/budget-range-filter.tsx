"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function BudgetRangeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current values from URL
  const urlMin = searchParams.get("budgetMin");
  const urlMax = searchParams.get("budgetMax");

  // Local state for input fields
  const [minValue, setMinValue] = useState(urlMin || "");
  const [maxValue, setMaxValue] = useState(urlMax || "");

  // Sync local state with URL when URL changes
  useEffect(() => {
    setMinValue(urlMin || "");
    setMaxValue(urlMax || "");
  }, [urlMin, urlMax]);

  const handleApply = () => {
    const params = new URLSearchParams(searchParams);

    // Parse values
    const min = minValue.trim() ? parseInt(minValue.trim(), 10) : null;
    const max = maxValue.trim() ? parseInt(maxValue.trim(), 10) : null;

    // Validation
    if (min !== null && isNaN(min)) {
      alert("Minimum budget must be a valid number");
      return;
    }
    if (max !== null && isNaN(max)) {
      alert("Maximum budget must be a valid number");
      return;
    }
    if (min !== null && max !== null && min > max) {
      alert("Minimum budget cannot exceed maximum budget");
      return;
    }

    // Update URL params
    if (min !== null) {
      params.set("budgetMin", min.toString());
    } else {
      params.delete("budgetMin");
    }

    if (max !== null) {
      params.set("budgetMax", max.toString());
    } else {
      params.delete("budgetMax");
    }

    router.push(`?${params.toString()}`);
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("budgetMin");
    params.delete("budgetMax");
    setMinValue("");
    setMaxValue("");
    router.push(`?${params.toString()}`);
  };

  const hasValues = minValue || maxValue;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-900">Annual Budget (£)</h3>
      <div className="space-y-3">
        <div>
          <Label htmlFor="budget-min" className="text-xs text-gray-600">
            Minimum
          </Label>
          <Input
            id="budget-min"
            type="number"
            placeholder="e.g., 5000"
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="budget-max" className="text-xs text-gray-600">
            Maximum
          </Label>
          <Input
            id="budget-max"
            type="number"
            placeholder="e.g., 15000"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
            className="mt-1"
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleApply} size="sm" className="flex-1">
            Apply
          </Button>
          {hasValues && (
            <Button onClick={handleClear} size="sm" variant="outline">
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

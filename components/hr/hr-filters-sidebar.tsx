"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function HrFiltersSidebar() {
  return (
    <aside className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Company Size</h3>
        <div className="space-y-3">
          {["1-10", "11-50", "51-200", "201-500", "500+"].map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox id={`size-${size}`} />
              <Label
                htmlFor={`size-${size}`}
                className="text-sm font-normal cursor-pointer"
              >
                {size}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-4">Geography</h3>
        <div className="space-y-3">
          {["US", "UK", "EU", "Canada", "Australia", "Global"].map((geo) => (
            <div key={geo} className="flex items-center space-x-2">
              <Checkbox id={`geo-${geo}`} />
              <Label
                htmlFor={`geo-${geo}`}
                className="text-sm font-normal cursor-pointer"
              >
                {geo}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-4">Compliance</h3>
        <div className="space-y-3">
          {["GDPR", "EEOC", "SOC 2", "OFCCP"].map((compliance) => (
            <div key={compliance} className="flex items-center space-x-2">
              <Checkbox id={`compliance-${compliance}`} />
              <Label
                htmlFor={`compliance-${compliance}`}
                className="text-sm font-normal cursor-pointer"
              >
                {compliance}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <Button variant="outline" className="w-full">
        Clear filters
      </Button>
    </aside>
  );
}

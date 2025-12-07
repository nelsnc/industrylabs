"use client";

import { useState, useEffect } from "react";
import { ToolFilters } from "@/components/filters/tool-filters";
import { ActiveFilters } from "@/components/filters/active-filters";
import { ToolCard } from "@/components/tools/tool-card";
import { RequestBoardCompactCTA } from "@/components/request/request-board-compact-cta";
import { FloatingFilterButton } from "@/components/filters/floating-filter-button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { AlertCircle, SlidersHorizontal } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { Tool, IntegrationOption } from "@/lib/airtable-helpers";

interface HRTalentClientProps {
  filteredTools: Tool[];
  hasActiveFilters: boolean;
  availableIntegrations: IntegrationOption[];
}

export function HRTalentClient({
  filteredTools,
  hasActiveFilters,
  availableIntegrations,
}: HRTalentClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // On mobile, sidebar starts closed
  useEffect(() => {
    if (!isDesktop) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isDesktop]);

  // Count active filters for badge
  const activeFilterCount = hasActiveFilters ? getActiveFilterCountFromURL() : 0;

  return (
    <>
      {isDesktop ? (
        // Desktop: Inline collapsible sidebar
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8">
          {/* Filters Sidebar */}
          <aside className={cn(
            "lg:sticky lg:top-20 h-fit",
            "transition-all duration-300 ease-in-out"
          )}>
            <ToolFilters
              isOpen={isSidebarOpen}
              onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
              availableIntegrations={availableIntegrations}
            />
          </aside>

          {/* Floating Filter Button (shows when sidebar closed) */}
          {!isSidebarOpen && (
            <FloatingFilterButton
              onClick={() => setIsSidebarOpen(true)}
              activeFilterCount={activeFilterCount}
            />
          )}

          {/* Main Content */}
          <main className="space-y-6 min-w-0">
            <ContentSection
              filteredTools={filteredTools}
              hasActiveFilters={hasActiveFilters}
              isSidebarOpen={isSidebarOpen}
            />
          </main>
        </div>
      ) : (
        // Mobile: Sheet for filters
        <>
          {/* Mobile Filter Button */}
          <div className="mb-4">
            <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
              <SheetTrigger asChild>
                <Button className="w-full sm:w-auto">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-semibold text-blue-700">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] overflow-y-auto">
                <div className="mt-6">
                  <ToolFilters
                    isOpen={true}
                    onToggle={() => setIsMobileSheetOpen(false)}
                    availableIntegrations={availableIntegrations}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Mobile Content */}
          <main className="space-y-6">
            <ContentSection
              filteredTools={filteredTools}
              hasActiveFilters={hasActiveFilters}
              isSidebarOpen={true} // Always use mobile grid on mobile
            />
          </main>
        </>
      )}
    </>
  );
}

// Separate component for content to avoid duplication
function ContentSection({
  filteredTools,
  hasActiveFilters,
  isSidebarOpen,
}: {
  filteredTools: Tool[];
  hasActiveFilters: boolean;
  isSidebarOpen: boolean;
}) {
  return (
    <>
      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mb-4">
          <ActiveFilters />
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredTools.length}{" "}
          {filteredTools.length === 1 ? "tool" : "tools"} found
        </p>
      </div>

      {/* Tools Grid or No Results */}
      {filteredTools.length === 0 ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No tools match your current filters. Try adjusting your criteria or{" "}
            <Link
              href="/hr-talent"
              className="font-medium text-blue-600 hover:underline"
            >
              clear all filters
            </Link>
            .
          </AlertDescription>
        </Alert>
      ) : (
        <div
          className={cn(
            "grid gap-6",
            "grid-cols-1",           // Mobile: 1 column
            "sm:grid-cols-2",        // Small tablet (640px+): 2 columns
            isSidebarOpen
              ? "lg:grid-cols-2 xl:grid-cols-3"  // Desktop with sidebar: 2-3 columns
              : "lg:grid-cols-3 xl:grid-cols-4"  // Desktop no sidebar: 3-4 columns
          )}
        >
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}

      {/* Request Board CTA */}
      <div className="mt-12">
        <RequestBoardCompactCTA
          headline="Can't find the perfect HR tool?"
          subheadline="Tell us your HR needs and we'll match you with 2-3 tools that fit your budget, team size, and compliance requirements."
        />
      </div>
    </>
  );
}

// Helper function to count active filters from URL
function getActiveFilterCountFromURL(): number {
  if (typeof window === "undefined") return 0;

  const params = new URLSearchParams(window.location.search);
  let count = 0;

  const sizes = params.get("size")?.split(",") || [];
  count += sizes.length;

  if (params.has("budgetMin") || params.has("budgetMax")) {
    count += 1;
  }

  const regions = params.get("region")?.split(",") || [];
  count += regions.length;

  const compliance = params.get("compliance")?.split(",") || [];
  count += compliance.length;

  const integrations = params.get("integrations")?.split(",") || [];
  count += integrations.length;

  const useCases = params.get("useCases")?.split(",") || [];
  count += useCases.length;

  return count;
}

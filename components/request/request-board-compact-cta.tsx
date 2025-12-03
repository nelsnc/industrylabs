import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RequestBoardCompactCTAProps {
  headline?: string;
  subheadline?: string;
}

export function RequestBoardCompactCTA({
  headline = "Can't find the perfect tool?",
  subheadline = "Tell us your needs and we'll match you with 2-3 tools that fit your budget, company size, and requirements.",
}: RequestBoardCompactCTAProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-blue-200" />
            <h3 className="text-xl font-bold text-white">
              {headline}
            </h3>
          </div>
          <p className="text-blue-100">
            {subheadline}
          </p>
        </div>
        <Button asChild size="lg" variant="secondary" className="whitespace-nowrap">
          <Link href="/request" className="flex items-center gap-2">
            Get Matched
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
      <div className="mt-4 text-xs text-blue-200 md:text-right">
        Free • 2 minutes • Expert recommendations
      </div>
    </div>
  );
}

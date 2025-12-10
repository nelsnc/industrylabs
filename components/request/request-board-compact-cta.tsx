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
    <div className="bg-indigo-600 rounded-xl p-6 md:p-8 shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-indigo-200" />
            <h3 className="text-xl font-bold text-white">
              {headline}
            </h3>
          </div>
          <p className="text-indigo-100 leading-relaxed">
            {subheadline}
          </p>

          {/* Trust indicators */}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-indigo-200">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Free
            </span>
            <span>•</span>
            <span>2 minutes</span>
            <span>•</span>
            <span>Expert recommendations</span>
          </div>
        </div>

        {/* Right: CTA Button */}
        <div className="shrink-0">
          <Link
            href="/request"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-white text-indigo-600 font-semibold shadow-lg hover:bg-indigo-50 transition-all duration-200 whitespace-nowrap"
          >
            Get Matched
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

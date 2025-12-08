/**
 * Tool Card Component v4.0
 *
 * Design Philosophy - Triple AI Consensus:
 * - Trust signals (Verified Vendor badge)
 * - Icon + text rows (no bordered pills)
 * - Full-width CTA button
 * - Professional B2B marketplace aesthetic
 * - Fast scanning (<4 seconds vs 10 seconds)
 *
 * Based on unanimous feedback from ChatGPT, Gemini, and Claude
 */

import Link from "next/link";
import Image from "next/image";
import type { Tool } from "@/lib/airtable-helpers";
import {
  formatPricing,
  formatCompanySize,
  getComplianceBadges,
  getCategoryLabel,
  isPremium as checkPremium,
  getTrialInfo,
} from "@/lib/utils/format-card-data-v4";

interface ToolCardProps {
  tool: Tool;
  referrerSlug?: string;
  // Legacy props for backward compatibility
  integrationPreview?: string[];
  showPricing?: boolean;
  variant?: "default" | "compact";
}

export function ToolCard({ tool, referrerSlug }: ToolCardProps) {
  // Build detail URL
  const detailUrl = referrerSlug
    ? `/tools/${tool.slug}?from=${referrerSlug}`
    : `/tools/${tool.slug}`;

  // Format data
  const pricing = formatPricing(tool);
  const companySize = formatCompanySize(tool);
  const { hasTrial, duration } = getTrialInfo(tool);
  const compliance = getComplianceBadges(tool);
  const category = getCategoryLabel(tool);
  const isPremium = checkPremium(tool);

  // Check verification status (conditional trust badge)
  const isVerified =
    tool.verificationStatus === "Verified" ||
    (isPremium && !tool.verificationStatus); // Temporary: show for Premium if status unavailable

  // Extract logo URL (handle Airtable attachment objects)
  const logoUrl = (() => {
    if (typeof tool.logoUrl === "string") {
      return tool.logoUrl;
    }
    if (Array.isArray(tool.logoUrl) && tool.logoUrl.length > 0) {
      const firstAttachment = tool.logoUrl[0];
      return (firstAttachment as { url?: string })?.url || "";
    }
    return "";
  })();

  return (
    <div className="group flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {/* SECTION 1: HEADER - Logo + Name + Trust Signal + Premium Badge */}
      <div className="mb-4 flex items-start gap-3">
        {/* Logo (48px, left-aligned) */}
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-gray-100 bg-white">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={`${tool.name} logo`}
              fill
              className="object-contain p-1"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-50 text-xl font-bold text-gray-400">
              {tool.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Name + Category + Trust Badge */}
        <div className="flex-1 min-w-0">
          {/* Tool Name */}
          <h3 className="text-lg font-semibold text-gray-900 leading-tight truncate">
            {tool.name}
          </h3>

          {/* Category (subtle, not prominent) */}
          <p className="text-sm text-gray-500 mt-0.5 truncate">{category}</p>

          {/* TRUST SIGNAL - Conditional based on verification */}
          {isVerified && (
            <div className="mt-1 flex items-center gap-1.5 text-sm">
              {/* Shield Check Icon */}
              <svg
                className="h-4 w-4 text-blue-600 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium text-blue-600">Verified Vendor</span>
            </div>
          )}
        </div>

        {/* Premium Badge (top-right corner, subtle) */}
        {isPremium && (
          <span className="text-xs font-medium uppercase tracking-wider text-gray-400 flex-shrink-0">
            Premium
          </span>
        )}
      </div>

      {/* SECTION 2: DESCRIPTION (1-2 lines max, benefit-focused) */}
      <p className="mb-4 text-sm text-gray-600 leading-relaxed line-clamp-2">
        {tool.shortDescription || "AI-powered HR solution for modern teams"}
      </p>

      {/* SECTION 3: METADATA (Icon + Text rows, NO bordered pills) */}
      <div className="mb-3 space-y-1.5 text-sm text-gray-700">
        {/* Pricing Row */}
        <div className="flex items-center gap-2">
          {/* Dollar Circle Icon */}
          <svg
            className="h-4 w-4 text-gray-400 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{pricing}</span>
        </div>

        {/* Company Size Row */}
        <div className="flex items-center gap-2">
          {/* Building Icon */}
          <svg
            className="h-4 w-4 text-gray-400 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <span>Best for {companySize}</span>
        </div>

        {/* Free Trial Row (conditional, with green checkmark) */}
        {hasTrial && duration && (
          <div className="flex items-center gap-2">
            {/* Green Check Circle Icon */}
            <svg
              className="h-4 w-4 text-green-500 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{duration}-day free trial available</span>
          </div>
        )}
      </div>

      {/* SECTION 4: COMPLIANCE (Subtle icon row, NO borders) */}
      {compliance && compliance.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-gray-500">
          {compliance.map((item) => (
            <span key={item} className="flex items-center gap-1">
              {/* Small Shield Icon (3px height) */}
              <svg
                className="h-3 w-3 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="uppercase tracking-wide">{item}</span>
            </span>
          ))}
        </div>
      )}

      {/* SECTION 5: CTA BUTTON (Full-width, NOT text link) */}
      <Link href={detailUrl} className="mt-auto block">
        <button
          className="w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:border-gray-400"
          aria-label={`View full profile for ${tool.name}`}
        >
          View Full Profile
        </button>
      </Link>
    </div>
  );
}

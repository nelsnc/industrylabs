/**
 * Tool Card Component v3.1
 *
 * Design Philosophy:
 * - Subtle bordered tags for visual grouping
 * - Clear typography hierarchy
 * - Single blue accent color
 * - Professional B2B aesthetic
 * - Clean whitespace with structured tags
 * - Fast scanning (<3 seconds)
 *
 * v3.1 Updates: Added bordered tags to address "too dry" feedback
 */

import Link from 'next/link';
import Image from 'next/image';
import {
  formatPricingText,
  formatCompanySizeText,
  formatFreeTrialText,
  getComplianceList,
  getCategoryLabel,
} from '@/lib/utils/format-card-data-v2';
import type { Tool } from '@/lib/airtable-helpers';

interface ToolCardProps {
  tool: Tool;
  referrerSlug?: string;
  // Legacy props for backward compatibility (ignored in v3 design)
  integrationPreview?: string[];
  showPricing?: boolean;
  variant?: 'default' | 'compact';
}

export function ToolCard({ tool, referrerSlug }: ToolCardProps) {
  const isPremium = tool.tags?.includes('Premium');

  // Build detail URL with optional referrer for comparison tracking
  const detailUrl = referrerSlug
    ? `/tools/${tool.slug}?from=${referrerSlug}`
    : `/tools/${tool.slug}`;

  // Format metadata as plain text
  const pricing = formatPricingText(
    tool.pricingAnnualMin,
    tool.pricingAnnualMax,
    tool.pricingCurrency
  );

  const companySize = formatCompanySizeText(tool.idealCompanySize);

  const trial = formatFreeTrialText(
    tool.freeTrialAvailable,
    tool.freeTrialDurationDays
  );

  // Get compliance list
  const complianceList = getComplianceList(
    tool.gdprCompliant,
    tool.eeocCompliant,
    tool.soc2Certified,
    tool.hipaaCompliant,
    tool.iso27001Certified
  );

  // Get category label
  const categoryLabel = getCategoryLabel(tool.tags, tool.category);

  return (
    <div className="group relative flex flex-col rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 hover:shadow-md">
      {/* HEADER: Logo + Name + Category + Premium Badge */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex gap-3">
          {/* Logo - 48px, left-aligned */}
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-white">
            {tool.logoUrl ? (
              <Image
                src={tool.logoUrl}
                alt={`${tool.name} logo`}
                width={48}
                height={48}
                className="h-full w-full object-contain p-1"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-50 text-xl font-bold text-gray-400">
                {tool.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Name + Category */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-900">
              {tool.name}
            </h3>
            <p className="mt-1 text-sm font-medium text-blue-600">
              {categoryLabel}
            </p>
          </div>
        </div>

        {/* Premium Badge - Subtle text, top right */}
        {isPremium && (
          <span className="shrink-0 text-xs uppercase tracking-wider text-gray-400">
            PREMIUM
          </span>
        )}
      </div>

      {/* DESCRIPTION (3 lines for more content) */}
      <p className="mb-4 text-sm leading-relaxed text-gray-600 line-clamp-3">
        {tool.shortDescription || 'AI-powered HR solution for modern teams'}
      </p>

      {/* METADATA TAGS (pricing, size, trial) */}
      <div className="mb-3 flex flex-wrap gap-2">
        {/* Pricing tag */}
        <span className="inline-flex items-center rounded-full border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700">
          {pricing}
        </span>

        {/* Company size tag */}
        <span className="inline-flex items-center rounded-full border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700">
          {companySize}
        </span>

        {/* Trial tag (if available) */}
        {trial && (
          <span className="inline-flex items-center rounded-full border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700">
            {trial}
          </span>
        )}
      </div>

      {/* COMPLIANCE BADGES (if any) */}
      {complianceList.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {complianceList.map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-xs uppercase tracking-wide text-gray-600"
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {/* CTA - Right-aligned */}
      <div className="mt-auto flex justify-end">
        <span className="text-sm font-medium text-blue-600 group-hover:underline">
          View Details →
        </span>
      </div>

      {/* Full Card Clickable Link */}
      <Link
        href={detailUrl}
        className="absolute inset-0 z-10"
        aria-label={`View details for ${tool.name}`}
      >
        <span className="sr-only">View {tool.name} details</span>
      </Link>
    </div>
  );
}

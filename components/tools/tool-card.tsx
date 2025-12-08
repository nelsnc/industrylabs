/**
 * Tool Card Component v2.0
 *
 * Design Philosophy:
 * - Logo-left horizontal layout (not centered banner)
 * - Horizontal pill-based metadata (scannable left-to-right)
 * - Benefit-first description (outcome-driven)
 * - Icon-based compliance (trust signals)
 * - Integrated CTA (no gray footer)
 * - Full card clickable (Fitts's Law)
 * - No view count (removed noise)
 * - Max 1 divider (or use spacing only)
 *
 * Based on: Gemini + ChatGPT-5 + Claude feedback synthesis
 */

import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import {
  formatCardPricingPill,
  formatCardCompanySizePill,
  formatCardFreeTrialPill,
  getComplianceIcons,
  getCategoryLabel,
  type CardPill
} from '@/lib/utils/format-card-data-v2';
import type { Tool } from '@/lib/airtable-helpers';

interface ToolCardProps {
  tool: Tool;
  referrerSlug?: string;
  // Legacy props for backward compatibility (ignored in v2 design)
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

  // Format data as pills
  const pricingPill = formatCardPricingPill(
    tool.pricingAnnualMin,
    tool.pricingAnnualMax,
    tool.pricingCurrency
  );

  const sizePill = formatCardCompanySizePill(tool.idealCompanySize);

  const trialPill = formatCardFreeTrialPill(
    tool.freeTrialAvailable,
    tool.freeTrialDurationDays
  );

  // Get compliance icons (max 3)
  const complianceIcons = getComplianceIcons(
    tool.gdprCompliant,
    tool.eeocCompliant,
    tool.soc2Certified,
    tool.hipaaCompliant,
    tool.iso27001Certified
  ).slice(0, 3); // Max 3 displayed

  // Get category label
  const categoryLabel = getCategoryLabel(tool.tags, tool.category);

  return (
    <div className="group relative flex flex-col rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-lg">
      {/* HEADER: Logo (left) + Name + Category + Premium Badge */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex gap-3">
          {/* Logo - Smaller, left-aligned */}
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
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {tool.name}
            </h3>
            <p className="text-xs font-medium text-blue-600 mt-0.5">
              {categoryLabel}
            </p>
          </div>
        </div>

        {/* Premium Badge - Top Right */}
        {isPremium && (
          <Badge
            variant="secondary"
            className="shrink-0 bg-amber-100 text-amber-700 hover:bg-amber-100 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5"
          >
            Featured
          </Badge>
        )}
      </div>

      {/* BODY: Benefit-First Description */}
      <p className="mb-4 text-sm text-gray-600 line-clamp-2 leading-relaxed">
        {tool.shortDescription || 'AI-powered HR solution for modern teams'}
      </p>

      {/* META: Horizontal Pills (The Scanner) */}
      <div className="mb-5 flex flex-wrap gap-2">
        {/* Pricing Pill */}
        <Pill pill={pricingPill} />

        {/* Company Size Pill */}
        <Pill pill={sizePill} />

        {/* Free Trial Pill (if available) */}
        {trialPill && <Pill pill={trialPill} />}
      </div>

      {/* FOOTER: Compliance Icons (left) + CTA (right) */}
      <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">
        {/* Compliance Icons - Compact */}
        <div className="flex gap-3">
          {complianceIcons.length > 0 ? (
            complianceIcons.map((comp, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1"
                title={comp.tooltip}
              >
                <span className="text-sm">{comp.icon}</span>
                <span className="text-[10px] font-medium text-gray-500">
                  {comp.name}
                </span>
              </div>
            ))
          ) : (
            <span className="text-[10px] text-gray-400">No compliance info</span>
          )}
        </div>

        {/* CTA - Integrated (not in gray footer) */}
        <div className="flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:underline">
          View
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      {/* Full Card Clickable Link (Fitts's Law) */}
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

/**
 * Pill Component - Reusable for pricing, size, trial
 */
function Pill({ pill }: { pill: CardPill }) {
  const variantClasses = {
    gray: 'bg-gray-100 text-gray-700',
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700',
    amber: 'bg-amber-50 text-amber-700'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ${variantClasses[pill.variant]}`}>
      {pill.icon && <span>{pill.icon}</span>}
      {pill.text}
    </span>
  );
}

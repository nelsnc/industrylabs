/**
 * Tool Card Component v7.0 - Definitive Professional Design
 *
 * Design Philosophy:
 * - Monochromatic foundation: 90% gray, 10% blue
 * - Strict alignment: Flexbox grid with equal heights
 * - Minimal badges: Text-only, no colored pills
 * - Clear hierarchy: Name > Description > Metadata > Compliance
 * - AWS/Linear aesthetic: Structured, professional, data-focused
 *
 * Key Features:
 * - Single header row (logo + name + status)
 * - Status as gray text (not colored pills)
 * - 2-line description (maintains grid alignment)
 * - Clean text metadata (no icons)
 * - Simple compliance line
 * - Blue button at bottom (only color element)
 *
 * Based on synthesis of 3 independent AI analyses + site aesthetic audit
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Tool } from '@/lib/airtable-helpers';
import {
  formatPricing,
  formatCompanySize,
  getComplianceBadges,
  getCategoryLabel,
  isPremium as checkPremium,
  getTrialInfo,
} from '@/lib/utils/format-card-data-v4';

interface ToolCardProps {
  tool: Tool;
  referrerSlug?: string;
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

  // Check verification status
  const isVerified =
    tool.verificationStatus === 'Verified' ||
    (isPremium && !tool.verificationStatus);

  // Extract logo URL (handle Airtable attachment objects)
  const logoUrl = (() => {
    if (typeof tool.logoUrl === 'string') {
      return tool.logoUrl;
    }
    if (Array.isArray(tool.logoUrl) && tool.logoUrl.length > 0) {
      const firstAttachment = tool.logoUrl[0];
      return (firstAttachment as { url?: string })?.url || '';
    }
    return '';
  })();

  // Format free trial text
  const freeTrialText = hasTrial && duration ? `${duration}-day free trial available` : null;

  return (
    <Link href={detailUrl}>
      <div className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-md">

        {/* HEADER: Logo + Name + Status Badges */}
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-slate-50">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={`${tool.name} logo`}
                fill
                className="object-contain p-1"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xl font-bold text-slate-400">
                {tool.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Name + Category + Status */}
          <div className="flex-1 min-w-0">
            {/* Tool Name */}
            <h3 className="text-lg font-semibold text-slate-900 leading-tight">
              {tool.name}
            </h3>

            {/* Category + Status Badges (text only, gray) */}
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
              <span className="uppercase tracking-wide">{category}</span>
              {(isPremium || isVerified) && (
                <>
                  {isPremium && (
                    <>
                      <span>•</span>
                      <span className="font-medium">Premium</span>
                    </>
                  )}
                  {isVerified && (
                    <>
                      <span>•</span>
                      <span className="font-medium">Verified</span>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* DESCRIPTION: 2 lines, clamped */}
        <p className="mt-4 text-sm text-slate-600 leading-relaxed line-clamp-2">
          {tool.shortDescription || 'AI-powered HR solution for modern teams'}
        </p>

        {/* METADATA: Clean text rows */}
        <div className="mt-6 space-y-2 text-sm text-slate-700">
          {pricing && <div>{pricing}</div>}
          {companySize && <div>Best for {companySize}</div>}
          {freeTrialText && <div>{freeTrialText}</div>}
        </div>

        {/* COMPLIANCE: Single gray line */}
        {compliance && compliance.length > 0 && (
          <div className="mt-4 text-xs text-slate-500">
            {compliance.join(' • ')}
          </div>
        )}

        {/* SPACER: Pushes button to bottom */}
        <div className="flex-1" />

        {/* CTA BUTTON: Only color element */}
        <div className="mt-6">
          <div className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors group-hover:bg-blue-700">
            View Full Profile
          </div>
        </div>
      </div>
    </Link>
  );
}

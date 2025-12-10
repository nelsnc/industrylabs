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

export function ToolCardNotion({ tool, referrerSlug }: ToolCardProps) {
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
      <div className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-10 transition-all duration-200 hover:border-blue-600">

        {/* Subtle accent line at top */}
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

        {/* Very subtle background tint */}
        <div className="absolute inset-0 rounded-2xl bg-slate-50/30 -z-10" />

        {/* Content wrapper */}
        <div className="relative">
          {/* HEADER - generous spacing */}
          <div className="flex items-start gap-6">
            {/* Logo */}
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white border border-slate-100">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={`${tool.name} logo`}
                  fill
                  className="object-contain p-1.5"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-lg font-bold text-slate-400">
                  {tool.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              {/* Tool Name */}
              <h3 className="text-lg font-semibold text-slate-900 leading-tight">
                {tool.name}
              </h3>

              {/* Category + Status */}
              <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                <span className="uppercase tracking-wider font-medium">{category}</span>
                {(isPremium || isVerified) && (
                  <>
                    {isPremium && (
                      <>
                        <span className="text-slate-300">•</span>
                        <span className="font-medium">Premium</span>
                      </>
                    )}
                    {isVerified && (
                      <>
                        <span className="text-slate-300">•</span>
                        <span className="font-medium">Verified</span>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* DESCRIPTION - maximum breathing room */}
          <p className="mt-8 text-sm text-slate-600 leading-relaxed line-clamp-2">
            {tool.shortDescription || 'AI-powered HR solution for modern teams'}
          </p>

          {/* METADATA - monospace for perfect alignment */}
          <div className="mt-8 space-y-3 text-sm text-slate-600">
            {pricing && <div className="font-mono">{pricing}</div>}
            {companySize && <div className="font-mono">Best for {companySize}</div>}
            {freeTrialText && <div className="font-mono text-slate-500">{freeTrialText}</div>}
          </div>

          {/* COMPLIANCE */}
          {compliance && compliance.length > 0 && (
            <div className="mt-6 text-xs text-slate-400 font-mono">
              {compliance.join(' • ')}
            </div>
          )}

          {/* SPACER */}
          <div className="h-8" />

          {/* CTA BUTTON - minimal */}
          <div className="mt-8">
            <div className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-center text-sm font-medium text-slate-700 transition-all group-hover:border-blue-600 group-hover:text-blue-600">
              View Full Profile
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

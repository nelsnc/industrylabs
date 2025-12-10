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

export function ToolCardStripe({ tool, referrerSlug }: ToolCardProps) {
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
      <div className="group relative flex h-full flex-col rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm shadow-slate-900/5 transition-all duration-300 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/10 hover:-translate-y-1">

        {/* Gradient border effect on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(to right, rgb(59 130 246 / 0.1), rgb(147 51 234 / 0.1))',
            padding: '1px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }}
        />

        {/* HEADER */}
        <div className="relative flex items-start gap-5">
          {/* Larger logo with subtle shadow */}
          <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 shadow-sm">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={`${tool.name} logo`}
                fill
                className="object-contain p-2"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xl font-bold text-slate-400">
                {tool.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            {/* Tool Name */}
            <h3 className="text-xl font-semibold text-slate-900 leading-tight tracking-tight">
              {tool.name}
            </h3>

            {/* Category + Status */}
            <div className="mt-1.5 flex items-center gap-2 text-xs font-medium text-slate-600">
              <span className="uppercase tracking-wider">{category}</span>
              {(isPremium || isVerified) && (
                <>
                  {isPremium && (
                    <>
                      <span className="text-slate-400">•</span>
                      <span>Premium</span>
                    </>
                  )}
                  {isVerified && (
                    <>
                      <span className="text-slate-400">•</span>
                      <span>Verified</span>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="relative mt-5 text-[15px] text-slate-600 leading-relaxed line-clamp-2">
          {tool.shortDescription || 'AI-powered HR solution for modern teams'}
        </p>

        {/* METADATA */}
        <div className="relative mt-7 space-y-2.5 text-[15px] text-slate-700">
          {pricing && <div className="font-medium">{pricing}</div>}
          {companySize && <div>Best for {companySize}</div>}
          {freeTrialText && <div className="text-slate-600">{freeTrialText}</div>}
        </div>

        {/* COMPLIANCE */}
        {compliance && compliance.length > 0 && (
          <div className="relative mt-5 text-xs font-medium text-slate-500 tracking-wide">
            {compliance.join(' • ')}
          </div>
        )}

        {/* SPACER */}
        <div className="flex-1" />

        {/* CTA BUTTON */}
        <div className="relative mt-7">
          <div className="w-full rounded-xl bg-blue-600 px-5 py-3 text-center text-[15px] font-semibold text-white transition-all duration-200 group-hover:bg-blue-700 group-hover:shadow-lg group-hover:shadow-blue-600/25">
            View Full Profile
          </div>
        </div>
      </div>
    </Link>
  );
}

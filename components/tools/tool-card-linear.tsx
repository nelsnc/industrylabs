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

export function ToolCardLinear({ tool, referrerSlug }: ToolCardProps) {
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
      <div className="group relative flex h-full flex-col rounded-xl border border-slate-700/10 bg-slate-900/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-900/[0.04] hover:shadow-[0_0_32px_rgb(59_130_246_/_0.12)]">

        {/* Inner glow on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            boxShadow: 'inset 0 0 24px rgb(59 130 246 / 0.1)'
          }}
        />

        {/* HEADER */}
        <div className="relative flex items-start gap-4">
          {/* Logo */}
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-slate-800/50 ring-1 ring-slate-700/10">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={`${tool.name} logo`}
                fill
                className="object-contain p-1.5"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-base font-bold text-slate-400">
                {tool.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            {/* Tool Name */}
            <h3 className="text-[17px] font-semibold text-slate-800 leading-tight tracking-tight">
              {tool.name}
            </h3>

            {/* Category + Status - technical feel */}
            <div className="mt-1 flex items-center gap-2 text-[11px] font-mono font-medium text-slate-500 uppercase tracking-wider">
              <span>{category.replace(/ & /g, '+')}</span>
              {(isPremium || isVerified) && (
                <>
                  {isPremium && (
                    <>
                      <span className="text-slate-400">•</span>
                      <span className="text-blue-600">PRO</span>
                    </>
                  )}
                  {isVerified && (
                    <>
                      <span className="text-slate-400">•</span>
                      <span className="text-emerald-600">✓</span>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="relative mt-4 text-[13px] text-slate-700 leading-relaxed line-clamp-2">
          {tool.shortDescription || 'AI-powered HR solution for modern teams'}
        </p>

        {/* METADATA - technical monospace */}
        <div className="relative mt-5 space-y-2 text-[13px]">
          {pricing && (
            <div className="flex items-center gap-2 text-slate-700">
              <span className="font-mono text-slate-500">$</span>
              <span className="font-mono">{pricing}</span>
            </div>
          )}
          {companySize && (
            <div className="flex items-center gap-2 text-slate-700">
              <span className="font-mono text-slate-500">#</span>
              <span className="font-mono text-[12px]">Best for {companySize}</span>
            </div>
          )}
          {freeTrialText && (
            <div className="flex items-center gap-2 text-slate-600">
              <span className="font-mono text-slate-500">→</span>
              <span className="text-[12px]">{freeTrialText}</span>
            </div>
          )}
        </div>

        {/* COMPLIANCE */}
        {compliance && compliance.length > 0 && (
          <div className="relative mt-4 flex flex-wrap gap-1.5">
            {compliance.map((item) => (
              <span key={item} className="inline-flex items-center gap-1 rounded bg-slate-800/5 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-600 ring-1 ring-slate-700/5">
                {item}
              </span>
            ))}
          </div>
        )}

        {/* SPACER */}
        <div className="flex-1" />

        {/* CTA BUTTON - technical */}
        <div className="relative mt-5">
          <div className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-center text-[13px] font-mono font-semibold text-white shadow-sm transition-all group-hover:from-blue-500 group-hover:to-blue-600 group-hover:shadow-md">
            VIEW_PROFILE →
          </div>
        </div>
      </div>
    </Link>
  );
}

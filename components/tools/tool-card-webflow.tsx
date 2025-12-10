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

export function ToolCardWebflow({ tool, referrerSlug }: ToolCardProps) {
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
      <div className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-200 hover:border-slate-900 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01]">

        {/* HEADER - Bold and prominent */}
        <div className="flex items-start gap-5">
          {/* Larger, more prominent logo */}
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-900 shadow-md">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={`${tool.name} logo`}
                fill
                className="object-contain p-2.5"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-white">
                {tool.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            {/* Larger, bolder name */}
            <h3 className="text-2xl font-bold text-slate-900 leading-none tracking-tight">
              {tool.name}
            </h3>

            {/* Category + Status - bolder */}
            <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="uppercase tracking-widest">{category}</span>
              {(isPremium || isVerified) && (
                <>
                  {isPremium && (
                    <>
                      <span>•</span>
                      <span className="text-blue-600">PREMIUM</span>
                    </>
                  )}
                  {isVerified && (
                    <>
                      <span>•</span>
                      <span>VERIFIED</span>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="mt-5 text-base text-slate-600 leading-relaxed line-clamp-2 font-medium">
          {tool.shortDescription || 'AI-powered HR solution for modern teams'}
        </p>

        {/* METADATA - bolder */}
        <div className="mt-6 space-y-2 text-sm font-medium text-slate-700">
          {pricing && <div className="text-slate-900">{pricing}</div>}
          {companySize && <div>Best for {companySize}</div>}
          {freeTrialText && <div>{freeTrialText}</div>}
        </div>

        {/* COMPLIANCE */}
        {compliance && compliance.length > 0 && (
          <div className="mt-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {compliance.join(' · ')}
          </div>
        )}

        {/* SPACER */}
        <div className="flex-1" />

        {/* CTA BUTTON - bold */}
        <div className="mt-6">
          <div className="w-full rounded-xl bg-slate-900 px-5 py-3.5 text-center text-sm font-bold text-white transition-all group-hover:bg-slate-800 uppercase tracking-wide">
            View Profile →
          </div>
        </div>
      </div>
    </Link>
  );
}

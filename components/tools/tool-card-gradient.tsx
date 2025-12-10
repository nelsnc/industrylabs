'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Tool } from '@/lib/airtable-helpers';
import {
  formatPricing,
  formatCompanySize,
  getCategoryLabel,
  isPremium as checkPremium,
  getTrialInfo,
} from '@/lib/utils/format-card-data-v4';

interface ToolCardProps {
  tool: Tool;
  referrerSlug?: string;
}

export function ToolCardGradient({ tool, referrerSlug }: ToolCardProps) {
  const detailUrl = referrerSlug
    ? `/tools/${tool.slug}?from=${referrerSlug}`
    : `/tools/${tool.slug}`;

  const pricing = formatPricing(tool);
  const companySize = formatCompanySize(tool);
  const { hasTrial, duration } = getTrialInfo(tool);
  const category = getCategoryLabel(tool);
  const isPremium = checkPremium(tool);

  const logoUrl = (() => {
    if (typeof tool.logoUrl === 'string') return tool.logoUrl;
    if (Array.isArray(tool.logoUrl) && tool.logoUrl.length > 0) {
      return (tool.logoUrl[0] as { url?: string })?.url || '';
    }
    return '';
  })();

  const freeTrialText = hasTrial && duration ? `${duration}-day free trial` : null;

  return (
    <Link href={detailUrl}>
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 p-6 shadow-xl transition-all hover:scale-[1.02] hover:shadow-2xl">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-purple-900/20" />

        {/* Content */}
        <div className="relative">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white shadow-lg">
              {logoUrl ? (
                <Image src={logoUrl} alt={tool.name} fill className="object-contain p-2" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xl font-bold text-blue-600">
                  {tool.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-white leading-tight">
                {tool.name}
              </h3>
              <div className="mt-1 flex items-center gap-2 text-xs text-white/80">
                <span className="uppercase tracking-wider">{category}</span>
                {isPremium && (
                  <>
                    <span>•</span>
                    <span className="font-medium">Premium</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 text-sm text-white/90 leading-relaxed line-clamp-2">
            {tool.shortDescription || 'AI-powered HR solution for modern teams'}
          </p>

          {/* Metadata */}
          <div className="mt-5 space-y-2 text-sm text-white">
            {pricing && (
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{pricing}</span>
              </div>
            )}
            {companySize && (
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>{companySize}</span>
              </div>
            )}
            {freeTrialText && (
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{freeTrialText}</span>
              </div>
            )}
          </div>

          {/* Spacer */}
          <div className="h-6" />

          {/* CTA */}
          <div className="mt-5">
            <div className="w-full rounded-xl bg-white px-5 py-2.5 text-center text-sm font-semibold text-blue-600 shadow-xl transition-all group-hover:bg-white/95 group-hover:shadow-2xl">
              Explore Tool →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

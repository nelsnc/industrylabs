'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Tool } from '@/lib/airtable-helpers';
import {
  formatPricing,
  formatCompanySize,
  getCategoryLabel,
  isPremium as checkPremium,
} from '@/lib/utils/format-card-data-v4';

interface ToolCardProps {
  tool: Tool;
  referrerSlug?: string;
}

export function ToolCardEditorial({ tool, referrerSlug }: ToolCardProps) {
  const detailUrl = referrerSlug
    ? `/tools/${tool.slug}?from=${referrerSlug}`
    : `/tools/${tool.slug}`;

  const pricing = formatPricing(tool);
  const companySize = formatCompanySize(tool);
  const category = getCategoryLabel(tool);
  const isPremium = checkPremium(tool);

  const logoUrl = (() => {
    if (typeof tool.logoUrl === 'string') return tool.logoUrl;
    if (Array.isArray(tool.logoUrl) && tool.logoUrl.length > 0) {
      return (tool.logoUrl[0] as { url?: string })?.url || '';
    }
    return '';
  })();

  return (
    <Link href={detailUrl}>
      <div className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:shadow-2xl">
        {/* Category label at top */}
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          {category}
        </div>

        {/* HUGE Title - magazine style */}
        <h3 className="mt-3 font-serif text-4xl font-bold leading-tight text-slate-900 tracking-tight">
          {tool.name}
        </h3>

        {/* Subtitle */}
        {isPremium && (
          <div className="mt-2 text-sm font-medium italic text-blue-600">
            Premium Listing
          </div>
        )}

        {/* Small logo to the side */}
        <div className="mt-6 flex items-start gap-6">
          {logoUrl && (
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-50 shadow-sm">
              <Image src={logoUrl} alt={tool.name} fill className="object-contain p-2" />
            </div>
          )}

          {/* Editorial description */}
          <div className="flex-1">
            <p className="text-base leading-relaxed text-slate-700">
              {tool.shortDescription || 'AI-powered HR solution for modern teams'}
            </p>
          </div>
        </div>

        {/* Pull quote style metadata */}
        <div className="mt-8 border-l-4 border-slate-900 pl-6">
          <div className="space-y-2">
            {pricing && (
              <div className="text-lg font-semibold text-slate-900">
                {pricing}
              </div>
            )}
            {companySize && (
              <div className="text-sm text-slate-600">
                Designed for {companySize.toLowerCase()}
              </div>
            )}
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA - editorial style */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
          <span className="text-sm font-medium text-slate-500">Featured Tool</span>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 transition-all group-hover:gap-3 group-hover:text-blue-600">
            <span>Read More</span>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

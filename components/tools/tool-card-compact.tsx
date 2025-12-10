'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Tool } from '@/lib/airtable-helpers';
import {
  formatPricing,
  formatCompanySize,
  isPremium as checkPremium,
} from '@/lib/utils/format-card-data-v4';

interface ToolCardProps {
  tool: Tool;
  referrerSlug?: string;
}

export function ToolCardCompact({ tool, referrerSlug }: ToolCardProps) {
  const detailUrl = referrerSlug
    ? `/tools/${tool.slug}?from=${referrerSlug}`
    : `/tools/${tool.slug}`;

  const pricing = formatPricing(tool);
  const companySize = formatCompanySize(tool);
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
      <div className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 transition-all hover:border-blue-600 hover:bg-white hover:shadow-sm">
        {/* Logo tiny */}
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-white">
          {logoUrl ? (
            <Image src={logoUrl} alt={tool.name} fill className="object-contain p-1" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-bold text-slate-400">
              {tool.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Content compact */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-900 truncate">
              {tool.name}
            </h3>
            {isPremium && (
              <span className="text-[10px] font-medium text-blue-600 uppercase">Premium</span>
            )}
          </div>
          <p className="text-xs text-slate-500 truncate">
            {tool.shortDescription || 'AI-powered HR solution'}
          </p>
        </div>

        {/* Price inline */}
        <div className="shrink-0 text-right">
          {pricing && <div className="text-sm font-medium text-slate-900">{pricing}</div>}
          {companySize && <div className="text-xs text-slate-500">{companySize}</div>}
        </div>

        {/* CTA tiny */}
        <div className="shrink-0">
          <div className="rounded bg-blue-600 p-2 text-white transition-colors group-hover:bg-blue-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

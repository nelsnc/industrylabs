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

export function ToolCardHorizontal({ tool, referrerSlug }: ToolCardProps) {
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

  return (
    <Link href={detailUrl}>
      <div className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-blue-600 hover:shadow-md">
        {/* LEFT: Logo - fixed width */}
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-50">
          {logoUrl ? (
            <Image src={logoUrl} alt={tool.name} fill className="object-contain p-2" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xl font-bold text-slate-400">
              {tool.name.charAt(0)}
            </div>
          )}
        </div>

        {/* MIDDLE: Content - flex-1 */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-slate-900 truncate">
            {tool.name}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {category} {isPremium && '• Premium'}
          </p>
          <p className="text-sm text-slate-600 mt-1 line-clamp-1">
            {tool.shortDescription || 'AI-powered HR solution'}
          </p>
          <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
            {pricing && <span>{pricing}</span>}
            {pricing && companySize && <span>•</span>}
            {companySize && <span>{companySize}</span>}
          </div>
        </div>

        {/* RIGHT: CTA - fixed width */}
        <div className="shrink-0">
          <div className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors group-hover:bg-blue-700">
            View →
          </div>
        </div>
      </div>
    </Link>
  );
}

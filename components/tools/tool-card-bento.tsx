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

export function ToolCardBento({ tool, referrerSlug }: ToolCardProps) {
  const detailUrl = referrerSlug
    ? `/tools/${tool.slug}?from=${referrerSlug}`
    : `/tools/${tool.slug}`;

  const pricing = formatPricing(tool);
  const companySize = formatCompanySize(tool);
  const category = getCategoryLabel(tool);
  const isPremium = checkPremium(tool);
  const { hasTrial } = getTrialInfo(tool);

  const logoUrl = (() => {
    if (typeof tool.logoUrl === 'string') return tool.logoUrl;
    if (Array.isArray(tool.logoUrl) && tool.logoUrl.length > 0) {
      return (tool.logoUrl[0] as { url?: string })?.url || '';
    }
    return '';
  })();

  return (
    <Link href={detailUrl}>
      <div className="group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:shadow-xl">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 gap-3">
          {/* Box 1: Logo */}
          <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
            {logoUrl ? (
              <Image src={logoUrl} alt={tool.name} fill className="object-contain p-2" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-slate-400">
                {tool.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Box 2: Category + Premium */}
          <div className="flex flex-col justify-center rounded-xl bg-blue-50 px-4 py-3 ring-1 ring-blue-100">
            <div className="text-xs font-semibold uppercase tracking-wide text-blue-900">
              {category}
            </div>
            {isPremium && (
              <div className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white">
                ★ Premium
              </div>
            )}
          </div>

          {/* Box 3: Name - spans 2 columns */}
          <div className="col-span-2 rounded-xl bg-slate-900 px-4 py-3 ring-1 ring-slate-800">
            <h3 className="text-lg font-bold text-white leading-tight">
              {tool.name}
            </h3>
          </div>

          {/* Box 4: Pricing */}
          <div className="flex flex-col justify-center rounded-xl bg-emerald-50 px-4 py-3 ring-1 ring-emerald-100">
            <div className="text-xs font-medium text-emerald-700">Pricing</div>
            <div className="mt-1 text-sm font-bold text-emerald-900">
              {pricing || 'Contact'}
            </div>
          </div>

          {/* Box 5: Company Size */}
          <div className="flex flex-col justify-center rounded-xl bg-purple-50 px-4 py-3 ring-1 ring-purple-100">
            <div className="text-xs font-medium text-purple-700">Best For</div>
            <div className="mt-1 text-sm font-bold text-purple-900 line-clamp-1">
              {companySize || 'All sizes'}
            </div>
          </div>

          {/* Box 6: Description - spans 2 columns */}
          <div className="col-span-2 rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-100">
            <p className="text-xs text-slate-700 leading-relaxed line-clamp-2">
              {tool.shortDescription || 'AI-powered HR solution for modern teams'}
            </p>
          </div>

          {/* Box 7: Features */}
          <div className="flex items-center gap-2 rounded-xl bg-orange-50 px-3 py-2 ring-1 ring-orange-100">
            <svg className="h-4 w-4 shrink-0 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-medium text-orange-900">
              {hasTrial ? 'Free Trial' : 'No Trial'}
            </span>
          </div>

          {/* Box 8: CTA */}
          <div className="flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white ring-1 ring-blue-500 transition-all group-hover:bg-blue-700">
            View →
          </div>
        </div>
      </div>
    </Link>
  );
}

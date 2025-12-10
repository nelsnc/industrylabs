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

export function ToolCardStatsHero({ tool, referrerSlug }: ToolCardProps) {
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
      <div className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-lg">
        {/* PRICE HUGE AT TOP */}
        <div className="text-center">
          <div className="text-5xl font-bold text-blue-600">
            {pricing || 'Contact'}
          </div>
          <div className="mt-2 text-sm font-medium text-slate-500 uppercase tracking-wide">
            Annual Pricing
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-slate-200" />

        {/* Tool info below */}
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-50">
            {logoUrl ? (
              <Image src={logoUrl} alt={tool.name} fill className="object-contain p-1.5" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-lg font-bold text-slate-400">
                {tool.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-900 leading-tight">
              {tool.name}
            </h3>
            <p className="text-xs text-slate-500 uppercase tracking-wide">
              {category} {isPremium && '• Premium'}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 text-sm text-slate-600 leading-relaxed line-clamp-2">
          {tool.shortDescription || 'AI-powered HR solution for modern teams'}
        </p>

        {/* Stats */}
        <div className="mt-4 flex items-center justify-around rounded-lg bg-slate-50 p-3 text-center">
          <div>
            <div className="text-lg font-bold text-slate-900">
              {companySize ? companySize.split(' ')[0] : 'All'}
            </div>
            <div className="text-xs text-slate-500">Company Size</div>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div>
            <div className="text-lg font-bold text-slate-900">
              {tool.freeTrialAvailable ? 'Yes' : 'No'}
            </div>
            <div className="text-xs text-slate-500">Free Trial</div>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA */}
        <div className="mt-4">
          <div className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors group-hover:bg-slate-800">
            Get Details
          </div>
        </div>
      </div>
    </Link>
  );
}

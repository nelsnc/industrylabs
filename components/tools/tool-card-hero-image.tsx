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

export function ToolCardHeroImage({ tool, referrerSlug }: ToolCardProps) {
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
      <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-xl">
        {/* TOP: Large preview image */}
        <div className="relative h-48 w-full bg-gradient-to-br from-blue-50 via-purple-50 to-slate-100">
          <div className="absolute inset-0 flex items-center justify-center">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={tool.name}
                width={80}
                height={80}
                className="object-contain drop-shadow-lg"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-4xl font-bold text-slate-400 shadow-lg">
                {tool.name.charAt(0)}
              </div>
            )}
          </div>
          {isPremium && (
            <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-lg ring-1 ring-blue-500/20">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Premium
            </div>
          )}
        </div>

        {/* BOTTOM: Minimal content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-slate-900">
            {tool.name}
          </h3>
          <p className="mt-1 text-sm text-slate-600 line-clamp-2">
            {tool.shortDescription || 'AI-powered HR solution for modern teams'}
          </p>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            {pricing && <span>{pricing}</span>}
            {companySize && <span>{companySize}</span>}
          </div>
          <div className="mt-4">
            <div className="w-full rounded-lg bg-slate-900 py-2 text-center text-sm font-medium text-white transition-colors group-hover:bg-slate-800">
              View Full Profile
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

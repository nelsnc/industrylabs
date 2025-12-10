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

export function ToolCardFloating({ tool, referrerSlug }: ToolCardProps) {
  const detailUrl = referrerSlug
    ? `/tools/${tool.slug}?from=${referrerSlug}`
    : `/tools/${tool.slug}`;

  const pricing = formatPricing(tool);
  const companySize = formatCompanySize(tool);
  const { hasTrial, duration } = getTrialInfo(tool);
  const compliance = getComplianceBadges(tool);
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
      <div className="group relative flex h-full flex-col">
        {/* Main card - appears to float */}
        <div className="relative flex flex-col rounded-2xl bg-white p-7 shadow-2xl shadow-slate-900/25 transition-all duration-300 transform-gpu group-hover:-translate-y-2 group-hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.35)]">
          {/* Floating indicator */}
          <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/50 transition-all group-hover:scale-110 group-hover:shadow-xl">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>

          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-50 shadow-md">
              {logoUrl ? (
                <Image src={logoUrl} alt={tool.name} fill className="object-contain p-2.5" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-slate-400">
                  {tool.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-slate-900 leading-tight">
                {tool.name}
              </h3>
              <div className="mt-1 flex items-center gap-2 text-xs text-slate-600">
                <span className="uppercase tracking-wider font-medium">{category}</span>
                {isPremium && (
                  <>
                    <span>•</span>
                    <span className="font-semibold text-blue-600">Premium</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="mt-5 text-sm text-slate-700 leading-relaxed line-clamp-2">
            {tool.shortDescription || 'AI-powered HR solution for modern teams'}
          </p>

          {/* Metadata with shadow boxes */}
          <div className="mt-6 space-y-3">
            {pricing && (
              <div className="rounded-lg bg-slate-50 px-4 py-2.5 shadow-sm">
                <div className="text-xs font-medium text-slate-500">Pricing</div>
                <div className="mt-0.5 text-sm font-semibold text-slate-900">{pricing}</div>
              </div>
            )}
            {companySize && (
              <div className="rounded-lg bg-slate-50 px-4 py-2.5 shadow-sm">
                <div className="text-xs font-medium text-slate-500">Company Size</div>
                <div className="mt-0.5 text-sm font-semibold text-slate-900">{companySize}</div>
              </div>
            )}
            {freeTrialText && (
              <div className="rounded-lg bg-emerald-50 px-4 py-2.5 shadow-sm">
                <div className="text-xs font-medium text-emerald-700">{freeTrialText}</div>
              </div>
            )}
          </div>

          {/* Compliance badges */}
          {compliance && compliance.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {compliance.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1 min-h-4" />

          {/* CTA with extra shadow */}
          <div className="mt-6">
            <div className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-3 text-center text-sm font-bold text-white shadow-xl shadow-blue-600/30 transition-all group-hover:shadow-2xl group-hover:shadow-blue-600/40">
              Explore Full Profile
            </div>
          </div>
        </div>

        {/* Shadow plane underneath */}
        <div className="absolute inset-0 -z-10 translate-y-4 rounded-2xl bg-gradient-to-b from-slate-900/10 to-transparent blur-2xl transition-all group-hover:translate-y-6 group-hover:blur-3xl" />
      </div>
    </Link>
  );
}

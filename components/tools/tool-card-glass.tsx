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

export function ToolCardGlass({ tool, referrerSlug }: ToolCardProps) {
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
      <div
        className="group relative flex h-full flex-col rounded-2xl border border-white/20 bg-white/80 p-6 shadow-lg shadow-blue-500/10 backdrop-blur-md transition-all hover:bg-white/90 hover:shadow-xl hover:shadow-blue-500/20"
        style={{ backdropFilter: 'blur(12px)' }}
      >
        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />

        {/* Content */}
        <div className="relative">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white/60 shadow-sm backdrop-blur-sm">
              {logoUrl ? (
                <Image src={logoUrl} alt={tool.name} fill className="object-contain p-2" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xl font-bold text-slate-400">
                  {tool.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-slate-900 leading-tight">
                {tool.name}
              </h3>
              <div className="mt-1 flex items-center gap-2 text-xs text-slate-600">
                <span className="uppercase tracking-wider">{category}</span>
                {isPremium && (
                  <>
                    <span>•</span>
                    <span className="font-medium text-blue-600">Premium</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 text-sm text-slate-700 leading-relaxed line-clamp-2">
            {tool.shortDescription || 'AI-powered HR solution for modern teams'}
          </p>

          {/* Metadata */}
          <div className="mt-5 space-y-2 text-sm text-slate-700">
            {pricing && <div className="font-medium">{pricing}</div>}
            {companySize && <div>{companySize}</div>}
            {freeTrialText && <div className="text-slate-600">{freeTrialText}</div>}
          </div>

          {/* Compliance */}
          {compliance && compliance.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {compliance.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full bg-white/60 px-2.5 py-0.5 text-xs font-medium text-slate-700 backdrop-blur-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          )}

          {/* Spacer */}
          <div className="h-6" />

          {/* CTA */}
          <div className="mt-5">
            <div className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all group-hover:shadow-xl group-hover:shadow-blue-500/40">
              View Full Profile
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

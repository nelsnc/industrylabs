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

export function ToolCardTerminal({ tool, referrerSlug }: ToolCardProps) {
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
      <div className="group flex h-full flex-col overflow-hidden rounded-lg border-2 border-emerald-500/30 bg-slate-950 p-4 font-mono text-sm shadow-lg shadow-emerald-500/20 transition-all hover:border-emerald-500/60 hover:shadow-xl hover:shadow-emerald-500/30">
        {/* Terminal header */}
        <div className="mb-3 flex items-center gap-2 border-b border-emerald-500/30 pb-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </div>
          <span className="text-xs text-emerald-400">bash - tool-viewer</span>
        </div>

        {/* Terminal content */}
        <div className="flex-1 space-y-2 text-emerald-400">
          {/* Command */}
          <div className="flex items-center gap-2">
            <span className="text-emerald-500">$</span>
            <span className="text-emerald-300">cat tool.info</span>
          </div>

          {/* Tool info */}
          <div className="ml-4 space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              {logoUrl && (
                <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded bg-slate-900 ring-1 ring-emerald-500/30">
                  <Image src={logoUrl} alt={tool.name} fill className="object-contain p-1" />
                </div>
              )}
              <span className="text-emerald-300">
                <span className="text-emerald-500">name:</span> "{tool.name}"
              </span>
            </div>
            <div>
              <span className="text-emerald-500">category:</span> "{category}"
            </div>
            {isPremium && (
              <div>
                <span className="text-emerald-500">tier:</span> <span className="text-yellow-400">"PREMIUM"</span>
              </div>
            )}
            <div>
              <span className="text-emerald-500">description:</span> "{tool.shortDescription || 'AI-powered HR solution'}"
            </div>
            {pricing && (
              <div>
                <span className="text-emerald-500">pricing:</span> "{pricing}"
              </div>
            )}
            {companySize && (
              <div>
                <span className="text-emerald-500">company_size:</span> "{companySize}"
              </div>
            )}
          </div>

          {/* Command prompt */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-emerald-500">$</span>
            <span className="text-emerald-300">./view-details.sh</span>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Output */}
          <div className="mt-4 rounded bg-emerald-500/10 px-3 py-2 text-center text-xs text-emerald-400 ring-1 ring-emerald-500/30 transition-all group-hover:bg-emerald-500/20 group-hover:text-emerald-300">
            → Press ENTER to view full profile
          </div>
        </div>
      </div>
    </Link>
  );
}

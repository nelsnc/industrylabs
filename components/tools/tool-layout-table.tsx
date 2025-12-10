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

interface ToolLayoutTableProps {
  tools: Tool[];
}

export function ToolLayoutTable({ tools }: ToolLayoutTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full border-collapse bg-white">
        {/* Sticky header */}
        <thead className="sticky top-0 bg-slate-50 z-10">
          <tr className="border-b-2 border-slate-200">
            <th className="text-left p-4 text-sm font-semibold text-slate-900 whitespace-nowrap">
              Tool
            </th>
            <th className="text-left p-4 text-sm font-semibold text-slate-900 whitespace-nowrap">
              Category
            </th>
            <th className="text-left p-4 text-sm font-semibold text-slate-900 whitespace-nowrap">
              Company Size
            </th>
            <th className="text-left p-4 text-sm font-semibold text-slate-900 whitespace-nowrap">
              Pricing
            </th>
            <th className="text-center p-4 text-sm font-semibold text-slate-900 whitespace-nowrap">
              GDPR
            </th>
            <th className="text-center p-4 text-sm font-semibold text-slate-900 whitespace-nowrap">
              SOC2
            </th>
            <th className="text-center p-4 text-sm font-semibold text-slate-900 whitespace-nowrap">
              Free Trial
            </th>
            <th className="text-center p-4 text-sm font-semibold text-slate-900 whitespace-nowrap">
              Action
            </th>
          </tr>
        </thead>

        {/* Scrollable body */}
        <tbody>
          {tools.map((tool) => {
            const pricing = formatPricing(tool);
            const companySize = formatCompanySize(tool);
            const category = getCategoryLabel(tool);
            const isPremium = checkPremium(tool);
            const { hasTrial, duration } = getTrialInfo(tool);

            const logoUrl = (() => {
              if (typeof tool.logoUrl === 'string') return tool.logoUrl;
              if (Array.isArray(tool.logoUrl) && tool.logoUrl.length > 0) {
                return (tool.logoUrl[0] as { url?: string })?.url || '';
              }
              return '';
            })();

            return (
              <tr
                key={tool.id}
                className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
              >
                {/* Tool name + logo */}
                <td className="p-4">
                  <Link href={`/tools/${tool.slug}`} className="flex items-center gap-3 min-w-[200px]">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-50">
                      {logoUrl ? (
                        <Image src={logoUrl} alt={tool.name} fill className="object-contain p-1" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm font-bold text-slate-400">
                          {tool.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-slate-900 truncate">{tool.name}</div>
                      {isPremium && (
                        <div className="text-xs text-blue-600 font-medium">Premium</div>
                      )}
                    </div>
                  </Link>
                </td>

                {/* Category */}
                <td className="p-4">
                  <span className="text-sm text-slate-600 whitespace-nowrap">{category}</span>
                </td>

                {/* Company size */}
                <td className="p-4">
                  <span className="text-sm text-slate-600 whitespace-nowrap">{companySize}</span>
                </td>

                {/* Pricing */}
                <td className="p-4">
                  <span className="text-sm text-slate-900 font-medium whitespace-nowrap">{pricing}</span>
                </td>

                {/* GDPR */}
                <td className="p-4 text-center">
                  {tool.gdprCompliant ? (
                    <span className="text-emerald-600 text-xl">✓</span>
                  ) : (
                    <span className="text-slate-300 text-xl">—</span>
                  )}
                </td>

                {/* SOC2 */}
                <td className="p-4 text-center">
                  {tool.soc2Certified ? (
                    <span className="text-emerald-600 text-xl">✓</span>
                  ) : (
                    <span className="text-slate-300 text-xl">—</span>
                  )}
                </td>

                {/* Free trial */}
                <td className="p-4 text-center">
                  <span className="text-sm text-slate-600 whitespace-nowrap">
                    {hasTrial && duration ? `${duration} days` : '—'}
                  </span>
                </td>

                {/* CTA */}
                <td className="p-4 text-center">
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="inline-block px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
                  >
                    View
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

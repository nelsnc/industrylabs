'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Tool } from '@/lib/airtable-helpers';
import {
  formatPricing,
  formatCompanySize,
  isPremium as checkPremium,
} from '@/lib/utils/format-card-data-v4';

interface ToolLayoutMasonryProps {
  tools: Tool[];
}

export function ToolLayoutMasonry({ tools }: ToolLayoutMasonryProps) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
      {tools.map((tool, idx) => {
        const pricing = formatPricing(tool);
        const companySize = formatCompanySize(tool);
        const isPremium = checkPremium(tool);

        // Vary card heights for masonry effect
        const isLong = idx % 3 === 0;
        const isMedium = idx % 3 === 1;

        const logoUrl = (() => {
          if (typeof tool.logoUrl === 'string') return tool.logoUrl;
          if (Array.isArray(tool.logoUrl) && tool.logoUrl.length > 0) {
            return (tool.logoUrl[0] as { url?: string })?.url || '';
          }
          return '';
        })();

        return (
          <div
            key={tool.id}
            className="break-inside-avoid rounded-xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg hover:border-slate-300"
          >
            <Link href={`/tools/${tool.slug}`}>
              {/* Logo */}
              <div className="relative h-12 w-12 mb-4 overflow-hidden rounded-lg bg-slate-50">
                {logoUrl ? (
                  <Image src={logoUrl} alt={tool.name} fill className="object-contain p-1.5" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-lg font-bold text-slate-400">
                    {tool.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Name */}
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {tool.name}
              </h3>

              {/* Premium badge */}
              {isPremium && (
                <span className="inline-block text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium mb-2">
                  Premium
                </span>
              )}

              {/* Description - varies by card */}
              <p className={`text-sm text-slate-600 leading-relaxed ${isLong ? '' : 'line-clamp-3'}`}>
                {tool.shortDescription || 'AI-powered HR solution for modern teams'}
              </p>

              {/* Metadata badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                {pricing && (
                  <span className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-700">
                    {pricing}
                  </span>
                )}
                {companySize && (
                  <span className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-700">
                    {companySize}
                  </span>
                )}
              </div>

              {/* Conditional long content - case study quote */}
              {isLong && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-500 italic leading-relaxed">
                    "Reduced our hiring time by 40% in the first quarter. The AI-powered screening saved our HR team countless hours."
                  </p>
                  <p className="text-xs text-slate-600 font-medium mt-2">
                    — Sample Company, 200 employees
                  </p>
                </div>
              )}

              {/* CTA */}
              <div className="mt-4">
                <div className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                  View Details →
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

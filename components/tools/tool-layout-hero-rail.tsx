'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Tool } from '@/lib/airtable-helpers';
import {
  formatPricing,
  formatCompanySize,
  getComplianceBadges,
  isPremium as checkPremium,
} from '@/lib/utils/format-card-data-v4';

interface ToolLayoutHeroRailProps {
  tools: Tool[];
}

export function ToolLayoutHeroRail({ tools }: ToolLayoutHeroRailProps) {
  // Featured tool (first one)
  const heroTool = tools[0];
  // Alternative tools
  const alternatives = tools.slice(1, 7);

  const heroLogoUrl = (() => {
    if (typeof heroTool?.logoUrl === 'string') return heroTool.logoUrl;
    if (Array.isArray(heroTool?.logoUrl) && heroTool.logoUrl.length > 0) {
      return (heroTool.logoUrl[0] as { url?: string })?.url || '';
    }
    return '';
  })();

  const heroPricing = heroTool ? formatPricing(heroTool) : '';
  const heroCompanySize = heroTool ? formatCompanySize(heroTool) : '';
  const heroCompliance = heroTool ? getComplianceBadges(heroTool) : [];
  const heroIsPremium = heroTool ? checkPremium(heroTool) : false;

  return (
    <div className="space-y-8">
      {/* HERO: Featured Recommendation */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-blue-600 bg-gradient-to-br from-blue-50 to-white p-8">
        {/* Recommendation badge */}
        <div className="absolute top-6 right-6 flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-white shadow-lg">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-semibold">Recommended for You</span>
        </div>

        {heroTool && (
          <Link href={`/tools/${heroTool.slug}`} className="block">
            <div className="grid md:grid-cols-[300px_1fr] gap-8 items-start">
              {/* Left: Visual */}
              <div className="space-y-4">
                {/* Large logo */}
                <div className="relative h-40 w-40 mx-auto overflow-hidden rounded-3xl bg-white shadow-xl">
                  {heroLogoUrl ? (
                    <Image src={heroLogoUrl} alt={heroTool.name} fill className="object-contain p-6" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-6xl font-bold text-slate-400">
                      {heroTool.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Quick stats */}
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-700">
                    <svg className="h-4 w-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">98% customer satisfaction</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-700">
                    <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-medium">4.8/5 rating (2.3K reviews)</span>
                  </div>
                </div>
              </div>

              {/* Right: Content */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl font-bold text-slate-900 mb-3">
                    {heroTool.name}
                  </h2>
                  {heroIsPremium && (
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                      Premium Partner
                    </span>
                  )}
                </div>

                <p className="text-lg text-slate-700 leading-relaxed">
                  {heroTool.shortDescription || 'AI-powered HR solution for modern teams'}
                </p>

                {/* Key features */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{heroPricing}</div>
                      <div className="text-sm text-slate-600">Transparent pricing</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0 .656.126 1.283.356 1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Best for {heroCompanySize}</div>
                      <div className="text-sm text-slate-600">Scalable solution</div>
                    </div>
                  </div>
                </div>

                {/* Compliance */}
                {heroCompliance.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {heroCompliance.map((badge) => (
                      <span key={badge} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium">
                        {badge} Compliant
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <div className="flex gap-4 pt-4">
                  <button className="flex-1 rounded-xl bg-blue-600 px-6 py-4 font-bold text-white hover:bg-blue-700 transition-colors">
                    Get Started →
                  </button>
                  <button className="px-6 py-4 rounded-xl border-2 border-slate-300 font-semibold text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-colors">
                    Compare
                  </button>
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>

      {/* RAIL: Alternative Options */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-slate-900">Other Top Options</h3>
          <span className="text-sm text-slate-600">{alternatives.length} alternatives</span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {alternatives.map((tool) => {
            const pricing = formatPricing(tool);

            const logoUrl = (() => {
              if (typeof tool.logoUrl === 'string') return tool.logoUrl;
              if (Array.isArray(tool.logoUrl) && tool.logoUrl.length > 0) {
                return (tool.logoUrl[0] as { url?: string })?.url || '';
              }
              return '';
            })();

            return (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="p-6 rounded-xl border border-slate-200 bg-white hover:border-blue-600 hover:shadow-lg transition-all"
              >
                {/* Logo */}
                <div className="relative h-16 w-16 mb-4 overflow-hidden rounded-xl bg-slate-50">
                  {logoUrl ? (
                    <Image src={logoUrl} alt={tool.name} fill className="object-contain p-2" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-lg font-bold text-slate-400">
                      {tool.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Name */}
                <h4 className="font-semibold text-slate-900 mb-2 truncate">
                  {tool.name}
                </h4>

                {/* Description */}
                <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                  {tool.shortDescription || 'AI-powered HR solution'}
                </p>

                {/* Pricing */}
                {pricing && (
                  <div className="text-sm font-medium text-blue-600">
                    {pricing}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

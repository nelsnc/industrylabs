'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Tool } from '@/lib/airtable-helpers';

interface ToolCardPrimaryProps {
  tool: Tool;
}

export function ToolCardPrimary({ tool }: ToolCardPrimaryProps) {
  const {
    slug,
    name,
    shortDescription,
    logoUrl,
    pricing,
    companySizeFit,
    tier,
  } = tool;

  const isPremium = tier === 'Premium';

  // Handle logoUrl which can be string or array
  const logoSrc = typeof logoUrl === 'string'
    ? logoUrl
    : Array.isArray(logoUrl) && logoUrl[0]?.url
    ? logoUrl[0].url
    : '/placeholder-logo.svg';

  // Format company size display
  const companySizeDisplay = companySizeFit && companySizeFit.length > 0
    ? companySizeFit.length === 1
      ? `${companySizeFit[0]} employees`
      : `${companySizeFit[0]}-${companySizeFit[companySizeFit.length - 1].split('-')[1]} employees`
    : 'All sizes';

  return (
    <Link href={`/tools/${slug}`} className="group block h-full">
      <div className="relative h-full flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-xl hover:-translate-y-1">

        {/* Hero Section - Large Logo Area with Gradient Background */}
        <div className="relative rounded-t-2xl bg-gradient-to-br from-slate-50 via-slate-100 to-slate-100 p-16 flex items-center justify-center min-h-[240px]">

          {/* Premium Badge - Absolute Top Right */}
          {isPremium && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm">
                Premium
              </span>
            </div>
          )}

          {/* Logo - Large, Centered */}
          <div className="relative h-32 w-32">
            <Image
              src={logoSrc}
              alt={`${name} logo`}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Content Section - White Background */}
        <div className="flex flex-1 flex-col p-6">

          {/* Tool Name - Large, Bold */}
          <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>

          {/* Description - 2 Lines Max, Relaxed Leading */}
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
            {shortDescription}
          </p>

          {/* Metadata Row - Pricing & Company Size */}
          <div className="flex items-center justify-between text-sm text-slate-500 mb-6 pt-2 border-t border-slate-100">
            <span className="font-medium">{pricing || 'Contact for pricing'}</span>
            <span>{companySizeDisplay}</span>
          </div>

          {/* CTA Button - Black, Full Width, Rounded */}
          <div className="w-full rounded-xl bg-slate-900 py-3 text-center text-sm font-semibold text-white transition-all duration-200 group-hover:bg-slate-800 group-hover:shadow-lg">
            View Full Profile
          </div>
        </div>
      </div>
    </Link>
  );
}

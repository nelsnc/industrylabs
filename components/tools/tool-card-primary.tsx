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
    <Link href={`/tools/${slug}`}>
      <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-xl">

        {/* Hero Section - Large Logo Area with Gradient Background */}
        <div className="relative h-48 w-full bg-gradient-to-br from-blue-50 via-purple-50 to-slate-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={logoSrc}
              alt={name}
              width={80}
              height={80}
              className="object-contain drop-shadow-lg"
            />
          </div>

          {/* Premium Badge - Absolute Top Right */}
          {isPremium && (
            <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-lg ring-1 ring-blue-500/20">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Premium
            </div>
          )}
        </div>

        {/* Content Section - Minimal, Clean */}
        <div className="p-5">
          {/* Tool Name */}
          <h3 className="text-lg font-semibold text-slate-900">
            {name}
          </h3>

          {/* Description - 2 Lines Max */}
          <p className="mt-1 text-sm text-slate-600 line-clamp-2">
            {shortDescription}
          </p>

          {/* Metadata Row - Pricing & Company Size */}
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>{pricing || 'Contact for pricing'}</span>
            <span>{companySizeDisplay}</span>
          </div>

          {/* CTA Button */}
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

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { DollarSign, Users, Clock } from 'lucide-react';
import type { Tool } from '@/lib/airtable-helpers';

interface ToolCardGradientAltProps {
  tool: Tool;
}

export function ToolCardGradientAlt({ tool }: ToolCardGradientAltProps) {
  const {
    slug,
    name,
    category,
    shortDescription,
    logoUrl,
    pricing,
    companySizeFit,
    freeTrialAvailable,
    freeTrialDurationDays,
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
      ? companySizeFit[0]
      : `${companySizeFit[0].split('-')[0]}-${companySizeFit[companySizeFit.length - 1].split('-')[1]}`
    : 'All sizes';

  // Format free trial
  const freeTrialDisplay = freeTrialAvailable && freeTrialDurationDays
    ? `${freeTrialDurationDays}-day free trial`
    : null;

  return (
    <Link href={`/tools/${slug}`} className="group block h-full">
      <div className="relative h-full flex flex-col rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">

        {/* Header Row - Logo + Name */}
        <div className="flex items-start gap-4 mb-4">
          {/* Logo with White Border */}
          <div className="relative h-16 w-16 flex-shrink-0 rounded-xl bg-white p-2 ring-2 ring-white/20">
            <Image
              src={logoSrc}
              alt={`${name} logo`}
              fill
              className="object-contain"
            />
          </div>

          {/* Name + Category */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white mb-1">
              {name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <span>{category}</span>
              {isPremium && (
                <>
                  <span>•</span>
                  <span>Premium</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Description - White Text */}
        <p className="text-white/90 text-sm leading-relaxed line-clamp-2 mb-6 flex-1">
          {shortDescription}
        </p>

        {/* Metadata with Icons */}
        <div className="space-y-2 mb-6">
          {pricing && (
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <DollarSign className="h-4 w-4" />
              <span>{pricing}</span>
            </div>
          )}
          {companySizeFit && (
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <Users className="h-4 w-4" />
              <span>{companySizeDisplay} employees</span>
            </div>
          )}
          {freeTrialDisplay && (
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <Clock className="h-4 w-4" />
              <span>{freeTrialDisplay}</span>
            </div>
          )}
        </div>

        {/* CTA Button - White on Gradient */}
        <div className="w-full rounded-xl bg-white py-3 text-center text-sm font-semibold text-blue-600 transition-all duration-200 hover:bg-white/95 hover:shadow-xl">
          Explore Tool →
        </div>
      </div>
    </Link>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Tool } from '@/lib/airtable-helpers';

interface ToolLayoutTimelineProps {
  tools: Tool[];
}

const TIME_BUCKETS = [
  { id: 'instant', label: 'Ready Today', description: '< 1 week setup', icon: '⚡', weeks: 1 },
  { id: 'quick', label: 'Quick Start', description: '1-2 weeks setup', icon: '🚀', weeks: 2 },
  { id: 'standard', label: 'Standard Setup', description: '2-4 weeks', icon: '📅', weeks: 4 },
  { id: 'complex', label: 'Full Implementation', description: '1-3 months', icon: '🏗️', weeks: 12 },
];

export function ToolLayoutTimeline({ tools }: ToolLayoutTimelineProps) {
  // Distribute tools across timeline
  const toolsByTime = TIME_BUCKETS.map((bucket, idx) => ({
    ...bucket,
    tools: tools.filter((_, i) => i % 4 === idx).slice(0, 4),
  }));

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 right-0 top-16 h-1 bg-gradient-to-r from-emerald-300 via-blue-300 via-purple-300 to-orange-300" />

      <div className="relative space-y-12">
        {toolsByTime.map((bucket, bucketIdx) => {
          const isEven = bucketIdx % 2 === 0;

          return (
            <div key={bucket.id} className="relative">
              {/* Timeline dot */}
              <div
                className="absolute left-1/2 -translate-x-1/2 z-10"
                style={{ top: isEven ? '-20px' : 'auto', bottom: isEven ? 'auto' : '-20px' }}
              >
                <div className="h-10 w-10 rounded-full bg-white border-4 border-blue-600 flex items-center justify-center text-xl shadow-lg">
                  {bucket.icon}
                </div>
              </div>

              {/* Content container */}
              <div className={`flex ${isEven ? 'flex-row' : 'flex-row-reverse'} items-start gap-8`}>
                {/* Time label side */}
                <div className={`w-1/3 ${isEven ? 'text-right pr-8' : 'text-left pl-8'} pt-8`}>
                  <div className="inline-block">
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">
                      {bucket.label}
                    </h3>
                    <p className="text-sm text-slate-600 mb-2">{bucket.description}</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{bucket.weeks} weeks</span>
                    </div>
                  </div>
                </div>

                {/* Tools side */}
                <div className="w-2/3">
                  <div className="grid grid-cols-2 gap-4">
                    {bucket.tools.map((tool) => {
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
                          className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-600 hover:shadow-lg transition-all"
                        >
                          <div className="flex items-start gap-3">
                            {/* Logo */}
                            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-50">
                              {logoUrl ? (
                                <Image src={logoUrl} alt={tool.name} fill className="object-contain p-1.5" />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-sm font-bold text-slate-400">
                                  {tool.name.charAt(0)}
                                </div>
                              )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-slate-900 text-sm truncate">
                                {tool.name}
                              </h4>
                              <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                                {tool.shortDescription || 'AI-powered HR solution'}
                              </p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

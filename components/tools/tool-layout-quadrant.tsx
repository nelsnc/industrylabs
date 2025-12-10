'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Tool } from '@/lib/airtable-helpers';

interface ToolLayoutQuadrantProps {
  tools: Tool[];
}

export function ToolLayoutQuadrant({ tools }: ToolLayoutQuadrantProps) {
  // Distribute tools into 4 quadrants based on pricing and company size
  const quadrants = [
    {
      id: 'low-price-small',
      label: 'Budget-Friendly for Small Teams',
      xLabel: 'Lower Cost',
      yLabel: 'Small Teams',
      position: 'top-left',
      color: 'emerald',
      tools: tools.filter((t, i) => i % 4 === 0).slice(0, 6),
    },
    {
      id: 'high-price-small',
      label: 'Premium for Small Teams',
      xLabel: 'Higher Cost',
      yLabel: 'Small Teams',
      position: 'top-right',
      color: 'blue',
      tools: tools.filter((t, i) => i % 4 === 1).slice(0, 6),
    },
    {
      id: 'low-price-large',
      label: 'Budget-Friendly for Enterprise',
      xLabel: 'Lower Cost',
      yLabel: 'Enterprise',
      position: 'bottom-left',
      color: 'purple',
      tools: tools.filter((t, i) => i % 4 === 2).slice(0, 6),
    },
    {
      id: 'high-price-large',
      label: 'Premium Enterprise Solutions',
      xLabel: 'Higher Cost',
      yLabel: 'Enterprise',
      position: 'bottom-right',
      color: 'orange',
      tools: tools.filter((t, i) => i % 4 === 3).slice(0, 6),
    },
  ];

  return (
    <div className="relative">
      {/* Axis labels */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 text-sm font-semibold text-slate-600">
        ← Lower Cost | Higher Cost →
      </div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-24 -rotate-90 text-sm font-semibold text-slate-600 whitespace-nowrap">
        ← Small Teams | Enterprise →
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 gap-6">
        {quadrants.map((quadrant) => {
          const logoUrl = (tool: Tool) => {
            if (typeof tool.logoUrl === 'string') return tool.logoUrl;
            if (Array.isArray(tool.logoUrl) && tool.logoUrl.length > 0) {
              return (tool.logoUrl[0] as { url?: string })?.url || '';
            }
            return '';
          };

          return (
            <div
              key={quadrant.id}
              className={`relative rounded-2xl border-2 border-${quadrant.color}-200 bg-${quadrant.color}-50/30 p-6 min-h-[400px]`}
            >
              {/* Quadrant header */}
              <div className="mb-4">
                <h3 className={`text-lg font-bold text-${quadrant.color}-900 mb-1`}>
                  {quadrant.label}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="font-medium">{quadrant.xLabel}</span>
                  <span>•</span>
                  <span className="font-medium">{quadrant.yLabel}</span>
                </div>
              </div>

              {/* Tools in this quadrant */}
              <div className="grid grid-cols-2 gap-3">
                {quadrant.tools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.slug}`}
                    className="p-3 rounded-lg border border-slate-200 bg-white hover:border-blue-600 hover:shadow-md transition-all"
                  >
                    {/* Logo */}
                    <div className="relative h-10 w-10 mb-2 overflow-hidden rounded-lg bg-slate-50 mx-auto">
                      {logoUrl(tool) ? (
                        <Image src={logoUrl(tool)} alt={tool.name} fill className="object-contain p-1" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm font-bold text-slate-400">
                          {tool.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <h4 className="text-xs font-semibold text-slate-900 text-center truncate">
                      {tool.name}
                    </h4>
                  </Link>
                ))}
              </div>

              {/* Quadrant badge */}
              <div className={`absolute top-4 right-4 h-3 w-3 rounded-full bg-${quadrant.color}-600`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

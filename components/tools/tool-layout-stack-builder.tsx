'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Tool } from '@/lib/airtable-helpers';
import {
  formatPricing,
} from '@/lib/utils/format-card-data-v4';

interface ToolLayoutStackBuilderProps {
  tools: Tool[];
}

export function ToolLayoutStackBuilder({ tools }: ToolLayoutStackBuilderProps) {
  const [selectedTools, setSelectedTools] = useState<Tool[]>([]);

  const toggleTool = (tool: Tool) => {
    setSelectedTools((prev) =>
      prev.find((t) => t.id === tool.id)
        ? prev.filter((t) => t.id !== tool.id)
        : [...prev, tool]
    );
  };

  const totalCost = selectedTools.reduce((sum, tool) => {
    const min = tool.pricingAnnualMin || 0;
    return sum + min;
  }, 0);

  return (
    <div className="grid lg:grid-cols-[1fr_400px] gap-8">
      {/* LEFT: Available Tools Directory */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Available Tools</h3>
            <p className="text-sm text-slate-600 mt-1">Click to add to your stack</p>
          </div>
          <div className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-medium">
            {tools.length} tools
          </div>
        </div>

        <div className="grid gap-3">
          {tools.map((tool) => {
            const isSelected = selectedTools.find((t) => t.id === tool.id);
            const pricing = formatPricing(tool);

            const logoUrl = (() => {
              if (typeof tool.logoUrl === 'string') return tool.logoUrl;
              if (Array.isArray(tool.logoUrl) && tool.logoUrl.length > 0) {
                return (tool.logoUrl[0] as { url?: string })?.url || '';
              }
              return '';
            })();

            return (
              <button
                key={tool.id}
                onClick={() => toggleTool(tool)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Checkbox */}
                  <div className={`h-6 w-6 rounded-md border-2 flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                  }`}>
                    {isSelected && (
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>

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
                    <h4 className="font-semibold text-slate-900 truncate">{tool.name}</h4>
                    <p className="text-xs text-slate-600 truncate">{tool.category}</p>
                  </div>

                  {/* Price */}
                  <div className="text-right shrink-0">
                    <div className="text-sm font-semibold text-slate-900">{pricing}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT: Your Stack */}
      <div className="lg:sticky lg:top-6 h-fit">
        <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-6 shadow-xl">
          <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span>🛠️</span>
            <span>Your HR Stack</span>
          </h3>

          {selectedTools.length === 0 ? (
            <div className="py-12 text-center">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-slate-600">
                No tools selected yet
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Click tools from the left to build your stack
              </p>
            </div>
          ) : (
            <>
              {/* Selected tools list */}
              <div className="space-y-3 mb-6">
                {selectedTools.map((tool) => {
                  const pricing = formatPricing(tool);

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
                      className="flex items-center gap-3 p-3 rounded-lg bg-white border border-blue-200"
                    >
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-50">
                        {logoUrl ? (
                          <Image src={logoUrl} alt={tool.name} fill className="object-contain p-1" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs font-bold text-slate-400">
                            {tool.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-slate-900 text-sm truncate">{tool.name}</div>
                        <div className="text-xs text-slate-600">{pricing}</div>
                      </div>
                      <button
                        onClick={() => toggleTool(tool)}
                        className="shrink-0 p-1 hover:bg-red-100 rounded transition-colors"
                      >
                        <svg className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Summary */}
              <div className="border-t-2 border-blue-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Tools selected:</span>
                  <span className="font-semibold text-slate-900">{selectedTools.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-900 font-medium">Estimated annual cost:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    £{(totalCost / 1000).toFixed(0)}K+
                  </span>
                </div>
              </div>

              {/* CTA */}
              <button className="w-full mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition-colors">
                Request Quote for This Stack →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

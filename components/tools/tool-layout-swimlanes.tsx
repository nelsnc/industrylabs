'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Tool } from '@/lib/airtable-helpers';
import {
  formatPricing,
} from '@/lib/utils/format-card-data-v4';

interface ToolLayoutSwimlanesProps {
  tools: Tool[];
}

const PERSONAS = [
  {
    id: 'startup',
    label: 'Startups & Small Teams',
    icon: '🚀',
    description: '1-50 employees',
    color: 'blue',
  },
  {
    id: 'growth',
    label: 'Growth Companies',
    icon: '📈',
    description: '51-200 employees',
    color: 'purple',
  },
  {
    id: 'enterprise',
    label: 'Enterprise',
    icon: '🏢',
    description: '201+ employees',
    color: 'slate',
  },
];

export function ToolLayoutSwimlanes({ tools }: ToolLayoutSwimlanesProps) {
  // Group tools by company size fit
  const toolsByPersona = PERSONAS.map((persona) => {
    const personaTools = tools.filter((tool) => {
      const sizes = tool.idealCompanySize || [];
      if (persona.id === 'startup') return sizes.includes('1-50');
      if (persona.id === 'growth') return sizes.includes('51-200');
      if (persona.id === 'enterprise') return sizes.includes('201-500') || sizes.includes('500+');
      return true;
    });

    return {
      ...persona,
      tools: personaTools.length > 0 ? personaTools : tools.slice(0, 3), // Fallback to first 3
    };
  });

  return (
    <div className="space-y-6">
      {toolsByPersona.map((lane) => (
        <div key={lane.id} className="rounded-2xl border border-slate-200 bg-white p-6">
          {/* Lane header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="text-4xl">{lane.icon}</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900">{lane.label}</h3>
              <p className="text-sm text-slate-600">{lane.description}</p>
            </div>
            <div className={`px-4 py-2 rounded-lg bg-${lane.color}-50 text-${lane.color}-700 text-sm font-medium`}>
              {lane.tools.length} tools
            </div>
          </div>

          {/* Horizontal scroll of tools */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {lane.tools.map((tool) => {
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
                  className="shrink-0 w-64 p-5 rounded-xl border border-slate-200 bg-slate-50 hover:border-blue-600 hover:shadow-md hover:bg-white transition-all"
                >
                  {/* Logo */}
                  <div className="relative h-12 w-12 mb-3 overflow-hidden rounded-lg bg-white">
                    {logoUrl ? (
                      <Image src={logoUrl} alt={tool.name} fill className="object-contain p-1.5" />
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
                  <p className="text-xs text-slate-600 line-clamp-2 mb-3">
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
      ))}
    </div>
  );
}

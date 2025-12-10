'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Tool } from '@/lib/airtable-helpers';
import {
  formatPricing,
  formatCompanySize,
} from '@/lib/utils/format-card-data-v4';

interface ToolLayoutAccordionProps {
  tools: Tool[];
}

const USE_CASES = [
  {
    id: 'recruiting',
    title: 'Recruiting & Talent Acquisition',
    icon: '👥',
    description: 'Find, attract, and hire top talent faster',
    color: 'blue',
  },
  {
    id: 'onboarding',
    title: 'Employee Onboarding',
    icon: '🎯',
    description: 'Streamline new hire experience',
    color: 'emerald',
  },
  {
    id: 'performance',
    title: 'Performance Management',
    icon: '📊',
    description: 'Track goals, reviews, and development',
    color: 'purple',
  },
  {
    id: 'payroll',
    title: 'Payroll & Benefits',
    icon: '💰',
    description: 'Automate compensation and benefits admin',
    color: 'orange',
  },
];

export function ToolLayoutAccordion({ tools }: ToolLayoutAccordionProps) {
  const [openSection, setOpenSection] = useState<string | null>('recruiting');

  // Distribute tools across use cases
  const toolsByUseCase = USE_CASES.map((useCase, idx) => ({
    ...useCase,
    tools: tools.filter((_, i) => i % 4 === idx),
  }));

  return (
    <div className="space-y-3">
      {toolsByUseCase.map((section) => {
        const isOpen = openSection === section.id;

        return (
          <div
            key={section.id}
            className={`rounded-2xl border-2 transition-all ${
              isOpen
                ? `border-${section.color}-300 bg-${section.color}-50/50`
                : 'border-slate-200 bg-white'
            }`}
          >
            {/* Accordion Header */}
            <button
              onClick={() => setOpenSection(isOpen ? null : section.id)}
              className="w-full p-6 text-left flex items-center gap-4 hover:bg-slate-50/50 rounded-2xl transition-colors"
            >
              {/* Icon */}
              <div className={`text-4xl shrink-0 transition-transform ${isOpen ? 'scale-110' : ''}`}>
                {section.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  {section.title}
                </h3>
                <p className="text-sm text-slate-600">
                  {section.description}
                </p>
              </div>

              {/* Tools count badge */}
              <div className={`px-4 py-2 rounded-lg font-semibold text-sm shrink-0 ${
                isOpen
                  ? `bg-${section.color}-600 text-white`
                  : 'bg-slate-100 text-slate-700'
              }`}>
                {section.tools.length} tools
              </div>

              {/* Chevron */}
              <svg
                className={`h-6 w-6 text-slate-400 shrink-0 transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Accordion Content */}
            {isOpen && (
              <div className="px-6 pb-6 pt-2">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.tools.map((tool) => {
                    const pricing = formatPricing(tool);
                    const companySize = formatCompanySize(tool);

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
                        className="p-5 rounded-xl border border-slate-200 bg-white hover:border-blue-600 hover:shadow-lg transition-all"
                      >
                        {/* Logo */}
                        <div className="relative h-14 w-14 mb-4 overflow-hidden rounded-xl bg-slate-50">
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
                        <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                          {tool.shortDescription || 'AI-powered HR solution'}
                        </p>

                        {/* Metadata */}
                        <div className="space-y-1 text-xs text-slate-700">
                          {pricing && <div className="font-medium">{pricing}</div>}
                          {companySize && <div>{companySize}</div>}
                        </div>

                        {/* CTA */}
                        <div className="mt-4 pt-3 border-t border-slate-100">
                          <div className="text-sm font-medium text-blue-600 flex items-center gap-1">
                            <span>View Details</span>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

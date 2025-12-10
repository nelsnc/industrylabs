'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Tool } from '@/lib/airtable-helpers';
import {
  formatPricing,
  formatCompanySize,
} from '@/lib/utils/format-card-data-v4';

interface ToolLayoutCaseStudyProps {
  tools: Tool[];
}

const CASE_STUDIES = [
  {
    quote: "Reduced our time-to-hire by 45% and improved candidate quality significantly.",
    author: "Sarah Chen",
    role: "VP of People",
    company: "TechCorp",
    companySize: "250 employees",
    metric1: "45%", metric1Label: "Faster Hiring",
    metric2: "92%", metric2Label: "Retention Rate",
  },
  {
    quote: "The AI-powered screening saved our HR team 20 hours per week on resume reviews.",
    author: "Michael Rodriguez",
    role: "HR Director",
    company: "GrowthCo",
    companySize: "120 employees",
    metric1: "20hrs", metric1Label: "Time Saved/Week",
    metric2: "3x", metric2Label: "More Candidates",
  },
  {
    quote: "Onboarding completion time dropped from 2 weeks to 3 days. Game changer for remote teams.",
    author: "Emily Johnson",
    role: "Talent Operations Lead",
    company: "RemoteFirst Inc",
    companySize: "500+ employees",
    metric1: "3 days", metric1Label: "Onboarding Time",
    metric2: "98%", metric2Label: "Completion Rate",
  },
];

export function ToolLayoutCaseStudy({ tools }: ToolLayoutCaseStudyProps) {
  return (
    <div className="space-y-8">
      {tools.slice(0, 3).map((tool, idx) => {
        const caseStudy = CASE_STUDIES[idx % CASE_STUDIES.length];
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
          <div
            key={tool.id}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 transition-all hover:shadow-2xl"
          >
            {/* Decorative blob */}
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-100 opacity-40 blur-3xl" />

            <div className="relative grid md:grid-cols-2 gap-8">
              {/* Left: Case Study Story */}
              <div className="space-y-6">
                {/* Quote */}
                <div>
                  <div className="text-6xl text-blue-600 leading-none mb-4">"</div>
                  <blockquote className="text-xl font-medium text-slate-900 leading-relaxed italic">
                    {caseStudy.quote}
                  </blockquote>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                    {caseStudy.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{caseStudy.author}</div>
                    <div className="text-sm text-slate-600">{caseStudy.role}</div>
                    <div className="text-sm text-slate-500">
                      {caseStudy.company} • {caseStudy.companySize}
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                    <div className="text-3xl font-bold text-emerald-600">{caseStudy.metric1}</div>
                    <div className="text-sm text-emerald-800 font-medium mt-1">{caseStudy.metric1Label}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                    <div className="text-3xl font-bold text-blue-600">{caseStudy.metric2}</div>
                    <div className="text-sm text-blue-800 font-medium mt-1">{caseStudy.metric2Label}</div>
                  </div>
                </div>
              </div>

              {/* Right: Tool Details */}
              <div className="flex flex-col">
                <Link href={`/tools/${tool.slug}`} className="flex-1 space-y-4">
                  {/* Logo + Name */}
                  <div className="flex items-start gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-white shadow-lg">
                      {logoUrl ? (
                        <Image src={logoUrl} alt={tool.name} fill className="object-contain p-3" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-slate-400">
                          {tool.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {tool.category}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-700 leading-relaxed">
                    {tool.shortDescription || 'AI-powered HR solution for modern teams'}
                  </p>

                  {/* Details */}
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center gap-3">
                      <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-slate-700 font-medium">{pricing}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-sm text-slate-700 font-medium">Best for {companySize}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-6">
                    <div className="w-full rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition-all group-hover:bg-blue-700 group-hover:shadow-lg">
                      View Full Case Study →
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

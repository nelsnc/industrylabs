'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Tool } from '@/lib/airtable-helpers';
import {
  formatPricing,
} from '@/lib/utils/format-card-data-v4';

interface ToolLayoutSplitScreenProps {
  tools: Tool[];
}

export function ToolLayoutSplitScreen({ tools }: ToolLayoutSplitScreenProps) {
  const [formData, setFormData] = useState({
    companySize: '',
    budget: '',
    needs: '',
  });

  return (
    <div className="grid lg:grid-cols-2 gap-8 min-h-[800px]">
      {/* LEFT: Tools Directory */}
      <div className="lg:border-r lg:border-slate-200 lg:pr-8">
        <div className="sticky top-6 space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Browse All Tools
            </h2>
            <p className="text-slate-600">
              Explore {tools.length} HR solutions or tell us your needs →
            </p>
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search tools..."
              className="w-full px-4 py-3 pl-12 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Tools list - scrollable */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {tools.map((tool) => {
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
                  className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-600 hover:shadow-md transition-all"
                >
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
                  {pricing && (
                    <div className="text-sm font-medium text-blue-600 shrink-0">
                      {pricing}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT: Request Board Form */}
      <div className="lg:pl-8">
        <div className="sticky top-6 p-8 rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-xl">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 mb-4">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Free Personalized Recommendations</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Can't Find What You Need?
            </h2>
            <p className="text-slate-600">
              Tell us your requirements and we'll match you with the perfect tools in 24 hours.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            {/* Company size */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Company Size
              </label>
              <select
                value={formData.companySize}
                onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              >
                <option value="">Select size</option>
                <option value="1-50">1-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="500+">500+ employees</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Annual Budget
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
              >
                <option value="">Select budget</option>
                <option value="<5k">Less than £5K</option>
                <option value="5-20k">£5K - £20K</option>
                <option value="20-50k">£20K - £50K</option>
                <option value="50k+">£50K+</option>
              </select>
            </div>

            {/* Needs */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                What are you looking for?
              </label>
              <textarea
                value={formData.needs}
                onChange={(e) => setFormData({ ...formData, needs: e.target.value })}
                placeholder="E.g., We need an ATS that integrates with our HRIS and has AI screening..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
              />
            </div>

            {/* Features checklist */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Must-have features
              </label>
              <div className="space-y-2">
                {['GDPR Compliant', 'Free Trial Available', 'API Access', 'Mobile App'].map((feature) => (
                  <label key={feature} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                    <span className="text-sm text-slate-700">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 px-6 py-4 font-bold text-white hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Get My Recommendations →
            </button>

            {/* Trust indicators */}
            <div className="pt-4 border-t border-slate-200 text-center text-sm text-slate-600">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg className="h-5 w-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Free • No commitment • 24hr response</span>
              </div>
              <p className="text-xs">Join 2,500+ companies who found their perfect HR stack</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

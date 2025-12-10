'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Tool } from '@/lib/airtable-helpers';
import {
  formatPricing,
} from '@/lib/utils/format-card-data-v4';

interface ToolLayoutWorkflowProps {
  tools: Tool[];
}

const WORKFLOW_STAGES = [
  { id: 'attract', label: 'Attract Candidates', description: 'Job posting & sourcing', color: 'blue' },
  { id: 'screen', label: 'Screen & Assess', description: 'Resume & skills screening', color: 'purple' },
  { id: 'interview', label: 'Interview', description: 'Scheduling & video calls', color: 'emerald' },
  { id: 'offer', label: 'Offer & Onboard', description: 'E-signatures & onboarding', color: 'orange' },
];

export function ToolLayoutWorkflow({ tools }: ToolLayoutWorkflowProps) {
  // Distribute tools across stages
  const toolsByStage = WORKFLOW_STAGES.map((stage, idx) => ({
    ...stage,
    tools: tools.filter((_, i) => i % 4 === idx),
  }));

  return (
    <div className="relative">
      {/* Workflow arrow line */}
      <div className="absolute top-6 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 via-emerald-200 to-orange-200 -z-10" />

      <div className="flex gap-6 overflow-x-auto pb-6">
        {toolsByStage.map((stage) => (
          <div key={stage.id} className="shrink-0 w-80">
            {/* Column header */}
            <div className={`mb-4 p-4 rounded-xl bg-${stage.color}-50 border border-${stage.color}-200`}>
              <div className="flex items-center gap-2 mb-1">
                <div className={`h-3 w-3 rounded-full bg-${stage.color}-600`} />
                <h3 className={`text-lg font-semibold text-${stage.color}-900`}>
                  {stage.label}
                </h3>
              </div>
              <p className={`text-sm text-${stage.color}-700`}>
                {stage.description}
              </p>
            </div>

            {/* Tools in this stage */}
            <div className="space-y-3">
              {stage.tools.map((tool) => {
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
                    className="block p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-600 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-50">
                        {logoUrl ? (
                          <Image src={logoUrl} alt={tool.name} fill className="object-contain p-1.5" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-sm font-bold text-slate-400">
                            {tool.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-900 text-sm truncate">
                          {tool.name}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {tool.shortDescription || 'AI-powered HR solution'}
                        </p>
                        {pricing && (
                          <div className="text-xs text-slate-600 font-medium mt-2">
                            {pricing}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}

              {stage.tools.length === 0 && (
                <div className="p-4 text-center text-sm text-slate-400 border border-dashed border-slate-200 rounded-xl">
                  No tools in this stage
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

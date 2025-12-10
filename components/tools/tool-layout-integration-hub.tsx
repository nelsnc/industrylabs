'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Tool } from '@/lib/airtable-helpers';

interface ToolLayoutIntegrationHubProps {
  tools: Tool[];
}

const INTEGRATION_CATEGORIES = [
  { id: 'core', label: 'Core HR Platform', icon: '🎯', description: 'Central HRIS system', color: 'blue' },
  { id: 'recruiting', label: 'Recruiting Tools', icon: '👥', description: 'ATS & sourcing', color: 'emerald' },
  { id: 'payroll', label: 'Payroll & Benefits', icon: '💰', description: 'Compensation management', color: 'purple' },
  { id: 'learning', label: 'Learning & Development', icon: '📚', description: 'Training platforms', color: 'orange' },
  { id: 'performance', label: 'Performance Management', icon: '📊', description: 'Reviews & goals', color: 'pink' },
];

export function ToolLayoutIntegrationHub({ tools }: ToolLayoutIntegrationHubProps) {
  // Central hub tool (first tool)
  const hubTool = tools[0];

  // Distribute remaining tools
  const categorizedTools = INTEGRATION_CATEGORIES.map((cat, idx) => ({
    ...cat,
    tools: tools.slice(1).filter((_, i) => i % 5 === idx).slice(0, 3),
  }));

  const hubLogoUrl = (() => {
    if (typeof hubTool?.logoUrl === 'string') return hubTool.logoUrl;
    if (Array.isArray(hubTool?.logoUrl) && hubTool.logoUrl.length > 0) {
      return (hubTool.logoUrl[0] as { url?: string })?.url || '';
    }
    return '';
  })();

  return (
    <div className="relative min-h-[600px]">
      {/* Central Hub */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <Link
          href={`/tools/${hubTool?.slug || ''}`}
          className="block p-8 rounded-3xl border-4 border-blue-600 bg-white shadow-2xl hover:shadow-3xl hover:scale-105 transition-all"
        >
          <div className="relative h-24 w-24 mb-4 overflow-hidden rounded-2xl bg-blue-50 mx-auto">
            {hubLogoUrl ? (
              <Image src={hubLogoUrl} alt={hubTool?.name || ''} fill className="object-contain p-3" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-blue-600">
                {hubTool?.name?.charAt(0) || 'H'}
              </div>
            )}
          </div>
          <h3 className="text-xl font-bold text-slate-900 text-center mb-2">
            {hubTool?.name || 'Core HR Platform'}
          </h3>
          <p className="text-sm text-slate-600 text-center">
            Central integration hub
          </p>
        </Link>
      </div>

      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
        {categorizedTools.map((_, idx) => {
          const angle = (idx / categorizedTools.length) * 2 * Math.PI - Math.PI / 2;
          const radius = 250;
          const x1 = '50%';
          const y1 = '50%';
          const x2 = `calc(50% + ${Math.cos(angle) * radius}px)`;
          const y2 = `calc(50% + ${Math.sin(angle) * radius}px)`;

          return (
            <line
              key={idx}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#cbd5e1"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          );
        })}
      </svg>

      {/* Satellite tools in circle */}
      {categorizedTools.map((category, idx) => {
        const angle = (idx / categorizedTools.length) * 2 * Math.PI - Math.PI / 2;
        const radius = 250;
        const x = 50 + Math.cos(angle) * 40;
        const y = 50 + Math.sin(angle) * 40;

        return (
          <div
            key={category.id}
            className="absolute z-10"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className={`p-4 rounded-2xl border-2 border-${category.color}-200 bg-white shadow-lg w-56`}>
              {/* Category header */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{category.icon}</span>
                <div className="flex-1">
                  <h4 className={`font-semibold text-${category.color}-900 text-sm`}>
                    {category.label}
                  </h4>
                  <p className="text-xs text-slate-500">{category.description}</p>
                </div>
              </div>

              {/* Tools */}
              <div className="space-y-2">
                {category.tools.map((tool) => {
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
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded bg-slate-50">
                        {logoUrl ? (
                          <Image src={logoUrl} alt={tool.name} fill className="object-contain p-1" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs font-bold text-slate-400">
                            {tool.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <span className="text-xs font-medium text-slate-900 truncate">
                        {tool.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

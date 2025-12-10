import { ToolCard } from '@/components/tools/tool-card';
import type { Tool } from '@/lib/airtable-helpers';

// Mock tool data for testing
const mockTool: Tool = {
  id: '1',
  slug: 'example-tool',
  name: 'Example HR Tool',
  category: 'HR & Talent',
  shortDescription: 'Complete HR management platform with AI-powered insights for modern teams. Streamline recruitment, onboarding, and performance management.',
  logoUrl: '/placeholder-logo.svg',
  pricing: 'From £5K/year',
  tags: ['Premium'],
  companySizeFit: ['1-50', '51-200'],
  pricingAnnualMin: 5000,
  pricingAnnualMax: 15000,
  pricingCurrency: 'GBP',
  freeTrialAvailable: true,
  freeTrialDurationDays: 14,
  gdprCompliant: true,
  soc2Certified: true,
  iso27001Certified: true,
  verificationStatus: 'Verified',
  tier: 'Premium',
  idealCompanySize: ['1-50', '51-200'],
};

const radicalVariants = [
  { id: 'horizontal', name: 'Horizontal Split', description: 'Logo LEFT • Content MIDDLE • CTA RIGHT', emoji: '↔️' },
  { id: 'hero', name: 'Hero Image', description: 'Large visual at top • Image-first design', emoji: '🖼️' },
  { id: 'compact', name: 'Compact List', description: 'Ultra-dense • List view • 80px height', emoji: '📋' },
  { id: 'stats', name: 'Stats Hero', description: 'Price HUGE at top • Numbers dominate', emoji: '📊' },
  { id: 'glass', name: 'Glassmorphism', description: 'Frosted glass • backdrop-blur • Transparent', emoji: '💎' },
  { id: 'gradient', name: 'Gradient Background', description: 'Colorful • Blue to purple • White text', emoji: '🌈' },
  { id: 'terminal', name: 'Terminal', description: 'Code aesthetic • Monospace • Dark bg', emoji: '💻' },
  { id: 'editorial', name: 'Editorial Magazine', description: 'HUGE typography • Serif fonts • Asymmetric', emoji: '📰' },
  { id: 'bento', name: 'Bento Box Grid', description: 'CSS Grid tiles • Distinct boxes • Colorful sections', emoji: '🍱' },
  { id: 'floating', name: 'Floating Shadow', description: 'Heavy 3D shadows • Appears elevated • Dramatic', emoji: '☁️' },
] as const;

export default function TestVariantsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-16 space-y-24">
        {/* Hero Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            <span>🎨</span>
            <span>16 Total Card Designs</span>
          </div>
          <h1 className="text-6xl font-bold text-slate-900">
            Tool Card Design Gallery
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Each design uses a completely different layout pattern. Not just color variations — fundamentally different structures.
          </p>
        </div>

        {/* SELECTED FOR PRODUCTION - Highlighted Section */}
        <section className="border-4 border-green-600 rounded-3xl p-8 bg-gradient-to-br from-green-50 to-blue-50 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🎯</span>
            <h1 className="text-4xl font-bold text-slate-900">SELECTED FOR PRODUCTION</h1>
          </div>

          {/* Primary Choice - Hero Clean Card */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white shadow-lg">
                ✓ PRIMARY CHOICE
              </span>
              <h2 className="text-3xl font-bold text-slate-900">Hero Clean Card</h2>
            </div>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Large logo area with subtle gradient background • Clean, professional aesthetic • Premium badge top-right • Black CTA button
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ToolCard tool={mockTool} variant="primary" />
              <ToolCard tool={{...mockTool, id: '2', freeTrialAvailable: false, name: 'Alternate Tool'}} variant="primary" />
              <ToolCard tool={{...mockTool, id: '3', name: 'Standard Tool', tier: undefined, tags: []}} variant="primary" />
            </div>
          </div>

          {/* Backup Choice - Gradient Alt */}
          <div className="border-t-2 border-slate-300 pt-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center rounded-full bg-yellow-600 px-4 py-2 text-sm font-bold text-white shadow-lg">
                ⚡ BACKUP OPTION
              </span>
              <h2 className="text-3xl font-bold text-slate-900">Gradient Alt Card</h2>
            </div>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Bold blue-to-purple gradient • White-on-color text • Icons for metadata • Modern, energetic feel
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ToolCard tool={mockTool} variant="gradient-alt" />
              <ToolCard tool={{...mockTool, id: '4', freeTrialAvailable: false, name: 'Alternate Tool'}} variant="gradient-alt" />
              <ToolCard tool={{...mockTool, id: '5', name: 'Standard Tool', tier: undefined, tags: []}} variant="gradient-alt" />
            </div>
          </div>

          {/* Implementation Note */}
          <div className="mt-12 rounded-2xl bg-blue-900 p-6 text-white">
            <div className="flex items-start gap-4">
              <span className="text-3xl">ℹ️</span>
              <div>
                <h3 className="text-xl font-bold mb-2">How to Switch Variants</h3>
                <p className="text-blue-100 mb-3">
                  To change the default card design globally, edit <code className="bg-blue-800 px-2 py-1 rounded font-mono text-sm">lib/config/card-variant.ts</code>
                </p>
                <div className="bg-blue-950 rounded-lg p-4 font-mono text-sm">
                  <div className="text-blue-300">// Change this line:</div>
                  <div className="text-white mt-1">export const DEFAULT_CARD_VARIANT = <span className="text-green-400">'primary'</span>;</div>
                  <div className="text-blue-300 mt-3">// To use backup:</div>
                  <div className="text-white mt-1">export const DEFAULT_CARD_VARIANT = <span className="text-yellow-400">'gradient-alt'</span>;</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Radical Variants */}
        {radicalVariants.map((variant, index) => (
          <section key={variant.id} className="space-y-6">
            {/* Section Header */}
            <div className="flex items-start gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-2xl font-bold text-white shadow-lg">
                {index + 1}
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                  <span>{variant.emoji}</span>
                  <span>{variant.name}</span>
                </h2>
                <p className="mt-2 text-lg text-slate-600">
                  {variant.description}
                </p>
              </div>
            </div>

            {/* Cards Display */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Card with all features */}
                <ToolCard
                  tool={mockTool}
                  variant={variant.id as any}
                />

                {/* Card without trial */}
                <ToolCard
                  tool={{...mockTool, id: '2', freeTrialAvailable: false, name: 'Alternate Tool'}}
                  variant={variant.id as any}
                />

                {/* Card without premium */}
                <ToolCard
                  tool={{
                    ...mockTool,
                    id: '3',
                    name: 'Standard Tool',
                    gdprCompliant: false,
                    soc2Certified: false,
                    tier: undefined,
                    tags: []
                  }}
                  variant={variant.id as any}
                />
              </div>
            </div>
          </section>
        ))}

        {/* Original 4 Premium Variants Section */}
        <section className="space-y-6">
          <div className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-8 text-center">
            <div className="inline-flex items-center gap-2 text-blue-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-xl font-bold">Bonus: 4 Original Premium Variants</span>
            </div>
            <p className="mt-2 text-blue-600">
              These were the first 4 sophisticated designs (Stripe, Webflow, Notion, Linear)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: 'stripe', name: 'Stripe Sophistication', emoji: '💳' },
              { id: 'webflow', name: 'Webflow Boldness', emoji: '🎯' },
              { id: 'notion', name: 'Notion Minimalism', emoji: '✨' },
              { id: 'linear', name: 'Linear Modernism', emoji: '⚡' }
            ].map((variant) => (
              <div key={variant.id} className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="mb-4 text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>{variant.emoji}</span>
                  <span>{variant.name}</span>
                </h3>
                <ToolCard tool={mockTool} variant={variant.id as any} />
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-900 bg-slate-900 p-12 text-center text-white shadow-2xl">
          {/* Decorative background */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-purple-500/20 blur-3xl" />
          </div>

          <div className="relative space-y-6">
            <h2 className="text-4xl font-bold">14 Total Variants Available!</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-300">
              To switch variants globally, open{' '}
              <code className="rounded bg-white/10 px-2 py-1 font-mono text-sm">
                lib/config/card-variant.ts
              </code>
              {' '}and change the variant name.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              {[...radicalVariants,
                { id: 'stripe' },
                { id: 'webflow' },
                { id: 'notion' },
                { id: 'linear' }
              ].map((v) => (
                <code
                  key={v.id}
                  className="rounded-lg bg-white/10 px-3 py-2 font-mono text-sm backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  '{v.id}'
                </code>
              ))}
            </div>
            <div className="pt-6">
              <div className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-slate-900">
                <span>📖 See VARIANTS_README.md for documentation</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

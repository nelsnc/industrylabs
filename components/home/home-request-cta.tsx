import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function HomeRequestCta() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600">
                Free Tool Matching Service
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Not sure which tool fits{' '}
              <span className="text-blue-600">your stack?</span>
            </h2>

            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Skip hours of research. Tell us your needs, and we'll send you
              2-3 personalized recommendations that actually fit your budget,
              team size, and tech stack.
            </p>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Save 10+ hours of research</p>
                  <p className="text-sm text-slate-600">We've already vetted 50+ tools across HR, L&D, and CS</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Personalized to your needs</p>
                  <p className="text-sm text-slate-600">Matched by company size, budget, compliance, and integrations</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">No sales calls</p>
                  <p className="text-sm text-slate-600">Just recommendations via email — no pressure, no spam</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/request"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-200"
              >
                Get Matched
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/hr-talent"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
              >
                Browse All Tools
              </Link>
            </div>

            {/* Trust Line */}
            <p className="mt-6 text-sm text-slate-500">
              Trusted by HR leaders at <span className="font-semibold text-slate-700">200+ companies</span>
            </p>
          </div>

          {/* Right: Visual/Mockup */}
          <div className="relative">
            {/* Card mockup showing recommendation results */}
            <div className="relative rounded-2xl bg-white border-2 border-slate-200 shadow-2xl p-6 lg:p-8">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Your Recommendations</h3>
                  <p className="text-sm text-slate-500">Matched in 2 minutes</p>
                </div>
              </div>

              {/* Mock recommendations */}
              <div className="space-y-4">
                {/* Tool 1 */}
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 text-sm">BambooHR</p>
                    <p className="text-xs text-slate-500">95% match • From £150/mo</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 text-blue-700 text-xs font-medium">
                      Best fit
                    </span>
                  </div>
                </div>

                {/* Tool 2 */}
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 text-sm">Lever</p>
                    <p className="text-xs text-slate-500">88% match • From £550/mo</p>
                  </div>
                </div>

                {/* Tool 3 */}
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 text-sm">Workday</p>
                    <p className="text-xs text-slate-500">82% match • Enterprise pricing</p>
                  </div>
                </div>
              </div>

              {/* Footer note */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-xs text-slate-500 italic">
                  "Saved us weeks of vendor research. Got exactly what we needed." — HR Director, 250-person SaaS company
                </p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-50 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

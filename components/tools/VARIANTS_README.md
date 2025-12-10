# Tool Card Variants - A/B Testing Guide

## Overview

You now have **4 distinct premium tool card variants** ready for A/B testing. Each variant represents a different design aesthetic inspired by top-tier SaaS products.

---

## Quick Start

### Method 1: Global Switch (Recommended)

**To change the variant globally:**

1. Open [`lib/config/card-variant.ts`](../../lib/config/card-variant.ts)
2. Change the `CARD_VARIANT` value:

```typescript
export const CARD_VARIANT = 'stripe' as const;  // Default
// OR
export const CARD_VARIANT = 'webflow' as const;
export const CARD_VARIANT = 'notion' as const;
export const CARD_VARIANT = 'linear' as const;
```

3. Save the file
4. Refresh your browser - all cards update instantly!

### Method 2: Per-Component Override

Pass the `variant` prop directly to any `ToolCard` component:

```tsx
import { ToolCard } from '@/components/tools/tool-card';

// Use Webflow variant
<ToolCard tool={tool} variant="webflow" />

// Use Notion variant
<ToolCard tool={tool} variant="notion" />
```

---

## The 4 Variants

### 1. Stripe Sophistication (`stripe`)

**Visual Identity:**
- Multi-layer shadows with gradient border effects
- Subtle sophistication
- Larger logo with soft background gradient
- Blue gradient hover effects

**Best For:**
- Enterprise/B2B tools
- Professional services
- Trust-focused products

**Key Features:**
- Gradient border on hover
- Multi-layer shadow system
- Blue CTA button
- 14px logo size

---

### 2. Webflow Boldness (`webflow`)

**Visual Identity:**
- Bold typography (2xl heading)
- Strong visual hierarchy
- Dark logo background
- Dramatic hover effects (scale + translate)
- Black CTA button

**Best For:**
- Design tools
- Creative platforms
- Bold brands
- Visual-first products

**Key Features:**
- Largest text size (2xl)
- Black background logo (16px)
- Dramatic hover: `scale-[1.01] + -translate-y-1`
- Uppercase "PREMIUM" badge
- Dark CTA with uppercase text

---

### 3. Notion Minimalism (`notion`)

**Visual Identity:**
- Maximum whitespace (p-10)
- Subtle accent line at top
- Monospace typography for metadata
- Minimal color palette
- Clean border-only CTA

**Best For:**
- Productivity tools
- Analytics platforms
- Data-focused products
- Clean, minimal brands

**Key Features:**
- Most padding (40px)
- Monospace fonts for metadata
- Subtle gradient accent line
- Minimal hover (border color change only)
- Ghost button CTA

---

### 4. Linear Modernism (`linear`)

**Visual Identity:**
- Technical aesthetic with monospace
- Cool gray palette
- Inner glow hover effect
- Technical symbols ($ # →)
- Gradient CTA button

**Best For:**
- Developer tools
- Technical platforms
- Modern SaaS
- API products

**Key Features:**
- Monospace category labels
- Technical prefix symbols
- Inner box-shadow glow on hover
- Compliance badge pills
- "PRO" instead of "Premium"
- Uppercase CTA: `VIEW_PROFILE →`

---

## Comparison Matrix

| Feature | Stripe | Webflow | Notion | Linear |
|---------|--------|---------|--------|--------|
| **Padding** | p-8 | p-7 | p-10 | p-6 |
| **Logo Size** | 56px (14) | 64px (16) | 48px (12) | 44px (11) |
| **Heading Size** | text-xl | text-2xl | text-lg | text-[17px] |
| **Hover Effect** | Shadow + Gradient | Scale + Shadow | Border | Glow |
| **CTA Style** | Blue solid | Black solid | Border ghost | Blue gradient |
| **Typography** | Sans-serif | Bold sans | Mono metadata | Full mono |
| **Status Badge** | Text | UPPERCASE | Text | PRO/✓ |
| **Compliance** | Text line | Text line | Mono line | Badge pills |

---

## Testing Strategy

### A. Visual Comparison Test

Create a test page to see all 4 variants side-by-side:

```tsx
// app/test-cards/page.tsx
import { ToolCard } from '@/components/tools/tool-card';
import { getTools } from '@/lib/airtable-helpers';

export default async function TestCardsPage() {
  const tools = await getTools({ limit: 3 });

  return (
    <div className="container py-12 space-y-16">
      <section>
        <h2 className="text-2xl font-bold mb-6">Stripe Variant</h2>
        <div className="grid grid-cols-3 gap-6">
          {tools.map(tool => (
            <ToolCard key={tool.id} tool={tool} variant="stripe" />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Webflow Variant</h2>
        <div className="grid grid-cols-3 gap-6">
          {tools.map(tool => (
            <ToolCard key={tool.id} tool={tool} variant="webflow" />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Notion Variant</h2>
        <div className="grid grid-cols-3 gap-6">
          {tools.map(tool => (
            <ToolCard key={tool.id} tool={tool} variant="notion" />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Linear Variant</h2>
        <div className="grid grid-cols-3 gap-6">
          {tools.map(tool => (
            <ToolCard key={tool.id} tool={tool} variant="linear" />
          ))}
        </div>
      </section>
    </div>
  );
}
```

### B. A/B Testing with Analytics

Track which variant performs best:

```tsx
// Track clicks per variant
<ToolCard
  tool={tool}
  variant="stripe"
  onClick={() => analytics.track('card_click', { variant: 'stripe' })}
/>
```

---

## Files Created

**New variant components:**
- [`components/tools/tool-card-stripe.tsx`](./tool-card-stripe.tsx)
- [`components/tools/tool-card-webflow.tsx`](./tool-card-webflow.tsx)
- [`components/tools/tool-card-notion.tsx`](./tool-card-notion.tsx)
- [`components/tools/tool-card-linear.tsx`](./tool-card-linear.tsx)

**Config:**
- [`lib/config/card-variant.ts`](../../lib/config/card-variant.ts)

**Main switcher:**
- [`components/tools/tool-card.tsx`](./tool-card.tsx) (updated)

---

## Current Status

✅ All 4 variants fully implemented
✅ Type-safe with proper Tool interface
✅ Uses existing formatting utilities
✅ Backward compatible with existing code
✅ Zero breaking changes
✅ TypeScript build passes

**Default:** Currently using `stripe` variant globally.

---

## Recommendations

1. **Test all 4 visually first** - Create the test page above to compare
2. **Choose 2 favorites** - Narrow down to your top 2 for A/B testing
3. **Run A/B test** - Use analytics to track click-through rates
4. **Remove unused variants** - Clean up after selecting winner

---

## Environment Variable Method (Optional)

For more flexibility, use environment variables:

1. Add to `.env.local`:
```env
NEXT_PUBLIC_CARD_VARIANT=stripe
```

2. Update [`lib/config/card-variant.ts`](../../lib/config/card-variant.ts):
```typescript
export const CARD_VARIANT = (
  process.env.NEXT_PUBLIC_CARD_VARIANT || 'stripe'
) as 'stripe' | 'webflow' | 'notion' | 'linear';
```

3. Restart dev server to apply changes

---

## Questions?

- All variants use the same `Tool` type from `@/lib/airtable-helpers`
- All variants use the same formatting utilities from `@/lib/utils/format-card-data-v4`
- All variants support the `referrerSlug` prop for analytics
- No changes needed to existing pages - they work automatically

**Ready to test!** 🚀

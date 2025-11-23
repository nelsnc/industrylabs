# Badge Component Usage Guide

## Recommended Variant Usage Scenarios

### `variant="outline"` ✅ Recommended for Most Scenarios

- **Category Labels** (HR & Talent, Learning & Development, etc.)
- **Tags** (GDPR, ATS Integration, etc.)
- **Article Types** (Guide, Comparison, etc.)
- **Advantages:** Best readability, works well on all backgrounds

**Example:**
```tsx
<Badge variant="outline">HR & Talent</Badge>
<Badge variant="outline">GDPR Compliant</Badge>
```

### `variant="default"` ✅ Use for Emphasis

- **Status Indicators** (Live, Premium, etc.)
- **Labels that need to attract attention**
- **Advantages:** Uses primary color, visually prominent

**Example:**
```tsx
<Badge variant="default">Premium</Badge>
<Badge variant="default">Live</Badge>
```

### `variant="secondary"` ⚠️ Use with Caution

- **Only for non-critical decorative badges**
- **Do NOT use for categories or important information**
- **Reason:** Lower contrast, moderate readability

**Example:**
```tsx
// ⚠️ Only use when secondary emphasis is needed
<Badge variant="secondary">Optional Feature</Badge>
```

### `variant="destructive"`

- **Error States**
- **Warning Messages**
- **Critical Alerts**

**Example:**
```tsx
<Badge variant="destructive">Deprecated</Badge>
<Badge variant="destructive">Error</Badge>
```

## Common Usage Patterns

### Tool Tags
```tsx
{tool.tags.map((tag) => (
  <Badge key={tag} variant="outline">{tag}</Badge>
))}
```

### Article Categories
```tsx
<Badge variant="outline">{article.category}</Badge>
```

### Status Indicators
```tsx
<Badge variant="default">{tool.tier}</Badge>
```

### Compliance Tags
```tsx
{tool.complianceTags.map((tag) => (
  <Badge key={tag} variant="outline">{tag}</Badge>
))}
```

## Accessibility Checklist

Use this checklist before implementing badges:

- [ ] Text and background contrast ratio ≥ 4.5:1 (WCAG AA standard)
- [ ] Readable in both light and dark modes
- [ ] Color is not the only way to convey information
- [ ] Text is legible at all viewport sizes
- [ ] Badge content is meaningful and concise

## Anti-Patterns to Avoid

### ❌ Don't Do This
```tsx
// Using secondary for important categories
<Badge variant="secondary">HR & Talent</Badge>

// Inconsistent variants for the same type of content
<Badge variant="outline">Category 1</Badge>
<Badge variant="secondary">Category 2</Badge>

// Custom colors that break consistency
<Badge className="bg-red-500">Custom</Badge>
```

### ✅ Do This Instead
```tsx
// Consistent outline variant for categories
<Badge variant="outline">HR & Talent</Badge>

// Consistent variants throughout the app
<Badge variant="outline">Category 1</Badge>
<Badge variant="outline">Category 2</Badge>

// Use built-in variants
<Badge variant="destructive">Error</Badge>
```

## Color Contrast Reference

Our current color values in `globals.css`:

- **Light Mode:**
  - Secondary: `oklch(0.45 0.15 180)` - Darker teal for better contrast
  - Secondary Foreground: `oklch(0.985 0 0)` - Pure white text

- **Dark Mode:**
  - Secondary: `oklch(0.55 0.15 180)` - Medium-light teal
  - Secondary Foreground: `oklch(0.985 0 0)` - White text

## Testing Your Implementation

1. **Visual Check:** View the badge in both light and dark modes
2. **Contrast Check:** Use browser DevTools or a contrast checker tool
3. **Context Check:** Ensure badge is readable on all background colors used
4. **Responsive Check:** Test at mobile, tablet, and desktop sizes

## Questions?

If you're unsure which variant to use:
- For text labels → Use `variant="outline"`
- For status/emphasis → Use `variant="default"`
- When in doubt → Use `variant="outline"` (safest choice)

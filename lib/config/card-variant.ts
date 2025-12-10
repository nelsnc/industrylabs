/**
 * Global Card Variant Configuration
 *
 * Change this to switch the default card design site-wide.
 *
 * Production variants (User selected):
 *   - 'primary'       : Hero Clean design (SELECTED FOR PRODUCTION)
 *   - 'gradient-alt'  : Gradient with icons (Backup option)
 *
 * Test variants available:
 *   - 'horizontal', 'hero', 'compact', 'stats', 'glass', 'gradient'
 *   - 'terminal', 'editorial', 'bento', 'floating'
 *   - 'stripe', 'webflow', 'notion', 'linear'
 */

import type { CardVariant as CardVariantType } from '@/components/tools/tool-card';

/**
 * Default card variant for production
 * User selected: "primary" (Hero Clean design)
 */
export const DEFAULT_CARD_VARIANT: CardVariantType = 'primary';

/**
 * Backup card variant (for A/B testing or feature flags)
 */
export const BACKUP_CARD_VARIANT: CardVariantType = 'gradient-alt';

/**
 * Legacy export for backwards compatibility
 */
export const CARD_VARIANT = DEFAULT_CARD_VARIANT;

export type CardVariant = CardVariantType;

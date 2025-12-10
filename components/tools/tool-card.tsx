'use client';

import { ToolCardPrimary } from './tool-card-primary';
import { ToolCardGradientAlt } from './tool-card-gradient-alt';
import { ToolCardStripe } from './tool-card-stripe';
import { ToolCardWebflow } from './tool-card-webflow';
import { ToolCardNotion } from './tool-card-notion';
import { ToolCardLinear } from './tool-card-linear';
import { ToolCardHorizontal } from './tool-card-horizontal';
import { ToolCardHeroImage } from './tool-card-hero-image';
import { ToolCardCompact } from './tool-card-compact';
import { ToolCardStatsHero } from './tool-card-stats-hero';
import { ToolCardGlass } from './tool-card-glass';
import { ToolCardGradient } from './tool-card-gradient';
import { ToolCardTerminal } from './tool-card-terminal';
import { ToolCardEditorial } from './tool-card-editorial';
import { ToolCardBento } from './tool-card-bento';
import { ToolCardFloating } from './tool-card-floating';
import type { Tool } from '@/lib/airtable-helpers';

export type CardVariant =
  | 'primary'        // Production default (Hero Clean)
  | 'gradient-alt'   // Backup option (Gradient with icons)
  | 'stripe'
  | 'webflow'
  | 'notion'
  | 'linear'
  | 'horizontal'
  | 'hero'
  | 'compact'
  | 'stats'
  | 'glass'
  | 'gradient'
  | 'terminal'
  | 'editorial'
  | 'bento'
  | 'floating';

interface ToolCardProps {
  tool: Tool;
  referrerSlug?: string;
  variant?: CardVariant;
}

export function ToolCard({ tool, referrerSlug, variant = 'primary' }: ToolCardProps) {
  switch (variant) {
    // Production variants (User selected)
    case 'primary':
      return <ToolCardPrimary tool={tool} />;
    case 'gradient-alt':
      return <ToolCardGradientAlt tool={tool} />;

    // Original 4 premium variants
    case 'webflow':
      return <ToolCardWebflow tool={tool} referrerSlug={referrerSlug} />;
    case 'notion':
      return <ToolCardNotion tool={tool} referrerSlug={referrerSlug} />;
    case 'linear':
      return <ToolCardLinear tool={tool} referrerSlug={referrerSlug} />;

    // 10 Radically different designs
    case 'horizontal':
      return <ToolCardHorizontal tool={tool} referrerSlug={referrerSlug} />;
    case 'hero':
      return <ToolCardHeroImage tool={tool} referrerSlug={referrerSlug} />;
    case 'compact':
      return <ToolCardCompact tool={tool} referrerSlug={referrerSlug} />;
    case 'stats':
      return <ToolCardStatsHero tool={tool} referrerSlug={referrerSlug} />;
    case 'glass':
      return <ToolCardGlass tool={tool} referrerSlug={referrerSlug} />;
    case 'gradient':
      return <ToolCardGradient tool={tool} referrerSlug={referrerSlug} />;
    case 'terminal':
      return <ToolCardTerminal tool={tool} referrerSlug={referrerSlug} />;
    case 'editorial':
      return <ToolCardEditorial tool={tool} referrerSlug={referrerSlug} />;
    case 'bento':
      return <ToolCardBento tool={tool} referrerSlug={referrerSlug} />;
    case 'floating':
      return <ToolCardFloating tool={tool} referrerSlug={referrerSlug} />;

    // Legacy default
    case 'stripe':
    default:
      return <ToolCardPrimary tool={tool} />;
  }
}

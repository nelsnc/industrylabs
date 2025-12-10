/**
 * IndustryLabs Design System
 * Color Tokens - Updated Dec 2025
 *
 * Philosophy: Professional, trustworthy, action-oriented
 * - Blue: Primary actions, verified status, trust
 * - Indigo: Background surfaces for CTAs
 * - White: Buttons on colored backgrounds (high contrast)
 */

export const colors = {
  // Primary - Blue (action, trust, verified)
  primary: {
    DEFAULT: 'blue-600',
    hover: 'blue-700',
    light: 'blue-100',
    lighter: 'blue-50',
  },

  // CTA Surface - Indigo (professional background)
  surface: {
    DEFAULT: 'indigo-600',
    hover: 'indigo-700',
    light: 'indigo-100',
    lighter: 'indigo-50',
    text: 'indigo-200',
  },

  // Premium/Trust Badge
  premium: {
    bg: 'blue-600',
    text: 'white',
  },

  // Neutral - Slate
  neutral: {
    darkest: 'slate-900',
    dark: 'slate-700',
    DEFAULT: 'slate-600',
    light: 'slate-400',
    lighter: 'slate-200',
    lightest: 'slate-50',
  },
};

export const components = {
  cta: {
    surface: 'bg-indigo-600',
    text: 'text-white',
    textSecondary: 'text-indigo-100',
    textTertiary: 'text-indigo-200',
    button: 'bg-white text-indigo-600 hover:bg-indigo-50',
  },

  badge: {
    premium: 'bg-blue-600 text-white',
    verified: 'bg-blue-600 text-white',
  },

  button: {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-900',
    ghost: 'border border-slate-300 hover:border-slate-400 text-slate-700',
    dark: 'bg-slate-900 hover:bg-slate-800 text-white',
    onColored: 'bg-white hover:bg-indigo-50',
  },
};

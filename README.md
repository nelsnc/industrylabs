# IndustryLabs.ai

B2B AI tools marketplace organized by industry verticals. Built with Next.js 14, TypeScript, Tailwind CSS, and Airtable.

## Quick Start

### Prerequisites
- Node.js 20+ (check with `node -v`)
- npm or yarn
- Airtable account (free tier works)
- Vercel account (optional, for deployment)

### Installation

1. Clone the repository or open in VS Code

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
- Copy `.env.example` to `.env.local`
- Add your Airtable credentials:
  - `AIRTABLE_API_KEY` - From airtable.com/account
  - `AIRTABLE_BASE_ID` - From your Airtable base URL

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
```
industrylabs/
├── app/                  # Next.js App Router
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Homepage
│   ├── hr-talent/       # HR category pages
│   ├── tools/           # Tool detail pages
│   ├── articles/        # Blog/article pages
│   └── api/             # API routes
├── components/          # Reusable React components
│   └── ui/             # shadcn/ui components
├── lib/                # Utilities and API wrappers
│   └── airtable.ts     # Airtable API wrapper
├── types/              # TypeScript type definitions
├── public/             # Static assets
└── .env.local          # Environment variables (not committed)
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Backend**: Airtable (API)
- **Hosting**: Vercel
- **Email**: ConvertKit
- **Analytics**: Google Analytics 4

## AI-Assisted Development

> **Development Workflow:** This repo uses a dual-AI approach:
> - **Claude Code** (VS Code extension with Sonnet 4.5) for multi-file edits and implementation
> - **GPT-5 / Latest GPT Models** (ChatGPT, OpenAI Codex) for planning, architecture, and code review
> - **Other assistants** (e.g., Gemini, Claude.ai) for additional review and validation

**Quick Reference:**
- Architecture & Planning → GPT-5
- Code Implementation → Claude Code (VS Code)
- Code Review → GPT-5
- Security & Critical Logic → Cross-check with multiple models

**For AI Assistants Helping With This Project:**
- Treat the GitHub repo as the canonical source of truth
- Explicitly state your role: PLAN / IMPLEMENT / REVIEW
- Never paste secrets or API keys in prompts
- Follow the patterns in `.cursorrules` and `AI_WORKFLOW.md`

## Development

### Running Locally
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

### Code Quality
```bash
npm run lint
```

## Deployment

This project is configured for Vercel deployment:

1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Documentation

Full project documentation is available in the Claude Project:
- Master Plan - Overall strategy and goals
- Execution Hub - Current tasks and progress
- Airtable Schema - Database structure
- Decision Log - Key technical decisions
- Resources - Templates and scripts
- AI Workflow - Development process with AI tools

## Current Status

**Phase**: Month 0 (Pre-launch)  
**Focus**: Foundation setup, Next.js build  
**Target Launch**: Week 4-5  
**Next Task**: TASK-007 (Airtable wrapper implementation)

## License

Proprietary - All rights reserved
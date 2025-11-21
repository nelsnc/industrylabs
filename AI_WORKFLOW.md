# AI Development Workflow

## Quick Reference for AI Assistants

When helping Nelson with IndustryLabs.ai, follow this workflow:

### Development Stack

**Claude Code (VS Code Extension)**
- Model: Claude Sonnet 4.5
- Use for: File creation, multi-file edits, refactoring, implementation
- Command: Type in Claude Code panel in VS Code

**GPT-5 / Latest GPT Models**
- Access via: ChatGPT, OpenAI API, Codex successors
- Use for: Planning, architecture, TypeScript types, code review, documentation

**Other Models (Optional)**
- Gemini, Claude.ai: Cross-checking critical paths, alternative perspectives

---

## Standard Operating Procedure

### Phase 1: PLAN (Use GPT-5)
```
You are helping with IndustryLabs.ai (Next.js 14, TypeScript, Tailwind, Airtable backend).

Current task: [describe task from Execution Hub]

Please:
1. Break this into 3-7 concrete steps
2. Identify risks and edge cases
3. Specify which files will be changed
4. Suggest tests or validation checks
5. Output a clear checklist for implementation
```

**Output:** Detailed plan with step-by-step checklist

---

### Phase 2: IMPLEMENT (Use Claude Code in VS Code)
```
You are Claude Code working inside the IndustryLabs repo.

Task plan and checklist: [paste from Phase 1]

Please:
- Edit only the necessary files
- Keep code consistent with existing patterns in .cursorrules
- Follow TypeScript strict mode
- Use Tailwind utility classes (no custom CSS unless necessary)
- After edits, ensure npm run lint and npm run build will pass
```

**Output:** Implemented code in actual files

---

### Phase 3: REVIEW (Use GPT-5)
```
Here is the diff/updated files from the recent implementation: [paste]

Please act as a senior TypeScript/Next.js engineer and:
1. Review for correctness, readability, and safety
2. Point out any anti-patterns or better abstractions
3. Check alignment with .cursorrules principles
4. Suggest concrete improvements
5. Verify error handling is robust
```

**Output:** Code review with actionable feedback

---

### Phase 4: CROSS-CHECK (Optional, Use Alternative Model)

For security-critical, performance-critical, or complex algorithmic code:
```
Review this implementation for [security/performance/correctness]:
[paste code]

Focus on: [specific concerns]
```

---

## Task Classification Guide

### Type 1: New File Creation
**Recommend:** Claude Code  
**Prompt Template:**
```
Create [filepath] with the following requirements:
- [requirement 1]
- [requirement 2]
- Use TypeScript strict mode
- Follow patterns in .cursorrules
```

**Also Provide:** Manual implementation steps for learning

---

### Type 2: Complex Multi-File Refactoring
**Recommend:** Claude Code  
**Approach:**
1. GPT-5 creates the refactoring plan
2. Claude Code implements across files
3. GPT-5 reviews the changes

---

### Type 3: Architecture Decision
**Recommend:** GPT-5  
**No tool needed** - this is planning phase  
**Output:** Detailed explanation with pros/cons and recommendations

---

### Type 4: Small Edit/Addition
**Recommend:** Manual or Claude Code  
**Provide:** Code snippet with clear placement instructions

---

## Response Template

When suggesting implementation:
```markdown
**PHASE:** [PLAN / IMPLEMENT / REVIEW]

**RECOMMENDED TOOL:** [Claude Code / GPT-5 / Manual]

**CLAUDE CODE PROMPT:** (if applicable)
[Exact prompt to type in Claude Code panel]

**GPT-5 PROMPT:** (if applicable)
[Exact prompt for planning or review]

**MANUAL IMPLEMENTATION:** (always include for learning)
Step-by-step:
1. [step]
2. [step]
[code if needed]

**WHY THIS APPROACH:**
[Brief explanation]
```

---

## Tool Capabilities

### Claude Code (Sonnet 4.5) - IMPLEMENT
✅ Create entire files  
✅ Multi-file changes  
✅ Complex refactoring  
✅ Database integration  
✅ API routes  
✅ Component architecture  
⚠️ Always review before accepting  

### GPT-5 / Latest GPT - PLAN & REVIEW
✅ Architecture decisions  
✅ Breaking down complex tasks  
✅ TypeScript type design  
✅ API design and trade-offs  
✅ Code review and suggestions  
✅ Documentation generation  
✅ Edge case identification  

### Alternative Models - VALIDATE
✅ Security review  
✅ Performance analysis  
✅ Alternative implementations  
✅ Second opinion on critical paths  

---

## Security Rules

**Never do this:**
- ❌ Paste API keys or tokens in any AI chat
- ❌ Share full `.env.local` contents
- ❌ Hard-code credentials in generated code
- ❌ Bypass security practices

**Always do this:**
- ✅ Redact secrets before sharing logs/config
- ✅ Use environment variables
- ✅ Review AI-generated code before accepting
- ✅ Test security-critical paths manually

---

## Development Principles

**Month 1-3: Learning Phase**
- More manual implementation
- Ask for explanations
- Understand before accepting
- Review all AI-generated code

**Month 4+: Speed Phase**
- More autonomous AI implementation
- Focus on shipping features
- Still review critical paths

**Always:**
- GitHub repo is source of truth
- Test before committing
- Small incremental changes
- Clear commit messages
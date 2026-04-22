---
name: reflect-yourself
description: "Records user corrections and feedback from the current session, writes them as updated skill files or cursor rules, and queues unresolved learnings for later. Use when the user says 'remember this', 'save what you learned', 'update my preferences', 'end of session review', or after repeated corrections that should become persistent rules."
---

# reflect-yourself

A self-learning system for Cursor that records corrections from a session and writes them to skill files or cursor rules.

## Workflow

When invoked:

1. **Analyze** session for corrections, repeated patterns, and preference signals (optionally ask clarifying questions if scope is unclear)
2. **Present** learnings for review — summary first, then individual cards (see command file for card format)
3. **Capture action** via the Cursor agent tool **Ask questions** (message-question) when possible — offer Apply all / Apply selected / Skip all / Partial / Other; see Cursor docs → Agent overview → Tools
4. **Apply** only after explicit user approval (via Q&A or typed reply)
5. **Verify** each written file parses correctly and show a diff summary so the user can confirm the result

## Example Learning Card

```
📝 Learning: Prefer named exports over default exports
   Source: User corrected default export → named export (3 times this session)
   Target: .cursor/rules/export-style.mdc
   Confidence: HIGH
```

## Inputs

| Input | Default | Description |
|-------|---------|-------------|
| Scope | Current conversation | "this session" / "also queue" / "discover skills" |
| Mode | Full review | "quick" (apply high-confidence only) / "full" |

## Commands

When the user invokes these commands, read the corresponding file in `commands/`:

| Command | File |
|---------|------|
| `/reflect-yourself` | `commands/reflect-yourself.md` |
| `/reflect-yourself-skills` | `commands/reflect-yourself-skills.md` |
| `/reflect-yourself-queue` | `commands/reflect-yourself-queue.md` |
| `/reflect-yourself-skip` | `commands/reflect-yourself-skip.md` |

## Quick Start

1. At session end, run `/reflect-yourself`
2. Review captured learnings (summary + cards)
3. Choose action via prompt or reply (apply / edit / skip / redirect)
4. Learnings are applied to skills/rules after approval

## Placement Logic

- **Project Skills** (`.cursor/skills/`) → Codebase-specific
- **Personal Skills** (`~/.cursor/skills/`) → Reusable across projects
- **Project Rules** (`.cursor/rules/`) → Coding standards

## Queue Location

Pending learnings: `~/.cursor/reflect-queue.json` (global location, never pollutes project repos)

## Security

This skill only writes to `.cursor/skills/`, `.cursor/rules/`, and `~/.cursor/skills/`. The installer copies files only; it does not execute skill content.

## Update check

When main commands are run, the agent may check for a newer npm version. If one exists, the user can be prompted (Yes/No) to run `npx reflect-yourself@latest`. See command files for details.

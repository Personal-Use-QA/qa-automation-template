---
name: ba-comment-architect
description: 'Use when you audit comments, improve JSDoc, or remove noisy explanations.'
---

# ba-comment-architect

Audit comments without changing behavior.

## Args

<paths>

## Procedure

1. Read [the comment audit](references/audit.md). Identify load-bearing facts, decisions, reasons and evidence before editing.

2. Delete restatements, translate jargon and keep comments about three lines. Preserve eslint, TypeScript and formatting directives byte-identically.

3. Keep the diff comment-only. Compare executable code before/after and run lint and typecheck where relevant; never bundle a behavior refactor.

4. Return changed paths, retained business facts and verification output.

## Boundaries and evidence

Read AGENTS.md and the memory index first. Preserve role ownership, secrets rules and user-set parallelism. External messages, issues, PRs and page publishing need explicit authorization.

Use $qa-debugging on a failure, $qa-tdd for a new test and $qa-verify before a completion claim. These are repository-local Codex skills.

MCP is recon-only. Use the guide's cap for this playbook, or the active role's cap, whichever is lower. Close the browser after handoff. If a prerequisite is unavailable, report it without inventing evidence.

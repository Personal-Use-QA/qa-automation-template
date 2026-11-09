---
name: qa-team-a11y
description: 'Use when you use $qa-team-a11y, run an accessibility pipeline, or fix an a11y case.'
---

# qa-team-a11y

Run designer → automation → architect for accessibility coverage.

## Args

<pages> | url=<URL> | --fix <ID>

## Procedure

1. Invoke $qa-a11y. Designer writes axe and manual WCAG 2.2 AA cases, keyboard flows and evidence requirements.

2. Automation uses the installed axe adapter and normal flows/fixtures. Keep reproducible barriers visible; report product defects rather than suppressing them.

3. Architect reviews criteria coverage, exclusions, manual gaps and findings. A --fix request names the existing case and keeps its permanent ID.

4. Return the architect verdict and barrier evidence, distinguishing automated checks from manual coverage.

## Boundaries and evidence

Read AGENTS.md and the memory index first. Preserve role ownership, secrets rules and user-set parallelism. External messages, issues, PRs and page publishing need explicit authorization.

Use $qa-debugging on a failure, $qa-tdd for a new test and $qa-verify before a completion claim. These are repository-local Codex skills.

MCP is recon-only. Use the guide's cap for this playbook, or the active role's cap, whichever is lower. Close the browser after handoff. If a prerequisite is unavailable, report it without inventing evidence.

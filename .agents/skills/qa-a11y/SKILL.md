---
name: qa-a11y
description: 'Use when you test accessibility, run axe, or assess WCAG 2.2 AA.'
---

# qa-a11y

Design and automate accessibility checks against WCAG 2.2 AA.

## Args

<pages> | url=<URL> | --fix <case ID>

## Procedure

1. Inspect the authenticated route when applicable. Enumerate keyboard order, focus, names, errors, contrast and responsive barriers. Use [the accessibility case checklist](templates/cases.md).

2. Use pinned @axe-core/playwright for automated scans; document exclusions with reasons. Automated scans do not prove full conformance. Keep manual keyboard and assistive-technology cases explicit.

3. Write normal layered tests. Capture a still for each barrier and a reproducible path. Triage with qa-finding; do not suppress violations to make a scan green.

4. Return case IDs, covered WCAG criteria, barriers, evidence and manual gaps.

## Boundaries and evidence

Read AGENTS.md and the memory index first. Preserve role ownership, secrets rules and user-set parallelism. External messages, issues, PRs and page publishing need explicit authorization.

Use $qa-debugging on a failure, $qa-tdd for a new test and $qa-verify before a completion claim. These are repository-local Codex skills.

MCP is recon-only. Use the guide's cap for this playbook, or the active role's cap, whichever is lower. Close the browser after handoff. If a prerequisite is unavailable, report it without inventing evidence.

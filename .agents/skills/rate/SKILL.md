---
name: rate
description: 'Use when you use $rate, rate the repo, or score an engineering area.'
---

# rate

Score 1–100 against the fixed 5×20 rubric.

## Args

[area=<scope>]

## Procedure

1. Read docs/reference/repo-rating-rubric.md. Measure the requested scope using actual files, discovery, checks and reports. No custom rubric.

2. Score architecture, determinism, coverage, delivery and agent operations separately from 0 to 20. Cite evidence for every deduction and state unverified items.

3. Sum the five categories. Do not award completion points for unrun checks; rank remediation by severity and coverage gaps.

4. Return the score, category breakdown, cited evidence and top next actions.

## Boundaries and evidence

Read AGENTS.md and the memory index first. Preserve role ownership, secrets rules and user-set parallelism. External messages, issues, PRs and page publishing need explicit authorization.

Use $qa-debugging on a failure, $qa-tdd for a new test and $qa-verify before a completion claim. These are repository-local Codex skills.

MCP is recon-only. Use the guide's cap for this playbook, or the active role's cap, whichever is lower. Close the browser after handoff. If a prerequisite is unavailable, report it without inventing evidence.

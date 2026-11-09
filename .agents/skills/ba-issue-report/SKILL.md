---
name: ba-issue-report
description: 'Use when you write a BA issue, make a defect business-readable, or prepare an issue report.'
---

# ba-issue-report

Turn a verified finding into a business-readable issue draft.

## Args

<finding path>

## Procedure

1. Read the finding and linked evidence. Explain the user-visible consequence before implementation details.

2. Include reproducible steps, actual/expected behavior, impact, environment and a redacted still. Use plain English; retain technical tokens in parentheses when useful.

3. Check exact triage labels, stable case IDs and duplicate search results. External filing is a separate authorized action.

4. Return the issue draft and evidence paths; include a URL only after confirmed creation.

## Boundaries and evidence

Read AGENTS.md and the memory index first. Preserve role ownership, secrets rules and user-set parallelism. External messages, issues, PRs and page publishing need explicit authorization.

Use $qa-debugging on a failure, $qa-tdd for a new test and $qa-verify before a completion claim. These are repository-local Codex skills.

MCP is recon-only. Use the guide's cap for this playbook, or the active role's cap, whichever is lower. Close the browser after handoff. If a prerequisite is unavailable, report it without inventing evidence.

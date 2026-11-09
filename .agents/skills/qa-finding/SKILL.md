---
name: qa-finding
description: 'Use when you write a finding, document a defect, or triage a failed case.'
---

# qa-finding

Draft a numbered finding in docs/findings/ using the canonical template.

## Args

<feature or case ID>

## Procedure

1. Read the affected case and reproduce the smallest failing business action. Classify product-defect, app-defect, ba-question, test-defect or config from evidence; do not guess.

2. Write all triage headings and all seven sections. A still is required; redact secrets; bind evidence to the exact revision. A clip is optional.

3. Run npm run findings:check. Search existing findings and issues for duplicates before proposing external filing. Do not open an issue without authorization; never claim one exists without its URL.

4. Return the finding path, severity, impacted case IDs and evidence paths.

## Boundaries and evidence

Read AGENTS.md and the memory index first. Preserve role ownership, secrets rules and user-set parallelism. External messages, issues, PRs and page publishing need explicit authorization.

Use $qa-debugging on a failure, $qa-tdd for a new test and $qa-verify before a completion claim. These are repository-local Codex skills.

MCP is recon-only. Use the guide's cap for this playbook, or the active role's cap, whichever is lower. Close the browser after handoff. If a prerequisite is unavailable, report it without inventing evidence.

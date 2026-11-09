---
name: nightly-heal
description: 'Use when you use $nightly-heal, investigate a nightly report, or heal a test defect.'
---

# nightly-heal

Root-cause nightly failures from the published JSON report.

## Args

[url=<report.json>]

## Procedure

1. Read the report JSON rather than trusting dashboard summaries. Check local and unmerged branches before duplicating a fix. Classify TEST, PRODUCT, environment or missing evidence.

2. For TEST defects, prepare the smallest branch change with tests; a draft PR requires separate external authorization. For PRODUCT defects, draft deduplicated findings and issue bodies.

3. Review skips but never auto-fix them. Bind evidence to the revision, prove the affected chain three times and do not raise workers or hide a failure.

4. Return a BA-readable summary, classifications, check output, local changes and only confirmed external URLs.

## Boundaries and evidence

Read AGENTS.md and the memory index first. Preserve role ownership, secrets rules and user-set parallelism. External messages, issues, PRs and page publishing need explicit authorization.

Use $qa-debugging on a failure, $qa-tdd for a new test and $qa-verify before a completion claim. These are repository-local Codex skills.

MCP is recon-only. Use the guide's cap for this playbook, or the active role's cap, whichever is lower. Close the browser after handoff. If a prerequisite is unavailable, report it without inventing evidence.

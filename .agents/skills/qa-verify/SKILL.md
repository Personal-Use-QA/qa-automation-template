---
name: qa-verify
description: 'Use when you verify a QA change before a completion or green-suite claim.'
---

# qa-verify

## Inputs

<changed paths or case IDs>

## Workflow

1. Inspect the final diff and select checks that can disprove the claimed outcome. Do not substitute earlier evidence for the current tree.

2. Run lint, format:check, typecheck, tags:check, lanes:check and findings:check as relevant. For changed page objects or flows, run docs:check against the base revision.

3. Run affected Playwright projects with --repeat-each=3. Inspect JSON results for skipped, flaky and failed cases; inspect traces when behavior or synchronization changed.

4. Use unique output/report paths for simultaneous runs. Do not raise workers. If the environment prevents a check, report it as unverified rather than green.

5. Return a concise verdict, exact commands and trimmed output, revision-bound evidence and material gaps.

Apply root AGENTS.md and the relevant nested guide. This is a Codex role/workflow skill, not a separately configured agent. Keep sequential handoffs unless the user authorizes delegation.

---
name: qa-team
description: 'Use when you use $qa-team, automate a feature, or run the full QA pipeline.'
---

# qa-team

Run designer → locators → automation → architect with explicit handoffs.

## Args

url=<URL> | <feature description>

## Procedure

1. Use $qa-designer: read the request and guide, perform capped recon, and write severity-graded case docs and Controls. Keep implementation code unchanged.

2. Use $qa-locators: verify each control live and write page objects or clients. Then use $qa-automation to write flows, fixtures and specs, starting with a failing expectation and proving three green repetitions.

3. Use $qa-architect to check contracts, root-cause evidence, gates and traces. Do not brainstorm or expand plans inside the established pipeline. Codex performs the roles sequentially with a short handoff note; do not spawn agents unless the user authorizes delegation.

4. Return GO / GO-WITH-RISK / NO-GO with case IDs, paths, literal check output and residual risks.

## Boundaries and evidence

Read AGENTS.md and the memory index first. Preserve role ownership, secrets rules and user-set parallelism. External messages, issues, PRs and page publishing need explicit authorization.

Use $qa-debugging on a failure, $qa-tdd for a new test and $qa-verify before a completion claim. These are repository-local Codex skills.

MCP is recon-only. Use the guide's cap for this playbook, or the active role's cap, whichever is lower. Close the browser after handoff. If a prerequisite is unavailable, report it without inventing evidence.

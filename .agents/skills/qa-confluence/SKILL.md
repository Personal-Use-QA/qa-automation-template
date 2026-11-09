---
name: qa-confluence
description: 'Use when you publish QA documentation, use $qa-confluence, or draft a Confluence page.'
---

# qa-confluence

Prepare a QA page for {{CONFLUENCE_SITE}}, space {{CONFLUENCE_SPACE}}.

## Args

<message or document>

## Procedure

1. Confirm the integration is signed in and identify the destination page by title and parent. If access is unavailable, produce a local draft.

2. Read the source docs; preserve stable links and case IDs. Remove secrets and environment-file values. Follow qa-confluence-architecture for page placement.

3. Show the concrete page draft before any external write that lacks existing authorization. Never silently create duplicate pages or imply publishing succeeded without a URL.

4. Return the draft path or confirmed page URL and any unresolved permissions.

## Boundaries and evidence

Read AGENTS.md and the memory index first. Preserve role ownership, secrets rules and user-set parallelism. External messages, issues, PRs and page publishing need explicit authorization.

Use $qa-debugging on a failure, $qa-tdd for a new test and $qa-verify before a completion claim. These are repository-local Codex skills.

MCP is recon-only. Use the guide's cap for this playbook, or the active role's cap, whichever is lower. Close the browser after handoff. If a prerequisite is unavailable, report it without inventing evidence.

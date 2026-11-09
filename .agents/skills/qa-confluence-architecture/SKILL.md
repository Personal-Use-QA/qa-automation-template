---
name: qa-confluence-architecture
description: 'Use when you organize Confluence, choose a QA page parent, or map the docs tree.'
---

# qa-confluence-architecture

Map QA docs to a canonical tree in {{CONFLUENCE_SITE}} / {{CONFLUENCE_SPACE}}.

## Args

<document path or page goal>

## Procedure

1. Use Overview → Install / Run / Architecture / Test Cases / Findings / CI / Agent Operations. Keep feature cases under their domain.

2. Check existing titles and parent IDs before adding a page. Keep the repository the canonical source of technical facts; link rather than fork frequently changing content.

3. Use qa-confluence for authenticated publishing. Never place credentials, environment-file values or transient run state in pages.

4. Return the proposed parent, title, source links and migration or duplicate risks.

## Boundaries and evidence

Read AGENTS.md and the memory index first. Preserve role ownership, secrets rules and user-set parallelism. External messages, issues, PRs and page publishing need explicit authorization.

Use $qa-debugging on a failure, $qa-tdd for a new test and $qa-verify before a completion claim. These are repository-local Codex skills.

MCP is recon-only. Use the guide's cap for this playbook, or the active role's cap, whichever is lower. Close the browser after handoff. If a prerequisite is unavailable, report it without inventing evidence.

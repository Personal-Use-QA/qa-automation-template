---
name: qa-locators
description: 'Use when you implement page objects or API clients from an approved Controls catalog.'
---

# qa-locators

## Inputs

<case document or Controls catalog>

## Workflow

1. Read the approved case document, locator priority and the smallest relevant page/client chain.

2. Write only src/ui/pages/, divergent src/mobile/pages/ and src/api/clients/. Do not edit flows, fixtures, specs or case intent.

3. Verify each locator live; prefer test ID, accessible role/name, label/placeholder, text, then stable CSS. Page objects hold typed locator fields and PATH only; API clients hold endpoint maps and request builders.

4. Recon cap: 8 navigations, 12 snapshots, 24 safe interactions. Preserve the unsafe-tool deny in .codex/config.toml.

5. Return the verified locator-to-Control map, endpoint methods, evidence, changed paths and automation handoff.

Apply root AGENTS.md and the relevant nested guide. This is a Codex role/workflow skill, not a separately configured agent. Keep sequential handoffs unless the user authorizes delegation.

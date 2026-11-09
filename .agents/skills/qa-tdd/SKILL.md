---
name: qa-tdd
description: 'Use when you write net-new automated QA coverage for a defined business expectation.'
---

# qa-tdd

## Inputs

<approved case ID and expected behavior>

## Workflow

1. Read the case document and approved locator/client contract. Write a failing expectation for the intended business behavior.

2. Run the smallest relevant case and confirm it fails for the intended missing behavior, not a broken import, unavailable target or invalid locator.

3. Implement the minimum flow/fixture/spec change that satisfies that expectation. Preserve permanent case IDs and layer ownership.

4. Refactor only after the case is green. Do not weaken an assertion to erase a product defect; link and pin a verified known defect when needed.

5. Use $qa-verify to prove the final touched chain, including three repetitions. Return the observed red reason and final green evidence.

Apply root AGENTS.md and the relevant nested guide. This is a Codex role/workflow skill, not a separately configured agent. Keep sequential handoffs unless the user authorizes delegation.

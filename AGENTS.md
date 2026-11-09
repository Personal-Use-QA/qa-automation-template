## 1. Project and every turn

Project: {{PROJECT_NAME}}. Product: {{PRODUCT_NAME}}. Organization: {{ORG_NAME}}.

Stack: Playwright Test, TypeScript, Node LTS. Environment: {{ENV_NAME}}.

UI: {{BASE_URL_UI}}. API: {{BASE_URL_API}}. API references: {{API_SPEC_URLS}}.

Default role: {{DEFAULT_ROLE}}. Public demo tests use no credentials.

**Every turn:** verdict first; terse replies; current recon for live-app questions; multiple-choice decisions.

These instructions govern the entire repository. Nested mobile instructions add only domain-specific rules.

Source provenance and reconstruction limits are recorded in [the rules register](docs/agent/RULES-EXTRACT.md).

- Use Playwright Test, TypeScript and Node LTS.

- Give the verdict first and keep replies terse.

- Ground live-app questions in current recon evidence.

- Ask material decisions as multiple-choice questions.

- Separate observed facts from assumptions.

- Use public demo defaults until the team supplies target URLs.

## 2. Core mandate

- Stable, deterministic, business-readable UI automation. Testing is product.

- Decision order: stability → CI compat → root-cause → minimal change → reusability → readability.

- Fix root causes before increasing waits.

- Make the smallest change that meets the business requirement.

- Prefer reusable business actions over copied test steps.

- Keep evidence for every verification claim.

## 3. File ownership

<!-- prettier-ignore -->
| Path | Owner and contract |
| --- | --- |
| src/config/env.ts | Configuration maintainer: URLs and TIMEOUTS |
| src/fixtures/credentials.ts | Fixture maintainer: role credential resolver |
| src/ui/pages/ | Locators role: DOM definitions |
| src/api/clients/ | Locators role: request maps |
| src/ui/flows/, src/api/flows/ | Automation role: business actions |
| src/ui/fixtures/, src/api/fixtures/ | Automation role: dependencies |
| src/mobile/ | Automation and locators: divergent mobile behavior only |
| tests/ | Automation role: UI, API and mobile assertions |
| docs/testcases/ | Designer: Controls catalogs and case IDs |
| docs/findings/ | Architect: evidence and triage |
| docs/reference/, docs/guide/, docs/agent/ | Engineering owner: policy, guides and memory |
| scripts/ | Gate maintainer: checks and bootstrap |
| .agents/skills/, .codex/, AGENTS.md | Codex integration maintainer |
| .github/ | CI maintainer |
| package files, configs, bootstrap.sh, README.md, PLACEHOLDERS.md | Toolchain maintainer |
| .tools/ and ignored outputs | Local operator; never commit |

For any new top-level path, name an owner before adding it. Optional cases/ mirrors are a future upgrade.

- Every top-level path has an owner.

- Configuration owns non-secret URLs and timeout budgets.

- Credentials live only in the shared credential resolver.

- UI page objects own DOM locator definitions.

- API clients own endpoint maps and request builders.

- Flows own business actions.

- Fixtures own dependency setup.

- Specs own assertions.

- Designers own case documents; reviewers own findings triage.

## 4. Team layer ownership

- The pipeline is designer → locators → automation → architect.

- No role edits another role’s layer.

- Designer writes case documents, never production test code.

- Locators role writes page objects and clients.

- Automation role writes flows, fixtures and specs.

- Architect reviews evidence and may apply a clearly identified residual fix.

## 5. Page objects

```typescript
import type { Locator, Page } from '@playwright/test';

export class TodoPage {
  static readonly PATH = '/todomvc';
  // --- input ---
  readonly newTodoInput: Locator;
  // --- list ---
  readonly todoItems: Locator;
  readonly todoTitles: Locator;
  readonly toggleAll: Locator;
  readonly todoCount: Locator;
  constructor(page: Page) {
    // Reason: the demo input has no test ID; its placeholder is the stable user-facing label.
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.getByTestId('todo-item');
    this.todoTitles = page.getByTestId('todo-title');
    this.toggleAll = page.getByLabel('Mark all as complete');
    this.todoCount = page.getByTestId('todo-count');
  }
}
```

- Page objects contain locators only.

- Build typed Locator fields in the constructor.

- Keep the route in a static readonly PATH.

- Group fields with // --- name --- section comments.

- Verify every new locator against the live application.

- Use TodoPage as the worked example.

## 6. Flows

```typescript
import type { Page } from '@playwright/test';
import { TodoPage } from '../pages/todo.page';

/** Start a fresh todo list in the current isolated browser context. */
export async function openTodoApp(page: Page): Promise<void> {
  await page.goto(TodoPage.PATH);
}
/** Submit one title through the same input a user uses. */
export async function addTodo(page: Page, title: string): Promise<void> {
  const todo = new TodoPage(page);
  await todo.newTodoInput.fill(title);
  await todo.newTodoInput.press('Enter');
}
/** Mark every current todo complete in one business action. */
export async function completeAllTodos(page: Page): Promise<void> {
  await new TodoPage(page).toggleAll.check();
}
```

- A flow performs one business action.

- Give every exported flow JSDoc.

- Do not define selectors or locators in flows.

- Use only central TIMEOUTS when an explicit budget is necessary.

- Open the application through a flow.

- Reuse desktop flows for mobile unless behavior diverges.

## 7. Specs and isolation

```typescript
import { test, expect } from '../../src/ui/fixtures/ui.fixture';
import { addTodo, completeAllTodos, openTodoApp } from '../../src/ui/flows/todo.flow';
import { AS_NO_LOGIN } from '../../src/fixtures/credentials';

test.describe('Todo', { tag: ['@todo', AS_NO_LOGIN] }, () => {
  test.beforeEach(async ({ page }) => {
    await openTodoApp(page);
  });
  test(
    'Todo.TC01 - Positive Scenario - Page renders new-todo input',
    { tag: '@sanity' },
    async ({ todoPage }) => {
      await expect(todoPage.newTodoInput).toBeVisible();
    },
  );
});
```

- Specs contain assertions and flow calls only.

- Specs define zero selectors.

- Start each UI case from beforeEach.

- Do not rely on another test’s data.

- Use web-first assertions for UI state.

- Assert only counts for records the test itself created.

- API assertions validate response status and shape.

## 8. Comment style

- Write plain business English.

- Comments explain why, rather than narrating code.

- Keep comments to about three lines.

- Keep load-bearing facts.

- Translate jargon and put the technical token in parentheses.

- Preserve machine directives byte-identically.

- Use // Reason: before a justified positional locator.

## 9. Test naming

- UI titles use <Page>.TC<n> - <Positive|Negative> Scenario - <description>.

- API titles use TC<nn> - Positive|Negative - <bucket> - METHOD /path - <description>.

- Mobile titles use MTC identifiers.

- Classify Positive or Negative by expected outcome.

- Security no-bypass is Negative.

- Zero-pad identifiers past nine.

- Match case document titles to spec titles verbatim.

## 10. Locator priority

- Prefer stable test IDs.

- Next prefer role and accessible name.

- Next prefer visible labels or placeholders.

- Next prefer stable business text.

- Use stable CSS attributes only when semantic choices fail.

- Use a positional locator only with a documented reason and uniqueness evidence.

- Do not use XPath, volatile CSS classes or unscoped nth selectors.

## 11. Synchronization

<!-- prettier-ignore -->
| TIMEOUTS key | Default ms | Purpose |
| --- | --- | --- |
| visible | 15000 | Web-first visible state |
| enabled | 15000 | Action-ready state |
| page | 20000 | Navigation |
| modal | 10000 | Dialog transition |
| longAsync | 30000 | Measured asynchronous work |
| pollInterval | 1000 | Deliberate business polling only |
| test | 90000 | Entire case including sign-in |

Use a response promise created before its triggering action. An assertion waits for the expected business state; a sleep only delays a race.

- Never use page.waitForTimeout.

- Do not use magic-number timeouts.

- Never use expect.poll to hide a race.

- Arm a response wait before triggering its request.

- Use TIMEOUTS.visible and TIMEOUTS.enabled at 15000 ms by default.

- Use TIMEOUTS.page at 20000 ms and modal at 10000 ms.

- Use longAsync at 30000 ms and pollInterval at 1000 ms.

- Whole-test default is 90000 ms; size it from your own p99.

## 12. Environment and credentials

- Treat blank environment values as unset.

- Keep URLs and credentials in separate modules.

- Never commit credentials, live tokens or internal hostnames.

- Never print secrets in logs, docs, findings or connectors.

- Add a new user type to the union and both credential maps.

- Create the corresponding GitHub Secret pair.

- Throw on missing credentials rather than continuing half-signed-in.

## 13. Tagging

Held-out examples:

- @sqli → excluded by `^(?!.*@sqli)` → on demand only; payloads can leave junk or affect firewall rules.
- @xss → excluded by `^(?!.*@xss)` → on demand only; attack strings can persist.
- @logout-revokes → excluded by `^(?!.*@logout-revokes)` → on demand only; one logout may revoke every session.
- @journey → excluded by `^(?!.*@journey)` → on demand only; long chains may create users or send real email.

HELD_OUT_TAGS in scripts/tag-check.mjs initially has no test suites. Populate it when adding those cases.
Priority tags are @crit, @high, @med and @low. Do not mistake a meta tag for an Area.

- Every test has an Area tag.

- Every test has a Scope tag: @sanity, @smoke or @regression.

- Every test has exactly one @as-\* lane tag.

- Derive a role lane with asTag from the same role constant used for sign-in.

- Use @as-none for cases needing no sign-in.

- Reserve @parallel-safe, @serial-only and @flaky-watch as meta tags.

- Held-out tags must be excluded from sweeps with anchored negative lookaheads.

- Run security-payload, session-revoking and long-journey cases only on demand.

## 14. Severity and priority

See [severity rubric](docs/reference/severity-rubric.md). Fill slots CRIT → LOW; LOW drops first.

CRIT: broad data loss or access bypass. HIGH: a core action blocked without a practical workaround. MED: a meaningful action impaired with a workaround. LOW: limited presentation or convenience impact.

- Use CRIT, HIGH, MED and LOW severity.

- Fill test allocation slots from CRIT to LOW.

- Drop LOW coverage first when capacity is constrained.

- Record release-blocking, critical, normal or low priority.

- Separate business impact from scheduling priority.

- Use examples from the generic severity rubric.

## 15. Test-case management

The single table header is:

<!-- prettier-ignore -->
| TC | Sev | Tags | Title | Pre | Steps | Expect | Controls |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

Use permanent IDs; do not derive identifiers from row position. A future mirror may use {{CASE_PREFIX}}-<UI|API|MOB>-<PAGE>-<nnnn>; no mirror sync is shipped.

Reusable designer prompt:

> $qa-designer: inspect the named route as the agreed role; inventory Controls; draft severity-graded cases in docs/testcases/; use one table; keep IDs permanent; match future spec titles exactly; state source and live verification evidence; do not edit code.

Synchronize role tags before generating a mirror. Parsers that read the first table require the case table to be first and only. Do not add summary tables above it.

- Write case docs before automation.

- Record Source, Roles and Scope above the case table.

- Use exactly one case table per document.

- The columns are TC, Sev, Tags, Title, Pre, Steps, Expect and Controls.

- Never delete or renumber permanent TC IDs.

- Strike through retired cases.

- Use semicolons to separate concise Steps and Expect actions.

- Assert shape rather than fixed shared values.

- Name every locator used in the Controls column.

- Document case-sync as an optional upgrade, not a shipped capability.

## 16. Findings

Use [the finding template](docs/findings/TEMPLATE.md). Preserve heading-line labels exactly. Run findings:check before an issue filing action.

This scaffold does not automatically file issues or publish reports. Nightly healing drafts triage and only writes externally when authorized. Review test skips without automatically changing them.

- Each finding starts with a numbered level-two heading.

- Include Type, Severity - triage and Priority - triage heading lines.

- Include Summary, Steps to recreate, Actual, Expected, Impact, Screenshot / video and Other details.

- A still is required; a clip is a bonus.

- Allow None only with an inline reason.

- Deduplicate before filing an issue.

- Never claim an issue exists without its URL.

- Pin a known defect with test.fail and a finding link, or skip with a linked reason.

## 17. Continuous integration

GitHub environment: {{GH_ENVIRONMENT}}. Runner: {{RUNNER_LABEL}}. Shared concurrency group: {{CONCURRENCY_GROUP}}.

The sanity command has --global-timeout=150000 and a four-minute workflow step cap. The extra margin allows Playwright to write its report. The sanity gate expects three cases (two UI, one API); update that contract with coverage.

- The PR gate asks whether anything breaks, coverage is complete and the target environment still works.

- Run install, lint, format, typecheck, list and gates before the sanity lane.

- Use an in-Playwright global timeout shorter than the workflow step cap.

- Fail the sanity gate for skips, flakes, failures and a short count.

- Put every job sharing login accounts in the same concurrency group.

- Never cancel a state-changing job.

- Upload failure evidence even when the suite fails.

## 18. Units and lanes

Template defaults: WORKERS={{WORKERS}}, MAX_LANES={{MAX_LANES}}. These are team choices, not tuning suggestions.

Largest screen units go first. Separate output directories and report filenames for simultaneous local runs. Account for hourly and nightly jobs using the same runner pool.

- Split regression units by screen.

- Map each UI spec to exactly one unit.

- Start unit greps with ^.

- WORKERS and MAX_LANES are team decisions; agents never raise them.

- State-changing cases sharing balances run first, alone, with one worker.

- Never assert absolute totals in a shared environment.

- Do not let concurrent runs share an output folder.

## 19. Forbidden practices

The reference forbidden table is unavailable; this table reconstructs only supplied rules.

<!-- prettier-ignore -->
| Forbidden | Required alternative |
| --- | --- |
| Fixed sleeps | Wait for a business-visible state |
| Symptom-only retry or timeout bump | Root-cause evidence |
| Selectors in flows/specs | Locator fields in page objects |
| Unlinked skips | Linked finding and clear reason |
| Swallowed failed actions | Fail with useful evidence |
| Focused committed tests | Full intended discovery |
| Shared output folders | One output path per concurrent run |
| Absolute shared totals | Assert the test's own changes |
| Unverified issue claims | A real issue URL |
| Unsafe browser code tool | Approved recon tools only |

- Do not use test.only.

- Do not swallow a failed step with try/catch.

- Do not use test.skip without a linked reason.

- Do not make a failing case silently pass.

- Do not hard-code secret data.

- Do not add selectors to specs or flows.

- Do not replace missing recon with remembered DOM.

## 20. Definition of Done

Required verification: npm run lint; npm run format:check; npm run typecheck; tags:check; lanes:check; findings:check; affected cases with --repeat-each=3.

Changes to page objects or flows also need a Controls update and docs:check against the base revision. Read the trace if behavior changed. A skipped or flaky run cannot substantiate a green completion claim.

- Lint, formatting and typecheck are clean.

- Prove the touched tests green with --repeat-each=3.

- There is no fixed sleep in the touched call chain.

- Titles and tags match case documents.

- No secret appears in changed files or artifacts.

- New UI has new tests in the same PR.

- Review the trace for unexplained errors.

## 21. Roles and handoffs

<!-- prettier-ignore -->
| Role | Reads | Writes | Never edits | Tools | Exit |
| --- | --- | --- | --- | --- | --- |
| designer | Brief, guide, live recon | Case docs | src/, tests/ | Repository reads and case-doc writes; navigate/snapshot/close | Cases, Controls, risk gaps |
| locators | Case Controls, live DOM | Page objects, API clients | Case intent, flows, specs | Repository editing and shell; safe browser recon | Every locator verified |
| automation | Cases, locator contract | Flows, fixtures, specs | Locator definitions, case intent | Repository editing and shell; safe browser recon | Three green repetitions |
| architect | Diff, docs, reports, traces | Review; identified residual fix | Broad implementation rewrite | Repository/shell review; read-only browser recon | GO / GO-WITH-RISK / NO-GO |

Handoff note: role; case IDs; changed paths; verified Controls; evidence; unresolved risks; next role.

Architect output: verdict, blockers, accepted risks with owner, checks and literal output, evidence links. GO-WITH-RISK requires an explicit residual risk and owner. Missing root-cause evidence is NO-GO.

Caps are starter budgets because original values are unavailable: designer 6 navigations / 8 snapshots / 0 interactions; locators 8 / 12 / 24; automation 4 / 6 / 12; architect 4 / 6 / 0. Close browsers on handoff.

- Each role states its inputs and outputs.

- Each role states its never-edit boundary.

- Hand off case IDs, Controls, verified locators and evidence paths.

- Write a short hand-off note between sequential Codex roles.

- Designer MCP tools are navigate, snapshot and close only.

- Architect MCP is read-only.

- Architect verdict is GO, GO-WITH-RISK or NO-GO, with cited evidence.

## 22. Playbooks

Codex discovers these repository-local skills automatically. Invoke one explicitly with its `$name`.

<!-- prettier-ignore -->
| Trigger | Canonical Codex skill |
| --- | --- |
| $awesome-design | [awesome-design](.agents/skills/awesome-design/SKILL.md) |
| $ba-comment-architect | [ba-comment-architect](.agents/skills/ba-comment-architect/SKILL.md) |
| $ba-issue-report | [ba-issue-report](.agents/skills/ba-issue-report/SKILL.md) |
| $fable-mode | [fable-mode](.agents/skills/fable-mode/SKILL.md) |
| $nightly-heal | [nightly-heal](.agents/skills/nightly-heal/SKILL.md) |
| $qa-a11y | [qa-a11y](.agents/skills/qa-a11y/SKILL.md) |
| $qa-architect | [qa-architect](.agents/skills/qa-architect/SKILL.md) |
| $qa-automation | [qa-automation](.agents/skills/qa-automation/SKILL.md) |
| $qa-confluence | [qa-confluence](.agents/skills/qa-confluence/SKILL.md) |
| $qa-confluence-architecture | [qa-confluence-architecture](.agents/skills/qa-confluence-architecture/SKILL.md) |
| $qa-debugging | [qa-debugging](.agents/skills/qa-debugging/SKILL.md) |
| $qa-designer | [qa-designer](.agents/skills/qa-designer/SKILL.md) |
| $qa-finding | [qa-finding](.agents/skills/qa-finding/SKILL.md) |
| $qa-locators | [qa-locators](.agents/skills/qa-locators/SKILL.md) |
| $qa-manual | [qa-manual](.agents/skills/qa-manual/SKILL.md) |
| $qa-tdd | [qa-tdd](.agents/skills/qa-tdd/SKILL.md) |
| $qa-team | [qa-team](.agents/skills/qa-team/SKILL.md) |
| $qa-team-a11y | [qa-team-a11y](.agents/skills/qa-team-a11y/SKILL.md) |
| $qa-team-expand | [qa-team-expand](.agents/skills/qa-team-expand/SKILL.md) |
| $qa-team-explore | [qa-team-explore](.agents/skills/qa-team-explore/SKILL.md) |
| $qa-team-fix | [qa-team-fix](.agents/skills/qa-team-fix/SKILL.md) |
| $qa-team-flake | [qa-team-flake](.agents/skills/qa-team-flake/SKILL.md) |
| $qa-team-mobile | [qa-team-mobile](.agents/skills/qa-team-mobile/SKILL.md) |
| $qa-team-regress | [qa-team-regress](.agents/skills/qa-team-regress/SKILL.md) |
| $qa-team-roles | [qa-team-roles](.agents/skills/qa-team-roles/SKILL.md) |
| $qa-team-smoke | [qa-team-smoke](.agents/skills/qa-team-smoke/SKILL.md) |
| $qa-ui | [qa-ui](.agents/skills/qa-ui/SKILL.md) |
| $qa-verify | [qa-verify](.agents/skills/qa-verify/SKILL.md) |
| $rate | [rate](.agents/skills/rate/SKILL.md) |

- Keep one canonical skill under .agents/skills/<name>/SKILL.md.

- Keep each skill directly in .agents/skills/ so Codex discovers one canonical tracked copy.

- Skill descriptions begin Use when and name trigger phrases.

- Invoke Codex skills directly with $skill-name or through automatic selection. No command wrappers are required.

- Dormant skills must be completed before use.

- Nightly healing separates TEST defects from PRODUCT defects.

- Review skips, never auto-fix them.

## 23. Engineering discipline

- Use $qa-tdd for net-new tests: failing expectation first.

- Use $qa-debugging to investigate a failure before any fix.

- A symptom patch receives NO-GO.

- Use $qa-verify before making a completion claim.

- Do not add planning bureaucracy inside the pipeline.

- Use read-only investigation when a broad sweep is explicitly delegated.

## 24. Output style

Use proactive ranking for an open-ended request, concise execution results for an instruction, and a direct supported explanation for a question. Keep blockers and failed checks explicit even in compressed replies.

- For what next, rank work by severity and gaps.

- For an instruction, do the work and give one or two result lines.

- For a question, answer first and support it with path:line.

- Compress responses without dropping evidence or caveats.

- Distinguish planned actions from completed actions.

- Do not call unrun tests green.

## 25. Memory and token economy

Memory admission is documented in [the memory guide](docs/agent/memory/README.md). Read [the index](docs/agent/memory/MEMORY.md) at session start.

Global tools are optional. Postman CLI: {{POSTMAN_CLI_PATH}}. A plus-addressed test mailbox uses {{TEST_MAILBOX_DOMAIN}}. Never assume account-level integrations are signed in.

Delegate a broad read-only investigation only when delegation is authorized. Return file references and findings rather than copying a full repository into the active context.

- Read docs/agent/memory/MEMORY.md at session start.

- Add or update a fact only when it is stable and useful.

- Never duplicate a memory.

- Delete a fact that turns out wrong.

- Do not store transient bug state, diffs or facts already recorded by code or Git.

- Read the smallest relevant slice first.

- Do not reload the same source slice.

## 26. Playwright MCP

Use environment injection for configuration; never print or copy credentials. A source policy that prohibits reading .env takes precedence over recon convenience.

Weekly stale guard:

```sh
find reports/explore/dom -name '*.yaml' -mtime +7
```

<!-- prettier-ignore -->
| Playbook | Navigations | Snapshots | Interactions |
| --- | --- | --- | --- |
| qa-team | 12 | 18 | 24 |
| qa-team-mobile | 12 per device | 18 per device | 24 per device |
| qa-team-a11y | 6 | 8 | 12 |
| nightly-heal | 4 | 6 | 8 |
| rate | 0 | 0 | 0 |
| Dormant playbooks | 0 | 0 | 0 until completed |

These are conservative template budgets, not recovered reference values. If a cap prevents adequate evidence, stop recon and report the gap.

Only non-secret target URLs may appear in hook context. Keep browser sessions isolated; clear per-run recon output. MCP tools never replace the committed Playwright Test suite.

- Use MCP for reconnaissance only, never in committed test code.

- Resolve target URLs and credentials before the first authenticated recon call.

- Sign in before inspecting authenticated screens.

- Name snapshots reports/explore/dom/<url-slug>.yaml.

- Reuse a snapshot only when its URL, role and DOM context are still current.

- Use the weekly stale guard before reusing old snapshots.

- Emit [MCP-OFFLINE], [MCP-SKIP] <route> or [STALE-DOM] when applicable.

- Never use browser_run_code_unsafe.

- Submit sign-in with Enter on WebKit when overlays swallow clicks.

- Conflict order is AGENTS.md > playbook > discipline skill > MCP.

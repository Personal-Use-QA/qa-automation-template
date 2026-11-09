# Automation Exercise role handoffs

## Designer → locators, 2026-11-09

Input: user request for a temporary Automation Exercise functional example; root rules; official UI and API reference; current public DOM snapshots. Output: [permanent case and Controls contract](../testcases/automationexercise.md), AE01–AE29 and API01–API14. Designer edited no implementation files.

Verified public surfaces: `/`, `/products`, `/product_details/1`, `/login`, `/view_cart`, `/contact_us`; visitor role; local Chromium accessibility snapshot and HTML capture because Playwright MCP was unavailable. Evidence: `reports/explore/dom/ae-{home,products,detail,login,cart,contact}.{yaml,html}`. Six navigations/snapshots, zero interactions; browser closed by collector.

Next: locator role verifies every named Control, including post-signup and authenticated screens, before implementing page objects and API request maps. Preserve the permanent titles, independent data, daily/on-demand separation and synthetic-data cleanup. Registration, populated cart, checkout, payment, invoice and dynamic outcomes have requirements-source evidence only at this handoff.

Risk owner: example maintainer. The public practice site and advertising-consent UI are external dependencies. Coverage is the published functional baseline plus three explicit gaps; no claim of exhaustive functional correctness or a green run is made here.

## Locators → automation, 2026-11-09

Input: AE01–AE29, API01–API14 and the Controls contract. Output: the locator-only `src/ui/pages/automation-exercise.page.ts` and endpoint/request builders in `src/api/clients/automation-exercise.client.ts`. This role does not change case intent, flows, fixtures or assertions.

The current public snapshots were followed by signup, added-product modal, visitor checkout gate, authenticated checkout, payment and both reference-page snapshots: `reports/explore/dom/ae-{signup,added,anonymous-checkout,checkout,payment,test-cases,api-list}.yaml`; signup/checkout/payment field inventories are adjacent JSON files. Aggregate recon used twelve direct navigations, thirteen snapshots and fifteen interactions. The authenticated customer was disposable and deleted after recon. Browser sessions closed at handoff. Reference scenario and API-entry patterns are visible in the captured reference snapshots.

Next: automation uses these locators through business flows and proves dynamic confirmations, account deletion, search/category/brand results, submission outcomes and invoice downloads with the committed suite. Snapshots establish the inspected DOM, while execution reports must establish dynamic behavior. No complete locator-verification or green-suite claim is made before those results exist.

## Automation debugging → architect, 2026-11-09

Test-defect evidence: `results/ae-ui-first.json` records AE12 expecting `Rs. 0.5` while the page shows `Rs. 500`, AE13 expecting `Rs. 2` while its four-item line shows `Rs. 2000`, and AE08 resolving only the bold `Availability:` label. Retaining the currency-prefix dot during numeric conversion caused the price errors; the flow now strips the `Rs.` prefix before converting the amount. The detail locator now selects the paragraph containing the availability label and value; condition and brand use the same containing-paragraph contract. These are test fixes, not evidence of product defects; no product finding is filed for them.

Residual Controls review: all 29 UI rows were synchronized against the final TypeScript flow bodies and direct assertions, including catalogue navigation, modal waits, captured name/price, signup fields, account deletion, reference entries and checkout assertions. AE23 follows registration before checkout and compares both address blocks with every submitted business address field. Exact titles and role tags were preserved. Full suite verification and trace review remain the automation/architect exit gate.

## Final automation → architect, 2026-11-09

Input: the 43-case contract and verified page/client fields. Output: layered flows, isolated fixtures and specs under `tests/automationexercise/`, the dedicated Playwright config, daily workflow and public results-summary generator. Automation did not change the approved case intent. The original Todo/API defaults and staged scaffold remain available.

Representative TDD evidence: `results/ae-ui-red.json` fails AE13 because no add action occurred; its trace contains one cart request and zero add-to-cart requests. The implemented flow produces the requested line and quantity. API05's red report, `results/ae-api-red-confirmed.json`, returned the unfiltered catalogue before its flow used the search request. The first HTTP 520 attempt was environment evidence and was not counted as a meaningful TDD failure.

Readiness evidence: the saved products HTML binds search after synchronous scripts at the bottom of the document. A successful trace shows input filling at 14079.938 ms while jQuery completes at 14137.114 ms; the later traced click succeeds. An earlier untraced AE20 search left the complete catalogue unchanged, and AE17 removal left its row visible. This supports an inference that actions preceded handler binding; the exact failed handler timing was not captured. Navigation now waits for page load before those actions, and search arms its destination wait before clicking. The separate AE09 detail-navigation timeout remains classified as navigation timing, without claiming that the handler inference explains it. Six focused search/removal executions passed; trace summaries show zero action, page or application HTTP errors in `reports/verification/ae-traces.json`.

Contact-specific corrections: the return link's accessible name includes an icon, so its locator is scoped to the contact confirmation and matches the Home suffix. A reset form after submission supported the same handler-readiness inference; contact navigation now waits for load. The return page briefly exposed three repeated hero headings before styles settled; the locator now targets the active carousel slide and return navigation waits for load. AE04, AE06, AE25 and AE26 then passed three times each. The dedicated contact trace passed with zero action/HTTP errors and one explained provider-required error from the unused Google Maps library, because third-party requests are deliberately blocked. Provider behavior remains outside this example; no unexplained trace error is being ignored.

## Architect verdict: GO-WITH-RISK, 2026-11-09

No remaining implementation blocker. Cases AE01–AE29 and API01–API14 each have three passing executions in the latest applicable evidence: 39 unchanged cases from the broad batch, plus four cases from the final affected batch. The broad batch itself was **not green**: its `126 passed, 3 failed` result remains intact. Two failures led to the contact fixes; one was the external queue-full response recorded in the [availability finding](../findings/automation-exercise-availability.md). No failure was converted into a skip, expected failure or retry.

Commands and literal results:

- `npm ci`: installed successfully; audit reported seven existing moderate development-dependency advisories, zero high/critical.
- `npm run lint`, `npm run typecheck`: exit 0.
- `npm run format:check`: `All matched files use Prettier code style!`
- `npm run list`: exit 0; original-project discovery preserved.
- `npm run tags:check`: `OK tags: 19 collected project cases`.
- `npm run tags:check -- --config=playwright.automationexercise.config.ts`: `OK tags: 43 collected project cases`.
- `npm run lanes:check`: `OK lanes: 7 UI files mapped exactly once`.
- `npm run findings:check`: `OK findings: 1 finding sections validated`.
- `npm run docs:check -- 32960fa0a21ce8a9df87467e3a1da8da7b84de7d`: `OK doc sync`.
- `node --test scripts/automationexercise-report.test.mjs`: `tests 10`, `pass 10`, `fail 0`, `skipped 0`.
- `actionlint .github/workflows/automationexercise-regression.yml`: exit 0, no diagnostics; official binary checksum verified.
- Full dedicated config, both projects, `--repeat-each=3`: `126 passed`, `3 failed`; `results/ae-final.json`.
- UI grep `TC(04|06|25|26)`, `--repeat-each=3`: `12 passed`; `results/ae-final-affected.json`.
- Daily anchored exclusions, both projects, zero retries: `24 passed`; report gate: `OK Automation Exercise: 24 passed, 0 skipped/flaky/failed`; `results/automationexercise.json`.
- Original sanity plus its gate: `3 passed`; `OK sanity: 3 passed, 0 skipped/flaky/failed`.
- Exact case contract audit: 43 titles and tag sets match the case document; source/config binding: 46 hashes unchanged after final affected verification.

Evidence is local and bound to base `32960fa0a21ce8a9df87467e3a1da8da7b84de7d` with an explicitly dirty working tree. The broad source manifest is `reports/verification/ae-tree-fullbatch.json`; the final manifest is `reports/verification/ae-tree.json`; consolidated results are `reports/verification/ae-final-summary.json`. Full reports remain under `playwright-report/`. The generated public summary is `public/automationexercise/index.html`; its rendered layout was inspected in `reports/verification/ae-pages-preview.png`. It contains 24 result rows and no raw account/request evidence.

Residual risks and owners:

- Example maintainer: public-site queue/HTTP 520 availability and unverified third-party providers; the normal failure gate remains active.
- Repository maintainer: no Git remote is configured, so Actions scheduling and live Pages publication are not activated or remotely verified. Follow the [activation steps](../guide/ci.md#temporary-automation-exercise-example).
- Toolchain maintainer: seven existing moderate development-dependency advisories; dependency upgrades were outside this temporary example.
- CI maintainer: existing scaffold workflows still contain team placeholders and need configuration or explicit disabling before their own runs are expected to work.

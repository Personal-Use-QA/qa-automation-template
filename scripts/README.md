# Gates

<!-- prettier-ignore -->
| Command | Proves | Mode |
| --- | --- | --- |
| npm run tags:check | Resolved Area, Scope and exactly one lane per collected case; held-out exclusions | Blocks |
| npm run lanes:check | Each UI spec maps once to nightly units; sweep greps anchored | Blocks |
| npm run findings:check | Complete numbered findings and valid triage headings | Blocks |
| npm run sanity:gate -- --report results/sanity.json --expect 3 | No failures, skips, flakes or missing cases | Blocks |
| npm run docs:check -- BASE_SHA | Locator/action changes include case-doc updates | Blocks |

HELD_OUT_TAGS includes the temporary example's `@journey` and `@logout-revokes` suites. Add each additional held-out tag when introducing that suite; update every sweep negative lookahead. `tags:check` accepts `--config=playwright.automationexercise.config.ts` to validate the separate example. Sanity expected count is 3 across Chromium UI and API; mobile is a separate project. Revisit the count whenever cases change.

The Automation Exercise daily workflow records discovery before execution. `node scripts/automationexercise-report.mjs --check` compares case identities and rejects missing cases, retries, skips, flakes and failures. `--publish` writes a public metadata summary to ignored `public/automationexercise/`; full errors, attachments and source are excluded. Both commands read `results/automationexercise.json` and `results/automationexercise-discovery.json`. The screen list in `AE_UI_UNITS` is checked against the example UI files by `lanes:check`.

Run the doc gate in CI against the PR base and optionally from a pre-commit hook; it cannot infer undocumented UI changes. Lint's skipped-case and missing-expect rules warn; fixed sleeps are errors.

# Run

Projects: ui-chromium, ui-firefox, ui-webkit, api, mobile-chromium, mobile-webkit, tablet-chromium, tablet-webkit.

```sh
npm run list
npm run test:sanity
npm run test:api
npm run test:mobile
npx playwright test --project=ui-chromium --grep '^.*@todo' --repeat-each=3
npx playwright test --project=ui-chromium --reporter=html
npm run report
```

Area tags identify features, Scope selects sanity/smoke/regression, and @as-\* is the execution lane. Held-out suites run through on-demand; nightly greps exclude reserved risk tags.

Local JSON is results/local.json. Concurrent runs need distinct PLAYWRIGHT_OUTPUT_DIR and PLAYWRIGHT_JSON_OUTPUT_NAME. Never increase WORKERS or MAX_LANES without the team's decision.

## Temporary Automation Exercise example

The separate config targets `https://automationexercise.com` and discovers `tests/automationexercise/` only. The original Todo and API examples retain their defaults. Override the practice target with the non-secret `AUTOMATION_EXERCISE_URL` when needed; this config does not use `BASE_URL_UI` or `BASE_URL_API`.

```sh
npm run test:ae
npm run test:ae -- --repeat-each=3
npm run tags:check -- --config=playwright.automationexercise.config.ts
```

Default discovery selects 24 guest UI/API cases. The complete contract has 43 cases: the site's 26 published UI scenarios, 14 API scenarios, and three additional guest checks. Explicit journeys add registration, sign-in, checkout, invoice, subscription, contact and review cases. Run journeys only on demand, with synthetic data and automatic disposable-account cleanup:

```sh
# Bash
AE_ALLOW_JOURNEYS=1 npm run test:ae -- --grep '^.*@(journey|logout-revokes)' --repeat-each=3
```

```powershell
# PowerShell: invoke Node directly if a local npx shim consumes regex characters.
$env:AE_ALLOW_JOURNEYS = '1'
node node_modules/@playwright/test/cli.js test --config=playwright.automationexercise.config.ts --grep '^.*@(journey|logout-revokes)' --repeat-each=3
Remove-Item Env:AE_ALLOW_JOURNEYS
```

Each case owns its account and browser context. Synthetic identities are generated in the shared credential resolver; no team credentials or real card details are required. All third-party resource hosts are blocked, including advertising, consent and map providers; provider behavior is outside this functional example. The contact page's unused map library consequently reports a provider-required error in its trace, while the form and return navigation are verified. Journey tracing is disabled to avoid recording disposable passwords. Failure screenshots can contain synthetic customer data and stay in workflow artifacts. The public Pages output includes only allowlisted result metadata.

Output defaults are `results/automationexercise.json`, `playwright-report/automationexercise/`, and `test-results/automationexercise/`. Concurrent runs must override all three using `PLAYWRIGHT_JSON_OUTPUT_NAME`, `PLAYWRIGHT_HTML_OUTPUT_DIR`, and `PLAYWRIGHT_OUTPUT_DIR`. Review the [CI activation steps](ci.md#temporary-automation-exercise-example) before pushing to a GitHub default branch.

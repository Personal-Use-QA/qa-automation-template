# CI

The PR gate runs install, lint, formatting, types, discovery, tags, lanes, findings and a blocking sanity suite. The sanity report must contain at least three passed cases with zero skips, flakes or failures.

The Playwright global timeout is shorter than the step cap so JSON can be written. All shared-account workflows use one concurrency group with cancel-in-progress false. Largest screen units go first and each UI file maps once.

Configure environment {{GH_ENVIRONMENT}}, runner {{RUNNER_LABEL}} and group {{CONCURRENCY_GROUP}}. Repository: {{GITHUB_REPO}}. URLs belong in BASE_URL_UI / BASE_URL_API Variables. Credentials belong in TEST_USER_EMAIL / TEST_USER_PASSWORD Secrets, scoped to the selected environment. Never print their values.

Daily Chromium includes API; weekly Firefox and WebKit reuse \_ui-unit.yml. On-demand takes anchored grep, project and repetitions. Values enter shell scripts through environment variables rather than direct expression interpolation.

Artifacts bind to the workflow revision. The scaffold does not auto-file findings. State-changing jobs must never be canceled.

## Temporary Automation Exercise example

`.github/workflows/automationexercise-regression.yml` runs guest Chromium and API regression daily at **02:17 UTC** (03:17 in Malta during winter; 04:17 during summer). GitHub schedules can be delayed. The workflow has a fixed concurrency group and never cancels an active run. It uses Node LTS without changing the template's worker or lane choices.

The separate `playwright.automationexercise.config.ts` keeps the existing Todo example and its environment defaults intact. The daily anchored grep excludes `@journey`, `@logout-revokes`, `@sqli` and `@xss`. Choose **Run workflow → include_journeys** to explicitly run disposable account, checkout and contact cases. That job sets `AE_ALLOW_JOURNEYS=1`; no shared account secrets are supplied. Journey reports have distinct paths and never enter the public summary.

Before execution, CI records the discovered daily cases. `node scripts/automationexercise-report.mjs --check` requires exactly that identity set, both selected projects, one successful attempt per case, and zero report errors, skips, flakes or failures. Full Playwright HTML, JSON and failure evidence upload even after failures; artifacts follow repository access and expire after 14 days (7 for journeys).

Tag discovery includes on-demand cases without executing them. The Controls gate compares the checked-out revision with its first parent, or the empty tree for a repository's first commit; the template PR gate separately compares against the PR base.

The Pages job publishes an allowlisted results summary even if regression fails. It exposes only case titles, project names, outcomes, durations, the workflow link and revision. It does not copy source, raw errors, screenshots, traces or request data into Pages. The site always represents the latest daily run, not report history. Pages publication failure remains a workflow failure.

To activate after pushing to the intended GitHub repository:

1. Enable Actions and allow the workflow actions used here.
2. In **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**.
3. Allow the default branch in the `github-pages` environment's deployment protection settings.
4. Put this workflow and the example on the default branch, then run **Automation Exercise daily regression** manually once.
5. Open the URL shown by the `pages` deployment. Confirm a failed regression displays **Requires review** while the test job stays red.

No repository remote is configured in the current local checkout; these files prepare deployment and do not establish a live Pages URL. Remove this example workflow when replacing the temporary target. Existing template workflows still require their documented placeholder setup.

References: [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [setup-node](https://github.com/actions/setup-node), [upload-artifact](https://github.com/actions/upload-artifact).

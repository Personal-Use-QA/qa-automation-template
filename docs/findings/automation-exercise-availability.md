# Automation Exercise availability

## 1. Public practice site sometimes replaces sign-out confirmation with a queue page

**Type:** config
**Severity - triage:** MED
**Priority - triage:** normal

### Summary

The external practice environment intermittently serves a heavy-load page during a normal customer journey. This is observed environment availability evidence; it does not establish an account or sign-out product defect.

### Steps to recreate

1. Run AE04 against `https://automationexercise.com` using its own disposable account.
2. Sign in and choose Logout.
3. Inspect the destination instead of automatically refreshing or retrying it.

### Actual

The third AE04 execution in the three-repeat batch displays the site's heavy-load, queue-full message. The login form is absent. Earlier AE04 executions reached the expected login form.

### Expected

AE04 expects the login form after sign-out, with the customer identity no longer displayed. The external environment must be available to establish that result.

### Impact

Public visitors and automated checks can be interrupted. A failed execution remains failed; it cannot substantiate a green completion claim. The daily report gate will expose missing or failed outcomes.

### Screenshot / video

[Queue-full page](evidence/ae-site-queue-full.png). The still contains no customer details. No clip was recorded because account journeys disable recording of disposable credentials.

### Other details

Observed 2026-11-09 in Chromium, one worker, zero retries. Base revision: `32960fa0a21ce8a9df87467e3a1da8da7b84de7d`, with local changes; source manifest: `reports/verification/ae-tree-fullbatch.json`. Run: `results/ae-final.json`; failure context: `test-results/ae-final/account-Automation-Exercis-ed599-io---Sign-out-of-an-account-ae-chromium-repeat2/error-context.md`. Root cause is outside this repository: the destination serves the explicit queue page. An earlier independent navigation also returned HTTP 520. Owner: example maintainer, to monitor and distinguish availability from functional failures. Local findings were checked for duplicates; no external issue was filed.

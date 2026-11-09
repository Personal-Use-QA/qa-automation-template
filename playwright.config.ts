// Reason: explicit projects and isolated output keep shared environments predictable.
import { defineConfig, devices } from '@playwright/test';
import { BASE_URL_UI, BASE_URL_API, TIMEOUTS, fromEnv } from './src/config/env';
const isCI = Boolean(process.env.CI);
function configured(value: string, fallback: string): string {
  return value.startsWith('{') ? fallback : value;
}
/** Reject typos instead of silently accepting an empty emulation profile. */
export function deviceProfile(name: string) {
  const profile = devices[name];
  if (!profile) throw new Error('Unknown Playwright device: ' + name);
  return profile;
}
/** Form-factor-only cases should never leak into the opposite device sweep. */
export function projectGrepInvert(form: 'mobile' | 'tablet'): RegExp {
  return form === 'mobile' ? /@tablet-only/ : /@mobile-only/;
}
export default defineConfig({
  testDir: './tests',
  forbidOnly: isCI,
  fullyParallel: true,
  // The one CI retry only separates machine noise from real failures; flakes are defects.
  retries: isCI ? 1 : 0,
  // Shared role accounts; parallelism is a team decision.
  workers: Number(fromEnv(process.env.WORKERS, configured('{{WORKERS}}', '1'))),
  // Two runs sharing this folder delete each other's artefacts.
  outputDir: process.env.PLAYWRIGHT_OUTPUT_DIR ?? 'test-results',
  reporter: isCI
    ? [['html'], ['github'], ['json']]
    : [['list'], ['json', { outputFile: 'results/local.json' }]],
  metadata: { branch: process.env.GITHUB_REF_NAME, commit: process.env.GITHUB_SHA?.slice(0, 8) },
  timeout: TIMEOUTS.test,
  expect: { timeout: TIMEOUTS.visible },
  use: {
    actionTimeout: TIMEOUTS.enabled,
    navigationTimeout: TIMEOUTS.page,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  projects: [
    {
      name: 'ui-chromium',
      testDir: './tests/ui',
      use: { ...devices['Desktop Chrome'], baseURL: BASE_URL_UI },
    },
    {
      name: 'ui-firefox',
      testDir: './tests/ui',
      use: { ...devices['Desktop Firefox'], baseURL: BASE_URL_UI },
    },
    {
      name: 'ui-webkit',
      testDir: './tests/ui',
      use: { ...devices['Desktop Safari'], baseURL: BASE_URL_UI },
    },
    { name: 'api', testDir: './tests/api', use: { baseURL: BASE_URL_API } },
    {
      name: 'mobile-chromium',
      testDir: './tests/mobile',
      grepInvert: projectGrepInvert('mobile'),
      use: { ...deviceProfile(configured('{{DEVICE_MOBILE}}', 'Pixel 10')), baseURL: BASE_URL_UI },
    },
    {
      name: 'mobile-webkit',
      testDir: './tests/mobile',
      grepInvert: projectGrepInvert('mobile'),
      use: {
        ...deviceProfile(configured('{{DEVICE_MOBILE_WEBKIT}}', 'iPhone 17')),
        baseURL: BASE_URL_UI,
      },
    },
    {
      name: 'tablet-chromium',
      testDir: './tests/mobile',
      grepInvert: projectGrepInvert('tablet'),
      use: {
        ...deviceProfile(configured('{{DEVICE_TABLET}}', 'Galaxy Tab S9')),
        baseURL: BASE_URL_UI,
      },
    },
    {
      name: 'tablet-webkit',
      testDir: './tests/mobile',
      grepInvert: projectGrepInvert('tablet'),
      use: {
        ...deviceProfile(configured('{{DEVICE_TABLET_WEBKIT}}', 'iPad Pro 11')),
        baseURL: BASE_URL_UI,
      },
    },
  ],
});

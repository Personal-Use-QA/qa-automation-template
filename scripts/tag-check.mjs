// Reason: use collected test metadata so inherited tags and role constants are resolved.
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
const require = createRequire(import.meta.url);
// Add tags here when introducing held-out suites; keep every sweep exclusion in sync.
export const HELD_OUT_TAGS = ['@journey', '@logout-revokes'];
const config = process.argv.slice(2).find((arg) => arg.startsWith('--config='));
const discoveryEnv = { ...process.env };
if (config === '--config=playwright.automationexercise.config.ts')
  discoveryEnv.AE_ALLOW_JOURNEYS = '1';
// Reason: discovery must return JSON to the checker without replacing an execution report.
delete discoveryEnv.PLAYWRIGHT_JSON_OUTPUT_NAME;
delete discoveryEnv.PLAYWRIGHT_JSON_OUTPUT_DIR;
const listed = spawnSync(
  process.execPath,
  [
    require.resolve('@playwright/test/cli'),
    'test',
    '--list',
    '--reporter=json',
    '--grep',
    '^',
    ...(config ? [config] : []),
  ],
  { encoding: 'utf8', env: discoveryEnv },
);
if (listed.status !== 0) {
  console.error(listed.stderr || listed.stdout);
  process.exit(1);
}
const report = JSON.parse(listed.stdout);
const problems = [];
let count = 0;
const scopes = new Set(['@sanity', '@smoke', '@regression']);
const reserved = new Set([
  ...scopes,
  '@crit',
  '@high',
  '@med',
  '@low',
  '@parallel-safe',
  '@serial-only',
  '@flaky-watch',
  '@mobile-only',
  '@tablet-only',
  '@ba-review',
  ...HELD_OUT_TAGS,
]);
function visit(suite) {
  for (const spec of suite.specs ?? []) {
    count++;
    const tags = (spec.tags ?? []).map((t) => (t.startsWith('@') ? t : '@' + t));
    if (tags.filter((t) => t.startsWith('@as-')).length !== 1)
      problems.push(spec.title + ': exactly one @as-* lane required');
    if (!tags.some((t) => scopes.has(t))) problems.push(spec.title + ': Scope tag required');
    if (!tags.some((t) => t.startsWith('@') && !reserved.has(t) && !t.startsWith('@as-')))
      problems.push(spec.title + ': Area tag required');
  }
  for (const child of suite.suites ?? []) visit(child);
}
for (const suite of report.suites ?? []) visit(suite);
if (!count) problems.push('No tests collected');
for (const tag of HELD_OUT_TAGS)
  for (const file of [
    'regression.yml',
    'regression-firefox.yml',
    'regression-webkit.yml',
    '_automationexercise-regression.yml',
  ]) {
    const text = readFileSync('.github/workflows/' + file, 'utf8');
    if (!text.includes('(?!.*' + tag + ')'))
      problems.push(file + ': missing sweep exclusion for ' + tag);
  }
if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('OK tags: ' + count + ' collected project cases');

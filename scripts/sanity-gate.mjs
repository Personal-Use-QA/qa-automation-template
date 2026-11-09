// Reason: Playwright exits 0 on skips, so a missing seed could otherwise pass green.
import { readFileSync } from 'node:fs';
const args = process.argv.slice(2);
const value = (name) => args[args.indexOf(name) + 1];
if (!args.includes('--report') || !args.includes('--expect') || !/^\d+$/.test(value('--expect'))) {
  console.error('Usage: sanity-gate.mjs --report file.json --expect n');
  process.exit(1);
}
const report = JSON.parse(readFileSync(value('--report'), 'utf8').replace(/^\uFEFF/, ''));
const expected = Number(value('--expect'));
const tests = [];
function visit(suite) {
  for (const spec of suite.specs ?? []) tests.push(...(spec.tests ?? []));
  for (const child of suite.suites ?? []) visit(child);
}
for (const suite of report.suites ?? []) visit(suite);
const problems = [];
if (tests.length < expected) problems.push('Short count: ' + tests.length + ' < ' + expected);
if (!tests.length) problems.push('No sanity tests found');
for (const [index, test] of tests.entries())
  if (
    test.status !== 'expected' ||
    !test.results?.length ||
    test.results.some((r) => r.status !== 'passed')
  )
    problems.push('Case ' + (index + 1) + ': skipped, flaky or failed');
if (
  report.errors?.length ||
  report.stats?.unexpected ||
  report.stats?.flaky ||
  report.stats?.skipped
)
  problems.push('Report contains errors, skips, flakes or failures');
if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('OK sanity: ' + tests.length + ' passed, 0 skipped/flaky/failed');

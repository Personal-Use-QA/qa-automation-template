// Reason: publish only result metadata; raw errors and attachments can contain account data.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const reportPath = 'results/automationexercise.json';
const discoveryPath = 'results/automationexercise-discovery.json';
const read = (path) => JSON.parse(readFileSync(path, 'utf8').replace(/^\uFEFF/, ''));
const report = existsSync(reportPath) ? read(reportPath) : undefined;
const discovery = existsSync(discoveryPath) ? read(discoveryPath) : undefined;

function cases(data) {
  const found = [];
  function visit(suite) {
    for (const spec of suite.specs ?? []) {
      for (const test of spec.tests ?? []) {
        found.push({
          id: `${test.projectName}:${spec.id}`,
          title: spec.title,
          project: test.projectName,
          status: test.status,
          results: test.results ?? [],
        });
      }
    }
    for (const child of suite.suites ?? []) visit(child);
  }
  for (const suite of data?.suites ?? []) visit(suite);
  return found;
}

const actual = cases(report);
const expected = cases(discovery);
const problems = [];
if (!report) problems.push('No execution report produced');
if (!discovery || !expected.length) problems.push('No expected cases discovered');
if (expected.length !== actual.length)
  problems.push(`Case count differs: expected ${expected.length}, received ${actual.length}`);
const expectedIds = new Set(expected.map((test) => test.id));
const actualIds = new Set(actual.map((test) => test.id));
if (expectedIds.size !== expected.length || actualIds.size !== actual.length)
  problems.push('Duplicate case identities');
if ([...expectedIds].some((id) => !actualIds.has(id))) problems.push('Expected cases are missing');
if ([...actualIds].some((id) => !expectedIds.has(id)))
  problems.push('Unexpected cases were executed');
for (const project of ['ae-chromium', 'ae-api'])
  if (!expected.some((test) => test.project === project))
    problems.push(`No expected cases for ${project}`);
for (const test of actual)
  if (
    test.status !== 'expected' ||
    test.results.length !== 1 ||
    test.results[0].status !== 'passed'
  )
    problems.push(`${test.title}: skipped, retried, flaky, interrupted or failed`);
if (
  report?.errors?.length ||
  report?.stats?.unexpected ||
  report?.stats?.flaky ||
  report?.stats?.skipped
)
  problems.push('Report contains errors, skips, flakes or failures');

if (process.argv.includes('--check')) {
  if (problems.length) {
    console.error(problems.join('\n'));
    process.exitCode = 1;
  } else console.log(`OK Automation Exercise: ${actual.length} passed, 0 skipped/flaky/failed`);
} else if (process.argv.includes('--publish')) {
  const escape = (value) =>
    String(value ?? '').replace(/[&<>"']/g, (char) => {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  const rows = actual
    .map((test) => {
      const passed =
        test.status === 'expected' &&
        test.results.length === 1 &&
        test.results[0].status === 'passed';
      const duration = test.results.reduce((sum, result) => sum + (result.duration ?? 0), 0);
      return `<tr><td>${escape(test.title)}</td><td>${escape(test.project)}</td><td>${passed ? 'Passed' : 'Requires review'}</td><td>${(duration / 1000).toFixed(1)}s</td></tr>`;
    })
    .join('\n');
  const revision = /^[a-f\d]{40}$/i.test(process.env.GITHUB_SHA ?? '')
    ? process.env.GITHUB_SHA
    : 'Local working tree';
  const repository = process.env.GITHUB_REPOSITORY ?? '';
  const runId = process.env.GITHUB_RUN_ID ?? '';
  const runLink =
    /^[\w.-]+\/[\w.-]+$/.test(repository) && /^\d+$/.test(runId)
      ? `<p><a href="https://github.com/${escape(repository)}/actions/runs/${runId}">Workflow run and full evidence</a></p>`
      : '';
  mkdirSync('public/automationexercise', { recursive: true });
  writeFileSync(
    'public/automationexercise/index.html',
    `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>Automation Exercise regression</title>
<style>body{font:1rem/1.6 system-ui,sans-serif;max-width:75rem;margin:2rem auto;padding:0 1rem;color:#17202a}table{width:100%;border-collapse:collapse}th,td{text-align:left;border-bottom:1px solid #ccd1d1;padding:.7rem}code{overflow-wrap:anywhere}.scroll{overflow:auto}</style></head>
<body><h1>Automation Exercise regression</h1>
<p><strong>${problems.length ? 'Requires review' : 'Passed'}</strong> · ${actual.length} executed / ${expected.length} discovered cases</p>
<p>Updated ${escape(new Date().toISOString())} · Revision <code>${escape(revision)}</code></p>
<p>Daily guest UI and API regression. Account, order, contact and session-revoking journeys run only on demand and are excluded from this public summary.</p>
${runLink}
${!actual.length ? '<p>No execution results were produced. Inspect the workflow run.</p>' : ''}
<div class="scroll"><table><caption>Latest daily execution results</caption><thead><tr><th scope="col">Case</th><th scope="col">Project</th><th scope="col">Result</th><th scope="col">Duration</th></tr></thead><tbody>${rows}</tbody></table></div>
<p>Public output contains case titles, project names, outcomes and durations. Screenshots, traces, request data, source and raw errors remain in workflow artifacts, subject to repository access.</p>
</body></html>`,
  );
  console.log(
    `Public summary written: ${actual.length} cases; ${problems.length ? 'requires review' : 'passed'}`,
  );
} else {
  console.error('Usage: automationexercise-report.mjs --check | --publish');
  process.exitCode = 1;
}

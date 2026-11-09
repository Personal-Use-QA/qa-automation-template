// Reason: a public summary must retain failures without copying private evidence.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { after, test } from 'node:test';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('./automationexercise-report.mjs', import.meta.url));
const temporaryRoot = resolve(tmpdir());
const workspaces = [];
after(() => {
  for (const workspace of workspaces) {
    if (dirname(resolve(workspace)) !== temporaryRoot)
      throw new Error('Refusing cleanup outside the test temporary directory');
    rmSync(workspace, { recursive: true, force: true });
  }
});

function fixture() {
  const workspace = mkdtempSync(join(temporaryRoot, 'ae-report-'));
  workspaces.push(workspace);
  mkdirSync(join(workspace, 'results'));
  const report = {
    errors: [],
    stats: { unexpected: 0, flaky: 0, skipped: 0 },
    suites: [
      {
        suites: [
          {
            specs: ['ae-chromium', 'ae-api'].map((project, index) => ({
              id: `case-${index}`,
              title: `Example.TC0${index + 1} - Positive Scenario - Public behavior`,
              tests: [
                {
                  projectName: project,
                  status: 'expected',
                  results: [{ status: 'passed', duration: 100 }],
                },
              ],
            })),
          },
        ],
      },
    ],
  };
  const write = (name, value) =>
    writeFileSync(join(workspace, 'results', name), JSON.stringify(value));
  write('automationexercise-discovery.json', report);
  write('automationexercise.json', report);
  return {
    workspace,
    report,
    write,
    run: (mode) =>
      spawnSync(process.execPath, [script, mode], { cwd: workspace, encoding: 'utf8' }),
  };
}

test('accepts the exact discovered set with one passing attempt per case', () => {
  const result = fixture().run('--check');
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /2 passed, 0 skipped\/flaky\/failed/);
});

test('rejects missing identities even when the case count matches', () => {
  const data = fixture();
  data.report.suites[0].suites[0].specs[0].id = 'replacement';
  data.write('automationexercise.json', data.report);
  const result = data.run('--check');
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Expected cases are missing/);
});

test('rejects skipped, flaky, failed and retried cases', async (context) => {
  for (const status of ['skipped', 'flaky', 'failed', 'retried']) {
    await context.test(status, () => {
      const data = fixture();
      const execution = data.report.suites[0].suites[0].specs[0].tests[0];
      if (status === 'retried') execution.results.push({ status: 'passed', duration: 100 });
      else {
        execution.status = status;
        execution.results[0].status = status;
      }
      data.write('automationexercise.json', data.report);
      assert.equal(data.run('--check').status, 1);
    });
  }
});

test('rejects report errors and a missing expected project', () => {
  const data = fixture();
  data.report.errors.push({ message: 'Execution interrupted' });
  data.report.suites[0].suites[0].specs[1].tests[0].projectName = 'ae-chromium';
  data.write('automationexercise.json', data.report);
  data.write('automationexercise-discovery.json', data.report);
  const result = data.run('--check');
  assert.equal(result.status, 1);
  assert.match(result.stderr, /No expected cases for ae-api/);
  assert.match(result.stderr, /Report contains errors/);
});

test('publishes a failed summary without raw evidence and escapes case text', () => {
  const data = fixture();
  const spec = data.report.suites[0].suites[0].specs[0];
  spec.title = '<script>alert("unsafe")</script>';
  spec.tests[0].status = 'unexpected';
  spec.tests[0].results[0] = {
    status: 'failed',
    duration: 250,
    error: { message: 'PRIVATE_ERROR_SENTINEL' },
    stdout: ['PRIVATE_OUTPUT_SENTINEL'],
    attachments: [{ path: 'PRIVATE_ATTACHMENT_SENTINEL', body: 'PRIVATE_BODY_SENTINEL' }],
  };
  data.report.config = { metadata: { account: 'PRIVATE_CONFIG_SENTINEL' } };
  data.write('automationexercise.json', data.report);
  assert.equal(data.run('--publish').status, 0);
  const html = readFileSync(join(data.workspace, 'public/automationexercise/index.html'), 'utf8');
  assert.match(html, /Requires review/);
  assert.match(html, /&lt;script&gt;/);
  assert.doesNotMatch(html, /<script>/);
  assert.doesNotMatch(html, /PRIVATE_\w+_SENTINEL/);
});

test('reports absent execution results as unverified instead of passed', () => {
  const data = fixture();
  rmSync(join(data.workspace, 'results/automationexercise.json'));
  assert.equal(data.run('--check').status, 1);
  assert.equal(data.run('--publish').status, 0);
  const html = readFileSync(join(data.workspace, 'public/automationexercise/index.html'), 'utf8');
  assert.match(html, /Requires review/);
  assert.match(html, /No execution results were produced/);
});

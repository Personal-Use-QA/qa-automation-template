// Reason: an unmapped UI file would quietly disappear from nightly regression.
import { readdirSync, readFileSync } from 'node:fs';
const text = readFileSync('.github/workflows/regression.yml', 'utf8');
const match = text.match(/unit:\s*\[([^\]]*)\]/);
const units = match
  ? match[1]
      .split(',')
      .map((s) => s.trim().replace(/['"]/g, ''))
      .filter(Boolean)
  : [];
const files = readdirSync('tests/ui', { recursive: true })
  .filter((p) => p.endsWith('.spec.ts'))
  .map((p) => p.replaceAll('\\', '/').replace(/\.spec\.ts$/, ''));
const problems = [];
if (!units.length) problems.push('No matrix.unit list in regression.yml');
for (const file of files)
  if (units.filter((u) => u === file).length !== 1)
    problems.push(file + ': expected exactly one regression unit');
for (const unit of units) if (!files.includes(unit)) problems.push(unit + ': missing UI spec');
const aeWorkflow = readFileSync('.github/workflows/_automationexercise-regression.yml', 'utf8');
const aeUnits = (aeWorkflow.match(/^\s*AE_UI_UNITS:\s*'([^']+)'/m)?.[1] ?? '')
  .split(',')
  .filter(Boolean);
const aeFiles = readdirSync('tests/automationexercise/ui', { recursive: true })
  .filter((path) => path.endsWith('.spec.ts'))
  .map((path) => path.replaceAll('\\', '/').replace(/\.spec\.ts$/, ''));
for (const file of aeFiles)
  if (aeUnits.filter((unit) => unit === file).length !== 1)
    problems.push('Automation Exercise ' + file + ': expected exactly one regression unit');
for (const unit of aeUnits)
  if (!aeFiles.includes(unit)) problems.push('Automation Exercise ' + unit + ': missing UI spec');
const aeGrep = aeWorkflow.match(/^\s*AE_SAFE_GREP:\s*'([^']+)'/m)?.[1];
if (!aeGrep?.startsWith('^')) problems.push('Automation Exercise: daily grep must start with ^');
// Playwright matches --grep at every position, so exclusions must start at the beginning.
for (const workflow of ['regression.yml', 'regression-firefox.yml', 'regression-webkit.yml']) {
  const body = readFileSync('.github/workflows/' + workflow, 'utf8');
  const grep = body.match(/^\s+grep:\s*['"]([^'"]*)['"]/m)?.[1];
  if (!grep?.startsWith('^')) problems.push(workflow + ': unit grep must start with ^');
}
if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('OK lanes: ' + (files.length + aeFiles.length) + ' UI files mapped exactly once');

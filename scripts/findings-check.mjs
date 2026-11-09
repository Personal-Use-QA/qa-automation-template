// Reason: triage needs a complete business-readable record before an issue is filed.
import { readdirSync, readFileSync } from 'node:fs';
const problems = [];
let count = 0;
const fields = [
  ['Type', 'product-defect|app-defect|ba-question|test-defect|config'],
  ['Severity - triage', 'CRIT|HIGH|MED|LOW'],
  ['Priority - triage', 'release-blocking|critical|normal|low'],
];
const sections = [
  'Summary',
  'Steps to recreate',
  'Actual',
  'Expected',
  'Impact',
  'Screenshot / video',
  'Other details',
];
for (const file of readdirSync('docs/findings').filter(
  (f) => f.endsWith('.md') && f !== 'TEMPLATE.md',
)) {
  const body = readFileSync('docs/findings/' + file, 'utf8');
  const parts = body.split(/^## \d+\. .+$/m).slice(1);
  if (!parts.length) problems.push(file + ': numbered finding section required');
  for (const [index, part] of parts.entries()) {
    count++;
    const label = file + ' finding ' + (index + 1);
    for (const [field, values] of fields) {
      const expression = new RegExp('^\\*\\*' + field + ':\\*\\* (' + values + ')\\s*$', 'm');
      if (!expression.test(part)) problems.push(label + ': missing or invalid ' + field);
    }
    for (const section of sections) {
      const escaped = section.replace(/[.*+?^$()|[\]{}]/g, '\\$&');
      const expression = new RegExp(
        '^### ' + escaped + '\\s*\\n([\\s\\S]*?)(?=^### |$(?![\\s\\S]))',
        'm',
      );
      const content = part.match(expression)?.[1]?.trim();
      if (!content) problems.push(label + ': missing or empty ' + section);
    }
    for (const line of part.split('\n'))
      if (/^\s*None\s*$/i.test(line) || /:\*\*\s*None\s*$/i.test(line))
        problems.push(label + ': None needs an inline reason');
  }
}
if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('OK findings: ' + count + ' finding sections validated');

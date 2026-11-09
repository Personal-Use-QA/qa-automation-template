import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const defaults = {
  PROJECT_NAME: 'QA Automation',
  PRODUCT_NAME: 'Demo App',
  ORG_NAME: 'Example Team',
  REPO_SLUG: 'qa-automation-template',
  GITHUB_REPO: 'example/qa-automation',
  BASE_URL_UI: 'https://demo.playwright.dev',
  BASE_URL_API: 'https://jsonplaceholder.typicode.com',
  ENV_NAME: 'demo',
  GH_ENVIRONMENT: 'qa',
  API_SPEC_URLS: 'none',
  CASE_PREFIX: 'QA',
  DEFAULT_ROLE: 'default',
  WORKERS: '1',
  MAX_LANES: '2',
  CONCURRENCY_GROUP: 'qa-shared',
  RUNNER_LABEL: 'ubuntu-latest',
  PLAYWRIGHT_MCP_VERSION: '0.0.79',
  DEVICE_MOBILE: 'Pixel 10',
  DEVICE_MOBILE_WEBKIT: 'iPhone 17',
  DEVICE_TABLET: 'Galaxy Tab S9',
  DEVICE_TABLET_WEBKIT: 'iPad Pro 11',
  CONFLUENCE_SITE: 'https://example.atlassian.net',
  CONFLUENCE_SPACE: 'QA',
  JIRA_PROJECT: 'QA',
  TEST_MAILBOX_DOMAIN: 'example.com',
  POSTMAN_CLI_PATH: 'postman',
  DESIGN_SOURCE_URL: 'https://example.com/design-reference.git',
  DESIGN_SOURCE_SHA: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  CONNECTOR_MCP_URL: 'https://example.com/mcp',
};
const tokenPattern = new RegExp('\\{\\{([A-Z0-9_]+)\\}\\}', 'g');
const ignored = new Set([
  '.git',
  'node_modules',
  '.tools',
  'playwright-report',
  'results',
  'reports',
  'public',
]);
const args = process.argv.slice(2);
let dryRun = false;
let answersPath;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--dry-run') dryRun = true;
  else if (args[i] === '--answers' && args[i + 1]) answersPath = path.resolve(args[++i]);
  else if (args[i] === '--help') {
    console.log('Usage: ./bootstrap.sh [--answers answers.env] [--dry-run]');
    process.exit(0);
  } else throw new Error('Unknown or incomplete option: ' + args[i]);
}
function privateFile(name) {
  return (
    name === '.env' ||
    (name.startsWith('.env.') && name !== '.env.example') ||
    name === 'settings.local.json'
  );
}
async function walk(dir, prefix = '') {
  const found = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const rel = prefix ? prefix + '/' + entry.name : entry.name;
    if (ignored.has(entry.name) || entry.name.startsWith('test-results') || privateFile(entry.name))
      continue;
    if (entry.isSymbolicLink()) continue;
    if (entry.isDirectory()) found.push(...(await walk(path.join(dir, entry.name), rel)));
    else if (entry.isFile()) {
      const data = await fs.readFile(path.join(root, rel));
      if (!data.includes(0)) found.push({ rel, text: data.toString('utf8') });
    }
  }
  return found;
}
const files = await walk(root);
const used = new Set(files.flatMap((f) => [...f.text.matchAll(tokenPattern)].map((m) => m[1])));
for (const token of used) if (!(token in defaults)) throw new Error('Unknown token: ' + token);
const supplied = {};
if (answersPath) {
  if (privateFile(path.basename(answersPath)))
    throw new Error('Use a separate answers file, never a private environment file.');
  for (const [index, raw] of (await fs.readFile(answersPath, 'utf8')).split(/\r?\n/).entries()) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match) throw new Error('Invalid answers line ' + (index + 1));
    const [, key, value] = match;
    if (!(key in defaults)) throw new Error('Unknown token: ' + key);
    if (key in supplied) throw new Error('Duplicate answer: ' + key);
    supplied[key] = value.trim();
  }
}
const values = { ...defaults };
const interactive = !answersPath && process.stdin.isTTY;
const prompt = interactive
  ? createInterface({ input: process.stdin, output: process.stdout })
  : undefined;
try {
  for (const key of Object.keys(defaults)) {
    if (!used.has(key)) continue;
    const input =
      supplied[key] ?? (prompt ? await prompt.question(key + ' [' + defaults[key] + ']: ') : '');
    values[key] = input.trim() || defaults[key];
    if (/[\r\n\0]/.test(values[key]) || values[key].includes('{'))
      throw new Error('Invalid value for ' + key);
  }
} finally {
  prompt?.close();
}
for (const key of ['WORKERS', 'MAX_LANES'])
  if (!/^[1-9]\d*$/.test(values[key])) throw new Error(key + ' must be a positive integer');
if (!/^[a-z0-9]+(?:[-._][a-z0-9]+)*$/.test(values.REPO_SLUG))
  throw new Error('REPO_SLUG must be a lowercase npm package name');
for (const key of ['BASE_URL_UI', 'BASE_URL_API']) {
  const url = new URL(values[key]);
  if (!/^https?:$/.test(url.protocol) || url.username || url.password)
    throw new Error(key + ' must be a non-secret HTTP URL');
}
for (const key of ['DESIGN_SOURCE_SHA'])
  if (!/^[a-f0-9]{40}$/i.test(values[key])) throw new Error(key + ' must be a full commit SHA');
function escaped(value, rel) {
  if (rel.endsWith('.json') || rel.endsWith('.toml')) return JSON.stringify(value).slice(1, -1);
  if (rel.endsWith('.ts')) return value.replaceAll('\\', '\\\\').replaceAll("'", "\\'");
  if (/\.ya?ml$/.test(rel)) return value.replaceAll("'", "''");
  return value;
}
const changes = [];
for (const file of files) {
  let text = file.text.replace(tokenPattern, (_, key) => escaped(values[key], file.rel));
  if (used.has('REPO_SLUG') && ['package.json', 'package-lock.json'].includes(file.rel)) {
    text = text.replace(
      /"name":\s*"qa-automation-template"/g,
      '"name": ' + JSON.stringify(values.REPO_SLUG),
    );
  }
  if (text !== file.text) {
    if (file.rel.endsWith('.json')) JSON.parse(text);
    changes.push({ rel: file.rel, text });
  }
}
// Reject symlinked integration paths before making any change.
for (const rel of ['.agents', '.agents/skills']) {
  const stat = await fs.lstat(path.join(root, rel)).catch((e) => {
    if (e.code !== 'ENOENT') throw e;
  });
  if (stat?.isSymbolicLink()) throw new Error('Refusing symlinked generated path: ' + rel);
}
console.log(dryRun ? 'DRY RUN — writes nothing' : 'Applying template answers');
for (const key of Object.keys(defaults).filter((k) => used.has(k)))
  console.log(key + '=' + values[key]);
for (const file of changes) console.log((dryRun ? 'WOULD UPDATE ' : 'UPDATE ') + file.rel);
const nativeSkills = (
  await fs.readdir(path.join(root, '.agents/skills'), { withFileTypes: true })
).filter((e) => e.isDirectory());
if (!nativeSkills.length) throw new Error('No native Codex skills found in .agents/skills/');
for (const skill of nativeSkills)
  await fs.access(path.join(root, '.agents/skills', skill.name, 'SKILL.md'));
console.log(
  'Codex skills: ' + nativeSkills.length + ' tracked in .agents/skills/; no installation required',
);
console.log(
  (dryRun ? 'WOULD CREATE ' : 'CREATE IF ABSENT ') +
    '.env with blank keys; never read existing contents',
);
if (!dryRun) {
  for (const file of changes) await fs.writeFile(path.join(root, file.rel), file.text);
  const example = await fs.readFile(path.join(root, '.env.example'), 'utf8');
  const blank = example
    .split(/\r?\n/)
    .map((line) => (/^\s*[A-Z0-9_]+=/.test(line) ? line.split('=')[0] + '=' : line))
    .join('\n');
  await fs.writeFile(path.join(root, '.env'), blank, { flag: 'wx' }).catch((e) => {
    if (e.code !== 'EEXIST') throw e;
  });
}
console.log('\nManual setup commands (printed only):');
console.log('npm ci');
console.log('npx playwright install --with-deps chromium firefox webkit');
console.log('npx @playwright/mcp@' + values.PLAYWRIGHT_MCP_VERSION + ' install-browser webkit');
console.log(
  'Codex: open this repository, review .codex/config.toml and use $qa-team or a specific skill. No skill installation or duplicate MCP registration is required.',
);
console.log(
  'GitHub Variables: BASE_URL_UI, BASE_URL_API; optional MAX_LANES. GitHub Secrets: TEST_USER_EMAIL, TEST_USER_PASSWORD; add a pair per future role.',
);
console.log(
  'GitHub environment: ' +
    values.GH_ENVIRONMENT +
    '; runner: ' +
    values.RUNNER_LABEL +
    '; shared concurrency: ' +
    values.CONCURRENCY_GROUP,
);
console.log(
  'Optional integrations: use an available Codex connector sign-in flow, or the provider-documented MCP configuration and codex mcp login when OAuth is supported. See docs/agent/connectors.md.',
);
console.log('No network installs, account changes or external writes were performed by bootstrap.');

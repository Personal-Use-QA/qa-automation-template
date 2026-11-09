// Reason: changing actions or locators may invalidate the Controls catalog.
import { spawnSync } from 'node:child_process';
const args = ['diff', '--name-only', '--relative'];
const base = process.argv[2];
if (base) args.push(base);
else args.push('HEAD');
const diff = spawnSync('git', args, { encoding: 'utf8' });
if (diff.status !== 0) {
  console.error('Cannot inspect Git diff; pass a valid base revision after the first commit.');
  process.exit(1);
}
const untracked = spawnSync('git', ['ls-files', '--others', '--exclude-standard'], {
  encoding: 'utf8',
});
if (untracked.status !== 0) {
  console.error('Cannot inspect untracked files for Controls changes.');
  process.exit(1);
}
const files = (diff.stdout + untracked.stdout).split('\n');
if (
  files.some((f) => /\.(page|flow)\.ts$/.test(f)) &&
  !files.some((f) => /^docs\/testcases\/.+\.md$/.test(f))
) {
  console.error('Sync the Controls column in docs/testcases/ before completion.');
  process.exit(1);
}
console.log('OK doc sync');

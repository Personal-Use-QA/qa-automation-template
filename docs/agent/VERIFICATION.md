# Codex-only verification

Checked 2026-11-08. Repository: 136 source files; 29 native Codex skills (21 live, 8 dormant); 29 placeholders; 5 MCP servers. Skills are canonical, tracked files in .agents/skills/ with no generated copies. The unavailable reference remains an unverified provenance check; no commit is made.

## Toolchain and gates

Commands: npm run lint; npm run typecheck; npm run format:check; npm run tags:check; npm run lanes:check; npm run findings:check; bash -n bootstrap.sh.

All exited 0. Trimmed output:

```text
All matched files use Prettier code style!
OK tags: 19 collected project cases
OK lanes: 1 UI files mapped exactly once
OK findings: 0 finding sections validated
```

## Demo suite

Command: npx playwright test

```text
19 passed (20.6s)
```

This covers every configured desktop, API, phone and tablet project. The test implementation was unchanged by this migration.

## Native skills and source integrity

Node checks used pinned YAML and TOML parsers plus filesystem checks. The skill metadata checks mirror the bundled skill-creator validator: allowed frontmatter keys, matching lowercase folder/name, name length, description type and length, and supported metadata. A real Python runtime is unavailable, so its Python validator was not executed.

Observed results:

```text
29 valid native skills: 21 live, 8 dormant
29 used placeholders = 29 declared placeholders
4 JSON files, 6 workflow YAML files and Codex TOML parsed
5 MCP servers retain browser_run_code_unsafe in disabled_tools
134 relative Markdown links resolve
0 legacy runtime or external skill-package references in source paths/content
```

Dormant state is stored under metadata.status, which preserves supported skill frontmatter. The tracked native skill folder is included in formatting and source validation. Local tooling, dependencies, generated reports and private environment files are excluded from source scans.

## Bootstrap proof

Commands in a mktemp-created source copy: node scripts/bootstrap.mjs --dry-run --answers ../answers.env; node scripts/bootstrap.mjs --answers ../answers.env. The Bash entrypoint was exercised in the root repository with bash ./bootstrap.sh --dry-run --answers .tools/codex.answers. Source-file hashes checked the dry-run guarantee.

```text
DRY RUN — writes nothing
Codex skills: 29 tracked in .agents/skills/; no installation required
```

Dry-run source hashes matched before and after. The real bootstrap exited 0, left zero unfilled uppercase template tokens and retained all 29 native skills in place. No legacy installation commands were printed or executed. The copied environment file was created blank; it was not opened for inspection.

The bootstrapped copy then ran npm run lint; npm run format:check; npm run typecheck; npx playwright test. All exited 0:

```text
All matched files use Prettier code style!
19 passed (19.2s)
```

The temporary copy and its dependency junction were removed after verification. The repository remains staged and uncommitted.

# Codex enforcement

<!-- prettier-ignore -->
| Requirement | Implementation | Limit |
| --- | --- | --- |
| Every-turn discipline | AGENTS.md standing instructions | Instruction enforcement by Codex |
| Recon-only browser work | AGENTS.md §26 and role/skill caps | Resolve URL, role and current state explicitly |
| Unsafe browser code denied | .codex/config.toml disabled_tools on each server | Review inherited or separately added servers too |
| Controls catalog sync | scripts/doc-sync-check.mjs and PR CI docs:check | Changed-path gate cannot prove semantic completeness |
| Development discipline | $qa-tdd, $qa-debugging, $qa-verify | Report unrun checks as unverified |
| Stable memory | docs/agent/memory/ read/update rule | Repo-local; no automatic recall assumed |
| Operator permissions | Existing Codex approval and sandbox settings | Repository does not override personal policy |

No lifecycle-hook installation is required. Optionally call node scripts/doc-sync-check.mjs HEAD from your own pre-commit setup; CI supplies the PR base revision. Sequential role skills preserve file ownership without relying on native multi-agent configuration.

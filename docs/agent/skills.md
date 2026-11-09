# Repository Codex skills

Every skill has one tracked source at .agents/skills/<name>/SKILL.md. Codex discovers it when this repo is opened. Run bootstrap only to personalize template values; no separate skill installation is needed. Use $name for explicit invocation or let Codex select a matching description.

<!-- prettier-ignore -->
| Skill | Role or purpose |
| --- | --- |
| [awesome-design](../../.agents/skills/awesome-design/SKILL.md) | awesome design |
| [ba-comment-architect](../../.agents/skills/ba-comment-architect/SKILL.md) | ba comment architect |
| [ba-issue-report](../../.agents/skills/ba-issue-report/SKILL.md) | ba issue report |
| [fable-mode](../../.agents/skills/fable-mode/SKILL.md) | fable mode |
| [nightly-heal](../../.agents/skills/nightly-heal/SKILL.md) | nightly heal |
| [qa-a11y](../../.agents/skills/qa-a11y/SKILL.md) | qa a11y |
| [qa-architect](../../.agents/skills/qa-architect/SKILL.md) | qa architect |
| [qa-automation](../../.agents/skills/qa-automation/SKILL.md) | qa automation |
| [qa-confluence](../../.agents/skills/qa-confluence/SKILL.md) | qa confluence |
| [qa-confluence-architecture](../../.agents/skills/qa-confluence-architecture/SKILL.md) | qa confluence architecture |
| [qa-debugging](../../.agents/skills/qa-debugging/SKILL.md) | qa debugging |
| [qa-designer](../../.agents/skills/qa-designer/SKILL.md) | qa designer |
| [qa-finding](../../.agents/skills/qa-finding/SKILL.md) | qa finding |
| [qa-locators](../../.agents/skills/qa-locators/SKILL.md) | qa locators |
| [qa-manual](../../.agents/skills/qa-manual/SKILL.md) | Dormant; complete before use |
| [qa-tdd](../../.agents/skills/qa-tdd/SKILL.md) | qa tdd |
| [qa-team](../../.agents/skills/qa-team/SKILL.md) | qa team |
| [qa-team-a11y](../../.agents/skills/qa-team-a11y/SKILL.md) | qa team a11y |
| [qa-team-expand](../../.agents/skills/qa-team-expand/SKILL.md) | Dormant; complete before use |
| [qa-team-explore](../../.agents/skills/qa-team-explore/SKILL.md) | Dormant; complete before use |
| [qa-team-fix](../../.agents/skills/qa-team-fix/SKILL.md) | Dormant; complete before use |
| [qa-team-flake](../../.agents/skills/qa-team-flake/SKILL.md) | Dormant; complete before use |
| [qa-team-mobile](../../.agents/skills/qa-team-mobile/SKILL.md) | qa team mobile |
| [qa-team-regress](../../.agents/skills/qa-team-regress/SKILL.md) | Dormant; complete before use |
| [qa-team-roles](../../.agents/skills/qa-team-roles/SKILL.md) | Dormant; complete before use |
| [qa-team-smoke](../../.agents/skills/qa-team-smoke/SKILL.md) | Dormant; complete before use |
| [qa-ui](../../.agents/skills/qa-ui/SKILL.md) | qa ui |
| [qa-verify](../../.agents/skills/qa-verify/SKILL.md) | qa verify |
| [rate](../../.agents/skills/rate/SKILL.md) | rate |

Pipeline: $qa-designer → $qa-locators → $qa-automation → $qa-architect. $qa-team coordinates the same sequence with case IDs, Controls, verified locators and evidence in each handoff.

Discipline: $qa-tdd for new tests, $qa-debugging for failures and $qa-verify for completion claims. These are local skills, not dependencies on another package. Supporting references and templates stay beside their SKILL.md. Do not create generated copies or introduce machine-specific paths.

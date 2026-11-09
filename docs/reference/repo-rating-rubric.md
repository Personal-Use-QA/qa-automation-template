# Fixed repository rating rubric

Score each category 0–20; total is 0–100. A rate report cites files and measured checks. This rubric is authored from the brief; no missing reference rubric is claimed as copied.

<!-- prettier-ignore -->
| Category | Five evidence criteria, each worth 0–4 |
| --- | --- |
| Architecture | Layer boundaries; reusable flows; fixture ownership; typed config; domain isolation |
| Determinism | State isolation; semantic locators; event synchronization; concurrency safety; three clean repetitions |
| Coverage | Severity allocation; positive and negative cases; API shape checks; device/accessibility gaps; exact case-doc mapping |
| Delivery | Lint/format/types; discovery/tag/lane gates; sanity completeness; engine schedules; revision-bound evidence |
| Agent operations | Readable guide; role contracts; canonical skills; policy/MCP enforcement; maintained memory and provenance |

For each criterion: 0 absent; 1 documented only; 2 partly implemented; 3 implemented with incomplete verification; 4 implemented and verified. State unknowns and cap their evidence score accordingly. A requested sub-area is scored against the same categories with scope explicitly stated.

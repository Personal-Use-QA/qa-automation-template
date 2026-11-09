# Rules register

The current user direction selects Codex only. Native skill location, direct invocation and local discipline skills supersede cross-tool integration details in the supplied scaffold brief.

Reference unavailable. These rules are transcribed or reconstructed from the supplied scaffold brief; none is claimed as a verbatim extraction from the missing repository. Locator ordering details are template decisions pending team review.

## Project and every turn

1. Use Playwright Test, TypeScript and Node LTS. (Source: supplied brief §6.1.1.)
2. Give the verdict first and keep replies terse. (Source: supplied brief §6.1.1.)
3. Ground live-app questions in current recon evidence. (Source: supplied brief §6.1.1.)
4. Ask material decisions as multiple-choice questions. (Source: supplied brief §6.1.1.)
5. Separate observed facts from assumptions. (Source: supplied brief §6.1.1.)
6. Use public demo defaults until the team supplies target URLs. (Source: supplied brief §6.1.1.)

## Core mandate

7. Stable, deterministic, business-readable UI automation. Testing is product. (Source: supplied brief §6.1.2.)
8. Decision order: stability → CI compat → root-cause → minimal change → reusability → readability. (Source: supplied brief §6.1.2.)
9. Fix root causes before increasing waits. (Source: supplied brief §6.1.2.)
10. Make the smallest change that meets the business requirement. (Source: supplied brief §6.1.2.)
11. Prefer reusable business actions over copied test steps. (Source: supplied brief §6.1.2.)
12. Keep evidence for every verification claim. (Source: supplied brief §6.1.2.)

## File ownership

13. Every top-level path has an owner. (Source: supplied brief §6.1.3.)
14. Configuration owns non-secret URLs and timeout budgets. (Source: supplied brief §6.1.3.)
15. Credentials live only in the shared credential resolver. (Source: supplied brief §6.1.3.)
16. UI page objects own DOM locator definitions. (Source: supplied brief §6.1.3.)
17. API clients own endpoint maps and request builders. (Source: supplied brief §6.1.3.)
18. Flows own business actions. (Source: supplied brief §6.1.3.)
19. Fixtures own dependency setup. (Source: supplied brief §6.1.3.)
20. Specs own assertions. (Source: supplied brief §6.1.3.)
21. Designers own case documents; reviewers own findings triage. (Source: supplied brief §6.1.3.)

## Team layer ownership

22. The pipeline is designer → locators → automation → architect. (Source: supplied brief §6.1.4.)
23. No role edits another role’s layer. (Source: supplied brief §6.1.4.)
24. Designer writes case documents, never production test code. (Source: supplied brief §6.1.4.)
25. Locators role writes page objects and clients. (Source: supplied brief §6.1.4.)
26. Automation role writes flows, fixtures and specs. (Source: supplied brief §6.1.4.)
27. Architect reviews evidence and may apply a clearly identified residual fix. (Source: supplied brief §6.1.4.)

## Page objects

28. Page objects contain locators only. (Source: supplied brief §5.5; 5.6; 6.1.5.)
29. Build typed Locator fields in the constructor. (Source: supplied brief §5.5; 5.6; 6.1.5.)
30. Keep the route in a static readonly PATH. (Source: supplied brief §5.5; 5.6; 6.1.5.)
31. Group fields with // --- name --- section comments. (Source: supplied brief §5.5; 5.6; 6.1.5.)
32. Verify every new locator against the live application. (Source: supplied brief §5.5; 5.6; 6.1.5.)
33. Use TodoPage as the worked example. (Source: supplied brief §5.5; 5.6; 6.1.5.)

## Flows

34. A flow performs one business action. (Source: supplied brief §5.5; 5.6; 6.1.6.)
35. Give every exported flow JSDoc. (Source: supplied brief §5.5; 5.6; 6.1.6.)
36. Do not define selectors or locators in flows. (Source: supplied brief §5.5; 5.6; 6.1.6.)
37. Use only central TIMEOUTS when an explicit budget is necessary. (Source: supplied brief §5.5; 5.6; 6.1.6.)
38. Open the application through a flow. (Source: supplied brief §5.5; 5.6; 6.1.6.)
39. Reuse desktop flows for mobile unless behavior diverges. (Source: supplied brief §5.5; 5.6; 6.1.6.)

## Specs and isolation

40. Specs contain assertions and flow calls only. (Source: supplied brief §5.5; 5.6; 6.1.7.)
41. Specs define zero selectors. (Source: supplied brief §5.5; 5.6; 6.1.7.)
42. Start each UI case from beforeEach. (Source: supplied brief §5.5; 5.6; 6.1.7.)
43. Do not rely on another test’s data. (Source: supplied brief §5.5; 5.6; 6.1.7.)
44. Use web-first assertions for UI state. (Source: supplied brief §5.5; 5.6; 6.1.7.)
45. Assert only counts for records the test itself created. (Source: supplied brief §5.5; 5.6; 6.1.7.)
46. API assertions validate response status and shape. (Source: supplied brief §5.5; 5.6; 6.1.7.)

## Comment style

47. Write plain business English. (Source: supplied brief §5.6; 6.1.8.)
48. Comments explain why, rather than narrating code. (Source: supplied brief §5.6; 6.1.8.)
49. Keep comments to about three lines. (Source: supplied brief §5.6; 6.1.8.)
50. Keep load-bearing facts. (Source: supplied brief §5.6; 6.1.8.)
51. Translate jargon and put the technical token in parentheses. (Source: supplied brief §5.6; 6.1.8.)
52. Preserve machine directives byte-identically. (Source: supplied brief §5.6; 6.1.8.)
53. Use // Reason: before a justified positional locator. (Source: supplied brief §5.6; 6.1.8.)

## Test naming

54. UI titles use <Page>.TC<n> - <Positive|Negative> Scenario - <description>. (Source: supplied brief §5.5; 6.1.9.)
55. API titles use TC<nn> - Positive|Negative - <bucket> - METHOD /path - <description>. (Source: supplied brief §5.5; 6.1.9.)
56. Mobile titles use MTC identifiers. (Source: supplied brief §5.5; 6.1.9.)
57. Classify Positive or Negative by expected outcome. (Source: supplied brief §5.5; 6.1.9.)
58. Security no-bypass is Negative. (Source: supplied brief §5.5; 6.1.9.)
59. Zero-pad identifiers past nine. (Source: supplied brief §5.5; 6.1.9.)
60. Match case document titles to spec titles verbatim. (Source: supplied brief §5.5; 6.1.9.)

## Locator priority

61. Prefer stable test IDs. (Source: supplied brief §6.1.10.)
62. Next prefer role and accessible name. (Source: supplied brief §6.1.10.)
63. Next prefer visible labels or placeholders. (Source: supplied brief §6.1.10.)
64. Next prefer stable business text. (Source: supplied brief §6.1.10.)
65. Use stable CSS attributes only when semantic choices fail. (Source: supplied brief §6.1.10.)
66. Use a positional locator only with a documented reason and uniqueness evidence. (Source: supplied brief §6.1.10.)
67. Do not use XPath, volatile CSS classes or unscoped nth selectors. (Source: supplied brief §6.1.10.)

## Synchronization

68. Never use page.waitForTimeout. (Source: supplied brief §5.4; 5.6; 6.1.11.)
69. Do not use magic-number timeouts. (Source: supplied brief §5.4; 5.6; 6.1.11.)
70. Never use expect.poll to hide a race. (Source: supplied brief §5.4; 5.6; 6.1.11.)
71. Arm a response wait before triggering its request. (Source: supplied brief §5.4; 5.6; 6.1.11.)
72. Use TIMEOUTS.visible and TIMEOUTS.enabled at 15000 ms by default. (Source: supplied brief §5.4; 5.6; 6.1.11.)
73. Use TIMEOUTS.page at 20000 ms and modal at 10000 ms. (Source: supplied brief §5.4; 5.6; 6.1.11.)
74. Use longAsync at 30000 ms and pollInterval at 1000 ms. (Source: supplied brief §5.4; 5.6; 6.1.11.)
75. Whole-test default is 90000 ms; size it from your own p99. (Source: supplied brief §5.4; 5.6; 6.1.11.)

## Environment and credentials

76. Treat blank environment values as unset. (Source: supplied brief §5.4; 6.1.12.)
77. Keep URLs and credentials in separate modules. (Source: supplied brief §5.4; 6.1.12.)
78. Never commit credentials, live tokens or internal hostnames. (Source: supplied brief §5.4; 6.1.12.)
79. Never print secrets in logs, docs, findings or connectors. (Source: supplied brief §5.4; 6.1.12.)
80. Add a new user type to the union and both credential maps. (Source: supplied brief §5.4; 6.1.12.)
81. Create the corresponding GitHub Secret pair. (Source: supplied brief §5.4; 6.1.12.)
82. Throw on missing credentials rather than continuing half-signed-in. (Source: supplied brief §5.4; 6.1.12.)

## Tagging

83. Every test has an Area tag. (Source: supplied brief §5.6; 5.8; 6.1.13.)
84. Every test has a Scope tag: @sanity, @smoke or @regression. (Source: supplied brief §5.6; 5.8; 6.1.13.)
85. Every test has exactly one @as-\* lane tag. (Source: supplied brief §5.6; 5.8; 6.1.13.)
86. Derive a role lane with asTag from the same role constant used for sign-in. (Source: supplied brief §5.6; 5.8; 6.1.13.)
87. Use @as-none for cases needing no sign-in. (Source: supplied brief §5.6; 5.8; 6.1.13.)
88. Reserve @parallel-safe, @serial-only and @flaky-watch as meta tags. (Source: supplied brief §5.6; 5.8; 6.1.13.)
89. Held-out tags must be excluded from sweeps with anchored negative lookaheads. (Source: supplied brief §5.6; 5.8; 6.1.13.)
90. Run security-payload, session-revoking and long-journey cases only on demand. (Source: supplied brief §5.6; 5.8; 6.1.13.)

## Severity and priority

91. Use CRIT, HIGH, MED and LOW severity. (Source: supplied brief §6.1.14.)
92. Fill test allocation slots from CRIT to LOW. (Source: supplied brief §6.1.14.)
93. Drop LOW coverage first when capacity is constrained. (Source: supplied brief §6.1.14.)
94. Record release-blocking, critical, normal or low priority. (Source: supplied brief §6.1.14.)
95. Separate business impact from scheduling priority. (Source: supplied brief §6.1.14.)
96. Use examples from the generic severity rubric. (Source: supplied brief §6.1.14.)

## Test-case management

97. Write case docs before automation. (Source: supplied brief §5.7; 6.1.15.)
98. Record Source, Roles and Scope above the case table. (Source: supplied brief §5.7; 6.1.15.)
99. Use exactly one case table per document. (Source: supplied brief §5.7; 6.1.15.)
100.  The columns are TC, Sev, Tags, Title, Pre, Steps, Expect and Controls. (Source: supplied brief §5.7; 6.1.15.)
101.  Never delete or renumber permanent TC IDs. (Source: supplied brief §5.7; 6.1.15.)
102.  Strike through retired cases. (Source: supplied brief §5.7; 6.1.15.)
103.  Use semicolons to separate concise Steps and Expect actions. (Source: supplied brief §5.7; 6.1.15.)
104.  Assert shape rather than fixed shared values. (Source: supplied brief §5.7; 6.1.15.)
105.  Name every locator used in the Controls column. (Source: supplied brief §5.7; 6.1.15.)
106.  Document case-sync as an optional upgrade, not a shipped capability. (Source: supplied brief §5.7; 6.1.15.)

## Findings

107. Each finding starts with a numbered level-two heading. (Source: supplied brief §5.8; 6.1.16.)
108. Include Type, Severity - triage and Priority - triage heading lines. (Source: supplied brief §5.8; 6.1.16.)
109. Include Summary, Steps to recreate, Actual, Expected, Impact, Screenshot / video and Other details. (Source: supplied brief §5.8; 6.1.16.)
110. A still is required; a clip is a bonus. (Source: supplied brief §5.8; 6.1.16.)
111. Allow None only with an inline reason. (Source: supplied brief §5.8; 6.1.16.)
112. Deduplicate before filing an issue. (Source: supplied brief §5.8; 6.1.16.)
113. Never claim an issue exists without its URL. (Source: supplied brief §5.8; 6.1.16.)
114. Pin a known defect with test.fail and a finding link, or skip with a linked reason. (Source: supplied brief §5.8; 6.1.16.)

## Continuous integration

115. The PR gate asks whether anything breaks, coverage is complete and the target environment still works. (Source: supplied brief §5.9; 6.1.17.)
116. Run install, lint, format, typecheck, list and gates before the sanity lane. (Source: supplied brief §5.9; 6.1.17.)
117. Use an in-Playwright global timeout shorter than the workflow step cap. (Source: supplied brief §5.9; 6.1.17.)
118. Fail the sanity gate for skips, flakes, failures and a short count. (Source: supplied brief §5.9; 6.1.17.)
119. Put every job sharing login accounts in the same concurrency group. (Source: supplied brief §5.9; 6.1.17.)
120. Never cancel a state-changing job. (Source: supplied brief §5.9; 6.1.17.)
121. Upload failure evidence even when the suite fails. (Source: supplied brief §5.9; 6.1.17.)

## Units and lanes

122. Split regression units by screen. (Source: supplied brief §5.8; 5.9; 6.1.18.)
123. Map each UI spec to exactly one unit. (Source: supplied brief §5.8; 5.9; 6.1.18.)
124. Start unit greps with ^. (Source: supplied brief §5.8; 5.9; 6.1.18.)
125. WORKERS and MAX_LANES are team decisions; agents never raise them. (Source: supplied brief §5.8; 5.9; 6.1.18.)
126. State-changing cases sharing balances run first, alone, with one worker. (Source: supplied brief §5.8; 5.9; 6.1.18.)
127. Never assert absolute totals in a shared environment. (Source: supplied brief §5.8; 5.9; 6.1.18.)
128. Do not let concurrent runs share an output folder. (Source: supplied brief §5.8; 5.9; 6.1.18.)

## Forbidden practices

129. Do not use test.only. (Source: supplied brief §5.6; 6.1.19.)
130. Do not swallow a failed step with try/catch. (Source: supplied brief §5.6; 6.1.19.)
131. Do not use test.skip without a linked reason. (Source: supplied brief §5.6; 6.1.19.)
132. Do not make a failing case silently pass. (Source: supplied brief §5.6; 6.1.19.)
133. Do not hard-code secret data. (Source: supplied brief §5.6; 6.1.19.)
134. Do not add selectors to specs or flows. (Source: supplied brief §5.6; 6.1.19.)
135. Do not replace missing recon with remembered DOM. (Source: supplied brief §5.6; 6.1.19.)

## Definition of Done

136. Lint, formatting and typecheck are clean. (Source: supplied brief §6.1.20.)
137. Prove the touched tests green with --repeat-each=3. (Source: supplied brief §6.1.20.)
138. There is no fixed sleep in the touched call chain. (Source: supplied brief §6.1.20.)
139. Titles and tags match case documents. (Source: supplied brief §6.1.20.)
140. No secret appears in changed files or artifacts. (Source: supplied brief §6.1.20.)
141. New UI has new tests in the same PR. (Source: supplied brief §6.1.20.)
142. Review the trace for unexplained errors. (Source: supplied brief §6.1.20.)

## Roles and handoffs

143. Each role states its inputs and outputs. (Source: supplied brief §6.1.21; 6.3.)
144. Each role states its never-edit boundary. (Source: supplied brief §6.1.21; 6.3.)
145. Hand off case IDs, Controls, verified locators and evidence paths. (Source: supplied brief §6.1.21; 6.3.)
146. Write a short hand-off note between sequential Codex roles. (Source: supplied brief §6.1.21; 6.3.)
147. Designer MCP tools are navigate, snapshot and close only. (Source: supplied brief §6.1.21; 6.3.)
148. Architect MCP is read-only. (Source: supplied brief §6.1.21; 6.3.)
149. Architect verdict is GO, GO-WITH-RISK or NO-GO, with cited evidence. (Source: supplied brief §6.1.21; 6.3.)

## Playbooks

150. Keep one canonical skill under .agents/skills/<name>/SKILL.md. (Source: supplied brief §6.1.22; 6.4.)
151. Keep canonical skills directly in tracked .agents/skills/ for Codex discovery. (Source: supplied brief §6.1.22; 6.4.)
152. Skill descriptions begin Use when and name trigger phrases. (Source: supplied brief §6.1.22; 6.4.)
153. Invoke Codex workflows directly through $skill-name. (Source: supplied brief §6.1.22; 6.4.)
154. Dormant skills must be completed before use. (Source: supplied brief §6.1.22; 6.4.)
155. Nightly healing separates TEST defects from PRODUCT defects. (Source: supplied brief §6.1.22; 6.4.)
156. Review skips, never auto-fix them. (Source: supplied brief §6.1.22; 6.4.)

## Engineering discipline

157. Use TDD for net-new tests: failing expectation first. (Source: supplied brief §6.1.23.)
158. Debug systematically before any fix. (Source: supplied brief §6.1.23.)
159. A symptom patch receives NO-GO. (Source: supplied brief §6.1.23.)
160. Verify before making a completion claim. (Source: supplied brief §6.1.23.)
161. Do not add planning bureaucracy inside the pipeline. (Source: supplied brief §6.1.23.)
162. Use read-only investigation when a broad sweep is explicitly delegated. (Source: supplied brief §6.1.23.)

## Output style

163. For what next, rank work by severity and gaps. (Source: supplied brief §6.1.24.)
164. For an instruction, do the work and give one or two result lines. (Source: supplied brief §6.1.24.)
165. For a question, answer first and support it with path:line. (Source: supplied brief §6.1.24.)
166. Compress responses without dropping evidence or caveats. (Source: supplied brief §6.1.24.)
167. Distinguish planned actions from completed actions. (Source: supplied brief §6.1.24.)
168. Do not call unrun tests green. (Source: supplied brief §6.1.24.)

## Memory and token economy

169. Read docs/agent/memory/MEMORY.md at session start. (Source: supplied brief §5.11; 6.1.25.)
170. Add or update a fact only when it is stable and useful. (Source: supplied brief §5.11; 6.1.25.)
171. Never duplicate a memory. (Source: supplied brief §5.11; 6.1.25.)
172. Delete a fact that turns out wrong. (Source: supplied brief §5.11; 6.1.25.)
173. Do not store transient bug state, diffs or facts already recorded by code or Git. (Source: supplied brief §5.11; 6.1.25.)
174. Read the smallest relevant slice first. (Source: supplied brief §5.11; 6.1.25.)
175. Do not reload the same source slice. (Source: supplied brief §5.11; 6.1.25.)

## Playwright MCP

176. Use MCP for reconnaissance only, never in committed test code. (Source: supplied brief §6.1.26; 6.6.)
177. Resolve target URLs and credentials before the first authenticated recon call. (Source: supplied brief §6.1.26; 6.6.)
178. Sign in before inspecting authenticated screens. (Source: supplied brief §6.1.26; 6.6.)
179. Name snapshots reports/explore/dom/<url-slug>.yaml. (Source: supplied brief §6.1.26; 6.6.)
180. Reuse a snapshot only when its URL, role and DOM context are still current. (Source: supplied brief §6.1.26; 6.6.)
181. Use the weekly stale guard before reusing old snapshots. (Source: supplied brief §6.1.26; 6.6.)
182. Emit [MCP-OFFLINE], [MCP-SKIP] <route> or [STALE-DOM] when applicable. (Source: supplied brief §6.1.26; 6.6.)
183. Never use browser_run_code_unsafe. (Source: supplied brief §6.1.26; 6.6.)
184. Submit sign-in with Enter on WebKit when overlays swallow clicks. (Source: supplied brief §6.1.26; 6.6.)
185. Conflict order is AGENTS.md > playbook > discipline skill > MCP. (Source: supplied brief §6.1.26; 6.6.)

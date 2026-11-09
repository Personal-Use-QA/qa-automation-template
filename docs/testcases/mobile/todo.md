## Todo (route /todomvc) — Test Cases

Source: scaffold author; 2026-11-08; TodoPage; live Playwright Chromium recon: input count 1, input data-testid absent; after adding one item: todo-item, todo-title, toggle label, todo-count each count 1.

Roles: none (public demo). Scope: mobile.

Each browser case gets an isolated context. Counts describe only test-created items.

<!-- prettier-ignore -->
| TC | Sev | Tags | Title | Pre | Steps | Expect | Controls |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| MTC01 | MED | @todo-mobile @as-none @sanity | Todo.MTC01 - Positive Scenario - Input usable at phone width | Public demo available | Open page; enter title | Editable input; new title shown | newTodoInput; todoTitles (reused from UI) |

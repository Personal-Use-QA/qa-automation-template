## Todo (route /todomvc) — Test Cases

Source: scaffold author; 2026-11-08; TodoPage; live Playwright Chromium recon: input count 1, input data-testid absent; after adding one item: todo-item, todo-title, toggle label, todo-count each count 1.

Roles: none (public demo). Scope: ui.

Each browser case gets an isolated context. Counts describe only test-created items.

<!-- prettier-ignore -->
| TC | Sev | Tags | Title | Pre | Steps | Expect | Controls |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC01 | MED | @todo @as-none @sanity | Todo.TC01 - Positive Scenario - Page renders new-todo input | Public demo available | Open page | Input visible | newTodoInput; todoItems; todoTitles; toggleAll; todoCount |
| TC02 | MED | @todo @as-none @sanity | Todo.TC02 - Positive Scenario - Added todo appears in list | Public demo available | Open page; add title | New title shown | newTodoInput; todoItems; todoTitles; toggleAll; todoCount |
| TC03 | MED | @todo @as-none @regression | Todo.TC03 - Positive Scenario - Complete all marks every todo | Public demo available | Open page; add two titles; complete all | Both completed; zero active | newTodoInput; todoItems; todoTitles; toggleAll; todoCount |
| TC04 | MED | @todo @as-none @regression | Todo.TC04 - Negative Scenario - Blank title adds no todo | Public demo available | Open page; submit spaces | No item added | newTodoInput; todoItems; todoTitles; toggleAll; todoCount |

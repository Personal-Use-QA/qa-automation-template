## Todos (route /todos) — Test Cases

Source: scaffold author; 2026-11-08; TodosClient; live GET /todos/1 returned 200 and keys userId,id,title,completed.

Roles: none (public demo). Scope: api.

Each browser case gets an isolated context. Counts describe only test-created items.

<!-- prettier-ignore -->
| TC | Sev | Tags | Title | Pre | Steps | Expect | Controls |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC01 | MED | @todos-api @as-none @sanity | TC01 - Positive - Read - GET /todos/{id} - Returns todo shape | Public demo available | Fetch known ID | 200; typed todo keys | TODOS_PATH; todoPath; TodosClient |
| TC02 | MED | @todos-api @as-none @regression | TC02 - Positive - Read - GET /todos - Returns non-empty list | Public demo available | Fetch collection | 200; at least one todo | TODOS_PATH; todoPath; TodosClient |
| TC03 | MED | @todos-api @as-none @regression | TC03 - Negative - Read - GET /todos/{id} - Unknown id returns 404 | Public demo available | Fetch absent ID | 404 | TODOS_PATH; todoPath; TodosClient |

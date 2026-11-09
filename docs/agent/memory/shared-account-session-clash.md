---
name: shared-account-session-clash
description: "Serialize jobs when a shared account’s session policy makes concurrent use unsafe."
metadata:
  type: project
---

Serialize jobs when a shared account’s session policy makes concurrent use unsafe.

**Why:** A new login or logout may revoke another run’s session.

**How to apply:** Use the shared workflow concurrency group and keep session-revoking cases on demand.

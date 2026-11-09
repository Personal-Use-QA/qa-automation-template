---
name: never-mutate-shared-records
description: "Never rename or mutate a shared record merely to establish a test precondition."
metadata:
  type: project
---

Never rename or mutate a shared record merely to establish a test precondition.

**Why:** Another run may be using the same record.

**How to apply:** Create owned data or choose a read-only precondition with explicit cleanup ownership.

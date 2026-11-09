---
name: response-wait-before-skip
description: "Resolve an already-armed response wait before conditionally skipping a case."
metadata:
  type: project
---

Resolve an already-armed response wait before conditionally skipping a case.

**Why:** A pending waiter can outlive the test and report misleading failures.

**How to apply:** Arm before the action; await or explicitly dispose before the skip decision.

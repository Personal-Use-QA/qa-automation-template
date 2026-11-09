---
name: stg-under-load-skeleton-timeouts
description: "A busy shared environment can leave a loading skeleton longer than usual."
metadata:
  type: reference
---

A busy shared environment can leave a loading skeleton longer than usual.

**Why:** Increasing every timeout hides whether the server or locator is at fault.

**How to apply:** Measure the request and final state; use the appropriate central budget only after root-cause evidence.

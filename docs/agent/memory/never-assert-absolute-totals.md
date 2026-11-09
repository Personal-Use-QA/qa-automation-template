---
name: never-assert-absolute-totals
description: "Never assert fixed global totals in a shared environment."
metadata:
  type: project
---

Never assert fixed global totals in a shared environment.

**Why:** Other legitimate runs can change records between steps.

**How to apply:** Assert only the test’s own records, deltas or shape.

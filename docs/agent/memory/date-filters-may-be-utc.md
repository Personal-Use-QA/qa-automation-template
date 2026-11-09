---
name: date-filters-may-be-utc
description: "Verify whether date filters use UTC before asserting displayed boundaries."
metadata:
  type: reference
---

Verify whether date filters use UTC before asserting displayed boundaries.

**Why:** Local time can shift a date across a server-side boundary.

**How to apply:** Build and assert the agreed timezone explicitly; do not rely on the runner locale.

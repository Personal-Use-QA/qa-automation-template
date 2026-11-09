---
name: mui-icon-testids-removed
description: "A UI release may remove implementation-specific icon test IDs."
metadata:
  type: reference
---

A UI release may remove implementation-specific icon test IDs.

**Why:** A locator can fail even when the user-facing control is still present.

**How to apply:** Re-verify the DOM and fall back by the documented semantic locator priority.

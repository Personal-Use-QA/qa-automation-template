---
name: workers-user-override
description: "Parallelism is the user’s call; never revert or increase an explicit worker setting."
metadata:
  type: feedback
---

Parallelism is the user’s call; never revert or increase an explicit worker setting.

**Why:** Shared role accounts can race and invalidate evidence.

**How to apply:** Honor WORKERS and MAX_LANES; ask before changing team-selected values.

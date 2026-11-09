---
name: hourly-runs-share-runner-pool
description: "Include hourly checks when evaluating shared runner and account contention."
metadata:
  type: project
---

Include hourly checks when evaluating shared runner and account contention.

**Why:** Nightly and manual runs do not own the environment exclusively.

**How to apply:** Review all schedules before changing lane counts or diagnosing load.

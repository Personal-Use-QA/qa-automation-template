---
name: recon-via-probe-spec
description: "When recon tooling is unavailable, a narrowly scoped local Playwright probe can establish evidence."
metadata:
  type: reference
---

When recon tooling is unavailable, a narrowly scoped local Playwright probe can establish evidence.

**Why:** Remembered DOM is not a substitute for live verification.

**How to apply:** Keep probes out of committed tests unless they become normal layered coverage; report the fallback.

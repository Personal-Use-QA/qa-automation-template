---
name: deep-link-signs-user-out
description: "Treat deep-link session behavior as something to verify, not assume."
metadata:
  type: reference
---

Treat deep-link session behavior as something to verify, not assume.

**Why:** Navigation can cross an authentication boundary or clear session state.

**How to apply:** Observe the redirect and session state before changing the sign-in flow.

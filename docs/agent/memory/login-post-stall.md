---
name: login-post-stall
description: "When sign-in stalls, inspect the submit event, request and response separately."
metadata:
  type: reference
---

When sign-in stalls, inspect the submit event, request and response separately.

**Why:** A swallowed click and a slow authentication request require different fixes.

**How to apply:** Arm the response wait first and use Enter for an overlay-blocked WebKit submission.

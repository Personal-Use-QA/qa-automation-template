---
name: serial-red-kills-downstream
description: "A failure in a serial group can prevent downstream cases from running."
metadata:
  type: project
---

A failure in a serial group can prevent downstream cases from running.

**Why:** A missing later result does not prove that later business behavior failed.

**How to apply:** Prefer isolated cases; distinguish skipped descendants from independent failures.

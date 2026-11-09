---
name: side-panel-hides-rows-from-role-queries
description: "A modal or side panel can make background rows inaccessible to role queries."
metadata:
  type: reference
---

A modal or side panel can make background rows inaccessible to role queries.

**Why:** Accessible-tree scope follows active interaction state.

**How to apply:** Close or scope the panel before querying the background list; do not weaken the locator.

---
name: check-unmerged-branches-before-heal
description: "Check existing local and unmerged branches before starting nightly repair."
metadata:
  type: project
---

Check existing local and unmerged branches before starting nightly repair.

**Why:** The same failure may already have a tested fix awaiting review.

**How to apply:** Inspect branch history and available review metadata before creating another patch.

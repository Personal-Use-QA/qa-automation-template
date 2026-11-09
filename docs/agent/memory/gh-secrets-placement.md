---
name: gh-secrets-placement
description: "Put credentials in GitHub Secrets and non-secret target configuration in Variables."
metadata:
  type: project
---

Put credentials in GitHub Secrets and non-secret target configuration in Variables.

**Why:** The same key at the wrong scope can silently leave a run unconfigured.

**How to apply:** Check repository versus environment scope and the workflow environment name without printing secret values.

---
name: pin-known-defect-test-fail
description: "Pin a known defect with test.fail and a linked finding, or skip it with a linked reason."
metadata:
  type: project
---

Pin a known defect with test.fail and a linked finding, or skip it with a linked reason.

**Why:** An unexplained red suite obscures new regressions.

**How to apply:** Keep the reproducing assertion and verify that an unexpected pass is surfaced.

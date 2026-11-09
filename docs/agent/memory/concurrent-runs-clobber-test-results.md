---
name: concurrent-runs-clobber-test-results
description: "Give concurrent Playwright invocations separate output directories and report paths."
metadata:
  type: project
---

Give concurrent Playwright invocations separate output directories and report paths.

**Why:** A runner cleans its output folder and can delete another run’s evidence.

**How to apply:** Set PLAYWRIGHT_OUTPUT_DIR and the JSON report filename per invocation.

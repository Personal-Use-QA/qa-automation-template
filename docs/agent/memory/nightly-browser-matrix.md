---
name: nightly-browser-matrix
description: "Keep daily Chromium and separate weekly Firefox and WebKit sweeps."
metadata:
  type: project
---

Keep daily Chromium and separate weekly Firefox and WebKit sweeps.

**Why:** Independent engine coverage reveals engine-specific failures without duplicating every nightly load.

**How to apply:** Use the reusable UI unit job and retain browser-specific artifacts.

---
name: run-state-in-beforeall
description: "Initialize mutable per-run state inside the correct test lifecycle, not at module discovery time."
metadata:
  type: project
---

Initialize mutable per-run state inside the correct test lifecycle, not at module discovery time.

**Why:** Discovery and worker restarts may evaluate modules more than once.

**How to apply:** Use beforeAll for worker-owned run state and beforeEach for isolated case data.

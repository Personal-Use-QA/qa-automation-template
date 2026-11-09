---
name: clipboard-grant-copy-toast
description: "Clipboard feedback may require explicit browser clipboard permission."
metadata:
  type: reference
---

Clipboard feedback may require explicit browser clipboard permission.

**Why:** A blocked clipboard operation can differ from a missing notification.

**How to apply:** Grant only the needed permission in the test context and assert the resulting user feedback.

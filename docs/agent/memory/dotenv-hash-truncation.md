---
name: dotenv-hash-truncation
description: "An unquoted hash can be interpreted as a comment by an environment parser."
metadata:
  type: reference
---

An unquoted hash can be interpreted as a comment by an environment parser.

**Why:** A credential that appears present may be parsed with a truncated value.

**How to apply:** Check parser behavior without printing real values; quote secret values in the local configuration.

#!/usr/bin/env bash
set -euo pipefail
# Reason: Node provides portable, non-evaluating substitution and filesystem handling.
script_dir="$(cd -- "$(dirname -- "$0")" && pwd)"
node "$script_dir/scripts/bootstrap.mjs" "$@"

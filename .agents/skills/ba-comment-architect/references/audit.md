# Comment audit

1. Read the code and its business contract.
2. Mark each comment as load-bearing fact, decision, reason, evidence, directive or noise.
3. Preserve directives byte-for-byte.
4. Keep decision → reason → evidence; remove restatements.
5. Translate jargon with the original token in parentheses.
6. Keep executable tokens unchanged; verify the diff is comment-only.
7. Run lint and typecheck where the comment syntax could affect tooling.

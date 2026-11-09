# Severity and priority

This is a generic reconstruction from the brief; the original rubric was unavailable.

<!-- prettier-ignore -->
| Severity | Business impact | Example |
| --- | --- | --- |
| CRIT | Broad data loss or access-control bypass | Unauthorized role can read protected data |
| HIGH | Core task blocked without a practical workaround | A permitted user cannot submit a core form |
| MED | Meaningful impairment with a workaround | Filtering fails but direct lookup works |
| LOW | Limited presentation or convenience impact | Non-blocking spacing or wording issue |

Priority is a separate scheduling choice: release-blocking, critical, normal or low. Fill slots CRIT → LOW; LOW drops first. Do not equate frequency with severity or silently downgrade risk to meet capacity.

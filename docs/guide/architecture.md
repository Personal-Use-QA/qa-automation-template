# Architecture

Domains: UI, API, mobile/tablet. Shared configuration owns URLs and timeout budgets; credentials resolve by role. Page objects/clients → flows → fixtures → assertion-only specs.

Mobile reuses desktop layers; only genuine divergences belong in src/mobile/pages and flows. Empty mobile directories are present locally but Git records directories only after a file is added.

Optional upgrades: a fourth database domain for product-specific data validation; doc/JSON case mirroring (tm-sync); a consolidated report kit; issue filing with dedup and explicit authorization. None is shipped or claimed as working.

Ownership and the full contracts are in root AGENTS.md. Public demos prove the scaffold; teams replace those examples with their own product cases and environment configuration.

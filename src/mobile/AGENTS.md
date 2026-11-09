# Mobile and tablet domain

Reuse src/ui/ pages and flows first. Keep only divergent locators and business behavior here.

Use MTC identifiers. Tests use mobile-chromium, mobile-webkit, tablet-chromium and tablet-webkit projects; emulation comes from pinned Playwright device profiles.

Use @mobile-only or @tablet-only only when the behavior is exclusive to that form factor. Every test also needs Area, Scope and exactly one lane. Desktop reuse does not justify unverified mobile controls.

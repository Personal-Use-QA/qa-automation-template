# Write tests

Follow case document → page object/client → flow → fixture → spec → three green repetitions.

Write permanent case IDs and a single case table first. Verify every locator live and list it in Controls. Page objects contain only typed locator fields and routes; clients contain endpoint maps and builders.

Flows do one business action and have JSDoc; no selectors. Specs use assertions and flow calls, with Area, Scope and exactly one lane. UI contexts are isolated and beforeEach opens the screen.

Add a failing expectation first for net-new behavior. Investigate any failure before changing implementation. Run affected cases with --repeat-each=3, then lint, format, types and gates.

Do not introduce fixed sleeps, selectors in specs, swallowed errors or unlinked skips. Match case-doc titles exactly. Update Controls when page objects or flows change.

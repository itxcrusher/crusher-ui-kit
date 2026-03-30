# 12 Execution Plan

## Scope
Phase-by-phase plan to move Crusher UI Kit from a hardened UI kit into a reusable personal framework.

## Phase 1 - Baseline Recovery
Goal:
Make the repo truthful, runnable, and safe to iterate on.

Tasks:
- restore local verification (`npm ci`, tokens, contrast, build, pack)
- fix demo integrity issues in `index.html`
- refresh stale planning docs so they match current reality

Done when:
- the baseline commands are green locally
- the demo page is structurally valid and does not reference missing controls
- `docs/10-12` reflect current repo state

## Phase 2 - Framework Contract Surface
Goal:
Define the supported public framework API clearly.

Current status:
- `./runtime` is the supported runtime entrypoint
- package contract checks exist beyond simple path resolution
- bundler ESM and standalone ESM are the active delivery contract

Tasks:
- decide the public runtime surface for theme/mode/density, toast, and palette
- export supported runtime modules intentionally
- keep npm/static/bundler contracts aligned
- strengthen package smoke checks beyond simple resolution
- keep the public build contract centered on bundler ESM + standalone ESM

Done when:
- consumers know exactly what is public and how to import it
- the package contract is explicit across all supported delivery modes
- build output warnings are either resolved or intentionally removed from the contract

## Phase 3 - Token-First Decoupling
Goal:
Make components mostly dialect-agnostic and token-driven.

Current status:
- remaining theme-specific component selectors have been removed from the current component set
- feedback and code-token defaults are now routed through authored semantic aliases instead of ad hoc component fallbacks

Tasks:
- remove remaining theme-specific selectors from component internals where feasible
- finish remaining token-compliance cleanup
- keep visual behavior controlled through shared variables and dialect layers

Done when:
- component internals no longer encode theme behavior except where explicitly justified
- switching themes feels systemic rather than component-specific

## Phase 4 - Framework Primitives
Goal:
Add the reusable surfaces that make this practical across many product types.

Current status:
- `crusher-app-shell`, `crusher-grid`, and `crusher-stack` now provide a first reusable page-composition layer
- existing command, menu, modal, table, and card primitives can now be arranged into a coherent product shell without ad hoc page CSS

Tasks:
- define layout and app-shell primitives
- strengthen navigation and command surfaces
- add data-heavy and dashboard-friendly foundations
- prioritize primitives that multiple future apps will reuse

Done when:
- a new project can assemble a serious product shell from the framework instead of from ad hoc app code

## Phase 5 - Consumer Validation
Goal:
Prove the framework in real downstream apps.

Tasks:
- integrate into at least one real consumer project
- fix friction in setup, theming, runtime usage, and packaging
- then repeat with a second consumer project if needed

Preferred order:
1. `crusher-portfolio`
2. `hassaan-portfolio`

Done when:
- downstream adoption feels routine, not custom
- consumer projects do not need deep imports or one-off framework patches

## Phase 6 - Domain Expansion
Goal:
Expand from general UI foundation into domain-ready packs.

Examples:
- AI workspace patterns
- infra and dashboard surfaces
- SaaS admin patterns
- blockchain/productivity interfaces

Done when:
- new domain work is built on top of stable framework contracts, not mixed into unfinished core cleanup

## Working Rule
Each phase should end with:
- verification
- commit
- push

## Do Not Do
- Do not skip consumer validation and call it framework-ready.
- Do not add domain packs before Phase 2 and Phase 3 are materially complete.
- Do not let docs drift behind the implementation again.

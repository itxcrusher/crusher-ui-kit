# 12 Execution Plan

## Scope
Ordered tasks to move the current repo toward the North Star while preserving the existing public component and CSS contracts.

## Ordered Tasks
1. Enforce release quality gates in automation.
Touchpoints: `package.json`, `.github/workflows/release.yml`.
Done when: both publish paths run `npm run check:contrast` before build/publish.

2. Add a CI workflow for pull requests.
Touchpoints: `.github/workflows/ci.yml` (new).
Done when: PRs run `npm ci`, `npm run build:tokens`, `npm run check:contrast`, `npm run build`.

3. Resolve package contract vs README mismatch.
Touchpoints: `README.md`, `package.json` `exports`/`files`.
Done when: README examples only use supported import paths that exist in published package contents.

4. Complete public element typings.
Touchpoints: `types/index.d.ts`.
Done when: every `customElements.define('crusher-*', ...)` tag in `src/components/**` is represented in `HTMLElementTagNameMap`.

5. Normalize command-palette global API.
Touchpoints: `src/runtime/command-palette.js`, `src/components/molecules/crusher-command-palette.js`, docs.
Done when: `window.crusherPalette` has one stable shape with documented methods.

6. Finish Phase 2 token-compliance cleanup.
Touchpoints: `src/components/**`, `src/css/bridge.css`, `src/css/dialect-overrides.css`, token JSON if needed.
Done when: hardcoded fallback colors are removed or intentionally centralized behind tokenized aliases.

7. Move remaining theme-specific component selectors into dialect/token layers where feasible.
Touchpoints: `src/components/molecules/crusher-card.js`, `src/css/dialect-overrides.css`, theme token files.
Done when: component internals are mostly theme-agnostic and rely on variables.

8. Reconcile package publish allowlist.
Touchpoints: `package.json` `files`, repository root legal/docs files.
Done when: allowlisted files exist and match intended distributable assets.

9. Add contract verification checks for CSS/runtime invariants.
Touchpoints: new scripts under `scripts/`, docs under `docs/`.
Done when: automated checks assert presence/order of core CSS layers and required root attributes/events.

10. Refresh permanent docs after contract changes.
Touchpoints: `docs/00-05`, `docs/decisions/0001-css-layering-and-loading.md`, `AGENTS.md`.
Done when: architecture, contract docs, and roadmap reflect actual implementation and automation.

11. Validate all three usage modes end-to-end before release.
Touchpoints: dev app (`index.html` + `src/js/main.js`), npm import path examples, static dist consumption.
Done when: each mode has a reproducible smoke-check procedure and passes.

12. Start Phase 6 expansion as scoped epics, not ad-hoc components.
Touchpoints: new RFC/decision docs and corresponding source directories.
Done when: expansion work is tracked as explicit proposals with acceptance criteria tied to token/runtime contracts.

## Do Not Do
- Do not start expansion work before contract and release-gate gaps are closed.
- Do not introduce new public APIs without typings, docs, and export strategy.
- Do not merge roadmap tasks without a clear done condition.

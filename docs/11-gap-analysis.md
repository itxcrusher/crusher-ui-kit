# 11 Gap Analysis

## Scope
Identify what is still incomplete relative to `docs/00-north-star.md`, `docs/01-architecture.md`, and `docs/05-roadmap-checklist.md`.

## Gaps
1. Release gate does not enforce contrast checks.
Evidence: `package.json` `prepublishOnly` runs `build:tokens && build`, and `.github/workflows/release.yml` runs token/build/publish without `npm run check:contrast`.
Impact: token/theme changes can ship without the North Star contrast gate.

2. npm consumer guidance is not aligned with published package boundaries.
Evidence: `README.md` imports `crusher-ui-kit/src/components/*` and `crusher-ui-kit/src/runtime/*`; `package.json` `files` only publishes `dist`, `src/css`, `types`, `README.md`, `LICENSE`.
Impact: documented install paths can fail for consumers.

3. Type declarations are incomplete versus registered public tags.
Evidence: `src/components/molecules/crusher-menubar.js` and `src/components/organisms/crusher-table.js` register tags, but `types/index.d.ts` does not include `crusher-menubar` or `crusher-table`.
Impact: TS consumers do not get complete element map coverage.

4. Runtime global contract for palette is ambiguous.
Evidence: `src/runtime/command-palette.js` sets `window.crusherPalette = { open, close }`, while `src/components/molecules/crusher-command-palette.js` sets `window.crusherPalette = this`.
Impact: global API shape depends on import/attachment order.

5. Component token compliance is not fully clean.
Evidence: hardcoded fallback colors remain in component styles, e.g. `src/components/forms/crusher-error.js`, `src/components/forms/crusher-label.js`, `src/components/atoms/crusher-code-block.js`.
Impact: Phase 2 "tokens only" is partially complete, not complete.

6. Theme behavior still exists inside component-level selectors.
Evidence: `src/components/molecules/crusher-card.js` uses `:host-context(html[data-theme="..."])`.
Impact: some dialect behavior is coupled to component CSS instead of token/dialect layers.

7. Documentation and scripts are out of sync.
Evidence: `README.md` references `npm run lint` and `npm run format`, but these scripts are not in `package.json`.
Impact: DX friction and inaccurate command guidance.

8. CI validation workflow is missing.
Evidence: `.github/workflows` contains only `release.yml`; no dedicated CI workflow for PR validation.
Impact: issues surface late (release time) instead of early (PR time).

9. Publish file list includes `LICENSE`, but repository root currently has no `LICENSE` file.
Evidence: `package.json` `files` contains `LICENSE`; root file inventory does not.
Impact: publish intent and package contents are inconsistent.

10. Framework expansion phase is still conceptual.
Evidence: `docs/05-roadmap-checklist.md` Phase 6 lists potential additions only; no corresponding source modules/directories yet.
Impact: roadmap beyond core library has no implementation track yet.

## Do Not Do
- Do not close gaps by changing docs only when code/contracts remain inconsistent.
- Do not add new public APIs before documenting and typing existing APIs correctly.
- Do not treat release automation as a substitute for PR-time validation.

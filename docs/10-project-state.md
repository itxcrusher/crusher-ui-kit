# 10 Project State

## Scope
Repository snapshot for Crusher UI Kit as of 2026-03-05, based on current files and configs.

## Current System
- Delivery modes are implemented in three paths:
  - Vite dev/demo: `index.html` + `src/js/main.js`
  - npm package: `package.json` `exports` root entry to `dist/crusher-ui.esm.js` / `dist/crusher-ui.min.js`
  - CDN/static HTML: `dist/crusher-ui.min.js` + `dist/crusher-ui.min.css`
- Token pipeline is active:
  - Sources: `design/tokens/base.json`, `design/themes/*.json`
  - Build scripts: `scripts/build-tokens.mjs`, `sd.config.js`, `sd.themes.config.mjs`
  - Generated outputs: `src/css/tokens.css`, `src/css/modes.css`, `src/css/themes/*.css`, `src/scss/base/_variables.scss`
- CSS layering is explicit in `src/js/main.js` and includes:
  - base/mode/semantic/bridge/code-theme/theme-scenes/dialect-overrides/theme overlays
  - authored SCSS via `src/scss/main.scss`
- Component library is organized and registered:
  - Atoms: 9 files in `src/components/atoms`
  - Molecules: 10 files in `src/components/molecules`
  - Organisms: 4 files in `src/components/organisms`
  - Forms: 4 files in `src/components/forms`
  - All are side-effect imported from `src/js/main.js`
- Runtime layer exists and is global:
  - `src/runtime/theme.js` manages `data-theme`, `data-mode`, `data-density` + localStorage persistence
  - `src/runtime/toast.js` publishes `window.crusherToast` and `crusher:toast`
  - `src/runtime/command-palette.js` publishes `window.crusherPalette` helpers and `crusher:palette`
- Attribute contract present in CSS/runtime:
  - `html[data-theme]`, `html[data-mode]`, `html[data-density]`, `html[dir="rtl"]`

## Distribution And Release Reality
- Library build is configured in `vite.config.js` with lib entry `src/js/main.js`.
- Package exports currently expose:
  - root JS entry (`.`)
  - `./styles/*.css` subpaths (including `theme-scenes.css`)
  - `./themes/*`
- Publish file allowlist is: `dist`, `src/css`, `types`, `LICENSE`, `README.md`.
- GitHub automation currently has one workflow: `.github/workflows/release.yml` (build + publish path).

## Working Tree Context
- Local working tree currently includes user edits in:
  - `docs/00-north-star.md`
  - `docs/01-architecture.md`
  - `docs/05-roadmap-checklist.md`
- These docs are treated as the latest planning baseline for this analysis.

## Do Not Do
- Do not treat `dist/` as source-of-truth code.
- Do not hand-edit generated token outputs.
- Do not assume README examples are authoritative without checking `package.json` exports/files.

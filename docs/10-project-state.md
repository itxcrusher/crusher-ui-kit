# 10 Project State

## Scope
Current repository snapshot for Crusher UI Kit as of 2026-03-29 after local verification.

## Current Position
Crusher UI Kit is now a web-first framework foundation, not just a loose component demo.

It currently supports three delivery modes:
- Vite/dev mode through `index.html` + `src/js/main.js`
- npm package consumption through `package.json` `exports`
- static HTML through `dist/crusher-ui.min.css` + `dist/crusher-ui.standalone.esm.js`

## Verified Baseline
The local verification path is green when dependencies are installed:
- `npm ci`
- `npm run build:tokens`
- `npm run check:contrast`
- `npm run build`
- `npm run check:package`
- `npm pack --dry-run`

## Stable Parts
- Token system is in place:
  - sources in `design/tokens/base.json` and `design/themes/*.json`
  - generation through `scripts/build-tokens.mjs`, `sd.config.js`, `sd.themes.config.mjs`
- CSS contract is explicit:
  - layered imports in `src/js/main.js`
  - exported style entrypoints under `./styles/*`
  - exported theme entrypoints under `./themes/*.css`
- Framework primitives now include:
  - `crusher-app-shell` for responsive product/page shells
  - `crusher-grid` for auto-fit content grids
  - `crusher-stack` for vertical composition without ad hoc page CSS
  - `crusher-nav-list` for reusable shell/sidebar navigation
  - `crusher-stat` for compact dashboard summary surfaces
  - `crusher-page-header`, `crusher-toolbar`, and `crusher-filter-bar` for page workflow chrome above real data/content surfaces
- Package contract is materially hardened:
  - root package entry for bundlers
  - `./standalone` entry for static/drop-in ESM
  - `./runtime` entry for theme, toast, and palette helpers
- Runtime contract is stable at the root attribute/event level:
  - attributes: `data-theme`, `data-mode`, `data-density`, `dir="rtl"`
  - events: `crusher:themechange`, `crusher:toast`, `crusher:palette`
- CI and release automation both enforce:
  - token generation
  - contrast checks
  - library build

## Current Limitations
- This repo is web-first. It can drive static sites, modern web frameworks, dashboards, SaaS apps, AI tools, infra consoles, and hybrid/mobile-web surfaces.
- It is not yet a native mobile UI framework. The reusable mobile-ready layer today is primarily tokens and design language, not native rendered components.
- `dist/` is generated build output and is intentionally gitignored. A fresh clone requires `npm ci` and `npm run build` before static artifacts exist locally.
- the weaker legacy browser-global UMD path has been retired from the public contract in favor of bundler ESM + standalone ESM.

## Do Not Do
- Do not treat the demo page as the whole framework.
- Do not treat `dist/` as committed source.
- Do not start expansion work until remaining contract and reuse gaps are closed.

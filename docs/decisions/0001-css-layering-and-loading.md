# 0001 CSS Layering And Loading

Status: Accepted  
Date: 2026-03-04

## Scope
Defines the canonical CSS load strategy for Vite dev, npm package use, and CDN/static HTML use.

## Decision
Use a layered CSS model where token generation happens first, semantic aliases are second, component bridge variables are third, and dialect/theme overlays are last.

Canonical order:
1. `tokens.css`
2. `modes.css`
3. `semantic.css`
4. `bridge.css`
5. `code-theme.css`
6. `theme-scenes.css`
7. `dialect-overrides.css`
8. one or more `themes/*.css`
9. optional authored Sass output (`src/scss/main.scss` through Vite build)

## Contract
- Vite dev mode:
  - Keep style imports centralized in `src/js/main.js` (current source of truth).
- npm package mode:
  - JS entry uses `exports["."]` (`dist/crusher-ui.esm.js` / `dist/crusher-ui.min.js`).
  - Prefer style entrypoints from package exports under `./styles/*` and `./themes/*` for granular imports.
- CDN/static HTML mode:
  - `dist` path: load `dist/crusher-ui.min.css` + `dist` JS for simple static delivery (single bundled CSS, lower control).
  - exports path: when using npm-aware tooling, import `./styles/*` + `./themes/*` for explicit layer control (more control, more import wiring).
- Global state contract:
  - Consumers toggle only `data-theme`, `data-mode`, and `data-density`; CSS layering handles the rest.

## Do Not Do
- Do not collapse layers into one authored file that bypasses token/theme generation.
- Do not import theme overlays before semantic/bridge layers.
- Do not add component-specific one-off CSS before shared contract layers.

## Consequences
- Styling changes stay predictable across all delivery modes.
- Theme/mode bugs become easier to isolate by layer.
- Build and publish checks can validate CSS order deterministically.

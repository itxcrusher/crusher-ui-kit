# 02 CSS Contract

## Scope
Defines how global CSS files are layered and what each layer owns.

## Contract
- Required load order (matches `src/js/main.js`):
  1. `src/css/tokens.css` (generated base token variables)
  2. `src/css/modes.css` (generated dark token overrides)
  3. `src/css/semantic.css` (light/dark semantic aliases + density aliases)
  4. `src/css/bridge.css` (control-level variables consumed by components)
  5. `src/css/code-theme.css` (code/token UI colors)
  6. `src/css/theme-scenes.css` (theme scene backgrounds)
  7. `src/css/dialect-overrides.css` (theme-specific control behavior)
  8. `src/css/themes/*.css` (generated per-theme overlays)
  9. `src/scss/main.scss` (base reset/typography/layout/utilities)
- Usage-mode matrix (explicit contracts):
  - `src/js/main.js` (full dev/demo contract):
    - Imports the full layer stack above, then all theme overlays, then `src/scss/main.scss`.
  - `src/js/bundle-demo.js` (reduced contract):
    - Imports `tokens.css`, `modes.css`, `semantic.css`, `bridge.css`, `code-theme.css`, `dialect-overrides.css`, and one theme (`themes/glass.css`).
    - Does not import `theme-scenes.css` or `src/scss/main.scss`.
  - npm consumer contract (exports-based):
    - Use exported style subpaths under `crusher-ui-kit/styles/*`:
      - `tokens.css`, `modes.css`, `semantic.css`, `bridge.css`, `code-theme.css`, `theme-scenes.css`, `dialect-overrides.css`
    - Use `crusher-ui-kit/themes/<name>.css` for theme overlays.
  - static HTML contract (dist-based):
    - Use prebuilt `dist/crusher-ui.min.css` as a single bundled stylesheet.
    - Pair with `dist` JS artifacts for static delivery; this path is bundle-first rather than granular.
- Selector contract:
  - Theme overlays target `html[data-theme="<name>"]`
  - Mode mapping targets `html[data-mode="light|dark"]`
  - Density mapping targets `html[data-density]` and `:root[data-density]`
- Component styling contract:
  - Consume `--crusher-*` semantic/bridge variables
  - Keep theme-specific behavior in dialect/theme files, not in random component literals

## Do Not Do
- Do not reorder layers without confirming variable dependency impact.
- Do not edit generated CSS in `src/css/themes/*.css`, `tokens.css`, or `modes.css` manually.
- Do not introduce non-prefixed globals for system tokens (keep `--crusher-*` namespace).

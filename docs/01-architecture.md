# 01 Architecture

## Scope
Maps the current codebase layout and runtime boundaries.

## Contract
- Directory ownership:
  - `design/`: token and theme JSON sources
  - `scripts/`: token generation and contrast guard
  - `src/css/`: generated token/theme CSS + authored bridge/semantic files
  - `src/scss/`: authored base/layout/utility Sass
  - `src/components/`: custom elements (atoms, molecules, organisms, forms)
  - `src/runtime/`: global helpers/events (`theme`, `toast`, `command-palette`)
  - `src/js/main.js`: package/dev entry that registers components and imports styles
  - `dist/`: build output from Vite library build
- Build flow:
  1. `npm run build:tokens` -> generates token and theme CSS assets
  2. `npm run build` -> bundles library via `vite.config.js` from `src/js/main.js`
- Runtime contract:
  - UI state is represented by `data-theme`, `data-mode`, `data-density` on `document.documentElement`
  - Global runtime events include `crusher:themechange`, `crusher:toast`, `crusher:palette`

## Do Not Do
- Do not move token source files into `src/` or component files into `design/`.
- Do not bypass `src/js/main.js` for library registration behavior.
- Do not change attribute/event names without documenting a compatibility strategy.

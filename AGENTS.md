# Crusher UI Kit Agent Guide

## Scope
This guide applies to automated and human contributors working in `crusher-ui-kit`. It defines what is safe to change and what must stay stable across these usage modes:
- Vite dev app (`npm run dev`, `index.html`, `src/js/main.js`)
- npm package consumers (`package.json` `exports` + `files`)
- CDN/static HTML consumers (assets from `dist/`)

## Contract
- Keep source of truth boundaries intact:
  - Design tokens and themes: `design/tokens/*.json`, `design/themes/*.json`
  - Generated artifacts: `src/css/tokens.css`, `src/css/modes.css`, `src/css/themes/*.css`, `src/scss/base/_variables.scss`
  - Runtime + components: `src/runtime/*`, `src/components/**/*`
- Preserve public selectors and attributes:
  - `html[data-theme]`
  - `html[data-mode]`
  - `html[data-density]`
  - `html[dir="rtl"]`
- Preserve public custom element tags in `src/components/**` (all `crusher-*` names are API).
- Before publish-oriented changes, run:
  - `npm run build:tokens`
  - `npm run check:contrast`
  - `npm run build`

## Do Not Do
- Do not hand-edit generated token files in `src/css/themes/*.css`, `src/css/tokens.css`, `src/css/modes.css`, or `src/scss/base/_variables.scss`.
- Do not rename/remove existing custom element tags without a migration plan and release notes.
- Do not introduce hardcoded color/spacing values when a `--crusher-*` token already exists.
- Do not change build/export behavior silently in `package.json` or `vite.config.js`.

# 00 North Star

## Scope
Defines what "good" means for this repo across all supported delivery modes.

## Contract
- Ship one design system surface that works in:
  - Vite local dev (`npm run dev`)
  - npm package installs (`exports` in `package.json`)
  - CDN/static HTML usage (`dist/` assets)
- Keep design decisions token-first:
  - Raw values originate in `design/tokens/base.json` and `design/themes/*.json`
  - Components consume semantic variables (`--crusher-*`), not ad-hoc literals
- Keep UX controls globally consistent:
  - Theme via `data-theme`
  - Mode via `data-mode`
  - Density via `data-density`
- Release quality gate: token build, contrast check, and library build all pass.

## Do Not Do
- Do not optimize only for the demo page while breaking package or static usage.
- Do not add new styling systems that bypass the token pipeline.
- Do not make mode/theme behavior component-specific unless it is encoded through shared CSS variables.

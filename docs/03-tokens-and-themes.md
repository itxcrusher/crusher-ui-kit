# 03 Tokens And Themes

## Scope
Defines the source-of-truth model for tokens, themes, and generated outputs.

## Contract
- Source files:
  - Base tokens: `design/tokens/base.json`
  - Theme overlays: `design/themes/{glass,brutal,neumorph,neobrutal,minimal,futuristic,bento}.json`
- Build config:
  - Base + dark mode generation: `sd.config.js`
  - Theme list and source binding: `sd.themes.config.mjs`
- Build commands:
  - `npm run build:tokens` generates:
    - `src/css/tokens.css`
    - `src/css/modes.css`
    - `src/css/themes/*.css`
    - `src/scss/base/_variables.scss`
  - `npm run check:contrast` validates WCAG contrast pairs from base + each theme JSON
- Theme naming contract:
  - Theme key must match `html[data-theme="<name>"]` and file name `<name>.css`/`<name>.json`

## Do Not Do
- Do not rename/remove token paths in JSON without checking generated variable names and component usage.
- Do not add a new theme in JSON only; update `sd.themes.config.mjs` and contrast script coverage.
- Do not release token changes without regenerating output files.

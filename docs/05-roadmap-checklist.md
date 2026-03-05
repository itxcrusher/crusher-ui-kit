# 05 Roadmap Checklist

## Scope
Short operational checklist for safe iteration and releases in this repo.

## Contract
- Release safety:
  - [ ] Run `npm run build:tokens`
  - [ ] Run `npm run check:contrast`
  - [ ] Run `npm run build`
  - [ ] Confirm `dist/` and exported CSS paths still match `package.json` `exports`
- API consistency:
  - [ ] Verify `types/index.d.ts` covers all registered custom elements
  - [ ] Keep README usage snippets aligned with actual published files (`files` field)
- Theme pipeline:
  - [ ] When adding a theme, update both `sd.themes.config.mjs` and contrast checks
  - [ ] Regenerate `src/css/themes/*.css` and validate selector name parity
- Dev/demo stability:
  - [ ] Confirm `index.html` + `src/js/main.js` still show all current component families in Vite dev mode

## Do Not Do
- Do not publish when any checklist item is unresolved.
- Do not add roadmap items that refer to non-existent paths/components in this repository.
- Do not treat README examples as source of truth when they diverge from package metadata.

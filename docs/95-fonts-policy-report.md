# 95 Fonts Policy Report

Date: 2026-03-04

## What Changed

Smallest fix applied:
- Removed the Google Fonts `@import` from `src/scss/base/_typography.scss`.
- Kept demo font loading in `index.html` unchanged.

Diff snippet:

```diff
-/* Fonts (author CSS). Tokens already expose font family/size variables. */
-@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@700&display=swap');
+/* Fonts are loaded by the host app/demo HTML, not by the published library CSS. */
```

## Why

Published library CSS should not force external network requests (like Google Fonts) on consumers.  
Fonts are an application-level choice, so consumers and the demo should load them explicitly in HTML (or via their own asset pipeline), not through the distributed library stylesheet.

## Verification

Build sanity:

```text
> npm run build
✓ built in 3.11s
dist/crusher-ui.min.css  48.98 kB
```

Grep evidence:

```text
$ rg -n "fonts.googleapis.com" dist/crusher-ui.min.css index.html src/scss/base/_typography.scss
index.html:9:  <link rel="preconnect" href="https://fonts.googleapis.com">
index.html:11:  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@700&display=swap" rel="stylesheet">
```

Interpretation:
- `dist/crusher-ui.min.css`: no `fonts.googleapis.com` match (desired).
- `index.html`: still references Google Fonts link (demo remains visually unchanged).
- `src/scss/base/_typography.scss`: no `fonts.googleapis.com` match after fix.

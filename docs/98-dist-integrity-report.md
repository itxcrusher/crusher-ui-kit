# 98 Dist Integrity Report

Date: 2026-03-04  
Scope: verify whether `dist/` is stale or current build output is incorrect.

## 1) Commands Run (as requested)

Commands executed:
1. `npm ci`
2. `npm run build:tokens`
3. `npm run build`

Build evidence:
```text
✓ 46 modules transformed.
dist/crusher-ui.esm.js    0.15 kB
dist/crusher-ui.min.js    0.25 kB
✓ built in 2.52s
```

Token build evidence:
```text
✔︎ src/css/tokens.css
✔︎ src/css/modes.css
Token collisions detected (47):
✔︎ src/css/themes/bento.css
```

## 2) Dist Output Inspection

### `dist/crusher-ui.esm.js` (first 60 lines)
File has 2 lines total:
```js
console.log("%c Crusher UI Kit Loaded ", "background:#22c55e;color:#fff;padding:4px 8px;border-radius:4px;");
//# sourceMappingURL=crusher-ui.esm.js.map
```

### `dist/crusher-ui.min.js` (first 60 lines)
File has 2 lines total:
```js
(function(e){typeof define=="function"&&define.amd?define(e):e()})((function(){"use strict";console.log("%c Crusher UI Kit Loaded ","background:#22c55e;color:#fff;padding:4px 8px;border-radius:4px;")}));
//# sourceMappingURL=crusher-ui.min.js.map
```

### `dist/crusher-ui.min.css` (first 30 lines)
File is minified to one line; line 1 begins with:
```css
@import"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@700&display=swap";:root{--crusher-color-brand-primary: #22c55e;--crusher-color-brand-secondary: #3b82f6;--crusher-color-brand-ac...
```

Additional CSS evidence (theme scene content exists in dist CSS):
```css
.scene{position:fixed;inset:0;z-index:-1;pointer-events:none;background:var(--crusher-background-canvas)}:root[data-theme=glass] .scene{--blob1: radial-gradient(800px 600px at 10% 20%, rgba(255,255,255,.35), transparent ...
```

## 3) JS Artifact Integrity Check

### Does `dist/crusher-ui.esm.js` include component registrations?
- `customElements.define`: **No**
- bundled code from `src/components/*`: **No**
- effective output: **stub (console.log only)**

Evidence:
```text
NO_MATCHES_IN_DIST_JS
```

`src/js/main.js` clearly imports component/runtime side-effect modules:
```js
import '../components/atoms/crusher-button.js';
import '../components/atoms/crusher-input.js';
import '../components/atoms/crusher-textarea.js';
import '../runtime/theme.js';
import '../runtime/toast.js';
```

## 4) Why It Remains a Stub (Evidence-Based)

`vite.config.js` correctly points library entry to `src/js/main.js`:
```js
lib: {
  entry: resolve(dirname, 'src/js/main.js'),
  formats: ['es', 'umd'],
```

So this is not a stale entry path issue.

The build log shows many modules transformed but JS output still tiny:
```text
✓ 46 modules transformed.
dist/crusher-ui.esm.js    0.15 kB
dist/crusher-ui.min.js    0.25 kB
```

Most likely cause: side-effect pruning via `package.json` `sideEffects` allowlist excludes component/runtime modules.
```json
"sideEffects": [
  "src/css/**",
  "src/scss/**",
  "src/js/main.js"
],
```

This list includes CSS/SCSS and `main.js`, but not `src/components/**` or `src/runtime/**`, which matches the observed result: CSS survives, JS component/runtime registrations are removed.

## 5) Smallest Fix Proposal (Do Not Apply Yet)

Proposed minimal change:
- Expand `package.json` `sideEffects` to include side-effect module paths imported by `src/js/main.js`.

Proposed delta (conceptual):
```json
"sideEffects": [
  "src/css/**",
  "src/scss/**",
  "src/js/main.js",
  "src/components/**",
  "src/runtime/**"
]
```

Why this is the smallest likely fix:
- No refactor of entrypoints or component code.
- Keeps current Vite config and import structure intact.
- Targets only the pruning boundary that currently drops registration side effects.

## 6) Conclusion

- `dist/` is **not merely stale**; a clean rebuild reproduces the same JS stub outputs.
- Current build emits full CSS artifact but JS library artifacts do not include component/runtime registration code.
- The highest-confidence root cause is side-effect pruning configuration scope (`package.json` `sideEffects`) relative to a side-effect-only entry (`src/js/main.js`).

# 97 SideEffects Fix Report

Date: 2026-03-04

## Change Applied

`package.json` was updated in `sideEffects` only (existing entries kept).

```diff
"sideEffects": [
  "src/css/**",
  "src/scss/**",
-  "src/js/main.js"
+  "src/js/main.js",
+  "src/components/**",
+  "src/runtime/**"
],
```

## Build Command Run

```bash
npm run build
```

Build completed successfully and produced larger JS artifacts:

```text
dist/crusher-ui.esm.js   98.46 kB
dist/crusher-ui.min.js   89.53 kB
```

## Before/After Dist JS Sizes

| File | Before (stub build) | After (with sideEffects fix) |
|---|---:|---:|
| `dist/crusher-ui.esm.js` | 153 bytes | 98,464 bytes |
| `dist/crusher-ui.min.js` | 247 bytes | 89,534 bytes |

## `dist/crusher-ui.esm.js` Head (post-fix)

```js
import { LitElement as c, css as d, html as n } from "lit";
import { classMap as A } from "lit/directives/class-map.js";
const T = ["primary", "secondary", "ghost", "outline", "subtle", "destructive"], D = ["sm", "md", "lg"];
class q extends c {
  static properties = {
```

## Grep Proof (registrations now present)

Command used:

```bash
rg -n "customElements\.define|crusher-button|LitElement" dist/crusher-ui.esm.js
```

Result excerpt:

```text
1:import { LitElement as c, css as d, html as n } from "lit";
173:customElements.define("crusher-button", q);
652:customElements.define("crusher-card", W);
1499:customElements.define("crusher-command-palette", te);
2246:customElements.define("crusher-table", ne);
```

Conclusion: dist JS is no longer a stub; component/runtime registration code is now included.

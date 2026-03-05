# 94 Change Classification

Date: 2026-03-04

## 1) `git status --short`

```text
 M index.html
 M package.json
 M src/components/atoms/crusher-button.js
 M src/components/molecules/crusher-card.js
 M src/css/bridge.css
 M src/js/bundle-demo.js
 M src/js/main.js
 M src/runtime/theme.js
 M src/scss/base/_typography.scss
?? AGENTS.md
?? dist/
?? docs/
?? src/css/dialect-overrides.css
?? src/css/theme-scenes.css
```

## 2) Modified Files (`M`) Inspection

### `index.html`

```text
index.html | 30 +++---------------------------
1 file changed, 3 insertions(+), 27 deletions(-)
```

```diff
diff --git a/index.html b/index.html
index 7681684..d533faf 100644
--- a/index.html
+++ b/index.html
@@ -131,6 +131,8 @@
             <crusher-button loading>Loading…</crusher-button>
             <crusher-button full-width>Full width</crusher-button>
           </div>
+          <div class="u-flex" style="gap:.5rem; margin-top:.75rem; flex-wrap:wrap;">
+          </div>
         </crusher-card>
 
         <crusher-card class="stack">
@@ -158,33 +160,6 @@ hello('Crusher');`}
           </crusher-code-block>
```

### `package.json`

```text
package.json | 6 +++++-
1 file changed, 5 insertions(+), 1 deletion(-)
```

```diff
diff --git a/package.json b/package.json
index f05f6ce..2e3f339 100644
--- a/package.json
+++ b/package.json
@@ -28,7 +28,9 @@
   "sideEffects": [
     "src/css/**",
     "src/scss/**",
-    "src/js/main.js"
+    "src/js/main.js",
+    "src/components/**",
+    "src/runtime/**"
   ],
   "exports": {
     ".": {
```

### `src/components/atoms/crusher-button.js`

```text
src/components/atoms/crusher-button.js | 125 ++++++++++++++++++---------------
1 file changed, 69 insertions(+), 56 deletions(-)
```

```diff
diff --git a/src/components/atoms/crusher-button.js b/src/components/atoms/crusher-button.js
index b876cc0..721ff2d 100644
--- a/src/components/atoms/crusher-button.js
+++ b/src/components/atoms/crusher-button.js
@@ -23,36 +23,49 @@ export class CrusherButton extends LitElement {
   }
 
   static styles = css`
-    :host {
-      display: inline-flex;
-      --btn-radius: var(--crusher-component-radius, var(--crusher-radius-md));
-      --btn-elev:  var(--crusher-component-elevation, var(--crusher-shadow-2));
-      --btn-hov-lift: var(--crusher-component-control-hoverLift, translateY(-2px));
-      --btn-focus: 0 0 0 3px color-mix(in srgb, var(--crusher-color-brand-primary), #fff 80%);
-    }
```

### `src/components/molecules/crusher-card.js`

```text
src/components/molecules/crusher-card.js | 22 +++++++++++++++++++++-
1 file changed, 21 insertions(+), 1 deletion(-)
```

```diff
diff --git a/src/components/molecules/crusher-card.js b/src/components/molecules/crusher-card.js
index d10739d..94dc747 100644
--- a/src/components/molecules/crusher-card.js
+++ b/src/components/molecules/crusher-card.js
@@ -23,6 +23,26 @@ export class CrusherCard extends LitElement {
       overflow: hidden; /* Ensure content respects border-radius */
     }
 
+    /* === Themed variants (using ::part for external theme overrides) === */
+    :host-context(html[data-theme="glass"]) .card {
+      background: color-mix(in srgb, var(--crusher-background-surface), transparent 0%);
+      border: 1px solid var(--crusher-border-primary);
+      backdrop-filter: blur(var(--crusher-effect-blur-md));
+      -webkit-backdrop-filter: blur(var(--crusher-effect-blur-md));
+      box-shadow: var(--crusher-shadow-2);
```

### `src/css/bridge.css`

```text
src/css/bridge.css | 95 ++++++++++++++++++++++++++++++++++++++----------------
1 file changed, 67 insertions(+), 28 deletions(-)
```

```diff
diff --git a/src/css/bridge.css b/src/css/bridge.css
index 1989ec9..34a7c14 100644
--- a/src/css/bridge.css
+++ b/src/css/bridge.css
@@ -1,22 +1,12 @@
-/* src/css/bridge.css */
-html {
-  /* Resolve core backgrounds depending on mode */
-  --crusher-background-canvas: var(--color-light-background-canvas);
-  --crusher-background-surface: var(--color-light-background-surface);
-  --crusher-text-primary: var(--color-light-text-primary);
-  --crusher-text-secondary: var(--color-light-text-secondary);
-  --crusher-border-primary: var(--color-light-border-primary);
-}
+/* ===============================
```

### `src/js/bundle-demo.js`

```text
src/js/bundle-demo.js | 1 +
1 file changed, 1 insertion(+)
```

```diff
diff --git a/src/js/bundle-demo.js b/src/js/bundle-demo.js
index 8367e9c..a2ab0e1 100644
--- a/src/js/bundle-demo.js
+++ b/src/js/bundle-demo.js
@@ -6,6 +6,7 @@ import '../css/modes.css';
 import '../css/semantic.css';
 import '../css/bridge.css';
 import '../css/code-theme.css';
+import '../css/dialect-overrides.css';
 
 // Pick ONE dialect you want visible on the demo page
 import '../css/themes/glass.css';
```

### `src/js/main.js`

```text
src/js/main.js | 7 +++++++
1 file changed, 7 insertions(+)
```

```diff
diff --git a/src/js/main.js b/src/js/main.js
index 7ad2925..b13ddf9 100644
--- a/src/js/main.js
+++ b/src/js/main.js
@@ -8,6 +8,10 @@ import '../css/modes.css';
 import '../css/semantic.css';
 import '../css/bridge.css';
 import '../css/code-theme.css';
+import '../css/theme-scenes.css';
+import '../css/dialect-overrides.css';
+
+// Per-theme token overlays (generated)
 import '../css/themes/glass.css';
 import '../css/themes/brutal.css';
 import '../css/themes/neumorph.css';
```

### `src/runtime/theme.js`

```text
src/runtime/theme.js | 32 ++++++++++++++++++++++++++++++--
1 file changed, 30 insertions(+), 2 deletions(-)
```

```diff
diff --git a/src/runtime/theme.js b/src/runtime/theme.js
index d8907b1..6323917 100644
--- a/src/runtime/theme.js
+++ b/src/runtime/theme.js
@@ -1,17 +1,41 @@
+// src/runtime/theme.js
 const KEY = 'crusher_prefs';
+const EVT = 'crusher:themechange';
 
 function readPrefs() {
   try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
 }
 function writePrefs(p) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch {} }
 
+function emitThemeChange(detail = {}) {
```

### `src/scss/base/_typography.scss`

```text
src/scss/base/_typography.scss | 3 +--
1 file changed, 1 insertion(+), 2 deletions(-)
```

```diff
diff --git a/src/scss/base/_typography.scss b/src/scss/base/_typography.scss
index 3954363..cb0f3c1 100644
--- a/src/scss/base/_typography.scss
+++ b/src/scss/base/_typography.scss
@@ -1,7 +1,6 @@
 @use 'variables' as *; // kept for compatibility; not redefining CSS vars here
 
-/* Fonts (author CSS). Tokens already expose font family/size variables. */
-@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@700&display=swap');
+/* Fonts are loaded by the host app/demo HTML, not by the published library CSS. */
 
 /* Base typography consumes token variables emitted by Style Dictionary */
 body {
```

## 3) Untracked Paths (`??`) Classification

- `AGENTS.md`: new documentation/agent guide (not build output).
- `docs/`: new documentation set (not build output).
- `src/css/theme-scenes.css`: new authored CSS file (not generated by current build command).
- `src/css/dialect-overrides.css`: new authored CSS file (not generated by current build command).
- `dist/`: build output generated by `npm run build` (artifact path).

## 4) Bucket Classification

## Bucket A: Pre-existing edits (already present before today)

- `index.html`
- `src/components/atoms/crusher-button.js`
- `src/components/molecules/crusher-card.js`
- `src/css/bridge.css`
- `src/js/bundle-demo.js`
- `src/js/main.js`
- `src/runtime/theme.js`
- `src/css/theme-scenes.css` (untracked authored CSS; timestamp indicates older authored file)
- `src/css/dialect-overrides.css` (untracked authored CSS; timestamp indicates older authored file)

## Bucket B: New intentional edits from today (sideEffects/exports/fonts/docs)

- `package.json` (sideEffects + exports updates)
- `src/scss/base/_typography.scss` (removed Google Fonts import from library style chain)
- `AGENTS.md`
- `docs/00-north-star.md`
- `docs/01-architecture.md`
- `docs/02-css-contract.md`
- `docs/03-tokens-and-themes.md`
- `docs/04-component-standards.md`
- `docs/05-roadmap-checklist.md`
- `docs/decisions/0001-css-layering-and-loading.md`
- `docs/99-repo-audit.md`
- `docs/98-dist-integrity-report.md`
- `docs/97-sideeffects-fix-report.md`
- `docs/96-exports-parity-report.md`
- `docs/95-fonts-policy-report.md`
- `docs/94-change-classification.md` (this file)

## Bucket C: Generated/rebuild artifacts (handle separately)

- `dist/crusher-ui.esm.js`
- `dist/crusher-ui.esm.js.map`
- `dist/crusher-ui.min.js`
- `dist/crusher-ui.min.js.map`
- `dist/crusher-ui.min.css`

## 5) Files Likely Exclude-From-Commit (unless release policy requires)

- Entire `dist/` tree (pure build output in this working tree state).

No generated token outputs currently appear modified/untracked under `src/css/tokens.css`, `src/css/modes.css`, `src/css/themes/*`, or `src/scss/base/_variables.scss`.

## 6) Ambiguities Requiring Human Decision

- `src/css/theme-scenes.css` and `src/css/dialect-overrides.css` are untracked authored source files, not build artifacts.  
  Decision needed: include now (if they are intended source additions) or keep out (if they were local experiment files).
- Bucket A vs B boundary for older modified tracked source files (`index.html`, `src/components/*`, `src/js/*`, `src/runtime/*`, `src/css/bridge.css`) depends on your historical intent; they were already dirty before this prompt and were not edited during this prompt.

## 7) Tracking / Gitignore Check (requested)

- Unwanted being tracked right now:
  - `dist/` is **not tracked** currently, but also **not gitignored**.
- Wanted being gitignored:
  - No evidence of this for requested paths; `git check-ignore` returned no matches for `dist`, `docs`, `AGENTS.md`, `src/css/theme-scenes.css`, `src/css/dialect-overrides.css`, `package.json`, `src/scss/base/_typography.scss`.

Practical implication:
- If `dist/` should never be committed outside release workflows, add it to `.gitignore` (policy decision).

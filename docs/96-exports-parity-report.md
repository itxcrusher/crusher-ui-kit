# 96 Exports Parity Report

Date: 2026-03-04

## Change Summary

Added this export in `package.json`:
- `"./styles/theme-scenes.css": "./src/css/theme-scenes.css"`

Sanity check run:
- `npm run build` -> passed.

## Evidence: `package.json` Exports Snippet

```json
"./styles/tokens.css": "./src/css/tokens.css",
"./styles/modes.css": "./src/css/modes.css",
"./styles/semantic.css": "./src/css/semantic.css",
"./styles/bridge.css": "./src/css/bridge.css",
"./styles/code-theme.css": "./src/css/code-theme.css",
"./styles/theme-scenes.css": "./src/css/theme-scenes.css",
"./styles/dialect-overrides.css": "./src/css/dialect-overrides.css",
"./themes/*": "./src/css/themes/*.css"
```

## Minimal npm Consumer Import Map

```js
// JS entry
import 'crusher-ui-kit';

// Canonical style layers (all exported style subpaths)
import 'crusher-ui-kit/styles/tokens.css';
import 'crusher-ui-kit/styles/modes.css';
import 'crusher-ui-kit/styles/semantic.css';
import 'crusher-ui-kit/styles/bridge.css';
import 'crusher-ui-kit/styles/code-theme.css';
import 'crusher-ui-kit/styles/theme-scenes.css';
import 'crusher-ui-kit/styles/dialect-overrides.css';

// Choose one or more exported themes
import 'crusher-ui-kit/themes/glass.css';
```

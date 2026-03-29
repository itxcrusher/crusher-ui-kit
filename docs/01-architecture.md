# 01 Architecture

## Scope
Defines the architectural boundaries of Crusher UI Kit and how the codebase is structured.

## High Level System

Crusher UI Kit consists of four major layers:

1. Token System
2. CSS System
3. Component System
4. Runtime System

Each layer has strict responsibilities.

---

## Directory Responsibilities

design/
Source of truth for all design tokens and theme dialects.

design/tokens/
Base token definitions.

design/themes/
Theme overlays representing visual dialects.

---

scripts/
Build utilities for token generation and contrast checks.

---

src/css/
Generated token CSS and authored semantic bridge layers.

tokens.css  
modes.css  
themes/*.css  

These files are consumed by components and runtime.

---

src/scss/
Author-maintained structural styling.

base/  
layout/  
utilities/

These define layout rules and base resets, not design tokens.

---

src/components/

Custom elements organized by component complexity:

atoms/  
Small standalone components.

forms/  
Form primitives and validation helpers.

molecules/  
Composite interactive components.

organisms/  
Large UI structures.

All public elements use the prefix:

crusher-*

This naming is part of the public API.

---

src/runtime/

Global utilities and UI orchestration.

index.js  
Public runtime entry exported as `./runtime`.

theme.js  
Controls theme, mode, density switching.

toast.js  
Global toast event system.

command-palette.js  
Keyboard command system.

---

src/js/main.js

Library entry point.

Responsibilities:

register all components  
load base styles  
initialize runtime helpers  

This entry must work for:

Vite dev  
npm installs  
library builds

---

dist/

Library build output produced by Vite.

Files include:

crusher-ui.esm.js  
crusher-ui.min.css  
crusher-ui.standalone.esm.js  
crusher-ui.standalone.min.css

dist is build output and must never be manually edited.

---

## Build Flow

Token build

npm run build:tokens

Generates:

src/css/tokens.css  
src/css/modes.css  
src/css/themes/*.css  
src/scss/base/_variables.scss

Library build

npm run build

Bundles the library from:

src/js/main.js

Output goes to:

dist/

---

## Runtime Contract

Global UI state lives on:

document.documentElement

Attributes used:

data-theme  
data-mode  
data-density

Runtime events:

crusher:themechange  
crusher:toast  
crusher:palette

Components must react through CSS variables rather than internal JS styling.

---

## Do Not Do

Do not move token sources into src/.

Do not place component logic inside design/.

Do not bypass src/js/main.js for library registration.

Do not change global attribute names without compatibility documentation.
